import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Quality from './pages/Quality';
import Media from './pages/Media';
import NewsDetail from './pages/NewsDetail';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminNews from './pages/admin/AdminNews';
import AdminNewsForm from './pages/admin/AdminNewsForm';
import AdminMessages from './pages/admin/AdminMessages';
import AdminJobs from './pages/admin/AdminJobs';
import AdminJobForm from './pages/admin/AdminJobForm';
import AdminApplications from './pages/admin/AdminApplications';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/quality" element={<Layout><Quality /></Layout>} />
          <Route path="/media" element={<Layout><Media /></Layout>} />
          <Route path="/media/news/:slug" element={<Layout><NewsDetail /></Layout>} />
          <Route path="/careers" element={<Layout><Careers /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* ===== HIDDEN LOGIN ===== */}
          <Route path="/admin/login" element={<Login />} />

          {/* ===== ADMIN ROUTES (Protected) ===== */}

          {/* Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Products */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProductForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProductForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* News */}
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminNews />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/create"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminNewsForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/edit/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminNewsForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Messages */}
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminMessages />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Jobs */}
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminJobs />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/create"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminJobForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/edit/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminJobForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Applications */}
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminApplications />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;