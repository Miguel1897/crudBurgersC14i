import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/views/home/Home";
import Navigation from "./components/layouts/Navigation";
import Footer from "./components/layouts/Footer";
import ProductsTable from "./components/views/ProductsTable/ProductsTable";
import ProductCreate from "./components/views/productCreate/ProductCreate";
import ProductEdit from "./components/views/productEdit/ProductEdit";
import Error404 from "./components/views/error404/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [products, setProducts] =useState([]);
  useEffect(()=> {
    getApi();
  },[]);

  const getApi=async ()=>{
    try {
      const res= await fetch('http://localhost:3001/products');
      const productApi = await res.json();
      setProducts(productApi);
    }catch (error){
      console.log(error);
    }
  }

  
  
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/product/table"
              element={
                <ProductsTable  />
              }
            />
            <Route
              exact
              path="/product/create"
              element={<ProductCreate  />}
            />
            <Route
              exact
              path="/product/edit/:id"
              element={<ProductEdit  />}
            />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
