import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { useAuthStore } from "@/hooks/useAuth"

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

import { AuthTokenProps } from "@/types/authToken.types";
import { ContextType } from "@/types/OutletContextType.types";


export function DashboardPage() {
  const [authToken, setAuthToken] = useState<AuthTokenProps | null>(null);
  const { setAuthToken: setAuth } = useAuthStore()

  const navigate = useNavigate()
  const auth = Cookies.get("authToken")
  useEffect(() => {

    if (!auth) {
      navigate("/login")
      toast.error("Usuário não logado")
    } else {
      try {
        const data = JSON.parse(auth)
        setAuthToken(data)
        setAuth(data)
      } catch(error: any) {
        console.log("Não foi possível acessar seus dados", error)
      }
    }

 
  }, [auth]);

  return (
    <div className="h-screen w-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>
      <div className="bg-zinc-600 h-max md:h-screen w-full md:py-0 p-4">
        <Header data={authToken!}  />
        <Outlet context={{ authToken } satisfies ContextType} />
      </div>
    </div>
  );
}
