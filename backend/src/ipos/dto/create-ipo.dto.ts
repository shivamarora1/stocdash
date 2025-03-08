export type IpoSuggestion = 'apply' | 'avoid' | 'may apply';
export class CreateIpoDto {
  name?: string;
  symbol: string;
  price?: number;
  lotPrice?: number;
  openDate?: Date;
  closeDate?: Date;
  lotSize?: number;
  minimumInvestment?: number;
  faceValue?: number;
  gmp?: number;
  suggestion?: IpoSuggestion;
  review?: string;
  listingDate?: Date;
  basisOfAllotment?: Date;
}
