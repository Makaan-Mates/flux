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
import { toast } from "sonner";

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

    const response = await axios.post(`${apiUrl}/user/savecustomopenaikey`, {
      customOpenAIkey: customOpenAIkey,
      email: email,
      customGPTModel: customGPTModel,
    });
    toast(response?.data?.message);
    setValidateApiKey(false);
    onRequestClose();
  };

  const handleDeleteApikey = async () => {
    const response = await axios.post(`${apiUrl}/user/deletecustomopenaikey`, {
      email: email,
    });
    toast(response?.data?.message);
    onRequestClose();
  };

  return (
    <>
      <div className="Customkeydiv fixed  left-0  right-0  top-[12vh] z-50 m-auto w-[90%] items-center  justify-center rounded-xl   bg-[#1C2839] px-4 py-4 text-white sm:w-[100vh]">
        <form onSubmit={handleSaveAPIkey} className="flex items-center">
          <input
            ref={customkeyRef}
            type="text"
            className="h-12 w-full rounded-md bg-[#2A3647] px-4 py-1  text-sm placeholder:text-[#d1d1d1]  focus:outline-none   "
            placeholder="Enter your OpenAI API Key"
          />
          <div className=" flex h-12 items-center justify-center overflow-hidden rounded-r-md border-[#515151] hover:border-l-[0.1px] hover:bg-[#2A3647] ">
            <button
              type="submit"
              className="flex h-12 w-14 items-center  justify-center"
            >
              <FaArrowRight />
            </button>
          </div>
        </form>
        {validateApiKey && (
          <div className="my-2 px-1 text-sm text-red-500">
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
                className="w-[200px] justify-between bg-[#2A3647] text-[#d1d1d1] hover:bg-[#2A3647] hover:text-white  focus:outline-none"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select gpt model..."}
                <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] bg-[#1C2839] p-0">
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
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex  w-full justify-end px-2">
          <button
            onClick={handleDeleteApikey}
            className="my-2 rounded-md bg-[#2A3647] px-4 py-2 hover:bg-purple-700"
          >
            Delete API
          </button>
        </div>
      </div>
    </>
  );
};

export default Customkey;
