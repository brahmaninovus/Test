import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  addNote,
  deleteNote,
  editNote,
  archiveNote,
  unarchiveNote,
} from '../utils/local-data';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    refreshNotes();
    // Set up interval to check for changes every 500ms (useful for multi-tab sync)
    const interval = setInterval(refreshNotes, 500);
    return () => clearInterval(interval);
  }, []);

  const refreshNotes = useCallback(() => {
    const allNotes = getAllNotes();
    setNotes(allNotes);
    setActiveNotes(getActiveNotes());
    setArchivedNotes(getArchivedNotes());
  }, []);

  const handleAddNote = (noteData) => {
    addNote(noteData);
    refreshNotes();
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    refreshNotes();
  };

  const handleEditNote = (noteData) => {
    editNote(noteData);
    refreshNotes();
  };

  const handleArchiveNote = (id) => {
    archiveNote(id);
    refreshNotes();
  };

  const handleUnarchiveNote = (id) => {
    unarchiveNote(id);
    refreshNotes();
  };

  const getSingleNote = (id) => {
    return getNote(id);
  };

  const value = {
    notes,
    activeNotes,
    archivedNotes,
    addNote: handleAddNote,
    deleteNote: handleDeleteNote,
    editNote: handleEditNote,
    archiveNote: handleArchiveNote,
    unarchiveNote: handleUnarchiveNote,
    getNote: getSingleNote,
    refreshNotes,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use NotesContext
export const useNotes = () => {
  const context = React.useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};
