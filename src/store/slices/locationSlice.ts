import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  coords: { lat: number; lng: number } | null;
  locationName: string;
  isLocating: boolean;
  isModalOpen: boolean;
}

// Load data awal dari localStorage jika tersedia
const savedCoords =
  typeof window !== "undefined" ? localStorage.getItem("nurani_coords") : null;
const savedName =
  typeof window !== "undefined"
    ? localStorage.getItem("nurani_location_name")
    : null;

const initialState: LocationState = {
  coords: savedCoords ? JSON.parse(savedCoords) : null,
  locationName: savedName ?? "Mencari lokasi...",
  isLocating: false,
  isModalOpen: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCoords: (
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>,
    ) => {
      state.coords = action.payload;
      if (action.payload) {
        localStorage.setItem("nurani_coords", JSON.stringify(action.payload));
      }
    },
    setLocationName: (state, action: PayloadAction<string>) => {
      state.locationName = action.payload;
      localStorage.setItem("nurani_location_name", action.payload);
    },
    setIsLocating: (state, action: PayloadAction<boolean>) => {
      state.isLocating = action.payload;
    },
    toggleLocationModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setCoords,
  setLocationName,
  setIsLocating,
  toggleLocationModal,
} = locationSlice.actions;
export default locationSlice.reducer;
