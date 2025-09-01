import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = React.useContext(AuthContext);
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    // <nav className="w-full py-4 px-6 glass">
    //   <div className="container mx-auto flex items-center justify-between">
    //     <Link to="/dashboard" className="text-xl font-semibold text-white">Finance Assistant</Link>
    //     <div className="flex items-center gap-4">
    //       <Link to="/transactions" className="text-white hover:underline">Transactions</Link>
    //       {user ? (
    //         <>
    //           <span className="text-white/90">Hi, {user.name}</span>
    //           <button onClick={onLogout} className="px-3 py-1 rounded-md bg-white/10 text-white transition hover:bg-white/20">Logout</button>
    //         </>
    //       ) : (
    //         <>
    //           <Link to="/login" className="text-white">Login</Link>
    //           <Link to="/register" className="text-white">Register</Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
    <nav className="w-full py-4 px-6 glass backdrop-blur-md">
  <div className="container mx-auto flex items-center justify-between">
    
    {/* Logo / Title */}
    <Link 
      to="/dashboard" 
      className="text-2xl font-bold text-white drop-shadow-lg hover:text-cyan-200 transition-colors duration-300"
    >
      Finance Assistant
    </Link>
    
    {/* Navigation Links */}
    <div className="flex items-center gap-6">
    <Link
  to="/dashboard"
  className="text-white hover:text-cyan-200 hover:underline transition-colors duration-300"
>
  Home
</Link>

      <Link 
        to="/transactions" 
        className="text-white hover:text-cyan-200 hover:underline transition-colors duration-300"
      >
        Transactions
      </Link>

      <Link to="/upload" className="text-white hover:text-cyan-200 hover:underline transition-colors duration-300">Upload</Link>

      {user ? (
        <>
          <span className="text-white/90">Hi, {user.name}</span>
          <button 
            onClick={onLogout} 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-orange-400 hover:to-cyan-300 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link 
            to="/login" 
            className="px-4 py-2 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 transition-all duration-300"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-orange-400 hover:to-cyan-300 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
          >
            Register
          </Link>
        </>
      )}
    </div>
  </div>
</nav>

  );
}
