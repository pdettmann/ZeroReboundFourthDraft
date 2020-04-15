const { getGravatarUrl } = require('../src/utils');

test('tests if test@gmail.com will result in url + md5Hash', () => {
  const expectedUrl = 'https://www.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058';
  expect(getGravatarUrl('test@gmail.com')).toBe(expectedUrl);
});
