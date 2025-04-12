import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

// Define all possible grades based on the schema
const ALL_PHARMA_GRADES = ['IP', 'BP', 'EP', 'USP', 'Pharma', 'NF'];
const ALL_OTHER_GRADES = ['LR', 'AR', 'ACS', 'FCC'];

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); // Store unique categories
  const [selectedCategory, setSelectedCategory] = useState('All'); // Track selected category

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/products/all`);
        if (response.data.success) {
          const flattenedProducts = [];
          response.data.products.forEach((categoryGroup) => {
            Object.keys(categoryGroup).forEach((category) => {
              if (Array.isArray(categoryGroup[category])) {
                flattenedProducts.push(
                  ...categoryGroup[category].map((product) => ({
                    ...product,
                    category,
                  }))
                );
              }
            });
          });
          setProducts(flattenedProducts);

          // Extract unique categories
          const uniqueCategories = [
            'All',
            ...new Set(flattenedProducts.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          setError('No products found');
        }
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      const priceValue = parseFloat(value);
      
      // Validate that price cannot be less than 0
      if (priceValue < 0) {
        toast.error('Price cannot be less than 0');
        return;
      }

      setSelectedProduct((prev) => ({
        ...prev,
        [outerKey]: {
          ...prev[outerKey],
          [innerKey]: { price: priceValue || 0 },
        },
      }));
    } else {
      setSelectedProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      toast.error('No product selected');
      return;
    }

    try {
      const response = await axios.put(`${backendUrl}/api/products/update`, selectedProduct);
      if (response.data.success) {
        toast.success('Product updated successfully');
        const updatedResponse = await axios.get(`${backendUrl}/api/products/all`);
        const flattenedProducts = [];
        updatedResponse.data.products.forEach((categoryGroup) => {
          Object.keys(categoryGroup).forEach((category) => {
            if (Array.isArray(categoryGroup[category])) {
              flattenedProducts.push(
                ...categoryGroup[category].map((product) => ({
                  ...product,
                  category,
                }))
              );
            }
          });
        });
        setProducts(flattenedProducts);
      } else {
        toast.error('Failed to update product');
      }
    } catch (err) {
      toast.error('Error updating product');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-8 bg-white shadow-md min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Products</h2>
        {/* Category Filter Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.replace(/_/g, ' ').slice(1)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Select a Product to Edit:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => handleSelectProduct(product)}
                className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ${selectedProduct?.name === product.name ? 'bg-blue-100' : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">Category: {product.category.charAt(0).toUpperCase() + product.category.replace(/_/g, " ").slice(1)}</p>
                <p className="text-sm text-gray-600">CAS No: {product.CAS_No}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No products available in this category.</p>
          )}
        </div>
      </div>

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6">Editing: {selectedProduct.name}</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={selectedProduct.name}
              onChange={() => { }}
              disabled
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">CAS No:</label>
            <input
              type="text"
              name="CAS_No"
              value={selectedProduct.CAS_No}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <h4 className="text-lg font-semibold mb-4">Pharmaceutical Grades</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {ALL_PHARMA_GRADES.map((grade) => (
              <div key={grade}>
                <label className="block text-sm font-medium text-gray-700">{grade} Price:</label>
                <input
                  type="number"
                  name={`pharma_grade.${grade}`}
                  value={selectedProduct.pharma_grade?.[grade]?.price || 0}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          <h4 className="text-lg font-semibold mb-4">Other Grades</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {ALL_OTHER_GRADES.map((grade) => (
              <div key={grade}>
                <label className="block text-sm font-medium text-gray-700">{grade} Price:</label>
                <input
                  type="number"
                  name={`grade.${grade}`}
                  value={selectedProduct.grade?.[grade]?.price || 0}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-true_blue text-white py-2 px-4 rounded-md hover:bg-russian_violet transition duration-300"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Edit;