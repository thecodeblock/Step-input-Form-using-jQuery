 $('document').ready(function () {
     
    var questions,
        theForm = $('#theForm'),
        isValid,
        question = $('ol.questions > li'),
        questionsCount,
        current = 1;
    var validator = $( "#theForm" ).validate({
        errorPlacement: function (error, element) {
                console.log(error)
                $('.formError').html(error);
        }});
     
        questions = $('ol.questions').find('li');   
        questionsCount = questions.length;
        updateUI(0);  
        $('ol.questions > li:nth-child('+current+')').addClass('current');
     
        theForm.on('click',function(){
            $('ol.questions > li:nth-child('+current+')').addClass('current');
            $('.current input').focus();
            updateUI(current);
        });
     
        $('ol.questions > li input').on('keydown', function(e){
            var keyCode = e.keyCode || e.which;
            // enter
            if( keyCode === 13 ) {
				e.preventDefault();
                checkEntry();
                console.log('current : '+current);
			}
        });
     
        theForm.on('keydown',function(e){
            var keyCode = e.keyCode || e.which;
            // tab
            if( keyCode === 9 ) {
				e.preventDefault();
			}
        });
     
        $('#next').click(function(){
            checkEntry();
        });
        $('#prev').click(function(){
            prevQuestion();
        });
        $('#reset').click(function(){
            formReset();
        });
            
        function checkEntry(){
            isValid = validator.element(".current input");
            if(isValid){
                console.log('is valid');
                nextQuestion();
            } else {
                console.log('not valid');
//                throw error
            }
        }
     
        function nextQuestion(){
            focusThis(current+1);
            if(current == questionsCount){
                console.log('now submit');
                theForm.submit();
                doneUI();
            } else {
                current++;
            }
        }
     
        function prevQuestion(){
            if(current > 1){
                current--
            };
            focusThis(current);
        }
     
        function formReset(){
            current = 1;
            console.log('reset');
            focusThis(current);
            
            $('.complete').fadeOut();
            $('.questions').removeClass('hide');
            $('.status, #next').fadeIn();
            $('.complete > .bar').removeClass('invalid');
            $('#reset').fadeOut();
        }
     
        function focusThis(position){
            if(current != questionsCount){
                question.removeClass('current');
                $('ol.questions > li:nth-child('+position+')').addClass('current');
            }
            updateUI(position);
            $('.current').one("transitionend.my MSTransitionEnd.my webkitTransitionEnd.my oTransitionEnd.my",function() {
                $(this).off('.my');
                $('.current input').focus();
                console.log('end');
            });
        }
          
        function updateUI(to){
            if(to <= questionsCount){
                $('.currentNo').html(to + ' / ' + questionsCount);
            }
            var lineWidth = ((to-1)*100)/questionsCount;
            $('.line').css('width',lineWidth+'%');
        }
     
        function doneUI(){
            $('.complete').fadeIn();
            $('.questions').addClass('hide');
            $('.status, #next').fadeOut();
            $(question).find('input').blur();
        }
     
     
        $('#theForm').submit(function (e) {
            console.log('sending data');
            e.preventDefault();
            var Status = false;
            if (!Status) {
                $('.complete > .bar').addClass('invalid');
                $('#reset').fadeIn();
                $('.done').html("Sorry, invalid Email.");
            } else {
                $('.done').html("Thank you! We’ll be in touch.");
            }
        });  
     
     
 });