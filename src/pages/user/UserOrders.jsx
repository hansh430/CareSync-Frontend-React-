import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/OrderService";
import { Link } from "react-router-dom";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <span
                    className={`badge ${
                      order.orderStatus?.toLowerCase() === "done"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
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
    </div>
  );
}

export default UserOrders;
