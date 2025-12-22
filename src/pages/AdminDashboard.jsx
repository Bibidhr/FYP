import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Header />

      <div className="dashboard-container">
        {/* TOP BAR */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* WELCOME */}
        <div className="dashboard-card">
          <h2>Welcome, {user?.name || "Admin"} 👋</h2>
          <p>You have full access to the Hostel Management System.</p>
        </div>

        {/* STATS */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Students</h3>
            <p className="dashboard-number">120</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Wardens</h3>
            <p className="dashboard-number">8</p>
          </div>

          <div className="dashboard-card">
            <h3>Available Rooms</h3>
            <p className="dashboard-number">35</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Manage Students</h3>
            <p>Add, update, or remove students.</p>
            <button>Go</button>
          </div>

          <div className="dashboard-card">
            <h3>Manage Wardens</h3>
            <p>Assign wardens to hostels.</p>
            <button>Go</button>
          </div>

          <div className="dashboard-card">
            <h3>Manage Rooms</h3>
            <p>Room allocation and availability.</p>
            <button>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
