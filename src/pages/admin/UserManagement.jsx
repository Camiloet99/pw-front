// pages/admin/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Badge,
  Spinner,
  Pagination,
} from "react-bootstrap";
import {
  getAllUsers,
  updateUserPlan,
  deactivateUser,
  getAllUsersMock,
} from "../../services/adminService";
import { toast } from "react-toastify";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { users, totalPages } = await getAllUsersMock(page, 10);
      setUsers(users);
      setTotalPages(totalPages);
    } catch (err) {
      toast.error("Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDeactivate = async (userId) => {
    try {
      await deactivateUser(userId);
      toast.success("User deactivated.");
      fetchUsers();
    } catch {
      toast.error("Failed to deactivate user.");
    }
  };

  const handlePlanChange = async (userId, newPlan) => {
    try {
      await updateUserPlan(userId, newPlan);
      toast.success("Plan updated.");
      fetchUsers();
    } catch {
      toast.error("Failed to update plan.");
    }
  };

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Management</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Badge
                      bg={
                        u.plan === "premium"
                          ? "success"
                          : u.plan === "admin"
                          ? "danger"
                          : "secondary"
                      }
                    >
                      {u.plan}
                    </Badge>
                  </td>
                  <td>{u.active ? "Active" : "Inactive"}</td>
                  <td className="d-flex gap-2 flex-wrap">
                    {u.active && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleDeactivate(u._id)}
                      >
                        Deactivate
                      </Button>
                    )}
                    {u.plan !== "free" && (
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handlePlanChange(u._id, "free")}
                      >
                        Set to Free
                      </Button>
                    )}
                    {u.plan !== "premium" && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handlePlanChange(u._id, "premium")}
                      >
                        Set to Premium
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            {renderPagination()}
          </div>
        </>
      )}
    </Container>
  );
}
