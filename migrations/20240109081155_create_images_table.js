// YYYYMMDD_create_images_table.js
exports.up = function (knex) {
    return knex.schema.createTable('images', function (table) {
      table.increments('id').primary();
      table.string('unique_name').unique().notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users'); // Assuming a 'users' table exists
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('images');
  };
  