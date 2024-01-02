import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ButtonDeleteWorkout } from "@/components/button-deletedWorkout";

import { Pencil, Trash2, Plus } from "lucide-react";
import { FormExercise } from "./form-exercise";
import { Workouts } from "@/types/workout.types";

import { api } from "@/services/api";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface WorkoutCardProps {
  data: Workouts;
  index: number;
  setForceRender: Dispatch<SetStateAction<boolean>>
}

export const weekdays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export function WorkoutCard({ data, index, setForceRender }: WorkoutCardProps) {
  const deleteExercise = async (id: string)=> {
    try {
     const response = await api.delete(`/exercise/${data.id}/${id}`)
     toast.success(response.data.message)
     setForceRender(prevState => !prevState)
    } catch(error: any) {
      console.log(error.response.data)
      toast.error("Algo deu errado")
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-2 border border-zinc-100 hover:bg-zinc-900 cursor-pointer transition-colors relative">
          <div className="text-center flex flex-col font-light text-xs md:text-base">
            <span className="font-semibold">{index + 1}</span>
            <p>{weekdays[data.week_day]}</p>
          </div>

          <div className="text-center font-extrabold">
            <span className="text-primary font-semibold">
              Tipo: {data.type}
            </span>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className={cn("w-80 px-2 pt-1 pb-2 overflow-y-scroll",
      data.exercises.length > 0 ? "h-80" : "h-fit"
      )}>
        <ButtonDeleteWorkout 
        workoutId={data.id}
        studentId={data.studentId}
        setForceRender={setForceRender}
        />
        {data.exercises && data.exercises.map((exercise) => (
          <div
            className="px-2 pt-1 mt-2 flex flex-col gap-1 border border-zinc-100"
            key={exercise.id}
          >
            <div className="flex flex-wrap items-center justify-between">
              <FormExercise 
              actionType="Edit" 
              workoutId={data.id}
              exerciseId={exercise.id} 
              exerciseData={exercise} 
              setForceRender={setForceRender}>
                <Button className="p-3">
                  <Pencil size={16} />
                </Button>
              </FormExercise>

              <Button className="p-3" onClick={() => deleteExercise(exercise.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
            <Separator className="bg-zinc-100" />
            <span>Exercicio: {exercise.name_exercise}</span>
            <span>Repetições: {exercise.repetitions}</span>
            <span>Intervalo: {exercise.interval}</span>
            <span>Carga: {exercise.load}</span>
            <span>Cadencia: {exercise.cadence}</span>
            <span>Método: {exercise.method}</span>
            <p className="mt-4 italic text-muted-foreground">Observação: {exercise.observation || "Nenhuma observação"}</p>
          </div>
        ))}
        <div className="w-full mt-2">
          <FormExercise 
           actionType="Create"
           workoutId={data.id}
           setForceRender={setForceRender} >
            <Button className="w-full flex gap-4">
              <Plus />
              Adicionar Exercício
            </Button>
          </FormExercise>
        </div>
      </PopoverContent>
    
    </Popover>
  );
}
