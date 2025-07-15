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
import PageTransition from "../../components/PageTransition";

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
      <h2 className="mb-4 text-center fw-semibold">User Management</h2>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <PageTransition>
          <div className="table-responsive shadow-sm">
            <Table
              bordered
              hover
              responsive
              striped
              className="mb-0 text-center align-middle"
            >
              <thead className="table-light">
                <tr className="text-center">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="text-center">
                    <td>{u.name}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <Badge
                        bg={
                          u.plan === "premium"
                            ? "success"
                            : u.plan === "admin"
                            ? "danger"
                            : "secondary"
                        }
                        className="text-uppercase px-3 py-1"
                      >
                        {u.plan}
                      </Badge>
                    </td>
                    <td>
                      <span
                        className={
                          u.active
                            ? "text-success fw-medium"
                            : "text-danger fw-medium"
                        }
                      >
                        {u.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {u.active && (
                          <Button
                            variant="outline-warning"
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
                            Set Free
                          </Button>
                        )}
                        {u.plan !== "premium" && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handlePlanChange(u._id, "premium")}
                          >
                            Set Premium
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center mt-4 mb-4">
            {renderPagination()}
          </div>
        </PageTransition>
      )}
    </Container>
  );
}
