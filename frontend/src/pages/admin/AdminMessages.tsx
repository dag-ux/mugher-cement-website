import { useState, useEffect } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaCheck, FaInbox } from 'react-icons/fa';
import API from '../../services/api';

const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-sm w-full rounded-xl shadow-2xl px-5 py-4 text-white transform transition-all duration-300 animate-slide-in ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{type === 'success' ? '✅' : '❌'}</span>
        <div>
          <p className="font-semibold text-sm">{type === 'success' ? 'Success!' : 'Error!'}</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button onClick={onClose} className="ml-auto text-white/70 hover:text-white transition">
          ✕
        </button>
      </div>
    </div>
  );
};

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await API.get('/contacts');
      setMessages(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load messages.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await API.put(`/contacts/${id}/read`, { is_read: newStatus });
      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: newStatus } : m)));
      setToast({ message: `Message ${newStatus ? 'marked as read' : 'marked as unread'}.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update status.', type: 'error' });
    }
  };

  const handleDelete = async (id: number, subject: string) => {
    if (!window.confirm(`Are you sure you want to delete "${subject}"?`)) return;
    try {
      await API.delete(`/contacts/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
      setToast({ message: `"${subject}" deleted successfully.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to delete message.', type: 'error' });
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.is_read;
    if (filter === 'read') return msg.is_read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white flex items-center gap-2">
            <Icon icon={FaEnvelope} className="text-[#2EAD32]" />
            Contact Messages
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {unreadCount > 0 ? (
              <span className="text-[#2EAD32] font-semibold">{unreadCount} unread</span>
            ) : (
              'All messages read'
            )}
            {' • '}{messages.length} total
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition ${
              filter === 'all'
                ? 'bg-white dark:bg-gray-600 text-[#1A3C91] dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1">
              <Icon icon={FaInbox} size={12} /> All
            </span>
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition ${
              filter === 'unread'
                ? 'bg-white dark:bg-gray-600 text-[#1A3C91] dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1">
              <Icon icon={FaEnvelope} size={12} /> Unread
            </span>
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition ${
              filter === 'read'
                ? 'bg-white dark:bg-gray-600 text-[#1A3C91] dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1">
              <Icon icon={FaEnvelopeOpen} size={12} /> Read
            </span>
          </button>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Icon icon={FaInbox} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-body">
            {filter === 'all'
              ? 'No messages yet.'
              : filter === 'unread'
              ? 'No unread messages.'
              : 'No read messages.'}
          </p>
          {filter !== 'all' && (
            <button onClick={() => setFilter('all')} className="mt-4 text-[#2EAD32] hover:text-emerald-700 font-semibold">
              View all messages →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 md:p-5 rounded-xl border transition-all duration-200 ${
                msg.is_read
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {msg.is_read ? (
                        <Icon icon={FaEnvelopeOpen} className="text-gray-400 dark:text-gray-500" />
                      ) : (
                        <Icon icon={FaEnvelope} className="text-[#2EAD32] animate-pulse" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#1A3C91] dark:text-white text-base truncate">{msg.subject}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{msg.name}</span>
                        <span className="text-gray-400 dark:text-gray-500 mx-2">•</span>
                        <a href={`mailto:${msg.email}`} className="text-[#2EAD32] hover:underline">
                          {msg.email}
                        </a>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed break-words">{msg.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {new Date(msg.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-8 md:ml-0">
                  <button
                    onClick={() => toggleRead(msg.id, msg.is_read)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      msg.is_read
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        : 'bg-[#2EAD32]/10 text-[#2EAD32] hover:bg-[#2EAD32]/20 dark:bg-[#2EAD32]/20 dark:text-[#4ADE80]'
                    }`}
                  >
                    <Icon icon={FaCheck} size={10} />
                    {msg.is_read ? 'Read' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id, msg.subject)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <Icon icon={FaTrash} size={12} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}