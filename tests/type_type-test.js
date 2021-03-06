"use strict";
const Parser = require("../src/index");

describe("typeType", () => {
  it("primitiveType", () => {
    expect(Parser.parse("boolean", parser => parser.typeType())).toEqual({
      type: "PRIMITIVE_TYPE",
      value: "boolean"
    });
  });

  it("identifier", () => {
    expect(Parser.parse("A", parser => parser.typeType())).toEqual({
      type: "IDENTIFIER",
      value: "A"
    });
  });

  it("identifier with annotation", () => {
    expect(Parser.parse("@Bean boolean", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      modifiers: [
        {
          type: "ANNOTATION",
          name: {
            type: "QUALIFIED_NAME",
            name: [
              {
                type: "IDENTIFIER",
                value: "Bean"
              }
            ]
          },
          hasBraces: false
        }
      ],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      dimensions: []
    });
  });

  it("one square", () => {
    expect(Parser.parse("boolean[]", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      modifiers: [],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      dimensions: [
        {
          type: "DIMENSION"
        }
      ]
    });
  });

  it("multiple square", () => {
    expect(Parser.parse("boolean[][]", parser => parser.typeType())).toEqual({
      type: "TYPE_TYPE",
      modifiers: [],
      value: {
        type: "PRIMITIVE_TYPE",
        value: "boolean"
      },
      dimensions: [
        {
          type: "DIMENSION"
        },
        {
          type: "DIMENSION"
        }
      ]
    });
  });

  it("annotation", () => {
    expect(Parser.parse("@Bean", parser => parser.typeType())).toEqual({
      type: "ANNOTATION",
      name: {
        type: "QUALIFIED_NAME",
        name: [
          {
            type: "IDENTIFIER",
            value: "Bean"
          }
        ]
      },
      hasBraces: false
    });
  });
});
