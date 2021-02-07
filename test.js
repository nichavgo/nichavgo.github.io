fetch('https://nichavgo.github.io/test.json')
    .then(response => response.json())
    .then(data => console.log(data));