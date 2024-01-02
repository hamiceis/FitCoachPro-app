import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useAuthTokenContext } from "@/hooks/useAuthToken";

import { SendHorizonal, ShieldAlert } from "lucide-react";
import { api } from "@/services/api";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Informe um email válido",
    })
    .min(1, {
      message: "Email inválido",
    }),
});

type Role = "user" | "admin";

export function InvitePage() {
  const { authToken } = useAuthTokenContext();
  const { toast } = useToast();

  const role = authToken?.role as Role;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  if(!authToken) {
    return (
      <div>
        Carregando
      </div>
    )
  }

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (role === "user") {
        await api.post(`student/connect/${authToken?.id}`, data);
        toast({
          title: "Solicitação enviada para o professor",
          type: "background",
          action: <SendHorizonal size={16} />,
        });
      } else {
        await api.post(`teacher/connect/${authToken?.id}`, data);
        toast({
          title: "Aluno cadastrado a sua lista",
          type: "background",
          action: <SendHorizonal size={16} />,
        });
      }
    } catch (error: any) {
      console.error("Erro ao processar a solicitação:", error.response.data);
      toast({
        title: error.response.data.message,
        variant: "destructive",
        action: <ShieldAlert size={16} />
      })
    } finally {
      form.reset();
    }
  };
  
  return (
    <div className="h-[32.3rem] md:h-[32.4rem] flex items-center justify-center">
      <div className="px-4 py-6 w-[25rem] rounded-lg flex flex-col items-center bg-zinc-900/30 shadow-md">
        <h1 className="text-base font-semibold text-zinc-100">
          Informe o <span className="text-primary text-base">Email</span> do seu{" "}
          {role === "user" ? "professor" : "aluno"} para adicionar
        </h1>

        <div className="w-full">
          <Form {...form}>
            <form
              className="flex items-center justify-center gap-2"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center gap-2 relative">
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        className=" border-zinc-100/10 focus-visible:ring-zinc-100"
                        placeholder="email@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute top-9 left-12" />
                  </FormItem>
                )}
              />
              <Button className="self-end" type="submit">
                Enviar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
