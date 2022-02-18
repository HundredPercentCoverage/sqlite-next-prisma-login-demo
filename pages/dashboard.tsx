import { User } from "@prisma/client";
import Head from 'next/head';
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { sessionOptions } from "../lib/session";

const DashboardPage = ({ user }: { user: User }) => {
  const router = useRouter();

  const logout = async () => {
    const res = await fetch("/api/logout");

    const result = await res.json();
    router.push("/");
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p>Welcome {user.username}</p>
        <button className="px-4 py-2 font-semibold text-white bg-blue-400 rounded-md" type="button" onClick={logout}>
          Log Out
        </button>
      </main>
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: req.session.user,
    },
  };
}, sessionOptions);

export default DashboardPage;
