import { useFormFiller } from "../hooks/useFormFiller";

export default function FormFillerPage() {
  const {
    form,
    isLoading,
    isError,
    isSubmitting,
    isSuccess,
    answers,
    updateAnswer,
    updateCheckbox,
    handleSubmit,
  } = useFormFiller();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError || !form) return <p>Форма не найдена</p>;
  if (isSuccess) return <p>Ответы отправлены, спасибо!</p>;

  return (
    <div>
      <h1>{form.title}</h1>
      {form.description && <p>{form.description}</p>}

      <ul>
        {form.questions.map((question) => (
          <li key={question.id}>
            <p>{question.text}</p>

            {/* текстовый ответ */}
            {question.type === "TEXT" && (
              <input
                value={answers[question.id] ?? ""}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
              />
            )}

            {/* один из вариантов — radio */}
            {question.type === "MULTIPLE_CHOICE" && (
              <div>
                {question.options?.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={question.id}
                      value={option ?? ""}
                      checked={answers[question.id] === option}
                      onChange={() => updateAnswer(question.id, option ?? "")}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {/* несколько вариантов — checkbox */}
            {question.type === "CHECKBOX" && (
              <div>
                {question.options?.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={answers[question.id]
                        ?.split(",")
                        .includes(option ?? "")}
                      onChange={(e) =>
                        updateCheckbox(
                          question.id,
                          option ?? "",
                          e.target.checked,
                        )
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {/* дата */}
            {question.type === "DATE" && (
              <input
                type="date"
                value={answers[question.id] ?? ""}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Отправить ответы"}
      </button>
    </div>
  );
}
