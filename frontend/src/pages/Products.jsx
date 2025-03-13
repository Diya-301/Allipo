import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import {  Input,  Button,  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@relume_io/relume-ui";
import { ChevronLeft, ChevronRight, Search, SortAsc, SortDesc, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const { backendUrl } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${backendUrl}/api/products/all`);
        if (response.data.success) {
          const fetchedProducts = [];
          const categorySet = new Set();
          response.data.products.forEach((categoryData) => {
            Object.keys(categoryData).forEach((category) => {
              if (category !== "_id") {
                categorySet.add(category);
                categoryData[category].forEach((product) => {
                  fetchedProducts.push({
                    name: product.name,
                    casNumber: product.CAS_No,
                    category: category,
                  });
                });
              }
            });
          });
          setProducts(fetchedProducts);
          setCategories(["all", ...Array.from(categorySet)]);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const productsPerPage = 6;
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (categoryFilter === "all" || product.category === categoryFilter) &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.casNumber.includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, categoryFilter, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortConfig.key !== null) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
  }, [filteredProducts, sortConfig]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="mx-auto px-[5%] py-16 md:py-24 lg:py-32 bg-baby_powder min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden shadow-large">
        <div className="px-4 py-5 sm:px-6 bg-russian_violet flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Our Products</h1>
          <Package className="text-white" size={50} />
        </div>
        {loading && <p className="text-center text-lg text-gray-600">Loading...</p>}
        {error && <p className="text-center text-lg text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="flex p-6 flex-col md:flex-row gap-6 w-full max-w-7xl">
            <div className="w-full md:w-64 space-y-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-russian_violet mb-1">
                  Search
                </label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name or CAS No."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-timber_wolf focus:outline-none focus:border-blue-500 transition duration-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-russian_violet" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-russian_violet mb-1">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="border-timber_wolf focus:outline-none focus:border-blue-500 transition duration-300">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.replace(/_/g, " ").slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex-1">
              {isMobile ? (
                currentProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 mb-4 border-b-2 shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="text-lg font-medium mb-2">{product.name}</div>
                    <div className="mb-2 text-gray-600">CAS Number: {product.casNumber}</div>
                    <div className="mb-2 text-gray-600">
                      Category:{" "}
                      {product.category.charAt(0).toUpperCase() + product.category.replace(/_/g, " ").slice(1)}
                    </div>
                    <Link to={`/products/${product.name.toLowerCase().replace(/\s+/g, "_")}`}>
                      <Button
                        className="bg-white text-black border-gray-300 rounded-md font-medium hover:bg-true_blue hover:text-white"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <Table className="w-full border-none">
                  <TableHeader className="border-none">
                    <TableRow className="border-none">
                      <TableHead
                        className="cursor-pointer text-gray-600 p-3 text-left border-none"
                        onClick={() => requestSort("name")}
                      >
                        <span className="flex items-center">
                          CHEMICAL NAME
                          {sortConfig.key === "name" && (
                            sortConfig.direction === "ascending" ? (
                              <SortAsc size={18} className="ml-2" />
                            ) : (
                              <SortDesc size={18} className="ml-2" />
                            )
                          )}
                        </span>
                      </TableHead>
                      <TableHead className="p-3 text-gray-600 text-left border-none">
                        CAS NUMBER
                      </TableHead>
                      <TableHead
                        className="cursor-pointer text-gray-600 p-3 text-left border-none"
                        onClick={() => requestSort("category")}
                      >
                        <span className="flex items-center">
                          CATEGORY
                          {sortConfig.key === "category" && (
                            sortConfig.direction === "ascending" ? (
                              <SortAsc size={18} className="ml-2" />
                            ) : (
                              <SortDesc size={18} className="ml-2" />
                            )
                          )}
                        </span>
                      </TableHead>
                      <TableHead className="p-3 text-gray-600 text-left border-none">
                        ACTION
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-gray-100 transition duration-300 border-b border-gray-300"
                        >
                          <TableCell className="p-3 font-medium border-none">
                            {product.name}
                          </TableCell>
                          <TableCell className="p-3 text-gray-600 border-none">
                            {product.casNumber}
                          </TableCell>
                          <TableCell className="p-3 text-gray-600 border-none">
                            {product.category.charAt(0).toUpperCase() +
                              product.category.replace(/_/g, " ").slice(1)}
                          </TableCell>
                          <TableCell className="p-3 border-none">
                            <Link
                              to={`/products/${product.name
                                .toLowerCase()
                                .replace(/\s+/g, "_")}`}
                            >
                              <Button
                                className="bg-white text-black border-gray-300 rounded-md font-medium hover:bg-true_blue hover:text-white"
                                size="sm"
                              >
                                View Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan="4"
                          className="text-center py-4 font-semibold text-gray-500 border-none"
                        >
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center space-x-2">
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    variant="outline"
                    className="hover:bg-blue-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="hover:bg-blue-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;