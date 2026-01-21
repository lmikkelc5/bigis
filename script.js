const form = document.querySelector("#estimate-form");
const estimateRange = document.querySelector("#estimate-range");
const estimateHint = document.querySelector("#estimate-hint");

const fields = [
  "#guest-count",
  "#tiers",
  "#cake-flavor",
  "#filling",
  "#design-style",
  "#addons",
];

const formatCurrency = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const getValue = (selector) => {
  const field = document.querySelector(selector);
  const raw = Number(field.value);
  return Number.isFinite(raw) ? raw : 0;
};

const hasSelections = () => {
  const required = ["#guest-count", "#tiers"];
  return required.every((selector) => document.querySelector(selector).value);
};

const updateEstimate = () => {
  const base = getValue("#guest-count");
  const tiers = getValue("#tiers");
  const flavor = getValue("#cake-flavor");
  const filling = getValue("#filling");
  const style = getValue("#design-style");
  const addons = getValue("#addons");
  const total = base + tiers + flavor + filling + style + addons;

  if (!hasSelections() || total === 0) {
    estimateRange.textContent = "$650 - $1,200";
    estimateHint.textContent = "Choose a guest range and tiers to see a live estimate.";
    return;
  }

  const low = Math.max(350, Math.round(total * 0.88));
  const high = Math.round(total * 1.18);
  estimateRange.textContent = `${formatCurrency(low)} - ${formatCurrency(high)}`;
  estimateHint.textContent =
    "Estimate updates instantly based on your selections and design detail.";
};

fields.forEach((selector) => {
  const field = document.querySelector(selector);
  field.addEventListener("change", updateEstimate);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

updateEstimate();
