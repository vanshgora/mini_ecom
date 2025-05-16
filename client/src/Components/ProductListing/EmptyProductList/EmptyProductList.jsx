import { Package, Plus } from "lucide-react";

export default function EmptyProductList({ setActiveTab, products, searchType }) {
    return (
        <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
            {products.length === 0
                ? "No products added yet"
                : "No matching products found"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
            {products.length === 0
                ? "Get started by adding your first product."
                : searchType === "contextual"
                    ? "Try using different words to describe what you're looking for."
                    : "Try adjusting your search query."}
        </p>
        {products.length === 0 && (
            <button
                onClick={() => setActiveTab(0)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Product
            </button>
        )}
    </div>
    )
}