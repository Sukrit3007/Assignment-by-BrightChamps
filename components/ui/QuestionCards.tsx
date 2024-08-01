"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { Progress } from "@nextui-org/progress";
import { Label, Pie, PieChart } from "recharts";

// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

interface Props {
  quizQuestions: {
    _id: string;
    name: string;
    questions: {
      correctOption: string;
      marks: number;
      options: string[];
      questionText: string;
      timeLimit: number;
    }[];
  };
}

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
  const [timeLeft, setTimeLeft] = useState<number>(
    quizQuestions.questions[currentQuestion].timeLimit,
  );
  const totalQuestionTime = quizQuestions.questions[currentQuestion].timeLimit;
  const [timerExpired, setTimerExpired] = useState(false);

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

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
  }, [currentQuestion]);

  useEffect(() => {
    if (timerExpired && !checked) {
      handleNextQuestion();
    }
  }, [timerExpired]);

  const handleSelectedOption = ({
    option,
    index,
  }: {
    option: string;
    index: number;
  }) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (option === quizQuestions.questions[currentQuestion].correctOption) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
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
      console.log(result)
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
          //  Quiz Question Card
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
                      onClick={() => handleSelectedOption({ option, index })}
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
          // Result Card
          <Card shadow="none">
            <CardHeader>
              <h1 className="text-2xl font-bold">Quiz Results</h1>
            </CardHeader>
            <CardBody>
              <h1>score: {result.score}</h1>
              <h1>Correct Answer: {result.correctAnswer}</h1>
              <h1>Wrong Answer: {result.wrongAnswer}</h1>
              {/* <ChartContainer
                className="mx-auto aspect-square max-h-[250px]"
                config={chartConfig}
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={false}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={60}
                    nameKey="name"
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              dominantBaseline="middle"
                              textAnchor="middle"
                              x={viewBox.cx}
                              y={viewBox.cy}
                            >
                              <tspan
                                className="fill-foreground text-3xl font-bold"
                                x={viewBox.cx}
                                y={viewBox.cy}
                              >
                                {result.correctAnswer + result.wrongAnswer}
                              </tspan>
                              <tspan
                                className="fill-muted-foreground"
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                              >
                                Questions
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer> */}
            </CardBody>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionCards;
