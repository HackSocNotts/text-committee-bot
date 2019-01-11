declare module 'nexmo' {

  class Nexmo {
    constructor(config: {
      apiKey?: string,
      apiSecret?: string,
      applicationId?: string,
      privateKey?: string,
    }, options?: NexmoConstructorOptions);
  
    message: {
      sendSms: (sender: string | number, recipient: number, message: string, options?: NexmoSMSOptions, callback?: string) => void;
    }
  }
  
  interface NexmoConstructorOptions {
    debug?: boolean,
    // append info the the User-Agent sent to Nexmo
    // e.g. pass 'my-app' for /nexmo-node/1.0.0/4.2.7/my-app
    appendToUserAgent?: string,
    // Set a custom logger
    logger?: {
      log: (level: any, ...args: any[]) => void,
      info: (...args: any[]) => void,
      warn: (...args: any[]) => void,
    },
    // Set a custom timeout for requests to Nexmo in milliseconds. Defaults to the standard for Node http requests, which is 120,000 ms.
    timeout: number,
  }
  
  interface NexmoSMSOptions {
    ttl?: number, // 20000 to 604800000
    "status-report-req"?: boolean,
    "message-class"?: 0 | 1 | 2 | 3,
    type?: "text" | "binary" | "wappush" | "unicode" | "vcal" | "vcard",
    vcard?: string,
    vcal?: string,
    body?: string,
    "protocol-id"?: number,
    title?: string,
    validity?: string,
    "client-ref"?: string,
  }
  
  export = Nexmo;
}
