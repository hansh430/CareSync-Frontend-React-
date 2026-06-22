import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../services/adminOrderService";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function OrderDetails()
{
    const{id}=useParams();
    const[order,setOrder]=useState(null);

    useEffect(()=>{
        loadOrder();
    },[]);

    const loadOrder = async () =>{
        try{
            const response = await getOrderDetails(id);
            setOrder(response.data.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    if(!order)
    {
        return <h3 className="mt-4">Loading...</h3>; 
    }

      return (
    <div className="container mt-4">
      <h2>Order Details</h2>

      <div className="card p-3 mb-4">
        <p>
          <strong>Order No:</strong> {order.orderNo}
        </p>

        <p>
          <strong>Customer:</strong> {order.userName}
        </p>

        <p>
          <strong>Status:</strong> {order.orderStatus}
        </p>

        <p>
          <strong>Total:</strong> ₹{order.orderTotal}
        </p>
      </div>

      <h4>Ordered Medicines</h4>

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
          {order.items.map((item) => (
            <tr key={item.medicineId}>
              <td>
                <img
                  src={`${SERVER_URL}${item.imageUrl}`}
                  alt={item.medicineName}
                  width="60"
                />
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
export default OrderDetails;