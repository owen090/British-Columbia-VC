import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoginVisible, setIsLoginVisible] = useState(false)
  const passwordInputRef = useRef(null)

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (password.match(/[a-z]+/)) strength += 1
    if (password.match(/[A-Z]+/)) strength += 1
    if (password.match(/[0-9]+/)) strength += 1
    if (password.match(/[$@#&!]+/)) strength += 1

    setPasswordStrength(strength * 20)
  }

  useEffect(() => {
    const passwordInput = passwordInputRef.current
    if (passwordInput) {
      passwordInput.addEventListener('input', (event) => {
        checkPasswordStrength(event.target.value)
      })
    }
  }, [])

  const getStrengthColor = (strength) => {
    if (strength < 40) return 'red'
    if (strength < 60) return 'orange'
    if (strength < 80) return 'yellow'
    if (strength < 100) return 'lightgreen'
    return 'green'
  }

  return (
    <div className="container">
      <Head>
        <title>British Columbia Forum</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="navbar">
        <div className="title">British Columbia, Vancouver</div>
        <div>
          <a href="#">Home</a>
          <a href="#">Privacy Policy</a>
        </div>
      </header>

      <main>
        <div className="form-container">
          {!isLoginVisible ? (
            <div id="signup-container">
              <h1 style={{ color: '#fff' }}>Sign Up</h1>
              <form id="signup-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" id="signup-username" placeholder="Username" required style={{ color: '#000' }} />
                <input
                  type="password"
                  id="signup-password"
                  placeholder="Password"
                  required
                  ref={passwordInputRef}
                  style={{ color: '#000' }}
                />
                <div className="complexity-label" style={{ color: '#fff' }}>Password complexity level</div>
                <div className="password-strength">
                  <div
                    className="strength-bar"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor: getStrengthColor(passwordStrength),
                    }}
                  ></div>
                </div>
                <button type="submit">Sign Up</button>
              </form>
              <p id="signup-message" style={{ color: '#fff' }}></p>
              <p>
                Already signed up?{' '}
                <a
                  href="#"
                  className="login-link"
                  onClick={() => setIsLoginVisible(true)}
                  style={{ color: '#4caf50', textDecoration: 'none' }}
                >
                  Log in here
                </a>
              </p>
            </div>
          ) : (
            <div id="login-container">
              <h1 style={{ color: '#fff' }}>Login</h1>
              <form id="login-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" id="login-username" placeholder="Username" required style={{ color: '#000' }} />
                <input type="password" id="login-password" placeholder="Password" required style={{ color: '#000' }} />
                <button type="submit" style={{ color: '#fff' }}>Login</button>
              </form>
              <p id="login-message" style={{ color: '#fff' }}></p>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          background-image: url('https://media.discordapp.net/attachments/1226625183289311302/1261904988540637364/POU.png?ex=669550da&is=6693ff5a&hm=e1c072f0ec7083b9e7dbd3e43f91d328e4919221cbcc411e718613256321399a&=&format=webp&quality=lossless&width=1050&height=700');
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

        .form-container {
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

        p#error-message {
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
  )
}
