import { models, model, Schema, SchemaTypes } from 'mongoose';

const TreatmentSchema: Schema = new Schema({
    userid: { type: SchemaTypes.ObjectId, ref: "User" , index: true,unique:true},
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: { type: String },
    height: { type: Number },
    weight: { type: Number },
    alcoholConsumption: {
        type: String,
        enum: ['None', 'Moderate', 'Heavy']
    },
    smokingStatus: {
        type: String,
        enum: ['Non-Smoker', 'Ex-Smoker', 'Current-Smoker']
    },
    physicalActivity: {
        type: String,
        enum: ['Sedentary', 'Moderate', 'Active']
    },
    
    createdAt: { type: Date, default: new Date() },
});

const TreatmentModel = models.treatment || model('treatment', TreatmentSchema);

export default TreatmentModel;




