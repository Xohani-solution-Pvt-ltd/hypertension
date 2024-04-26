import { models, model, Schema, SchemaTypes } from "mongoose";

const ContraindicationSchema: Schema = new Schema({
  userid: { type: SchemaTypes.ObjectId, ref: "User", index: true },
  createdAt: { type: Date, default: new Date() },
});

const ContraindicationModel =
  models.Contraindication || model("Contraindication", ContraindicationSchema);

export default ContraindicationModel;
