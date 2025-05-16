import { useState } from "react";
import { addProduct } from "../../Services/productServices";
import { Loader, X } from "lucide-react";

export default function ProductForm({ fetchProducts, setActiveTab }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image_url: ""
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await addProduct({
                ...formData,
                price: parseFloat(formData.price)
            })

            if (response.ok) {
                setFormData({
                    name: "",
                    price: "",
                    description: "",
                    image_url: ""
                });
                setSuccessMessage("Product added successfully!");
                fetchProducts();
                setTimeout(() => setSuccessMessage(""), 3000);
                setActiveTab(1);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.price) newErrors.price = "Price is required";
        if (formData.price && parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
        if (!formData.description.trim()) newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Add New Product
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                            Price ($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            value={formData.price}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                                }`}
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your product..."
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image_url">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image_url"
                            name="image_url"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.image_url && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-500 mb-2">Image Preview:</p>
                                <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden border">
                                    <img
                                        src={formData.image_url}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b9f9e7e0%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b9f9e7e0%22%3E%3Crect%20width%3D%22200%22%20height%3D%22150%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%2280.7%22%3EImage%20Preview%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Processing...
                                </>
                            ) : (
                                'Submit Product'
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {successMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}
        </div>
    )
}