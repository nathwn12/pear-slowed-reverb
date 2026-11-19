import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import { APPLICATION_NAME } from '@/i18n';

import { defaultInAppMenuConfig, type InAppMenuConfig } from './constants';
import { TitleBar } from './renderer/TitleBar';

import type { RendererContext } from '@/types/contexts';

const scrollStyle = `
  html::-webkit-scrollbar {
    background-color: red;
  }
`;

const isMacOS = navigator.userAgent.includes('Macintosh');
const isNotWindowsOrMacOS =
  !navigator.userAgent.includes('Windows') && !isMacOS;

const [config, setConfig] = createSignal<InAppMenuConfig>(
  defaultInAppMenuConfig,
);
export const onRendererLoad = async ({
  getConfig,
  ipc,
}: RendererContext<InAppMenuConfig>) => {
  setConfig(await getConfig());

  document.title = APPLICATION_NAME;
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(scrollStyle);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];

  render(
    () => (
      <TitleBar
        enableController={
          isNotWindowsOrMacOS && !config().hideDOMWindowControls
        }
        initialCollapsed={window.mainConfig.get('options.hideMenu')}
        ipc={ipc}
        isMacOS={isMacOS}
      />
    ),
    document.body,
  );
};

export const onPlayerApiReady = () => {};

export const onConfigChange = (newConfig: InAppMenuConfig) => {
  setConfig(newConfig);
};
