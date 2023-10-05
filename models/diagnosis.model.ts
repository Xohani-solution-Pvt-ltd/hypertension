import { models, model, Schema, SchemaTypes } from 'mongoose';

const DiagnosisSchema: Schema = new Schema({
    userid: { type: SchemaTypes.ObjectId, ref: "User" , index: true ,unique: true },
    systolic: {
      type: Number,
      required: true
    },
    diastolic: {
      type: Number,
      required: true
    },
    pulseRate: {
      type: Number,
      required: true
    },
    createdAt: { type: Date,default: new Date() },
});

const DiagnosisModel = models.Diagnosis || model('Diagnosis', DiagnosisSchema);

export default DiagnosisModel