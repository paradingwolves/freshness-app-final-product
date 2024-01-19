import { RouterProvider } from 'react-router-dom';
//  import `router` property
import {router} from './lib/routes';
import { doc, getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';




function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <>
    <RouterProvider router={router} />
      <FirestoreProvider sdk={firestoreInstance}>
      </FirestoreProvider>
    </>
    
  );
}

export default App;
