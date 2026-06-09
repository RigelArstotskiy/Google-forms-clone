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

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const updateCheckbox = (
    questionId: string,
    option: string,
    checked: boolean,
  ) => {
    setAnswers((prev) => {
      const current = prev[questionId] ? prev[questionId].split(",") : [];
      const updated = checked
        ? [...current, option]
        : current.filter((o) => o !== option);
      return { ...prev, [questionId]: updated.join(",") };
    });
  };

  const handleSubmit = async () => {
    if (!id) return;
    const formattedAnswers: AnswerInput[] = Object.entries(answers).map(
      ([questionId, value]) => ({ questionId, value }),
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
    updateAnswer,
    updateCheckbox,
    handleSubmit,
  };
}
