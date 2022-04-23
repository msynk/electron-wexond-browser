import { RpcMainEvent, RpcMainHandler } from '@wexond/rpc-electron';
import { session, webContents } from 'electron';
import {
  getExtensionMainChannel,
  ExtensionMainService,
} from '~/common/rpc/extensions';
import { Application } from './Application';

export class ExtensionServiceHandler
  implements RpcMainHandler<ExtensionMainService> {
  constructor() {
    getExtensionMainChannel().getReceiver().handler = this;
  }

  inspectBackgroundPage(e: RpcMainEvent, id: string): void {
    webContents
      .getAllWebContents()
      .find(
        (x) =>
          x.session === Application.getInstance().sessions.view &&
          new URL(x.getURL()).hostname === id,
      )
      .openDevTools({ mode: 'detach' });
  }

  uninstall(e: RpcMainEvent, id: string): void {
    Application.getInstance().sessions.uninstallExtension(id);
  }
}
