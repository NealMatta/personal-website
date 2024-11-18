import React from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ProjectModal({
  isOpen,
  onClose,
  children,
}: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full relative mx-4 sm:mx-6 md:mx-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl "
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
