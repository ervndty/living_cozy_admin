import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BsFillArchiveFill, 
    BsFillGrid3X3GapFill, 
    BsPeopleFill, 
    BsFillBellFill
} from 'react-icons/bs';

import './dist/home.css';

function Home() {
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);

    useEffect(() => {
        // Fetch product count
        axios.get('http://localhost:8000/api/products/count')
            .then(response => {
                setProductCount(response.data.jumlah_product);
            })
            .catch(error => {
                console.error('Error fetching product count:', error);
            });

        // Fetch category count
        axios.get('http://localhost:8000/api/categories/count')
            .then(response => {
                setCategoryCount(response.data.jumlah_category);
            })
            .catch(error => {
                console.error('Error fetching category count:', error);
            });

        axios.get('http://localhost:8000/api/user/count')
            .then(response => {
                setUserCount(response.data.jumlah_user);
            })
            .catch(error => {
                console.error('Error fetching customer count:', error);
            });

        axios.get('http://localhost:8000/api/payment/count')
            .then(response => {
                setTransactionCount(response.data.jumlah_transaction);
            })
            .catch(error => {
                console.error('Error fetching transaction count:', error);
            });
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{productCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{categoryCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{userCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TRANSACTIONS</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{transactionCount}</h1>
                </div>
            
            </div>
        </main>
    );
}

export default Home;
