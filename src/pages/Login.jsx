import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Logo from "../assets/logo.jpeg";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Login Success:", result.user);

      window.location.href = "/about";
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
          setErrorMsg("Email atau password salah");
          break;

        case "auth/user-not-found":
          setErrorMsg("User tidak ditemukan");
          break;

        case "auth/wrong-password":
          setErrorMsg("Password salah");
          break;

        case "auth/too-many-requests":
          setErrorMsg(
            "Terlalu banyak percobaan login. Coba lagi nanti."
          );
          break;

        default:
          setErrorMsg(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-700 flex items-center justify-center px-4">
      
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
        <img
          src={Logo}
          alt="Ichiban Sangu"
          className="w-28 h-28 mx-auto object-contain mb-4"
        />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-700">
            ICHIBAN SANGU
          </h1>

          <p className="text-gray-500 mt-2">
            Login ke sistem
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
              placeholder="admin@ichibansangu.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
              placeholder="********"
              required
            />
          </div>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white py-3 rounded-xl hover:bg-red-800 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>

          <a href="/register">Belum punya akun? (masih belum bisa)</a>
        </form>
      </div>
    </div>
  );
}