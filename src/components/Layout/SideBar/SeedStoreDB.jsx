import React, { useState, useEffect } from 'react';
import jsonData from './stock_data_filtered.json';
import { db, auth } from '../../../lib/firebase'; // Assuming you have auth from Firebase
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const SeedStoreDB = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const checkAndSeedDatabase = async () => {
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

        // If the store is found, check the initialized field
        if (!querySnapshot.empty) {
          const storeDoc = querySnapshot.docs[0];
          const isInitialized = storeDoc.data().initialized;

          // If the store is not initialized, proceed to seed the database
          if (!isInitialized) {
            const inventoryCollectionRef = collection(storeDoc.ref, 'inventory');

            // Iterate through your JSON data and add each object as a document in the "inventory" collection
            for (const item of jsonData) {
              try {
  
                // Create a reference to the document in the "inventory" collection
                const inventoryDocRef = doc(inventoryCollectionRef);

                // Set the document data with the JSON item and additional properties (if needed)
                await setDoc(inventoryDocRef, {
                  ...item,
                });

                console.log('Document added to "inventory" collection:', item);
              } catch (error) {
                console.error('Error adding document to "inventory" collection:', error);
              }
            }

            // Update the initialized field to true
            await updateDoc(storeDoc.ref, { initialized: true });
          } else {
            console.log('Database already seeded for the signed-in user.');
          }
        } else {
          console.error('Store not found for the signed-in user.');
        }
      } catch (error) {
        console.error('Error querying "stores" collection:', error);
      }

      setLoading(false);
    };

    checkAndSeedDatabase();
  }, []);

  return (
    <div>
      <h1>Seed Firestore Collection with JSON Data</h1>
      {isLoading ? <p>Setting up your store inventory...</p> : <p>Database seeding completed.</p>}
    </div>
  );
};

export default SeedStoreDB;
