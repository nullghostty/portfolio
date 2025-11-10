async function loadReposJSON() {
    const res = await fetch(`repos.json`);
    const repos = await res.json();

    repos.forEach((repo) => {
        const repoContainer = document.createElement(`div`);
        const repoImage = document.createElement(`img`);
        const repoName = document.createElement(`h2`);
        const repoLangs = document.createDocumentFragment();

        repo.languages.forEach((lang) => { 
            const span = document.createElement(`span`);
            span.innerText = lang;
            repoLangs.appendChild(span);
        });
        
        repoImage.src = repo.image;
        repoName.innerText = repo.name;
        repoContainer.appendChild(repoImage);
        repoContainer.appendChild(repoName);
        repoContainer.appendChild(repoLangs);
        document.body.appendChild(repoContainer);
    });
}

loadReposJSON();
