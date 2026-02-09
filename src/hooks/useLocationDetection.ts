import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import {
  setCoords,
  setLocationName,
  setIsLocating,
} from "../store/slices/locationSlice";
import type { BigDataCloudResponse } from "../types/type";
import { formatLocationName } from "../utils/locationHelper";

export const useLocationDetection = () => {
  const dispatch = useDispatch();
  const { coords } = useSelector((state: RootState) => state.location);

  const detectLocation = useCallback(() => {
    dispatch(setIsLocating(true));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          void (async () => {
            try {
              const { latitude, longitude } = position.coords;
              dispatch(setCoords({ lat: latitude, lng: longitude }));
              const apiKeyBigDataCloud =
                process.env.NEXT_PUBLIC_BIGDATA_CLOUD_API_KEY;
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=&key=${apiKeyBigDataCloud}`,
              );
              const data = (await response.json()) as BigDataCloudResponse;
              const locationName = formatLocationName(data);
              dispatch(setLocationName(locationName));
            } catch (error) {
              console.error("Error geocoding:", error);
            } finally {
              dispatch(setIsLocating(false));
            }
          })();
        },
        () => {
          dispatch(setIsLocating(false));
          // Default jika gagal
          if (!coords) {
            dispatch(setCoords({ lat: -6.3273, lng: 108.3249 }));
            dispatch(setLocationName("Indonesia, Indonesia"));
          }
        },
      );
    }
  }, [dispatch, coords]);

  useEffect(() => {
    if (!coords) {
      detectLocation();
    }
  }, [detectLocation, coords]);

  return { detectLocation };
};
