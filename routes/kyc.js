
import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Submit KYC data
// @route   POST /api/kyc/submit
// @access  Private (Student only)
router.post('/submit', protect, async (req, res) => {
    try {
        const {
            phone,
            address,
            guardianName,
            guardianPhone,
            dob,
            gender,
            nationality,
            idProofType,
            idProofNumber
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update KYC Data
        user.kycData = {
            phone,
            address,
            guardianName,
            guardianPhone,
            dob,
            gender,
            nationality,
            idProofType,
            idProofNumber
        };

        user.kycStatus = 'pending_approval';

        await user.save();

        res.json({
            success: true,
            kycStatus: user.kycStatus,
            message: 'KYC submitted successfully'
        });

    } catch (error) {
        console.error('KYC Submit Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update KYC Status (Approve/Reject)
// @route   PUT /api/kyc/:id/status
// @access  Private (Admin only)
router.put('/:id/status', protect, async (req, res) => {
    try {
        // Ensure only admin can do this
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { status } = req.body; // 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.kycStatus = status;
        await user.save();

        res.json({
            success: true,
            kycStatus: user.kycStatus,
            message: `KYC ${status}`
        });

    } catch (error) {
        console.error('KYC Status Update Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
