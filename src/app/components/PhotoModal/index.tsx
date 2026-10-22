'use client';

import { useEffect, useCallback } from 'react';
import './PhotoModal.scss';

export interface PhotoImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PhotoModalProps {
  images: PhotoImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PhotoModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: PhotoModalProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    },
    [onClose, onNext, onPrevious],
  );

  useEffect(() => {
    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div className="photo-modal" onClick={onClose}>
      <div
        className="photo-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="photo-modal__close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Image Container */}
        <div className="photo-modal__image-container">
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Image ${currentIndex + 1}`}
            className="photo-modal__image"
          />
        </div>

        {/* Navigation Buttons */}
        {hasPrevious && (
          <button
            className="photo-modal__nav photo-modal__nav--prev"
            onClick={onPrevious}
            aria-label="Previous image"
            type="button"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            className="photo-modal__nav photo-modal__nav--next"
            onClick={onNext}
            aria-label="Next image"
            type="button"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        {/* Image Counter */}
        <div className="photo-modal__counter">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="photo-modal__caption">{currentImage.caption}</div>
        )}
      </div>

      {/* Backdrop */}
      <div className="photo-modal__backdrop"></div>
    </div>
  );
}
