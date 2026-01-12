import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import ConfirmModal from '../../components/ConfirmModal';
import { useToast } from '../../context/ToastContext';
import './ManageStudents.css';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isDangerous: false
    });

    const { success, error } = useToast();

    const { user } = useAuth();
    const token = user?.token;

    // Fetch Students
    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users?role=student', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            // Artificial Delay for UX
            await new Promise(resolve => setTimeout(resolve, 800));
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete Student
    const handleDeleteClick = (id) => {
        console.log('Delete clicked for:', id);
        setConfirmModal({
            isOpen: true,
            title: 'Delete Student',
            message: 'Are you sure you want to remove this student? This action cannot be undone.',
            isDangerous: true,
            confirmText: 'Delete',
            onConfirm: () => handleDelete(id)
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setStudents(students.filter(student => student._id !== id));
                success('Student removed successfully');
            } else {
                error('Failed to remove student');
            }
        } catch (err) {
            console.error('Error deleting student:', err);
            error('Error deleting student');
        } finally {
            setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
    };

    // Approve/Reject KYC
    const handleKYCStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:5000/api/kyc/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                // Update local state
                setStudents(students.map(student =>
                    student._id === id ? { ...student, kycStatus: status } : student
                ));
                success(`Student KYC ${status}`);
            } else {
                error('Failed to update status');
            }
        } catch (err) {
            console.error('Error updating KYC status:', err);
            error('Something went wrong');
        }
    };

    // Add Student
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Artificial Delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, role: 'student' })
            });

            if (response.ok) {
                const newUser = await response.json();
                setStudents([newUser, ...students]);
                setShowModal(false);
                setFormData({ name: '', email: '', password: '' });
                setFormData({ name: '', email: '', password: '' });
                success('Student added successfully!');
            } else {
                const errorData = await response.json();
                error(errorData.message || 'Failed to add student');
            }
        } catch (err) {
            console.error('Error adding student:', err);
            error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="admin-page">
            <Header />
            <div className="admin-container">
                <BackButton label="Back to Dashboard" />
                <div className="page-header">
                    <h1>Manage Students</h1>
                    <button className="add-btn" onClick={() => setShowModal(true)}>+ Add New Student</button>
                </div>

                <div className="table-container">
                    {loading ? (
                        <div className="loading-container">Loading students...</div>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Join Date</th>
                                    <th>Status</th>
                                    <th>KYC Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length > 0 ? (
                                    students.map((student) => (
                                        <tr key={student._id}>
                                            <td>
                                                <strong>{student.name}</strong>
                                            </td>
                                            <td>{student.email}</td>
                                            <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className="status-badge active">Active</span>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${student.kycStatus === 'approved' ? 'active' : 'pending'}`}>
                                                    {student.kycStatus || 'pending_submission'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {student.kycStatus === 'pending_approval' && (
                                                        <>
                                                            <button
                                                                className="action-btn approve"
                                                                onClick={() => handleKYCStatus(student._id, 'approved')}
                                                                title="Approve KYC"
                                                            >
                                                                ✅
                                                            </button>
                                                            <button
                                                                className="action-btn reject"
                                                                onClick={() => handleKYCStatus(student._id, 'rejected')}
                                                                title="Reject KYC"
                                                            >
                                                                ❌
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => handleDeleteClick(student._id)}
                                                        title="Delete User"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                            No students found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* ADD STUDENT MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add New Student</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Min. 6 characters"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="save-btn" disabled={submitting}>
                                    {submitting ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                isDangerous={confirmModal.isDangerous}
                confirmText={confirmModal.confirmText}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};

export default ManageStudents;
