export {};

declare global {
  module '*.svg' {
    const content: string;
    export default content;
  }

  var _NSS_RSA: {
    encrypt({ onSuccess, onError }): void;
  };
}
