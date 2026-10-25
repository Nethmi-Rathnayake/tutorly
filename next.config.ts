import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The tutor registration sends a resized headshot (at most ~1 MB, see lib/constants/tutor-registration.ts)
    // plus the form JSON. The 1 MB default is too small; 2 MB leaves room for the multipart overhead and
    // stays well under Vercel's 4.5 MB request-body limit.
    serverActions: { bodySizeLimit: "2mb" },
  },
  // There is no public tutor directory: tutor discovery goes through the request form.
  // Each redirect also applies under the /ar prefix.
  redirects() {
    return ["", "/ar"].flatMap((prefix) => [
      { source: `${prefix}/find-a-tutor`, destination: `${prefix}/request-a-tutor`, permanent: false },
      { source: `${prefix}/tutors/:path*`, destination: `${prefix}/request-a-tutor`, permanent: false },
      { source: `${prefix}/tutor-request/success`, destination: `${prefix}/request-a-tutor/success`, permanent: false },
      { source: `${prefix}/autism-tutors-dubai`, destination: `${prefix}/sen-tutors-dubai`, permanent: true },
    ]);
  },
};

export default nextConfig;
