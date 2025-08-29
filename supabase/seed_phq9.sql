-- Minimal seed for a PHQ-9-like questionnaire (IDs are illustrative)
insert into questionnaires (id, title) values (1, 'PHQ-9 (demo)')
on conflict (id) do nothing;

-- Questions (type: single with 4 options 0..3, last is text free-form)
-- Assuming your 'questions' table has columns: id, questionnaire_id, title, type, min_value, max_value, step
insert into questions (id, questionnaire_id, title, type) values
(1, 1, 'Poco interés o placer en hacer cosas', 'single'),
(2, 1, 'Se ha sentido desanimado/a, deprimido/a o sin esperanza', 'single'),
(3, 1, 'Dificultad para dormir o dormir en exceso', 'single'),
(4, 1, 'Cansancio o poca energía', 'single'),
(5, 1, 'Poco apetito o comer en exceso', 'single'),
(6, 1, 'Sentirse mal consigo mismo/a o que es un/a fracasado/a', 'single'),
(7, 1, 'Dificultad para concentrarse', 'single'),
(8, 1, '¿Se ha movido o hablado tan lentamente que otros lo notaron? O lo contrario: inquietud', 'single'),
(9, 1, 'Pensamientos de que estaría mejor muerto/a o de hacerse daño de alguna manera', 'single')
on conflict do nothing;

-- Options for 0..3 frequency
insert into options (question_id, label, value)
select q.id, o.label, o.value
from questions q
join (values
  ('Nunca', 0),
  ('Varios días', 1),
  ('Más de la mitad de los días', 2),
  ('Casi todos los días', 3)
) as o(label, value) on true
where q.questionnaire_id = 1
on conflict do nothing;
