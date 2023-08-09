import {Command} from "commander"

const program = new Command();

program.option('-p <port>','puerto del servidor',8080);

program.parse();

console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);

