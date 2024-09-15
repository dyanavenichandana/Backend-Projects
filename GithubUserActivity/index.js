const username = process.argv[2];
console.log(username);

fetch(`https://api.github.com/users/${username}/events`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    return res.json();
  })
  .then((res) => show(res))
  .catch((error) => console.error('Error:', error)); 

function show(res) {
 

  res.forEach(event => {
    switch (event.type) {
      case 'CreateEvent':
        console.log(`Created ${event.payload.ref_type} in the repository ${event.repo.name}`);
        break;
      case 'ForkEvent':
        console.log(`Forked ${event.repo.name}`);
        break;
      case 'DeleteEvent':
        console.log(`Deleted ${event.payload.ref_type} in the repository '${event.repo.name}'`);
        break;
      case 'PullRequestEvent':
        console.log(`Pull request ${event.payload.action} to the repository '${event.repo.name}'`);
        break;
      case 'PushEvent':
        console.log(`Pushed ${event.payload.size} commits to the repository '${event.repo.name}'`);
        break;
      default:
        console.log(`${event.type.replace("Event", "")} in ${event.repo.name}`);
        break;
    }
  });
}
