import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useTransaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    setStatus("loading");
    try {
      const response = await axiosInstance.get("/bills");
      setTransaction(response.data?.data || []);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

   const createTransaction = async (transactionData) => {
    try {
    
      const response = await axiosInstance.post("/bills", transactionData);
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    } 
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return {
    transactions,
    status,
    error,
    createTransaction,
    fetchTransactions: fetchTransaction,
  };
};

export default useTransaction;
