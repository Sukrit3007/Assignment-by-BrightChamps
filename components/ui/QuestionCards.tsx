"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { CheckIcon, ChevronRightIcon, HomeIcon, RotateCw } from "lucide-react";
import { Progress } from "@nextui-org/progress";
import { Link } from "@nextui-org/link";

import { ResultGraph } from "./ResultGraph";

import { quizWithIdType } from "@/lib/actions/quiz.action";

interface Props {
  quizQuestions: quizWithIdType;
}

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

const QuestionCards: React.FC<Props> = ({ quizQuestions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });
  const totalQuestionTime = quizQuestions.questions[currentQuestion].timeLimit;
  const [timeLeft, setTimeLeft] = useState<number>(totalQuestionTime);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    // Reset timer for the new question
    setTimeLeft(totalQuestionTime);
    setTimerExpired(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerExpired(true);
          clearInterval(timer);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, totalQuestionTime]);

  useEffect(() => {
    if (timerExpired && !checked) {
      handleNextQuestion();
    }
  }, [timerExpired, checked]);

  const handleSelectedOption = (option: string, index: number) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    setSelectedAnswer(
      option === quizQuestions.questions[currentQuestion].correctOption,
    );
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev,
              score:
                prev.score + quizQuestions.questions[currentQuestion].marks,
              correctAnswer: prev.correctAnswer + 1,
            }
          : {
              ...prev,
              wrongAnswer: prev.wrongAnswer + 1,
            },
      );
    }

    setSelectedAnswerIndex(null);
    setChecked(false);

    if (currentQuestion < quizQuestions.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <motion.div
      animate="show"
      className="flex flex-col gap-6 items-center"
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      viewport={{ once: true }}
    >
      <motion.div
        className="w-full lg:min-w-96"
        variants={FADE_UP_ANIMATION_VARIANTS}
      >
        {!showResult ? (
          <Card shadow="none">
            <CardHeader>
              <Progress
                aria-label="Loading..."
                size="sm"
                value={
                  ((totalQuestionTime - timeLeft) / totalQuestionTime) * 100
                }
              />
            </CardHeader>
            <CardBody className="gap-6">
              <motion.h1
                className="text-lg font-semibold"
                variants={FADE_UP_ANIMATION_VARIANTS}
              >
                Q: {quizQuestions.questions[currentQuestion].questionText}
              </motion.h1>

              <div className="flex flex-col gap-2">
                {quizQuestions.questions[currentQuestion].options.map(
                  (option, index) => (
                    <Button
                      key={index}
                      color={
                        selectedAnswerIndex === index ? "primary" : "default"
                      }
                      variant="flat"
                      onClick={() => handleSelectedOption(option, index)}
                    >
                      {option}
                    </Button>
                  ),
                )}
              </div>
            </CardBody>
            <CardFooter className="items-center justify-between">
              <h1>
                <span className="text-primary-400">{currentQuestion + 1}</span>/
                {quizQuestions.questions.length}
              </h1>
              <Button
                color="success"
                endContent={
                  currentQuestion === quizQuestions.questions.length - 1 ? (
                    <CheckIcon />
                  ) : (
                    <ChevronRightIcon />
                  )
                }
                isDisabled={!checked && !timerExpired}
                variant="flat"
                onClick={handleNextQuestion}
              >
                {currentQuestion === quizQuestions.questions.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card shadow="none">
            <CardHeader>
              <h1 className="text-2xl font-bold">Quiz Results</h1>
            </CardHeader>
            <CardBody className="gap-4">
              <div>
                <ResultGraph result={result} />
              </div>
              <div>
                <h1>Score: {result.score}</h1>
                <h1>Correct Answer: {result.correctAnswer}</h1>
                <h1>Wrong Answer: {result.wrongAnswer}</h1>
              </div>
            </CardBody>
            <CardFooter className="gap-2">
              <Button
                as={Link}
                className="w-full"
                color="success"
                href="/quiz"
                startContent={<RotateCw size={18} />}
                variant="flat"
              >
                Play More
              </Button>
              <Button
                as={Link}
                className="w-full"
                color="primary"
                href="/"
                startContent={<HomeIcon size={18} />}
                variant="flat"
              >
                Home
              </Button>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionCards;
