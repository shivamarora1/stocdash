import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ipo')
export class Ipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  gmp: number;

  @Column({ name: 'lot_price', type: 'float' })
  lotPrice: number;

  @Column({ type: 'float', name: 'lot_size' })
  lotSize: number;

  @Column({ type: 'text', nullable: true })
  suggestion: string;

  @Column({ type: 'text', nullable: true })
  review: string;

  @Column({ type: 'timestamp', name: 'open_date' })
  openDate: Date;

  @Column({ type: 'timestamp', name: 'close_date' })
  closeDate: Date;

  @Column({ type: 'timestamp', name: 'listing_date' })
  listingDate: Date;

  @Column({ name: 'basis_of_allotment', type: 'timestamp' })
  basisOfAllotment: Date;

  @Column({ name: 'minimum_investment', type: 'float' })
  minimumInvestment: number;

  @Column({ name: 'issue_price', type: 'float' })
  issuePrice: number;

  @Column({ name: 'issue_size', type: 'float' })
  issueSize: number;

  @Column({ name: 'face_value', type: 'float' })
  faceValue: number;

  @Column({ name: 'total_share_offered', type: 'float' })
  totalShareOffered: number;

  @Column({ name: 'offered_to_public', type: 'float' })
  offeredToPublic: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sector: string;

  @Column({ name: 'sub_sector', type: 'varchar', length: 255, nullable: true })
  subSector: string;

  @Column({ name: 'issue_type', type: 'varchar', length: 255, nullable: true })
  issueType: string;
}
