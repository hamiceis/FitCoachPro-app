import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navData: string[] = [
  "Plataforma",
  "App",
  "Funcionalidades",
  "Depoimentos",
  "Planos",
  "FAQ",
];

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-7 top-8 lg:hidden cursor-pointer"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <ul className="h-fit w-72 lg:w-full text-center absolute lg:relative inset-y-0 lg:bg-transparent right-0 top-24 lg:top-0 space-y-4 lg:space-y-0 px-4 lg:px-0 py-6 lg:py-0 rounded-b-lg lg:rounded-none lg:flex gap-6">
          {navData.map((item) => (
            <li
              key={item}
              className="text-base font-medium hover:text-primary hover:animate-bounce transition-colors cursor-pointer"
            >
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
