import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // ✅ ahora sí se usará

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
          console.log('Nombre de usuario guardado:', data.username);

          // ✅ Redirigir al usuario a /home (puedes cambiar la ruta si quieres)
          navigate('/home');
        }

      } else {
        setError('Respuesta inesperada del servidor');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión con el servidor');
      setSuccess('');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>

      <p>¿No tienes una cuenta?</p>
      <Link to="/register">
        <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
          Registrarse
        </button>
      </Link>
    </div>
  );
};

export default Login;
