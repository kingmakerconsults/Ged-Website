This folder holds public, reusable map assets.

- us-regions.svg: Public-domain, state-path SVG with data-state and data-region attributes for GED-style region questions.

You can populate us-regions.svg using:

  npm run maps:fetch:us-regions

This downloads a public-domain base from Wikimedia and annotates it using /data/usRegions.json.
