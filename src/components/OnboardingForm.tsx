import { useState } from 'react';

type Props = { onComplete: () => void };

const roleValues = [
  'Diversity & inclusion', 'Impactful work', 'Independence & autonomy',
  'Innovative product & tech', 'Mentorship & career development', 'Progressive leadership',
  'Recognition & reward', 'Role mobility', 'Social responsibility & sustainability',
  'Transparency & communication', 'Work-life balance'
];

const jobRoles = [
  'Software Engineering', 'AI & Machine Learning', 'DevOps & Infrastructure', 'Data & Analytics',
  'Product', 'Design', 'Content & Writing', 'Finance & Banking', 'Operations & Logistics',
  'IT & Security', 'QA & Testing', 'Customer Experience & Support'
];

const locations = [
  'New York City', 'San Francisco Bay Area', 'Remote in USA', 'Toronto', 'Vancouver',
  'Remote in Canada', 'London', 'Manchester', 'Remote in UK', 'Sydney', 'Melbourne', 'Remote in Australia'
];

const experienceLevels = [
  'Internship', 'Entry Level & New Grad', 'Junior (1 to 2 years)',
  'Mid-level (3 to 4 years)', 'Senior (5 to 8 years)', 'Expert & Leadership (9+ years)'
];

const companySizes = [
  '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees',
  '501-1,000 employees', '1,001-5,000 employees', '5,001-10,000 employees', '10,001+ employees'
];

export default function OnboardingForm({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workHistory: '',
    education: '',
    values: [] as string[],
    roles: [] as string[],
    locations: [] as string[],
    experience: [] as string[],
    sizes: [] as string[]
  });

  const toggleSelection = (key: keyof typeof formData, item: string, limit: number) => {
    setFormData((prev) => {
      const exists = (prev[key] as string[]).includes(item);
      const updated = exists
        ? (prev[key] as string[]).filter((v) => v !== item)
        : (prev[key] as string[]).length < limit
        ? [...(prev[key] as string[]), item]
        : (prev[key] as string[]);
      return { ...prev, [key]: updated };
    });
  };

  const save = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    onComplete();
  };

  const renderChips = (key: keyof typeof formData, options: string[], limit: number) => (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <button
          key={item}
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            formData[key].includes(item)
              ? 'bg-blue-500 text-white border-blue-600'
              : 'bg-white text-black border-gray-300'
          }`}
          onClick={() => toggleSelection(key, item, limit)}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white text-black max-w-xl mx-auto p-6 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="text-blue-600 font-medium">← Back</button>
        )}
        <div className="w-full h-2 bg-gray-200 rounded-full mx-4">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(step + 1) * 20}%` }}></div>
        </div>
        <span className="text-sm font-medium">{(step + 1) * 20}%</span>
      </div>

      {step === 0 && (
        <>
          <h2 className="text-xl font-bold mb-2">Tell us about yourself</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Work History</label>
              <textarea
                rows={3}
                className="w-full p-2 border rounded"
                value={formData.workHistory}
                onChange={(e) => setFormData({ ...formData, workHistory: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Education</label>
              <textarea
                rows={2}
                className="w-full p-2 border rounded"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              />
            </div>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-2">What do you value in a new role?</h2>
          <p className="mb-4 text-gray-700">Select up to 3</p>
          {renderChips('values', roleValues, 3)}
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-2">What kinds of roles are you interested in?</h2>
          <p className="mb-4 text-gray-700">Select up to 5</p>
          {renderChips('roles', jobRoles, 5)}
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-bold mb-2">Where would you like to work?</h2>
          <p className="mb-4 text-gray-700">Select up to 5</p>
          {renderChips('locations', locations, 5)}
        </>
      )}

      {step === 4 && (
        <>
          <h2 className="text-xl font-bold mb-2">What level of roles are you looking for?</h2>
          <p className="mb-4 text-gray-700">Select up to 2</p>
          {renderChips('experience', experienceLevels, 2)}
        </>
      )}

      {step === 5 && (
        <>
          <h2 className="text-xl font-bold mb-2">What is your ideal company size?</h2>
          <p className="mb-4 text-gray-700">Select any that apply</p>
          {renderChips('sizes', companySizes, 8)}
        </>
      )}

      <div className="mt-6">
        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            disabled={step === 0 && (!formData.name || !formData.email)}
          >
            Save and Continue →
          </button>
        ) : (
          <button
            onClick={save}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
