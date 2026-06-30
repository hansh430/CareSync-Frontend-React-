import { useEffect, useState } from "react";
import { addFund, getUsers } from "../../services/adminUserService";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFund = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter Valid amount");
      return;
    }
    try {
      await addFund(selectedUser.id, Number(amount));
      toast.success("Fund added successfully. ");
      setAmount("");
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      console.log(error);
      toast.error("Unable to add fund.");
    }
  };

    return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>User Management</h2>

        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          style={{ width: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Wallet</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (
            <tr key={user.id}>

              <td>{user.id}</td>

              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td>₹ {user.fund ?? 0}</td>

              <td>
                {user.status === 1 ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>

              <td>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => setSelectedUser(user)}
                >
                  Add Fund
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {selectedUser && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">

                <h5>Add Fund</h5>

                <button
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                />

              </div>

              <div className="modal-body">

                <p>
                  User :
                  <strong>
                    {" "}
                    {selectedUser.firstName} {selectedUser.lastName}
                  </strong>
                </p>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleAddFund}
                >
                  Add
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
export default Users;
