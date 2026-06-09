import { useFormBuilder } from "../hooks/useFormBuilder";
import type { QuestionType } from "@forms/shared";

const QUESTION_TYPES: { label: string; value: QuestionType }[] = [
  { label: "Текст", value: "TEXT" },
  { label: "Один из вариантов", value: "MULTIPLE_CHOICE" },
  { label: "Несколько вариантов", value: "CHECKBOX" },
  { label: "Дата", value: "DATE" },
];

export default function FormBuilderPage() {
  const {
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
  } = useFormBuilder();

  return (
    <div>
      <h1>Новая форма</h1>

      <input
        placeholder="Название формы"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        {QUESTION_TYPES.map((type) => (
          <button key={type.value} onClick={() => addQuestion(type.value)}>
            + {type.label}
          </button>
        ))}
      </div>

      <ul>
        {questions.map((question, qi) => (
          <li key={qi}>
            <input
              placeholder="Текст вопроса"
              value={question.text}
              onChange={(e) => updateQuestion(qi, e.target.value)}
            />
            <button onClick={() => removeQuestion(qi)}>Удалить вопрос</button>

            {(question.type === "MULTIPLE_CHOICE" ||
              question.type === "CHECKBOX") && (
              <div>
                {question.options?.map((option, oi) => (
                  <div key={oi}>
                    <input
                      placeholder={`Вариант ${oi + 1}`}
                      value={option}
                      onChange={(e) => updateOption(qi, oi, e.target.value)}
                    />
                    <button onClick={() => removeOption(qi, oi)}>×</button>
                  </div>
                ))}
                <button onClick={() => addOption(qi)}>
                  + Добавить вариант
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit} disabled={isLoading || !title.trim()}>
        {isLoading ? "Сохранение..." : "Сохранить форму"}
      </button>
    </div>
  );
}
