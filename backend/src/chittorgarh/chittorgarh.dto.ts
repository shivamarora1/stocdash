import { IpoSuggestion } from 'src/ipos/dto/create-ipo.dto';

export interface IpoStatus {
  name: string;
  url: string;
  status: string;
}

export interface IpoDetail {
  openDate: Date;
  closeDate: Date;
  tentative_allotment: Date;
  initiationOfRefunds: Date;
  creditOfSharesToDemat: Date;
  tentativeListingDate: Date;
  suggestion: IpoSuggestion;
  review: string;
  gmpUrl: string;
}

export interface IpoDetailsWithGmp extends IpoDetail {
  gmp: number;
  name: string;
}
