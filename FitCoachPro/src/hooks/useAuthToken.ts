import { ContextType } from "@/types/OutletContextType.types"
import { useOutletContext } from "react-router-dom"


export function useAuthTokenContext() {
  return useOutletContext<ContextType>()
}