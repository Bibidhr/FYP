import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'warden'],
    default: 'student'
  },
  kycStatus: {
    type: String,
    enum: ['pending_submission', 'pending_approval', 'approved', 'rejected'],
    default: 'pending_submission'
  },
  kycData: {
    phone: String,
    address: String,
    guardianName: String,
    guardianPhone: String,
    dob: Date,
    gender: String,
    nationality: String,
    idProofType: String, // e.g., 'Citizenship', 'Passport'
    idProofNumber: String
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
