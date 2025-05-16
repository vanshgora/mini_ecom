import { Loader, Package, Search, X } from "lucide-react";
import ProductCard from "./ProductCard/ProductCard";
import EmptyProductList from "./EmptyProductList/EmptyProductList";
import { useEffect, useState } from "react";
import { searchContextual } from "../../Services/productServices";

export default function ProductListing({ products, filteredProducts, setFilteredProducts, setActiveTab }) {

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchType, setSearchType] = useState("simple");


    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts(products);
            return;
        }

        if (searchType === "simple") {

            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {

            const delayDebounceFn = setTimeout(() => {
                performContextualSearch(searchQuery);
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery, products, searchType]);

    const toggleSearchType = () => {
        const newType = searchType === "simple" ? "contextual" : "simple";
        setSearchType(newType);

        if (searchQuery.trim() !== "") {
            if (newType === "contextual") {
                performContextualSearch(searchQuery);
            } else {
                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredProducts(filtered);
            }
        }
    };

    const performContextualSearch = async (query) => {
        if (!query.trim()) {
            setFilteredProducts(products);
            return;
        }

        setIsSearching(true);

        try {
            const response = await searchContextual(query);

            if (response.ok) {
                const data = await response.json();
                setFilteredProducts(data);
            } else {

                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredProducts(filtered);
            }
        } catch (error) {
            console.error('Error performing contextual search:', error);

            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } finally {
            setIsSearching(false);
        }
    };

    return (<div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Package className="h-6 w-6 mr-2 text-indigo-600" />
                My Products
                <span className="ml-2 text-sm font-normal bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
            </h2>
            <div className="relative w-full md:w-80">
                <div className="flex items-center mb-2 justify-end">
                    <div className="text-sm text-gray-500 mr-2">Search Mode:</div>
                    <button
                        onClick={toggleSearchType}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${searchType === "contextual"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800"
                            }`}
                    >
                        {searchType === "contextual" ? "Contextual" : "Simple"}
                    </button>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {isSearching ?
                            <Loader className="h-5 w-5 text-gray-400 animate-spin" /> :
                            <Search className="h-5 w-5 text-gray-400" />
                        }
                    </div>
                    <input
                        type="text"
                        placeholder={searchType === "contextual" ?
                            "Describe what you're looking for..." :
                            "Search products by name or description..."
                        }
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
                {searchType === "contextual" && (
                    <p className="text-xs text-gray-500 mt-1">
                        Try queries like "for sitting" or "kitchen items"
                    </p>
                )}
            </div>

        </div>

        {filteredProducts.length === 0 ? <EmptyProductList setActiveTab={setActiveTab} products={products} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
        )}
    </div>)
}