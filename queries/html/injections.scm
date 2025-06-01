; Injection de code Goweb dans les nœuds texte HTML délimités par {{ }}
((raw_text) @injection.content
  (#match? @injection.content "^{{.*}}$")
  (#offset! @injection.content 0 2 0 -2)
  (#set! injection.language "goweb"))
