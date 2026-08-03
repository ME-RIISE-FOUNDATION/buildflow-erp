'use client'

export default function TestPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
        minHeight: '100vh',
        color: '#f1f5f9',
        padding: '40px',
      }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        ✅ If you see this with DARK BLUE BACKGROUND, styling is WORKING
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        The dark theme should be visible now. If you see white background, check browser cache.
      </p>
      <button
        style={{
          background: 'linear-gradient(to right, #2563eb, #06b6d4)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Click Me
      </button>
    </div>
  )
}
