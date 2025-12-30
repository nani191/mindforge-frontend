import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("⚠ Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.text();

      if (res.ok) {
        if (data === "User already exists") {
          alert("⚠ User already exists. Try login instead.");
        } else {
          alert("🎉 Signup Success!");
        }
      } else {
        alert("❌ Signup failed! Server error.");
      }
    } catch (err) {
      alert("❌ Network error, backend may be offline");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white shadow-lg p-6 rounded w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-600">Create Account</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded transition-all">
          Signup
        </button>
      </form>
    </div>
  );
}
