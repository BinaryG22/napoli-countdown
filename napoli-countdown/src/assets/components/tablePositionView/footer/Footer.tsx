import "./Footer.css";

const AUTHOR = "Antonio Palumbo";
const EMAIL = "palumbo.antonio@gmx.de";

function Footer() {
  return (
    <div className="footerContainer">
      <p>{AUTHOR} &copy; {new Date().getFullYear()}</p>
      <p>{EMAIL}</p>
    </div>
  );
}

export default Footer;
