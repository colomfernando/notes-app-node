/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');

class Output {
	get defaultMsg() {
		return {
			error: 'Error',
			success: 'Success',
			warning: 'Warning'
		};
	}
	static errorMsg(str) {
		const error = chalk.red.bold;
		if (!str) return console.log(error(this.defaultMsg.error));
		return console.log(error(str));
	}
	static successMsg(str) {
		const success = chalk.green.bold;
		if (!str) return console.log(success(this.defaultMsg.success));
		return console.log(success(str));
	}
	static warningMsg(str) {
		const warning = chalk.yellow;
		if (!str) return console.log(warning(this.defaultMsg.warning));
		return console.log(warning(str));
	}
}

module.exports = Output;
