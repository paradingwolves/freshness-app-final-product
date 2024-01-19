import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const useFirebaseEmailLogin = () => {
  // State to hold the authenticated user
  const [user, setUser] = useState(null);
  // State to hold authentication errors
  const [error, setError] = useState(null);

  // Effect hook to listen for changes in authentication state
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // If there is an authenticated user, set the user state
      if (authUser) {
        setUser(authUser);
      } else {
        // If no authenticated user, set user state to null
        setUser(null);
      }
    });

    // Cleanup function to unsubscribe from the authentication state changes
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Function to handle email login
  const login = async (email, password) => {
    try {
      // Attempt to sign in with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, clear any previous authentication errors
      setError(null);
    } catch (error) {
      // If there is an error during sign-in, set the error state
      setError(error.message);
    }
  };

  // Return the user, error, and login function for external use
  return { user, error, login };
};

export default useFirebaseEmailLogin;
