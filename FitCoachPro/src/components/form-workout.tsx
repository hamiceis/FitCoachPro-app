import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { toast } from "react-toastify"

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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Dispatch, SetStateAction, useState } from "react";
import { api } from "@/services/api";

type FormData = {
  type?: string;
  weekDay?: number;
  dateMonth?: string;
  exerciseName?: string;
  repetitions?: string;
  interval?: string;
  method?: string;
  load?: number;
  cadence?: string;
  observation?: string;
  [key: string]: string | number | Date | undefined
}


const formSchema = z.object({
  type: z.string().min(1, {
    message: "Informe o tipo de treino",
  }),
  weekDay: z.string().min(1, {
    message: "Escolha o dia da semana",
  }),
  dayMonth: z.date().optional(),
  exerciseName: z.string().min(1, {
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

const types = ["A", "B", "C", "D", "F"];
const days = [0, 1, 2, 3, 4, 5, 6];
const weekDays = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

interface FormWorkoutProps {
  studentId: string;
  forceRender: Dispatch<SetStateAction<boolean>>
}

export function FormWorkout({ studentId, forceRender }: FormWorkoutProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      weekDay: "",
      dayMonth: new Date(),
      exerciseName: "",
      repetitions: "",
      interval: "",
      method: "",
      load: "",
      cadence: "",
      observation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data: FormData = {}
    for(let [key, value] of Object.entries(values)) {
      if(key === "weekDay") {
        data[key] = parseFloat(value as string) 
      } else if (key === "dayMonth") {
        data.dateMonth = (value as Date).toISOString()
      } else {
        data[key] = value
      }
    }

    try {
      await api.post(`/workout/${studentId}`, data)
      toast.success("Treino criado com sucesso")
      form.reset();
    } catch (error: any) {
      console.log(error.response)
      toast.error("Something went wrong")
    } finally {
    forceRender(prevState => !prevState)
    setModalOpen(false)
    }
  }

  const isLoading = form.formState.isSubmitting

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
      <DialogTrigger asChild className="text-xs md:text-sm absolute right-0">
        <Button variant="secondary">Novo treino</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px] h-full">
        <DialogHeader>
          <DialogTitle className="text-center">Novo treino</DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-2">
          <div className="h-full p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 pb-10"
              >
                <div className="space-y-8 col-span-2">
                  <div>
                    <h3 className="text-center text-muted-foreground">
                      Preencha os campos do novo treino
                    </h3>
                  </div>

                  <Separator className="bg-zinc-100/10 w-full" />
                  <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-10">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Tipo</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Selecione o tipo de treino"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {types.map((type, index) => (
                                <SelectItem key={type + index} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weekDay"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Dia da semana</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Selecione o dia da semana"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {days.map((day, index) => (
                                <SelectItem
                                  key={day + index}
                                  value={day.toString()}
                                >
                                  {weekDays[day as keyof typeof weekDays]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="exerciseName"
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
                      name="dayMonth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>
                            Escolha data do Treino "Opicional"
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Escolha uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                            <Input placeholder="5.4" {...field} />
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
                  Criar
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
