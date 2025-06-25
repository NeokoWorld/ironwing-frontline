import { useParams, useNavigate } from 'react-router-dom';
import { charactersExpandedData } from '../data/parseCharactersExpanded';
import ReactMarkdown from 'react-markdown';

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const character = charactersExpandedData.find((c: any) => c.slug === slug);

  if (!character) {
    return <p>Personnage introuvable.</p>;
  }

  return (
    <main className="container">
      <button onClick={() => navigate(-1)} className="tab">← Retour</button>
      <h1>{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        style={{ maxWidth: '200px', marginBottom: '1rem', borderRadius: '8px' }}
      />
      <p><strong>Nation :</strong> {character.nation}</p>
      <p><strong>Rôle :</strong> {character.role}</p>
      <p><strong>Statut :</strong> {character.statut}</p>
      <p><strong>Alignement :</strong> {character.alignement}</p>
      <p><strong>Relations :</strong> {character.relations.join(', ')}</p>

      <h3>Biographie</h3>
      <ReactMarkdown>{character.biographie}</ReactMarkdown>
    </main>
  );
}
