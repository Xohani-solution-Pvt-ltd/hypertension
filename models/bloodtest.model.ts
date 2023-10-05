import { models, model, Schema, SchemaTypes } from 'mongoose';

const BloodTestSchema: Schema = new Schema({
    userid: { type: SchemaTypes.ObjectId, ref: "User", index: true },
    diagnosisid: { type: SchemaTypes.ObjectId, ref: "Diagnosis" , index: true},
    hbA1cLevel: {
        type: Number,
        required: true
    },
    normalHbA1c: {
        type: Number,
        required: true
    },
    hBA1CInterpretation: {
        type: String,
        required: true
    },
    totalCholesterol: {
        type: Number,
        required: true
    },
    lipidNormal: {
        type: Number,
        required: true
    },
    lipidInterpretation: {
        type: String,
        required: true
    },
    hdlCholesterol: {
        type: Number,
        required: true
    },
    hdlNormal: {
        type: Number,
        required: true
    },
    hdlInterpretation: {
        type: String,
        required: true
    },
    lcdCholesterol: {
        type: Number,
        required: true
    },
    lcdNormal: {
        type: Number,
        required: true
    },
    lcdInterpretation: {
        type: String,
        required: true
    },
    triglycerides: {
        type: Number,
        required: true
    },
    triglyceridesNormal: {
        type: Number,
        required: true
    },
    triglyceridesInterpretation: {
        type: String,
        required: true
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
        type: Boolean,
        default: false
    },
    eGFRResult: {
        type: Boolean,
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
        required: true
    },
    tshLevel: {
        type: Number,
        required: true
    },
    tshRange: {
        type: Number,
        required: true
    },
    tshInterpretation: {
        type: String,
        required: true
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
        required: true
    },
    hfrEF: {
        type: Number,
        required: true
    },
    hfpeEF: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: new Date() },
});

const BloodTestModel = models.BloodTest || model('BloodTest', BloodTestSchema);

export default BloodTestModel