import React, { useEffect, useState } from 'react';
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
import '../dist/other.css';

const CustomersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data.data); // Sesuaikan dengan struktur data dari API Anda
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDeleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="cont-table">
      <h1>Customers</h1>
      <Paper className="cont-table1" sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 10 }}>
                  <h3>ID</h3>
                </TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  <h3>Name</h3>
                </TableCell>
                <TableCell style={{ minWidth: 100 }}>
                  <h3>Birth Date</h3>
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  <h3>Phone Number</h3>
                </TableCell>
                <TableCell style={{ minWidth: 250 }}>
                  <h3>Address</h3>
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  <h3>Gender</h3>
                </TableCell>
                <TableCell align="left" style={{ minWidth: 320 }}>
                  <h3>Action</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow hover tabIndex={-1} key={user.user_id}>
                    <TableCell>
                      <h4>{user.user_id}</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{user.name}</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{user.tgl_lahir}</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{user.no_hp}</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{user.alamat}</h4>
                    </TableCell>
                    <TableCell>
                      <h4>{user.jenis_kelamin}</h4>
                    </TableCell>
                    <TableCell>
                      <button className="btn-trash1" onClick={() => confirmDeleteUser(user.user_id)}>
                        <FaTrash />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CustomersPage;
