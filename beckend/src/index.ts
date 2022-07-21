import mongo from './mongo/mongo';
// import { seedBtnDb } from './seedBtnDb';
import startServer from './server';

export default async function startFunction() {
  console.log('try connect to mongo');
  await mongo();
  console.log('mongo connect');
  startServer();
}

startFunction().catch((error) => {
  console.log(error.message);
  process.exit();
});
