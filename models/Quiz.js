import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },

  a: Number,
  b: Number,
  operator: String,
mul:Number,
skip:Number,


  answer:  Number,
answerString:String,
 answerStringArr: mongoose.Schema.Types.Mixed,
// answerStringArr: [
//   {
//     type: Map,
//     of: String
//   }
// ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 9000, // ⏰ auto delete after 150 minutes
  },
});

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
