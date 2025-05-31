package tree_sitter_goweb_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_goweb "github.com/laplantepierre/goweb-treesitter.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_goweb.Language())
	if language == nil {
		t.Errorf("Error loading goweb grammar")
	}
}
