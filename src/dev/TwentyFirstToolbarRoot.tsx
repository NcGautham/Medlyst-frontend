import { TwentyFirstToolbar } from "@21st-extension/toolbar-react";
import { ReactPlugin } from "@21st-extension/react";

const twentyFirstConfig = {
  plugins: [ReactPlugin],
};

/**
 * Loaded only via dynamic import when import.meta.env.DEV is true (see App.tsx).
 */
export default function TwentyFirstToolbarRoot() {
  return <TwentyFirstToolbar config={twentyFirstConfig} />;
}
