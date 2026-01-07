import React, { useState } from 'react';

function ListaNombres() {
  const [nombres, setNombres] = useState(['Zaira', 'Bernardo', 'Andrés', 'Lucía']);

  const ordenarAlfabeticamente = () => {
    const copiaNombres=[...nombres];
    const nombreOrdenados=copiaNombres.sort();
  };

  return (
   `<div>
      <ul>{nombres.map(n => <li key={n}>{n}</li>)}</ul>
      <button onClick={ordenarAlfabeticamente}>Ordenar A-Z</button>
    </div>` 
  );
}