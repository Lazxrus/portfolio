import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <>
      <style>{`
        html, body, #root { height: 100%; margin: 0; }

        .nf-root{
          min-height: 100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:2rem;
          position:relative;
          overflow:hidden;
          background: linear-gradient(180deg,#041022 0%, #071430 60%, #020617 100%);
          color:#dff6ff;
          -webkit-font-smoothing:antialiased;
          box-sizing: border-box;
        }
        .nf-blob{
          position:absolute;
          width:70vmax;
          height:70vmax;
          left: -10vmax;
          top: -30vmax;
          filter: blur(70px);
          background:
            radial-gradient(circle at 30% 20%, rgba(14,165,233,0.18), transparent 24%),
            radial-gradient(circle at 70% 80%, rgba(59,130,246,0.16), transparent 24%);
          transform: rotate(25deg);
          animation: float 12s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes float{
          0% { transform: translateY(0) rotate(25deg); }
          50% { transform: translateY(-28px) rotate(28deg); }
          100% { transform: translateY(0) rotate(25deg); }
        }
        .nf-card{
          position:relative;
          z-index:2;
          width:100%;
          max-width:820px;
          padding:2.25rem;
          border-radius:16px;
          background: linear-gradient(180deg, rgba(6,12,28,0.6), rgba(3,6,15,0.5));
          border: 1px solid rgba(96,165,250,0.06);
          box-shadow: 0 12px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          backdrop-filter: blur(6px) saturate(120%);
          text-align:center;
          overflow:hidden;
        }
        .nf-hero{
          display:flex;
          gap:1.25rem;
          align-items:center;
          justify-content:center;
          flex-wrap:wrap;
        }
        .nf-visual{
          width:140px;
          height:120px;
          flex:0 0 140px;
        }
        .nf-title{
          font-size:clamp(2rem,5.5vw,3.75rem);
          margin:0;
          line-height:1;
          color:#E6F9FF;
          text-shadow: 0 6px 30px rgba(14,165,233,0.06), 0 0 30px rgba(14,165,233,0.06);
        }
        .nf-sub{
          margin:0.6rem 0 0;
          color:#9fb8d7;
          font-size:1.05rem;
        }
        .nf-actions{ display:flex; gap:0.6rem; justify-content:center; margin-top:1.15rem; flex-wrap:wrap; }
        .btn{
          display:inline-flex;
          align-items:center;
          gap:0.6rem;
          padding:0.65rem 1rem;
          border-radius:10px;
          font-weight:600;
          text-decoration:none;
          transition:all .18s ease;
          border:1px solid transparent;
          cursor:pointer;
        }
        .btn-primary{
          background: linear-gradient(90deg,#06b6d4,#2563eb);
          color:#021028;
          box-shadow: 0 8px 30px rgba(37,99,235,0.14), 0 0 18px rgba(6,182,212,0.06);
          transform:translateY(0);
        }
        .btn-primary:hover{ transform:translateY(-3px); box-shadow: 0 14px 40px rgba(37,99,235,0.18), 0 0 30px rgba(6,182,212,0.12); }
        .btn-ghost{
          background:transparent;
          color:#CFE9FF;
          border:1px solid rgba(110,207,255,0.12);
        }
        .nf-tip{ margin-top:1rem; color:#78a7ca; font-size:0.92rem; }
        .nf-accent{
          display:inline-block;
          padding:0.2rem 0.45rem;
          border-radius:999px;
          background: rgba(59,130,246,0.08);
          color:#BEE8FF;
          font-size:0.82rem;
          margin-bottom:0.6rem;
          border:1px solid rgba(96,165,250,0.06);
        }
      `}</style>

      <div className="nf-root" role="main">
        <div className="nf-blob" aria-hidden />
        <div className="nf-card" aria-labelledby="nf-title">
          <div style={{ textAlign:'center' }}>
            <span className="nf-accent">Lost in space</span>
          </div>

          <div className="nf-hero">
            <svg className="nf-visual" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <radialGradient id="g1" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
                </radialGradient>
              </defs>
              <rect x="6" y="10" width="88" height="88" rx="10" fill="url(#g1)" opacity="0.08"/>
              <path d="M20 30h60" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
              <path d="M20 52h60" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
              <g transform="translate(108,58)">
                <circle cx="0" cy="0" r="28" fill="#0ea5e950" />
                <path d="M10 8L18 16" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round"/>
                <path d="M-5 -5a11 11 0 1115.556 15.556A11 11 0 01-5 -5z" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.9"/>
              </g>
              <g className="stars" fill="#E0F2FF">
                <circle cx="116" cy="18" r="1.6" opacity="0.95"/>
                <circle cx="130" cy="28" r="1.2" opacity="0.8"/>
                <circle cx="96" cy="6" r="1.1" opacity="0.9"/>
              </g>
            </svg>

            <div style={{ flex:1, minWidth:180 }}>
              <h1 id="nf-title" className="nf-title">404 — Page not found</h1>
              <p className="nf-sub">Looks like this route drifted off the map. Try one of the links below or head back home.</p>

              <div className="nf-actions" role="navigation" aria-label="Not found actions">
                <Link to="/" className="btn btn-primary">Take me home</Link>
              </div>

              <p className="nf-tip">Tip: refresh, check the URL, or explore the projects — maybe you’ll discover something new ✨</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};