import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activityLog = [
    { id: 1, text: "New student registration request: Sarah J.", time: "2 mins ago", type: "info" },
    { id: 2, text: "Room 102 reported maintenance issue", time: "1 hour ago", type: "alert" },
    { id: 3, text: "Warden Mike updated Block A status", time: "3 hours ago", type: "success" },
    { id: 4, text: "Monthly fee generation completed", time: "Yesterday", type: "info" },
  ];

  return (
    <div className="admin-page">
      <Header />

      <div className="dashboard-container">
        {/* TOP BAR */}
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="welcome-text">Welcome back, {user?.name || "Admin"}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* OVERVIEW STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students-icon">👥</div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p className="stat-number">120</p>
              <span className="stat-change positive">+5% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon wardens-icon">🛡️</div>
            <div className="stat-info">
              <h3>Total Wardens</h3>
              <p className="stat-number">8</p>
              <span className="stat-change">Active in 4 Blocks</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rooms-icon">🛏️</div>
            <div className="stat-info">
              <h3>Available Rooms</h3>
              <p className="stat-number">35</p>
              <span className="stat-change negative">Low availability</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon alerts-icon">⚠️</div>
            <div className="stat-info">
              <h3>Pending Issues</h3>
              <p className="stat-number">3</p>
              <span className="stat-change alert">Requires attention</span>
            </div>
          </div>
        </div>

        <div className="dashboard-content-grid">
          {/* LEFT COLUMN: ACTIONS */}
          <div className="main-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <div className="action-card" onClick={() => navigate('/admin/students')}>
                <div className="action-icon">🎓</div>
                <h3>Manage Students</h3>
                <p>Add, update, or remove student records</p>
                <div className="action-arrow">→</div>
              </div>

              <div className="action-card" onClick={() => navigate('/admin/wardens')}>
                <div className="action-icon">👮</div>
                <h3>Manage Wardens</h3>
                <p>Assign wardens to specific hostel blocks</p>
                <div className="action-arrow">→</div>
              </div>

              <div className="action-card" onClick={() => navigate('/admin/rooms')}>
                <div className="action-icon">🏨</div>
                <h3>Manage Rooms</h3>
                <p>Allocate rooms and track availability</p>
                <div className="action-arrow">→</div>
              </div>

              <div className="action-card secondary" onClick={() => navigate('/admin/settings')}>
                <div className="action-icon">⚙️</div>
                <h3>System Settings</h3>
                <p>Global configurations and logs</p>
                <div className="action-arrow">→</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RECENT ACTIVITY */}
          <div className="sidebar-section">
            <div className="activity-card">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {activityLog.map((log) => (
                  <div key={log.id} className={`activity-item ${log.type}`}>
                    <div className="activity-dot"></div>
                    <div className="activity-details">
                      <p className="activity-text">{log.text}</p>
                      <span className="activity-time">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-btn">View All History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
