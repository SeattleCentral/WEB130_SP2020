import * as $ from 'jquery'

export function renderLoginForm() {
    const content = $('#content')

    const loginFormHtml = `
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8">
                <form id="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" name="username" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" id="password">
                    </div>
                    <button id="login-submit" class="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    `

    content.html(loginFormHtml)

    $('#login-submit').on('click', function(event) {
        event.preventDefault()
        const data = $('#login-form').serializeArray()
        console.log(data)

        // redirect to the article edit page.
    })
}