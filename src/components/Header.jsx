import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {user?.role === 'admin' ? (
          <span className="logo">
            <span className="logo-text">HostelHub</span>
          </span>
        ) : (
          <Link to="/" className="logo">
            <span className="logo-text">HostelHub</span>
          </Link>
        )}

        <nav className="nav">
          {user?.role !== 'admin' && (
            <Link to="/" className="nav-link">Home</Link>
          )}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle dark mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          {user ? (
            <>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
