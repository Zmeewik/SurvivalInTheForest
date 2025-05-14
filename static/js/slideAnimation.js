$(document).ready(function () {
    const tileHeight = 30; // высота одного тайла

    // Навешиваем обработчик на ссылку <a>
    $('a').hover(
        function () {
            // Смещаем фон вверх на один тайл (иллюзия прокрутки)
            $(this).find('.image-wrapper').css('background-position', `0 -${tileHeight}px`);
        },
        function () {
            // Возвращаем фон в исходное положение
            $(this).find('.image-wrapper').css('background-position', `0 0`);
        }
    );
});