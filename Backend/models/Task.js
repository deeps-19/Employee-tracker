import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Done"],
      default: "Pending"
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    dueDate: { type: Date },

    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
