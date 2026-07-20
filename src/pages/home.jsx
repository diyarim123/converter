import React from "react";

export default function home() {
  return (
    <div>
      <nav className="navbar">
        <h1 className="font-bold font-white">File Converter<span className="font-bold text-2xl text-orange-500">.</span></h1>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
