'use strict';
let form = document.querySelector('.container-form');
let formBtn = document.querySelector('.pressed-button');
let close = document.querySelector('.close');
// Показываем форму обратной связи
formBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    form.classList.remove('form-hide');
    form.classList.add('form-show')

})
// Скрываем форму обратной связи
function closeFunc(){
    form.classList.remove('form-show')
    form.classList.add('form-hide');
}

close.addEventListener('click',()=>{
    form.classList.remove('form-show')
    form.classList.add('form-hide');

});

// Ajax запрос к БД

$('#sendMail').on('click',function (){
    let name = $('.name').val().trim();
    let email = $('.email').val().trim();
    let tel = $('.tel').val().trim();
    let msg = $('.msg').val().trim();

    if(name == ""){
        $('.error').text("Введите ваше имя");
        return false;
    } else if(email == ""){
        $('.error').text("Введите ваш email");
        return false;
    } else if(tel == ""){
        $('.error').text("Введите ваш телефон");
        return false;
    } else if(msg == ""){
        $('.error').text("Введите ваше сообщение");
        return false;
    }
    $('.error').text('Сообщение отправлено')

    $.ajax({
        url: 'php/validation.php',
        type: 'POST',
        cache: false,
        data: {
            'name': name,
            'email': email,
            'tel': tel,
            'msg': msg
        },
        dataType: 'html',
        beforeSend: function (){
            $('#sendMail').prop('disabled', true);
        },
        success: function (data){
            if (!data)
                alert('были ошибки, сообщение не отправлено');
            else
                $('#contact').trigger('reset');
            $('#sendMail').prop('disabled', false);
            setTimeout(closeFunc,2000)

        }
    });
})

