"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";

import { title } from "@/components/primitives";
import QuizCards from "@/components/ui/QuizCards";
import { fetchQuiz } from "@/lib/actions/quiz.action";
import { questionType } from "@/lib/models/quiz.model";

interface QuizDataType {
  _id: string;
  name: string;
  questions: questionType[];
}

const fetchAllQuiz = async () => {
  const data = await fetchQuiz()
  const quizData = JSON.parse(JSON.stringify(data))
  return quizData;
};

export default function QuizPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["quiz-server-action"],
    queryFn: fetchAllQuiz,
  });
  const quizData = data;

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
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" />
            Loading
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
