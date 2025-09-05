import { useEffect, useState } from 'react';
import { oauthCallback } from '../api/integrations';

export default function OAuthCallbackPage() {
    const [text, setText] = useState('Completing authorization...');
    useEffect(() => {
        (async () => {
            const q = Object.fromEntries(new URLSearchParams(location.search).entries());
            try { await oauthCallback(q); setText('Connected! Redirecting…'); setTimeout(() => location.replace('/integrations'), 800); }
            catch (e: any) { setText(`Failed: ${e.message}`); }
        })();
    }, []);
    return <div className="card">{text}</div>;
}