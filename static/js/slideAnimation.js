$(document).ready(function () {
    const tileHeight = 25;

    $('a').hover(
        function () {
            const $img = $(this).find('.image-wrapper');

            // Анимация движения вверх
            $({ bgY: 0 }).animate(
                { bgY: -tileHeight },
                {
                    duration: 300,
                    step: function (now) {
                        $img.css('background-position', `0 ${now}px`);
                    }
                }
            );
        },
        function () {
            const $img = $(this).find('.image-wrapper');

            // Анимация возврата вниз
            $({ bgY: -tileHeight }).animate(
                { bgY: 0 },
                {
                    duration: 300,
                    step: function (now) {
                        $img.css('background-position', `0 ${now}px`);
                    }
                }
            );
        }
    );
});