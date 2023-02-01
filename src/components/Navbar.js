import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          {/* <>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
          </>
          <Link to="/account" className="navbar-item">
            Account
          </Link> */}
          {/* {isLoggedIn && (
            <div onClick={logOut} className="navbar-item">
              Log Out
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
