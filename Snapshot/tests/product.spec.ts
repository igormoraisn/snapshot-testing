import { test, expect } from '@playwright/test';
import { FigmaDownloader } from '../lib/figma';
import { FIGMA_ID, PRODUCT_IMAGE_NAME, PRODUCT_NODE, TOKEN } from '../consts/consts';
import { getTestBrowser } from '../lib/utils';

test('Products Page', async ({ page, request }, testInfo) => {
  const testBrowserName = getTestBrowser(PRODUCT_IMAGE_NAME, 'chromium-darwin');
  await page.goto('https://www.saucedemo.com');
  await page.getByTestId("user-name").fill('standard_user');
  await page.getByTestId("password").fill('secret_sauce');
  await page.getByTestId("login-button").click();
  await page.getByTestId('shopping_cart_container').waitFor();
  FigmaDownloader.generateSnapshotFolder(`tests/${testInfo.titlePath[0]}-snapshots`);
  const image = await FigmaDownloader.getImageFromFigmaNode(request, FIGMA_ID , PRODUCT_NODE, TOKEN);
  await FigmaDownloader.writeFigmaImage(request, image, `tests/${testInfo.titlePath[0]}-snapshots/${testBrowserName}`);
  await expect(page).toHaveScreenshot(PRODUCT_IMAGE_NAME, { maxDiffPixelRatio: 0.05, fullPage: true });
});
