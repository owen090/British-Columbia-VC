import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState, useEffect } from 'react'

export default function Home() {
  const [passwordStrength, setPasswordStrength] = useState(0)

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length > 5) strength += 20
    if (password.match(/[A-Z]/)) strength += 20
    if (password.match(/[0-9]/)) strength += 20
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20
    if (password.length > 10) strength += 20
    setPasswordStrength(strength)
  }

  useEffect(() => {
    const passwordInput = document.getElementById('signup-password')
    passwordInput.addEventListener('input', (event) => {
      checkPasswordStrength(event.target.value)
    })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="navbar">
          <div className="title">British Columbia, Vancouver</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <h1>Sign Up</h1>
          <form id="signup-form">
            <input type="text" id="signup-username" placeholder="Username" />
            <input type="password" id="signup-password" placeholder="Password" />
            <div className="complexity-label">Complexity level</div>
            <div className="password-strength">
              <div
                className="strength-bar"
                style={{ width: `${passwordStrength}%`, backgroundColor: getStrengthColor(passwordStrength) }}
              ></div>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already signed up? <a href="#" className="login-link">Log in here</a></p>
        </div>
      </main>

      <footer className="footer">
        <Footer />
      </footer>

      <style jsx>{`
        body {
          background: url('/background-image.jpg') no-repeat center center fixed;
          background-size: cover;
          font-family: Arial, sans-serif;
        }
        .header {
          padding: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          text-align: center;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          margin: auto;
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
        footer {
          padding: 20px;
          text-align: center;
          color: white;
          background: rgba(0, 0, 0, 0.7);
          border-top: 1px solid #ccc;
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}

const getStrengthColor = (strength) => {
  if (strength < 40) return 'red'
  if (strength < 60) return 'orange'
  if (strength < 80) return 'yellow'
  return 'green'
}
