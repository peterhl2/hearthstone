const unirest = require("unirest");
const math = require('mathjs');

var req = unirest("GET", "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Minion");

req.query({
    "collectible": "1",
	"cost": "8"
});

req.headers({
	"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	"x-rapidapi-key": "67beb72e78mshde184f81eb6174fp109224jsn421def2bbc1d"
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

    let sum_att = 0
    let sum_def = 0
    let avg_att = 0
    let avg_def = 0
    let list_att = []
    let list_def = []

    const standard = true
    const standardSet = ["Classic", "Basic", "The Witchwood", "The Boomsday Project", "Rastakhan's Rumble", "Rise of Shadows", "Saviors of Uldum"]

    let num = res.body.length
    let count = 0
    for (let i=0; i<num; i++) {
        let set = res.body[i].cardSet
        let pClass = res.body[i].playerClass

        if (standard && standardSet.indexOf(set) < 0) continue

        if (pClass == "Mage") {
            avg_att = (avg_att*count + res.body[i].attack) / (count+1)
            avg_def = (avg_def*count + res.body[i].health) / (count+1)
            count += 1
        }
    }

    console.log("Avg Attack: " + avg_att)
    console.log("Avg Defense: " + avg_def)

    // console.log(res.body[0].attack)

	// console.log(res.body);
});
