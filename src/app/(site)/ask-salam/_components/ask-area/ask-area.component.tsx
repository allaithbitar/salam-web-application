"use client";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn, getMaxMessage, getMinMessage } from "@/lib/utils";
import { addQuestion } from "@/server-actions/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const askQuestionSchema = z.object({
  question: z
    .string()
    .min(25, { message: getMinMessage(25) })
    .max(300, { message: getMaxMessage(300) }),
});

const QUESTION_THROTLE_TIME = 15;

const AskArea = () => {
  const [state, setState] = useState({
    message: "",
    isError: false,
  });

  const form = useForm({
    defaultValues: { question: "" },
    resolver: zodResolver(askQuestionSchema),
    mode: "onSubmit",
  });

  const handleAsk: SubmitHandler<typeof askQuestionSchema._type> = async ({
    question,
  }) => {
    const lastDateSent = localStorage.getItem("last_question_time");
    if (lastDateSent) {
      const minutesSinceLastQuestion = parseInt(
        (
          (new Date().getTime() - new Date(lastDateSent).getTime()) /
          (1000 * 60)
        ).toFixed(),
      );

      // can only send one question every 15 minute
      if (minutesSinceLastQuestion < QUESTION_THROTLE_TIME) {
        setState({
          message: `يمكن إرسال سؤال واحد فقط كل 15 دقيقة, تبقى ${QUESTION_THROTLE_TIME - minutesSinceLastQuestion} دقيقة`,
          isError: true,
        });
        return;
      }
    }
    try {
      await addQuestion(question);
      localStorage.setItem("last_question_time", new Date().toISOString());
      setState({
        message: "تم إرسال سؤالك بنجاح",
        isError: false,
      });
      form.reset({ question: "" });
    } catch (error: any) {
      setState({
        message: error?.message ?? "حصل خطأ ما",
        isError: true,
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      className="stack gap-2 relative"
      onSubmit={form.handleSubmit(handleAsk)}
    >
      <Textarea
        disabled={isSubmitting}
        placeholder="إكتب سؤالك هنا"
        rows={10}
        className="resize-none"
        {...form.register("question", { minLength: 5 })}
      />
      <div className="flex justify-between">
        <p className="text-destructive">
          {form.formState.errors.question?.message ?? " "}
        </p>
        <p className="text-gray-500">{form.watch("question").length} حرف</p>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        إرسال
      </Button>
      {state.message && (
        <p
          className={cn(
            "text-center",
            state.isError ? "text-destructive" : "text-green-600",
          )}
        >
          {" "}
          {state.message}
        </p>
      )}
      {isSubmitting && <LoadingOverlay />}
    </form>
  );
};

export default AskArea;
