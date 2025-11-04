import React from 'react';
import { Button } from '@mui/material';

export default function FollowButton({ isFollowing, onToggle }: { isFollowing: boolean, onToggle: () => void }) {
  return (
    <Button variant={isFollowing ? 'contained' : 'outlined'} onClick={onToggle}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
