

export function formatBrl(str: any){
    var str = str.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return str
}