import React from 'react';

const ErrorPage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f9fafb' }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4A7AFF' }}>🚧 Oops! You’ve wandered off the map.</h1>
    <p style={{ fontSize: '1.25rem', maxWidth: 500, textAlign: 'center', marginBottom: '2rem' }}>
      Hi, I’m Ariff—the developer. Looks like you’ve found a page I haven’t coded yet.<br/>
      It’s not a bug, it’s just… <b>“future functionality.”</b> 😅<br/><br/>
      Please be nice and wait for the next deployment.<br/>
      In the meantime, maybe grab a coffee or try clicking somewhere else!
    </p>
    <a href="/" style={{ color: '#fff', background: '#4A7AFF', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
      Go Home
    </a>
  </div>
);

export default ErrorPage; 