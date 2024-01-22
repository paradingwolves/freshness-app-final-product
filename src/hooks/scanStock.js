import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const useMatchingStockData = (barcode) => {
  const [matchingItems, setMatchingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchingItems = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not signed in.');
          setLoading(false);
          return;
        }

        const userId = user.uid;

        // Create a reference to the "stores" collection
        const storesCollectionRef = collection(db, 'stores');

        // Query for the store where the id field matches the id of the signed-in user
        const storeQuery = query(storesCollectionRef, where('id', '==', userId));
        const storeQuerySnapshot = await getDocs(storeQuery);

        // Check if the store is found
        if (!storeQuerySnapshot.empty) {
          const storeDoc = storeQuerySnapshot.docs[0];
          const inventoryCollectionRef = collection(storeDoc.ref, 'inventory');

          // Query for the matching item in the store's inventory
          const stockQuery = query(inventoryCollectionRef, where('barcode_number', '==', Number(barcode)));
          const stockQuerySnapshot = await getDocs(stockQuery);

          const matchingItemsData = stockQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMatchingItems(matchingItemsData);
        } else {
          console.error('Store not found for the signed-in user.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching matching items:', error);
        setLoading(false);
      }
    };

    if (barcode) {
      fetchMatchingItems();
    } else {
      // Reset matching items if barcode is empty
      setMatchingItems([]);
    }
  }, [barcode]);

  return { matchingItems, loading };
};

export default useMatchingStockData;
