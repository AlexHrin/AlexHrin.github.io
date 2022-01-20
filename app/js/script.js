// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

$(document).ready(function () {
   $('.main-form').submit(function (e) {
      e.preventDefault();
      let errors = false;
      let form = $(this);

      $(this).find('input').each(function () {
         if (!$(this).hasClass("hide")) {
            if ($.trim($(this).val()) == '') {
               errors = true;
               $(this).next().text('Не заповнено поле ');
            }
         }
      });

      if (!errors) {
         let data = $(this).serialize();
         console.log(data);
         $.ajax({
            url: 'send.php',
            type: 'POST',
            data: data,
            success: function (res) {
               form[0].reset();
               form.parent().find('.form-title').css("display", "none");
               form.css("display", "none");
               form.next().css("display", "block");

               setTimeout(function () {
                  form.parent().find('.form-title').css("display", "block");
                  form.css("display", "block");
                  form.next().css("display", "none");
               }, 4000);
            },
            error: function () {
               console.log('Ошибка');
            }
         });
      }

      return false;
   });
});