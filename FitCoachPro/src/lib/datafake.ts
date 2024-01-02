export type Exercise = {
  id: string
  name: string
  reps: number
  sets: number
}

export interface Workout {
  id: string;
  type: string;
  week_day: number;
  day_month: string;
  studentId: string;
  exercises: Exercise[]
}


export const arr: Workout[] = [
  {
    id: "1",
    type: "A",
    week_day: 1,
    day_month: "2023-10-26T10:00:00Z",
    studentId: "student1",
    exercises: [
      {
        id: "1",
        name: "Push-up",
        reps: 15,
        sets: 3,
      },
      {
        id: "2",
        name: "Squats",
        reps: 12,
        sets: 4,
      },
    ],
  },
  {
    id: "2",
    type: "B",
    week_day: 2,
    day_month: "2023-10-27T11:00:00Z",
    studentId: "student2",
    exercises: [
      {
        id: "3",
        name: "Bench Press",
        reps: 10,
        sets: 3,
      },
      {
        id: "4",
        name: "Deadlift",
        reps: 8,
        sets: 4,
      },
    ],
  },
  {
    id: "3",
    type: "C",
    week_day: 3,
    day_month: "2023-10-28T09:30:00Z",
    studentId: "student3",
    exercises: [
      {
        id: "5",
        name: "Pull-up",
        reps: 12,
        sets: 3,
      },
      {
        id: "6",
        name: "Leg Press",
        reps: 15,
        sets: 3,
      },
    ],
  },
  {
    id: "4",
    type: "D",
    week_day: 4,
    day_month: "2023-10-30T14:00:00Z",
    studentId: "student1",
    exercises: [
      {
        id: "7",
        name: "Dumbbell Curl",
        reps: 12,
        sets: 3,
      },
      {
        id: "8",
        name: "Leg Curl",
        reps: 10,
        sets: 3,
      },
    ],
  },
  {
    id: "5",
    type: "E",
    week_day: 5,
    day_month: "2023-11-01T13:45:00Z",
    studentId: "student2",
    exercises: [
      {
        id: "9",
        name: "Lat Pulldown",
        reps: 12,
        sets: 3,
      },
      {
        id: "10",
        name: "Lunges",
        reps: 15,
        sets: 3,
      },
    ],
  },
  {
    id: "1",
    type: "A",
    week_day: 1,
    day_month: "2023-10-26T10:00:00Z",
    studentId: "student1",
    exercises: [
      {
        id: "1",
        name: "Push-up",
        reps: 15,
        sets: 3,
      },
      {
        id: "2",
        name: "Squats",
        reps: 12,
        sets: 4,
      },
    ],
  }
];
