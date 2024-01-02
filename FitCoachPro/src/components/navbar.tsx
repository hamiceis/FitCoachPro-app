import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileMenu } from "./mobile-menu";

const navData: string[] = [
  "Plataforma",
  "App",
  "Funcionalidades",
  "Depoimentos",
  "Planos",
  "FAQ",
];

export function Navbar() {
  return (
    <nav className="flex items-center gap-10">
      <MobileMenu />
      <ul className="h-fit hidden w-56 lg:w-full text-center absolute lg:relative inset-y-0 bg-zinc-800 lg:bg-transparent right-0 top-24 lg:top-0 space-y-4 lg:space-y-0 px-4 lg:px-0 py-6 lg:py-0 rounded-b-lg lg:rounded-none lg:flex gap-6">
        {navData.map((item) => (
          <li
            key={item}
            className="text-base font-medium hover:text-primary hover:animate-bounce transition-colors cursor-pointer"
          >
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
      <Link
        to="/login"
        className="text-lg ml-10 flex items-center gap-1 font-medium py-2 px-4 bg-primary rounded-full  hover:bg-primary/50 transition-colors"
      >
        Acessar
        <LogIn size={20} />
      </Link>
    </nav>
  );
}
