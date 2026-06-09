import { Link } from "react-router-dom";
import { useFormResponses } from "../hooks/useFormResponses";

export default function FormResponsesPage() {
  const { form, responses, isLoading, getQuestionText } = useFormResponses();

  if (isLoading) return <p>Загрузка...</p>;
  if (!form) return <p>Форма не найдена</p>;

  return (
    <div>
      <h1>Ответы: {form.title}</h1>
      <Link to="/">На главную</Link>

      {responses.length === 0 && <p>Ответов пока нет</p>}

      {responses.map((response, index) => (
        <div key={response.id}>
          <h2>Ответ #{index + 1}</h2>
          <ul>
            {response.answers.map((answer) => (
              <li key={answer.questionId}>
                <strong>{getQuestionText(answer.questionId)}:</strong>{" "}
                {answer.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
