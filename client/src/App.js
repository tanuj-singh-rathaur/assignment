import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Assignement app</h1>
        <div>
          <NavLink to="/">Welcome</NavLink> <br />
          <NavLink to="/login">Login</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
