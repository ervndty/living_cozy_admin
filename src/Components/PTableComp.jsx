import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../dist/product.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const columns = [
  { id: 'product_id', label: 'ID', minWidth: 20, align: 'center' },
  { id: 'product_name', label: 'Name', minWidth: 150 },
  { id: 'stock', label: 'Stock', minWidth: 80, align: 'center' },
  { id: 'category_id', label: 'Category', minWidth: 150, align: 'left' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'left', format: (value) => value.toLocaleString('ID') },
  { id: 'description', label: 'Description', minWidth: 250, align: 'left' },
  { id: 'image_url', label: 'IMG', minWidth: 200, align: 'left' },
];

const MySwal = withReactContent(Swal);

const PTableComp = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products?limit=${rowsPerPage}&page=${page + 1}`);
      setRows(response.data.data);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditProduct = (id) => {
    navigate(`/Pedit/${id}`);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      fetchProducts(); // Refresh the list after deletion
      Swal.fire('Deleted!', 'The product has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error!', 'An error occurred while deleting the product.', 'error');
    }
  };

  const handleShowDeleteModal = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
      }
    });
  };

  return (
    <div className="cont-table">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>
                  <h3>Action</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.product_id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <div className="btn-table">
                        <button onClick={() => handleEditProduct(row.product_id)} className='btn-edit'><FaEdit /></button>
                        <button onClick={() => handleShowDeleteModal(row.product_id)} className='btn-trash'><FaTrash /></button>
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
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default PTableComp;
