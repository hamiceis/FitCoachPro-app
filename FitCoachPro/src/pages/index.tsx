import { Navbar } from "@/components/navbar";
import { Phone } from "lucide-react";

export function Home() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-24 px-20 bg-zinc-800 flex justify-between items-center relative">
        <a className="text-2xl font-medium" href="#">
          FitCoach
          <span className="font-bold text-primary">PRO</span>
        </a>
        <Navbar />
      </header>

      <main className="flex flex-1 justify-center items-center gap-20">
        <div className="absolute -z-50 opacity-10 lg:relative lg:opacity-100">
          <img src="/casal-fit.svg" alt="logo" />
        </div>

        <div className="flex mx-10 flex-col items-center max-w-xl gap-10">
          <section className="text-center space-y-10">
            <h1 className="text-4xl leading-tight font-semibold tracking-tight mb-4">
              MONTE TREINOS PERSONALIZADOS
            </h1>
            <span className="text-5xl font-extrabold italic">EM SEGUNDOS</span>

            <p className="text-xl tracking-wide">
              Tenha na Palma da Mão Exercícios Eficientes e Alunos Encantados Ao
              Redor do Mundo Com Poucos Cliques.
            </p>
          </section>

          <a
            className="px-4 py-4 lg:py-6 flex items-center gap-2 lg:w-1/2 text-center font-bold text-lg rounded-full bg-green-600 hover:bg-green-700 transition-colors"
            href="https://wa.me/+5581999999999"
            target="_blank"
          >
            Duvidas entre em contato
            <Phone size={24} />
          </a>
        </div>
      </main>
    </div>
  );
}
