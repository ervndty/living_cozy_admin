import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../dist/cat.css';

const MySwal = withReactContent(Swal);

const EditCategoryComp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ nama_kategori: '' });

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const fetchCategoryDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching category details:', error);
            MySwal.fire({
                title: 'Error!',
                text: 'Failed to fetch category details.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, category);
            MySwal.fire({
                title: 'Success!',
                text: 'Category has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/category'); // Redirect to categories list after update
            });
        } catch (error) {
            console.error('Error updating category:', error);
            MySwal.fire({
                title: 'Error!',
                text: 'An error occurred while updating the category.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Container className="cont-edit">
            <h1>Edit Category</h1>
            <div className="cont-form">
                <Form className="form" onSubmit={handleSubmit}>
                    <Form.Group className="form-g5" controlId="formCategoryName">
                        <Form.Label className="name-category"><b>Category Name</b></Form.Label>
                        <Form.Control
                            className="input-place1"
                            type="text"
                            name="nama_kategori"
                            value={category.nama_kategori}
                            onChange={handleInputChange}
                            placeholder="Enter name"
                        />
                    </Form.Group>
                    <button type="submit"><FaCheck /> <b>Done</b></button>
                </Form>
            </div>
        </Container>
    );
};

export default EditCategoryComp;
