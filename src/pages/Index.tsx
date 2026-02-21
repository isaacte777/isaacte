import { useState } from "react";
import "./KappaScore.css";

const sports = [
  { id: "soccer", name: "Soccer", icon: "⚽" },
  { id: "ice-hockey", name: "Ice Hockey", icon: "🏒" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
  { id: "volleyball", name: "Volleyball", icon: "🏐" },
  { id: "table-tennis", name: "Table Tennis", icon: "🏓" },
  { id: "baseball", name: "Baseball", icon: "⚾" },
  { id: "criquet", name: "Criquet", icon: "🏏" },
  { id: "handball", name: "Handball", icon: "🤾" },
  { id: "rugby", name: "Rugby", icon: "🏉" },
];

const fixedLeagues = [
  { name: "La Liga", flag: "🇪🇸" },
  { name: "Serie A", flag: "🇮🇹" },
  { name: "Bundesliga", flag: "🇩🇪" },
];

const countries = [
  { name: "International", flag: "🏳️" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Libya", flag: "🇱🇾" },
  { name: "Colombia", flag: "🇨🇴" },
];

const recommendedEvents = [
  {
    country: "SPAIN",
    flag: "🇪🇸",
    name: "LA LIGA",
    pinned: true,
    matches: [
      { date: "20/02/2026", time: "21:00", home: "Athletic Bilbao", away: "Elche" },
    ],
  },
  {
    country: "ITALY",
    flag: "🇮🇹",
    name: "SERIE A",
    pinned: true,
    matches: [
      { date: "20/02/2026", time: "20:45", home: "Sassuolo Calcio", away: "Hellas Verona" },
    ],
  },
  {
    country: "GERMANY",
    flag: "🇩🇪",
    name: "BUNDESLIGA",
    pinned: true,
    matches: [
      { date: "20/02/2026", time: "20:30", home: "1. FSV Mainz 05", away: "Hamburger" },
    ],
  },
];

const Index = () => {
  const [activeSport, setActiveSport] = useState("soccer");
  const [activeTab, setActiveTab] = useState("results");
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="ks">
      {/* Header - single row */}
      <header className="ks-header">
        <div className="ks-container ks-header__inner">
          <a href="#" className="ks-header__logo">Kappa<span>score</span></a>

          {/* Top links */}
          <nav className="ks-header__toplinks">
            <a href="#" className="ks-header__toplink ks-header__toplink--active">Deportes</a>
            <a href="#" className="ks-header__toplink">Juegos</a>
            <a href="#" className="ks-header__toplink">Top Lists</a>
          </nav>

          {/* Right nav */}
          <nav className="ks-header__nav">
            <a href="#" className="ks-header__nav-link">☰ Resultados</a>
            <a href="#" className="ks-header__nav-link">📈 Estadísticas</a>
            <a href="#" className="ks-header__nav-link">🖥 Marcador en vivo</a>
          </nav>

          {/* Lang */}
          <div className="ks-header__lang">
            <button className="ks-header__lang-btn" onClick={() => setLangOpen(!langOpen)}>
              🇪🇸 ES
            </button>
            {langOpen && (
              <div className="ks-header__lang-dropdown">
                <button className="ks-header__lang-opt active">🇪🇸 Español</button>
                <button className="ks-header__lang-opt">🇺🇸 English</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav row */}
        <div className="ks-header__mobile-nav">
          <div className="ks-container ks-header__mobile-nav-inner">
            <a href="#" className="ks-header__nav-link ks-header__nav-link--active-mobile">☰ Resultados</a>
            <a href="#" className="ks-header__nav-link">📈 Estadísticas</a>
            <a href="#" className="ks-header__nav-link">🖥 Marcador en vivo</a>
          </div>
        </div>
      </header>

      {/* Sports Bar */}
      <div className="ks-sports-bar">
        <div className="ks-container">
          <div className="ks-sports-bar__scroll">
            {sports.map((s) => (
              <button
                key={s.id}
                className={`ks-sports-bar__item ${activeSport === s.id ? "ks-sports-bar__item--active" : ""}`}
                onClick={() => setActiveSport(s.id)}
              >
                <span className="ks-sports-bar__icon">{s.icon}</span> {s.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ks-main">
        <div className="ks-container">
          <div className="ks-layout">
            {/* Sidebar LEFT */}
            <aside className="ks-sidebar">
              <div className="ks-sidebar__section">
                <h3 className="ks-sidebar__title">📌 Ligas Fijas</h3>
                <ul className="ks-sidebar__list">
                  {fixedLeagues.map((l) => (
                    <li key={l.name}>
                      <a href="#" className="ks-sidebar__link">
                        <span style={{ fontSize: 16 }}>{l.flag}</span>
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ks-sidebar__section">
                <h3 className="ks-sidebar__title">Países</h3>
                <ul className="ks-sidebar__list">
                  {countries.map((c) => (
                    <li key={c.name}>
                      <a href="#" className="ks-sidebar__link">
                        <span style={{ fontSize: 16 }}>{c.flag}</span>
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Content RIGHT */}
            <div className="ks-content">
              {/* Recommended Events */}
              <h2 className="ks-events__section-title">Recommended Events</h2>

              <div className="ks-events">
                {recommendedEvents.map((lg) => (
                  <div key={lg.country + lg.name} className="ks-league">
                    <div className="ks-league__header">
                      <span style={{ fontSize: 14 }}>{lg.flag}</span>
                      <span className="ks-league__name">{lg.country}: {lg.name} {lg.pinned ? "📌" : ""}</span>
                    </div>
                    <div className="ks-league__events">
                      {lg.matches.map((m, i) => (
                        <a href="#" key={i} className="ks-match">
                          <div className="ks-match__fav">☆</div>
                          <div className="ks-match__datetime">
                            <div>{m.date}</div>
                            <div>{m.time}</div>
                          </div>
                          <div className="ks-match__teams">
                            <div className="ks-match__team">
                              <span className="ks-match__team-name">{m.home}</span>
                            </div>
                            <div className="ks-match__team">
                              <span className="ks-match__team-name">{m.away}</span>
                            </div>
                          </div>
                          <div className="ks-match__action">💬</div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs below events */}
              <div className="ks-tabs">
                <button
                  className={`ks-tabs__btn ${activeTab === "results" ? "ks-tabs__btn--active" : ""}`}
                  onClick={() => setActiveTab("results")}
                >
                  Resultados
                </button>
                <button
                  className={`ks-tabs__btn ${activeTab === "live" ? "ks-tabs__btn--active" : ""}`}
                  onClick={() => setActiveTab("live")}
                >
                  En vivo <span className="ks-tabs__live-count">26</span>
                </button>
                <button
                  className={`ks-tabs__btn ${activeTab === "next" ? "ks-tabs__btn--active" : ""}`}
                  onClick={() => setActiveTab("next")}
                >
                  Próximos eventos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="ks-footer">
        <div className="ks-container ks-footer__inner">
          <div>
            <a href="#" className="ks-footer__logo">Kappa<span>score</span></a>
            <p className="ks-footer__tagline">Live sports statistics, results and historical data.</p>
          </div>
        </div>
        <div className="ks-footer__bottom">
          <div className="ks-container">© 2026 <span className="ks-footer__accent">Kappascore</span>. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
