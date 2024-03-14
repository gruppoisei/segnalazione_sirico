export interface Contratto {
    AnpeNome: string | null;
    AnpeCognome: string | null;
    AnsoSocietaid: string | null;
    CodiDatainiziocontratto: string | null;
    CodiDatafinecontratto: string | null;
    CotcTipocontrattoid: number | null;
    CoccCcnlid: number;
    ColiLivelloid: number | null;
    AnruRuoloid: string | null;
    CodiRalcompenso: number | null;
    costopresuntoannuo: number | null;     // lo includiamo, ma non lo passiamo
    costopresuntogiorno: number | null;    // lo includiamo, ma non lo passiamo
    CodsValoredistacco: number | null;     // percentuale
    CodsDatainiziodistacco: string | null;
    CodsDatafinedistacco: string | null;
    CodiNote: string | null
  }