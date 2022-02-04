module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('Tasks', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            task: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            check: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('Tasks');
    },
};
