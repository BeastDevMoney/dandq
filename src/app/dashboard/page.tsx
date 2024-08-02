"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LogoutButton from '../components/logout';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading, username, interactedToday } = useAuth();
  const [interactionChecked, setInteractionChecked] = useState(false);
  const [objectives, setObjectives] = useState<Array<{id: number, text: string}>>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    fetchObjectives();
  }, []);

  const fetchObjectives = async () => {
    try {
      const response = await fetch('/api/objectives', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setObjectives(data.objectives);
      } else {
        console.error('Failed to fetch objectives');
      }
    } catch (error) {
      console.error('Error fetching objectives:', error);
    }
  };

  const saveObjectives = async () => {
    try {
      const response = await fetch('/api/objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ objectives }),
      });
      if (response.ok) {
        setUnsavedChanges(false);
        alert('Objetivos guardados exitosamente');
      } else {
        console.error('Failed to save objectives');
        alert('Error al guardar los objetivos');
      }
    } catch (error) {
      console.error('Error saving objectives:', error);
      alert('Error al guardar los objetivos');
    }
  };

  const deleteObjective = (id: number) => {
    setObjectives(objectives.filter(objective => objective.id !== id));
    setUnsavedChanges(true);
  };

  const handleDailyInteraction = async () => {
    try {
      const response = await fetch('/api/dailyInteraction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setInteractionChecked(true);
      } else {
        console.error('Failed to record daily interaction');
      }
    } catch (error) {
      console.error('Error recording daily interaction:', error);
    }
  };

  const addObjective = () => {
    const newId = objectives.length > 0 ? Math.max(...objectives.map(o => o.id)) + 1 : 1;
    setObjectives([...objectives, {id: newId, text: ''}]);
    setUnsavedChanges(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#CEC2C2] text-black">
      <header className="flex justify-between items-center p-4 bg-[#C8B7B7] shadow">
        <a href='/' target='_blank'><h1 className="text-2xl font-bold hover:text-3xl">D&Q</h1></a>
        <LogoutButton />
      </header>

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Marca tus objetivos</h2>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              checked={interactedToday || interactionChecked}
              onChange={handleDailyInteraction}
              disabled={interactedToday || interactionChecked}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Entrar todos los días a D&Q</span>
          </div>
          
          {!interactedToday && !interactionChecked && (
            <p className="text-yellow-600">No olvides interactuar hoy para mantener tu cuenta activa!</p>
          )}

          {(interactedToday || interactionChecked) && (
            <p className="text-green-600">Gracias por interactuar hoy! Tu cuenta permanecerá activa.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {objectives.slice(1).map((objective) => (
            <div key={objective.id} className="flex items-center mb-4">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <input 
                type="text" 
                value={objective.text}
                onChange={(e) => {
                  const newObjectives = objectives.map(obj => 
                    obj.id === objective.id ? {...obj, text: e.target.value} : obj
                  );
                  setObjectives(newObjectives);
                  setUnsavedChanges(true);
                }}
                className="ml-2 flex-grow p-2 border rounded"
                placeholder="Escribe tu objetivo"
              />
              <button 
                onClick={() => deleteObjective(objective.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
          
          <button 
            onClick={addObjective}
            className="mt-4 text-gray-500 hover:text-gray-700"
          >
            Añadir uno
          </button>

          {unsavedChanges && (
            <button 
              onClick={saveObjectives}
              className="mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar cambios
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;