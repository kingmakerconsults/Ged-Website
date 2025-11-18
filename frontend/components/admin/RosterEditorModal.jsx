import React, { useState, useEffect } from 'react';
import { X, UserPlus, UserMinus, Search } from 'lucide-react';

export default function RosterEditorModal({ classData, onClose, onSaved }) {
  const [roster, setRoster] = useState({ inClass: [], available: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRoster();
  }, []);

  const loadRoster = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `/api/admin/classes/${classData.id}/roster`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRoster(data);
      }
    } catch (error) {
      console.error('Failed to load roster:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentId) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `/api/admin/classes/${classData.id}/roster`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ studentIds: [studentId] }),
        }
      );

      if (response.ok) {
        await loadRoster();
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('Failed to add student:', error);
      alert('Failed to add student');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `/api/admin/classes/${classData.id}/roster`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ removeStudentIds: [studentId] }),
        }
      );

      if (response.ok) {
        await loadRoster();
      } else {
        alert('Failed to remove student');
      }
    } catch (error) {
      console.error('Failed to remove student:', error);
      alert('Failed to remove student');
    } finally {
      setSaving(false);
    }
  };

  const filteredInClass = roster.inClass.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAvailable = roster.available.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {classData.name} - Roster
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {roster.inClass.length} student
              {roster.inClass.length !== 1 ? 's' : ''} in class
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* In Class */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm">
                    {filteredInClass.length}
                  </span>
                  In Class
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredInClass.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      No students in class
                    </p>
                  ) : (
                    filteredInClass.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-teal-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {student.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {student.email}
                          </p>
                          {student.highestScore && (
                            <p className="text-xs text-gray-500 mt-1">
                              Score: {student.highestScore} (
                              {student.readinessBand})
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveStudent(student.id)}
                          disabled={saving}
                          className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Remove from class"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Available Students */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {filteredAvailable.length}
                  </span>
                  Available Students
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredAvailable.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      {search
                        ? 'No matching students found'
                        : 'All students assigned'}
                    </p>
                  ) : (
                    filteredAvailable.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {student.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {student.email}
                          </p>
                          {student.currentClassName && (
                            <p className="text-xs text-gray-500 mt-1">
                              Current: {student.currentClassName}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddStudent(student.id)}
                          disabled={saving}
                          className="ml-2 p-2 text-teal-600 hover:bg-teal-50 rounded transition-colors disabled:opacity-50"
                          title="Add to class"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
