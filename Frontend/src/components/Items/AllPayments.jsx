import React, { useEffect, useState } from "react";
import axios from "axios";
import './AllPayments.css';
import AdminPanel from "../Admin/AdminPanel";

const AllPayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://foodie-foodorderingwebsite.onrender.com/api/v1/pay/getAllUserPayments");
        const allPayments = response.data.userPayments || [];

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentPayments = allPayments.filter((payment) => {
          const paymentDate = new Date(payment.date);
          return paymentDate >= sevenDaysAgo;
        });

        recentPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(recentPayments);
        setLoading(false);
      } catch (err) {
        console.error("Error Fetching Payments:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading payments...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="gradient-background">
      <div style={{ flex: "0 0 auto", backgroundColor: "#343a40" }}>
        <AdminPanel />
      </div>
      <div className="table-container">
        <h1>Recent Payments</h1>
        {orders.length === 0 ? (
          <p className="text-center">No payments found for the last 7 days.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Date</th>
                <th>User ID</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.amount ? `${order.amount} Rs` : "N/A"}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.user?._id || "Not Available"}</td>
                  <td>{order.user?.email || "Not Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllPayments;
