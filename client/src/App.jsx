import { useState, useEffect } from "react";
import { Plus, Package, ShoppingCart } from "lucide-react";
import { getProducts, searchContextual } from "./Services/productServices";
import ProductForm from "./Components/productForm/ProductForm";
import ProductListing from "./Components/ProductListing/ProductListing";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-lg shadow-md">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 ml-4">ShopSphere</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your products with our simple e-commerce platform
          </p>
        </header>

        <div className="flex border-b mb-8">
          <button
            className={`flex items-center px-6 py-3 font-medium text-sm mr-1 transition-colors ${activeTab === 0
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg"
              }`}
            onClick={() => setActiveTab(0)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
          <button
            className={`flex items-center px-6 py-3 font-medium text-sm transition-colors ${activeTab === 1
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg"
              }`}
            onClick={() => setActiveTab(1)}
          >
            <Package className="h-4 w-4 mr-2" />
            My Products
          </button>
        </div>

        {activeTab === 0 && <ProductForm fetchProducts={fetchProducts} setActiveTab={setActiveTab}/>}

        {activeTab === 1 && <ProductListing products={products} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} setActiveTab={setActiveTab}/>}
      </div>
    </div>
  );
}