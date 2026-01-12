import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.kycStatus === 'pending_submission') {
            navigate('/student/kyc');
        }
    }, [user, navigate]);

    if (!user) return <div>Loading...</div>;

    if (user.kycStatus === 'pending_submission') {
        return (
            <div className="dashboard-loading">
                <p>Redirecting to KYC Form...</p>
            </div>
        );
    }

    if (user.kycStatus === 'pending_approval') {
        return (
            <div className="student-dashboard">
                <Header />
                <div className="status-container">
                    <div className="status-card pending">
                        <div className="icon">⏳</div>
                        <h2>Verification Pending</h2>
                        <p>Your details have been submitted and are waiting for admin approval.</p>
                        <p>Please check back later.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (user.kycStatus === 'rejected') {
        return (
            <div className="student-dashboard">
                <Header />
                <div className="status-container">
                    <div className="status-card rejected">
                        <div className="icon">❌</div>
                        <h2>Verification Failed</h2>
                        <p>Your KYC application was rejected.</p>
                        <p>Please contact the admin for more details or submit again.</p>
                        <Link to="/student/kyc" className="retry-btn">Resubmit KYC</Link>
                    </div>
                </div>
            </div>
        );
    }

    // APPROVED - SHOW FULL DASHBOARD
    return (
        <div className="student-dashboard">
            <Header />
            <div className="dashboard-container">
                <div className="welcome-banner">
                    <h1>Welcome, {user.name}</h1>
                    <span className="badge-active">Verified Student</span>
                </div>

                <div className="grid-container">
                    {/* ROOM STATUS */}
                    <div className="dashboard-card room-card">
                        <h3>My Room</h3>
                        <div className="card-content">
                            <div className="room-number">101-A</div>
                            <div className="room-details">
                                <p>Hostel Block A</p>
                                <p>Status: Occupied</p>
                            </div>
                        </div>
                    </div>

                    {/* MESS STATUS */}
                    <div className="dashboard-card mess-card">
                        <h3>Mess Status</h3>
                        <div className="card-content">
                            <div className="mess-status active">Active</div>
                            <p>Next Meal: Dinner (7:00 PM)</p>
                        </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="dashboard-card actions-card">
                        <h3>Quick Actions</h3>
                        <div className="buttons-grid">
                            <button className="action-btn">Request Leave</button>
                            <button className="action-btn">Report Complaint</button>
                            <button className="action-btn">View Fee Receipt</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
