import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddProducts from "./pages/AddProducts";
import EditProduct from "./pages/EditProduct";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
