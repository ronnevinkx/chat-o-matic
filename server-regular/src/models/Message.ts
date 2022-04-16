import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			trim: true,
			minlength: 1
		},
		createdBy: {
			type: String,
			required: true,
			trim: true,
			minlength: 1
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.models.Message ||
	mongoose.model('Message', messageSchema);
