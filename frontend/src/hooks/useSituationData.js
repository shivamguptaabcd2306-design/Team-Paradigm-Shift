import { useEffect, useRef, useState } from "react";
import { fetchSituation } from "../api/client.js";

/**
 * Loads the initial mock situation data from the backend, then simulates
 * live report ingestion by draining the incoming queue on an interval —
 * mirroring how a real deployment would stream new reports in over time.
 */
export function useSituationData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reports, setReports] = useState([]);
  const queueIndexRef = useRef(0);
  const incomingQueueRef = useRef([]);

  useEffect(() => {
    let cancelled = false;
    fetchSituation()
      .then((situation) => {
        if (cancelled) return;
        setData(situation);
        setReports(situation.initialReports.map((r) => ({ ...r })));
        incomingQueueRef.current = situation.incomingQueue;
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!data) return undefined;
    const t = setInterval(() => {
      const queue = incomingQueueRef.current;
      if (queueIndexRef.current >= queue.length) return;
      const next = queue[queueIndexRef.current];
      queueIndexRef.current += 1;
      setReports((prev) => [
        ...prev,
        { ...next, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 6000);
    return () => clearInterval(t);
  }, [data]);

  return { data, reports, loading, error };
}
