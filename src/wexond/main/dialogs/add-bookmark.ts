import { BrowserWindow } from 'electron';
import { Application } from '../Application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';
import { IBookmark } from '~/interfaces';

export const showAddBookmarkDialog = (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
  data?: {
    url: string;
    title: string;
    bookmark?: IBookmark;
    favicon?: string;
  },
) => {
  if (!data) {
    const {
      url,
      title,
      bookmark,
      favicon,
    } = Application.getInstance().windows.current.viewManager.selected;
    data = {
      url,
      title,
      bookmark,
      favicon,
    };
  }

  const dialog = Application.getInstance().dialogs.show({
    name: 'add-bookmark',
    browserWindow,
    getBounds: () => ({
      width: 366,
      height: 240,
      x: x - 366 + DIALOG_MARGIN,
      y: y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: () => dialog.hide(),
  });

  if (!dialog) return;

  dialog.on('loaded', (e) => {
    e.reply('data', data);
  });
};
