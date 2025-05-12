export const extractSubstrings = (text) => {
  // Regular expression to match substrings starting with < and ending with >
  const pattern = /<[^>]+>/g;

  // Use match method to find all occurrences of the pattern in the text
  const matches = text.match(pattern);

  // Return the matches or an empty array if no match is found
  return matches || [];
};
