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
    <nav className="w-full py-4 px-6 glass">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-semibold text-white">Finance Assistant</Link>
        <div className="flex items-center gap-4">
          <Link to="/transactions" className="text-white hover:underline">Transactions</Link>
          {user ? (
            <>
              <span className="text-white/90">Hi, {user.name}</span>
              <button onClick={onLogout} className="px-3 py-1 rounded-md bg-white/10 text-white transition hover:bg-white/20">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
