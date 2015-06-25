 $('document').ready(function () {
     
    var questions,
        theForm = $('#theForm'),
        isValid,
        question = $('ol.questions > li'),
        questionsCount,
        current = 1;
    var validator = $( "#theForm" ).validate();
     
        questions = $('ol.questions').find('li');   
        questionsCount = questions.length;
        console.log(questionsCount);    
     
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
        }
     
        function focusThis(position){
            question.removeClass('current');
            updateUI(position);
            $('ol.questions > li:nth-child('+position+')').addClass('current');
            $('.current input').focus();
        }
     
        function updateUI(to){
            $('.currentNo').html(to);
            var lineWidth = ((to-1)*100)/questionsCount;
            $('.line').css('width',lineWidth+'%');
        }
     
        $('#theForm').submit(function (e) {
            console.log('sending data');
            e.preventDefault();
            $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {                
                if (data.Status === 400) {
                    $('#reset').fadeIn();
                    $('.final-message').html(data.Message);
                } else {
                    $('.final-message').html(data.Message);
                }
            });
        });  
     
     
 });