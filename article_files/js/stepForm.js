$('document').ready(function () {
    var questions,
        theForm = $('#theForm'),
        isValid,
        question = $('ol.questions > li'),
        questionsCount,
        current = 1,
        // jquery validator plugin validation method or whatever
        validator = $("#theForm").validate({
            errorPlacement: function (error, element) {
                $('.formError').html(error);
            }
        });

    questions = $('ol.questions').find('li');
    questionsCount = questions.length;

    function updateUI(to) {
        if (to <= questionsCount) {
            $('.currentNo').html(to + ' / ' + questionsCount);
        }
        var lineWidth = ((to - 1) * 100) / questionsCount;
        $('.line').css('width', lineWidth + '%');
    }

    function doneUI() {
        $('.complete').fadeIn();
        $('.questions').addClass('hide');
        $('.status, .progress').fadeOut();
        $(question).find('input').blur();
    }

    function focusThis(position) {
        if (current != questionsCount) {
            question.removeClass('current');
            $('ol.questions > li:nth-child(' + position + ')').addClass('current');
        }
        updateUI(position);
        $('.current input').focus();
        console.log('end');
    }

    function nextQuestion() {
        focusThis(current + 1);
        // this if statement checks wheather this is the last question, if it is form submittion is initiated and status is displayed
        if (current == questionsCount) {
            console.log('now submit');
            theForm.submit();
            doneUI();
        } else {
            // if not the last question current question counter is increased by one
            current++;
        }
    }

    function prevQuestion() {
        if (current > 1) {
            current--
        };
        focusThis(current);
    }

    function formReset() {
        current = 1;
        focusThis(current);
        $('.complete').fadeOut();
        $('.questions').removeClass('hide');
        $('.status, .progress').fadeIn();
    }


    function checkEntry() {
        //using validator plugin here
        isValid = validator.element(".current input");
        if (isValid) {
            console.log('is valid');
            nextQuestion();
        } else {
            console.log('not valid');
            // throw error
        }
    }

    updateUI(0);
    $('ol.questions > li:nth-child(' + current + ')').addClass('current');

    theForm.on('click', function () {
        $('ol.questions > li:nth-child(' + current + ')').addClass('current');
        $('.current input').focus();
        updateUI(current);
    });



    $('ol.questions > li input').on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        // enter
        if (keyCode === 13) {
            e.preventDefault();
            // function used to check input field value
            checkEntry();
        }
    });


    theForm.on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        // tab
        if (keyCode === 9) {
            e.preventDefault();
        }
    });


    $('#next').click(function () {
        checkEntry();
    });
    $('#prev').click(function () {
        prevQuestion();
    });
    $('#reset').click(function () {
        formReset();
    });

    $('#theForm').submit(function (e) {
        console.log('sending data');
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    $('#reset').fadeIn();
                    $('.done').html("Sorry, invalid Email.");
                } else {
                    $('#reset').fadeOut();
                    $('.done').html("Thank you! We’ll be in touch.");
                }
            });
    });



});