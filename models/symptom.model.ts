import { models, model, Schema, SchemaTypes } from 'mongoose';

const SymptomSchema: Schema = new Schema({
  userid: { type: SchemaTypes.ObjectId, ref: "User" , index: true},
  diagnosisid: { type: SchemaTypes.ObjectId, ref: "Diagnosis" , index: true},
  cva: {
    type: Boolean,
    default: false
  },
  previousHeartAttacks: {
    type: Boolean,
    default: false
  },
  heartFailure: {
    type: Boolean,
    default: false
  },
  diabetes: {
    type: Boolean,
    default: false
  },
  pregnancy: {
    type: Boolean,
    default: false
  },
  lungDisease: {
    type: Boolean,
    default: false
  },
  coronaryArteryDisease: {
    type: Boolean,
    default: false
  },
  breathlessness: {
    type: Boolean,
    default: false
  },
  minorNYHA: {
    type: Boolean,
    default: false
  },
  majorNYHA: {
    type: Boolean,
    default: false
  },
  legSwelling: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date,default: new Date() },
});

const SymptomModel = models.Symptom || model('Symptom', SymptomSchema);

export default SymptomModel