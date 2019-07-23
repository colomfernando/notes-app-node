/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');
const fs = require('fs');
const DataBase = require('./database');

class Notes extends DataBase {
	static add({ title, body }) {
		if (!title) return console.log(chalk.red('Title is required'));
		if (!body) return console.log(chalk.red('Body is required'));
		const [lastNote = {}] = Notes.getLastDocument();
		const newData = {
			id: lastNote.id ? lastNote.id + 1 : 1,
			title,
			body
		};
		const mergeData = JSON.stringify([...Notes.getdb(), newData]);
		fs.writeFile('./db/notes.json', mergeData, err => {
			if (err) {
				console.log(chalk.red('Error on saving note'));
				throw new Error();
			}
			console.log(chalk.green('data saved'));
		});
	}

	static remove() {
		return 'remove note';
	}
}

module.exports = Notes;
