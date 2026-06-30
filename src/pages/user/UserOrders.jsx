import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/OrderService";
import { Link } from "react-router-dom";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [page]);

  const loadOrders = async () => {
    try {
      const response = await getMyOrders(page, pageSize);
      setOrders(response.data.data.items);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load orders.");
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">No orders found.</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNo}</td>

                <td>₹{order.orderTotal}</td>

                <td>
                  <span className={`badge ${getBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/my-orders/${order.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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

export default UserOrders;
