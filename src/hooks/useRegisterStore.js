import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';

const useRegisterStore = () => {
  const auth = getAuth();
  const firestore = getFirestore();
  const [error, setError] = useState(null);

  const registerStore = async (email, password, storeNumber) => {
    try {
      // Create a new Firebase user
      const authUserCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Access the user from the authUserCredential
      const authUser = authUserCredential.user;

      if (!authUser?.uid) {
        throw new Error('Failed to create user. Missing UID.');
      }

      // Create a corresponding document in the "stores" collection
      const storeDocRef = doc(collection(firestore, 'stores'), authUser.uid);

      if (!storeDocRef.id) {
        throw new Error('Failed to create store document. Missing ID.');
      }

      // Create the store document with inventory subcollection
      await setDoc(storeDocRef, {
        email,
        id: authUser.uid,
        store_number: Number(storeNumber),
        initialized: false
       
      });

      // Create the "inventory" subcollection
      const inventoryCollectionRef = collection(storeDocRef, 'inventory');
      await addDoc(inventoryCollectionRef, {
        // Add initial data for the inventory
      });

      // Clear any previous errors
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return { registerStore, error };
};

export default useRegisterStore;
