import { useAuth0 } from "@auth0/auth0-react";
const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center bg-[#161616]">
        <button
          onClick={() => loginWithRedirect()}
          className="rounded-xl bg-[#d1d1d1] px-4 py-2 text-[#161616]"
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default Landing;
