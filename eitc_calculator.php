<?php
/*
 Plugin Name: EITC Calculator
 Description: Code for EITC Estimator
 Version: 1.0.0
 Author: Nicholas Kasprak
 */

/**
 * WP Hooks
 **/

 
function eitc_calculator_eitc_script() {
    if ( is_page( 'help' ) ) {
        /**
         * This is the revised function that powers the new form-based, single page calculator
         */

        $tax_year = 2025;
        if (array_key_exists("tax_year", $_GET)) {
            $tax_year = $_GET["tax_year"]*1;
        }
        wp_enqueue_script("eitc_calculator", plugin_dir_url(__FILE__) . "js/eitc_calculator_{$tax_year}.js", []);
        wp_enqueue_script("calculator_ui", plugin_dir_url(__FILE__) . "js/calculator_ui.js", array("eitc_calculator"));
        wp_enqueue_script("calculator_ui_footer", plugin_dir_url(__FILE__) . "js/calculator_ui_footer.js", array("calculator_ui"), false, true);
    }
}

add_action( 'wp_enqueue_scripts', 'eitc_calculator_eitc_script' );
    
function eitc_calculator_output() { ?>
<div class="form-wrap">
<form name="estform" method="get">
<div class="estselect filing">

<p>Filing Status:</p>
<div><p><select id="FORMSTATUS" name="FORMSTATUS">
<option></option>
<option value="single">Single/Head of Household</option>
<option value="married">Married</option>
</select></p></div>
</div>

<div class="estselect children">
<p>Number of Children:</p>
<div><p><select id="FORMKIDS" name="FORMKIDS">
<option></option>
<option value="0">None</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three or More</option>
</select></p></div>
</div>


<div class="estselect household">
<p>Household Earnings:</p>
<div class="earningsdollar">$</div><div class="earningsnumber"><input id="FORMEARNINGS" name="FORMEARNINGS" type="text" size="10" onkeyup="compute(this);"></div>
</div>

<div class="estselect your">
<div style="display:inline-block;">Your Federal EITC: $</div><div style="display:inline-block;"><INPUT class="nobc nobo" id="total" NAME=total TYPE=text READONLY=Yes VALUE="" SIZE="4"></div>
</div>
<div style="display:inline-block;">Your Vermont EITC: $</div><div style="display:inline-block;"><INPUT class="nobc nobo" id="total_vt" NAME=total_vt TYPE=text READONLY=Yes VALUE="" SIZE="4"></div>
</div>
<div style="clear:both;"></div>
</form>
<!--<p class="calccaption"><?php //echo $estcaption;?></p>-->
</div>

<?php } ?>