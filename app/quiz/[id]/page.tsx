"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@nextui-org/skeleton";

import { title } from "@/components/primitives";
import { fetchQuizById } from "@/lib/actions/quiz.action";
import QuestionCards from "@/components/ui/QuestionCards";
import { quizWithIdType } from "@/lib/actions/quiz.action";

const getQuizById = async (id: string): Promise<quizWithIdType> => {
  const quizData = await fetchQuizById(id);
  const plainQuizData = JSON.parse(JSON.stringify(quizData));

  return plainQuizData;
};

export default function QuizPage({ params }: { params: { id: string } }) {
  const { data: quizData, isLoading } = useQuery<quizWithIdType>({
    queryKey: ["quiz", params.id],
    queryFn: () => getQuizById(params.id),
  });

  if (isLoading) {
    return (
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-12 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    );
  }

  if (!quizData) {
    return <div>Quiz not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <h1 className={title({ size: "lg" })}>
          Test Your{" "}
          <span className={title({ size: "lg", color: "blue" })}>Brain!</span>
        </h1>
      </CardHeader>
      <CardBody>
        <QuestionCards quizQuestions={quizData} />
      </CardBody>
    </Card>
  );
}
