import { useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  useEffect(() => {
    function signup(event) {
      event.preventDefault();
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            showMessage('Sign-up successful!');
          } else {
            showMessage(`Sign-up failed: ${data.message}`);
          }
        });
    }

    function login(event) {
      event.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            showLoginMessage('Login successful!');
          } else {
            showLoginMessage(`Login failed: ${data.message}`);
          }
        });
    }

    function showMessage(message) {
      document.getElementById('signup-message').textContent = message;
    }

    function showLoginMessage(message) {
      document.getElementById('login-message').textContent = message;
    }

    function checkPasswordStrength() {
      const password = document.getElementById('signup-password').value;
      const strengthBar = document.getElementById('strength-bar');
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]+/)) strength += 1;
      if (password.match(/[A-Z]+/)) strength += 1;
      if (password.match(/[0-9]+/)) strength += 1;
      if (password.match(/[$@#&!]+/)) strength += 1;
      switch (strength) {
        case 0:
          strengthBar.style.width = '0';
          strengthBar.style.backgroundColor = 'red';
          break;
        case 1:
          strengthBar.style.width = '20%';
          strengthBar.style.backgroundColor = 'red';
          break;
        case 2:
          strengthBar.style.width = '40%';
          strengthBar.style.backgroundColor = 'orange';
          break;
        case 3:
          strengthBar.style.width = '60%';
          strengthBar.style.backgroundColor = 'yellow';
          break;
        case 4:
          strengthBar.style.width = '80%';
          strengthBar.style.backgroundColor = 'lightgreen';
          break;
        case 5:
          strengthBar.style.width = '100%';
          strengthBar.style.backgroundColor = 'green';
          break;
      }
    }

    function showLogin() {
      document.getElementById('signup-container').style.display = 'none';
      document.getElementById('login-container').style.display = 'block';
    }

    document.getElementById('signup-form').addEventListener('submit', signup);
    document.getElementById('login-form').addEventListener('submit', login);
    document.getElementById('signup-password').addEventListener('input', checkPasswordStrength);
    document.querySelector('.login-link').addEventListener('click', showLogin);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>British Columbia Forum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Welcome to British Columbia, Vancouver" />

      <div className="navbar">
        <div className="title">British Columbia, Vancouver</div>
        <div>
          <a href="#">Home</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className="container" id="signup-container">
        <h1>Sign Up</h1>
        <form id="signup-form">
          <input type="text" id="signup-username" placeholder="Username" required />
          <input type="password" id="signup-password" placeholder="Password" required />
          <div className="complexity-label">Complexity level</div>
          <div className="password-strength">
            <div className="strength-bar" id="strength-bar"></div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p id="signup-message"></p>
        <p>Already signed up? <a href="#" className="login-link">Log in here</a></p>
      </div>

      <div className="container" id="login-container" style={{ display: 'none' }}>
        <h1>Login</h1>
        <form id="login-form">
          <input type="text" id="login-username" placeholder="Username" required />
          <input type="password" id="login-password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p id="login-message"></p>
      </div>

      <Footer />

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          background-image: url('background-image.jpg');
          background-size: cover;
          background-position: center;
          color: #fff;
        }
        .navbar {
          width: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          overflow: auto;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
        }
        .navbar a {
          color: white;
          text-align: center;
          padding: 14px 20px;
          text-decoration: none;
          font-size: 17px;
        }
        .navbar a:hover {
          background-color: #ddd;
          color: black;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
        }
        .container {
          background-color: rgba(0, 0, 0, 0.7);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 300px;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        form {
          margin-bottom: 20px;
        }
        input,
        button {
          margin: 8px 0;
          padding: 8px;
          width: calc(100% - 16px);
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        button {
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
        #signup-message,
        #login-message {
          color: red;
          margin-top: 10px;
        }
        .password-strength {
          height: 10px;
          width: 100%;
          background-color: #ddd;
          border-radius: 4px;
          margin: 8px 0;
        }
        .strength-bar {
          height: 100%;
          width: 0;
          background-color: red;
          border-radius: 4px;
          transition: width 0.3s;
        }
        .login-link {
          color: #4caf50;
          text-decoration: none;
          font-weight: bold;
        }
        .login-link:hover {
          text-decoration: underline;
        }
        .complexity-label {
          text-align: left;
          font-size: 14px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
