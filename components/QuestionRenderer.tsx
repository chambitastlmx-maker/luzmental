import { Option, Question } from '@/types';

interface Props {
  question: Question;
  options: Option[];
  value: any;
  onChange: (val: any) => void;
}

export default function QuestionRenderer({ question, options, value, onChange }: Props) {
  if (question.type === 'single') {
    return (
      <div>
        <p><strong>{question.title}</strong></p>
        {options.map(opt => (
          <label key={opt.id} style={{display:'block', marginBottom: 6}}>
            <input
              type="radio"
              name={`q_${question.id}`}
              checked={value?.option_id === opt.id}
              onChange={() => onChange({ option_id: opt.id })}
            />{' '}{opt.label}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === 'multi') {
    const selected: number[] = value?.option_ids ?? [];
    const toggle = (id: number) => {
      const set = new Set(selected);
      if (set.has(id)) set.delete(id); else set.add(id);
      onChange({ option_ids: Array.from(set) });
    };
    return (
      <div>
        <p><strong>{question.title}</strong></p>
        {options.map(opt => (
          <label key={opt.id} style={{display:'block', marginBottom: 6}}>
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
            />{' '}{opt.label}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === 'scale') {
    const min = question.min_value ?? 0;
    const max = question.max_value ?? 10;
    const step = question.step ?? 1;
    const v = value?.answer_value ?? Math.round((min + max) / 2);
    return (
      <div>
        <p><strong>{question.title}</strong></p>
        <input type="range" min={min} max={max} step={step} value={v} onChange={(e)=>onChange({ answer_value: Number(e.target.value)})} />
        <div>Valor: {v}</div>
      </div>
    );
  }

  // text
  return (
    <div>
      <p><strong>{question.title}</strong></p>
      <textarea
        rows={4}
        style={{width:'100%', maxWidth:600}}
        value={value?.answer_text ?? ''}
        onChange={(e)=>onChange({ answer_text: e.target.value })}
      />
    </div>
  );
}
