// seeds/01_blogs.js

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        { title: 'First Blog Post', body: 'This is the content of the first blog post.', userId: 1 },
        { title: 'Another Post', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', userId: 2 },
        // Add more dummy entries as needed
      ]);
    });
};
