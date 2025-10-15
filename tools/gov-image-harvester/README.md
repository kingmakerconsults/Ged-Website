# Gov Image Harvester

## Usage

```bash
# Science, 30 images max
pnpm run harvest:science -- --topics "plate tectonics, hurricanes, climate change" --limit 30

# Social Studies, 40 images max
pnpm run harvest:socstud -- --topics "new deal, supply and demand, cold war, great migration" --limit 40

# Dry run
node tools/gov-image-harvester/index.mjs --subject Science --topics "astronomy" --limit 10 --dry
```

### Notes
- Use `--topics` to bias sitemap selection toward particular themes.
- `--dry` downloads and analyzes images without writing metadata or files.
- Resume data is stored in `.crawl-state.json` to avoid duplicate downloads.
