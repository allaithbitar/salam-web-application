"use client";
import QuestionCard from "@/components/question-card/question-card.component";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { TQuestion } from "@/types/question";
import React, { useState } from "react";
import AnswerQuestionModal from "./_components/answer-question-modal.component";
import AskSalamQuestions from "./_components/ask-salam-questions/ask-salam-questions.component";

const QuestionsPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<TQuestion | null>(
    null,
  );

  const handleActionClick = (question: TQuestion) => {
    setSelectedQuestion(question);
  };
  const handleOnClose = async (didUpdate?: boolean) => {
    if (didUpdate) {
      // await refetch();
    }
    setSelectedQuestion(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <AskSalamQuestions isDashboardView onActionClick={handleActionClick} />
      {selectedQuestion && (
        <AnswerQuestionModal
          question={selectedQuestion}
          onClose={handleOnClose}
        />
      )}
    </div>
  );
};

export default QuestionsPage;
