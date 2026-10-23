-- D1 schema for Phase 2. ADR-001 puts two tables in D1: the collected postings
-- with their extracted skills, and each student's own skill list.
--
-- F1-10 is the reason this file exists rather than letting the Worker invent
-- data: the system shows only postings and a collection date the team supplied.

DROP TABLE IF EXISTS posting_skills;
DROP TABLE IF EXISTS postings;
DROP TABLE IF EXISTS student_skills;  -- dropped by ADR-002; see the note below

-- One row per hand-collected posting.
-- collected_on is stored per posting, not per database, because F1-4 requires
-- the collection date to appear next to every result and a single global date
-- would go stale silently as the set grows.
CREATE TABLE postings (
  id           INTEGER PRIMARY KEY,
  role         TEXT NOT NULL,
  title        TEXT NOT NULL,
  collected_on TEXT NOT NULL
);

-- One row per skill named in a posting. Split out rather than stored as a
-- comma list so F1-2 can be a SQL join instead of string parsing in the Worker.
-- skill_normalised is the lowercased, whitespace-collapsed form, written once
-- at seed time so F1-3 matching never depends on how a row was typed.
CREATE TABLE posting_skills (
  posting_id       INTEGER NOT NULL REFERENCES postings(id),
  skill            TEXT NOT NULL,
  skill_normalised TEXT NOT NULL,
  PRIMARY KEY (posting_id, skill_normalised)
);

CREATE INDEX idx_postings_role ON postings(role);
CREATE INDEX idx_posting_skills_norm ON posting_skills(skill_normalised);

-- ADR-002 (2026-10-22) removed the student_skills table that ADR-001 named.
-- ADR-001 asked for two tables: the postings, and each student's own skill
-- list. It also decided there would be no login, so there is no student for a
-- skills row to belong to, and F1 never wrote one. The table existed and stayed
-- empty, which is a schema that describes a system we did not build.
--
-- The skills a student types are used for one request and never stored. If the
-- team later wants saved profiles, ADR-002's revisit trigger says that needs
-- its own ADR covering the data flow, consent, retention and deletion, and
-- authentication before any real student data is accepted.
