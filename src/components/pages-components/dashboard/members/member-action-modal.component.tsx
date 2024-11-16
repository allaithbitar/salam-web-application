import ControlledInput from "@/components/controlled/controller-input.component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetMemberByIdQuery } from "@/lib/react-query/queries/member.queries";
import { getMinCountMessage, getRequiredMessage } from "@/lib/utils";
import { createNewMember } from "@/server-actions/members";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const addMemberSchema = z.object({
  displayName: z.string().min(1, { message: getRequiredMessage() }),
  email: z.string().email({ message: "البريد الالكتروني غير صالح" }),
  password: z.string().min(5, { message: getMinCountMessage(5) }),
});

const editMemberForm = z.object({
  displayName: z.string().min(1, { message: getRequiredMessage() }),
  email: z.string().email({ message: "البريد الالكتروني غير صالح" }),
  password: z.string().min(5, { message: getMinCountMessage(5) }),
});

type TAddMemberForm = typeof addMemberSchema._type;

const MemberActionModal = ({
  memberId,
  onOpenChange,
}: {
  memberId: number | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const { data: memberData, isFetching: isFetchingMemberData } =
    useGetMemberByIdQuery(memberId);

  const isAddingNewMember = memberId === 0;

  const form = useForm<TAddMemberForm>({
    resolver: zodResolver(addMemberSchema),
    mode: "onChange",
    defaultValues: { displayName: "", email: "" },
  });

  const handleAddMember = async (values: TAddMemberForm) => {
    await createNewMember(values);
  };

  useEffect(() => {
    if (memberData) {
      form.reset({
        email: memberData.email,
        displayName: memberData.displayName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData]);

  return (
    <Dialog open={memberId !== null} onOpenChange={onOpenChange} modal={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isAddingNewMember ? "إضافة عضو جديد" : "تعديل عضو"}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form
            className="flex flex-col gap-2 relative"
            onSubmit={form.handleSubmit(handleAddMember)}
          >
            <ControlledInput
              control={form.control}
              name="displayName"
              label="الاسم"
            >
              {({ field }) => <Input {...field} />}
            </ControlledInput>
            <ControlledInput
              control={form.control}
              name="email"
              label="البريد الالكتروني"
            >
              {({ field }) => <Input {...field} />}
            </ControlledInput>
            <ControlledInput
              control={form.control}
              name="password"
              label="كلمة المرور"
            >
              {({ field }) => <Input {...field} />}
            </ControlledInput>

            <Button disabled={!form.formState.isValid} type="submit">
              {isAddingNewMember ? "إضافة" : "حفظ"}
            </Button>
          </form>
        </Form>
        {/* {isLoading && <LoadingOverlay />} */}
      </DialogContent>
    </Dialog>
  );
};

export default MemberActionModal;
