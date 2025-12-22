import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p className="user-role">Role: {user?.role}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>Total Rooms</h3>
              <p className="stat-value">150</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p className="stat-value">420</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Occupied Rooms</h3>
              <p className="stat-value">142</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔓</div>
            <div className="stat-info">
              <h3>Available Rooms</h3>
              <p className="stat-value">8</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-details">
                  <p className="activity-title">New Room Request</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🔧</div>
                <div className="activity-details">
                  <p className="activity-title">Maintenance Request Completed</p>
                  <p className="activity-time">5 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">👤</div>
                <div className="activity-details">
                  <p className="activity-title">New Student Registered</p>
                  <p className="activity-time">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2>Quick Actions</h2>
            <div className="actions-list">
              <button className="action-btn">
                <span>🏠</span>
                View Rooms
              </button>
              <button className="action-btn">
                <span>👥</span>
                Manage Students
              </button>
              <button className="action-btn">
                <span>📊</span>
                View Reports
              </button>
              <button className="action-btn">
                <span>⚙️</span>
                Settings
              </button>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>Your Account Information</h3>
            <div className="info-details">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{user?.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Role:</span>
                <span className="info-value">{user?.role}</span>
              </div>
              <div className="info-row">
                <span className="info-label">User ID:</span>
                <span className="info-value">{user?._id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
