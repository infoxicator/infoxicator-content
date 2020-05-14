const fs = require('fs-extra');
const fetch = require('node-fetch');
const { name, version } = require('../package.json');

// This is created during the build process within the deploy action
const bundleIntegrity = require('../bundle.integrity.manifest.json');

const moduleMapUrl = 'https://one-app-modules.s3.eu-west-2.amazonaws.com/infoxicator/module-map.json';

const STATIC_ASSETS_URL = 'https://one-app-modules.s3.eu-west-2.amazonaws.com/infoxicator';

const updateModuleMap = async () => {
  try {
    const response = await fetch(moduleMapUrl);

    const moduleMapContent = await response.json();
    const dir = 'module_map';

    moduleMapContent.modules[name] = {
      browser: {
        url: `${STATIC_ASSETS_URL}/${name}/${version}/${name}.browser.js`,
        integrity: bundleIntegrity.browser,
      },
      legacyBrowser: {
        url: `${STATIC_ASSETS_URL}/${name}/${version}/${name}.legacy.browser.js`,
        integrity: bundleIntegrity.legacyBrowser,
      },
      node: {
        url: `${STATIC_ASSETS_URL}/${name}/${version}/${name}.node.js`,
        integrity: bundleIntegrity.node,
      },
    };

    await fs.ensureDir(dir);
    await fs.writeFile(
      './module_map/module-map.json', JSON.stringify(moduleMapContent, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
};

updateModuleMap().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
