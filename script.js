"use strict"
document.addEventListener('DOMContentLoaded', function () {
    const errors = {
        surname: false,
        name: false,
        age: false,
        email: false,
        feedBack: false
    }

    const elements = {
        surname: document.querySelector('[data-error-surname]'),
        name: document.querySelector('[data-error-name]'),
        age: document.querySelector('[data-error-age]'),
        email: document.querySelector('[data-error-email]'),
        feedBack: document.querySelector('[data-error-feedBack]'),
        errorHolder: document.querySelector('[data-errors]'),
        inputData: document.querySelector('[data-field-date]'),
        surnameData: document.querySelector('[data-field-surname]'),
        nameData: document.querySelector('[data-field-name]'),
        ageData: document.querySelector('[data-field-age]'),
        emailData: document.querySelector('[data-field-email]'),
        formButton: document.querySelector('[data-form-button]')
    }

    const selects = {
        selectDataOne: document.querySelector('[data-select-1]'),
        selectDataTwo: document.querySelector('[data-select-2]'),
        themesData: document.querySelector('[data-input]')
    }


    let hasError = false
    const form = document.getElementById('form')

    initSelect()

    form.addEventListener('submit', formSend)
    elements.inputData.addEventListener('input', function (event) {
        const date = new Date(event.target.value).getTime()
        const today = new Date().getTime()
        const age = new Date(today - date) / 1000 / 60 / 60 / 24 / 365

        errors.age = age < 18;
        displayErrors()
    })

    elements.surnameData.addEventListener('input', function (event) {
        errors.surname = surnameTest(event.target)
        displayErrors()
    })

    elements.nameData.addEventListener('input', function (event) {
        errors.name = nameTest(event.target)
        displayErrors()
    })

    elements.emailData.addEventListener('input', function (event) {
        errors.email = emailTest(event.target)
        displayErrors()
    })


    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(form)

        if (error === 0) {

        }
    }

    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index]
            formRemoveError(input)

            if (input.classList.contains('_surname')) {
                if (surnameTest(input)) {
                    formAddError(input)
                    error++
                }
            }

            if (input.classList.contains('_name')) {
                if (nameTest(input)) {
                    formAddError(input)
                    error++
                }
            }

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input)
                    error++
                }
            }

            if (input.value === '') {
                formAddError(input)
                error++
            }
        }
        return error
    }


    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
        displayErrors()
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
        displayErrors()
    }

//    Функция теста surname
    function surnameTest(input) {
        return !/^[А-ЯЁ][а-яё]*(([-][А-ЯЁ][а-яё]*)?)*$/.test(input.value)
    }

//    Функция теста name
    function nameTest(input) {
        return !/^[А-ЯЁ][а-яё]*(([-][А-ЯЁ][а-яё]*)?)*$/.test(input.value)
    }

//    Функция теста email
    function emailTest(input) {
        return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value)
    }

    function displayErrors() {
        hasError = false
        for (let key in errors) {
            if (errors[key]) {
                hasError = true
                break
            }
        }

        if (hasError) {
            elements.formButton.setAttribute('disabled', true)
            elements.errorHolder.style.display = 'block'
        } else {
            elements.errorHolder.style.display = 'none'
            elements.formButton.setAttribute('disabled', false)
        }


        if (errors.age) {
            elements.age.style.display = 'block'
        } else {
            elements.age.style.display = 'none'
        }

        if (errors.name) {
            elements.name.style.display = 'block'
        } else {
            elements.name.style.display = 'none'
        }

        if (errors.surname) {
            elements.surname.style.display = 'block'
        } else {
            elements.surname.style.display = 'none'
        }

        if (errors.email) {
            elements.email.style.display = 'block'
        } else {
            elements.email.style.display = 'none'
        }
    }

    function initSelect() {
        clearSelect()
        selects.selectDataOne.addEventListener('change', function (event) {
            clearSelect()

            if (this.value === 'script') {
                installSelect('script')
            } else if (this.value === 'music') {
                installSelect('music')
            } else if (this.value === 'movie') {
                installSelect('movie')
            }
        })

        selects.selectDataTwo.addEventListener('change', function () {
            if (this.value === 'other_themes') {
                selects.themesData.style.display = 'block'
            } else {
                selects.themesData.style.display = 'none'
            }
        })
    }


    function clearSelect() {
        const options = document.querySelectorAll('[data-theme]')
        for (let key of options) {
            key.style.display = 'none'
        }
    }


    function installSelect(name) {
        const options = document.querySelectorAll(`[data-theme-${name}]`)
        for (let key of options) {
            key.style.display = 'block'
        }
    }
});