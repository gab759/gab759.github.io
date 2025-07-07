import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSuccess('');
      } else if (data.message) {
        setSuccess(data.message);
        setError('');
        if (data.username) {
          localStorage.setItem('username', data.username);
          navigate('/home');
        }
      } else {
        setError('Respuesta inesperada del servidor');
        setSuccess('');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
      setSuccess('');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '40px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: '#ffffff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Ingresar
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>¿No tienes una cuenta?</p>
      <Link to="/register">
        <button style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Registrarse
        </button>
      </Link>
    </div>
  );
};

export default Login;