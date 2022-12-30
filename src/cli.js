import arg from 'arg';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

import { friendlySyntaxToApiSyntax } from "@openfga/syntax-transformer";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--source': String,
            '--target': String,
            '-s': '--source',
            '-t': '--target',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {

        source: args['--source'] || null,
        target: args['--target'] || 'openfga.json',
    };
}

async function promptForMissingOptions(options) {

    const questions = [];
    if (!options.source) {
        questions.push({
            type: 'input',
            name: 'source',
            message: 'Please enter the source file to be converted',
            default: "test/valid.dsl",
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        source: options.source || answers.source
    };
}

export async function transformSyntax(options) {

    // Check Source File Exists
    try {
        await fs.promises.access(options.source)
    } catch (error) {
        console.log("Source File does not exist")
        return 1
    }

    // Create Target Directory if missing
    try {
        const directory = path.dirname(options.target);
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory, { recursive: true });
        }
    } catch (error) {
        console.log("Cannot create target directory, or target is invalid.")
        console.log(error)
        return 1
    }

    // Read and Transform Input
    let transformed_output;
    try {
        transformed_output = friendlySyntaxToApiSyntax(fs.readFileSync(options.source, 'utf8'))
    } catch (error) {
        console.log("Transformation Unsuccessful, invalid syntax.")
        console.log(error)
        return 1
    }

    // Output to target File
    try {
        await fs.writeFileSync(options.target, JSON.stringify(transformed_output, null, 2))
    } catch (error) {
        console.log(error);
    }
    console.log("File Converted Successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync(options.target, "utf8"));
    return 0
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    let result = await transformSyntax(options);
    process.exit(result)
}