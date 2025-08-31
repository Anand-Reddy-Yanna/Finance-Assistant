import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
      {err && <div className="bg-red-500/80 text-white p-2 rounded mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 rounded bg-white/10 text-white" placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-3 rounded bg-white/10 text-white" placeholder="Password" />
        <button className="w-full py-3 rounded bg-white text-gradientStart font-semibold hover:opacity-95 transition">Login</button>
      </form>
      <p className="text-white/80 mt-4">Don't have an account? <Link to="/register" className="underline">Register</Link></p>
    </motion.div>
  );
}
