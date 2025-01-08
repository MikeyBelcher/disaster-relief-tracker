'use client'
import React, { useState } from 'react';
import { PlusCircle, RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DisasterReliefTracker = () => {
  const [needs, setNeeds] = useState([
    {
      id: 1,
      category: 'Medical',
      description: 'Need insulin for elderly resident at 123 Oak St',
      status: 'urgent',
      lastUpdated: '2025-01-08 09:00',
      contact: 'Jane Smith - (555) 123-4567'
    }
  ]);

  const [newNeed, setNewNeed] = useState({
    category: '',
    description: '',
    contact: ''
  });

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleString();
    setNeeds([
      ...needs,
      {
        id: needs.length + 1,
        ...newNeed,
        status: 'urgent',
        lastUpdated: currentDate
      }
    ]);
    setNewNeed({ category: '', description: '', contact: '' });
  };

  const updateStatus = (id) => {
    setNeeds(needs.map(need => {
      if (need.id === id) {
        const currentDate = new Date().toLocaleString();
        const nextStatus = {
          'urgent': 'in-progress',
          'in-progress': 'completed',
          'completed': 'urgent'
        };
        return {
          ...need,
          status: nextStatus[need.status],
          lastUpdated: currentDate
        };
      }
      return need;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Community Disaster Relief Needs Tracker</h1>
        
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newNeed.category}
                onChange={(e) => setNewNeed({ ...newNeed, category: e.target.value })}
                className="border rounded p-2"
                require