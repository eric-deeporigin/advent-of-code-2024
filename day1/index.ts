import assert from "node:assert";
import { readFileSync } from "node:fs";
import path from "node:path";

const rawInput = readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const left: number[] = [];
const right: number[] = [];

rawInput.split("\n").forEach((r) => {
  const entry = r.split("   ");
  left.push(+entry[0]);
  right.push(+entry[1]);
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

// Sanity check
assert(left.length === right.length, "Left and right are not the same size");

let total = 0;
for (let i = 0; i < left.length; i++) {
  total += Math.abs(left[i] - right[i]);
}

console.log(total);

// Part 2
// Optimization opportunity: combine the last iteration with the one above
const rightValueCounts = right.reduce((acc, num) => {
  if (num in acc) {
    acc[num] += 1;
  } else {
    acc[num] = 1;
  }

  return acc;
}, {});

let similarityTotal = 0;

for (const leftValue of left) {
  if (leftValue in rightValueCounts) {
    similarityTotal += leftValue * rightValueCounts[leftValue];
  }
}

console.log(similarityTotal);
