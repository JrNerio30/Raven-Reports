const APIKEY = "9a1f38ba8a638879c535ccfbd0da9b5b";
// Function to fetch data from API with retry mechanism
const fetchData = async (API, retries = 3, delay = 1000) => {
  try {
    // Attempt to fetch data from the provided API endpoint
    const response = await fetch(API);
    
    // Check if we hit the rate limit (HTTP 429 Too Many Requests)
    if (response.status === 429) {
      // If we still have retries remaining
      if (retries > 0) {
        // Wait for 'delay' milliseconds and try again with exponential backoff
        // Each retry doubles the delay time
        setTimeout(() => fetchData(API, retries - 1, delay * 2), delay);
        return;
      } else {
        // If we're out of retries, show error message to user
        console.error("API request rate limit exceeded. Please try again later.");
        // Add CSS classes to show error state in UI
        maximumRequest.classList.add("reach-limit-request");
        mainNewsContainer.classList.add("remove");
        return;
      }
    }
    
    // If the response is successful (HTTP 200-299)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();
      // Return the parsed data
      return data;
    } else {
      // If response wasn't successful, log the error status
      console.error("API request failed with status:", response.status);
    }
  } catch (error) {
    // If any error occurs during the fetch operation, log it
    console.error("Error fetching data:", error);
  }
};

let techNews = [];
let politicsNews = [];
let businessNews = [];
let sportsNews = [];

const formatDate = (newsDate) => {
  const datePublished = newsDate.publishedAt;

  const date = new Date(datePublished);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return formattedDate;
};

/*/////////////////////////////////////////////
                  TECH NEWS
/////////////////////////////////////////////*/

const technologies = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=ca&max=10&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    techNews = data.articles;
    localStorage.setItem("techNews", JSON.stringify(techNews));
    techLists();
  }
};
technologies();

// PUT HTML TEMPLATES ON THIS FUNCTION
const techLists = () => {
  technologyNewsList.innerHTML = "";

  if (techNews.length > 0) {
    techNews.forEach((news) => {
      const newsArticles = document.createElement("article");

      newsArticles.innerHTML = `
            <section>
              <a href="${news.url}" target="_blank">
                <h3>
                  ${news.title}<span><i class="fa-solid fa-link"></i></span>
                </h3>
              </a>
              <p>${news.description}</p>
              <p>${formatDate(news)}</p>
            </section>
            <figure>
              <img src="${news.image}" alt="${news.description}">
            </figure>
          `;
      technologyNewsList.appendChild(newsArticles);
    });
  }
};

/*/////////////////////////////////////////////
                  SPORTS NEWS
/////////////////////////////////////////////*/
const sports = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=sports&lang=en&country=ca&max=10&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    sportsNews = data.articles;
    localStorage.setItem("sportsNews", JSON.stringify(sportsNews));
    sportsLists();
  }
};
sports();

const sportsLists = () => {
  sportsNewsList.innerHTML = "";
  if (sportsNews.length > 0) {
    sportsNews.forEach((news) => {
      const newsArticles = document.createElement("article");

      newsArticles.innerHTML = `
        <section>
          <a href="${news.url}" target="_blank">
            <h3>
              ${news.title}<span><i class="fa-solid fa-link"></i></span>
            </h3>
          </a>
          <p>${news.description}</p>
          <p>${formatDate(news)}</p>
        </section>
        <figure>
          <img src="${news.image}" alt="${news.description}">
        </figure>
      `;
      sportsNewsList.appendChild(newsArticles);
    });
  }
};

/*/////////////////////////////////////////////
                POLITICS NEWS
/////////////////////////////////////////////*/

const politics = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=politics&lang=en&country=ca&max=10&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    politicsNews = data.articles;
    localStorage.setItem("politicsNews", JSON.stringify(politicsNews));
    politicsLists();
  }
};
politics();

// PUT HTML TEMPLATES ON THIS FUNCTION
const politicsLists = () => {
  politicsNewsList.innerHTML = "";

  if (politicsNews.length > 0) {
    politicsNews.forEach((news) => {
      const newsArticles = document.createElement("article");
      newsArticles.innerHTML = `
            <section>
              <a href="${news.url}" target="_blank">
                <h3>
                  ${news.title}<span><i class="fa-solid fa-link"></i></span>
                </h3>
              </a>
              <p>${news.description}</p>
              <p>${formatDate(news)}</p>
            </section>
            <figure>
              <img src="${news.image}" alt="${news.description}">
            </figure>
          `;
      politicsNewsList.appendChild(newsArticles);
    });
  }
};

/*/////////////////////////////////////////////
              BUSINESS NEWS
/////////////////////////////////////////////*/
const business = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=ca&max=10&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    businessNews = data.articles;
    localStorage.setItem("businessNews", JSON.stringify(businessNews));
    businessLists();
  }
};
business();

const businessLists = () => {
  businessNewsList.innerHTML = "";
  if (businessNews.length > 0) {
    businessNews.forEach((news) => {
      const newsArticles = document.createElement("article");

      newsArticles.innerHTML = `
        <section>
          <a href="${news.url}" target="_blank">
            <h3>
              ${news.title}<span><i class="fa-solid fa-link"></i></span>
            </h3>
          </a>
          <p>${news.description}</p>
          <p>${formatDate(news)}</p>
        </section>
        <figure>
          <img src="${news.image}" alt="${news.description}">
        </figure>
      `;
      businessNewsList.appendChild(newsArticles);
    });
  }
};
