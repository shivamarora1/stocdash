export class CreateIpoDto {
  name: string;
  price: number;
  gmp: number;
  lotPrice: number;
  lotSize: number;
  suggestion: string;
  review: string;
  openDate: Date;
  closeDate: Date;
  listingDate: Date;
  basisOfAllotment: Date;
  minimumInvestment: number;
  issuePrice: number;
  issueSize: number;
  faceValue: number;
  totalShareOffered: number;
  offeredToPublic: number;
  sector: string;
  subSector: string;
  issueType: string;
}
