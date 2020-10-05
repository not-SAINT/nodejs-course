const { pipeline } = require('stream');
const { program } = require('commander');
const fs = require('fs');
const util = require('util');

const CaesarCipherTransform = require('./caesar-cipher');
const checkArguments = require('./checkArguments');
const { errorHandler, checkFileExists } = require('./utils');

process.on('exit', code => {
  if (code) {
    console.log(`\nExit with code: ${code}`);
  }
});

program.storeOptionsAsProperties(false);

program.option(
  '-s, --shift <number>',
  'required: a shift for Caesar cipher',
  value => parseInt(value, 10)
);
program.option(
  '-a, --action <type>',
  'required: an action encode/decode, allowed values "encode" or "decode"'
);
program.option('-i, --input <type>', 'an input file');
program.option('-o, --output <type>', 'an output file');
program.parse(process.argv);

const programOptions = program.opts();

checkArguments(programOptions);

const run = async ({ input, output }) => {
  if (input) {
    await checkFileExists(input).catch(() => {
      errorHandler('input file does not exist', 8);
    });
  }

  if (output) {
    await checkFileExists(output).catch(() => {
      errorHandler('output file does not exist', 8);
    });
  }

  const read = input ? fs.createReadStream(input) : process.stdin;
  const write = output
    ? fs.createWriteStream(output, { flags: 'a+' })
    : process.stdout;

  const promisedPipeline = util.promisify(pipeline);

  await promisedPipeline(
    read,
    new CaesarCipherTransform(programOptions),
    write
  ).catch(() => {
    errorHandler('Something went wrong in pipeline');
  });
};

run(programOptions);
