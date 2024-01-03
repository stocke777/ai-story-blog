// migrations/create_tags.js
exports.up = function (knex) {
    return knex.schema.createTable('tags', function (table) {
      table.increments('tagid').primary();
      table.string('name').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tags');
  };
  