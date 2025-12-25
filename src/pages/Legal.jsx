// src/pages/Legal.js - FULLY ENHANCED & FUNCTIONAL VERSION
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LegalCard from '../components/legal/LegalCard';
import { MultiJurisdictionAnalyzer, LegalDocumentCollaboration } from '../lib/legalService';
import { 
  ScaleIcon, 
  BookOpenIcon, 
  DocumentCheckIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

const Legal = () => {
  const { currentUser } = useAuth();
  const [showGuide, setShowGuide] = useState(true);
  const [activeExample, setActiveExample] = useState(null);

  const legalResources = [
    {
      title: 'Pakistan Contract Act, 1872',
      description: 'Governing law for contracts and agreements',
      link: 'https://legislative.gov.in/sites/default/files/A1872-09.pdf',
      icon: '📜'
    },
    {
      title: 'Consumer Protection Act, 2019',
      description: 'Rights and remedies for consumers',
      link: 'https://www.mca.gov.in/Ministry/pdf/CPA2019_04082020.pdf',
      icon: '🛡️'
    },
    {
      title: 'Information Technology Act, 2000',
      description: 'Laws for digital transactions and cyber crimes',
      link: 'https://www.meity.gov.in/content/information-technology-act-2000',
      icon: '💻'
    },
    {
      title: 'National Consumer Helpline',
      description: 'Toll-free: 1915',
      link: 'tel:1915',
      icon: '📞'
    },
    {
      title: 'Cyber Crime Portal',
      description: 'Report online crimes instantly',
      link: 'https://cybercrime.gov.in',
      icon: '🛡️'
    },
    {
      title: 'Legal Services Pakistan',
      description: 'Comprehensive legal resources',
      link: 'https://www.legalservicePakistan.com',
      icon: '⚖️'
    }
  ];

  const quickExamples = {
    clause: [
      'Generate confidentiality clause for technology company employees',
      'Create limitation of liability clause for professional services',
      'Draft termination clause for commercial agreement'
    ],
    complaint: [
      'Steps to resolve consumer dispute over defective electronic product',
      'Procedure to address workplace harassment complaint',
      'How to handle breach of contract dispute'
    ],
    guidance: [
      'Legal requirements for starting an e-commerce business',
      'Process for establishing a professional services company',
      'Guide to intellectual property protection for businesses'
    ]
  };

  const legalTips = [
    {
      tip: 'Always get agreements in writing',
      details: 'Verbal agreements are difficult to prove in court'
    },
    {
      tip: 'Keep records of all communications',
      details: 'Emails, messages, and letters serve as evidence'
    },
    {
      tip: 'Consult a lawyer for complex matters',
      details: 'Professional advice prevents costly mistakes'
    },
    {
      tip: 'Verify documents before signing',
      details: 'Read all terms carefully, especially fine print'
    },
    {
      tip: 'Know your limitation periods',
      details: 'Different cases have different time limits to file'
    },
    {
      tip: 'Use registered post for legal notices',
      details: 'Provides proof of delivery and timeline'
    }
  ];

  const faqs = [
    {
      question: 'Is this legal advice?',
      answer: 'No, this is AI-generated information for reference only. Always consult a qualified lawyer for legal advice specific to your situation.'
    },
    {
      question: 'Are Pakistan laws referenced?',
      answer: 'Yes, our AI references relevant Pakistan laws like Contract Act, Consumer Protection Act, IT Act, and other applicable legislation.'
    },
    {
      question: 'Can I use generated content legally?',
      answer: 'Review with a lawyer before using in legal documents. Use generated content as a starting point for discussions with your legal counsel.'
    },
    {
      question: 'How accurate is the information?',
      answer: 'We combine AI with legal templates and regular updates. However, laws change frequently, so always verify with current sources.'
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Yes, we do not store your specific legal queries. Generated content is stored locally in your browser for your convenience.'
    }
  ];

  const handleFillExamples = () => {
    const textareas = document.querySelectorAll('textarea');
    const examples = [
      'Generate a comprehensive NDA clause for our event management platform "Project X" that covers client data, vendor information, and business strategies.',
      'Step-by-step procedure to file a police complaint for online fraud where ₹50,000 was transferred via UPI to a scammer posing as bank official.',
      'Complete legal requirements and procedure to register a food delivery startup as private limited company in Bangalore with 2 co-founders.'
    ];
    
    textareas.forEach((textarea, index) => {
      if (textarea && examples[index]) {
        textarea.value = examples[index];
        // Trigger change event
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
      }
    });
    
    setActiveExample('all');
    setTimeout(() => setActiveExample(null), 3000);
  };

  const handleLoadExample = (type, example) => {
    const textarea = document.querySelector(`[data-type="${type}"] textarea`);
    if (textarea) {
      textarea.value = example;
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
      textarea.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative mb-4">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20"></div>
              <ScaleIcon className="h-16 w-16 text-blue-400 relative" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Global Legal <span className="text-blue-400">AI Assistant</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Generate professional legal content for any jurisdiction worldwide using advanced AI technology.
              Universal legal guidance that works across all legal systems and cultural contexts.
            </p>
          </div>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
          <DocumentTextIcon className="h-10 w-10 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">50+</div>
          <div className="text-slate-400">Legal Templates</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
          <ShieldCheckIcon className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">7</div>
          <div className="text-slate-400">Global Legal Traditions</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
          <UserGroupIcon className="h-10 w-10 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">100%</div>
          <div className="text-slate-400">Culturally Neutral</div>
        </div>
      </div>

      {/* Guide Banner */}
      {showGuide && (
        <div className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-2xl p-6 animate-fadeIn backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 bg-blue-900/50 rounded-xl border border-blue-700/30">
              <LightBulbIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1 ml-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-blue-300 text-lg mb-2">💡 How to Use TruthShield Legal</h3>
                <button
                  onClick={() => setShowGuide(false)}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  Hide guide
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-900/50 text-blue-300 rounded-lg flex items-center justify-center mr-3 font-bold border border-blue-700/30">1</div>
                    <div className="text-blue-300 font-bold">Describe</div>
                  </div>
                  <p className="text-sm text-slate-400">Clearly describe your legal need in simple English. Be specific about context, location, and requirements.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-900/50 text-green-300 rounded-lg flex items-center justify-center mr-3 font-bold border border-green-700/30">2</div>
                    <div className="text-green-300 font-bold">Generate</div>
                  </div>
                  <p className="text-sm text-slate-400">Click generate to get AI-powered legal content with Pakistan law references and practical guidance.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-900/50 text-purple-300 rounded-lg flex items-center justify-center mr-3 font-bold border border-purple-700/30">3</div>
                    <div className="text-purple-300 font-bold">Use</div>
                  </div>
                  <p className="text-sm text-slate-400">Copy, download, or save for reference. Always consult a lawyer before final use.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Worldwide Jurisdictions Showcase */}
      <div className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center">
          <BoltIcon className="h-5 w-5 text-blue-400 mr-2" />
          🌍 Supported Worldwide Jurisdictions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
          {[
            { code: 'common_law', name: 'Common Law', icon: '⚖️', description: 'Precedent-based' },
            { code: 'civil_law', name: 'Civil Law', icon: '📜', description: 'Code-based' },
            { code: 'religious_law', name: 'Religious Law', icon: '🙏', description: 'Faith-based' },
            { code: 'customary_law', name: 'Customary Law', icon: '🌍', description: 'Community-based' },
            { code: 'mixed_system', name: 'Mixed Systems', icon: '🔄', description: 'Hybrid approaches' },
            { code: 'socialist_law', name: 'Socialist Law', icon: '⚒️', description: 'State-centered' },
            { code: 'universal', name: 'Universal', icon: '🌐', description: 'Global principles' }
          ].map((tradition) => (
            <div key={tradition.code} className="bg-slate-800/50 p-3 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-1">{tradition.icon}</div>
                <div className="text-sm font-medium text-white">{tradition.name}</div>
                <div className="text-xs text-slate-400">{tradition.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-300">
            Universal legal guidance applicable across all global jurisdictions
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center">
          <BoltIcon className="h-5 w-5 text-green-400 mr-2" />
          ⚡ Quick Legal Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <button
            onClick={handleFillExamples}
            className={`p-4 bg-slate-800/50 rounded-xl border ${activeExample === 'all' ? 'border-green-400 ring-2 ring-green-200' : 'border-slate-600/50'} hover:bg-slate-700/50 text-left transition-all duration-200`}
          >
            <div className="flex items-center mb-2">
              <ArrowPathIcon className="h-5 w-5 text-green-400 mr-2" />
              <div className="text-green-300 font-bold">Fill All Examples</div>
            </div>
            <div className="text-sm text-slate-400">Auto-fill all forms with realistic sample requests</div>
          </button>

          <a
            href="https://www.Pakistancode.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 text-left transition-colors"
          >
            <div className="flex items-center mb-2">
              <BookOpenIcon className="h-5 w-5 text-blue-400 mr-2" />
              <div className="text-blue-300 font-bold">Browse Pakistan Laws</div>
            </div>
            <div className="text-sm text-slate-400">Access complete Pakistan legislation database</div>
          </a>

          <a
            href="https://nalsa.gov.in/legal-aid-services"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 text-left transition-colors"
          >
            <div className="flex items-center mb-2">
              <ShieldCheckIcon className="h-5 w-5 text-red-400 mr-2" />
              <div className="text-red-300 font-bold">Free Legal Aid</div>
            </div>
            <div className="text-sm text-slate-400">Find free legal assistance services near you</div>
          </a>
        </div>
        
        {/* Quick Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
            <h4 className="font-medium text-blue-300 mb-2 flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Clause Examples
            </h4>
            <div className="space-y-2">
              {quickExamples.clause.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadExample('clause', example)}
                  className="block w-full text-left p-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  {example.substring(0, 60)}...
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
            <h4 className="font-medium text-green-300 mb-2 flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Complaint Examples
            </h4>
            <div className="space-y-2">
              {quickExamples.complaint.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadExample('complaint', example)}
                  className="block w-full text-left p-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  {example.substring(0, 60)}...
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
            <h4 className="font-medium text-purple-300 mb-2 flex items-center">
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Guidance Examples
            </h4>
            <div className="space-y-2">
              {quickExamples.guidance.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLoadExample('guidance', example)}
                  className="block w-full text-left p-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  {example.substring(0, 60)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-600/50 p-6">
            <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl mr-4 border border-green-700/30">
                <DocumentCheckIcon className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Global Legal AI Generators</h2>
                <p className="text-slate-400">Universal AI generation for all legal systems - Culturally neutral</p>
              </div>
            </div>
              <div className="text-sm text-slate-500">
                {currentUser ? `Welcome, ${currentUser.displayName || 'User'}` : 'Sign in for history'}
              </div>
            </div>
            
            <div className="space-y-8">
              <div data-type="clause">
                <LegalCard
                  title="Legal Clause Generator"
                  description="Generate professional legal clauses for contracts, agreements, and legal documents worldwide"
                  type="clause"
                />
              </div>

              <div data-type="complaint">
                <LegalCard
                  title="Dispute Resolution Generator"
                  description="Step-by-step guidance for resolving legal disputes across all jurisdictions and legal systems"
                  type="complaint"
                />
              </div>

              <div data-type="guidance">
                <LegalCard
                  title="Legal Guidance Generator"
                  description="Comprehensive legal guidance for business, professional, and personal situations globally"
                  type="guidance"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Tips */}
          <div className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-600/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="p-2 bg-yellow-900/50 rounded-lg mr-3 border border-yellow-700/30">
                <LightBulbIcon className="h-5 w-5 text-yellow-400" />
              </div>
              Essential Legal Tips
            </h3>
            <div className="space-y-4">
              {legalTips.map((item, index) => (
                <div key={index} className="flex items-start p-3 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors border border-slate-600/50">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-green-900/50 text-green-300 rounded-full flex items-center justify-center text-xs font-bold border border-green-700/30">
                      ✓
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-white">{item.tip}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Resources */}
          <div className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-600/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="p-2 bg-blue-900/50 rounded-lg mr-3 border border-blue-700/30">
                <BookOpenIcon className="h-5 w-5 text-blue-400" />
              </div>
              Legal Resources & References
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {legalResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors group border border-slate-600/50"
                >
                  <div className="text-xl mr-3">{resource.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-blue-400">
                      {resource.title}
                    </div>
                    <div className="text-xs text-slate-400">{resource.description}</div>
                  </div>
                  <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-600/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <div className="p-2 bg-purple-900/50 rounded-lg mr-3 border border-purple-700/30">
                <QuestionMarkCircleIcon className="h-5 w-5 text-purple-400" />
              </div>
              Frequently Asked Questions
            </h3>
            <div className="space-y-5">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-600/50 pb-5 last:border-0 last:pb-0">
                  <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/30 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-red-300 mb-4">🚨 Emergency Contacts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                <div>
                  <div className="font-medium text-white">Police Emergency</div>
                  <div className="text-sm text-slate-400">Immediate assistance</div>
                </div>
                <a href="tel:100" className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
                  100
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                <div>
                  <div className="font-medium text-white">National Emergency</div>
                  <div className="text-sm text-slate-400">All emergency services</div>
                </div>
                <a href="tel:112" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  112
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                <div>
                  <div className="font-medium text-white">Women's Helpline</div>
                  <div className="text-sm text-slate-400">24/7 support</div>
                </div>
                <a href="tel:1091" className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                  1091
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Innovative Features Section */}
      <div className="mb-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-2xl p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full border border-purple-700/30">
              <LightBulbIcon className="h-8 w-8 text-purple-300" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            🚀 Universal Legal AI Features
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Advanced capabilities designed for global legal practice across all cultures and jurisdictions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Multi-Jurisdiction Comparison */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-900/50 rounded-lg border border-purple-700/30">
                <ScaleIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  🌍 Universal Legal Comparison
                </h3>
                <p className="text-slate-400 mb-4">
                  Compare legal principles, procedures, and approaches across different legal traditions worldwide.
                  Essential for international business, cross-cultural disputes, and global legal strategy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Side-by-side legal analysis</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Jurisdiction recommendations</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span>Risk assessment across borders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Collaboration Network */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-pink-900/50 rounded-lg border border-pink-700/30">
                <UserGroupIcon className="h-6 w-6 text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  🤝 Global Legal Collaboration
                </h3>
                <p className="text-slate-400 mb-4">
                  Access legal professionals worldwide through our universal professional network.
                  Connect with qualified experts across all legal traditions and cultural contexts.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Specialty-matched referrals</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Jurisdiction-specific networks</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    <span>Collaboration guidance scripts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-purple-300 bg-purple-900/20 p-4 rounded-lg inline-block border border-purple-700/30">
            <strong>💡 Global Tip:</strong> These universal features work across all legal systems and cultural contexts,
            providing consistent, professional legal guidance regardless of your location or background.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-2xl p-8 text-center backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-700/30">
            <ScaleIcon className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">⚖️ Global Legal Notice</h3>
          <p className="text-slate-300 leading-relaxed mb-6">
            TruthShield Global Legal AI provides AI-generated legal information for educational
            and reference purposes only. This tool does not constitute legal advice, nor does it create
            an attorney-client relationship. Legal systems vary worldwide and local laws may differ.
            Always consult qualified legal professionals in your specific jurisdiction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
              <div className="text-blue-400 font-bold mb-1">For Accuracy</div>
              <div className="text-sm text-slate-400">Always verify with current laws</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
              <div className="text-green-400 font-bold mb-1">For Protection</div>
              <div className="text-sm text-slate-400">Consult qualified legal professionals</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600/50">
              <div className="text-purple-400 font-bold mb-1">For Security</div>
              <div className="text-sm text-slate-400">Keep sensitive information private</div>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Global AI Technology • Universal Legal Principles • Culturally Neutral • TruthShield © 2024
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Legal;