import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import '../dist/login.css';
import { FcGoogle } from 'react-icons/fc';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';


// Schema validasi dengan Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email diperlukan'),
  password: Yup.string().required('Password diperlukan')
});

const AdminLoginPage = ({ onLogin }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (token, userId) => {
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('user_id', userId);
    onLogin(); // Memanggil fungsi onLogin dari prop untuk memperbarui status login
    navigate('/'); // Mengarahkan pengguna ke halaman beranda
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/login', values);

      if (response.data.status) {
        handleLoginSuccess(response.data.access_token, response.data.user.user_id);
      } else {
        setError(response.data.message || 'Login gagal. Silakan coba lagi.');
      }
    } catch (err) {
      console.error(err);
      setError('Login gagal. Silakan periksa kembali email atau kata sandi Anda.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className='outer-cont'>
    <div className="login-container">
      <h2>Masuk Sekarang</h2>
      <p>Belum punya akun Living Cozy? <a href="/register"><b>Daftar</b></a></p>

      <Button className="google-button">
        <FcGoogle className="google-icon" /> <b>Google</b>
      </Button>

      <center>
        <p className="atau-daftar">-- atau masuk dengan --</p>
      </center>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block"
            >
              {isSubmitting ? 'Masuk...' : 'Masuk'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="syarat-ketentuan">
        Dengan masuk, saya menyetujui{' '}
        <a href="/terms"><b>Syarat dan Ketentuan</b></a> serta{' '}
        <a href="/privacy"><b>Kebijakan Privasi</b></a>
      </p>
    </div>
    </ Container>
  );
};

export default AdminLoginPage;
