import { useState } from 'react';
import { aircraftsData } from '../data/parseAircrafts';
import ReactMarkdown from 'react-markdown';

type Aircraft = {
  name: string;
  role: string;
  manufacturer: string;
  year: string;
  speed: string;
  description: string;
  image: string;
};

function AircraftCard({ aircraft, onClick }: { aircraft: Aircraft; onClick: () => void }) {
  return (
    <div className="card news-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{aircraft.name}</h3>
      <p>
        <strong>Role :</strong> {aircraft.role}
      </p>
      <p>
        <strong>Year :</strong> {aircraft.year}
      </p>
      <p>
        <strong>Speed :</strong> {aircraft.speed}
      </p>
    </div>
  );
}

function AircraftAccordion({
  label,
  aircraftList,
  onAircraftClick,
}: {
  label: string;
  aircraftList: Aircraft[];
  onAircraftClick: (aircraft: Aircraft) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="category">
      <button className="category-toggle" onClick={() => setOpen(!open)}>
        {open ? '▼' : '►'} {label}
      </button>
      {open && (
        <div className="nation-list">
          {aircraftList.map((a, i) => (
            <AircraftCard key={i} aircraft={a} onClick={() => onAircraftClick(a)} />
          ))}
        </div>
      )}
    </div>
  );
}

function AircraftModal({ aircraft, onClose }: { aircraft: Aircraft; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{aircraft.name}</h2>
        <img
          src={aircraft.image}
          alt={`Image de ${aircraft.name}`}
          style={{ width: '200px', marginBottom: '1rem' }}
        />
        <p><strong>Role :</strong> {aircraft.role}</p>
        <p><strong>Manufacturer :</strong> {aircraft.manufacturer}</p>
        <p><strong>Year :</strong> {aircraft.year}</p>
        <p><strong>Speed :</strong> {aircraft.speed}</p>
        <h3>Description</h3>
        <ReactMarkdown>{aircraft.description}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function AircraftsPage() {
  const [country, setCountry] = useState('Solana');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const countries = Object.keys(aircraftsData);

  return (
    <main className="container">
      <h1 className="intro-text">Aircrafts of Ironwings Frontline</h1>

      <nav className="tabs" style={{ marginBottom: '2rem' }}>
        {countries.map((c) => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`tab ${c === country ? 'active' : ''}`}
          >
            {c}
          </button>
        ))}
      </nav>
      <section className="section-panel">
      {Object.entries(aircraftsData[country]).map(([type, aircraftList]) => (
        <AircraftAccordion
          key={type}
          label={type}
          aircraftList={aircraftList as Aircraft[]}
          onAircraftClick={(aircraft) => setSelectedAircraft(aircraft)}
        />
      ))}
</section>
      {selectedAircraft && (
        <AircraftModal aircraft={selectedAircraft} onClose={() => setSelectedAircraft(null)} />
      )}
    </main>
  );
}
