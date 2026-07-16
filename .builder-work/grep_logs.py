import glob, os, sys
d = os.path.expanduser('~/.claude/projects/C--Users-rnsgu-MSW-ProjectAI00/b24f1376-f4bc-464d-a77e-830b0276b1f3/tool-results')
f = max(glob.glob(d+'/mcp-msw-maker-mcp-maker_logs-*.txt'), key=os.path.getmtime)
s = open(f, encoding='utf-8', errors='replace').read()
markers = sys.argv[1].split(',')
tail = int(sys.argv[2]) if len(sys.argv) > 2 else 12
out = []
for m in markers:
    idx = 0
    while True:
        idx = s.find(m, idx)
        if idx < 0: break
        e = s.find('","stackTrace', idx)
        out.append((idx, s[idx:(e if e>0 else idx+160)]))
        idx += len(m)
out.sort()
for _, line in out[-tail:]:
    print(line)
