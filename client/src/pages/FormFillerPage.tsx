import { Link } from "react-router-dom";
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

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500">Загрузка...</p>
      </div>
    );

  if (isError || !form)
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-red-500 text-lg">Форма не найдена</p>
        <Link
          to="/"
          className="text-violet-600 hover:text-violet-700 text-sm mt-3"
        >
          Вернуться на главную
        </Link>
      </div>
    );

  if (isSuccess)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 16L13 21L24 10"
              stroke="#16A34A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-xl font-medium text-slate-800">Ответы отправлены!</p>
        <p className="text-slate-500 text-sm mt-1">
          Перенаправление на главную...
        </p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Шапка формы */}
      <div className="bg-white rounded-xl border-t-4 border-t-violet-600 border border-slate-200 p-6 mb-4">
        <h1 className="text-2xl font-medium text-slate-800">{form.title}</h1>
        {form.description && (
          <p className="text-slate-500 mt-2">{form.description}</p>
        )}
      </div>

      {/* Вопросы */}
      <div className="flex flex-col gap-4 mb-6">
        {form.questions.map((question) => (
          <div
            key={question.id}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <p className="text-slate-800 font-medium mb-4">{question.text}</p>

            {/* Текстовый ответ */}
            {question.type === "TEXT" && (
              <input
                className="w-full border-b border-slate-300 focus:border-violet-500 focus:outline-none pb-1 text-slate-700 placeholder-slate-300 transition-colors"
                placeholder="Ваш ответ"
                value={answers[question.id] ?? ""}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
              />
            )}

            {/* Один из вариантов */}
            {question.type === "MULTIPLE_CHOICE" && (
              <div className="flex flex-col gap-3">
                {question.options?.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        answers[question.id] === option
                          ? "border-violet-600"
                          : "border-slate-300 group-hover:border-violet-300"
                      }`}
                    >
                      {answers[question.id] === option && (
                        <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name={question.id}
                      value={option ?? ""}
                      checked={answers[question.id] === option}
                      onChange={() => updateAnswer(question.id, option ?? "")}
                      className="hidden"
                    />
                    <span className="text-slate-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Несколько вариантов */}
            {question.type === "CHECKBOX" && (
              <div className="flex flex-col gap-3">
                {question.options?.map((option) => {
                  const isChecked = answers[question.id]
                    ?.split(",")
                    .includes(option ?? "");
                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked
                            ? "border-violet-600 bg-violet-600"
                            : "border-slate-300 group-hover:border-violet-300"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          updateCheckbox(
                            question.id,
                            option ?? "",
                            e.target.checked,
                          )
                        }
                        className="hidden"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Дата */}
            {question.type === "DATE" && (
              <input
                type="date"
                className="border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-violet-400 transition-colors"
                value={answers[question.id] ?? ""}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Кнопка отправки */}
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-slate-400 hover:text-slate-600 text-sm transition-colors"
        >
          ← На главную
        </Link>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full font-medium transition-colors"
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </div>
    </div>
  );
}
