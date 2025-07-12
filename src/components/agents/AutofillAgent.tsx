import { useState } from 'react';

type Props = {
  onRun: () => void;
};

export default function AutofillAgent({ onRun }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const simulateAutofill = async () => {
    setLoading(true);
    setOutput('');

    setTimeout(() => {
      setOutput(`✅ Autofilled job form based on: ${url}`);
      setLoading(false);
      onRun();
    }, 2000);
  };

  return (
    <div className="col-span-1 bg-blue-50 border border-blue-200 p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Autofill Agent</h3>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste job URL"
        className="w-full p-2 border mb-2 rounded"
      />
      <button
        onClick={simulateAutofill}
        className="bg-blue-600 text-white px-3 py-1 rounded w-full"
        disabled={!url || loading}
      >
        {loading ? 'Filling...' : 'Autofill'}
      </button>
      {output && <p className="text-sm mt-2">{output}</p>}
    </div>
  );
}
