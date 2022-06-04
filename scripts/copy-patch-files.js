const shell = require('shelljs')

function copyPatchFiles() {
    shell.cp('-rf', 'src/*', 'blockly-src/')
}

function main() {
    copyPatchFiles()
}

main()
