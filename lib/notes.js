const Table = require('cli-table');
const DataBase = require('./database');
const Output = require('./output');

/**
 * Notes class
 * @class
 * @namespace Notes
 * @augments Database
 * @version 0.1.0
 */
class Notes extends DataBase {
	/**
	 * @memberof Notes
	 * @description add Note to database
	 * @param {object} data - Object with title and body
	 * @returns {string} - message with success or error
	 * @example Notes.add({title: 'My note', body: 'body of note' }) // 'document saved'
	 */
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

	/**
	 * @memberof Notes
	 * @description Remove document
	 * @param {number} id - Id of document
	 * @returns {func} - func removeDocument from Database class
	 */
	static remove({ id }) {
		if (!id || typeof id !== 'number') return Output.errorMsg('params invalid');
		return Notes.removeDocument(id);
	}

	/**
	 * @memberof Notes
	 * @description table with document
	 * @param {array} data - array of documents
	 * @returns {string} - table with documents
	 */
	static showTable(data) {
		if (!data || !(data instanceof Array) || !data.length)
			return Output.errorMsg('No documents to show');
		const table = new Table({
			head: ['Id', 'Title', 'body'],
			colWidths: [5, 20, 30]
		});
		const parseTable = data.map(document => Object.values(document));
		table.push(...parseTable);
		return console.log(table.toString());
	}

	/**
	 * @memberof Notes
	 * @description Show document by id
	 * @param {object} object - object with id document
	 * @returns {function} - function Note.showTable with the document by id
	 */
	static async read({ id }) {
		const document = await Notes.getDocumentById(id);
		if (!document.length) return Output.errorMsg('Document not found');
		return Notes.showTable(document);
	}

	/**
	 * @memberof Notes
	 * @description List all document
	 * @returns {function} - function Note.showTable with all documents
	 */
	static async list() {
		const { data, error } = await Notes.getdb();
		if (error) return Output.errorMsg(error);
		if (!data) return Output.warningMsg('try again in a few minutes');
		if (!data.length) return Output.warningMsg('there are no notes to show');
		return Notes.showTable(data);
	}
}

module.exports = Notes;
