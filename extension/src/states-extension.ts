/********************************************************************************
 * Copyright (c) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as vscode from 'vscode';
import * as path from 'path';

import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

let languageClient: LanguageClient | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
    languageClient = activateLanguageClient(context);
}

function activateLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const executable = process.platform === 'win32' ? 'states-language-server.bat' : 'states-language-server';
    const languageServerPath =  path.join('server', 'states-language-server', 'bin', executable);
    const serverLauncher = context.asAbsolutePath(languageServerPath);
    const serverOptions: ServerOptions = {
        run: {
            command: serverLauncher,
            args: ['-trace']
        },
        debug: {
            command: serverLauncher,
            args: ['-trace']
        }
    };
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'states' }],
    };
    languageClient = new LanguageClient('statesLanguageClient', 'States Language Server', serverOptions, clientOptions);
    languageClient.start();
    return languageClient;
}

export function deactivate(): Thenable<void> {
    if (!languageClient)
       return Promise.resolve(undefined);
    return languageClient.stop();
}
