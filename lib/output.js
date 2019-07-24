/* eslint-disable node/no-unpublished-require */
const chalk = require('chalk');

class Output {
	get defaultMsg() {
		return {
			error: 'Error'
		};
	}
	static errorMsg(str) {
		if (!str) return console.log(chalk.red(this.defaultMsg.error));
		return console.log(chalk.red(str));
	}
}

module.exports = Output;
