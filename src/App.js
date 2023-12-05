// App.js

import "./App.css";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import DashBoard from "./pages/dashboard/dashboard";
import React from "react";
import { login, register } from "./services/auth"; // Corrected import statements

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [registering, setRegistering] = React.useState(false); // Changed state variable name

  const handleLogin = async (account, password) => {
    const success = await login(account, password);
    if (success) {
      console.log(localStorage.getItem("token"))
      setToken(localStorage.getItem("token"));
    } else {
      // Handle login error
      console.error('Login failed');
    }
  };
  
  const handleRegister = async (user) => {
    try {
      const token = await register(user);
      if (token) {
        // Registration successful, you may handle it as needed
        setToken(localStorage.getItem("token"));
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.message);
    }
  };

  const handleLogout = () => {
    console.log("handleLogout");
    localStorage.removeItem("token");
    setToken(null);
  };

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      {token ? (
        <>
          <DashBoard handleLogout={handleLogout}/> {/* Assuming dashboard is a component or a function */}
        </>
      ) : registering ? (
        <SignUp handleRegister={handleRegister}  setRegistering={setRegistering}/>
      ) : (
        <Login handleLogin={handleLogin} setRegistering={setRegistering} setToken={setToken}/>
      )}
    </div>
  );
}

export default App;
