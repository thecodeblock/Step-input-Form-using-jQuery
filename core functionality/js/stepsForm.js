function stepsForm(el,xsubmit){
    var questions,
        current,
        questionContainer = $('ol.questions'),
        question = $('ol.questions > li'),
        ctrlNext = $('button.next'),
        progress = $('div.progress'),
        questionStatus = $('span.number'),
        currentNum = $('span.number-current'),
        totalQuestionNum = $('span.number-total'),
        error = $('span.error-message'),
        questionsCount;
    
        var firstElInput = $('.current input'),
        isFilled;
        
        questions = questionContainer.find('li');   
        questionsCount = questions.length;
        
        current = 0;
        console.log('zzcurrent : '+current);
        isFilled = false;
        progress.css('width','0%');
        questions = questionContainer.find('li');   
        questionsCount = questions.length;
        $('ol.questions > li:nth-child(1)').addClass('current');
        
        currentNum.html(current + 1);
        totalQuestionNum.html(questionsCount);
        

        
        firstElInput.on('click focusin', function() {
            ctrlNext.addClass('show');
        });
        
        ctrlNext.on('click', function(e) {
            e.preventDefault();
            nextQuestion();
        });
        
        // pressing enter will jump to next question
        $('ol.questions > li input').on('keydown', function(e){
            var keyCode = e.keyCode || e.which;
            // enter
            if( keyCode === 13 ) {
				e.preventDefault();
				nextQuestion();
                console.log('current : '+current);
			}
        });
    
        // disable tab
        ctrlNext.on('keydown',function(e){
            var keyCode = e.keyCode || e.which;
            // tab
            if( keyCode === 9 ) {
				e.preventDefault();
			}
        });
        
        console.log(ctrlNext);
        
        
        function nextQuestion(){
            console.log('NEXT clicked');

            /*validate field*/
            if(!validate()){
                console.log('not valid');
                return false;
            }
            
            /*check if form is filled*/
            if(current >= questionsCount - 1){
                console.log('last question');
                isFilled = true;
            } else {
                isFilled = false;
            }
            
            /*remove previous errors*/
            error.removeClass('show');
            
            /*Current question*/
            var currentQuestion = questions[current];
            console.log(currentQuestion);
            
            // increment current question iterator
            ++current;
            
            // update progress bar
            updateProgress();
            
            if( !isFilled ) {
                // change the current question number/status
                updateQuestionNumber();

                // add class "show-next" to form element (start animations)
                el.addClass('show-next');

                // remove class "current" from current question and add it to the next one
                // current question
                $('ol.questions > li:nth-child('+current+')').removeClass('current');
                $('ol.questions > li:nth-child('+(current+1)+')').addClass('current');
		    }
            
            el.one("transitionend.my MSTransitionEnd.my webkitTransitionEnd.my oTransitionEnd.my",function() {
                        $(this).off('.my')
                        if(isFilled){
                            console.log('error');
                            xsubmit();
                        } else {
                            console.log('two'); 
                            $(this).removeClass("show-next");
                            $('.number-next').remove();
                            $('.current input').focus();
                        }
                    }
                );
            
        }
        
        function updateQuestionNumber() {
            questionStatus.append('<span class="number-next">'+(current+1)+'</span>');
            currentNum.html(current+1);            
	    }
    
        function updateProgress(){
            progress.css('width',current*(100/questionsCount)+'%');1
        }
    
        function validate(){
            console.log('validate');
            var qInput = $('ol.questions > li:nth-child('+(current+1)+') input'),
                vInput;
            vInput = qInput.val();
            if( vInput === '' ) {
                showError( 'EMPTYSTR' );
                return false;
            }
            return true;
        }
    
        function showError(err){
            var message = '';
            switch( err ) {
                case 'EMPTYSTR' : 
                    message = 'Please fill the field before continuing';
                    break;
                case 'INVALIDEMAIL' : 
                    message = 'Please fill a valid email address';
                    break;
                // ...
            };
            error.html(message);
            error.addClass('show');
        }
    

    
    }


