import localforage from "localforage";

export const ibadahStore = localforage.createInstance({
  name: "Sabda-app",
  storeName: "ibadah_tracker",
});

export const tasbihStore = localforage.createInstance({
  name: "Sabda-app",
  storeName: "tasbih_data",
});
