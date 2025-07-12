export const callDeepSeek = async (question: string, jd: string): Promise<string> => {
    try {
      const response = await fetch('https://ABCD.services.ai.azure.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_DEEPSEEK_API_KEY` // Replace with real key
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that scores resumes against job descriptions from 0–100 and explains the result.' },
            { role: 'user', content: `Job Description:\n${jd}\n\nResume:\n${question}\n\nReturn score + brief explanation.` }
          ]
        })
      });
  
      if (!response.ok) {
        const err = await response.text();
        console.error('API Error:', err);
        return `❌ DeepSeek API Error: ${response.status}`;
      }
  
      const data = await response.json();
      return data.choices?.[0]?.message?.content || '❌ No response from AI.';
    } catch (err) {
      console.error('Fetch Error:', err);
      return '❌ Error calling DeepSeek.';
    }
  };
  
