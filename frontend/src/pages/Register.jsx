import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = React.useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      nav("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md mx-auto glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Create Account</h2>
      {err && <div className="bg-red-500/80 text-white p-2 rounded mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 rounded bg-white/10 text-white" placeholder="Full name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded bg-white/10 text-white" placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-3 rounded bg-white/10 text-white" placeholder="Password" />
        <button className="w-full py-3 rounded bg-white text-gradientStart font-semibold">Register</button>
      </form>
    </motion.div>
  );
}
