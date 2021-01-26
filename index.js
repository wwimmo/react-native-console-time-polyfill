"use strict";

const PerformanceNow =
  global.performanceNow ||
  global.nativePerformanceNow ||
  require("fbjs/lib/performanceNow");

const DEFAULT_LABEL = "default";
const DEFAULT_PREC = 3;

let counts = {};
let startTimes = {};

console.time = (label = DEFAULT_LABEL) => {
  startTimes[label] = PerformanceNow();
};
console.timeLog = (label = DEFAULT_LABEL, desc) => timeRecord(label, desc);

console.count = (label = DEFAULT_LABEL) => {
  if (!counts[label]) {
    counts[label] = 0;
  }
  counts[label]++;
  console.log(`${label}: ${counts[label]}`);
};

console.countReset = (label = DEFAULT_LABEL) => {
  if (counts[label]) {
    counts[label] = 0;
  } else {
    console.warn(`Count for '${label}' does not exist`);
  }
};

export function timeEnd(label = DEFAULT_LABEL) {
  return timeRecord(label, undefined, true);
}

function timeRecord(label, desc, final) {
  const endTime = PerformanceNow();
  const startTime = startTimes[label];
  let returnValue = "";
  if (startTime) {
    const delta = endTime - startTime;
    if (desc) {
      returnValue = `${label}: ${delta.toFixed(DEFAULT_PREC)}ms ${desc}`;
    } else {
      returnValue = `${label}: ${delta.toFixed(DEFAULT_PREC)}ms`;
    }
    if (final) delete startTimes[label];
    return returnValue;
  } else {
    console.warn(`Timer '${label}' does not exist`);
    return returnValue;
  }
}
