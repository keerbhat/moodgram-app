export async function getChatbotReply(message: string) {
  const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(HF_TOKEN ? { "Authorization": `Bearer ${HF_TOKEN}` } : {})
      },
      body: JSON.stringify({ inputs: message }),
    }
  );
  const data = await response.json();
  return data.generated_text || (data[0] && data[0].generated_text) || "Sorry, I couldn't get a reply.";
}