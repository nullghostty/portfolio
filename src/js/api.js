// Idea:
// Use client-size storage to store api responses once every hour. Use timestamps to determine when the
// last query was made. Perhaps utilize the Cache API check MDN docs. 
// 
// Issue: 
// The GitHub api has a finite number of api calls per hour, that means content might not show if the api is called some 
// number of times. Utilizing storage client-side allows us to store api responses with 200 response. 
//
// API endpoints:
// https://api.github.com/repos/nullghostty/vim-wizards/languages

const reposUrl = "https://api.github.com/users/nullghostty/repos";
fetch(reposUrl)
    .then((res) => res.json())
    .then((json) => {
        json.forEach((repo) => {
            const para = document.createElement("h2");
            para.innerHTML = repo["name"];
            document.body.appendChild(para);
        });
    });
