import { resolvers } from "../resolvers";
import { forms, responses } from "../store";

// очищаем стор перед каждым тестом
beforeEach(() => {
  forms.length = 0;
  responses.length = 0;
});

describe("Query", () => {
  describe("forms", () => {
    it("возвращает пустой массив если форм нет", () => {
      const result = resolvers.Query.forms();
      expect(result).toEqual([]);
    });

    it("возвращает все формы", () => {
      resolvers.Mutation.createForm({} as never, {
        title: "Тестовая форма",
        description: "Описание",
        questions: [],
      });

      const result = resolvers.Query.forms();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Тестовая форма");
    });
  });

  describe("form", () => {
    it("возвращает форму по id", () => {
      const created = resolvers.Mutation.createForm({} as never, {
        title: "Форма",
        questions: [],
      });

      const result = resolvers.Query.form({} as never, { id: created.id });
      expect(result?.title).toBe("Форма");
    });

    it("возвращает null если форма не найдена", () => {
      const result = resolvers.Query.form({} as never, {
        id: "несуществующий-id",
      });
      expect(result).toBeNull();
    });
  });

  describe("responses", () => {
    it("возвращает пустой массив если ответов нет", () => {
      const result = resolvers.Query.responses({} as never, {
        formId: "любой-id",
      });
      expect(result).toEqual([]);
    });

    it("возвращает только ответы для нужной формы", () => {
      const form = resolvers.Mutation.createForm({} as never, {
        title: "Форма",
        questions: [],
      });

      resolvers.Mutation.submitResponse({} as never, {
        formId: form.id,
        answers: [{ questionId: "q1", value: "ответ" }],
      });

      const result = resolvers.Query.responses({} as never, {
        formId: form.id,
      });
      expect(result).toHaveLength(1);
    });
  });
});

describe("Mutation", () => {
  describe("createForm", () => {
    it("создаёт форму с правильными данными", () => {
      const result = resolvers.Mutation.createForm({} as never, {
        title: "Новая форма",
        description: "Описание",
        questions: [],
      });

      expect(result.title).toBe("Новая форма");
      expect(result.description).toBe("Описание");
      expect(result.id).toBeDefined();
    });

    it("добавляет id к каждому вопросу", () => {
      const result = resolvers.Mutation.createForm({} as never, {
        title: "Форма с вопросами",
        questions: [
          { text: "Вопрос 1", type: "TEXT" },
          { text: "Вопрос 2", type: "MULTIPLE_CHOICE", options: ["а", "б"] },
        ],
      });

      expect(result.questions).toHaveLength(2);
      expect(result.questions[0].id).toBeDefined();
      expect(result.questions[1].id).toBeDefined();
    });

    it("сохраняет форму в стор", () => {
      resolvers.Mutation.createForm({} as never, {
        title: "Форма",
        questions: [],
      });

      expect(forms).toHaveLength(1);
    });
  });

  describe("submitResponse", () => {
    it("сохраняет ответы для существующей формы", () => {
      const form = resolvers.Mutation.createForm({} as never, {
        title: "Форма",
        questions: [],
      });

      const result = resolvers.Mutation.submitResponse({} as never, {
        formId: form.id,
        answers: [{ questionId: "q1", value: "ответ" }],
      });

      expect(result.formId).toBe(form.id);
      expect(result.answers[0].value).toBe("ответ");
    });

    it("выбрасывает ошибку если форма не найдена", () => {
      expect(() => {
        resolvers.Mutation.submitResponse({} as never, {
          formId: "несуществующий-id",
          answers: [],
        });
      }).toThrow("Форма с id несуществующий-id не найдена");
    });
  });
});
