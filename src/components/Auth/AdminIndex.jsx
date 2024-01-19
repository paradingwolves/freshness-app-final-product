import React, { useEffect } from 'react';
import { useNavigate, Outlet} from 'react-router-dom';
import { LOGIN } from '../../lib/routes';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import { useAuth } from '../../hooks/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
/* import Loading from '../../loading/Loading'; */


const AdminIndex = () => {

    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        const auth = getAuth();
    
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            navigate(LOGIN);
          }

        });
      }, [navigate, isLoading]);
      if (isLoading) return "Loading";

    return (
        <div>
            <Header />
                <Outlet />
            <Footer />
        </div>
    )
}

export default AdminIndex;
