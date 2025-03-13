import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        pharma_grade: {
            IP: { price: 0 },
            BP: { price: 0 },
            EP: { price: 0 },
            USP: { price: 0 },
            Pharma: { price: 0 },
            NF: { price: 0 },
        },
        grade: {
            LR: { price: 0 },
            AR: { price: 0 },
            ACS: { price: 0 },
            FCC: { price: 0 },
        },
        CAS_No: '',
    });

    // State for categories list
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all categories when the component mounts
    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/products/all`);
                if (response.data.success) {
                  const fetchedCategories = response.data.products.map(product => Object.keys(product)[1]); 
                  setCategories(fetchedCategories);
                  
                } else {
                    setError('Failed to fetch categories');
                }
            } catch (err) {
                setError('Error fetching categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [outerKey, innerKey] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [outerKey]: {
                    ...prev[outerKey],
                    [innerKey]: { price: parseFloat(value) || 0 },
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/products/add`, formData);
            if (response.data.success) {
                toast.success('Product added successfully');
                setFormData({
                    category: '',
                    name: '',
                    pharma_grade: {
                        IP: { price: 0 },
                        BP: { price: 0 },
                        EP: { price: 0 },
                        USP: { price: 0 },
                        Pharma: { price: 0 },
                        NF: { price: 0 },
                    },
                    grade: {
                        LR: { price: 0 },
                        AR: { price: 0 },
                        ACS: { price: 0 },
                        FCC: { price: 0 },
                    },
                    CAS_No: '',
                });
            } else {
                toast.error('Failed to add product');
            }
        } catch (err) {
            toast.error('Error adding product');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Add New Product</h2>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6">Add Product Details</h3>

                {/* Category Selection or Creation */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select or Create a Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                        <option value="new-category">Create New Category</option>
                    </select>
                </div>

                {/* Input for New Category Name */}
                {formData.category === 'new-category' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">New Category Name:</label>
                        <input
                            type="text"
                            name="newCategoryName"
                            value={formData.newCategoryName || ''}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category: e.target.value,
                                }))
                            }
                            placeholder="Enter new category name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                )}

                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* CAS Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">CAS No:</label>
                    <input
                        type="text"
                        name="CAS_No"
                        value={formData.CAS_No}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Pharmaceutical Grades */}
                <h4 className="text-lg font-semibold mb-4">Pharmaceutical Grades</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {Object.keys(formData.pharma_grade).map((grade) => (
                        <div key={grade}>
                            <label className="block text-sm font-medium text-gray-700">{grade} Price:</label>
                            <input
                                type="number"
                                name={`pharma_grade.${grade}`}
                                value={formData.pharma_grade[grade].price}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    ))}
                </div>

                {/* Other Grades */}
                <h4 className="text-lg font-semibold mb-4">Other Grades</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {Object.keys(formData.grade).map((grade) => (
                        <div key={grade}>
                            <label className="block text-sm font-medium text-gray-700">{grade} Price:</label>
                            <input
                                type="number"
                                name={`grade.${grade}`}
                                value={formData.grade[grade].price}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default Add;