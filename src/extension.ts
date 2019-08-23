import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('activated')

	let extractToWorkspace = vscode.commands.registerCommand('extension.extractToWorkspace', () => {
		let activeEditor =  vscode.window.activeTextEditor;

		if (activeEditor !== undefined) {
			let activeDocumentPath = activeEditor.document.fileName;
			let folderPath = activeDocumentPath.substring(0, activeDocumentPath.lastIndexOf("\\") + 1)
			let folderURI = vscode.Uri.file(folderPath);

			let folders = folderPath.split('\\');
			let folderName = folders[folders.length - 1];

			vscode.workspace.updateWorkspaceFolders(0, null, {name: folderName, uri: folderURI})
		}
	});

	let extractToNewWorkspace = vscode.commands.registerCommand('extension.extractToNewWorkspace', () => {});

	context.subscriptions.push(extractToWorkspace);
	context.subscriptions.push(extractToNewWorkspace);

}

// this method is called when your extension is deactivated
export function deactivate() {}
