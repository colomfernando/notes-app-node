/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');
const fs = require('fs');

class Database {
	static async getdb() {
		try {
			const dataBuffer = fs.readFileSync('./db/notes.json');
			if (!dataBuffer) throw new Error('error in getdb');
			const data = JSON.parse(dataBuffer.toString());
			return { data, error: null };
		} catch (reason) {
			return { data: [], error: reason.message };
		}
	}

	static async saveDb(data) {
		try {
			if (!data || !(data instanceof Array))
				throw new Error('data must be an array');
			const parsedData = JSON.stringify(data);
			fs.writeFileSync('./db/notes.json', parsedData);
			return { success: true, error: false };
		} catch (reason) {
			return { succes: false, error: reason.message };
		}
	}

	static async getDocumentById(id) {
		if (!id || typeof id !== 'number') return [];
		const { data, error } = await Database.getdb();
		if (error) throw new Error('errorrrrrr');
		return data.filter(document => document.id === id);
	}

	static async removeDocument(id) {
		try {
			if (!id || typeof id !== 'number') return;
			const { data, error } = await Database.getdb();
			if (error) throw new Error('try again in a few minutes');
			const document = await Database.getDocumentById(id);
			if (!document.length) throw new Error('document not found');
			const newdb = data.filter(document => document.id !== id);
			const res = await Database.saveDb(newdb);
			if (res.error) return console.log(chalk.red('something was wrong'));
			console.log(chalk.green('document removed'));
		} catch (reason) {
			return console.log(chalk.red(reason.message));
		}
	}
}

module.exports = Database;
