// migrations/create_tags_posts.js
exports.up = function (knex) {
    return knex.schema.createTable('tags_blogs', function (table) {
      table.integer('tagid').unsigned().references('tagid').inTable('tags');
      table.integer('id').unsigned().references('id').inTable('blogs');
      table.primary(['tagid', 'id']);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tags_blogs');
  };
  