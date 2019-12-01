import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Hooks came after React 16.8 version

function App() {
    const [techs, setTech] = useState([]);
    const [newTech, setNewTech] = useState('');

    const handleAdd = useCallback(() => {
        setTech([...techs, newTech]);
        setNewTech('');
    }, [newTech, techs]);

    // replaced by useCallback hook
    // function handleAdd() {
    //     setTech([...techs, newTech]);
    //     setNewTech('');
    // }

    useEffect(() => {
        const storageTech = localStorage.getItem('tech');

        if (storageTech) {
            setTech(JSON.parse(storageTech));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tech', JSON.stringify(techs));
    }, [techs]);

    const techSize = useMemo(() => techs.length, [techs]);

    return (
        <>
            <ul>
                {techs.map(tech => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>
            <strong>Você listou {techSize} tecnologias</strong>
            <br />
            <input
                value={newTech}
                onChange={event => setNewTech(event.target.value)}
            />
            <button type="button" onClick={handleAdd}>
                Adicionar
            </button>
        </>
    );
}

export default App;
