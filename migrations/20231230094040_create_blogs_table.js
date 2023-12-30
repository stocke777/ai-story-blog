// migrations/20231229000000_create_blogs_table.js

exports.up = function (knex) {
    return knex.schema.createTable('blogs', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('body').notNullable();
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('blogs');
  };
  