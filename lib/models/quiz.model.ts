import mongoose from "mongoose";

export interface questionType {
  questionText: string;
  options: string[];
  correctOption: string;
  marks: number;
  timeLimit: number; // in seconds
}

export interface quizType extends Document {
  name: string;
  questions: questionType[];
}

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
  marks: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
