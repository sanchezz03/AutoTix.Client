import { useState } from "react";
import SendCodePopup from "../components/auth/SendCodePopup";
import { isValidUA } from "../utils/phone";
import PhoneInput from "../components/auth/PhoneInput";
import { authService } from "../api";

export default function LoginPage() {
  const [phoneE164, setPhoneE164] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [popupOpen, setPopupOpen] = useState(false);

  const validate = (val: string) => {
    if (!val) return "Phone is required";

    if (!isValidUA(val)) return "Phone must be Ukrainian (+380XXXXXXXXX)";

    return null;
  };

  const onSubmit = async () => {
    const err = validate(phoneE164);
    setLocalError(err);
    if (err) return;

    setLoading(true);
    try {
      setCode(["", "", "", ""]);
      setPopupOpen(true);

      const response = await authService.sendSms({ phone: phoneE164 });
      if (!response.success) {
        setLocalError("Failed to send SMS");
        return;
      }
    } catch (e: any) {
      setLocalError(e.message ?? "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4 min-h-[80vh]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Log in
        </h1>

        <label className="block mb-2 font-medium text-gray-700">Phone</label>
        <PhoneInput
          value={phoneE164}
          onChange={(v) => {
            setPhoneE164(v);
            setLocalError(null);
          }}
          onBlur={() => {
            const err = validate(phoneE164);
            setLocalError(err);
          }}
        />

        {localError && (
          <div className="text-sm text-red-500 mb-3">{localError}</div>
        )}

        <button
          onClick={onSubmit}
          disabled={!!validate(phoneE164) || loading}
          className={`w-full ${
            loading ? "opacity-60 cursor-wait" : ""
          } bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 text-white py-3 rounded-xl shadow-lg font-medium transition-all disabled:opacity-50`}
        >
          {loading ? "Sending..." : "Login"}
        </button>
      </div>

      {popupOpen && (
        <SendCodePopup
          code={code}
          setCode={setCode}
          phone={phoneE164}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
}
