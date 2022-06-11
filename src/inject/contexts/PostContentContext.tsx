import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";

interface PostContentContextType {
  inputText?: string;
}

const PostContentContext = createContext<PostContentContextType>({});

export function PostContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputElems, setInputElems] = useState<NodeListOf<Element>>();

  const inputText = useMemo(
    () =>
      inputElems
        ? Array.from(inputElems).reduce(
            (prev, curr) => `${prev} ${curr.innerHTML}`,
            ""
          )
        : "",
    [inputElems]
  );
  useEffect(() => {
    const onUpdate = () => {
      setInputElems(document.querySelectorAll('span[data-text="true"]'));
    };
    window.addEventListener("DOMNodeInserted", onUpdate);
    return () => {
      window.removeEventListener("DOMNodeInserted", onUpdate);
    };
  }, []);

  const postContent = useMemo(
    () => ({
      inputText,
    }),
    [inputText]
  );

  return (
    <PostContentContext.Provider value={postContent}>
      {children}
    </PostContentContext.Provider>
  );
}
const usePostContent = () =>
  useContext(PostContentContext) as PostContentContextType;

export default usePostContent;
