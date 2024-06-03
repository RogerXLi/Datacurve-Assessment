import Editor from "@monaco-editor/react";
import { useState } from "react";
import CodeDisplay from "./display";

export default function CodeEditor() {
  const [code, setCode] = useState<string>("");

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/2">
          <Editor
            height="90vh"
            language="python"
            defaultValue="# code goes here"
            theme="vs-dark"
            value={code}
            options={{
              codeLens: false,
            }}
            onChange={(code) => setCode(code ? code : "")}
          />
        </div>

        <div className="w-1/2">
          <CodeDisplay code={code} />
        </div>
      </div>
    </>
  );
}
