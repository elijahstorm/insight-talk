export const isProductionEnvironment = process.env.NODE_ENV === 'production';

export const isPreviewMode = process.env.NEXT_PUBLIC_PREVIEW_MODE == '1';

export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);
