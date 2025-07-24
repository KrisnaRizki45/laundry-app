import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useProducts = (productId = null) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setStatus("loading");
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data?.data || []);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

  const fetchProductById = async (id) => {
    setStatus("loading");
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data?.data || null);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

  const createProduct = async (payload) => {
    const response = await axiosInstance.post("/products", payload);
    await fetchProducts(); // refresh after create
    return response.data;
  };

  const deleteProduct = async (id) => {
    await axiosInstance.delete(`/products/${id}`);
    await fetchProducts(); // refresh after delete
  };

  const updateProduct = async (id, formData) => {
  try {
    const existing = products.find((p) => p.id === id);
    if (!existing) throw new Error("Product not found");

    const payload = {
      id: existing.id,
      name: formData.name,
      price: Number(formData.price), 
      type: formData.type,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const response = await axiosInstance.put(`/products`, payload);
    fetchProducts();
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    } else {
      fetchProducts();
    }
  }, [productId]);

  return {
    products,
    product,
    status,
    error,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProduct: productId ? () => fetchProductById(productId) : fetchProducts,
  };
};

export default useProducts;
