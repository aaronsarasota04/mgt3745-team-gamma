# DEPLOY.md

Accountable: Prince Muteteke (Architect, Final).

How to deploy the Worker and its D1 database from a clean checkout. The deployed URL and the account it runs from are in [README.md](../README.md).

## What gets deployed

- One Worker named `mgt3745-team-gamma`, from `worker.js`.
- One D1 database named `gamma-postings`, bound to the Worker as `DB`.
- The static page in `public/`, served by the same Worker through the `assets` setting in `wrangler.toml`.
- The posting set, loaded from `schema.sql` and `seed.sql`. It is 28 synthetic postings across three roles.

## Before you start

- A Cloudflare account on the free plan.
- Git and Node 22. `npm test` needs Node 21 or newer, and `package.json` declares no dependencies, so there is no `npm install` step.
- Wrangler runs through `npx`, so it downloads on first use. Its version is not pinned.

## Steps

1. Clone the repository.

````bash
git clone https://github.com/aaronsarasota04/mgt3745-team-gamma.git
cd mgt3745-team-gamma
````

2. Sign in to Cloudflare. In a Codespace the browser callback can fail, and the team's HW5 notes record `npx wrangler login --device` as the fix.

````bash
npx wrangler login
````

3. Create your own D1 database. It prints a `database_id`.

````bash
npx wrangler d1 create gamma-postings
````

4. Open `wrangler.toml` and replace the `database_id` value with the one you just got. The id in the file belongs to the first deployer's account and will not work in yours. A database id is an address and not a secret, which STANDARDS.md rule 9 allows in this file. Commit the change through a reviewed pull request.

5. Create the tables and load the posting set. Check `npx wrangler d1 execute --help` on your version: without `--remote`, recent versions run against a local copy and not the deployed database.

````bash
npx wrangler d1 execute gamma-postings --remote --file=schema.sql
npx wrangler d1 execute gamma-postings --remote --file=seed.sql
````

`schema.sql` drops and recreates both tables, so run `seed.sql` after it. Both files delete before inserting, so running them twice is safe.

6. Deploy. The command prints the Worker's URL, `https://mgt3745-team-gamma.ACCOUNT.workers.dev`, where ACCOUNT is your workers.dev subdomain. The first deploy may ask you to choose one.

````bash
npx wrangler deploy
````

7. Update the deployed URL in [README.md](../README.md) and the Cloudflare row in `context/TOOLS.md` with the new accountable member and the date, each through a reviewed pull request.

## Check that it works

````bash
curl -s https://mgt3745-team-gamma.ACCOUNT.workers.dev/api/roles
````

Expect three roles with these counts and the date 2026-10-20: Data Analyst 10, Frontend Developer 12, IT Support Specialist 6.

````bash
curl -s -X POST https://mgt3745-team-gamma.ACCOUNT.workers.dev/api/gaps -H "content-type: application/json" -d '{"role":"Data Analyst","skills":["sql"]}'
````

Expect `hasPostings: true`, a `collectedOn` date, and a `missing` list ordered by `postingCount`, highest first.

Then run the evals from the checkout. `evals/worker.test.js` defaults to the first deployer's URL, so pass yours. The F1-8 test reads `public/` from the checkout.

````bash
WORKER_URL=https://mgt3745-team-gamma.ACCOUNT.workers.dev npm test
````

Expect 11 tests, all passing.

## Secrets and configuration

| Name | Where it lives | Notes |
|---|---|---|
| Worker secrets | None | The Worker reads no secret |
| Cloudflare login token | The deployer's local wrangler configuration, outside the repository | Never committed |
| `database_id` | `wrangler.toml` | An address and not a secret. It changes with the account |
| `GEMINI_API` | Not used | Gemini was removed by ADR-002 |

Model configuration: none. The Worker calls no model and no AI gateway, so there is nothing to configure.

## Redeploy and teardown

Run `npx wrangler deploy` again to redeploy code. To change the data, edit `seed.sql` and run steps 5 again. To remove everything, `npx wrangler delete` removes the Worker and `npx wrangler d1 delete gamma-postings` removes the database. Check `--help` for the flags on your version.

## Known limits

- Wrangler's version is not pinned, so a newer release may change a flag.
- Each deployer's `database_id` differs, so `wrangler.toml` changes per account.
- Every posting is invented and the set is frozen at 2026-10-20.

## Status of these instructions

Written on 2026-10-28 from `wrangler.toml`, `schema.sql`, `seed.sql`, `worker.js`, and `package.json`. Not yet run from a clean checkout. Whoever deploys from the Final Implementer's account should record here the result and any step that failed.