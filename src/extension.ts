import * as vscode from 'vscode';
import { Uri } from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	console.log('activated')

	let extractToWorkspace = vscode.commands.registerCommand(
		'extension.extractToWorkspace', (file = undefined) => {
			if (file !== undefined) {
				var folderURI = Uri.file(file);
			} else {
				var folderURI = getActiveFolderUriFromEditor();
			}

			if (folderURI) {
				let folders = folderURI.fsPath.split('\\');
				let folderName = folders[folders.length - 1];
				vscode.workspace.updateWorkspaceFolders(0, null, {name: folderName, uri: folderURI})
			}
		}
	);

	let extractToNewWorkspace = vscode.commands.registerCommand(
		'extension.extractToNewWorkspace', (file = undefined) => {
			if (file !== undefined) {
				vscode.commands.executeCommand('vscode.openFolder', file, true);
			} else {
				let folderURI = getActiveFolderUriFromEditor();
				vscode.commands.executeCommand('vscode.openFolder', folderURI, true);
			}
		}
	);

	context.subscriptions.push(extractToWorkspace);
	context.subscriptions.push(extractToNewWorkspace);

}

function getActiveFolderUriFromEditor(): Uri | null {
	let activeEditor =  vscode.window.activeTextEditor;

	if (activeEditor !== undefined) {
		let activeDocumentPath = activeEditor.document.fileName;
		let folderPath = activeDocumentPath.substring(0, activeDocumentPath.lastIndexOf("\\") + 1)

		return Uri.file(folderPath)
	} else {
		return null;
	}
};


// this method is called when your extension is deactivated
export function deactivate() {}
