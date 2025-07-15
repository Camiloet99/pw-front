import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getSearchHistory, clearSearchHistory } from "../utils/history";

export default function SearchHistory({
  onSearchRepeat,
  refreshToggle,
  onClear,
}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, [refreshToggle]);

  const handleClear = () => {
    clearSearchHistory();
    setHistory([]); // limpieza inmediata visual
    onClear(); // notifica al padre
  };

  if (history.length === 0) return null;

  return (
    <Card className="p-3 mt-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Search History</h5>
        <Button variant="outline-danger" size="sm" onClick={handleClear}>
          Clear History
        </Button>
      </div>
      {history.map((entry, idx) => (
        <div key={idx} className="border-bottom py-2 small">
          <div>
            <strong>{entry.reference || "Unknown Reference"}</strong>{" "}
            <span className="text-muted">
              ({new Date(entry.timestamp).toLocaleString()})
            </span>
          </div>
          <div className="text-muted">
            {entry.brand && `Brand: ${entry.brand}, `}
            {entry.condition && `Condition: ${entry.condition}, `}
            {entry.color && `Color: ${entry.color}, `}
            {entry.material && `Material: ${entry.material}`}
          </div>
          <Button
            variant="outline-primary"
            size="sm"
            className="mt-1"
            onClick={() => onSearchRepeat(entry)}
          >
            Repeat Search
          </Button>
        </div>
      ))}
    </Card>
  );
}
