import { useEffect } from 'react';

export function useMetaDescription(description) {
  useEffect(() => {
    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    const prev = meta.content;
    meta.content = description;

    return () => {
      meta.content = prev;
    };
  }, [description]);
}
