// seeds/seed_users.js
exports.seed = function (knex) {
  // Inserts seed entry without deleting existing entries
  return knex('users').insert([
    { username: 'sample_user_1', password: 'securePassword123' },
    { username: 'sample_user_2', password: 'strongPassword456' },
    // Add more seed data if needed
  ]);
};
