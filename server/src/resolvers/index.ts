import crypto from "crypto";
import { forms, responses } from "../store";
import { Form, FormResponse, Question } from "@forms/shared";

export const resolvers = {
  Query: {
    // вернуть все формы
    forms: () => forms,

    // найти форму по id
    form: (_: unknown, { id }: { id: string }) => {
      return forms.find((f) => f.id === id) ?? null;
    },

    // найти все ответы для конкретной формы
    responses: (_: unknown, { formId }: { formId: string }) => {
      return responses.filter((r) => r.formId === formId);
    },
  },

  Mutation: {
    // создать новую форму
    createForm: (
      _: unknown,
      {
        title,
        description,
        questions,
      }: {
        title: string;
        description?: string;
        questions?: Array<{
          text: string;
          type: Question["type"];
          options?: string[];
        }>;
      },
    ): Form => {
      const newForm: Form = {
        id: crypto.randomUUID(),
        title,
        description,
        questions: (questions ?? []).map((q) => ({
          id: crypto.randomUUID(),
          text: q.text,
          type: q.type,
          options: q.options,
        })),
      };

      forms.push(newForm);
      return newForm;
    },

    // сохранить ответы пользователя
    submitResponse: (
      _: unknown,
      {
        formId,
        answers,
      }: {
        formId: string;
        answers: Array<{ questionId: string; value: string }>;
      },
    ): FormResponse => {
      const form = forms.find((f) => f.id === formId);

      if (!form) {
        throw new Error(`Форма с id ${formId} не найдена`);
      }

      const newResponse: FormResponse = {
        id: crypto.randomUUID(),
        formId,
        answers,
      };

      responses.push(newResponse);
      return newResponse;
    },
  },
};
