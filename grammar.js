/**
 * @file goweb programming language
 * @author Pierre Laplante <laplante@plcb.ca>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "goweb",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
