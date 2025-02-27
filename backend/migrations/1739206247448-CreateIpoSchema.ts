import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIpoSchema1739206247448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ipo(
    name varchar,
    symbol varchar PRIMARY KEY,
    price float,
    lot_Size float,
    open_Date timestamp,
    close_Date timestamp,
    lot_Price float,
    minimum_Investment float,
    face_Value float,    
    gmp float,
    suggestion varchar,
    review varchar,
    listing_Date timestamp,
    basis_Of_Allotment timestamp
)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "ipo"`);
  }
}