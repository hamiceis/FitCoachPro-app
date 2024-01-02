import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface ButtonDeleteProps {
  studentId: string
  workoutId: string
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>
}

export function ButtonDeleteWorkout({ studentId, workoutId, setForceRender}: ButtonDeleteProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const deletedWorkout = async (): Promise<void>  => {
    try {
      setLoading(true)
      const response = await api.delete(`/workout/${studentId}/${workoutId}`)
      toast.success(response.data.message)
    }catch(error: any) {
      console.log(error.response)
      toast.error("Algo deu errado!")
    } finally {
      setLoading(false)
      setForceRender(prevState => !prevState)
    }
  } 

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full gap-4">
          <Trash2 size="16" />
          Remover Treino
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-96 md:w-full">

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl">Deletar treino</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center py-4">
            <span className="text-zinc-100">Você tem certeza que deseja excluir esse treino?</span>
            <span className="text-red-500 font-bold ml-2">
              Está ação é irreversível, e deletará todos os exercícios.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
          className="text-zinc-100 font-bold"
          onClick={deletedWorkout}
          disabled={loading}
          >
            Sim, tenho certeza
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}
