import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/adminOrderService";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    loadOrders();
  }, [page]);

  const loadOrders = async () => {
    try {
      const response = await getOrders(page, pageSize);
      setOrders(response.data.data.items);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Status updated.");
      loadOrders();
    } catch (error) {
      console.log(error);
      toast.error("Unable to update order status.");
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

  const getBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";

      case "Processing":
        return "bg-primary";

      case "Done":
        return "bg-success";

      case "Cancelled":
        return "bg-danger";

      default:
        return "bg-secondary";
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
                <span className={`badge ${getBadgeClass(order.orderStatus)}`}>
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

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Orders;
