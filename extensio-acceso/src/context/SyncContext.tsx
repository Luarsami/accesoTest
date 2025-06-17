import React, { createContext, useEffect } from "react";
import { getLocalVisits, saveVisitLocally } from "../services/visitService";
import { Visit } from "../models/Visit";
import { useNetInfo } from "./NetInfoContext";

const SyncContext = createContext({});

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isConnected } = useNetInfo();

  useEffect(() => {
    if (isConnected) {
      syncVisits();
    }
  }, [isConnected]);

  const syncVisits = async () => {
    const visits = await getLocalVisits();
    for (const visit of visits) {
      if (!visit.synced) {
        try {
          const res = await fetch(
            "https://6848999bec44b9f3494165c2.mockapi.io/api/v1/visits",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...visit, photo: visit.photo || "" }),
            }
          );

          if (res.ok) {
            visit.synced = true;
            await saveVisitLocally(visit);
          }
        } catch (err) {
          console.log("Error syncing visit", err);
        }
      }
    }
  };

  return <SyncContext.Provider value={{}}>{children}</SyncContext.Provider>;
};
