import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import { Home, About, Project, Contact } from './pages'

const App = () => {
    return (
       <main className="bg-orange-200">
            <Router>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/project" element={<Project />}/>
                    <Route path="/contact" element={<Contact />}/>
                </Routes>
            </Router>
       </main>
    )
}

export default App;