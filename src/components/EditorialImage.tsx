import React, { useState } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  caption?: string;
  captionTone?: 'dark' | 'light';
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  caption,
  captionTone = 'dark',
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`m-0 p-0 overflow-hidden ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover block ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full min-h-[260px] flex flex-col justify-end p-8 bg-gradient-to-br from-[#19344B] via-[#527B91] to-[#26343D] text-white"
        >
          <span className="text-xs uppercase tracking-[0.14em] text-[#BEA16B] font-semibold">
            Plumbing In Style
          </span>
          <p className="mt-2 text-sm text-white/85 max-w-md">{alt}</p>
        </div>
      )}
      {caption && (
        <figcaption
          className={`mt-3 text-xs tracking-wide ${
            captionTone === 'light' ? 'text-white/70' : 'text-[#3D474D]/80'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
