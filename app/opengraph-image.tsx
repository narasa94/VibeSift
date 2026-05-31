import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VibeSift App';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #3b82f6, #ef4444, #eab308)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.03em',
            fontFamily: 'sans-serif',
          }}
        >
          VibeShift
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: 20,
            fontFamily: 'sans-serif',
          }}
        >
          Ubah emosi menjadi komunikasi
        </div>
      </div>
    ),
    { ...size }
  );
}
