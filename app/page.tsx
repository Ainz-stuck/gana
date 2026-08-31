"use client";

/* Batch & Bloom: one-file, mobile-first food-manufacturing auth page. */
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Factory,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type AuthMode = "login" | "register";

type Notice = {
  title: string;
  description: string;
};

const logoSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXqbpRcMEoHxkFT7onWV6s_SPj2V8r8WiTfqZw8d4tQ&s=10";
const plantSrc = "data:image/jpeg;base64,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";
const traceSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7LWxXlv5PCHBUBhi92OjqFBfrOmM3hbfJTjtPxgg8Q&s=10";
const sampleSrc = "/manus-storage/batch-bloom-sample_a061cafc.png";

const styles = `
  :root {
    --bb-cream: #f6f1e8;
    --bb-cream-deep: #ece4d7;
    --bb-leaf: #21483a;
    --bb-leaf-deep: #17382d;
    --bb-leaf-soft: #5f7868;
    --bb-tomato: #e4573d;
    --bb-tomato-deep: #c94431;
    --bb-mustard: #d7a938;
    --bb-ink: #1d2824;
    --bb-muted: #70766f;
    --bb-line: #d9d7ce;
    --bb-white: #fffdf8;
    --bb-ease: cubic-bezier(0.23, 1, 0.32, 1);
  }

  .bb-page,
  .bb-page * { box-sizing: border-box; }

  .bb-page {
    display: grid;
    min-height: 100svh;
    overflow: hidden;
    background: var(--bb-cream);
    color: var(--bb-ink);
    font-family: "DM Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  .bb-page button,
  .bb-page input { font: inherit; }
  .bb-page button,
  .bb-page a { -webkit-tap-highlight-color: transparent; }
  .bb-page button:not(:disabled),
  .bb-page a[href] { cursor: pointer; }
  .bb-page button:focus-visible,
  .bb-page a:focus-visible,
  .bb-page input:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--bb-mustard) 75%, white);
    outline-offset: 3px;
  }

  .bb-production {
    position: relative;
    display: flex;
    min-height: 330px;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    isolation: isolate;
    background: var(--bb-leaf);
    color: var(--bb-cream);
    padding: 20px 22px 25px;
  }

  .bb-production::before {
    position: absolute;
    z-index: -1;
    top: -135px;
    right: -85px;
    width: 270px;
    height: 270px;
    border: 1px solid rgba(246, 241, 232, .2);
    border-radius: 50%;
    content: "";
  }

  .bb-production::after {
    position: absolute;
    z-index: -1;
    bottom: -100px;
    left: -70px;
    width: 240px;
    height: 240px;
    border: 1px solid rgba(215, 169, 56, .33);
    border-radius: 50%;
    content: "";
  }

  .bb-production-grid {
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: .16;
    background-image: linear-gradient(rgba(246, 241, 232, .16) 1px, transparent 1px), linear-gradient(90deg, rgba(246, 241, 232, .16) 1px, transparent 1px);
    background-position: 14px 12px;
    background-size: 28px 28px;
    mask-image: linear-gradient(to bottom, black 20%, transparent 86%);
  }

  .bb-noise {
    position: absolute;
    z-index: 3;
    inset: 0;
    pointer-events: none;
    opacity: .1;
    mix-blend-mode: screen;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.3'/%3E%3C/svg%3E");
  }

  .bb-header,
  .bb-mobile-brand,
  .bb-footer {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bb-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--bb-cream);
    font-family: "Space Grotesk", sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -.05em;
    text-decoration: none;
  }

  .bb-brand-dark { color: var(--bb-leaf); }
  .bb-brand i { color: var(--bb-tomato); font-style: normal; }

  .bb-mark-frame {
    position: relative;
    display: inline-flex;
    width: 34px;
    height: 34px;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(246, 241, 232, .32);
    border-radius: 10px 10px 10px 2px;
    background: rgba(246, 241, 232, .1);
  }

  .bb-brand-dark .bb-mark-frame {
    width: 32px;
    height: 32px;
    border-color: rgba(33, 72, 58, .18);
    background: rgba(33, 72, 58, .05);
  }

  .bb-mark { display: block; width: 27px; height: 27px; object-fit: contain; }
  .bb-brand-dark .bb-mark { width: 25px; height: 25px; }

  .bb-mark-line {
    position: absolute;
    right: -6px;
    bottom: 7px;
    width: 14px;
    height: 2px;
    background: var(--bb-tomato);
  }

  .bb-chip,
  .bb-kicker,
  .bb-eyebrow,
  .bb-footer,
  .bb-measure,
  .bb-photo-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .1em;
    line-height: 1;
    text-transform: uppercase;
  }

  .bb-chip { display: inline-flex; align-items: center; gap: 6px; color: rgba(246, 241, 232, .68); }
  .bb-mobile-brand .bb-chip { color: var(--bb-leaf-soft); }
  .bb-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--bb-mustard); }
  .bb-mobile-brand .bb-dot { background: #4b9a65; }

  .bb-stage { position: absolute; z-index: -1; inset: 58px -35px 40px 35px; }
  .bb-photo {
    position: absolute;
    overflow: hidden;
    border: 6px solid rgba(246, 241, 232, .88);
    background: var(--bb-cream-deep);
    box-shadow: 0 18px 38px rgba(9, 29, 22, .25);
  }
  .bb-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .bb-photo-main { top: 0; right: 8%; width: 68%; height: 82%; transform: rotate(-3deg); }
  .bb-photo-trace { bottom: -1%; left: 5%; width: 37%; height: 42%; transform: rotate(7deg); }
  .bb-photo-sample { right: 3%; bottom: -8%; width: 28%; height: 34%; transform: rotate(-8deg); }
  .bb-photo-label { position: absolute; right: 9px; left: 9px; display: flex; justify-content: space-between; color: var(--bb-cream); font-size: 8px; text-shadow: 0 1px 3px rgba(0,0,0,.4); }
  .bb-photo-top { top: 10px; }
  .bb-photo-bottom { bottom: 10px; }
  .bb-photo-bottom span { color: var(--bb-mustard); font-size: 14px; }
  .bb-cross { position: absolute; color: var(--bb-tomato); font-family: "Space Grotesk", sans-serif; font-size: 26px; font-weight: 300; }
  .bb-cross-one { top: 12%; left: 4%; }
  .bb-cross-two { right: 10%; bottom: 10%; }
  .bb-measure { position: absolute; top: 7%; left: -2%; color: rgba(246, 241, 232, .58); transform: rotate(-90deg) translateX(-100%); transform-origin: top left; }

  .bb-production-copy { position: relative; z-index: 4; max-width: 355px; margin-top: auto; }
  .bb-eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 12px; color: var(--bb-mustard); }
  .bb-eyebrow span { color: var(--bb-cream); opacity: .72; }
  .bb-production h1,
  .bb-access h2 { margin: 0; font-family: "Space Grotesk", sans-serif; font-weight: 600; letter-spacing: -.065em; }
  .bb-production h1 { color: var(--bb-cream); font-size: clamp(2.15rem, 8.5vw, 4.5rem); line-height: .94; }
  .bb-production h1 em { color: var(--bb-mustard); font-style: normal; }
  .bb-production-description { max-width: 290px; margin: 15px 0 0; color: rgba(246, 241, 232, .72); font-size: 13px; line-height: 1.48; }
  .bb-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
  .bb-tags span { display: inline-flex; align-items: center; gap: 5px; color: rgba(246, 241, 232, .82); font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
  .bb-tags span svg { color: var(--bb-tomato); }
  .bb-footer { color: rgba(246, 241, 232, .5); font-size: 9px; }

  .bb-access { display: flex; justify-content: center; background: var(--bb-cream); padding: 32px 22px 25px; }
  .bb-access-wrap { display: flex; width: 100%; max-width: 450px; flex-direction: column; }
  .bb-mobile-brand { margin-bottom: 38px; }
  .bb-access-intro { position: relative; animation: bb-lift .5s var(--bb-ease) both; }
  .bb-kicker { display: flex; align-items: center; gap: 9px; margin-bottom: 17px; color: var(--bb-tomato-deep); }
  .bb-kicker span { color: var(--bb-leaf); }
  .bb-kicker i { color: var(--bb-line); font-style: normal; }
  .bb-status { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 13px; color: var(--bb-leaf-soft); font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
  .bb-status-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #4b9a65; }
  .bb-status-dot::after { position: absolute; inset: -3px; border: 1px solid rgba(75,154,101,.35); border-radius: 50%; content: ""; }
  .bb-access h2 { max-width: 410px; color: var(--bb-ink); font-size: clamp(2rem, 8vw, 3.4rem); line-height: 1.01; }
  .bb-intro-copy { max-width: 325px; margin: 14px 0 0; color: var(--bb-muted); font-size: 14px; line-height: 1.55; }

  .bb-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin: 31px 0 27px; border-bottom: 1px solid var(--bb-line); }
  .bb-tab { position: relative; border: 0; background: transparent; color: #9a9d96; padding: 0 3px 13px; font-size: 13px; font-weight: 700; text-align: left; transition: color .18s var(--bb-ease); }
  .bb-tab::after { position: absolute; right: 0; bottom: -1px; left: 0; height: 2px; background: transparent; content: ""; transition: background .18s var(--bb-ease); }
  .bb-tab:hover, .bb-tab.active { color: var(--bb-leaf); }
  .bb-tab.active::after { background: var(--bb-tomato); }

  .bb-form { display: flex; flex-direction: column; gap: 19px; animation: bb-lift .5s .07s var(--bb-ease) both; }
  .bb-field { display: flex; flex-direction: column; gap: 8px; }
  .bb-field.reveal { animation: bb-lift .24s var(--bb-ease) both; }
  .bb-field.late { animation-delay: .035s; }
  .bb-field label, .bb-label-row label { color: var(--bb-ink); font-size: 12px; font-weight: 700; }
  .bb-label-row { display: flex; align-items: baseline; justify-content: space-between; }
  .bb-text-button, .bb-inline-link { border: 0; background: transparent; color: var(--bb-tomato-deep); font-size: 12px; font-weight: 700; padding: 0; text-decoration: none; transition: color .16s var(--bb-ease); }
  .bb-text-button:hover, .bb-inline-link:hover { color: var(--bb-leaf); }
  .bb-input { display: flex; min-height: 53px; align-items: center; gap: 12px; border: 1px solid var(--bb-line); border-left: 2px solid transparent; background: rgba(255,253,248,.45); padding: 0 14px; color: #9a9d96; transition: border-color .18s var(--bb-ease), background .18s var(--bb-ease), box-shadow .18s var(--bb-ease), transform .18s var(--bb-ease); }
  .bb-input:focus-within { border-color: var(--bb-leaf); border-left-color: var(--bb-tomato); background: var(--bb-white); box-shadow: 0 0 0 4px rgba(33,72,58,.08); transform: translateY(-1px); }
  .bb-input input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: var(--bb-ink); font-size: 14px; }
  .bb-input input::placeholder { color: #a9aca4; }
  .bb-icon-button { display: inline-flex; flex: 0 0 auto; border: 0; background: transparent; color: #969d94; padding: 3px; transition: color .16s var(--bb-ease), transform .16s var(--bb-ease); }
  .bb-icon-button:hover { color: var(--bb-leaf); transform: scale(1.08); }
  .bb-hints { display: flex; flex-wrap: wrap; gap: 7px 12px; margin-top: -7px; }
  .bb-hint { display: inline-flex; align-items: center; gap: 4px; color: #9a9d96; font-size: 11px; }
  .bb-hint.met { color: #4b805a; }

  .bb-primary, .bb-social { display: flex; min-height: 53px; align-items: center; justify-content: space-between; border: 0; font-size: 13px; font-weight: 700; transition: background .18s var(--bb-ease), color .18s var(--bb-ease), transform .16s var(--bb-ease), box-shadow .18s var(--bb-ease); }
  .bb-primary { margin-top: 3px; background: var(--bb-tomato); color: var(--bb-white); padding: 0 17px 0 18px; box-shadow: 0 11px 22px rgba(228,87,61,.18); }
  .bb-primary:hover { background: var(--bb-tomato-deep); box-shadow: 0 14px 25px rgba(228,87,61,.25); transform: translateY(-2px); }
  .bb-primary:active, .bb-social:active { transform: scale(.97); }
  .bb-note { display: flex; align-items: flex-start; gap: 7px; margin: -4px 0 0; color: #4b805a; font-size: 11px; line-height: 1.45; }
  .bb-divider { display: flex; align-items: center; gap: 12px; margin: 26px 0 17px; color: #9a9d96; font-size: 11px; }
  .bb-divider::before, .bb-divider::after { height: 1px; flex: 1; background: var(--bb-line); content: ""; }
  .bb-social { justify-content: center; gap: 10px; border: 1px solid var(--bb-line); background: transparent; color: var(--bb-ink); padding: 0 14px; }
  .bb-social:hover { border-color: var(--bb-leaf); background: var(--bb-white); transform: translateY(-1px); }
  .bb-social svg:last-child { margin-left: auto; color: #9a9d96; }
  .bb-microsoft { display: grid; width: 17px; height: 17px; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; }
  .bb-microsoft i:nth-child(1) { background: #f35325; }
  .bb-microsoft i:nth-child(2) { background: #81bc06; }
  .bb-microsoft i:nth-child(3) { background: #05a6f0; }
  .bb-microsoft i:nth-child(4) { background: #ffba08; }
  .bb-switch-copy { margin: 21px 0 0; color: var(--bb-muted); font-size: 12px; text-align: center; }
  .bb-access-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 48px; color: #9a9d96; font-size: 10px; letter-spacing: .01em; }

  .bb-toast { position: fixed; right: 20px; bottom: 20px; z-index: 20; max-width: min(360px, calc(100vw - 40px)); border: 1px solid rgba(33,72,58,.16); background: var(--bb-leaf); color: var(--bb-cream); padding: 14px 16px; box-shadow: 0 18px 38px rgba(9,29,22,.2); animation: bb-lift .24s var(--bb-ease) both; }
  .bb-toast strong { display: block; font-family: "Space Grotesk", sans-serif; font-size: 13px; }
  .bb-toast span { display: block; margin-top: 4px; color: rgba(246,241,232,.72); font-size: 11px; line-height: 1.4; }

  @keyframes bb-lift { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  @media (min-width: 700px) {
    .bb-page { grid-template-columns: minmax(0, 1.07fr) minmax(420px, .93fr); }
    .bb-production { min-height: 100svh; padding: 30px clamp(32px, 5vw, 75px) 39px; }
    .bb-stage { inset: 13% -5% 14% 17%; }
    .bb-production h1 { font-size: clamp(3.5rem, 5vw, 5.8rem); }
    .bb-access { min-height: 100svh; align-items: center; padding: 58px clamp(38px, 6vw, 90px); }
    .bb-mobile-brand { display: none; }
    .bb-access-wrap { min-height: 670px; max-width: 430px; justify-content: center; }
    .bb-access-footer { padding-top: 62px; }
  }

  @media (min-width: 1120px) {
    .bb-page { grid-template-columns: minmax(0, 1.08fr) minmax(510px, .92fr); }
    .bb-production { padding-left: clamp(55px, 7vw, 118px); padding-right: clamp(55px, 7vw, 118px); }
    .bb-stage { inset: 13% -1% 12% 14%; }
    .bb-access { justify-content: flex-start; padding-left: clamp(60px, 8vw, 128px); padding-right: clamp(60px, 8vw, 128px); }
  }

  @media (max-width: 430px) {
    .bb-production { min-height: 318px; padding-top: 18px; }
    .bb-stage { inset: 53px -42px 30px 41px; }
    .bb-production h1 { font-size: 2.2rem; }
    .bb-production-description { display: none; }
    .bb-tags { margin-top: 13px; }
    .bb-footer { font-size: 8px; }
    .bb-access { padding-top: 30px; }
    .bb-mobile-brand { margin-bottom: 38px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
`;

export default function Page() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [facility, setFacility] = useState("");
  const [password, setPassword] = useState("");

  const passwordChecks = useMemo(
    () => [
      { label: "8+ characters", met: password.length >= 8 },
      { label: "One number", met: /\d/.test(password) },
      { label: "One uppercase", met: /[A-Z]/.test(password) },
    ],
    [password],
  );

  const showNotice = (title: string, description: string) => {
    setNotice({ title, description });
    window.setTimeout(() => setNotice(null), 3600);
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setSubmitted(false);
    setShowPassword(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    showNotice(
      mode === "login" ? "Access request received." : "Operator profile created.",
      "This front-end demo is ready to connect to your auth provider.",
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <main className="bb-page">
        <section className="bb-production" aria-label="Batch & Bloom introduction">
          <div className="bb-production-grid" aria-hidden="true" />
          <div className="bb-noise" aria-hidden="true" />

          <header className="bb-header">
            <a className="bb-brand" href="#bb-access" aria-label="Batch & Bloom home">
              <span className="bb-mark-frame"><img src={logoSrc} alt="" className="bb-mark" /><span className="bb-mark-line" /></span>
              <span>batch <i>&amp;</i> bloom</span>
            </a>
            <span className="bb-chip"><span className="bb-dot" /> plant 04 / line a</span>
          </header>

          <div className="bb-stage" aria-hidden="true">
            <div className="bb-photo bb-photo-main">
              <img src={plantSrc} alt="" />
              <div className="bb-photo-label bb-photo-top">fresh input / 04</div>
              <div className="bb-photo-label bb-photo-bottom">qc ready <span>↗</span></div>
            </div>
            <div className="bb-photo bb-photo-trace"><img src={traceSrc} alt="" /></div>
            <div className="bb-photo bb-photo-sample"><img src={sampleSrc} alt="" /></div>
            <span className="bb-cross bb-cross-one">+</span>
            <span className="bb-cross bb-cross-two">+</span>
            <span className="bb-measure">120 / 240</span>
          </div>

          <div className="bb-production-copy">
            <p className="bb-eyebrow"><span>00</span> / plant access</p>
            <h1>Good food<br />starts with a<br /><em>clear process.</em></h1>
            <p className="bb-production-description">One calm place for every batch, every shift, and the people who keep quality moving.</p>
            <div className="bb-tags">
              <span><Leaf size={13} strokeWidth={1.8} /> fresh</span>
              <span><Factory size={13} strokeWidth={1.8} /> exact</span>
              <span><ShieldCheck size={13} strokeWidth={1.8} /> dependable</span>
            </div>
          </div>

          <footer className="bb-footer"><span>traceable by design</span><span>BB—2026 / 01</span></footer>
        </section>

        <section className="bb-access" id="bb-access">
          <div className="bb-access-wrap">
            <div className="bb-mobile-brand">
              <a className="bb-brand bb-brand-dark" href="#bb-access" aria-label="Batch & Bloom home">
                <span className="bb-mark-frame"><img src={logoSrc} alt="" className="bb-mark" /><span className="bb-mark-line" /></span>
                <span>batch <i>&amp;</i> bloom</span>
              </a>
              <span className="bb-chip"><span className="bb-dot" /> online</span>
            </div>

            <div className="bb-access-intro">
              <div className="bb-kicker"><span>01</span><i>/</i> authenticate</div>
              <div className="bb-status"><span className="bb-status-dot" /> all systems ready</div>
              <h2>{mode === "login" ? "Pick up the next batch." : "Set up your operator access."}</h2>
              <p className="bb-intro-copy">{mode === "login" ? "Sign in to continue your shift with clarity." : "Create a profile for your plant, team, and next clear step."}</p>
            </div>

            <div className="bb-tabs" role="tablist" aria-label="Authentication mode">
              <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "bb-tab active" : "bb-tab"} onClick={() => switchMode("login")}>Sign in</button>
              <button type="button" role="tab" aria-selected={mode === "register"} className={mode === "register" ? "bb-tab active" : "bb-tab"} onClick={() => switchMode("register")}>Create profile</button>
            </div>

            <form className="bb-form" onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="bb-field reveal">
                  <label htmlFor="bb-full-name">Full name</label>
                  <div className="bb-input"><UserRound size={18} strokeWidth={1.8} aria-hidden="true" /><input id="bb-full-name" name="name" type="text" autoComplete="name" placeholder="Your name" value={fullName} onChange={(event) => setFullName(event.target.value)} required /></div>
                </div>
              )}

              {mode === "register" && (
                <div className="bb-field reveal late">
                  <label htmlFor="bb-facility">Facility or team</label>
                  <div className="bb-input"><Factory size={18} strokeWidth={1.8} aria-hidden="true" /><input id="bb-facility" name="facility" type="text" placeholder="e.g. Plant 04 / Quality" value={facility} onChange={(event) => setFacility(event.target.value)} required /></div>
                </div>
              )}

              <div className="bb-field">
                <label htmlFor="bb-email">Work email</label>
                <div className="bb-input"><Mail size={18} strokeWidth={1.8} aria-hidden="true" /><input id="bb-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              </div>

              <div className="bb-field">
                <div className="bb-label-row">
                  <label htmlFor="bb-password">Password</label>
                  {mode === "login" && <button type="button" className="bb-text-button" onClick={() => showNotice("Password reset requested.", "Connect this action to your recovery flow.")}>Forgot password?</button>}
                </div>
                <div className="bb-input"><LockKeyhole size={18} strokeWidth={1.8} aria-hidden="true" /><input id="bb-password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder={mode === "login" ? "Enter your password" : "Create a password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={mode === "register" ? 8 : undefined} /><button type="button" className="bb-icon-button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}</button></div>
              </div>

              {mode === "register" && <div className="bb-hints" aria-live="polite">{passwordChecks.map((check) => <span key={check.label} className={check.met ? "bb-hint met" : "bb-hint"}><Check size={12} strokeWidth={2.4} /> {check.label}</span>)}</div>}

              <button className="bb-primary" type="submit"><span>{mode === "login" ? "Enter plant workspace" : "Create operator profile"}</span><ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></button>
              {submitted && <p className="bb-note" role="status"><ShieldCheck size={16} aria-hidden="true" /> Demo submission received — connect your auth provider next.</p>}
            </form>


            <p className="bb-switch-copy">{mode === "login" ? "Need an operator profile?" : "Already on the floor?"}{" "}<button type="button" className="bb-inline-link" onClick={() => switchMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Create one" : "Sign in"}</button></p>
            <footer className="bb-access-footer"><span>Need help? Contact your plant admin.</span><span>v. 1.0.4</span></footer>
          </div>
        </section>
      </main>
      {notice && <div className="bb-toast" role="status"><strong>{notice.title}</strong><span>{notice.description}</span></div>}
    </>
  );
}
