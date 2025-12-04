import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BrandList from './pages/BrandList';
import BrandDetail from './pages/BrandDetail';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import MaterialList from './pages/MaterialList';
import MaterialDetail from './pages/MaterialDetail';
import References from './pages/References';

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Brands */}
      <Route path="/brands" element={<BrandList />} />
      <Route path="/brands/:id" element={<BrandDetail />} />

      {/* Products */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      {/* Materials */}
      <Route path="/materials" element={<MaterialList />} />
      <Route path="/materials/:id" element={<MaterialDetail />} />

      {/* References */}
      <Route path="/references" element={<References />} />
    </Routes>
  );
}

export default App;
