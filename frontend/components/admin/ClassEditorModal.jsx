import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ClassEditorModal({ classData, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    startDate: '',
    endDate: '',
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name || '',
        label: classData.label || '',
        startDate: classData.startDate ? classData.startDate.split('T')[0] : '',
        endDate: classData.endDate ? classData.endDate.split('T')[0] : '',
        isActive: classData.isActive !== false,
      });
    }
  }, [classData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Class name is required');
      return;
    }

    try {
      setSaving(true);
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for saving class');
        alert('Authentication required');
        setSaving(false);
        return;
      }

      const url = classData
        ? `/api/admin/classes/${classData.id}`
        : '/api/admin/classes';
      const method = classData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          label: formData.label || null,
          startDate: formData.startDate || null,
          endDate: formData.endDate || null,
          isActive: formData.isActive,
        }),
      });

      if (response.ok) {
        onSaved();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save class');
      }
    } catch (error) {
      console.error('Failed to save class:', error);
      alert('Failed to save class');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {classData ? 'Edit Class' : 'Create New Class'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., Spring 2024 Morning Class"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Label (Optional)
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., Advanced, Beginner, ESL"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date (Optional)
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date (Optional)
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700"
            >
              Active Class
            </label>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? 'Saving...'
                : classData
                ? 'Update Class'
                : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
