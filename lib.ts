import Transport from "winston-transport";
import { Buffer } from "node:buffer";
import fetch from "node-fetch";

export class OpenObserveTransport extends Transport {
  private url: string;
  private _buffer: any[] = [];
  private readonly batchSize: number;
  private isSending: boolean = false;
  private sentPointer: number = 0;

  constructor(
    private readonly opts: {
      node: string;
      organization: string;
      stream: string;
      auth: { username: string; password: string };
      batchSize?: number;
    }
  ) {
    super();
    this.url = `${opts.node}/api/${opts.organization}/${opts.stream}/_json`;
    this.batchSize = opts.batchSize || 10;
  }

  log(info: any, callback: any) {
    info._timestamp = info.timestamp;
    delete info.timestamp;

    this._buffer.push(info);
    console.log("openobserve", this._buffer.length, this.batchSize);
    if (!this.isSending && this._buffer.length >= this.batchSize) {
      this.isSending = true;
      this.flushBuffer(callback);
    } else {
      callback();
    }
  }

  flushBuffer(callback: any) {
    if (this._buffer.length === 0) {
      this.isSending = false;
      callback();
      return;
    }

    const logsToSend = this._buffer;
    this.sentPointer = this._buffer.length - 1;
    this.isSending = true;
    console.log("openobserve logs count", logsToSend.length);
    fetch(this.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${this.opts.auth.username}:${this.opts.auth.password}`
        ).toString("base64")}`,
      },
      body: JSON.stringify(logsToSend),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("openobserve", res);
        this._buffer = this._buffer.slice(0, this.sentPointer); // Remove sent logs from buffer
        this.sentPointer = 0; // Reset pointer
        this.isSending = false;
        this.flushBuffer(callback);
      })
      .catch((err) => {
        console.log(err);
        this.isSending = false;
        callback();
      });
  }
}
