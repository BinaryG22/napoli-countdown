const AUTHOR = "Antonio Palumbo";
const EMAIL = "toni.antonio.palumbo@gmail.com";

function Footer() {
  return (
    <footer
      className=" container-fluid flex-shrink-0 py-4 bg-dark text-white-50 footer"
      style={{ minHeight: "1rem", marginTop:"5vw"}}
    >

      <div className="row">
        <div className="col-6 d-flex justify-content-center align-items-center ">
          <span>
            {AUTHOR} &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center ">
          <span>{EMAIL}</span>
        </div>
      </div>




    </footer>
  );
}

export default Footer;
