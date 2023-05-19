const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.cleanNodeModules', function () {
        // Obter o diretório do projeto atualmente aberto
        const currentWorkspace = vscode.workspace.workspaceFolders[0];
        const projectPath = currentWorkspace.uri.fsPath;

        // Diretório do projeto
        const projeto_dir = projectPath;

        // Remover a pasta node_modules
        const nodeModulesPath = path.join(projeto_dir, 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
            fs.rmdirSync(nodeModulesPath, { recursive: true });
        }

        // Remover o arquivo package-lock.json
        const packageLockPath = path.join(projeto_dir, 'package-lock.json');
        if (fs.existsSync(packageLockPath)) {
            fs.unlinkSync(packageLockPath);
        }

        vscode.window.showInformationMessage('A limpeza da pasta node_modules e do arquivo package-lock.json foi concluída com sucesso.');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};