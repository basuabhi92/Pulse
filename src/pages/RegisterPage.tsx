import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";
import { session } from "../store/session";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [err, setErr] = useState<string>();

    const pwHints = useMemo(() => {
        const rules = [
            { ok: pw.length >= 8, text: "8+ characters" },
            { ok: /[A-Z]/.test(pw), text: "one uppercase" },
            { ok: /[a-z]/.test(pw), text: "one lowercase" },
            { ok: /\d/.test(pw), text: "one number" }
        ];
        return rules;
    }, [pw]);

    const canSubmit =
        name.trim() && email.includes("@") && pwHints.every(r => r.ok) && pw === pw2;

    async function submit(e?: React.FormEvent) {
        e?.preventDefault();
        if (!canSubmit) return;
        try {
            const { token } = await register({ name, email, password: pw });
            if (!token) throw new Error("Registration failed");
            session.setToken(token);
            location.href = "/apps";           
        } catch (e: any) {
            const msg = e?.response?.data?.message ?? e?.message ?? "Registration failed";
            setErr(String(msg));
        }
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Connect your apps and control how notifications reach you."
            footer={<span>Already have an account? <Link to="/login">Sign in</Link></span>}
        >
            <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
                <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordField value={pw} onChange={setPw} />
                <PasswordField value={pw2} onChange={setPw2} placeholder="Confirm password" />
                <div className="muted">
                    Password must include:
                    <ul style={{ margin: "6px 0 0 18px" }}>
                        {pwHints.map((r, i) => (
                            <li key={i} style={{ color: r.ok ? "#16a34a" : "#6b7280" }}>
                                {r.text}
                            </li>
                        ))}
                    </ul>
                </div>
                {pw && pw2 && pw !== pw2 && (
                    <div style={{ color: "#b91c1c" }}>Passwords do not match</div>
                )}
                {err && <div style={{ color: "#b91c1c" }}>{err}</div>}
                <button className="btn" type="submit" disabled={!canSubmit}>Create account</button>
            </form>
        </AuthLayout>
    );
}
