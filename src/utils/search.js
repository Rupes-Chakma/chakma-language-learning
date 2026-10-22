export function searchAlphabets(alphabets = [], searchTerm = "") {
  const query = String(searchTerm).trim().toLowerCase();

  if (!query) {
    return alphabets;
  }

  return alphabets.filter((alphabet) => {
    const searchableFields = [
      alphabet.character,
      alphabet.letter,
      alphabet.name,
      alphabet.pronunciation,
      alphabet.meaning,
      alphabet.description,
      alphabet.example,
      alphabet.category,
    ];

    return searchableFields.some((field) =>
      String(field ?? "")
        .toLowerCase()
        .includes(query),
    );
  });
}

export function filterByCategory(alphabets = [], category = "All") {
  if (!category || category === "All") {
    return alphabets;
  }

  return alphabets.filter((alphabet) => alphabet.category === category);
}

export function getAlphabetCategories(alphabets = []) {
  return [
    "All",
    ...new Set(alphabets.map((alphabet) => alphabet.category).filter(Boolean)),
  ];
}
