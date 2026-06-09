import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../store/formsEndpoints";
import type { QuestionInput, QuestionType } from "@forms/shared";

export function useFormBuilder() {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([]);

  const addQuestion = (type: QuestionType) => {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        type,
        options:
          type === "MULTIPLE_CHOICE" || type === "CHECKBOX" ? [""] : undefined,
      },
    ]);
  };

  const updateQuestion = (index: number, text: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, text } : q)),
    );
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const addOption = (questionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex ? { ...q, options: [...(q.options ?? []), ""] } : q,
      ),
    );
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options?.map((o, oi) =>
                oi === optionIndex ? value : o,
              ),
            }
          : q,
      ),
    );
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex
          ? { ...q, options: q.options?.filter((_, oi) => oi !== optionIndex) }
          : q,
      ),
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await createForm({ title, description, questions });
    navigate("/");
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    isLoading,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    handleSubmit,
  };
}
