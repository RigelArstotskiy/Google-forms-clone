import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
} from "../store/formsEndpoints";
import type { AnswerInput } from "@forms/shared";

export function useFormFiller() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetFormQuery(id!);
  const [submitResponse, { isLoading: isSubmitting, isSuccess }] =
    useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const updateAnswer = (questionId: string, value: string) => {
    setErrors((prev) => ({ ...prev, [questionId]: "" }));
    // ИСПРАВЛЕНИЕ: Убрали .trim(), теперь пробелы в инпутах работают отлично!
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const updateCheckbox = (
    questionId: string,
    option: string,
    checked: boolean,
  ) => {
    setErrors((prev) => ({ ...prev, [questionId]: "" }));
    setAnswers((prev) => {
      const current = prev[questionId] ? prev[questionId].split(",") : [];

      let updated: string[];
      if (checked) {
        updated = Array.from(new Set([...current, option]));
      } else {
        updated = current.filter((o) => o !== option);
      }
      return { ...prev, [questionId]: updated.join(",") };
    });
  };

  const isCheckboxChecked = (questionId: string, option: string): boolean => {
    const currentAnswer = answers[questionId];
    if (!currentAnswer) return false;
    return currentAnswer.split(",").includes(option);
  };

  const validate = (): boolean => {
    if (!data?.form) return false;

    const newErrors: Record<string, string> = {};
    let isValid = true;

    data.form.questions.forEach((question) => {
      const answer = answers[question.id];
      if (!answer || !answer.trim()) {
        newErrors[question.id] = "Пожалуйста, ответьте на вопрос";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!id || !validate()) return;

    // ИСПРАВЛЕНИЕ: Очищаем ответы от лишних пробелов по краям прямо перед отправкой
    const formattedAnswers: AnswerInput[] = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        value: value.trim(),
      }),
    );

    await submitResponse({ formId: id, answers: formattedAnswers });
  };

  return {
    form: data?.form,
    isLoading,
    isError,
    isSubmitting,
    isSuccess,
    answers,
    errors,
    updateAnswer,
    updateCheckbox,
    isCheckboxChecked,
    handleSubmit,
  };
}
