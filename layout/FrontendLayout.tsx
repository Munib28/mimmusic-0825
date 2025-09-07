"use client";

import MusicPlayer from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";
import Queue from "@/components/Queue";
import Sidebar from "@/components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

type PlayerContextType = {
  isQueueModalOpen: boolean;
  setIsQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryclient = new QueryClient();
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryclient}>
      <PlayerContext.Provider
        value={{
          isQueueModalOpen,
          setIsQueueModalOpen,
        }}
      >
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Sidebar />
            <Queue />
            <MusicPlayer />
            {children}
          </main>
        </div>
      </PlayerContext.Provider>
    </QueryClientProvider>
  );
}
