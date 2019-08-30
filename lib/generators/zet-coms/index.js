const glob = require("glob");
const path = require('path');
const BasicGenerator = require('../../BasicGenerator');

const inputSubject = function(input) {
    input = input.trim();
    if (input.charAt(0).toUpperCase() !== input.charAt(0)) {
        input = input.charAt(0).toUpperCase() + input.slice(1, input.length);
    }
    return input;
};

class Generator extends BasicGenerator {
    initializing(){
        let currentPath = process.cwd();
        const componentPath = 'packages/zet-component';
        const filterPath = currentPath.split(componentPath);
        if(currentPath.indexOf(componentPath)>-1){
            currentPath = filterPath[0] + 'packages';
        }else{
            console.error((`✘ The path error (must in zet-component project)`));
            return process.exit(1);
        }
        this.currentPath = currentPath;
    }
    prompting() {
        if (this.opts.args && 'isTypeScript' in this.opts.args && 'reactFeatures' in this.opts.args) {
            this.prompts = {
                isTypeScript: this.opts.args.isTypeScript,
                reactFeatures: this.opts.args.reactFeatures,
            };
        } else {
            const zetBasicComs =[ 'components',...glob.sync("zet-component/src/scena/*", {
                cwd:this.currentPath,
                realpath:true,
            })].map((f)=>{
               return path.basename(f);
            })
            const prompts = [
                {
                    name: 'isTypeScript',
                    type: 'confirm',
                    message: 'Do you want to use typescript?',
                    default: true,
                },
                {
                    name: 'comsMenu',
                    message: 'Enter an uppercase component menu such as: AutoMl >> ',
                    required: true,
                    type: 'list',
                    default: 'components',
                    choices:zetBasicComs,
                },
                {
                    name: 'comsName',
                    message: 'Enter an uppercase component name such as: AutoMl >>',
                    required: true,
                    type: 'input',
                    validate: (input='') => {
                        // Declare function as asynchronous, and save the done callback
                        if(!input.trim()){
                            return `component name is required`;
                        }
                        return true;

                    },
                    filter: (input) => {
                        return inputSubject(input);
                    }
                    // transformer:(subject, answers) =>{}
                },
            ];
            return this.prompt(prompts).then(props => {
                this.prompts = props;
            })
        }
    }

    writing() {
        const menu = this.prompts.comsMenu || 'components';
        this.writeFiles({
            context: {
                comsStylePath:'../../',
                comsMess:'',
                ...this.prompts
            },
            filterFiles: f => {
                return true;
            },
            targetFile:(file)=>{
                let menuPath = `${this.currentPath}/zet-component/src/`+ (menu === 'components' ? 'components/': `scena/${menu}`);
                return path.resolve(menuPath,file.replace(/^COMPONENT_NAME/, this.prompts.comsName));
            }
        });

    }
}

module.exports = Generator;
