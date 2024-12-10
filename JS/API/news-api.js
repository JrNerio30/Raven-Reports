const APIKEY = "63bb53d3e814c6daccbfa2ab5f79be1c"
const fetchData = async (API) => {
  try {
    const response = await fetch(API);
    
    if (response.status === 429 || response.status === 426) {
      maximumRequest.classList.add("reach-limit-request");
      mainNewsContainer.classList.add("remove");
      return;
    }
    
    if (response.ok) {
      const data = await response.json();
      return data; // Return data if successful
    } else {
      console.error('API request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

let techNews = [];
let politicsNews = [];
let businessNews = [];
let sportsNews = [];

const formatDate = (newsDate) => {
  const datePublished = newsDate.publishedAt;

  const date = new Date(datePublished);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
  return formattedDate;
}

/*/////////////////////////////////////////////
                  TECH NEWS
/////////////////////////////////////////////*/
const technologies = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=canada&max=5&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    techNews = data.articles;
    localStorage.setItem('techNews', JSON.stringify(techNews));
    techLists();
  }
};
technologies();

// PUT HTML TEMPLATES ON THIS FUNCTION
const techLists = () => {
  technologyNewsList.innerHTML = "";
  
  if(techNews.length > 0) {
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
          if(news.content === "[Removed]"){
            newsArticles.style.display = 'none';
          }
    });
  }
}

/*/////////////////////////////////////////////
                  SPORTS NEWS
/////////////////////////////////////////////*/
const sports = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=sports&lang=en&country=canada&max=5&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    sportsNews = data.articles;
    localStorage.setItem('sportsNews', JSON.stringify(sportsNews));
    sportsLists();
  }
};
sports();

const sportsLists = () => {
  sportsNewsList.innerHTML = "";
  if(sportsNews.length > 0){
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
      if(news.content === "[Removed]"){
        newsArticles.style.display = 'none';
      }
    });
  }
}

/*/////////////////////////////////////////////
                POLITICS NEWS
/////////////////////////////////////////////*/

const politics = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=politics&lang=en&country=canada&max=5&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    politicsNews = data.articles;
    localStorage.setItem('politicsNews', JSON.stringify(politicsNews));
    politicsLists();
  }
};
politics();

// PUT HTML TEMPLATES ON THIS FUNCTION
const politicsLists = () => {
  politicsNewsList.innerHTML = "";

  if(politicsNews.length > 0){

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
      if(news.content === "[Removed]"){
        newsArticles.style.display = 'none';
      }
    });
  }
}

/*/////////////////////////////////////////////
              BUSINESS NEWS
/////////////////////////////////////////////*/
const business = async () => {
  const API = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=canada&max=5&apikey=${APIKEY}`;

  const data = await fetchData(API);

  if (data) {
    businessNews = data.articles;
    localStorage.setItem('businessNews', JSON.stringify(businessNews));
    businessLists();
  }
};
business();

const businessLists  = () => {
  businessNewsList.innerHTML = "";
  if(businessNews.length > 0){

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
      if(news.content === "[Removed]"){
        newsArticles.style.display = 'none';
      }
    });
  }
}