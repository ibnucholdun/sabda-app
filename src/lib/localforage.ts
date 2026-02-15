import localforage from "localforage";

localforage.config({
  name: "Sabda-app",
  storeName: "ibadah_tracker",
});

export default localforage;
