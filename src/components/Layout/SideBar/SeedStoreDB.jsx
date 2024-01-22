import React, { useState } from 'react';
import jsonData from './stock_data_filtered.json';
import { db, auth } from '../../../lib/firebase'; // Assuming you have auth from Firebase
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const SeedStoreDB = () => {
  const [isLoading, setLoading] = useState(false);

  const seedCollection = async () => {
    setLoading(true);

    // Get the currently signed-in user
    const user = auth.currentUser;
    if (!user) {
      console.error('User not signed in.');
      setLoading(false);
      return;
    }

    const userId = user.uid;

    // Create a reference to the "stores" collection
    const storesCollectionRef = collection(db, 'stores');

    try {
      // Query for the store where the id field matches the id of the signed-in user
      const q = query(storesCollectionRef, where('id', '==', userId));
      const querySnapshot = await getDocs(q);

      // If the store is found, seed the "inventory" collection within that store
      if (!querySnapshot.empty) {
        const storeDoc = querySnapshot.docs[0];
        const inventoryCollectionRef = collection(storeDoc.ref, 'inventory');

        // Iterate through your JSON data and add each object as a document in the "inventory" collection
        for (const item of jsonData) {
          try {
            // Generate a unique ID for each document
            const id = uuidv4();

            // Create a reference to the document in the "inventory" collection
            const inventoryDocRef = doc(inventoryCollectionRef, id);

            // Set the document data with the JSON item and additional properties (if needed)
            await setDoc(inventoryDocRef, {
              ...item,
            });

            console.log('Document added to "inventory" collection:', item);
          } catch (error) {
            console.error('Error adding document to "inventory" collection:', error);
          }
        }
      } else {
        console.error('Store not found for the signed-in user.');
      }
    } catch (error) {
      console.error('Error querying "stores" collection:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Seed Firestore Collection with JSON Data</h1>
      <p>Click the button below to seed the "inventory" collection within the user's store:</p>
      <button onClick={seedCollection}>Seed Me</button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default SeedStoreDB;
