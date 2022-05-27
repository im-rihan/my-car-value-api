import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export const setUpApp = (app: any) => {
  app.use(
    cookieSession({
      keys: ['asdfg'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
