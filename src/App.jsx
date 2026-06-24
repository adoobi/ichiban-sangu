
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Register from "./pages/Register";
import Order from "./pages/Order";
import MenuDetail from "./pages/MenuDetail";

function App() {

  return (
    <BrowserRouter basename="/ichiban-sangu">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/about" element={<About />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/order" element={<Order />} />

        <Route path="/menu/:name" element={<MenuDetail />} />


        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;