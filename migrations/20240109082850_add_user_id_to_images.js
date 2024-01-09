// YYYYMMDD_add_user_id_to_images.js
exports.up = function (knex) {
    return knex.schema.alterTable('images', function (table) {
      table.integer('user_id').unsigned().references('id').inTable('users'); // Assuming a 'users' table exists
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('images', function (table) {
      table.dropColumn('user_id');
    });
  };
  