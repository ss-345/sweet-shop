import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

sweetSchema.virtual("id").get(function getId() {
  return this._id.toHexString();
});
sweetSchema.set("toJSON", { virtuals: true });

const Sweet = mongoose.model("Sweet", sweetSchema);
export default Sweet;
