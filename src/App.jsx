
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import About from "./pages/About"
import Register from "./pages/Register"
import Order from "./pages/Order"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/About" element={<About />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/order" element={<Order />} />


        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;