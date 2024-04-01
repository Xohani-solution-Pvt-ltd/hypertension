import { models, model, Schema, SchemaTypes } from "mongoose";

const eGFRSchema: Schema = new Schema({
  userid: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    index: true,
    unique: true,
  },

  creatinine: {
    type: Number,
    required: true,
  },

  eGFRResult: {
    type: Number,
    // default: false
  },
  age: {
    type: Number,
    // default: false
  },

  createdAt: { type: Date, default: new Date() },
});

const eGFRModel = models.eGFR || model("eGFR", eGFRSchema);

export default eGFRModel;
