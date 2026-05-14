type BlobVariant = 'home' | 'about' | 'pricing' | 'blog' | 'post' | 'contact';

const blob =
  'pointer-events-none absolute -z-10 rounded-full blur-[100px] opacity-40';

export function Blobs({ variant }: { variant: BlobVariant }) {
  if (variant === 'home') {
    return (
      <>
        <div className={`${blob} -left-32 top-0 h-80 w-80 bg-wa/40`} />
        <div className={`${blob} -bottom-40 right-0 h-[28rem] w-[28rem] bg-accent-cyan/30`} />
      </>
    );
  }

  if (variant === 'about' || variant === 'blog') {
    return <div className={`${blob} -left-24 top-0 h-72 w-72 bg-wa/35`} />;
  }

  if (variant === 'pricing') {
    return <div className={`${blob} right-0 top-0 h-96 w-96 bg-accent-cyan/25`} />;
  }

  if (variant === 'post') {
    return (
      <>
        <div className={`${blob} -left-24 top-20 h-72 w-72 bg-wa/30`} />
        <div className={`${blob} right-[-120px] top-1/2 h-96 w-96 bg-accent-emerald/20`} />
      </>
    );
  }

  if (variant === 'contact') {
    return <div className={`${blob} right-0 top-20 h-80 w-80 bg-accent-cyan/25`} />;
  }

  return null;
}
