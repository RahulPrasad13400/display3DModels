import React, { useState } from 'react';
import Header from '../components/Header';
import { useModelStore } from '../store/model';
import toast from 'react-hot-toast';

export default function Form() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createModel } = useModelStore();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!name || !description || !file) {
      toast.error('Please fill all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);

      const { success, message } = await createModel(formData);
        
      if (success) {
        toast.success(message);
        // Reset form
        setName('');
        setDescription('');
        setFile(null);
        document.getElementById('file').value = ''; // Clear file input
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <form 
          className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-96" 
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Model name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Model description"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload GLB File
            </label>
            <input
              type="file"
              id="file"
              accept=".glb"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-700 file:border file:rounded-lg file:px-4 file:py-2 file:text-white file:bg-blue-500 hover:file:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {file && (
              <p className="mt-2 text-sm text-gray-500">Selected File: {file.name}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}