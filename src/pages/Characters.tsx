import { charactersData } from '../data/parseCharacters';
import { Link } from 'react-router-dom';

export default function CharactersPage() {
  return (
    <main className="container">
      <h1 className="intro-text">Personnages</h1>
      <section className="card-grid">
        {charactersData.map((char: any) => (
          <Link key={char.slug} to={`/characters/${char.slug}`} className="card-link">
            <div className="card news-card">
              <h3>{char.name}</h3>
              <p><strong>Nation :</strong> {char.nation}</p>
              <p>{char.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
