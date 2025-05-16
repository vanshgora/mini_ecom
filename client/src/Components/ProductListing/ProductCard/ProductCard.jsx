import { Package } from "lucide-react";

export default function ProductCard({ product, searchType }) {
    return (
        <div className="group relative border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b9f9e7e0%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b9f9e7e0%22%3E%3Crect%20width%3D%22200%22%20height%3D%22150%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%2280.7%22%3EImage%20Not%20Available%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                        }}
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                        <Package className="h-12 w-12 text-gray-400" />
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
                    <span className="font-bold text-indigo-600 whitespace-nowrap">${parseFloat(product.price).toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>ID: {product.id}</span>
                    {searchType === "contextual" && product.relevanceScore !== undefined && (
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                            Score: {product.relevanceScore}
                        </span>
                    )}
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}