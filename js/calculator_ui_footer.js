
var statusInput = document.getElementById('FORMSTATUS');
function useStatusValue() {
	compute(this);
    var StatusValue = statusInput.value;
    // use it
}
statusInput.onload = useStatusValue;
statusInput.onchange = useStatusValue;
statusInput.onblur = useStatusValue;

var kidsInput = document.getElementById('FORMKIDS');
function useKidsValue() {
	compute(this);
    var KidsValue = kidsInput.value;
    // use it
}
kidsInput.onload = useKidsValue;
kidsInput.onchange = useKidsValue;
kidsInput.onblur = useKidsValue;

var earningsInput = document.getElementById('FORMEARNINGS');
function useEarningsValue() {
	compute(this);
    var EarningsValue = earningsInput.value;
    // use it
}

earningsInput.onload = useEarningsValue;
earningsInput.onkeyup = useEarningsValue; 
//earningsInput.onkeyup = submitForm;
earningsInput.onblur = useEarningsValue;

var totalInput = document.getElementById('total');
function useTotalValue() {
	compute(this);
    var TotalValue = totalInput.value;
    // use it

}
totalInput.onload = useTotalValue;
totalInput.onchange = useTotalValue;earningsInput.onkeyup = useTotalValue;
statusInput.onchange= useTotalValue;
kidsInput.onchange= useTotalValue;
totalInput.onblur = useTotalValue;
