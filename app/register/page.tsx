"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import createUser from "@/lib/actions/createUser";

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    const result = await createUser({
      email,
      password,
      name,
      confirmPassword: password,
    });

    if (result.error) {
      return setError(result.error);
    }

    if (result.success) {
      router.push("/home");
    }
  };

  return (
    <div className="flex flex-col">
      {error && <p>Something went wrong!</p>}
      <h1>Register</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
