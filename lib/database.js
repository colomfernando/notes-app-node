/* eslint-disable node/no-unpublished-require */
const fs = require('fs');
const Output = require('./output');
/**
 * Database class
 * @class
 * @namespace Database
 * @version 0.1.0
 */
class Database {
	/**
	 * @memberof Database
	 * @description get json notes
	 * @returns {array} - Array of notes
	 */
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
	// TODO: revisar si conviene guardar todos los documentos o de a uno.
	/**
	 * @memberof Database
	 * @description Save all documents in Json
	 * @param {array} data - array of documents
	 * @returns {object} - success and error message
	 */
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

	/**
	 * @memberof Database
	 * @description Get document by id
	 * @param {number} id - id of the document
	 * @returns {object} - document
	 * @example Notes.getDocumentById(2) // { "id": 2, "title": "my title", "body": "body" }
	 */

	static async getDocumentById(id) {
		if (!id || typeof id !== 'number') return [];
		const { data, error } = await Database.getdb();
		if (error) throw new Error('error');
		return data.filter(document => document.id === id);
	}

	/**
	 * @memberof Database
	 * @description remove document of database
	 * @param {number} id - id of the document
	 * @returns {string} - message
	 * @example Notes.removeDocument(2) // 'Document removed
	 */

	static async removeDocument(id) {
		try {
			if (!id || typeof id !== 'number')
				return Output.errorMsg('param invalid');
			const { data, error } = await Database.getdb();
			if (error) throw new Error('try again in a few minutes');
			const document = await Database.getDocumentById(id);
			if (!document.length) throw new Error('document not found');
			const newdb = data.filter(document => document.id !== id);
			const res = await Database.saveDb(newdb);
			if (res.error) return Output.errorMsg('something was wrong');
			return Output.successMsg('Document removed');
		} catch (reason) {
			return Output.errorMsg(reason.message);
		}
	}
}

module.exports = Database;
