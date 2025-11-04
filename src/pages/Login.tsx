import React, { useState } from 'react';
import { users } from '../utils/dummyData';
import { Button, Typography, Stack, Avatar } from '@mui/material';

export default function Login({ onLogin }: { onLogin: (userId: number) => void }) {
  return (
    <Stack spacing={2} alignItems="center" mt={8}>
      <Typography variant="h4">Login as:</Typography>
      <Stack direction="row" spacing={2}>
        {users.map(user => (
          <Button key={user.id} onClick={() => onLogin(user.id)}>
            <Avatar src={user.avatar} alt={user.name} />
            {user.name}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
