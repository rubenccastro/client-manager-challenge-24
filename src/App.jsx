import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import { useContext } from "react";

import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Register/Register";

import IsAnon from "./Components/IsAnon/IsAnon";
import IsPrivate from "./Components/IsPrivate/IsPrivate";

import Navbar from "./Components/Navbar/Navbar";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <div>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={
            <IsAnon>
              <Login />
            </IsAnon>
          } />
          <Route path="/register" element={
            <IsAnon>
              <Register />
            </IsAnon>
          } />
          <Route path="/dashboard" element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
