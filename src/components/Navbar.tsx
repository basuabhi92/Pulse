import { Link, useLocation } from "react-router-dom";
import { session } from "../store/session";

export default function Navbar() {
    const loc = useLocation();
    const Tab = (to: string, label: string) => (
        <Link className={`tab ${loc.pathname === to ? "active" : ""}`} to={to}>
            {label}
        </Link>
    );

    return (
        <header style={{ position: "sticky", top: 0, backdropFilter: "blur(6px)", background: "rgba(255,255,255,.7)", borderBottom: "1px solid #e5e7eb" }}>
            <div className="container row" style={{ justifyContent: "space-between" }}>
                <Link to="/" style={{ textDecoration: "none", fontWeight: 600, color: "#111827" }}>UniHub</Link>
                {session.token ? (
                    <div className="row" style={{ gap: 8 }}>
                        {Tab("/", "Notifications")}
                        {Tab("/integrations", "Integrations")} {Tab("/apps", "Apps")}
                        {Tab("/rules", "Rules")}
                        <button className="tab" onClick={() => { session.setToken(undefined); location.href = "/login"; }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="row" style={{ gap: 8 }}>
                        <Link className="tab" to="/login">Login</Link>
                        <Link className="tab" to="/register">Register</Link>
                    </div>
                )}
            </div>
        </header>
    );
}
