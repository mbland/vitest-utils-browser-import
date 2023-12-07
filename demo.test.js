import { expect, test } from 'vitest'

test('OK in <=1.0.0-beta.4+vite <=5.0.0-beta.7, breaks otherwise', async () => {
  // This will timeout when config.base is undefined.
  var page = window.open('/foobar/hello.html')
  await new Promise(resolve => page.addEventListener('load', resolve))

  let e = page.document.querySelector('body p')

  expect(e.textContent).toContain('Hello, World!')
})
