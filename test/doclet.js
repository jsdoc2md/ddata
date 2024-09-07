import { strict as a } from 'assert'
import { Doclet, Doclets } from 'ddata'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('children', async function () {
  const parent = new Doclet({ id: 'something' })
  const doclets = Doclets.fromArray([
    { id: '1', memberof: 'something' },
    { id: '2', memberof: 'something' },
    { id: '3', kind: 'external' },
    { id: '4' },
    { id: '5', memberof: 'something', kind: 'external' },
    { id: '6', memberof: 'something', kind: 'external', description: 'clive' },
    { id: '7' }
  ])
  const result = parent.children(doclets)
  a.deepEqual(result[0], new Doclet({ id: '1', memberof: 'something' }))
  a.deepEqual(result[1], new Doclet({ id: '2', memberof: 'something' }))
  a.deepEqual(result[2], new Doclet({ id: '6', memberof: 'something', kind: 'external', description: 'clive' }))
})

test.set('descendants', function () {
  const doclets = Doclets.fromArray([
    { id: 'one' },
    { id: 'two', memberof: 'one' },
    { id: 'three', memberof: 'two' },
    { id: 'four' }
  ])
  const doclet = new Doclet({ id: 'one' })
  const result = doclet.descendants(doclets, { min: 0 })
  a.equal(result.length, 2)
  a.deepEqual(result[0], new Doclet({ id: 'two', memberof: 'one' }))
  a.deepEqual(result[1], new Doclet({ id: 'three', memberof: 'two' }))
})

test.set('descendants 2', function () {
  const doclets = Doclets.fromArray([
    { id: 'one' },
    { id: 'two', memberof: 'one' },
    { id: 'three', memberof: 'two' },
    { id: 'four' }
  ])
  const doclet = new Doclet({ id: 'two' })
  const result = doclet.descendants(doclets, { min: 0 })
  a.equal(result.length, 1)
  a.deepEqual(result[0], new Doclet({ id: 'three', memberof: 'two' }))
})

test.set('descendants 3', function () {
  const doclets = Doclets.fromArray([
    { id: 'one' },
    { id: 'two', memberof: 'one' },
    { id: 'three', memberof: 'two' },
    { id: 'four' }
  ])
  const doclet = new Doclet({ id: 'four' })
  const result = doclet.descendants(doclets, { min: 0 })
  a.equal(result.length, 0)
})

export { test, only, skip }
