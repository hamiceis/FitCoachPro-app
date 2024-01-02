import { useLocation } from "react-router-dom";
import { FormLogin } from "@/components/form-login";

import { ToggleRegister } from "@/components/toggle-register";

export function LayoutLogin() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="min-h-screen grid place-content-center">
      <main className="h-full min-w-70 md:grid md:grid-cols-2 flex flex-col">
        <section className="bg-zinc-900 py-4 px-2 grid place-content-center rounded-l-lg">
          <h1 className="text-2xl font-medium text-center">
            FitCoach
            <span className="font-bold text-primary">PRO</span>
          </h1>
          <img src="/casal-fit.svg" alt="casalfit" />
        </section>

        <section className="px-2 bg-zinc-800 rounded-r-lg">
          {pathName === "/register" ? (
            <ToggleRegister />
          ) : (
            <FormLogin />
          )}
        </section>
      </main>
    </div>
  );
}
