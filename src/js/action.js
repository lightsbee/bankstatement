'use strict';

$(document).ready(function(){

  $('.slide-benefit').slick({
    infinite: true,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 12000,
		arrows: false,
		asNavFor: ".slide-content",

    centerMode: true,
    focusOnSelect: true,
    centerPadding: '80px',
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '70px',
          slidesToShow: 1,
					focusOnSelect: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '70px',
          slidesToShow: 1,
					focusOnSelect: true,
        }
      }
    ]
  });


	$('.slide-content').slick({
		slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,

	  asNavFor: '.slide-benefit'
	});

	// animated for menu items, when hover another item, current active item will become normal until unhover that item
	var currentActiveItemMenu = $("#menu .active");

	$("#menu > .items").hover(function(){
		$("#menu > .items").removeClass("active");
		$(this).addClass("active");
	}, function() {
		$("#menu > .items").removeClass("active");
		currentActiveItemMenu.addClass("active");
	});

	//scroll "request a demo" action to contact
	$(".register-to-preview-btn").click(function() {
	   $('html, body').animate({
	     scrollTop: $("#get-in-touch").offset().top
	   }, 1000);
	});

});

//more JavaScript less jQuery
window.onload = function(){
	// Get the modal
	var modalShowMlPartner = document.getElementById('modalShowMlPartner');
	var modalShowMpPartner = document.getElementById('modalShowMpPartner');
	var modalShowNlPartner = document.getElementById('modalShowNlPartner');
	var modalShowBkPartner = document.getElementById('modalShowBkPartner');
	var modalShowBanks = document.getElementById('modalShowBanks');

	// Get the button that opens the modal
	var btnShowMlPartner = document.getElementById("MlPartner");
	var btnShowMpPartner = document.getElementById("MpPartner");
	var btnShowNlPartner = document.getElementById("NlPartner");
	var btnShowBkPartner = document.getElementById("BkPartner");
	var btnShowBanks = document.getElementById("banks");

	// Get the <span> element that closes the modal
	var closeMl = modalShowMlPartner.querySelector(".close");
	var closeMp = modalShowMpPartner.querySelector(".close");
	var closeBanksModal = modalShowBanks.querySelector(".close");
	var closeNl = modalShowNlPartner.querySelector(".close");
	var closeBk = modalShowBkPartner.querySelector(".close");

	// When the user clicks on the button, open the modal
	function showModal(modal){
		modal.style.display = 'block';

	}

	btnShowMlPartner.onclick = function(){
		showModal(modalShowMlPartner)
	};

	btnShowBanks.onclick = function() {
		showModal(modalShowBanks)
	};

	btnShowMpPartner.onclick = function() {
		showModal(modalShowMpPartner)
	};

	btnShowNlPartner.onclick = function() {
		showModal(modalShowNlPartner)
	};

	btnShowBkPartner.onclick = function() {
		showModal(modalShowBkPartner)
	};

	// When the user clicks on <span> (x), close the modal
	function closeModal(modal){
		modal.style.display = "none";
	}

	closeMl.onclick = function() {
		closeModal(modalShowMlPartner)
	};

	closeMp.onclick = function() {
		closeModal(modalShowMpPartner)
	};

	closeNl.onclick = function() {
		closeModal(modalShowNlPartner)
	};

	closeBk.onclick = function() {
		closeModal(modalShowBkPartner)
	};

	closeBanksModal.onclick = function() {
		closeModal(modalShowBanks)
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
			if (event.target == modalShowMlPartner || event.target == modalShowMpPartner || event.target == modalShowBanks) {
				modalShowMlPartner.style.display = "none";
				modalShowMpPartner.style.display = "none";
				modalShowBanks.style.display = "none";
			}
	}

};

//------------------ Get banks json
var listBankUrl = 'https://assets.finsify.com/service.json';
var request = new XMLHttpRequest();

request.open('GET', listBankUrl, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    getLastUpdate(data.last_update);
    parseBanks(data.data);
		getNumberOfBanks(data.data);
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

function getNumberOfBanks(number){
	document.getElementById("bank-number").innerText = number.length;
}

function getLastUpdate(time){
	var date = new Date(time*1000);
	$('#modalShowBanks .last-update').text(formatDateMonth(date.getDate()) +"/"+ formatDateMonth(date.getMonth() + 1) +"/"+ date.getFullYear())
}

function formatDateMonth(number){
	return number < 10 ? '0' + number : number;
}

function parseBanks(data) {
	$("#modalShowBanks .bank-list").empty();

	for (var i = 0; i < data.length; i++) {

		$("#modalShowBanks ." + data[i].country_code.toLowerCase() + " .bank-list").append("<li>"
		  + "<img src='" + data[i].media_path + data[i].logo_file_name + "' alt='logo' width='48'>"
		  + "<p>" + data[i].name + "</p>"
		  + "</li>")
	}
}

//------------------- Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
function toggleItemsMenu() {
    var x = document.getElementById("menu");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }

		var hamburger = document.getElementById('hamburger');
		hamburger.classList.toggle('is-active');
}


//------------------- ANIMATED FOR WAVES
var $$ = {};

/*========================================
Utility
========================================*/

$$.PI = Math.PI;
$$.TAU = $$.PI * 2;

$$.rand = function (min, max) {
	if (!max) {
		var max = min;
		min = 0;
	}
	return Math.random() * (max - min) + min;
};

/*========================================
Initialize
========================================*/

$$.init = function () {
	$$.c = document.querySelector('canvas');
	$$.ctx = $$.c.getContext('2d');
	$$.simplex = new SimplexNoise();
	$$.events();
	$$.reset();
	$$.loop();
};

/*========================================
Reset
========================================*/

$$.reset = function () {
	$$.w = window.innerWidth;
	$$.h = window.innerHeight;
	$$.cx = $$.w / 2;
	$$.cy = $$.h / 2;
	$$.c.width = $$.w;
	$$.c.height = $$.h;

	$$.count = Math.floor($$.w / 50);
	$$.xoff = 0;
	$$.xinc = 0.05;
	$$.yoff = 0;
	$$.yinc = 0.003;
	$$.goff = 0;
	$$.ginc = 0.003;
	$$.y = $$.h * 0.83;
	$$.length = $$.w;
	$$.amp = 40;
};

/*========================================
Event
========================================*/

$$.events = function () {
	window.addEventListener('resize', $$.reset.bind(undefined));
};

/*========================================
Wave
========================================*/

$$.wave = function () {
	$$.ctx.beginPath();
	var sway = $$.simplex.noise2D($$.goff, 0) * $$.amp;
	for (var i = 0; i <= $$.count; i++) {
		$$.xoff += $$.xinc;
		var x = $$.cx - $$.length / 2 + $$.length / $$.count * i;
		var y = $$.y + $$.simplex.noise2D($$.xoff, $$.yoff) * $$.amp + sway;
		$$.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
	}
	$$.ctx.lineTo($$.w, $$.h);
	$$.ctx.lineTo(0, $$.h);
	$$.ctx.closePath();
	$$.ctx.fillStyle = 'hsla(172, 76%, 54%, .3)';
	// $$.ctx.fillStyle = 'hsla(210, 90%, 50%, 0.2)';
	$$.ctx.fill();
};

/*========================================
Loop
========================================*/

$$.loop = function () {
	requestAnimationFrame($$.loop);
	$$.ctx.clearRect(0, 0, $$.w, $$.h);
	$$.xoff = 0;
	$$.wave();
	$$.wave();
	$$.wave();
	$$.wave();
	$$.yoff += $$.yinc;
	$$.goff += $$.ginc;
};

/*========================================
Start
========================================*/

$$.init();
