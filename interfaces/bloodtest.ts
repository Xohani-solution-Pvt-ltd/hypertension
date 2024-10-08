export interface BloodTestInterface {
  hbA1cLevel: Number;
  normalHbA1cLevel: Number;
  hBA1CInterpretation: String;
  totalCholesterol: Number;
  normalTotalCholesterol: Number;
  lipidInterpretation: String;
  hdlCholesterol: Number;
  normalHdlCholesterol: Number;
  hdlInterpretation: String;
  ldlCholesterol: Number;
  normalLdlCholesterol: Number;
  ldlInterpretation: String;
  triglycerides: Number;
  normalTriglycerides: Number;
  triglyceridesInterpretation: String;
  albumin: Number;
  creatinine: Number;
  acrResult: String;
  sodium: Number;
  potassium: Number;
  uricAcid: Number;
  kidneyInterpretation: String;
  tshLevel: Number;
  normalTshLevel: Number;
  tshInterpretation: String;
  renalArteryDoppler: String;
  coronaryArteryDisease: String;
  ejectionFraction: Number;
  eGFRResult: Number;
  age: Number;
  ejectionInterpretation;
}

export const intialBloodTestValue: BloodTestInterface = {
  hbA1cLevel: undefined,
  normalHbA1cLevel: undefined,
  hBA1CInterpretation: undefined,
  totalCholesterol: undefined,
  normalTotalCholesterol: undefined,
  lipidInterpretation: undefined,
  hdlCholesterol: undefined,
  normalHdlCholesterol: undefined,
  hdlInterpretation: undefined,
  ldlCholesterol: undefined,
  normalLdlCholesterol: undefined,
  ldlInterpretation: undefined,
  triglycerides: undefined,
  normalTriglycerides: undefined,
  triglyceridesInterpretation: undefined,
  albumin: undefined,
  creatinine: undefined,
  acrResult: undefined,
  sodium: undefined,
  potassium: undefined,
  uricAcid: undefined,
  kidneyInterpretation: undefined,
  tshLevel: undefined,
  normalTshLevel: undefined,
  tshInterpretation: undefined,
  renalArteryDoppler: undefined,
  coronaryArteryDisease: undefined,
  ejectionFraction: undefined,
  eGFRResult: undefined,
  age: undefined,
  ejectionInterpretation: undefined,
};
