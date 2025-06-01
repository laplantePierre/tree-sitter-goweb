// Tree-sitter grammar for the "goweb" language
// Defines syntax for code embedded in HTML with {{ ... }} delimiters.

module.exports = grammar({
  name: 'goweb',

  conflicts: $ => [
    [$.function_call, $._expression],
  ],

  // Whitespace (spaces, tabs, newlines) and comments to skip in parsing:
  extras: $ => [
    /\s+/,        // espaces et sauts de ligne
    $.comment     // commentaires '//' ignorés
  ],

  rules: {
    // Point d'entrée : une suite de statements Goweb
    source_file: $ => repeat($._statement),

    // Un statement peut être soit un bloc package, soit une définition de fonction,
    // soit une assignation, soit une expression seule (par ex. un appel de fonction).
    _statement: $ => choice(
      $.package_block,
      $.function_definition,
      $.assignment,
      $.expression_statement
    ),

    // Définition d'un bloc de package : 'package' nom { ... }
    package_block: $ => seq(
      'package',
      field('name', $.identifier),
      '{',
      repeat($.function_definition),
      '}'
    ),

    // Définition de fonction : 'func' nom(params) { ... }
    function_definition: $ => seq(
      'func',
      field('name', $.identifier),
      field('parameters', $.parameter_list),
      field('body', $.block)
    ),

    // Liste de paramètres de fonction : (ident, ident, ...)
    parameter_list: $ => seq(
      '(',
      optional(seq(
        $.identifier,
        repeat(seq(',', $.identifier))
      )),
      ')'
    ),

    // Un block est un ensemble d'instructions délimité par { }
    block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    ),

    // Assignation de variable, avec opérateur := ou =
    assignment: $ => seq(
      field('left', $.identifier),
      field('operator', choice(':=', '=')),
      field('right', $._expression),
      optional(';')
    ),

    // Une expression seule utilisée comme statement (ex: appel de fonction)
    expression_statement: $ => seq(
      $._expression,
      optional(';')
    ),

    // Définition de toutes les formes d'expressions possibles
    _expression: $ => choice(
      $.identifier,
      $.function_call,
      $.scoped_function_call,
      $.number,
      $.string,
      $.boolean,
      $.null,
      $.array,
      $.object,
      $.parenthesized_expression
    ),

    // Appel de fonction sans qualificateur de package
    function_call: $ => seq(
      field('function', $.identifier),
      $.argument_list
    ),

    // Appel de fonction avec qualificateur de package (ex: pkg::func())
    scoped_function_call: $ => seq(
      field('package', $.identifier),
      '::',
      field('function', $.identifier),
      $.argument_list
    ),

    // Liste d'arguments d'appel de fonction, entre parenthèses
    argument_list: $ => seq(
      '(',
      optional(seq(
        $.argument,
        repeat(seq(',', $.argument))
      )),
      ')'
    ),

    // Un argument peut être nommé (ident: expr) ou positionnel (expression simple)
    argument: $ => choice(
      $.named_argument,
      $._expression
    ),

    named_argument: $ => seq(
      $.identifier,
      ':',
      $._expression
    ),

    // Littéral tableau : [ expr, expr, ... ]
    array: $ => seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ']'
    ),

    // Littéral objet : { "clé": valeur, ... }
    object: $ => seq(
      '{',
      optional(seq(
        $.pair,
        repeat(seq(',', $.pair))
      )),
      '}'
    ),

    pair: $ => seq(
      $.string,
      ':',
      $._expression
    ),

    // Parenthèses pour regrouper une expression
    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')'
    ),

    // Lexèmes de base :

    identifier: () => /[A-Za-z_][A-Za-z_0-9]*/,          // Identifiant
    number: () => /\d+(\.\d+)?/,                         // Nombre entier ou décimal
    string: () => token(seq(                             // Chaîne de caractères
      '"',
      repeat(choice(/[^"\\]/, /\\./)),                  // contenu avec support d'échappement
      '"'
    )),
    boolean: () => choice('true', 'false'),              // Littéral booléen
    null: () => 'null',                                  // Littéral null

    comment: () => token(seq('//', /.*/))                // Commentaire de fin de ligne
  }
});
