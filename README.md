# States example

This folder contains an example VS Code extension with an Xtext-based language server and a Sprotty diagram for a simple domain-specific language for statemachines.

## Build

Language server
```
language-server/gradlew -p language-server unzipServer
```

Extension
```
yarn --cwd webview
yarn --cwd extension
```

