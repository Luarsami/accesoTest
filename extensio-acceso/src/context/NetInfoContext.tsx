import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

type NetInfoContextType = {
  isConnected: boolean;
};

const NetInfoContext = createContext<NetInfoContextType>({ isConnected: true });

export const useNetInfo = () => useContext(NetInfoContext);

export const NetInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NetInfoContext.Provider value={{ isConnected }}>
      {children}
    </NetInfoContext.Provider>
  );
};
