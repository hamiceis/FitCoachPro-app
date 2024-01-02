import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUsersStore } from "@/hooks/useUsers";

import { StudentSidebar } from "@/components/student-sidebar";
import { HeaderStudent } from "@/components/header-student";
import { WorkoutCard } from "@/components/workout-card";
import { FormWorkout } from "@/components/form-workout";

import { StudentData } from "@/types/student.types";
import { Workouts } from "@/types/workout.types";

import { api } from "@/services/api";

export function StudentPage() {
  const [data, setData] = useState<StudentData[] | []>([]);
  const [workouts, setWorkouts] = useState<Workouts[] | null>(null);

  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  const { users } = useUsersStore();
  const { id } = useParams();

  const fetchWorkouts = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`workouts/${id}`);
      setWorkouts(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users && id) {
      fetchWorkouts(id);
      setData(users)
    }
    if(users.length === 0) {
      api.get("teacher/students")
       .then(response => setData(response.data))
       .catch((error: any) => console.log(error))
    }
  }, [users, id, forceRender]);
  
  const user = data.find((u) => u.id === id) as StudentData

  if (error) {
    return (
      <h1>Erro ao carregar dados. Tente novamente mais tarde.</h1>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-600">
      <div className="hidden md:block">
        <HeaderStudent data={user} setForceRender={setForceRender} />
      </div>

      <StudentSidebar>
        <HeaderStudent data={user} setForceRender={setForceRender} />
      </StudentSidebar>

      <main className="h-full py-4 px-4">
        <div className="flex justify-center items-center relative">
          <h1 className="text-3xl font-bold">Treinos</h1>
          <FormWorkout studentId={id!} forceRender={setForceRender} />
        </div>

        {loading ? (
          <h1 className="mt-20 text-center font-bold text-2xl animate-bounce">
            Carregando...
          </h1>
        ) : (
          <>
            {workouts?.length === 0 ? (
              <div className="h-40 w-full flex justify-center items-center ">
                <h1 className="font-bold text-2xl absolute">
                  Não foram encontrados treinos
                </h1>
              </div>
            ) : (
              <div className="mt-64 md:mt-28 grid grid-cols-3 md:grid-cols-6 relative">
                {workouts?.map((workoutData, i) => (
                  <WorkoutCard
                    data={workoutData}
                    index={i}
                    key={workoutData.id}
                    setForceRender={setForceRender}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
