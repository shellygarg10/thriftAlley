import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = ({setToken}) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
  };
  return (
    <div className="navbar">
      <img className="navbar-logo" src={logo} alt="logo" />
      <button onClick={handleLogout}className="navbar-logout">Logout</button>
    </div>
  );
};

export default Navbar;
