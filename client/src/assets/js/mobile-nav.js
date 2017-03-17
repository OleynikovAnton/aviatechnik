$('.js-toggle-menu').click(function(e){
  e.preventDefault();
  $('.mobile-header-nav').slideToggle();
  $(this).toggleClass('open');
});