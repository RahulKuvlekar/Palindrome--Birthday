const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
import {isPalindrome} from "./app.js"

function checkAllCombi(yyyy, mm, dd) {
  //yyyymmdd format string
  const dateFormat1 = yyyy + mm + dd;

  //ddmmyyyy format string
  const dateFormat2 = dd + mm + yyyy;

  //mmddyy format string
  const dateFormat3 = mm + dd + yyyy.substring(2);

  //mddyyyy format string
  const dateFormat4 = Number(mm) + dd + yyyy;

  if (isPalindrome(dateFormat1)) {
    return `${yyyy}-${mm}-${dd}`;
  } else if (isPalindrome(dateFormat2)) {
    return `${dd}-${mm}-${yyyy}`;
  } else if (isPalindrome(dateFormat3)) {
    return `${mm}-${dd}-${yyyy.substring(2)}`;
  } else if (isPalindrome(dateFormat4)) {
    return `${Number(mm)}-${dd}-${yyyy}`;
  } else {
    return null;
  }
}

function findNextDate(date, month, year) {
  let ddNo1 = parseInt(date);
  let mmNo1 = parseInt(month);
  let yyNo1 = parseInt(year);
  let ddNo2 = parseInt(date);
  let mmNo2 = parseInt(month);
  let yyNo2 = parseInt(year);

  for (let i = 1; i > 0; i++) {
    //forward check
    ddNo1 = ddNo1 + 1;
    if (ddNo1 > parseInt(datesInMonth[mmNo1 - 1])) {
      ddNo1 = 1;
      mmNo1 = mmNo1 + 1;
      if (mmNo1 > 12) {
        mmNo1 = 1;
        yyNo1 = yyNo1 + 1;
      }
    }
    let yyString = yyNo1.toString();
    let mmString = mmNo1.toString();
    let ddString = ddNo1.toString();
    if (mmString.length == 1) {
      mmString = "0" + mmString;
    }
    if (ddString.length == 1) {
      ddString = "0" + ddString;
    }
    let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
    if (setFlagNextDate) {
      return [`${setFlagNextDate}`, `${i} Days After`];
    }

    //backward check
    if (yyNo2 > 1) {
      ddNo2 = ddNo2 - 1;
      if (ddNo2 < 1) {
        mmNo2 = mmNo2 - 1;
        if (mmNo2 < 1) {
          mmNo2 = 12;
          yyNo2 = yyNo2 - 1;
          if (yyNo2 < 1) {
            break;
          }
          ddNo2 = datesInMonth[mmNo2 - 1];
        }
      }
      let yyString = yyNo2.toString();
      let mmString = mmNo2.toString();
      let ddString = ddNo2.toString();
      if (mmString.length == 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length == 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, `${i} Days Before`];
      }
    }
  }
}

export default findNextDate;
