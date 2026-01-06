import { useCallback, useState } from "react";

type UseLeadMagnetStatusReturn = {
  status: string | null;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function useLeadMagnetStatus(): UseLeadMagnetStatusReturn {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("Generating...");

      window.setTimeout(() => {
        setStatus("✓ Keys sent to email");
        window.setTimeout(() => setStatus(null), 2500);
      }, 1000);
    },
    [],
  );

  return { status, handleSubmit };
}


