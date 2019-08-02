$(document).ready(function () {
    $(".datepicker").datepicker();

    $("#activities-breakfast").click(function () {
        $("#breakfast-options").toggle($(this).is(":checked"));
    });

    $(".activities input").click(function () {
        updatePrice();
    });

    $("#submit-form").click(function () {
		if (confirm("Are you sure that you want to book a stay at " + $("#location").val() + " between " + 				$("#date-from").val() + " and " + $("#date-to").val() + "?")) {
			return validateForm();
		}
    });

    $("#cancel").click(function () {
		if (confirm("Are you sure that you want to cancel your booking?")) {
			window.location.href = "cancelled.html";
		}
    });
});

function updatePrice() {
    var price = 109.99;
    $(".activities input:checked").each(function (i, item) {
        price += $(item).data("price");
    });
    $(".total-price-value").html("&pound;" + price);
}

function validateForm() {
    $("#validation-summary").html("");
    $("input, select").removeClass("invalid").removeAttr("aria-invalid").removeAttr("aria-labelledby");

    validateDate($("#date-from"), true, "Please enter date from", "Date from format should be mm/dd/yyyy");
    validateDate($("#date-to"), true, "Please enter date to", "Date from format should be mm/dd/yyyy");
    validateRequiredField($("#location"), "Please select a location");
    validateText($("#details-name"), true, 50, "Please enter your name", "Name should be no longer than 50 characters");
    validateText($("#details-email"), true, 100, "Please enter your email address", "Email address should be no longer than 100 characters");
    validateText($("#details-tel"), false, 15, "Please enter your telephone number", "Telephone number should be no longer than 15 characters");
    validateRequiredField($("#details-card-type"), "Please select the card type");
    validateText($("#details-card-number"), true, 16, "Please enter the card number", "Card number should be no longer than 16 characters");
    validateRequiredField($("#details-card-expiry-month"), "Please select the card expiry month");
    validateRequiredField($("#details-card-expiry-year"), "Please select the card expiry year");

    var valid = $("#validation-summary *").length == 0;
	
	if (!valid) {
		$("#validation-summary").prepend("<p>There were some issues with the form submission, please correct them and try again</p>");
		$("#validation-summary").focus();
	}
}

function validateRequiredField($input, errorMessage) {
    var empty = !$input.val();
    if (empty)
        addValidationIssue(errorMessage, $input);
    return !empty;
}

function validateText($input, required, maxLength, errorMessageRequired, errorMessageLength) {
    var valid = true;
    if (required)
        valid = validateRequiredField($input, errorMessageRequired);
    if (valid) {
        if ($input.val().length > maxLength) {
            valid = false;
            addValidationIssue(errorMessageLength, $input);
        }
    }
    return valid;
}

function validateDate($input, required, errorMessageRequired, errorMessageInvalid) {
    var valid = true;
    if (required)
        valid = validateRequiredField($input, errorMessageRequired);
    if (valid) {
        var date = new Date($input.val());
        if (!date || date < new Date() || date == "Invalid Date") {
            valid = false;
            addValidationIssue(errorMessageInvalid, $input);
        }
    }
    return valid;
}

function addValidationIssue(errorMessage, $input) {
    $input.addClass("invalid");
	$input.attr("aria-invalid", "true");
    $("#validation-summary").append("<a href='#" + $input.attr("id") + "' id='error-" + $input.attr("id") + "'>" + errorMessage + "</a>");
	$input.attr("aria-labelledby", "error-" + $input.attr("id"));
}





















