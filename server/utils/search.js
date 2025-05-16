const natural = require('natural');
const stopword = require('stopword');

// Function to process search query and extract meaningful keywords
const processSearchQuery = (query) => {
  // Convert to lowercase
  const lowercaseQuery = query.toLowerCase();
  
  // Tokenize the query
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(lowercaseQuery);
  
  // Remove stopwords
  const filteredTokens = stopword.removeStopwords(tokens);
  
  // Stem each word (optional)
  const stemmer = natural.PorterStemmer;
  const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));
  
  return stemmedTokens;
};

// Function to calculate relevance score
const calculateRelevance = (product, keywords) => {
  let score = 0;
  const productText = `${product.name.toLowerCase()} ${product.description ? product.description.toLowerCase() : ''}`;
  
  keywords.forEach(keyword => {
    // Add points if keyword directly matches
    if (productText.includes(keyword)) {
      score += 10;
    }
    
    // Add points for partial matches
    if (keyword.length > 3) {
      for (let i = 3; i < keyword.length; i++) {
        const partial = keyword.substring(0, i);
        if (productText.includes(partial)) {
          score += 2;
        }
      }
    }
  });
  
  return score;
};

module.exports = {
  processSearchQuery,
  calculateRelevance
};