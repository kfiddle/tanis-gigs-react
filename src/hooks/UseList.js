let ourList = [];

const UseList = (requestType, itemString) => {
  if (requestType === "post") {
    ourList.push(itemString);
    console.log(ourList);
    return;
  } else if (requestType === "get") {
    return ourList;
  }
};

export default UseList;
