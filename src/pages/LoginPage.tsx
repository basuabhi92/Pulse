import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api/auth";
import { session } from "../store/session";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [err, setErr] = useState<string>();

    async function submit(e?: React.FormEvent) {
        e?.preventDefault();
        try {
            const { token } = await login({ email, password });
            // If you add a refresh token later, “remember me” would control persistence scope.
            session.setToken(token);
            location.href = "/";
        } catch (e: any) {
            setErr(e.message || "Login failed");
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Your personal notification assistant"
            footer={<span>New here? <Link to="/register">Create an account</Link></span>}
        >
            <form className="grid" style={{ gap: 12 }} onSubmit={submit}>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordField value={password} onChange={setPassword} />
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <label className="row" style={{ gap: 8 }}>
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                        Remember me
                    </label>
                    <button type="button" className="tab">Forgot password?</button>
                </div>
                {err && <div style={{ color: "#b91c1c" }}>{err}</div>}
                <button className="btn" type="submit">Sign in</button>
            </form>
        </AuthLayout>
    );
}
