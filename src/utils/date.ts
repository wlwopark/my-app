import add from "date-fns/add";
import sub from "date-fns/sub";
import format from "date-fns/format";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import eachHourOfInterval from "date-fns/eachHourOfInterval";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInWeeks from "date-fns/differenceInWeeks";
import endOfWeek from "date-fns/endOfWeek";
import startOfWeek from "date-fns/startOfWeek";

interface Params {
  date: Date | number;
  duration: Duration;
}

function addDate({ date, duration }: Params) {
  return add(date, duration);
}

function subtractDate({ date, duration }: Params) {
  return sub(date, duration);
}

function eachDateOfInterval({
  type,
  params,
}: {
  type: "day" | "hour";
  params: Parameters<typeof eachDayOfInterval>[0];
}) {
  const func = {
    day: eachDayOfInterval,
    hour: eachHourOfInterval,
  };

  return func[type]({ ...params });
}

/**
 * Convert date to date formatted string
 * @param {Date | string | number} date
 * @param {string} formatPattern
 * @returns {string}
 * @see {@link https://date-fns.org/v2.29.3/docs/format}
 */
function toFormattedDate({
  date,
  formatPattern,
}: {
  date: Date | string | number;
  formatPattern: string;
}): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  return format(d, formatPattern);
}

/**
 * @see {@link https://date-fns.org/v2.29.3/docs/differenceInDays}
 */
function diffDate({
  from,
  to,
  unit,
}: {
  from: Date | number;
  to: Date | number;
  unit: "day" | "month" | "week" | "minute";
}) {
  const func = {
    day: differenceInCalendarDays,
    week: differenceInWeeks,
    month: differenceInMonths,
    minute: differenceInMinutes,
  };

  return func[unit](to, from);
}

function getEdgeOfWeek({ date }: { date: Date }) {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return {
    start,
    end,
  };
}

export {
  addDate,
  subtractDate,
  toFormattedDate,
  eachDateOfInterval,
  diffDate,
  getEdgeOfWeek,
};
