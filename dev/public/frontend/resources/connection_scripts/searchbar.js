  const url = '/courses/search';

fetch(url)
  .then(response => response.json())
  .then(repos => {
    console.log(repos);
  })
.catch(err => console.log(err))