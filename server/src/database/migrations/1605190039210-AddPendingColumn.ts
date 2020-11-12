import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPendingColumn1605190039210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orphanages",
      new TableColumn({
        name: "pending",
        type: "boolean",
        isNullable: true,
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orphanages", "pending");
  }
}
