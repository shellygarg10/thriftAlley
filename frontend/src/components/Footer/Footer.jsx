import './Footer.css';
import logo from '../../assets/logo.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';
import pinterest_icon from '../../assets/pinterest_icon.png';
import instagram_icon from '../../assets/instagram_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-col" id='footer-1'>
        <img src={logo} alt="brand-logo"/>
        <h1>Connect with us</h1>
        <div className='social-logos'>
            <a href='/'><img src={whatsapp_icon} alt='whatsapp' className="social-icon"/></a>
            <a href='/'><img src={instagram_icon} alt='instagram' className="social-icon"/></a>
            <a href='/'><img src={pinterest_icon} alt='pinterest'className="social-icon"/></a>
        </div>
      </div>
      <div className="footer-col">
        <h1>Contact Us</h1>
        <h2>Email</h2>
        <p>shellygarg3522@gmail.com</p>
        <h2>Phone</h2>
        <p>+91 8588 925 766</p>
        <h2>Address</h2>
        <p>Thrifted Ltd, 3 Cliffside Trade Park, Motherwell Way, Grays, RM20 3XD</p>
      </div>
      <div className="footer-col">
        <h1>Information</h1>
        <p>About Us</p>
        <p>F.A.Q.</p>
        <p>Message Us</p>
        <p>Return Your Order</p>
        <p>Shipping</p>
        <p>Sizing</p>
        <p>Returns Policy</p>
        <p>Terms Of Service</p>
      </div>
    </div>
  )
}
export default Footer;
