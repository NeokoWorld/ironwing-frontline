export default function Home() {
  const news = [
    { date: '27 juin', content: 'Timeline page working' },
    { date: '26 juin', content: 'Planes page working' },
    { date: '25 juin', content: 'Characters page working (with placeholder characters)' },
    { date: '25 juin', content: 'Nations page working' },
    { date: '25 juin', content: 'Website creation' },
  ];

  return (
    <div className="container">
      <p className="intro-text">Welcome on Ironwings Frontline !</p>
      <p>
        WIP parts are in french.
      </p>

      <section className="section-panel">
        <h3>📰 Actualités récentes</h3>
        <div className="grid-responsive">
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