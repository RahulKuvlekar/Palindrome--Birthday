import findNextDate from "./closestPalindrome.js";

const cl = console.log;

const outputSection = document.getElementById("output-section");

const checkBtn = document.getElementById("checkBtn");
const errorMsg = document.getElementById("errorMsg");
const loadImg = document.getElementById("loadImg");

const displayToggle = (element) => {
  element.classList.toggle("displayHidden");
};

const makeVisible = (element) => {
  element.classList.remove("notVisible");
};

const notVisible = (element) => {
  element.classList.add("notVisible");
};

export const isPalindrome = (string) => {
  let lptr = 0,
    rptr = string.length - 1;
  while (lptr < rptr) {
    if (string.charAt(lptr) !== string.charAt(rptr)) {
      return false;
    }
    lptr++;
    rptr--;
  }
  return true;
};

const stopTime = async (sec) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      displayToggle(loadImg);
      resolve();
    }, sec);
  });
  cl("Promise => ", promise);
  return promise;
};

const letsCheck = async function (yr, mn, dt) {
  const format1 = dt + mn + yr;
  const format2 = mn + dt + yr;
  const format3 = dt + mn + yr.substring(2);
  let outputStr = "";

  // getLoadImg(5000);
  displayToggle(loadImg);
  // cl("Before ");
  const obj = await stopTime(5000);
  // cl("await", obj);
  if (isPalindrome(format1)) {
    cl("check 1");
    outputStr = `Yessss !!! Your birthdate ${dt}-${mn}-${yr} in format  (dd-mm-yyyy) is PALINDROM`;
  } else if (isPalindrome(format2)) {
    cl("check 2");
    outputStr = `Yessss !!! Your birthdate ${mn}-${dt}-${yr} in format (mm-dd-yyyy)  is PALINDROM`;
  } else if (isPalindrome(format3)) {
    cl("check 3");
    outputStr = `Yessss !!! Your birthdate ${dt}-${mn}-${yr.substring(
      2
    )} in format (dd-mm-yy)  is PALINDROM`;
  } else {
    const closestDate=findNextDate(dt, mn, yr);
    outputStr =
      "SORRY !!! Your birthdate is NOT PALINDROME" +
      ` Nearest is Date ${closestDate[0]} i.e ${closestDate[1]}`;
  }

  return Promise.resolve(outputStr);
  // displayToggle(loadImg);
  // setTimeout(function () {
  //   displayToggle(loadImg);
  // }, 5000);

  // return stopTime(5000).then(() => {
  //   return Promise.resolve(outputStr);
  // });
};

checkBtn.addEventListener("click", async function () {
  notVisible(errorMsg);
  notVisible(outputSection);
  const inputDate = document.getElementById("input-date").value;

  if (inputDate === "") {
    errorMsg.textContent = " Please Check DATE inputs ";
    makeVisible(errorMsg);
    return;
  }

  const ans = await letsCheck(...inputDate.split("-"));

  outputSection.querySelector("h2").textContent = ans;
  makeVisible(outputSection);
});
