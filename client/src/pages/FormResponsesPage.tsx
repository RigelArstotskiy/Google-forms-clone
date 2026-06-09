import { Link } from "react-router-dom";
import { useFormResponses } from "../hooks/useFormResponses";

export default function FormResponsesPage() {
  const { form, responses, isLoading, getQuestionText } = useFormResponses();

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500">Загрузка...</p>
      </div>
    );

  if (!form)
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

  return (
    <div className="max-w-2xl mx-auto">
      {/* Шапка */}
      <div className="bg-white rounded-xl border-t-4 border-t-violet-600 border border-slate-200 p-6 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-violet-600 font-medium uppercase tracking-wide mb-1">
              Ответы
            </p>
            <h1 className="text-2xl font-medium text-slate-800">
              {form.title}
            </h1>
          </div>
          <div className="bg-violet-50 rounded-xl px-4 py-2 text-center flex-shrink-0">
            <p className="text-2xl font-medium text-violet-600">
              {responses.length}
            </p>
            <p className="text-xs text-slate-500">ответов</p>
          </div>
        </div>
      </div>

      {/* Пустое состояние */}
      {responses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect
                x="6"
                y="4"
                width="20"
                height="24"
                rx="2"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              <rect x="10" y="10" width="12" height="2" rx="1" fill="#94A3B8" />
              <rect x="10" y="15" width="8" height="2" rx="1" fill="#94A3B8" />
            </svg>
          </div>
          <p className="text-slate-500">Ответов пока нет</p>
          <Link
            to={`/forms/${form.id}/fill`}
            className="text-violet-600 hover:text-violet-700 text-sm mt-3 transition-colors"
          >
            Заполнить форму →
          </Link>
        </div>
      )}

      {/* Список ответов */}
      <div className="flex flex-col gap-4 mb-6">
        {responses.map((response, index) => (
          <div
            key={response.id}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-violet-600">
                  {index + 1}
                </span>
              </div>
              <p className="text-sm text-slate-500">Ответ #{index + 1}</p>
            </div>

            <div className="flex flex-col gap-3">
              {response.answers.map((answer) => (
                <div key={answer.questionId} className="flex flex-col gap-0.5">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    {getQuestionText(answer.questionId)}
                  </p>
                  <p className="text-slate-700">{answer.value || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Навигация */}
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-slate-400 hover:text-slate-600 text-sm transition-colors"
        >
          ← На главную
        </Link>
        <Link
          to={`/forms/${form.id}/fill`}
          className="text-sm text-violet-600 hover:text-violet-700 border border-violet-200 hover:border-violet-300 px-4 py-2 rounded-full transition-colors"
        >
          Заполнить форму
        </Link>
      </div>
    </div>
  );
}
