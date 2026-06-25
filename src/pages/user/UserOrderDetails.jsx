import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserOrderDetails } from "../../services/OrderService";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function UserOrderDetails() {
  const { id } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getUserOrderDetails(id);
      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order Items</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Medicine</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.medicineId}>
              <td>
                <img src={`${SERVER_URL}${item.imageUrl}`} alt="" width="60" />
              </td>

              <td>{item.medicineName}</td>

              <td>₹{item.unitPrice}</td>

              <td>{item.quantity}</td>

              <td>₹{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserOrderDetails;
