import { session } from './sessoin.config';
import { cookieParser } from './cookie-parser.config';
import { INestApplication, Logger } from '@nestjs/common';
import { corsConfig } from './cors.config';
export const appConfig = async (_app: INestApplication) => {
  _app.enableCors(corsConfig);
  _app.use(session, cookieParser);
  const port = process.env.PORT || 3852;
  await _app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${process.env.PUBLIC_BASE_APP_URL}`
  );
};
