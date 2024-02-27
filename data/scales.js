var scales = {
	"stat": {
		"margin": {
			"president": {
				"test": "thisState.t > 0",
				"rule": "let cV = tS.v, vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); if(tS.t == 0){0} else {Math.abs(vA[0] - vA[1]) / tS.t}",
				"prefix": "let tS = thisState, cV = tS.v, w = Object.keys(cV).filter(a => cV[a] !== undefined).sort((a, b) => cV[b] - cV[a])[0]; presCand[selectedYear][w][1] + ' +'",
				"format": ".2%",
//				"datapoint": "let tS = thisState, cV = tS.v, vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); if(thisState.t == 0){'-'} else {Math.abs(vA[0] - vA[1]) / tS.t}",
				"datapoint": "",
				"domain": [0, 0.25],
				"rangeRule": "let cV = tS.v, w = Object.keys(cV).filter(a => cV[a] !== undefined).sort((a, b) => cV[b] - cV[a])[0]; scales.stat.margin.president.rangeObj[w]",
				"rangeObj": {
					"d": ["#e6f2ff", "#0069d9"],
					"r": ["#ffe6e6", "#E00000"],
					"rp": ["#cfb3ff", "#6a29a3"],
					"gw": ["#ffebd9", "#FF7B00"],
					"u": ["#ffebd9", "#FF7B00"],
					"default": ["#ffffff", "#aaaaaa"]
				},
				"clamp": false,
				"continue": true
			},
			"president by cd": {
				"test": "tV > 0 && margin > 0 || margin == 0 && tV > 0",
				"rule": "let cV = tS.v, vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); if(tS.t == 0){0} else {Math.abs(vA[0] - vA[1]) / tS.t}",
				"domain": [0, 0.25],
				"rangeRule": "let cV = tS.v, w = Object.keys(cV).filter(a => cV[a] !== undefined).sort((a, b) => cV[b] - cV[a])[0]; scales.stat.margin.president.rangeObj[w]",
				"rangeObj": {
					"d": ["#e6f2ff", "#0069d9"],
					"r": ["#ffe6e6", "#E00000"],
					"rp": ["#cfb3ff", "#6a29a3"],
					"gw": ["#ffebd9", "#FF7B00"],
					"u": ["#ffebd9", "#FF7B00"],
					"default": ["#ffffff", "#aaaaaa"]
				},
				"clamp": false,
				"continue": true
			},
			"test": "thisUnit['total_vote'] > 0",
			"rule": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote']; cV[name] = tVote || 0;} var vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); var candA = Object.keys(cV).sort((a, b) => cV[b] - cV[a]).map(a => tU[a + '_party']).filter(a => a !== undefined); var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); var margin = Math.abs((vA[0]/ vT) - (vA[1]/ vT)); var rawMargin = (vA[0] - vA[1]) / vT; if(vT == 0 && candA.length > 1){margin = 0} if(candA.length == 1){margin = 1;} margin",
			"format": ".2%",
			"prefix": "let tU = dataResults; var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote']; cV[name] = tVote || 0;} var candA = Object.keys(cV).sort((a, b) => cV[b] - cV[a]).map(a => tU[a + '_lastname']).filter(a => a !== undefined); candA[0] + ' +' || ''",
//			"datapoint": "let tU = dataResults; var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote']; cV[name] = tVote || 0;} var vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); var candA = Object.keys(cV).sort((a, b) => cV[b] - cV[a]).map(a => tU[a + '_party']).filter(a => a !== undefined); var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); var margin = Math.abs((vA[0]/ vT) - (vA[1]/ vT)); var rawMargin = (vA[0] - vA[1]) / vT; if(vT == 0 && candA.length > 1){margin = 0} if(candA.length == 1){margin = 1;} margin",
			"datapoint": "",
			"domain": [0, 0.25],
			"rangeRule": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote']; cV[name] = tVote || 0;}; var w = Object.keys(cV).sort((a, b) => cV[b] - cV[a]).map(a => tU[a + '_party']).filter(a => a !== undefined)[0]; scales.stat.margin.rangeObj[w]",
			"rangeObj": {
				"d": ["#e6f2ff", "#0069d9"],
				"r": ["#ffe6e6", "#E00000"],
				"rp": ["#cfb3ff", "#6a29a3"],
				"gw": ["#ffebd9", "#FF7B00"],
				"u": ["#ffebd9", "#FF7B00"],
				"o": ["#DEDEDE", "#808080"],
				"i": ["#cfb3ff", "#6a29a3"],
				"yes": ["#fde5ce", "#e66f00"],
				"no": ["#e5cefd", "#4b1683"],
				"default": ["#ffffff", "#aaaaaa"]
			},
			"clamp": false,
			"continue": true
		},
		"leadState": {
			"president": {
				"test": "data_president[thisIndex][previousYears[shortYear]] !== undefined",
				"rule": "let tS = thisState, swState, sC = -3; if(/\\d/.test(thisIndex) == false){swState = 'United States'} else {if(thisIndex.length > 5){sC = -8}; swState = fipsState[thisIndex.slice(0, sC)];} let sI = data_president[swState]; let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t']; let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r']; (DV-RV)/TV-(DVS-RVS)/TVS",
				"datapoint": "let tS = thisState, swState, sC = -3; if(/\\d/.test(thisIndex) == false){swState = 'United States'} else {if(thisIndex.length > 5){sC = -8}; swState = fipsState[thisIndex.slice(0, sC)];} let sI = data_president[swState]; let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t']; let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r']; Math.abs((DV-RV)/TV-(DVS-RVS)/TVS)",
				"prefix": "let tS = thisState, swState, sC = -3; if(/\\d/.test(thisIndex) == false){swState = 'United States'} else {if(thisIndex.length > 5){sC = -8}; swState = fipsState[thisIndex.slice(0, sC)];} let sI = data_president[swState]; let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t']; let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r']; let val = ((DV-RV)/TV-(DVS-RVS)/TVS); if(val == 0){'-'} else if(val > 0){'D+ '} else if(val < 0){'R+ '}",
				"format": ".2%",
				"domain": [-0.25, -0.01, 0, 0.01, 0.25],
				"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
				"clamp": false,
				"continue": true
			},
			"test": "cL.contains('county') || cL.contains('township')",
			"rule": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote']; cV[name] = tVote || 0;} var vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); var candA = Object.keys(cV).sort((a, b) => cV[b] - cV[a]).map(a => tU[a + '_party']).filter(a => a !== undefined); var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); var margin = (vA[0]/ vT) - (vA[1]/ vT); if(candA[0] == 'r' ){margin = margin*-1}; if(vT == 0 && candA.length > 1){margin = 0} if(candA.length == 1){margin = 1}; let swState, sC = -3; if(/\\d/.test(thisIndex) == false){swState = 'United States'} else {if(thisIndex.length > 5){sC = -8}; swState = fipsState[thisIndex.slice(0, sC)]}; var sUnit = dataResultsFile[selectedYear + '-' + swState]; var stV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = sUnit[name + '_vote']; stV[name] = tVote || 0;} var sVA = Object.values(stV).filter(a => a !== undefined).sort((a,b) => b-a); var sCandA = Object.keys(stV).sort((a, b) => stV[b] - stV[a]).map(a => sUnit[a + '_party']).filter(a => a !== undefined); var sVT = sUnit['total_vote'] || sVA.reduce((a,b) => a+b,0); var sMargin = (sVA[0]-sVA[1])/sVT; if(sCandA[0] == 'r'){sMargin = sMargin*-1}; if(sVT == 0 && sCandA.length > 1){sMargin = 0}; if(sCandA.length == 1){sMargin = 1}; margin - sMargin",
			"datapoint": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote']; cV[name] = tVote || 0;} var vA = Object.values(cV).filter(a => a !== undefined).sort((a,b) => b-a); var candA = Object.keys(cV).sort((a, b) => cV[b] - cV[a]).map(a => tU[a + '_party']).filter(a => a !== undefined); var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); var margin = (vA[0]/ vT) - (vA[1]/ vT); if(candA[0] == 'r' ){margin = margin*-1}; if(vT == 0 && candA.length > 1){margin = 0} if(candA.length == 1){margin = 1}; let swState, sC = -3; if(/\\d/.test(thisIndex) == false){swState = 'United States'} else {if(thisIndex.length > 5){sC = -8}; swState = fipsState[thisIndex.slice(0, sC)]}; var sUnit = dataResultsFile[selectedYear + '-' + swState]; var stV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = sUnit[name + '_vote']; stV[name] = tVote || 0;} var sVA = Object.values(stV).filter(a => a !== undefined).sort((a,b) => b-a); var sCandA = Object.keys(stV).sort((a, b) => stV[b] - stV[a]).map(a => sUnit[a + '_party']).filter(a => a !== undefined); var sVT = sUnit['total_vote'] || sVA.reduce((a,b) => a+b,0); var sMargin = (sVA[0]-sVA[1])/sVT; if(sCandA[0] == 'r'){sMargin = sMargin*-1}; if(sVT == 0 && sCandA.length > 1){sMargin = 0}; if(sCandA.length == 1){sMargin = 1}; Math.abs(margin - sMargin)",
			"prefix": "let swState, sC = -3; if(/\\d/.test(thisIndex) == false){swState = 'United States'} else {if(thisIndex.length > 5){sC = -8}; swState = fipsState[thisIndex.slice(0, sC)]}; var sUnit = dataResultsFile[selectedYear + '-' + swState]; let tVObj = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = sUnit[n+'_vote'],party = sUnit[n +'_party']; if(party !== undefined){tVObj[party] = tVote || 0}}; let sVObj = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i, tVote = sUnit[n+'_vote'],party = sUnit[n +'_party']; if(party !== undefined){sVObj[party] = tVote || 0}}; if(tVObj.d && tVObj.r){var tVote = tU['total_vote'], sVote = sUnit['total_vote'], tD = tVObj['d'] / tVote, sD = sVote['d'] / sVote, tR = tVObj['r'] /  tVote, sR = sVote['r'] / sVote, swing = (tD-tR) - (sD-sR); if(swing > 0){'r+ '} else {'d+ '}} else {0}",
			"format": ".2%",
			"domain": [-0.25, -0.01, 0, 0.01, 0.25],
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"clamp": false,
			"continue": true
		},
		"leadNation": {
			"president": {
				"rule": "let tS = thisState, sI = data_president['United States'], sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t'], DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r']; (DV-RV)/TV-(DVS-RVS)/TVS;",
				"domain": [-0.25, -0.01, 0, 0.01, 0.25],
				"datapoint": "let tS = thisState, sI = data_president['United States']; let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t']; let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r']; Math.abs((DV-RV)/TV-(DVS-RVS)/TVS)",
				"prefix": "let tS = thisState, sI = data_president['United States']; let sR = sI[sY]['v'], TVS = sI[sY]['t'], TV = tS['t']; let DV = tS['v']['d'], RV = tS['v']['r'],DVS = sR['d'], RVS = sR['r']; let val = ((DV-RV)/TV-(DVS-RVS)/TVS); if(val == 0){'-'} else if(val > 0){'D+ '} else if(val < 0){'R+ '}",
				"format": ".2%",
				"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
				"clamp": false,
				"continue": true
			}
		},
		"swing": {
			"president": {
				"test": "data_president[thisIndex][previousYears[shortYear]] !== undefined",
				"rule": "let sPY = previousYears[shortYear], pR = tI[sPY].v; (tS.v.d-tS.v.r)/tS.t-(pR.d-pR.r)/tI[sPY].t",
				"datapoint": "let tS = thisState, pR = data_president[thisIndex][previousYears[shortYear]]; Math.abs((tS.v.d-tS.v.r)/tS.t-(pR.v.d-pR.v.r)/pR.t)",
				"prefix": "let sY = selectedYear, tA = thisState, pA = data_president[clicked][previousYears[shortYear]]; let val = ((tA.v.d-tA.v.r)/tA.t)-((pA.v.d-pA.v.r)/pA.t); if(val == 0){'-'} else if(val > 0){presCand[sY]['d'][1] + '+ '} else if(val < 0){presCand[sY]['r'][1] + '+ '}",
				"legend_type": "steps",
				"steps": [-0.5, -0.25, -0.1, -0.05, 0, 0.05, 0.1, 0.25, 0.5],
				"stepsValues": ["R+50", "R+25", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+25", "R+ 50"],
				"format": ".2%",
				"domain": [-0.2, -0.01, 0, 0.01, 0.2],
				"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
				"clamp": false,
				"continue": true
			},
			"rule": "let vote = {}; for (let i=1;i<=12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = data_president[thisIndex][shortPresYear], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); swing} else {0}",
			"prefix": "let vote = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = data_president[thisIndex][shortPresYear], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); if(swing > 0){'d+ '} else {'r+ '}} else {0}",
			"datapoint": "let vote = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = data_president[thisIndex][shortPresYear], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); Math.abs(swing)} else {0}",
			"domain": [-0.25, -0.01, 0, 0.01, 0.25],
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"legend_type": "steps",
			"steps": [-0.25, -0.1, -0.05, 0, 0.05, 0.1, 0.25],
			"stepsValues": ["R+25", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+25"],
			"domain": [-0.2, -0.01, 0, 0.01, 0.2],
			"format": ".2%",
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"clamp": false,
			"continue": true
		},
		"swing8": {
			"president": {
				"test": "data_president[thisIndex][previousYears[shortYear]] !== undefined",
				"rule": "let shortYear = (selectedYear-4).toString().slice(-2); let sPY = previousYears[shortYear], pR = tI[sPY].v; (tS.v.d-tS.v.r)/tS.t-(pR.d-pR.r)/tI[sPY].t",
				"datapoint": "let tS = thisState; let shortYear = (selectedYear-4).toString().slice(-2); pR = data_president[thisIndex][previousYears[shortYear]]; Math.abs((tS.v.d-tS.v.r)/tS.t-(pR.v.d-pR.v.r)/pR.t)",
				"prefix": "let shortYear = (selectedYear-4).toString().slice(-2); let sY = selectedYear-4, tA = thisState, pA = data_president[clicked][previousYears[shortYear]]; let val = ((tA.v.d-tA.v.r)/tA.t)-((pA.v.d-pA.v.r)/pA.t); if(val == 0){'-'} else if(val > 0){'d+ '} else if(val < 0){'r+ '}",
				"legend_type": "steps",
				"steps": [-0.3, -0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.3],
				"stepsValues": ["R+30", "R+20", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+20", "D+30"],
				"domain": [-0.2, -0.01, 0, 0.01, 0.2],
				"format": ".2%",
				"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
				"clamp": false,
				"continue": true
			},
			"rule": "let vote = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = thisState[previousYears[shortPresYear]], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); swing} else {0}",
			"prefix": "let vote = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = data_president[thisIndex][previousYears[shortPresYear]], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); if(swing > 0){'d+ '} else {'r+ '}} else {0}",
			"datapoint": "let vote = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = data_president[thisIndex][previousYears[shortPresYear]], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); Math.abs(swing)} else {0}",
			"domain": [-0.25, -0.01, 0, 0.01, 0.25],
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"legend_type": "steps",
			"steps": [-0.3, -0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.3],
			"stepsValues": ["R+30", "R+20", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+20", "D+30"],
			"domain": [-0.2, -0.01, 0, 0.01, 0.2],
			"format": ".2%",
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"clamp": false,
			"continue": true
		},
		"swing12": {
			"president": {
				"test": "data_president[thisIndex][previousYears[shortYear]] !== undefined",
				"rule": "let shortYear = (selectedYear-8).toString().slice(-2); let sPY = previousYears[shortYear], pR = tI[sPY].v; (tS.v.d-tS.v.r)/tS.t-(pR.d-pR.r)/tI[sPY].t",
				"datapoint": "let tS = thisState; let shortYear = (selectedYear-8).toString().slice(-2); pR = data_president[thisIndex][previousYears[shortYear]]; Math.abs((tS.v.d-tS.v.r)/tS.t-(pR.v.d-pR.v.r)/pR.t)",
				"prefix": "let shortYear = (selectedYear-8).toString().slice(-2), tA = thisState, pA = data_president[clicked][previousYears[shortYear]]; let val = ((tA.v.d-tA.v.r)/tA.t)-((pA.v.d-pA.v.r)/pA.t); if(val == 0){'-'} else if(val > 0){'d+ '} else if(val < 0){'r+ '}",
				"legend_type": "steps",
				"steps": [-0.3, -0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.3],
				"stepsValues": ["R+30", "R+20", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+20", "D+30"],
				"domain": [-0.2, -0.01, 0, 0.01, 0.2],
				"format": ".2%",
				"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
				"clamp": false,
				"continue": true
			},
			"rule": "let vote = {}; for (let i = 1; i <= 12; i++) {let n = 'cand'+i,tVote = tU[n+'_vote'],party = tU[n +'_party']; if(party !== undefined){vote[party] = tVote || 0}}; if(vote.d && vote.r){let tPres = thisState[previousYears [previousYears[shortPresYear]]], tVote = tU['total_vote'], tPresT = tPres['t'], thisD = vote['d'] / tVote, prevD = tPres['v']['d'] / tPresT, thisR = vote['r'] / tVote, prevR = tPres['v']['r'] / tPresT, swing = (thisD-thisR) - (prevD-prevR); swing} else {0}",
			"domain": [-0.25, -0.01, 0, 0.01, 0.25],
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"legend_type": "steps",
			"steps": [-0.3, -0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.3],
			"stepsValues": ["R+30", "R+20", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+20", "D+30"],
			"domain": [-0.2, -0.01, 0, 0.01, 0.2],
			"format": ".2%",
			"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
			"clamp": false,
			"continue": true
		},
		"swing16": {
			"president": {
				"test": "data_president[thisIndex][previousYears[shortYear]] !== undefined",
				"rule": "let shortYear = (selectedYear-12).toString().slice(-2), sPY = previousYears[shortYear], pR = tI[sPY].v; (tS.v.d-tS.v.r)/tS.t-(pR.d-pR.r)/tI[sPY].t",
				"datapoint": "let tS = thisState, shortYear = (selectedYear-12).toString().slice(-2); pR = data_president[thisIndex][previousYears[shortYear]]; Math.abs((tS.v.d-tS.v.r)/tS.t-(pR.v.d-pR.v.r)/pR.t)",
				"prefix": "let shortYear = (selectedYear-12).toString().slice(-2), tA = thisState, pA = data_president[clicked][previousYears[shortYear]], val = ((tA.v.d-tA.v.r)/tA.t)-((pA.v.d-pA.v.r)/pA.t); if(val == 0){'-'} else if(val > 0){'d+ '} else if(val < 0){'r+ '}",
				"legend_type": "steps",
				"steps": [-0.3, -0.2, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.3],
				"stepsValues": ["R+30", "R+20", "R+10", "R+5", "EVEN", "D+5", "D+10", "D+20", "D+30"],
				"domain": [-0.2, -0.01, 0, 0.01, 0.2],
				"format": ".2%",
				"range": ["#E00000", "#FFE6E6", "#f0f0f0", "#E6F2FF", "#0069D9"],
				"clamp": false,
				"continue": true
			}
		},
		"countyType": {
			"type": "demographic",
			"test": "!/\\d/.test(thisIndex)",
			"domain": [40, 10],
			"range": ["#F8F2FF", "#6A0D98"],
			"clamp": false,
			"rule": "cScale(countyType[thisIndex])",
			"continue": true,
			"format": "d"
		},
		"electoralVotes": {
			"type": "demographic",
			"test": "!/\\d/.test(thisIndex)",
			"domain": [0, 20, 55],
			"range": ["#F8F2FF", "#6b049f", "#390255"],
			"clamp": true,
			"rule": "electoralVotes[thisIndex][selectedYear]",
			"datapoint": "",
			"continue": true,
			"format": "d",
			"afterAction": "clickCountyHide()"
		},
		"statePop": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0, 0.025, 0.05, 0.1, 0.15, 0.2, 0.5],
			"domain": [0, 0.1, 0.35, 0.7],
			"range": ["#F8F2FF", "#6A0D98", "#360750", "#390255"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percStatePop']",
			"datapoint": "demographics[thisIndex]['p'] / demographics[fipsState[thisIndex.slice(0,-3)]]['p']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"popChange": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3],
			"domain": [-0.35, -0.005, 0.005, 0.35],
			"range": ["#d50b0b", "#fff0f0", "#f0fff0", "#0bd50b"],
			"clamp": false,
			"rule": "demographics[thisIndex]['popChange10']",
			"datapoint": "demographics[thisIndex]['popChange10']",
			"continue": true,
			"format": "+.2%"
		},
		"popLatino": {
			"type": "demographic",
			"legend_type": "gradient",
			"domain": [0, 0.6],
			"range": ["#faefea", "#992e00"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percLatino']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"popBlack": {
			"type": "demographic",
			"legend_type": "gradient",
			"domain": [0, 0.5],
			"range": ["#e9fbe9", "#0a5c0a"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percBlack']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"popWhite": {
			"type": "demographic",
			"legend_type": "gradient",
			"domain": [0.2, 0.925],
			"range": ["#f7f2fd", "#851cba"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percWhite']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"popAsian": {
			"type": "demographic",
			"legend_type": "gradient",
			"domain": [0, 0.2],
			"range": ["#fdf2f2", "#E00000"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percAsian']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"popMinority": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.75, 1],
			"domain": [0, 0.1, 0.2, 0.4, 0.55, 0.65, 0.8],
			"range": ["#dee6fb", "#b4c4ec", "#8da5e2", "#6787d7", "#4169cd", "#3352a2", "#243c79"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percMinority']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"incomeMedian": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [20000, 40000, 60000, 80000, 100000, 125000, 150000],
			"domain": [10000, 25000, 130000, 250000],
			"range": ["#eff5ef", "#e9fbe9", "#0a5c0a", "#052e05"],
			"clamp": false,
			"rule": "demographics[thisIndex]['incomeMedian']",
			"continue": true,
			"format": "$,",
			"afterAction": "clickCountyHide()"
		},
		"perc18to25": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3],
			"domain": [0.02, 0.15, 0.35],
			"range": ["#F8F2FF", "#6A0D98", "#360750", "#390255"],
			"clamp": false,
			"rule": "demographics[thisIndex]['perc18to25']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"percOver18": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9],
			"domain": [0.62, 0.85],
			"range": ["#F8F2FF", "#6A0D98"],
			"clamp": false,
			"rule": "demographics[thisIndex]['percOver18']",
			"continue": true,
			"format": ".2p"
		},
		"incomeLess50": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0, 0.2, 0.4, 0.6, 0.8, 1],
			"domain": [0.25, 0.65],
			"range": ["#e9fbe9", "#0a5c0a"],
			"clamp": false,
			"rule": "demographics[thisIndex]['incomeLessThan50']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"income50to100": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0, 0.1, 0.2, 0.3, 0.4, 0.5],
			"domain": [0.1, 0.45],
			"range": ["#e9fbe9", "#0a5c0a"],
			"clamp": false,
			"rule": "demographics[thisIndex]['income50to100']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"incomeGreater100": {
			"type": "demographic",
			"legend_type": "steps",
			"steps": [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
			"domain": [0.1, 0.55, 0.75],
			"range": ["#e9fbe9", "#0a5c0a", "#052e05"],
			"clamp": false,
			"rule": "demographics[thisIndex]['incomeGreater100']",
			"continue": true,
			"format": ".2p",
			"afterAction": "clickCountyHide()"
		},
		"reporting": {
			"president": {
				"legend_type": "gradient",
				"domain": [0, 0.00001, 0.95, 1],
				"steps": [0.00001, 0.99995],
				"range": ["#6b707b", "#6A0D98", "#e4ccff", "#fcfaff"],
				"clamp": true,
				"format": ".0%",
				"rule": "thisState['reporting'] / 100",
				"datapoint": "",
				"continue": true
			},
			"legend_type": "gradient",
			"domain": [0, 0.00001, 0.95, 1],
			"steps": [0.00001, 0.99995],
			"range": ["#6b707b", "#6A0D98", "#e4ccff", "#fcfaff"],
			"clamp": true,
			"format": ".0%",
			"datapoint": "",
			"rule": "dataResultsFile[selectedYear + '-' + thisIndex]['reporting'] * .01",
			"continue": true
		},
		"demVote": {
			"president": {
				"test": "thisState['t'] > 0",
				"legend_type": "steps",
				"steps": [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
				"domain": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
				"range": ["#eef2fd", "#dee6fb", "#b4c4ec", "#8da5e2", "#6787d7", "#4169cd", "#3352a2", "#243c79"],
				"clamp": false,
				"format": ".2p",
				"rule": "thisState.v.d/ (thisState.t || 100)",
				"continue": true
			},
			"legend_type": "steps",
			"rule": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote'], tParty = tU[name + '_party']; cV[tParty] = tVote || 0;}  var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); if(cV['d'] == undefined){0} else if(vT > 0){cV['d'] / vT} else if (cV['d'] == vT){1}",
			"format": ".2p",
			"datapoint": "let tU = dataResults; var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote'], tParty = tU[name + '_party']; cV[tParty] = tVote || 0;}  var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); if(cV['d'] == undefined){0} else if(vT > 0){cV['d'] / vT} else if (cV['d'] == vT){1}",
			"steps": [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
			"domain": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
			"range": ["#eef2fd", "#dee6fb", "#b4c4ec", "#8da5e2", "#6787d7", "#4169cd", "#3352a2", "#243c79"],
			"clamp": false,
			"continue": true
		},
		"repVote": {
			"president": {
				"test": "thisState['t'] > 0",
				"legend_type": "steps",
				"steps": [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
				"domain": [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
				"range": ["#fdedee", "#fbdbdc", "#f0adaf", "#eb7c80", "#e2474d", "#cd1f25", "#ad0006", "#830004"],
				"clamp": false,
				"format": ".2p",
				"rule": "thisState.v.r / (thisState.t || 100)",
				"continue": true
			},
			"legend_type": "steps",
			"rule": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote'], tParty = tU[name + '_party']; cV[tParty] = tVote || 0;}  var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); if(cV['r'] == undefined){0} else if(vT > 0){cV['r'] / vT} else if (cV['r'] == vT){1}",
			"format": ".2p",
			"datapoint": "let tU = dataResults; var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote'], tParty = tU[name + '_party']; cV[tParty] = tVote || 0;}  var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); if(cV['r'] == undefined){0} else if(vT > 0){cV['r'] / vT} else if (cV['r'] == vT){1}",
			"steps": [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
			"domain": [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
			"range": ["#fdedee", "#fbdbdc", "#f0adaf", "#eb7c80", "#e2474d", "#cd1f25", "#ad0006", "#830004"],
			"clamp": false,
			"continue": true
		},
		"otherVote": {
			"president": {
				"test": "thisState['t'] > 0",
				"legend_type": "steps",
				"steps": [0, 0.01, 0.03, 0.05, 0.1, 0.15, 0.2],
				"domain": [0, 0.01, 0.03, 0.05, 0.1, 0.15, 0.25, 0.3],
				"range": ["#eaf7ed", "#d5efdb", "#a2d5ac", "#71bc80", "#3ea452", "#008c1c", "#006e16", "#005110"],
				"clamp": false,
				"format": ".2p",
				"rule": "(thisState.t-thisState.v.d -thisState.v.r) / thisState.t",
				"continue": true
			},
			"legend_type": "steps",
			"rule": "var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote'], tParty = tU[name + '_party']; cV[tParty] = tVote || 0;}  var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); (((vT - (cV.d || 0) - (cV.r || 0)) / vT) || 0)",
			"format": ".2p",
			"datapoint": "let tU = dataResults; var cV = {}; for (let i = 1; i <= 12; i++) {let name = 'cand' + i, tVote = tU[name + '_vote'], tParty = tU[name + '_party']; cV[tParty] = tVote || 0;}  var vT = tU['total_vote'] || vA.reduce((a,b) => a+b,0); (((vT - (cV.d || 0) - (cV.r || 0)) / vT) || 0)",
			"steps": [0, 0.01, 0.03, 0.05, 0.1, 0.15, 0.2],
			"domain": [0, 0.01, 0.03, 0.05, 0.1, 0.15, 0.25, 0.3],
			"range": ["#eaf7ed", "#d5efdb", "#a2d5ac", "#71bc80", "#3ea452", "#008c1c", "#006e16", "#005110"],
			"clamp": false,
			"continue": true
		},
		"changeTurnout": {
			"president": {
				"test": "thisState['t'] > 0 && data_president[thisIndex][previousYears[shortYear]] !== undefined",
				"legend_type": "steps",
				"steps": [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.5],
				"domain": [-0.35, -0.005, 0.005, 0.3],
				"range": ["#d50b0b", "#fff0f0", "#f0fff0", "#0bd50b"],
				"clamp": false,
				"format": "+.2p",
				"rule": "(thisState['t'] / data_president[thisIndex][shortPresYearPrev]['t'])-1",
				"datapoint": "var spY = (selectedYear-4).toString().slice(-2); (data_president[clicked][shortYear]['t'] / data_president[clicked][spY]['t'])-1",
				"continue": true
			},
			"test": "tU['total_vote'] > 0",
			"legend_type": "steps",
			"steps": [-0.4, -0.25, -0.1, 0, 0.1, 0.25, 0.4],
			"domain": [-0.35, -0.005, 0.005, 0.35],
			"range": ["#d50b0b", "#fff0f0", "#f0fff0", "#0bd50b"],
			"clamp": true,
			"format": "+.2p",
			"rule": "if (selectedYear % 4 === 0) {var spY = selectedYear.slice(-2).toString()} else {var spY = (Math.floor(selectedYear/4)*4).toString().slice(-2)} (tU['total_vote'] / data_president[tI][spY]['t'])-1",
			"datapoint": "if(clicked !== 'United States'){if (selectedYear % 4 === 0) {var spY = selectedYear.slice(-2).toString()} else {var spY = (Math.floor(selectedYear/4)*4).toString().slice(-2)}; (dataResults['total_vote'] / data_president[clicked][spY]['t'])-1}",
			"continue": true
		}
	},
	"filter": {
		"majorityMinority": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"condition": "demographics[thisIndex]['percMinority'] > 0.5",
				"noWinner": "thisElement.classList.add('noProjection')"
			},
			"condition": "demographics[thisIndex]['percMinority'] > 0.5",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"gain": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"varDefine": {
					"cW": "fN(tI[sY]['v'])",
					"pW": "fN(tI[sYP]['v'])"
				},
				"condition": "if(tI[sY]['ev']){tI[sY]['w'] !== tI[sYP]['w']} else {cW !== pW}"
			},
			"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
			"varDefine": {
				"swTrim": "tI.length > 5 ? tI.slice(0,-8) : tI.slice(0,-3)",
				"swState": "/\d/.test(thisIndex) ? '' : fipsState[swTrim]",
				"sI": "dataResultsFile[selectedYear + '-' + swState]"
			},
			"condition": "if(sI){if(sI['gain'] == 1){true}} else if(thisUnit['gain'] == 1){true}",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"uncontested": {
			"funcDefine": "i => {return Object.keys(i).filter(a => a.startsWith('c') && a.endsWith('party')).length}",
			"varDefine": {
				"swTrim": "tI.length > 5 ? tI.slice(0,-8) : tI.slice(0,-3)",
				"swState": "/\d/.test(thisIndex) ? '' : fipsState[swTrim]",
				"sI": "dataResultsFile[selectedYear + '-' + swState]"
			},
			"skipContinue": true,
			"condition": "if(sI){if(fN(sI) == 1){true}} else if(fN(tU) == 1){true}",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"openSeat": {
			"varDefine": {
				"swTrim": "tI.length > 5 ? tI.slice(0,-8) : tI.slice(0,-3)",
				"swState": "/\d/.test(thisIndex) ? '' : fipsState[swTrim]",
				"sI": "dataResultsFile[selectedYear + '-' + swState]"
			},
			"condition": "if(sI){if(!sI['incumbent']){true}} else if(!thisUnit['incumbent']){true}",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"presDem": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"condition": "fN(tI[sYP]['v']) == 'd'",
				"noWinner": "if(fN(tI[sY]['v'] == ''){thisElement.classList.add('noProjection')}"
			},
			"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
			"varDefine": {
				"tP": "thisPUnit"
			},
			"condition": "fN(tP[shortPresYearPrev]['v']) == 'd'",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"presRep": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"condition": "fN(tI[sYP]['v']) == 'r'",
				"noWinner": "thisElement.classList.add('noProjection')"
			},
			"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
			"varDefine": {
				"tP": "thisPUnit"
			},
			"condition": "fN(tP[shortPresYearPrev]['v']) == 'd'",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"bushObama": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"condition": "fN(tI['00']['v']) == 'r' && fN(tI['04']['v']) == 'r' && fN(tI['08']['v']) == 'd'",
				"noWinner": "thisElement.classList.add('noProjection')"
			},
			"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
			"varDefine": {
				"tP": "thisPUnit"
			},
			"condition": "fN(tP['00']['v']) == 'r' && fN(tP['04']['v']) == 'r' && fN(tP['08']['v']) == 'd'",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"obamaTrump": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"condition": "fN(tI['16']['v']) == 'r' && fN(tI['12']['v']) == 'd' && fN(tI['08']['v']) == 'd'",
				"noWinner": "thisElement.classList.add('noProjection')"
			},
			"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
			"varDefine": {
				"tP": "thisPUnit"
			},
			"condition": "fN(tP['16']['v']) == 'r' && fN(tP['12']['v']) == 'd' && fN(tP['08']['v']) == 'd'",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"trumpBiden": {
			"president": {
				"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
				"condition": "fN(tI['16']['v']) == 'r' && fN(tI['20']['v']) == 'd'",
				"noWinner": "thisElement.classList.add('noProjection')"
			},
			"funcDefine": "i => {let k = Object.keys(i); return k.filter(a => i[a] > 0).length < 2 ? '' : k.reduce((a, b) => i[a] > i[b] ? a : b)}",
			"varDefine": {
				"tP": "thisPUnit"
			},
			"condition": "fN(tP['16']['v']) == 'r' && fN(tP['20']['v']) == 'd'",
			"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
		},
		"margin1": {
			"president": {
				"varDefine": {
					"vA": "Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a)",
					"margin": "Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0)"
				},
				"condition": "margin < 0.01",
			},
			"type": "resultsCalc",
			"condition": "margin < 0.01"
		},
		"margin3": {
			"president": {
				"varDefine": {
					"vA": "Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a)",
					"margin": "Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0)"
				},
				"condition": "margin < 0.03",
			},
			"type": "resultsCalc",
			"condition": "margin < 0.03"
		},
		"margin5": {
			"president": {
				"varDefine": {
					"vA": "Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a)",
					"margin": "Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0)"
				},
				"condition": "margin < 0.05",
			},
			"type": "resultsCalc",
			"condition": "margin < 0.05"
		},
		"margin10": {
			"president": {
				"varDefine": {
					"vA": "Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a)",
					"margin": "Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0)"
				},
				"condition": "margin < 0.1",
			},
			"type": "resultsCalc",
			"condition": "margin < 0.1"
		},
		"margin25": {
			"president": {
				"varDefine": {
					"vA": "Object.values(tS['v']).filter(a => a !== undefined).sort((a,b) => b-a)",
					"margin": "Math.abs(vA[0] - vA[1]) / vA.reduce((a,b) => a+b, 0)"
				},
				"condition": "margin < 0.25",
			},
			"type": "resultsCalc",
			"condition": "margin < 0.25"
		},
		"keyRace": {
			"house": {
				"varDefine": {
					"keyRaces": " Object.values(houseGroups).flat()",
				},
				"test": "thisIndex.includes('-')",
				"skipContinue": true,
				"condition": "keyRaces.includes(thisIndex)",
				"noWinner": "if(thisWinner == ''){thisElement.classList.add('noProjection')}"
			}
		}
	}
}