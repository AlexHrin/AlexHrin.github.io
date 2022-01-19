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
   $('#userData').submit(function () {
      let errors = false;
      $(this).find('span').empty();

      $(this).find('input, textarea').each(function () {
         if ($.trim($(this).val()) == '') {
            errors = true;
            $(this).next().text('Не заполнено поле ');
         }
      });

      if (!errors) {
         let data = $('#userData').serialize();
         $.ajax({
            url: 'index.php',
            type: 'POST',
            data: data,
            success: function (res) {
               if (data['error']) {
                  alert(data['error']);
               } else {
                  console.log('Письмo oтврaвлeнo!');
               }
            },
            error: function () {
               alert('Ошибка');
            }
         });
      }

      return false;
   });
});