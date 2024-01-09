// YYYYMMDD_add_title_and_prompt_to_images.js
exports.up = function (knex) {
    return knex.schema.alterTable('images', function (table) {
      table.string('title').notNullable();
      table.string('prompt');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('images', function (table) {
      table.dropColumn('title');
      table.dropColumn('prompt');
    });
  };
  