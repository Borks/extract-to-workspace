import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	let disposable = vscode.commands.registerCommand('extension.extractToWorkspace', () => {
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

	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
