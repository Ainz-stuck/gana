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

const logoSrc = "/manus-storage/batch-bloom-logo_1f396c37.png";
const plantSrc = "/manus-storage/batch-bloom-plant_64dfd6be.png";
const traceSrc = "/manus-storage/batch-bloom-trace_f02b8491.png";
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
  .bb-production h1 { color: var(--bb-ink); font-size: clamp(2.15rem, 8.5vw, 4.5rem); line-height: .94; text-shadow: 0 1px 0 rgba(246,241,232,.78), 0 0 18px rgba(246,241,232,.32); }
  .bb-production h1 em { color: var(--bb-tomato-deep); font-style: normal; text-shadow: 0 1px 0 rgba(246,241,232,.82), 0 0 18px rgba(246,241,232,.3); }
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
