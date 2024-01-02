import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, FileEdit } from "lucide-react";

import { toast } from "react-toastify";

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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { api } from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  weight?: string;
  imc?: number;
  protocol_start_date?: Date;
  protocol_end_date?: Date;
  goal?: string;
  conditioning_level?: number;
  training_level?: string;
  weekly_Frequency?: string;
  [key: string]: string | number | Date | undefined;
};

const formSchema = z.object({
  weight: z.string().optional(),
  imc: z.string().optional(),
  conditioning_level: z.string().optional(),
  goal: z.string().optional(),
  protocol_start_date: z.date().optional(),
  protocol_end_date: z.date().optional(),
});

interface FormWorkoutProps {
  studentId?: string;
  forceRender: Dispatch<SetStateAction<boolean>>;
}

const levels = ["Iniciante", "Intermédio", "Avançado"];

export function FormDetailsUser({ studentId, forceRender }: FormWorkoutProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "",
      goal: "",
      imc: "",
      conditioning_level: "",
      protocol_end_date: new Date(),
      protocol_start_date: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data: FormData = {};
    for (let [key, value] of Object.entries(values)) {
      if (key === "protocol_start_date" || key === "protocol_end_date") {
        data[key as string] = (value as Date).toISOString();
      }
      if (key === "conditioning_level") {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }

    try {
      await api.patch(`/teacher/student/${studentId}`, data);
      toast.success("Informações adicionais alterada");
      form.reset();
    } catch (error: any) {
      console.log(error.response);
      toast.error("Something went wrong");
    } finally {
      forceRender((prevState) => !prevState);
      setModalOpen(false);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
      <DialogTrigger
        asChild
        className="text-xs md:text-sm absolute left-4  bottom-4"
      >
        <Button variant="default">
          <FileEdit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px] h-full">
        <DialogHeader>
          <DialogTitle className="text-center">
            Informações adicionais
          </DialogTitle>
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
                      Preencha as informações adicioanais do aluno
                    </h3>
                  </div>

                  <Separator className="bg-zinc-100/10 w-full" />
                  <div className="grid grid-cols-2 md:justify-center items-center gap-4 md:gap-10">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Peso</FormLabel>
                          <FormControl>
                            <Input placeholder="66.4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imc"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>IMC</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Informe o imc do aluno"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Informe a meta do aluno"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="conditioning_level"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Nivel de condicionamento</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Selecione o tipo de condicionamento"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {levels.map((type, index) => (
                                <SelectItem
                                  key={type + index}
                                  value={String(index)}
                                >
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="protocol_start_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>
                            Data do inicio do protocolo "Opicional"
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
                      name="protocol_end_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>
                            Data de fim do protocolo "Opicional"
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
                  </div>
                </div>
                <Separator className="bg-zinc-100/10 w-full" />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Concluído
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
