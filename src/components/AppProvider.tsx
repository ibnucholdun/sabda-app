"use client";

import React from "react";
import { Provider, useSelector } from "react-redux";
import { store, type RootState } from "../store/store";
import LocationModal from "./LocationModal";
import Header from "./Header";
import { useLocationDetection } from "../hooks/useLocationDetection";

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useLocationDetection();
  const { isModalOpen } = useSelector((state: RootState) => state.location);
  return (
    <div className="relative mx-auto flex h-screen max-w-md flex-col overflow-hidden bg-white shadow-2xl">
      {isModalOpen && <LocationModal />}
      <Header />
      <main className="scrollbar-hide flex-1 overflow-y-auto scroll-smooth bg-slate-50/50 px-4 pt-4 pb-32">
        {children}
      </main>

      {/* <AIAssistant />
      <BottomNav /> */}
    </div>
  );
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AppContent>{children}</AppContent>
    </Provider>
  );
};

export default AppProvider;
