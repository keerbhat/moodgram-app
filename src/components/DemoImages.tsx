import React from 'react';

const avatarImages = [
  '/avatars/Screenshot 2025-11-04 213957.png',
  '/avatars/Screenshot 2025-11-04 214013.png'
];

const postImages = [
  '/posts/Screenshot 2025-11-04 213748.png',
  '/posts/Screenshot 2025-11-04 213905.png',
  '/posts/Screenshot 2025-11-04 213926.png'
];

export default function DemoImages() {
  return (
    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <h2>Avatars</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
        {avatarImages.map((src, idx) => (
          <img key={idx} src={src} alt={`Avatar ${idx + 1}`} width={100} height={100} style={{ borderRadius: '50%' }} />
        ))}
      </div>
      <h2 style={{ marginTop: 40 }}>Posts</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
        {postImages.map((src, idx) => (
          <img key={idx} src={src} alt={`Post ${idx + 1}`} width={200} height={200} style={{ objectFit: 'cover', borderRadius: 16 }} />
        ))}
      </div>
    </div>
  );
}
