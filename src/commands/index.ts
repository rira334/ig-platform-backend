import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Logger from '../helpers/Logger';
import { tags } from './tags';

dotenv.config();

type CommandType = 'addTags';

let command: CommandType | null = null;

process.argv.forEach((val) => {
  if (val.includes('command')) {
    //@ts-ignore
    command = val.split('command=')[1];
  }
});

const kill = () => process.kill(process.pid, 'SIGINT');

const commands: any = {
  test: () => {
    console.log('Test Command');
    return;
  },
}

mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { Logger.applicationLogger('Connected to MongoDB') })
  .then(() => {
    if (command) {
      if (commands[command]) {
        commands[command]();
      } else {
        Logger.applicationLogger('Command is not valid');
        kill();
      }
    } else {
      Logger.applicationLogger('Add command key');
      kill();
    }
  });
