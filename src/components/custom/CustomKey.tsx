import axios from "axios";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Customkey = ({ email }) => {
  const customkeyRef = useRef<HTMLInputElement>(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [validateApiKey, setValidateApiKey] = useState<boolean>(false);
  const handleSaveAPIkey = async (event: React.FormEvent) => {
    event?.preventDefault();

    const customOpenAIkey = customkeyRef?.current?.value;

    if (customOpenAIkey === null || customOpenAIkey === undefined) {
      console.log("Please enter an OpenAI API key.");
      return;
    }

    const apiKeyPattern = /^sk-[a-zA-Z0-9]{32,}$/;

    // console.log(apiKeyPattern.test(customOpenAIkey));

    if (!apiKeyPattern.test(customOpenAIkey)) {
      setValidateApiKey(true);
      return;
    }

    await axios.post(`${apiUrl}/user/savecustomopenaikey`, {
      customOpenAIkey: customOpenAIkey,
      email: email,
    });
    setValidateApiKey(false);
  };

  return (
    <>
      <div className="Customkeydiv w-[90%] h-[20vh] sm:w-[100vh]  z-50  items-center justify-center fixed top-[12vh] left-0  right-0 m-auto   rounded-xl bg-[#1C2839] text-white py-4 px-4">
        <form onSubmit={handleSaveAPIkey} className="flex items-center">
          <input
            ref={customkeyRef}
            type="text"
            className="w-full h-12 px-4 py-1 placeholder:text-[#d1d1d1] text-sm  bg-[#2A3647] rounded-md  focus:outline-none   "
            placeholder="Enter your OpenAI API Key"
          />
          <div className=" h-12 rounded-r-md hover:bg-[#2A3647] hover:border-l-[0.1px] border-[#515151] overflow-hidden flex items-center justify-center ">
            <button
              type="submit"
              className="w-14 h-12 flex justify-center  items-center"
            >
              <FaArrowRight />
            </button>
          </div>
        </form>
        {validateApiKey && (
          <div className="bg-red-800 text-sm">
            Invalid API key format.Please enter a valid OpenAI API key.
          </div>
        )}
      </div>
    </>
  );
};

export default Customkey;
