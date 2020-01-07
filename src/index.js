// importing the run function so we can call it here
// importing more then one thing from same file
import { run, num } from "./app/app";
import "./main.scss";
import { TestClass } from "./app/utils/test.class"; 

const testClass = new TestClass();
// running init function for 'app'
run(testClass);
//testing babel loader working
console.log(`I imported ${num} from another file!`);

