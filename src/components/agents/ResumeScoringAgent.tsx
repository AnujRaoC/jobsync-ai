import { useState } from 'react';
import { callDeepSeek } from '../../lib/callDeepSeek';

type Props = {
  onRun: () => void;
};

export default function ResumeScoringAgent({ onRun }: Props) {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<string | null>(null);

  const handleScore = async () => {
    setLoading(true);
    setScore(null);
    try {
      const response = await callDeepSeek(
        `Evaluate how well this resume matches the job description. Return a match score from 0 to 100 with a short explanation.\n\nResume:\n${resume}`,
        jd
      );
      setScore(response);
      onRun();
    } catch (err) {
      console.error(err);
      setScore('❌ Error scoring resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-1 bg-green-50 border border-green-200 p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Resume-to-JD Scoring</h3>
      <textarea
        placeholder="Paste your Resume"
        className="w-full p-2 border mb-2 rounded h-24"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <textarea
        placeholder="Paste Job Description"
        className="w-full p-2 border mb-2 rounded h-24"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
      <button
        onClick={handleScore}
        className="bg-green-600 text-white px-3 py-1 rounded w-full"
        disabled={!resume || !jd || loading}
      >
        {loading ? 'Scoring...' : 'Score Resume'}
      </button>
      {score && <p className="text-sm mt-2 whitespace-pre-line">{score}</p>}
    </div>
  );
}