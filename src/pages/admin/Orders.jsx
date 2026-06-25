import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/adminOrderService";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      alert("Status updated.");
      loadOrders();
    } catch (error) {
      console.log(error);
      alert("Unable to update order status.");
    }
  };

  const getAvailableStatuses = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
        return ["Pending", "Processing", "Cancelled"];

      case "Processing":
        return ["Processing", "Done", "Cancelled"];

      case "Done":
        return ["Done"];

      case "Cancelled":
        return ["Cancelled"];

      default:
        return [];
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Orders</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Order No</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update Status</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNo}</td>

              <td>{order.userName}</td>

              <td>₹ {order.orderTotal}</td>

              <td>
                <span
                  className={
                    order.orderStatus === "Pending"
                      ? "badge bg-warning text-dark"
                      : order.orderStatus === "Processing"
                        ? "badge bg-info"
                        : order.orderStatus === "Delivered"
                          ? "badge bg-success"
                          : order.orderStatus === "Cancelled"
                            ? "badge bg-danger"
                            : "badge bg-secondary"
                  }
                >
                  {order.orderStatus}
                </span>
              </td>

              <td>
                <select
                  className="form-select"
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {getAvailableStatuses(order.orderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <Link
                  to={`/admin/orders/${order.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Orders;
