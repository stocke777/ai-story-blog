// migrations/20231231000000_add_slug_to_blogs.js

exports.up = function (knex) {
    return knex.schema.table('blogs', function (table) {
      table.string('slug').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('blogs', function (table) {
      table.dropColumn('slug');
    });
  };
  