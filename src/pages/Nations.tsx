import { useState } from 'react';
import { nationsData } from '../data/parseNations';
import { nationsExpandedData } from '../data/parseNationsExpanded';
import ReactMarkdown from 'react-markdown';

function NationCard({
  name,
  bloc,
  markdown,
  onClick,
}: {
  name: string;
  bloc: string;
  markdown: string;
  onClick: () => void;
}) {
  return (
    <div
      className="card news-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <h3>{name}</h3>
      <p>
        <strong>Bloc :</strong> {bloc}
      </p>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

function CategoryAccordion({
  label,
  nations,
  onNationClick,
}: {
  label: string;
  nations: any[];
  onNationClick: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="category">
      <button className="category-toggle" onClick={() => setOpen(!open)}>
        {open ? '▼' : '►'} {label.replace('_', ' ')}
      </button>
      {open && (
        <div className="nation-list">
          {nations.map((nation, idx) => (
            <NationCard
              key={idx}
              {...nation}
              onClick={() => onNationClick(nation.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NationModal({
  nation,
  onClose,
}: {
  nation: (typeof nationsExpandedData)[0];
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{nation.name}</h2>
        <img
          src={nation.flag}
          alt={`Flag of ${nation.name}`}
          style={{ width: '150px', marginBottom: '1rem' }}
        />
        <p>
          <strong>Continent :</strong> {nation.continent}
        </p>
        <p>
          <strong>Category :</strong> {nation.category}
        </p>
        <p>
          <strong>Bloc :</strong> {nation.bloc}
        </p>
        <p>
          <strong>Capital :</strong> {nation.capital}
        </p>
        <p>
          <strong>Population :</strong> {nation.population}
        </p>
        <p>
          <strong>Government :</strong> {nation.government}
        </p>
        <p>
          <strong>Military :</strong> {nation.military}
        </p>
        <p>
          <strong>Relations :</strong> {nation.relations.join(', ')}
        </p>
        <h3>Histoire</h3>
        <p>{nation.histoire}</p>
        <h3>Description</h3>
        <ReactMarkdown>{nation.description}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function NationsPage() {
  const [continent, setContinent] = useState('Alydent');
  const continents = Object.keys(nationsData);

  // ** Les états et fonctions pour la modale ici **
  const [selectedNation, setSelectedNation] = useState<
    (typeof nationsExpandedData)[0] | null
  >(null);

  function openNationDetails(name: string) {
    const details = nationsExpandedData.find((n: typeof nationsExpandedData[number]) => n.name === name);
    setSelectedNation(details || null);
  }

  function closeModal() {
    setSelectedNation(null);
  }

  return (
    <main className="container">
      <h1 className="intro-text">Nations of Ironwings Frontline</h1>
      <p>
        You can click on a card to get more infos
      </p>
      <nav className="tabs" style={{ marginBottom: '2rem' }}>
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setContinent(c)}
            className={`tab ${c === continent ? 'active' : ''}`}
          >
            {c}
          </button>
        ))}
      </nav>
      <section className="section-panel">
        {Object.entries(nationsData[continent]).map(([category, nations]) => (
          <CategoryAccordion
            key={category}
            label={category}
            nations={nations as any[]}
            onNationClick={openNationDetails}
          />
        ))}
      </section>

      {selectedNation && (
        <NationModal nation={selectedNation} onClose={closeModal} />
      )}
    </main>
  );
}
