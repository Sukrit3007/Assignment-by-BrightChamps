"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createQuiz } from "@/lib/actions/quiz.action";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Quiz name is required",
  }),
  questions: z
    .array(
      z.object({
        questionText: z.string().min(1, {
          message: "Question text is required",
        }),
        options: z
          .array(
            z.string().min(1, {
              message: "Options are required",
            }),
          )
          .length(4, {
            message: "You must enter 4 options",
          }),
        correctOption: z.string().min(1, {
          message: "Correct options is required",
        }),
        marks: z.number().min(1, {
          message: "Marks must be at least 1.",
        }),
        timeLimit: z.number().min(1, {
          message: "Time limit must be at least 1 second.",
        }),
      }),
    )
    .min(1, {
      message: "You must enter at least 1 question",
    }),
});

const CreateQuizForm = () => {
  const router = useRouter();
  const path = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctOption: "",
          marks: 5,
          timeLimit: 10,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createQuiz({
        name: values.name,
        questions: values.questions,
        path: path,
      });
      console.log(values);
      toast.success("Quiz has been created");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter the quiz name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((item, index) => (
          <div key={item.id} className="space-y-4">
            <FormField
              control={form.control}
              name={`questions.${index}.questionText`}
              render={({ field }) => (
                <FormItem>
                  <h1 className="text-sm font-semibold">
                    Question {index + 1}
                  </h1>
                  <FormControl>
                    <Textarea placeholder="Enter question text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }, (_, optionIndex) => (
                <FormField
                  key={optionIndex}
                  control={form.control}
                  name={`questions.${index}.options.${optionIndex}`}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Option {optionIndex + 1}</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormField
              control={form.control}
              name={`questions.${index}.correctOption`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Correct Options"
                      placeholder="Enter the correct option"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`questions.${index}.marks`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Marks"
                      placeholder="Enter marks"
                      type="text"
                      value={field.value.toString()}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`questions.${index}.timeLimit`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Time Limit (seconds)"
                      placeholder="Enter time limit in seconds"
                      type="text"
                      value={field.value.toString()}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button
          color="primary"
          radius="full"
          size="sm"
          startContent={<PlusIcon size={16} />}
          variant="flat"
          onClick={() =>
            append({
              questionText: "",
              options: ["", "", "", ""],
              correctOption: "",
              marks: 1,
              timeLimit: 60,
            })
          }
        >
          Question
        </Button>

        <Button
          className="w-full"
          color="success"
          radius="full"
          type="submit"
          variant="flat"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateQuizForm;
