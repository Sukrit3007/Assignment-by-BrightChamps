export interface AnswerOption {
  id: string;
  text: string;
}

export interface QuestionType {
  id: number;
  question: string;
  answerOptions: AnswerOption[];
  correctAnswer: string;
  marks: number;
  time: number; // time in seconds
}

export const questions: QuestionType[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answerOptions: [
      { id: "a", text: "Berlin" },
      { id: "b", text: "Madrid" },
      { id: "c", text: "Paris" },
      { id: "d", text: "Rome" },
    ],
    correctAnswer: "c",
    marks: 5,
    time: 10, // time in seconds
  },
  {
    id: 2,
    question: "What is the chemical symbol for water?",
    answerOptions: [
      { id: "a", text: "O2" },
      { id: "b", text: "H2O" },
      { id: "c", text: "CO2" },
      { id: "d", text: "HO" },
    ],
    correctAnswer: "b",
    marks: 5,
    time: 10, // time in seconds
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    answerOptions: [
      { id: "a", text: "Earth" },
      { id: "b", text: "Mars" },
      { id: "c", text: "Jupiter" },
      { id: "d", text: "Saturn" },
    ],
    correctAnswer: "b",
    marks: 5,
    time: 10, // time in seconds
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    answerOptions: [
      { id: "a", text: "William Wordsworth" },
      { id: "b", text: "Jane Austen" },
      { id: "c", text: "William Shakespeare" },
      { id: "d", text: "Charles Dickens" },
    ],
    correctAnswer: "c",
    marks: 5,
    time: 10, // time in seconds
  },
  {
    id: 5,
    question: "What is the largest mammal in the world?",
    answerOptions: [
      { id: "a", text: "Elephant" },
      { id: "b", text: "Blue Whale" },
      { id: "c", text: "Giraffe" },
      { id: "d", text: "Rhino" },
    ],
    correctAnswer: "b",
    marks: 5,
    time: 10, // time in seconds
  },
];
