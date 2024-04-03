export default class Logger {
  static applicationLogger(log: string) {
    console.log(`-> ${log}\n`);
  }

  static microframeworkLogger(log: string) {
    console.log('--------------------------------------\n');
    console.log(`   ${log}`);
    console.log('\n--------------------------------------\n');
  }
}
