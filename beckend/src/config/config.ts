import './envFile';

import env from 'env-var';

export default {
  port: env.get('PORT').required().asString(),
  userCollection: env.get('USER_COL').required().asString(),
  bookmarksCollection: env.get('BOOKMARK_COL').required().asString(),
  pagesCollection:env.get('PAGES_COL').required().asString(),
  mongoDbPath: env.get('MONGO_PATH').required().asString(),
  // trakingURL: env.get('TRAKING_URL').required().asString(),
  initializationVector: env.get('INITIALIZATION_VECTOR').required().asString(),
  secretKey: env.get('SECRET_KEY').required().asString(),
}; 
