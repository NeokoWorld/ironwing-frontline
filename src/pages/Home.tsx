export default function Home() {
  const news = [
    { date: '25 juin', content: 'Page Personnage fonctionnelle (Placeholders)' },
    { date: '25 juin', content: 'Page Nations fonctionnelle' },
    { date: '25 juin', content: 'Création du Site' },
  ];

  return (
    <div className="container">
      <p className="intro-text">Bienvenue sur Ironwings Frontline !</p>
      <p>
        Ce site est uniquement en français pour l'instant/This website is only
        in french for now
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