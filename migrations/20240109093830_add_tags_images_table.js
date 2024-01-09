// YYYYMMDD_add_tags_images_table.js
exports.up = function (knex) {
    return knex.schema.createTable('tags_images', function (table) {
      table.integer('tag_id').unsigned().references('id').inTable('tags');
      table.integer('image_id').unsigned().references('id').inTable('images');
      table.primary(['tag_id', 'image_id']);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tags_images');
  };
  