import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoodSelector from './pages/MoodSelector';
import Feed from './components/Feed';
import Login from './pages/Login';
import DemoImages from './components/DemoImages';
import { users } from './utils/dummyData';

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [following, setFollowing] = useState<number[]>([]);

  const handleLogin = (id: number) => {
    setUserId(id);
    setFollowing(users.filter(u => u.id !== id).map(u => u.id)); // Follow all others by default
  };

  return (
    <Router>
      <Routes>
        <Route path="/demo-images" element={<DemoImages />} />
        <Route
          path="/"
          element={
            !userId ? (
              <Login onLogin={handleLogin} />
            ) : !mood ? (
              <MoodSelector onSelect={setMood} />
            ) : (
              <Feed mood={mood} userId={userId} following={following} setFollowing={setFollowing} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;