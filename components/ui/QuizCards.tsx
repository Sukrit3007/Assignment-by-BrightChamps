"use client";

import { Card, CardHeader } from "@nextui-org/card";
import React from "react";
import { Button } from "@nextui-org/button";
import {Divider} from "@nextui-org/divider";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

import { title } from "../primitives";

import { questionType } from "@/lib/models/quiz.model";
import { deleteQuizById } from "@/lib/actions/quiz.action";

interface Props {
  quiz: {
    _id: string;
    name: string;
    questions: questionType[];
  }[];
}

const QuizCards = ({ quiz }: Props) => {
  const path = usePathname();

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const onDelete = (id: string) => async () => {
    try {
      await deleteQuizById(id, path);
      toast.info("Quiz deleted successfully");
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
      {quiz.map((data) => (
        <motion.div key={data._id} variants={FADE_UP_ANIMATION_VARIANTS}>
          <Card className="w-full" shadow="none">
            <CardHeader className="items-center justify-between">
              <motion.h1
                className={title({ size: "sm" })}
                variants={FADE_UP_ANIMATION_VARIANTS}
              >
                {data.name}
              </motion.h1>
              <div className="flex items-center justify-end gap-2">
                <Button
                  isIconOnly
                  color="danger"
                  endContent={<Trash size={16} />}
                  size="sm"
                  variant="flat"
                  onClick={onDelete(data._id)}
                />
                <Button
                  as={Link}
                  color="success"
                  href={`/quiz/${data._id}`}
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
      ))}
    </motion.div>
  );
};

export default QuizCards;
