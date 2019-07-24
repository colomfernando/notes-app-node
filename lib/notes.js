/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');
const Table = require('cli-table');
const DataBase = require('./database');

class Notes extends DataBase {
	static async add({ title, body }) {
		if (!title) return console.log(chalk.red('Title is required'));
		if (!body) return console.log(chalk.red('Body is required'));
		const { data, error } = await Notes.getdb();
		if (error) return;
		const sortData = data.sort((a, b) => a.id - b.id);
		const [lastNote] = sortData.slice(-1);
		const newData = {
			id: lastNote.id ? lastNote.id + 1 : 1,
			title,
			body
		};
		return Notes.saveDb([...data, newData]);
	}

	static remove({ id }) {
		if (!id || typeof id !== 'number') return;
		return Notes.removeDocument(id);
	}

	static async read({ id }) {
		const document = await Notes.getDocumentById(id);
		if (!document.length) return console.log(chalk.red('document not found'));
		return console.log(document);
	}

	static async list() {
		const { data, error } = await Notes.getdb();
		if (error) return console.log(chalk.red(error));
		if (!data || !data.length)
			return console.log(chalk.red('try again in a few minutes'));
		const table = new Table({
			head: ['Id', 'Title', 'body']
		});
		const parseTable = data.map(document => Object.values(document));
		table.push(...parseTable);
		console.log(table.toString());
	}
}

module.exports = Notes;
