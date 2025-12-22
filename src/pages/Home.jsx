import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-tag">Hostel Management System</div>
            <h1 className="hero-title">
              Simplify operations.<br />
              Elevate experiences.<br />
              Manage your hostel.
            </h1>
            <p className="hero-description">
              HostelHub is a modern management platform trusted by hostels
              to streamline operations. Automate administrative tasks,
              enhance student experiences, and improve efficiency – all
              from one intuitive platform.
            </p>
            <Link to="/register" className="hero-cta">
              Get Started
            </Link>
          </div>

          <div className="hero-image">
            <div className="hostel-card">
              <img
                src="hostel_image.jpg"
                alt="Modern Student Hostel"
                className="hostel-image"
              />
             
              
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2 className="features-title">What HostelHub can do for you</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Room Management</h3>
              <p>Efficiently manage room allocations, availability, and student assignments</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Student Portal</h3>
              <p>Students can view their room details, submit requests, and track status</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Get insights into occupancy rates, maintenance requests, and more</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Notifications</h3>
              <p>Keep students and staff informed with automated notifications</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Fee Management</h3>
              <p>Track hostel fees, payments, and generate financial reports</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Access</h3>
              <p>Role-based access control for students, wardens, and administrators</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
