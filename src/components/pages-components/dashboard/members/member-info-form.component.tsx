import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../shared/form-section.component";
import { Form } from "@/components/ui/form";
import { TMember } from "@/types/member";
import ControlledInput from "@/components/controlled/controller-input.component";
import { z } from "zod";
import { getRequiredMessage } from "@/lib/utils";
import { members } from "@/lib/drizzle/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const memberInfoForm = z.object({
  displayName: z.string().min(1, { message: getRequiredMessage() }),
  email: z.string().min(1, { message: getRequiredMessage() }),
  about: z.string(),
  whatsAppNo: z.number(),
  facebookUrl: z.string(),
  instagram: z.string(),
  telegram: z.string(),
  linkedinUrl: z.string(),
});

type TMemberInfoFormSchema = typeof memberInfoForm._type;

const MemberInfoForm = ({ member }: { member: TMember }) => {
  const form = useForm<TMemberInfoFormSchema>();
  const inputs = [
    {
      type: "text",
      name: "displayName",
      label: "الاسم",
    },
    {
      type: "text",
      name: "email",
      label: "البريد الالكتروني",
    },
    {
      type: "textarea",
      name: "about",
      label: "نبذة",
    },
    {
      type: "text",
      name: "facebookUrl",
      label: "رابط حساب الفيسبوك",
    },
    {
      type: "text",
      name: "instagram",
      label: "رابط حساب الانستغرام",
    },
    {
      type: "text",
      name: "whatsAppNo",
      label: "رقم الواتس اب",
    },
    {
      type: "text",
      name: "telegram",
      label: "اسم معرف التيليغرام",
    },
    {
      type: "text",
      name: "linkedinUrl",
      label: "رابط حساب اللينكد ان",
    },
  ];

  useEffect(() => {
    form.reset({
      displayName: member.displayName,
      email: member.email,
      about: member.about,
    });
  }, [member, form]);

  return (
    <FormSection label="المعلومات">
      <Form {...form}>
        <form className="flex flex-col gap-3">
          {inputs.map((i) => {
            return (
              <ControlledInput
                label={i.label}
                control={form.control}
                name={i.name as any}
                key={i.name}
              >
                {({ field }) => {
                  switch (i.type) {
                    case "textarea": {
                      return (
                        <Textarea
                          value={field.value}
                          onChange={field.onChange}
                        />
                      );
                    }
                    default: {
                      return (
                        <Input value={field.value} onChange={field.onChange} />
                      );
                    }
                  }
                }}
              </ControlledInput>
            );
          })}
        </form>
      </Form>
    </FormSection>
  );
};

export default MemberInfoForm;
