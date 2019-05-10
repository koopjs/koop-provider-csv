const test = require("tape");
const parse = require("../../../src/utils/parse-csv");

test("it should parse CSV text", spec => {
  spec.plan(1);

  const text = ["id,type", "1,test"].join("\n");

  const result = parse(text);
  const expected = [["id", "type"], ["1", "test"]];

  spec.deepEqual(result, expected, "CSV text is parsed");
});

test("it should parse CSV text with quotes", spec => {
  spec.plan(1);

  const text = ["id,type", '"1","test"'].join("\n");

  const result = parse(text);
  const expected = [["id", "type"], ["1", "test"]];

  spec.deepEqual(result, expected, "CSV text is parsed");
});
