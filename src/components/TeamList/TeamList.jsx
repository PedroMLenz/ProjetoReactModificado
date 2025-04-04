import React from 'react';
import './TeamList.less';

const TeamList = ({ title, teams }) => (
    <div className="times-capitao">
        <h2>{title}</h2>
        {teams.length > 0 ? (
            <ul className="perfilul">
                {teams.map(team => (
                    <li key={team.id} className="perfilul">{team.nome}</li>
                ))}
            </ul>
        ) : (
            <p>Você não está participando como {title.toLowerCase()} em nenhum time.</p>
        )}
    </div>
);

export default TeamList;