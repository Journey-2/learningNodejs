const { log } = require('console')
const os = require('os')

const user = os.userInfo()
// console.log(user);

const checkUptime = os.uptime()


const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem:os.freemem()
}
console.log(currentOS);
