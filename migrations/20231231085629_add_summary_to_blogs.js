// migrations/20231231000001_add_summary_to_blogs.js

exports.up = function (knex) {
    return knex.schema.table('blogs', function (table) {
      table.text('summary').defaultTo('');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('blogs', function (table) {
      table.dropColumn('summary');
    });
  };
  