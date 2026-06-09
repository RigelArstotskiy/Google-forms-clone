import { Link } from "react-router-dom";
import { useForms } from "../hooks/useForms";

export default function HomePage() {
  const { forms, isLoading, isError } = useForms();

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500">Загрузка...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center py-20">
        <p className="text-red-500">Ошибка загрузки форм</p>
      </div>
    );

  return (
    <div>
      {/* Заголовок страницы */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium text-slate-800">Мои формы</h1>
        <Link
          to="/forms/new"
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          + Создать форму
        </Link>
      </div>

      {/* Пустое состояние */}
      {forms.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect
                x="6"
                y="4"
                width="20"
                height="24"
                rx="2"
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <rect x="10" y="10" width="12" height="2" rx="1" fill="#7C3AED" />
              <rect x="10" y="15" width="12" height="2" rx="1" fill="#7C3AED" />
              <rect x="10" y="20" width="7" height="2" rx="1" fill="#7C3AED" />
            </svg>
          </div>
          <p className="text-slate-500 text-lg">Форм пока нет</p>
          <p className="text-slate-400 text-sm mt-1">
            Создайте первую форму чтобы начать
          </p>
        </div>
      )}

      {/* Список форм */}
      <div className="grid gap-3">
        {forms.map((form) => (
          <div
            key={form.id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="3"
                      y="2"
                      width="14"
                      height="16"
                      rx="2"
                      stroke="#7C3AED"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="6"
                      y="6"
                      width="8"
                      height="1.5"
                      rx="0.75"
                      fill="#7C3AED"
                    />
                    <rect
                      x="6"
                      y="9.5"
                      width="8"
                      height="1.5"
                      rx="0.75"
                      fill="#7C3AED"
                    />
                    <rect
                      x="6"
                      y="13"
                      width="5"
                      height="1.5"
                      rx="0.75"
                      fill="#7C3AED"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-medium text-slate-800">{form.title}</h2>
                  {form.description && (
                    <p className="text-sm text-slate-500 mt-0.5">
                      {form.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Link
                  to={`/forms/${form.id}/fill`}
                  className="text-sm text-violet-600 hover:text-violet-700 border border-violet-200 hover:border-violet-300 px-3 py-1.5 rounded-full transition-colors"
                >
                  Заполнить
                </Link>
                <Link
                  to={`/forms/${form.id}/responses`}
                  className="text-sm text-slate-600 hover:text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-full transition-colors"
                >
                  Ответы
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
