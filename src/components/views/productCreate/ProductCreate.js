import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateProductName,
  validatePrice,
  validateUrl,
  validateCategory,
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from  "../../../config/axiosInit"

const ProductCreate = ({ URL, getApi }) => {
  //States
  /*  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [urlImg, setUrlImg] = useState("");
  const [category, setCategory] = useState(""); */

  //One general state
  const [inputs, setInputs] = useState({});

  //useNavigate
  const navigate = useNavigate();

  const handleChange = (event) => {
   const name = event.target.name;
   const value = event.target.value;
   setInputs((values) => ( {...values, [name]: value } ))
  };

  //función para crear
  const handleSubmit = (e) => {
    e.preventDefault();

    //validar los campos
    if (
      /* !validateProductName(productName) ||
      !validatePrice(price) ||
      !validateUrl(urlImg) ||
      !validateCategory(category)
       */

      !validateProductName(inputs.productName) ||
      !validatePrice(inputs.price) ||
      !validateUrl(inputs.urlImg) ||
      !validateCategory(inputs.category)
    
    ) {
      Swal.fire("Oops!", "Some data is invalid", "Error");
      return;
    }

    //Enviar los datos
    const newProduct = {
    /*productName,
      price,
      urlImg,
      category, */
      productName: inputs.productName,
      price: inputs.price,
      urlImg: inputs.urlImg,
      category: inputs.category,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //la petición post con fetch
          /* const res = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }); */

          //la petición con Axios
           
          const res = await axios.post(URL, newProduct);
          console.log(res);

          if (res.status === 201) {
            Swal.fire(
              "Created",
              "Your product has been created successfully",
              "success"
            );
            // resetear el formulario
            e.target.reset(); //el e.target en este caso por el submit es el form
            //recarga la tabla
            getApi();
            //navega hasta la productsTable
            navigate("/product/table");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="productName"
              value={inputs.productName || ""}
              onChange={(e)=> handleChange(e)}
              // onChange={({ target }) => setProductName(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              name="price"
              value={inputs.price || ""}
              onChange={(e)=> handleChange(e)}
              // onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              name="urlImg"
              value={inputs.urlImg || ""}
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              onChange={(e)=> handleChange(e)}
              //  onChange={({ target }) => setUrlImg(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              name="category"
              value={inputs.category || ""}
              onChange={(e)=> handleChange(e)}
              //  onChange={({ target }) => setCategory(target.value)}
            >
              <option value="">Select an option</option>
              <option value="de-carne">de Carne</option>
              <option value="de-cerdo">de Cerdo</option>
              <option value="de-pollo">de Pollo</option>
              <option value="veganas">Veganas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postre">Postre</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
