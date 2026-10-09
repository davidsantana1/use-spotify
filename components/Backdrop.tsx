import Image from "next/image";

export function Backdrop({ image }: { image?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 -left-48 size-160 rounded-full bg-spotify/15 blur-3xl" />
      <div className="absolute -right-48 -bottom-48 size-144 rounded-full bg-spotify/10 blur-3xl" />
      {image && (
        <Image
          key={image}
          src={image}
          alt=""
          fill
          sizes="64px"
          className="scale-125 animate-[fade-in_600ms_ease-out] object-cover opacity-35 blur-3xl"
        />
      )}
    </div>
  );
}
