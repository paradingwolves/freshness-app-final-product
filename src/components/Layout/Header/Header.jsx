import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout.css';
import { useAuth } from '../../../hooks/auth';
import useFirebaseLogout from '../../../hooks/useLogout';

const Header = () => {
  const { user, isLoading } = useAuth();
  const { logout } = useFirebaseLogout();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg text-center navbar-dark bg-dark">
      <div className="container navcontainer">
        <a className="navbar-brand" href="/protected/home">
          <img src="https://www.petvalu.ca/file/general/brand-logo-petvalu_dark.svg" alt="Pet Valu Logo" height="40" />
        </a>
        <div className="mobNav notMobileHidden">
          <input type="checkbox" className="mobNavToggler navbar-toggler" />
          <div className="mobNavBurger">
            <div></div>
          </div>
          <div className="mobNavMenu">
            <div>
              <div>
                <ul>
                  <li><a href="/protected/home">Home</a></li>
                  <li><a href="/protected/add_stock">Add Stock</a></li>
                  <li><a href="/protected/expired_products">Expired Products</a></li>
                  <li><a href="/protected/add_bug_report">Submit Bug Report</a></li>
                  {user && (
                    <li className='nav-link' onClick={logout}>Logout</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse mobNavMenu" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/protected/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/protected/add_stock">Add Stock</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/protected/expired_products">Expired Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/protected/add_bug_report">Submit Bug Report</a>
            </li>
            {user && (
              <li className='nav-link' onClick={logout}>Logout</li>
            )}
          </ul>
          
        </div>{user && ( <span className="storenum">Signed in as Store #{user.store_number}</span> )}
      </div>
    </nav>
    
    </>
    
  );
}

export default Header;
