import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../store/formsEndpoints";
import type { QuestionInput, QuestionType } from "@forms/shared";

// ошибки для каждого вопроса — по индексу
type QuestionErrors = Record<number, string>;

export function useFormBuilder() {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([]);

  // ошибки валидации
  const [titleError, setTitleError] = useState("");
  const [questionErrors, setQuestionErrors] = useState<QuestionErrors>({});

  const addQuestion = (type: QuestionType) => {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        type,
        options:
          type === "MULTIPLE_CHOICE" || type === "CHECKBOX"
            ? ["", ""]
            : undefined,
      },
    ]);
  };

  const updateQuestion = (index: number, text: string) => {
    // сбрасываем ошибку когда пользователь начал печатать
    setQuestionErrors((prev) => ({ ...prev, [index]: "" }));
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, text } : q)),
    );
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    setQuestionErrors((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
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

  // валидация перед отправкой
  const validate = (): boolean => {
    let isValid = true;

    // проверяем заголовок
    if (!title.trim()) {
      setTitleError("Название формы обязательно");
      isValid = false;
    } else {
      setTitleError("");
    }

    // проверяем каждый вопрос
    const errors: QuestionErrors = {};
    questions.forEach((q, index) => {
      if (!q.text.trim()) {
        errors[index] = "Текст вопроса обязателен";
        isValid = false;
      } else if (
        (q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") &&
        (q.options ?? []).filter((o) => o.trim()).length < 2
      ) {
        errors[index] = "Добавьте минимум 2 варианта ответа";
        isValid = false;
      }
    });

    setQuestionErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
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
    titleError,
    questionErrors,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    handleSubmit,
  };
}
