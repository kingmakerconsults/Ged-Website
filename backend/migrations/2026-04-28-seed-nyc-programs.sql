-- 2026-04-28 \u2014 seed 10 NYC GED prep programs alongside the existing 3.
-- All idempotent via ON CONFLICT (name) DO NOTHING. The 3 existing rows
-- (Commonpoint Bronx, Commonpoint Queens, HANAC) get region/program_type
-- backfilled by the prior migration; this migration only inserts new orgs.

INSERT INTO organizations (name, slug, region, program_type, website_url, access_code) VALUES
  ('NYC DOE Office of Adult and Continuing Education',
   'nyc-doe-oace', 'NYC', 'GED Prep',
   'https://www.schools.nyc.gov/learning/programs/adult-continuing-education', NULL),
  ('CUNY Adult Literacy Program',
   'cuny-adult-literacy', 'NYC', 'GED Prep',
   'https://www1.cuny.edu/sites/adult-literacy/', NULL),
  ('Brooklyn Public Library Adult Learning Center',
   'brooklyn-public-library-adult-learning', 'NYC', 'GED Prep',
   'https://www.bklynlibrary.org/adult-learning', NULL),
  ('Queens Public Library Adult Learner Program',
   'queens-public-library-adult-learner', 'NYC', 'GED Prep',
   'https://www.queenslibrary.org/services/adult-learning', NULL),
  ('Henry Street Settlement',
   'henry-street-settlement', 'NYC', 'GED Prep',
   'https://www.henrystreet.org/programs/youth-services/youth-opportunity-hub/', NULL),
  ('The Door',
   'the-door', 'NYC', 'GED Prep',
   'https://door.org/programs/education/', NULL),
  ('Goodwill NYC Adult Education',
   'goodwill-nyc-adult-education', 'NYC', 'GED Prep',
   'https://goodwillnynj.org/services/employment-services/', NULL),
  ('Grand Street Settlement',
   'grand-street-settlement', 'NYC', 'GED Prep',
   'https://grandstreet.org/programs/', NULL),
  ('Turning Point Brooklyn',
   'turning-point-brooklyn', 'NYC', 'GED Prep',
   'https://www.turningpointbrooklyn.org/', NULL),
  ('Project Reach',
   'project-reach', 'NYC', 'GED Prep',
   'https://projectreachnyc.org/', NULL)
ON CONFLICT (name) DO NOTHING;
