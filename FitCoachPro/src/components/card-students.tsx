import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface CardStudentProps {
  id: string
  name: string;
  email: string;
}

export function CardStudent({ id, name, email }: CardStudentProps) {
  return (
    <div className="flex px-4 py-2 mr-3 items-center justify-between border shadow-lg border-zinc-300 rounded-lg hover:opacity-70 ">
      <div>
        <h2 className="text-xl font-medium mb-1">{name}</h2>
        <p className="text-xs italic">{email}</p>
      </div>

      <div className="flex items-center gap-2">
        <Link to={`/student/${id}`}>
          <Button variant="secondary" className="space-x-1">
            <FileText size={14} />
            <span>Ficha</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
