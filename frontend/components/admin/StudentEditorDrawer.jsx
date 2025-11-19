import React, { useState, useEffect } from 'react';
import { X, Save, Award } from 'lucide-react';

export default function StudentEditorDrawer({
  studentId,
  classes,
  onClose,
  onSaved,
}) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(!!studentId);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    classId: '',
    active: true,
    testDate: '',
    passwordMode: 'invite',
    courseFlags: {
      reading: false,
      writing: false,
      math: false,
      science: false,
      socialStudies: false,
    },
    accommodations: {},
  });

  useEffect(() => {
    if (studentId) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for loading student');
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/admin/students/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudent(data);

        const nameParts = data.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        setFormData({
          firstName,
          lastName,
          email: data.email || '',
          phone: data.phone || '',
          classId: data.classId || '',
          active: data.active !== false,
          testDate: data.testDate ? data.testDate.split('T')[0] : '',
          passwordMode: 'keep',
          courseFlags: data.courseFlags || {
            reading: false,
            writing: false,
            math: false,
            science: false,
            socialStudies: false,
          },
          accommodations: data.accommodations || {},
        });
      }
    } catch (error) {
      console.error('Failed to load student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      alert('First name, last name, and email are required');
      return;
    }

    try {
      setSaving(true);
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for saving student');
        alert('Authentication required');
        setSaving(false);
        return;
      }

      if (studentId) {
        // Update existing student
        const response = await fetch(`/api/admin/students/${studentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone || null,
            classId: formData.classId || null,
            active: formData.active,
            testDate: formData.testDate || null,
            courseFlags: formData.courseFlags,
            accommodations: formData.accommodations,
          }),
        });

        if (response.ok) {
          onSaved();
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to update student');
        }
      } else {
        // Create new student
        const response = await fetch('/api/admin/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            classId: formData.classId || null,
            courseFlags: formData.courseFlags,
            accommodations: formData.accommodations,
            passwordMode: formData.passwordMode,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.student.tempPassword) {
            alert(
              `Student created!\n\nTemporary Password: ${result.student.tempPassword}\n\nPlease save this password and share it with the student.`
            );
          }
          onSaved();
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to create student');
        }
      }
    } catch (error) {
      console.error('Failed to save student:', error);
      alert('Failed to save student');
    } finally {
      setSaving(false);
    }
  };

  const subjectNames = {
    RLA: 'Reading/Language Arts',
    Math: 'Math',
    Science: 'Science',
    'Social Studies': 'Social Studies',
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {studentId ? 'Edit Student' : 'Create New Student'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                  disabled={!!studentId}
                />
                {studentId && (
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed after creation
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class (Optional)
                </label>
                <select
                  value={formData.classId}
                  onChange={(e) =>
                    setFormData({ ...formData, classId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">No Class</option>
                  {classes
                    .filter((c) => c.isActive)
                    .map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.testDate}
                  onChange={(e) =>
                    setFormData({ ...formData, testDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {!studentId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Setup
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="invite"
                        checked={formData.passwordMode === 'invite'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passwordMode: e.target.value,
                          })
                        }
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm">
                        Send invite email (pending implementation)
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="temp"
                        checked={formData.passwordMode === 'temp'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passwordMode: e.target.value,
                          })
                        }
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm">
                        Generate temporary password
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-gray-700"
                >
                  Active Student
                </label>
              </div>
            </div>
          </div>

          {/* Course Flags */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Course Enrollment
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select which GED subjects this student is preparing for
            </p>
            <div className="space-y-2">
              {Object.entries({
                reading: 'Reading/Language Arts',
                writing: 'Writing',
                math: 'Math',
                science: 'Science',
                socialStudies: 'Social Studies',
              }).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.courseFlags[key] || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        courseFlags: {
                          ...formData.courseFlags,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Scores (if editing existing student) */}
          {student &&
            student.highestScores &&
            Object.keys(student.highestScores).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Highest Practice Scores
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(student.highestScores).map(
                    ([subject, score]) => (
                      <div key={subject} className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">
                          {subjectNames[subject] || subject}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {score}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {score >= 145
                            ? '✓ Ready'
                            : score >= 135
                            ? 'Almost Ready'
                            : 'Needs Study'}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Submit */}
          <div className="sticky bottom-0 bg-white pt-6 border-t -mx-6 px-6 pb-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {studentId ? 'Update Student' : 'Create Student'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
