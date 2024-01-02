import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { toast } from "react-toastify";
import { api } from "@/services/api";


const formSchama = z.object({
  email: z.string().email({
    message: "E-mail Inválido",
  }),
  password: z.string(),
});

export function FormLogin() {
   const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchama>>({
    resolver: zodResolver(formSchama),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchama>) => {
    try {
      await api.post("/login", data)
      toast.success("Logado com sucesso")
      navigate("/dashboard")
    }catch(error) {
      toast.error("E-mail ou senha inválidos")
      console.log("[LOGIN_ERROR]", error)
    }
  };

  return (
    <div className="p-4 space-y-2 max-w-xl mx-auto relative rounded-3xl">
      <Form {...form}>
        <h3 className="text-center font-bold text-xl leading-tight">Entrar</h3>
        <Button variant="ghost" className="absolute top-1 rounded-full w-10">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
        <Separator className="bg-zinc-100" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex flex-col gap-6 mt-10">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="border border-zinc-500"
                      type="email"
                      placeholder="Digite seu email"
                      autoComplete="current-email"
                      {...field}
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      placeholder="Digite sua senha"
                      className="border border-zinc-500"
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            Entrar
          </Button>
          <Separator className="bg-zinc-100" />
        </form>
      </Form>

      <div className="mt-10 flex justify-center">
        <Link to="/register" className="flex items-center gap-1">
          Não possui uma conta? <span className="text-base text-red-500"> Criar agora</span>
        </Link>
      </div>
    </div>
  );
}
