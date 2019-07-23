/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');
const fs = require('fs');

class Database {
	static async getdb() {
		try {
			const dataBuffer = fs.readFileSync('./db/notes.json');
			if (!dataBuffer) throw new Error('error in getdb');
			return { data: JSON.parse(dataBuffer.toString()), error: null };
		} catch (reason) {
			return { data: [], error: reason.message };
		}
	}

	static saveDb(data) {
		try {
			if (!data || !(data instanceof Array))
				throw new Error('data must be an array');
			const parsedData = JSON.stringify(data);
			fs.writeFile('./db/notes.json', parsedData, err => {
				if (err) {
					console.log(chalk.red('Error on saving note'));
					throw new Error();
				}
				console.log(chalk.green('data saved'));
			});
		} catch (reason) {
			return reason.message;
		}
	}
	static sortDb() {
		const db = Database.getdb();
		if (!db) return;
		return db.sort((a, b) => a.id - b.id);
	}

	static getLastDocument() {
		const db = Database.sortDb();
		if (!db || !db.length || !(db instanceof Array)) return [];
		return db.slice(-1);
	}

	static getDocumentById(id) {
		if (!id || typeof id !== 'number') return [];
		const db = Database.getdb();
		const document = db.filter(document => document.id === id);
		return document;
	}

	static removeDocument(id) {
		try {
			if (!id || typeof id !== 'number') return;
			const db = Database.getdb();
			const document = Database.getDocumentById(id);
			if (!document.length) throw new Error('document not found');
			const newdb = db.filter(document => document.id !== id);
			console.log(chalk.green('document remove'));
			return Database.saveDb(newdb);
		} catch (reason) {
			return console.log(chalk.red(reason.message));
		}
	}
}

module.exports = Database;
