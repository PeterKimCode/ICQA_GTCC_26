import React, { useState, useEffect } from 'react';
import { NoticeService } from '../services/dataService';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', date: '', content: '' });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
        setLoading(true);
        const data = await NoticeService.getAll();
        setNotices(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsEditing('new');
    setEditForm({ title: '', date: new Date().toISOString().split('T')[0], content: '' });
  };

  const handleEdit = (notice: any) => {
    setIsEditing(notice.id);
    setEditForm({ title: notice.title, date: notice.date, content: notice.content });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말 이 공지사항을 삭제하시겠습니까? (Are you sure you want to delete this notice?)")) {
      try {
        await NoticeService.delete(id);
        fetchNotices();
      } catch (err: any) {
        console.error(err);
        alert("Failed to delete notice: " + (err.message || JSON.stringify(err)));
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing === 'new') {
        await NoticeService.create(editForm);
      } else if (isEditing) {
        await NoticeService.update(isEditing, editForm);
      }
      setIsEditing(null);
      fetchNotices();
    } catch (err: any) {
      console.error(err);
      alert("Failed to save notice: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Notices</h1>
          <p className="text-sm text-gray-500">공지사항 추가 수정 및 삭제</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            <Plus className="w-4 h-4" /> Add Notice
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-bold">{isEditing === 'new' ? 'Create Notice' : 'Edit Notice'}</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (제목)</label>
            <input 
              type="text" 
              value={editForm.title} 
              onChange={e => setEditForm({...editForm, title: e.target.value})}
              className="w-full border rounded p-2"
              placeholder="Notice title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date (날짜 시기)</label>
            <input 
              type="date" 
              value={editForm.date} 
              onChange={e => setEditForm({...editForm, date: e.target.value})}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (내용)</label>
            <textarea 
              value={editForm.content} 
              onChange={e => setEditForm({...editForm, content: e.target.value})}
              className="w-full border rounded p-2 h-32"
              placeholder="Notice content..."
            ></textarea>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setIsEditing(null)} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading notices...</div>
          ) : notices.length === 0 ? (
             <div className="p-8 text-center text-gray-500">등록된 공지사항이 없습니다. (No notices found)</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">Title</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notices.map((n) => (
                  <tr key={n.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{n.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{n.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEdit(n)} className="text-blue-600 hover:text-blue-900 mr-4">
                            <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4 inline" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
