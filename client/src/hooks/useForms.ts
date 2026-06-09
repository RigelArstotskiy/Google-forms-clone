import { useGetFormsQuery } from "../store/formsEndpoints";

export function useForms() {
  const { data, isLoading, isError } = useGetFormsQuery();

  return {
    forms: data?.forms ?? [],
    isLoading,
    isError,
  };
}
