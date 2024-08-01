import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { title } from "@/components/primitives";
import { fetchQuizById } from "@/lib/actions/quiz.action";
import QuestionCards from "@/components/ui/QuestionCards";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quizData = await fetchQuizById(params.id);

  return (
    <Card>
      <CardHeader>
        <h1 className={title({ size: "lg" })}>
          Take the{" "}
          <span className={title({ size: "lg", color: "blue" })}>Quiz!</span>
        </h1>
      </CardHeader>
      <CardBody>
        <QuestionCards quizQuestions={JSON.parse(JSON.stringify(quizData))} />
      </CardBody>
    </Card>
  );
}
