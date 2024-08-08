import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type userType = {
  uid: string;
};

interface AuthStoreType {
  user: userType | null;
  isLogin: boolean;
  setUser: (userDetails: userType) => void;
  removeUser: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      setUser: (userDetails: { uid: string }) =>
        set(() => ({ user: userDetails, isLogin: true })),
      removeUser: () => set(() => ({ user: null, isLogin: false })),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
