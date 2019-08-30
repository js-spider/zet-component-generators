const Generator = require('yeoman-generator');
const glob = require('glob');
const { statSync } = require('fs');
const { basename } = require('path');

function noop(file) {
    return file || true;
}
class BasicGenerator extends Generator {
    constructor(opts) {
        super(opts);
        this.opts = opts;
        this.name = basename(opts.env.cwd);
    }

    isTsFile(f) {
        return f.endsWith('.ts') || f.endsWith('.tsx') ;
    }

    writeFiles({ context, filterFiles = noop,targetFile=noop }) {
        const allFiles = glob
            .sync('**/*', {
                cwd: this.templatePath(),
                dot: true,
            })
        const useFiles = allFiles.filter(filterFiles);
        useFiles.forEach(file => {
            const filePath = this.templatePath(file);
            if (statSync(filePath).isFile()) {
                this.fs.copyTpl(
                    this.templatePath(filePath),
                    targetFile(file),
                    context,
                );
            }
        });
    }

    prompt(questions) {
        process.send && process.send({ type: 'prompt' });
        process.emit('message', { type: 'prompt' });
        return super.prompt(questions);
    }
}

module.exports = BasicGenerator;
