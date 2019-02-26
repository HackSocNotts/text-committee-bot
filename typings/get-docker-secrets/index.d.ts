declare module 'get-docker-secrets' {
  function getDockerSecrets(): Secrets;

  interface Secrets {
    [index: string]: string;
  }

  export { getDockerSecrets };
}