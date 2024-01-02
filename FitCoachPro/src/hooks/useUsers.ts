import { create } from "zustand"
import { StudentData } from "@/types/student.types"

interface UsersStore {
  users: StudentData[];
  setUsers:(newUsers: StudentData[]) => void;
  getUsers: () => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),
  getUsers: () => set((state) => ({ users: state.users}))
}))


//getUsers() é uma forma de pegar os dados diferente, mas não é necessário, basta usar const { users } = useUsersStore()