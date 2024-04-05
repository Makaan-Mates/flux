import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { notesAtom } from "../atoms/atoms";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth0 } from "@auth0/auth0-react";
import Bookmark from "@/components/custom/Bookmark";
import SelectComponent from "@/components/custom/SelectComponent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RiNotionFill } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { toast } from "sonner";

interface Notes {
  title: string;
  description: string;
  _id: string;
}

interface FluxData extends Notes {
  data: {
    attributes: {
      content: string;
    };
  };
}

const FluxDetail = () => {
  const { user } = useAuth0();

  const email: string = user?.email || "";

  const { videoId = "" } = useParams();
  const notesLoadable = useRecoilValueLoadable(
    notesAtom({ videoId: videoId, email: email })
  );

  const [notes, setNotes] = useState<FluxData | null>(null);
  const [toggleNotion, setToggleNotion] = useState<boolean>(false);

  useEffect(() => {
    if (notesLoadable.state === "hasValue") {
      setNotes(notesLoadable.contents);
    }
  }, [notesLoadable]);

  const copyShareableLink = () => {
    const host = window.location.origin; // Gets the base URL of your app
    const shareableLink = `${host}/shared/${notes?._id}`;

    // Copy the link to the clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast("Shareable link copied to clipboard!");
    });
  };

  return (
    <>
      {notesLoadable.state === "loading" ? (
        <div className="flex w-full flex-col items-center ">
          <div className="w-full">
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </div>
        </div>
      ) : (
        <div className="w-full py-14 ">
          <div className="px-24 text-left text-2xl font-bold">
            {notes?.title}
          </div>

          <div className="relative flex items-center justify-end px-28 ">
            <div>{notes && <Bookmark videoId={videoId} email={email} />}</div>
            <div>
              {notes && (
                <TbSend
                  className="mr-3 cursor-pointer text-2xl"
                  onClick={() => copyShareableLink()}
                />
              )}
            </div>

            <div>
              {notes && (
                <RiNotionFill
                  className="cursor-pointer text-3xl"
                  onClick={() => {
                    setToggleNotion(!toggleNotion);
                  }}
                />
              )}
            </div>
            {notes && toggleNotion && (
              <div className="absolute right-0 top-10 mb-10 mt-2 flex w-[50%] justify-center">
                <SelectComponent
                  fluxTitle={notes?.title}
                  fluxDescription={notes?.description}
                  onRequestClose={() => {
                    setToggleNotion(!toggleNotion);
                  }}
                />
              </div>
            )}
          </div>

          <div className=" flex items-center justify-center px-20 ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="mb-10 mt-10 whitespace-pre-wrap rounded-lg border border-[#d1d1d1] bg-[#E8EAEF] px-10 py-10 "
              components={{
                h1: ({ ...props }) => (
                  <h1
                    className=" text-2xl font-bold text-[#161616] md:text-4xl"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="  text-xl font-semibold text-[#161616]"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className=" text-xl font-medium text-[#161616] md:text-xl"
                    {...props}
                  />
                ),
                h4: ({ ...props }) => (
                  <h4
                    className="mb-1 text-xl font-medium text-[#161616]"
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p className=" text-lg text-gray-700" {...props} />
                ),
                li: ({ ...props }) => (
                  <li
                    className="text-grey-700 list-inside list-disc text-lg"
                    {...props}
                  />
                ),
                code({
                  inline,
                  className = "",
                  children,
                  ...props
                }: React.PropsWithChildren<{
                  inline?: boolean;
                  className?: string;
                }>) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="rounded-sm bg-gray-300 px-2" {...props}>
                      {children}
                    </code>
                  );
                },
                blockquote: ({ ...props }) => (
                  <blockquote className=" bg-black  text-gray-700" {...props} />
                ),
                img: ({ ...props }) => (
                  <img
                    className="mx-auto my-4 rounded-lg shadow-lg"
                    {...props}
                  />
                ),
                a: ({ ...props }) => (
                  <a className="text-blue-500 underline" {...props} />
                ),
                // Add more elements as needed
              }}
            >
              {notes?.description}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default FluxDetail;
