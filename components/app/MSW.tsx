import { useEffect } from 'react';
import { setupWorker } from 'msw';
import { setupServer } from 'msw/node';

import { userHandlers } from 'mocks/user';
import { searchHandlers } from 'mocks/search';
import { articleHandlers } from 'mocks/articles';
import { categoryHandlers } from 'mocks/category';
import { interestHandlers } from 'mocks/interest';
import { wroteHandlers } from 'mocks/wrote';

export default function MSW() {
  const server = setupServer(...articleHandlers, ...categoryHandlers);
  server.listen();
  useEffect(() => {
    const worker = setupWorker(
      ...userHandlers,
      ...searchHandlers,
      ...interestHandlers,
      ...wroteHandlers
    );
    worker.start();
  }, []);

  return <></>;
}
