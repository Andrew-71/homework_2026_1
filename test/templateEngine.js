'use strict';

QUnit.module("Тестируем функцию templateEngine", function() {
    QUnit.test("Работает правильно с простым шаблоном с одной переменной", function(assert) {
        const template = "Привет, {{name}}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Работает правильно с шаблоном с отсутствующими переменными", function(assert) {
        const template = "Привет, {{name}}! Тебе {{age}} лет.";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк! Тебе  лет."); // Возраст не найден, заменён на пустую строку
    });

    QUnit.test("Работает правильно с шаблоном с вложенными переменными", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с пустым шаблоном", function(assert) {
        const template = "The question of life, the universe, and everything: {{}}";
        const data = { answer: 42 };
        const result = templateEngine(template, data);

        assert.equal(result, "The question of life, the universe, and everything: "); // Переменной нет, поэтому пустая строка
    });

    QUnit.test("Игнорирует незакрытые скобки", function(assert) {
        const template = "The *answer* to life, the universe, and everything: {{ answer {{ answer }}";
        const data = { answer: 42 };
        const result = templateEngine(template, data);

        assert.equal(result, "The *answer* to life, the universe, and everything: {{ answer 42");
    });

    QUnit.test("Работает с неправильным типом объекта данных", function(assert) {
        const template = "To me, time is a {{place}}";
        const data = "wait for me, 3:26";
        const result = templateEngine(template, data);

        assert.equal(result, "To me, time is a ");
    });

    QUnit.test("Работает с неправильным типом шаблона", function(assert) {
        const template = 2001;
        const data = "Dave, my mind is going, there is no question about it.";
        const result = templateEngine(template, data);

        assert.equal(result, "");
    });

    QUnit.test("Работает со строками, созданными через new String", function(assert) {
        const template = new String("I like Joy {{ band }}");
        const data = {band: "Division"};
        const result = templateEngine(template, data);

        // ...and non-failing tests :)
        assert.equal(result, "I like Joy Division");
    });
});
