-- D1 schema for Phase 2. ADR-001 puts two tables in D1: the collected postings
-- with their extracted skills, and each student's own skill list.
--
-- F1-10 is the reason this file exists rather than letting the Worker invent
-- data: the system shows only postings and a collection date the team supplied.

DROP TABLE IF EXISTS posting_skills;
DROP TABLE IF EXISTS postings;
DROP TABLE IF EXISTS student_skills;

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

-- ADR-001 names a second table for each student's own skill list. F1 does not
-- write to it: ADR-001 also decided there is no login, so there is no student
-- to attach a row to, and the skills a student types are used for one request
-- and never stored. The table is created so the schema matches the ADR, and the
-- gap between them is raised for the Architect rather than left implicit.
CREATE TABLE student_skills (
  id               INTEGER PRIMARY KEY,
  skill            TEXT NOT NULL,
  skill_normalised TEXT NOT NULL
);
