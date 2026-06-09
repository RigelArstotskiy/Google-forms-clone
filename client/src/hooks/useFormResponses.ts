import { useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../store/formsEndpoints";

export function useFormResponses() {
  const { id } = useParams<{ id: string }>();

  const { data: formData, isLoading: isFormLoading } = useGetFormQuery(id!);
  const { data: responsesData, isLoading: isResponsesLoading } =
    useGetResponsesQuery(id!);

  const getQuestionText = (questionId: string) => {
    return (
      formData?.form?.questions.find((q) => q.id === questionId)?.text ??
      questionId
    );
  };

  return {
    form: formData?.form,
    responses: responsesData?.responses ?? [],
    isLoading: isFormLoading || isResponsesLoading,
    getQuestionText,
  };
}
