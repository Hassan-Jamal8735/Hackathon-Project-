import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import {
  EyeIcon,
  TrashIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const HistoryTable = () => {
  const navigate = useNavigate();
  const { deleteDocument } = useFirestore();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Enhanced mock data with more details
  const [submissions, setSubmissions] = useState([
    {
      id: '1',
      type: 'PDF Document',
      typeIcon: DocumentIcon,
      status: 'Completed',
      date: '2024-01-15',
      result: 'Authentic',
      confidence: 98.5,
      processingTime: '2.3s'
    },
    {
      id: '2',
      type: 'Image Scan',
      typeIcon: PhotoIcon,
      status: 'Processing',
      date: '2024-01-14',
      result: 'Analyzing',
      confidence: null,
      processingTime: null
    },
    {
      id: '3',
      type: 'Video Content',
      typeIcon: VideoCameraIcon,
      status: 'Completed',
      date: '2024-01-13',
      result: 'Manipulated',
      confidence: 23.1,
      processingTime: '8.7s'
    },
    {
      id: '4',
      type: 'Text Analysis',
      typeIcon: ChatBubbleLeftIcon,
      status: 'Completed',
      date: '2024-01-12',
      result: 'Suspicious',
      confidence: 67.8,
      processingTime: '1.2s'
    },
  ]);

  const handleViewSubmission = (submissionId) => {
    navigate(`/analysis/${submissionId}`);
  };

  const handleDeleteClick = (submissionId) => {
    setDeleteConfirm(submissionId);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    setDeletingId(deleteConfirm);
    try {
      // In a real app, this would be a database call
      // For now, we'll just simulate the deletion from the local state
      setSubmissions(prev => prev.filter(sub => sub.id !== deleteConfirm));
      setDeleteConfirm(null);
      showToast('Submission deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting submission:', error);
      showToast('Failed to delete submission', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-verified';
      case 'Processing':
        return 'badge-processing';
      default:
        return 'badge-info';
    }
  };

  const getResultBadge = (result) => {
    switch (result) {
      case 'Authentic':
        return 'badge-verified';
      case 'Manipulated':
        return 'badge-manipulated';
      case 'Suspicious':
        return 'badge-suspicious';
      case 'Analyzing':
        return 'badge-processing';
      default:
        return 'badge-info';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (!confidence) return 'text-gray-400';
    if (confidence >= 90) return 'text-emerald-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="card bg-slate-800/50 backdrop-blur-sm overflow-hidden">
      {/* Table Header */}
      <div className="card-header bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Recent Verifications</h3>
        <p className="text-sm text-slate-400 mt-1">Your latest document analysis results</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700/50">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Result
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800/30 divide-y divide-slate-700/30">
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-slate-700/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-md">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-lg flex items-center justify-center border border-blue-700/30">
                      <submission.typeIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        #{submission.id.toString().padStart(4, '0')}
                      </div>
                      <div className="text-sm text-slate-400">
                        {submission.type}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {submission.status === 'Processing' ? (
                      <ClockIcon className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
                    ) : (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" />
                    )}
                    <span className={`badge ${getStatusBadge(submission.status)}`}>
                      {submission.status}
                    </span>
                  </div>
                  {submission.processingTime && (
                    <div className="text-xs text-slate-500 mt-1">
                      {submission.processingTime}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${getResultBadge(submission.result)}`}>
                    {submission.result}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {submission.confidence ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-2 max-w-16">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            submission.confidence >= 90 ? 'bg-[var(--color-verified-400)]' :
                            submission.confidence >= 70 ? 'bg-[var(--color-processing-400)]' : 'bg-[var(--color-suspicious-400)]'
                          }`}
                          style={{ width: `${submission.confidence}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getConfidenceColor(submission.confidence)}`}>
                        {submission.confidence}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {new Date(submission.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewSubmission(submission.id)}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-blue-400 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/30 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteClick(submission.id)}
                      disabled={deletingId === submission.id}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-red-400 bg-red-900/30 hover:bg-red-900/50 border border-red-700/30 transition-all duration-150 hover:shadow-lg hover:shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === submission.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card bg-slate-800 max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center border border-red-700/30">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">Delete Submission</h3>
                <p className="text-slate-300 text-sm">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6">
              Are you sure you want to delete submission #{deleteConfirm}? This will permanently remove the analysis results and cannot be recovered.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId === deleteConfirm}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:opacity-50 rounded-lg transition-colors duration-150"
              >
                {deletingId === deleteConfirm ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Footer */}
      <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing {submissions.length} of {submissions.length} verifications
          </div>
          <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-150">
            View All →
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 border-emerald-700 text-emerald-200'
              : 'bg-red-900/90 border-red-700 text-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {toast.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
              ) : (
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;