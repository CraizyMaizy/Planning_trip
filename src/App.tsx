import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import CreateJourney from './pages/CreateJourney';
import Home from './pages/Home.tsx';
import TripsList from './pages/TripsList.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Layout from './components/TripEditor.tsx';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateJourney />} />
        <Route path="/trips" element={<TripsList />} />
        <Route path="/trip/:id" element={<Layout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
