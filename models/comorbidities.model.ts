import { models, model, Schema, SchemaTypes } from "mongoose";

const ComorbiditiesSchema: Schema = new Schema({
  userid: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    index: true,
    unique: true,
  },
  cva: {
    paralysis: {
      type: Boolean,
      default: false,
    },
    slurringOfSpeech: {
      type: Boolean,
      default: false,
    },
    blurringOfVision: {
      type: Boolean,
      default: false,
    },
  },

  heartFailure: {
    type: Boolean,
    default: false,
  },
  diabetes: {
    type: Boolean,
    default: false,
  },
  pregnancy: {
    type: Boolean,
    default: false,
  },
  lungDisease: {
    type: Boolean,
    default: false,
  },
  coronaryArteryDisease: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: new Date() },
});

const ComorbiditiesModel =
  models.Comorbidities || model("Comorbidities", ComorbiditiesSchema);

export default ComorbiditiesModel;
