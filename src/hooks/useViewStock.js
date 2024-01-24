import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { getAuth } from 'firebase/auth';

const useAllStockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setCurrentUser(user);

    const fetchStockData = async () => {
      try {
        const userStoreRef = doc(db, 'stores', user.uid);
        const storeSnapshot = await getDoc(userStoreRef);

        if (storeSnapshot.exists()) {
          const storeData = storeSnapshot.data();
          const stockCollectionRef = collection(db, 'stores', user.uid, 'inventory');

          const unsubscribe = onSnapshot(stockCollectionRef, (snapshot) => {
            const formattedData = snapshot.docs
              .map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  ...data,
                  expiry_date: data.expiry_date ? format(new Date(data.expiry_date), 'MM/dd/yyyy') : null,
                };
              })
              .filter((item) => item.quantity > 0); // Filter items with quantity greater than 0

            setStockData(formattedData);
            setLoading(false);
          });

          // Cleanup by unsubscribing from the snapshot listener when the component unmounts
          return () => unsubscribe();
        } else {
          // Handle case where user store data doesn't exist
          console.error('User store data not found.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchStockData();
    }

  }, [currentUser]);

  return { stockData, loading };
};

export default useAllStockData;
