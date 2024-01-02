import { useParams, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

import { useFetch } from "@/hooks/useFetch";
import { Exercises } from "@/types/exercise.type";

export function ExercisesPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, data, error } = useFetch<Exercises[]>(`exercise/${id}`)

  if (error) {
    return <h1>Tente novamente mais tarde</h1>
  }

  const exercisesFound = data && data.length > 0;

  return (
    <ScrollArea className="bg-zinc-600 h-screen w-full px-2">
      <div className="relative w-full h-24 flex items-center justify-center">
        <h1 className="text-2xl font-bold mt-3">Exercícios</h1>
        <Button
          variant="ghost"
          className="absolute left-2 top-4 p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircle size="28" />
        </Button>
      </div>

      <div className="mt-5 px-2 py-3 flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {loading && <h1>Carregando...</h1>}
          {!loading && !exercisesFound && <p>Não foram encontrados exercícios.</p>}

          {exercisesFound && data?.map((exercise) => {
            return (
              <div
                className="px-2 py-3 bg-black h-96 rounded-lg flex flex-col space-y-6 border-2 border-zinc-100 hover:border-2 hover:border-primary transition-colors"
                key={exercise.id}
              >
                <h1 className="font-bold text-center">
                  {exercise.name_exercise}
                </h1>

                <div className="flex flex-col gap-4">
                  <p>
                    Repetições:
                    <span className="ml-2 font-semibold text-red-500">
                      {exercise.repetitions}
                    </span>
                  </p>
                  <p>
                    Intervalo:
                    <span className="ml-2 font-semibold text-red-500">
                      {exercise.interval}
                    </span>
                  </p>
                  <p>
                    Método:
                    <span className="ml-2 font-semibold text-red-500">
                      {exercise.method ?? "Nenhum"}
                    </span>
                  </p>
                  <p>
                    Carga:
                    <span className="ml-2 font-semibold text-red-500">{exercise.load}</span>
                  </p>
                  <p>
                    Cadência:
                    <span className="ml-2 font-semibold text-red-500">
                      {exercise.cadence}
                    </span>
                  </p>
                  <p className="mt-5">
                    Observações:
                    <span className="ml-2 font-extralight italic text-foreground text-red-500">
                      {exercise?.observation || "Nenhuma observação"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
