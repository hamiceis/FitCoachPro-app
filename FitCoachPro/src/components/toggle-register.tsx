import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FormRegister } from "./form-register.student";
import { FormRegisterTeacher } from "./form-register.teacher";

export function ToggleRegister() {
  return (
    <div className="w-full p-4">
      <Tabs
        defaultValue="student"
        className="flex flex-col justify-center"
      >
        <TabsList className="w-48 self-center border border-zinc-100">
          <TabsTrigger value="student">{`Aluno(a)`}</TabsTrigger>
          <TabsTrigger value="teacher">{`Professor(a)`}</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <FormRegister />
        </TabsContent>
        <TabsContent value="teacher">
          <FormRegisterTeacher />
        </TabsContent>
      </Tabs>
    </div>
  );
}
