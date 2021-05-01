const moment = require("moment");

function formatMessage(botName, message) {
  console.log(message);
  return {
    botName,
    message,
    time: moment().format("hh:mm a"),
  };
}

module.exports = formatMessage;
