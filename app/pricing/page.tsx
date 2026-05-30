'use client';
export default function PricingPage() {
const handleUpgrade = async () => {
const res = await fetch('/api/checkout', { method: 'POST' });
const { url } = await res.json();
window.location.href = url;
};
return (
<div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
<h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
Resume<span style={{ color: '#4ade80' }}>AI</span> Pro
</h1>
<p style={{ color: '#888', marginBottom: '48px', fontSize: '14px' }}>Choose the plan that works for you</p>
<div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
{/* Free Plan */}
<div style={{ border: '1px solid #333', borderRadius: '12px', padding: '32px', width: '260px', background: '#111' }}>
<h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Free</h2>
<p style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0' }}>$0</p>
<p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Forever free</p>
<ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2.2', color: '#aaa' }}>
<li>✓ 1 Full Resume Rewrite</li>
<li>✓ 1 Professional Summary</li>
<li>✓ 1 Bullet Point Rewrite</li>
<li>✓ 1 Cover Letter</li>
<li>✓ 1 LinkedIn Summary</li>
</ul>
<button disabled style={{ marginTop: '24px', padding: '12px', width: '100%', background: '#222', border: '1px solid #444', borderRadius: '8px', fontSize: '14px', color: '#666', cursor: 'not-allowed' }}>
Current Plan
</button>
</div>
{/* Pro Plan */}
<div style={{ border: '1px solid #4ade80', borderRadius: '12px', padding: '32px', width: '260px', background: '#111' }}>
<h2 style={{ fontSize: '18px', marginBottom: '4px' }}>Pro</h2>
<p style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0' }}>$19<span style={{ fontSize: '14px', fontWeight: 'normal', color: '#888' }}>/mo</span></p>
<p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Cancel anytime</p>
<ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2.2', color: '#aaa' }}>
<li><span style={{ color: '#4ade80' }}>✓</span> Unlimited Full Resume Rewrites</li>
<li><span style={{ color: '#4ade80' }}>✓</span> Unlimited Professional Summaries</li>
<li><span style={{ color: '#4ade80' }}>✓</span> Unlimited Bullet Point Rewrites</li>
<li><span style={{ color: '#4ade80' }}>✓</span> Unlimited Cover Letters</li>
<li><span style={{ color: '#4ade80' }}>✓</span> Unlimited LinkedIn Summaries</li>
</ul>
<button onClick={handleUpgrade} style={{ marginTop: '24px', padding: '12px', width: '100%', background: '#4ade80', border: 'none', borderRadius: '8px', fontSize: '14px', color: '#000', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace' }}>
Upgrade Now →
</button>
</div>
</div>
</div>
);
}