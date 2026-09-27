'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Upload, Search, Trash2, Edit, Plus, X } from 'lucide-react';
import { Modal } from '@/components/admin/Modal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useForm } from 'react-hook-form';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string;
  uploadDate: string;
  isActive: boolean;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchImages();
  }, [categoryFilter]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter) params.append('category', categoryFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/gallery?${params}`);
      const data = await response.json();

      if (data.success) {
        setImages(data.data);
        const uniqueCategories = Array.from(new Set(data.data.map((img: GalleryImage) => img.category))) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadingFiles(Array.from(e.target.files));
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'brightlink/gallery');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error('Upload failed');
    }

    return data.url;
  };

  const handleUpload = async (formData: any) => {
    if (uploadingFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setIsUploading(true);
    try {
      for (const file of uploadingFiles) {
        const imageUrl = await uploadToCloudinary(file);

        await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title || file.name.split('.')[0],
            description: formData.description || '',
            category: formData.category,
            imageUrl,
          }),
        });
      }

      setIsUploadModalOpen(false);
      setUploadingFiles([]);
      reset();
      fetchImages();
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = async (formData: any) => {
    if (!editImage) return;

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editImage.id,
          ...formData,
        }),
      });

      if (response.ok) {
        setEditImage(null);
        reset();
        fetchImages();
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/gallery?id=${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchImages();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch('/api/admin/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !isActive }),
      });

      fetchImages();
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gallery Management</h1>
          <p className="text-foreground-secondary mt-1">Upload and manage school gallery images</p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary flex items-center gap-2 px-4 py-2"
        >
          <Plus size={20} />
          Upload Images
        </button>
      </div>

      {/* Filters */}
      <div className="saas-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search images by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchImages()}
                className="w-full pl-10 pr-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground placeholder:text-foreground-secondary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={fetchImages}
              className="btn-primary px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="saas-card p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="saas-card p-12 text-center">
          <Upload className="w-16 h-16 text-foreground-secondary mx-auto mb-4" />
          <p className="text-foreground-secondary mb-4">No images found</p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-primary px-4 py-2"
          >
            Upload Your First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className={`saas-card overflow-hidden ${
                !image.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditImage(image);
                      setValue('title', image.title);
                      setValue('description', image.description || '');
                      setValue('category', image.category);
                    }}
                    className="p-2 bg-card rounded-lg shadow-md hover:bg-accent/5 transition-colors"
                  >
                    <Edit size={16} className="text-accent-blue" />
                  </button>
                  <button
                    onClick={() => setDeleteId(image.id)}
                    className="p-2 bg-card rounded-lg shadow-md hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 truncate">{image.title}</h3>
                <p className="text-sm text-foreground-secondary mb-2 line-clamp-2">{image.description || 'No description'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-accent-blue/10 text-accent-blue rounded-pill border border-accent-blue/20">{image.category}</span>
                  <button
                    onClick={() => handleToggleActive(image.id, image.isActive)}
                    className={`text-xs px-3 py-1 rounded-pill font-medium ${
                      image.isActive
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                        : 'bg-foreground-secondary/10 text-foreground-secondary border border-foreground-secondary/20'
                    }`}
                  >
                    {image.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setUploadingFiles([]);
          reset();
        }}
        title="Upload Images"
        size="md"
      >
        <form onSubmit={handleSubmit(handleUpload)} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground"
            />
            {uploadingFiles.length > 0 && (
              <p className="mt-2 text-sm text-foreground-secondary">
                {uploadingFiles.length} file(s) selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('category', { required: 'Category is required' })}
              placeholder="e.g., Events, Campus, Sports"
              className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground placeholder:text-foreground-secondary"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              {...register('title')}
              placeholder="Leave empty to use filename"
              className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground placeholder:text-foreground-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description (optional)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Add a description..."
              className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground placeholder:text-foreground-secondary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsUploadModalOpen(false);
                setUploadingFiles([]);
                reset();
              }}
              className="btn-secondary flex-1 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || uploadingFiles.length === 0}
              className="btn-primary flex-1 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editImage && (
        <Modal
          isOpen={!!editImage}
          onClose={() => {
            setEditImage(null);
            reset();
          }}
          title="Edit Image"
          size="md"
        >
          <form onSubmit={handleSubmit(handleEdit)} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-2 bg-background border border-card-border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none text-foreground"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setEditImage(null);
                  reset();
                }}
                className="btn-secondary flex-1 px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
