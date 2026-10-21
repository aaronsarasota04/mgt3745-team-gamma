// Latency measurement for Ryan's stake. Not a test: it takes about 3.5 hours.
// Each result is appended to evals/latency-results.csv as it happens, so a
// stopped run keeps what it measured.
import { appendFileSync, writeFileSync } from "node:fs";

const BASE_URL =
  process.env.WORKER_URL ?? "https://mgt3745-team-gamma.ryanlindebusiness.workers.dev";
const LIMIT_MS = 1500;
const IDLE_MS = 10 * 60 * 1000;
const RESULTS = "evals/latency-results.csv";
const body = JSON.stringify({ role: "Data Analyst", skills: ["sql"] });

async function timedRequest() {
  const start = performance.now();
  try {
    const response = await fetch(`${BASE_URL}/api/gaps`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    await response.text();
    return { ms: Math.round(performance.now() - start), status: response.status };
  } catch {
    // A network error is a failed request, so it is counted rather than stopping the run.
    return { ms: Math.round(performance.now() - start), status: 0 };
  }
}

function record(kind, number, result) {
  appendFileSync(RESULTS, `${new Date().toISOString()},${kind},${number},${result.status},${result.ms}\n`);
  console.log(kind, number, result.status, `${result.ms} ms`);
}

writeFileSync(RESULTS, "time,kind,number,status,ms\n");

await timedRequest(); // priming request, not recorded

const warm = [];
for (let number = 1; number <= 20; number += 1) {
  const result = await timedRequest();
  warm.push(result);
  record("warm", number, result);
}

const cold = [];
for (let number = 1; number <= 20; number += 1) {
  await new Promise((resolve) => setTimeout(resolve, IDLE_MS));
  const result = await timedRequest();
  cold.push(result);
  record("cold", number, result);
}

const slow = (list) => list.filter((r) => r.status === 200 && r.ms >= LIMIT_MS).length;
const failed = (list) => list.filter((r) => r.status !== 200).length;
console.log(`warm: ${slow(warm)} slow, ${failed(warm)} failed, of ${warm.length}`);
console.log(`cold: ${slow(cold)} slow, ${failed(cold)} failed, of ${cold.length}`);