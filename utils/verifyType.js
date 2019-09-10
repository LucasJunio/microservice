function verifyType(context) {
  let {
    targetDate,
    refDate,
    annualDate,
    scheduledDate,
    urgentDeadline,
    years
  } = context;

  if (new Date(refDate) >= new Date(targetDate)) {
    return "PI";
  } else {
    if (annualDate && scheduledDate && urgentDeadline) {
      if (
        new Date(refDate) > new Date(annualDate) &&
        new Date(refDate) > new Date(scheduledDate)
      ) {
        let targetDay = new Date(targetDate);
        targetDay.setDate(targetDay.getDate() - urgentDeadline);

        return targetDay > new Date(refDate) ? "PP" : "PU";
      } else {
        years !== undefined ? (years = parseInt(years)) : (years = 2);

        return new Date(refDate).getFullYear() + years <=
          new Date(targetDate).getFullYear()
          ? "PL"
          : "PA";
      }
    }
  }

  return type;
}

module.exports.verifyType = verifyType;
