"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { ChevronRightIcon } from "lucide-react";
import { Progress } from "@nextui-org/progress";

import { questionType } from "@/lib/models/quiz.model";

interface Props {
  quizQuestions: {
    questions: questionType[];
  };
}

const QuestionCards = (quizQuestions: Props) => {

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  console.log(quizQuestions);

  return (
    <motion.div
      animate="show"
      className="flex flex-col gap-6 items-center text-center"
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
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <Card shadow="none">
          <CardHeader>
            <Progress aria-label="Loading..." size="sm" value={30} />
          </CardHeader>
          <CardBody className="gap-6">
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A enim
              totam perferendis cupiditate aut! Totam consequatur eos at culpa,
              animi explicabo illo accusamus? Atque voluptatibus illo nihil quam
              facere recusandae!
            </motion.h1>

            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }, (_, index) => (
                <Button key={index} color="primary" variant="flat">
                  option1
                </Button>
              ))}
            </div>
          </CardBody>
          <CardFooter className="items-center justify-between">
            <h1>1/5</h1>
            <Button
              color="success"
              endContent={<ChevronRightIcon />}
              variant="flat"
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCards;
