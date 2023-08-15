import { test, expect } from '@playwright/test';
import { FigmaDownloader } from '../lib/figma';
import { FIGMA_ID, LOGIN_IMAGE_NAME, LOGIN_NODE, TOKEN } from '../consts/consts';
import { getTestBrowser } from '../lib/utils';

test('Login Page', async ({ page, request }, testInfo) => {
  const testBrowserName = getTestBrowser(LOGIN_IMAGE_NAME, 'chromium-darwin');
  await page.goto('https://www.saucedemo.com');
  FigmaDownloader.generateSnapshotFolder(`tests/${testInfo.titlePath[0]}-snapshots`);
  const image = await FigmaDownloader.getImageFromFigmaNode(request, FIGMA_ID , LOGIN_NODE, TOKEN);
  await FigmaDownloader.writeFigmaImage(request, image, `tests/${testInfo.titlePath[0]}-snapshots/${testBrowserName}`);
  await expect(page).toHaveScreenshot(LOGIN_IMAGE_NAME, { maxDiffPixelRatio: 0.05});
});
