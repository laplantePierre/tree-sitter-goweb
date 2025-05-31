import XCTest
import SwiftTreeSitter
import TreeSitterGoweb

final class TreeSitterGowebTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_goweb())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading goweb grammar")
    }
}
