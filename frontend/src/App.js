import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Fetch user balance and activation status
        fetchUserData(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchUserData = async (userId) => {
    // Fetch balance and activation status from your service
    // Replace with your logic to retrieve balance and activation 
    const userData = await getUserDataFromService(userId);
    setBalance(userData.balance);
    setIsActivated(userData.isActivated);
  };

  return (
    <div>
      {user ? (
        <Dashboard user={user} balance={balance} isActivated={isActivated} />
      ) : (
        <Login />
      )}
      <Payment />
    </div>
  );
};

export default App;
