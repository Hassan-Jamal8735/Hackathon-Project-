import React, { useState } from 'react';
import {
  XMarkIcon, DocumentIcon, PhotoIcon, VideoCameraIcon, MusicalNoteIcon,
  ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon,
  ClockIcon, EyeIcon, ChevronDownIcon, ChevronUpIcon
} from '@heroicons/react/24/outline';

const FilePreview = ({ files, analyses, onRemove, isUploading }) => {
  const [expandedFiles, setExpandedFiles] = useState(new Set());

  if (files.length === 0) {
    return null;
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileAnalysis = (fileIndex) => {
    return analyses && analyses[fileIndex] ? analyses[fileIndex].analysis : null;
  };

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFiles(newExpanded);
  };

  const getQualityColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {files.map((file, index) => {
        const analysis = getFileAnalysis(index);
        const isExpanded = expandedFiles.has(index);

        return (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-300 focus-within:ring-opacity-50"
          role="group"
          aria-label={`File ${index + 1} of ${files.length}: ${file.name}`}
        >
            {/* Header */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1 min-w-0">
                  {/* File Icon & Type */}
                  <div className="flex-shrink-0">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm ${
                      analysis ? `bg-${analysis.type.color}-100` : 'bg-gray-100'
                    }`}>
                      <span className="text-2xl">{analysis ? analysis.type.icon : '📄'}</span>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate mb-1">
                          {file.name}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span className="flex items-center">
                            {analysis ? analysis.type.description : file.type.split('/')[0]}
                          </span>
                          <span>•</span>
                          <span>{formatFileSize(file.size)}</span>
                          {analysis && (
                            <>
                              <span>•</span>
                              <span className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {analysis.content.estimatedProcessingTime}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        {analysis && (
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title={isExpanded ? "Hide details" : "Show details"}
                          >
                            {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                          </button>
                        )}

                        {!isUploading && onRemove && (
                          <button
                            onClick={() => onRemove(index)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove file"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Quality Score & Status */}
                    {analysis && (
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4">
                          {/* Quality Score */}
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(analysis.quality.score)}`}>
                            Quality: {analysis.quality.score}%
                          </div>

                          {/* Processing Strategy */}
                          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {analysis.processingStrategy.replace('_', ' ').toUpperCase()}
                          </div>
                        </div>

                        {/* File Number */}
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                          {index + 1} of {files.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Details */}
            {analysis && isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50">
                <div className="p-4 space-y-4">
                  {/* Content Preview */}
                  {analysis.content.hasContent && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                        <EyeIcon className="h-4 w-4 mr-2" />
                        Content Preview
                      </h5>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">
                          {analysis.content.text || 'Content preview not available'}
                        </p>
                        {analysis.content.previewLength > 200 && (
                          <p className="text-xs text-gray-500 mt-2">
                            Preview shows first 200 characters of {analysis.content.previewLength} total
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quality Factors */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">Quality Assessment</h5>
                    <div className="space-y-2">
                      {analysis.quality.factors.map((factor, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{factor}</span>
                        </div>
                      ))}

                      {analysis.quality.warnings.map((warning, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                          <span className="text-yellow-800">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {analysis.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Smart Recommendations</h5>
                      <div className="space-y-2">
                        {analysis.recommendations.map((rec, idx) => (
                          <div key={idx} className={`p-3 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                            <div className="flex items-start space-x-2">
                              <InformationCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">{rec.message}</p>
                                {rec.actions && rec.actions.length > 0 && (
                                  <ul className="mt-1 ml-4 list-disc text-xs space-y-0.5">
                                    {rec.actions.map((action, actionIdx) => (
                                      <li key={actionIdx}>{action}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Enhanced Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800">Upload Summary</h4>
          <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{files.length}</div>
            <div className="text-gray-600">Files</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">
              {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
            </div>
            <div className="text-gray-600">Total Size</div>
          </div>
          {analyses && (
            <>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {analyses.filter(item => item.analysis.quality.score >= 80).length}
                </div>
                <div className="text-gray-600">High Quality</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {analyses.reduce((sum, item) => sum + item.analysis.recommendations.length, 0)}
                </div>
                <div className="text-gray-600">Recommendations</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;