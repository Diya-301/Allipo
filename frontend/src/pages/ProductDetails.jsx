import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@relume_io/relume-ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@relume_io/relume-ui";
import { Input, Label } from "@relume_io/relume-ui";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { ShoppingCart, PackagePlus, CheckCircle } from "lucide-react";
import CustomToast from "../components/CustomToast";

const ProductDetails = () => {
  const { productName } = useParams();
  const { backendUrl, navigate } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedPackagingType, setSelectedPackagingType] = useState("");
  const [selectedPackagingSize, setSelectedPackagingSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const formattedName = productName.replace(/_/g, " ");
        const response = await axios.get(`${backendUrl}/api/products/${formattedName}`);

        if (response.data.success) {
          setProduct(response.data.product);
          setCategory(response.data.category.charAt(0).toUpperCase() + response.data.category.slice(1));
        } else {
          toast.error("Product not found.");
        }
      } catch (error) {
        toast.error("Failed to load product details.");
      }
    };
    fetchProductDetails();
  }, [backendUrl, productName]);

  const getGradeDetails = useMemo(() => {
    return (grade) => {
      if (product?.pharma_grade?.[grade]) {
        return product.pharma_grade[grade];
      }
      if (product?.grade?.[grade]) {
        return product.grade[grade];
      }
      return null;
    };
  }, [product]);

  const handleAddToCart = async () => {
    setLoading(true);

    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        toast.error("User not authenticated. Please login.");
        setLoading(false);
        return;
      }

      if (quantity <= 0) {
        toast.error("Quantity must be greater than 0.");
        setLoading(false);
        return;
      }

      const gradeDetails = getGradeDetails(selectedGrade);
      if (!gradeDetails) {
        toast.error("Invalid grade selection.");
        setLoading(false);
        return;
      }

      const requestBody = {
        product: {
          productName,
          selectedGrade,
          selectedPackagingType,
          selectedPackagingSize,
          quantity,
          price: gradeDetails.price,
        },
      };

      const response = await axios.post(`${backendUrl}/api/cart/add`, requestBody, {
        headers: { Authorization: authToken },
      });

      if (response.data.success) {
        toast.success("Product added to cart successfully!");
        toast(<CustomToast />, {
          position: "top-right",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(response.data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("An error occurred while adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-baby_powder to-white">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-baby_powder to-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-timber_wolf">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-gradient-to-br from-baby_powder to-timber_wolf p-6 rounded-2xl text-white shadow-large">
            <h1 className="text-4xl font-bold text-russian_violet mb-4">{product.name}</h1>
            <p className="text-lg font-semibold text-true_blue mb-2">CAS Number: {product.CAS_No}</p>
            <p className="text-md text-russian_violet font-semibold mb-6">Category: {category}</p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="grade" className="block text-russian_violet font-medium mb-2">
                  Select Grade
                </Label>
                <Select
                  value={selectedGrade}
                  onValueChange={setSelectedGrade}
                  aria-label="Select Grade"
                  className="w-full"
                >
                  <SelectTrigger id="grade" className="border-timber_wolf focus:ring-true_blue focus:border-true_blue">
                    <SelectValue placeholder="Choose grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.pharma_grade && (
                      <>
                        <SelectItem value="_pharma" disabled>Pharma Grades</SelectItem>
                        {Object.entries(product.pharma_grade).map(([grade, { price }]) => (
                          <SelectItem key={grade} value={grade}>
                            {grade} - ₹{price}
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {product.grade && (
                      <>
                        <SelectItem value="_regular" disabled>General Grades</SelectItem>
                        {Object.entries(product.grade).map(([grade, { price }]) => (
                          <SelectItem key={grade} value={grade}>
                            {grade} - ₹{price}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="packaging-type" className="block text-russian_violet font-medium mb-2">
                  Packaging Type
                </Label>
                <Select
                  value={selectedPackagingType}
                  onValueChange={setSelectedPackagingType}
                  aria-label="Select Packaging Type"
                  className="w-full"
                >
                  <SelectTrigger id="packaging-type" className="border-timber_wolf focus:ring-true_blue focus:border-true_blue">
                    <SelectValue placeholder="Choose packaging type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="drum">Drum</SelectItem>
                    <SelectItem value="bulk">Bulk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="packaging-size" className="block text-russian_violet font-medium mb-2">
                  Packaging Size
                </Label>
                <Select
                  value={selectedPackagingSize}
                  onValueChange={setSelectedPackagingSize}
                  aria-label="Select Packaging Size"
                  className="w-full"
                >
                  <SelectTrigger id="packaging-size" className="border-timber_wolf focus:ring-true_blue focus:border-true_blue">
                    <SelectValue placeholder="Choose packaging size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25kg">25 kg</SelectItem>
                    <SelectItem value="50kg">50 kg</SelectItem>
                    <SelectItem value="1000kg">1000 kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity" className="block text-russian_violet font-medium mb-2">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full text-black border-timber_wolf focus:ring-true_blue focus:border-true_blue h-10"
                  aria-label="Enter Quantity"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-true_blue to-russian_violet p-6 rounded-2xl text-white shadow-large">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <PackagePlus className="mr-2" size={24} /> Order Summary
            </h2>

            {selectedGrade && (
              <div className="space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Selected Grade:</span>
                  <span>{selectedGrade}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Price:</span>
                  <span>₹{getGradeDetails(selectedGrade)?.price}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Packaging Type:</span>
                  <span>{selectedPackagingType.charAt(0).toUpperCase() + selectedPackagingType.replace(/_/g, " ").slice(1) || "Not Selected"}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Packaging Size:</span>
                  <span>{selectedPackagingSize || "Not Selected"}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between font-medium border-t border-white pt-4">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-lg">
                    ₹{(getGradeDetails(selectedGrade)?.price * quantity * parseInt(selectedPackagingSize)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-white font-medium text-true_blue hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
              disabled={!selectedGrade || !selectedPackagingType || !selectedPackagingSize || loading}
              aria-label="Add to Cart"
            >
              {loading ? (
                <span className="flex items-center">
                  <CheckCircle className="mr-2 animate-spin" size={18} /> Adding...
                </span>
              ) : (
                <span className="flex items-center">
                  <ShoppingCart className="mr-2" size={18} /> Add to Cart
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;