export function initListAccount() {
    const accounts = [
        {id: 902970953, accountName: "grtuckerbw@hotmail.com", password: "Tt329075@"},
        {id: 900053246, accountName: "godthien2007@gmail.com", password: "(simphutao2007)"},
        {id: 900867732, accountName: "phungquangminh766@gmail.com", password: "Dkm@819154"},
        {id: 900730942, accountName: "tamthanhm780@gmail.com", password: "tt281207"},
        {id: 900214018, accountName: "bichchau041108@gmail.com", password: "Chau0411"},
        {id: 905064737, accountName: "c6qzzlt2d@outlook.com", password: "minhkhang300405"},
        {id: 907300175, accountName: "rjkivdzgh6691@outlook.com", password: "Ainz1042"},
        {id: 905568232, accountName: "thebao9740@gmail.com", password: "Tran2059"},
        {id: 900676857, accountName: "honglua05814@gmail.com", password: "44360582h"},
        {id: 902801515, accountName: "leviriosmc@outlook.com", password: "baudevilgh12099."},
        {id: 901361896, accountName: "minhnhatrasengan1@gmail.com", password: "tnhan123a"}
    ];

    return accounts;
}

export function getAccountById(id) {
    const accounts = initListAccount();

    return accounts.find(acc => acc.id === id);
}
