You have access to `playwright-cli`, an AI-agent CLI for browser automation. Use it via the Bash tool. All commands return compact, token-efficient output.

## Quick Reference

### Session Lifecycle

```bash
# Open browser (starts a session)
playwright-cli open http://localhost:5173

# Close when done
playwright-cli close
```

Sessions persist between commands. You do NOT need to re-open for each action.

### Inspecting the Page

```bash
# Get a compact accessibility snapshot with element refs (e.g. s1e5)
playwright-cli snapshot

# Take a screenshot (returns image path)
playwright-cli screenshot

# Screenshot a specific element by ref
playwright-cli screenshot s1e5

# Read console logs
playwright-cli console
```

**Element refs** like `s1e5` come from `snapshot` output. Use them with `click`, `fill`, `hover`, `screenshot`, etc.

### Interacting with Elements

```bash
# Click an element by ref
playwright-cli click s1e5

# Fill a text input
playwright-cli fill s1e5 "hello world"

# Hover over an element
playwright-cli hover s1e5

# Select a dropdown option
playwright-cli select s1e5 "option-value"

# Check / uncheck
playwright-cli check s1e5
playwright-cli uncheck s1e5
```

### Navigation

```bash
playwright-cli goto https://example.com
playwright-cli go-back
playwright-cli go-forward
playwright-cli reload
```

### Viewport & Window

```bash
# Resize to specific dimensions
playwright-cli resize 1920 1080
playwright-cli resize 375 812    # iPhone-sized
```

### Scrolling

```bash
# Scroll down 500px
playwright-cli mousewheel 0 500

# Scroll up 500px
playwright-cli mousewheel 0 -500
```

### JavaScript Evaluation

```bash
# Run JS on the page
playwright-cli eval "document.title"

# Run JS on a specific element
playwright-cli eval "el => el.getBoundingClientRect()" s1e5
```

### DevTools / Performance

```bash
# List all network requests
playwright-cli network

# Start/stop tracing (for performance analysis)
playwright-cli tracing-start
playwright-cli tracing-stop

# Start/stop video recording
playwright-cli video-start
playwright-cli video-stop
```

### Tabs

```bash
playwright-cli tab-list
playwright-cli tab-new http://localhost:5173/other
playwright-cli tab-select 1
playwright-cli tab-close 1
```

### Multiple Sessions

```bash
# Use -s to run named sessions in parallel
playwright-cli -s=mobile open http://localhost:5173
playwright-cli -s=mobile resize 375 812
playwright-cli -s=desktop open http://localhost:5173
playwright-cli -s=desktop resize 1920 1080

# List all sessions
playwright-cli list
```

### Cleanup

```bash
playwright-cli close          # close current session
playwright-cli close-all      # close all sessions
playwright-cli kill-all       # force-kill zombie processes
```

## Common Workflows

### Full-page screenshot at multiple viewports
```bash
playwright-cli open http://localhost:5173
playwright-cli resize 1920 1080 && playwright-cli screenshot
playwright-cli resize 1280 720 && playwright-cli screenshot
playwright-cli resize 768 1024 && playwright-cli screenshot
playwright-cli resize 375 812 && playwright-cli screenshot
```

### Audit a specific section
```bash
playwright-cli open http://localhost:5173
playwright-cli snapshot                    # find the section's ref
playwright-cli screenshot s1e42            # screenshot just that element
playwright-cli eval "el => getComputedStyle(el).display" s1e42
```

### Check scroll performance
```bash
playwright-cli open http://localhost:5173
playwright-cli tracing-start
playwright-cli mousewheel 0 3000           # scroll down
playwright-cli mousewheel 0 -3000          # scroll back up
playwright-cli tracing-stop                # saves trace file
```
