import { api } from "./baseApi";
import { gql } from "graphql-request";
import type {
  Form,
  FormResponse,
  QuestionInput,
  AnswerInput,
} from "@forms/shared";

export const formsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Получить все формы (для Homepage)
    getForms: builder.query<{ forms: Form[] }, void>({
      query: () => ({
        document: gql`
          query GetForms {
            forms {
              id
              title
              description
            }
          }
        `,
      }),
    }),

    // 2. Получить форму по ID (для заполнения и просмотра ответов)
    getForm: builder.query<{ form: Form }, string>({
      query: (id) => ({
        document: gql`
          query GetForm($id: ID!) {
            form(id: $id) {
              id
              title
              description
              questions {
                id
                text
                type
                options
              }
            }
          }
        `,
        variables: { id },
      }),
    }),

    // 3. Получить все ответы для конкретной формы
    getResponses: builder.query<{ responses: FormResponse[] }, string>({
      query: (formId) => ({
        document: gql`
          query GetResponses($formId: ID!) {
            responses(formId: $formId) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables: { formId },
      }),
    }),

    // 4. Создать новую форму
    createForm: builder.mutation<
      { createForm: Form },
      { title: string; description?: string; questions?: QuestionInput[] }
    >({
      query: (variables) => ({
        document: gql`
          mutation CreateForm(
            $title: String!
            $description: String
            $questions: [QuestionInput]
          ) {
            createForm(
              title: $title
              description: $description
              questions: $questions
            ) {
              id
              title
            }
          }
        `,
        variables,
      }),
    }),

    // 5. Отправить ответы пользователя
    submitResponse: builder.mutation<
      { submitResponse: FormResponse },
      { formId: string; answers: AnswerInput[] }
    >({
      query: (variables) => ({
        document: gql`
          mutation SubmitResponse($formId: ID!, $answers: [AnswerInput]) {
            submitResponse(formId: $formId, answers: $answers) {
              id
            }
          }
        `,
        variables,
      }),
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formsApi;
