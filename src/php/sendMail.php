<div class="container-form form-hide">
    <div class="wrap-form ">
        <form action="" method="POST" id="contact">
            <div><p class="close">Х</p></div>
            <fieldset>
                <legend>Заполните поля</legend>
                <input type="text" name="name" class="name" placeholder="Введите ваше имя" required><br>
                <input type="email" name="email" class="email" placeholder="Введите ваш email" required><br>
                <input type="tel" name="tel" class="tel" placeholder="0-000-000-00-00" required> <br><br>
                <textarea name="msg" class="msg" cols="30" rows="10" placeholder="Задайте ваш вопрос" required></textarea><br>
                <input type="button" id="sendMail" value="Отправить"><br>
            </fieldset>
            <div class="error"></div>
        </form>
    </div>
</div>
