import { useEffect, useState } from 'react';
import AutofillAgent from './agents/AutofillAgent';
import ResumeScoringAgent from './agents/ResumeScoringAgent';
import TailoredAnswerAgent from './agents/TailoredAnswerAgent';

type Props = {
  onEditPreferences: () => void;
};

export default function Dashboard({ onEditPreferences }: Props) {
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({ applied: 0, scored: 0, answered: 0 });

  useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  const incrementStat = (key: keyof typeof stats) => {
    setStats((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white text-black p-6 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
        <button
          onClick={onEditPreferences}
          className="text-sm text-blue-600 border border-blue-600 px-4 py-1 rounded hover:bg-blue-100"
        >
          Edit Preferences
        </button>
      </div>

      {userData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Your Preferences</h3>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <strong>Values:</strong> {userData.values.join(', ')}
            </div>
            <div>
              <strong>Roles:</strong> {userData.roles.join(', ')}
            </div>
            <div>
              <strong>Locations:</strong> {userData.locations.join(', ')}
            </div>
            <div>
              <strong>Experience:</strong> {userData.experience.join(', ')}
            </div>
            <div>
              <strong>Company Sizes:</strong> {userData.sizes.join(', ')}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <AutofillAgent onRun={() => incrementStat('applied')} />
        <ResumeScoringAgent onRun={() => incrementStat('scored')} />
        <TailoredAnswerAgent onRun={() => incrementStat('answered')} />
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>✅ Applications Filled: {stats.applied}</p>
        <p>📄 Resumes Analyzed: {stats.scored}</p>
        <p>✍️ Answers Generated: {stats.answered}</p>
      </div>
    </div>
  );
}