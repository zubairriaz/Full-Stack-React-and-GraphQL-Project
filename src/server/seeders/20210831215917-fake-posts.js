"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
        const userRows = await queryInterface.sequelize.query(
			'SELECT id from Users;',
		  )
		const userRow = userRows[0]
		console.log(userRow)
		await queryInterface.bulkInsert(
			"Posts",
			[
				{
					text: "Lorem Ipsum 1",
					createdAt: new Date(),
					updatedAt: new Date(),
					userId:userRow[0].id
				},
				{
					text: "Lorem Ipsum 2",
					createdAt: new Date(),
					updatedAt: new Date(),
					userId:userRow[1].id

				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 */ Example:
		 await queryInterface.bulkDelete('Posts', null, {});
		 
	},
};
