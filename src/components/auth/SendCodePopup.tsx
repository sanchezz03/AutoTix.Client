import { RefreshCw } from "lucide-react";
import CodeInput from "./CodeInput";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Popup from "../ui/Popup";
import { validateCode } from "../../utils/сode";
import { authService, tokenStorage } from "../../api";

interface SendCodePopupProps {
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
  phone: string;
  onClose: () => void;
}

export default function SendCodePopup({
  code,
  setCode,
  phone,
  onClose,
}: SendCodePopupProps) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = async () => {
    if (secondsLeft > 0) return;

    try {
      await authService.sendSms({ phone });
      setSecondsLeft(60);
      setCode(["", "", "", ""]);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSend = async () => {
    const err = validateCode(code);
    setError(err);
    if (err) return;

    try {
      const res = await authService.login({
        phone,
        code: code.join(""),
        device: {
          name: "Windows 11",
          fcmToken: null,
        },
      });

      onClose();
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Popup onClose={onClose}>
      <h2 className="text-xl font-semibold text-center text-indigo-600 mb-4">
        Enter the code
      </h2>

      <CodeInput
        code={code}
        setCode={setCode}
        onError={(err) => setError(err)}
      />

      {error && (
        <div className="text-sm text-red-500 text-center mb-2">{error}</div>
      )}

      <button
        onClick={handleResend}
        disabled={secondsLeft > 0}
        className={`flex items-center gap-2 text-sm mx-auto mb-4 transition
          ${
            secondsLeft > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-500 hover:text-indigo-600"
          }`}
      >
        <RefreshCw className="w-4 h-4" />
        {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend code"}
      </button>

      <button
        onClick={handleSend}
        disabled={!!validateCode(code)}
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 text-white py-2 rounded-xl shadow font-medium hover:from-indigo-600 hover:to-indigo-500 transition disabled:opacity-50"
      >
        Send
      </button>
    </Popup>
  );
}
