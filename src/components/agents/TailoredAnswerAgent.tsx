import { useState } from 'react';
import { callDeepSeek } from '../../lib/callDeepSeek';

type Props = {
  onRun: () => void;
};

export default function TailoredAnswerAgent({ onRun }: Props) {
  const [jd, setJd] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const generateAnswer = async () => {
    setLoading(true);
    setAnswer(null);

    try {
      const response = await callDeepSeek(question, jd);
      setAnswer(response);
      onRun();
    } catch (err) {
      console.error(err);
      setAnswer('❌ Error generating answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-1 bg-purple-50 border border-purple-200 p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Tailored Answer Agent</h3>
      <textarea
        placeholder="Paste Job Description"
        className="w-full p-2 border mb-2 rounded h-24"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Application Question"
        className="w-full p-2 border mb-2 rounded"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={generateAnswer}
        className="bg-purple-600 text-white px-3 py-1 rounded w-full"
        disabled={!jd || !question || loading}
      >
        {loading ? 'Generating...' : 'Generate Answer'}
      </button>
      {answer && <p className="text-sm mt-2 whitespace-pre-line">{answer}</p>}
    </div>
  );
}
