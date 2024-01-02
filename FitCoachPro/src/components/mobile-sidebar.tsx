import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";

export function MobileSidebar(){

  return (
    <Sheet>
      <SheetTrigger asChild>
       <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
       </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}