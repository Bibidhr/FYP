import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import { useToast } from '../../context/ToastContext';
import './KYCForm.css';

const KYCForm = () => {
    const { user } = useAuth();
    const token = user?.token;
    const { success, error } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        guardianName: '',
        guardianPhone: '',
        dob: '',
        gender: '',
        nationality: '',
        idProofType: 'Citizenship',
        idProofNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Artificial Delay for UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await fetch('http://localhost:5000/api/kyc/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                success('KYC Submitted Successfully! Please wait for admin approval.');
                // Redirect back to student dashboard which should now show "Pending" state
                navigate('/student');
            } else {
                error(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error('KYC Error:', err);
            error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="kyc-page">
            <Header />
            <div className="kyc-container">
                <div className="kyc-card">
                    <h2>Complete Your Profile (KYC)</h2>
                    <p className="kyc-subtitle">Please provide accurate details to access the hostel dashboard.</p>

                    <form onSubmit={handleSubmit} className="kyc-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name="dob" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Permanent Address</label>
                            <textarea name="address" rows="2" required onChange={handleChange}></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" required onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nationality</label>
                                <input type="text" name="nationality" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="section-title">Guardian Details</div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Guardian Name</label>
                                <input type="text" name="guardianName" required onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Guardian Phone</label>
                                <input type="tel" name="guardianPhone" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="section-title">Identity Proof</div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>ID Type</label>
                                <select name="idProofType" onChange={handleChange}>
                                    <option value="Citizenship">Citizenship</option>
                                    <option value="Passport">Passport</option>
                                    <option value="License">Driving License</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>ID Number</label>
                                <input type="text" name="idProofNumber" required onChange={handleChange} />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Verification'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default KYCForm;
