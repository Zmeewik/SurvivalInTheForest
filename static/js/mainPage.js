window.addEventListener('load', function () {
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        // Проверка скорости соединения
        if (connection.downlink <= 0.5 || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            // Редирект на лёгкую версию
            window.location.href = 'ExtremePage.html';
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = Array.from(document.querySelectorAll('.nav a'));
    if (!window.location.pathname.endsWith("Main.html"))
        navLinks.splice(0, 1);
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

    //Обновление тем и карточек
    window.addEventListener('scroll', () => {
        UpdateMenu(navLinks, sections);
        UpdateParallax(); 
    });
    UpdateMenu(navLinks, sections);
    CardsFlyOff();
    
    //Менять видимость элементов
    MediaRequest();
    window.addEventListener('resize', MediaRequest);

    //Открытие всплывающего окна
    OpenWindow();
});

//Обновление зажигания меню
function UpdateMenu(navLinks, sections)
{
    //Обработка для маленьких экранов
    if (window.innerWidth < 1000) 
    {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        return;
    }
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop-400;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

//Параллакс фона
function UpdateParallax()
{
    //Обработка для маленьких экранов
    if (window.innerWidth < 1000) return;
    const scrollY = window.scrollY;
    const mainTop = document.querySelector('.main');

    if (mainTop) {
        mainTop.style.backgroundPositionY = `${scrollY * - 0.5}px`; // скорость 0.5 от прокрутка
    }
}

//Вылет карточек слева и справа
function CardsFlyOff()
{
    const boxes = document.querySelectorAll('.article_box');

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const box = entry.target;
                box.classList.add('show');
                observer.unobserve(box);
            }
        });
    }, {
        threshold: 0.2
    });

    boxes.forEach((box, index) => {
        // Чередуем направление
        if (index % 2 === 0)
            box.classList.add('left');
        else
            box.classList.add('right');
        observer.observe(box);
    });
}


function MediaRequest()
{
    const element = document.getElementById('lineNav');
    if (window.innerWidth < 1000) {
        element.style.display = 'none';
    } else {
        element.style.display = '';
    }
}

function OpenWindow()
{
    if(window.location.pathname.endsWith("Food.html"))
    {
    document.querySelectorAll(".showImage").forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
      
          const blockName = this.getAttribute("name");
          console.log("Имя блока:", blockName);
      
          //Выводим соответствующую картинку
          const image = document.getElementById("imageToShow");
          document.getElementById("imageModal").style.display = "block";
          image.src = `../Assets/Images/Food/${blockName}.jpg`;
        });
      });
      
      //Сокрытие при клике на кнопке закрыть
      document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("imageModal").style.display = "none";
      });
      
      //Сокрытие при клике вне окна
      window.addEventListener("click", function(e) {
        const modal = document.getElementById("imageModal");
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }
}