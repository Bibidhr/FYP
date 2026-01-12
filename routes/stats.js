import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'student' });
        const wardenCount = await User.countDocuments({ role: 'warden' });

        res.json({
            students: studentCount,
            wardens: wardenCount,
            rooms: 50, // Placeholder until Room model exists
            issues: 0  // Placeholder until Complaint model exists
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get recent activities
// @route   GET /api/stats/activities
// @access  Private/Admin
router.get('/activities', protect, async (req, res) => {
    try {
        // Get recent user registrations (last 10)
        const recentUsers = await User.find()
            .select('name email role createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        // Format activities
        const activities = recentUsers.map(user => {
            const timeAgo = getTimeAgo(user.createdAt);
            return {
                id: user._id,
                text: `New ${user.role} registration: ${user.name}`,
                time: timeAgo,
                type: 'info'
            };
        });

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Helper function to calculate time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
}

export default router;
