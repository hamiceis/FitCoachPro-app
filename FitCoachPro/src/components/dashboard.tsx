import { useEffect, useState } from "react";

import { useFetch } from "@/hooks/useFetch";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CardStudent } from "./card-students";

import { StudentData, StudentProps } from "@/types/student.types";
import { useUsersStore } from "@/hooks/useUsers";

import { useAuthTokenContext } from "@/hooks/useAuthToken";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [search, setSearch] = useState<string>("");

  const { authToken } = useAuthTokenContext();
  const { setUsers } = useUsersStore();
  const navigate = useNavigate()

  const { data, loading, error } = useFetch<StudentData[]>(`teacher/students`);
  //UseEffect garante que os dados, sejam aguardados e passados para dentro do contexto do Zustand
  useEffect(() => {
    if(!authToken && !data) {
      return
    }
    setUsers(data!);
  }, [authToken, data]);
  
  const filterUsers = search.length > 0 
  ? data!.filter((user: StudentProps) => user.name.toLowerCase().includes(search))
  : data;

  if (error) {
    console.log(error)
  }

  if(authToken?.role === "user") {
    navigate("/dashboard/workouts")
  }

  return (
    <div className="w-full py-2 flex flex-col space-y-4">
      <div className="w-full mt-2">
        <Input
          type="text"
          maxLength={100}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2 border-zinc-400 focus:ring-black focus-visible:ring-0"
          placeholder="Digite o nome do aluno.. 🔍"
        />
      </div>

      <ScrollArea className="h-[26.5rem] md:h-[27.5rem]">
        <div className="flex flex-col space-y-4">
          {loading ? (
            <div className="h-72 flex justify-center items-center">
              <h2 className="font-bold text-2xl animate-pulse">Carregando</h2>
            </div>
          ) : (
            filterUsers!.map((user) => {
              return (
                <CardStudent
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                />
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
