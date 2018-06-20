$(document).ready(function () {
var options = [
	{
		question: "In what season did the Washington Capitals enter the league?",
		choice: ["1982-1983", "1974-1975", "1988-1989", "1976-1977"],
		answer: 1,
		photo: "assets/images/1974.png"
	 },
	 {
	 	question: "Who was the first player to score 50 goals in a season for the Capitals?",
		choice: ["Alexander Ovechkin", "T.J. Oshie", "Dennis Maruk", "Nathan Walker"],
		answer: 2,
		photo: "assets/images/dennis-maruk.png"
	 },
	 {
	 	question: "How many goals did Alexander Ovechkin score in his rookie season?",
		choice: ["30", "64", "75", "52" ],
		answer: 3,
		photo: "assets/images/Ovechkin.png"
	},
	{
		question: "Which player is the only Capital to have ever worn number 7?",
		choice: ["Yvon Labre", "Madison Bowey", "Tom Wilson", "Nathan Walker" ],
		answer: 0,
		photo: "assets/images/YvonLabre.png"
	},
	{
		question: "The Caps were so bad in their first season that they only won eight games.  Which goalie won all those games for the Caps?",
		choice: ["Mike Marson", "Ron Low", "Yvon Labre", "Doug Mohns" ],
		answer: 1,
		photo: "assets/images/RonLow.png"
	},
	{
		question: "Who of the following players was not a captain of the Capitals?",
		choice: ["Bill Clement", "Alexander Ovechkin", "Guy Charron", "Peter Bondra" ],
		answer: 3,
		photo: "assets/images/PeterBondra.png"
	},
	{
		question: "Which team did the Capitals play in their first Stanley Cup Finals?",
		choice: ["Toronto Maple Leafs", "Vancouver Canucks", "Detroit Red Wings", "New York Rangers" ],
		answer: 2,
		photo: "assets/images/1998Finals.png"
	},
	{
		question: "Who's known as the enforcer for the 2018 Caps?",
		choice: ["T.J. Oshie", "Tom Wilson", "Alexander Ovechkin", "Devante Smith-Pelly" ],
		answer: 1,
		photo: "assets/images/TomWilson.png"
	},
	{
		question: "Who has the best neck beard in hockey?",
		choice: ["Brett Connolly", "John Carlson", "Philipp Grubauer", "Braden Holtby" ],
		answer: 3,
		photo: "assets/images/Braden.png"
	},
	{
		question: "Who scored the winning goal in game five of the 2018 Stanley Cup Final?",
		choice: ["Lars Eller", "Alexander Ovechkin", "Evgeny Kuznetsov", "Jay Beagle" ],
		answer: 0,
		photo: "assets/images/LarsEller.png"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000);
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})
