const formHTML = document.querySelector("#form-agendamento")
const modalCadastro = new bootstrap.Modal(document.querySelector("#cadastroModal"))
const modalLogin = new bootstrap.Modal(document.querySelector("#loginModal"))

formHTML.addEventListener("submit", (event) => {
    event.preventDefault()
    agendamentoProxy()
})


// login e cadastro
const loginForm = document.querySelector("#loginForm")
const cadastroForm = document.querySelector("#cadastroForm")

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    login()
})
cadastroForm.addEventListener("submit", (event) => {
    event.preventDefault()
    cadastro()
})



function exibeModalLogin(){
    exibeModal(modalLogin)
}

function exibeModalCadastro(){
    ocultaModal(modalLogin)
    exibeModal(modalCadastro)
}


function login(){
    const email = document.querySelector("#loginEmail").value
    const senha = document.querySelector("#loginPassword").value

    users = getData()

    if (users[email]){

        userDict = users[email]
        // Existe
        if (autenticar(userDict, senha)){
            // Senha certa
            salvaSessao(email)
            salvarAgendamento(email)
            redirect("agendamentos.html")
        } else {
            // Senha errada
            toastMessage("Senha incorreta.")
        }
    } else {
        // Não existe
        exibeModalCadastro()
        toastMessage("Usuário não existe.")
    }
    // Verifica se usuário existe

        // Existe

            // Envia Agendamento

        // Não existe

            // Cadastro
    ocultaModal(modalLogin)
}

function cadastro(){
    const nome = document.querySelector("#cadastroNome").value
    const email = document.querySelector("#cadastroEmail").value
    const senha = document.querySelector("#cadastroPassword").value
    // Pega dados do formulario

    // Cria usuário
    criarUsuario(email, nome, senha)
    salvaSessao(email)
    // retorna
    ocultaModal(modalCadastro)
}

function agendamentoProxy(){
    if (verificaLogin()){
        salvarAgendamento(recuperaEmailLogado())
        redirect("agendamentos.html")
    } else {
        exibeModalLogin()
    }
    // Logado?
        // Salva agendamento
        // Página de agendamento
    
    // Não logado?
        // Login

    
}

function salvarAgendamento(email){
    const name = document.querySelector("#name").value
    const date = document.querySelector("#date").value
    const time = document.querySelector("#time").value
    const subject = document.querySelector("#subject").value

    if (name == "" || date == "" || time == "" || subject == ""){
        toastMessage("Preencha todos os campos.")
        return
    }

    const data = getData()
    console.log(email)
    data[email].agendamentos.push({
        "name": name,
        "date": date,
        "time": time,
        "subject": subject
    })

    // data[userDict.email] = userDict

    saveData(data)

    toastMessage("Agendamento realizado com sucesso!")
}

function verAgendamentosProxy(){
    if (verificaLogin()){
        redirect("agendamentos.html")
    } else {
        exibeModalLogin()
    }
}