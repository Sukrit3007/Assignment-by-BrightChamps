"use server";

import { revalidatePath } from "next/cache";


import Quiz, { questionType } from "../models/quiz.model";
import { dbConnect } from "../dbConnect";

export async function createQuiz({
  name,
  questions,
  path,
}: {
  name: string;
  questions: questionType[];
  path: string;
}) {
  try {
    await dbConnect();
    await Quiz.create({
      name,
      questions,
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`there is an error creating quiz: ${error.message}`);
  }
}

export interface quizWithIdType {
  _id: string;
  name: string;
  questions: questionType[];
}

export async function fetchQuiz(): Promise<quizWithIdType[]> {
  try {
    await dbConnect();
    const quiz = await Quiz.find();

    return quiz as quizWithIdType[];
  } catch (error: any) {
    throw new Error(`There is an error fetching quiz data: ${error.message}`);
  }
}

export async function fetchQuizById(id: string): Promise<quizWithIdType[]> {
  try {
    await dbConnect();
    const quiz = await Quiz.findById(id);

    return quiz as quizWithIdType[];
  } catch (error: any) {
    throw new Error(
      `There is an error fetching quiz questions: ${error.message}`,
    );
  }
}

export async function deleteQuizById(id: string, path: string): Promise<void> {
  try {
    await dbConnect();

    const result = await Quiz.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Quiz not found");
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(
      `There is an error deleting quiz questions: ${error.message}`,
    );
  }
}
