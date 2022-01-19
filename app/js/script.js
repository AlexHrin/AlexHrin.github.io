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


// Отправка данных на сервер
function send(event, php) {
   console.log("Отправка запроса");
   console.log(php);
   event.preventDefault ? event.preventDefault() : event.returnValue = false;
   var req = new XMLHttpRequest();
   req.open('POST', php, true);
   req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
         json = JSON.parse(this.response); // Ебанный internet explorer 11
         console.log(json);

         // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
         if (json.result == "success") {
            // Если сообщение отправлено
            alert("Сообщение отправлено");
         } else {
            // Если произошла ошибка
            alert("Ошибка. Сообщение не отправлено");
         }
         // Если не удалось связаться с php файлом
      } else { alert("Ошибка сервера. Номер: " + req.status); }
   };

   // Если не удалось отправить запрос. Стоит блок на хостинге
   req.onerror = function () { alert("Ошибка отправки запроса"); };
   req.send(new FormData(event.target));
}
