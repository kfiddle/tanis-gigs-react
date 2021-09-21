

const MoneyFunctions = (money, upOrDown) => {
  if (upOrDown = 'up') {
    const splitMoney = money.split(".");
    let penniesToSend = 0;

    if (splitMoney.length > 1) {
      penniesToSend = splitMoney[0] * 100 + +splitMoney[1];
    } else {
      penniesToSend = splitMoney[0] * 100;
    }

    return penniesToSend;
  } else {

    let dollars = ~~(money / 100);
    let cents = money % 100;
    if (cents === 0) {
      return dollars + "." + "00";
    } else if (cents < 10) {
      return dollars + "." + cents + "0";
    } else {
      return dollars + "." + cents;
    }
  }
};

export default MoneyFunctions;
