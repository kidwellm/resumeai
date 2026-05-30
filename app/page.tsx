"use client";
import { useState } from "react";

const ACCENT = "#00E5A0";
const BG = "#0A0A0F";
const CARD = "#13131A";
const BORDER = "#1E1E2E";
const TEXT = "#E8E8F0";
const MUTED = "#6B6B8A";

const OUTPUT_TYPES = [
{ value: "full", label: "Full Resume Rewrite" },
{ value: "summary", label: "Professional Summary" },
{ value: "bullets", label: "Bullet Points" },
{ value: "cover", label: "Cover Letter" },
{ value: "linkedin", label: "LinkedIn Summary" },
];

const PROMPTS: Record<string, string> = {
full: "You are an expert resume writer. Rewrite the resume to be tailored for the job description. Match keywords, strengthen bullets with achievements, ensure ATS compatibility.",
summary: "Write a powerful 3-4 sentence professional summary tailored to the job description. Output only the summary.",
bullets: "Rewrite only the work experience bullet points to be stronger and tailored to the job. Use action verbs and quantify achievements.",
cover: "Write a compelling 3-paragraph cover letter for this candidate applying to this role.",
linkedin: "Write a compelling LinkedIn About section under 300 words for this candidate.",
};

export default function Home() {
const [resume, setResume] = useState("");
const [jobDesc, setJobDesc] = useState("");
const [outputType, setOutputType] = useState("full");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const [copied, setCopied] = useState(false);

const handleOptimize = async () => {
setLoading(true);
setResult("");
try {
const response = await fetch("/api/optimize", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resume, jobDesc, outputType }),
});
const data = await response.json();
setResult(data.result || "Something went wrong.");
} catch {
setResult("Error — please try again.");
} finally {
setLoading(false);
}
};

return (
<main style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "monospace", padding: "40px 20px" }}>
<div style={{ maxWidth: "900px", margin: "0 auto" }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
<a href="/pricing" style={{ padding: '8px 16px', background: ACCENT, color: '#000', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }}>
Upgrade to Pro →
</a>
</div>
<h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "8px" }}>
Resume<span style={{ color: ACCENT }}>AI</span>
</h1>
<p style={{ color: MUTED, marginBottom: "32px" }}>Paste your resume + job posting → get an ATS-optimized version instantly</p>

{/* Output type tabs */}
<div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
{OUTPUT_TYPES.map((t) => (
<button key={t.value} onClick={() => setOutputType(t.value)}
style={{ padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: "13px", fontWeight: "600",
background: outputType === t.value ? ACCENT : CARD, color: outputType === t.value ? "#000" : MUTED }}>
{t.label}
</button>
))}
</div>

{/* Inputs */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
<div>
<label style={{ display: "block", color: ACCENT, fontSize: "11px", letterSpacing: "0.15em", marginBottom: "8px" }}>YOUR RESUME</label>
<textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume here..."
style={{ width: "100%", minHeight: "260px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: "10px", color: TEXT, fontFamily: "monospace", fontSize: "13px", padding: "14px", resize: "vertical", boxSizing: "border-box" }} />
</div>
<div>
<label style={{ display: "block", color: ACCENT, fontSize: "11px", letterSpacing: "0.15em", marginBottom: "8px" }}>JOB DESCRIPTION</label>
<textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste the job posting here..."
style={{ width: "100%", minHeight: "260px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: "10px", color: TEXT, fontFamily: "monospace", fontSize: "13px", padding: "14px", resize: "vertical", boxSizing: "border-box" }} />
</div>
</div>

<button onClick={handleOptimize} disabled={!resume || !jobDesc || loading}
style={{ width: "100%", padding: "16px", background: ACCENT, color: "#000", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", cursor: "pointer", opacity: (!resume || !jobDesc || loading) ? 0.4 : 1 }}>
{loading ? "Optimizing..." : `→ Generate ${OUTPUT_TYPES.find(t => t.value === outputType)?.label}`}
</button>

{result && (
<div style={{ marginTop: "24px", background: CARD, border: `1px solid ${ACCENT}44`, borderRadius: "12px", padding: "28px", position: "relative" }}>
<button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
style={{ position: "absolute", top: "16px", right: "16px", padding: "6px 14px", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: "6px", color: MUTED, fontFamily: "monospace", fontSize: "11px", cursor: "pointer" }}>
{copied ? "✓ Copied" : "Copy"}
</button>
<p style={{ color: ACCENT, fontSize: "11px", letterSpacing: "0.15em", marginBottom: "16px" }}>RESULT</p>
<pre style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.8", color: TEXT, margin: 0 }}>{result}</pre>
</div>
)}
</div>
</main>
);
}