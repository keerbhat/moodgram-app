import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { getChatbotReply } from '../services/openaiService';

interface AIChatProps {
  open: boolean;
  onClose: () => void;
  mood: string | null;
}

const moodGreetings: Record<string, string> = {
  Happy: "Hi! I noticed you're happy. What's making your day great?",
  Sad: "Hi, I noticed you're feeling sad. Want to talk about what's going wrong?",
  Angry: "Hey, I see you're angry. Want to share what's bothering you?",
  Anxious: "Hi, I noticed you're anxious. Is there something making you nervous?",
};

export default function AIChat({ open, onClose, mood }: AIChatProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, `You: ${input}`]);
    setLoading(true);
    try {
      const reply = await getChatbotReply(input + (mood ? ` My mood is ${mood}.` : ''));
      setMessages(msgs => [...msgs, `Bot: ${reply}`]);
    } catch (err) {
      setMessages(msgs => [...msgs, `Bot: Sorry, I couldn't get a reply.`]);
    }
    setLoading(false);
    setInput('');
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      bgcolor: 'white',
      boxShadow: 3,
      borderRadius: 2,
      p: 2,
      zIndex: 9999,
      minWidth: 320,
      maxWidth: 350
    }}>
      <Typography variant="h6" gutterBottom>AI Chatbot</Typography>
      <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Bot: {moodGreetings[mood || 'Happy']}
        </Typography>
        {messages.map((msg, idx) => (
          <Typography key={idx} variant="body2">{msg}</Typography>
        ))}
        {loading && <Typography variant="body2">Bot is typing...</Typography>}
      </Box>
      <Box display="flex" gap={1}>
        <TextField
          size="small"
          variant="outlined"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          sx={{ flex: 1 }}
          disabled={loading}
        />
        <Button variant="contained" onClick={handleSend} disabled={loading}>Send</Button>
      </Box>
      <Button variant="text" sx={{ mt: 1 }} onClick={onClose}>Close</Button>
    </Box>
  );
}
