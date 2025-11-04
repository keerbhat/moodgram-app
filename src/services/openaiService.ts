import OpenAI from "openai";

const openai = new OpenAI({
//   apiKey: "sk-proj-",
  dangerouslyAllowBrowser: true // Only for demo/testing in browser!
});

export async function getChatbotReply(message: string) {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data.reply;
}