"use client";

import { Card, CardHeader } from "@nextui-org/card";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";

import { title } from "../primitives";

import { deleteQuizById } from "@/lib/actions/quiz.action";

interface Props {
  quizId: string;
  quizName: string;
}

const QuizCards = ({ quizId, quizName }: Props) => {
  const [loading, setloading] = useState(false);
  const path = usePathname();

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const onDelete = (id: string) => async () => {
    try {
      setloading(true);
      await deleteQuizById(id, path);
      toast.info("Quiz deleted successfully");
      setloading(false);
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <motion.div
      animate="show"
      className="w-full flex flex-col gap-2"
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
        <Card className="w-full" shadow="none">
          <CardHeader className="gap-4 items-center justify-between flex-wrap">
            <motion.h1
              className={title({ size: "sm" })}
              variants={FADE_UP_ANIMATION_VARIANTS}
            >
              {quizName}
            </motion.h1>

            <div className="flex items-center justify-end gap-2">
              <Button
                isIconOnly
                color="danger"
                endContent={
                  loading ? <Spinner size="sm" /> : <Trash size={16} />
                }
                isDisabled={loading}
                size="sm"
                variant="flat"
                onClick={onDelete(quizId)}
              />
              <Button
                as={Link}
                color="success"
                href={`/quiz/${quizId}`}
                radius="full"
                size="sm"
                variant="flat"
              >
                Start
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Divider className="my-2" />
      </motion.div>
    </motion.div>
  );
};

export default QuizCards;
