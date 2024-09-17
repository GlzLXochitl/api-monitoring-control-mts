// Seed file for user_type table data insertion

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_type', [
      {
        type: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'operational',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'viewer',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_type', null, {});
  }
};
