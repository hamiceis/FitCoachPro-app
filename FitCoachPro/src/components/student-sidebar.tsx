import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

interface StudentSidebarProps {
  children?: ReactNode;
}

export function StudentSidebar({ children }: StudentSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="relative top-14 left-5 z-50" asChild>
        <Button variant="secondary" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="p-0 w-fit">
        {children}
      </SheetContent>
    </Sheet>
  );
}
