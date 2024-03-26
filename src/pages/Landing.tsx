import { useAuth0 } from "@auth0/auth0-react";
const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-b  from-black from-60% to-cyan-500 gap-24">
        <div className=" w-[90%] lg:w-[70%] flex items-center justify-center ">
          <h1 className="text-3xl md:text-4xl 2xl:text-5xl text-white font-geist text-center">
            AI-fueled Notes Generator: Turn YouTube into Your Knowledge Vault
          </h1>
        </div>
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
