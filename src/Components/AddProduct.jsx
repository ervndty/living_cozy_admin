import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import '../dist/product.css';
import { IoAddOutline } from "react-icons/io5";

const EditProductComp = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    stock: "",
    price: "",
    category_id: "",
    image_url: "",
    description: ""
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/products", productData);
      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Reset form after successful submission
      setProductData({
        product_name: "",
        stock: "",
        price: "",
        category_id: "",
        image_url: "",
        description: ""
      });
    } catch (error) {
      console.error("There was an error adding the product!", error);
      Swal.fire({
        title: 'Error!',
        text: 'Error adding product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Container className="cont-edit">
      <h1>New Product</h1>
      <div className="cont-form">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="form-g1" controlId="formBasicEmail">
            <Form.Label className="name-product"><b>Product Name</b></Form.Label>
            <Form.Control 
              className="input-place1" 
              type="text" 
              placeholder="Enter name" 
              name="product_name" 
              value={productData.product_name} 
              onChange={handleChange} 
            />
            <Form.Label className="name-stock"><b>Stock</b></Form.Label>
            <Form.Control 
              className="input-place2" 
              type="number" 
              name="stock" 
              value={productData.stock} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="form-g2" controlId="formBasicEmail">
            <Form.Label className="name-price"><b>Price</b></Form.Label>
            <Form.Control 
              className="input-place1" 
              type="text" 
              placeholder="0" 
              name="price" 
              value={productData.price} 
              onChange={handleChange} 
            />
            <Form.Label className="name-category"><b>Category</b></Form.Label>
            <Form.Select 
              className="input-place2" 
              name="category_id" 
              value={productData.category_id} 
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.nama_kategori}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-g3" controlId="formBasicEmail">
            <Form.Label className="name-img"><b>IMG url</b></Form.Label>
            <Form.Control 
              className="input-place1" 
              type="url" 
              placeholder="data:image/" 
              name="image_url" 
              value={productData.image_url} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="form-g4">
            <Form.Label className="name-desc"><b>Description</b></Form.Label>
            <Form.Control 
              as="textarea" 
              className="input-place1" 
              name="description" 
              value={productData.description} 
              onChange={handleChange} 
            />
          </Form.Group>
          <Button type="submit">
            <IoAddOutline /><b>Add</b>
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditProductComp;
