"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { title } from "@/components/primitives";
import CreateQuizForm from "@/components/form/CreateQuizForm";

export default function DocsPage() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

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
        <Card>
          <CardHeader>
            <motion.h1
              className={title({ size: "lg" })}
              variants={FADE_UP_ANIMATION_VARIANTS}
            >
              Create{" "}
              <span className={title({ size: "lg", color: "blue" })}>
                Quiz!
              </span>
            </motion.h1>
          </CardHeader>
          <CardBody>
            <CreateQuizForm />
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
}
