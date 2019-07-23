/* eslint-disable node/no-unpublished-require */
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
	handler: function() {
		console.log('remove note');
	}
});

yargs.command({
	command: 'read',
	describe: 'read note',
	handler: function() {
		console.log('reading note');
	}
});

yargs.command({
	command: 'list',
	describe: 'list notes',
	handler: function() {
		return Notes.getNotes();
	}
});

yargs.parse();
