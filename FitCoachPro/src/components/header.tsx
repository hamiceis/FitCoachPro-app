import { useState ,useEffect } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { AuthTokenProps } from "@/types/authToken.types";
import { StudentData } from "@/types/student.types";
import { api } from "@/services/api";

interface HeaderProps {
  data: AuthTokenProps 
}

export function Header({ data }: HeaderProps) {
  const [students, setStudents] = useState<StudentData[] | null>()
  useEffect(() => {
    if(!data) {
      return
    }
    if(data.role === "admin") {
      try {
        api.get("/teachers")
          .then(response => setStudents(response.data))
      } catch(error: any) {
        console.log(error)
      }
    } else {
      try {
        api.get("/students")
          .then(response => setStudents(response.data))
      } catch(error: any) {
        console.log(error)
      }
    }
  }, [data])

  const user = students?.find((user) => user.id === data.id)

  return (
    <div className="w-full flex flex-col px-2 py-4 md:py-7 border-b border-zinc-100 gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">
          Olá, <span className="text-zinc-100 font-bold italic">{user?.name || ""}</span>
        </h1>
        <MobileSidebar />
      </div>

    </div>
  );
}
