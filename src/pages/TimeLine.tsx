import { useState, type Key } from 'react';
import { timeLineData } from '../data/parseTimeline';
import '../styles/TimeLine.css';
console.log(timeLineData);


// Parse les années du champ "years"
function parseYears(years: string) {
  const [startStr, endStr] = years.split('–');
  const start = parseInt(startStr);
  const end = endStr ? parseInt(endStr) : start;
  return { start, end };
}

// Composant pour chaque événement sur la frise
function TimelineEventBubble({
  event,
  onClick,
}: {
  event: any;
  onClick: () => void;
}) {
  const { start, end } = parseYears(event.years);
  const duration = end - start + 1;
  const left = (start - 1950) * 30; // Position horizontale
  const width = Math.max(20, duration * 30); // Largeur minimale

  return (
    <div
      className="timeline-event"
      style={{ left: `${left}px`, width: `${width}px` }}
      onClick={onClick}
      title={event.title}
    >
      <div className="timeline-bar" />
      <div className="timeline-dot" />
      <div className="timeline-label">{event.title}</div>
    </div>
  );
}

// Modale avec les détails d’un événement
function TimelineModal({
  event,
  onClose,
}: {
  event: any;
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{event.title}</h2>
        <p><strong>Période :</strong> {event.years}</p>
        <p style={{ marginTop: '1rem' }}>{event.summary}</p>
        <h4 style={{ marginTop: '1rem' }}>Conséquences :</h4>
        <ul>
          {event.consequences.map((c: string, i: number) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Page principale de la frise
export default function TimeLinePage() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  return (
    <main className="timeline-page">
      <h1>Frise Chronologique</h1>
      <div className="timeline-scroll-container">
        <div className="timeline-base">
          {timeLineData.map((event: any, idx: Key | null | undefined) => (
            <TimelineEventBubble
              key={idx}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <TimelineModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </main>
  );
}
