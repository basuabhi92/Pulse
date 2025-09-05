import { ReactNode } from "react";
export default function AuthLayout({
    title, subtitle, children, footer
}: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
    return (
        <div className="container" style={{ maxWidth: 460 }}>
            <div className="card" style={{ display: "grid", gap: 14 }}>
                <div>
                    <h1 style={{ margin: 0 }}>{title}</h1>
                    {subtitle && <div className="muted" style={{ marginTop: 4 }}>{subtitle}</div>}
                </div>
                {children}
                {footer && <div className="muted">{footer}</div>}
            </div>
        </div>
    );
}
