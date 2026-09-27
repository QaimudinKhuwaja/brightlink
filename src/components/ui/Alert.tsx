'use client';

import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} flex items-start gap-3`}>
      {icons[type]}
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      )}
    </div>
  );
};
