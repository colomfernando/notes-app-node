const fs = require('fs');

class Database {
	static getdb() {
		const dataBuffer = fs.readFileSync('./db/notes.json');
		return JSON.parse(dataBuffer.toString());
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
}

module.exports = Database;
