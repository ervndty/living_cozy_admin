import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../dist/cat.css';

import { IoAddOutline } from "react-icons/io5";

const EditCategoryComp = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = () => {
        axios.post('http://localhost:8000/api/categories', { nama_kategori: categoryName })
            .then(response => {
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Category Added!',
                    text: `New category "${response.data.nama_kategori}" has been added.`,
                });
                // Clear input field or reset form if needed
                setCategoryName('');
            })
            .catch(error => {
                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message || 'Something went wrong!',
                });
            });
    };

    return (
        <Container className="cont-edit">
            <h1>New Category</h1>
            <div className="cont-form">
                <Form className="form">
                    <Form.Group className="form-g5" controlId="formBasicEmail">
                        <Form.Label className="name-category"><b>Category Name</b></Form.Label>
                        <Form.Control
                            className="input-place1"
                            type="text"
                            placeholder="Enter name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <button onClick={handleAddCategory}><IoAddOutline /> <b>Add</b></button>
            </div>
        </Container>
    );
}

export default EditCategoryComp;
