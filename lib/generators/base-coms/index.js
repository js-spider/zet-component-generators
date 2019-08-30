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
    prompting() {
        if (this.opts.args && 'isTypeScript' in this.opts.args && 'reactFeatures' in this.opts.args) {
            this.prompts = {
                isTypeScript: this.opts.args.isTypeScript,
                reactFeatures: this.opts.args.reactFeatures,
            };
        } else {
            const prompts = [
                {
                    name: 'isTypeScript',
                    type: 'confirm',
                    message: 'Do you want to use typescript?',
                    default: true,
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
                let currentPath = process.cwd();
                return path.resolve(currentPath,file.replace(/^COMPONENT_NAME/, this.prompts.comsName));
            }
        });

    }
}

module.exports = Generator;
