export interface Context {
  req: {
    headers: {
      host: string;
    };
  };
  query: { id: string };
}
