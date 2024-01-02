import { Dispatch, SetStateAction } from "react";

export interface StudentProps {
  id: string;
  name: string;
  email: string
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  tel: string;
  gender: string;
  age: number;
  height: number;
  weigth: string | number | null;
  imc: String | number | null;
  training_level: string | null;
  conditioning_level: string | null;
  weekly_Frequency: string | null;
  goal: string | null;
  protocol_start_date: string | null;
  protocol_end_date: string | null;
  observations: string | null;
  professorId?: string | null;
}

export interface DataStudent {
  data?: StudentData
  setForceRender: Dispatch<SetStateAction<boolean>>
}
