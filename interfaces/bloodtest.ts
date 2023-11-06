export interface BloodTestInterface {
    hbA1cLevel: Number,
    hBA1CInterpretation: String,
    totalCholesterol: Number,
    lipidInterpretation: String,
    hdlCholesterol: Number,
    hdlInterpretation: String,
    ldlCholesterol: Number,
    ldlInterpretation: String,
    triglycerides: Number,
    triglyceridesInterpretation: String,
    albumin: Number,
    creatinine: Number,
    age: String,
    gender: String,
    weight: Number,
    acrResult: String,
    sodium: Number,
    potassium: Number,
    uricAcid: Number,
    kidneyInterpretation: String,
    tshLevel: Number,
    tshInterpretation: String,
    renalArteryDoppler: String,
    coronaryArteryDisease: String,
    ejectionFraction: Number
}

export const intialBloodTestValue: BloodTestInterface = {
    hbA1cLevel: undefined,
    hBA1CInterpretation: undefined,
    totalCholesterol: undefined,
    lipidInterpretation: undefined,
    hdlCholesterol: undefined,
    hdlInterpretation: undefined,
    ldlCholesterol: undefined,
    ldlInterpretation: undefined,
    triglycerides: undefined,
    triglyceridesInterpretation: undefined,
    albumin: undefined,
    creatinine: undefined,
    age: undefined,
    gender: undefined,
    weight: undefined,
    acrResult: undefined,
    sodium: undefined,
    potassium: undefined,
    uricAcid: undefined,
    kidneyInterpretation: undefined,
    tshLevel: undefined,
    tshInterpretation: undefined,
    renalArteryDoppler: undefined,
    coronaryArteryDisease: undefined,
    ejectionFraction: undefined
}




