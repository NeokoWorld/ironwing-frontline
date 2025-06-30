import React, { useState, type JSX } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import '../styles/Map.css';

type ViewName = 'political' | 'military' | 'topographic';

const views: { [key in ViewName]: JSX.Element } = {
  political: (
    <svg viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="Carte politique">
      <rect width="1200" height="800" fill="#12243a" />
      {/* Zones cliquables avec id et onClick */}
      <rect
        x="100"
        y="200"
        width="200"
        height="150"
        fill="#468aff"
        id="zone-solana"
        style={{ cursor: 'pointer' }}
        data-name="Solana"
      />
      <rect
        x="400"
        y="300"
        width="300"
        height="200"
        fill="#ff7043"
        id="zone-azura"
        style={{ cursor: 'pointer' }}
        data-name="Azura"
      />
      <rect
        x="800"
        y="100"
        width="250"
        height="300"
        fill="#82c91e"
        id="zone-talan"
        style={{ cursor: 'pointer' }}
        data-name="Talan"
      />
      <rect
        x="600"
        y="600"
        width="150"
        height="100"
        fill="#8a52ff"
        id="zone-doria"
        style={{ cursor: 'pointer' }}
        data-name="Doria"
      />
    </svg>
  ),

  military: (
    <svg viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="Carte militaire">
      <rect width="1200" height="800" fill="#0a1526" />
      <circle
        cx="300"
        cy="400"
        r="70"
        fill="#ff6f91"
        id="base-alpha"
        style={{ cursor: 'pointer' }}
        data-name="Base Alpha"
      />
      <circle
        cx="750"
        cy="350"
        r="100"
        fill="#43d9ad"
        id="base-beta"
        style={{ cursor: 'pointer' }}
        data-name="Base Beta"
      />
    </svg>
  ),

  topographic: (
    <svg viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="Carte topographique">
      <rect width="1200" height="800" fill="#0c1e3a" />
      <path
        d="M100 700 Q300 600 500 700 T900 700"
        stroke="#468aff"
        strokeWidth="5"
        fill="none"
        id="river"
        style={{ cursor: 'pointer' }}
        data-name="Grande Rivière"
      />
      <circle cx="400" cy="500" r="50" fill="#d4a373" id="montagne" data-name="Montagne Rocheuse" style={{ cursor: 'pointer' }} />
    </svg>
  ),
};

export default function Map() {
  const [view, setView] = useState<ViewName>('political');

  // Gestion clic zone
  function handleZoneClick(e: React.MouseEvent<SVGRectElement | SVGCircleElement | SVGPathElement>) {
    const target = e.currentTarget;
    const name = target.getAttribute('data-name');
    if (name) alert(`Zone cliquée : ${name}`);
  }

  // On clone l'élément SVG courant pour injecter les events sur chaque zone cliquable (rect, circle, path)
  // C'est un moyen générique simple pour gérer les clics
  const clonedView = React.cloneElement(views[view], {},
    React.Children.map(views[view].props.children, (child) => {
      if (
        React.isValidElement(child) &&
        ['rect', 'circle', 'path'].includes(child.type as string)
      ) {
        return React.cloneElement(
          child as React.ReactElement<React.SVGProps<SVGElement>>,
          {
            onClick: handleZoneClick,
          }
        );
      }
      return child;
    }),
  );


  return (
    <main className="container">
      <h3>Map of Ironwings Frontline</h3>

      <div className="tabs">
        <button
          className={`tab ${view === 'political' ? 'active' : ''}`}
          onClick={() => setView('political')}
          aria-label="Vue politique"
        >
          Politique
        </button>
        <button
          className={`tab ${view === 'military' ? 'active' : ''}`}
          onClick={() => setView('military')}
          aria-label="Vue militaire"
        >
          Militaire
        </button>
        <button
          className={`tab ${view === 'topographic' ? 'active' : ''}`}
          onClick={() => setView('topographic')}
          aria-label="Vue topographique"
        >
          Topographique
        </button>
      </div>

      <div className="map-container">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          wheel={{ step: 0.1 }}
          doubleClick={{ disabled: true }}
          pinch={{ disabled: false }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="map-controls">
                <button onClick={() => zoomIn()}>＋</button>
                <button onClick={() => zoomOut()}>－</button>
                <button onClick={() => resetTransform()}>⭯</button>
              </div>

              <TransformComponent>
                <div className="map-svg-wrapper">{clonedView}</div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </main>
  );
}
