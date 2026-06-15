import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * Official multi-colour Google "G" mark — same vector paths used on the web
 * (apps/web/src/components/icons/google.tsx) so the Google sign-in button looks
 * identical across web and mobile.
 */
export function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.21-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.73z"
      />
      <Path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.76-3.77H1.29v3.09A12 12 0 0 0 12 24z"
      />
      <Path
        fill="#FBBC05"
        d="M5.3 14.32a7.2 7.2 0 0 1 0-4.63V6.6H1.29a12 12 0 0 0 0 10.81l4.01-3.09z"
      />
      <Path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.29 6.6l4.01 3.09A7.2 7.2 0 0 1 12 4.75z"
      />
    </Svg>
  );
}
