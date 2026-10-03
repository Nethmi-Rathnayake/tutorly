import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is no public tutor directory: tutor discovery goes through the request form.
  // Each redirect also applies under the /ar prefix.
  redirects() {
    return ["", "/ar"].flatMap((prefix) => [
      { source: `${prefix}/find-a-tutor`, destination: `${prefix}/request-a-tutor`, permanent: false },
      { source: `${prefix}/tutors/:path*`, destination: `${prefix}/request-a-tutor`, permanent: false },
      { source: `${prefix}/tutor-request/success`, destination: `${prefix}/request-a-tutor/success`, permanent: false },
    ]);
  },
};

export default nextConfig;
