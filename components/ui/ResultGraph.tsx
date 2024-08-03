"use client";

import * as React from "react";
import { Pie, PieChart, Tooltip, Label } from "recharts";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  score: {
    label: "Score",
    color: "#4f46e5",
  },
  correctAnswer: {
    label: "Correct Answers",
    color: "#74DFA2",
  },
  wrongAnswer: {
    label: "Wrong Answers",
    color: "#ff3d3d",
  },
} satisfies ChartConfig;

interface ResultProps {
  result: {
    score: number;
    correctAnswer: number;
    wrongAnswer: number;
  };
}

export function ResultGraph({ result }: ResultProps) {
  console.log(result);

  const chartData = [
    {
      label: "Correct Answers",
      score: result.correctAnswer,
      fill: chartConfig.correctAnswer.color,
    },
    {
      label: "Wrong Answers",
      score: result.wrongAnswer,
      fill: chartConfig.wrongAnswer.color,
    },
  ];

  return (
    <Card className="flex flex-col w-64 lg:w-full" shadow="none">
      <CardBody className="flex-1 pb-0">
        <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
          <PieChart height={250} width={600}>
            <Tooltip />
            <Pie
              data={chartData}
              dataKey="score"
              fill="#8884d8"
              innerRadius={60}
              nameKey="label"
              outerRadius={80}
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
                          {result.score}
                        </tspan>
                        <tspan
                          className="fill-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          Score
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardBody>
      <CardFooter className="flex-col gap-2 text-xs">
        <div className="flex items-center gap-2 font-medium leading-none">
          Quiz Score Summary
        </div>
      </CardFooter>
    </Card>
  );
}
