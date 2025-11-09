async function loadReposJSON() {
    const res = await fetch(`repos.json`);
    const repos = await res.json();

    repos.forEach((repo) => {
        const repoContainer = document.createElement(`div`);
        const repoName = document.createElement(`h2`);
        const repoLangs = document.createDocumentFragment();

        repo.languages.forEach((lang) => { 
            const span = document.createElement(`span`);
            span.innerText = lang;
            repoLangs.appendChild(span);
        });

        repoName.innerText = repo.name;
        repoContainer.appendChild(repoName);
        repoContainer.appendChild(repoLangs);
        document.body.appendChild(repoContainer);
    });
}

loadReposJSON();
