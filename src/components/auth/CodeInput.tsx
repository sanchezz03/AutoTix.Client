import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { normalizeCodeInput, validateCode } from "../../utils/сode";

interface CodeInputProps {
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
  onError?: (err: string | null) => void;
}

export default function CodeInput({ code, setCode, onError }: CodeInputProps) {
  const refs = useRef<HTMLInputElement[]>([]);
  const [touched, setTouched] = useState(false);

  // useEffect(() => {
  //   const err = validateCode(code);
  //   onError?.(err);
  // }, [code, onError]);

  const onChange = (v: string, idx: number) => {
    const digit = normalizeCodeInput(v);
    setCode((prev) => {
      const next = [...prev];
      next[idx] = digit;
      return next;
    });
    if (digit && refs.current[idx + 1]) refs.current[idx + 1].focus();
  };

  const handleContainerBlur = (
    e: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setTouched(true);
      const err = validateCode(code);
      onError?.(err);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !code[idx] && refs.current[idx - 1]) {
      refs.current[idx - 1].focus();
    }
  };

  return (
    <div
      className="flex justify-center gap-3 mb-3"
      onBlur={handleContainerBlur}
    >
      {code.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el!;
          }}
          value={digit}
          onChange={(e) => onChange(e.target.value.slice(-1), i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          maxLength={1}
          inputMode="numeric"
          className="w-12 h-12 text-center text-xl font-semibold border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      ))}
    </div>
  );
}
