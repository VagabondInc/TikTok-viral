import { useState } from “react”;

const TIKTOK_PINK = “#FF004F”;
const TIKTOK_CYAN = “#00F2EA”;
const TIKTOK_DARK = “#010101”;

const glitchStyle = `
@import url(‘https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,600;1,300&display=swap’);

- { box-sizing: border-box; margin: 0; padding: 0; }

body { background: #010101; }

@keyframes scanline {
0% { transform: translateY(-100%); }
100% { transform: translateY(100vh); }
}

@keyframes flicker {
0%, 100% { opacity: 1; }
92% { opacity: 1; }
93% { opacity: 0.4; }
94% { opacity: 1; }
96% { opacity: 0.7; }
97% { opacity: 1; }
}

@keyframes glitch {
0% { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
10% { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
20% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 0); }
30% { clip-path: inset(80% 0 5% 0); transform: translate(3px, 0); }
40% { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 0); }
50% { clip-path: inset(45% 0 45% 0); transform: translate(2px, 0); }
100% { clip-path: inset(0 0 95% 0); transform: translate(0, 0); }
}

@keyframes glitch2 {
0% { clip-path: inset(80% 0 5% 0); transform: translate(4px, 0); }
20% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
40% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
60% { clip-path: inset(5% 0 85% 0); transform: translate(-2px, 0); }
80% { clip-path: inset(65% 0 15% 0); transform: translate(3px, 0); }
100% { clip-path: inset(80% 0 5% 0); transform: translate(0, 0); }
}

@keyframes slideUp {
from { opacity: 0; transform: translateY(30px); }
to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-border {
0%, 100% { box-shadow: 0 0 0 0 rgba(255,0,79,0.4); }
50% { box-shadow: 0 0 0 8px rgba(255,0,79,0); }
}

@keyframes spin {
to { transform: rotate(360deg); }
}

@keyframes fadeIn {
from { opacity: 0; transform: scale(0.97); }
to { opacity: 1; transform: scale(1); }
}

.glitch-text {
position: relative;
display: inline-block;
}
.glitch-text::before, .glitch-text::after {
content: attr(data-text);
position: absolute;
top: 0; left: 0;
width: 100%;
height: 100%;
font-family: inherit;
font-size: inherit;
font-weight: inherit;
letter-spacing: inherit;
}
.glitch-text::before {
color: #00F2EA;
animation: glitch 3s infinite linear;
opacity: 0.8;
}
.glitch-text::after {
color: #FF004F;
animation: glitch2 3s infinite linear;
opacity: 0.8;
}

textarea:focus { outline: none; }
button:focus { outline: none; }
`;

const Hook = ({ text }) => (

  <div style={{
    background: "linear-gradient(135deg, #FF004F22, #00F2EA11)",
    border: "1px solid #FF004F",
    borderLeft: "4px solid #FF004F",
    padding: "16px 20px",
    borderRadius: "0 8px 8px 0",
    marginBottom: 16,
    animation: "slideUp 0.5s ease forwards",
    animationDelay: "0.1s",
    opacity: 0,
  }}>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 3, color: TIKTOK_PINK, marginBottom: 8 }}>🎣 HOOK (0–3s)</div>
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>"{text}"</div>
  </div>
);

const Section = ({ label, emoji, color, content, delay, bullets }) => (

  <div style={{
    background: "#0d0d0d",
    border: `1px solid ${color}44`,
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 12,
    animation: "slideUp 0.5s ease forwards",
    animationDelay: delay,
    opacity: 0,
  }}>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 3, color, marginBottom: 10 }}>
      {emoji} {label}
    </div>
    {bullets ? (
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {bullets.map((b, i) => (
          <li key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#ddd",
            lineHeight: 1.6,
            paddingLeft: 18,
            position: "relative",
            marginBottom: 6
          }}>
            <span style={{ position: "absolute", left: 0, color }}>▸</span>
            {b}
          </li>
        ))}
      </ul>
    ) : (
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ddd", lineHeight: 1.7 }}>
        {content}
      </div>
    )}
  </div>
);

const ScriptLine = ({ time, text, i }) => (

  <div style={{
    display: "flex",
    gap: 12,
    marginBottom: 14,
    animation: "slideUp 0.4s ease forwards",
    animationDelay: `${0.6 + i * 0.08}s`,
    opacity: 0,
  }}>
    <div style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 11,
      color: TIKTOK_CYAN,
      letterSpacing: 1,
      minWidth: 52,
      paddingTop: 2,
      textAlign: "right",
    }}>{time}</div>
    <div style={{
      flex: 1,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
      color: "#f0f0f0",
      lineHeight: 1.65,
      borderLeft: `2px solid #ffffff11`,
      paddingLeft: 14,
    }}>{text}</div>
  </div>
);

const Tag = ({ tag }) => (
<span style={{
fontFamily: “‘DM Sans’, sans-serif”,
fontSize: 12,
color: TIKTOK_CYAN,
background: “#00F2EA11”,
border: “1px solid #00F2EA44”,
borderRadius: 20,
padding: “4px 12px”,
marginRight: 8,
marginBottom: 8,
display: “inline-block”,
}}>#{tag}</span>
);

function parseJSON(text) {
try {
const clean = text.replace(/`json|`/g, “”).trim();
return JSON.parse(clean);
} catch {
return null;
}
}

export default function TikTokAnalyzer() {
const [article, setArticle] = useState(””);
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(””);

const analyze = async () => {
if (!article.trim()) return;
setLoading(true);
setResult(null);
setError(””);

```
const systemPrompt = `You are a viral TikTok content strategist. Analyze articles and return ONLY valid JSON. No markdown fences, no preamble.
```

Return this exact JSON shape:
{
“hook”: “A single irresistible opening line (max 12 words) that stops the scroll. Make it provocative, surprising, or emotionally charged.”,
“angle”: “The unique viral angle or narrative frame for this content (1–2 sentences).”,
“target_audience”: “Specific TikTok audience this will resonate with”,
“why_viral”: “Why this topic will blow up right now — reference trends, emotions, or cultural moments”,
“script”: [
{ “time”: “0–3s”, “line”: “Hook line” },
{ “time”: “3–8s”, “line”: “Context line” },
{ “time”: “8–20s”, “line”: “Main revelation or key insight” },
{ “time”: “20–35s”, “line”: “Elaboration or example” },
{ “time”: “35–45s”, “line”: “Emotional payoff or plot twist” },
{ “time”: “45–55s”, “line”: “Call to action / cliffhanger” }
],
“visuals”: [“Visual/b-roll suggestion 1”, “Visual/b-roll suggestion 2”, “Visual/b-roll suggestion 3”],
“caption”: “A punchy TikTok caption (under 150 chars)”,
“hashtags”: [“hashtag1”, “hashtag2”, “hashtag3”, “hashtag4”, “hashtag5”],
“sound_vibe”: “Describe the ideal sound/music vibe (e.g. ‘lo-fi tension build’, ‘viral trending audio’, ‘dramatic orchestral’)”,
“posting_tip”: “One specific tip for when/how to post this for maximum reach”
}`;

```
try {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: `Analyze this article and return the JSON:\n\n${article}` }],
    }),
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  const parsed = parseJSON(text);
  if (!parsed) throw new Error("Could not parse response.");
  setResult(parsed);
} catch (e) {
  setError("Something went wrong. Try again.");
} finally {
  setLoading(false);
}
```

};

return (
<>
<style>{glitchStyle}</style>
<div style={{
minHeight: “100vh”,
background: TIKTOK_DARK,
padding: “32px 16px”,
fontFamily: “‘DM Sans’, sans-serif”,
animation: “flicker 8s infinite”,
position: “relative”,
overflow: “hidden”,
}}>
{/* Scanline effect */}
<div style={{
position: “fixed”, top: 0, left: 0, right: 0, bottom: 0,
background: “repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)”,
pointerEvents: “none”, zIndex: 0,
}} />

```
    <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(48px, 10vw, 80px)",
          lineHeight: 0.95,
          letterSpacing: -1,
          color: "#fff",
          marginBottom: 4,
        }}>
          <span className="glitch-text" data-text="ARTICLE">ARTICLE</span>
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(48px, 10vw, 80px)",
          lineHeight: 0.95,
          letterSpacing: -1,
          background: `linear-gradient(90deg, ${TIKTOK_PINK}, ${TIKTOK_CYAN})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 16,
        }}>→ TIKTOK</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>
          Viral Content Engine
        </div>
      </div>

      {/* Input area */}
      <div style={{
        background: "#0a0a0a",
        border: "1px solid #222",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
        transition: "border-color 0.2s",
      }}>
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: TIKTOK_PINK }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFD700" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: TIKTOK_CYAN }} />
          <span style={{ marginLeft: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>
            Paste Article
          </span>
        </div>
        <textarea
          value={article}
          onChange={e => setArticle(e.target.value)}
          placeholder="Drop your article here — news story, blog post, research paper, anything..."
          style={{
            width: "100%",
            minHeight: 180,
            background: "transparent",
            border: "none",
            color: "#e0e0e0",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.7,
            padding: "16px",
            resize: "vertical",
            caretColor: TIKTOK_PINK,
          }}
        />
        <div style={{ padding: "10px 16px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#333" }}>{article.length} chars</span>
          <button
            onClick={analyze}
            disabled={!article.trim() || loading}
            style={{
              background: loading ? "#1a1a1a" : `linear-gradient(135deg, ${TIKTOK_PINK}, #cc003d)`,
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 15,
              letterSpacing: 2,
              padding: "10px 28px",
              cursor: loading || !article.trim() ? "not-allowed" : "pointer",
              opacity: !article.trim() ? 0.4 : 1,
              transition: "all 0.2s",
              animation: !loading && article.trim() ? "pulse-border 2s infinite" : "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  display: "inline-block",
                  width: 14, height: 14,
                  border: "2px solid #ffffff44",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }} />
                ANALYZING
              </>
            ) : "GO VIRAL ↗"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: TIKTOK_PINK, fontFamily: "'DM Sans', sans-serif", fontSize: 13, textAlign: "center", marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{ animation: "fadeIn 0.5s ease forwards" }}>
          {/* Hook */}
          <Hook text={result.hook} />

          {/* Viral angle & why */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <Section label="THE ANGLE" emoji="🎯" color={TIKTOK_CYAN} content={result.angle} delay="0.2s" />
            <Section label="WHY IT'LL BLOW UP" emoji="💥" color={TIKTOK_PINK} content={result.why_viral} delay="0.25s" />
          </div>

          {/* Script */}
          <div style={{
            background: "#080808",
            border: "1px solid #1e1e1e",
            borderRadius: 10,
            padding: "20px 20px 12px",
            marginBottom: 12,
            animation: "slideUp 0.5s ease forwards",
            animationDelay: "0.35s",
            opacity: 0,
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 3, color: "#555", marginBottom: 18 }}>
              📜 VIDEO SCRIPT
            </div>
            {result.script?.map((line, i) => (
              <ScriptLine key={i} time={line.time} text={line.line} i={i} />
            ))}
          </div>

          {/* Visuals */}
          <Section label="B-ROLL & VISUALS" emoji="🎬" color="#FFD700" bullets={result.visuals} delay="0.5s" />

          {/* Sound & posting tip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <Section label="SOUND VIBE" emoji="🎵" color={TIKTOK_PINK} content={result.sound_vibe} delay="0.55s" />
            <Section label="POSTING TIP" emoji="📅" color={TIKTOK_CYAN} content={result.posting_tip} delay="0.6s" />
          </div>

          {/* Caption & hashtags */}
          <div style={{
            background: "#0a0a0a",
            border: "1px solid #1e1e1e",
            borderRadius: 10,
            padding: "18px 20px",
            animation: "slideUp 0.5s ease forwards",
            animationDelay: "0.65s",
            opacity: 0,
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 3, color: "#555", marginBottom: 12 }}>
              ✍️ CAPTION & TAGS
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "#fff",
              fontWeight: 600,
              marginBottom: 14,
              lineHeight: 1.5,
            }}>{result.caption}</div>
            <div>
              {result.hashtags?.map((tag, i) => <Tag key={i} tag={tag} />)}
            </div>
          </div>

          {/* Target audience pill */}
          <div style={{
            marginTop: 16,
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#555",
            animation: "slideUp 0.5s ease forwards",
            animationDelay: "0.7s",
            opacity: 0,
          }}>
            Target audience: <span style={{ color: "#888" }}>{result.target_audience}</span>
          </div>
        </div>
      )}
    </div>
  </div>
</>
```

);
}
