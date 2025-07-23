import { GetServerSideProps } from "next";
import nookies from "nookies";

export const requireAuth: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: "/user/sign_in",
        permanent: false,
      },
    };
  }

  console.log("Token:", token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
    headers: {
      Cookie: `jwt=${token}`,
    },
  });

  console.log("Response status:", res.status);
  if (!res.ok) {
    return {
      redirect: {
        destination: "/user/sign_in",
        permanent: false,
      },
    };
  }

  const user = await res.json();
  console.log("User data:", user);
  return {
    props: { user },
  };
};
