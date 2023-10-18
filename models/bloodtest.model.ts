import { models, model, Schema, SchemaTypes } from 'mongoose';

const BloodTestSchema: Schema = new Schema({
    userid: { type: SchemaTypes.ObjectId, ref: "User", index: true,unique: true},
    // diagnosisid: { type: SchemaTypes.ObjectId, ref: "Diagnosis" , index: true},
    hbA1cLevel: {
        type: Number,
        required: true
    },

    hBA1CInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    totalCholesterol: {
        type: Number,
        required: true
    },
    lipidInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    hdlCholesterol: {
        type: Number,
        required: true
    },

    hdlInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    ldlCholesterol: {
        type: Number,
        required: true
    },
    ldlInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    triglycerides: {
        type: Number,
        required: true
    },
    triglyceridesInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    albumin: {
        type: Number,
        required: true
    },
    creatinine: {
        type: Number,
        required: true
    },
    acrResult: {
        type: String,
        enum: ['Yes', 'No']
    },
    eGFRResult: {
        type: Number,
        default: false
    },
    sodium: {
        type: Number,
        required: true
    },
    potassium: {
        type: Number,
        required: true
    },
    uricAcid: {
        type: Number,
        required: true
    },
    kidneyInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    tshLevel: {
        type: Number,
        required: true
    },
    tshInterpretation: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal']
    },
    renalArteryDoppler: {
        type: String,
        enum: ['None', 'Normal', 'Abnormal']
    },
    coronaryArteryDisease: {
        type: String,
        enum: ['None', 'Present', 'Absent']
    },
    ejectionFraction: {
        type: Number,
        // required: true
    },
    hfrEF: {
        type: Number,
        // required: true
    },
    hfpeEF: {
        type: Number,
        // required: true
    },
    createdAt: { type: Date, default: new Date() },
});

const BloodTestModel = models.BloodTest || model('BloodTest', BloodTestSchema);

export default BloodTestModel