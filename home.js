var bads = new Object();
var areChecked = new Array();
var BADS_NAME = 'bads';
var SAVED_STR = 'saved';
var LEN_STR = 'len';
var DIVIDER = '*';
var START_LI = '<li id ="after" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-btn-up-a" data-theme="a" data-iconpos="right" data-icon="false" data-wrapperels="div" data-iconshadow="true" data-shadow="false" data-corners="false">' + '<div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text">' + '<a class="ui-link-inherit" href="#" style="padding-top: 0px;padding-bottom: 0px;padding-right: 0px;padding-left: 0px;">';
var END_LI = '<a aria-owns="#edit" aria-haspopup="true" data-iconpos="notext" data-icon="false" data-wrapperels="span" data-iconshadow="true" data-shadow="false" data-corners="false" id="sidebutton" class="ui-li-link-alt ui-btn ui-btn-icon-notext ui-corner-tr ui-btn-up-a" title="Edit" href="#edit" data-theme="a" data-rel="popup" data-position-to="window" data-transition="flip"><span class="ui-btn-inner ui-corner-tr"><span class="ui-btn-text">' + '</span><span class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" title="" data-theme="a" data-iconpos="notext" data-icon="edit" data-wrapperels="span" data-iconshadow="true" data-shadow="true" data-corners="true"><span class="ui-btn-inner ui-btn-corner-all ui-corner-tr"><span class="ui-btn-text ui-corner-tr"></span><span class="ui-icon ui-icon-edit ui-icon-shadow">&nbsp;</span></span></span></span></a></li>';
var START_H3 = '<h3>';
var END_H3 = '</h3>';
var START_CHECK = '<div class="ui-checkbox">' + '<label class="ui-btn ui-btn-icon-left ui-checkbox-off ui-btn-up-a" data-theme="a" data-icon="checkbox-off" data-wrapperels="span"' + 'data-iconshadow="true" data-shadow="false" style="border-top-width: 0px;margin-top: 0px;border-bottom-width: 0px;' + 'margin-bottom: 0px;border-left-width: 0px;border-right-width: 0px;" data-corners="false">' + '<span class="ui-btn-inner ui-corner-top"><span class="ui-btn-text">' + '<fieldset class="ui-corner-all ui-controlgroup ui-controlgroup-vertical" data-role="controlgroup">' + '<div class="ui-controlgroup-controls"> ' + '<label for="checkbox-2b" style="border-top-width: 0px;margin-top: 0px;border-bottom-width: 0px;margin-bottom: 0px;border-left-width: 0px;border-right-width: 0px;">' + '<label  style="padding:10px 0px 0px 10px;"> ';
var END_CHECK = '</label></label></div></fieldset></span><span class="ui-icon ui-icon-checkbox-off ui-icon-shadow">&nbsp;</span></span></label>' + '<input name="checkbox-2b" id="checkbox-2b" type="checkbox"></div></a></div></div>';
var START_P = '<p>';
var END_P = '</p>';

$(document).on('pageinit', '#page', function(event) {

	var wasCached = resumeFiles();
	if (!wasCached) {
		newFiles();
	}

	$('#save').click(function() {
		var newName = $('#name').html();
		var newDesc = $('#desc').val();
		$('#name').html('');
		$('#desc').val('');
		$('#edit').popup('close');
		modifyOne(newName, newDesc);

		resumeFiles();
	});

	$('#okDel').click(function() {
		var listItems = $(".list li");
		listItems.each(function(idx, li) {
			if (areChecked.indexOf($(li).find('.ui-li-heading').text()) != -1) {
				areChecked.splice(areChecked.indexOf($(li).find('.ui-li-heading').text()), 1);
				delOne($(li).find('.ui-li-heading').text());
				$(li).remove();
				$('.list').listview('refresh');
			}
		});

		areChecked.length = 0;

		toggleRemoveButton();
	});

	$('#okReset').click(function() {
		removeAll();
		newFiles();
	});

	$('#saveNew').click(function() {
		var addName = $('#newName').val();
		addName = addName.charAt(0).toUpperCase() + addName.substring(1, addName.length);
		var addDesc = $('#newDesc').val().toLowerCase();
		$('#newName').val('');
		$('#newDesc').val('');
		if (addName == '' || addName.length < 3) {
			$('label[for="newName"]').html('<strong>Please insert a valid name:</strong>');
			$('label[for="newName"]').css('color', 'red');
		} else {
			$('label[for="newName"]').html('<strong>Name:</strong>');
			$('label[for="newName"]').css('color', 'black');
			$('#add').popup('close');
			addOne(addName, addDesc);

			resumeFiles();
		}
	});
});

function resizeList() {
	if (matchMedia) {
		var mq = window.matchMedia('(max-width: 33em)');
		mq.addListener(firstWidthChange);
		firstWidthChange(mq);

		var mq2 = window.matchMedia('(min-width: 33.01em) and (max-width: 40em)');
		mq2.addListener(secondWidthChange);
		secondWidthChange(mq2);

		var mq3 = window.matchMedia('(min-width: 40.01em) and (max-width: 60em)');
		mq3.addListener(thirdWidthChange);
		thirdWidthChange(mq3);

		var mq4 = window.matchMedia('(min-width: 60.01em)');
		mq4.addListener(fourthWidthChange);
		fourthWidthChange(mq4);
	}
}

function firstWidthChange(mq) {
	var ul = $('.ui-btn-inner, .ui-li-heading');
	var ulDesc = $('.ui-li-desc');

	if (mq.matches) {
		ul.css('font-size', '0.99em');
		ulDesc.css('font-size', '0.93em');
	}
}

function secondWidthChange(mq) {
	var ul = $('.ui-btn-inner, .ui-li-heading');
	var ulDesc = $('.ui-li-desc');

	if (mq.matches) {
		ul.css('font-size', '1.05em');
		ulDesc.css('font-size', '0.9em');
	}
}

function thirdWidthChange(mq) {
	var ul = $('.ui-btn-inner, .ui-li-heading');
	var ulDesc = $('.ui-li-desc');

	if (mq.matches) {
		ul.css('font-size', '1.1em');
		ulDesc.css('font-size', '0.95em');
	}
}

function fourthWidthChange(mq) {
	var ul = $('.ui-btn-inner, .ui-li-heading');
	var ulDesc = $('.ui-li-desc');

	if (mq.matches) {
		ul.css('font-size', '1.15em');
		ulDesc.css('font-size', '1em');
	}
}

function newFiles() {
	$.ajax({
		url : "./bad.json",
		dataType : "text",
		success : function(resp) {
			var root = JSON.parse(resp);

			$('.list').children().remove('li');
			for (var i = 0; i < root.data.length; i++) {
				var name = root.data[i].name;
				var desc = root.data[i].desc;
				bads[name] = desc;

				$('.list').append(START_LI + START_CHECK + START_H3 + name + END_H3 + START_P + desc + END_P + END_CHECK + END_LI).listview('refresh');
			}

			activateCheckBoxes();

			activateSplitButtons();

			resizeList();

			done = saveFiles();
			return done;
		}
	}).fail(function() {
		alert("failed");
	});

}

function resumeFiles() {
	if (!supportsLocalStorage()) {
		return false;
	}

	var saved = (localStorage[SAVED_STR + BADS_NAME] == 'true');
	if (!saved) {
		return false;
	}

	$('.list').children().remove('li');
	var len = parseInt(localStorage[BADS_NAME + LEN_STR]);
	for (var i = 0; i < len; i++) {
		var src = localStorage[BADS_NAME + i];
		var star = src.indexOf(DIVIDER);
		var name = src.substring(0, star);
		var desc = src.substring((star + 1), src.length);
		$('.list').append(START_LI + START_CHECK + START_H3 + name + END_H3 + START_P + desc + END_P + END_CHECK + END_LI).listview('refresh');
	}

	activateCheckBoxes();

	activateSplitButtons();

	resizeList();

	return true;
}

function saveFiles() {
	if (!supportsLocalStorage()) {
		return false;
	}

	localStorage[SAVED_STR + BADS_NAME] = true;
	var i = 0;
	for (var key in bads) {
		localStorage[BADS_NAME + i] = key + DIVIDER + bads[key];
		i++;
	}

	localStorage[BADS_NAME + LEN_STR] = i;

	return true;
}

function addOne(name, desc) {
	if (!supportsLocalStorage()) {
		return false;
	}

	var saved = (localStorage[SAVED_STR + BADS_NAME] == 'true');
	if (!saved) {
		return false;
	}

	var len = parseInt(localStorage[BADS_NAME + LEN_STR]);
	var src = localStorage[BADS_NAME + 0];
	var star = src.indexOf(DIVIDER);
	var nameBefore = src.substring(0, star);
	var descBefore = src.substring((star + 1), src.length);
	var found = false;
	for (var i = 1; i < len; i++) {
		src = localStorage[BADS_NAME + i];
		star = src.indexOf(DIVIDER);
		var nameAfter = src.substring(0, star);
		var descAfter = src.substring((star + 1), src.length);
		if ((!found) && (name.toLowerCase() > nameBefore.toLowerCase() && name.toLowerCase() < nameAfter.toLowerCase())) {
			localStorage[BADS_NAME + i] = name + DIVIDER + desc;
			found = true;
		} else if (found) {
			localStorage[BADS_NAME + i] = nameBefore + DIVIDER + descBefore;
		}
		nameBefore = nameAfter;
		descBefore = descAfter;
	}
	if (found) {
		localStorage[BADS_NAME + len] = nameBefore + DIVIDER + descBefore;
	} else {
		localStorage[BADS_NAME + len] = name + DIVIDER + desc;
	}

	localStorage[BADS_NAME + LEN_STR] = len + 1;

	return true;
}

function delOne(name) {
	if (!supportsLocalStorage()) {
		return false;
	}

	var saved = (localStorage[SAVED_STR + BADS_NAME] == 'true');
	if (!saved) {
		return false;
	}

	var len = parseInt(localStorage[BADS_NAME + LEN_STR]);
	var found = false;
	for (var i = 0; i < len; i++) {
		var str = localStorage[BADS_NAME + i];
		var star = str.indexOf(DIVIDER);
		var name2 = str.substring(0, star);
		var desc = str.substring((star + 1), str.length);
		if (name == name2) {
			localStorage.removeItem(BADS_NAME + String.valueOf(i));
			localStorage[BADS_NAME + LEN_STR] = len - 1;
			found = true;
		} else if (found) {
			localStorage.removeItem(BADS_NAME + i);
			localStorage[BADS_NAME + (i - 1)] = name2 + DIVIDER + desc;
		}
	}

	if (found) {
		return true;
	}
	return false;
}

function removeAll() {
	if (!supportsLocalStorage()) {
		return false;
	}

	var saved = (localStorage[SAVED_STR + BADS_NAME] == 'true');
	if (!saved) {
		return false;
	}

	localStorage.clear();

	return true;
}

function modifyOne(name, desc) {
	if (!supportsLocalStorage()) {
		return false;
	}

	var saved = (localStorage[SAVED_STR + BADS_NAME] == 'true');
	if (!saved) {
		return false;
	}

	var len = parseInt(localStorage[BADS_NAME + LEN_STR]) + 1;
	for (var i = 0; i < len; i++) {
		var str = localStorage[BADS_NAME + i];
		var star = str.indexOf(DIVIDER);
		var name2 = str.substring(0, star);
		if (name == name2) {
			localStorage[BADS_NAME + i] = name + DIVIDER + desc;
			return true;
		}
	}

	return false;
}

function supportsLocalStorage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function activateCheckBoxes() {
	$('.ui-checkbox').bind('click', function() {
		if (!this.checked) {
			this.setAttribute('checked', true);
			this.checked = true;
			$(this).find('label[for="checkbox-2b"]').removeClass("ui-checkbox-off");
			$(this).find('label[for="checkbox-2b"]').addClass("ui-checkbox-on");
			$(this).find("span").removeClass("ui-icon-checkbox-off");
			$(this).find("span").addClass("ui-icon-checkbox-on");
			areChecked.push($(this).find('.ui-li-heading').text());
		} else {
			this.setAttribute("checked", false);
			this.checked = false;
			$(this).find('label[for="checkbox-2b"]').removeClass("ui-checkbox-on");
			$(this).find('label[for="checkbox-2b"]').addClass("ui-checkbox-off");
			$(this).find("span").removeClass("ui-icon-checkbox-on");
			$(this).find("span").addClass("ui-icon-checkbox-off");
			areChecked.splice(areChecked.indexOf($(this).find('.ui-li-heading').text()), 1);
		}

		toggleRemoveButton();
	});
}

function toggleRemoveButton() {
	if (areChecked.length > 0 && $('#remove').hasClass('ui-disabled')) {
		$('#remove').removeClass('ui-disabled');
	} else if (areChecked.length <= 0 && !($('#remove').hasClass('ui-disabled'))) {
		$('#remove').addClass('ui-disabled');
	}
}

function activateSplitButtons() {
	$(".list li a.ui-li-link-alt").bind('click', function() {
		$('#name').html($(this).parent("li").find('.ui-li-heading').text());
		$('#desc').val($(this).parent("li").find('.ui-li-desc').text());
	});
}
