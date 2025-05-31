tree-sitter init
tree-sitter generate
npm install
tree-sitter parse test.goweb
tree-sitter dump-languages
tree-sitter highlight test.goweb


# Install highlights

mkdir -p ~/.config/nvim/queries/goweb
cp queries/highlights.scm ~/.config/nvim/queries/goweb
