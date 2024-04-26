export interface ComorbiditiesInterface {
  cva: {
    paralysis: boolean;
    slurringOfSpeech: boolean;
    blurringOfVision: boolean;
  };
  coronaryArteryDisease: boolean;
  heartFailure: boolean;
  diabetes: boolean;
  pregnancy: boolean;
  lungDisease: boolean;
}
export const initialComorbiditiesValues: ComorbiditiesInterface = {
  cva: {
    paralysis: false,
    slurringOfSpeech: false,
    blurringOfVision: false,
  },
  coronaryArteryDisease: false,
  heartFailure: false,
  diabetes: false,
  pregnancy: false,
  lungDisease: false,
};
