import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import QuizCards from "@/components/ui/QuizCards";
import { fetchQuiz } from "@/lib/actions/quiz.action";
import { questionType } from "@/lib/models/quiz.model";

interface QuizDataType {
  _id: string;
  name: string;
  questions: questionType[];
}

export default async function QuizPage() {
  const data = await fetchQuiz();
  const quizData: QuizDataType[] = JSON.parse(JSON.stringify(data));

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
            {quizData.map((quizItem) => (
              <QuizCards
                key={quizItem._id}
                quizId={quizItem._id}
                quizName={quizItem.name}
              />
            ))}
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
