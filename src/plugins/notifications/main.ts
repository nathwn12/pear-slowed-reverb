import { Notification } from 'electron';
import is from 'electron-is';

import {
  registerCallback,
  type SongInfo,
  SongInfoEvent,
} from '@/providers/song-info';

import interactive from './interactive';
import { notificationImage } from './utils';

import type { NotificationsPluginConfig } from './index';
import type { BackendContext } from '@/types/contexts';

let config: NotificationsPluginConfig;

const notify = (info: SongInfo) => {
  const currentNotification = new Notification({
    title: info.title || 'Playing',
    body: info.artist,
    icon: notificationImage(info, config),
    silent: true,
    urgency: config.urgency,
  });
  currentNotification.show();

  return currentNotification;
};

const setup = () => {
  let oldNotification: Notification;
  let currentUrl: string | undefined;

  registerCallback((songInfo: SongInfo, event) => {
    if (
      event !== SongInfoEvent.TimeChanged &&
      !songInfo.isPaused &&
      (songInfo.url !== currentUrl || config.unpauseNotification)
    ) {
      oldNotification?.close();
      currentUrl = songInfo.url;
      setTimeout(() => {
        oldNotification = notify(songInfo);
      }, 10);
    }
  });
};

export const onMainLoad = async (
  context: BackendContext<NotificationsPluginConfig>,
) => {
  config = await context.getConfig();

  if (is.windows() && config.interactive)
    interactive(context.window, () => config, context);
  else setup();
};

export const onConfigChange = (newConfig: NotificationsPluginConfig) => {
  config = newConfig;
};
