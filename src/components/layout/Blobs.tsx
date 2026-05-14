type BlobVariant = 'home' | 'about' | 'pricing' | 'blog' | 'post' | 'contact';

export function Blobs({ variant }: { variant: BlobVariant }) {
  if (variant === 'home') {
    return (
      <>
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
      </>
    );
  }

  if (variant === 'about' || variant === 'blog') {
    return <div className="bg-blob blob-1" />;
  }

  if (variant === 'pricing') {
    return (
      <div
        className="bg-blob blob-2"
        style={{ top: 0, right: 0, bottom: 'auto' }}
      />
    );
  }

  if (variant === 'post') {
    return (
      <>
        <div className="bg-blob blob-1" />
        <div
          className="bg-blob blob-2"
          style={{ top: '50%', right: '-200px' }}
        />
      </>
    );
  }

  if (variant === 'contact') {
    return <div className="bg-blob blob-2" />;
  }

  return null;
}
