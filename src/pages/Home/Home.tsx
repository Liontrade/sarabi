import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome, {user.email}!</h1>
      <p>You are now logged in.</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
