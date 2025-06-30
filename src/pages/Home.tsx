export default function Home() {
  const news = [
    { date: '30 june', content: 'Starting to populate correcly the pages (I will need to rethink the whole UI soon)' },
    { date: '30 june', content: 'Map page working (with placeholder SVG)' },
    { date: '30 june', content: 'Most of the pages has been translated in english' },
    { date: '27 june', content: 'Timeline page working' },
    { date: '26 june', content: 'Planes page working' },
    { date: '25 june', content: 'Characters page working (with placeholder characters)' },
    { date: '25 june', content: 'Nations page working' },
    { date: '25 june', content: 'Website creation' },
  ];

  return (
    <div className="container">
      <p className="intro-text">Welcome on Ironwings Frontline !</p>
      <p>
        WIP parts are in french.
      </p>

      <section className="section-panel">
        <h3>📰 Actualités récentes</h3>
        <div className="grid-responsive-row">
          {news.map(({ date, content }, idx) => (
            <article key={idx} className="card">
              <time className="news-date">{date}</time>
              <p>{content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}