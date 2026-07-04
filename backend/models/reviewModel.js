import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  doctorId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { minimize: false });

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);

export default reviewModel;
