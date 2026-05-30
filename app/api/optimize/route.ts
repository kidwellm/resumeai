import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
apiKey: process.env.ANTHROPIC_API_KEY,
});

const PROMPTS: Record<string, string> = {
full: "You are an expert resume writer. Rewrite the resume to be tailored for the job description. Match keywords, strengthen bullets with achievements, ensure ATS compatibility.",
summary: "Write a powerful 3-4 sentence professional summary tailored to the job description. Output only the summary.",
bullets: "Rewrite only the work experience bullet points to be stronger and tailored to the job. Use action verbs and quantify achievements.",
cover: "Write a compelling 3-paragraph cover letter for this candidate applying to this role.",
linkedin: "Write a compelling LinkedIn About section under 300 words for this candidate.",
};

export async function POST(req: Request) {
const { resume, jobDesc, outputType } = await req.json();

const message = await client.messages.create({
model: "claude-opus-4-6",
max_tokens: 1024,
system: PROMPTS[outputType] || PROMPTS.full,
messages: [
{
role: "user",
content: `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDesc}`,
},
],
});

const result = message.content
.map((b) => (b.type === "text" ? b.text : ""))
.join("\n");

return Response.json({ result });
}