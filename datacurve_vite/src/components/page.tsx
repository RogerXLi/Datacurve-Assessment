import CodeEditor from "./editor";

export default function Page() {
  return (
    <>
      <header className="flex flex-row items-center justify-between w-screen p-2 border-b-2 bg-gray-100">
        <p className="flex items-center h-10 px-10 w-screen font-bold text-black">
          Python Code Editor
        </p>
      </header>
      <CodeEditor />
    </>
  );
}
