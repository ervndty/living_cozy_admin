import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CatTableComp from '../Components/CatTableComp';
import { IoBagAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../dist/product.css'

const CategoryPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from backend
        axios.get('http://localhost:8000/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleAddCategory = () => {
        navigate('/Cadd');
    };

    return (
        <Container className='cont-cat'>
            <div className="cont-head">
                <h1>Categories</h1>
                <button onClick={handleAddCategory} className='btn-add'><IoBagAdd /> <b>New Category</b></button>
            </div>
            <CatTableComp categories={categories} />
        </Container>
    );
}

export default CategoryPage;
