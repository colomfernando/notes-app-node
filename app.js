const yargs = require('yargs');

yargs.command({
	command: 'add',
	describe: 'add note',
	handler: function() {
		console.log('add notee');
	}
});
console.log(yargs.argv);
