import React, { useState, useEffect } from 'react';
import { FAQService } from '../services/dataService';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export const AdminFAQs: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ question: '', answer: '', sort_order: 0 });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
        setLoading(true);
        const data = await FAQService.getAll();
        setFaqs(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsEditing('new');
    setEditForm({ question: '', answer: '', sort_order: faqs.length * 10 });
  };

  const handleEdit = (faq: any) => {
    setIsEditing(faq.id);
    setEditForm({ question: faq.question, answer: faq.answer, sort_order: faq.sort_order });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말 이 FAQ를 삭제하시겠습니까? (Are you sure you want to delete this FAQ?)")) {
      try {
        await FAQService.delete(id);
        fetchFaqs();
      } catch (err) {
        console.error(err);
        alert("Failed to delete FAQ");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing === 'new') {
        await FAQService.create(editForm);
      } else if (isEditing) {
        await FAQService.update(isEditing, editForm);
      }
      setIsEditing(null);
      fetchFaqs();
    } catch (err) {
      console.error(err);
      alert("Failed to save FAQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage FAQs</h1>
          <p className="text-sm text-gray-500">자주 묻는 질문 추가 수정 및 삭제</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-bold">{isEditing === 'new' ? 'Create FAQ' : 'Edit FAQ'}</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question (질문)</label>
            <input 
              type="text" 
              value={editForm.question} 
              onChange={e => setEditForm({...editForm, question: e.target.value})}
              className="w-full border rounded p-2"
              placeholder="Q..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer (답변)</label>
            <textarea 
              value={editForm.answer} 
              onChange={e => setEditForm({...editForm, answer: e.target.value})}
              className="w-full border rounded p-2 h-32"
              placeholder="A..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order (순서)</label>
            <input 
              type="number" 
              value={editForm.sort_order} 
              onChange={e => setEditForm({...editForm, sort_order: parseInt(e.target.value) || 0})}
              className="w-full border rounded p-2"
              placeholder="0, 10, 20..."
            />
            <p className="text-xs text-gray-500 mt-1">숫자가 작을수록 우선 노출 (Smaller number appears first)</p>
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
            <div className="p-8 text-center text-gray-500">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
             <div className="p-8 text-center text-gray-500">등록된 FAQ가 없습니다. (No FAQs found)</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">Question</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {faqs.map((f) => (
                  <tr key={f.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{f.sort_order}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{f.question}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEdit(f)} className="text-blue-600 hover:text-blue-900 mr-4">
                            <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button onClick={() => handleDelete(f.id)} className="text-red-600 hover:text-red-900">
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
