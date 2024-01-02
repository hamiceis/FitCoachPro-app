import { create } from "zustand"
import { AuthTokenProps } from "@/types/authToken.types"


interface UseAuthStoreProps {
  authToken: AuthTokenProps | null;
  setAuthToken: (data: AuthTokenProps) => void;
}

export const useAuthStore = create<UseAuthStoreProps>((set) => ({
  authToken: null,
  setAuthToken: (data) => set({ authToken: data }),
}));