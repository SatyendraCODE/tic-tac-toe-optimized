import { Theme } from "gif-picker-react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStoreType {
  customTheme: string;
  setCustomTheme: (theme: string) => void;
}

export const useThemeCustom = create<AuthStoreType>()(
  persist(
    (set) => ({
      customTheme: Theme.AUTO,
      setCustomTheme: (theme) => set(() => ({ customTheme: theme })),
    }),
    {
      name: "custom-theme-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
