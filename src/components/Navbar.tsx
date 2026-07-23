import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="font-bold font-white">
        File Converter
        <span className="font-bold text-2xl text-orange-500">.</span>
      </h1>
      <ul className="nav-links">
        <li>
          <NavLink className="link" to="/">
            Files
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/about">
            Images
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/services">
            Currencies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
