import { withIronSessionSsr } from "iron-session/next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { sessionOptions } from "../lib/session";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/register", {
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    if (res.ok) {
      console.log('registered');
    } else {
      const error = result.message.includes('username') 
        ? 'User already exists'
        : result.message;

      setError(error);
    }
    
    setIsLoading(false);
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/login", {
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {error.length > 0 && (
          <h2 className="w-full p-2 text-xl font-semibold text-white bg-red-500">{error}</h2>
        )}
        <form onSubmit={register} className="mb-6">
          <h2 className="text-xl font-bold">Register</h2>
          <div className="flex flex-col items-start space-y-4">
            <label className="flex items-center space-x-4">
              <span>Username</span>
              <input type="text" name="username" id="username" className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring ring-offset-2 ring-orange-400" required />
            </label>
            <label className="flex items-center space-x-4">
              <span>Password</span>
              <input type="password" name="password" id="password" className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring ring-offset-2 ring-orange-400" required />
            </label>
            <button
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              Register
            </button>
          </div>
        </form>
        <form onSubmit={login} className="mb-6">
          <h2 className="text-xl font-bold">Log In</h2>
          <div className="flex flex-col items-start space-y-4">
            <label className="flex items-center space-x-4">
              <span>Username</span>
              <input type="text" name="username" id="username" className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring ring-offset-2 ring-orange-400" required />
            </label>
            <label className="flex items-center space-x-4">
              <span>Password</span>
              <input type="password" name="password" id="password" className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring ring-offset-2 ring-orange-400" required />
            </label>
            <button
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              Log In
            </button>
          </div>
        </form>
      </main>

      <footer></footer>
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
  sessionOptions
);

export default Home;
