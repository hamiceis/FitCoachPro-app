import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import { api } from "@/services/api";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Exercises } from "@/types/exercise.type";

const formSchema = z.object({
  name_exercise: z.string().min(1, {
    message: "Escreva o nome do exercício",
  }),
  repetitions: z.string().min(1, {
    message: "Informe o número de repetições",
  }),
  interval: z.string().min(1, {
    message: "Informe o intervalo",
  }),
  method: z.string().optional(),
  load: z.string().min(1, {
    message: "Informe a carga",
  }),
  cadence: z.string().min(1, {
    message: "Informe a cadência",
  }),
  observation: z.string().optional(),
});

type ActionTypeProps = "Create" | "Edit";

interface FormExerciseProps {
  children?: ReactNode;
  actionType?: ActionTypeProps;
  workoutId?: string;
  exerciseId?: string;
  exerciseData?: Omit<Exercises, 'id'>;
  setForceRender: Dispatch<SetStateAction<boolean>>
}

const initialForm = {
  name_exercise: "",
  repetitions: "",
  interval: "",
  method: "",
  load: "",
  cadence: "",
  observation: "",
};

export function FormExercise({ 
  children, 
  actionType, 
  workoutId, 
  exerciseId, 
  exerciseData, 
  setForceRender 
}: FormExerciseProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isEditing = actionType === "Edit";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: (
      isEditing 
      ? {...exerciseData, load: String(exerciseData?.load)} 
      : initialForm
      ) as z.infer<typeof formSchema>
  });

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if(isEditing) {
        const response = await api.patch(`/exercise/${workoutId}/${exerciseId}`, {
        ...values, 
        exerciseName: values.name_exercise,
      })
        toast.success(response.data.message)
        form.reset()
      } else {
      const response = await api.post(`/exercise/${workoutId}`, {
        ...values, 
        exerciseName: values.name_exercise,
        load: parseFloat(values.load)
      })
      toast.success(response.data.message)
      form.reset()
    }
    }catch(error: any) {
      console.log(error.response)
      toast.error("Algo deu errado")
    } finally {
      setModalOpen(false)
      setForceRender((prevState) => !prevState)
    }
  };

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
      <DialogTrigger className="text-xs md:text-sm" asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-[600px] h-full md:h-max">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEditing ? "Editar Exercício" : "Criar Exercício"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-2">
          <div className="h-full px-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pb-10"
              >
                <div className="space-y-4">
                  <Separator className="bg-zinc-100/10 w-full" />

                  <FormField
                    control={form.control}
                    name="name_exercise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do exercicio</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Informe o nome do exercício"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="repetitions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Séries e repetições</FormLabel>
                          <FormControl>
                            <Input placeholder="4X10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intervalo</FormLabel>
                          <FormControl>
                            <Input placeholder="30s" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Método</FormLabel>
                          <FormControl>
                            <Input placeholder="Dropset" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="load"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carga</FormLabel>
                          <FormControl>
                            <Input placeholder="10.4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cadence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cadência</FormLabel>
                          <FormControl>
                            <Input placeholder="Lenta" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="observation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observação</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder="Adicione uma observação sobre esse exercicío 'Opicional' "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="bg-zinc-100/10 w-full" />
                <Button
                 type="submit" 
                 className="w-full"
                 disabled={isLoading}
                 >
                  {isEditing ? "Editar" : "Criar"}
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
