import ControlledInput from "@/components/controlled/controller-input.component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getRequiredMessage } from "@/lib/utils";
import { answerQuestion } from "@/server-actions/questions";
import { TQuestion } from "@/types/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const answerQuestionFormSchema = z.object({
  answer: z.string().min(0, { message: getRequiredMessage() }),
});

type TAnswerQuestionFormSchema = typeof answerQuestionFormSchema._type;

const AnswerQuestionModal = ({
  question,
  onClose,
}: {
  question: TQuestion;
  onClose: (didUpdate?: boolean) => void;
}) => {
  const form = useForm<TAnswerQuestionFormSchema>({
    defaultValues: { answer: question.answer },
    resolver: zodResolver(answerQuestionFormSchema),
  });
  const { toast } = useToast();

  const handleAnswerQuestion: SubmitHandler<
    TAnswerQuestionFormSchema
  > = async ({ answer }) => {
    try {
      await answerQuestion({ ...question, answer });
      toast({
        variant: "success",
        title: "تم حفظ التغيرات بنجاح",
      });
      return onClose(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "حصل خطأ ما",
        description: error?.message ?? "",
      });
    }
  };

  console.log(form.formState.isSubmitting);

  return (
    <Dialog open={!!question} onOpenChange={() => onClose()} modal={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">الإجابة عن سؤال</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="overflow-auto max-h-[80vh] flex flex-col gap-2 relative">
          <p className="font-bold line-clamp-[15] overflow-auto">
            {question.question}
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-2 relative"
              onSubmit={form.handleSubmit(handleAnswerQuestion)}
            >
              <ControlledInput
                control={form.control}
                name="answer"
                label="الإجابة"
              >
                {({ field }) => (
                  <Textarea rows={10} className="resize-none" {...field} />
                )}
              </ControlledInput>

              <Button disabled={!form.formState.isValid} type="submit">
                حفظ
              </Button>
            </form>
          </Form>
          {form.formState.isSubmitting && <LoadingOverlay />}
        </div>
        {/* {isLoading && <LoadingOverlay />} */}
      </DialogContent>
    </Dialog>
  );
};
export default AnswerQuestionModal;
