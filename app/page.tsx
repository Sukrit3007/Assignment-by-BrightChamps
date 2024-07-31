import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

import { title } from "@/components/primitives";
import CreateIcon from "@/components/icons/CreateIcon";
import RocketIcon from "@/components/icons/RocketIcon";

export default function Home() {
  return (
    <section className="h-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center text-center">
        <Image
          alt="Quiz Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
          height={72}
          // src=""
          width={172}
        />
        <h1 className={title({ size: "lg" })}>
          Test Your{" "}
          <span className={title({ size: "lg", color: "blue" })}>Brain!</span>
        </h1>
        <h3 className="text-muted-foreground max-w-prose">
          Enjoy fun and interactive quizzes on various topics. Challenge
          yourself and learn something new today!
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button
            color="primary"
            size="lg"
            startContent={<RocketIcon />}
            variant="flat"
          >
            Start Quiz
          </Button>
          <Button
            color="primary"
            endContent={<CreateIcon />}
            size="lg"
            variant="ghost"
          >
            Create Quiz2
          </Button>
        </div>
      </div>
    </section>
  );
}
