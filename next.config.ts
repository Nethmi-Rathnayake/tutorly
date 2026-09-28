import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is no public tutor directory: tutor discovery goes through the request form.
  redirects() {
    return [
      { source: "/find-a-tutor", destination: "/request-a-tutor", permanent: false },
      { source: "/tutors/:path*", destination: "/request-a-tutor", permanent: false },
      { source: "/tutor-request/success", destination: "/request-a-tutor/success", permanent: false },
    ];
  },
};

export default nextConfig;
