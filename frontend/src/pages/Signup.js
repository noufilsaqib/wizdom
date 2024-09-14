import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { config } from "../config";
import messages from "../messages/lang/en/user.json";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Signup() {
  const navigate = useNavigate();

  const endpoint = config.url;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");

    if (!name || !email || !password) {
      setErrMsg(messages.emptyFieldError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(endpoint + "/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setLoading(false);
        navigate("/onboarding");
      } else {
        const data = await response.json();
        console.error("Signup failed:", data);
        setErrMsg(messages.serverError);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrMsg(messages.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Signup">
      <div>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              onChange={(e) => {
                setName(e.target.value);
                setErrMsg("");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrMsg("");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrMsg("");
              }}
            />
          </div>
          <Button
            type="submit"
            title="Sign Up"
            loading={loading}
            text="Sign Up"
            full
            customStyle={{ marginTop: "2rem" }}
          />
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}