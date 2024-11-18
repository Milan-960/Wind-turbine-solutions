/*
 * Jest does not natively handle non-JavaScript file imports like images (e.g., .png, .jpg).
 * By default, when Jest encounters these imports, it attempts to process them as JavaScript,
 * leading to syntax errors. To avoid this, we provide a mock implementation that replaces
 * such imports with a simple placeholder string.
 *
 * This approach ensures that when files like '../assets/wind.png' are imported, Jest replaces
 * them with this stub ('test-file-stub') during testing. This is especially useful for testing
 * components that rely on static assets, as it avoids unnecessary test failures due to file imports.
 *
 * Reference: https://jestjs.io/docs/webpack#handling-static-assets
 */

module.exports = 'test-file-stub';
