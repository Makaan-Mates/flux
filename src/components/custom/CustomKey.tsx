import axios from "axios";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RxCaretSort } from "react-icons/rx";
import { IoCheckboxOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

const frameworks = [
  {
    value: "gpt-3.5-turbo",
    label: "gpt-3.5-turbo",
  },
  {
    value: "gpt-4",
    label: "gpt-4",
  },
];

const Customkey = ({
  email,
  onRequestClose,
}: {
  email: string;
  onRequestClose: () => void;
}) => {
  const customkeyRef = useRef<HTMLInputElement>(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [validateApiKey, setValidateApiKey] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { toast } = useToast();

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
    const customGPTModel = value;
    console.log(customGPTModel);

    const response = await axios.post(`${apiUrl}/user/savecustomopenaikey`, {
      customOpenAIkey: customOpenAIkey,
      email: email,
      customGPTModel: customGPTModel,
    });
    toast({
      title: response?.data?.message,
    });
    setValidateApiKey(false);
    onRequestClose();
  };

  const handleDeleteApikey = async () => {
    const response = await axios.post(`${apiUrl}/user/deletecustomopenaikey`, {
      email: email,
    });
    console.log(response);
    toast({
      title: response?.data?.message,
    });
    onRequestClose();
  };

  return (
    <>
      <div className="Customkeydiv w-[90%]  sm:w-[100vh]  z-50  items-center justify-center fixed top-[12vh] left-0  right-0 m-auto   rounded-xl bg-[#1C2839] text-white py-4 px-4">
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
          <div className="text-red-500 text-sm my-2 px-1">
            Invalid API key format.Please enter a valid OpenAI API key.
          </div>
        )}

        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="my-4 border-none">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between text-[#d1d1d1] hover:text-white focus:outline-none bg-[#2A3647]  hover:bg-[#2A3647]"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select gpt model..."}
                <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-[#1C2839]">
              <Command className="bg-[#2A3647]  text-[#d1d1d1]">
                <CommandInput
                  placeholder="Search model..."
                  className="h-9 bg-[#2A3647] "
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup className="">
                  {frameworks.map((framework) => (
                    <CommandItem
                      className="bg-[#2A3647]   text-[#d1d1d1] hover:text-white"
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <IoCheckboxOutline
                        className={cn(
                          "ml-auto h-4 w-4 text-[#d1d1d1]",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full  flex justify-end px-2">
          <button
            onClick={handleDeleteApikey}
            className="bg-[#2A3647] hover:bg-purple-700 my-2 px-4 rounded-md py-2"
          >
            Delete API
          </button>
        </div>
      </div>
    </>
  );
};

export default Customkey;
