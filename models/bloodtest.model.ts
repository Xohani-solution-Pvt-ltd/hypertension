import { models, model, Schema, SchemaTypes } from "mongoose";

const BloodTestSchema: Schema = new Schema({
  userid: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    index: true,
    unique: true,
  },
  hbA1cLevel: {
    type: Number,
    required: true,
  },
  // normalHbA1cLevel:{
  //     type : Number,
  //     required : true
  // },
  hBA1CInterpretation: {
    type: String,
    enum: ["Normal", "Abnormal"],
    required: true,
  },
  totalCholesterol: {
    type: Number,
    required: true,
  },
  // normalTotalCholesterol:{
  //     type : Number,
  //     required : true
  // },
  lipidInterpretation: {
    type: String,
    enum: ["Normal", "Abnormal"],
    required: true,
  },
  hdlCholesterol: {
    type: Number,
    required: true,
  },
  // normalHdlCholesterol:{
  //     type : Number,
  //     required : true
  // },
  hdlInterpretation: {
    type: String,
    enum: ["Normal", "Abnormal"],
    required: true,
  },
  ldlCholesterol: {
    type: Number,
    required: true,
  },
  // normalLdlCholesterol:{
  //     type : Number,
  //     required : true
  // },
  ldlInterpretation: {
    type: String,
    enum: ["Normal", "Abnormal"],
    required: true,
  },
  triglycerides: {
    type: Number,
    required: true,
  },
  // normalTriglycerides:{
  //     type : Number,
  //     required : true
  // },
  triglyceridesInterpretation: {
    type: String,
    enum: ["Normal", "Abnormal"],
    required: true,
  },
  albumin: {
    type: Number,
    required: true,
  },
  creatinine: {
    type: Number,
    required: true,
  },
  acrResult: {
    type: String,
    enum: ["Yes", "No"],
  },

  sodium: {
    type: Number,
    required: true,
  },
  potassium: {
    type: Number,
    required: true,
  },
  uricAcid: {
    type: Number,
    required: true,
  },
  kidneyInterpretation: {
    type: String,
    enum: ["Normal", "Abnormal"],
    required: true,
  },
  tshLevel: {
    type: Number,
    required: true,
  },
  // normalTshLevel:{
  //     type : Number,
  //     required : true
  // },
  tshInterpretation: {
    type: String,
    enum: ["High", "Normal", "Low"],
    // required: true
  },
  renalArteryDoppler: {
    type: String,
    enum: ["Normal", "Abnormal"],
  },
  coronaryArteryDisease: {
    type: String,
    enum: ["Present", "Absent"],
  },
  ejectionFraction: {
    type: Number,
    required: true,
  },
  ejectionInterpretation: {
    type: String,
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

const BloodTestModel = models.BloodTest || model("BloodTest", BloodTestSchema);

export default BloodTestModel;
