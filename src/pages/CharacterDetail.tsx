import { useParams, useNavigate } from 'react-router-dom';
import { charactersExpandedData } from '../data/parseCharactersExpanded';
import ReactMarkdown from 'react-markdown';

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const character = charactersExpandedData.find((c: any) => c.slug === slug);

  if (!character) {
    return <p><h1>Error 404, Character not Found.</h1>Oups ! You seem to try to access to a page that does not exist. You may have mispelled it. If you think this is an error, fill an <a href='https://github.com/NeokoWorld/ironwing-frontline/issues' target='_blank'>issue</a> on Github.</p>;
  }

  return (
    <main className="container">
      <button onClick={() => navigate(-1)} className="tab">← Back</button>
      <h1>{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        style={{ maxWidth: '200px', marginBottom: '1rem', borderRadius: '8px' }}
      />
      <p><strong>Nation :</strong> {character.nation}</p>
      <p><strong>Role :</strong> {character.role}</p>
      <p><strong>Status :</strong> {character.statut}</p>
      <p><strong>Alignement :</strong> {character.alignement}</p>
      <p><strong>Relationships :</strong> {character.relations.join(', ')}</p>

      <h3>Biography and Infos</h3>
      <ReactMarkdown>{character.biographie}</ReactMarkdown>
    </main>
  );
}
