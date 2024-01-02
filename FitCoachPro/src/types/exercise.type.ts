export interface Exercises {
  id: string
  name_exercise: string;
  repetitions: string;
  interval: string;
  method: string | null
  load: number;
  cadence: string;
  observation: string;
  workoutId: string
}