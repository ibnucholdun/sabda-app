import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import {
  setCoords,
  setLocationName,
  setIsLocating,
  toggleLocationModal,
} from "../store/slices/locationSlice";
import { locationService } from "../services/locationServices"; // Import service
import { formatLocationName } from "../utils/locationHelper";
import type { Area } from "../types/type";

export type LocationStep =
  | "menu"
  | "province"
  | "regency"
  | "district"
  | "village";

export const useLocationManager = () => {
  const dispatch = useDispatch();
  const { isLocating } = useSelector((state: RootState) => state.location);

  const [step, setStep] = useState<LocationStep>("menu");
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [selectedPath, setSelectedPath] = useState<
    { name: string; id: string }[]
  >([]);

  const detectLocation = () => {
    console.log("detectLocation");
    dispatch(setIsLocating(true));
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          void (async () => {
            try {
              const { latitude, longitude } = position.coords;
              dispatch(setCoords({ lat: latitude, lng: longitude }));

              const data = await locationService.reverseGeocode(
                latitude,
                longitude,
              );
              dispatch(setLocationName(formatLocationName(data)));
              dispatch(toggleLocationModal(false));
            } catch (error) {
              console.error(error);
            } finally {
              dispatch(setIsLocating(false));
            }
          })();
        },
        () => {
          dispatch(setIsLocating(false));
          alert("Gagal mengakses lokasi.");
        },
      );
    }
  };

  const fetchAreas = async (type: string, parentId?: string) => {
    setIsLoadingAreas(true);
    try {
      const data = await locationService.getAreas(type, parentId);
      const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setAreas(sortedData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAreas(false);
    }
  };

  const handleAreaSelect = async (area: Area) => {
    const newPath = [...selectedPath, area];

    if (step !== "village") {
      const nextSteps: Record<string, LocationStep> = {
        province: "regency",
        regency: "district",
        district: "village",
      };
      const nextStep = nextSteps[step];
      if (nextStep) {
        setSelectedPath(newPath);
        setStep(nextStep);
        void fetchAreas(nextStep, area.id);
      }
    } else {
      // Logic terakhir (Village)
      setIsLoadingAreas(true);
      try {
        const [prov, reg, dist] = selectedPath;
        if (!reg || !dist || !prov) return;
        const formattedName = `${area.name.charAt(0) + area.name.slice(1).toLowerCase()}, ${reg.name.charAt(0) + reg.name.slice(1).toLowerCase()}`;
        const query = `${area.name}, ${dist.name}, ${reg.name}, ${prov.name}, Indonesia`;

        const geoData = await locationService.searchGeocode(query);
        let finalCoords = geoData[0];

        if (!finalCoords) {
          const fallback = await locationService.searchGeocode(
            `${reg.name}, Indonesia`,
          );
          finalCoords = fallback[0];
        }

        if (finalCoords) {
          dispatch(
            setCoords({
              lat: parseFloat(finalCoords.lat),
              lng: parseFloat(finalCoords.lon),
            }),
          );
        }
        dispatch(setLocationName(formattedName));
        dispatch(toggleLocationModal(false));
      } catch {
        alert("Gagal sinkronisasi koordinat.");
      } finally {
        setIsLoadingAreas(false);
      }
    }
  };

  const goBackStep = () => {
    const prevSteps: Record<string, LocationStep> = {
      province: "menu",
      regency: "province",
      district: "regency",
      village: "district",
    };
    const prevStep = prevSteps[step];

    if (prevStep) {
      setStep(prevStep);
      if (prevStep === "menu") {
        setSelectedPath([]);
      } else {
        const parentIdx = selectedPath.length - 2;
        const parentId =
          parentIdx >= 0 ? selectedPath[parentIdx]?.id : undefined;
        void fetchAreas(prevStep, parentId);
        setSelectedPath(selectedPath.slice(0, -1));
      }
    }
  };

  return {
    step,
    setStep,
    areas,
    isLoadingAreas,
    selectedPath,
    isLocating,
    detectLocation,
    fetchAreas,
    handleAreaSelect,
    goBackStep,
  };
};
