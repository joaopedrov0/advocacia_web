
if (!window.localStorage.getItem("users")){
    window.localStorage.setItem("users", JSON.stringify({}))
}



function exibeModal(elementoModal){
    elementoModal.show()
}

function ocultaModal(elementoModal){
    elementoModal.hide()
}


const logoutBtn = document.querySelector(".logout-btn")
if (!verificaLogin()){
    logoutBtn.style.display = "none"
}

function toastMessage(message){
    const toastLiveExample = document.getElementById('liveToast')

    const toastMessage = document.querySelector(".toast-body")
    toastMessage.innerText = message
    
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    // console.dir(toastBootstrap)

    toastBootstrap.show()

}

function redirect(file){ // agendamentos.html
    window.location.href = file
}

function saveData(data){
    // Recebe objeto de usuários e salva no localStorage
    window.localStorage.setItem("users", JSON.stringify(data))
}

function getData(){
    let initialData = window.localStorage.getItem("users") ? window.localStorage.getItem("users") : "{}"

    return JSON.parse(initialData)
}

// se estiver logado

    // preenche o campo de "nome" automaticamente

    // coloca o botão de agendamento direto, redirecionando para a pag de agendamentos

// se não

    // pede pra logar

        //se tiver conta

            // login com nome e senha

                // pag de agendamento

        // se não

            // modal de cadastro com campo de nome já preenchido com o formulário

                // pag de agendamentos



function logout(){
    window.sessionStorage.removeItem("login")
    // toastMessage("Logout realizado com sucesso!")
}


function autenticar(userDict, senha){
    return userDict.senha == senha ? true : false
}

function criarUsuario(email, nome, senha){
    const users = getData()
    users[email] = {
        "nome": nome,
        "senha": senha,
        "agendamentos": []
    }
    saveData(users)
    toastMessage("Usuário criado com sucesso!")
}

function salvaSessao(email){
    window.sessionStorage.setItem("login", email)
    toastMessage("Sessão salva com sucesso!")
}

function verificaLogin(){
    return window.sessionStorage.getItem("login") ? true : false
}

function recuperaUsuarioLogado(){
    if (!verificaLogin())
        return null
    const users = getData()
    const email = window.sessionStorage.getItem("login")
    return users[email]
}

function recuperaEmailLogado(){
    if (!verificaLogin())
        return null
    return window.sessionStorage.getItem("login")
}
