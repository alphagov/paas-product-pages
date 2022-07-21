/**
 * @jest-environment jsdom
 */
import Cookies from '././cookie-functions'
const cookies = new Cookies()

const paasPolicyCookie = 'govuk-paas-cookie-policy'
const randomOtherCookie = 'myCookie'

afterEach(() => {
  // reset cookies after each test
  cookies.setCookie(paasPolicyCookie, '', { days: -1 })
  cookies.setCookie(randomOtherCookie, '', { days: -1 })
})

test('if a govuk-paas-cookie-policy cookie exists, it should be deleted', async () => {
  cookies.cookieDomain = '' // to be able to set a cookie in test env
  cookies.setCookie(paasPolicyCookie, 'no', { days: 1 })
  cookies.cookieCleanup()

  expect(document.cookie).not.toContain(paasPolicyCookie)
})

test('if a non govuk-paas-cookie-policy cookie exists, it should not be deleted', async () => {
  cookies.cookieDomain = '' // to be able to set a cookie in test env
  cookies.setCookie(randomOtherCookie, 'test', { days: 1 })
  cookies.cookieCleanup()

  expect(document.cookie).toContain(randomOtherCookie)
  expect(document.cookie).not.toContain(paasPolicyCookie)
})

test('if GA cookies exists, they should be deleted', async () => {
  cookies.cookieDomain = '' // to be able to set a cookie in test env
  cookies.setCookie('_ga', 'test', { days: 1 })
  cookies.setCookie('_gid', 'test', { days: 1 })
  cookies.cookieCleanup()

  expect(document.cookie).toBe('')
})
