import { useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginStatus, setLoginStatus] = useState();

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("Email:", email); // Add this line to check
    console.log("Password:", password); // Add this line to check
    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("logged In!");
        setLoginStatus(true);
        setUserDetails(response.data);
        console.log(response);
      } else {
        console.log("not logged in");
        setLoginStatus(false);
      }

      return response;
    } catch (error) {
      console.error("API call failed:", error);
      setLoginStatus(false);
    }
  };

  //   //   const debouncedApiCall = debounce(loginHandler, 300);

  //   const handleInputChange = (e) => {
  //     // Update state and trigger the debounced API call
  //     const { name, value } = e.target;
  //     if (name === "email") {
  //       setEmail(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     }
  //     // debouncedApiCall(); // Trigger the debounced API call
  //   };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <label>Username</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <h1>
        Status:
        {loginStatus ? "User loggedIn" : ""}
      </h1>
      <div className="userDetails">
        {userDetails.user && "Name: " + userDetails.user.name}
        <br />
        {userDetails.token && "Name: " + userDetails.token}
      </div>
    </div>
  );
};

export default Login;
