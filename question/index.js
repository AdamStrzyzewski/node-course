const { program } = require("commander");

program
  .option("-a, --action [String]", "choose action", "default")
  .option("-i, --id [String]", "user id", "default")
  .option("-n, --name [String]", "user name", "default")
  .option("-e, --email [String]", "user email", "default")
  .option("-p, --phone [String]", "user phone", "default");

program.option(
  "-f, --file [String]",
  "file for saving game result",
  "results.txt"
);
program.parse(process.argv);

console.log(program.opts());
