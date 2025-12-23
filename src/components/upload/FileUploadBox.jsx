import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileIntelligence } from '../../lib/ocrService';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const FileUploadBox = ({ onFileSelect, maxFiles = 5, maxSizeMB = 10 }) => {
  const [fileAnalyses, setFileAnalyses] = useState([]);
  const [analyzingFiles, setAnalyzingFiles] = useState(false);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    console.log('📁 Files dropped:', acceptedFiles.length, 'accepted,', rejectedFiles.length, 'rejected');

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejectionReasons = rejectedFiles.map(rejection => {
        const reasons = rejection.errors.map(err => err.message).join(', ');
        return `${rejection.file.name}: ${reasons}`;
      });
      alert(`Some files were rejected:\n${rejectionReasons.join('\n')}`);
    }

    if (acceptedFiles.length === 0) return;

    // Start intelligent file analysis
    setAnalyzingFiles(true);

    try {
      const analyses = [];
      for (const file of acceptedFiles) {
        console.log(`🔍 Analyzing file: ${file.name}`);
        const analysis = await FileIntelligence.analyzeFile(file);
        analyses.push({ file, analysis });
      }

      setFileAnalyses(analyses);
      console.log('✅ File analysis complete for', analyses.length, 'files');

      // Pass analyzed files to parent
      onFileSelect(acceptedFiles, analyses);

    } catch (error) {
      console.error('❌ File analysis failed:', error);
      alert('File analysis failed. Please try again.');
    } finally {
      setAnalyzingFiles(false);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/*': ['.txt', '.csv'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    multiple: true,
    maxFiles: maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
    validator: (file) => {
      // Custom validation for better user feedback
      if (file.size === 0) {
        return {
          code: 'empty-file',
          message: 'File appears to be empty'
        };
      }
      return null;
    }
  });

  const getAnalysisSummary = () => {
    if (fileAnalyses.length === 0) return null;

    const warnings = fileAnalyses.filter(item => item.analysis.quality.warnings.length > 0).length;
    const recommendations = fileAnalyses.reduce((sum, item) => sum + item.analysis.recommendations.length, 0);

    return { total: fileAnalyses.length, warnings, recommendations };
  };

  const summary = getAnalysisSummary();

  return (
    <div className="space-y-6">
      {/* Main Upload Zone */}
      <div
        {...getRootProps()}
        role="button"
        tabIndex={0}
        aria-label={analyzingFiles ? "Analyzing files, please wait" : "Upload files for analysis"}
        aria-describedby="upload-instructions"
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 ${
          isDragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02]'
            : analyzingFiles
            ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 hover:shadow-md'
        }`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Trigger file input click
            const input = e.currentTarget.querySelector('input');
            input?.click();
          }
        }}
      >
        <input {...getInputProps()} aria-hidden="true" />

        <div className="space-y-4">
          {analyzingFiles ? (
            <>
              <div className="text-5xl animate-pulse">🔍</div>
              <div>
                <p className="text-lg font-semibold text-yellow-700 mb-2">
                  Analyzing Files...
                </p>
                <p className="text-sm text-yellow-600">
                  Checking quality, content type, and processing recommendations
                </p>
                <div className="mt-3 flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={`text-5xl transition-transform duration-300 ${isDragActive ? 'scale-110' : ''}`}>
                {isDragActive ? '📥' : '📁'}
              </div>

              {isDragActive ? (
                <div>
                  <p className="text-xl font-bold text-blue-700 mb-2">Drop files here!</p>
                  <p className="text-blue-600">We'll analyze them automatically</p>
                </div>
              ) : (
                <div>
                  <p className="text-xl font-semibold text-gray-800 mb-2">
                    Intelligent File Upload
                  </p>
                  <p className="text-gray-600 mb-4">
                    Drop files or click to browse - we'll analyze them for optimal processing
                  </p>

                  {/* Supported Formats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[
                      { icon: '📄', label: 'Documents', types: 'PDF, DOC' },
                      { icon: '🖼️', label: 'Images', types: 'PNG, JPG' },
                      { icon: '📝', label: 'Text', types: 'TXT, CSV' },
                      { icon: '🎥', label: 'Media', types: 'MP4, MP3' }
                    ].map((format, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
                        <div className="text-2xl mb-1">{format.icon}</div>
                        <div className="text-sm font-medium text-gray-800">{format.label}</div>
                        <div className="text-xs text-gray-500">{format.types}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 space-y-1" id="upload-instructions">
                    <p>✨ Intelligent analysis • Quality assessment • Smart recommendations</p>
                    <p>📏 Max {maxFiles} files • {maxSizeMB}MB each • Instant feedback</p>
                  </div>

                  {/* Screen reader instructions */}
                  <div className="sr-only">
                    Press Enter or Space to open file browser. Drag and drop files or click to select them for upload.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Analysis Results Summary */}
      {summary && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              File Analysis Complete
            </h3>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {summary.total} file{summary.total !== 1 ? 's' : ''} analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Ready to Process</div>
                <div className="text-xs text-gray-600">{summary.total} files prepared</div>
              </div>
            </div>

            {summary.warnings > 0 && (
              <div className="flex items-center space-x-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-yellow-800">Quality Warnings</div>
                  <div className="text-xs text-yellow-700">{summary.warnings} files need attention</div>
                </div>
              </div>
            )}

            {summary.recommendations > 0 && (
              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <InformationCircleIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-purple-800">Smart Tips</div>
                  <div className="text-xs text-purple-700">{summary.recommendations} recommendations available</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadBox;