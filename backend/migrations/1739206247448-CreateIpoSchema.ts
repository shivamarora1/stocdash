import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIpoSchema1739206247448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ipo(
    id serial,		
    name varchar,
    price float,
    gmp float,
    lot_Price float,
    lot_Size float,
    suggestion varchar,
    review varchar,
    open_Date timestamp,
    close_Date timestamp,
    listing_Date timestamp,
    basis_Of_Allotment timestamp,
    minimum_Investment float,
    face_Value float,
    total_Share_Offered float,
    offered_To_Public float,
    sector varchar,
    sub_Sector varchar,
    issue_Type varchar,
    symbol varchar
)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "ipo"`);
  }
}