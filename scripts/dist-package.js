const shell = require('shelljs')
const fs = require('fs')

function updatePackageDistJson() {
    const fromPkg = JSON.parse(fs.readFileSync('package.json'))
    const toPkg = JSON.parse(fs.readFileSync('blockly-dist/package.json'))

    const fromVersion = fromPkg['version']
    let toVersion = toPkg['version']

    // package.json의 버전은 dist/package.json의 버전끝에 -patchN suffix를 붙여야 한다
    if (fromVersion === toVersion) {
        console.warn(`warning: version is same '${fromVersion}', need updating suffix patch number`)
    }

    let baseVersion = toVersion.replace(/-patch[0-9]+$/, '')

    // 구글의 메이저 버전 업데이트 실수를 방지하기 위해
    // package.json과 dist/package.json의 버전 앞부분이 같아야 한다.
    if (!fromVersion.startsWith(baseVersion)) {
        // dist/package.json의 버전번호 끝에 patch 번호를 붙여서
        // package.json의 버전번호를 업데이트 한다.
        throw new Error(`invalid base version, check version in the package.json
        version must start with '${baseVersion}', but '${fromVersion}'`)
    }

    const arr = ['version', 'name', 'description', 'repository', 'bugs', 'homepage', 'author']
    arr.forEach(it => {
        toPkg[it] = fromPkg[it]
    });

    fs.writeFileSync('blockly-dist/package.json', JSON.stringify(toPkg, null, 4))
    fs.copyFileSync('./README.md', 'blockly-dist/README.md')
}

function main() {
    updatePackageDistJson()
}

main()
