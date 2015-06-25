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
                 console.log(error)
                 $('.formError').html(error);
             }
         });
     
     

     //counte the number of question and store it in questions variable
     questions = $('ol.questions').find('li');
     questionsCount = questions.length;

     //setting initial UI
     //      add current class to first input field
     updateUI(0);
     $('ol.questions > li:nth-child(' + current + ')').addClass('current');

     //focus on the first question by clicking anywhere on the form
     theForm.on('click', function () {
         $('ol.questions > li:nth-child(' + current + ')').addClass('current');
         $('.current input').focus();
         updateUI(current);
     });

     // detecting enter key for the validation process to begin and if the validation is good, focus on the next input field
     $('ol.questions > li input').on('keydown', function (e) {
         var keyCode = e.keyCode || e.which;
         // enter
         if (keyCode === 13) {
             e.preventDefault();
             // function used to check input field value
             checkEntry();
         }
     });

     //preventing user from using tab key, by accidently moving tabbing around to the next input field
     theForm.on('keydown', function (e) {
         var keyCode = e.keyCode || e.which;
         // tab
         if (keyCode === 9) {
             e.preventDefault();
         }
     });

     // next button takes your to the next field if the input value is valid
     $('#next').click(function () {
         checkEntry();
     });
     //takes you back to the previous question, if it is not the first question
     $('#prev').click(function () {
         prevQuestion();
     });
     //insitiats form reset
     $('#reset').click(function () {
         formReset();
     });

     
     //this function takes focus to the next input field if the validatin is passed
     function checkEntry() {
         //using validator plugin here
         isValid = validator.element(".current input");
         if (isValid) {
             console.log('is valid');
             nextQuestion();
         } else {
             console.log('not valid');
             //                throw error
         }
     }

     //function to focus on next question, work only after validation
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

     //function to take back user to the previous question
     function prevQuestion() {
         if (current > 1) {
             current--
         };
         focusThis(current);
     }

     //function to reset everthing to the initial stage
     function formReset() {
         current = 1;
         console.log('reset');
         focusThis(current);
         $('.complete').fadeOut();
         $('.questions').removeClass('hide');
         $('.status, .progress').fadeIn();
     }

     //funciton used to focus on current value passed as an argument
     function focusThis(position) {
         if (current != questionsCount) {
             question.removeClass('current');
             $('ol.questions > li:nth-child(' + position + ')').addClass('current');
         }
         updateUI(position);
         $('.current input').focus();
         console.log('end');
     }

     //function to update question number or progress bar UI
     function updateUI(to) {
         if (to <= questionsCount) {
             $('.currentNo').html(to + ' / ' + questionsCount);
         }
         var lineWidth = ((to - 1) * 100) / questionsCount;
         $('.line').css('width', lineWidth + '%');
     }

     //function initiated if the last question is submitted, fadesIn the status div
     function doneUI() {
         $('.complete').fadeIn();
         $('.questions').addClass('hide');
         $('.status, .progress').fadeOut();
         $(question).find('input').blur();
     }

     //campaign monitor ajax request functionality
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