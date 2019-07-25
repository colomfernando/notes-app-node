/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');
const Table = require('cli-table');
const DataBase = require('./database');
const Output = require('./output');

class Notes extends DataBase {
	static async add({ title, body }) {
		if (!title) return Output.errorMsg('Title is required');
		if (!body) return Output.errorMsg('Title is required');
		const { data, error } = await Notes.getdb();
		if (error) return Output.errorMsg('Try again in a few minutes');
		const sortData = data.sort((a, b) => a.id - b.id);
		const [lastNote] = sortData.slice(-1);
		const newData = {
			id: lastNote.id ? lastNote.id + 1 : 1,
			title,
			body
		};
		const res = await Notes.saveDb([...data, newData]);
		if (res.error) return Output.errorMsg('Try again in a few minutes');
		return Output.successMsg('Document saved');
	}

	static remove({ id }) {
		if (!id || typeof id !== 'number') return Output.errorMsg('params invalid');
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
			head: ['Id', 'Title', 'body'],
			colWidths: [5, 20, 30]
		});
		const parseTable = data.map(document => Object.values(document));
		table.push(...parseTable);
		console.log(table.toString());
	}
}

module.exports = Notes;
