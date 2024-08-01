
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import QuizCards from "@/components/ui/QuizCards";
import { fetchQuiz } from "@/lib/actions/quiz.action";

export default async function QuizPage() {
  const quizData = await fetchQuiz();

  return (
    <div>
      {quizData.length > 0 ? (
        <Card>
          <CardHeader>
            <h1 className={title({ size: "lg" })}>
              Take the{" "}
              <span className={title({ size: "lg", color: "blue" })}>
                Quiz!
              </span>
            </h1>
          </CardHeader>
          <CardBody>
            <QuizCards quiz={JSON.parse(JSON.stringify(quizData))} />
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <h1 className={title({ size: "lg" })}>
              No Quiz{" "}
              <span className={title({ size: "lg", color: "blue" })}>
                Found!
              </span>
            </h1>
          </CardHeader>
          <CardBody>
            <Button as={Link} color="primary" href="/create" variant="light">
              Create Quiz
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
