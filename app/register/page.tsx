"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import createUser from "@/lib/actions/createUser";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center justify-center">
      {error && <p>Something went wrong!</p>}
      <form>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded w-full py-2 px-3"
            required
            placeholder="xxx@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded w-full py-2 px-3"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button type="button" onClick={register}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
