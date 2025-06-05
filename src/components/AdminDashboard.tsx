
import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { LogOut, Plus, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onAddGrocery: (groceryData: any) => Promise<boolean>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onAddGrocery }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'groceries');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/djwyomtbo/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      toast.error('Please upload an image first.');
      return;
    }

    setSubmitting(true);
    
    const success = await onAddGrocery({
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrl: formData.imageUrl
    });

    if (success) {
      setFormData({ name: '', price: '', description: '', imageUrl: '' });
    }
    
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-300">Welcome, {user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/30 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New Grocery</h2>
                <p className="text-slate-300">Fill in the details below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter grocery name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Enter grocery description"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Image</label>
                {formData.imageUrl ? (
                  <div className="relative">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors duration-300">
                      {uploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mb-4"></div>
                          <p className="text-white">Uploading image...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-slate-400 mb-4" />
                          <p className="text-white font-medium">Click to upload image</p>
                          <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Grocery...
                  </div>
                ) : (
                  'Add Grocery'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
