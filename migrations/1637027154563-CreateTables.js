const {MigrationInterface, QueryRunner} = require("typeorm");

module.exports = class CreateTables1637027154563 {

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`viewers\` (
	    	\`id\` INT unsigned NOT NULL AUTO_INCREMENT,
                \`name\` VARCHAR(25) NOT NULL,
                \`points\` INT unsigned NOT NULL DEFAULT '0',
                \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE \`tokens\` (
	    	\`id\` INT unsigned NOT NULL AUTO_INCREMENT,
                \`service\` VARCHAR(256) NOT NULL DEFAULT 'TWITCH',
                \`token\` VARCHAR(256) NOT NULL DEFAULT '0',
                \`expiration\` INT unsigned NOT NULL,
                \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            );
        `)
    }

    async down(queryRunner) {}
}
