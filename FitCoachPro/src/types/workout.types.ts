import { Exercises } from "./exercise.type";

export interface Workouts {
  id: string;
  type: string;
  week_day: number;
  day_month: string;
  studentId: string;
  exercises: Exercises[]
}