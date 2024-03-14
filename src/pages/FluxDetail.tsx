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

interface Notes {
  title: string;
  description: string;
}

interface ReportData extends Notes {
  data: {
    attributes: {
      content: string;
      // add other attributes here
    };
    // add other properties here
  };
  // add other properties here
}

const FluxDetail = () => {
  const { user } = useAuth0();

  const email: string = user?.email || "";

  console.log(user);
  const { videoId = "" } = useParams();
  const notesLoadable = useRecoilValueLoadable(
    notesAtom({ videoId: videoId, email: email })
  );

  const [notes, setNotes] = useState<ReportData | null>(null);
  const [toggleNotion, setToggleNotion] = useState<boolean>(false);

  useEffect(() => {
    if (notesLoadable.state === "hasValue") {
      setNotes(notesLoadable.contents);
    }
  }, [notesLoadable]);

  return (
    <>
      {notesLoadable.state === "loading" ? (
        <div className="flex w-full flex-col items-center ">
          <div className="w-full">
            <Box sx={{ width: "100%" }}>
              <LinearProgress
              // sx={{
              //   backgroundColor: "#a3adbe",
              //   "& .MuiLinearProgress-bar": {
              //     backgroundColor: "#1C2839",
              //   },
              // }}
              />
            </Box>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="text-2xl font-bold px-20">{notes?.title}</div>

          <div className="relative flex items-center px-16">
            <div>{notes && <Bookmark videoId={videoId} email={email} />}</div>
            <div>
              {notes && (
                <RiNotionFill
                  className="text-2xl"
                  onClick={() => {
                    setToggleNotion(!toggleNotion);
                  }}
                />
              )}
            </div>
            {notes && toggleNotion && (
              <div className="mb-10 mt-2 w-[50%] absolute left-12 top-10">
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
          <div className=" flex items-center justify-center px-20">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="whitespace-pre-wrap"
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
                    className="list-inside list-disc text-lg text-grey-700"
                    {...props}
                  />
                ),
                code({ node, inline, className, children, ...props }) {
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
                    <code className="bg-gray-300 px-2 rounded-sm" {...props}>
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
