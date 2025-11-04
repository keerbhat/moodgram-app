import React, { useState } from 'react';
import { Button, Typography, Stack } from '@mui/material';

const moods = ['Happy', 'Sad', 'Angry', 'Anxious'];

export default function MoodSelector({ onSelect }: { onSelect: (mood: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Stack spacing={2} alignItems="center" mt={8}>
      <Typography variant="h4">How are you feeling today?</Typography>
      <Stack direction="row" spacing={2}>
        {moods.map(mood => (
          <Button
            key={mood}
            variant={selected === mood ? 'contained' : 'outlined'}
            onClick={() => { setSelected(mood); onSelect(mood); }}
          >
            {mood}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}