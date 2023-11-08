const { assetService } = require('../index.js')

test('listAsset', async () => {
  const data = await assetService.listAssets()
  expect(data).toBe('peanut butter');
});