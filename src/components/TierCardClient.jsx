import { Card, Button } from "react-bootstrap";

export default function TierCardClient({
  tier,
  currentPlan,
  isAdmin,
  onSelect,
}) {
  const features = [
    {
      label: "Monthly search limit",
      value: tier.searchLimit,
      render:
        tier.searchLimit === -1
          ? "✔ Unlimited searches"
          : `✔ ${tier.searchLimit} searches`,
    },
    {
      label: "Price drop notification",
      value: tier.priceDropNotification,
    },
    {
      label: "Search history",
      value: tier.searchHistoryLimit,
      render: `✔ ${tier.searchHistoryLimit} entries`,
    },
    {
      label: "Price fluctuation chart",
      value: tier.priceFluctuationGraph,
    },
    {
      label: "Autocomplete by reference",
      value: tier.autocompleteReference,
    },
    {
      label: "Advanced search",
      value: tier.advancedSearch,
    },
  ];

  const included = features.filter(
    (f) => f.value === true || f.value > 0 || f.value === -1
  );
  const excluded = features.filter((f) => f.value === false || f.value === 0);

  const isCurrent = currentPlan ? currentPlan === tier.id : false;

  return (
    <Card className="h-100 shadow-lg border-0 bg-light">
      <Card.Body className="text-center d-flex flex-column">
        <h4 className="fw-bold text-dark">{tier.name}</h4>
        <p className="text-muted small">{tier.description}</p>
        <h5 className="fw-semibold my-3">${tier.price?.toFixed(2)}</h5>

        <ul className="list-unstyled text-start mt-3 mb-4 small">
          {included.map((feat, idx) => (
            <li key={idx} className="text-success">
              {feat.render || "✔ " + feat.label}
            </li>
          ))}
          {tier.extraProperties?.map((prop, idx) => (
            <li key={`extra-${idx}`} className="text-muted fst-italic">
              ✔ {prop}
            </li>
          ))}
          {excluded.map((feat, idx) => (
            <li key={idx} className="text-muted">
              ✖ {feat.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          {isCurrent || isAdmin ? (
            <Button variant="outline-success" disabled className="w-100">
              Current Plan
            </Button>
          ) : (
            <Button variant="dark" className="w-100" onClick={onSelect}>
              Choose {tier.name}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
