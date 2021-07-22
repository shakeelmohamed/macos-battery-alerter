const { exec } = require("child_process");
const { dialog } = require("electron");

const UPDATE_INTERVAL = 2000;

function getRemainingTime() {
  return new Promise((resolve, reject) => {
    exec('pmset -g batt | egrep -o "[0-9]+%" | cat', function(
      err,
      stdout,
      stderr
    ) {
      if (stdout) {
        if (stdout.length > 1 && /%/.test(stdout)) {
          resolve(parseInt(stdout.replace("%", ""), 10));
        } else {
          resolve('');
        }
      } else {
        resolve('');
      }
    });
  });
}

setInterval(() => {
  getRemainingTime().then((percentage) => {
    if (percentage < 101) {
      dialog.showErrorBox("WARNING", "Battery percentage is: " + percentage);  
    }
  });  
}, UPDATE_INTERVAL);
