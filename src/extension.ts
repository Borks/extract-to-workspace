import * as vscode from 'vscode';

import { Uri } from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let extractToWorkspace = vscode.commands.registerCommand(
		'extension.extractToWorkspace',
		(file = undefined) => {
			var folderURI: Uri | null;

			if (file !== undefined) {
				folderURI = getParentFolderURIFromPath(file);
			} else {
				folderURI = getActiveFolderUriFromEditor();
			}

			if (folderURI) {
				let folders = folderURI.path.replace('\\', '/').split('/');
				let folderName = folders[folders.length - 1];
				vscode.workspace.updateWorkspaceFolders(0, null, {name: folderName, uri: folderURI});
			}
		}
	);


	let extractToNewWorkspace = vscode.commands.registerCommand(
		'extension.extractToNewWorkspace',
		(file = undefined) => {
			let folderURI: Uri | null;

			if (file !== undefined) {
				folderURI = getParentFolderURIFromPath(file);
				vscode.commands.executeCommand('vscode.openFolder', folderURI, true);
			} else {
				folderURI = getActiveFolderUriFromEditor();
				vscode.commands.executeCommand('vscode.openFolder', folderURI, true);
			}
		}
	);

	context.subscriptions.push(extractToWorkspace);
	context.subscriptions.push(extractToNewWorkspace);
}


/**
 * Get the parent folder uri of the active editor file
 *
 * @returns {(Uri | null)}
 * null if no active editor
 */
function getActiveFolderUriFromEditor(): Uri | null {
	let activeEditor =  vscode.window.activeTextEditor;

	if (activeEditor !== undefined) {
		let activeDocumentPath = activeEditor.document.fileName.replace('\\', '/');
		let folderPath = activeDocumentPath.substring(0, activeDocumentPath.lastIndexOf("/") + 1);

		return Uri.file(folderPath);
	} else {
		return null;
	}
}


/**
 * Get the Folder URI if it's passed from the context menu of explorer
 *
 * @param {Uri} file
 * @returns {Uri}
 */
function getParentFolderURIFromPath(file: Uri): Uri {
	if (pathIsFolder(file)) {
		return file;
	}

	let unix_path: string = file.fsPath.replace('\\', '/');
	let parent_path: string = unix_path.substring(0, unix_path.lastIndexOf('/'));
	let parent_uri: Uri = Uri.file(parent_path);

	return parent_uri;
}


/**
 * Checks if the path is a folder or a file
 *
 * @param {Uri} path
 * @returns {Boolean}
 */
function pathIsFolder(path: Uri): Boolean {
	// Convert \ to /
	let unix_path = path.fsPath.replace('\\', '/');

	// Get path segments
	let segments: String[] = unix_path.split('/');

	// Get last segment
	let last_segment: String = segments[segments.length - 1];

	// Check for . in segment
	let has_dot: Number = last_segment.indexOf('.');

	if (has_dot >= 0) {
		return false;
	}

	return true;
}


// this method is called when your extension is deactivated
export function deactivate() {}
