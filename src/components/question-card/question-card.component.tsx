import { TQuestion } from "@/types/question";
import React from "react";
import Card from "../card/card.component";
import {
  EditIcon,
  MessageCircleQuestionIcon,
  MessageSquareQuoteIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { formatIsoDate } from "@/lib/utils";
import { Button } from "../ui/button";

const QuestionCard = ({
  question,
  isDashboardView = false,
  onActionClick,
}: {
  question: TQuestion;
  isDashboardView?: boolean;
  onActionClick?: (question: TQuestion) => void;
}) => {
  const isAnswered = question.status === "answered";
  const isUnanswered = question.status === "unanswered";
  const isArchived = question.status === "archived";
  return (
    <Card className="border w-full h-fit break-inside-avoid flex flex-col gap-1 p-2">
      <div className="flex justify-between items-start">
        <MessageCircleQuestionIcon className="text-primary/15" size={50} />
        {isDashboardView && (
          <div className="flex gap-2">
            {isUnanswered && (
              <div className="rounded-full bg-warning text-warning-foreground w-fit p-1 px-3 text-sm font-bold">
                غير مجاب
              </div>
            )}
            {isAnswered && (
              <div className="rounded-full bg-success text-success-foreground w-fit p-1 px-3 text-sm font-bold">
                مجاب
              </div>
            )}
            <Button
              size="smallIcon"
              className="flex-shrink-0"
              onClick={() => onActionClick?.(question)}
            >
              <EditIcon />
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col px-2 gap-1">
        <p className="text-lg text-primary font-semibold z-2">
          {question.question}
        </p>
        <MessageSquareQuoteIcon
          size={50}
          className="text-primary/15 -scale-x-100 ms-auto"
        />

        <p className="text-gray-500 z-2">{question.answer}</p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <time className="text-sm text-gray-500" dateTime={question.createdAt}>
          {formatIsoDate(question.createdAt, false)}
        </time>
      </div>
    </Card>
  );
};

export default QuestionCard;
