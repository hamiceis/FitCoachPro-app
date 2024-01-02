import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "react-toastify";
import axios from "axios";
import { api } from "@/services/api";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Nome inválido",
    })
    .transform(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    )
    .refine((name) => name.trim() !== "", {
      message: "Nome é obrigatório",
    }),
  email: z
    .string()
    .email("Email inválido")
    .refine((email) => email.trim() !== "", {
      message: "Email é obrigatório",
    }),
  password: z.string().min(8, {
    message: "A Senha deve conter no mínimo 8 caracteres",
  }),
  cref: z
    .string()
    .min(4, {
      message: "CREF inválido",
    })
    .refine((cref) => cref.trim() !== "", {
      message: "CREF é obrigatório",
    }),
});

export function FormRegisterTeacher() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cref: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await api.post("/register/teacher", data);
      toast.success("Professor cadastrado com sucesso");
      navigate("/login");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        toast.error(message);
      } else {
        toast.error("Algo deu errado");
        console.log("[REGISTER_FORM_ERROR]", error);
      }
    }
  };

  return (
    <div className="p-4 space-y-2 max-w-xl mx-auto relative rounded-3xl">
      <Form {...form}>
        <h3 className="text-lg font-medium text-center">Formulário</h3>
        <Button variant="ghost" className="absolute top-1 rounded-full w-10">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <Separator className="bg-zinc-100" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      autoComplete="username"
                      placeholder="Digite seu nome completo"
                      {...field}
                      className="border border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      autoComplete="email"
                      placeholder="Digite seu email"
                      {...field}
                      className="border border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      autoComplete="current-password"
                      type="password"
                      placeholder="Digite uma senha com minimo 8 caracteres"
                      {...field}
                      className="border border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cref"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>CREF</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Digite seu Nº CREF"
                      {...field}
                      className="border border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="bg-zinc-100" />
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
