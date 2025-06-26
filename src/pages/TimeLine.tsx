import { useState, useMemo } from 'react';
import { timelineData } from '../data/parseTimeline';
import '../styles/TimeLine.css';

type TimelineEvent = {
  title: string;
  years: string; // ex: "1992" ou "1994–1996"
  summary: string;
  consequences: string[];
};

type PositionedEvent = TimelineEvent & {
  startYear: number;
  endYear: number;
  row: number;
  leftPercent: number;
  widthPercent: number;
};

export default function TimeLine() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Extraire toutes les années (début et fin)
  const years = useMemo(() => {
    return timelineData.flatMap((e: TimelineEvent) => {
      const parts = e.years.split('–');
      return parts.length === 2
        ? [parseInt(parts[0]), parseInt(parts[1])]
        : [parseInt(parts[0])];
    });
  }, []);

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const totalYears = maxYear - minYear;

  // Position en % sur la timeline
  const getPosition = (start: number) =>
    ((start - minYear) / totalYears) * 100;
  const getWidth = (start: number, end: number) =>
    ((end - start || 1) / totalYears) * 100;

  const positionedEvents: PositionedEvent[] = useMemo(() => {
    const rows: { endYear: number }[] = [];
    const res: PositionedEvent[] = [];

    timelineData.forEach((event: TimelineEvent) => {
      const parts = event.years.split('–');
      const startYear = parseInt(parts[0]);
      const endYear = parts.length === 2 ? parseInt(parts[1]) : startYear;

      // Trouver une ligne libre (pas de chevauchement)
      let row = 0;
      while (row < rows.length) {
        if (startYear > rows[row].endYear) break;
        row++;
      }

      if (row === rows.length) rows.push({ endYear: endYear });
      else rows[row].endYear = endYear;

      res.push({
        ...event,
        startYear,
        endYear,
        row,
        leftPercent: getPosition(startYear),
        widthPercent: getWidth(startYear, endYear),
      });
    });

    return res;
  }, [getPosition, getWidth]);

  return (
    <main className="timeline-container">
      <h1 className="intro-text">Frise chronologique</h1>

      <div className="timeline-bar">
        {/* Ligne principale horizontale */}
        <div className="timeline-line" />

        {/* Barres événements */}
        {positionedEvents.map((event, idx) => (
          <div
            key={idx}
            className={`event-bar${hoveredIndex === idx ? ' highlight' : ''}`}
            style={{
              left: `${event.leftPercent - 0.6}%`,
              width: `${event.widthPercent}%`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            title={`${event.title} (${event.years})`}
            onClick={() => setSelectedEvent(event)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}

        {/* Bulles/titres */}
        {positionedEvents.map((event, idx) => (
          <div
            key={`bubble-${idx}`}
            className={`event-bubble${hoveredIndex === idx ? ' highlight' : ''}`}
            style={{
              left: `${event.leftPercent + event.widthPercent / 2 - 0.6}%`,
              top: (() => {
                const pos = idx % 4;
                if (pos === 0) return 'calc(50% - 100px)';
                if (pos === 1) return 'calc(50% - 60px)';
                if (pos === 2) return 'calc(50% + 20px)';
                return 'calc(50% + 60px)';
              })(),
              transform: 'translateX(-50%)',
            }}
            onClick={() => setSelectedEvent(event)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={`${event.title} (${event.years})`}
          >
            <div className="event-label">
              <strong>{event.title}</strong>
              <br />
              <small>{event.years}</small>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </main>
  );
}

function EventModal({
  event,
  onClose,
}: {
  event: TimelineEvent;
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{event.title}</h2>
        <p>
          <strong>Période :</strong> {event.years}
        </p>
        <p>{event.summary}</p>
        <h3>Conséquences</h3>
        <ul>
          {event.consequences.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
