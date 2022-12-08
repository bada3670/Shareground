import { Context } from 'utils/typeContext';

export default function (context: Context, collection: string, document: string) {
  const {
    req: { headers },
  } = context;

  const protocol = process.env.API_PROTOCOL;
  const host = headers.host;

  return `${protocol}://${host}/api/${collection}?doc=${document}`;
}
