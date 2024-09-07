import { strict as a } from 'assert'
import { Doclet, Doclets } from 'ddata'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('globals', function () {
  const doclets = Doclets.fromArray([
    { id: '1', scope: 'global' },
    { id: '2', scope: 'global', kind: 'function' },
    { id: '3', scope: 'global', kind: 'external', description: 'clive' },
    { id: '4' },
    { id: '5', scope: 'global', kind: 'member' },
    { id: '6' },
    { id: '7', scope: 'global', kind: 'function' }
  ])
  const result = doclets.globals()
  // this.data = result
  a.equal(result.length, 5)
  // a.deepEqual(result, [
  //   { id: '1', scope: 'global' },
  //   { id: '2', scope: 'global', kind: 'function' },
  //   { id: '3', scope: 'global', kind: 'external', description: 'clive' },
  //   { id: '5', scope: 'global', kind: 'member' },
  //   { id: '7', scope: 'global', kind: 'function' }
  // ])
})

test.set('orphans', function () {
  const doclets = Doclets.fromArray([
    { id: '1', memberof: 'something' },
    { id: '2', memberof: 'something' },
    { id: '3', kind: 'external' },
    { id: '4' },
    { id: '5', memberof: 'something', kind: 'external' },
    { id: '6' },
    { id: '7', kind: 'external', description: 'clive' }
  ])
  const result = doclets.orphans()
  // this.data = result
  a.equal(result.length, 3)
  a.deepEqual(result[0], new Doclet({ id: '4' }))
  a.deepEqual(result[1], new Doclet({ id: '6' }))
  a.deepEqual(result[2], new Doclet({ id: '7', kind: 'external', description: 'clive' }))
})

export { test, only, skip }
