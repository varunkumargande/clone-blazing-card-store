const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * ONE_MINUTE;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = 365 * ONE_DAY;

// This function will display the time left over as hours ago, mins ago, days ago ...etc
export function getInTime(date) {
  const currentDate = new Date();
  const lastActiveDate = new Date(date);
  const seconds = Math.floor(
    (currentDate.getTime() - lastActiveDate.getTime()) / 1000
  );

  switch (true) {
    case seconds / ONE_YEAR > 1: {
      return Math.floor(seconds / ONE_YEAR) + " " + "years ago";
    }

    case seconds / ONE_MONTH > 1: {
      return Math.floor(seconds / ONE_MONTH) + " " + "months ago";
    }

    case seconds / ONE_DAY > 1: {
      return Math.floor(seconds / ONE_DAY) + " " + "days ago";
    }

    case seconds / ONE_HOUR > 1: {
      return Math.floor(seconds / ONE_HOUR) + " " + "hours ago";
    }

    case seconds / ONE_MINUTE > 1: {
      return Math.floor(seconds / ONE_MINUTE) + " " + "mins ago";
    }

    default: {
      return Math.floor(seconds) + " " + "secs ago";
    }
  }
}
