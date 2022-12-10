import { Context } from 'utils/typeContext';

export default function (context: Context) {
  const {
    req: { headers },
  } = context;

  const protocol = process.env.API_PROTOCOL;
  const host = headers.host;

  return `${protocol}://${host}/api`;
}
