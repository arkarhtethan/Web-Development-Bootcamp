// Basically everything you need is here https://api.jquery.com/

// $(document).keypress(function (event){
//   $("h1").html(event.key);
// });

$(document).on("click", function() {
  $("h1").css("color", "red");
});

$(document).on("click", function() {
  // animate only works for properties with numeric values so you can't change stuff like color to red.
  $("h1").animate({opacity: 0.5});
});

// $(document).on("mouseover", function() {
//   $("h1").css("color", "red");
// });

// .on(event, function), event https://developer.mozilla.org/en-US/docs/Web/Events
// .css("property", "new value"); to change css.
// .html or .text (innerHTML and innerText) respectively (i think)
// .addClass, .removeClass etc.
// .before, .after (added before or after the tag)
// .prepend, .append (added in the same tag) but before the text
// .hide, .show, .toggle to hide and show elements.
// .fadeOut, .fadeIn, .fadeToggle, smoother version of the above.
// .slideUp, .slideDown, .slideToggle
// .animate for more customisable css rules
// can change multiple methods simply by calling them one after another e.g. .slideUp().slideDown().animate({})
