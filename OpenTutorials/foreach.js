const fileList = ['HTML', 'CSS', 'Javascript'];

//fileList.forEach(element => console.log(element));

var list = '<ul>';
fileList.forEach(element => {
    list += `
        <li><a href="/?id=${element}">${element}</a></li>
    `;
});
list += '</ul>';

console.log(list)