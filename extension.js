/*
 * @Author: 李文超
 * @Date: 2021-03-24 17:57:44
 * @LastEditors: 李文超
 * @LastEditTime: 2021-03-25 09:47:33
 * @Description: file content
 * @FilePath: \auto-html2css\extension.js
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
console.log('==========start',)
const vscode = require('vscode');

const generate = require('./lib/generate')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auto-html2css" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('auto-html2css.html2css', function () {
		// The code you place here will be executed every time your command is executed

		console.log('==========test 1',)
	// console.log('==========configuration ',configuration.get() )
		try {
			handleSelection()
		}
		catch (e) {
			console.error(e.message)
			vscode.window.showErrorMessage(e.message||'转换发生错误')
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }
const handleSelection = () => {
	const editor = vscode.window.activeTextEditor
	const selection = editor?.selection
	let text = editor?.document.getText(selection)
	let res = generate(text)
	const clipboard = vscode.env.clipboard
	clipboard.writeText(res)
	console.log('==========当前激活的editor',)
	vscode.window.showInformationMessage('转换成功');
}

module.exports = {
	activate,
	deactivate
}
