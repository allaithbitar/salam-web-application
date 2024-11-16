"use server";

import { db } from "@/lib/drizzle/drizzle";
import { questions } from "@/lib/drizzle/schema";
import { TGetQuestionsPayload, TQuestion } from "@/types/question";
import { and, asc, desc, eq, ilike, or } from "drizzle-orm";

export const getQuestions = async ({
  status,
  search,
  order,
  pageSize,
  pageNumber,
}: TGetQuestionsPayload = {}) => {
  return db.query.questions.findMany({
    where: and(
      status ? eq(questions.status, status) : undefined,
      search ? or(ilike(questions.question, `%${search}%`)) : undefined,
    ),
    orderBy: [
      order == "dsc" ? desc(questions.createdAt) : asc(questions.createdAt),
    ],
    ...(pageSize && { limit: pageSize }),
    ...(pageNumber && pageSize && { offset: pageNumber * pageSize }),
  });
};

export const answerQuestion = async (question: TQuestion) =>
  db
    .update(questions)
    .set({ answeredAt: new Date().toISOString(), answer: question.answer })
    .where(eq(questions.id, question.id));

export const addQuestion = async (question: string) =>
  db.insert(questions).values({
    question,
  });
