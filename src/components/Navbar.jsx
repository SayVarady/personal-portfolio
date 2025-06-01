import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <header className="header flex">
            <NavLink to="/" className="w-10 h-10 font-bold rounded-lg bg-white items-center justify-center flex ml-4 shadow-md">
                <center>CQ</center>
            </NavLink>
            <nav className="flex text-lg gap-7 font-medium">
                <NavLink to="/" className={({isActive}) => isActive ? 'text-blue-400' : 'text-black'}>Home</NavLink>
                <NavLink to="/about" className={({isActive}) => isActive ? 'text-blue-400' : 'text-black'}>About</NavLink>
                <NavLink to="/project" className={({isActive}) => isActive ? 'text-blue-400' : 'text-black'}>Project</NavLink>
                <NavLink to="/contact" className={({isActive}) => isActive ? 'text-blue-400' : 'text-black'}>Contact</NavLink>
            </nav>
        </header>

    )
}

export default Navbar;