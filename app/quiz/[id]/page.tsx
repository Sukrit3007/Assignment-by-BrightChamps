import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { title } from "@/components/primitives";
import { fetchQuizById } from "@/lib/actions/quiz.action";
import QuestionCards from "@/components/ui/QuestionCards";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const data = await fetchQuizById(params.id);
  const quizData = await JSON.parse(JSON.stringify(data))

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
