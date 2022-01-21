const shell = require('shelljs')
const fs = require('fs')

function copyPatchFiles() {
    shell.cp('-rf', 'src/*', 'blockly-src/')
}

function main() {
    copyPatchFiles()
}

main()
