import { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

import { toast } from "react-toastify";

import { formatTel } from "@/lib/formatTel";

import { api } from "@/services/api";

import { ProfileStudentProps } from "@/types/profileData";
import { useAuthStore } from "@/hooks/useAuth";

const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    repassword: z.string().optional(),
    age: z.string().optional(),
    height: z.string().optional(),
    tel: z.string().optional(),
    gender: z.string().optional(),
    cref: z.string().optional(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "As senhas não coincidem",
    path: ["repassword"],
  });

const initialValues = {
  name: "",
  email: "",
  password: "",
  repassword: "",
  age: "",
  height: "",
  tel: "",
  gender: "",
  cref: "",
};

type Role = "user" | "admin";

export function Profile() {
  const { authToken } = useAuthStore()
  const [data, setData] = useState<ProfileStudentProps | null>(null);
  const [loading, setLoading] = useState(false);

  const role = authToken?.role as Role;

  const fetchData = async () => {
    try {
      if(role === "user") {
        const response = await api.get(`student/${authToken?.id}`);
        setData(response.data);
      } else {
        const response = await api.get(`teachers/${authToken?.id}`);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!authToken) {
      return 
    }
    
    fetchData();
  }, [authToken, loading]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const filterData: Record<string, string | number> = {};
    for (let [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== "") {
        filterData[key] =
          key === "height" || key === "age" ? Number(value) : value;
      }
    }

    try {
      if (role === "user") {
        await api.put(`student/${authToken?.id}`, filterData);
        toast.success("Dados atualizados com sucesso!");
      } else {
       await api.put(`teacher/${authToken?.id}`, filterData);
        toast.success("Dados atualizados com sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu erro ao atualizar os dados");
    } finally {
      form.reset();
      setLoading(prevState => !prevState);
    }
  };

  return (
    <div className="w-full mt-4 p-2 h-max space-y-4 rounded-lg bg-zinc-900/30 shadow-md">
      <h1 className="text-center text-2xl font-bold">Dados Pessoais</h1>

      <div className="w-full py-2 px-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-6"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="username"
                      disabled={isLoading}
                      className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                      placeholder={data?.name}
                      {...field}
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      autoComplete="email-current"
                      className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                      placeholder={data?.email}
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      autoComplete="new-password"
                      className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="repassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme a senha</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      autoComplete="new-password"
                      className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {role === "user" ? (
              <>
                <FormField
                  name="tel"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                          placeholder={formatTel(
                            data && data.tel
                              ? data.tel.toString()
                              : "" || "(11)99999-9999"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="age"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                          placeholder={data?.age.toString()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="height"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                          placeholder={data?.height.toString()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-zinc-100/10 ring:outline-none focus:ring-zinc-100 hover:cursor-pointer">
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Selecione seu sexo"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black rounded-md w-20">
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  name="cref"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cref</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          className="border border-zinc-100/10 ring:outline-none focus-visible:ring-zinc-100"
                          placeholder={data?.cref}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div></div>
              </>
            )}
            <Button
              disabled={isLoading}
              className="md:w-40"
              type="submit"
              variant="secondary"
            >
              Atualizar dados
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
