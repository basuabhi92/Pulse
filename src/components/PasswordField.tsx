import { useState } from "react";
export default function PasswordField({
    value, onChange, placeholder = "Password"
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    const [show, setShow] = useState(false);
    return (
        <div className="row" style={{ gap: 8 }}>
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{ flex: 1 }}
            />
            <button type="button" className="tab" onClick={() => setShow(s => !s)}>
                {show ? "Hide" : "Show"}
            </button>
        </div>
    );
}
