import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPhoneNumberColumn1605618338639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orphanages",
      new TableColumn({
        name: "phone_number",
        type: "string",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
