export const makeModelMap: Record<string, string[]> = {
  BMW: ["3 Series", "5 Series", "X3", "X5", "i4"],
  Chevrolet: ["Camaro", "Equinox", "Malibu", "Silverado", "Traverse"],
  Ford: ["Bronco", "Escape", "Explorer", "F-150", "Mustang"],
  Honda: ["Accord", "CR-V", "Civic", "HR-V", "Pilot"],
  Hyundai: ["Elantra", "Kona", "Santa Fe", "Sonata", "Tucson"],
  Kia: ["Forte", "Niro", "Sorento", "Sportage", "Telluride"],
  Lexus: ["ES 300h", "GX 460", "IS 300", "NX 350", "RX 350"],
  Mazda: ["CX-5", "CX-9", "MX-5", "Mazda3", "Mazda6"],
  Nissan: ["Altima", "Murano", "Pathfinder", "Rogue", "Sentra"],
  Subaru: ["Crosstrek", "Forester", "Impreza", "Legacy", "Outback"],
  Toyota: ["Camry", "Corolla", "Highlander", "Prius", "RAV4"],
  Volkswagen: ["Atlas", "Golf", "Jetta", "Passat", "Tiguan"],
};

export const makeOptions = Object.keys(makeModelMap).map((make) => ({
  value: make,
  label: make,
}));

export const getModelsByMake = (make: string) => makeModelMap[make] || [];
