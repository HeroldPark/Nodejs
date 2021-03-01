var members = ["herold", "k8805", "hoya"];
console.log(members[1]);
members.forEach(element => {
    console.log('foreach : ', element);
    
});

var roles = {
    'programmer':'herold', 'manager':'k8805', 'worker':'hoya'
};
console.log(roles.worker);
console.log(roles['manager']);

for(var n in roles) {
    console.log('Object : ', n, ', Value = ', roles[n]);
}


for (const [key, value] of Object.entries(roles)) {
    console.log('roles => ', `${key} : ${value}`);
}