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

/*
fetch(reposUrl)
    .then((res) => res.json())
    .then((json) => {
        json.forEach((repo) => {
            const para = document.createElement("h2");
            para.innerHTML = repo["name"];
            document.body.appendChild(para);
        });
    });
*/

require(`dotenv`).config();
const fs = require(`fs`).promises;

const token = process.env.TOKEN;

const fetchRepoLanguages = async (repoName) => {
    const res = await fetch(
        `https://api.github.com/repos/nullghostty/${repoName}/languages`,
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/json",
            },
        },
    );
    const langObj = await res.json();

    return Object.keys(langObj);
};

const fetchRepos = async () => {
    const res = await fetch(`https://api.github.com/users/nullghostty/repos`, {
        headers: {
            Authorization: `token ${token}`,
            Accept: "application/json",
        },
    });
    const repos = await res.json();

    const reposJson = await Promise.all(
        repos.map(async (repo) => {
            return {
                name: repo.name,
                languages: await fetchRepoLanguages(repo.name),
            };
        }),
    );

    fs.writeFile(`repos.json`, JSON.stringify(reposJson, null, 2));
};

fetchRepos();
