import { useState } from "react";
import { executeCode, saveCode } from "../api";

type Props = {
  code: string;
};

type CodeResult = {
  output: string;
  stderr: string;
  stdout: string;
};

export default function CodeDisplay(code: Props) {
  const [output, setOutput] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false); // disables buttons to prevent continuous presses

  const runCode = async (): Promise<CodeResult> => {
    try {
      setDisabled(true);
      const o = await executeCode(code.code);
      setOutput(o.output);
      return o;
    } catch (error) {
      return { output: "", stderr: "", stdout: "" };
    } finally {
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }
  };

  const submitCode = async (): Promise<void> => {
    const o = await runCode();

    try {
      if (!o.stderr) {
        await saveCode(code.code, o.output);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-slate-600 p-3 h-full text-left">
        <button
          onClick={runCode}
          disabled={disabled}
          className="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run
        </button>
        <button
          onClick={submitCode}
          disabled={disabled}
          className="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>

        <div className="whitespace-pre-line">{output}</div>
      </div>
    </>
  );
}
