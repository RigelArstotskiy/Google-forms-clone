import { Link } from "react-router-dom";
import { useFormBuilder } from "../hooks/useFormBuilder";
import type { QuestionType } from "@forms/shared";

const QUESTION_TYPES: { label: string; value: QuestionType; icon: string }[] = [
  { label: "Текст", value: "TEXT", icon: "✏️" },
  { label: "Один вариант", value: "MULTIPLE_CHOICE", icon: "◎" },
  { label: "Несколько вариантов", value: "CHECKBOX", icon: "☑️" },
  { label: "Дата", value: "DATE", icon: "📅" },
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
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/"
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-medium text-slate-800">Новая форма</h1>
      </div>

      {/* Заголовок и описание формы */}
      <div className="bg-white rounded-xl border-t-4 border-t-violet-600 border border-slate-200 p-6 mb-4">
        <input
          className="w-full text-2xl font-medium text-slate-800 border-b border-slate-200 pb-2 mb-3 focus:outline-none focus:border-violet-400 placeholder-slate-300"
          placeholder="Название формы"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full text-sm text-slate-600 focus:outline-none placeholder-slate-300"
          placeholder="Описание формы"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Список вопросов */}
      <div className="flex flex-col gap-4 mb-4">
        {questions.map((question, qi) => (
          <div
            key={qi}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 transition-colors"
          >
            <div className="flex gap-3 mb-4">
              <input
                className="flex-1 text-slate-800 border-b border-slate-200 pb-1 focus:outline-none focus:border-violet-400 placeholder-slate-300"
                placeholder="Текст вопроса"
                value={question.text}
                onChange={(e) => updateQuestion(qi, e.target.value)}
              />
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full self-start">
                {QUESTION_TYPES.find((t) => t.value === question.type)?.label}
              </span>
              <button
                onClick={() => removeQuestion(qi)}
                className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Варианты ответов */}
            {(question.type === "MULTIPLE_CHOICE" ||
              question.type === "CHECKBOX") && (
              <div className="flex flex-col gap-2 ml-2">
                {question.options?.map((option, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 border-2 border-slate-300 flex-shrink-0 ${question.type === "CHECKBOX" ? "rounded" : "rounded-full"}`}
                    />
                    <input
                      className="flex-1 text-sm text-slate-600 focus:outline-none border-b border-slate-100 focus:border-violet-300 pb-0.5 placeholder-slate-300"
                      placeholder={`Вариант ${oi + 1}`}
                      value={option}
                      onChange={(e) => updateOption(qi, oi, e.target.value)}
                    />
                    <button
                      onClick={() => removeOption(qi, oi)}
                      className="text-slate-300 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(qi)}
                  className="text-sm text-violet-500 hover:text-violet-600 text-left mt-1 transition-colors"
                >
                  + Добавить вариант
                </button>
              </div>
            )}

            {/* Превью поля для текста и даты */}
            {question.type === "TEXT" && (
              <div className="ml-2 border-b border-slate-200 pb-1">
                <span className="text-sm text-slate-300">Краткий ответ</span>
              </div>
            )}
            {question.type === "DATE" && (
              <div className="ml-2 border-b border-slate-200 pb-1">
                <span className="text-sm text-slate-300">дд.мм.гггг</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки добавления вопросов */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <p className="text-xs text-slate-400 mb-3">Добавить вопрос</p>
        <div className="flex flex-wrap gap-2">
          {QUESTION_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => addQuestion(type.value)}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-violet-600 border border-slate-200 hover:border-violet-300 px-3 py-1.5 rounded-full transition-colors"
            >
              <span>{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка сохранения */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !title.trim()}
          className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full font-medium transition-colors"
        >
          {isLoading ? "Сохранение..." : "Сохранить форму"}
        </button>
      </div>
    </div>
  );
}
