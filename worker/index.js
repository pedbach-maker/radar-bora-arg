const page = String.raw`
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0d1727">
  <meta name="description" content="Radar BORA: explora y filtra publicaciones del Boletín Oficial de la República Argentina.">
  <title>Radar BORA · Todo bajo control</title>
  <style>
    :root {
      --ink: #0d1727;
      --ink-2: #172438;
      --muted: #697589;
      --muted-2: #9ba6b6;
      --line: #e3e8f0;
      --line-strong: #d2dbe8;
      --paper: #f5f7fb;
      --surface: #ffffff;
      --surface-soft: #f8fafc;
      --blue: #3869ef;
      --blue-dark: #2351cd;
      --blue-soft: #eaf0ff;
      --orange: #ed9b38;
      --orange-soft: #fff3de;
      --green: #16a26a;
      --green-soft: #e4f8ef;
      --red: #dc5a5a;
      --red-soft: #fdecec;
      --purple: #8461db;
      --purple-soft: #f0ebff;
      --shadow-sm: 0 8px 24px rgba(18, 34, 58, .06);
      --shadow-md: 0 18px 54px rgba(18, 34, 58, .14);
      --radius-xl: 26px;
      --radius-lg: 18px;
      --radius-md: 12px;
      --radius-sm: 9px;
    }

    * { box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      margin: 0;
      color: var(--ink);
      background: var(--paper);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    button, input, select { font: inherit; }
    button { cursor: pointer; }
    a { color: inherit; text-decoration: none; }

    .app-shell { min-height: 100vh; display: flex; }

    .sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 10;
      width: 248px;
      padding: 25px 18px 20px;
      color: #fff;
      background:
        radial-gradient(circle at 20% 10%, rgba(65, 108, 217, .42), transparent 28%),
        linear-gradient(180deg, #0d1727 0%, #101c2d 100%);
      display: flex;
      flex-direction: column;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 0 10px;
      margin-bottom: 38px;
    }

    .brand-mark {
      width: 33px;
      height: 33px;
      border-radius: 10px;
      background: linear-gradient(140deg, #85adff, #3869ef 62%, #2246b5);
      display: grid;
      place-items: center;
      box-shadow: 0 8px 20px rgba(56, 105, 239, .35);
      font-weight: 900;
      font-size: 16px;
      letter-spacing: -1px;
    }

    .brand-wordmark { line-height: 1; }
    .brand-name { font-size: 16px; font-weight: 760; letter-spacing: -.45px; }
    .brand-sub { margin-top: 4px; color: #8494ab; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; }

    .nav-label {
      padding: 0 11px;
      margin: 0 0 10px;
      color: #667891;
      font-size: 10px;
      font-weight: 740;
      letter-spacing: 1.6px;
      text-transform: uppercase;
    }

    .nav-list { display: grid; gap: 5px; }

    .nav-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid transparent;
      border-radius: 12px;
      padding: 11px 12px;
      color: #9eacc0;
      background: transparent;
      text-align: left;
      transition: .2s ease;
    }

    .nav-item:hover { color: #fff; background: rgba(255,255,255,.06); }
    .nav-item.active { color: #fff; border-color: rgba(143, 176, 255, .25); background: rgba(56, 105, 239, .23); }
    .nav-item .nav-icon { width: 20px; color: #7487a3; display: inline-flex; justify-content: center; }
    .nav-item.active .nav-icon { color: #90b1ff; }
    .nav-item .nav-count { margin-left: auto; color: #7890b8; font-size: 11px; }

    .sidebar-bottom { margin-top: auto; }

    .coverage-card {
      padding: 15px;
      margin: 18px 2px 17px;
      border: 1px solid rgba(150, 182, 255, .18);
      border-radius: 16px;
      background: rgba(64, 100, 166, .17);
    }

    .coverage-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .coverage-title { color: #c3d2eb; font-size: 11px; font-weight: 700; }
    .coverage-dot { width: 7px; height: 7px; border-radius: 50%; background: #42d998; box-shadow: 0 0 0 4px rgba(66, 217, 152, .12); }
    .coverage-copy { color: #8092ad; font-size: 11px; line-height: 1.45; }
    .coverage-bar { height: 5px; margin-top: 11px; border-radius: 5px; background: #263b5a; overflow: hidden; }
    .coverage-bar span { display: block; width: 76%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #5790ff, #54d9aa); }

    .sidebar-foot {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 0 10px;
      color: #71839d;
      font-size: 11px;
    }

    .avatar {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: #dce7ff;
      background: #2b4778;
      font-size: 10px;
      font-weight: 800;
    }

    .main {
      min-width: 0;
      width: calc(100% - 248px);
      margin-left: 248px;
      padding: 23px 39px 58px;
    }

    .topbar {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 26px;
    }

    .crumbs { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 12px; }
    .crumbs strong { color: var(--ink); font-weight: 700; }
    .crumb-sep { color: #b7c0cd; }
    .top-actions { display: flex; align-items: center; gap: 9px; }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 10px;
      border: 1px solid #d8eadd;
      border-radius: 999px;
      color: #28875f;
      background: #f3fbf6;
      font-size: 11px;
      font-weight: 700;
    }
    .status-pill span { width: 6px; height: 6px; border-radius: 50%; background: #26b877; }

    .icon-button {
      width: 35px;
      height: 35px;
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      border-radius: 10px;
      color: var(--muted);
      background: var(--surface);
      transition: .2s ease;
    }
    .icon-button:hover { color: var(--ink); border-color: var(--line-strong); box-shadow: var(--shadow-sm); }

    .hero {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 290px;
      gap: 28px;
      padding: 34px 34px 31px;
      border-radius: var(--radius-xl);
      overflow: hidden;
      color: #fff;
      background:
        radial-gradient(circle at 85% 20%, rgba(118, 164, 255, .32), transparent 30%),
        radial-gradient(circle at 58% 120%, rgba(56, 105, 239, .42), transparent 38%),
        linear-gradient(120deg, #0d182a 0%, #162a48 100%);
      box-shadow: var(--shadow-md);
    }

    .hero::after {
      content: "";
      position: absolute;
      top: -65px;
      right: 43%;
      width: 180px;
      height: 180px;
      border: 1px solid rgba(144, 178, 255, .14);
      border-radius: 50%;
      box-shadow: 0 0 0 26px rgba(144, 178, 255, .05), 0 0 0 52px rgba(144, 178, 255, .03);
      pointer-events: none;
    }

    .eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 13px; color: #9db9f8; font-size: 11px; font-weight: 760; letter-spacing: 1.6px; text-transform: uppercase; }
    .eyebrow .pulse { width: 7px; height: 7px; border-radius: 50%; background: #55d6a2; box-shadow: 0 0 0 5px rgba(85, 214, 162, .12); }
    .hero h1 { max-width: 540px; margin: 0; font-size: clamp(28px, 4vw, 47px); line-height: 1.02; letter-spacing: -2.2px; font-weight: 780; }
    .hero-copy { max-width: 540px; margin: 15px 0 24px; color: #afbdd2; font-size: 14px; line-height: 1.55; }
    .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

    .btn {
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 14px;
      border: 1px solid transparent;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 760;
      transition: .2s ease;
    }
    .btn-primary { color: #fff; background: var(--blue); box-shadow: 0 8px 18px rgba(56, 105, 239, .28); }
    .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
    .btn-light { color: #dce7ff; border-color: rgba(169, 194, 242, .26); background: rgba(255,255,255,.07); }
    .btn-light:hover { background: rgba(255,255,255,.14); }
    .btn-plain { color: var(--muted); border-color: var(--line); background: var(--surface); }
    .btn-plain:hover { color: var(--ink); border-color: var(--line-strong); }
    .btn-small { min-height: 32px; padding: 0 11px; font-size: 11px; }

    .hero-aside { position: relative; z-index: 1; align-self: stretch; display: flex; flex-direction: column; justify-content: flex-end; }
    .signal-card { padding: 16px; border: 1px solid rgba(169, 194, 242, .19); border-radius: 15px; background: rgba(255,255,255,.065); backdrop-filter: blur(10px); }
    .signal-label { display: flex; justify-content: space-between; gap: 10px; color: #9db0ce; font-size: 10px; letter-spacing: 1.3px; text-transform: uppercase; }
    .signal-value { margin: 8px 0 2px; font-size: 27px; font-weight: 770; letter-spacing: -1px; }
    .signal-foot { color: #7f95b6; font-size: 11px; }
    .signal-foot strong { color: #64d9a8; }

    .search-panel { position: relative; z-index: 2; margin: -21px 32px 0; }
    .search-box { display: flex; align-items: center; gap: 11px; padding: 6px 8px 6px 16px; border: 1px solid var(--line); border-radius: 15px; background: var(--surface); box-shadow: 0 14px 32px rgba(18, 34, 58, .10); }
    .search-icon { display: inline-flex; color: #7a8799; }
    .search-box input { min-width: 0; flex: 1; height: 37px; border: 0; outline: 0; color: var(--ink); background: transparent; font-size: 13px; }
    .search-box input::placeholder { color: #9ca7b6; }
    .search-shortcut { display: inline-flex; align-items: center; gap: 4px; color: #a1aaba; font-size: 10px; }
    .key { min-width: 21px; padding: 3px 5px; border: 1px solid var(--line); border-bottom-width: 2px; border-radius: 5px; background: #fbfcfd; font-size: 10px; text-align: center; }

    .quick-row { display: flex; gap: 8px; padding: 14px 2px 0; overflow-x: auto; scrollbar-width: none; }
    .quick-row::-webkit-scrollbar { display: none; }
    .quick-chip { flex: 0 0 auto; min-height: 29px; padding: 0 11px; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); background: var(--surface); font-size: 11px; font-weight: 700; }
    .quick-chip:hover, .quick-chip.active { color: var(--blue-dark); border-color: #b9caff; background: var(--blue-soft); }

    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; margin: 28px 0 25px; }
    .stat-card { min-width: 0; padding: 16px 17px; border: 1px solid var(--line); border-radius: var(--radius-lg); background: var(--surface); box-shadow: var(--shadow-sm); }
    .stat-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .stat-label { color: var(--muted); font-size: 11px; font-weight: 650; }
    .stat-icon { width: 25px; height: 25px; display: grid; place-items: center; border-radius: 8px; font-size: 12px; }
    .stat-icon.blue { color: var(--blue); background: var(--blue-soft); }
    .stat-icon.orange { color: #c57b19; background: var(--orange-soft); }
    .stat-icon.green { color: var(--green); background: var(--green-soft); }
    .stat-icon.purple { color: var(--purple); background: var(--purple-soft); }
    .stat-value { margin-top: 10px; font-size: 25px; font-weight: 780; letter-spacing: -1.4px; }
    .stat-note { margin-top: 3px; color: var(--muted-2); font-size: 10px; }
    .stat-note.up { color: var(--green); }

    .workspace-grid { display: grid; grid-template-columns: minmax(0, 1fr) 282px; gap: 20px; align-items: start; }
    .section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 13px; }
    .section-title { margin: 0; font-size: 19px; letter-spacing: -.65px; }
    .section-subtitle { margin: 5px 0 0; color: var(--muted); font-size: 12px; }
    .heading-actions { display: flex; align-items: center; gap: 8px; }
    .sort-select { height: 33px; padding: 0 10px; border: 1px solid var(--line); border-radius: 9px; color: var(--muted); background: var(--surface); outline: none; font-size: 11px; }

    .filter-bar { display: flex; align-items: center; gap: 8px; min-height: 39px; margin-bottom: 13px; overflow-x: auto; scrollbar-width: none; }
    .filter-bar::-webkit-scrollbar { display: none; }
    .filter-trigger { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 7px; min-height: 33px; padding: 0 11px; border: 1px solid var(--line); border-radius: 9px; color: var(--ink); background: var(--surface); font-size: 11px; font-weight: 750; }
    .filter-trigger:hover { border-color: #b4c6ef; color: var(--blue-dark); }
    .active-filter { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; min-height: 28px; padding: 0 9px; border: 1px solid #d7e1ff; border-radius: 999px; color: var(--blue-dark); background: var(--blue-soft); font-size: 10px; font-weight: 700; }
    .active-filter button { display: grid; width: 15px; height: 15px; place-items: center; padding: 0; border: 0; border-radius: 50%; color: inherit; background: transparent; }
    .active-filter button:hover { background: rgba(56, 105, 239, .12); }
    .filter-count { display: none; }

    .result-list { display: grid; gap: 10px; }
    .result-card { position: relative; padding: 19px 19px 16px; border: 1px solid var(--line); border-radius: var(--radius-lg); background: var(--surface); box-shadow: 0 5px 18px rgba(18, 34, 58, .035); transition: .2s ease; }
    .result-card:hover { border-color: #c8d5ef; box-shadow: var(--shadow-sm); transform: translateY(-1px); }
    .result-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 15px; }
    .result-kicker { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; color: var(--muted); font-size: 10px; }
    .result-type { display: inline-flex; align-items: center; min-height: 21px; padding: 0 8px; border-radius: 6px; color: var(--blue-dark); background: var(--blue-soft); font-weight: 800; letter-spacing: .15px; }
    .result-type.orange { color: #a76611; background: var(--orange-soft); }
    .result-type.green { color: #147c53; background: var(--green-soft); }
    .result-type.purple { color: #6447b2; background: var(--purple-soft); }
    .result-date { color: var(--muted-2); }
    .impact { display: inline-flex; align-items: center; gap: 5px; min-height: 22px; padding: 0 8px; border-radius: 999px; font-size: 10px; font-weight: 760; white-space: nowrap; }
    .impact::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
    .impact.high { color: var(--red); background: var(--red-soft); }
    .impact.medium { color: #b77717; background: var(--orange-soft); }
    .impact.low { color: #54806d; background: var(--green-soft); }
    .result-card h3 { margin: 12px 0 7px; max-width: 690px; font-size: 16px; line-height: 1.24; letter-spacing: -.35px; }
    .result-summary { margin: 0; max-width: 760px; color: var(--muted); font-size: 12px; line-height: 1.52; }
    .result-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 7px 14px; margin-top: 14px; color: var(--muted-2); font-size: 10px; }
    .result-meta span { display: inline-flex; align-items: center; gap: 5px; }
    .result-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 13px; }
    .tag { min-height: 21px; display: inline-flex; align-items: center; padding: 0 7px; border-radius: 6px; color: #647184; background: #f0f3f7; font-size: 10px; }
    .result-bottom { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 15px; padding-top: 13px; border-top: 1px solid #eef1f5; }
    .source-note { color: var(--muted-2); font-size: 10px; }
    .card-actions { display: flex; align-items: center; gap: 7px; }
    .text-button { border: 0; color: var(--blue); background: transparent; font-size: 11px; font-weight: 760; }
    .text-button:hover { color: var(--blue-dark); }
    .save-button { width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 8px; color: #8895a5; background: var(--surface); }
    .save-button.saved { color: var(--orange); border-color: #f4d49e; background: var(--orange-soft); }
    .save-button:hover { border-color: #b8c8e6; color: var(--blue); }

    .side-column { display: grid; gap: 14px; }
    .side-card { padding: 18px; border: 1px solid var(--line); border-radius: var(--radius-lg); background: var(--surface); box-shadow: var(--shadow-sm); }
    .side-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 16px; }
    .side-card h3 { margin: 0; font-size: 14px; letter-spacing: -.25px; }
    .side-card-sub { margin: 4px 0 0; color: var(--muted); font-size: 10px; line-height: 1.4; }
    .link-button { border: 0; padding: 0; color: var(--blue); background: transparent; font-size: 10px; font-weight: 760; }
    .radar-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid #eef1f5; }
    .radar-row:first-child { padding-top: 0; border-top: 0; }
    .radar-bullet { width: 26px; height: 26px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 8px; color: var(--blue); background: var(--blue-soft); font-size: 12px; }
    .radar-row-copy { min-width: 0; flex: 1; }
    .radar-row-title { display: block; overflow: hidden; color: var(--ink); font-size: 11px; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }
    .radar-row-note { display: block; margin-top: 3px; overflow: hidden; color: var(--muted-2); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
    .radar-row-value { color: var(--muted); font-size: 10px; font-weight: 740; }
    .alert-item { display: flex; align-items: flex-start; gap: 9px; padding: 11px 0; border-top: 1px solid #eef1f5; }
    .alert-item:first-child { padding-top: 0; border-top: 0; }
    .alert-dot { width: 7px; height: 7px; flex: 0 0 auto; margin-top: 4px; border-radius: 50%; background: var(--orange); box-shadow: 0 0 0 4px var(--orange-soft); }
    .alert-copy { min-width: 0; }
    .alert-title { display: block; color: var(--ink); font-size: 11px; font-weight: 740; }
    .alert-note { display: block; margin-top: 3px; color: var(--muted-2); font-size: 10px; line-height: 1.35; }
    .empty-state { padding: 35px 20px; border: 1px dashed #cbd6e5; border-radius: var(--radius-lg); color: var(--muted); background: rgba(255,255,255,.58); text-align: center; }
    .empty-icon { width: 40px; height: 40px; display: grid; place-items: center; margin: 0 auto 11px; border-radius: 12px; color: var(--blue); background: var(--blue-soft); font-size: 18px; }
    .empty-state h3 { margin: 0 0 5px; color: var(--ink); font-size: 14px; }
    .empty-state p { margin: 0 0 15px; font-size: 11px; }

    .disclaimer { display: flex; align-items: flex-start; gap: 10px; margin-top: 22px; padding: 12px 14px; border: 1px solid #f2dec0; border-radius: 12px; color: #856b49; background: #fffaf0; font-size: 10px; line-height: 1.45; }
    .disclaimer strong { color: #6e5639; }
    .disclaimer .info-icon { color: #d18b31; font-weight: 900; }

    .mobile-nav { display: none; }

    .overlay { position: fixed; inset: 0; z-index: 50; display: none; background: rgba(10, 19, 33, .44); backdrop-filter: blur(3px); }
    .overlay.open { display: block; }
    .drawer { position: absolute; top: 0; right: 0; bottom: 0; width: min(430px, 100%); padding: 23px 21px 28px; overflow-y: auto; background: var(--surface); box-shadow: -20px 0 60px rgba(10, 19, 33, .18); animation: slide-in .22s ease-out; }
    @keyframes slide-in { from { transform: translateX(25px); opacity: .4; } to { transform: translateX(0); opacity: 1; } }
    .drawer-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 15px; margin-bottom: 24px; }
    .drawer-eyebrow { margin-bottom: 7px; color: var(--blue); font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
    .drawer h2 { margin: 0; font-size: 22px; line-height: 1.1; letter-spacing: -.7px; }
    .drawer-close { width: 32px; height: 32px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 9px; color: var(--muted); background: var(--surface); }
    .drawer-close:hover { color: var(--ink); background: var(--surface-soft); }
    .filter-section { padding: 17px 0; border-top: 1px solid var(--line); }
    .filter-section:first-of-type { padding-top: 0; border-top: 0; }
    .filter-section-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 11px; color: var(--ink); font-size: 11px; font-weight: 800; }
    .filter-section-title span { color: var(--muted-2); font-size: 10px; font-weight: 600; }
    .filter-options { display: grid; gap: 7px; }
    .check-row { display: flex; align-items: center; gap: 9px; min-height: 27px; color: var(--muted); font-size: 11px; cursor: pointer; }
    .check-row:hover { color: var(--ink); }
    .check-row input { width: 15px; height: 15px; margin: 0; accent-color: var(--blue); }
    .check-row .option-count { margin-left: auto; color: #a5aebc; font-size: 10px; }
    .date-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
    .field-label { display: grid; gap: 5px; color: var(--muted); font-size: 10px; font-weight: 680; }
    .field-label input, .field-label select { width: 100%; height: 34px; padding: 0 9px; border: 1px solid var(--line); border-radius: 8px; color: var(--ink); background: var(--surface-soft); outline: none; font-size: 11px; }
    .field-label input:focus, .field-label select:focus { border-color: #9db7f8; box-shadow: 0 0 0 3px var(--blue-soft); }
    .drawer-footer { position: sticky; bottom: -28px; display: flex; gap: 9px; padding: 15px 0 3px; background: linear-gradient(180deg, rgba(255,255,255,0), var(--surface) 28%); }
    .drawer-footer .btn { flex: 1; }

    .detail-drawer { width: min(580px, 100%); }
    .detail-meta { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 13px; }
    .detail-section { padding: 19px 0; border-top: 1px solid var(--line); }
    .detail-section:first-of-type { margin-top: 24px; }
    .detail-section h3 { margin: 0 0 10px; font-size: 12px; }
    .detail-section p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.6; }
    .detail-list { display: grid; gap: 9px; padding: 0; margin: 0; list-style: none; }
    .detail-list li { position: relative; padding-left: 16px; color: var(--muted); font-size: 12px; line-height: 1.45; }
    .detail-list li::before { content: ""; position: absolute; top: .55em; left: 0; width: 6px; height: 6px; border-radius: 50%; background: var(--blue); }
    .detail-source { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 20px; padding: 12px; border: 1px solid var(--line); border-radius: 11px; background: var(--surface-soft); }
    .detail-source-copy { color: var(--muted); font-size: 10px; line-height: 1.4; }
    .detail-source-copy strong { display: block; color: var(--ink); font-size: 11px; }

    .toast { position: fixed; right: 25px; bottom: 25px; z-index: 80; display: flex; align-items: center; gap: 9px; max-width: min(360px, calc(100vw - 40px)); padding: 12px 15px; border: 1px solid #c9d5eb; border-radius: 12px; color: var(--ink); background: #fff; box-shadow: var(--shadow-md); font-size: 11px; font-weight: 650; transform: translateY(20px); opacity: 0; pointer-events: none; transition: .25s ease; }
    .toast.show { transform: translateY(0); opacity: 1; }
    .toast-icon { color: var(--green); }

    @media (max-width: 1120px) {
      .main { padding-right: 25px; padding-left: 25px; }
      .hero { grid-template-columns: minmax(0, 1fr) 250px; }
      .stats { gap: 9px; }
      .stat-card { padding-right: 13px; padding-left: 13px; }
    }

    @media (max-width: 930px) {
      .sidebar { width: 218px; }
      .main { width: calc(100% - 218px); margin-left: 218px; padding-right: 20px; padding-left: 20px; }
      .workspace-grid { grid-template-columns: 1fr; }
      .side-column { display: grid; grid-template-columns: 1fr 1fr; }
      .hero { grid-template-columns: 1fr; }
      .hero-aside { max-width: 290px; }
    }

    @media (max-width: 720px) {
      body { padding-bottom: 70px; }
      .sidebar { display: none; }
      .main { width: 100%; margin-left: 0; padding: 17px 14px 36px; }
      .topbar { margin-bottom: 17px; }
      .crumbs { font-size: 11px; }
      .top-actions .status-pill { display: inline-flex; font-size: 9px; padding: 6px 8px; }
      .hero { padding: 26px 22px 23px; border-radius: 21px; }
      .hero h1 { font-size: 32px; letter-spacing: -1.55px; }
      .hero-copy { font-size: 13px; }
      .hero-aside { max-width: none; }
      .search-panel { margin: -17px 12px 0; }
      .search-box { padding-left: 13px; }
      .search-shortcut { display: none; }
      .stats { grid-template-columns: repeat(2, 1fr); margin-top: 21px; }
      .stat-card { padding: 13px 14px; }
      .stat-value { font-size: 22px; }
      .section-heading { align-items: flex-start; flex-direction: column; gap: 11px; }
      .heading-actions { width: 100%; }
      .heading-actions .sort-select { flex: 1; }
      .filter-bar { margin-bottom: 10px; }
      .filter-count { display: inline-flex; min-width: 18px; height: 18px; align-items: center; justify-content: center; border-radius: 999px; color: #fff; background: var(--blue); font-size: 9px; }
      .side-column { grid-template-columns: 1fr; }
      .result-card { padding: 16px 15px 14px; }
      .result-card h3 { font-size: 15px; }
      .result-bottom { align-items: flex-end; }
      .source-note { max-width: 48%; line-height: 1.35; }
      .mobile-nav { position: fixed; inset: auto 0 0; z-index: 20; display: grid; grid-template-columns: repeat(3, 1fr); padding: 8px 10px calc(8px + env(safe-area-inset-bottom)); border-top: 1px solid var(--line); background: rgba(255,255,255,.94); backdrop-filter: blur(14px); }
      .mobile-nav button { display: grid; gap: 4px; place-items: center; padding: 3px; border: 0; color: #8b96a5; background: transparent; font-size: 9px; font-weight: 700; }
      .mobile-nav button.active { color: var(--blue); }
      .mobile-nav .mobile-icon { font-size: 16px; line-height: 1; }
      .toast { right: 15px; bottom: 83px; }
    }

    @media (max-width: 430px) {
      .hero h1 { max-width: 300px; font-size: 29px; }
      .hero-actions .btn { flex: 1; }
      .stats { gap: 8px; }
      .stat-card { border-radius: 14px; }
      .result-top { gap: 8px; }
      .impact { padding: 0 6px; font-size: 9px; }
      .result-kicker { gap: 5px; }
      .result-bottom { gap: 8px; }
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar" aria-label="Navegación principal">
      <div class="brand">
        <div class="brand-mark">R</div>
        <div class="brand-wordmark">
          <div class="brand-name">Radar BORA</div>
          <div class="brand-sub">Seguimiento normativo</div>
        </div>
      </div>

      <div class="nav-label">Espacio de trabajo</div>
      <nav class="nav-list">
        <button class="nav-item active" data-nav="radar"><span class="nav-icon">◈</span><span>Radar</span></button>
        <button class="nav-item" data-nav="search"><span class="nav-icon">⌕</span><span>Búsqueda avanzada</span></button>
        <button class="nav-item" data-nav="saved"><span class="nav-icon">☆</span><span>Guardados</span><span class="nav-count" id="savedCount">0</span></button>
      </nav>

      <div class="sidebar-bottom">
        <div class="coverage-card">
          <div class="coverage-head"><span class="coverage-title">Alcance del radar</span><span class="coverage-dot"></span></div>
          <div class="coverage-copy">Leyes, decretos y normativa administrativa de la Primera Sección.</div>
          <div class="coverage-bar"><span></span></div>
        </div>
        <div class="sidebar-foot"><span class="avatar">DC</span><span>Cuenta personal</span></div>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="crumbs"><span>Inicio</span><span class="crumb-sep">/</span><strong>Radar BORA</strong></div>
        <div class="top-actions">
          <div class="status-pill" id="syncStatus"><span></span>Fuente oficial · sincronización pendiente</div>
          <button class="icon-button" id="helpBtn" aria-label="Ayuda">?</button>
        </div>
      </header>

      <section class="hero" aria-labelledby="heroTitle">
        <div>
          <div class="eyebrow"><span class="pulse"></span>Tu radar normativo</div>
          <h1 id="heroTitle">Todo lo importante del BORA, en una sola mirada.</h1>
          <p class="hero-copy">Buscá, filtrá y guardá leyes, decretos y normas administrativas nuevas sin mezclar avisos societarios ni contrataciones.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" id="openFilters">Abrir filtros <span>→</span></button>
            <a class="btn btn-light" href="https://www.boletinoficial.gob.ar/" target="_blank" rel="noopener">Abrir BORA <span>↗</span></a>
          </div>
        </div>
        <div class="hero-aside">
          <div class="signal-card">
            <div class="signal-label"><span>Alcance del radar</span><span>Primera sección</span></div>
            <div class="signal-value">Solo normativa</div>
            <div class="signal-foot">Leyes, decretos y actos administrativos nuevos</div>
          </div>
        </div>
      </section>

      <section class="search-panel" aria-label="Buscar publicaciones">
        <div class="search-box">
          <span class="search-icon">⌕</span>
          <input id="searchInput" type="search" placeholder="Buscá por palabra, organismo, número o tema…" autocomplete="off">
          <span class="search-shortcut"><span class="key">/</span> para buscar</span>
          <button class="btn btn-primary btn-small" id="searchButton">Buscar</button>
        </div>
        <div class="quick-row" aria-label="Filtros rápidos">
          <button class="quick-chip" data-quick="today">Hoy</button>
          <button class="quick-chip active" data-quick="week">Últimos 7 días</button>
          <button class="quick-chip" data-quick="high">Impacto alto</button>
          <button class="quick-chip" data-quick="normas">Normas</button>
          <button class="quick-chip" data-quick="all">Ver todo</button>
        </div>
      </section>

      <section class="stats" aria-label="Resumen">
        <article class="stat-card">
          <div class="stat-top"><span class="stat-label">Normas visibles</span><span class="stat-icon blue">◈</span></div>
          <div class="stat-value" id="statVisible">0</div>
          <div class="stat-note up">en el alcance normativo</div>
        </article>
        <article class="stat-card">
          <div class="stat-top"><span class="stat-label">Impacto alto</span><span class="stat-icon orange">!</span></div>
          <div class="stat-value" id="statHigh">0</div>
          <div class="stat-note">para revisar primero</div>
        </article>
        <article class="stat-card">
          <div class="stat-top"><span class="stat-label">Organismos</span><span class="stat-icon green">◎</span></div>
          <div class="stat-value" id="statOrgs">0</div>
          <div class="stat-note">en las normas visibles</div>
        </article>
        <article class="stat-card">
          <div class="stat-top"><span class="stat-label">Seguimientos</span><span class="stat-icon purple">☆</span></div>
          <div class="stat-value" id="statSaved">0</div>
          <div class="stat-note">guardados por vos</div>
        </article>
      </section>

      <div class="workspace-grid">
        <section aria-labelledby="resultsTitle">
          <div class="section-heading">
            <div>
              <h2 class="section-title" id="resultsTitle">Lo que está pasando</h2>
              <p class="section-subtitle"><span id="resultCount">0</span> normas ordenadas por relevancia</p>
            </div>
            <div class="heading-actions">
              <select class="sort-select" id="sortSelect" aria-label="Ordenar resultados">
                <option value="relevance">Más relevantes</option>
                <option value="newest">Más recientes</option>
                <option value="impact">Mayor impacto</option>
              </select>
              <button class="btn btn-plain btn-small" id="exportBtn">↓ Exportar</button>
            </div>
          </div>

          <div class="filter-bar" id="activeFilters">
            <button class="filter-trigger" id="filterTrigger"><span>☷</span> Filtros <span class="filter-count" id="filterCount">0</span></button>
          </div>

          <div class="result-list" id="resultList"></div>

          <div class="disclaimer"><span class="info-icon">ⓘ</span><span><strong>Alcance:</strong> se muestran únicamente normas nuevas de la Primera Sección del BORA —leyes, decretos, resoluciones, disposiciones y actos administrativos afines—. Se excluyen avisos societarios, judiciales y contrataciones. Cada ficha conserva el enlace a la publicación oficial.</span></div>
        </section>

        <aside class="side-column" aria-label="Mi radar">
          <section class="side-card">
            <div class="side-card-head">
              <div><h3>Mis seguimientos normativos</h3><p class="side-card-sub">Lo que elegiste mirar más de cerca</p></div>
              <button class="link-button" id="viewSaved">Ver todos</button>
            </div>
            <div id="followings"></div>
          </section>
          <section class="side-card">
            <div class="side-card-head">
              <div><h3>Fuente oficial</h3><p class="side-card-sub">Verificá siempre el texto íntegro y sus anexos</p></div>
              <a class="link-button" href="https://www.boletinoficial.gob.ar/" target="_blank" rel="noopener">Ir al BORA ↗</a>
            </div>
            <div class="alert-item"><span class="alert-dot"></span><div class="alert-copy"><span class="alert-title">Actualización diaria</span><span class="alert-note">La fecha de sincronización aparece arriba.</span></div></div>
          </section>
        </aside>
      </div>
    </main>
  </div>

  <nav class="mobile-nav" aria-label="Navegación móvil">
    <button class="active" data-nav="radar"><span class="mobile-icon">◈</span><span>Radar</span></button>
    <button data-nav="search"><span class="mobile-icon">⌕</span><span>Buscar</span></button>
    <button data-nav="saved"><span class="mobile-icon">☆</span><span>Guardados</span></button>
  </nav>

  <div class="overlay" id="filterOverlay" role="dialog" aria-modal="true" aria-labelledby="filterTitle">
    <div class="drawer">
      <div class="drawer-head">
        <div><div class="drawer-eyebrow">Búsqueda precisa</div><h2 id="filterTitle">Filtrar publicaciones</h2></div>
        <button class="drawer-close" data-close="filterOverlay" aria-label="Cerrar filtros">×</button>
      </div>
      <form id="filterForm">
        <div class="filter-section">
          <div class="filter-section-title">Fecha de publicación <span>rango</span></div>
          <div class="date-grid">
            <label class="field-label">Desde<input type="date" id="fromDate"></label>
            <label class="field-label">Hasta<input type="date" id="toDate"></label>
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-section-title">Tipo de norma <span>podés combinar</span></div>
          <div class="filter-options" id="typeOptions">
            <label class="check-row"><input type="checkbox" name="type" value="Ley"><span>Ley</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Decreto"><span>Decreto</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Resolución"><span>Resolución</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Resolución General"><span>Resolución general</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Resolución Conjunta"><span>Resolución conjunta</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Resolución Sintetizada"><span>Resolución sintetizada</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Disposición"><span>Disposición</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Disposición Sintetizada"><span>Disposición sintetizada</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Decisión Administrativa"><span>Decisión administrativa</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Circular"><span>Circular</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Comunicación"><span>Comunicación</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="type" value="Acordada"><span>Acordada</span><span class="option-count">—</span></label>
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-section-title">Organismo</div>
          <div class="filter-options" id="orgOptions"><span class="side-card-sub">Se completa con los organismos publicados.</span></div>
        </div>
        <div class="filter-section">
          <div class="filter-section-title">Impacto <span>priorización editorial</span></div>
          <div class="filter-options">
            <label class="check-row"><input type="checkbox" name="impact" value="Alto"><span>Alto · revisar primero</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="impact" value="Medio"><span>Medio · puede afectar procesos</span><span class="option-count">—</span></label>
            <label class="check-row"><input type="checkbox" name="impact" value="Bajo"><span>Bajo · informativo</span><span class="option-count">—</span></label>
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-section-title">Tema</div>
          <div class="filter-options">
            <label class="check-row"><input type="checkbox" name="topic" value="Agro"><span>Agro y ganadería</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Finanzas"><span>Finanzas y pagos</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Trabajo"><span>Trabajo y seguridad social</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Comercio"><span>Comercio y producción</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Salud"><span>Salud y sanidad</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Tecnología"><span>Estado y tecnología</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Energía"><span>Energía</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Estado"><span>Estado</span></label>
            <label class="check-row"><input type="checkbox" name="topic" value="Normativa"><span>Otros temas</span></label>
          </div>
        </div>
        <div class="drawer-footer">
          <button type="button" class="btn btn-plain" id="clearFilters">Limpiar</button>
          <button type="button" class="btn btn-primary" id="applyFilters">Aplicar filtros</button>
        </div>
      </form>
    </div>
  </div>

  <div class="overlay" id="detailOverlay" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
    <div class="drawer detail-drawer">
      <div class="drawer-head">
        <div><div class="drawer-eyebrow" id="detailKicker">Publicación</div><h2 id="detailTitle">Detalle</h2><div class="detail-meta" id="detailMeta"></div></div>
        <button class="drawer-close" data-close="detailOverlay" aria-label="Cerrar ficha">×</button>
      </div>
      <div id="detailBody"></div>
    </div>
  </div>

  <div class="toast" id="toast"><span class="toast-icon">✓</span><span id="toastMessage">Listo</span></div>

  <script>
    const TODAY = new Intl.DateTimeFormat("en-CA", {timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit"}).format(new Date());

    let PUBLICATIONS = [];
    let FEED_STATE = "loading";
    const state = {
      query: "",
      sections: [],
      types: [],
      orgs: [],
      impacts: [],
      topics: [],
      from: "",
      to: "",
      sort: "relevance",
      quick: "week",
      view: "all",
      saved: JSON.parse(localStorage.getItem("radar-bora-saved") || "[]")
    };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, function(char) {
        return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[char];
      });
    }

    function formatDate(value) {
      return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value + "T12:00:00")).replace(".", "");
    }

    function typeClass(type) {
      if (type === "Decreto" || type === "Licitación") return "orange";
      if (type === "Disposición" || type === "Aviso") return "purple";
      if (type === "Decisión Administrativa") return "green";
      return "";
    }

    function impactClass(impact) {
      return impact === "Alto" ? "high" : impact === "Medio" ? "medium" : "low";
    }

    function iconFor(type) {
      if (type === "Licitación") return "▣";
      if (type === "Aviso") return "◌";
      if (type === "Decreto") return "◆";
      return "✦";
    }

    function getSelected(name) {
      return $$('input[name="' + name + '"]:checked').map(function(input) { return input.value; });
    }

    function saveState() {
      localStorage.setItem("radar-bora-filters", JSON.stringify({
        query: state.query, types: state.types, orgs: state.orgs,
        impacts: state.impacts, topics: state.topics, from: state.from, to: state.to, sort: state.sort
      }));
      localStorage.setItem("radar-bora-saved", JSON.stringify(state.saved));
    }

    function loadState() {
      try {
        const savedFilters = JSON.parse(localStorage.getItem("radar-bora-filters") || "null");
        if (savedFilters) Object.assign(state, savedFilters, { quick: "all" });
      } catch (error) {}
      state.sections = [];
      $("#searchInput").value = state.query || "";
      $("#fromDate").value = state.from || "";
      $("#toDate").value = state.to || "";
      $("#sortSelect").value = state.sort || "relevance";
      ["section", "type", "org", "impact", "topic"].forEach(function(name) {
        const values = state[name === "section" ? "sections" : name === "type" ? "types" : name === "org" ? "orgs" : name === "impact" ? "impacts" : "topics"];
        $$('input[name="' + name + '"]').forEach(function(input) { input.checked = values.includes(input.value); });
      });
    }

    function matchesQuery(item, query) {
      const trimmed = query.trim();
      if (!trimmed) return true;
      const phraseMatch = trimmed.match(/^"(.+)"$/);
      const needle = (phraseMatch ? phraseMatch[1] : trimmed).toLocaleLowerCase("es");
      const haystack = [item.title, item.summary, item.organization, item.type, item.number, item.section, item.topics.join(" "), item.keywords].join(" ").toLocaleLowerCase("es");
      if (phraseMatch) return haystack.includes(needle);
      return needle.split(/\s+/).every(function(word) { return haystack.includes(word); });
    }

    function filteredItems() {
      let items = PUBLICATIONS.filter(function(item) {
        const itemDate = item.date;
        const matchesDate = (!state.from || itemDate >= state.from) && (!state.to || itemDate <= state.to);
        const matchesSection = !state.sections.length || state.sections.includes(item.section);
        const matchesType = !state.types.length || state.types.includes(item.type);
        const matchesOrg = !state.orgs.length || state.orgs.includes(item.organization);
        const matchesImpact = !state.impacts.length || state.impacts.includes(item.impact);
        const matchesTopic = !state.topics.length || item.topics.some(function(topic) { return state.topics.includes(topic); });
        const matchesSaved = state.view !== "saved" || state.saved.includes(item.id);
        const matchesQuick = state.quick === "today" ? item.date === TODAY :
          state.quick === "week" ? item.date >= new Date(new Date(TODAY + "T12:00:00Z").getTime() - 6 * 86400000).toISOString().slice(0, 10) :
          state.quick === "high" ? item.impact === "Alto" :
          state.quick === "normas" ? ["Ley", "Decreto", "Resolución", "Resolución General", "Resolución Conjunta", "Resolución Sintetizada", "Disposición", "Disposición Sintetizada", "Decisión Administrativa", "Circular", "Comunicación", "Acordada"].includes(item.type) : true;
        return matchesQuery(item, state.query) && matchesDate && matchesSection && matchesType && matchesOrg && matchesImpact && matchesTopic && matchesSaved && matchesQuick;
      });
      if (state.sort === "newest") items.sort(function(a,b) { return b.date.localeCompare(a.date); });
      if (state.sort === "impact") items.sort(function(a,b) { return ["Alto","Medio","Bajo"].indexOf(a.impact) - ["Alto","Medio","Bajo"].indexOf(b.impact); });
      return items;
    }

    function renderStats(items) {
      $("#statVisible").textContent = items.length;
      $("#statHigh").textContent = items.filter(function(item) { return item.impact === "Alto"; }).length;
      $("#statOrgs").textContent = new Set(items.map(function(item) { return item.organization; })).size;
      $("#statSaved").textContent = state.saved.length;
      $("#savedCount").textContent = state.saved.length;
      $("#resultCount").textContent = items.length;
    }

    function renderResults(items) {
      const list = $("#resultList");
      if (!items.length) {
        if (!PUBLICATIONS.length && FEED_STATE !== "ok") {
          const title = FEED_STATE === "loading" ? "Cargando la edición oficial…" : "No hay datos oficiales disponibles";
          const message = FEED_STATE === "loading" ? "Estamos consultando el BORA." : "La última consulta no pudo completarse. Podés abrir el Boletín Oficial y verificar la edición.";
          list.innerHTML = '<div class="empty-state"><div class="empty-icon">⌕</div><h3>' + title + '</h3><p>' + message + '</p><a class="btn btn-plain btn-small" href="https://www.boletinoficial.gob.ar/" target="_blank" rel="noopener">Abrir BORA ↗</a></div>';
          return;
        }
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">⌕</div><h3>No encontramos publicaciones con esos filtros</h3><p>Probá ampliar la fecha, quitar un filtro o buscar por una sola palabra.</p><button class="btn btn-plain btn-small" id="emptyClear">Limpiar filtros</button></div>';
        $("#emptyClear").addEventListener("click", clearAll);
        return;
      }
      list.innerHTML = items.map(function(item) {
        const saved = state.saved.includes(item.id);
        return '<article class="result-card" data-id="' + item.id + '">' +
          '<div class="result-top"><div class="result-kicker"><span class="result-type ' + typeClass(item.type) + '">' + escapeHtml(item.type) + ' ' + escapeHtml(item.number) + '</span><span class="result-date">' + escapeHtml(item.section) + ' · ' + escapeHtml(formatDate(item.date)) + '</span></div><span class="impact ' + impactClass(item.impact) + '">' + escapeHtml(item.impact) + '</span></div>' +
          '<h3>' + escapeHtml(item.title) + '</h3>' +
          '<p class="result-summary">' + escapeHtml(item.summary) + '</p>' +
          '<div class="result-meta"><span>◎ ' + escapeHtml(item.organization) + '</span><span>▤ Págs. ' + escapeHtml(item.pages) + '</span><span>✦ ' + escapeHtml(item.status) + '</span></div>' +
          '<div class="result-tags">' + item.topics.map(function(topic) { return '<span class="tag">' + escapeHtml(topic) + '</span>'; }).join("") + '</div>' +
          '<div class="result-bottom"><span class="source-note">Fuente: BORA · ' + escapeHtml(formatDate(item.date)) + '</span><div class="card-actions"><button class="save-button ' + (saved ? "saved" : "") + '" data-save="' + item.id + '" aria-label="' + (saved ? "Quitar de guardados" : "Guardar publicación") + '">' + (saved ? "★" : "☆") + '</button><button class="text-button" data-detail="' + item.id + '">Ver ficha →</button></div></div>' +
          '</article>';
      }).join("");

      $$("[data-detail]").forEach(function(button) {
        button.addEventListener("click", function(event) {
          event.stopPropagation();
          openDetail(button.dataset.detail);
        });
      });
      $$("[data-save]").forEach(function(button) {
        button.addEventListener("click", function(event) {
          event.stopPropagation();
          toggleSaved(button.dataset.save);
        });
      });
      $$(".result-card").forEach(function(card) {
        card.addEventListener("click", function() { openDetail(card.dataset.id); });
      });
    }

    function renderFollowings() {
      const container = $("#followings");
      const savedItems = PUBLICATIONS.filter(function(item) { return state.saved.includes(item.id); }).slice(0, 3);
      if (!savedItems.length) {
        container.innerHTML = '<div class="radar-row"><span class="radar-bullet">☆</span><div class="radar-row-copy"><span class="radar-row-title">Todavía no guardaste nada</span><span class="radar-row-note">Usá la estrella de una publicación</span></div></div>';
        return;
      }
      container.innerHTML = savedItems.map(function(item) {
        return '<div class="radar-row"><span class="radar-bullet">' + iconFor(item.type) + '</span><div class="radar-row-copy"><span class="radar-row-title">' + escapeHtml(item.title) + '</span><span class="radar-row-note">' + escapeHtml(item.type) + ' · ' + escapeHtml(item.organization) + '</span></div><span class="radar-row-value">' + escapeHtml(item.impact) + '</span></div>';
      }).join("");
    }

    function activeFilters() {
      const chips = [];
      if (state.query) chips.push({key: "query", label: '"' + state.query + '"'});
      if (state.from || state.to) chips.push({key: "date", label: (state.from || "…") + " → " + (state.to || "…")});
      state.sections.forEach(function(value) { chips.push({key: "section:" + value, label: value + " sección"}); });
      state.types.forEach(function(value) { chips.push({key: "type:" + value, label: value}); });
      state.orgs.forEach(function(value) { chips.push({key: "org:" + value, label: value}); });
      state.impacts.forEach(function(value) { chips.push({key: "impact:" + value, label: "Impacto " + value.toLowerCase()}); });
      state.topics.forEach(function(value) { chips.push({key: "topic:" + value, label: value}); });
      return chips;
    }

    function renderActiveFilters() {
      const container = $("#activeFilters");
      const chips = activeFilters();
      container.innerHTML = '<button class="filter-trigger" id="filterTrigger"><span>☷</span> Filtros <span class="filter-count" id="filterCount">' + chips.length + '</span></button>' +
        chips.map(function(chip) { return '<span class="active-filter">' + escapeHtml(chip.label) + '<button data-remove="' + escapeHtml(chip.key) + '" aria-label="Quitar filtro">×</button></span>'; }).join("");
      $("#filterTrigger").addEventListener("click", openFilters);
      $$("[data-remove]").forEach(function(button) {
        button.addEventListener("click", function() { removeFilter(button.dataset.remove); });
      });
    }

    function syncStateFromForm() {
      state.sections = [];
      state.types = getSelected("type");
      state.orgs = getSelected("org");
      state.impacts = getSelected("impact");
      state.topics = getSelected("topic");
      state.from = $("#fromDate").value;
      state.to = $("#toDate").value;
    }

    function render() {
      const items = filteredItems();
      renderStats(items);
      renderResults(items);
      renderActiveFilters();
      renderFollowings();
      saveState();
    }

    function refreshFilterOptions() {
      const organizations = Array.from(new Set(PUBLICATIONS.map(function(item) { return item.organization; }))).sort(function(a, b) { return a.localeCompare(b, "es"); });
      $("#orgOptions").innerHTML = organizations.length ? organizations.map(function(org) {
        return '<label class="check-row"><input type="checkbox" name="org" value="' + escapeHtml(org) + '"' + (state.orgs.includes(org) ? " checked" : "") + '><span>' + escapeHtml(org) + '</span></label>';
      }).join("") : '<span class="side-card-sub">Todavía no hay organismos cargados.</span>';
      $$('input[name="type"], input[name="impact"]').forEach(function(input) {
        const count = PUBLICATIONS.filter(function(item) { return item[input.name === "type" ? "type" : "impact"] === input.value; }).length;
        const counter = input.closest(".check-row").querySelector(".option-count");
        if (counter) counter.textContent = count;
      });
    }

    function setSyncStatus(message, tone) {
      const status = $("#syncStatus");
      if (!status) return;
      status.innerHTML = '<span></span>' + escapeHtml(message);
      status.dataset.tone = tone || "ok";
    }

    async function loadLiveFeed() {
      try {
        const response = await fetch("/api/feed", { cache: "no-store" });
        if (!response.ok) throw new Error("feed unavailable");
        const payload = await response.json();
        FEED_STATE = payload.syncStatus === "ok" ? "ok" : "error";
        PUBLICATIONS = Array.isArray(payload.items) ? payload.items.filter(function(item) {
          return item.section === "Primera" && ["Ley", "Decreto", "Resolución", "Resolución General", "Resolución Conjunta", "Resolución Sintetizada", "Disposición", "Disposición Sintetizada", "Decisión Administrativa", "Circular", "Comunicación", "Acordada"].includes(item.type);
        }) : [];
        refreshFilterOptions();
        render();
        const synced = payload.lastSyncedAt ? new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(payload.lastSyncedAt)).replace(".", "") : "sin actualización";
        setSyncStatus(payload.syncStatus === "ok" ? "BORA · actualizado " + synced : "BORA · última carga " + synced, payload.syncStatus === "ok" ? "ok" : "warn");
      } catch (error) {
        FEED_STATE = "error";
        render();
        setSyncStatus("BORA · conexión pendiente", "warn");
      }
    }

    function showToast(message) {
      $("#toastMessage").textContent = message;
      $("#toast").classList.add("show");
      clearTimeout(showToast.timeout);
      showToast.timeout = setTimeout(function() { $("#toast").classList.remove("show"); }, 2800);
    }

    function openOverlay(id) { $("#" + id).classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeOverlay(id) { $("#" + id).classList.remove("open"); document.body.style.overflow = ""; }
    function openFilters() { openOverlay("filterOverlay"); }

    function clearAll() {
      state.query = ""; state.sections = []; state.types = []; state.orgs = []; state.impacts = []; state.topics = []; state.from = ""; state.to = ""; state.quick = "all"; state.view = "all";
      $("#searchInput").value = "";
      $("#fromDate").value = ""; $("#toDate").value = "";
      $$('input[type="checkbox"]').forEach(function(input) { input.checked = false; });
      $$(".quick-chip").forEach(function(button) { button.classList.toggle("active", button.dataset.quick === "all"); });
      render();
      showToast("Filtros limpiados");
    }

    function removeFilter(key) {
      if (key === "query") { state.query = ""; $("#searchInput").value = ""; }
      else if (key === "date") { state.from = ""; state.to = ""; $("#fromDate").value = ""; $("#toDate").value = ""; }
      else {
        const parts = key.split(":");
        const mapping = {section: "sections", type: "types", org: "orgs", impact: "impacts", topic: "topics"};
        const target = mapping[parts[0]];
        state[target] = state[target].filter(function(value) { return value !== parts.slice(1).join(":"); });
        $$('input[name="' + parts[0] + '"]').forEach(function(input) { if (input.value === parts.slice(1).join(":")) input.checked = false; });
      }
      state.quick = "all"; state.view = "all";
      $$(".quick-chip").forEach(function(button) { button.classList.toggle("active", button.dataset.quick === "all"); });
      render();
    }

    function toggleSaved(id) {
      if (state.saved.includes(id)) {
        state.saved = state.saved.filter(function(item) { return item !== id; });
        showToast("Quitado de Guardados");
      } else {
        state.saved.push(id);
        showToast("Guardado en tu radar");
      }
      render();
    }

    function openDetail(id) {
      const item = PUBLICATIONS.find(function(publication) { return publication.id === id; });
      if (!item) return;
      $("#detailKicker").textContent = item.type + " " + item.number + " · " + item.section + " sección";
      $("#detailTitle").textContent = item.title;
      $("#detailMeta").innerHTML = '<span class="result-type ' + typeClass(item.type) + '">' + escapeHtml(item.impact) + ' impacto</span><span class="tag">' + escapeHtml(item.organization) + '</span><span class="tag">' + escapeHtml(formatDate(item.date)) + '</span>';
      $("#detailBody").innerHTML =
        '<section class="detail-section"><h3>Vista previa de la publicación</h3><p>' + escapeHtml(item.summary) + '</p></section>' +
        '<section class="detail-section"><h3>Referencia publicada</h3><p>' + escapeHtml(item.body) + '</p></section>' +
        '<div class="detail-source"><div class="detail-source-copy"><strong>Texto oficial</strong>La ficha debe verificarse siempre contra la publicación de origen.</div><a class="btn btn-primary btn-small" href="' + item.official + '" target="_blank" rel="noopener">Abrir BORA ↗</a></div>';
      openOverlay("detailOverlay");
    }

    function exportCsv() {
      const items = filteredItems();
      const headers = ["Fecha", "Sección", "Tipo", "Número", "Título", "Organismo", "Impacto", "Temas"];
      const rows = items.map(function(item) { return [item.date, item.section, item.type, item.number, item.title, item.organization, item.impact, item.topics.join(" · ")]; });
      const csv = [headers].concat(rows).map(function(row) { return row.map(function(value) { return '"' + String(value).replace(/"/g, '""') + '"'; }).join(";"); }).join("\n");
      const blob = new Blob(["\uFEFF" + csv], {type: "text/csv;charset=utf-8;"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = "radar-bora-resultados.csv"; link.click();
      URL.revokeObjectURL(url);
      showToast(items.length + " normas exportadas");
    }

    function setQuick(quick) {
      state.quick = quick; state.view = "all";
      $$(".quick-chip").forEach(function(button) { button.classList.toggle("active", button.dataset.quick === quick); });
      render();
    }

    function handleNav(target) {
      $$(".nav-item, .mobile-nav button").forEach(function(button) { button.classList.toggle("active", button.dataset.nav === target); });
      if (target === "search") {
        state.view = "all";
        $("#searchInput").focus();
        window.scrollTo({top: document.querySelector(".search-panel").offsetTop - 15, behavior: "smooth"});
      } else if (target === "saved") {
        state.query = ""; $("#searchInput").value = "";
        state.sections = []; state.types = []; state.orgs = []; state.impacts = []; state.topics = []; state.from = ""; state.to = "";
        state.quick = "all";
        state.view = "saved";
        $$('input[type="checkbox"]').forEach(function(input) { input.checked = false; });
        $$(".quick-chip").forEach(function(button) { button.classList.toggle("active", button.dataset.quick === "all"); });
        render();
        showToast(state.saved.length ? "Mostrando tus publicaciones guardadas" : "Todavía no tenés publicaciones guardadas");
      } else {
        state.view = "all";
        window.scrollTo({top: 0, behavior: "smooth"});
      }
    }

    $("#searchInput").addEventListener("input", function(event) { state.query = event.target.value; state.quick = "all"; state.view = "all"; $$(".quick-chip").forEach(function(button) { button.classList.toggle("active", button.dataset.quick === "all"); }); render(); });
    $("#searchButton").addEventListener("click", function() { state.query = $("#searchInput").value; state.quick = "all"; state.view = "all"; render(); $("#resultsTitle").scrollIntoView({behavior: "smooth", block: "start"}); });
    $("#sortSelect").addEventListener("change", function(event) { state.sort = event.target.value; render(); });
    $("#openFilters").addEventListener("click", openFilters);
    $("#filterTrigger").addEventListener("click", openFilters);
    $("#applyFilters").addEventListener("click", function() { syncStateFromForm(); state.quick = "all"; $$(".quick-chip").forEach(function(button) { button.classList.toggle("active", button.dataset.quick === "all"); }); render(); closeOverlay("filterOverlay"); showToast("Filtros aplicados"); });
    $("#clearFilters").addEventListener("click", clearAll);
    $("#exportBtn").addEventListener("click", exportCsv);
    $("#viewSaved").addEventListener("click", function() { handleNav("saved"); });
    $("#helpBtn").addEventListener("click", function() { showToast("Tip: combiná filtros y usá comillas para buscar una frase exacta"); });
    $$(".quick-chip").forEach(function(button) { button.addEventListener("click", function() { setQuick(button.dataset.quick); }); });
    $$("[data-close]").forEach(function(button) { button.addEventListener("click", function() { closeOverlay(button.dataset.close); }); });
    $$(".overlay").forEach(function(overlay) { overlay.addEventListener("click", function(event) { if (event.target === overlay) closeOverlay(overlay.id); }); });
    $$("[data-nav]").forEach(function(button) { button.addEventListener("click", function() { handleNav(button.dataset.nav); }); });
    document.addEventListener("keydown", function(event) {
      if (event.key === "/" && document.activeElement.tagName !== "INPUT") { event.preventDefault(); $("#searchInput").focus(); }
      if (event.key === "Escape") { $$(".overlay.open").forEach(function(overlay) { closeOverlay(overlay.id); }); }
    });

    loadState();
    render();
    loadLiveFeed();
  </script>
</body>
</html>

`;


const FEED_KEY = "bora/feed.json";
const BORA_SECTION_URL = "https://www.boletinoficial.gov.ar/seccion/primera/";
const OFFICIAL_ROOT = "https://www.boletinoficial.gob.ar";
const ALLOWED_TYPES = ["Ley", "Decreto", "Resolución", "Resolución General", "Resolución Conjunta", "Resolución Sintetizada", "Disposición", "Disposición Sintetizada", "Decisión Administrativa", "Circular", "Comunicación", "Acordada"];
const EXCLUDED_PUBLICATION = /aviso\s+(?:oficial|societario|judicial)|licitaci[oó]n|remate|asamblea\s+societaria|constituci[oó]n\s+de\s+sociedad/i;

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

function textResponse(value, status = 200) {
  return new Response(value, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
}

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)));
}

function cleanText(value) {
  return decodeEntities(String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function classText(html, classes) {
  const pattern = new RegExp("<([a-z0-9]+)\\b[^>]*class=(['\"])[^'\"]*\\b(?:" + classes + ")\\b[^'\"]*\\2[^>]*>([\\s\\S]*?)<\\/\\1>", "i");
  const match = String(html).match(pattern);
  return match ? cleanText(match[3]) : "";
}

function absoluteUrl(value) {
  try {
    return new URL(decodeEntities(value), OFFICIAL_ROOT).toString();
  } catch {
    return OFFICIAL_ROOT;
  }
}

function dateFromTextOrLink(value, fallback) {
  const match = String(value).match(/(20\d{2})[\/-](\d{2})[\/-](\d{2})/);
  return match ? match[1] + "-" + match[2] + "-" + match[3] : fallback;
}

function findType(text) {
  const candidates = [
    "Decisión Administrativa",
    "Resolución General",
    "Resolución Conjunta",
    "Resolución Sintetizada",
    "Disposición Sintetizada",
    "Comunicación",
    "Acordada",
    "Disposición",
    "Resolución",
    "Decreto",
    "Circular",
    "Ley"
  ];
  return candidates.find((type) => new RegExp("\\b" + type.replace("ó", "[oó]") + "\\b", "i").test(text)) || "";
}

function findNumber(text, type) {
  if (!type) return "s/n";
  const match = text.match(new RegExp(type + "\\s*(?:N[°ºo.]?\\s*)?([A-Z]?\\s*\\d{1,7}(?:[./-]\\d{1,6})?)", "i"));
  return match ? match[1].replace(/\s+/g, "") : "s/n";
}

function inferOrganization(text, type) {
  const explicit = classText(text, "organismo|reparticion|dependencia|entidad|autoridad");
  if (explicit) return explicit.slice(0, 120);
  const beforeType = type ? text.split(new RegExp("\\b" + type.replace("ó", "[oó]") + "\\b", "i"))[0] : "";
  const candidate = beforeType.replace(/^(?:primera\s+secci[oó]n|normativa)\s*[-:·]?\s*/i, "").trim();
  return candidate.length > 3 && candidate.length < 140 ? candidate : "BORA · Primera Sección";
}

function inferTopics(text) {
  const rules = [
    ["Agro", /agro|ganad|hacienda|semoviente|sanidad animal|rural/i],
    ["Finanzas", /finanz|tribut|imposit|banco|cr[eé]dito|deuda|mercado de capital/i],
    ["Trabajo", /laboral|trabaj|empleo|seguridad social|sindical|salario/i],
    ["Comercio", /comercio|importaci[oó]n|exportaci[oó]n|aduana|consumo/i],
    ["Salud", /salud|sanitari|medic|hospital|enfermedad/i],
    ["Tecnología", /digital|tecnolog|datos|inform[aá]tica|interoperab|ciber/i],
    ["Energía", /energ[ií]a|combustible|electric|gas|hidrocarb/i],
    ["Estado", /administraci[oó]n p[uú]blica|organismo|ministerio|estado nacional|funcionari/i]
  ];
  const topics = rules.filter(([, pattern]) => pattern.test(text)).map(([topic]) => topic);
  return topics.length ? topics.slice(0, 4) : ["Normativa"];
}

function impactFor(type) {
  if (type === "Ley" || type === "Decreto" || type === "Decisión Administrativa") return "Alto";
  if (type === "Resolución General") return "Medio";
  return "Medio";
}

function stableId(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return "bora-" + (hash >>> 0).toString(36);
}

function parsePublicationItems(html, fallbackDate) {
  const results = [];
  const seen = new Set();
  const anchors = /<a\b[^>]*href\s*=\s*(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchors.exec(String(html))) !== null) {
    const inner = match[3];
    const text = cleanText(inner);
    if (!text || text.length < 12 || !/\/detalleAviso\/primera\/\d+\/\d{8}/i.test(match[2])) continue;
    const type = findType(text);
    if (!ALLOWED_TYPES.includes(type) || EXCLUDED_PUBLICATION.test(text)) continue;
    const official = absoluteUrl(match[2]);
    const date = dateFromTextOrLink(official + " " + text, fallbackDate);
    const key = official;
    if (seen.has(key)) continue;
    seen.add(key);
    const title = text.slice(0, 320);
    const organization = inferOrganization(text, type);
    const number = findNumber(text, type);
    const normLabel = type + " " + number;
    const afterLabel = text.indexOf(normLabel);
    const excerpt = afterLabel >= 0 ? text.slice(afterLabel + normLabel.length).replace(/^[\s\-–—]+/, "").trim() : "";
    results.push({
      id: stableId(key),
      date,
      section: "Primera",
      type,
      number,
      title,
      organization,
      topics: inferTopics(text),
      impact: impactFor(type),
      status: "Nueva",
      pages: "ver publicación",
      summary: excerpt && excerpt.length > 12 ? excerpt.slice(0, 280) : "Texto y anexos disponibles en la publicación oficial.",
      body: text.slice(0, 1200),
      changes: [],
      keywords: text.toLocaleLowerCase("es"),
      official
    });
  }
  return results;
}

function argentinaToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return values.year + "-" + values.month + "-" + values.day;
}

function shiftDate(value, days) {
  const date = new Date(value + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function fetchBoraDay(date) {
  const url = BORA_SECTION_URL + date.replace(/-/g, "");
  const response = await fetch(url, {
    headers: { accept: "text/html,application/xhtml+xml" }
  });
  if (response.status === 404) return { date, items: [], published: false };
  if (!response.ok) throw new Error("BORA respondió con HTTP " + response.status + " para " + date);
  const html = await response.text();
  if (!/Legislaci[oó]n y Avisos Oficiales/i.test(html) || !/Primera\s+secci[oó]n/i.test(cleanText(html))) {
    throw new Error("La edición del BORA no tiene el formato esperado: " + date);
  }
  return { date, items: parsePublicationItems(html, date), published: true };
}
async function readFeed(env) {
  if (!env.BUCKET) return null;
  try {
    const object = await env.BUCKET.get(FEED_KEY);
    if (!object) return null;
    return await object.json();
  } catch {
    return null;
  }
}

async function writeFeed(env, value) {
  if (!env.BUCKET) return;
  await env.BUCKET.put(FEED_KEY, JSON.stringify(value), {
    httpMetadata: { contentType: "application/json; charset=utf-8" }
  });
}

async function syncBora(env) {
  if (!env.BUCKET) throw new Error("El almacenamiento del sitio no está disponible.");
  const attemptedAt = new Date().toISOString();
  const previous = await readFeed(env);
  const to = argentinaToday();
  const from = shiftDate(to, -6);
  const newItems = [];
  const failedDates = [];
  let publishedDays = 0;

  for (let offset = -6; offset <= 0; offset += 1) {
    const date = shiftDate(to, offset);
    try {
      const day = await fetchBoraDay(date);
      if (day.published) publishedDays += 1;
      newItems.push(...day.items);
    } catch {
      failedDates.push(date);
    }
  }

  if (!publishedDays || (newItems.length === 0 && !previous?.items?.length)) {
    throw new Error("No se pudo validar una edición normativa del BORA.");
  }

  const items = Array.from(new Map(
    [...(previous?.items || []), ...newItems].map((item) => [item.official, item])
  ).values()).sort((left, right) =>
    right.date.localeCompare(left.date) || left.title.localeCompare(right.title, "es")
  );
  const payload = {
    items,
    lastSyncedAt: failedDates.length ? (previous?.lastSyncedAt || null) : attemptedAt,
    lastAttemptAt: attemptedAt,
    syncStatus: failedDates.length ? "partial" : "ok",
    source: BORA_SECTION_URL,
    editionFrom: from,
    editionTo: to,
    itemCount: items.length,
    newItemCount: newItems.length,
    failedDates
  };
  await writeFeed(env, payload);
  return payload;
}
function authorized(request) {
  return Boolean(
    request.headers.get("OAI-Sites-Authorization")
  );
}

function rpcResult(id, result) {
  return jsonResponse({ jsonrpc: "2.0", id, result });
}

function rpcError(id, code, message) {
  return jsonResponse({ jsonrpc: "2.0", id, error: { code, message } }, 400);
}

async function handleMcp(request, env) {
  if (request.method !== "POST") return textResponse("Method Not Allowed", 405);
  let message;
  try {
    message = await request.json();
  } catch {
    return rpcError(null, -32700, "JSON inválido");
  }
  if (message.method === "notifications/initialized") return new Response(null, { status: 204 });
  if (message.method === "initialize") {
    return rpcResult(message.id, {
      protocolVersion: message.params?.protocolVersion || "2025-03-26",
      capabilities: { tools: {} },
      serverInfo: { name: "radar-bora", version: "1.0.0" }
    });
  }
  if (message.method === "tools/list") {
    return rpcResult(message.id, {
      tools: [
        {
          name: "sync_bora",
          description: "Actualiza el radar con las normas nuevas de la Primera Sección del BORA y conserva el último feed válido.",
          inputSchema: { type: "object", properties: {}, additionalProperties: false }
        },
        {
          name: "get_sync_status",
          description: "Devuelve el estado y la última fecha de actualización del feed del Radar BORA.",
          inputSchema: { type: "object", properties: {}, additionalProperties: false }
        }
      ]
    });
  }
  if (message.method !== "tools/call") return rpcError(message.id, -32601, "Método no disponible");
  if (!authorized(request)) return rpcError(message.id, -32001, "Se requiere una identidad autorizada para actualizar este sitio.");
  const toolName = message.params?.name;
  if (toolName === "get_sync_status") {
    const feed = await readFeed(env);
    return rpcResult(message.id, {
      content: [{ type: "text", text: JSON.stringify(feed || { syncStatus: "never", itemCount: 0 }) }],
      structuredContent: feed || { syncStatus: "never", itemCount: 0 }
    });
  }
  if (toolName !== "sync_bora") return rpcError(message.id, -32602, "Herramienta no disponible");
  try {
    const feed = await syncBora(env);
    return rpcResult(message.id, {
      content: [{ type: "text", text: "Feed BORA actualizado: " + feed.itemCount + " normas." }],
      structuredContent: feed
    });
  } catch (error) {
    return rpcResult(message.id, {
      content: [{ type: "text", text: "No se pudo actualizar el BORA: " + error.message }],
      isError: true
    });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp") return handleMcp(request, env);
    if (url.pathname === "/api/feed" && request.method === "GET") {
      const stored = await readFeed(env);
      if (stored) return jsonResponse(stored);
      try {
        return jsonResponse(await syncBora(env));
      } catch {
        return jsonResponse({ items: [], syncStatus: "error", itemCount: 0, source: BORA_SECTION_URL }, 200);
      }
    }
    if (url.pathname === "/api/sync" && request.method === "POST") {
      if (!authorized(request)) return jsonResponse({ error: "unauthorized" }, 401);
      try {
        return jsonResponse(await syncBora(env));
      } catch (error) {
        return jsonResponse({ error: error.message }, 502);
      }
    }
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
      return new Response(page, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "x-content-type-options": "nosniff"
        }
      });
    }
    return textResponse("Not found", 404);
  }
};



