export const LOCATIONS = [
    { value: "970 W Manchester Blvd, Inglewood, CA 90301", label: "970 W Manchester" },
    { value: "5251 W 98th St, Los Angeles, CA", label: "5251 W 98th" },
    { value: "1 World Way, Los Angeles, CA 90045", label: "LAX" },
] as const;

export type LocationValue = (typeof LOCATIONS)[number]["value"];

// ── color swatch helper ────────────────────────────────────────────────────
export const HEX_COLORS = {
    Black: "#1a1a1a",
    White: "#f5f5f5",
    Silver: "#c0c0c0",
    Gray: "#808080",
    Red: "#cc2020",
    Blue: "#1a4fcc",
    Green: "#2e7d32",
    Gold: "#c9a227",
    Brown: "#795548",
    Orange: "#e65100",
    Yellow: "#f9c700",
    Purple: "#6a1b9a",
};

export const CAR_MAKES = [
    "Acura",
    "Audi",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jeep",
    "Kia",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Mazda",
    "Mercedes-Benz",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "RAM",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
];