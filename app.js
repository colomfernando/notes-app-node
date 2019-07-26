const yargs = require('yargs');
const Notes = require('./lib/notes');

yargs.command({
	command: 'add',
	describe: 'add note',
	builder: {
		title: {
			describe: 'title for note',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'body of note',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		return Notes.add(argv);
	}
});

yargs.command({
	command: 'remove',
	describe: 'remove note',
	builder: {
		id: {
			describe: 'id of document to delete',
			demandOption: true,
			type: 'number'
		}
	},
	handler: function(argv) {
		return Notes.remove(argv);
	}
});

yargs.command({
	command: 'read',
	describe: 'read note',
	builder: {
		id: {
			describe: 'id of document to read',
			demandOption: true,
			type: 'number'
		}
	},
	handler: function(argv) {
		return Notes.read(argv);
	}
});

yargs.command({
	command: 'list',
	describe: 'list notes',
	handler: function() {
		return Notes.list();
	}
});

yargs.parse();
