import { StatsInfo } from "./stats-info";
import { Button } from "@/components/ui/button";
import { FormDetailsUser } from "@/components/form-details-user";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataStudent } from "@/types/student.types";
import { format } from "date-fns";
import { formatTel } from "@/lib/formatTel";


const conditioning: Record<number, string> = {
  0: "Iniciante",
  1: "Intermédio",
  2: "Avançado"
}


export function HeaderStudent({ data, setForceRender }: DataStudent) {
  const navigate = useNavigate();
  const imageSrc = data?.gender === "F" ? "/woman-vetor.jpg" : "/man-vetor.jpg";

  return (
    <header className="relative h-max md:h-max px-10 py-5 flex items-center justify-center md:gap-28 gap-32 bg-black">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-2 bg-secondary/10 rounded-full p-2 hover:bg-secondary"
      >
        <ArrowLeft size={20} />
      </Button>

      <div className="md:ml-10 lg:ml-0">
        <img
          className="rounded-full w-20 h-20 border border-zinc-100"
          src={imageSrc}
          alt="foto aleatoria"
        />
      </div>

      <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-y-5">
        <StatsInfo
          span="Nome"
          info={data?.name || "User"}
          className="capitalize"
        />
        <StatsInfo span="Idade" info={String(data?.age) ?? "Não informado"} />
        <StatsInfo span="Email" info={data?.email || "Não definido"} />
        <StatsInfo span="Sexo" info={data?.gender || "Não definido"} />
        <StatsInfo
          span="Altura"
          info={`${Number(data?.height) / 100}cm` || "Não definido"}
        />
        <StatsInfo span="Peso" info={String(data?.weigth || "Não definido")} />
        <StatsInfo span="Telefone" info={data?.tel ? formatTel(data.tel) : "Não informado"} />
        <StatsInfo span="IMC" info={String(data?.imc ?? "Não definido")} />
        <StatsInfo
          span="Nivel de treinamento"
          info={(data && data.conditioning_level !== undefined) ? conditioning[Number(data.conditioning_level)] : "Não definido"}

        />
        <StatsInfo span="Meta" info={data?.goal || "Não definido"} />
        <StatsInfo
          span="Data de inicio do protocolo"
          info={
            data?.protocol_start_date
              ? format(new Date(data.protocol_start_date), "dd-MM-yyyy")
              : "Não definido"
          }
        />
        <StatsInfo
          span="Data de fim do protocolo"
          info={
            data?.protocol_end_date
              ? format(new Date(data.protocol_end_date), "dd-MM-yyyy")
              : "Não definido"
          }
        />
      </div>
      <FormDetailsUser studentId={data?.id}  forceRender={setForceRender} />
    </header>
  );
}
