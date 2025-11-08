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

const fetchRepoLanguages = async (repoName) => {
    const res = await fetch(
        `https://api.github.com/repos/nullghostty/${repoName}/languages`,
    );
    const langObj = await res.json();

    return Object.keys(langObj);
};

const fetchRepos = async () => {
    // add try catch
    const res = await fetch(`https://api.github.com/users/nullghostty/repos`);
    const repos = await res.json();

    repos.forEach(async (repo) => {
        const langs = await fetchRepoLanguages(repo[`name`]);

        const card = document.createElement(`div`);
        const repoName = document.createElement(`h4`);
        const repoLangs = document.createDocumentFragment();

        repoName.innerText = repo[`name`];

        for (let i in langs) {
            const span = document.createElement(`span`);
            span.innerText = langs[i];
            repoLangs.appendChild(span);
        }
        
        card.appendChild(repoName);
        card.appendChild(repoLangs);
        document.body.appendChild(card);
    });
};

fetchRepos();
