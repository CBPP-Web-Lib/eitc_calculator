function checkNumber(obj)
{
        var str = obj.value;

        if (str.length == 0 || str == "" || str == null) {
                return false;
        }

        for (var i = 0; i < str.length; i++) {
                var ch = str.substring(i, i + 1)
                if ((ch < "0" || "9" < ch) && ch != '.' && ch != '$' && ch != ',') {
                        return false;
                }
        }

        return true;
}

function tonum(str)
{
        var     nstr = "";

        for (var i = 0; i < str.length; i++) {
                var ch = str.substring(i, i + 1);
                if ((ch >= "0" && ch <= "9") || ch == '.') {
                        nstr += ch;
                }
        }

        return parseFloat(nstr);
}

function valueOrDefault(obj, defval)
{
        if (!checkNumber(obj)) {
                return defval;
        }

        var val = tonum(obj.value);

        if (val == 0) {
                return defval;
        }
        return val;
}


function format(val, len, decimal)
{
        var     scale = 1;

        if (decimal == null)
                decimal = 1;

        for (i = 0; i <= decimal; i++)
                scale *= 10;

        var     str = "" + Math.round(parseFloat(val) * scale);

        if (str.length == 0 || str == "0") {
                str = "000";
        }

        str = "$" + str;
        i = len - str.length;
        if (scale != 1)
                i--;
        while (0 < i--)
                str = " " + str;
        if (scale != 1) {
                var p = len - decimal - 2;
                var a = str.substring(0, p);
                var b = str.substring(p, len);
                return a + "." + b;
        }
        return str;
}

function compute(input)
{
    var form = input.form;

    EARNINGS = valueOrDefault(form.FORMEARNINGS, 0);
      STATUS = form.FORMSTATUS.value;
      KIDS = valueOrDefault(form.FORMKIDS, 0);

    var calculator = new EITC_Calculator();

    var result = calculator.calculate({
        wages: EARNINGS,
        dependents: KIDS,
        filingStatus: STATUS,
    })

    form.total.value = Math.round(result);
}

