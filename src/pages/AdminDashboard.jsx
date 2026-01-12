import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [stats, setStats] = useState({
    students: 0,
    wardens: 0,
    rooms: 50,
    issues: 0
  });

  const [activities, setActivities] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [token]);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats/activities', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, [token]);

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
        </div>

        {/* OVERVIEW STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students-icon">👥</div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p className="stat-number">{stats.students}</p>
              <span className="stat-change positive">+5% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon wardens-icon">🛡️</div>
            <div className="stat-info">
              <h3>Total Wardens</h3>
              <p className="stat-number">{stats.wardens}</p>
              <span className="stat-change">Active in {Math.ceil(stats.wardens / 2)} Blocks</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon rooms-icon">🛏️</div>
            <div className="stat-info">
              <h3>Available Rooms</h3>
              <p className="stat-number">{stats.rooms}</p>
              <span className="stat-change negative">Good availability</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon alerts-icon">⚠️</div>
            <div className="stat-info">
              <h3>Pending Issues</h3>
              <p className="stat-number">{stats.issues}</p>
              <span className="stat-change alert">
                {stats.issues === 0 ? 'All clear!' : 'Requires attention'}
              </span>
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

              <div className="action-card" style={{ opacity: 0.5, cursor: 'not-allowed' }} onClick={(e) => e.preventDefault()}>
                <div className="action-icon">👮</div>
                <h3>Manage Wardens</h3>
                <p>Coming soon - Assign wardens to blocks</p>
                <div className="action-arrow">🔒</div>
              </div>

              <div className="action-card" style={{ opacity: 0.5, cursor: 'not-allowed' }} onClick={(e) => e.preventDefault()}>
                <div className="action-icon">🏨</div>
                <h3>Manage Rooms</h3>
                <p>Coming soon - Allocate rooms and track availability</p>
                <div className="action-arrow">🔒</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RECENT ACTIVITY */}
          <div className="sidebar-section">
            <div className="activity-card">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <p>{activity.text}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    No recent activity
                  </div>
                )}
              </div>
              {activities.length > 0 && (
                <button className="view-all-btn">View All Activity</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
