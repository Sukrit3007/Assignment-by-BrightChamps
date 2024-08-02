"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@nextui-org/skeleton";

import { title } from "@/components/primitives";
import QuizCards from "@/components/ui/QuizCards";
import { fetchQuiz } from "@/lib/actions/quiz.action";
import { questionType } from "@/lib/models/quiz.model";

interface QuizDataType {
  _id: string;
  name: string;
  questions: questionType[];
}

const getAllQuiz = async () => {
  return await fetchQuiz();
};

export default function QuizPage() {
  const { data: quizData, isLoading } = useQuery({
    queryKey: ["quiz-server-action"],
    queryFn: getAllQuiz,
  });

  return (
    <Card>
      <CardHeader>
        <h1 className={title({ size: "lg" })}>
          Take the{" "}
          <span className={title({ size: "lg", color: "blue" })}>Quiz!</span>
        </h1>
      </CardHeader>
      <CardBody>
        {quizData?.map((quizItem: QuizDataType) => (
          <QuizCards
            key={quizItem._id}
            quizId={quizItem._id}
            quizName={quizItem.name}
          />
        ))}
        {isLoading ? (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
