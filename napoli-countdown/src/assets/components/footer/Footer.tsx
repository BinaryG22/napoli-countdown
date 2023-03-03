const AUTHOR = "Antonio Palumbo";
const EMAIL = "palumbo.antonio@gmx.de";

function Footer() {
  return (
    <div
      className=" container-fluid flex-shrink-0 py-4 bg-dark text-white-50"
      style={{ minHeight: "2.5rem"}}
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

    </div>
  );
}

export default Footer;
