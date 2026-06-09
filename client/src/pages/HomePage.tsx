import { Link } from "react-router-dom";
import { useForms } from "../hooks/useForms";

export default function HomePage() {
  const { forms, isLoading, isError } = useForms();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки форм</p>;

  return (
    <div>
      <h1>Мои формы</h1>
      <Link to="/forms/new">Создать форму</Link>

      {forms.length === 0 && <p>Форм пока нет</p>}

      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <h2>{form.title}</h2>
            {form.description && <p>{form.description}</p>}
            <Link to={`/forms/${form.id}/fill`}>Заполнить</Link>
            <Link to={`/forms/${form.id}/responses`}>Ответы</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
