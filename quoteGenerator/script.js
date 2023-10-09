const getQuotes = () => {
  fetch('https://type.fit/api/quotes')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetch failed');
      }
      return response.json();
    })
    .then((quotes) => {
      let random = Math.floor(Math.random() * quotes.length);
      displayQuote(quotes[random]);
    });
};

const displayQuote = (quote) => {
  const theQuote = document.querySelector('.quote');
  const theAuthor = document.querySelector('.author');

  theQuote.textContent = quote.text;
  theAuthor.textContent = quote.author;
};

document.querySelector('#new-quote').addEventListener('click', getQuotes);
// getQuotes();
