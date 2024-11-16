import { getMinCountMessage, getRequiredMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordFormSchema = z
  .object({
    oldPassword: z.string().min(1, { message: getRequiredMessage() }),
    newPassword: z.string().min(5, { message: getMinCountMessage(5) }),
    confirmNewPassword: z.string(),
  })
  .superRefine((values, schema) => {
    if (values.newPassword !== values.confirmNewPassword) {
      schema.addIssue({
        message: "لا تطابق كلمة المرور الجديدة",
        code: z.ZodIssueCode.custom,
        path: ["confirmNewPassword"],
      });
    }
  });
const MemberPasswordForm = () => {
  const {} = useForm({
    resolver: zodResolver(passwordFormSchema),
  });
  return <div>MemberPasswordForm</div>;
};

export default MemberPasswordForm;
