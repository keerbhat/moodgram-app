import React, { useState } from 'react';
import { posts, users } from '../utils/dummyData';
import { Card, CardMedia, CardContent, Typography, Box, Button, Avatar } from '@mui/material';
import FollowButton from './FollowButton';
import CommentSection from './CommentSection';
import AIChat from './AIChat';

interface FeedProps {
  mood: string | null;
  userId: number;
  following: number[];
  setFollowing: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function Feed({ mood, userId, following, setFollowing }: FeedProps) {
  const [showSensitive, setShowSensitive] = useState<number[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: string[] }>({});
  const [aiOpen, setAiOpen] = useState(false);

  const handleToggleFollow = (id: number) => {
    setFollowing(following.includes(id) ? following.filter(f => f !== id) : [...following, id]);
  };

  const addComment = (postId: number, comment: string) => {
    setComments(prev => {
      const newComments = { ...prev, [postId]: [...(prev[postId] || []), comment] };
      // Simple AI trigger: if 2+ comments contain 'sad', 'bad', or are repeated
      const allComments = Object.values(newComments).flat();
      const sadWords = ['sad', 'bad', 'upset', 'depressed', 'unhappy'];
      const sadCount = allComments.filter(c => sadWords.some(w => c.toLowerCase().includes(w))).length;
      const repeated = allComments.length > 1 && allComments.slice(-2)[0] === allComments.slice(-2)[1];
      if (sadCount >= 2 || repeated) setAiOpen(true);
      return newComments;
    });
  };

  return (
    <Box>
      <Typography variant="h5" align="center" mt={2}>Your Feed</Typography>
      <Box display="flex" gap={2} justifyContent="center" mt={2}>
        {users.filter(u => u.id !== userId).map(user => (
          <Box key={user.id} textAlign="center">
            <Avatar src={user.avatar} alt={user.name} />
            <Typography>{user.name}</Typography>
            <FollowButton isFollowing={following.includes(user.id)} onToggle={() => handleToggleFollow(user.id)} />
          </Box>
        ))}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={4}>
        {posts.filter(post => following.includes(post.userId)).map(post => {
          const user = users.find(u => u.id === post.userId);
          const isSensitive = mood && post.mood !== mood && !showSensitive.includes(post.id);
          return (
            <Card key={post.id} sx={{ width: 250, position: 'relative', mb: 2 }}>
              <CardMedia
                component="img"
                height="180"
                image={post.image}
                alt={post.caption}
                sx={{
                  filter: isSensitive ? 'blur(8px)' : 'none',
                  transition: 'filter 0.3s'
                }}
              />
              {isSensitive && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    flexDirection: 'column'
                  }}
                >
                  Sensitive content<br />
                  <Typography variant="body2">Doesn't match your mood</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => setShowSensitive([...showSensitive, post.id])}
                  >
                    Show Anyway
                  </Button>
                </Box>
              )}
              <CardContent>
                <Typography variant="subtitle2">{user?.name}</Typography>
                <Typography variant="body2">{post.caption}</Typography>
                <CommentSection
                  postId={post.id}
                  comments={comments[post.id] || []}
                  addComment={addComment}
                />
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <AIChat open={aiOpen} onClose={() => setAiOpen(false)} mood={mood} />
    </Box>
  );
}
