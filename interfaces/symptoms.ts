export interface SymptomsInterface{
    previousHeartAttacks :boolean,
    breathlessness :boolean,
    minorNYHA :boolean,
    majorNYHA :boolean,
    legSwelling:boolean
}

export const initialSymptomsValue : SymptomsInterface={
    previousHeartAttacks :undefined,
    breathlessness :undefined,
    minorNYHA :undefined,
    majorNYHA :undefined,
    legSwelling:undefined
}