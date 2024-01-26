import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { format, isBefore, startOfDay } from 'date-fns';
import { getAuth } from 'firebase/auth';

const useFetchExpiredStockData = () => {
  const [expiredStockData, setExpiredStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setCurrentUser(user);

    const fetchExpiredStockData = async () => {
        try {
          const userStoreRef = doc(db, 'stores', user.uid);
          const storeSnapshot = await getDoc(userStoreRef);
  
          if (storeSnapshot.exists()) {
            const storeData = storeSnapshot.data();
            const stockCollectionRef = collection(db, 'stores', user.uid, 'inventory');
  
            const unsubscribe = onSnapshot(stockCollectionRef, (snapshot) => {
                const today = startOfDay(new Date());
              const formattedData = snapshot.docs
                .map((doc) => {
                  const data = doc.data();
                  return {
                    id: doc.id,
                    ...data,
                    expiry_date: data.expiry_date ? format(new Date(data.expiry_date), 'MM/dd/yyyy') : null,
                  };
                })
                .filter((item) => {
                    const expiryDate = new Date(item.expiry_date);
                    // Filter items with quantity greater than 0 and expiry date today or before today
                    return item.quantity > 0 && isBefore(expiryDate, today);
                  });
  
              setExpiredStockData(formattedData);
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
            fetchExpiredStockData();
            }

            }, [currentUser]);

            return { expiredStockData, loading };
            };

export default useFetchExpiredStockData;
