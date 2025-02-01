import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import add_icon from '../../assets/add_icon.png';
import order_icon from '../../assets/order_icon.png'; 
import parcel_icon from '../../assets/parcel_icon.png'; 

const Sidebar = () => {
 
  return (
    <div className="sidebar">
      <NavLink 
        to='/add' 
        className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
      >
        <img src={add_icon} alt="Add Items" className="sidebar-icon" />
        <p className="sidebar-text">Add Items</p>
      </NavLink>
      <NavLink 
        to='/list' 
        className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
      >
        <img src={order_icon} alt="List Items" className="sidebar-icon" />
        <p className="sidebar-text">List Items</p>
      </NavLink>
      <NavLink 
        to='/orders' 
        className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
      >
        <img src={parcel_icon} alt="Ordered Items" className="sidebar-icon" />
        <p className="sidebar-text">Ordered Items</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
