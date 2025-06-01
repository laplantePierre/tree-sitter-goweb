; Requêtes de coloration syntaxique pour goweb

;; Mots-clés du langage
"package" @keyword
"func" @keyword

;; Littéraux primitifs
(boolean) @boolean             ; true/false
(null) @constant.builtin       ; null
(number) @number               ; nombres
(string) @string               ; chaînes de caractères

;; Identifiants et variables
(package_block name: (identifier) @namespace)         ; nom de package
(function_definition name: (identifier) @function)    ; nom de fonction défini
(function_call (identifier) @function)                ; nom de fonction (appel sans package)
(scoped_function_call package: (identifier) @namespace)  ; nom de package dans un appel
(scoped_function_call function: (identifier) @function)  ; nom de fonction dans un appel qualifié
(parameter_list (identifier) @parameter)              ; paramètres de fonction
(assignment left: (identifier) @variable)             ; variable affectée (gauche d'assignation)

;; Opérateurs et ponctuation
("::") @operator
(":=") @operator
("=") @operator
(":") @punctuation.delimiter
(",") @punctuation.delimiter
(";") @punctuation.delimiter

("(") @punctuation.bracket
(")") @punctuation.bracket
("{") @punctuation.bracket
("}") @punctuation.bracket
("[") @punctuation.bracket
("]") @punctuation.bracket

;; Commentaires
(comment) @comment
