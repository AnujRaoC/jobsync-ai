import { useState } from 'react';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(
    !!localStorage.getItem('userProfile')
  );
  const [darkMode, setDarkMode] = useState(false);

  const resetOnboarding = () => {
    localStorage.removeItem('userProfile');
    setOnboardingComplete(false);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen p-4 transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white dark:from-gray-900 dark:to-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 border rounded text-sm hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        {!onboardingComplete ? (
          <div className="animate-fade">
            <OnboardingForm onComplete={() => setOnboardingComplete(true)} />
          </div>
        ) : (
          <div className="animate-fade">
            <Dashboard onEditPreferences={resetOnboarding} />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;