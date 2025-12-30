import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("⚠ Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const token = await res.text();

      if (token === "Invalid credentials") {
        alert("❌ Wrong password. Try again.");
      } else if (token === "User not found") {
        alert("⚠ User not found. Create account first.");
      } else {
        alert(`🔐 Logged in!\n\nTOKEN: ${token}`);
      }
    } catch (err) {
      alert("❌ Network error, backend may be offline");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-6 rounded w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

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

        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition-all">
          Login
        </button>
      </form>
    </div>
  );
}
