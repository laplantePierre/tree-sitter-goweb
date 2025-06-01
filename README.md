tree-sitter init
npm install        # installe les dépendances (dont tree-sitter-cli)
npx tree-sitter generate   # génère src/parser.c à partir de grammar.js
npx tree-sitter test       # (optionnel) lance les tests sur le corpus si défini
npm run build       # compile le parser natif (via node-gyp)

pour neovim

require'nvim-treesitter.parsers'.get_parser_configs().goweb = {
  install_info = {
    url = "https://github.com/votre-utilisateur/tree-sitter-goweb",  -- URL du dépôt git
    files = {"src/parser.c", "package.json", "binding.gyp"},
    branch = "main",
  },
  filetype = "goweb",   -- nom de filetype si on veut éditer des fichiers .goweb (optionnel)
}
