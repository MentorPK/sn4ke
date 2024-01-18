import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import SignalProvider from './signals/SignalProvider.js';

export function App() {
  return (
    <LocationProvider>
      <SignalProvider>
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route default component={NotFound} />
          </Router>
        </main>
      </SignalProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));
