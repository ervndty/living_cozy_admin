import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../dist/product.css'

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get('http://localhost:8000/api/payment/all-history')
            .then(response => {
                console.log('Fetched transactions:', response.data); // Log the fetched data
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleApproveTransaction = (id) => {
        axios.post(`http://localhost:8000/api/payment/approve/${id}`)
            .then(response => {
                setTransactions(transactions.map(transaction =>
                    transaction.id === id ? { ...transaction, status: 'success' } : transaction
                ));
                Swal.fire({
                    icon: 'success',
                    title: 'Transaction Approved!',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error approving transaction:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to approve transaction. Please try again later.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleDeleteTransaction = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this transaction!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/payment/${id}`)
                    .then(response => {
                        fetchTransactions(); // Fetch updated list after deletion
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        console.error('Error deleting transaction:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete transaction. Please try again later.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };

    return (
        <div className="cont-table">
            <h1>Transaction History</h1>
            <Paper className="cont-table1" sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Products</strong></TableCell>
                                <TableCell><strong>Customer</strong></TableCell>
                                <TableCell><strong>Quantity</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Total Amount</strong></TableCell>
                                <TableCell align="left"><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.items.map(item => item.name).join(', ')}</TableCell>
                                    <TableCell>{transaction.customer_first_name}</TableCell>
                                    <TableCell>{transaction.items.length}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>{transaction.price}</TableCell>
                                    <TableCell>
                                        <div className="btn-table">
                                            <button
                                                className='btn-approve'
                                                onClick={() => handleApproveTransaction(transaction.id)}
                                                disabled={transaction.status === 'success'}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className='btn-trash1'
                                                onClick={() => handleDeleteTransaction(transaction.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default TransactionPage;
