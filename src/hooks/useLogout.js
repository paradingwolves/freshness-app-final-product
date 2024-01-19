import { signOut } from "firebase/auth";
import { auth as firebaseAuth } from "../lib/firebase"; // Rename 'auth' to 'firebaseAuth'

const useFirebaseLogout = () => {
  const auth = firebaseAuth; // Use the renamed variable 'firebaseAuth'

  const logout = async () => {
    try {
      await signOut(auth);
      // You can add any additional logout actions here (e.g., clearing user data from local storage)
    } catch (error) {
      /* console.error('Error logging out:', error); */
    }
  };

  return { logout };
};

export default useFirebaseLogout;