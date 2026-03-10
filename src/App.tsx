import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudyPlanner from './components/StudyPlanner';
import SubjectTracker from './components/SubjectTracker';
import QuestionTracker from './components/QuestionTracker';
import Notes from './components/Notes';
import AIAssistant from './components/AIAssistant';
import { INITIAL_TOPICS } from './constants';
import { Topic, QuestionLog, Note } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State Management with LocalStorage persistence
  const [topics, setTopics] = useState<Topic[]>(() => {
    const saved = localStorage.getItem('lgs_topics');
    return saved ? JSON.parse(saved) : INITIAL_TOPICS;
  });

  const [logs, setLogs] = useState<QuestionLog[]>(() => {
    const saved = localStorage.getItem('lgs_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('lgs_notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lgs_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('lgs_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('lgs_notes', JSON.stringify(notes));
  }, [notes]);

  const handleToggleTopic = (id: string) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleAddLog = (log: QuestionLog) => {
    setLogs(prev => [...prev, log]);
  };

  const handleAddNote = (note: Note) => {
    setNotes(prev => [...prev, note]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard logs={logs} dailyGoal={150} />;
      case 'planner':
        return <StudyPlanner />;
      case 'subjects':
        return <SubjectTracker topics={topics} onToggle={handleToggleTopic} />;
      case 'questions':
        return <QuestionTracker logs={logs} onAddLog={handleAddLog} />;
      case 'notes':
        return <Notes notes={notes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} />;
      case 'ai':
        return <AIAssistant logs={logs} />;
      default:
        return <Dashboard logs={logs} dailyGoal={150} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
