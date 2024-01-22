import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";

export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true); // true because useAuth() always loads when the page loads
    const [user, setUser] = useState(null);

    // Log the signed-in user
    console.log("Signed-in user:", authUser);

    // Every time authLoading changes, the useEffect hook runs
    useEffect(() => {
        async function fetchData() {
            const ref = doc(db, "stores", authUser.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data());
        }

        if (!authLoading) {
            if (authUser) {
                setLoading(true); // Set loading to true before fetching user data
                fetchData().then(() => setLoading(false)); // Set loading to false after user data is fetched
            } else {
                setLoading(false); // Not signed in
            }
        }
    }, [authLoading]);

    return { user, isLoading, error };
}
