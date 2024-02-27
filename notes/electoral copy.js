const scripts = [
	"data/calendar.json",
	"data/demographics.json",
	"data/fundamentals.json",
	"data/results/data_house.json",
	"data/results/data_house_dem.json",
	"data/results/data_house_rep.json",
	"data/results/data_pres.json",
	"data/results/data_gov.json",
	"data/results/data_sen.json",
	"data/results/data_sen_sp.json",
	"data/results/data_sen_r.json",
	"data/results/data_sen_sp_r.json",
	"data/results/data_pres_house.json",
	"data/results/data_pres_d.json",
	"data/results/data_pres_cd.json",
	"data/results/data_pres_r.json",
	"data/results/data_sos.json",
	"data/results/data_sos_dem.json",
	"data/results/data_sos_rep.json",
	"data/results/data_gov_recall.json",
	"data/results/data_gov_lt.json",
	"data/results/data_gov_dem.json",
	"data/results/data_gov_rep.json",
	"data/results/data_sen_dem.json",
	"data/results/data_sen_rep.json",
	"data/results/data_supremecourt.json",
	"data/results/data_ballot.json",
	"data/results/data_ballot_abortion.json",
	"data/results/data_gov_lt_dem.json",
	"data/results/data_gov_lt_rep.json",
	"data/results/data_attorney_general.json",
	"data/results/data_state_senate.json",
	"data/results/data_state_house.json"
];

scripts.forEach(a => {const b = document.createElement('script'); b.src = a; document.head.appendChild(b)});

window.onload = function(){setTimeout(startUp, 10)};

var dataElement = document.getElementById("data");
var nationalMapElement = document.getElementById('nationalMap');
const states = document.getElementsByClassName("state");

var internationalNumberFormat = new Intl.NumberFormat('en-US'); var numF = new Intl.NumberFormat('en-US');

const numMap = {1:'One',2:'Two',3:'Three',4:'Four',5:'Five',6:'Six',7:'Seven',8:'Eight',9:'Nine',10:'Ten'};

var config = {
	"showDistrictBoxes2024": true,
	"currentPresYear": "2024"
};

const candColors = {
	"box": {
		"d": "rgb(19,146,236)",
		"d1": "rgb(15,140,161)",
		"d2": "rgb(0,44,193)",
		"d3": "rgb(18,92,178)",
		"d4": "rgb(0, 156, 230)",
		"d5": "rgb(45,105,98)",
		"d6": "rgb(92,110,169)",
		"d7": "rgb(130,212,149)",
		"d8": "rgb(0,158,102)",
		"d9": "rgb(27,103,237)",
		"d10": "rgb(133,171,223)",
		"d11": "rgb(0,141,231)",
		"em": "rgb(133,61,204)",
		"g": "rgb(76,139,11)",
		"gw": "rgb(254,125,7)",
		"i": "rgb(133,61,204)",
		"l": "rgb(230,172,0)",
		"no": "rgb(140,98,187)",
		"o": "rgb(110,110,110)",
		"r": "rgb(223,32,45)",
		"rp": "rgb(133,61,204)",
		"u": "rgb(230,172,0)",
		"yes": "rgb(243,124,10)",
		"r1": "rgb(227, 54, 54)",
		"r2": "rgb(136, 7, 18)",
		"r3": "rgb(235, 76, 113)",
		"r4": "rgb(249, 115, 31)",
		"r5": "rgb(255, 128, 147)",
		"r6": "rgb(191, 8, 48)",
		"r7": "rgb(134, 39, 118)",
		"r8": "rgb(203, 129, 207)",
		"r9": "rgb(176, 67, 132)",
		"r10": "rgb(255, 107, 119)",
		"r11": "rgb(255, 206, 71)"
	},
	"text": {
		"d": "rgb(22,100,156)",
		"d1": "rgb(0,110,131)",
		"d2": "rgb(0,14,163)",
		"d3": "rgb(0,62,128)",
		"d4": "rgb(0,124,173)",
		"d5": "rgb(15,75,68)",
		"d6": "rgb(62,80,139)",
		"d7": "rgb(100,182,119)",
		"d8": "rgb(0,128,72)",
		"d9": "rgb(0,73,207)",
		"d10": "rgb(103,141,193)",
		"d11": "rgb(0,111,201)",
		"em": "rgb(79,36,122)",
		"g": "rgb(46,83,7)",
		"gw": "rgb(156,87,22)",
		"i": "rgb(89,22,156)",
		"l": "rgb(179,133,25)",
		"no": "rgb(82,40,138)",
		"o": "rgb(45,45,45)",
		"r": "rgb(156,22,40)",
		"rp": "rgb(79,36,122)",
		"u": "rgb(179,125,0)",
		"yes": "rgb(156,73,22)",
		"r1": "rgb(227, 54, 54)",
		"r2": "rgb(136, 7, 18)",
		"r3": "rgb(235, 76, 113)",
		"r4": "rgb(249, 115, 31)",
		"r5": "rgb(255, 128, 147)",
		"r6": "rgb(191, 8, 48)",
		"r7": "rgb(134, 39, 118)",
		"r8": "rgb(203, 129, 207)",
		"r9": "rgb(176, 67, 132)",
		"r10": "rgb(255, 107, 119)",
		"r11": "rgb(255, 206, 71)"
	}
}

var contests = {};

var zoom = d3.zoom()
	.interpolate(d3.interpolateZoom.rho(1.414))
	.scaleExtent([0.5, 150])
	.filter(function() {return event.type != "dblclick"})
	.on("zoom", zoomed)
	.on("end", function(){d3.select("#nationalMap").call(zoom)});

var svgWidth = calculateSvgWidth(100);
const fixedSvgWidth = svgWidth;

function calculateSvgWidth(z){
	return 800/83.5*z*window.innerWidth / window.innerHeight;
}

d3.geoMercatorUsa = function() {
	return d3.geoMercator()
		.center([-98.583333, 39.833333])
		.translate([992.6783104207782 * 0.753, 345])
		.scale(840 * 1.595);
}

d3.geoMercatorUsaAlaska = function() {
	return d3.geoMercator()
		.center([-152.2782, 64.0685])
		.translate([992.6783104207782 * 0.3, 655])
		.scale(840 * 0.3);
}

d3.geoMercatorUsaHawaii = function() {
	return d3.geoMercator()
		.center([-156.3737, 20.2927])
		.translate([992.6783104207782 * 0.54, 682])
		.scale(840 * 2);
}

var path = d3.geoPath(d3.geoMercatorUsa());
var svg = d3.select("#nationalMap");

svg.attr("viewBox", [0, 0, calculateSvgWidth(100), 800])
	.attr("width", calculateSvgWidth(100))
	.attr("height", 800);

var g = d3.select("#nationalMap").append("g").attr("id","mainG");

function startUp() {
	console.clear();
	console.log("Initialising...");
	$("#data").attr("drag-status", "false");

	var selectedYear = $("#data").attr("button-year");
	var selectedContest = $("#data").attr("button-contest");
	var countyStatus = $("#data").attr("button-county");
	var aheadStatus = $("#data").attr("data-aheadvalue");

	if (selectedYear == null) {$("#data").attr("button-year", Math.floor((new Date().getFullYear()+1) / 4) * 4)}
	if (selectedContest == null) {$("#data").attr("button-contest", "PRESIDENT")}
	if (countyStatus == null) {$("#data").attr("button-county", "false")}
	if (aheadStatus == null) {$("#data").attr("data-aheadvalue", "ahead")}

	createYearButtons();
	createBoundaries();
	createHistoryPanels();

	var svg = d3.select("#nationalMap");

	$("#data").attr("data-road270-party", "m");
	$("#button270-party-magic").attr("class", "partyButton clicked");

	createPollClosingArrays();

	setTimeout(importElectionDataInitial, 400);
//	setInterval(importElectionDataToday, 15000);
	setInterval(importElectionDataToday, 30000);
//	setInterval(importElectionDataToday, 120000);

	generateHouseGroupBoxes();
	createSenateWhatIf();
	listenersCandTextScale();
	// listenerScaleFilterLabels();
}

function scaleCandText(){
	scaleText('resultsOneFirstName', 0.235);
	scaleText('resultsTwoFirstName', 0.235);
	scaleText('resultsThreeFirstName', 0.235);
	scaleText('resultsFourFirstName', 0.235);
	scaleText('resultsFiveFirstName', 0.235);
	scaleText('resultsSixFirstName', 0.235);
	scaleText('resultsSevenFirstName', 0.235);
	scaleText('resultsEightFirstName', 0.235);
	scaleText('resultsOneLastName', 0.235);
	scaleText('resultsTwoLastName', 0.235);
	scaleText('resultsThreeLastName', 0.235);
	scaleText('resultsFourLastName', 0.235);
	scaleText('resultsFiveLastName', 0.235);
	scaleText('resultsSixLastName', 0.235);
	scaleText('resultsSevenLastName', 0.235);
	scaleText('resultsEightLastName', 0.235);
	scaleText('resultsOtherName', 0.235);
}

function listenersCandTextScale() {
	var elementIds = ['resultsOneFirstName', 'resultsTwoFirstName', 'resultsThreeFirstName', 'resultsFourFirstName', 'resultsFiveFirstName', 'resultsSixFirstName', 'resultsSevenFirstName', 'resultsEightFirstName', 'resultsOneLastName', 'resultsTwoLastName', 'resultsThreeLastName', 'resultsFourLastName', 'resultsFiveLastName', 'resultsSixLastName', 'resultsSevenLastName', 'resultsEightLastName', 'resultsOtherName']

	elementIds.forEach(function(id) {
		const target = document.getElementById(id);
		if(target) {
			const observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if(mutation.type === "attributes" || mutation.type === "childList") {
						scaleText(id, 0.245);
					}
				});
			});
			observer.observe(target, {attributes:true,childList:true,subtree:true});
		}
	});
}

function listenerScaleFilterLabels() {
	['mapLabelFilter', 'mapLabelStat'].forEach(function(id) {
		const target = document.getElementById(id);
		if(target) {
			const observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if(mutation.type === "attributes" || mutation.type === "childList") {
						scaleTextFont(id, 0.25);
					}
				});
			});
			observer.observe(target, {attributes:true,childList:true,subtree:true});
		}
	});
}

function scaleHeadingTextTest() {
	const targetNode = document.getElementById('headingTextContest');

	const observer = new MutationObserver(function(mutationsList, observer) {
		yourFunction();
	});

	observer.observe(targetNode, {attributes: false, childList: true, subtree: true, characterData: true});
}


function importElectionDataInitial(){
// setTimeout(sevenPM, 1);
// setTimeout(eightPM, 2);
// setTimeout(ninePM, 3);

importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-02-03/results-south-carolina-democratic-primary.json", "2024")
	// importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-01-23/results-new-hampshire-republican-primary.json", "2024")

	importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-01-23/results-new-hampshire-democratic-primary.json", "2024")
	return;

	importDDHQ("https://data.ddhq.io/25396","2024");
	importDDHQ("https://data.ddhq.io/25397","2024");
	importDDHQ("https://data.ddhq.io/25401","2024");
	importDDHQ("https://data.ddhq.io/25402","2024");
	importDDHQ("https://data.ddhq.io/25403","2024");
	importDDHQ("https://data.ddhq.io/25410","2024");
	importDDHQ("https://data.ddhq.io/25404","2024");
	importDDHQ("https://data.ddhq.io/25405","2024");
	importDDHQ("https://data.ddhq.io/25406","2024");
	importDDHQ("https://data.ddhq.io/25407","2024");
	importDDHQ("https://data.ddhq.io/25408","2024");
	importDDHQ("https://data.ddhq.io/25409","2024");
	importDDHQ("https://data.ddhq.io/25421","2024");
}

function importElectionDataDDHQ(){
	["25396", "25397", "25401", "25402", "25403", "25404", "25405", "25406", "25407", "25408", "25409", "25411", "25412", "25413", "25414", "25415", "25416", "25417", "25418", "25419", "25420", "25421", "25422", "25423", "25424", "25425", "25426", "25427", "25428", "25429", "25430", "25431", "25432", "25433", "25434", "25435", "25436", "25437", "25438", "25439", "25440", "25441", "26026", "26027", "26028", "26029", "26030", "26031", "26032", "26033", "26034", "26035", "26036", "26037", "26038", "26039", "26040", "26041", "26042", "26043", "26044", "26045", "26046", "26047", "26048", "26049", "26050", "26051", "26054", "26055", "26056", "26057", "26058", "26059", "26060", "26061", "26062", "26052", "26053", "26064", "26065", "26066", "26067", "26068", "26069", "26070", "26071", "26073", "26074", "26075", "26077", "26076", "26078", "26072", "26079", "26080", "26081", "26063", "26082", "26083", "26084"].forEach(i => {importDDHQ("https://data.ddhq.io/" + i, "2024")})
}

function importElectionDataToday(){
//	importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-01-23/results-new-hampshire-republican-primary.json", "2024")
	importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-01-23/results-new-hampshire-democratic-primary.json", "2024")
	importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-02-03/results-south-carolina-democratic-primary.json", "2024")
}

function sevenPM() {
	data_house['2024-CO-04']['cand1_vote'] = 250;
	data_house['2024-CO-04']['cand2_vote'] = 700;
	data_house['2024-CO-04']['total_vote'] = 1000;
	data_house['2024-CO-04']['winner'] = "";

	data_president['Indiana']['24']['w'] = "r";
	data_president['Virginia']['24']['w'] = "d";

	data_president['Kentucky']['24']['w'] = "r";

	data_president['South Carolina']['24']['w'] = "r";
	data_president['West Virginia']['24']['w'] = "r";
	data_president['Vermont']['24']['w'] = "d"

	data_sen['2024-Indiana']['winner'] = "r";
	data_sen['2024-Vermont']['winner'] = "i";
	data_sen['2024-Virginia']['winner'] = "d";

	data_gov['2024-Indiana']['winner'] = "r";
	data_gov['2024-Vermont']['winner'] = "r";

	data_president['47037']['24']['reporting'] = 13;

	getResults(); refreshFill();
}

function eightPM() {
	data_president['1057']['24'].t = 1053;
	data_president['1057']['24'].v.d = 616;
	data_president['1057']['24'].v.r = 429;

	data_house['2024-KY-03']['winner'] = "d";
	data_house['2024-PA-14']['winner'] = "r";
	data_house['2024-PA-14']['gain'] = 1;
	data_house['2024-KY-05']['winner'] = "r";
	data_president['Illinois']['24']['w'] = "d";
	data_president['New Jersey']['24']['w'] = "d";
	data_president['Massachusetts']['24']['w'] = "d";
	data_president['Maryland']['24']['w'] = "d";
	data_president['Connecticut']['24']['w'] = "d";
	data_president['Rhode Island']['24']['w'] = "d";
	data_president['Delaware']['24']['w'] = "d";
	data_president['District of Columbia']['24']['w'] = "d";
	data_president['Maine']['24']['w'] = "d";

	data_sen['2024-Delaware']['winner'] = "d";
	data_sen['2024-Massachusetts']['winner'] = "d";
	data_sen['2024-Maryland']['winner'] = "d";
	data_sen['2024-Connecticut']['winner'] = "d";
	data_sen['2024-Rhode Island']['winner'] = "d";
	data_sen['2024-Maine']['winner'] = "i";
	data_sen['2024-Tennessee']['winner'] = "r";
	data_sen['2024-New Jersey']['winner'] = "d";
	data_sen['2024-Mississippi']['winner'] = "r";
	data_sen['2024-West Virginia']['winner'] = "r";

	data_gov['2024-Delaware']['winner'] = "d";
	data_gov['2024-Missouri']['winner'] = "r";
	data_gov['2024-New Hampshire']['winner'] = "r";

	data_president['11001']['24']['w'] = "d";
	data_president['Alabama']['24']['reporting'] = 1;
	data_president['District of Columbia']['24']['t'] = 335818;
	data_president['District of Columbia']['24'].v.d = 317323;
	data_president['District of Columbia']['24'].v.r = 18586;

	data_president['Tennessee']['24'].t = 27;
	data_president['Tennessee']['24'].v.d = 14;
	data_president['Tennessee']['24'].v.r = 13;
	data_president['Tennessee']['24']['reporting'] = 1;

	data_president['Missouri']['24']['w'] = "r";
	data_president['Mississippi']['24']['w'] = "r";
	data_president['Alabama']['24']['w'] = "r";
	data_president['Oklahoma']['24']['w'] = "r";

	data_president['Tennessee']['24']['w'] = "r";
	data_president['Tennessee']['24'].t = 27;
	data_president['Tennessee']['24'].v.d = 14;
	data_president['Tennessee']['24'].v.r = 13;

	data_president['Florida']['24'].t = 7;
	data_president['Florida']['24'].v.d = 6;
	data_president['Florida']['24'].v.r = 1;

	data_president['Michigan']['24'].t = 105;
	data_president['Michigan']['24'].v.d = 61;
	data_president['Michigan']['24'].v.r = 42;

	getResults(); refreshFill();
}

function ninePM() {
	data_sen['2024-New York']['winner'] = "d";
	data_sen['2024-New Jersey']['winner'] = "d";
	data_sen['2024-Minnesota']['winner'] = "d";
	data_sen['2024-Pennsylvania']['winner'] = "d";
	data_sen['2024-North Dakota']['winner'] = "r";
	data_sen['2024-Nebraska']['winner'] = "r";
	data_sen['2024-Wyoming']['winner'] = "r";
	data_sen['2024-New Mexico']['winner'] = "d";

	data_president['Florida']['24']['w'] = "r";
	data_president['New Hampshire']['24']['w'] = "d";

/*	data_president['Michigan']['24'].t = 1053;
	data_president['Michigan']['24'].v.r = 616;
	data_president['Michigan']['24'].v.d = 429;

	data_president['North Carolina']['24'].t = 7;
	data_president['North Carolina']['24'].v.d = 6;
	data_president['North Carolina']['24'].v.r = 1; */

	data_president['New York']['24']['w'] = "d";
	data_president['Colorado']['24']['w'] = "d";

	data_president['Louisiana']['24']['w'] = "r";
	data_president['North Dakota']['24']['w'] = "r";
	data_president['South Dakota']['24']['w'] = "r";
	data_president['Kansas']['24']['w'] = "r";
	data_president['Nebraska']['24']['w'] = "r";
	data_president['Wyoming']['24']['w'] = "r";
	data_president['Arkansas']['24']['w'] = "r";

	getResults(); refreshFill();
}


function initializeSortable(e) {
	var i = document.getElementById(e);
	new Sortable(i, {
		animation: 0,
		group: 'a',
		sort: false,
		swapThreshold: 1,
//		chosenClass: "sortable-a",
		ghostClass: "sortable-b",
		dragClass: "sortable-c",
		onAdd: function(e) {
			let a = e.item.parentNode.getElementsByTagName("span"), b = Array.prototype.slice.call(a);
			b.sort(function(a, b) {return a.innerHTML.localeCompare(b.innerHTML)});
			for (var i = 0; i < b.length; ++i) {e.item.parentNode.appendChild(b[i])}
		},
		onEnd: updateSenateWhatIf
	});
}

function updateSenateWhatIf() {
	let ctL = 28 + $("#gridLeft").find(".grid-square").length;
	let ctC = $("#gridCenter").find("*").length;
	let ctR = 39 + $("#gridRight").find(".grid-square").length;

	$(".g1 .tallyFig").html(ctL);
	$(".g2 .tallyFig").html(ctC);
	$(".g3 .tallyFig").html(ctR);
}

function createSenateWhatIf() {
	// CREATE SENATE WHAT IF
	initializeSortable('gridLeft');
	initializeSortable('gridCenter');
	initializeSortable('gridRight');

	let c = d3.select("#gridCenter"), a = c.selectAll("span").nodes(), b = Array.prototype.slice.call(a);
	b.sort(function(a, b) {return a.innerHTML.localeCompare(b.innerHTML)});
	b.forEach(function(i) {c.node().appendChild(i)})
}

function createProjections(){
	var pY = config['currentPresYear'];
	d3.json("data/ratings.json").then(function(data) {
		let r = data[pY]['P-G'];
		let s = Object.keys(r).sort((a, b) => electoralVotes[b][pY] - electoralVotes[a][pY] || a.localeCompare(b));

		$(".projGroup").find("*").remove();
		s.forEach(a => {
			var tW = data_president[a][pY.slice(-2)]['w'], wC = {"d":"blue","r":"red"}, tC = "projState ";
			if(tW){tC += wC[tW]}

			var thisState = d3.select("[data-rating='" + r[a] + "']").append("span").attr("class", tC);
			thisState.append("span").html(shortAbbreviation[a]);
			thisState.append("span").html(electoralVotes[a][pY]);
		})
	})
}

function setHouseSVG() {
	const yrShort = $("#data").attr("button-year").slice(-2).toString();
	const otherYearDistricts = d3.selectAll(`.cd:not(.cd${yrShort})`);
	otherYearDistricts.each(function() {
		const district = d3.select(this).attr("data-district");
		d3.select(this).attr("id", `${yrShort}_${district}`).style("display", "none");
	});
}

function createBoundaries() {
	d3.json("assets/maps/outlines.topojson")
		.then(function(topo) {
			var pathFunctions = {
				Alaska: d3.geoPath(d3.geoMercatorUsaAlaska()),
				Hawaii: d3.geoPath(d3.geoMercatorUsaHawaii()),
				default: d3.geoPath(d3.geoMercatorUsa())
			};

			var statePaths = g.selectAll("path")
				.data(topojson.feature(topo, topo.objects.states).features)
				.enter()
				.append("path")
  				.attr("d", function(d) {
					const pathFunction = pathFunctions[d.properties.state] || pathFunctions.default;
					return pathFunction(d);
  				})
				.attr("class", "state")
				.on("click", a => clickedFunction(a.target))
				.attr("id", d => d.properties.state)
				.attr("data-region", "s")
				.attr("data-state", a => a.properties.state)
				.attr("data-statefips", a => a.properties.statefips)
				.attr("data-stateabbreviation", a => a.properties.stateabbreviation)
				.attr("data-centroid", function(d) {
					const a = pathFunctions[d.properties.state] || pathFunctions.default;
					return a.centroid(d);
  				})
				.raise();


			/* g.append("g")
				.attr("class", "stateLabel")
				.selectAll("text")
				.data(topojson.feature(topo, topo.objects.states).features)
				.enter()
				.append("text")
				.attr("class","stateLabel")
				.attr("data-state", function(d) {return d.properties.state })
				.attr("fips", function(d) { var id = parseInt(d.properties.id); return id })
				.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
				.html(a => a.properties.stateabbreviation)
				.style("display", "none")
				.lower();
			*/

			g.selectAll("paths")
				.data(topojson.feature(topo, topo.objects.counties).features)
				.enter()
				.append("path")
  				.attr("d", function(d) {
					const pathFunction = pathFunctions[d.properties.state] || pathFunctions.default;
					return pathFunction(d);
  				})
				.attr("class", "county")
				.on("click", a => clickedFunction(a.target))
				.attr("id", function(d) { var id = parseInt(d.properties.id); return id })
				.attr("data-region", "c")
				.attr("data-county", function(d) {return d.properties.county })
				.attr("data-countyname", function(d) {return d.properties.countyname })
				.attr("data-countytype", function(d) {return d.properties.countytype })
				.attr("data-state", function(d) {return d.properties.state })
				.attr("data-statefips", function(d) {return d.properties.statefips })
				.attr("data-stateabbreviation", a => a.properties.stateabbreviation)
				.attr("data-centroid", function(d) {
					const a = pathFunctions[d.properties.state] || pathFunctions.default;
					return a.centroid(d);
  				})
				.lower();


			g.append("g")
				.attr("class", "bubble")
				.selectAll("circle")
				.data(topojson.feature(topo, topo.objects.counties).features)
				.enter()
				.append("circle")
				.attr("class","countyBubble")
				.attr("data-state", function(d) {return d.properties.state })
				.attr("fips", function(d) { var id = parseInt(d.properties.id); return id })
				.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
				.attr("r", 1.5)
				.style("display", "none")
				.lower();

			g.selectAll("paths")
				.data(topojson.feature(topo, topo.objects.townships).features)
				.enter()
				.append("path")
				.attr("d", path)
				.on("click", function(event) {clickedFunction(event.target)})
				.attr("class", "township")
				.attr("id", function(d) {var id = parseInt(d.properties.id); return id})
				.attr("data-township", function(d) {return d.properties.township})
				.attr("data-countytype", function(d) {return d.properties.townshiptype})
				.attr("data-countyfips", function(d) {return d.properties.countyfips})
				.attr("data-state", function(d) {return d.properties.state })
				.attr("data-statefips", function(d) {return d.properties.statefips })
				.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});

			d3.selectAll('.state').raise();
			initialReset()

			d3.json("assets/maps/districts_old.topojson").then(function(topo) {
				g.selectAll()
					.data(topojson.feature(topo, topo.objects.districts).features)
					.enter()
					.append("path")
			  		.attr("d", function(d) {
						var pathF = (pathFunctions[d.properties.state] || pathFunctions.default).digits(2);
						return pathF(d);
  					})
					.on("click", function(event) { clickedFunction(event.target) })
					.attr("class", function(d) {return d.properties.cd })
					.attr("id", function(d) {return d.properties.district })
					.attr("data-district", function(d) {return d.properties.district })
					.attr("data-districtnumber", function(d) {return d.properties.districtnumber })
					.attr("data-districtatlarge", function(d) {return d.properties.districtatlarge })
					.attr("data-state", function(d) {return d.properties.state })
					.attr("data-statefips", function(d) {return d.properties.statefips })
					.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});

			d3.json("assets/maps/districts_current.topojson").then(function(topo) {
				g.selectAll()
					.data(topojson.feature(topo, topo.objects.districts).features)
					.enter()
					.append("path")
			  		.attr("d", function(d) {
						var pathF = (pathFunctions[d.properties.state] || pathFunctions.default).digits(1);
						return pathF(d);
  					})
					.on("click", function(event) { clickedFunction(event.target) })
					.attr("class", function(d) {return d.properties.cd })
					.attr("id", function(d) {return d.properties.district })
					.attr("data-district", function(d) {return d.properties.district })
					.attr("data-districtnumber", function(d) {return d.properties.districtnumber })
					.attr("data-districtatlarge", function(d) {return d.properties.districtatlarge })
					.attr("data-state", function(d) {return d.properties.state })
					.attr("data-statefips", function(d) {return d.properties.statefips})
					.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});

				createStateLeg();
				setHouseSVG();
				refreshFill();
				returnHome();
				createLabels();
			
				d3.select("#nationalMap").on("dblclick.zoom", null).call(zoom)

				let a = document.querySelector('svg').getAttribute('viewBox').split(',');
				let bPath = [
					'M',a[0],a[1],
					'L',a[2],a[1],
					'L',a[2],a[3],
					'L',a[0],a[3]
					,'Z'].join(' ');

				g.append("rect")
					.attr("height",1600).attr("width", calculateSvgWidth(200))
					.attr("y",-400).attr("x", -calculateSvgWidth(50))
					.style("visibility","hidden")
					.lower();

				svg.append("path")
					.attr("id","mapBase")
					.attr("d", bPath)
					.on("click",returnHome)
					.lower();

				g.node().appendChild(d3.select("#pathDrawn").node());
				console.clear();
				// createEVBoxes();
			});
		});
	});
}

function createStateLeg() {
	d3.json("assets/maps/stateleg.topojson").then(function(topo) {
		g.selectAll()
			.data(topojson.feature(topo, topo.objects.hd).features)
				.enter()
				.append("path")
			  	.attr("d", function(d) {
					const pathF = d3.geoPath(d3.geoMercatorUsa());
					return pathF(d);
  				})
				.on("click", function(event) { clickedFunction(event.target) })
				.attr("class", function(d) {return d.properties.hd})
				.attr("id", function(d) {return "HD-" + d.properties.district})
				.attr("data-district", function(d) {return d.properties.district })
				.attr("data-districtnumber", function(d) {return d.properties.districtnumber })
				.attr("data-state", function(d) {return d.properties.state })
				.attr("data-statefips", function(d) {return d.properties.statefips })
				.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});
		g.selectAll()
			.data(topojson.feature(topo, topo.objects.sd).features)
				.enter()
				.append("path")
			  	.attr("d", function(d) {
					return d3.geoPath(d3.geoMercatorUsa())(d);
  				})
				.on("click", function(event) { clickedFunction(event.target) })
				.attr("class", function(d) {return d.properties.sd})
				.attr("id", function(d) {return "SD-" + d.properties.district})
				.attr("data-district", function(d) {return d.properties.district })
				.attr("data-districtnumber", function(d) {return d.properties.districtnumber })
				.attr("data-state", function(d) {return d.properties.state })
				.attr("data-statefips", function(d) {return d.properties.statefips })
				.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});
			});
}

function createHouse() {
		d3.json("assets/maps/districts_historical.topojson").then(function(topo) {
			const pathFunctions = {
				Alaska: d3.geoPath(d3.geoMercatorUsaAlaska()),
				Hawaii: d3.geoPath(d3.geoMercatorUsaHawaii()),
				default: d3.geoPath(d3.geoMercatorUsa())
			};
				g.selectAll()
					.data(topojson.feature(topo, topo.objects.districts).features)
					.enter()
					.append("path")
			  		.attr("d", function(d) {
						const pathF = pathFunctions[d.properties.state] || pathFunctions.default;
						return pathF(d);
  					})
					.on("click", function(event) { clickedFunction(event.target) })
					.attr("class", function(d) {return d.properties.cd })
					.attr("id", function(d) {return d.properties.district })
					.attr("data-district", function(d) {return d.properties.district })
					.attr("data-districtnumber", function(d) {return d.properties.districtnumber })
					.attr("data-districtatlarge", function(d) {return d.properties.districtatlarge })
					.attr("data-state", function(d) {return d.properties.state })
					.attr("data-statefips", function(d) {return d.properties.statefips })
					.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});
		})
}

function zoomed(event) {
	d3.select("svg").on("mousedown.zoom", null);

	const {transform} = event;
	const cScale = transform.k;

	g.attr("transform", transform);

	document.querySelectorAll("#mainG .labelCircle").forEach(function (c) {
		c.setAttribute("r", 5 / cScale);
	})

	const mainG = document.getElementById("mainG");
	const labelTexts = mainG.querySelectorAll(".labelText");
	const labels = mainG.querySelectorAll(".label");

	labelTexts.forEach((labelText) => {
		var scale = 6.66 / cScale - 1;
		var x = -+labelText.getAttribute("x") * scale;
		var y = -+labelText.getAttribute("y") * scale;

		switch (labelText.getAttribute("data-label_pos")) {
			case "T": y -= 18 / cScale; break;
			case "B": y += 24 / cScale; break;
			case "L": x -= 12 / cScale; break;
			case "R": x += 12 / cScale; break;
		}

		labelText.setAttribute("transform", `translate(${x},${y}) scale(${6.66 / cScale})`);
	});

	if (cScale <= 1) {
		labelTexts.forEach((a) => (a.style.opacity = 0));
		labels.forEach((a) => (a.style.opacity = 0));
	} else if (cScale < 2) {
		labelTexts.forEach((a) => (a.style.opacity = cScale - 1));
		labels.forEach((a) => (a.style.opacity = cScale - 1));
	} else {
		labels.forEach((a) => (a.style.opacity = 1));
		labelTexts.forEach((a) => (a.style.opacity = 1));
	}

	if($("#data").attr("data-bubbles") == "show"){
		var stateClick = $("#data").attr("data-stateclick");
		d3.selectAll('.countyBubble[data-state="' + stateClick + '"]')
			.each(function() {
				let radiusAttr = d3.select(this).attr("data-radius");
				d3.select(this).attr("r", d3.max([0.1, Math.sqrt((18*radiusAttr) * (18/cScale))]))
			})
	}
}


function createHouseOrigi() {
	console.log("Creating historical congressional district paths");
	var districtFiles = ["assets/maps/district1.topojson", "assets/maps/district2.topojson", "assets/maps/district3.topojson", "assets/maps/district4.topojson",
		"assets/maps/district5.topojson", "assets/maps/district6.topojson", "assets/maps/district7.topojson", "assets/maps/district8.topojson",
		"assets/maps/district9.topojson"];

	var path = d3.geoPath(d3.geoMercatorUsa());
	var pathAlaska = d3.geoPath(d3.geoMercatorUsaAlaska());
	var pathHawaii = d3.geoPath(d3.geoMercatorUsaHawaii());

	districtFiles.forEach(function(url) {
		var objectName = url.split("/").pop().split(".")[0];

		d3.json(url)
			.then(function(topo) {
				var geojson = topojson.feature(topo, topo.objects[objectName]);
				var cdPaths = g.selectAll()
					.data(geojson.features)
					.enter()
					.append("path")
					.attr("d", function(d) {
							if (d.properties.state == "Alaska") {
								return pathAlaska(d);
							} else if (d.properties.state == "Hawaii") {
								return pathHawaii(d);
							} else {
								return path(d);
							}
						})
					.on("click", function(event) {clickedFunction(event.target)})
					.attr("class", function(d) {return d.properties.cd})
					.attr("id", function(d) {return d.properties.district})
					.attr("data-district", function(d) {return d.properties.district})
					.attr("data-districtnumber", function(d) {return d.properties.districtnumber})
					.attr("data-districtatlarge", function(d) {return d.properties.districtatlarge})
					.attr("data-state", function(d) {return d.properties.state})
					.attr("data-statefips", function(d) {return d.properties.statefips})
					.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});
				console.log("Created CD paths from file " + objectName.slice(-1));
			});
	});
}

function createHouseAlt() {
	var districtFiles = ["assets/maps/district1.topojson", "assets/maps/district2.topojson", "assets/maps/district3.topojson", "assets/maps/district4.topojson", "assets/maps/district5.topojson", "assets/maps/district6.topojson", "assets/maps/district7.topojson", "assets/maps/district8.topojson",
		"assets/maps/district9.topojson"];

	var batchSize = 2; var batchIndex = 0; var features = [];

	function generatePaths() {
		var path = d3.geoPath(d3.geoMercatorUsa());
		var pathAlaska = d3.geoPath(d3.geoMercatorUsaAlaska());
		var pathHawaii = d3.geoPath(d3.geoMercatorUsaHawaii());

		var cdPaths = g.selectAll()
			.data(d3.merge(features.slice(batchIndex, batchIndex + batchSize).map(function(d) {return d.features})))
			.enter()
			.append("path")
			.attr("d", function(d) {
				if (d.properties.state == "Alaska") {return pathAlaska(d);
				} else if (d.properties.state == "Hawaii") {return pathHawaii(d);
				} else {return path(d);}
			})
			.on("click", function(event) {clickedFunction(event.target)})
			.attr("class", function(d) {return d.properties.cd})
			.attr("id", function(d) {return d.properties.district})
			.attr("data-district", function(d) {return d.properties.district})
			.attr("data-districtnumber", function(d) {return d.properties.districtnumber})
			.attr("data-districtatlarge", function(d) {return d.properties.districtatlarge})
			.attr("data-state", function(d) {return d.properties.state})
			.attr("data-statefips", function(d) {return d.properties.statefips})
			.attr("data-stateabbreviation", function(d) {return d.properties.stateabbreviation});

		console.log("Created CD paths batch "+(batchIndex/batchSize + 1)+" of "+Math.ceil(features.length / batchSize));
		batchIndex += batchSize;

		if (batchIndex < features.length) {generatePaths()} else {setHouseSVG(); houseListeners()}
	}

	Promise.all(districtFiles.map(url => d3.json(url)))
		.then(function(data) {
			features = data.map(function(topo, i) {
				var objectName = districtFiles[i].split("/").pop().split(".")[0];
				return topojson.feature(topo, topo.objects[objectName]);
			});
			generatePaths();
		});
}

function houseListeners() {
	var countyPaths = document.querySelectorAll('.cd');
	countyPaths.forEach(path => {
		path.addEventListener('mousedown', (event) => {
			clickStartTime = new Date().getTime();
			$("#data").attr("drag-status", "true")
		});
		path.addEventListener('mouseup', (event) => {
			const clickDuration = new Date().getTime() - clickStartTime;
			if(clickDuration > 250) {
				event.preventDefault();
				dataElement.setAttribute("drag-status", "true")
			} else {
				dataElement.setAttribute("drag-status", "false")
			}
		});
	});
}

function createLabels() {
	var proj = d3.geoMercator().center([-98.583333, 39.833333]).translate([992.6783104207782 * 0.753, 345]).scale(840 * 1.595);
	var projAlaska = d3.geoMercator().center([-152.2782, 64.0685]).translate([992.6783104207782 * 0.3, 655]).scale(840 * 0.3);
	var projHawaii =  d3.geoMercator().center([-156.3737, 20.2927]).translate([992.6783104207782 * 0.54, 682]).scale(840*2);

	d3.json("assets/maps/cities.geojson")
		.then(function(data) {
			g.selectAll(".label")
				.data(data.features)
				.enter()
				.append("circle")
				.attr("class", "label labelCircle")
				.attr("r", 5)
				.style("opacity", 0)
				.attr("cx", function(d) {
					var projection;
					switch (d.p.fips) {
						case "02": projection = projAlaska; break;
						case "15": projection = projHawaii; break;
						default: projection = proj; break;
    					}
					return projection(d.geo)[0];
				})
				.attr("cy", function(d) {
					var projection;
					switch (d.p.fips) {
						case "02": projection = projAlaska; break;
						case "15": projection = projHawaii; break;
						default: projection = proj; break;
    					}
					return projection(d.geo)[1]
				})
				.attr("data-state", function(d) {return fipsState[parseInt(d.p.fips)]});

			g.selectAll("text")
				.data(data.features)
				.enter()
				.append("text")
				.attr("text-anchor", "middle")
				.attr("alignment-baseline", "middle")
				.html(function(d) {return d.p.l})
				.attr("class", "label labelText")
				.attr("x", function(d) {
					var projection;
					switch (d.p.fips) {
						case "02": projection = projAlaska; break;
						case "15": projection = projHawaii; break;
						default: projection = proj; break;
    					}
					return projection(d.geo)[0];
				})
				.attr("y", function(d) {
					var projection;
					switch (d.p.fips) {
						case "02": projection = projAlaska; break;
						case "15": projection = projHawaii; break;
						default: projection = proj; break;
    					}
					return projection(d.geo)[1]
				})
				.attr("data-city", function(d) {return d.p.title})
				.attr("data-statefips", function(d) {return d.p.fips})
				.attr("data-state", function(d) {return fipsState[parseInt(d.p.fips)]})
				.attr("data-fips", function(d) {return d.p.fips})
				.attr("data-label_pos", function(d) {return d.p.pos})
				.attr("data-inside", "TRUE");

			establishPointLabels();
		});
}

function createHistoryPanels() {
	var d = [{id:"One"},{id:"Two"},{id:"Three"},{id:"Four"}];
	var historyPanel = d3.select("#historyPanel")
		.selectAll("div").data(d).enter()
		.append("div").attr("id", t => `historyPanel${t.id}`).attr("class", "historyPanel");

	var historyPanels = d3.selectAll(".historyPanel");
	historyPanels.append("div").attr("id", t => `historyPanel${t.id}Title`).attr("class", "historyPanelTitle");

	for (let i = 1; i < 4; i++) {
		historyPanels.append('div')
			.attr('id', d => `historyPanel${d.id}Cand${i}`)
			.attr('class', 'historyPanelCand');
	}

	d3.selectAll(".historyPanelTitle")
		.append("span")
		.attr("id", function() {return d3.select(this.parentNode.parentNode).attr("id") + "Year"})
		.attr("class", "historyYear");

	d3.selectAll(".historyPanelTitle")
		.append("span")
		.attr("id", function() {return d3.select(this.parentNode.parentNode).attr("id") + "Contest"})
		.attr("class", "historyMargin");

	d3.selectAll(".historyPanelTitle")
		.append("span")
		.attr("id", function() {return d3.select(this.parentNode.parentNode).attr("id") + "Total"})
		.attr("class", "historyTotal");

	var pCand = d3.selectAll(".historyPanelCand");
	pCand
		.append("span")
		.attr("id", function() {return d3.select(this.parentNode).attr("id") + "Name"})
		.attr("class", "historyCandName");

	pCand
		.append("span")
		.attr("id", function() {return d3.select(this.parentNode).attr("id") + "Perc"})
		.attr("class", "historyCandPerc");

	pCand
		.append("span")
		.attr("id", function() {return d3.select(this.parentNode).attr("id") + "Vote"})
		.attr("class", "historyCandVote");
}

function createYearButtons() {
	const tY = new Date().getFullYear();
	for (let n = tY + 2; n > 1918; n--) {
		let span = document.createElement("span");
		span.id = "buttonYear" + n;
		span.className = "controlButton yearButton";
		span.style.display = n > tY + 1 || n % 4 !== 0 ? "none" : null;
		span.innerHTML = n;
		span.addEventListener("click", clickButtonYear);
		document.getElementById("controlBarYear").appendChild(span);
	}

	const tPY = Math.floor(tY / 4) * 4;
	document.getElementById("data").setAttribute("button-year", tPY);
	document.getElementById("buttonYear" + tPY).className = "yearButton controlButton buttonSelected";
	window.buttonsYear = document.querySelectorAll('[id^="buttonYear"]');
}

function setCSScolors() {

// 	STATE COLORS HAVE L (HSL) VALUE OF 0.45

// 	STATE NOT SELECT COLORS HAVE L (HSL) VALUE OF 0.27
	var stylesheet = document.styleSheets[0];
	var boxColorFills = {}; var textColorFills = {};
	for (let key in candColors) {
		if (candColors.hasOwnProperty(key)) {
			var thisParty = key; var boxColor = candColors[key];
			var fillColor = darkenColor(boxColor, 0.14);
			var textColor = darkenColor(fillColor, 0.14);
			var notSelectedColor = darkenColor(fillColor, 0.1);

			boxColorFills[key] = boxColor; textColorFills[key] = textColor;

			if (candColorClass[key]) {var thisParty = candColorClass[key];}
			var fillTest = "rgb(255,255,255)";
			setInnerHTML('headingTextSubtitle', fillColor)
			var fillClass = key + "State";
			stylesheet.insertRule(`.${fillClass} {fill: ${fillColor}}`);
		}
	}
}

function darkenColor(color, amount) {
	const delta = Math.round(amount * 255);
	const channels = color.match(/\d+/g).map(Number);
	const darkened = channels.map(channel => Math.max(0, channel - delta));
	return `rgb(${darkened.join(", ")})`;
}

function hideResults() {
	document.getElementById("results").classList.add("hidden");
}

function showResults() {
	document.getElementById("results").classList.remove("hidden");
	document.getElementById("resultsCandidates").scrollTop = 0;

	if (document.getElementById("data").getAttribute("last-clicked") === "United States") {
		document.getElementById("resultsBoxTopText").innerHTML = "";
	}
}

function plural(c, n){return `${n}${c !== 1 ? 's' : ''}`}

$('.resultsHouseButton').on('click', houseButtons);
function houseButtons(){
	$('.resultsHouseButton').removeClass('selected');
	$(this).addClass('selected');

	var b = this.textContent; var text, status, suffix;
	switch (b) {
		case "AHD": text = "Leading the vote", status = "lead"; break;
		case "CLD": text = "Called Races", status = "called"; break;
		case "UCD": text = "Uncalled Races", status = "uncalled"; break;
	}

	if(status){$("#data").attr("button-houseCount", status)}
	document.getElementById("resultsBoxTopText").innerHTML = text;
	getResults(); refreshFill();
}

$('#buttonTotalPanel').on('click', clickTotalPanel);
function clickTotalPanel(){
	var st = $("#data").attr("button-resultsTotalPanel");

	if(st == "true"){
		hideTotalPanel()
	} else {
		showTotalPanel()
	}
}

function hideTotalPanel(){
	var d = $("#data"), st = d.attr("button-resultsTotalPanel"), contest = d.attr("button-contest");
	if(contest !== "PRESIDENT" && contest !== "HOUSE"){d.attr("button-resultsTotalPanelOriginal", st)}
	d.attr("button-resultsTotalPanel", "false");
	$("#buttonTotalPanel").addClass("controlButtonNotselected");
	if(d.attr("data-stateclick") == "United States"){
		hideResults(); reset(500); hideVoteType(true);
	}
}

function reviveTotalPanel(){
	var d = $("#data"), st = d.attr("button-resultsTotalPanelOriginal");
	if(st == "true"){
		showResults();
		showTotalPanel();
		d.removeAttr("button-resultsTotalPanelOriginal");
		$("#buttonTotalPanel").css("display", "flex");
	}
}

function showTotalPanel(){
	var d = $("#data"), stateClick = d.attr("data-stateclick"), clicked = d.attr("last-clicked");
	var filters = mapSettings['filters'];

	d.attr("button-resultsTotalPanel", "true");
	$("#buttonTotalPanel").removeClass("controlButtonNotselected");
	if(stateClick == "United States"){
		showVoteType(true); getResults(); showResults(); reset(500);
	}
//	if(d.attr("button-contest") == "HOUSE"){calculateHouseTallies()}
}

$('#buttonShowVoteType').on('click', clickVoteType);
function clickVoteType(){
	if($("#data").attr("button-resultsVoteType") == "true"){hideVoteType()} else {showVoteType()}
	getResults();
}

function showVoteType(r){
	$("#data").attr("button-resultsVoteType", "true");
	document.getElementById("buttonShowVoteType").classList.remove("controlButtonNotselected")
	if(!r){getResults()}
}

function hideVoteType(r){
	$("#data").attr("button-resultsVoteType", "false");
	document.getElementById("buttonShowVoteType").classList.add("controlButtonNotselected")
	if(!r){getResults()}
}

$('#buttonHouseGroups').on('click', toggleHouseGroups);
function toggleHouseGroups(){
	var d = $("#data"), st = d.attr("button-houseGroups"), hG = $("#buttonHouseGroups");

	if(st == "true"){
		d.attr("button-houseGroups", "false");
		hG.addClass("controlButtonNotselected");
		hideHouseGroups();
	} else {
		d.attr("button-houseGroups", "true");
		hG.removeClass("controlButtonNotselected");
		showHouseGroups();
	}
}

function showHouseGroups(){
	$("#resultsHouseGroups")
		.scrollTop(0)
		.addClass("visible");

	var clicked = $("#data").attr("data-stateclick");
	if(clicked == "United States"){
		reset(500)
	} else {
		let level = $("#data").attr("data-level");
		if(level == "state" || level == "county"){
			zoomToState(clicked, 500)
		}
	}
}

function hideHouseGroups(){
	document.getElementById("resultsHouseGroups").classList.remove("visible")

	var clicked = $("#data").attr("data-stateclick");
	if(clicked == "United States"){
		reset(500)
	} else {
		let level = $("#data").attr("data-level");
		if(level == "state" || level == "county"){
			zoomToState(clicked, 500)
		}
	}
}

function getAttr(e, a){
	return document.getElementById(e).getAttribute(a);
}

function calculateHouseTallies() {
	var dE = $("#data");
	var selectedYear = dE.attr("button-year"), selectedContest = dE.attr("button-contest");
	if (selectedContest !== "HOUSE") {return}

	var clicked = dE.attr("last-clicked"), clickLevel = dE.attr("data-level");
	var shortYear = selectedYear.slice(-2).toString();

	var filters = mapSettings['filters'];
	var status = dE.attr("button-houseCount");

	var wCount = {"d": 0, "r": 0}, gainCounts = {"d": 0, "r": 0}, reportingCount = 0, gainCount = 0;
	const abbrev = dE.attr("data-stateabbreviation"), stateClick = dE.attr("data-stateclick");

	var houseSeats = Object.keys(data_house)
		.filter(a => a.startsWith(selectedYear + '-'))
		.filter(a => a.length === 10 && !/\d/.test(a.charAt(5)));

	if (clicked !== "United States" && abbrev) {
		var houseSeats = houseSeats.filter(a => a.substring(5, 7) == abbrev)
	}

	if (filters == "") {
		if (clicked == "United States") {
			if(selectedYear == "2024" && status !== "uncalled"){
				$(".districtBox").css("display", "none")
			} else {
				$(".districtBox").css("display", "initial")
			}
		} else {
			if(selectedYear == "2024" && status !== "lead"){
				$(".districtBox").css("display", "none")
			} else {
				$(".districtBox:not([data-district-state='" + stateClick + "'])").css("display", "none");
				$(".districtBox[data-district-state='" + stateClick + "']").css("display", "initial");
			}
		}
	} else if (filters == "gain") {
		var houseSeats = houseSeats.filter(a => data_house[a].gain == 1)
		$(".districtBox").css("display", "none");
		houseSeats.forEach(cd => {
			let e = document.getElementById("box-" + cd.substring(5,10));
			if(e){e.style.display = "initial"}
		})
	} else if (filters == "uncontested") {
		var houseSeats = houseSeats.filter(a => data_house[a]['cand2_vote'] == undefined);
		$(".districtBox").css("display", "none");
		houseSeats.forEach(cd => {
			let e = document.getElementById("box-" + cd.substring(5,10));
			if(e){e.style.display = "initial"}
		})
	} else if (filters == "openSeat") {
		var houseSeats = houseSeats.filter(a => data_house[a]['incumbent'] == undefined);
		$(".districtBox").css("display", "none");
		houseSeats.forEach(cd => {
			let e = document.getElementById("box-" + cd.substring(5,10));
			if(e){e.style.display = "initial"}
		})
	}

	houseSeats.forEach(cd => {
		var thisUnit = data_house[cd];
		let w = thisUnit.winner, gain = thisUnit.gain;

		if (selectedYear == "2024") {
			if (status == "called") {
				if (wCount.hasOwnProperty(w)) {
					wCount[w]++;
					if (gain == 1) {gainCounts[w]++; gainCount++;}
					let e = document.getElementById("box-" + cd.substring(5,10));
					if(e){e.style.display = "initial"}
				}
			} else {
				var cV = {};
				for (let i = 1; i <= 12; i++) {
					let n = "cand" + i, v = thisUnit[n + "_vote"];
					cV[n] = v || 0;
				}

				var aCand = Object.keys(cV)
					.sort((a, b) => cV[b] - cV[a])
					.map(a => thisUnit[a + "_party"])
					.filter(a => a !== undefined);

				let l = aCand[0];
				if (status == "lead") {
					if (thisUnit['total_vote'] > 0 && l !== "" && wCount.hasOwnProperty(l)) {
						wCount[l]++;
						let e = document.getElementById("box-" + cd.substring(5,10));
						if(e){e.style.display = "initial"}
					} else if (aCand.length == 1) {
						wCount[l]++;
						let e = document.getElementById("box-" + cd.substring(5,10));
						if(e){e.style.display = "initial"}
					}
				} else if (status == "uncalled") {
					if (thisUnit['total_vote'] > 0 && w == "" && l !== "" && wCount.hasOwnProperty(l)) {
						wCount[l]++;
						let e = document.getElementById("box-" + cd.substring(5,10));
						if(e){e.style.display = "initial"}
					} else if (w == "" && aCand.length == 1 && wCount.hasOwnProperty(l)) {
						wCount[l]++;
						let e = document.getElementById("box-" + cd.substring(5,10));
						if(e){e.style.display = "initial"}
					}
				}
			}
		} else {
			if (wCount.hasOwnProperty(w)) {
				wCount[w]++;
				if (gain == 1) {gainCounts[w]++; gainCount++}
			}
		}

		if (data_house[cd].total_vote > 0) {reportingCount++}
	})

	$(".totalsOne .totalFig").html(wCount.d)
	$(".totalsTwo .totalFig").html(wCount.r)

	$(".totalsOne .totalLabel").html(plural(wCount.d, "democrat"))
	$(".totalsTwo .totalLabel").html(plural(wCount.r, "republican"))

	if (gainCount > 0 && filters !== "gain") {
		$(".detailsOne .detailsFig").html(gainCounts.d)
		$(".detailsTwo .detailsFig").html(gainCounts.r)

		$(".detailsOne .detailsText").html(plural(gainCounts.d, "pickup"))
		$(".detailsTwo .detailsText").html(plural(gainCounts.r, "pickup"))

		$(".totalDetails").css("display", "flex")
	} else {
		$(".totalDetails").css("display", "none")
	}
}

function setPollClosingText(dataResults) {
	var dE = $("#data");
	var selectedYear = dE.attr("button-year"), selectedContest = dE.attr("button-contest");
	var clicked = dE.attr("last-clicked"), clickLevel = dE.attr("data-level");

	var tW = dataResults['winner'], winners = dataResults['winner'];

	if (clicked !== "United States") {
		if (primaryContests.includes(selectedContest)) {
			var data = $("#data"), state = data.attr("data-stateclick"), dataLevel = data.attr("data-level");
			if ((dataLevel == "state" && calendar[selectedYear] !== undefined) || (dataLevel == "county" && selectedContest.includes("HOUSE"))) {

				var pD = "",pcText = "", contestText = "POLLS";
				if (selectedYear == "2024") {pD = calendar[selectedYear]['C'][state]}
				switch (selectedContest) {
					case "DEM PRESIDENT": pD = calendar[selectedYear]['P'][state]['d'] || ""; break;
					case "GOP PRESIDENT": pD = calendar[selectedYear]['P'][state]['r'] || ""; break;
				}

				let sC = selectedContest;
				if (selectedYear == "2024" && (sC == "DEM PRESIDENT" || sC == "GOP PRESIDENT")) {
					let raceText = {"G": "R", "D": "D"};
					let raceParty = raceText[sC.charAt(0).toUpperCase()];
					let delState = delegates[selectedYear][raceParty][stateAbbreviation[state]];
					let type = delState['type'];
					if (type == "c") {
						var doorsTime = delState['time'] || ""; contestText = "DOORS";
					}
				}

				if (pD !== "") {
					document.getElementById("resultsPollClosing").innerHTML = "";
					let pT = doorsTime || pollClosingTimes[state];
					let a = moment.tz(selectedYear + pD, 'America/New_York').add(pT + 12, 'hours');
					a = a.clone().tz("Australia/Melbourne");
					let timeNow = moment.tz("America/New_York"), diff = a.diff(timeNow, 'hours', true);
					if (diff < 24) {
						let t = a.format('h:mma z'), tIn;
						if (diff > 0) {
							t = t.replace(/(:00)/g, '');
							if (diff < 4) {
								tIn = "IN " + timeNow.to(a, true)
							}
							pcText = contestText + " CLOSE " + (tIn || t);
							if (dataResults['total_vote'] > 0) {
								pcText = "ALL " + pcText
							}
						} else if (diff > -24) {
							if (tW == "") {
								pcText = contestText + " CLOSED " + t;
								let lU = dataResults['last_updated'];
								if (lU) {
									pcText = "LAST UPDATED " + moment(lU)
										.tz("Australia/Melbourne")
										.format('h:mma z');
								}
							} else {
								showRaceCall(dataResults)
							}
						} else {
							pcText = a.tz("America/New_York").format('MMMM D, YYYY');
						}
					} else if (diff >= 24 && diff < 168) {
						pcText = a.format('dddd h:mma z')
					} else {
						pcText = a.tz("America/New_York").format('MMMM D, h:mma z')
					}
				} else {
					pcText = ""
				}
				if (pcText !== "") {
					document.getElementById("resultsPollClosing").innerHTML = pcText;
				}
				$(".historyPanelTitle").css("height", "15.05vh");
			} else {
				document.getElementById("resultsPollClosing").innerHTML = "";
				$(".historyPanelTitle").css("height", "11.05vh")
			}
		} else {
			document.getElementById("resultsPollClosing").innerHTML = "";
			$(".historyPanelTitle").css("height", "11.05vh")
		}
	}
}

function getResults() {
	var dE = $("#data");
	var selectedYear = dE.attr("button-year"), selectedContest = dE.attr("button-contest");
	var clicked = dE.attr("last-clicked"), clickLevel = dE.attr("data-level");

	if($("#headingTextContest").html() == ""){updateContestText(); scaleHeadingText();}
	if(selectedContest == "PRESIDENT BY CD" && clicked !== "United States"){
		var clickedState = getAttr(clicked, "data-stateabbreviation");
		if(clickedState == undefined){return}
		var clickedCD = getAttr(clicked, "data-districtnumber");
		var dataResultsPCD = data_pres_house[selectedYear][clickedState][clickedCD];
	}

	if(selectedContest == "PRESIDENT BY CD" && clicked == "United States"){
		var dataResultsPCD = data_pres_house[selectedYear]['United States'];
		reorderDistrictBox();
	}

	if(selectedYear >= new Date().getFullYear()){
		reorderDistrictBox();
		document.getElementById("headingReportingText").style.display = "initial"
	} else {
		document.getElementById("headingReportingText").style.display = "none"
	}

	if(selectedContest == "HOUSE" && selectedYear == "2024" && clicked == "United States"){
		if($("#data").attr("button-resultsTotalPanel") == "false"){
			hideResults();
		}
	} else {
		if(clicked !== "United States" && dE.attr("button-road270") !== "true"){
			if(dE.attr("data-presidenttownship") !== "show" && selectedContest !== "HOUSE"){
				showResults();
			}
		}
	}

	if (selectedYear == null || selectedContest == null) {
		let pY = config['currentPresYear'];
		dE.attr("button-year", pY).attr("button-contest", "PRESIDENT");
	}
	var shortYear = selectedYear.slice(-2).toString();
	var dataResults, dataFile = "";

	switch (selectedContest) {
		case "PRESIDENT": dataResults = data_president; break;
		case "PRESIDENT BY CD": dataResults = dataResultsPCD; break;
		case "GOVERNOR": dataFile = data_gov; break;
		case "HOUSE": dataFile = data_house; break;
		case "SENATE": dataFile = data_sen; break;
		case "SENATE SPECIAL": dataFile = data_sen_sp; break;
		case "SENATE RUNOFF": dataFile = data_sen_r; break;
		case "SENATE SPECIAL RUNOFF": dataFile = data_sen_sp_r; break;
		case "DEM PRESIDENT": dataFile = data_president_dem; break;
		case "GOP PRESIDENT": dataFile = data_president_rep; break;
		case "SECRETARY OF STATE": var dataFile = data_sos; break;
		case "GOVERNOR RECALL": dataFile = data_gov_recall; break;
		case "LIEUTENANT GOVERNOR": dataFile = data_gov_lt; break;
		case "GOVERNOR DEM": dataFile = data_gov_dem; break;
		case "GOVERNOR REP": dataFile = data_gov_rep; break;
		case "SENATE DEM": dataFile = data_sen_dem; break;
		case "SENATE REP": dataFile = data_sen_rep; break;
		case "D-HOUSE": dataFile = data_house_dem; break;
		case "R-HOUSE": dataFile = data_house_rep; break;
		case "SECRETARY OF STATE DEM": dataFile = data_sos_dem; break;
		case "SECRETARY OF STATE REP": dataFile = data_sos_rep; break;
		case "ATTORNEY GENERAL": dataFile = data_attorney_general; break;
		case "LIEUTENANT GOVERNOR DEM": dataFile = data_gov_lt_dem; break;
		case "LIEUTENANT GOVERNOR REP": dataFile = data_gov_lt_rep; break;
		case "SUPREME COURT JUSTICE": dataFile = data_supreme_court; break;
		case "SUPERIOR COURT": dataFile = data_superior_court; break;
		case "BALLOT MEASURE": dataFile = data_ballot; break;
		case "BALLOT MEASURE ABORTION": dataFile = data_ballot_abortion; break;
		case "STATE HOUSE": dataFile = data_state_house; break;
		case "STATE SENATE": dataFile = data_state_senate; break;
	}

	if(dE.attr("data-presidenttownship") == "show"){
		var clickedState = getAttr(clicked, "data-stateabbreviation");
		if(clickedState == undefined){return}
		if(clickLevel !== "state"){
			var clickedCD = getAttr(clicked, "data-districtnumber");
			var dataResultsPCD = data_pres_house[selectedYear][clickedState][clickedCD];
			dataResults = dataResultsPCD
			selectedContest = "PRESIDENT BY CD"
		}
	}


	if(dataFile !== ""){dataResults = dataFile[selectedYear + "-" + clicked]}

	if(selectedContest == "PRESIDENT"){
		if(data_president[clicked] == undefined && dE.attr("data-presidenttownship") !== "show"){
			hideResults(); return;
		} else {
			dataResults = data_president[clicked][shortYear];
		}	
	}

	var shortYear = selectedYear.slice(-2).toString(), vote = [], party = ['d','r'];

	if (selectedContest == "HOUSE") {calculateHouseTallies()}

	if(dataResults && selectedContest == "PRESIDENT"){
		if(dataResults['t'] == undefined || dataResults['t'] === ""){
			if(dataResults['v']['d'] == undefined){
				dataResults['v']['r'] = 0; dataResults['v']['d'] = 0; dataResults['t'] = 0;
			}
		}
	}

	if(!dataResults){
		let specialElections = ['GOVERNOR', 'SENATE', 'SENATE RUNOFF'];
		if (specialElections.includes(selectedContest)) {
			let suffix;
			switch (selectedContest) {
				case "GOVERNOR":
					dataResults = data_gov_recall[selectedYear + '-' + clicked]; suffix = "RECALL"; break;
				case "SENATE":
					dataResults = data_sen_sp[selectedYear + '-' + clicked]; suffix = "SPECIAL"; break;
				case "SENATE RUNOFF":
					dataResults = data_sen_sp_r[selectedYear + '-' + clicked]; suffix = "SPECIAL"; break;
			}
			
			if(dataResults){
				dE.attr("button-contest-suffix", suffix);
				updateContestText();
			} else {
				hideResults();
				if(dE.attr("button-contest-suffix") !== null){
					dE.removeAttr("button-contest-suffix");
					updateContestText();
				}
				return;
			}
		} else {
			if(selectedContest == "HOUSE" && clicked !== "United States"){
				clearInnerHTML('headingReportingText');
				if(clickLevel !== "state"){
					showResults();
				}
			} else {
				if(selectedContest !== "PRESIDENT" && selectedContest !== "HOUSE"){
					hideResults();
				} else {
					$("#resultsBoxOther").css("display", "none")
					for (a in numMap){$("#resultsBox" + numMap[a]).css("display", "none")}
					if(selectedContest == "HOUSE"){
						if(dE.attr("button-resultsTotalPanel") == "true"){showResults()}
					} else {
						showResults();
					}
				}
				if(dE.attr("button-contest-suffix") !== null){
					dE.attr("button-contest-suffix",null);
					updateContestText();
				}
			}
			return;
		}
	} else {
		if(dE.attr("button-contest-suffix") !== null){
			dE.attr("button-contest-suffix", null);
			updateContestText();
		}
	}

	if(dataResults){
		$(".resultsBadge span").css('display','none');
		$(".tick, .tickGain").css('display','none');
		$(".projectedWinnerBadge").html('winner')
		$('#resultsBoxUncontestedRace').css('display', 'none');
		$('#resultsBoxRunoffElection').css('display', 'none');
		$('#resultsBoxRankedChoiceVoting').css('display', 'none');
		$("#resultsBoxLegislatureSelection").css('display','none');
		for (a in numMap){
			document.getElementById("resultsBox" + numMap[a]).style.display = "none"
		}

	if(selectedContest == "PRESIDENT") {
		sY = shortYear, dR = dataResults;
		var reporting = dR['reporting'], totalCandVote = 0;

		document.getElementById("resultsPollClosing").innerHTML = "";
		$(".historyPanelTitle").css("height", "11.05vh")

		if(typeof dR['t'] == 'undefined'){
			var totalVotes = 100;
		} else {
			var totalVotes = dR['t'];
		}

		var t = totalVotes;

		if(dR['w'] == undefined){dR['w'] = ""};

		var candVote = dR['v'];

		if($("#data").attr("button-resultsVoteType") == "true" && $("#data").attr("data-level") !== "county"){
			if(sY == "24"){
				Array.from($(".state"), a => a.id).map((b) => {
					let tSa = data_president[b][sY];
					if(tSa){
						let s = tSa, sW = s['w'];
						if(sW !== "" && !["Nebraska","Maine"].includes(b)){
							s['ev'][sW] = electoralVotes[b][selectedYear];
						}
					}
				})
			}

			if(clicked == "United States"){
				var candVote = {"d":0,"r":0};
				Array.from($(".state"), a => a.id).map((b) => {
					let tSa = data_president[b][sY];
					if(tSa){
						let eV = tSa['ev'];
						Object.keys(eV).forEach(c => {
							let e = eV[c]; if(e>0){candVote[c] = (candVote[c]||0) + e}
						});
					}
				});
				data_president['United States'][sY]['ev'] = candVote;
				if(sY == "24"){
					let natWinner = Object.keys(candVote).filter(c => candVote[c] >= 270);
					if(natWinner.length > 0){data_president['United States'][sY]['w'] = natWinner[0]}
				}
			} else {
				candVote = dR['ev'];
			}
			var totalVotes = Object.values(candVote).reduce((a,b) => a+b, 0);

		} else {
			var candVote = Object.fromEntries(
			Object.entries(candVote)
				.filter(([a, b]) => b !== undefined && (t == 0 || b >= t * 0.005))
			);
		}

		if($("#data").attr("button-resultsVoteType") == "true" && $("#data").attr("data-level") !== "county"){
			if(clicked == "United States" && selectedYear == "2024"){
				var otherVotes = 538 - totalVotes
			} else {
				var otherVotes = 0;
			}
		} else {
			var otherVotes = Object.values(candVote).reduce((a,b) => a-b, totalVotes)
		}

		const candCountTick = Object.keys(candVote).length;

		var candVoteList = Object.keys(candVote).sort((a, b) => candVote[b] - candVote[a]);

		var dRwSY = dR['w'];
		if(dRwSY!== "" && dRwSY !== "tie"){
			var winnerStatus = "true"; let b = candVoteList, w = dRwSY;
			b.splice(b.indexOf(w), 1); b.unshift(w);
		}

		if(clickLevel == "county"){var winnerStatus = "true"}

		var candidateCount = candVoteList.length, party = ["d","r"], vote = [0,0];

		for (var i = 0; i < candVoteList.length; i++) {
			let tP = candVoteList[i], v = candVote[tP], tMap = numMap[i+1];
			party[i+1] = tP; vote[i+1] = v;

			if(isNaN(v)){vote[i+1] = 0; $('#resultsBox'+tMap).css("display","none"); continue;}

			if(dR['w'] == tP){
				$("#results" + tMap + "Name .tick").css('display','inline-block');
				if(clicked == "United States"){
					let ePB = $(".electedPresidentBadge"), wpvB = $(".wonPopularVoteBadge");
					ePB.css('display','inline-block');

					if(selectedYear == "2024"){
						ePB.html("RE-ELECTED PRESIDENT")
						if(dR['v']){
							var vW = Object.keys(dR['v']).sort((a, b) => candVote[b] - candVote[a]);
							// if(tP !== vW){
							//	wpvB.css('display','inline-block').html('leading popular vote')
							// } else
							if(dR['w'] !== "r"){
								wpvB.css('display','inline-block').html('lost re-election');
							}
						}
					} else {
						let yA = ['1940','1944','1956','1972','1984','1996','2004','2012'];

						if(selectedYear == "1988"){
							ePB.html("VP ELECTED PRESIDENT")
						} else if(yA.includes(selectedYear)){
							ePB.html("RE-ELECTED PRESIDENT")
						} else {
							ePB.html("ELECTED PRESIDENT")
						}

						if(['2000','2016'].includes(selectedYear)){
							wpvB.css('display','inline-block').html('won popular vote');
						} else if(['1960','1968','2000'].includes(selectedYear)){
							wpvB.css('display','inline-block').html('vice president');
						} else if(['1976','1980','1992', '2020'].includes(selectedYear)){
							wpvB.css('display','inline-block').html('lost re-election');
						}
					}
				} else {
					$("#results" + tMap + "Name .projectedWinnerBadge").css('display','inline-block')
					if(selectedYear == "2024" || dataResults['reporting'] !== undefined){
						let pwB = $(".projectedWinnerBadge");
						pwB.html('projected winner')
						if(dataResults['apparent'] == true){pwB.html('apparent winner')}
					}
				}
			} 

			if(dR['t'] == undefined){
				$('#resultsVotesBox'+tMap).css("display","none")
				var voteBoxDisplay = "none", percBoxDisplay = "1/3"; 
			}

			let a = presCand[selectedYear];
			$('#results'+ tMap +'FirstName').html(a[tP][0]);
			$('#results'+ tMap +'LastName').html(a[tP][1]);
		}

		if(voteBoxDisplay){$('[id^="resultsVotes"]').css("display", voteBoxDisplay)}

	} else if(selectedContest == "PRESIDENT BY CD") {
		var totalCandVote = 0, totalVotes = dataResults['t'];
		let candVote = {"d": dataResults['d'], "r": dataResults['r']};
		
		for (let a in candVote) {if(candVote[a] === undefined) {delete candVote[a]} else {totalCandVote += candVote[a]}};
		var candVoteList = Object.keys(candVote).sort(function(a, b) {return candVote[b] - candVote[a]});

		var candidateCount = candVoteList.length, otherVotes = totalVotes - totalCandVote;
		var party = ["d","r"], vote = [0,0];

		for (var i = 0; i < candVoteList.length; i++) {
			let thP = candVoteList[i], thV = dataResults[thP]; party[i+1] = thP; vote[i+1] = thV;

			if(isNaN(thV)){
				vote[i+1] = 0; $('#resultsBox' + numMap[i+1]).css("display", "none");
			} else if(typeof dataResults['t'] == 'undefined'){
				var voteBoxDisplay = "none";
				$('#resultsVotesBox' + numMap[i+1]).css("display", "none");
			}

			$('#results'+numMap[i + 1]+'FirstName').html(presCand[selectedYear][thP][0]);
			$('#results'+numMap[i + 1]+'LastName').html(presCand[selectedYear][thP][1]);
		}
	} else {
		var reporting = dataResults['reporting'], totalCandVote = 0;
		var incumbent = dataResults['incumbent'] || "", advances = dataResults['advances'] || "";
		var tW = dataResults['winner'], winners = dataResults['winner'];

		setPollClosingText(dataResults);

		if(incumbent !== undefined && incumbent !== ""){
			incumbent = incumbent.split(','); let tempInc = [];
			for (let i = 0; i < incumbent.length; i++) {
				let tC = incumbent[i], x;
				if(!tC.startsWith("cand")){
					x = Object.keys(dataResults).find(a => dataResults[a] == tC).replace("_party", "");
				} else {
					x = tC;
				}
				tempInc.push(x)
			}
			incumbent = tempInc
		}

		if(advances !== undefined && advances !== ""){
			advances = advances.split(','); let tempInc = [];
			for (let i = 0; i < advances.length; i++) {
				let tC = advances[i], x;
				if(!tC.startsWith("cand")){
					x = Object.keys(dataResults).find(a => dataResults[a] == tC).replace("_party", "");
				} else {
					x = tC;
				}
				tempInc.push(x)
			}
			advances = tempInc
		}

		if(tW !== undefined && tW !== ""){
			winners = tW.split(','); let tempInc = [];
			for (let i = 0; i < winners.length; i++) {
				let tC = winners[i], x;
				if(tC == "runoff" || tC == "tie"){continue}
				if(!tC.startsWith("cand")){
					x = Object.keys(dataResults).find(a => dataResults[a] == tC).replace("_party", "");
				} else {
					x = tC;
				}
				tempInc.push(x)
			}
			winners = tempInc
		} else {
			winners = [""];
		}

		if (tW && tW !== "tie" && tW !== "runoff"){var winnerStatus = "true"}

		if(dataResults['runoff'] == 1){
			$("#data").attr("button-contest-suffix","runoff");
			updateContestText();
		}

		$('#resultsBoxRunoffElection').css("display", dataResults['winner'] == "runoff" ? "initial" : "none");
		$('#resultsBoxLegislatureSelection').css("display", dataResults['legislature'] == 1 ? "initial":"none");
		$('#resultsBoxRankedChoiceVoting').css("display", dataResults['ranked'] == 1 ? "initial" : "none");

		var candVote = {}, pA = ['o','l','g'];

		if(typeof dataResults['total_vote'] == 'undefined'){
			var tV = 100, voteBoxDisplay = "none"
		} else {
			var tV = dataResults['total_vote'], totalVotes = dataResults['total_vote'];
		}
/*

		if((selectedContest == "DEM PRESIDENT" || selectedContest == "GOP PRESIDENT") && $("#data").attr("button-resultsVoteType") == "true" && $("#data").attr("data-level") !== "county"){
			if(clicked == "United States"){
				let a = Array.from($(".state"), a => a.id);
				var candVote = {"d":0,"r":0};
				a.map((b) => {
					let dC = dataFile[selectedYear + '-' + b]['delegates']
					Object.keys(dC).forEach(c => {let e = dC[c]; if(e>0){candVote[c] = (candVote[c] || 0) + e}});
				});

				dataFile[selectedYear + '-United States']['delegates'] = candVote
				var totalVote = Object.values(candVote).reduce((a,b) => a+b, 0);
			} else {
				var candVote = dataFile[selectedYear + "-" + clicked]['delegates'];
				var totalVotes = Object.values(candVote).reduce((a,b) => a+b, 0)
			}

		for (let i = 1; i <= 10; i++) {
			let tC = "cand" + i, tN = dataResults[tC + "_lastname"] + dataResults[tC + "_firstname"];
			let tP = dataResults[tC + "_party"], tI = 0, thV = dataResults[tC + "_vote"];
			if(dataResults['ranked'] !== 1 && thV < tV * 0.005){continue}
			if(tV == 0 && tP){if(pA.includes(tP)) {tP = "z"} else {tP = tP.charAt(0)}} else {tP = "a"}
			if(incumbent.includes(tC)){tI = 1}
			candVote[tC] = {"vote": dataResults[tC + "_vote"], "name": tN, "party": tP, "i":tI};
		}

		} else {
*/

		for (let i = 1; i <= 25; i++) {
			let tC = "cand" + i, tN = dataResults[tC + "_lastname"] + dataResults[tC + "_firstname"];
			let tP = dataResults[tC + "_party"], tI = 0, thV = dataResults[tC + "_vote"];
			if(dataResults['reporting'] == undefined || dataResults['reporting'] > 1){
				if(!winners.includes(tC) && dataResults['ranked'] !== 1 && thV < tV * 0.0005){continue}
				if(tV == 0 && tP){if(pA.includes(tP)) {tP = "z"} else {tP = tP.charAt(0)}} else {tP = "a"}
			} else {
				if(tP){if(pA.includes(tP)) {tP = "z"} else {tP = tP.charAt(0)}} else {tP = "a"}
			}
			if(incumbent.includes(tC)){tI = 1}
			candVote[tC] = {"vote": thV, "name": tN, "party": tP, "i":tI, "w": winners.includes(tC)};
		}

//		}

		for (let i in candVote) {
			let a = candVote[i].vote;
			if (a == undefined) {delete candVote[i]} else {totalCandVote += a}
		}

		var candVoteList = Object.keys(candVote).sort(function(a, b) {
			let x = candVote[a], y = candVote[b];
			return y.w - x.w || y.vote - x.vote || y.i - x.i || d3.asc(x.party,y.party) || d3.asc(x.name,y.name);
		})

		var drW = dataResults.winner;
		candVoteList = candVoteList.slice(0,10);

		if((!drW || drW !== "") && totalCandVote > 0 && drW !== "runoff"){
			if(candVote[candVoteList[0]+'_vote'] == candVote[candVoteList[1]+'_vote']){drW = "tie"}
		}

		var party = [], vote = [];
		for (var i = 0; i < candVoteList.length; i++) {
			let j = i+1, cL = candVoteList[i], tP = dataResults[cL + '_party'], tM = 'results'+ numMap[j];
			party[j] = tP; vote[j] = dataResults[cL + '_vote'];

			if($("#data").attr("data-level") == "state" || selectedContest == "HOUSE"){
				if(incumbent.includes(cL)){
					$("#" + tM + "Name .incumbentBadge").css('display','inline-block')
				}
				if(advances.includes(cL)){
					$("#" + tM + "Name .runoffBadge").css('display','inline-block')
				}

				if(winners.includes(cL)){
					if(dataResults['gain'] == 1){
						$("#" + tM + "Name .tick").css('display','inline-block');
						$("#" + tM + "Name .tickGain").css('display','inline-block')
					} else {
						if(candVoteList.length > 1){
							$("#" + tM + "Name .tick").css('display','inline-block');
							$("#" + tM + "Name .projectedWinnerBadge").css('display','block')
							if(dataResults['reporting'] !== undefined){
								if(incumbent.includes(cL)){
									$(".projectedWinnerBadge").html('projection')
								} else {
									$(".projectedWinnerBadge").html('projected winner')
								}
							}
						}
					}
				}
			}

			let fN = dataResults[cL + '_firstname'], lN = dataResults[cL + '_lastname'];
			switch (true) {
				case !fN && !lN:
					setInnerHTML(tM + 'FirstName', "");
					setInnerHTML(tM + 'LastName', genPartyName[tP]);
					break;
				case !fN:
					setInnerHTML(tM + 'FirstName', "");
					setInnerHTML(tM + 'LastName', lN.trim());
					break;
				case !lN:
					setInnerHTML(tM + 'FirstName', "");
					setInnerHTML(tM + 'LastName', fN.trim());
					break;
				default:
					setInnerHTML(tM + 'FirstName', fN.trim() || "");
					setInnerHTML(tM + 'LastName', lN.trim() || genPartyName[tP] || "");
			}
		}

		if(typeof dataResults['total_vote'] == 'undefined'){
			var totalVotes = 100, voteBoxDisplay = "none";
		} else {
			var totalVotes = dataResults['total_vote'];
		}

		if(!otherVotes){
			var otherVotes = totalVotes - totalCandVote;
			if(dataResults['runoff_count']){otherVotes -= dataResults['runoff_count']}
			if(dataResults['uncalled']){otherVotes -= dataResults['uncalled']}
			if(dataResults['independents']){otherVotes -= dataResults['independents']}
		}

		var candVoteList = candVoteList.filter(a => a !== "winner"), candidateCount = candVoteList.length;

		if(dataResults['cand1_vote'] > 0 && vote[1] === totalVotes && vote[1] > 1 && vote[2] == undefined){candidateCount = 1};
		if(totalVotes > 0){$('#resultsOne').css("display","flex")}

		if(candidateCount == 1 && clicked !== "United States"){
			if($("#data").attr("data-level") == "state" || selectedContest == "HOUSE"){
				$('#resultsBoxUncontestedRace').css('display', 'inline-flex');
				otherVotes = 0;
			}
			var winnerStatus = "false";
		}
	}}

	if(voteBoxDisplay == "none"){
		$('[id^="resultsVotes"]').css("display", "none");
		if(dE.attr("data-level") == "county"){
			$('#resultsBoxOne, #resultsBoxTwo, #resultsBoxThree, #resultsBoxFour, #resultsBoxFive, #resultsBoxSix, #resultsBoxSeven, #resultsBoxEight, #resultsBoxNine, #resultsBoxTen').css("height", "15vh");
		} else {
			$('#resultsBoxOne, #resultsBoxTwo, #resultsBoxThree, #resultsBoxFour, #resultsBoxFive, #resultsBoxSix, #resultsBoxSeven, #resultsBoxEight, #resultsBoxNine, #resultsBoxTen').css("height", "18vh");
		}
		//	if(dE.attr("data-level") == "county"){$(".tick, .tickGain").css('display','none')}
	} else {
		$('[id^="resultsVotes"]').css("display", "flex");
		$('#resultsBoxOne, #resultsBoxTwo, #resultsBoxThree, #resultsBoxFour, #resultsBoxFive, #resultsBoxSix, #resultsBoxSeven, #resultsBoxEight, #resultsBoxNine, #resultsBoxTen').css("height", "21vh");
	}

	var voteType = dE.attr("button-resultsVoteType");
	if(selectedContest == "PRESIDENT" && voteType == "true" && dE.attr("data-level") !== "county"){
		$('[id^="resultsVotes"]').html(0).css("display", "none");
		$('#resultsVotesBoxOther').html(0);
		var voteBoxDisplay = "none";

		if(clicked == "United States" && selectedYear == "2024"){
			document.getElementById("resultsOtherName").innerHTML = "uncalled";
			$('#resultsPercBoxOther').html(otherVotes).css("font-size", "4.5vw");
			$("#resultsBoxOther").css("height", "10vh")
		}
	} else {
		if(voteBoxDisplay !== "none"){$('[id^="resultsVotes"]').css("display", "flex")}
	}

	var margin = Math.abs(((vote[1] - vote[2])/totalVotes)*100);
	var marginSP = Math.abs(((vote[2] - vote[3])/totalVotes)*100);

	for (var i = 0; i < candVoteList.length; i++) {
		let thisVote = vote[i+1], thisNum = numMap[i+1], percDP;

		switch (true) {
			case (margin > 0 && margin < 0.25):
				percDP = 2; break;
			case (thisVote === totalVotes && totalVotes > 0):
				percDP = 0; break;
			case (thisVote / totalVotes > 0.9995):
				percDP = 0; break;
			case (thisVote / totalVotes < 0.001 && thisVote > 0):
				percDP = 2; break;
			default:
				percDP = 1; break;
		}

		var thisPerc;
		if(totalVotes == undefined){totalVotes = 0}
		if(totalVotes == 0){thisPerc = 0} else {thisPerc = (thisVote / totalVotes) * 100}

		if(selectedContest == "PRESIDENT" && voteType == "true" && dE.attr("data-level") !== "county"){
			thisPerc = thisVote;
			$('#resultsPercBox' + thisNum).text(thisVote).css("font-size", "6.5vw");
			if(clicked == "United States"){
				if(thisVote >= electoralVotes['United States'][selectedYear]){
					$("#results" + thisNum + "Name .electedPresidentBadge").css('display','inline-block');
				}
			}
		} else {
			$('#resultsPercBoxOther').html("").css("font-size", "4.25vw");
			$('#resultsPercBox' + thisNum).css("font-size", "5.5vw");
			if(voteBoxDisplay == undefined){
				$('#resultsPercBox' + thisNum).html(thisPerc.toFixed(percDP) + '<a1>%</a1>');
			} else {
				$('#resultsPercBoxOther').html("").css("font-size", "5.5vw");
				animatePercent(thisPerc, 'resultsPercBox' + thisNum, true);
			}
		}

		
		// $('#resultsVotesBox' + thisNum).html(numF.format(thisVote));
		animateNumber(thisVote, 'resultsVotesBox' + thisNum)

		let rVis;
		if((totalVotes == 0 || totalVotes == null) && winnerStatus !== "true"){rVis = "none"} else {rVis = "grid"}
		if(voteType == "true" && selectedContest == "PRESIDENT"){rVis = "grid"}
		d3.select('#results' + thisNum).style("display", rVis);

		if(!(party[i+1])){party[i+1] = "o"}

		let boxObj = candColors['box'], textObj = candColors['text'];
		let boxColor = boxObj[party[i+1]] || boxObj['o'], textColor = textObj[party[i+1]] || textObj['o'];

		$('#resultsBox' + thisNum)
			.css("display", "flex")
			.css('background-color', boxColor);

		$('#results' + thisNum + ' span')
			.css('color', textColor);
	}

	if(otherVotes > 0){
		$('#resultsBoxOther').css("display", "flex");
		if(selectedContest !== "PRESIDENT" || voteType !== "true" || dE.attr("data-level") == "county"){
			document.getElementById("resultsOtherName").innerHTML = "others";
			$("#resultsBoxOther").css("height", "15vh")
		}
	} else {
		$('#resultsBoxOther').css("display", "none");
	}

	var aheadMargin = margin.toFixed(1);
	if(margin < 1){aheadMargin = Math.abs(((vote[1] - vote[2])/totalVotes)*100).toPrecision(2)}
	if(margin < 0.05){aheadMargin = Math.abs(((vote[1] - vote[2])/totalVotes)*100).toPrecision(1)}

	if(voteBoxDisplay == undefined){
		if ((!(vote[2] > 0) || vote[1] == vote[2]) && winnerStatus !== "true") {
			$('#resultsAhead').text("")
		} else if ((vote[1] !== vote[2]) || (winnerStatus == "true" && vote[1] == 0)) {
			if($("#data").attr("data-aheadvalue") == "total"){
				animateTotalNumber(totalVotes);
			} else {
				if(isNaN(aheadMargin)){
					$('#resultsAhead').text("")
				} else {
					let a = numF.format(Math.abs(vote[1] - vote[2]));
					$('#resultsAhead').html("MARGIN: "+ a +" ("+aheadMargin+"%)")
				}
			}
		} else {
			$('#resultsAhead').text("")
		}
	} else {
		$('#resultsAhead').text("")
	}

	switch (true){
		case (reporting >= 100.5): reporting = ">99"; break;
		case (reporting < 0.5 && totalVotes > 0): reporting = "<1"; break;
		case (reporting == 0): reporting = "0"; break;
	}

	$('#headingReportingText').html(reporting ? reporting + "<in>% IN</in>" : "");

	if(voteType !== "true" || selectedContest !== "PRESIDENT"){
		var othPerc = otherVotes / totalVotes, othDP;
		if(othPerc > 0.1){othDP = 3} else if (othPerc > 0.01){othDP = 2} else {othDP = 1}

		var vOthP = Math.abs((othPerc * 100)).toPrecision(othDP);
		if(vOthP < 0.01){vOthP = "<0.01"}

		$('#resultsPercBoxOther').html(vOthP + '<a1>%</a1>');
		if(otherVotes){animateNumber(otherVotes, 'resultsVotesBoxOther')}
	}

	if(margin < 0.25 && margin > 0 && voteBoxDisplay !== "none"){var percScale = 0.6} else {var percScale = 0.7}

	$('[id^="resultsPerc"]')
		.css('transform', 'scaleX(' + percScale + ')')
		.css('width', 'calc(100% / ' + percScale + ')');

	$('#resultsPercBoxOther')
		.css('transform', 'scaleX(0.7)')
		.css('width', 'calc(100% / ' + 0.7 + ')');
	
	if (dataResults['uncalled'] > 0) {$('#resultsUncalledNumber').text(dataResults['uncalled'])}
	$('#resultsBoxRunoff').css("display", dataResults['uncalled'] > 0 ? "flex" : "none");

	if (dataResults['runoff_count'] > 0) {$('#resultsRunoffNumber').text(dataResults['runoff_count'])}
	$('#resultsBoxRunoff').css("display", dataResults['runoff_count'] > 0 ? "flex" : "none");

	if (dataResults['independents'] > 0) {$('#resultsIndependentsNumber').text(dataResults['independents'])}
	$('#resultsBoxIndependents').css("display", dataResults['independents'] > 0 ? "flex" : "none");

	let sC = selectedContest;
	if ((sC !== "PRESIDENT" && clicked == "United States") || (sC == "HOUSE" && clickLevel !== "county")) {
		$('#resultsAhead').text("");
		var voteBoxDisplay = "none", percBoxDisplay = "none";

		d3.selectAll('[id^="resultsPerc"]')
			.style('transform', 'scaleX(0.75)')
			.style('width', 'calc(100% / 0.75)');

		vote.forEach((v, i) => {$('#resultsPercBox' + numMap[i+1]).html(v)});
		$('#resultsPercBoxOther').html(otherVotes);
		$('.tick').css('display', "none")
	}
	
	if(selectedContest !== "PRESIDENT" || clicked !== "United States"){
		let eN = document.getElementById("resultsBoxTopText");
		const mW = document.body.clientWidth * 0.25, eW = eN.clientWidth;
		eN.style.transform = `scaleX(${Math.min(1,mW / eW)})`;
	}

	scaleHeadingText();
	$('#buttonYear' + selectedYear)[0].scrollIntoViewIfNeeded();
}

function showRaceCall(data){
	if(data['calls']){
		if(data['calls']['nyt']){
			let pcText = "AP CALL: " + moment.tz(data['calls']['nyt'], "Europe/London").clone().tz("America/New_York").format('ddd h:mma z');
			$("#resultsPollClosing").html(pcText);
		} else if(data['calls']['ddhq']){
			let pcText = "DDHQ CALL: " + moment.tz(data['calls']['ddhq'], "Europe/London").clone().tz("America/New_York").format('ddd h:mma z');
			$("#resultsPollClosing").html(pcText);
		} else {
			$("#resultsPollClosing").html("");
		}
	}
}

function toggleAheadNumber() {
	let d = $("#data"), s;
	if(d.attr("data-aheadvalue") == "ahead"){s = "total"} else {s = "ahead"}
	d.attr("data-aheadvalue", s); getResults();
}

var mapSettings = {"filters":"","stats":""};

function refreshFillCD(){
	var cdArray = ['ME-01','ME-02','NE-01','NE-02','NE-03'];
	var year = $("#data").attr("button-year"), sY = year.slice(-2).toString();

	for (var i = 0; i < 5; i++) {
		var tA = cdArray[i], tI = tA.split("-"), tS = tI[0], tCD = tI[1];
		var tE = d3.select(`.cd.cd${sY}[data-district="${tA}"`).node();

		tE.classList.remove("selectedState", "redState","blueState");

		var thisResults = data_pres_house[year][tS][tCD];

		var cV = {"d": thisResults['d'],"r": thisResults['r']};
		var tV = thisResults['t'];

		var cand = Object.keys(cV).filter(a => cV[a] !== undefined).sort((a, b) => cV[b] - cV[a]);

		let winner = thisResults['w'];
		if(winner){
			addClassFromWinner(tE, winner);
		} else {
			if(tV > 0){addClassFromLead(tE, cand[0])}
		}	
	}
}

function refreshFill() {

	if($("#data").attr("button-road270") == "true"){
		updateRoadMapProjections();
		getResults();
		return;
	}

	if($("#data").attr("button-pollclosing") == "true"){
		colorPollClosingHour(+$("#data").attr("poll-closinghour") || 7);
		return;
	}
	if($("#data").attr("button-graphics") == "true"){
		updateStateGraphic($("#data").attr("data-stateclick"));
		updateRoadMapProjections();
		return;
	}

	if($("#data").attr("button-presidentProjections") == "true"){
		createProjections();
		return;
	}

	var selectedYear = $("#data").attr("button-year");
	var selectedContest = $("#data").attr("button-contest");
	var selectedLatinoPop = $("#data").attr("button-latinopop");
	var selectedBlackPop = $("#data").attr("button-blackpop");

	var filters = mapSettings['filters'], stat = mapSettings['stats'];

	var shortYear = selectedYear.slice(-2).toString();
	var shortYearPrev = (selectedYear-4).toString().slice(-2).toString();

	if (selectedYear % 4 === 0) {
		var shortPresYear = selectedYear.slice(-2).toString();
		var presYear = selectedYear.toString();
		var shortPresYearPrev = (selectedYear-4).toString().slice(-2).toString();
	} else {
		var shortPresYear = (Math.floor(selectedYear / 4) * 4).toString().slice(-2)
		var shortPresYearPrev = (Math.floor(selectedYear / 4) * 4).toString().slice(-2)
		var presYear = (Math.floor(selectedYear / 4) * 4).toString()
	}

	var y = shortYear, dataFile = {};
	if(!selectedContest.endsWith("STATE HOUSE") && selectedContest.endsWith("HOUSE") || selectedContest == "PRESIDENT BY CD"){
		d3.selectAll(`.cd.cd${y}`).nodes().forEach(d => dataFile[d.id] = "");
		$('.cd.cd' + y).each(function() {dataFile[this.id] = ""});

		var filters = mapSettings['filters'];
		var clicked = $("#data").attr("last-clicked"), stateClicked = $("#data").attr("data-stateclick");

		if(selectedContest == "HOUSE" || selectedYear == "2024"){
			let houseButton = $("#data").attr("button-houseCount");
			if(houseButton == "called"){
				let aSeats = Object.keys(dataFile);
				dataFile = {};
				aSeats
					.filter(a => data_house[selectedYear + "-" + a]['winner'] == "")
					.forEach(a => {
						clearHouseBox(a);
						const tE = document.getElementById(a);
						if(tE){
							tE.classList.remove("redState", "blueState", "orangeState", "indState", "rpState", "runoffState", "yesState", "noState", "noProjection", "rpState", "uState", "d1State", "d2State", "d3State", "d4State", "d5State", "d6State", "d7State", "d8State", "d9State", "d10State", "d11State", "r1State", "r2State", "r3State", "r4State", "r5State", "r6State", "r7State", "r8State", "r9State", "r10State", "r11State", "pollsClosed", "gopLead", "demLead", "indLead", "othLead", "tieState", "noContest", "othState");
							tE.style.fill = "";
						}
					})

				aSeats
					.filter(a => data_house[selectedYear+"-"+a]['winner'] !== "")
					.forEach(a => {dataFile[a] = ""});
			}

			if(houseButton == "uncalled"){
				let aSeats = Object.keys(dataFile);
				dataFile = {};
				aSeats
					.filter(a => data_house[selectedYear + "-" + a]['winner'] !== "")
					.forEach(a => {
						clearHouseBox(a);
						const tE = document.getElementById(a);
						if(tE){
							tE.classList.remove("redState", "blueState", "orangeState", "indState", "rpState", "runoffState", "yesState", "noState", "noProjection", "rpState", "uState", "d1State", "d2State", "d3State", "d4State", "d5State", "d6State", "d7State", "d8State", "d9State", "d10State", "d11State", "r1State", "r2State", "r3State", "r4State", "r5State", "r6State", "r7State", "r8State", "r9State", "r10State", "r11State", "pollsClosed", "gopLead", "demLead", "indLead", "othLead", "tieState", "noContest", "othState");
							tE.style.fill = "";
						}
					})

				aSeats
					.filter(a => data_house[selectedYear+"-"+a]['winner'] == "")
					.forEach(a => {dataFile[a] = ""});
			}
		}

		d3.selectAll('.state').nodes().forEach(a =>
			a.classList.remove("redState", "blueState", "orangeState", "indState","rpState", "runoffState","yesState","noState","noProjection","rpState","uState","d1State","d2State","d3State","d4State","d5State","d6State","d7State","d8State","d9State","d10State","d11State","r1State","r2State","r3State","r4State","r5State","r6State","r7State","r8State","r9State","r10State","r11State","pollsClosed","gopLead","demLead","indLead","othLead","tieState","noContest","othState")
		)

	} else if(selectedContest == "STATE HOUSE"){
		d3.selectAll(`.hd.hd${y}`).nodes().forEach(d => dataFile[d.id] = "");
	} else if(selectedContest == "STATE SENATE"){
		d3.selectAll(`.sd.sd${y}`).nodes().forEach(d => dataFile[d.id] = "");
	} else {
		dataFile = data_president;
	}
	
	const dataResults = Object.keys(dataFile);

	let dataResultsFile;
	switch (selectedContest) {
		case "PRESIDENT BY CD": dataResultsFile = data_pres_house; break;
		case "HOUSE": dataResultsFile = data_house; break;
		case "GOVERNOR": dataResultsFile = data_gov; break;
		case "SENATE": dataResultsFile = data_sen; break;
		case "SENATE SPECIAL": dataResultsFile = data_sen_sp; break;
		case "SENATE RUNOFF": dataResultsFile = data_sen_r; break;
		case "SENATE SPECIAL RUNOFF": dataResultsFile = data_sen_sp_r; break;
		case "DEM PRESIDENT": dataResultsFile = data_president_dem; break;
		case "GOP PRESIDENT": dataResultsFile = data_president_rep; break;
		case "SECRETARY OF STATE": dataResultsFile = data_sos; break;
		case "GOVERNOR RECALL": dataResultsFile = data_gov_recall; break;
		case "LIEUTENANT GOVERNOR": dataResultsFile = data_gov_lt; break;
		case "GOVERNOR DEM": dataResultsFile = data_gov_dem; break;
		case "GOVERNOR REP": dataResultsFile = data_gov_rep; break;
		case "SENATE DEM": dataResultsFile = data_sen_dem; break;
		case "SENATE REP": dataResultsFile = data_sen_rep; break;
		case "SECRETARY OF STATE DEM": dataResultsFile = data_sos_dem; break;
		case "SECRETARY OF STATE REP": dataResultsFile = data_sos_rep; break;
		case "ATTORNEY GENERAL": dataResultsFile = data_attorney_general; break;
		case "LIEUTENANT GOVERNOR DEM": dataResultsFile = data_gov_lt_dem; break;
		case "LIEUTENANT GOVERNOR REP": dataResultsFile = data_gov_lt_rep; break;
		case "D-HOUSE": dataResultsFile = data_house_dem; break;
		case "R-HOUSE": dataResultsFile = data_house_rep; break;
		case "SUPREME COURT JUSTICE": dataResultsFile = data_supreme_court; break;
		case "SUPERIOR COURT": dataResultsFile = data_superior_court; break;
		case "BALLOT MEASURE": dataResultsFile = data_ballot; break;
		case "BALLOT MEASURE ABORTION": dataResultsFile = data_ballot_abortion; break;
		case "STATE HOUSE": dataResultsFile = data_state_house; break;
		case "STATE SENATE": dataResultsFile = data_state_senate; break;
	}

	var displayStatus = (mapSettings['filters'].length > 0 || mapSettings['stats'].length > 0) ? "flex" : "none";
	d3.select("#controlButtonRemoveFilters").style("display", displayStatus);

	const dataResultsLength = dataResults.length;
	for (var i = 0; i < dataResultsLength; i++) {
		var thisIndex = dataResults[i], thisState = dataFile[thisIndex];
		if(selectedContest == "PRESIDENT"){var thisState = dataFile[thisIndex][shortYear]}
		if(thisIndex == "United States" || thisState == undefined){
			var thisElement = document.getElementById(thisIndex);
			if(thisElement){
				thisElement.classList.remove("redState", "blueState", "orangeState", "indState","rpState", "runoffState","yesState","noState","noProjection","rpState","uState","d1State","d2State","d3State","d4State","d5State","d6State","d7State","d8State","d9State","d10State","d11State","r1State","r2State","r3State","r4State","r5State","r6State","r7State","r8State","r9State","r10State","r11State","pollsClosed","gopLead","demLead","indLead","othLead","tieState","noContest","selectedStateShow");
				thisElement.style.fill = "";
			}
			continue
		};
		
		var thisWinner = thisState['w'];
		var thisElement = document.getElementById(thisIndex);
		if(thisElement){
			thisElement.classList.remove("redState", "blueState", "orangeState", "indState","rpState", "runoffState","yesState","noState","noProjection","rpState","uState","d1State","d2State","d3State","d4State","d5State","d6State","d7State","d8State","d9State","d10State","d11State","r1State","r2State","r3State","r4State","r5State","r6State","r7State","r8State","r9State","r10State","r11State","pollsClosed","gopLead","demLead","indLead","othLead","tieState","noContest","othState","selectedStateShow");
			thisElement.style.fill = "";
		} else {continue}

		let cScale;
		if(stat == "statePop"){
			cScale = d3.scaleLinear().domain([0,0.5]).clamp(true).range(["#F8F2FF", "#6A0D98"]);
			thisElement.style.fill = cScale(demographics[thisIndex]['st']); continue;
		} else if(stat == "countyType"){
			cScale = d3.scaleLinear().domain([40,10]).range(["#F8F2FF", "#6A0D98"]);
			thisElement.style.fill = cScale(countyType[thisIndex]); continue;
		}

		if(selectedLatinoPop == "true"){
			cScale = d3.scaleLinear().domain([0,0.5]).range(["#FFFFD4", "#8C2D04"]);
			thisElement.style.fill = cScale(latinoScale[thisIndex]['pL']); continue;
		} else if(selectedBlackPop == "true"){
			cScale = d3.scaleLinear().domain([0,0.5]).range(["#DCFFDC", "#0D350D"]);
			thisElement.style.fill = cScale(demographics[thisIndex]['pB']); continue;
		}

		if (selectedContest == "PRESIDENT") {
			const tS = thisState, tW = thisWinner, sY = shortYear, sYP = shortYearPrev;
			var tI = data_president[thisIndex], pR = tI[sYP];

			if(filters == "gain"){
				if(tI[sY]['w'] == undefined || tI[sY]['w'] == "" || pR == undefined || pR == ""){
					let f = i => {
						let k = Object.keys(i);
						if (k.filter(a => i[a] > 0).length < 2) {
							return ""
  						} else {
							return k.reduce((a,b) => i[a] > i[b] ? a : b)
						}
					}

					var pW = "", cW = f(tI[sY]['v']);
					if(pR == undefined){pW = ""} else {pW = f(pR['v'])}
					if(pW == cW || cW == ""){continue}
				} else {
					if(pR['w'] == tW || tW == ""){continue}
				}
			} else if (filters == "presDem") {
				let f = i => {
					let k = Object.keys(i);
					if (k.filter(a => i[a] > 0).length < 2) {
						return ""
  					} else {
						return k.reduce((a,b) => i[a] > i[b] ? a : b)
					}
				}

				let pW = f(tI[sYP]['v']);
				let tC = thisElement.classList;
				if(tC.contains("county") || tC.contains("township")) {
					if(pW == "d"){
						if (f(tI[sY]['v']) == "") {
							thisElement.classList.add("noProjection"); continue;
						}
					} else {
						continue
					}
				} else {
					if(pW == "d"){
						if (tW == "") {
							thisElement.classList.add("noProjection"); continue;
						}
					} else {
						continue
					}
				}
			} else if (filters == "margin10") {
				let vA = Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a);
				let margin = Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0);
				if(margin > 0.1){continue}
			} else if (filters == "margin5") {
				let vA = Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a);
				let margin = Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0);
				if(margin > 0.05){continue}
			} else if (filters == "margin3") {
				let vA = Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a);
				let margin = Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0);
				if(margin > 0.03){continue}
			} else if (filters == "margin1") {
				let vA = Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a);
				let margin = Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0);
				if(margin > 0.01){continue}
			} else if (filters == "obamaTrump") {
				if(tI[sY]['w'] == undefined || tI[sY]['w'] == "" || pR == undefined || pR == ""){
					let f = i => {
						let k = Object.keys(i);
						if (k.filter(a => i[a] > 0).length < 2) {
							return ""
  						} else {
							return k.reduce((a,b) => i[a] > i[b] ? a : b)
						}
					}
					var pW = "", cW = f(tI[sY]['v']);
					if(pR !== undefined){pW = f(pR['v'])}

					if(f(tI['16']['v']) == "r" && f(tI['12']['v']) == "d" && f(tI['08']['v']) == "d"){
						if (tW == "" || cW == "") {
							thisElement.classList.add("noProjection"); continue;
						}
					} else {
						continue
					}
				} else {
					if(tI['16']['w'] == "r" && tI['12']['w'] == "d" && tI['08']['w'] == "d"){
						if (tW == "" || cW == "") {
							thisElement.classList.add("noProjection"); continue;
						}
					} else {
						continue
					}
				}
			} else if (filters == "trumpBiden") {
				if(tI[sY]['w'] == undefined || tI[sY]['w'] == "" || pR == undefined || pR == ""){
					let f = i => {
						let k = Object.keys(i);
						if (k.filter(a => i[a] > 0).length < 2) {
							return ""
  						} else {
							return k.reduce((a,b) => i[a] > i[b] ? a : b)
						}
					}
					var pW = "", cW = f(tI[sY]['v']);
					if(pR !== undefined){pW = f(pR['v'])}

					if(f(tI['16']['v']) == "r" && f(tI['20']['v']) == "d"){
						if (tW == "" || cW == "") {
							thisElement.classList.add("noProjection"); continue;
						}
					} else {
						continue
					}
				} else {
					if(tI['16']['w'] == "r" && tI['20']['w'] == "d"){
						if (tW == "" || cW == "") {
							thisElement.classList.add("noProjection"); continue;
						}
					} else {
						continue
					}
				}
			}

			let cV = tS['v'];

			var cand = Object.keys(cV).filter(a => cV[a] !== undefined).sort((a, b) => cV[b] - cV[a]);
			var vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a);
			var tV = vA.reduce((a,b) => a+b,0); var margin = Math.abs(vA[0] - vA[1]) / tV;
			if(tV == 0){margin = 0}

			if(stat == "electoralVotes"){
				let s = thisIndex;
				if(/\d/.test(s) == false){
					f = d3.scaleLinear().domain([0,20,54]).range(["#F8F2FF", "#6b049f", "#390255"])
					thisElement.style.fill = f(electoralVotes[s][selectedYear]);
					continue;
				}
			} else if (stat == "margin") {
				var s;
				switch (cand[0]) {
					case "d": s = d3.scaleLinear().range(["#e6f2ff", "#0069d9"]); break;
					case "r": s = d3.scaleLinear().range(["#ffe6e6", "#E00000"]); break;
					case "rp": s = d3.scaleLinear().range(["#cfb3ff", "#6a29a3"]); break;
					case "gw": s = d3.scaleLinear().range(["#ffebd9", "#FF7B00"]).clamp(true); break;
					case "u": s = d3.scaleLinear().range(["#ffebd9", "#FF7B00"]).clamp(true); break;
					default: s = ""; break;
				}
				if(margin == 0){if(tV == 0){continue} else {s = d3.scaleLinear().range(["#f0f0f0", "#f0f0f0"])}}
				if(s !== ""){thisElement.style.fill = s.domain([0,0.25])(margin)}
			} else if (stat == "changeTurnout") {
				if(tV == 0){continue}
				if(tI[previousYears[sY]]){
					let v = (tS['t'] / tI[previousYears[sY]]['t'])-1;
					let s = d3.scaleLinear()
						.domain([-0.35, -0.01, 0.01, 0.35])
						.range(["#E00000", "#fff0f0", "#f0fff0", "#00E000"]).clamp(true);
					thisElement.style.fill = s(v);
				} else {continue}
			} else if (stat == "turnout") {
				if(tV == 0){continue}
				if(demographics[thisIndex] == undefined){continue}
				let v = (tS['t'] / demographics[thisIndex]['p'])
				let s = d3.scaleLinear()
					.domain([0.275,0.65,0.9])
					.range(["#F8F2FF", "#6A0D98", "#440066"]);

				thisElement.style.fill = s(v);
			} else if (stat == "reporting" && shortYear == "24") {
				if(thisState['reporting'] == 0){continue}
				let s = d3.scaleLinear().domain([0,100]).range(["#6A0D98","#F8F2FF"]);
				thisElement.style.fill = s(thisState['reporting']);
			} else if (stat == "demVote") {
				let ratio = tS['v']['d'] / (tS['t'] || 100);
				let scale = d3.scaleLinear().domain([0.25, 0.6]).range(["#e6f2ff", "#0069d9"]);
				if(ratio > 0){thisElement.style.fill = scale(ratio)}
			} else if (stat == "repVote") {
				let ratio = tS['v']['r'] / (tS['t'] || 100);
				let scale = d3.scaleLinear().domain([0.25, 0.6]).range(["#ffe6e6", "#E00000"]);
				if(ratio > 0){thisElement.style.fill = scale(ratio)}
			} else if (stat == "otherVote") {
				let ratio = ((tS['t'] || 100) - tS['v']['d'] - tS['v']['r']) / (tS['t'] || 100);
				let scale = d3.scaleLinear().domain([0,0.01, 0.25]).range(["#ffffff","#cfb3ff", "#6a29a3"]);	
				if(ratio == 1){ratio = 0}
				if(tV > 0 && ratio >= 0){thisElement.style.fill = scale(ratio)}
			} else if (stat == "swing") {
				let sPY = previousYears[shortYear];
				if(tI[sPY] == undefined){continue}
				let TVP = tI[sPY]['t'], TV = tS['t'], pR = tI[sPY]['v'];
				let DV = tS['v']['d'],RV = tS['v']['r'],DVP = pR['d'], RVP = pR['r'];
				let swing = (DV-RV)/TV-(DVP-RVP)/TVP;
				let scale = d3.scaleLinear()
					.domain([-0.2, -0.01, 0, 0.01, 0.2])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
				thisElement.style.fill = scale(swing);
			} else if (stat == "swing8") {
				let shortYear = (selectedYear-4).toString().slice(-2)
				let sPY = previousYears[shortYear];
				if(tI[sPY] == undefined){continue}
				let TVP = tI[sPY]['t'], TV = tS['t'], pR = tI[sPY]['v'];
				let DV = tS['v']['d'],RV = tS['v']['r'],DVP = pR['d'], RVP = pR['r'];
				let swing = (DV-RV)/TV-(DVP-RVP)/TVP;
				let scale = d3.scaleLinear()
					.domain([-0.2, -0.01, 0, 0.01, 0.2])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
				thisElement.style.fill = scale(swing);
			} else if (stat == "swing12") {
				let shortYear = (selectedYear-8).toString().slice(-2)
				let sPY = previousYears[shortYear];
				if(tI[sPY] == undefined){continue}
				let TVP = tI[sPY]['t'], TV = tS['t'], pR = tI[sPY]['v'];
				let DV = tS['v']['d'],RV = tS['v']['r'],DVP = pR['d'], RVP = pR['r'];
				let swing = (DV-RV)/TV-(DVP-RVP)/TVP;
				let scale = d3.scaleLinear()
					.domain([-0.2, -0.01, 0, 0.01, 0.2])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
				thisElement.style.fill = scale(swing);
			} else if (stat == "swing16") {
				let shortYear = (selectedYear-12).toString().slice(-2)
				let sPY = previousYears[shortYear];
				if(tI[sPY] == undefined){continue}
				let TVP = tI[sPY]['t'], TV = tS['t'], pR = tI[sPY]['v'];
				let DV = tS['v']['d'],RV = tS['v']['r'],DVP = pR['d'], RVP = pR['r'];
				let swing = (DV-RV)/TV-(DVP-RVP)/TVP;
				let scale = d3.scaleLinear()
					.domain([-0.2, -0.01, 0, 0.01, 0.2])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
				thisElement.style.fill = scale(swing);
			} else if (stat == "leadState") {
				let swState, sC = -3;
				if(/\d/.test(thisIndex) == false){
					swState = "United States"
				} else {
					if(thisIndex.length > 5){sC = -8}
					swState = fipsState[thisIndex.slice(0, sC)];
				}

				let sI = data_president[swState];

				let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t'];
				let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r'];
				let swing = (DV-RV)/TV-(DVS-RVS)/TVS;
				let scale = d3.scaleLinear()
					.domain([-0.25, -0.01, 0, 0.01, 0.25])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
				thisElement.style.fill = scale(swing);
			} else if (stat == "leadNation") {
				let sI = data_president['United States'];

				let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t'];
				let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r'];
				let swing = (DV-RV)/TV-(DVS-RVS)/TVS;
				let scale = d3.scaleLinear()
					.domain([-0.25, -0.01, 0, 0.01, 0.25])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
				thisElement.style.fill = scale(swing);
			} else {
				if (tV > 0 && vA[0] == vA[1] && vA[0] + vA[1] !== 0){
					addClassFromWinner(thisElement, "tie")
					data_president[thisIndex]['w'] = "tie";
					continue;
				} else {
					var tC = thisElement.classList;
					if(tC.contains("county") || tC.contains("township")) {
						if(tV > 0){
							addClassFromWinner(thisElement, cand[0]);
						} else {
							continue;
						}
					} else {
						addClassFromWinner(thisElement, thisWinner);
					}
					if (tW == "" || !tW){
						if(!tW){data_president[thisIndex][sY]['w'] = ""}
						if(vA[0] > 0){
							var tL = cand[0]; 
							if(tC.contains("county") || tC.contains("township")) {
								addClassFromWinner(thisElement, tL)
							} else {
								if (tL == "r") {tC.add("gopLead")}
								if (tL == "d") {tC.add("demLead")}
							}
						}
					}
				}
			}
		} else if(selectedContest == "PRESIDENT BY CD"){
			var clickedState = document.getElementById(thisIndex).getAttribute("data-stateabbreviation");
			var clickedCD = document.getElementById(thisIndex).getAttribute("data-districtnumber");
			var thisUnit = data_pres_house[selectedYear][clickedState][clickedCD];

			const tS = thisUnit;
			let cV = {"d":tS['d'],"r":tS['r'],"rp":tS['rp']};

			var cand = Object.keys(cV).filter(a => cV[a] !== undefined).sort((a, b) => cV[b] - cV[a]);
			var vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a);
			var tV = vA.reduce((a,b) => a+b,0); var margin = Math.abs(vA[0] - vA[1]) / tV;
			if(tV == 0){margin = 0}

			if (stat == "margin") {
				var s;
				switch (cand[0]) {
					case "d": s = d3.scaleLinear().range(["#e6f2ff", "#0069d9"]); break;
					case "r": s = d3.scaleLinear().range(["#ffe6e6", "#E00000"]); break;
					case "rp": s = d3.scaleLinear().range(["#cfb3ff", "#6a29a3"]); break;
					default: s = ""; break;
				}
				if(s !== ""){thisElement.style.fill = s.domain([0,0.25])(margin)}
			} else {
				addClassFromWinner(thisElement, thisUnit.w);
			}
		} else {
			var thisUnit, sY = selectedYear, shY = shortYear, tI = thisIndex, cL = thisElement.classList;
			thisUnit = dataResultsFile[selectedYear + '-' + thisIndex];
			var thisPUnit = data_president[thisIndex];
			if (!thisUnit){
				let sE = ['GOVERNOR','SENATE','SENATE RUNOFF'];
				if (sE.includes(selectedContest)) {
					switch (selectedContest) {
						case "GOVERNOR": thisUnit = data_gov_recall[sY + '-' + tI]; break;
						case "SENATE": thisUnit = data_sen_sp[sY + '-' + tI]; break;
						case "SENATE RUNOFF": thisUnit = data_sen_sp_r[sY + '-' + tI]; break;
					}
				}

				if (!thisUnit){
					let nationalRaces = ['PRESIDENT','HOUSE','PRESIDENT BY CD']
					if(!nationalRaces.includes(selectedContest)){
						if(!(cL.contains("county")) && !(cL.contains("township"))){
							cL.add("noContest");
						} else {
							let swState = "", sC = -3;
							if(/\d/.test(thisIndex) !== false){
								if(thisIndex.length > 5){sC = -8}
								swState = fipsState[thisIndex.slice(0, sC)];
							}

							let sI = dataResultsFile[selectedYear + '-' + swState];
							if(!sI){
								cL.add("noContest");
							}
						}
					}
					continue;
				}
			}
			
			var winners, thisWinner = thisUnit['winner'], tW = thisWinner; const tU = thisUnit;

			if(tW !== undefined && tW !== ""){
				winners = tW.split(','); let tempInc = [];
				for (let i = 0; i < winners.length; i++) {
					let tC = winners[i], x = tC;
					if(tC == "runoff" || tC == "tie"){continue}
					if(tC.startsWith("cand")){x = tU[tC + '_party']}
					tempInc.push(x)
				}
				if(tempInc.length == 1){
					let a = tempInc[0]; var thisWinner = a, tW = a;
					winners = a
				} else {
					winners = tempInc
				}
			}

			if(filters == "gain"){
				let cL = thisElement.classList;
				if(thisUnit['gain'] !== 1 && !(cL.contains("county")) && !(cL.contains("township"))){
					// if(selectedContest == "HOUSE"){hideHouseBox(thisIndex)}
					continue;
				} else {
					let swState, sC = -3;
					if(/\d/.test(thisIndex) == false){
						swState = ""
					} else {
						if(thisIndex.length > 5){sC = -8}
						swState = fipsState[thisIndex.slice(0, sC)];
					}

					let sI = dataResultsFile[selectedYear + '-' + swState];
					if(sI){
						if(sI['gain'] !== 1){continue}
					}
				}
			} else if (filters == "uncontested") {
				var v = 0; for (let i = 1; i <= 5; i++) {if(tU["cand" + i + "_party"]){v++}}
				if(v !== 1 && !(cL.contains("county")) && !(cL.contains("township"))){
					// if(selectedContest == "HOUSE"){dimHouseBox(thisIndex)}
					continue;
				} else  {
					if (tW == "") {
						thisElement.classList.add("noProjection");
						continue;
					}
				}

			} else if (filters == "openSeat") {
				let thisIncumbent = tU['incumbent'];
			
				if(thisIncumbent && !(cL.contains("county")) && !(cL.contains("township"))){
					continue;
				} else  {
					if (thisIncumbent) {
						thisElement.classList.add("noProjection");
						continue;
					}
				}


			} else if (filters == "obamaTrump") {
				if(selectedContest == "HOUSE"){mapSettings['filters'] = ""; refreshFill(); return}
				let tP = thisPUnit;
				let f = i => Object.keys(i).reduce((a,b) => i[a] > i[b] ? a : b);
				if(f(tP['16']['v']) == "r" && f(tP['12']['v']) == "d" && f(tP['08']['v']) == "d"){
				if (tW == "") {
					let tC = thisElement.classList;
					if(!tC.contains("county") && !tC.contains("township")) {
						thisElement.classList.add("noProjection"); continue;
						}
					}
				} else {
					continue
				}
			} else if (filters == "trumpBiden") {
				if(selectedContest == "HOUSE"){
					var clickedState = $("#"+thisIndex).attr("data-stateabbreviation");
					var clickedCD = $("#"+thisIndex).attr("data-districtnumber");
					let tCD = data_pres_cd[selectedYear][clickedState + "-" + clickedCD];
					if(tCD){
						if(tCD['d20'] > tCD['r20']){w20 = "d"} else {w20 = "r"}
						if(tCD['d16'] > tCD['r16']){w16 = "d"} else {w16 = "r"}
					}
				} else {
					let tP = thisPUnit;
					let f = i => Object.keys(i).reduce((a,b) => i[a] > i[b] ? a : b);
					var w16 = f(tP['16']['v']), w20 = f(tP['20']['v']);
				}
				if(w16 == "r" && w20 == "d"){
					if (thisWinner == "") {thisElement.classList.add("noProjection"); continue;}
					addClassFromWinner(thisElement, thisWinner)
				} else {
					if(selectedContest == "HOUSE"){dimHouseBox(thisIndex)}
					continue;
				}
			} else if (filters == "ticketSplit") {
				var wC = "", wP = "";
				if(selectedContest == "HOUSE"){
					if(selectedYear == "2024"){mapSettings['filters'] = ""; refreshFill(); return;}
					var clickedState = d3.select("#"+thisIndex).attr("data-stateabbreviation");
					var clickedCD = d3.select("#"+thisIndex).attr("data-districtnumber");
					var thisUnitCD = data_pres_cd[selectedYear][clickedState + "-" + clickedCD];
					if(thisUnitCD){
						let f = i => Object.keys(i).reduce((a,b) => i[a] > i[b] ? a : b);
						wP = f(thisUnitCD[shortPresYear]['v']);
						wC = data_house[selectedYear+"-"+clickedState +"-"+clickedCD].winner;
					}
				} else {
					let tP = thisPUnit;
					let f = i => Object.keys(i).reduce((a,b) => i[a] > i[b] ? a : b);
					wP = f(tP[shortPresYear]['v']); var wC = thisUnit.winner;
				}
					
				if(wP !== "" && wC !== "runoff" && wC !== "" && wC !== wP){
					addClassFromWinner(thisElement, thisWinner);
					addClassFromWinnerHouseBox(thisIndex, thisUnit, thisWinner);
				} else {
					// if(selectedContest == "HOUSE"){dimHouseBox(thisIndex)}
					continue;
				}
			}

			var cV = {};
			for (let i = 1; i <= 12; i++) {
				let name = "cand" + i, tVote = tU[name + "_vote"];
				cV[name] = tVote || 0;
			}

			var vA = Object.values(cV)
				.filter(a => a !== undefined)
				.sort((a,b) => b-a);

			var candA = Object.keys(cV)
				.sort((a, b) => cV[b] - cV[a])
				.map(a => tU[a + "_party"])
				.filter(a => a !== undefined);

			var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0);

			var margin = Math.abs((vA[0]/ vT) - (vA[1]/ vT));
			var rawMargin = (vA[0] - vA[1]) / vT;
			if(vT == 0 && candA.length > 1){margin = 0}
			if(candA.length == 1){
				margin = 1;
			}

			if (filters == "margin10") {
				if(margin > 0.1){continue}
			} else if (filters == "margin5") {
				if(margin > 0.05){continue}
			} else if (filters == "margin3") {
				if(margin > 0.03){continue}
			} else if (filters == "margin1") {
				if(margin > 0.01){continue}
			}

			let uncontestedShow = "FALSE";
			if(candA.length == 1 && uncontestedShow == "TRUE"){
				margin = 1;
				if(selectedContest == "HOUSE"){
					thisUnit['winner'] = candA[0];
					addClassFromWinner(thisElement, candA[0]);
					addClassFromWinnerHouseBox(thisIndex, thisUnit, candA[0]);
				}
			}

			if (stat == "reporting") {
				if(selectedYear !== "2024"){mapSettings['filters'] = ""; refreshFill(); return;}
				let s = d3.scaleLinear().domain([100,0]).range(["#F8F2FF", "#6A0D98"]);
				thisElement.style.fill = s(tU['reporting']);
				continue;
			} else if (stat == "margin"){
				if(vA.length == 1){if(vA[0] == 0){vA = [100,0]} else {vA.push(0)}};
				var s;
				switch (candA[0]) {
					case "d": s = d3.scaleLinear().range(["#e6f2ff", "#0069d9"]); break;
					case "r": s = d3.scaleLinear().range(["#ffe6e6", "#E00000"]); break;
					case "rp": s = d3.scaleLinear().range(["#cfb3ff", "#6a29a3"]); break;
					case "o": s = d3.scaleLinear().range(["#DEDEDE", "#808080"]); break;
					case "i": s = d3.scaleLinear().range(["#cfb3ff", "#6a29a3"]); break;
					case "yes": s = d3.scaleLinear().range(["#fde5ce", "#e66f00"]).clamp(true); break;
					case "no": s = d3.scaleLinear().range(["#e5cefd", "#4b1683"]).clamp(true); break;
					default: s = ""; break;
				}
				if(margin == 0){if(vT == 0){continue} else {s = d3.scaleLinear().range(["#f0fff0", "#f0fff0"])}}
				if(s !== ""){thisElement.style.fill = s.domain([0,0.3])(margin)}
				addClassFromWinnerHouseBox(thisIndex, thisUnit, thisWinner);

			} else if (stat == "changeTurnout") {
				if(!thisUnit['total_vote']){
					var voteShift = 0;
				} else {
					var voteShift = (thisUnit['total_vote'] / thisState['t'+ shortPresYear])-1;
				}
				let s = d3.scaleLinear()
					.domain([-0.35, -0.01, 0.01, 0.35])
					.range(["#E00000", "#fff0f0", "#f0fff0", "#00E000"]).clamp(true);

				thisElement.style.fill = s(voteShift);
			} else if (stat == "leadState BLOCKER") {
				if(selectedContest == "HOUSE"){
					mapSettings['stats'] = "margin";
					refreshFill();
					return;
				}

				let swState, sC = -3;
				if(/\d/.test(thisIndex) == false){
					if(thisIndex.length > 5){sC = -8}
					swState = fipsState[thisIndex.slice(0, sC)];
				} else {
					if(thisIndex.length > 5){sC = -8}
					swState = fipsState[thisIndex.slice(0, sC)];
				}

				var sU = dataResultsFile[selectedYear + '-' + swState];
				if(sU == undefined){continue}
				var sCV = {};
				for (let i = 1; i <= 12; i++) {
					let name = "cand" + i, tVote = sU[name + "_vote"];
					sCV[name] = tVote || 0;
				}

				let sVA = Object.values(sCV)
					.filter(a => a !== undefined)
					.sort((a,b) => b-a);

				let sCandA = Object.keys(sCV)
					.sort((a, b) => sCV[b] - sCV[a])
					.map(a => sU[a + "_party"])
					.filter(a => a !== undefined);

				let sVT = sVA.reduce((a,b) => a+b,0);

				let sMargin = Math.abs(sVA[0] - sVA[1]) / sVT;
				let sRawMargin = (sVA[0] - sVA[1]) / sVT;
				if(sVT == 0 && sCandA.length > 1){sMargin = 0}
				if(sCandA.length == 1){sMargin = 1}

				let compMargin = (sRawMargin - rawMargin);
				let leader = sCandA[0], leaderMargin = sCandA[0] / sVT;
				if(compMargin > 0){leader = sCandA[1]}

				var s;
				switch (leader) {
					case "d": s = d3.scaleLinear().range(["#e6f2ff", "#0069d9"]); break;
					case "r": s = d3.scaleLinear().range(["#ffe6e6", "#E00000"]); break;
					case "rp": s = d3.scaleLinear().range(["#cfb3ff", "#6a29a3"]); break;
					case "o": s = d3.scaleLinear().range(["#DEDEDE", "#808080"]); break;
					case "i": s = d3.scaleLinear().range(["#cfb3ff", "#6a29a3"]); break;
					case "yes": s = d3.scaleLinear().range(["#fde5ce", "#e66f00"]).clamp(true); break;
					case "no": s = d3.scaleLinear().range(["#e5cefd", "#4b1683"]).clamp(true); break;
					default: s = ""; break;
				}
				// if(compMargin == 0){continue}

				let scale = d3.scaleLinear()
					.domain([-0.25, -0.01, 0, 0.01, 0.25])
					.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);

				if(s !== ""){thisElement.style.fill = s.domain([0,0.3])(compMargin)}
			}

			if (stat == "swing") {
					let vote = {};
					for (let i = 1; i <= 12; i++) {
						let name = "cand" + i, tVote = tU[name + "_vote"];
						let party = tU[name + "_party"];
						if(party !== undefined){vote[party] = tVote || 0}
					}

					if(vote['d'] && vote['r']){
						let tPres = thisState[shortPresYear];
						let tVote = tU['total_vote'], tPresT = tPres['t'];
						let thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT;
						let thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT;

						let swing = (thisD-thisR) - (prevD-prevR), absSwing = Math.abs(swing)
						if(absSwing >= 0.25){var marginProg = 1} else {var marginProg = absSwing / 0.25};

						let scale = d3.scaleLinear()
							.domain([-0.25, -0.01, 0, 0.01, 0.25])
							.range(["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"]);
						thisElement.style.fill = scale(swing);
					} else {
						thisElement.classList.add("runoffState")
					}
			} else {
				if(!thisUnit['winner']){tU['winner'] = ""}
				if(tU['total_vote'] > 0){
					let tECL = thisElement.classList;
					if(tU['advances'] && tU['advances'] !== ""){
						addClassFromWinner(thisElement, "runoff");
						tU['winner'] = "runoff";
						getResults();	
						continue;
					}	

					if(tECL.contains("county") || tECL.contains("township")) {
						if(vA[0] == vA[1]){
							addClassFromWinner(thisElement, "tie");
							continue;
						}
						addClassFromWinner(thisElement, candA[0]);
					}
				}
			}

/*				if(selectedContest == "HOUSE" || selectedContest == "PRESIDENT BY CD"){
					var thisElementBox = document.getElementById("box-" + thisIndex)
					if(thisElementBox){
					thisElementBox.classList = "districtBox";
					if (thisUnit['gain'] == "1" && filter !== "gain") {
						thisElementBox.classList.add("districtBoxGain")
					}

//					if (thisUnit['reporting'] <= 0){thisElementBox.classList.add("districtBoxPollsClosed")}
					if (thisWinner == "r") {thisElementBox.classList.add("districtBoxRep")}
					if (thisWinner == "d") {thisElementBox.classList.add("districtBoxDem")}
					if (thisWinner == "i") {thisElementBox.classList.add("districtBoxInd")}

					var thisGroupBox = document.getElementById("groupBox-" + thisIndex)
					if(thisGroupBox){
						if(selectedYear == "2024"){
							if(thisGroupBox.classList.contains("cdGroupBoxPollsClosed") == "true"){
								thisGroupBox.classList = "cdBox cdGroupBoxPollsClosed";
							} else {
								thisGroupBox.classList = "cdBox"
							}
							if (thisUnit['gain'] == "1") {thisGroupBox.classList.add("cdGroupBoxGain")}
							if(thisWinner == "r"){thisGroupBox.classList.add("cdGroupBoxRep")}
							if(thisWinner == "d"){thisGroupBox.classList.add("cdGroupBoxDem")}
							if(thisWinner == "i"){thisGroupBox.classList.add("cdGroupBoxInd")}
						}
					}
				}} */

				if (thisIndex !== "United States" && thisElement){
					if (thisWinner == "tie") {
						thisElement.classList.add("tieState");
						if(selectedContest == "HOUSE"){
							var tCB = document.getElementById("box-" + thisIndex);
							tCB.classList.add("districtBoxTie");
						}
						continue;
					}

					let tECL = thisElement.classList;
					if(selectedContest == "HOUSE"){
						var status = $("#data").attr("button-houseCount");
						if(status == "called"){
							addClassFromWinner(thisElement, thisWinner);
							addClassFromWinnerHouseBox(thisIndex, thisUnit, thisWinner);
						} else if (status == "uncalled") {
							if(vT > 0 && thisWinner == ""){
								addClassFromWinner(thisElement, candA[0]);
								addClassFromWinnerHouseBox(thisIndex, null, candA[0]);
							} else if (thisWinner == "" && candA.length == 1) {
								addClassFromWinner(thisElement, candA[0]);
								addClassFromWinnerHouseBox(thisIndex, null, candA[0]);
							} else {
								clearHouseBox(thisIndex);
							}
						} else if (status == "lead"){
							if(vT > 0){
								if(thisWinner == ""){
									addClassFromLead(thisElement, candA[0]);
								} else {
									addClassFromWinner(thisElement, candA[0]);
								}
								addClassFromWinnerHouseBox(thisIndex, null, candA[0]);
							} else if (candA.length == 1) {
							//	if(thisWinner == ""){
							//		addClassFromLead(thisElement, candA[0]);
							//	} else {
									addClassFromWinner(thisElement, candA[0]);
							//	}
								addClassFromWinnerHouseBox(thisIndex, null, candA[0]);
							} else {
								clearHouseBox(thisIndex);
							}
						} else {
							addClassFromWinner(thisElement, thisWinner)
						}
					} else {
						addClassFromWinner(thisElement, thisWinner)
					}
					
			}
		}
	}
}

function dimHouseBox(i){
	if($("#data").attr("button-year") == "2024"){
		let tGBox = document.getElementById("groupBox-" + i);
		if (tGBox) {tGBox.classList = "cdBox cdGroupBoxPollsClosed"}
	}

	let tEBox = document.getElementById("box-" + i)
	if(tEBox){tEBox.classList = "districtBox districtBoxPollsClosed"}
}

function undimHouseBox(i){
	if($("#data").attr("button-year") == "2024"){
		let tGBox = document.getElementById("groupBox-" + i);
		if (tGBox) {tGBox.classList.remove = "cdGroupBoxPollsClosed"}
	}

	let tEBox = document.getElementById("box-" + i)
	if(tEBox){tEBox.classList.remove = "districtBoxPollsClosed"}
}

function addWinnerTest(i){
	data_house['2024-' + i]['winner'] = "r";

}

function addClassFromWinner(e, w, b) {
	var d = $("#data");
	if(b == true){if(w == ""){e.classList.add("noProjection")}}
	if(w !== ""){
	let c;
	switch(w) {
		case "r": c = "redState"; break;
		case "d": c = "blueState"; break;
		case "gw": c = "orangeState"; break;
		case "tie": c = "tieState"; break;
		case "o": c = "othState"; break;
		case "i": c = "indState"; break;
		case "yes": c = "yesState"; break;
		case "no": c = "noState"; break;
		case "runoff": c = "runoffState"; break;
		case "u": c = "uState"; break;
		case "rp": c = "rpState"; break;
		case "d1": c = "d1State"; break;
		case "d2": c = "d2State"; break;
		case "d3": c = "d3State"; break;
		case "d4": c = "d4State"; break;
		case "d5": c = "d5State"; break;
		case "d6": c = "d6State"; break;
		case "d7": c = "d7State"; break;
		case "d8": c = "d8State"; break;
		case "d9": c = "d9State"; break;
		case "d10": c = "d10State"; break;
		case "d11": c = "d11State"; break;
		case "r1": c = "r1State"; break;
		case "r2": c = "r2State"; break;
		case "r3": c = "r3State"; break;
		case "r4": c = "r4State"; break;
		case "r5": c = "r5State"; break;
		case "r6": c = "r6State"; break;
		case "r7": c = "r7State"; break;
		case "r8": c = "r8State"; break;
		case "r9": c = "r9State"; break;
		case "r10": c = "r10State"; break;
		case "r11": c = "r11State"; break;
	}
	if(c !== ""){e.classList.add(c)}
	}
}

function addClassFromLead(e, w, b) {
	var d = $("#data");
	if(b == true){if(w == ""){e.classList.add("noProjection")}}
	if(w !== ""){
	let c;

	switch(w) {
		case "r": c = "gopLead"; break;
		case "d": c = "demLead"; break;
		case "o": c = "othLead"; break;
		case "i": c = "indLead"; break;
	}

	if(c !== ""){e.classList.add(c)}
	}
}

function addClassFromWinnerHouseBox(i, u, w) {
	var d = $("#data");
	if(d.attr("button-contest") == "HOUSE") {
		let tGBox = document.getElementById("groupBox-" + i);
		let tEBox = document.getElementById("box-" + i);
		if(tGBox) {
			if(d.attr("button-year") == "2024") {
				tGBox.classList = "cdBox"
				let gBoxClass = "";
				if(u !== null){
					if(u['gain'] == 1) {gBoxClass += "cdGroupBoxGain"}
				}

				switch(w) {
					case "r": gBoxClass += "Rep"; break;
					case "d": gBoxClass += "Dem"; break;
					case "i": gBoxClass += "Ind"; break;
				}
				if(gBoxClass) {tGBox.classList.add("cdGroupBox" + gBoxClass)}
			}
		}
		if(tEBox){
			tEBox.classList = "districtBox"
			let classToAdd = "";
			if(u !== null){
				if(u['gain'] == 1 && mapSettings['filters'] !== "gain") {
					tEBox.classList.add("districtBoxGain")
				}
			}

			switch(w) {
				case "r": classToAdd += "Rep"; break;
				case "d": classToAdd += "Dem"; break;
				case "i": classToAdd += "Ind"; break;
			}
			if(classToAdd) {tEBox.classList.add("districtBox" + classToAdd)}
		}
	}
}

function clearHouseBox(i){
	var d = $("#data");
	if(d.attr("button-contest") == "HOUSE") {
		let tGBox = document.getElementById("groupBox-" + i);
		let tEBox = document.getElementById("box-" + i);
		if(tGBox) {
			if(d.attr("button-year") == "2024") {tGBox.classList = "cdBox"}
		}
		if(tEBox){tEBox.classList = "districtBox"}
	}
}

function dimHouseBox(i){
	if($("#data").attr("button-year") == "2024"){
		let tGBox = document.getElementById("groupBox-" + i);
		if (tGBox) {tGBox.classList = "cdBox cdGroupBoxPollsClosed"}
	}

	let tEBox = document.getElementById("box-" + i)
	if(tEBox){tEBox.classList = "districtBox districtBoxPollsClosed"}
}

function hideHouseBox(i){
	let tEBox = document.getElementById("box-" + i)
	if(tEBox){
		tEBox.classList = "districtBox districtBoxPollsClosed";
		tEBox.style.display = "none";
	}
}

function clickedFunction(input) {
	var dE = $("#data");
	if(dE.attr("button-draw") == "true"){return};

	if(dE.attr("button-road270") == "true") {
		var clickedState = input.getAttribute('id'), cA = document.getElementById(clickedState).classList,
		party = dE.attr("data-road270-party");

		switch(party) {
			case 'm':
				if(cA.contains('redState')) {cB='state'} else if(cA.contains('blueState')) {cB='r'} else {cB='d'}
				break;
			case 'd':
				if(cA.contains('blueState') || cA.contains('blueProj')) {cB='state'} else {cB='d'}; break;
			case 'r':
				if(cA.contains('redState') || cA.contains('redProj')) {cB='state'} else {cB='r'}; break;
			case 't':
				cB = ''; break;
		}

		dE.attr("clicked-270", clickedState);
		addElectoralVoteMap(clickedState, cB);
		return;
	} else if(dE.attr("button-graphics") == "true") {
		var clickedState = input.getAttribute('id'); 
		dE.attr("data-stateclick", clickedState);
		showStateGraphic(clickedState);
	} else {
		var thisState = input.getAttribute('data-state');
		var countyMap = dE.attr("button-county");
		var selectedYear = dE.attr("button-year");
		var selectedContest = dE.attr("button-contest");
		var clickedState = dE.attr("data-stateclick");
		var lastClicked = dE.attr("last-clicked");
		var yrShort = dE.attr("button-year").slice(-2).toString();

		var clicked = input.getAttribute('id');

		if(clicked == "drawIcon" || clicked == pathDrawn) {return};

		if(countyMap == "true" && thisState !== clickedState) {
			var clicked = input.getAttribute('data-state'), input = document.getElementById(clicked);
			zoomToPath(clicked, 750);

			if(lastClicked !== "United States") {d3.select("[id='" + lastClicked + "']").lower()}
			if(clickedState !== "United States") {d3.select("[id='" + clickedState + "']").lower()}
		}
		// console.log(clicked)

		if((selectedContest.includes("HOUSE") || selectedContest.includes("STATE ") || selectedContest == "PRESIDENT BY CD") && thisState !== clickedState) {
			var district = (input.getAttribute('data-district')).substring(3, 5);
			var atLarge = input.getAttribute('data-districtatlarge');

			if(atLarge !== "true") {
				dE.attr("data-levelcd", null);
				var thisState = input.getAttribute('data-state');
				var clicked = thisState; var input = document.getElementById(clicked);
			} else {
				dE
					.attr("data-levelcd", "atlarge")
					.attr("data-stateabbreviation", input.getAttribute('data-stateabbreviation'))
			}

			$("#buttonHistory").css("display", "none");

			if(clicked !== "United States"){
				let x = $(`.hd:not([data-state="${thisState}"]), .sd:not([data-state="${thisState}"])`);
				x.removeClass("notSelectedState");
			}

			if(clickedState !== "United States"){
				d3.select("[id='" + clickedState + "']").lower().classed("selectedState", false);
				d3.select(input).lower();
			}

		} else if(+selectedYear >= 2006) {d3.select("#buttonHistory").style("display","flex")}

		$(".selectedCounty").removeClass("selectedCounty")
		$("#data").attr("last-clicked", clicked);

		if(input.getAttribute('data-countyname') || input.getAttribute('data-township')) {
			setCountyName(input, thisState);
			$("#data")
				.attr("data-levelcd", null)
				.attr("data-stateabbreviation", input.getAttribute('data-stateabbreviation'))
		} else if(input.getAttribute('data-region')) {
			showResults();
	
			let data = $("#data");
			if(dE.attr("button-resultsTotalPanel") == "true" && dE.attr("button-resultsVoteType") == "true"){
				if(selectedContest == "PRESIDENT"){hideVoteType(true)}
			}
			
			var tAbbrev = input.getAttribute('data-stateabbreviation');

			dE
				.attr("data-state", null)
				.attr("data-level", "state")
				.attr("data-stateabbreviation", tAbbrev)
				.attr("data-stateclick", thisState);

			if(!selectedContest.includes("HOUSE") && !selectedContest.startsWith("STATE ") && selectedContest !== "PRESIDENT BY CD") {
				getYearsContest();

				setResultsBoxTopTextState(tAbbrev);
//				setElectoralVoteText(thisState);

				if(countyMap !== "true") {
					$(`.county:not([data-state="${thisState}"])`).css("display", "none");
					$(`.township:not([data-state="${thisState}"])`).css("display", "none");
					$('.countyBubble').css('display', 'none');
				}

				if(dE.attr("data-bubbles") == "show"){refreshBubbles()}
				$('.county[data-state="' + clicked + '"]').css('display', 'initial');
				$('.township[data-state="' + clicked + '"]').css('display', 'initial');
				if(!selectedContest.includes(" PRESIDENT")){
					$(".state").addClass("notSelectedState");
				}

				$(".selectedState").removeClass("selectedState");
				scaleHeadingText();
			} else if(selectedContest == "HOUSE" || selectedContest == "PRESIDENT BY CD") {

			//	d3.selectAll(".districtBox:not([data-district-state='"+thisState+"'])").style("display", "none");
			//	d3.selectAll(".districtBox[data-district-state='"+thisState+"']").style("display", "initial");

				calculateHouseTallies();
				highlightStateDistrict(yrShort, thisState);

				if(selectedContest == "HOUSE") {
					$('#resultsBoxTopText').html("")
					$(".votesBox").text("0");
					$("#resultsBoxHouse").removeClass("hidden")
				}
			} else if(selectedContest == "STATE HOUSE") {
				$(".state").addClass("notSelectedState");
				highlightStateDistrict(yrShort, thisState, "hd");
			} else if(selectedContest == "STATE SENATE") {
				$(".state").addClass("notSelectedState");
				highlightStateDistrict(yrShort, thisState, "sd");
			}

			d3.select("[id='" + thisState + "']").raise().classed("selectedState", true)
			zoomToState(thisState, 750);
			setPointLabels(thisState);
		} else if(input.getAttribute('data-district')) {
			document.getElementById("resultsBoxHouse").classList.add("hidden");

			$('#resultsBoxTopText')
				.text("District " + +(input.getAttribute('data-districtnumber')))
				.css("transform", 'scaleX(1)');

			if($("#data").attr("data-levelcd") == "atlarge"){setPointLabels(thisState)}
			if(input.getAttribute('data-districtatlarge') == "true"){
				zoomToDistrict(clicked);
				$("#data").attr("data-stateclick", thisState)
			} else {
				if($("#data").attr("data-level") == "state"){
					if(selectedYear == "2024" || selectedContest == "PRESIDENT BY CD"){
						zoomToState(thisState, 666)
					}
				}
			}

			$("#data")
				.attr("data-state", thisState)
				.attr("data-level", "county");

			showResults();
			$(".cd").addClass("notSelectedState");

			d3.select("[id='" + thisState + "']").lower();

			d3.select(input)
				.raise()
				.classed("notSelectedState", false)
				.classed("selectedCounty", true);
		}

		if($("#data").attr("button-history") == "true") {
			updateHistory();
		}

		if(countyMap == "true") {
			d3.selectAll(".county").style("display", "initial")
		}

		$('#headingTextTitle').text(thisState); scaleHeadingText();
		refreshLabelsPath();
		getResults();
	}
}

function createBorderPath(input){
	var path = d3.select("[id='" + input + "']");
	var inputPath = path.attr("d");
	d3.select("#pathBorder")
		.attr("d", inputPath)
		.raise();
}

var countyTypes = {"99":"D.C.","06":"CO.","03":"CY.","05":"AREA","04":"Born.","12":"","15":"PAR.","25":"CY.","00":"DCT.","43":""}

function setCountyName(input, state){
	var type = countyTypes[input.getAttribute('data-countytype')] || " ";
	var name = input.getAttribute('data-township') || input.getAttribute('data-county');

	$("#data").attr("data-state", state).attr("data-level", "county");
	d3.select("[id='" + state + "']").raise();
	d3.select(input).classed("selectedCounty", true).raise();

	let eN = document.getElementById("resultsBoxTopText");
	eN.innerHTML = `${name} <ct>${type}</ct>`;

	let s = Math.min(1, (document.body.clientWidth * 0.25)/eN.clientWidth);
	eN.style.transform = `scaleX(${s})`;
	if($("#data").attr("data-bubbles") == "show"){
		d3.select('.bubble').raise()
	}
}

function setElectoralVoteText(i){
	var data = $("#data"), year = data.attr("button-year");
	var a = stateAbbreviation[i]; if(i == "United States"){a = "US"}

	var selectedContest = data.attr("button-contest");

	var display = "hidden";
	if(selectedContest == "PRESIDENT"){
		if(year >= 1940){display = "visible"}
		if(i == "United States"){
			var eV = electoralVotes['United States'][year];
			var evText = "needed<br>to win";
		} else {
			var eV = electoralVotes[i][year];
			var evText = "electoral<br>votes";
			if(i == "Maine" || i == "Nebraska") {evText = "split<br>elec. votes"}
		}
		$('#headingElectoralVotesNumber').html(eV);
		$('#headingElectoralVotesText').html(evText);
	} else if (+year >= 2016) {
		if(selectedContest == "DEM PRESIDENT") {
			display = "visible";
			if(i !== "United States"){
				$('#headingElectoralVotesText').html("pledged<br>delegates");
			} else {
				$('#headingElectoralVotesText').html("needed for<br>nomination");
			}
			var dC = delegates[year]['D'][a]['delegates'];
			$('#headingElectoralVotesNumber').html(numF.format(dC));
		} else if(selectedContest == "GOP PRESIDENT") {
			display = "visible";
			if(i !== "United States"){
				$('#headingElectoralVotesText').html("pledged<br>delegates");
			} else {
				$('#headingElectoralVotesText').html("needed for<br>nomination");
			}
			var dC = delegates[year]['R'][a]['delegates'];
			$('#headingElectoralVotesNumber').html(numF.format(dC));
		}
	}
	$("#headingElectoralVotes").css('visibility', display);
}

$('#resultsBoxTop').on('click', toggleTownships);
function toggleTownships() {
	let tStates = ["Connecticut", "Rhode Island", "Massachusetts", "Vermont", "New Hampshire"];
	var dE = $("#data");
	var status = dE.attr("data-township"), clickedState = dE.attr("data-stateclick"), contest = dE.attr("button-contest");

	if(tStates.includes(clickedState)) {
		if(status == "show") {
			dE.attr("data-township", "hide");
			d3.selectAll(".township")
				.lower().attr("visibility", "hidden")
				.style("display", "none")
				.attr("pointer-events", "none");
			d3.selectAll(".county").raise();
			d3.select("[id='" + clickedState + "']").raise();
			refreshLabelsPath();
		} else {
			dE.attr("data-township", "show");
			d3.selectAll('.township')
				.attr("visibility", "visible").attr("pointer-events", "painted")
				.style('display', 'initial').raise();
			d3.selectAll('.state').raise();
			d3.select("[id='" + clickedState + "']").raise()
			refreshLabelsPath();
		}
	} else if (['Maine','Nebraska'].includes(clickedState)){
		var yrShort = dE.attr("button-year").slice(-2).toString();
		if(dE.attr("data-presidenttownship") == "show") {
			dE.attr("data-presidenttownship", "hide")
			d3.selectAll(`.cd${yrShort}[data-state="${clickedState}"]`)
				.lower()
				.style("display", "none")
				.classed("selectedState",false)
				.classed("notSelectedState",false)
				.classed("selectedCounty", false);
			d3.selectAll(`.county[data-state="${clickedState}"]`).raise();
			d3.select("[id='" + clickedState + "']").raise();
			setResultsBoxTopTextState(clickedState, false);
			refreshLabelsPath();
		} else {
			dE.attr("data-presidenttownship", "show")
			d3.selectAll(`.cd${yrShort}[data-state="${clickedState}"]`)
				.style("display", "initial").raise()
				.classed("selectedState",false)
				.classed("notSelectedState",false)
				.classed("selectedCounty", false);
			setResultsBoxTopTextState(clickedState, true);
			d3.select("[id='" + clickedState + "']").classed("selectedState", true).raise();
			refreshFillCD();
			refreshLabelsPath();
		}
	}
}


function toggleTownshipsAlt(){
	var tStates = ['Connecticut','Rhode Island','Massachusetts','Vermont','New Hampshire'];
	var dE = $("#data"), currentStatus = dE.attr("data-township"), clickedState = dE.attr("data-stateclick");
	var currentStatus = d3.select("#data").attr("data-township");
	if(tStates.includes(clickedState)){
		if(currentStatus == "show"){
			dE.attr("data-township","hide");
			d3.selectAll(".township")
				.lower().attr("visibility","hidden")
				.style("display","none")
				.attr("pointer-events", "none");

			d3.selectAll(".county").raise();
			d3.select("[id='" + clickedState + "']").raise();
			refreshLabelsPath();
		} else {
			dE.attr("data-township","show");
			d3.selectAll('.township')
				.attr("visibility","visible").attr("pointer-events", "painted")
				.style('display', 'initial').raise();
			d3.selectAll('.state').raise();
			d3.select("[id='" + clickedState + "']").raise()
			refreshLabelsPath();
		}
	}
}

function showTownships(){
	$("#data").attr("data-township","show");
	if($("#data").attr("button-county") !== "true"){
		var clickedState = $("#data").attr("data-stateclick");
		d3.selectAll('.township')
			.attr("visibility","visible").attr("pointer-events", "painted")
			.style('display', 'initial').raise();
		d3.selectAll('.state').raise();
		d3.select("[id='" + clickedState + "']").raise()
	}

	var lastClicked = $("#data").attr("last-clicked");
	d3.select("[id='" + lastClicked + "']").raise();
}

function hideTownships(){
	$("#data").attr("data-township","hide");
	d3.selectAll(".township")
		.attr("visibility","hidden")
		.lower()
		.style("display","none")
		.attr("pointer-events", "none");

	var clickedState = $("#data").attr("data-stateclick");
	var lastClicked = $("#data").attr("last-clicked");

	d3.selectAll(".county").raise();
	d3.select("[id='" + clickedState + "']").raise();
	d3.select("[id='" + lastClicked + "']").raise();
}

function returnHome() {
	var dE = $("#data");
	dE.attr("drag-status", "false");
	var attributeState = dE.attr("data-level");
	var selectedYear = dE.attr("button-year");
	var selectedContest = dE.attr("button-contest");
	var countyStatus = dE.attr("button-county");
	var stateClick = dE.attr("data-stateclick");

	if(dE.attr("button-pollclosing") == "true"){
		colorPollClosingHour(findNextTime());
		setPollClosingHeadingText(findNextTime());
		$("#data")
			.attr("last-clicked", "United States")
			.attr("data-stateclick", "United States")
			.removeAttr("data-state data-stateabbreviation data-level");
		startTimestamps();
		return;
	} else if (dE.attr("button-graphics") == "true"){
		dE.attr("data-stateclick", "United States");
		d3.select("#appGraphics_bkgd").style('display','none');
		d3.select("#appGraphics_bkgd_gradient").style('display','none');
		d3.selectAll(".aG_imageBox, .aG_imageBorder").style('display','none');
		d3.selectAll("#appGraphics img").style('display','none');

		d3.select("#nationalMap").style('display','initial');
		d3.select("#appGraphics_heading").style('display','none');
		d3.select("#appGraphics_text").style('display','none');
		d3.select("#appGraphics_tetc_text").style('display','none');
		return;
	}

	if (dE.attr("button-voteview") == null){dE.attr("button-voteview", "vote")}
	if (dE.attr("button-houseCount") == null){dE.attr("button-houseCount", "lead")}
	if (dE.attr("button-houseGroups") == null){dE.attr("button-houseGroups", "true")}
	if (dE.attr("button-resultsTotalPanel") == null){dE.attr("button-resultsTotalPanel", "false")}
	if (dE.attr("button-county") == null) {dE.attr("button-county", "false")}
	if (dE.attr("data-aheadvalue") == null) {dE.attr("data-aheadvalue", "ahead")}

	if( dE.attr("button-houseCountOriginal") == null){dE.attr("button-houseCount", "lead")}

	if(dE.attr("data-presidenttownship") == "show"){
		d3.selectAll(`.cd[data-state="${stateClick}"]`).lower().style("display", "none");
		d3.selectAll(".county").raise();
		if(dE.attr("data-township") !== "hide"){d3.selectAll(".township").raise()}
		d3.select("[id='" + stateClick + "']").raise();
		setResultsBoxTopTextState(stateClick);

		$("#data")
			.attr("data-presidenttownship","hide")
			.attr("data-state", null)
			.attr("data-level", "state")
			.attr("drag-status", "false")
			.attr("last-clicked", stateClick);
		refreshLabelsPath();
		getResults();
		return;
	}

	if (dE.attr("button-road270") == "true"){
		resetBox(0.255,0.745,1250,0.95); return;
	}

	if ($("#statsBar, #filtersBar").hasClass('visible')) {
		hideStats(); return;
	}

	if (countyStatus == "true" && stateClick == "United States"){
		clickCounty(); return;
	}

	if (dE.attr("button-history") == "true"){
		hideHistory(); return;
	}

	if (dE.attr("status-filter") == "true" && stateClick == "United States"){
		removeFilters(); return;
	}

//	hideStats();

	if($("#data").attr("data-levelcd") == "atlarge"){
		var thisCountyState = "United States";
		var lastClicked = $("#data").attr("last-clicked");
	
		$("[id='" + lastClicked + "']").removeClass("selectedCounty");

		$("#data")
			.attr("last-clicked", "United States")
			.attr("data-stateclick", "United States")
			.removeAttr("data-state data-stateabbreviation data-level");

		refreshLabelsPath();

		$("#buttonHistory").css("display", "none");

		if (countyStatus !== "true") {d3.selectAll('.county .township').style("display", "none")}

		$(".state.selectedState").removeClass("selectedState");
		$('.notSelectedState').removeClass("notSelectedState");

		reset(1000);
		if($("#data").attr("button-resultsTotalPanel") !== "true"){
			hideResults();
		} else {
			document.getElementById("resultsBoxTopText").innerHTML = "";
			$("#resultsBoxHouse").removeClass("hidden");
			getResults();
		}
		clearPointLabels();
	} else {
		if (attributeState == "county") {
			var candidateLength = 2;
			var lastClicked = $("#data").attr("last-clicked");
			var thisCountyState = $("#data").attr("data-state");
			var stateAbbreviation = $("#data").attr("data-stateabbreviation");

			if(!selectedContest.includes("HOUSE")){
				setResultsBoxTopTextState(stateAbbreviation);
			} else {
				$(".votesBox").html("0")
			}

			$("#headingElectoralVotesNumber, #headingElectoralVotesText").css("display", "initial");
			d3.select("[id='" + lastClicked + "']").classed("selectedCounty", false).classed("selectedState", false);

			$("#data")
				.attr("data-state", null)
				.attr("data-level", "state")
				.attr("drag-status", "false")
				.attr("last-clicked", thisCountyState);

			zoomToState(stateClick, 750);

			if(selectedContest.includes("HOUSE") || selectedContest == "PRESIDENT BY CD"){
				if(selectedContest == "HOUSE"){$("#resultsBoxHouse").removeClass("hidden")}

				$("#buttonHistory").css("display", "none")
				var yrShort = selectedYear.slice(-2).toString();
				highlightStateDistrict(yrShort, stateClick);
			}

			d3.select("[id='" + stateClick + "']").classed("selectedState", true).raise();
			if($("#data").attr("data-bubbles") == "show"){d3.select('.bubble').raise()}
			getResults();
			refreshLabelsPath();
		} else {
			$("#data").attr("last-clicked", "United States");
			var dataResults = data_president['United States'];

			if($("#data").attr("button-resultsTotalPanel") == "true"){
				if(selectedContest == "HOUSE"){
					if(mapSettings['filters'] !== ""){calculateHouseTallies()}
				}

				if(selectedContest == "PRESIDENT"){
					if($("#data").attr("button-resultsVoteType") == "false"){showVoteType(true)}
				}

				getResults();
				document.getElementById("resultsBoxTopText").innerHTML = "";
			} else {
				hideResults();
			}

			let data = $("#data");

			setElectoralVoteText("United States");

			if(selectedContest !== "HOUSE" && selectedContest !== "PRESIDENT BY CD"){
				$("#resultsBoxHouse").addClass("hidden")
				$(".state").removeClass("notSelectedState");
			}

			if(countyStatus !== "true"){
				$(".county, .township").css("display", "none");
			}

			$(".state.selectedState").removeClass("selectedState");
			$(".hd.selectedState").removeClass("selectedCounty");
			$(".notSelectedState").removeClass("notSelectedState");

			d3.select("#pathDrawn").raise();
			if(stateClick){d3.select("[id='" + stateClick + "']").lower()}

			$("#data")
				.removeAttr("data-state data-stateabbreviation data-level")
				.attr("data-stateclick", "United States");

			reset(1000);
			getYearsContest();
			clearPointLabels();
			if($("#data").attr("data-bubbles") == "show"){
				d3.selectAll('.countyBubble').style('display','none')
			}
		}
	}

	if(thisCountyState) {
		document.getElementById("headingTextTitle").innerHTML = thisCountyState;
		scaleHeadingText();
	}

	$("#data").attr("data-levelcd", null)

	if($("#data").attr("last-clicked") == "United States"){
		if(selectedContest !== "HOUSE") {
			$("#data").attr("button-contest-suffix", null)
			updateContestText();
		}
	}
}

function highlightStateDistrict(a, b, c){
	var c = c || "cd";
	$(`.${c}${a}`).removeClass("notSelectedState");
	$(`.${c}${a}:not([data-state="${b}"])`).addClass("notSelectedState");
}

function setResultsBoxTopTextState(a, cd){
	let o, eN = document.getElementById("resultsBoxTopText");
	if (a == null){eN.innerHTML = ""; return};
	if(cd){
		o = a + ' BY CD'
	} else {
		if (a.length > 3){a = stateAbbreviation[a]}
		o = a + ' STATEWIDE'
		if (a == "DC") {o = 'WASHINGTON, D.C.'}
	}

	eN.innerHTML = o;

	let s = Math.min((document.body.clientWidth * 0.25)/eN.clientWidth, 1);
	eN.style.transform = `scaleX(${s})`
}

function setInnerHTML(i, a){document.getElementById(i).innerHTML = a}
function clearInnerHTML(i){document.getElementById(i).innerHTML = ""}

function updateHistory(){
	var d = year = $("#data").attr("button-year"), contest = $("#data").attr("button-contest");
	if (year !== "2024" && contest !== "PRESIDENT") {
		if (year % 4 == 0 && contest !== "PRESIDENT") {year = +year + 1}
	}

	if (year % 4 !== 0) {year = Math.ceil(year / 4) * 4}

	var a = year-4, b = year - 8, c = year - 12, d = year - 16;

	setHistoryResultsYear(a.toString(), "One"); setHistoryResultsYear(b.toString(), "Two");
	setHistoryResultsYear(c.toString(), "Three"); setHistoryResultsYear(d.toString(), "Four");
}

function setHistoryResultsYear(year, slot){
	var r = getHistoryResultsYear(year, slot);
	if(r == undefined){
		$("#historyPanel" + slot + " span").html("");
		$('#historyPanel'+slot).css("display","none"); return;
	};

	var tP = 'historyPanel' + slot, tPC = tP + "Cand";
	setInnerHTML(tP + 'Year', year);
	setInnerHTML(tP + 'Contest', r.margin); setInnerHTML(tP + 'Total', numF.format(r.totalVotes));

	setInnerHTML(tPC + '1Name', r.name1); setInnerHTML(tPC + '2Name', r.name2); setInnerHTML(tPC + '3Name', r.name3);

	setInnerHTML(tPC + '1Perc', r.perc1 + "<a1p>%</a1p>");
	setInnerHTML(tPC + '2Perc', r.perc2 + "<a1p>%</a1p>");
	setInnerHTML(tPC + '3Perc', r.perc3 + "<a1p>%</a1p>");

	setInnerHTML(tPC + '1Vote', numF.format(r.vote1));
	setInnerHTML(tPC + '2Vote', numF.format(r.vote2));
	setInnerHTML(tPC + '3Vote', numF.format(r.vote3));

	scaleText(tPC + '1Name', 0.12, 0.75); scaleText(tPC + '2Name', 0.12, 0.75); scaleText(tPC + '3Name', 0.12, 0.75);

	colorHistoryPanel(slot, r.party1, r.party2, r.party3, r.margin);
}

function getHistoryResultsYear(year, slot){
	var d = $("#data");
	var clickedYear = d.attr("button-year"), lastClicked = d.attr("last-clicked"), contest = d.attr("button-contest");

	var yearS = year.toString(); var sYear = yearS.slice(-2);

	if(contest == "HOUSE"){if(typeof data_pres_cd[clickedYear] !== 'undefined'){var results = data_pres_cd[clickedYear][lastClicked]} else {hideHistory(); return}} else {var results = data_president[lastClicked]}

	if (typeof results == 'undefined') {
		document.getElementById('historyPanel' + slot).style.display = "none"; return;
	}

	if(results[sYear] == undefined){historyPanelDisplay = "none"} else {historyPanelDisplay = "initial"}
	d3.select('#historyPanel' + slot).style('display', historyPanelDisplay);
	if(results[sYear] == undefined){return;}
	if(results[sYear].t == undefined){var historyPanelVoteDisplay = "none"} else {var historyPanelVoteDisplay = "initial"}	
	d3.select('#historyPanel' + slot + 'Total').style('display', historyPanelVoteDisplay);
	d3.select('#historyPanel' + slot + 'Cand1Vote').style('display', historyPanelVoteDisplay);
	d3.select('#historyPanel' + slot + 'Cand2Vote').style('display', historyPanelVoteDisplay);
	d3.select('#historyPanel' + slot + 'Cand3Vote').style('display', historyPanelVoteDisplay);

	if (results[sYear].v.r == undefined){document.getElementById('historyPanel' + slot).style.display = "none"}
	if (results[sYear].t !== undefined || results[sYear].t < 0){var totalVotes = results[sYear].t} else {var totalVotes = 100}
	var dVotes = results[sYear].v.d, rVotes = results[sYear].v.r, gwVotes = results[sYear].v.gw;

	let candidateVote = results[sYear]['v'];

	for (let a in candidateVote) {if(candidateVote[a] === undefined) {delete candidateVote[a]}}

	const cand = Object.keys(candidateVote).sort(function(a, b) {return candidateVote[b] - candidateVote[a]});
	const vote = Object.values(candidateVote).sort((a, b) => b - a);
	
	var name1 = presCand[year][cand[0]][1]; var name2 = presCand[year][cand[1]][1];
	var votes1 = vote[0]; var votes2 = vote[1]; var otherVote = totalVotes - vote[0] - vote[1];

	if(vote[2] > otherVote-vote[2]){
		var votes3 = vote[2], name3 = presCand[year][cand[2]][1], party3 = cand[2];
	} else {
		var name3 = "Others", votes3 = otherVote, party3 = "o";
	};

	var dP = 1;
//	if(votes1 % 1 == 0 && votes2 % 1 == 0){dP = 0}

	var perc1 = (votes1 / totalVotes * 100).toFixed(dP);
	var perc2 = (votes2 / totalVotes * 100).toFixed(dP);
	var perc3 = (votes3 / totalVotes * 100).toFixed(dP);
	var margin = ((votes1 - votes2) / totalVotes * 100).toFixed(dP);

	if(totalVotes == 0){perc1=perc2=perc3=0}

	if(margin < 1){var margin = ((votes1 - votes2) / totalVotes * 100).toPrecision(2)}
	if(margin < 0.05){var margin = ((votes1 - votes2) / totalVotes * 100).toPrecision(1)}
	if(isNaN(margin) == true){var margin = "--"} else if(margin == 0){var margin = "EVEN"} else {var margin = cand[0] + "+ " + margin}
	
	return {"margin": margin,"totalVotes":totalVotes,"party1":cand[0],"party2":cand[1],"party3": party3,"name1":name1,"perc1":perc1,"vote1":votes1,"name2":name2,"perc2":perc2,"vote2":votes2,"name3":name3,"perc3":perc3,"vote3":votes3};
}

function prevYear(year, ago){return (year - 4 *ago).toString().slice(-2)}

function colorHistoryPanel(slot, party1, party2, party3, margin) {
	const colors = {"d":"rgb(10,65,125)","r":"rgb(129,10,20)","l":"rgb(179,125,0)","em":"rgb(79,36,122)", "o":"rgb(45,45,45)","i":"rgb(79,36,122)","rp":"rgb(79,36,122)","gw":"rgb(179,87,0)","u":"rgb(179,125,0)","g":"rgb(46,83,7)"};

	var mC, tP = '#historyPanel' + slot;
	if(margin == "EVEN"){mC = "rgb(45,45,45)"} else {mC = colors[party1]}

	d3.select(tP + 'Contest').style("color",mC);
	d3.selectAll(tP +"Cand1 span").style("color",colors[party1]);
	d3.selectAll(tP +"Cand2 span").style("color",colors[party2]);

	if(party3 !== undefined){
		d3.selectAll(tP +"Cand3 span").style("color",colors[party3]);
	} else {
		d3.selectAll(tP +"Cand3 span").style("color",colors.o);
	}
}

const previousYears = {"24":"20","20":"16","16":"12","12":"08","08":"04","04":"00","00":"96","96":"92","92":"88","88":"84","84":"80","80":"76","76":"72","72":"68","68":"64","64":"60","60":"56","56":"52","52":"48","48":"44","44":"40"}

const genPartyName = {"d":"Democratic<br>Candidate","d1":"Democratic<br>Candidate","d2":"Democratic<br>Candidate","r":"Republican<br>Candidate","r1":"Republican<br>Candidate","r2":"Republican<br>Candidate","i":"Other","g":"green","l":"Libertarian"};

var presCand = {
	"1920": {
		"d": ["James", "Cox"],
		"r": ["Warren", "Harding"]
	},
	"1924": {
		"d": ["John", "Davis"],
		"r": ["Calvin", "Coolidge"]
	},
	"1928": {
		"d": ["Al", "Smith"],
		"r": ["Herbert", "Hoover"]
	},
	"1932": {
		"d": ["Franklin", "Roosevelt"],
		"r": ["Herbert", "Hoover"]
	},
	"1936": {
		"d": ["Franklin", "Roosevelt"],
		"r": ["Alf", "Landon"]
	},
	"1940": {
		"d": ["Franklin", "Roosevelt"],
		"r": ["Wendell", "Willkie"]
	},
	"1944": {
		"d": ["Franklin", "Roosevelt"],
		"r": ["Thomas", "Dewey"],
		"u": ["Unpledged", "Electors"]
	},
	"1948": {
		"d": ["Harry", "Truman"],
		"r": ["Thomas", "Dewey"],
		"u": ["Strom", "Thurmond"]
	},
	"1952": {
		"d": ["Adlai", "Stevenson"],
		"r": ["Dwight", "Eisenhower"],
		"u": ["Unpledged", "Democratic Electors"]
	},
	"1956": {
		"d": ["Adlai", "Stevenson"],
		"r": ["Dwight", "Eisenhower"],
		"u": ["Unpledged", "Democratic Electors"]
	},
	"1960": {
		"d": ["John", "Kennedy"],
		"r": ["Richard", "Nixon"],
		"u": ["Unpledged", "Democratic Electors"]
	},
	"1964": {
		"d": ["Lyndon", "Johnson"],
		"r": ["Barry", "Goldwater"],
		"u": ["Unpledged", "Democratic Electors"]
	},
	"1968": {
		"d": ["Hubert", "Humphrey"],
		"r": ["Richard", "Nixon"],
		"gw": ["George", "Wallace"]
	},
	"1972": {
		"d": ["George", "McGovern"],
		"r": ["Richard", "Nixon"]
	},
	"1976": {
		"d": ["Jimmy", "Carter"],
		"r": ["Gerald", "Ford"]
	},
	"1980": {
		"d": ["Jimmy", "Carter"],
		"r": ["Ronald", "Reagan"]
	},
	"1984": {
		"d": ["Walter", "Mondale"],
		"r": ["Ronald", "Reagan"]
	},
	"1988": {
		"d": ["Michael", "Dukakis"],
		"r": ["George H.W.", "Bush"]
	},
	"1992": {
		"d": ["Bill", "Clinton"],
		"r": ["George H.W.", "Bush"],
		"rp": ["Ross", "Perot"]
	},
	"1996": {
		"d": ["Bill", "Clinton"],
		"r": ["Bob", "Dole"],
		"rp": ["Ross", "Perot"]
	},
	"2000": {
		"d": ["Al", "Gore"],
		"r": ["George", "Bush"],
		"g": ["Ralph", "Nader"]
	},
	"2004": {
		"d": ["John", "Kerry"],
		"r": ["George", "Bush"]
	},
	"2008": {
		"d": ["Barack", "Obama"],
		"r": ["John", "McCain"]
	},
	"2012": {
		"d": ["Barack", "Obama"],
		"r": ["Mitt", "Romney"]
	},
	"2016": {
		"d": ["Hillary", "Clinton"],
		"r": ["Donald", "Trump"],
		"g": ["Jill", "Stein"],
		"l": ["Gary", "Johnson"],
		"em": ["Evan", "McMullin"]
	},
	"2020": {
		"d": ["Joe", "Biden"],
		"r": ["Donald", "Trump"],
		"g": ["Howie", "Hawkins"],
		"l": ["Jo", "Jorgensen"]
	},
	"2024": {
		"d": ["Democratic", "Candidate"],
		"r": ["Republican", "Candidate"],
		"g": ["", "Greens Candidate"],
		"l": ["", "Libertarian Candidate"]
	},
	"2028": {
		"d": ["", "Democrat"],
		"r": ["", "Republican"]
	}
};

var presCandidatesAlt = {"2024":{"dFirstName":"Joe","dSurname":"Biden","rFirstName":"Donald","rSurname":"Trump"},"2020":{"dFirstName":"Joe","dSurname":"Biden","rFirstName":"Donald","rSurname":"Trump","lFirstName":"Jo","lSurname":"Jorgensen","gFirstName":"Howie","gSurname":"Hawkins"},"2016":{"dFirstName":"Hillary","dSurname":"Clinton","rFirstName":"Donald","rSurname":"Trump","lFirstName":"Gary","lSurname":"Johnson","emFirstName":"Evan","emSurname":"McMullin","gFirstName":"Jill","gSurname":"Stein"},"2012":{"dFirstName":"Barack","dSurname":"Obama","rFirstName":"Mitt","rSurname":"Romney"},"2008":{"dFirstName":"Barack","dSurname":"Obama","rFirstName":"John","rSurname":"McCain"},"2004":{"dFirstName":"John","dSurname":"Kerry","rFirstName":"George","rSurname":"Bush"},"2000":{"dFirstName":"Al","dSurname":"Gore","rFirstName":"George","rSurname":"Bush","gFirstName":"Ralph","gSurname":"Nader"},"1996":{"dFirstName":"Bill","dSurname":"Clinton","rFirstName":"Bob","rSurname":"Dole","rpFirstName":"Ross","rpSurname":"Perot"},"1992":{"dFirstName":"Bill","dSurname":"Clinton","rFirstName":"George H.W.","rSurname":"Bush","rpFirstName":"Ross","rpSurname":"Perot"},"1988":{"dFirstName":"Michael","dSurname":"Dukakis","rFirstName":"George H.W.","rSurname":"Bush"},"1984":{"dFirstName":"Walter","dSurname":"Mondale","rFirstName":"Ronald","rSurname":"Reagan"},"1980":{"dFirstName":"Jimmy","dSurname":"Carter","rFirstName":"Ronald","rSurname":"Reagan"},"1976":{"dFirstName":"Jimmy","dSurname":"Carter","rFirstName":"Gerald","rSurname":"Ford"},"1972":{"dFirstName":"George","dSurname":"McGovern","rFirstName":"Richard","rSurname":"Nixon"},"1968":{"dFirstName":"Hubert","dSurname":"Humphrey","gwFirstName":"George","gwSurname":"Wallace","rFirstName":"Richard","rSurname":"Nixon"},"1964":{"dFirstName":"Lyndon","dSurname":"Johnson","rFirstName":"Barry","rSurname":"Goldwater","uFirstName":"Unpledged","uSurname":"Democratic Electors"},"1960":{"dFirstName":"John","dSurname":"Kennedy","rFirstName":"Richard","rSurname":"Nixon","uFirstName":"Unpledged","uSurname":"Democratic Electors"},"1956":{"dFirstName":"Adlai","dSurname":"Stevenson","rFirstName":"Dwight","rSurname":"Eisenhower","uFirstName":"Unpledged","uSurname":"Democratic Electors"},"1952":{"dFirstName":"Adlai","dSurname":"Stevenson","rFirstName":"Dwight","rSurname":"Eisenhower","uFirstName":"Unpledged","uSurname":"Democratic Electors"},"1948":{"dFirstName":"Harry","dSurname":"Truman","rFirstName":"Thomas","rSurname":"Dewey","uFirstName":"Strom","uSurname":"Thurmond"},"1944":{"dFirstName":"Franklin","dSurname":"Roosevelt","rFirstName":"Thomas","rSurname":"Dewey","uFirstName":"Unpledged","uSurname":"Electors"},"1940":{"dFirstName":"Franklin","dSurname":"Roosevelt","rFirstName":"Wendell","rSurname":"Willkie"},"1936":{"dFirstName":"Franklin","dSurname":"Roosevelt","rFirstName":"Alf","rSurname":"Landon"},"1932":{"dFirstName":"Franklin","dSurname":"Roosevelt","rFirstName":"Herbert","rSurname":"Hoover"},"1928":{"dFirstName":"Al","dSurname":"Smith","rFirstName":"Herbert","rSurname":"Hoover"},"1924":{"dFirstName":"John","dSurname":"Davis","rFirstName":"Calvin","rSurname":"Coolidge"},"1920":{"dFirstName":"James","dSurname":"Cox","rFirstName":"Warren","rSurname":"Harding"}};

d3.selectAll('[id^="buttonContest"]').on('click', clickButtonContest);
d3.select('#buttonPrev').on('click', clickButtonPrevNext);
d3.select('#buttonNext').on('click', clickButtonPrevNext);
d3.select('#buttonHistory').on('click', clickHistory);
d3.select('#buttonCounty').on('click', clickCounty);
d3.select('#buttonRoad270').on('click', click270);
d3.select('#buttonPollClosing').on('click', clickPollClosing);
d3.select('#buttonSenateWhatIf').on('click', clickSenateWhatIf);
d3.select('#buttonProjections').on('click', clickPresidentProjections);
d3.select('#buttonGraphics').on('click', clickGraphics);

function clickButtonPrevNext() {
	var thisID = this.getAttribute('id'); var clickedButtonID = document.getElementById(thisID).innerHTML;

	var currentYear = +$("#data").attr("button-year"), selectedContest = $("#data").attr("button-contest");

	var increments = {"PRESIDENT":4,"SENATE":6,"GOVERNOR":4,"HOUSE":2}; var step = increments[selectedContest];

	if(clickedButtonID == "PREV"){var newYear = currentYear - step};
	if(clickedButtonID == "NEXT"){var newYear = currentYear + step};

	selectButtonYear(newYear);
}

function selectButtonYear(inputYear) {
	$("#data").attr("button-year", inputYear);
	$('[id^="buttonYear"]').removeClass('buttonSelected');

	$('#buttonYear' + inputYear)[0].scrollIntoViewIfNeeded();
	$('#buttonYear' + inputYear).addClass('buttonSelected');

	updateContestText();
	getResults();
	refreshFill();
	updateTicketSplitButtons();

	if($("#data").attr("button-history") == "true") {updateHistory()}
}

function updateTicketSplitButtons(){
	var year = $("#data").attr("button-year");
	if (year % 4 == 0) {
		var pY = (+year - 4).toString()
	} else {
		var pY = (Math.floor(year / 4) * 4).toString()
	}

	$("#buttonPresDem").text(presCand[pY]['d'][1] + " WIN IN " + pY || "DEM PRESIDENT")
	$("#buttonPresGop").text(presCand[pY]['r'][1] + " WIN IN " + pY || "GOP PRESIDENT")

	$("#buttonPresDem").text(presCand[pY]['d'][1] + " WIN IN " + pY || "DEM PRESIDENT")
	$("#buttonPresGop").text(presCand[pY]['r'][1] + " WIN IN " + pY || "GOP PRESIDENT")

	filterDesc["presDem"] = presCand[pY]['d'][1] + " WIN IN " + pY;
	filterDesc["presGop"] = presCand[pY]['r'][1] + " WIN IN " + pY;

	$("#buttonPresDGop").text(presCand[pY]['d'][1] + " - GOP" || "PRES D - GOP")
	$("#buttonPresRDem").text(presCand[pY]['r'][1] + " - DEM" || "PRES R - DEM")
}

	var townshipContests = ["SENATE", "GOVERNOR", "SENATE SPECIAL", "SENATE RUNOFF", "SENATE SPECIAL RUNOFF", "DEM PRESIDENT", "GOP PRESIDENT", "SECRETARY OF STATE", "GOVERNOR RECALL", "LIEUTENANT GOVERNOR", "ATTORNEY GENERAL", "SUPREME COURT JUSTICE", "SUPERIOR COURT", "SENATE DEM", "SENATE REP", "GOVERNOR DEM", "GOVERNOR REP", "HOUSE", "D-HOUSE", "SECRETARY OF STATE DEM", "SECRETARY OF STATE REP", "PRESIDENT BY CD", "BALLOT MEASURE", "SECRETARY OF STATE REP", "SECRETARY OF STATE DEM", "ATTORNEY GENERAL", "LIEUTENANT GOVERNOR DEM", "LIEUTENANT GOVERNOR REP", "GOP PRESIDENT", "DEM PRESIDENT"];

	var primaryContests = ["DEM PRESIDENT", "GOP PRESIDENT", "SENATE DEM", "SENATE REP", "GOVERNOR DEM", "GOVERNOR REP", "R-HOUSE", "D-HOUSE", "SECRETARY OF STATE DEM", "SECRETARY OF STATE REP", "LIEUTENANT GOVERNOR DEM", "LIEUTENANT GOVERNOR REP"];

function clickButtonYear() {
	var thisID = this.getAttribute('id');
	var clickedButtonID = document.getElementById(thisID).innerHTML;

	var selectedContest = $("#data").attr("button-contest");
	var selectedYear = $("#data").attr("button-year");
	var clicked = $("#data").attr("last-clicked");
	var stateClicked = $("#data").attr("data-stateclick");

	$("#data").attr("button-year", clickedButtonID);
	$('[id^="buttonYear"]').removeClass('buttonSelected', false);

	$("#" + thisID).attr("class", "yearButton controlButton buttonSelected");

	var yrShort = $("#data").attr("button-year").slice(-2).toString();
	if($("#data").attr("data-presidenttownship") !== "show"){
		var otherYearDistricts = d3.selectAll(`.cd:not(.cd${yrShort})`);
		otherYearDistricts.each(function() {
			const district = d3.select(this).attr("data-district");
			d3.select(this).attr("id", `${yrShort}_${district}`).style("display", "none");
		});
	} else {
		refreshFillCD();
		d3.selectAll(`.cd${yrShort}[data-state="${stateClicked}"]`)
			.style("display", "initial").raise()
			.classed("selectedState",false)
			.classed("notSelectedState",false)
			.classed("selectedCounty", false);
		// setResultsBoxTopTextState(stateClicked, true);
		d3.select("[id='" + stateClicked + "']").classed("selectedState", true).raise();
	//	d3.select("[id='" + $("#data").attr("last-clicked") + "']").raise();
		refreshLabelsPath();
	}

	updateButtons();

	if(clickedButtonID < 1960) {
		$("#Alaska, #Hawaii").css("display", "none")
		document.getElementById("District of Columbia").style.display = "none";
	} else {
		let dcShow;
		if(clickedButtonID < 1964) {dcShow = "none"} else {dcShow = "initial"}
		document.getElementById("District of Columbia").style.display = dcShow;
		$("#Alaska, #Hawaii").css("display", "initial")
	}

	if(selectedContest == "PRESIDENT") {
		if($("#data").attr("data-presidenttownship") !== "show"){
			if(clickedButtonID >= 2000) {
				showTownships()
			} else {
				hideTownships()
			}
		}
	} else if(selectedContest == "GOP PRESIDENT" || selectedContest == "DEM PRESIDENT") {
			showTownships()
	} else if(townshipContests.includes(selectedContest)) {
		if(clickedButtonID >= 2016) {showTownships()} else {hideTownships()}
	}

	if(clickedButtonID == "2024"){
		$("#filterButtonPickupOpp").css("display","flex");
	} else {
		if(mapSettings['stats'] == "reporting"){mapSettings['stats'] = ""}
		$("#filterButtonPickupOpp").css("display","none");
	}

	if(selectedContest == "HOUSE" && clickedButtonID == "2024"){
		d3.select("#buttonHouseGroups").style("display","flex");
		if($("#data").attr("button-houseGroups") == "true"){
			showHouseGroups();
		}

		if(clicked == "United States"){reset(500)} else if(stateClicked !== null && stateClicked !== "United States"){zoomToState(stateClicked,500)}
	} else {
		if(d3.select("#resultsHouseGroups").classed("visible")){
			if(clicked == "United States"){reset(500)} else if(stateClicked !== null){zoomToState(stateClicked,500)}
			hideHouseGroups();
		}
		$("#buttonHouseGroups").css("display","none");
	}

	if(selectedContest == "HOUSE" || selectedContest == "D-HOUSE" || selectedContest == "R-HOUSE") {
		if(clickedButtonID !== "2024"){
			if(selectedYear == "2024"){
				$("#data").attr("button-houseCountOriginal", $("#data").attr("button-houseCount"));
			}
			$("#data").attr("button-houseCount", "called");
		} else {
			let orig = $("#data").attr("button-houseCountOriginal");
			if(orig){$("#data").attr("button-houseCount", orig)}
		}

		$('.cd.selectedCounty, .cd.selectedState, .cd.notSelectedCounty, .cd.notSelectedState')
			.removeClass('selectedCounty selectedState notSelectedCounty notSelectedState');

		if(clicked !== "United States"){
			$(".cd:not([data-state='" + stateClicked + "'])").addClass("notSelectedState");
		};

		d3.selectAll(`.cd.cd${yrShort}`)
			.raise()
			.attr("id", function() {return d3.select(this).attr("data-district"); })
			.style("display", "initial");

		d3.selectAll(".township, .county").lower().style("display", "none");
		d3.selectAll(".state").style("fill", "rgb(107, 112, 123)");

		if($("#data").attr("data-level") !== "county" && clicked.includes("-") == false) {
			$("#data").attr("data-stateclick", stateClicked);
		} else {
			var thisDistrictThisYear = document.querySelector(`[data-district="${clicked}"].cd.cd${yrShort}`);
			if(thisDistrictThisYear) {
				clickDistrictBox(clicked);
			} else {
				$("#data").attr("data-stateclick", stateClicked).attr("last-clicked", stateClicked);
				zoomToState(stateClicked, 750);
				clearInnerHTML('resultsBoxTopText');
				if(clicked.includes("-") == false) { d3.select("[id='" + stateClicked + "']").raise() }
			}
		}

		if(stateClicked && stateClicked !== "United States") {
			if(!clicked.includes("-")) { d3.select("[id='" + stateClicked + "']").raise() };
			// d3.selectAll(`.districtBox:not([data-district-state="${stateClicked}"])`).style("display", "none");
			// d3.selectAll(`.districtBox[data-district-state="${stateClicked}"]`).style("display", "initial");
		}

		refreshLabelsPath();
		generateDistrictBoxes();
	} else if(selectedContest == "STATE HOUSE"){
		$("#resultsBoxHouse").attr("class", "hidden");
		d3.select("#buttonHistory").style("display", "none");
		d3.select("#buttonCounty").style("display", "none");

		d3.selectAll('.hd.selectedState, .hd.notSelectedCounty, .hd.notSelectedState')
			.classed('selectedCounty', false).classed('selectedState', false)
			.classed('notSelectedCounty', false).classed('notSelectedState', false);

		if (clicked !== "United States") {
			$(".hd:not([data-state='" + stateClicked + "'])").addClass("notSelectedState")
		}

		if($("#data").attr("button-county") == "true"){clickCounty()};

		d3.selectAll(".township, .county").lower().style("display","none");
		d3.selectAll(".state").lower().style("fill","rgb(107, 112, 123");

		const dataLevel = $("#data").attr("data-level");
		if(dataLevel == "state" || dataLevel == "county"){d3.select("[id='" + stateClicked + "']").raise()}

		var yrShort = $("#data").attr("button-year").slice(-2).toString();
		d3.selectAll(`.hd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`hd${yrShort}`)) {
      					d3.select(this)
        					.attr("id", "HD-" + district)
        					.style("display", "initial")
        					.raise();
				} else {
      					d3.select(this)
        					.attr("id", yrShort + "_" + "HD-" + district)
        					.style("display", "none");
    				}
  		});

		refreshLabelsPath();

	} else if(selectedContest == "STATE SENATE"){
		d3.select("#resultsBoxHouse").classList = "hidden";
		d3.select("#buttonHistory").style("display", "none");
		d3.select("#buttonCounty").style("display", "none");

		d3.selectAll('.sd.selectedState, .sd.notSelectedCounty, .sd.notSelectedState')
			.classed('selectedCounty', false).classed('selectedState', false)
			.classed('notSelectedCounty', false).classed('notSelectedState', false);

		if (clicked !== "United States") {
			d3.selectAll(`.sd:not([data-state="${stateClicked}"])`).classed("notSelectedState", true)
		}

		if($("#data").attr("button-county") == "true"){clickCounty()};

		d3.selectAll(".township, .county").lower().style("display","none");
		d3.selectAll(".state").lower().style("fill","rgb(107, 112, 123");

		const dataLevel = $("#data").attr("data-level");
		if(dataLevel == "state" || dataLevel == "county"){d3.select("[id='" + stateClicked + "']").raise()}

		var yrShort = $("#data").attr("button-year").slice(-2).toString();
		d3.selectAll(`.sd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`sd${yrShort}`)) {
      					d3.select(this)
        					.attr("id", "SD-" + district)
        					.style("display", "initial")
        					.raise();
				} else {
      					d3.select(this)
        					.attr("id", yrShort + "_" + "SD-" + district)
        					.style("display", "none");
    				}
  		});

		refreshLabelsPath();

	} else if(selectedContest == "PRESIDENT BY CD") {
		$("resultsBoxHouse").addClass('hidden');

		if(data_pres_cd[clickedButtonID] == undefined) {
			hideHistory();
			document.getElementById("buttonHistory").style.display = "none"
		} else { document.getElementById("buttonHistory").style.display = "initial" }

		$('.cd.selectedCounty, .cd.selectedState, .cd.notSelectedCounty, .cd.notSelectedState')
			.removeClass('selectedCounty selectedState notSelectedCounty notSelectedState');

		if(clicked !== "United States") {
			var otherStateCD = document.querySelectorAll(`.cd:not([data-state="${stateClicked}"])`);
			for(let i = 0; i < otherStateCD.length; i++) { otherStateCD[i].classList.add("notSelectedState") }
		}

		d3.selectAll(`.cd.cd${yrShort}`)
			.attr("id", function() {return d3.select(this).attr("data-district"); })
			.raise()
			.style("display", "initial");

		if($("#data").attr("data-level") !== "county" && clicked.includes("-") == false) {
			$("#data").attr("data-stateclick", stateClicked);
		} else {
			var thisDistrictThisYear = document.querySelector(`[data-district="${clicked}"].cd.cd${yrShort}`);
			if(thisDistrictThisYear) {
				clickDistrictBox(clicked);
			} else {
				$("#data").attr("data-stateclick", stateClicked).attr("last-clicked", stateClicked);
				zoomToState(stateClicked, 750);
				clearInnerHTML('resultsBoxTopText');
				if(clicked.includes("-") == false) { d3.select("[id='" + stateClicked + "']").raise() }
			}
		}

		if(stateClicked && stateClicked !== "United States") {
			if(!clicked.includes("-")) { d3.select("[id='" + stateClicked + "']").raise() };
			d3.selectAll(`.districtBox:not([data-district-state="${stateClicked}"])`).style("display", "none");
			d3.selectAll(`.districtBox[data-district-state="${stateClicked}"]`).style("display", "initial");
		}

		refreshLabelsPath();
		generateDistrictBoxes();
	}

	if($("#data").attr("button-history") == "true") {updateHistory()}

	updateContestText();
	getResults();
	refreshFill();
	if($("#data").attr("data-presidenttownship") == "show"){
		refreshFillCD();
	}
	refreshLabelsPath();
}

function updateButtons(){
	var dE = $("#data"), year = dE.attr("button-year"), contest = dE.attr("button-contest");
	var clicked = dE.attr("last-clicked"), stateClicked = dE.attr("data-stateclick");

	updateTicketSplitButtons();

	if(contest == "PRESIDENT"){
		$("#buttonTotalPanel").css("display", "flex").text("EV PANEL");
		$("#buttonShowVoteType").css("display", "flex").text("ELCTRL");
		$("#buttonSwing").css("display", "flex").text("SWING");
		$("#buttonSwing8").css("display", "flex").text("SWING FROM " + (+year-8));
		$("#buttonSwing12").css("display", "flex").text("SWING FROM " + (+year-12));
		$("#buttonSwing16").css("display", "flex").text("SWING FROM " + (+year-16));

		filterDesc["gain"] = "FLIPS FROM " + (+year-4);
		statDesc["swing"] = "SWING FROM " + (+year-4);
		statDesc["swing8"] = "SWING FROM " + (+year-8);
		statDesc["swing12"]= "SWING FROM " + (+year-12);
		statDesc["swing16"] = "SWING FROM " + (+year-16);

		$("#filterButtonTicketSplit, #filterButtonSuperTuesday, #filterButtonUncontested").css("display","none");
		$("#filterButtonOpenSeat, #filterButtonKeyRace, #filterButtonGain").css("display", "flex");
		if(mapSettings['filters'] == "superTuesday"){mapSettings['filters'] = ""}
	} else if(contest == "DEM PRESIDENT" || contest == "GOP PRESIDENT") {
//		$("#buttonShowVoteType").css("display", "flex").text("DLGTE");
		$("#buttonShowVoteType").css("display", "none");
		$("#buttonSwing, #filterButtonGain, #buttonSwing8, #buttonSwing12, #buttonSwing16").css("display", "none");
		$("#filterButtonOpenSeat, #filterButtonTicketSplit, #filterButtonKeyRace, #buttonTotalPanel, #filterButtonGain, #filterButtonUncontested")
			.css("display", "none");
		if(mapSettings['filters'] == "keyRace"){mapSettings['filters'] = ""}

		if(year == 2024) {
			$("#filterButtonSuperTuesday").css("display","flex");
		} else {
			$("#filterButtonSuperTuesday").css("display","none");
			if(mapSettings['filters'] == "superTuesday"){mapSettings['filters'] = ""}
		}
	} else {
		if(contest == "HOUSE"){
			$("#filterButtonOpenSeat").css("display","flex");
			$("#buttonTotalPanel").css("display", "flex").text("TL PANEL");
		} else if (year < 2018){
			$("#filterButtonOpenSeat").css("display","none")
		}

		$("#filterButtonSuperTuesday").css("display","none");
		if(mapSettings['filters'] == "superTuesday"){mapSettings['filters'] = ""}
		$("#buttonShowVoteType").css("display", "none")
		$("#buttonSwing").css("display", "flex").text("VS. PRESIDENT");

		if (year % 4 !== 0) {
			var yearPres = (Math.floor(year / 4) * 4);
		}

		statDesc["swing"] = "SWING FROM " + (yearPres || year) + " PRESIDENTIAL RACE";
		filterDesc["gain"] = "PICKUPS";
		$("#buttonSwing8, #buttonSwing12, #buttonSwing16").css("display", "none")
		$("#filterButtonTicketSplit, #filterButtonUncontested, #filterButtonKeyRace, #filterButtonGain")
			.css("display", "flex");
	}

	if(year == "2024"){
		$("#buttonReporting").css("display","flex");
		if(!contest.includes("PRES")) {
			$("#filterButtonPickupOpp").css("display","flex");
		} else {
			$("#filterButtonPickupOpp").css("display","none");
		}
	} else {
		$("#buttonReporting").css("display","none");
		$("#filterButtonPickupOpp").css("display","none");
	}

	if(contest == "HOUSE" || contest == "D-HOUSE" || contest == "R-HOUSE") {
		$("#resultsBoxHouse").removeClass('hidden');
		if(data_pres_cd[year] === undefined) {
			hideHistory();
			$("buttonHistory").css("display", "none");
		} else {
			$("buttonHistory").css("display", "intial")
		}
	}

	if(contest == "HOUSE" && year == "2024"){
		$("#buttonHouseGroups").css("display","flex");
		if($("#data").attr("button-houseGroups") == "true"){showHouseGroups()}
		$("#resultsBoxHouseHeading").css("display", "grid")
		if(clicked == "United States"){reset(500)} else if(stateClicked !== null){zoomToState(stateClicked,500)}
	} else {
		$("#resultsBoxHouseHeading").css("display", "none")
		if(d3.select("#resultsHouseGroups").classed("visible")){
			if(clicked == "United States"){reset(500)} else if(stateClicked !== null){zoomToState(stateClicked,500)}
			hideHouseGroups();
		}
		$("#buttonHouseGroups").css("display","none");
	}
	updateFilterButtonText();
}

function clickButtonContest() {
	var thisID = this.getAttribute('id'), clickedButtonID = document.getElementById(thisID).innerHTML;
	var headingText = document.getElementById('headingTextContest').innerHTML;

	var contestTypes = {"PRES":"PRESIDENT","SEN":"SENATE","GOV":"GOVERNOR","SEN S":"SENATE SPECIAL","SEN R":"SENATE RUNOFF","SEN SR":"SENATE SPECIAL RUNOFF","PRES-D":"DEM PRESIDENT","PRES-R":"GOP PRESIDENT","HOUSE":"HOUSE","SOS":"SECRETARY OF STATE","GOV RC":"GOVERNOR RECALL","LT GOV":"LIEUTENANT GOVERNOR","AG":"ATTORNEY GENERAL","SCJ":"SUPREME COURT JUSTICE","SC":"SUPERIOR COURT","SEN-D":"SENATE DEM","SEN-R":"SENATE REP","GOV-D":"GOVERNOR DEM","GOV-R":"GOVERNOR REP","HOUSE":"HOUSE","HOU-D":"D-HOUSE","HOU-R":"R-HOUSE","SOS-D":"SECRETARY OF STATE DEM","SOS-R":"SECRETARY OF STATE REP","P CD":"PRESIDENT BY CD","PROP":"BALLOT MEASURE","ABORT":"BALLOT MEASURE ABORTION","SOS-R":"SECRETARY OF STATE REP","SOS-D":"SECRETARY OF STATE DEM","AG":"ATTORNEY GENERAL","LT-D":"LIEUTENANT GOVERNOR DEM","LT-R":"LIEUTENANT GOVERNOR REP","ST HD":"STATE HOUSE","ST SD":"STATE SENATE"};

	var dE = $("#data");
	dE.attr("button-contest", contestTypes[clickedButtonID]);
	$("#resultsPollClosing").text("");
	
	var selectedYear = dE.attr("button-year"), stateClicked = dE.attr("data-stateclick");
	var clicked = dE.attr("last-clicked");
	var shortYear = selectedYear.toString().slice(-2);

	var townshipContests = ["SEN","GOV","SEN S","SEN R","SEN SR","PRES-D","PRES-R","SOS","GOV RC","LT GOV","AG","SCJ","SC","SEN-D","SEN-R","GOV-D","GOV-R","SOS-D","SOS-R","P CD","PROP","SOS-R","SOS-D","AG","LT-D","LT-R"];

	updateButtons();

	if(clickedButtonID == "PRES") {
		var previousYearPres = +selectedYear - 4, shortPreviousPresYear = previousYearPres.toString().slice(-2);
		reviveTotalPanel()

		if(selectedYear >= 2000) {showTownships()} else {hideTownships()}
	} else if(clickedButtonID == "PRES-D" || clickedButtonID == "PRES-R") {
		hideTotalPanel();
		showTownships();
	} else {
		hideVoteType(true);

		if(clickedButtonID == "HOUSE"){
			reviveTotalPanel();
			if(selectedYear !== "2024"){
				let orig = $("#data").attr("button-houseCountOriginal");
				if(orig){
					$("#data").attr("button-houseCount", orig)
				} else {
					$("#data").attr("button-houseCount", "lead")
				}
			}
		} else {
			$("#buttonTotalPanel").css("display", "none");
			hideTotalPanel();
		}

		if(townshipContests.includes(clickedButtonID)) {
			if(selectedYear > 2016) {showTownships()} else {hideTownships()}
		}
	}

	if(clickedButtonID !== "HOUSE"){$("#data").attr("data-levelcd", null)}
	
	if((clickedButtonID !== "ST HD" && clickedButtonID !== "HOUSE" && clickedButtonID !== "P CD") || (clickedButtonID !== "ST HD" && clickedButtonID !== "HOUSE" && headingText.endsWith("PRESIDENT BY CD"))){
		$("#resultsBoxHouse").attr("class", "hidden")
		document.getElementById("buttonHistory").style.display = "flex";
		document.getElementById("buttonCounty").style.display = "flex";

		$('.cd.selectedCounty, .cd.selectedState, .cd.notSelectedCounty, .cd.notSelectedState')
			.removeClass('selectedCounty selectedState notSelectedCounty notSelectedState');

		$(".cd, .sd, .hd").css("display", "none");
		$(".state").removeClass("selectedState");

		if(clicked !== "United States"){
			if($("#data").attr("data-stateclick") !== stateClicked){
				$("[id='" + clicked + "']").addClass("selectedCounty")
			}

			if($("#data").attr("data-level") !== "county" && clicked.includes("-") == false){
				$("#data").attr("last-clicked", stateClicked);
				$("[id='" + stateClicked + "']").addClass("selectedState")
				setResultsBoxTopTextState(stateClicked);
			}

			if($("#data").attr("data-level") == "county" && clicked.includes("-") == true){
				$("#data").attr("last-clicked", stateClicked).attr("data-level", "state");
				$("[id='" + stateClicked + "']").addClass("selectedState")
				setResultsBoxTopTextState(stateClicked);
			}

			if (headingText.endsWith("PRESIDENT BY CD") || headingText.endsWith("HOUSE")) {
				zoomToState(stateClicked, 750);
			}

			d3.selectAll('.county[data-state="' + stateClicked + '"]').style('display', 'initial').raise();
			if($("#data").attr("data-township") !== "hide"){
				d3.selectAll('.township[data-state="' + stateClicked + '"]').style('display', 'initial').raise();
			}

			if(!clickedButtonID.includes("PRES-")){
				$(".state").addClass("notSelectedState").css("display", "initial");
			} else {
				$(".state").removeClass("notSelectedState")
			}
			

			d3.select("[id='" + stateClicked + "']").classed("selectedState", true).raise();

			const dataTownship = $("#data").attr("data-township"), clickedElement = d3.select(`[id='${clicked}']`);

			if (dataTownship == "hide") {
				clickedElement.raise();
			} else if (!clickedElement.classed("township")) {
				clickedElement.lower();
			}

			if(stateClicked && stateClicked !== "United States"){
				if($("#data").attr("data-level") !== "county"){
					d3.select("[id='" + stateClicked + "']").raise();
				}
			}

			refreshLabelsPath();
		}
	}

	$('[id^="buttonContest"]').attr('class', "controlButton");
	document.getElementById(thisID).classList = "controlButton buttonSelected";

	if(clickedButtonID == "HOUSE" || clickedButtonID == "HOU-D" || clickedButtonID == "HOU-R"){

		if($("#data").attr("data-level") == "state"){
			let stateAbbr = $("#data").attr("data-stateabbreviation");
			if(stateAbbr){
				// console.log("ABCD");
				let cd = d3.select('.cd' + '[data-district="' + stateAbbr + "-01" + '"]');
				let cdAL = cd.attr("data-districtatlarge");
				if (cdAL == "true") {
					clicked = stateAbbr + "-01";
					// console.log("EFGH");
					$("#data")
						.attr("data-levelcd", "atlarge")
						.attr("last-clicked", clicked)
						.attr("data-level", "county");
				}
			}
		}

		generateDistrictBoxes();
		calculateHouseTallies();

		$("#resultsBoxHouse").removeClass('hidden');
		$("#buttonHistory, #buttonCounty").css("display", "none");

		if(!(headingText.endsWith("PRESIDENT BY CD"))) {
			$('.cd.selectedCounty, .cd.selectedState, .cd.notSelectedCounty, .cd.notSelectedState')
				.removeClass('selectedCounty selectedState notSelectedCounty notSelectedState');

			if(clicked !== "United States" && !headingText.endsWith("PRESIDENT BY CD")){
				$(".cd:not([data-state='" + stateClicked + "'])").addClass("notSelectedState");
			}
		}

		if($("#data").attr("button-county") == "true"){clickCounty()};

		if(clicked !== "United States" && !headingText.endsWith("PRESIDENT BY CD")){clearInnerHTML('resultsBoxTopText')}
		if(headingText.endsWith("PRESIDENT BY CD") && $("#data").attr("data-level") == "county"){
			$("#resultsBoxHouse").attr('class','hidden');
		};

		if (selectedYear % 2 !== 0) {
			let year = Math.floor(selectedYear / 2) * 2;
			$("#controlBarYear .controlButton").removeClass("buttonSelected");
			$('#buttonYear' + year).addClass("buttonSelected");
			$("#data").attr("button-year", year.toString());
			selectedYear = year;
		}

		var yrShort = shortYear;
		d3.selectAll('.cd')
  			.each(function() {
    				let district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`cd${yrShort}`)) {
      					d3.select(this)
        					.attr("id", district)
        					.style("display", "initial")
        					.raise();
				} else {
      					d3.select(this)
        					.attr("id", yrShort + "_" + district)
        					.style("display", "none");
    				}
  		});

		d3.selectAll(".county, .township").lower().style("display","none");
		d3.selectAll(".state").lower();

		const dataLevel = $("#data").attr("data-level");
		if(dataLevel == "state" || dataLevel == "county"){d3.select("[id='" + stateClicked + "']").raise().classed('selectedState', true)}

		if(!headingText.endsWith("PRESIDENT BY CD")){
			$("#data").attr("data-stateclick", stateClicked)
		}

		if(stateClicked && stateClicked !== "United States"){
			if(headingText.endsWith("PRESIDENT BY CD") && dataLevel !== "county"){
//				d3.select("[id='" + stateClicked + "']").raise();
				d3.selectAll(`.districtBox:not([data-district-state="${stateClicked}"])`).style("display", "none");
				d3.selectAll(`.districtBox[data-district-state="${stateClicked}"]`).style("display", "initial");
			}
		}

		if($("#data").attr("data-level") !== "county" && clicked.includes("-") == false) {
			$("#data").attr("data-stateclick", stateClicked);
		} else {
			var thisDistrictThisYear = document.querySelector(`[data-district="${clicked}"].cd.cd${yrShort}`);
			if(thisDistrictThisYear) {
				clickDistrictBox(clicked);
			} else {
				zoomToState(stateClicked, 750);
				$("#data").attr("data-stateclick", stateClicked).attr("last-clicked", stateClicked);
				$('#resultsBoxTopText').html("");
				if(clicked.includes("-") == false) { d3.select("[id='" + stateClicked + "']").raise() }
			}
		}


		refreshLabelsPath();

	} else if(clickedButtonID == "ST HD"){
		$("#resultsBoxHouse").attr("class", "hidden");

		document.getElementById("buttonHistory").style.display = "none";
		document.getElementById("buttonCounty").style.display = "none";

		$('.hd.selectedState, .hd.notSelectedCounty, .hd.notSelectedState')
			.removeClass("selectedCounty", "selectedState", "notSelectedCounty", "notSelectedState");

		if(clicked !== "United States"){
			$(`.hd:not([data-state="${stateClicked}"])`).addClass("notSelectedState");
		}

		var countyStatus = $("#data").attr("button-county"); if(countyStatus == "true"){clickCounty()};

		$(".cd").css("display", "none");
		d3.selectAll(".township").lower().style("display","none");
		d3.selectAll(".county").lower().style("display","none");
		d3.selectAll(".state").lower().style("fill","rgb(107, 112, 123");

		const dataLevel = $("#data").attr("data-level");
		if(dataLevel == "state" || dataLevel == "county"){d3.select("[id='" + stateClicked + "']").raise()}

		var yrShort = $("#data").attr("button-year").slice(-2).toString();
		d3.selectAll(`.hd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`hd${yrShort}`)) {
      					d3.select(this)
        					.attr("id", district)
        					.style("display", "initial")
        					.raise();
				} else {
      					d3.select(this)
        					.attr("id", yrShort + "_" + district)
        					.style("display", "none");
    				}
  		});

		d3.selectAll(`.sd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`sd${yrShort}`)) {
      					d3.select(this).attr("id", "SD-" + district)
				}
  		});


		refreshLabelsPath()

	} else if(clickedButtonID == "ST SD"){

		d3.select("#resultsBoxHouse").classList = "hidden";

		document.getElementById("buttonHistory").style.display = "none";
		document.getElementById("buttonCounty").style.display = "none";

		$('.sd.selectedState, .sd.notSelectedCounty, .sd.notSelectedState')
			.removeClass("selectedCounty", "selectedState", "notSelectedCounty", "notSelectedState");

		if(clicked !== "United States"){
			var otherStateCD = document.querySelectorAll(`.sd:not([data-state="${stateClicked}"])`);
			for (let i = 0; i < otherStateCD.length; i++) {otherStateCD[i].classList.add("notSelectedState")}
		}

		var countyStatus = $("#data").attr("button-county"); if(countyStatus == "true"){clickCounty()};

		d3.selectAll(".cd").style("display", "none");
		d3.selectAll(".township").lower().style("display","none");
		d3.selectAll(".county").lower().style("display","none");
		d3.selectAll(".state").lower().style("fill","rgb(107, 112, 123");

		const dataLevel = $("#data").attr("data-level");
		if(dataLevel == "state" || dataLevel == "county"){d3.select("[id='" + stateClicked + "']").raise()}

		var yrShort = $("#data").attr("button-year").slice(-2).toString();

		d3.selectAll(`.hd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`hd${yrShort}`)) {
      					d3.select(this).attr("id", "HD-" + district)
				}
  		});

		d3.selectAll(`.sd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`sd${yrShort}`)) {
      					d3.select(this)
        					.attr("id", district)
        					.style("display", "initial")
        					.raise();
				} else {
      					d3.select(this)
        					.attr("id", yrShort + "_" + "SD-" + district)
        					.style("display", "none");
    				}
  		});

		refreshLabelsPath()

	} else if(clickedButtonID == "P CD"){
		
		for (let i = 0; i < buttonsYear.length; i++) {buttonsYear[i].style.display = "none"}
		if(d3.select("#data").attr("data-level") !== "county"){
		document.getElementById("resultsBoxHouse").classList.remove('hidden')}

		document.getElementById("buttonHistory").style.display = "none";
		document.getElementById("buttonCounty").style.display = "none";

		var countyStatus = d3.select("#data").attr("button-county");
		if(countyStatus == "true"){clickCounty()};

		for (let i = 0; i < buttonsYear.length; i++) {
			var thisButton = buttonsYear[i]; var thisYear = thisButton.innerHTML;
			if (thisYear % 4 == 0 && thisYear >= 1952 && thisYear <= 2020) {thisButton.style.display = "flex"} else {thisButton.style.display = "none"}
		}

		if (selectedYear % 4 === 0) {} else {
			var year = Math.floor(selectedYear / 4) * 4;
			for (let i = 0; i < buttonsYear.length; i++) {buttonsYear[i].classList = "controlButton yearButton"}
			document.getElementById('buttonYear' + year).classList = "yearButton controlButton buttonSelected";
			$("#data").attr("button-year", year);
			document.getElementById("controlBarYear").style.scrollTop = "0px";
		}

		var yrShort = d3.select("#data").attr("button-year").slice(-2).toString();
		d3.selectAll(`.cd`)
  			.each(function() {
    				var district = d3.select(this).attr("data-district");
    				if (this.classList.contains(`cd${yrShort}`)) {
      					d3.select(this)
        					.attr("id", district)
        					.style("display", "initial")
        					.raise();
				} else {
      					d3.select(this)
        					.attr("id", yrShort + "_" + district)
        					.style("display", "none");
    				}
  		});

		if(clicked !== "United States"){
			$(".cd:not([data-state='" + stateClicked + "'])").addClass("notSelectedState");
		}

		d3.selectAll(".county").lower().style("display", "none");

		refreshLabelsPath();

//		if(stateClicked && stateClicked !== "United States"){
//			if(d3.select("#data").attr("data-level") !== "county"){
				d3.select("[id='" + stateClicked + "']").raise();
//			}
//		}
	}

	getYearsContest();
	updateContestText();
	getResults();
	refreshFill();
	refreshLabelsPath();

	setTimeout(function(){
		if ($("#data").attr("button-history") == "true"){updateHistory()}
	}, 1);
}

function zoomToContest(state, contest){
	let buttonHTML = {"PRESIDENT": "PRES", "SENATE": "SEN", "GOVERNOR": "GOV", "SENATE SPECIAL": "SEN S", "SENATE RUNOFF": "SEN R", "SENATE SPECIAL RUNOFF": "SEN SR", "DEM PRESIDENT": "PRES-D", "GOP PRESIDENT": "PRES-R", "HOUSE": "HOUSE", "SECRETARY OF STATE": "SOS", "GOVERNOR RECALL": "GOV RC", "LIEUTENANT GOVERNOR": "LT GOV", "ATTORNEY GENERAL": "AG", "SUPREME COURT JUSTICE": "SCJ", "SUPERIOR COURT": "SC", "SENATE DEM": "SEN-D", "SENATE REP": "SEN-R", "GOVERNOR DEM": "GOV-D", "GOVERNOR REP": "GOV-R", "D-HOUSE": "HOU-D", "R-HOUSE": "HOU-R", "SECRETARY OF STATE DEM": "SOS-D", "SECRETARY OF STATE REP": "SOS-R", "PRESIDENT BY CD": "P CD", "BALLOT MEASURE": "PROP", "BALLOT MEASURE ABORTION": "ABORT", "LIEUTENANT GOVERNOR DEM": "LT-D", "LIEUTENANT GOVERNOR REP": "LT-R", "STATE HOUSE": "ST HD", "STATE SENATE": "ST SD"};

	if(document.getElementById(state) == undefined){return}

	$("#contestsBar").removeClass('visible');
	$("#contestsBar").css("opacity", 0);

	$("#data").attr("button-year", "2024");
	var selectedYear = $("#data").attr("button-year");

	zoomToState(state, 1);
	$("#data")
		.attr("button-contest", contest)
		.attr("last-clicked", state)
		.attr("data-level", "state")
		.attr("data-stateclick", state)
		.attr("data-state", state)
		.attr("data-stateabbreviation", stateAbbreviation[state]);

	$('#headingTextTitle').html(state);
	setResultsBoxTopTextState(state);

	$("#controlBarContest .controlButton").removeClass("buttonSelected");

 	var buttonSelected = d3.selectAll('#controlBarContest .controlButton').filter(function() {
    		return this.innerHTML === buttonHTML[contest];
  	});

	$("#data").attr("button-racesBar", "false")

  	buttonSelected.classed('buttonSelected', true).node().scrollIntoView({block: "center" });

	$(".county, .township").style("display", "none");
	d3.selectAll('.county[data-state="' + state + '"]').style("display", "initial").raise();
	d3.selectAll('.township[data-state="' + state + '"]').style("display", "initial").raise();	

	$(".state").addClass("notSelectedState");
	$(".selectedState").removeClass("selectedState");

	d3.select("[id='" + state + "']").classed("selectedState", true).raise();
	updateContestText();
	getResults(); refreshFill(); setPointLabels(state); refreshLabelsPath();
}

function districtToCounty() {
	if($("#data").attr("button-contest") !== "HOUSE"){return}
	$("#resultsBoxHouse").attr("class","hidden");
	$("#data").attr("button-contest","PRESIDENT");
	$(".cd").css("display","none");
	$(".state").css("fill","");
}

function getYearsContest() {
	var dE = $("#data"), clicked = $("#data").attr("last-clicked");
	var selectedYear = dE.attr("button-year"), selectedContest = dE.attr("button-contest");

	$(".yearButton").css("display", "none");
	var a = [], tY = new Date().getFullYear();
	if(selectedContest == "HOUSE") {
		for (let i = 2002; i <= tY+1; i += 2) {a.push(`#buttonYear${i}`)}
		$(a.join(",")).css("display", "initial");

		if (selectedYear % 2 !== 0) {
			const year = Math.floor(selectedYear / 2) * 2;
			$("#controlBarYear .controlButton").removeClass("buttonSelected")
			$('#buttonYear' + year).addClass("buttonSelected")
			dE.attr("button-year", year.toString());
		}

	} else if(selectedContest == "PRESIDENT" || selectedContest == "PRESIDENT BY CD") {
		$(".yearButton").css("display", "none");
		for (let i = 1940; i <= tY+1; i += 4) {a.push(`#buttonYear${i}`)}
		$(a.join(",")).css("display", "initial");

		if (selectedYear % 4 !== 0) {
			let y = Math.floor(selectedYear / 4) * 4;
			$(".yearButton").removeClass("buttonSelected");
			$('#buttonYear' + y).addClass("buttonSelected")
			dE.attr("button-year", y.toString());
		}
	} else {
		var dataResults, dataResultsSpecial;
		switch(selectedContest) {
			case "GOVERNOR": dataResults = data_gov; break;
			case "SENATE": dataResults = data_sen; break;
			case "SENATE SPECIAL": dataResults = data_sen_sp; break;
			case "SENATE RUNOFF": dataResults = data_sen_r; break;
			case "SENATE SPECIAL RUNOFF": dataResults = data_sen_sp_r; break;
			case "SECRETARY OF STATE": dataResults = data_sos; break;
			case "DEM PRESIDENT": dataResults = data_president_dem; break;
			case "GOP PRESIDENT": dataResults = data_president_rep; break;
			case "GOVERNOR RECALL": dataResults = data_gov_recall; break;
			case "LIEUTENANT GOVERNOR": dataResults = data_gov_lt; break;
			case "GOVERNOR DEM": dataResults = data_gov_dem; break;
			case "GOVERNOR REP": dataResults = data_gov_rep; break;
			case "SECRETARY OF STATE DEM": dataResults = data_sos_dem; break;
			case "SECRETARY OF STATE REP": dataResults = data_sos_rep; break;
			case "LIEUTENANT GOVERNOR DEM": dataResults = data_gov_lt_dem; break;
			case "LIEUTENANT GOVERNOR REP": dataResults = data_gov_lt_rep; break;
			case "ATTORNEY GENERAL": dataResults = data_attorney_general; break;
			case "SENATE DEM": dataResults = data_sen_dem; break;
			case "SENATE REP": dataResults = data_sen_rep; break;
			case "D-HOUSE": dataResults = data_house_dem; break;
			case "R-HOUSE": dataResults = data_house_rep; break;
			case "SUPREME COURT JUSTICE": dataResults = data_supreme_court; break;
			case "SUPERIOR COURT": dataResults = data_superior_court; break;
			case "BALLOT MEASURE": dataResults = data_ballot; break;
			case "BALLOT MEASURE ABORTION": dataResults = data_ballot_abortion; break;
			case "STATE HOUSE": dataResults = data_state_house; break;
			case "STATE SENATE": dataResults = data_state_senate; break;
		}

		if(selectedContest.includes(" PRESIDENT")){
			if (selectedYear % 4 !== 0) {
				const year = Math.floor(selectedYear / 4) * 4;
				$(".yearButton").removeClass("buttonSelected");
				$('#buttonYear' + year).addClass("buttonSelected")
				dE.attr("button-year", year.toString());
			}
		}

		var sElections = ['GOVERNOR','SENATE','SENATE RUNOFF'];
		if (sElections.includes(selectedContest)) {
			switch (selectedContest) {
				case "GOVERNOR": dataResultsSpecial = data_gov_recall; break;
				case "SENATE": dataResultsSpecial = data_sen_sp; break;
				case "SENATE RUNOFF": dataResultsSpecial = data_sen_sp_r; break;
			}
		}

		let yearArray = [];
		if(clicked == "United States") {
			for(let k in dataResults) {let y = k.substring(0,4); if(!yearArray.includes(y)) {yearArray.push(y)}}

			if(dataResultsSpecial){
				for (let k in dataResultsSpecial) {
					if(!yearArray.includes(k.substring(0,4))) {yearArray.push(k.substring(0,4))}
				}
			}

		} else {
			if(!dataResults){return}

			yearArray = Object.keys(dataResults)
				.filter(k => k.endsWith('-' + clicked))
				.map(k => k.substring(0, 4))
				.filter((v, i, s) => s.indexOf(v) == i);

			if(dataResultsSpecial){
				Object.keys(dataResultsSpecial)
					.filter(a => a.endsWith('-' + clicked))
					.map(a => a.substring(0, 4))
					.filter((value, index, self) => self.indexOf(value) == index)
					.forEach(a => {yearArray.push(a)});
			}
		}

		d3.selectAll('.yearButton').style("display", yearArray.length == 0 ? "flex" : "none");
		yearArray.forEach(a => {d3.select("#buttonYear" + a).style("display", "flex")});
	}

	updateContestText();
	$('#buttonYear' + $("#data").attr("button-year"))[0].scrollIntoViewIfNeeded();
}

// function clickStatButton

function clickStats() {
	if($("#data").attr("button-apps") == "true"){clickApps()}
	if($("#data").attr("button-filters") == "true"){clickFilters()}

	if(mapSettings['stats'] == ""){
		var status = "false";
		document.getElementById("buttonStats").classList.add('controlButtonNotselected');
	} else {
		var status = "true";
		document.getElementById("buttonStats").classList.remove('controlButtonNotselected');
	}

	document.getElementById("statsBar").scrollTop = "0";
	$("#data").attr("button-stats", status);

	$("#statsBar").toggleClass('visible');
	$("#filtersBar").removeClass('visible');
	setTimeout(refreshFill, 5);
}

function clickFilters() {
	if($("#data").attr("button-racesBar") == "true"){clickContests()}
	if($("#data").attr("button-apps") == "true"){clickApps(); refreshFill();}
	if($("#data").attr("button-stats") == "true"){clickStats(); refreshFill();}

	if(mapSettings['filters'] == ""){
		var status = "false";
		document.getElementById("buttonFilters").classList.add('controlButtonNotselected');
	} else {
		var status = "true";
		document.getElementById("buttonFilters").classList.remove('controlButtonNotselected');
	}

	document.getElementById("filtersBar").scrollTop = "0";
	$("#data").attr("button-filters", status);

	$("#filtersBar").toggleClass('visible');
	$("#statsBar").removeClass('visible');
}

function clickStatePop() {

	if(document.getElementById("buttonStatePop").classList.contains('controlButtonNotselected')){
		var status = "true"} else {var status = "false"};
	
	dataElement.setAttribute("button-swing", "false");
	dataElement.setAttribute("button-lead", "false");
	dataElement.setAttribute("button-statepop", status);
	dataElement.setAttribute("status-filter", status);

	document.getElementById("buttonStatePop").classList.toggle('controlButtonNotselected');
	document.getElementById("buttonMargin").classList.add('controlButtonNotselected');
	document.getElementById("buttonSwing").classList.add('controlButtonNotselected');
	document.getElementById("buttonBlackPop").classList.add('controlButtonNotselected');

	setTimeout(function(){refreshFill()}, 5);
}

function clickLatinoPop() {

	if(document.getElementById("buttonLatinoPop").classList.contains('controlButtonNotselected')){
		var status = "true"} else {var status = "false"};
	
	dataElement.setAttribute("button-swing", "false");
	dataElement.setAttribute("button-lead", "false");
	dataElement.setAttribute("button-statepop", "false");
	dataElement.setAttribute("button-latinopop", status);
	dataElement.setAttribute("status-filter", status);

	document.getElementById("buttonLatinoPop").classList.toggle('controlButtonNotselected');
	document.getElementById("buttonMargin").classList.add('controlButtonNotselected');
	document.getElementById("buttonSwing").classList.add('controlButtonNotselected');
	document.getElementById("buttonStatePop").classList.add('controlButtonNotselected');
	document.getElementById("buttonBlackPop").classList.add('controlButtonNotselected');

	setTimeout(function(){refreshFill()}, 5);
}

function clickBlackPop() {

	if(document.getElementById("buttonBlackPop").classList.contains('controlButtonNotselected')){
		var status = "true"} else {var status = "false"};
	
	dataElement.setAttribute("button-swing", "false");
	dataElement.setAttribute("button-lead", "false");
	dataElement.setAttribute("button-statepop", "false");
	dataElement.setAttribute("button-latinopop", "false");
	dataElement.setAttribute("button-turnout", "false");
	dataElement.setAttribute("button-blackpop", status);
	dataElement.setAttribute("status-filter", status);

	document.getElementById("buttonBlackPop").classList.toggle('controlButtonNotselected');
	document.getElementById("buttonMargin").classList.add('controlButtonNotselected');
	document.getElementById("buttonSwing").classList.add('controlButtonNotselected');
	document.getElementById("buttonStatePop").classList.add('controlButtonNotselected');

	setTimeout(function(){refreshFill()}, 5);
}

function clickReporting() {

	if(document.getElementById("buttonReporting").classList.contains('controlButtonNotselected')){
		var status = "true"} else {var status = "false"};

	dataElement.setAttribute("button-swing", "false");
	dataElement.setAttribute("button-lead", "false");
	dataElement.setAttribute("button-statepop", "false");
	dataElement.setAttribute("button-latinopop", "false");
	dataElement.setAttribute("button-turnout", "false");
	dataElement.setAttribute("button-voteRemaining", status);
	dataElement.setAttribute("status-filter", status);

	document.getElementById("buttonReporting").classList.toggle('controlButtonNotselected');
	setTimeout(function(){refreshFill()}, 5);
}

var filterDesc = {
	"gain":"pickups",
	"margin1":"margin less than 1%",
	"margin3":"margin less than 3%",
	"margin5":"margin less than 5%",
	"margin10":"margin less than 10%",
	"openSeat":"open/no incumbent",
	"uncontested":"uncontested races",
	"pickupOpportunities":"pickup opportunities",
	"presDem":"won by biden in 2020",
	"presGop":"won by trump in 2020",
	"trumpBiden":"won by trump in 2016, won by biden in 2020",
	"obamaTrump":"won TWICE by obama, then twice by trump",
	"ticketSplit":"ticket spliters"
} 

var statDesc = {
	"margin":"margin of victory",
	"swing":"swing",
	"swing8":"swing",
	"swing12":"swing",
	"swing16":"swing",
	"demVote":"democratic vote share",
	"repVote":"republican vote share",
	"otherVote":"third party vote share",
	"statePop":"percentage of state population",
	"electoralVotes":"electoral votes",
	"reporting":"% of expected vote in",
	"countyType":"county type",
	"changeTurnout":"change in turnout",
	"leadState":"margin compared to statewide vote",
	"leadNation":"margin compared to national vote"
} 

function filterButton(t) {
	const d = $("#data"), cl = d.attr("last-clicked");
	$("#filtersBar span").removeClass("selected");

	var c = "filterButton", f = t;
	if(mapSettings['filters'].includes(t)){
		f = ""
//		$("#mapLabelFilter").html("");
//		translateLabelOut();
	} else {
		c += " selected";
//		$("#mapLabelFilter").html(filterDesc[t] || "");
//		if(mapSettings['filters'] == "" && mapSettings['stats'] == ""){translateLabelIn()}
	}

	mapSettings['filters'] = f;
	d3.select(this).attr("class", c);
//	d.attr("status-filter", status);

	refreshFill();
	if(cl == "United States"){getResults()} else {calculateHouseTallies()}
}

var statDescLabel = {
	"electoralVotes":"electoral votes",
	"reporting":"% of expected vote in",
	"changeTurnout":"change in turnout",
	"leadState":"margin compared to statewide vote",
	"leadNation":"margin compared to national vote"
} 

function statButton(t) {
	$(".statButton").removeClass("selected");

	var c = "statButton", f = t;
	if(mapSettings['stats'].includes(t)){
		f = ""
		$("#mapLabelStat").html("");
		translateLabelOut();
	} else {
		c += " selected";
		if(statDescLabel[t]){
			$("#mapLabelStat").html(statDescLabel[t] || "");
			if(mapSettings['filters'] == "" && mapSettings['stats'] == ""){translateLabelIn()}
		}
	}

	mapSettings['stats'] = f;
	d3.select(this).attr("class", c);
	$("#data").attr("status-stats", status);
	refreshFill();
}

function updateFilterButtonText(){
	var f = mapSettings['filters'];
	if($("#mapLabelFilter").html() !== "" && f !== ""){
		$("#mapLabelFilter").html(filterDesc[f] || "");
	}

	var s = mapSettings['stats'];
	if($("#mapLabelStat").html() !== "" && g !== ""){
		$("#mapLabelStat").html(statDesc[s] || "");
	}
}

function translateLabelIn() {
	var transform = d3.zoomTransform(d3.select("#nationalMap").node());
	if(areAllChildrenEmpty(document.getElementById('mapFilterLabels')) == false) {

		var clicked = $("#data").attr("data-stateclick");
		if(clicked == "United States"){
			reset(500)
		} else {
			let level = $("#data").attr("data-level");
			if(level == "state"){
				zoomToState(clicked, 500)
			}	
		}

		return;
		d3.select("#nationalMap")
			.attr("viewBox", [0, (1-(76.5 / 83.5))*800, fixedSvgWidth, (76.5 / 83.5)*800])
			// .call(zoom.translateBy, 400/tPad, (400 * (1-(76.5 / 83.5))) / transform.k)
			// .call(zoom.scaleBy, (76.5 / 83.5))
	}
}

function translateLabelOut(){
	var clicked = $("#data").attr("data-stateclick");
	if(clicked == "United States"){
		reset(500)
	} else {
		let level = $("#data").attr("data-level");
		if(level == "state"){
			zoomToState(clicked, 500)
		}	
	}
}

function resizeSVGForLabel(){
	return;
	if(areAllChildrenEmpty(document.getElementById('mapFilterLabels')) == false) {
		d3.select("#nationalMap")
			.style("height", "76.5vh")
			.style("top", "23.5vh")
	} else {
		d3.select("#nationalMap")
			.style("height", "83.5vh")
			.style("top", "16.5vh")
	}
}

function clickApps() {
	var d = $("#data");
	if(d.attr("button-racesBar") == "true"){clickContests()}
	if(d.attr("button-stats") == "true"){clickStats()}
	if(d.attr("button-filters") == "true"){clickFilters()}
	if(d.attr("button-pollclosing") == "true"){clickPollClosing()}
	if(d.attr("button-senateWhatIf") == "true"){clickSenateWhatIf()}
	if(d.attr("button-presidentProjections") == "true"){clickPresidentProjections()}
	if(d.attr("button-graphics") == "true"){clickGraphics()}

	var status;
	if(d.attr("button-road270") == "true"){
		click270(); status = "false"
	} else if(d.attr("button-apps") !== "true"){
		$("#appsBar").scrollTop(0);
		status = "true"
	} else {
		status = "false"
	}

	d.attr("button-apps", status);
	d3.select("#appsBar").classed('visible', JSON.parse(status))
	setTimeout(refreshFill, 5);
}

function clickContests() {
	var d = $("#data");
	if(d.attr("button-apps") == "true"){clickApps()}
	if(d.attr("button-stats") == "true"){clickStats()}
	if(d.attr("button-filters") == "true"){clickFilters()}
	if(d.attr("button-pollclosing") == "true"){clickPollClosing()}
	if(d.attr("button-senateWhatIf") == "true"){clickSenateWhatIf()}
	if(d.attr("button-presidentProjections") == "true"){clickPresidentProjections()}
	if(d.attr("button-graphics") == "true"){clickGraphics()}

	var status;
	if(d.attr("button-racesBar") == "true"){
		$("#contestsBar").scrollTop(0);
		$("#contestsBar").css("opacity", 1);
		status = "false"
	} else {
		status = "true"
		$("#contestsBar").css("opacity", 1);
	}

	$("#contestsBar").toggleClass('visible');
	$("#statsBar, #filtersBar, #appBar").removeClass('visible');

	d.attr("button-racesBar", status);
	setTimeout(refreshFill, 5);
}

function hideStats() {
	$("#buttonStats, #buttonFilters").addClass('controlButtonNotselected');
	$("#filtersBar, #statsBar").removeClass('visible');

	var d = $("#data");
	d.attr("button-stats", "false");
	d.attr("button-filters", "false");
}

function removeFilters() {
	mapSettings['filters'] = ""; mapSettings['stats'] = "";

	$(".filterButton.selected, .statButton.selected").removeClass("selected");
	$("#statsBar div").addClass('controlButtonNotselected');

	$("#mapFilterLabels span").html("")
	translateLabelOut();
	setTimeout(refreshFill, 5);
	setTimeout(calculateHouseTallies, 5);
	hideStats();
}


function click270() {
	districtToCounty();

	var clicked = $("#data").attr("last-clicked");
	var selectedYear = $("#data").attr("button-year");
	const button270 = document.getElementById("buttonRoad270");
	if(button270.classList.contains('controlButtonNotselected')){
		if (selectedYear % 4 !== 0) {
			$("#data").attr("button-year", (Math.floor(selectedYear / 4) * 4).toString());
		}

		$("#buttonApps").text("HOME");
		$("#appsBar")
			.removeClass('visible')
			.css("opacity", 0);

		$("#data").attr("button-road270", "true");
		resetElectoralVoteMap();

		$('#nationalMap').addClass('roadMap');
		d3.select("#headingBoxRoadTo270").style("display","flex")

		document.getElementById("controlBars").style.right = "-10vw";
		document.getElementById("controlBar270").style.right = "0.5vw";

		resetBox(0.255,0.745,1,0.95);
		setTimeout(function(){returnHome()}, 5);

		$("#results").addClass('hidden').css("opacity", 0);
		$("#road270box").removeClass('hidden');

		document.getElementById('buttonPollClosing').style.display = "none";
		document.getElementById('buttonStats').style.display = "none";
		document.getElementById('buttonRaces').style.display = "none";
		document.getElementById('buttonFilters').style.display = "none";

		if($("#data").attr("button-pollclosing") == "true"){
			$("boxPollClosing").addClass('hidden');
//			$("boxPollClosing").addClass('resultsHidden');
			$("#data").attr("button-pollclosing", "false");
			buttonPollClosing.classList.add('controlButtonNotselected');
			document.getElementById("controlBarPollClosings").style.right = "-10vw";
		}
	} else {
		$("#buttonApps").html("APPS");
		$("#data").attr("button-road270", "false");
		document.getElementById("appsBar").style.opacity = 1;

		resetElectoralVoteMap();

		d3.select("#headingBoxRoadTo270").style("display","none")

		$('#nationalMap').removeClass('roadMap');

		document.getElementById("controlBars").style.right = "0.5vw";
		document.getElementById("controlBar270").style.right = "-10vw";
		resetBox(0,1,1);

		setTimeout(function(){returnHome()}, 5); setTimeout(function(){returnHome()}, 10);
		d3.select("#controlBarPollClosings").style("right", "-10vw");
		d3.select("#controlBars").style("right", "0.5vw");
		d3.select('#buttonPollClosing').style("display", "flex");
//		document.getElementById('buttonRaces').style.display = "flex";
		d3.select('#buttonStats').style("display", "flex");
		d3.select('#buttonFilters').style("display", "flex");
		d3.select("#results").classed('hidden', false).style("opacity", 1);
		$("#road270box").addClass('hidden');
		$("#boxPollClosing").addClass('hidden');
		$("#electoralVoteMaine").removeClass("visible");
		$("#electoralVoteNebraska").removeClass("visible");
		$("#Maine").removeClass("evBoxState");
		$("#Nebraska").removeClass("evBoxState");
		$("#data").attr("button-draw", "false");
	}

	button270.classList.toggle('controlButtonNotselected');
	refreshFill();
}

function turnOff270() {
	$("#buttonRoad270").addClass("controlButtonNotselected");
	$("#data").attr("button-road270", "false");
	hideHistory(); refreshFill();
}

function clickPollClosing() {

	const buttonPollClosing = document.getElementById("buttonPollClosing");

	if(buttonPollClosing.classList.contains('controlButtonNotselected')){
		districtToCounty();
		$("#buttonApps").html("HOME");
		$("#filtersBar").removeClass('visible');
		$("#statsBar").removeClass('visible');
		$("#appsBar").removeClass('visible').css("opacity", 0);

		buttonPollClosing.classList.remove('controlButtonNotselected');

		$("#data").attr("button-pollclosing", "true");
		document.getElementById("controlBars").style.right = "-10vw";
		document.getElementById("controlBarPollClosings").style.right = "0.5vw";

		$('#headingElectoralVotesText').html("ELEC. VOTES<br>AT STAKE");
		$('#headingElectoralVotesNumber').html(0);

		startPollClosingHour(); clearPointLabels();

		document.getElementById('buttonStats').style.display = "none";
		document.getElementById('buttonRaces').style.display = "none";
		document.getElementById('buttonFilters').style.display = "none";
		document.getElementById("results").classList.add('hidden');
		document.getElementById("boxPollClosing").classList.remove('hidden');
		document.getElementById('headingTextContest').style.display = "none";
		document.getElementById('headingTextTitle').style.display = "none";
		document.getElementById('headingTextPollClosingText').style.display = "flex";
		$('#headingTextPollClosing span').css("display","flex");

		startTimestamps();
	} else {
		d3.select("#buttonApps").text("APPS");
		$("#data").attr("button-road270", "false");
		document.getElementById("appsBar").style.opacity = 1;
		$("#data").attr("button-pollclosing", "false");
		buttonPollClosing.classList.add('controlButtonNotselected');

		clearInnerHTML('headingTextSubtitle');

		$(".selectedStateShow").removeClass("selectedStateShow")

		clearInterval(timestampClock);
		setTimeout(function() {setInnerHTML('boxPollClosingHeading', '')}, 1000);
		
		setInnerHTML('headingElectoralVotesText', "NEEDED<br>TO WIN");

		document.getElementById('headingTextTitle').style.display = "flex";
		document.getElementById('headingTextPollClosingText').style.display = "none";
		$('#headingTextPollClosing span').css("display","none");

		document.getElementById("controlBarPollClosings").style.right = "-10vw";
		document.getElementById("controlBars").style.right = "0.5vw";

		document.getElementById('buttonStats').style.display = "flex";
		document.getElementById('buttonFilters').style.display = "flex";
//		document.getElementById('buttonRaces').style.display = "flex";
		document.getElementById("boxPollClosing").classList.add('hidden');
		document.getElementById('headingTextContest').style.display = "flex";
		reset(); updateContestText(); refreshFill();
	}
}

function clickPresidentProjections(){
	var clicked = $("#data").attr("last-clicked"), selectedYear = $("#data").attr("button-year");
	const button = document.getElementById("buttonProjections");
	if(button.classList.contains('controlButtonNotselected')){
		createProjections();
		d3.select("#buttonApps").style("display","none");
		d3.select("#appsBar").classed('visible',false).style("opacity", 0);
		$("#data").attr("button-presidentProjections", "true");

		d3.select("#nationalMap").style("display","none")
		d3.select("#headingBoxRoadTo270").style("display","flex")

		d3.select("#appPresidentProjections").style("display","grid")
		d3.select("#appSenateWhatIfGrid").style("display","none")
		d3.select("#appGraphics").style("display","none")

		d3.select("#controlBars").style("right", "-10vw").style("display","none")

		d3.select("#results").style("opacity", 0);
		document.getElementById('buttonStats').style.display = "none";
		document.getElementById('buttonFilters').style.display = "none";
		document.getElementById('buttonRaces').style.display = "none";
	} else {
		d3.selectAll(".projGroup").selectAll('*').remove();
		d3.select("#buttonApps").html("APPS");
		d3.select("#buttonApps").style("display","flex");
		d3.select("#appsBar").style("opacity", 1);
		$("#data").attr("button-presidentProjections", "false");

		d3.select("#nationalMap").style("display","inline")
		d3.select("#appHeadingBox").style("display","none")
		d3.select("#appSenateWhatIfGrid").style("display","none")
		d3.select("#appGraphics").style("display","none")
		d3.select("#headingBoxRoadTo270").style("display","none")
		d3.select("#appPresidentProjections").style("display","none")
		document.getElementById('buttonStats').style.display = "flex";
		document.getElementById('buttonFilters').style.display = "flex";
//		document.getElementById('buttonRaces').style.display = "flex";
		d3.select("#results").style("opacity", 1);
		d3.select("#controlBars").style("right", "0.5vw").style("display","flex")
		d3.select("#controlBarSenateWhatIf").style("right", "-10vw").style("display","none")
		getResults();
	}

	button.classList.toggle('controlButtonNotselected');
}

function clickSenateWhatIf(){
	var clicked = $("#data").attr("last-clicked");
	var selectedYear = $("#data").attr("button-year");
	const buttonSenate = document.getElementById("buttonSenateWhatIf");
	if(buttonSenate.classList.contains('controlButtonNotselected')){
		updateSenateWhatIf();
		$("#buttonApps").html("HOME");
		d3.select("#appsBar").classed('visible',false).style("opacity", 0);
		$("#data").attr("button-senateWhatIf", "true");

		d3.select("#nationalMap").style("display","none")
		d3.select("#resultsHouseGroups").style("display","none")
		d3.select("#appHeadingBox").style("display","flex")
		d3.select("#headingSenateWhatIf").style("display","flex")
		d3.select("#appSenateWhatIfGrid").style("display","grid")

		d3.select("#controlBars").style("right", "-10vw").style("display","none")
		d3.select("#controlBarSenateWhatIf").style("right", "0.5vw").style("display","flex")

		d3.select("#results").style("opacity", 0);
		d3.select("#resultsHouseGroups").style("opacity", 0);
		document.getElementById('buttonStats').style.display = "none";
	} else {
		$("#buttonApps").html("APPS");
		d3.select("#appsBar").style("opacity", 1);
		$("#data").attr("button-senateWhatIf", "false");

		d3.select("#nationalMap").style("display","inline")
		d3.select("#appHeadingBox").style("display","none")
		d3.select("#headingSenateWhatIf").style("display","none")

		d3.select("#appSenateWhatIfGrid").style("display","none")

		d3.select('#buttonStats').style("display", "flex");
		d3.select("#results").style("opacity", 1);
		d3.select("#resultsHouseGroups").style("opacity", 1);
		d3.select("#controlBars").style("right", "0.5vw").style("display","flex")
		d3.select("#controlBarSenateWhatIf").style("right", "-10vw").style("display","none")
		getResults();
	}

	buttonSenate.classList.toggle('controlButtonNotselected');
}

function clickGraphics(){
	var clicked = $("#data").attr("last-clicked");
	var selectedYear = $("#data").attr("button-year");
	const button = document.getElementById("buttonGraphics");
	if(button.classList.contains('controlButtonNotselected')){
//		createProjections();
		d3.select("#buttonApps").style("display","none");
		d3.select("#appsBar").classed('visible',false).style("opacity", 0);
		$("#data").attr("button-graphics", "true");

		d3.select("#controlBarShadow").style("display","none")
		resetBox(0.345,0.635,1,1,0);
		clearPointLabels();
		d3.selectAll(".county").style("display","none")
		d3.selectAll(".state").attr("class","state");

		d3.select("#headingBoxRoadTo270").style("display","flex")
		d3.select("#appGraphics").style("display","flex")

		d3.select("#controlBars").style("right", "-10vw").style("display","none")

		d3.select("#results").style("opacity", 0);
		d3.select("#buttonStats").style("display","none")
		d3.select("#buttonFilters").style("display","none")
	} else {
		d3.select("#buttonApps").html("APPS").style("display","flex");
		d3.select("#appsBar").style("opacity", 1);
		$("#data").attr("button-graphics", "false");
		d3.select("#nationalMap").style('display','initial');

		reset(1);
		d3.select("#controlBarShadow").style("display","initial")
		d3.select("#headingBoxRoadTo270").style("display","none")

		d3.select("#appGraphics").style("display","none")

		d3.select('#buttonStats').style("display", "flex");
		d3.select('#buttonFilters').style("display", "flex");

		d3.select("#results").style("opacity", 1);
		d3.select("#controlBars").style("right", "0.5vw").style("display","flex")
		d3.select("#controlBarSenateWhatIf").style("right", "-10vw").style("display","none")
		getResults();
	}

	button.classList.toggle('controlButtonNotselected');
}

function showStateGraphic(i){
	d3.select("#appGraphics_bkgd_gradient").style('display','initial');
	d3.select("#appGraphics_bkgd").style('display','initial');
	d3.select("#appGraphics_heading").style('display','flex');
	d3.select("#nationalMap").style('display','none');

	updateStateGraphic(i);
}

function updateStateGraphic(i){
	if(i == "United States"){return}
	var w = data_president[i]?.['24']['w'];
	d3.select("#appGraphics").attr("class","");
	d3.select("#appGraphics_heading").html(i);
	d3.select("#appGraphics_text").style('display','none');
			d3.select("#appGraphics_candName").text("");

	d3.select("#appGraphics_tetc_text").style('display','none');
	switch (w) {
		case "r":
			d3.selectAll("#appGraphics_trump, #appGraphics_imageBox_rep, #appGraphics_imageBorder_rep")
				.style('display','initial');

			d3.selectAll("#appGraphics_biden, #appGraphics_imageBox_dem, #appGraphics_imageBorder_dem")
				.style('display','none');

			d3.select("#appGraphics_text").style('display','grid');
			d3.select("#appGraphics_candName").html("DONALD<br>TRUMP");

			d3.select("#appGraphics_heading").style('color', 'rgb(242,242,242)');

			d3.selectAll("#appGraphics_tick, #appGraphics_heading, #appGraphics_bkgd").style('background-color','rgb(189,18,28)');
			break;
		case "d":
			d3.selectAll("#appGraphics_trump, #appGraphics_imageBox_rep, #appGraphics_imageBorder_rep")
				.style('display','none');

			d3.selectAll("#appGraphics_biden, #appGraphics_imageBox_dem, #appGraphics_imageBorder_dem")
				.style('display','initial');

			d3.select("#appGraphics_text").style('display','grid');
			d3.select("#appGraphics_candName").html("JOE<br>BIDEN");

			d3.select("#appGraphics_heading").style('color', 'rgb(242,242,242)');

			d3.selectAll("#appGraphics_tick, #appGraphics_heading, #appGraphics_bkgd").style('background-color','rgb(10,105,192)');
			break;
		default:
			d3.select("#appGraphics").attr("class","tooEarlyToCall");
			d3.select("#appGraphics_tetc_text").style('display','initial');

			d3.selectAll("#appGraphics_trump, #appGraphics_biden, .aG_imageBox, .aG_imageBorder")
				.style('display','initial');

			d3.select("#appGraphics_heading")
				.style('background-color','rgb(233,233,233)')
				.style('color', 'rgb(24,24,24)');
			d3.select("#appGraphics_tick, #appGraphics_bkgd").style('background-color','rgb(166,166,166)');
			break;
	}
}

function clickHistory() {
	var d = $("#data"), st = d.attr("button-history");
	if(st == "true"){
		d.attr("button-history", "false");
	} else {
		d.attr("button-history", "true");
		updateHistory();
	}
	
	$("#buttonHistory").toggleClass('controlButtonNotselected');
	$("#historyPanel").toggleClass('visible');
	setTimeout(hideStats, 5);
}

function hideHistory() {
	$("#data").attr("button-history", "false");
	$("#buttonHistory").addClass('controlButtonNotselected');
	$("#historyPanel").removeClass('visible');
}

function clickCounty() {
	var d = $("#data"), st = d.attr("button-county");
	var clicked = d.attr("data-stateclick");
	if(st == "true"){
		d.attr("button-county", "false");

		$(".selectedState").removeClass("selectedState");
		$(".county, .township").css("display", "none");

		if(clicked !== "United States" && clicked !== null){
			d3.selectAll('.county[data-state="' + clicked + '"]').style("display", "initial").raise();
			d3.selectAll('.township[data-state="' + clicked + '"]').style("display", "initial").raise();	
		}

		$("#buttonCounty").addClass("controlButtonNotselected")
	} else {
		d.attr("button-county", "true");
		d3.selectAll(".county, .township").style("display", "initial").raise();

		$("#buttonCounty").removeClass("controlButtonNotselected")
	}

	d3.select("[id='" + clicked + "']").classed("selectedState", true).raise();
	refreshLabelsPath();
}

function updateContestText() {
	if($("#data").attr("button-pollclosing") == "true"){return}
	var data = $("#data");
	var contest = data.attr("button-contest"), year = data.attr("button-year"), state = data.attr("data-stateclick");
	var contestSuffix = data.attr("button-contest-suffix"), clicked = data.attr("last-clicked");
	if(contestSuffix == null) {contestSuffix = ""} else {contestSuffix = " " + contestSuffix}

	var contestHeadings = {"DEM PRESIDENT":"democratic primaries","GOP PRESIDENT":"republican primaries"}
	if(clicked == "United States"){
 		$("#headingTextContest").html(null);
		if(year == "XXXX"){
			if (Object.keys(contestHeadings).includes(contest)) {
				var contestText = contestHeadings[contest], contestSuffix = "";
			}

			let a = contestText || contest;
		 	$("#headingTextTitle").text(a + contestSuffix)
		} else {
			$("#headingTextContest").text(year + ' ' + contest).css("display","flex")
			$("#headingTextTitle").text("United States");
		}
	} else {
		if((+year == "2016" || +year == "2020" || +year == "2024") && Object.keys(contestHeadings).includes(contest)) {
			let primText = {"p":"primary","c":"caucus","con":"convention"}, raceText = {"G":"R","D":"D"};
			let raceParty = raceText[contest.charAt(0).toUpperCase()];
			let d = delegates[year][raceParty][stateAbbreviation[state]]['type'];
			var contestText = contest.slice(0,3) + " " + primText[d];
			let a = contestText || contest;
		 	$("#headingTextContest").text(year + ' ' + a).css("display","flex")
		} else {
			$("#headingTextContest").text(year + ' ' + contest + contestSuffix).css("display","flex")
			scaleHeadingText();
		}
	}

	$('#buttonYear' + year)[0].scrollIntoViewIfNeeded();

	setElectoralVoteText(state);
}

function scaleText(i, maxWidth, o) {
	const oW = o || 1, eE = document.getElementById(i);
	const mW = document.body.clientWidth * maxWidth * oW, eW = eE.clientWidth;
	const eS = mW / eW, scale = Math.min(eS, oW);
	eE.style.transform = `scaleX(${scale})`;
}

function scaleTextFont(i, maxWidth, o) {
	const oW = o || 1, eE = document.getElementById(i);
	const mW = document.body.clientWidth * maxWidth * oW, eW = eE.clientWidth;
	const eS = mW / eW, scale = Math.min(eS, oW);
	eE.style.fontSize = `${scale * 5}vh`;
}

function scaleHeadingText() {
	var windowWidth = document.documentElement.clientWidth;
	var maxWidth = windowWidth * 0.75;

	var widthA = document.getElementById("headingTextContest").clientWidth;
	var widthB = document.getElementById("headingTextTitle").clientWidth;

	if(document.getElementById("headingTextTitle").innerHTML !== "United States"){
		var totalWidth = widthA + widthB;
		var scaleWidthB = (maxWidth - widthA) / widthB;
		if(maxWidth < totalWidth){var bWidth = scaleWidthB} else {var bWidth = 1}
 		document.getElementById("headingTextTitle").style.transform = `scaleX(${bWidth})`;
	} else {
		document.getElementById("headingTextTitle").style.transform = "scaleX(1)"
	}
	
}

function animateNumber(value, id, x) {
	var obj = document.getElementById(id);
	if (obj.innerHTML == numF.format(value)) {return}
	if (x !== true) {var start = 0}
	if (obj.innerHTML) {start = parseFloat(obj.innerHTML.replace(/,/g, ''))}
	var current = start, counter = 0, animCount = 7;
	var increment = (value - start) / 7;
	if (value == 0) {
		obj.innerHTML = 0
	} else {
		if (isNaN(increment)) {
			obj.innerHTML = obj.innerHTML = numF.format(value)
		} else {
			var timer = setInterval(updateNumber, 30);
			function updateNumber() {
				counter++;
				current += increment;
				obj.innerHTML = numF.format(Math.abs(Math.round(current)));
				if (counter === animCount || current === value) {
					clearInterval(timer)
				}
			}
		}
	}
}

function animateTotalNumber(value) {
	var obj = document.getElementById("resultsAhead");
	if (obj.innerHTML) {
		var startingValue = obj.innerHTML;
		var start = parseFloat(startingValue.replace(/,/g, '').replace(" VOTES", ""))
	} else {
		var start = 0
	}

	var current = start;
	var counter = 0;
	var increment = (value - start) / 7;
	var animCount = 7;

	if (isNaN(increment)) {
		obj.innerHTML = internationalNumberFormat.format(value) + " VOTES"
	} else {

		var timer = setInterval(function() {
			counter += 1;
			current += increment;
			obj.innerHTML = internationalNumberFormat.format(Math.abs(Math.round(current))) + " VOTES";
			if (counter == animCount || current == value) {
				clearInterval(timer);
			}
		}, 30)
	}
}

function animatePercent(value, id, anim) {
	var obj = document.getElementById(id);
	if (obj.innerHTML) {
		var startingValue = obj.innerHTML;
		var start = parseFloat(startingValue)
	} else {
		var start = 0
	}
	if(anim == true){start = value}
	var current = start;
	var counter = 0;
	var increment = (value - start) / 5;
	var animCount = 5;
	var timer = setInterval(function() {
		counter += 1;
		current += increment;
		obj.innerHTML = Math.abs(current).toFixed(1) + "<a1>%</a1>";
		if (counter == animCount || current == value) {
			clearInterval(timer)
		}
	}, 40);
}

function refreshPage() {location.reload()}

function findPointBetween(color1, color2, position) {
	var rgb1 = hexToRgb(color1); var rgb2 = hexToRgb(color2);

	var r = Math.round(rgb1.r + (position * (rgb2.r - rgb1.r)));
	var g = Math.round(rgb1.g + (position * (rgb2.g - rgb1.g)));
	var b = Math.round(rgb1.b + (position * (rgb2.b - rgb1.b)));
	return rgbToHex(r, g, b);
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
        r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
	} : null;
}

function rgbToHex(r, g, b) {return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)}
function componentToHex(c) {var hex = c.toString(16); return hex.length == 1 ? "0" + hex : hex;}

makeFlexContainerDraggable(document.getElementById("controlBarYear"));
makeFlexContainerDraggable(document.getElementById("controlBarContest"));

function makeFlexContainerDraggable(flexContainer) {
	let isDragging = false; let startY, scrollTop;

	flexContainer.addEventListener('mousedown', (e) => {
		isDragging = true;
		startY = e.pageY - flexContainer.offsetTop;
		scrollTop = flexContainer.scrollTop;
		flexContainer.style.scrollSnapType = "none";
	});

	flexContainer.addEventListener('mouseleave', () => {isDragging = false; flexContainer.style.scrollSnapType = "both";});
	flexContainer.addEventListener('mouseup', () => {isDragging = false;});

	flexContainer.addEventListener('mousewheel', function(event) {
		flexContainer.style.scrollSnapType = "both";
	});

	flexContainer.addEventListener('mousemove', (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const y = e.pageY - flexContainer.offsetTop;
		const walkY = y - startY;
		flexContainer.scrollTop = scrollTop - walkY;
	});
}

let clickStartTime;

var pathStatus = $("#data").attr("button-road270");

function setListeners() {

var statePaths = document.querySelectorAll('.mapTest .state');
statePaths.forEach(path => {
	path.addEventListener('mouseup', (event) => {
		const clickDuration = new Date().getTime() - clickStartTime;
  		if (clickDuration > 250) {event.preventDefault()} else {zoomToPath(path, 750)}});
});

var paths = document.getElementsByTagName('path'); var pathsLength = paths.length;
for (let i = 0; i < pathsLength; i++) {
	paths[i].addEventListener('click', function(event) {clickedFunction(event.target)}, false)}
}

function setListenersDrag() {
	var allPaths = document.querySelectorAll('#nationalMap path');
	allPaths.forEach(path => {
		path.addEventListener('mousedown', (event) => {
			clickStartTime = new Date().getTime();
			$("#data").attr("drag-status", "true")
		});
		path.addEventListener('mouseup', (event) => {
			const clickDuration = new Date().getTime() - clickStartTime;
			if (clickDuration > 250) {
				event.preventDefault();
				$("#data").attr("drag-status", "true")
			} else {
				$("#data").attr("drag-status", "false")
			}
		});
	});
}

function setListenersHouse() {
	var pathsCD = document.querySelectorAll('.mapTest.cd');
	pathsCD.forEach(path => {
		path.addEventListener('mouseup', (event) => {
			const clickDuration = new Date().getTime() - clickStartTime;
			if(clickDuration > 250) { event.preventDefault()} else {zoomToPath(path, 750)}
		});
	});
}

let previousViewBox = null;

function zoomToPath(path, t) {
	dur = t || 1000;
	zoomToBoundingBox(path, 0.39, 0.61, dur);
}

function zoomToState(s, t){
	dur = t || 750;
	const bbox = document.getElementById(s).getBBox();
	const dE = $("#data");
	const clicked = dE.attr("last-clicked");
	const selectedYear = dE.attr("button-year");
	const selectedContest = dE.attr("button-contest");
	const clickLevel = dE.attr("data-level");

	if(selectedContest == "STATE HOUSE" || selectedContest == "STATE SENATE"){
		if(clickLevel == "state"){
			zoomToBoundingBox(s,0,1,t);
			hideResults()
		} else {
			zoomToBoundingBox(s,.39,.61,t);
			showResults()
		}
	} else if(selectedContest == "HOUSE" && selectedYear == "2024"){
		if(dE.attr("button-houseGroups") == "true"){
			showResults()
			zoomToBoundingBox(s, .39, .365, t);
		} else {
			zoomToBoundingBox(s,.39,.61, t);
			showResults()
		}
	} else {
		if(selectedContest !== "PRESIDENT BY CD"){
			showResults()
	//	var aB = d3.selectAll(".historyPanel").filter((_, i, a) => d3.select(a[i]).style("display") !== "none").size();
			zoomToBoundingBox(s, 0.39, 0.61, t);
		} else {
			hideResults()
			if(clickLevel == "state"){
				zoomToBoundingBox(s, 0, 1, t)
			} else {
				zoomToBoundingBox(s, 0.39, 0.61, t)
			}
		}
	}
}


function zoomToDistrict(a, t){
	zoomToState(document.getElementById(a).getAttribute('data-state'));
}

function zoomToGroup(p, t, zS, l, w) {
	dur = t || 1000; scale = zS || 0.925;
	var left = l || 0.39, wW = w || 0.61;
	if(left + wW > 1) {wW = 1 - left};
	if(left + wW > 0.955){var rPad = (wW - 0.045) / wW} else {var rPad = 1}

	const paths = p.map(a => document.getElementById(a));

	var x = d3.min(paths, function(d) {return d.getBBox().x}),
		y = d3.min(paths, function(d) {return d.getBBox().y}),
		width = d3.max(paths, function(d) {var bb = d.getBBox(); return (bb.x + bb.width) - x}),
		height = d3.max(paths, function(d) {var bb = d.getBBox(); return (bb.y + bb.height) - y});

	const x0 = x, y0 = y, x1 = x0 + width, y1 = y0 + height;

	d3.select("#nationalMap").transition().duration(dur).call(
		zoom.transform, d3.zoomIdentity
		.translate(svgWidth * (0.5 * wW * rPad + left), 400)
		.scale(scale / Math.max((x1 - x0) / (svgWidth * wW * rPad), (y1 - y0) / 800))
		.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
	);
}

function reset(t) {
	dur = t || 1000;
	const d = $("#data");
	const cl = d.attr("last-clicked"), y = d.attr("button-year"), c = d.attr("button-contest");
	var l, w = 1, z = null;
	if(d.attr("button-resultsTotalPanel") == "true"){l = 0.39; w -= 0.39} else {l = 0}

	if(c == "HOUSE" && y == "2024" && cl == "United States" && d.attr("button-houseGroups") == "true"){
	w -= 0.245; z=0.975} else {w = 1}
	
	resetBox(l,w,dur,z);
	return;

	if(c == "HOUSE" && y == "2024" && cl == "United States" && d.attr("button-houseGroups") == "true"){
		resetBox(0,0.755,dur,0.975);
	} else {
		resetBox(0,1,dur);
	}
}

function initialReset() {
	resetBox(0,100,1)
}

function areAllChildrenEmpty(element) {
  for (var i = 0; i < element.children.length; i++) {
    if (element.children[i].innerHTML.trim() !== '') {
      return false; // If any child is not empty, return false
    }
  }
  return true; // If all children are empty, return true
}

function zoomToBoundingBox(s, left, width, t, z) {
	dur = t || 1000; scale = z || 0.925;
	if(left + width > 1) {width = 1 - left};
	if(left + width > 0.955){rPad = (width - 0.045) / width} else {rPad = 1}
	const bbox = document.getElementById(s).getBBox();
	const x0 = bbox.x, y0 = bbox.y, x1 = x0 + bbox.width, y1 = y0 + bbox.height;

	let tPad = 1;
	if(document.getElementById('mapLabelFilter').innerHTML !== ""){tPad = 76.5/83.5}
	if(document.getElementById('mapLabelStat').innerHTML !== ""){tPad = 72/83.5}

	d3.select("#nationalMap").transition().duration(dur).call(
		zoom.transform,d3.zoomIdentity
		.translate(svgWidth * (0.5 * width * rPad + left), (400*tPad) + (400 * (1-0.5)))
		.scale(scale / Math.max((x1 - x0) / (svgWidth * width * rPad), (y1 - y0) / (800*tPad)))
		.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
	);
}

function resetBox(left, width, t, z, y) {
//	console.log("l: " + left + ", w: " + width)
	dur = t || 1000;
	scale = z || 0.925;
	if(left + width > 1) {width = 1 - left}
	if(left + width > 0.955 && y !== 0){var rPad = (width - 0.045) / width} else {var rPad = 1}

	let tPad = 1;
	if(document.getElementById('mapLabelFilter').innerHTML !== ""){tPad = 76.5/83.5}
	if(document.getElementById('mapLabelStat').innerHTML !== ""){tPad = 72/83.5}

	d3.select("#nationalMap").transition().duration(dur).call(
		zoom.transform, d3.zoomIdentity
		.translate(svgWidth * (0.5 * width * rPad + left), 800-400*tPad)
		.scale(scale / Math.max(1350.56298828125 / (svgWidth * width * rPad), 0.9243587493896485/tPad))
		.translate(-811.302490234375, -399.94849967956543)
	);
}

function setPointLabels(state) {
  	clearPointLabels();
	svg.selectAll('.label[data-state="' + state + '"]')
		.style('display', 'block')
        	.style('opacity', '1')
		.raise();
}

function establishPointLabels() {
	const labelAnchor = {"L":"end","T":"middle","B":"middle","R":"start"};
	document.querySelectorAll('.labelText').forEach(a => {
		a.style.textAnchor = labelAnchor[a.getAttribute('data-label_pos')]
	})
	document.querySelectorAll('.label').forEach(a => {
		a.style.display = "none"
	})
}

function opacityCountyLabel(i) {
	$('.labelText').css('opacity', i)
}

function clearPointLabels() {
	document.querySelectorAll('.label').forEach(a => {
		a.style.display = "none"
  	})
}

function sortObjectAndGetKeys(o) {
	return Object.keys(o)
		.map(k => [k, o[k]])
		.sort((a, b) => b[1] - a[1])
		.map(p => p[0]);
}

function createPollClosingArrays() {
	var pC = {}, t = document.getElementById("controlBarPollClosings");
	var times = ["7:00", "7:30", "8:00", "8:30", "9:00", "10:00", "11:00", "12:00", "1:00"];

	for (var a in pollClosingTimes) {
		let v = pollClosingTimes[a]; if (pC[v]) {pC[v].push(a)} else {pC[v] = [a]}
	}

	window.pollClosings = pC;

	var buttons = times.map(function(d) {
		return `<span id="buttonPollClosing-${d.replace(":", "")}" class="pollClosingButton">${d}</span>`;
	}).join("");

	$("#controlBarPollClosings").append(buttons);
	$(".pollClosingButton").on("click", clickPollClosingHour);

	$("<span></span>")
		.addClass("controlButton")
		.css("margin-top", "1vh")
		.on("click", nextPollClosingHour)
		.html("NEXT")
		.appendTo("#controlBarPollClosings")
}

function clickPollClosingHour(input) {
	var b = document.getElementById(this.getAttribute('id')).innerHTML;
	const [hours, minutes] = b.split(':'), hour = +hours + +minutes / 60;

	if(hour == 12 || hour == 1){var pm = "am"} else if(hour % 1 == 0){var pm = "pm"} else {var pm = ":30"}

	$('#headingTextPollClosingHour').html(+hours);
	$('#headingTextPollClosingPM').html(pm); $('#headingTextPollClosingET').html('ET');
	$('#headingElectoralVotesText').html("ELEC. VOTES<br>AT STAKE");
	colorPollClosingHour(hour); setTime()
}

function startPollClosingHour() {
	var lastClicked = $("#data").attr("last-clicked"), pm, startHour;
	if(pollClosingTimes[lastClicked]){startHour = pollClosingTimes[lastClicked]} else {startHour = findNextTime()};

//	$("#headingTextContest").css("display", "none");
	$("#data").attr("poll-closinghour", startHour);

	$('#headingTextPollClosing span').css("display","flex");

	setPollClosingHeadingText(startHour);

	returnHome();
	setTimeout(function(){colorPollClosingHour(startHour)}, 50);

	$("#headingElectoralVotesText").html("ELEC. VOTES<br>AT STAKE");
	$("#headingElectoralVotes span").css("opacity", "1");
	$(".county").css('fill', 'rgb(107, 112, 123)');
}

function setPollClosingHeadingText(startHour){
	if(startHour == 12 || startHour == 1){pm = "am"} else if(startHour % 1 == 0){pm = "pm"} else {pm = ":30"}
	$("#headingTextContest").css("display", "none");
	$('#headingTextPollClosing span').css("display","flex");

	$('#headingTextPollClosingHour').html(+Math.floor(startHour));
	$('#headingTextPollClosingPM').html(pm);
	$('#headingTextPollClosingET').html("ET");
}

function colorPollClosingHour(input, trans) {
	var s = Object.keys(pollClosingTimes), sCl = pollClosings[input] || pollClosings['7'], sCt = sCl.length;
	$("#data").attr("poll-closinghour", input);	

	let size, parentDiv = d3.select('#boxPollClosingStates');

	if (sCt < 5) {size = "small"} else if (sCt >= 5 && sCt < 9) {size = "medium"} else {size = "large"}
	parentDiv.attr('class', size).selectAll('*').remove();

	var eVT = 0;
	for (let i = 0; i < s.length; i++) {
		var tS = s[i], tE = document.getElementById(tS); tE.classList = "state";
		var tW = data_president[tS]['24']['w'], wC = {"d":"blue","r":"red"}; 
		if (sCl.includes(tS)) {
			var eV = electoralVotes[tS]['2024']; eVT += eV;
			tS = tS.replace(/trict/g, "t");
			var nE = d3.select("#boxPollClosingStates").append('span').text(tS);
				if(tW){
					d3.select(`[id='${tS}']`)
						.attr("class", "state " + wC[tW] + "State")
						.style("fill", "")

					nE.attr('class', wC[tW]);
				} else {
					$(`[id='${tS}']`).css("fill", "rgb(250,188,14)")
				}
		} else {
			tE.style.fill = "rgb(107, 112, 123)";
		}
	}

	animateNumber(eVT,'headingElectoralVotesNumber')
	function z(a,b,c){zoomToGroup(a,b,c)}
	switch (input) {
		case 7: if (trans !== 1) {z(['Vermont','Kentucky','Georgia'])} break;
		case 7.5: z(['Ohio','North Carolina']); break;
		case 8: z(['Oklahoma','Florida','Maine']); break;
		case 8.5: z(['Arkansas'],1000,0.7); break;
		case 9: z(['New York','Texas','North Dakota','Arizona']); break;
		case 10: z(['Nevada','Montana','Utah']); break;
		case 11: z(['California','Idaho','Washington']); break;
		case 12: z(['Hawaii'],1000,0.7); break;
		case 1: z(['Alaska'],1000,0.7); break;
		default: z(['Vermont','Kentucky','Georgia']); break;
	}
}

function nextPollClosingHour() {
	const nextPollClosingTimes = {6:"7:00",7:"7:30",7.5:"8:00",8:"8:30",8.5:"9:00",9:"10:00",10:"11:00",11:"12:00",12:"1:00"};

	var lastClicked = $("#data").attr("poll-closinghour");
	var startHour = nextPollClosingTimes[lastClicked];
	var [hours, minutes] = startHour.split(':'); const hour = +hours + +minutes / 60;

	$("#data").attr("poll-closinghour", hour);
	setTime();

	let pm; if(hour == 12 || hours == 1){pm = "am"} else if(minutes == "00"){pm = "pm"} else {pm = ":30"}

	setInnerHTML('headingTextPollClosingHour', hours);
	setInnerHTML('headingTextPollClosingPM', pm);
	colorPollClosingHour(hour);
}

var pathData = "";
function clickPen() {
	var isDrawing = false;
	var drawButton = document.getElementById("buttonDraw");
	var nMap = d3.select("#nationalMap #mainG");
	if(drawButton.classList.contains('controlButtonNotselected')){
		d3.select("#nationalMap").on("mousedown.zoom", null)
		document.getElementById("nationalMap").style.pointerEvents = "painted";
		$("#data").attr("button-draw", "true");
		var path = d3.select('#pathDrawn');
		nMap.on("pointerdown", function() {
			d3.select("#nationalMap").on("mousedown.zoom", null)
			if (isDrawing == false) {
				isDrawing = true;
				pathData += `M${d3.pointer(event)[0].toFixed(1)},${d3.pointer(event)[1].toFixed(1)}`;
//				path.attr("d", pathData);
			} else {
				pathData += ` M${d3.pointer(event)[0].toFixed(1)},${d3.pointer(event)[1].toFixed(1)}`;
//				path.attr("d", pathData);
    			}

			document.getElementById("clearDraw").classList.add('visible');

			nMap.on("pointermove", function() {
				if (isDrawing == true) {
					if (pathData == ""){
	        				pathData = `M${d3.pointer(event)[0].toFixed(1)},${d3.pointer(event)[1].toFixed(1)}`;
        					path.attr("d", pathData);
					} else {
		        			pathData += ` L${d3.pointer(event)[0].toFixed(1)},${d3.pointer(event)[1].toFixed(1)}`;
        					path.attr("d", pathData);
					}
				}
			});
		});

		nMap.on("pointerup", function() {
			isDrawing = false; pathData += ' ';
        		path.attr("d", pathData);
		});

		nMap.on("mouseleave", function() {
			isDrawing = false; pathData += ` `;
        		path.attr("d", pathData);
		});
	} else {
		isDrawing = false;
		$("#data").attr("button-draw", "false");
		nMap.on("pointerdown", null);
		nMap.on("pointermove", null);
		nMap.on("pointerup", null)
		document.getElementById("nationalMap").style.pointerEvents = "none";
		d3.select("#nationalMap").call(zoom);
	};
	
	drawButton.classList.toggle('controlButtonNotselected');
	document.getElementById("drawIcon").classList.toggle('selected');
}

function clearDrawing() {
	isDrawing = false;
	$("#data").attr("button-draw", "false");
	d3.select("#nationalMap").call(zoom);
	var nMap = d3.select("#nationalMap #mainG");
		nMap.on("pointerdown", null);
		nMap.on("pointermove", null);
		nMap.on("pointerup", null)
	document.getElementById("pathDrawn").setAttribute("d", "");
	pathData = "";
	document.getElementById("clearDraw").classList.remove('visible');
	document.getElementById("drawIcon").classList.remove('selected');
	document.getElementById("buttonDraw").classList.add('controlButtonNotselected');
	document.getElementById("nationalMap").style.pointerEvents = "none";
}

function generateDistrictGroups() {
	const parentDiv = d3.select('#resultsHouseGroups');
	parentDiv.selectAll('*').remove();
	const yrShort = $('#data').attr('button-year').slice(-2);

	document.querySelectorAll(`.cd:not(.cd${yrShort})`).forEach(function(el) {
		const a = el.getAttribute('data-district');
		el.setAttribute('id', `${yrShort}_${a}`);
		el.style.display = 'none';
	});

	d3.selectAll(`.cd.cd${yrShort}`).attr('id', function() {
		let thisCD = d3.select(this).attr('id');
		if(thisCD.includes('_')) {
			thisCD = thisCD.slice(thisCD.indexOf('_') + 1);
		}

		const cdSplit = thisCD.split('-');
		const newElement = parentDiv.append('span')
			.attr('data-district-state', abbreviationState[cdSplit[0]])
			.attr('data-district', thisCD)
			.attr('id', `box-${thisCD}`)
			.html(`${cdSplit[0]} <hd>${cdSplit[1]}</hd>`)
			.style('order', function() {
				var o = `${abbreviationFIPS[cdSplit[0]]}${cdSplit[1]}`
				return o
			})
			.classed('districtBox', true);
	});

	const clicked = $('#data').attr('last-clicked');
	const stateClicked = $('#data').attr('data-stateclick');
	if(stateClicked && stateClicked !== 'United States') {
		if(!clicked.includes('-')) {
			d3.select(`[id='${stateClicked}']`).raise();
		}
		$('.districtBox:not([data-district-state=' + stateClicked + '])').css('display', 'none');
		$('.districtBox[data-district-state=' + stateClicked + ']').css('display', 'initial');
	}

	$('.districtBox').on('click', function() {
		clickDistrictBox($(this).attr('id').substring(4, 9));
	});
}


function generateDistrictBoxes() {
	var parentDiv = document.getElementById('resultsBoxHouseDistricts');

	$('#resultsBoxHouseDistricts').empty();

	var yrShort = $("#data").attr("button-year").slice(-2).toString();

	$('.cd:not(.cd' + yrShort + ')').each(function() {
		var a = $(this).attr("data-district");
		$(this).attr("id", yrShort + "_" + a).css("display", "none");
	});

	var yrShort = $("#data").attr("button-year").slice(-2).toString();
	var cdDistricts = document.querySelectorAll(`.cd.cd${yrShort}`);
	var cdThisYear = Array.from(cdDistricts).map(element => element.id);

	cdThisYear.forEach((cd, i) => {
		let thisCD; if(cd.includes("_")) {thisCD = cd.slice(cd.indexOf("_") + 1)} else {thisCD = cd}

		var cdSplit = thisCD.split("-"), textContent = `${cdSplit[0]} <hd>${cdSplit[1]}</hd>`;
		var order = (abbreviationFIPS[cdSplit[0]]).toString() + cdSplit[1].toString();

		var newElement = d3.select(parentDiv)
			.append('span')
			.attr('data-district-state', abbreviationState[cdSplit[0]])
			.attr('data-district', thisCD)
			.attr('id', "box-" + thisCD)
			.html(textContent)
			.style('order', order)
			.attr("class", "districtBox");
	});

	var clicked = $("#data").attr("last-clicked"), stateClicked = $("#data").attr("data-stateclick");
	if(stateClicked && stateClicked !== "United States") {
		if(!clicked.includes("-")) {d3.select("[id='" + stateClicked + "']").raise()}
		$(`.districtBox:not([data-district-state="${stateClicked}"])`).css("display", "none");
		$(`.districtBox[data-district-state="${stateClicked}"]`).css('display', 'initial');
	}

	$('.districtBox').on('click', function() {
		clickDistrictBox($(this).attr('id').substring(4, 9));
	});
}

function generateHouseGroupBoxes(){
	var houseGroups = {
	"DEM TARGETS":["AL-02", "AZ-01", "AZ-06", "CA-03", "CA-13", "CA-22", "CA-27", "CA-40", "CA-41", "CA-45", "CO-03", "FL-02", "FL-13", "IA-03", "MI-10", "NE-02", "NJ-07", "NY-01", "NY-03", "NY-04", "NY-17", "NY-19", "NY-22", "OR-05", "PA-10", "TX-15", "VA-02", "WI-03", "MT-01", "LA-06"],
	"GOP TARGETS":["AK-01", "CA-47", "CO-08", "FL-23", "IL-17", "IN-01", "ME-02", "MI-07", "MI-08", "MN-02", "NC-01", "NC-06", "NC-13", "NC-14", "NM-02", "NV-03", "NY-18", "OH-09", "OH-13", "PA-07", "PA-08", "PA-17", "TX-34", "VA-07", "WA-03"],
	"DEM REACH":["MO-02", "NY-02", "FL-05", "IA-02", "WI-01", "SC-01", "PA-01", "NC-11", "IA-01", "FL-27", "CO-05"],
	"GOP REACH":["TX-28", "VA-10", "NJ-03", "KS-03", "FL-09", "CA-49", "CA-09", "RI-02", "MD-06", "OR-04", "NH-02", "MI-03", "NV-01", "NV-04", "CT-05", "NH-01", "WA-08", "OH-01", "OR-06"],
	"":[]
	}

	Object.entries(houseGroups).forEach(([a, b]) => {houseGroups[a] = [...new Set(b)].sort()})

	var div = document.getElementById('resultsHouseGroups');
	Object.keys(houseGroups).forEach(function(a) {
		let span = document.createElement('span');
		span.textContent = a;
		span.classList.add('header');
		div.appendChild(span);

    		houseGroups[a].forEach(function(b) {
	        	let c = b.split("-");
        		var span2 = document.createElement('span');
		        span2.id = "groupBox-" + b;
        		span2.innerHTML = c[0] + " <hd>" + c[1] + "</hd>";
		        span2.classList.add('cdBox', 'cdGroupBoxPollsClosed');
	        	span2.setAttribute('data-district', b);
	        	span2.addEventListener('click', function() {
				clickDistrictBox(this.getAttribute('data-district'));
	        	})
			div.appendChild(span2);
		})
	})
}

function reorderDistrictBox() {
	return;
	const year = $("#data").attr("button-year");
	var reporting = 0, racesCalled = 0, gain = 0;
	var clicked = $("#data").attr("last-clicked"), stateClicked = d3.select("#data").attr("data-stateclick");

	var districtBoxes;
	if (clicked == "United States") {
		districtBoxes = d3.selectAll(".districtBox")
	} else {
		districtBoxes = d3.selectAll(`.districtBox[data-district-state="${stateClicked}"]`);
	}

	const cdCount = districtBoxes.size();
	districtBoxes.each(function() {
		const thisDB = d3.select(this); const thisCD = thisDB.attr('data-district'); var cdSplit = thisCD.split("-");

		var cdData = data_house[year + "-" + thisCD];
		if (!cdData) {
			var order = +`${abbreviationFIPS[cdSplit[0]]}${cdSplit[1]}`;
			thisDB.style('order', 30000 + order);
		} else if (cdData['winner'] !== "" && cdData['winner'] !== "tie" && cdData['winner'] !== "runoff") {
			var order = +`${abbreviationFIPS[cdSplit[0]]}${cdSplit[1]}`;
			thisDB.style('order', 20000 + order);
			racesCalled++;
		} else if (cdData['total_vote'] > 0) {
			var order = +`${abbreviationFIPS[cdSplit[0]]}${cdSplit[1]}`;
			thisDB.style('order', order);
			reporting++;
		} else if (cdData) {
			var order = +`${abbreviationFIPS[cdSplit[0]]}${cdSplit[1]}`;
			thisDB.style('order', 40000 + order);
		}
	});

	var parentDiv = d3.select('#resultsBoxHouseDistricts');
	parentDiv.selectAll('.districtHeading').remove();

/*
	if ((racesCalled + reporting) < cdCount) {
		parentDiv.append('span')
		.html("AWAITING RESULTS: " + (cdCount - racesCalled - reporting))
		.style('order', 29999)
		.classed('districtHeading', true);
	}

	if (reporting > 0) {
		parentDiv.append('span')
		.html("TOO EARLY TO CALL: " + reporting)
		.style('order', 0)
		.classed('districtHeading', true);
	}

	if (racesCalled > 0 && racesCalled !== cdCount) {
  		parentDiv.append('span')
		.html("RACES CALLED: " + racesCalled)
		.style('order', 19999)
		.classed('districtHeading', true);
	}
*/
}

function clickDistrictBox(district){
	var selectedYear = $("#data").attr("button-year");
	var districtE = document.getElementById(district), districtNumber = +district.substring(3,5);
	var state = districtE.getAttribute('data-state'), stateE = document.getElementById(state);

	$("#data")
		.attr("last-clicked", district)
		.attr("data-level", "county")
		.attr("data-stateclick", state)
		.attr("data-state", state)
		.attr("data-stateabbreviation", districtE.getAttribute("data-stateabbreviation"));

	if($("#data").attr("last-clicked") == "United States"){updateContestText();}
	$('#headingTextTitle').text(state);
	$('#resultsBoxTopText').text("District " + districtNumber);

	zoomToDistrict(district);

	$("#resultsBoxHouse").addClass("hidden");
	$(".selectedCounty").removeClass("selectedCounty");
	$(".cd").addClass("notSelectedState");

	d3.selectAll(".state").classed("notSelectedState", true).lower().classed("selectedState", false);

//	if(selectedYear !== "2024"){
		d3.selectAll(".districtBox:not([data-district-state='"+ state +"'])").style("display", "none");
		d3.selectAll(".districtBox[data-district-state='"+ state +"']").style("display", "initial");
//	} else {
		// d3.select("#headingTextContest").text(year + ' ' + contest);
//	}

	d3.select(stateE).classed("selectedState", true);

	d3.select(districtE)
		.raise()
		.classed("notSelectedState", false)
		.classed("selectedCounty", true);

	getResults(); setPointLabels(state);
	$("#buttonHistory").css("display", (+selectedYear >= 2006) ? "flex" : "none");
	if($("#data").attr("button-history") == "true") {updateHistory()}
	showResults();
}

function refreshLabelsPath() {
	d3.selectAll(".label").raise();
	d3.select("#pathDrawn").raise();
}

function createEVBoxes() {
	if(d3.select("#data").attr("button-road270") == "true") {
		d3.select("#Maine").on('mousedown', (event) => {
			var districtTimer = setTimeout(() => {
				$("#data").attr("button-draw", "true");
				d3.select("#electoralVoteMaine").classed("visible", true);
				d3.select("#electoralVoteNebraska").classed("visible", false);
				d3.select("#Maine").classed("evBoxState", true);
				d3.select("#Nebraska")
					.raise()
					.classed("evBoxState", false);
			}, 1250);
			d3.select("#Maine").on('mouseup', (event) => {
				clearTimeout(districtTimer);
			});
		});
	}

	d3.select("#evMaineHeading").on('click', (event) => {
		d3.select("#electoralVoteMaine").classed("visible", false);
		d3.select("#electoralVoteNebraska").classed("visible", false);
		d3.select("#Maine").classed("evBoxState", false);
		d3.select("#Nebraska").classed("evBoxState", false);
		$("#data").attr("button-draw", "false");
	});

	d3.select("#Nebraska").on('mousedown', (event) => {
		if(d3.select("#data").attr("button-road270") == "true") {
			var districtTimer = setTimeout(() => {
				d3.select("#electoralVoteNebraska").classed("visible", true);
				d3.select("#Nebraska").classed("evBoxState", true);
				d3.select("#electoralVoteMaine").classed("visible", false);
				d3.select("#Maine").classed("evBoxState", false);
				dataElement.setAttribute("button-draw", "true");
			}, 1250);
			d3.select("#Nebraska").on('mouseup', (event) => {
				clearTimeout(districtTimer);
			});
		}
	});

	d3.select("#evNebraskaHeading").on('click', (event) => {
		d3.select("#electoralVoteMaine").classed("visible", false);
		d3.select("#electoralVoteNebraska").classed("visible", false);
		d3.select("#Maine").classed("evBoxState", false);
		d3.select("#Nebraska").classed("evBoxState", false);
		dataElement.setAttribute("button-draw", "false");
	});
}

var electoralVotesMap = {};

const buttonsParty = document.getElementsByClassName("partyButton");
for (let i = 0; i < buttonsParty.length; i++) {buttonsParty[i].addEventListener('click', click270Party, false)}

$("#button270-clear").on('click', function(event) {
	electoralVotesMap = {};
	$(".state").attr("class", "state");
	calculateElectoralVoteMap();
});

document.getElementById("button270-proj").addEventListener('click', (event) => {
	electoralVotesMap = {};
	d3.selectAll(".state")
		.attr("class", "state")
		.each(function() {
			const tS = d3.select(this).attr("id");
			const tW = data_president[tS]['24']['w'];
			if (tW) {electoralVotesMap[tS] = tW}
  		});

	calculateElectoralVoteMap();
});

document.getElementById("button270-2020").addEventListener('click', (event) => {
	electoralVotesMap = {};
	d3.selectAll(".state")
		.each(function() {
			const tS = d3.select(this).attr("id");
			const tW = data_president[tS]['20']['w'];
			if (tW) {electoralVotesMap[tS] = tW}
  		});
	calculateElectoralVoteMap();
});

document.getElementById("button270-2016").addEventListener('click', (event) => {
	electoralVotesMap = {};
	d3.selectAll(".state")
		.each(function() {
			const tS = d3.select(this).attr("id");
			const tW = data_president[tS]['16']['w'];
			if (tW) {electoralVotesMap[tS] = tW}
  		});

	calculateElectoralVoteMap();
});

document.getElementById("button270-safe").addEventListener('click', (event) => {
	electoralVotesMap = {"Alabama":"r","Alaska":"r","Arkansas":"r","California":"d","Colorado":"d","Connecticut":"d","Delaware":"d","District of Columbia":"d","Hawaii":"d","Idaho":"r","Illinois":"d","Indiana":"r","Kansas":"r","Kentucky":"r","Louisiana":"r","Maine":"d","Maryland":"d","Massachusetts":"d","Mississippi":"r","Missouri":"r","Montana":"r","Nebraska":"r","New Mexico":"d","New Jersey":"d","New York":"d","North Dakota":"r","Oklahoma":"r","Oregon":"d","Rhode Island":"d","South Carolina":"r","South Dakota":"r","Tennessee":"r","Utah":"r","Vermont":"d","Virginia":"d","Washington":"d","West Virginia":"r","Wyoming":"r","Arizona":"","Nevada":"","Texas":"","Florida":"","Georgia":"","North Carolina":"","Pennsylvania":"","New Hampshire":"","Ohio":"","Iowa":"r","Michigan":"","Wisconsin":"","Minnesota":""}
	calculateElectoralVoteMap();
});

function updateRoadMapProjections() {
	var sY = $("#data").attr("button-year").slice(-2).toString(), cV = {"d":0,"r":0};
	let a = Array.from($(".state"), a => a.id);
	a.map((b) => {
		let tSa = data_president[b][sY];
		if(tSa){
			let eV = tSa['ev'];
			Object.keys(eV).forEach(c => {let e = eV[c]; if(e>0){cV[c] = (cV[c] || 0) + e}});
		}
	});
	data_president['United States'][sY]['ev'] = cV;

	d3.selectAll(".state").each(function() {
 		const thisElement = d3.select(this), thisState = thisElement.attr('id');
		const thisWinner = data_president[thisState]['24']['w'];
		if (thisWinner && thisWinner !== "") {electoralVotesMap[thisState] = thisWinner;}
		if (thisElement.style('fill')) {thisElement.style('fill', '')}
	});

	calculateElectoralVoteMap();
}

function click270Party() {
	var thisID = this.getAttribute('id'); var thisParty = this.getAttribute('data-party');
	$("#data").attr("data-road270-party", thisParty);

	for (let i = 0; i < buttonsParty.length; i++) {buttonsParty[i].classList = "partyButton"}
	document.getElementById(thisID).classList = "partyButton clicked";
}

function select270Party(input) {
	$("#data").attr("data-road270-party", input);
	for (let i = 0; i < buttonsParty.length; i++) {buttonsParty[i].classList = "partyButton"}
	document.getElementById("button270-party-" + input).classList = "partyButton clicked";
}

function resetElectoralVoteMap() {
	electoralVotesMap = {};
	d3.selectAll(".state")
		.attr("class", "state")
		.each(function() {
			const tS = d3.select(this).attr("id");
			const tW = data_president[tS]['24']['w'];
			if (tW) {electoralVotesMap[tS] = tW}
  		});

	calculateElectoralVoteMap();
}

function addElectoralVoteMap(s, p) {electoralVotesMap[s] = p; calculateElectoralVoteMap()}

function calculateElectoralVoteMap() {
	var winnerClass = {"d":"blue","r":"red"}; var demCount = 0, gopCount = 0;
	var evMap = Object.keys(electoralVotesMap);
	for (let i = 0; i < evMap.length; i++) {
		var thisState = evMap[i]; var winner = electoralVotesMap[thisState];
		document.getElementById(thisState).classList = "state " + winnerClass[winner] + "State";

		var thisEV = electoralVotes[thisState]['2024'];
		if(winner == "d"){demCount += thisEV}; if(winner == "r"){gopCount += thisEV};
	}

	var demProg = ((1-Math.min(1,demCount/270))*100), gopProg = ((1-Math.min(1,gopCount/270))*100);

	$("#tallyCandidateTotalLeft")
		.css("margin-top", demCount > 135 ? "1vh" : "-11.5vh")
		.css("top", `${demProg}%`);

	$("#tallyCandidateTotalRight")
		.css("margin-top", gopCount > 135 ? "1vh" : "-11.5vh")
		.css("top", `${gopProg}%`);

	$("#tallyCandidateTotalLeftLabel")
		.css("margin-top", demCount > 135 ? "8vh" : "-4.5vh")
		.css("top", `${demProg}%`);

	$("#tallyCandidateTotalRightLabel")
		.css("margin-top", gopCount > 135 ? "8vh" : "-4.5vh")
		.css("top", `${gopProg}%`);

	if(demCount >= 270){
//		d3.select("#tallyCandidateDemWin").raise();
		$("#tallyCandidatesTextBox")
			.html(presCand['2024']['d'][1] + " <cnnL>Wins</cnnL>")
			.css("color","#fff")
			.css("background-color","rgb(12,103,159)")
	} else if(gopCount >= 270){
//		d3.select("#tallyCandidateGopWin").raise();
		$("#tallyCandidatesTextBox")
			.html(presCand['2024']['r'][1] + " <cnnL>Wins</cnnL>")
			.css("color","#fff")
			.css("background-color","rgb(121, 22, 30)")
	} else if(gopCount == 269 && demCount == 269){
		$("#tallyCandidatesTextBox")
			.html("<cnnM>Electoral College Tie</cnnM>")
			.css("color","var(--titleText)")
			.css("background-color","var(--projYellow)")
	} else {
		$("#tallyCandidatesTextBox")
			.html("270 Votes <cnnL>to Win</cnnL>")
			.css("color","var(--titleText)")
			.css("background-color","var(--projYellow)")
	}

	d3.select("#tallyCandidateDemWin").classed("show", demCount >= 270);
	d3.select("#tallyCandidateGopWin").classed("show", gopCount >= 270);

	d3.select("#tallyCandidatesBoxLeft").classed("winner", demCount >= 270);
	d3.select("#tallyCandidatesBoxRight").classed("winner", gopCount >= 270);

	d3.select("#tallyCandidatesBarLeft").style("clip-path", `inset(${demProg}% 0 0 0)`);
  	d3.select("#tallyCandidatesBarRight").style("clip-path", `inset(${gopProg}% 0 0 0)`);

  	animateNumber(demCount, "tallyCandidateTotalLeft", true);
  	animateNumber(gopCount, "tallyCandidateTotalRight", true);
}

function togglePresidentVotes() {}

function setTime() {
	var pollHour = +$("#data").attr("poll-closinghour"), tTime = [0, 0, 0];
	switch(true) {
		case pollHour < 12 && pollHour > 1:
			tTime[0] = Math.floor(+pollHour) + 12;
			if(pollHour % 1 !== 0) {tTime[1] = 30}
			break;
		case pollHour == 12: tTime[0] = 0; break;
		case pollHour == 1: tTime[0] = 1; break;
	}

	const a = moment.tz('America/New_York'), b = a.clone().set({hour: tTime[0], minute: tTime[1], second: 0});
	var d = b.diff(a);
	if(d > -10000 && d < -3000) {
		nextPollClosingHour();
		document.getElementById("boxPollClosingHeading").innerHTML = "";
		return;
	}
	if(d < 0 && d > -15000) {d = 0}
	var [h,m,s] = moment.utc(d).format('H:mm:ss').split(":");
	let y = h >= 12 ? null : (h == 0 ? `${m}:${s}` : `${h}:${m}:${s}`);

	document.getElementById("boxPollClosingHeading").innerHTML = y;
}

var timestampClock;
function startTimestamps() {
	clearInterval(timestampClock);
	setTime();
	const nSec = 1000 - (new Date).getMilliseconds();
	setTimeout(function() {timestampClock = setInterval(setTime, 1000)}, nSec);
}

function importData() {importMSData()}

function importElectionData(){
importDDHQ("https://data.ddhq.io/25396","2024");
importDDHQ("https://data.ddhq.io/25397","2024");
importDDHQ("https://data.ddhq.io/25401","2024");
importDDHQ("https://data.ddhq.io/25402","2024");
importDDHQ("https://data.ddhq.io/25403","2024");
importDDHQ("https://data.ddhq.io/25404","2024");
importDDHQ("https://data.ddhq.io/25405","2024");
importDDHQ("https://data.ddhq.io/25406","2024");
importDDHQ("https://data.ddhq.io/25407","2024");
importDDHQ("https://data.ddhq.io/25408","2024");
importDDHQ("https://data.ddhq.io/25409","2024");
importDDHQ("https://data.ddhq.io/25411","2024");
importDDHQ("https://data.ddhq.io/25412","2024");
importDDHQ("https://data.ddhq.io/25413","2024");
importDDHQ("https://data.ddhq.io/25414","2024");
importDDHQ("https://data.ddhq.io/25415","2024");
importDDHQ("https://data.ddhq.io/25416","2024");
importDDHQ("https://data.ddhq.io/25417","2024");
importDDHQ("https://data.ddhq.io/25418","2024");
importDDHQ("https://data.ddhq.io/25419","2024");
importDDHQ("https://data.ddhq.io/25420","2024");
importDDHQ("https://data.ddhq.io/25421","2024");
importDDHQ("https://data.ddhq.io/25422","2024");
importDDHQ("https://data.ddhq.io/25423","2024");
importDDHQ("https://data.ddhq.io/25424","2024");
importDDHQ("https://data.ddhq.io/25425","2024");
importDDHQ("https://data.ddhq.io/25426","2024");
importDDHQ("https://data.ddhq.io/25427","2024");
importDDHQ("https://data.ddhq.io/25428","2024");
importDDHQ("https://data.ddhq.io/25429","2024");
importDDHQ("https://data.ddhq.io/25430","2024");
importDDHQ("https://data.ddhq.io/25431","2024");
importDDHQ("https://data.ddhq.io/25432","2024");
importDDHQ("https://data.ddhq.io/25433","2024");
importDDHQ("https://data.ddhq.io/25434","2024");
importDDHQ("https://data.ddhq.io/25435","2024");
importDDHQ("https://data.ddhq.io/25436","2024");
importDDHQ("https://data.ddhq.io/25437","2024");
importDDHQ("https://data.ddhq.io/25438","2024");
importDDHQ("https://data.ddhq.io/25439","2024");
importDDHQ("https://data.ddhq.io/25440","2024");
importDDHQ("https://data.ddhq.io/25441","2024");
importDDHQ("https://data.ddhq.io/26026","2024");
importDDHQ("https://data.ddhq.io/26027","2024");
importDDHQ("https://data.ddhq.io/26028","2024");
importDDHQ("https://data.ddhq.io/26029","2024");
importDDHQ("https://data.ddhq.io/26030","2024");
importDDHQ("https://data.ddhq.io/26031","2024");
importDDHQ("https://data.ddhq.io/26032","2024");
importDDHQ("https://data.ddhq.io/26033","2024");
importDDHQ("https://data.ddhq.io/26034","2024");
importDDHQ("https://data.ddhq.io/26035","2024");
importDDHQ("https://data.ddhq.io/26036","2024");
importDDHQ("https://data.ddhq.io/26037","2024");
importDDHQ("https://data.ddhq.io/26038","2024");
importDDHQ("https://data.ddhq.io/26039","2024");
importDDHQ("https://data.ddhq.io/26040","2024");
importDDHQ("https://data.ddhq.io/26041","2024");
importDDHQ("https://data.ddhq.io/26042","2024");
importDDHQ("https://data.ddhq.io/26043","2024");
importDDHQ("https://data.ddhq.io/26044","2024");
importDDHQ("https://data.ddhq.io/26045","2024");
importDDHQ("https://data.ddhq.io/26046","2024");
importDDHQ("https://data.ddhq.io/26047","2024");
importDDHQ("https://data.ddhq.io/26048","2024");
importDDHQ("https://data.ddhq.io/26049","2024");
importDDHQ("https://data.ddhq.io/26050","2024");
importDDHQ("https://data.ddhq.io/26051","2024");
importDDHQ("https://data.ddhq.io/26054","2024");
importDDHQ("https://data.ddhq.io/26055","2024");
importDDHQ("https://data.ddhq.io/26056","2024");
importDDHQ("https://data.ddhq.io/26057","2024");
importDDHQ("https://data.ddhq.io/26058","2024");
importDDHQ("https://data.ddhq.io/26059","2024");
importDDHQ("https://data.ddhq.io/26060","2024");
importDDHQ("https://data.ddhq.io/26061","2024");
importDDHQ("https://data.ddhq.io/26062","2024");
importDDHQ("https://data.ddhq.io/26052","2024");
importDDHQ("https://data.ddhq.io/26053","2024");
importDDHQ("https://data.ddhq.io/26064","2024");
importDDHQ("https://data.ddhq.io/26065","2024");
importDDHQ("https://data.ddhq.io/26066","2024");
importDDHQ("https://data.ddhq.io/26067","2024");
importDDHQ("https://data.ddhq.io/26068","2024");
importDDHQ("https://data.ddhq.io/26069","2024");
importDDHQ("https://data.ddhq.io/26070","2024");
importDDHQ("https://data.ddhq.io/26071","2024");
importDDHQ("https://data.ddhq.io/26073","2024");
importDDHQ("https://data.ddhq.io/26074","2024");
importDDHQ("https://data.ddhq.io/26075","2024");
importDDHQ("https://data.ddhq.io/26077","2024");
importDDHQ("https://data.ddhq.io/26076","2024");
importDDHQ("https://data.ddhq.io/26078","2024");
importDDHQ("https://data.ddhq.io/26072","2024");
importDDHQ("https://data.ddhq.io/26079","2024");
importDDHQ("https://data.ddhq.io/26080","2024");
importDDHQ("https://data.ddhq.io/26081","2024");
importDDHQ("https://data.ddhq.io/26063","2024");
importDDHQ("https://data.ddhq.io/26082","2024");
importDDHQ("https://data.ddhq.io/26083","2024");
importDDHQ("https://data.ddhq.io/26084","2024");
}

function importElectionDataOld(){
	importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2023-11-07/results-mississippi.json', "2023");
	importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2023-11-07/results-virginia.json', "2023");
	importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2023-11-07/results-kentucky.json', "2023");

	importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2024-01-15/results-iowa-caucus.json", "2024")
	importNYTimes("https://static01.nyt.com/elections-assets/pages/data/2024-02-03/results-south-carolina-democratic-primary.json", "2024")

//	importDDHQ("https://data.ddhq.io/24420","2023");
//	importDDHQ("https://data.ddhq.io/24421","2023");
//	importDDHQ("https://data.ddhq.io/24422","2023");
	importDDHQ("https://data.ddhq.io/24427","2023");
	importDDHQ("https://data.ddhq.io/24429","2023");
	importDDHQ("https://data.ddhq.io/24442","2023");
//	importDDHQ("https://data.ddhq.io/24460","2023");
//	importDDHQ("https://data.ddhq.io/25649","2024");
//	importDDHQ("https://data.ddhq.io/24461","2023");

//	importDDHQ("https://data.ddhq.io/24462","2023");
//	importDDHQ("https://data.ddhq.io/24463","2023");

	if(data_gov['2023-Kentucky'].winner == "r"){data_gov['2023-Kentucky'].gain = 1}
	if(data_gov['2023-Mississippi'].winner == "d"){data_gov['2023-Mississippi'].gain = 1}
	if(data_sos['2023-Kentucky'].winner == "d"){data_sos['2023-Kentucky'].gain = 1}
	if(data_sos['2023-Mississippi'].winner == "d"){data_sos['2023-Mississippi'].gain = 1}
//	if(data_attorney_general['2023-Kentucky'].winner == "d"){data_attorney_general['2023-Kentucky'].gain = 1}
//	if(data_attorney_general['2023-Mississippi'].winner == "d"){data_attorney_general['2023-Mississippi'].gain = 1}
}

function importMSData(){
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2023-08-08/results-mississippi.json', "2023");
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-massachusetts-secretary-of-state.json',"2022");

importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2023-10-14/results-louisiana.json',"2023");
importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2022-06-28/results-colorado.json", "2022");
importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2022-05-17/results-pennsylvania.json", "2022");
importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2022-05-17/results-north-carolina.json", "2022");
importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2022-05-17/results-kentucky.json", "2022");
importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2022-05-17/results-oregon.json", "2022");
importNYTimes("https://static01.nyt.com/elections-assets/2022/data/2022-05-17/results-idaho.json", "2022");
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-delaware.json',"2022");
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-connecticut-secretary-of-state.json',"2022");
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-vermont-secretary-of-state.json',"2022");
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-rhode-island-secretary-of-state.json', "2022");

importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2023-08-08/results-mississippi.json', "2023");
// importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-connecticut-us-senate.json', "2022");
importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-connecticut-governor.json', "2022");
// importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-maine-governor.json', "2022");
// importNYTimes('https://static01.nyt.com/elections-assets/2022/data/2022-11-08/results-house.json', "2022");

}

var presidentRepParties = {
	"trump":{"p":"r10","fN":"donald","lN":"trump"},
//	"desantis":{"p":"z","fN":"ron","lN":"desantis"},
	"haley":{"p":"r2","fN":"nikki","lN":"haley"},
//	"ramaswamy":{"p":"z","fN":"vivek","lN":"ramaswamy"},
//	"hutchinson":{"p":"z","fN":"asa","lN":"hutchinson"},
	"uncommitted":{"p":"u","fN":"","lN":"uncommitted"},
	"total write-ins":{"p":"o","fN":"total","lN":"write-ins"}
};

var presidentDemParties = {
	"biden":{"p":"d","fN":"joe","lN":"biden","i":true},
	"unprocessed write-ins":{"p":"o","fN":"","lN":"unprocessed<br>write-ins"},
	"other write-ins":{"p":"o","fN":"","lN":"other<br>write-ins"},
	"williamson":{"p":"d1","fN":"marianne","lN":"williamson"},
	"phillips":{"p":"d2","fN":"dean","lN":"phillips"},
	"uncommitted":{"p":"u","fN":"","lN":"uncommitted"}
};

function importNYTimes(url, year, forceUpdate) {
	const generalElectionContests = {
		"President": data_president,
		"U.S. House": data_house,
		"U.S. Senate": data_sen,
		"Governor": data_gov,
		"Secretary of State": data_sos,
		"Supreme Court": data_supreme_court,
		"Ballot Measure": data_ballot,
		"Lieutenant Governor": data_gov_lt,
		"Attorney General": data_attorney_general,
		"State House": data_state_house,
		"House of Delegates": data_state_house,
		"State Assembly": data_state_house,
		"State Senate": data_state_senate,
		"Issue": data_ballot_abortion
	};

	const demElectionContests = { "President": data_president_dem, "U.S. Senate": data_sen_dem, "Governor": data_gov_dem, "Secretary of State": data_sos_dem, "Lieutenant Governor": data_gov_lt_dem, "U.S. House": data_house_dem };
	const repElectionContests = { "President": data_president_rep, "U.S. Senate": data_sen_rep, "Governor": data_gov_rep, "Secretary of State": data_sos_rep, "Lieutenant Governor": data_gov_lt_rep, "U.S. House": data_house_rep };

	fetch(`${url}?timestamp=` + Date.now())
		.then((response) => response.json())
		.then((data) => {
			var races = data.races;
			for(let i = 0; i < races.length; i++) {
				var contests = {}, candidates = {}, tRace = races[i], tRaceCand = tRace.candidate_metadata;

				var electionOffice = tRace.office, electionType = tRace.type;
				if(electionType == "General") {
					if(generalElectionContests.hasOwnProperty(electionOffice)) {
						var dataFile = generalElectionContests[electionOffice];
					} else {
						continue;
					}
				} else if(electionType == "Primary" || electionType == "Caucus") {
					if(tRace.party) {
						var electionParty = tRace.party.abbreviation.substring(0, 3).toLowerCase();

						if(demElectionContests.hasOwnProperty(electionOffice)) {
							if(electionParty == "dem") {
								var dataFile = demElectionContests[electionOffice];
							}
							if(electionParty == "rep") {
								var dataFile = repElectionContests[electionOffice];
							}
						} else {
							continue;
						}
					}
				} else if (electionType == "Open Primary") {
					if(demElectionContests.hasOwnProperty(electionOffice)) {
						var dataFile = demElectionContests[electionOffice]
					} else {
						continue
					}
            			}

				if(electionParty == "rep" && electionOffice == "President"){
					for(let i = 0; i < Object.keys(tRaceCand).length; i++) {
							var thisCand = tRaceCand[Object.keys(tRaceCand)[i]];
							var tCLN = thisCand.last_name.toLowerCase();
							var tId = thisCand['nyt_id'];
							candidates[tId] = {};
						if (presidentRepParties.hasOwnProperty(tCLN)) {
							candidates[tId].fN = presidentRepParties[tCLN]['fN'] || "";
							candidates[tId].lN = presidentRepParties[tCLN]['lN'] || "";
							candidates[tId].p = presidentRepParties[tCLN]['p'] || "o";
							candidates[tId].i = presidentRepParties[tCLN]['i'] || "";
						} else {
							candidates[tId].fN = thisCand.first_name || "";
							candidates[tId].lN = thisCand.last_name || "";
							candidates[tId].p = "o"
						}
						if(thisCand.incumbent == true) {candidates[tId].i = true}
					}
				} else if(electionParty == "dem" && electionOffice == "President"){
					for(let i = 0; i < Object.keys(tRaceCand).length; i++) {
							var thisCand = tRaceCand[Object.keys(tRaceCand)[i]];
							var tCLN = thisCand.last_name.toLowerCase();
							var tId = thisCand['nyt_id'];
							candidates[tId] = {};
						if (presidentDemParties.hasOwnProperty(tCLN)) {
							candidates[tId].fN = presidentDemParties[tCLN]['fN'] || "";
							candidates[tId].lN = presidentDemParties[tCLN]['lN'] || "";
							candidates[tId].p = presidentDemParties[tCLN]['p'] || "o";
							candidates[tId].i = presidentDemParties[tCLN]['i'] || "";
						} else {
							candidates[tId].fN = thisCand.first_name || "";
							candidates[tId].lN = thisCand.last_name || "";
							candidates[tId].p = "o"
						}
					 	if(thisCand.incumbent == true) {candidates[tId].i = true}
					}
				} else {

				for(let key in tRaceCand) {
					var partyNumber = 1;
					var thisCandParty = tRaceCand[key].party.abbreviation.charAt(0).toLowerCase();

					for(var cand in candidates) {
						if(candidates[cand].p == thisCandParty) {
							partyNumber++;
							var thisCandParty = tRaceCand[key].party.abbreviation.charAt(0).toLowerCase() + partyNumber;
						}
					}

					candidates[key] = {};
					let lN = tRaceCand[key].last_name;
					if(tRaceCand[key].incumbent == true){candidates[key].inc = true;}
					candidates[key].fN = tRaceCand[key].first_name;
					candidates[key].lN = lN;
					if(tRaceCand[key].last_name == "No" || tRaceCand[key].last_name == "Yes") {
						var thisCandParty = tRaceCand[key].last_name.toLowerCase()
					}
					candidates[key].p = thisCandParty;
				}
				}

				var rUnits = tRace.reporting_units;
				for(let j = 0; j < rUnits.length; j++) {
					var tRP = rUnits[j], tRPCand = tRP.candidates, thisResultData = {}, tO = tRace.office;
				let elec = ['House of Delegates','U.S. House','State House','State Senate','State Assembly'];
					if (elec.includes(tO)){
						if(tRace.office == "U.S. House"){
							var tDistrict = tRace.seat.replace(/\D/g, '').padStart(2, '0');
						} else {
							tDistrict = tRace.seat_number.padStart(3, '0');
						}
					var tResult = year + "-" + tRP.state_postal + "-" + tDistrict;
					} else {
					if(tRP.fips_county !== null) {
						if(tRP.fips_suffix !== null) {
							var tResult = year + "-" + +tRP.fips_state + tRP.fips_county + tRP.fips_suffix;
						} else {
							var tResult = year + "-" + +tRP.fips_state + tRP.fips_county;
						}
					} else {
						var tResult = year + "-" + tRP.name;
					}
					}

					thisResultData.source = "nyt";
					thisResultData.reporting = Math.round(tRP.eevp) || 0;
					thisResultData.total_vote = tRP.total_votes || 0;
					thisResultData.expected_vote = tRP.total_expected_vote || 0;
					if(tRace.updated_at){thisResultData.last_updated = tRace.updated_at || ""}

					for(let k = 0; k < tRPCand.length; k++) {
						var tRPCandidate = tRPCand[k];
						var tRPCandID = tRPCand[k]['nyt_id']; var tRPCandVote = tRPCandidate.votes.total;

						thisResultData['cand' + (k+1) + '_firstname'] = candidates[tRPCandID].fN || "";
						thisResultData['cand' + (k+1) + '_lastname'] = candidates[tRPCandID].lN || "";
						thisResultData['cand' + (k+1) + '_party'] = candidates[tRPCandID].p
						if(candidates[tRPCandID].i == true){thisResultData['incumbent'] = 'cand' + (k+1)}
						thisResultData['cand' + (k+1) + '_vote'] = tRPCandidate.votes.total;

						if(tRP.fips_county !== null && tRPCandidate.leader == true) {
							thisResultData.winner = candidates[tRPCandID].p
						}
						if(tRP.fips_county == null && tRace.uncontested == true && tRPCand.length == 1){
							thisResultData.winner = candidates[tRPCandID].p
						}
					}

					if(!thisResultData.winner && thisResultData.total_vote == 0) {thisResultData.winner = ""}
					if(tRP.fips_county == null) {
						if(tRace['outcome']['won'].length > 0) {
							thisResultData.winner = candidates[tRace['outcome']['won'][0]]['p'];

						}
						if(tRace['outcome']['gained'] == true) {thisResultData.gain = 1}
						if(tRace['outcome']['advanced_to_runoff'].length > 0) {
							thisResultData.winner = "runoff"
						}

						
						if(tRace['outcome']['winner_accepted_at'].length > 0){
							if(dataFile[tResult]){
								if(dataFile[tResult].calls == undefined){
									var o = {"nyt": tRace['outcome']['winner_accepted_at']}
								} else {
									var o = dataFile[tResult].calls;
									o['nyt'] = tRace['outcome']['winner_accepted_at'];
								}
							} else {
								var o = {"nyt": tRace['outcome']['winner_accepted_at']}
							}
							thisResultData['calls'] = o;
						}

					}
					
					dataFile[tResult] = thisResultData;
					data_import[tResult] = thisResultData;

				}
			}
			getResults();
			refreshFill();
		})
}

function importDDHQ(url, year, update) {
	const generalElectionContests = {
		"President": data_president,
		"US House": data_house,
		"US Senate": data_sen,
		"Governor": data_gov,
		"Secretary of State": data_sos,
		"Supreme Court": data_supreme_court,
		"State Supreme Court": data_supreme_court,
		"Ballot Question": data_ballot_abortion,
		"Superior Court": data_superior_court,
		"Ballot Measure": data_ballot,
		"Lt Governor": data_gov_lt,
		"State House": data_state_house,
		"State Senate": data_state_senate,
		"Attorney General": data_attorney_general
	};

	const demElectionContests = { "President": data_president_dem, "U.S. Senate": data_sen_dem, "Governor": data_gov_dem, "Secretary of State": data_sos_dem, "Lt Governor": data_gov_lt_dem, "U.S. House": data_house_dem };
	const repElectionContests = { "President": data_president_rep, "U.S. Senate": data_sen_rep, "Governor": data_gov_rep, "Secretary of State": data_sos_rep, "Lt Governor": data_gov_lt_rep, "U.S. House": data_house_rep };

	fetch(`${url}?timestamp=` + Date.now())
		.then((response) => response.json())
		.then((data) => {
			if(data['test_data'] == "true"){return};
			var candidates = {}, tRaceCand = data.candidates;

			var electionOffice = data.office, electionType = data.name, electionParty = data.party;
			if(electionType == "General Election") {
				var dataFile = generalElectionContests[electionOffice];
			} else if(electionType == "Ballot Question") {
				var dataFile = generalElectionContests[electionType];
			} else if((electionType == "Caucus" || electionType == "Primary") && electionOffice == "President") {
				if(electionParty == "Democratic"){var dataFile = demElectionContests.President} else 
				if(electionParty == "Republican"){var dataFile = repElectionContests.President}
			} else {
				return
			}

			if(electionParty == "Democratic" && electionOffice == "President"){
				for(let i = 0; i < tRaceCand.length; i++) {
					var thisCand = tRaceCand[i], tCLN = tRaceCand[i].last_name.toLowerCase();
					candidates[thisCand.cand_id] = {};
					
					if (presidentDemParties.hasOwnProperty(tCLN)) {
						candidates[thisCand.cand_id].fN = presidentDemParties[tCLN]['fN'] || "";
						candidates[thisCand.cand_id].lN = presidentDemParties[tCLN]['lN'] || "";
						candidates[thisCand.cand_id].p = presidentDemParties[tCLN]['p']
					} else {
						candidates[thisCand.cand_id].fN = tRaceCand[i].first_name.trim() || "";
						candidates[thisCand.cand_id].lN = tRaceCand[i].last_name.trim() || "";
						candidates[thisCand.cand_id].p = "o"
					}
					if(thisCand.incumbent == true) {candidates[thisCand.cand_id].i = true;}
				}
			} else if(electionParty == "Republican" && electionOffice == "President"){
				for(let i = 0; i < tRaceCand.length; i++) {
					var thisCand = tRaceCand[i], tCLN = tRaceCand[i].last_name.toLowerCase();
					candidates[thisCand.cand_id] = {};
					
					if (presidentRepParties.hasOwnProperty(tCLN)) {
						candidates[thisCand.cand_id].fN = presidentRepParties[tCLN]['fN'] || "";
						candidates[thisCand.cand_id].lN = presidentRepParties[tCLN]['lN'] || "";
						candidates[thisCand.cand_id].p = presidentRepParties[tCLN]['p']
					} else {
						candidates[thisCand.cand_id].fN = tRaceCand[i].first_name.trim() || "";
						candidates[thisCand.cand_id].lN = tRaceCand[i].last_name.trim() || "";
						candidates[thisCand.cand_id].p = "o"
					}
					if(thisCand.incumbent == true) {candidates[thisCand.cand_id].i = true;}
				}
			} else {
				for(let i = 0; i < tRaceCand.length; i++) {
					var thisCand = tRaceCand[i], partyNumber = 0;
					var thisCandParty = tRaceCand[i].party_name.charAt(0).toLowerCase();
					if(thisCandParty == "r") { partyNumber = 1 }
					for(var cand in candidates) {
						if(candidates[cand].p == thisCandParty) {
							partyNumber++;
							var thisCandParty = tRaceCand[i].party_name.charAt(0)
								.toLowerCase() + partyNumber;
						}
					}
					candidates[thisCand.cand_id] = {};
					candidates[thisCand.cand_id].fN = tRaceCand[i].first_name.trim() || "";
					candidates[thisCand.cand_id].lN = tRaceCand[i].last_name.trim() || "";
					if(thisCand.last_name == "No" || thisCand.last_name == "Yes") {
						var thisCandParty = thisCand.last_name.toLowerCase()
					}

					if(thisCand.incumbent == true) {candidates[thisCand.cand_id].i = true;}
					candidates[thisCand.cand_id].p = thisCandParty;
				}
			}

			var stateWide = data.topline_results;

			var tRPCand = Object.keys(stateWide.votes);
			var thisResultData = {};
			var tResult = year + "-" + data.state_name;
			var thisWinner = stateWide.called_candidates[0];

			thisResultData.expected_vote = stateWide.estimated_votes.estimated_votes_mid || 0;
			var biggestVote = 0;
			var totalVote = Object.values(stateWide.votes).reduce((e, t) => e + t, 0)
			for(let k = 0; k < tRPCand.length; k++) {
				let tRPCandID = tRPCand[k], tRPCandVote = stateWide.votes[tRPCandID], c = "cand"+(k+1);
				thisResultData[c + '_firstname'] = candidates[tRPCandID].fN.trim() || "";
				thisResultData[c + '_lastname'] = candidates[tRPCandID].lN.trim() || "";
				thisResultData[c + '_party'] = candidates[tRPCandID].p
				thisResultData[c + '_vote'] = tRPCandVote;
				if(candidates[tRPCandID].i == true){thisResultData['incumbent'] = c}
			}

			if(thisWinner){thisResultData.winner = candidates[thisWinner].p} else {thisResultData.winner = ""}
			let tReport =  Math.round(totalVote*100 / stateWide.estimated_votes.estimated_votes_mid, 0) || 0;
			thisResultData.reporting = tReport;
			if(thisResultData.reporting > 100){thisResultData.reporting = 100}
			thisResultData.total_vote = totalVote;

			if(data.expected_winners > 1){thisResultData['winnersCount'] = data.expected_winners}
			/* if(stateWide['call_times'].length > 0){
				if(dataFile[tResult]){
					if(dataFile[tResult].calls == undefined){
						var o = {"ddhq": stateWide.call_times[0].called_time}
					} else {
						var o = {"ddhq": stateWide.call_times[0].called_time};
					}
				} else {
					var o = {"ddhq": stateWide.call_times[0].called_time}
					
				}
				thisResultData['calls'] = o;
			} */

			if(data['advance_candidates'] == "true"){
					thisResultData.winner = "runoff";
				if(stateWide.advancing_candidates.length > 0){
					let o = [], i = stateWide['advancing_candidates'];
					i.forEach(a => {o.push(candidates[a].p)})
					thisResultData['advance_cand'] = o;
					thisResultData.winner = "runoff";
				}
			}

			thisResultData['source'] = "ddhq";
			thisResultData['last_updated'] = data.last_updated;
	
			dataFile[tResult] = thisResultData;

			var rUnits = data.counties;

			for(let j = 0; j < rUnits.length; j++) {
				var tRP = rUnits[j], tRPCand = Object.keys(tRP.votes), countyFips = +tRP.fips;
				var thisResultData = {}, tResult = year + "-" + countyFips;

				if(tRP.hasOwnProperty("vcus")){
					var vcus = tRP['vcus'];
					for(let l = 0; l < vcus.length; l++) {
						var thisVcu = vcus[l], tVcuCand = Object.keys(thisVcu.votes);
						if(thisVcu['fips'].charAt(0) !== "0" && data.state_name == "New Hampshire"){
							var tVcuResult = year + "-" + townFipsNewHampshire[thisVcu.vcu];
						} else {
							var tVcuResult = year + "-" + countyFips + thisVcu.fips;
						}

						var thisVcuData = {};
						var expectedVote = thisVcu['estimated_votes']['estimated_votes_mid'];
						thisVcuData['expected_vote'] = expectedVote;

						var biggestVote = 0, leader = null;
						var totalVoteVcu = Object.values(thisVcu.votes).reduce((a,b) => a + b, 0)
						for(let k = 0; k < tVcuCand.length; k++) {
							let tRPCandidate = tVcuCand[k], tRPCandID = tVcuCand[k];
							let tRPCandVote = thisVcu.votes[tRPCandID];
							thisVcuData['cand'+(k+1)+'_firstname'] = candidates[tRPCandID].fN || "";
							thisVcuData['cand'+(k+1)+'_lastname'] = candidates[tRPCandID].lN || "";
							thisVcuData['cand' + (k+1) + '_party'] = candidates[tRPCandID].p
							thisVcuData['cand' + (k+1) + '_vote'] = tRPCandVote;
						}

						if(expectedVote > 0){
							let tReport = Math.round(totalVoteVcu*100/expectedVote, 0)
							thisVcuData.reporting = tReport || 0;
						}
						thisVcuData.total_vote = totalVoteVcu;
						dataFile[tVcuResult] = thisVcuData;
					}
				}
				thisResultData.expected_vote = tRP.estimated_votes.estimated_votes_mid || 0;
				var totalVote = Object.values(tRP.votes).reduce((a,b) => a + b, 0) || 0;

				for(let k = 0; k < tRPCand.length; k++) {
					var tRPCandidate = tRPCand[k], tRPCandID = tRPCand[k], tRPCandVote = tRP.votes[tRPCandID];
					thisResultData['cand' + (k+1) + '_firstname'] = candidates[tRPCandID].fN || "";
					thisResultData['cand' + (k+1) + '_lastname'] = candidates[tRPCandID].lN || "";
					thisResultData['cand' + (k+1) + '_party'] = candidates[tRPCandID].p
					thisResultData['cand' + (k+1) + '_vote'] = tRPCandVote;
				}
				thisResultData.reporting = Math.round(totalVote*100 / tRP.estimated_votes.estimated_votes_mid, 0);
				thisResultData.total_vote = totalVote;
				dataFile[tResult] = thisResultData;
			}

			if(update !== true){
				refreshFill();
				getResults();
			}
		})
}

var data_house_import = {}
function importDDHQHouse(url, year, update) {
	const generalElectionContests = {
		"US House": data_house
	};

	fetch(`${url}`)
		.then((response) => response.json())
		.then((root) => {
			console.log("IMPORTED");
			var total = root.data.length;
			var dataFile = data_house;

			for(let b = 0; b < total; b++) {
				var data = root['data'][b];
			var candidates = {}, tRaceCand = data.candidates;

			var electionOffice = data.office, electionType = data.name, electionParty = data.party;
			var partyChoices = ['d','r','i','d','o','gr'];
	
				for(let i = 0; i < tRaceCand.length; i++) {
					var thisCand = tRaceCand[i], partyNumber = 0;
					var thisCandParty = tRaceCand[i].party_name.charAt(0).toLowerCase();
					if(thisCandParty == "r") { partyNumber = 1 }
					for(var cand in candidates) {
						if(candidates[cand].p == thisCandParty) {
							partyNumber++;
							var thisCandParty = tRaceCand[i].party_name.charAt(0).toLowerCase() + partyNumber;						
							if(!partyChoices.includes(thisCandParty = tRaceCand[i].party_name.charAt(0))){thisCandParty = "o"}

						}
					}
					candidates[thisCand.cand_id] = {};
					candidates[thisCand.cand_id].fN = tRaceCand[i].first_name.trim() || "";
					candidates[thisCand.cand_id].lN = tRaceCand[i].last_name.trim() || "";
					if(thisCand.last_name == "No" || thisCand.last_name == "Yes") {
						var thisCandParty = thisCand.last_name.toLowerCase()
					}

					if(thisCand.incumbent == true) {candidates[thisCand.cand_id].i = true;}
					candidates[thisCand.cand_id].p = thisCandParty;
				}

			var stateWide = data.toplineResults;
			var tRPCand = Object.keys(stateWide.votes);
			var thisResultData = {};
			var cd = data.district;
			if(data.district == "At-Large" || data.district == "At-large"){cd = "01"}
			var tResult = "2024" + "-" + data.abb + "-" + String(cd).padStart(2, '0');
			var tResultCD = "2024" + "-" + data.abb + "-" + String(cd).padStart(2, '0');

			var thisWinner = stateWide.called_candidates[0];

			thisResultData.expected_vote = stateWide.estimated_votes.estimated_votes_mid || 0;
			var biggestVote = 0;
			var totalVote = Object.values(stateWide.votes).reduce((e, t) => e + t, 0)
			for(let k = 0; k < tRPCand.length; k++) {
				let tRPCandID = tRPCand[k], tRPCandVote = stateWide.votes[tRPCandID], c = "cand"+(k+1);
				thisResultData[c + '_firstname'] = candidates[tRPCandID].fN || "";
				thisResultData[c + '_lastname'] = candidates[tRPCandID].lN || "";
				thisResultData[c + '_party'] = candidates[tRPCandID].p
				thisResultData[c + '_vote'] = tRPCandVote;
				if(candidates[tRPCandID].i == true){thisResultData['incumbent'] = c}
			}

			if(thisWinner){
				thisResultData.winner = candidates[thisWinner].p
			} else if (thisResultData.winner == undefined){
				thisResultData.winner = ""
			}

			thisResultData.reporting = Math.round(totalVote*100 / stateWide.estimated_votes.estimated_votes_mid)
			if(thisResultData.reporting > 100){thisResultData.reporting = 100}
			thisResultData.total_vote = totalVote;

			if(data['advance_candidates'] == "true"){
					thisResultData.winner = "runoff";
				if(stateWide.advancing_candidates.length > 0){
					let o = [], i = stateWide['advancing_candidates'];
					i.forEach(a => {o.push(candidates[a].p)})
					thisResultData['advance_cand'] = o;
					thisResultData.winner = "runoff";
				}
			}

			thisResultData['last_updated'] = data.last_updated;
	
			dataFile[tResult] = thisResultData;
				data_house_import[tResult] = thisResultData;

			var rUnits = data.vcuResults.counties;
			for(let j = 0; j < rUnits.length; j++) {
				var tRP = rUnits[j], tRPCand = Object.keys(tRP.votes), countyFips = +tRP.fips;
				var thisResultData = {}, tResult = tResultCD + "-" + countyFips;

				if(tRP.hasOwnProperty("vcus")){
					var vcus = tRP['vcus'];
					for(let l = 0; l < vcus.length; l++) {
						var thisVcu = vcus[l], tVcuCand = Object.keys(thisVcu.votes);
						var thisVcuData = {}, tVcuResult = year + "-" + countyFips + thisVcu.fips;
						var expectedVote = thisVcu.estimated_votes.estimated_votes_mid || 0;
						thisVcuData.expected_vote = expectedVote;

						var biggestVote = 0, leader = null;
						var totalVoteVcu = Object.values(thisVcu.votes).reduce((a,b) => a + b, 0)
						for(let k = 0; k < tVcuCand.length; k++) {
							let tRPCandidate = tVcuCand[k];
							let tRPCandID = tVcuCand[k];
							let tRPCandVote = thisVcu.votes[tRPCandID];
							thisVcuData['cand'+(k+1)+'_firstname'] = candidates[tRPCandID].fN || "";
							thisVcuData['cand'+(k+1)+'_lastname'] = candidates[tRPCandID].lN || "";
							thisVcuData['cand' + (k+1) + '_party'] = candidates[tRPCandID].p
							thisVcuData['cand' + (k+1) + '_vote'] = tRPCandVote;
						}

						if(expectedVote > 0){
							thisVcuData.reporting = Math.round(totalVoteVcu*100/expectedVote, 0) || "";
						}
						thisVcuData.total_vote = totalVoteVcu;
						dataFile[tVcuResult] = thisVcuData;
					}
				}
				thisResultData.expected_vote = tRP.estimated_votes.estimated_votes_mid || 0;
				var totalVote = Object.values(tRP.votes).reduce((a,b) => a + b, 0) || 0;

				for(let k = 0; k < tRPCand.length; k++) {
					var tRPCandidate = tRPCand[k], tRPCandID = tRPCand[k], tRPCandVote = tRP.votes[tRPCandID];
					thisResultData['cand' + (k+1) + '_firstname'] = candidates[tRPCandID].fN || "";
					thisResultData['cand' + (k+1) + '_lastname'] = candidates[tRPCandID].lN || "";
					thisResultData['cand' + (k+1) + '_party'] = candidates[tRPCandID].p
					thisResultData['cand' + (k+1) + '_vote'] = tRPCandVote;
				}
				thisResultData.reporting = Math.round(totalVote*100 / tRP.estimated_votes.estimated_votes_mid, 0);
				thisResultData.total_vote = totalVote;
				dataFile[tResult] = thisResultData;
			}
			}
		})
		.catch((error) => {
 			console.log(error)
		});
}

function deleteDatabase(a){
	window.indexedDB.deleteDatabase(a);
}
function timeTesting() {



		let a = moment.tz("20240113", 'Australia/Melbourne').add(14, 'hours');
		b = a.clone().tz("Australia/Melbourne").add(24, 'minutes');
		console.log(diff = b.diff(a, 'hours', true))

}

function findNextTime() {
	const timeArray = ["19:00", "19:30", "20:00", "20:30", "21:00", "22:00", "23:00", "0:00", "1:00"];
	const now = moment.tz('America/New_York');
	const array = timeArray.map(time => {
		var timeMoment = moment.tz(time, 'HH:mm', 'America/New_York');
		timeMoment.set({year: now.year(), month: now.month(), date: now.date()});
		if(timeMoment.isBefore(now)) {timeMoment.add(1, 'day')}
		return timeMoment;
	});

	const nextTime = array.reduce((a, b) => {return a.isBefore(b) ? a : b}).format('h:m'), a = nextTime.split(':');
	return +a[0] + (+a[1]/60);
}

function createDatabase(){

	window.indexedDB.open("contests", 1);
	window.indexedDB.open("demographics", 1);
	window.indexedDB.open("election_context", 1);
	window.indexedDB.open("fundamentals", 1);

	let openRequest = window.indexedDB.open("results", 1);
	openRequest.onupgradeneeded = function() {
		let db = openRequest.result;
		let objectStores = ["president","president_by_cd","house","house_by_cd","senate"];
		objectStores.forEach((a) => {db.createObjectStore(a)});
		
	};
}

function createPresidentDB() {
	let openRequest = window.indexedDB.open("results", 1);
	openRequest.onsuccess = function() {
		let db = openRequest.result;
		let t = db.transaction(["president"], "readwrite");
		let oS = t.objectStore("president");

		var attrKeys = {"firstname": "fN", "lastname": "lN", "party": "p", "vote": "v", "total_vote" : "tV"};
		Object.keys(data_president).forEach(function(b) {
			var thisData = data_president[b], a = {};
			for(var k in thisData) {
				v = thisData[k];
				if(k.includes("cand")) {
					var p = k.split("_", 2), cand = p[0], attr = p[1], cN = cand.substr(-1);

					if(!a['c' + cN]) {a['c' + cN] = {}}
					attr = attrKeys[attr] || attr;
					a['c' + cN][attr] = v;
				} else {
					attr = attrKeys[attr] || attr;
					a[k] = v;
				}
			}

			oS.put(a,b);
		});

		t.oncomplete = function() {db.close()};
	};
}

function createIndexedDB() {
	let openRequest = window.indexedDB.open("results", 1);

	openRequest.onsuccess = function() {
		let db = openRequest.result;
		let t = db.transaction(["senate"], "readwrite");
		let oS = t.objectStore("senate");

		var attrKeys = {"firstname": "fN", "lastname": "lN", "party": "p", "vote": "v", "total_vote":"tV"}
		Object.keys(data_sen).forEach(function(b) {
			var thisData = data_sen[b], a = {};
			for(var k in thisData) {
				v = thisData[k];
				if(k.includes("cand")) {
					var p = k.split("_", 2), cand = p[0], attr = p[1], cN = cand.substr(-1);

					if(!a['c' + cN]) {a['c' + cN] = {}}
					attr = attrKeys[attr] || attr;
					a['c' + cN][attr] = v;
				} else {
					attr = attrKeys[attr] || attr;
					a[k] = v;
				}
			}

			oS.put(a,b);
		});

		t.oncomplete = function() {db.close()};
	};
}

function addResults(){}

function OLDgetOLDRecord(key) {
  let openRequest = window.indexedDB.open("results", 1);

  openRequest.onsuccess = function() {
    let db = openRequest.result;
    let transaction = db.transaction("senate", "readonly");
    let objectStore = transaction.objectStore("senate");
    let getRequest = objectStore.get(key);

    getRequest.onsuccess = function() {
      let data = getRequest.result;
      // Use the retrieved data here
      console.log(data);
    };

    getRequest.onerror = function() {
      console.error("Error getting data from the database");
    };

    transaction.oncomplete = function() {
      db.close();
    };
  };

  openRequest.onerror = function() {
    console.error("Error opening the database");
  };
}

function newTesting(){
	let a = Array.from($(".state"), a => a.id).sort();
	var evJSON = {};
	for(let i = 0; i < a.length; i++) {
		let eV = data_president[a[i]]['20']['ev'];
		Object.keys(eV).forEach(a => {
			evJSON[a] = (evJSON[a] || 0) + eV[a];
		});
	}
	console.log(evJSON);
}

function downloadURL(url) {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'testing.json';
			link.click();
			URL.revokeObjectURL(link.href);
		});
}

var data_import = {}
function downloadToJSON(i) {
	const blob = new Blob([JSON.stringify(i)], {type: 'application/json'});
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = i + '.json';
	link.click();
	URL.revokeObjectURL(link.href);
	link.remove();
}

function reorderBubbles() {
	d3.select('.bubble').raise();
	var stateClick = $("#data").attr("data-stateclick");
	$("#data").attr("data-bubbles", "show");
	var cScale = d3.zoomTransform(d3.select("#mainG").node()).k;

//	d3.selectAll('.countyBubble[data-state="' + stateClick + '"]')
	d3.selectAll('.countyBubble')
		.each(function() {
			let fips = d3.select(this).attr("fips");
			let radius = demographics[fips]['st'] || 0;

			let path = document.getElementById(fips)
			path.classList.remove("redState", "blueState", "orangeState", "indState", "rpState", "runoffState", "yesState", "noState", "noProjection", "rpState", "uState", "d1State", "d2State", "d3State", "d4State", "d5State", "d6State", "d7State", "d8State", "d9State", "d10State", "d11State", "r1State", "r2State", "r3State", "r4State", "r5State", "r6State", "r7State", "r8State", "r9State", "r10State", "r11State", "pollsClosed", "gopLead", "demLead", "indLead", "othLead", "tieState", "noContest", "othState");

			d3.select(this)
//				.attr("r", d3.max([0.1, radius * 8]))
				.attr("r", d3.max([0.1, Math.sqrt((18*radius) * (18/cScale))]))
//				.attr("r", d3.max([0.1, Math.sqrt((12* radius) * (15/cScale))]))
				.attr("data-radius", radius)
				.data([{fips: fips, radius: radius}])
				.style("display", "block")
//				.style("fill", function(d) {
//					let cScale = d3.scaleLinear().domain([0, 0.7]).range(["#F8F2FF", "#6A0D98"]);
//					return cScale(radius);
//				})

		})
		.sort(function(a, b) {
			return d3.descending(a.radius, b.radius);
		})

		.raise()
	refreshLabelsPath()
}

function refreshBubbles(){
	d3.select('.bubble').raise();
	var clicked = $("#data").attr("data-stateclick");
	d3.selectAll('.countyBubble[data-state="' + clicked + '"]').raise().style('display', 'initial');
	refreshLabelsPath()
}

function updatePresidentTownToCounty(){
	// let newStr = str.slice(0, -5);
	
	// LOOP THROUGH DATA PRESIDENT STATES

}

function clipTesting(){
  d3.json("assets/maps/outlines.topojson").then(function(topo) {
    var counties = topojson.feature(topo, topo.objects.counties).features
    
    d3.json("assets/maps/districts_current.topojson").then(function(topo2) {
      var allCongressionalDistricts = topojson.feature(topo2, topo2.objects.districts);
      
      // Apply the filter to get the specific congressional district
      var filteredCongressionalDistricts = allCongressionalDistricts.features;
      
      var partialOverlapCounties = findPartialOverlap(filteredCongressionalDistricts, counties);
      console.log(partialOverlapCounties);
    });
  });
}

function findOverlappingPaths() {

const selectedPath = d3.select("[id='" + "Alabama" + "']")
const cd24Elements = d3.selectAll(".cd24");

// Get the bounding box of the path
const pathBounds = selectedPath.node().getBBox();

// Filter the cd24 elements that are within the bounds of the selected path
const elementsWithinBounds = cd24Elements.filter(function() {
  const elementBounds = this.getBBox();
  return (
    elementBounds.x >= pathBounds.x &&
    elementBounds.x + elementBounds.width <= pathBounds.x + pathBounds.width &&
    elementBounds.y >= pathBounds.y &&
    elementBounds.y + elementBounds.height <= pathBounds.y + pathBounds.height
  );
});

// Return an array of ids of the elements within the bounds
const idsWithinBounds = elementsWithinBounds.nodes().map(element => element.id);

console.log(idsWithinBounds);
}

function test23(){
// Select the element with the id "Alabama"
const alabamaElement = document.getElementById('Alabama');

// Get the bounding box of the "Alabama" element
const alabamaBounds = alabamaElement.getBBox();

// Select all the paths
const paths = document.querySelectorAll('path');

// Iterate through each path and check for overlapping bounding boxes
const overlappingPaths = Array.from(paths).filter(path => {
  const pathBounds = path.getBBox();
  // Check for overlapping or partial overlapping bounding boxes
  return (
    pathBounds.x < alabamaBounds.x + alabamaBounds.width &&
    pathBounds.x + pathBounds.width > alabamaBounds.x &&
    pathBounds.y < alabamaBounds.y + alabamaBounds.height &&
    pathBounds.y + pathBounds.height > alabamaBounds.y
  );
});

// Get the ids of the overlapping paths
const overlappingPathIds = overlappingPaths.map(path => path.id);

console.log(overlappingPathIds);
}