import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

interface CommentSectionProps {
  postId: number;
  comments: string[];
  addComment: (postId: number, comment: string) => void;
}

export default function CommentSection({ postId, comments, addComment }: CommentSectionProps) {
  const [text, setText] = useState('');

  return (
    <Box mt={2}>
      <Typography variant="subtitle2">Comments:</Typography>
      {comments.map((c, idx) => (
        <Typography key={idx} variant="body2" sx={{ ml: 2 }}>{c}</Typography>
      ))}
      <Box display="flex" gap={1} mt={1}>
        <TextField
          size="small"
          variant="outlined"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            if (text.trim()) {
              addComment(postId, text);
              setText('');
            }
          }}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
