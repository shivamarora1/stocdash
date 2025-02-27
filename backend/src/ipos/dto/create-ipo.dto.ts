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
  suggestion?: string;
  review?: string;
  listingDate?: Date;
  basisOfAllotment?: Date;
}
