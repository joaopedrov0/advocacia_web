const agendamentoArea = document.querySelector(".agendamentos")
const editForm = document.querySelector("#editForm")
const editModal = new bootstrap.Modal(document.querySelector("#editModal"))
const deleteBtn = document.querySelector(".delete-btn")
const editAccountModal = new bootstrap.Modal(document.querySelector("#editUsuario"))
const accountForm = document.querySelector("#accountForm")

accountForm.addEventListener("submit", (e) => {
    e.preventDefault()
    editUsuario()
})



function renderQuantidade(qtd){
    const quantidade = document.querySelector(".quantidade-agendamentos")
    quantidade.innerText = `Agendamentos salvos: ${qtd}`
}

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let indice = e.target[0].value
    editAgendamento(indice)
})

function renderizaSaudacao(){
    const saudacao = document.querySelector(".saudacao")
    saudacao.innerText = `Olá ${recuperaUsuarioLogado().nome}!`
}
renderizaSaudacao()

function renderAgendamentos(){
    let agendamentos = recuperaUsuarioLogado().agendamentos
    temp = ""

    renderQuantidade(agendamentos.length)

    for (let indice in agendamentos) {
        console.log(indice)
        temp = buildAgendamentoCard(agendamentos[indice], indice) + temp
    }

    agendamentoArea.innerHTML = temp
}

function formatarData(dateString) {
    if (!dateString || typeof dateString !== 'string' || !dateString.includes('-')) {
      return "Data inválida";
    }
    const partes = dateString.split('-');
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }

function buildAgendamentoCard(agendamento, indice){
    return `
    <div class="agendamento-card p-3 m-2">

        <div class="data-field p-2">
            <div class="subject-field mb-3">
                <i class="bi bi-chat-left"></i>
                ${agendamento.subject}
            </div>
            <div class="scheduling-field d-flex gap-4 align-items-center">
                <div class="date-field">
                    <i class="bi bi-calendar4-event"></i>
                    ${formatarData(agendamento.date)}
                </div>
                <div class="time-field">
                    <i class="bi bi-clock"></i>
                    ${agendamento.time}
                </div>
            </div>
        </div>

        <div class="edit-btn" onclick="modalEdit(${indice})">
            <i class="bi bi-pencil"></i>
        </div>

    </div>
    `
}

renderAgendamentos()

function editAgendamento(indice){
    const date = document.querySelector("#date").value
    const time = document.querySelector("#time").value
    const subject = document.querySelector("#subject").value

    const data = getData()

    data[recuperaEmailLogado()].agendamentos[indice] = {
        "date": date,
        "time": time,
        "subject": subject
    }

    saveData(data)

    renderAgendamentos()

    ocultaModal(editModal)
    
}

function deleteAgendamento(){
    let indice = document.querySelector("#agendamento-id").value
    const data = getData()
    data[recuperaEmailLogado()].agendamentos.splice(indice, 1)
    saveData(data)
    renderAgendamentos()
    ocultaModal(editModal)
}

function modalEdit(indice){
    console.log(`Modal pra editar ${indice}`)
    const agendamento = recuperaUsuarioLogado().agendamentos[indice]

    document.querySelector("#agendamento-id").value = indice
    document.querySelector("#date").value = agendamento.date
    document.querySelector("#time").value = agendamento.time
    document.querySelector("#subject").value = agendamento.subject

    exibeModal(editModal)
}

function usuarioModal(){
    const usuario = recuperaUsuarioLogado()
    document.querySelector("#name").value = usuario.nome
    document.querySelector("#email").value = recuperaEmailLogado()
    exibeModal(editAccountModal)
}

function editUsuario(){
    const nome = document.querySelector("#name").value
    const data = getData()
    data[recuperaEmailLogado()].nome = nome
    saveData(data)
    ocultaModal(editAccountModal)
    renderizaSaudacao()
}

function deleteUsuario(){
    const data = getData()
    delete data[recuperaEmailLogado()]
    saveData(data)
    logout()
    redirect('index.html')
}