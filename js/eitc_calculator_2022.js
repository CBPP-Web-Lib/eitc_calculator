/*tax year 2022*/

var EITC_Calculator = function() {
    "use strict";
    var c = this;
    c.parms = {
         "0": {
          	"earned_income_base_amount": 7320,
          	"begin_phaseout": 9160,
          	"marriage_penalty_relief": 6130,
          	"phase_in_rate": 0.0765,
          	"phase_out_rate": 0.0765
        },
        "1": {
            "earned_income_base_amount": 10980,
            "begin_phaseout": 20130,
            "marriage_penalty_relief": 6130,
            "phase_in_rate": 0.34,
            "phase_out_rate": 0.1598
        },
        "2": {
            "earned_income_base_amount": 15410,
            "begin_phaseout": 20130,
            "marriage_penalty_relief": 6130,
            "phase_in_rate" : 0.4,
            "phase_out_rate": 0.2106
        },
        "3": {
            "earned_income_base_amount": 15410,
            "begin_phaseout": 20130,
            "marriage_penalty_relief": 6130,
            "phase_in_rate": 0.45,
            "phase_out_rate": 0.2106
        }
      };


    /*calculation function*/
    c.calculate = function(inputs, ignoreIRSTableBins) {
        if (typeof(ignoreIRSTableBins) === "undefined") {
            ignoreIRSTableBins = false;
        }
        if (isNaN(inputs.dependents*1)) {
          inputs.dependents = 0;
        }
        inputs.dependents = Math.round(Math.max(0, Math.min(3, inputs.dependents), inputs.dependents));
        /*actual calculation here. pretty self-explanatory*/
        var parms = c.parms[inputs.dependents],
        rounded_wages = inputs.wages;
        if (ignoreIRSTableBins === false) {
            rounded_wages = (inputs.wages === 0 ? 0 : Math.floor(inputs.wages/50)*50 + 25);
        }
        var marriage_penalty_relief = (inputs.filingStatus === "married") ? parms.marriage_penalty_relief : 0,
        /*total potential EITC*/ gross_eitc = Math.min(rounded_wages, parms.earned_income_base_amount)*parms.phase_in_rate,
        /*minus phaseout*/ less_amount = Math.max(0,(rounded_wages - (parms.begin_phaseout + marriage_penalty_relief))*parms.phase_out_rate);
        var result = Math.max(0, gross_eitc - less_amount);
        return {
            federal: result,
            state: result*0.38 //it's 38 percent, right?
        }
    };
};

/*example usage*/

/*var thisCalculator = new EITC_Calculator();
console.log(thisCalculator.calculate({
  wages:6000,
  dependents:2,
  filingStatus: "married"
}));*/

/*should output 2410*/

/*exported EITC_Calculator*/
