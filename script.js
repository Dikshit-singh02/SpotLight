let newsList = [];

// Function to submit a news article
function submitNews() {
  const title = document.getElementById("newsTitle").value;
  const link = document.getElementById("newsLink").value;
  
  if (title && link) {
    const newsItem = { id: Date.now(), title, link, votes: 0 };
    newsList.push(newsItem);
    displayNews();
    document.getElementById("newsTitle").value = "";
    document.getElementById("newsLink").value = "";
  } else {
    alert("Please enter both title and link.");
  }
}

// Function to display the news feed
function displayNews() {
  const newsContainer = document.getElementById("newsList");
  newsContainer.innerHTML = "";
  
  newsList.sort((a, b) => b.votes - a.votes); // Sort by votes
  
  newsList.forEach(item => {
    const newsDiv = document.createElement("div");
    newsDiv.className = "news-item";

    newsDiv.innerHTML = `
      <div class="news-title">
        <a href="${item.link}" target="_blank">${item.title}</a>
      </div>
      <div>
        <span class="vote-btn upvote" onclick="upvote(${item.id})">⬆</span>
        <span class="vote-count">${item.votes}</span>
        <span class="vote-btn downvote" onclick="downvote(${item.id})">⬇</span>
      </div>
    `;
    
    newsContainer.appendChild(newsDiv);
  });
}

// Function to upvote a news item
function upvote(id) {
  const item = newsList.find(news => news.id === id);
  if (item) {
    item.votes += 1;
    displayNews();
  }
}

// Function to downvote a news item
function downvote(id) {
  const item = newsList.find(news => news.id === id);
  if (item && item.votes > 0) {
    item.votes -= 1;
    displayNews();
  }
}
