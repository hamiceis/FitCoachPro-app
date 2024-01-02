import { cn } from "@/lib/utils";

interface StatsInfoProps {
  span: string
  info: string
  className?: string
}

export function StatsInfo({ span, info, className }: StatsInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-red-500 text-xs ">{span}:</span>
      <h2 className={cn("italic font-medium text-xs md:text-base", className)}>{info}</h2>
    </div>
  );
}
