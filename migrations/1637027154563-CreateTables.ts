import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1637027154563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "viewers" (
                "id" INT unsigned NOT NULL AUTO_INCREMENT,
                "name" VARCHAR(25) NOT NULL,
                "points" INT unsigned NOT NULL DEFAULT '0',
                "created_at" DATE NOT NULL DEFAULT 'NOW()',
                PRIMARY KEY ("id")
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "tokens" (
                "id" INT unsigned NOT NULL AUTO_INCREMENT,
                "service" ENUM NOT NULL DEFAULT 'TWITCH',
                "token" VARCHAR(256) NOT NULL DEFAULT '0',
                "expiration" INT unsigned NOT NULL,
                "created_at" DATE NOT NULL DEFAULT 'NOW()',
                PRIMARY KEY ("id")
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
