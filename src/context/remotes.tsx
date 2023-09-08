import React, { createContext, useState, useContext, FC } from "react";
import {
  remoteModuleMapDev,
  remoteModuleProduction,
  remoteModuleQA,
} from "../assets/remote_manifest";

export interface Remote {
  name: string;
  url?: string;
}

export interface Remotes {
  remotes: Remote[];
  updateRemoteUrl: (name: string, newUrl: string) => void;
}
//accoding to the environment remote components loading
let currentEnv = window.location.hostname.split(".", 1)[0];
let hostname = window.location.host;
let initRemotes = remoteModuleMapDev;
if (
  (currentEnv === "localhost" && hostname === "localhost:3000") ||
  currentEnv === "dev" ||
  currentEnv === "d3r3zqdt7r6pj8"
) {
  initRemotes = remoteModuleMapDev;
} else if (currentEnv === "qa" || currentEnv === "d5gfuxg0uj774") {
  initRemotes = remoteModuleQA;
} else {
  initRemotes = remoteModuleProduction;
}

const initState: Remotes = {
  remotes: initRemotes,
  updateRemoteUrl: () => {},
};

const STORAGE_KEY = "school-presenter-remotes";

const storeRemotes = (remotes: Remote[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remotes));
};

const hydrateRemotes = (): Remote[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    return [];
  } catch {
    return [];
  }
};

export const RemotesContext = createContext(initState);

export const RemotesProvider: FC<{ children: any }> = ({ children }) => {
  const storedRemotes = hydrateRemotes();
  const [remotes, setRemotes] = useState<Remote[]>(
    storedRemotes.length > 0 ? storedRemotes : initRemotes
  );
  const updateRemoteUrl = (name: string, newUrl: string): void => {
    setRemotes((prevRemotes) => {
      const newRemotes = [...prevRemotes];
      const remoteIdx = newRemotes.findIndex((r) => r.name === name);
      if (remoteIdx > -1) {
        newRemotes[remoteIdx].url = newUrl;
      }
      storeRemotes(newRemotes);
      return newRemotes;
    });
  };
  const RemotesCtx: Remotes = {
    remotes,
    updateRemoteUrl,
  };
  return (
    <RemotesContext.Provider value={RemotesCtx}>
      {children}
    </RemotesContext.Provider>
  );
};
export default RemotesProvider;

export const useRemotes = (): [
  Remote[],
  (name: string, newUrl: string) => void
] => {
  const { remotes, updateRemoteUrl } = useContext(RemotesContext);
  return [remotes, updateRemoteUrl];
};
