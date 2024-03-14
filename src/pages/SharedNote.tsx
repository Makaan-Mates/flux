import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

interface Notes {
  title: string;
  description: string;
  _id: string;
}

const SharedNote = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<Notes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const response = axios.get(`${apiUrl}/api/notes/shared/${noteId}`);
    response.then((res) => {
      setNote(res.data.message);
      console.log(res.data.message);
      setIsLoading(false);
    });
  }, [noteId]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="w-full">
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </div>
      </div>
    );
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="w-full px-20 py-14">
      <div className="text-left text-2xl font-bold">{note.title}</div>
      <div className="mt-10 whitespace-pre-wrap rounded-lg border border-[#d1d1d1] bg-[#E8EAEF] p-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="text-2xl font-bold text-[#161616] md:text-4xl"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-xl font-semibold text-[#161616]" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3
                className="text-xl font-medium text-[#161616] md:text-xl"
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
              <p className="text-lg text-gray-700" {...props} />
            ),
            li: ({ ...props }) => (
              <li
                className="text-grey-700 list-inside list-disc text-lg"
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
                <code className="rounded-sm bg-gray-300 px-2" {...props}>
                  {children}
                </code>
              );
            },
            // Add more elements as needed
          }}
        >
          {note.description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SharedNote;
