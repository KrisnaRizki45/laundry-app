import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setStatus("loading");
    try {
      const response = await axiosInstance.get("/customers");
      setCustomers(response.data?.data || []);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    status,
    error,
    fetchCustomer: fetchCustomers,
  };
};

export default useCustomers;