import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            TruthShield
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            An AI-powered platform to detect misinformation, manipulated media (deepfakes), 
            and generate legal/personal guidance.
          </p>
          
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Misinformation Detection</h3>
                <p className="text-gray-600">AI-powered analysis of text and media content</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Deepfake Detection</h3>
                <p className="text-gray-600">Identify manipulated images, videos, and audio</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Legal Guidance</h3>
                <p className="text-gray-600">Generate personalized legal advice and reports</p>
              </div>
            </div>
          </div>

          {currentUser ? (
            <Link to="/dashboard">
              <Button size="lg">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;