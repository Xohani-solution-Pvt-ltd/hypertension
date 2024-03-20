export interface SymptomsInterface {
  previousHeartAttacks: boolean;
  breathlessness: {
    minorNYHA: boolean;
    majorNYHA: boolean;
  };

  legSwelling: boolean;
}

export const initialSymptomsValue: SymptomsInterface = {
  previousHeartAttacks: false,
  breathlessness: { 
    minorNYHA: false, 
    majorNYHA: false },

  legSwelling: false,
};
