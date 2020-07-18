import { parse } from '../parse'
import { tokenize } from '../lexer'
import { map } from '../node'
import { map as locate } from '../position'
import { inspect } from 'util'

const debug = (text: string, tree) => {
  const { substring } = locate(text)
  const data = map(node => ({
    raw: substring(node.position),
    data: node.data,
  }))(tree)
  console.log(inspect(data, false, null, true))
}

describe('Parser', () => {
  it('works', () => {
    const content = `
#+TITLE: hello world
#+TODO: TODO NEXT | DONE
#+DATE: 2018-01-01

* TODO [#A] headline one
DEADLINE: <2018-01-01 Mon>
:PROPERTIES:
key: value
key: value
:END:

[[https://github.com/xiaoxinghu/orgajs][Here's]] to the *crazy* ones, the /misfits/, the _rebels_, the ~troublemakers~,
the round pegs in the +round+ square holes...

* DONE second headline :tag1:tag2:
some content
`
    // const thing = parse(tokenize(content))
    const lexer = tokenize(content)

    const tree = parse(lexer)
    debug(content, tree)
    // debug(content, thing)
  })
})
