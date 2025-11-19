import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, Download, Search } from 'lucide-react';
import ClassEditorModal from './ClassEditorModal';
import RosterEditorModal from './RosterEditorModal';

export default function ClassesPage({ user }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ search: '', active: 'all' });
  const [editorOpen, setEditorOpen] = useState(false);
  const [rosterEditorOpen, setRosterEditorOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    loadClasses();
  }, [filter]);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for loading classes');
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();

      if (filter.search) params.append('search', filter.search);
      if (filter.active !== 'all') params.append('active', filter.active);

      const response = await fetch(`/api/admin/classes?${params}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classId) => {
    if (!confirm('Are you sure you want to delete this class?')) return;

    try {
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for delete');
        alert('Authentication required');
        return;
      }

      const response = await fetch(`/api/admin/classes/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadClasses();
      } else {
        alert('Failed to delete class');
      }
    } catch (error) {
      console.error('Failed to delete class:', error);
      alert('Failed to delete class');
    }
  };

  const handleExport = async (classId) => {
    try {
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for export');
        alert('Authentication required for export');
        return;
      }

      const response = await fetch(`/api/admin/classes/${classId}/export`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `class-${classId}-roster.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to export roster');
      }
    } catch (error) {
      console.error('Failed to export roster:', error);
      alert('Failed to export roster');
    }
  };

  const openEditor = (cls = null) => {
    setSelectedClass(cls);
    setEditorOpen(true);
  };

  const openRosterEditor = (cls) => {
    setSelectedClass(cls);
    setRosterEditorOpen(true);
  };

  const handleSaved = () => {
    setEditorOpen(false);
    setRosterEditorOpen(false);
    setSelectedClass(null);
    loadClasses();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Classes Manager</h1>
          <button
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Class
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search classes..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <select
            value={filter.active}
            onChange={(e) => setFilter({ ...filter, active: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Classes</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No classes found</p>
          <button
            onClick={() => openEditor()}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Create your first class
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {cls.name}
                  </h3>
                  {cls.label && (
                    <span className="inline-block px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded">
                      {cls.label}
                    </span>
                  )}
                </div>
                {!cls.isActive && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    Inactive
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{cls.studentCount || 0} students</span>
                </div>
                {cls.startDate && (
                  <div className="text-xs">
                    Start: {new Date(cls.startDate).toLocaleDateString()}
                  </div>
                )}
                {cls.endDate && (
                  <div className="text-xs">
                    End: {new Date(cls.endDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openRosterEditor(cls)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-50 text-teal-700 rounded hover:bg-teal-100 transition-colors text-sm"
                >
                  <Users className="w-4 h-4" />
                  Roster
                </button>

                <button
                  onClick={() => openEditor(cls)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleExport(cls.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  title="Export CSV"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(cls.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editorOpen && (
        <ClassEditorModal
          classData={selectedClass}
          onClose={() => setEditorOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {rosterEditorOpen && selectedClass && (
        <RosterEditorModal
          classData={selectedClass}
          onClose={() => setRosterEditorOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
