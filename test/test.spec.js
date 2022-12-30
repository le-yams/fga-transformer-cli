import {transformSyntax, parseArgumentsIntoOptions} from '../src/cli'
import path from "path";
import os from "os";

let valid_test = "valid.dsl"
let invalid_test = "invalid.dsl"

test('Invalid Transformation', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, invalid_test),
        target: path.join(os.tmpdir(), "openfga-invalid.json")
    }).then(result => expect(result).toEqual(1))
});
test('Valid Transformation', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, valid_test),
        target: path.join(os.tmpdir(), "openfga-valid.json")
    }).then(result => expect(result).toEqual(0))
});

test('Non Existant File', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, "gahofsa.dsl"),
        target: path.join(os.tmpdir(), "openfga-non-existant.json")
    }).then(result => expect(result).toEqual(1))
});

test('Non Existant Directory', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, valid_test),
        target: path.join(os.tmpdir(), "non", "existant", "openfga-non-existant.json")
    }).then(result => expect(result).toEqual(0))
});