import {transformSyntax} from '../src/cli'
import * as path from "path";

let valid_test = "valid.dsl"
let invalid_test = "invalid.dsl"

test('Invalid Transformation', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, invalid_test),
        target: "openfga.json"
    }).then(result => expect(result).toEqual(1))
});
test('Valid Transformation', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, valid_test),
        target: "openfga.json"
    }).then(result => expect(result).toEqual(0))
});

test('Non Existant File', async () => {
    return transformSyntax({
        source:path.resolve(__dirname, "gahofsa.dsl"),
        target: "openfga.json"
    }).then(result => expect(result).toEqual(1))
});
