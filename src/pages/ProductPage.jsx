import { Container } from 'react-bootstrap'
import PTableComp from '../Components/PTableComp'
import '../dist/product.css'

import { IoBagAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/Padd');
    };

    return (
        <Container className='cont-product'>
            <div className="cont-head">
                <h1>Products</h1>
                <button onClick={() => handleAddProduct()} className='btn-add'><IoBagAdd /> <b>New Product</b></button>
            </div>
            <div className="cont-table">
                <PTableComp />
            </div>
        </Container>
    )
}

export default ProductPage;
