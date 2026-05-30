'use client';
import Link from 'next/link';
export default function SuccessPage() {
return (
<div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
<h1 style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</h1>
<h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
Welcome to Resume<span style={{ color: '#4ade80' }}>AI</span> Pro!
</h2>
<p style={{ color: '#888', marginBottom: '32px' }}>Your subscription is active. You now have unlimited access.</p>
<Link href="/" style={{ padding: '12px 24px', background: '#4ade80', color: '#000', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
Start Using ResumeAI →
</Link>
</div>
);
}