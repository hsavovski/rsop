let fs = require('fs');
let studentsR = require('../contollers/actions/competitors');
let teachersR = require('../contollers/actions/teamLeaders');
let teamsR = require('../contollers/actions/teams');

// "teams":["name","teamLeaderId","competitionId","universityId","score","solvedProblems"],
var data = fs.readFileSync("./data.txt");
data = data.toString('utf8');

var stData = fs.readFileSync("./students.json");
stData = JSON.parse(stData).data;

var tData = fs.readFileSync("./teachers.json");
tData = JSON.parse(tData).data;

let nameT = /(?<=Ръководител.?: )([А-Я][а-я]+ ){1,2}[А-Я][а-я]+/gm
let teachers = data.match(nameT);
let teamLeader = tData.find(el => el.name == teachers[0]);

let team = /(?<=Отбор ([0-9]): ).+/gm
let teams = [...data.match(team)];
console.log(teams);
// tData.find(el => teams[0])
teams.forEach(team => {
    let body = {
        name:team,
        teamLeaderId:teamLeader.id,
        competitionId:2,
        universityId:3,
        score:null,
        solvedProblems:null
    }
    console.log(body)
    teamsR.create(
        {body},
        {json:(data)=>console.log(data)}
    );
    


})

let name = /([А-Я][а-я]+ ){1,2}[А-Я][а-я]+/gm
// let participants = [...data.match(name)];
// console.log(participants);




let uni = /(?<=[0-9]\.  ).+/gm	//университет
// let universities = [...data.match(uni)]
// console.log(universities)
