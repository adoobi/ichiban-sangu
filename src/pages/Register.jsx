import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Logo from "../assets/logo.jpeg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Password dan Konfirmasi Password tidak sama");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User Created:", result.user);

      setSuccessMsg("Registrasi berhasil!");

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Email sudah terdaftar");
          break;

        case "auth/invalid-email":
          setErrorMsg("Format email tidak valid");
          break;

        case "auth/weak-password":
          setErrorMsg("Password terlalu lemah");
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
          <h1 className="text-3xl font-bold text-red-700">
            ICHIBAN SANGU
          </h1>
        <div className="text-center mb-8">
                <img
                src={Logo}
                alt="Ichiban Sangu"
                className="w-28 h-28 mx-auto object-contain mb-4"
                />
                </div>
          <p className="text-gray-500 mt-2">
            Buat akun baru
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Konfirmasi Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full mt-1 border rounded-xl px-4 py-3"
            />
          </div>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-100 text-green-700 p-3 rounded-xl text-sm">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white py-3 rounded-xl hover:bg-red-800 disabled:bg-gray-400"
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "../")}
            className="text-red-700 text-sm hover:underline cursor-pointer"
          >
            Sudah punya akun? Login
          </button>
        </div>
      </div>
    </div>
  );
}