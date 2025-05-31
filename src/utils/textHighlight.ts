import React from "react";

export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) {
    return text;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let matchIndex = normalizedText.indexOf(normalizedQuery);
  let keyCounter = 0;

  while (matchIndex !== -1) {
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const matchText = text.substring(
      matchIndex,
      matchIndex + normalizedQuery.length
    );
    parts.push(
      React.createElement(
        "mark",
        {
          key: `highlight-${keyCounter++}`,
          className:
            "bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 px-0.5 rounded",
        },
        matchText
      )
    );

    lastIndex = matchIndex + normalizedQuery.length;
    matchIndex = normalizedText.indexOf(normalizedQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 1
    ? React.createElement(React.Fragment, null, ...parts)
    : text;
};
