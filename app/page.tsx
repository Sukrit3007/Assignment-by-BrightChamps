"use client";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { ExternalLinkIcon } from "lucide-react";

import { title } from "@/components/primitives";
import CreateIcon from "@/components/icons/CreateIcon";
import RocketIcon from "@/components/icons/RocketIcon";

export default function Home() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section className="h-full flex flex-col items-center justify-start gap-4 py-8 md:py-10">
      <motion.div
        animate="show"
        className="flex flex-col gap-12"
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
          <Chip className="not-prose w-fit" color="primary" variant="flat">
            <Link
              className="group flex items-center gap-1"
              href="https://github.com/Sukrit3007/Assignment-by-BrightChamps"
            >
              Source Code
              <ExternalLinkIcon size={"16"} />
            </Link>
          </Chip>
        </motion.div>
        <motion.h1
          className={title({ size: "lg" })}
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          Test Your{" "}
          <span className={title({ size: "lg", color: "blue" })}>Brain!</span>
        </motion.h1>
        {/* TODO: Add the explaination of the project */}
        <motion.h3
          className="max-w-prose rounded-md border bg-muted/50 p-4 text-muted-foreground"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          This Quiz App is built with Next.js. I have used NextUI for stylish,
          modern components and Framer Motion to add smooth, eye-catching
          animations. On the backend, I have used server actions and MongoDB to
          manage data smoothly, keeping the app responsive and dynamic.
        </motion.h3>

        <motion.div
          className="flex items-center justify-start gap-2"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <Button
            as={Link}
            color="primary"
            href="/quiz"
            startContent={<RocketIcon />}
            variant="flat"
          >
            Start Quiz
          </Button>
          <Button
            as={Link}
            color="primary"
            endContent={<CreateIcon />}
            href="/create"
            variant="light"
          >
            Create Quiz
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
