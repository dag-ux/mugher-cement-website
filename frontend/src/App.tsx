import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // <-- import ThemeProvider
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
import Quality from './pages/Quality';
import Media from './pages/Media';
import NewsDetail from './pages/NewsDetail';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>  {/* <-- Wrap everything with ThemeProvider */}
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/media" element={<Media />} />
            <Route path="/media/news/:slug" element={<NewsDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;