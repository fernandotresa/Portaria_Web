import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataInfoProvider {  

  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;

  workFunctions: Observable<any>;
  employeeTypes: Observable<any>;
  guestTypes: Observable<any>;
  sectors: Observable<any>;
  companies: Observable<any>;
  offices: Observable<any>;  
  accessPoints: Observable<any>;  
  badgeTypes: Observable<any>;  
  vehicleTypes: Observable<any>;  
  vehicleModels: Observable<any>;  
  vehicleBrands: Observable<any>;  

  accessPoint: any;  
  guestType: any;

  employeeType: any;
  employeeFunction: any;
  employeeSector: any;
  employeeCompany: any;
  employeeOffice: any;  

  vehicleType: any;  
  vehicleModel: any;  
  vehicleBrand: any;  

  isWeb: Boolean = true
  serverId: number = 1;
  userId: number = 0;
  userInfo: any;

  authorExample: string = 'Diego Queiroz dos Santos'
  clock: String;
  ipLocal: string = ""
  titleAddress: string = "Endereço"
  titleTime: string = "Horário"

  latitude: number = 0
  longitude: number = 0
  userType: number = 2
  
  appName: string = 'Portaria'
  isAdmin: Boolean = true;
  addressServer: string = "localhost"

  camerasAccessPoints: Observable<any>;  
  camerasMonitor: any = []

  crachasTipos: any = []
  
  clientPicDefault: string = "assets/imgs/100x100.png"
  imgDefaultBackground: string = "assets/imgs/background.jpg"
  imgDefaultClient: string = "assets/img/avatar-leia.png"      

  titleLastAccess: string = "Último acesso"
  titlePlate: string = "Placa"
  titleBrand: string = "Marca"
  titleModel: string = "Modelo"
  titleUsername: string = "Usuário"
  titleAdd: string = "Adicionar"
  titleAddAccess: string = "Adicionar acesso"
  titleAccessDenied: string = "Acesso negado"
  titleStart: string = "Inicio"
  titleEnd: string = "Fim"
  titleAllDay: string = "Dia inteiro?"
  titleClearSectors: string = "Limpar Setores"
  titleSave: string = "Salvar"
  titleFunction: string = "Função"
  titleVehicle: string = "Veículos"
  titleAcls: string = "ACLs"
  titlePermissionType: string = "Tipos de permissões"
  titleRead: string = "Leitura"
  titleWrite: string = "Escrita"
  titleSelectSectorAndProfiles: string = "Selecionar setor e profiles"
  titleSector: string = "Setor"
  titleSectores: string = "Selecionar setores "
  titleSelectEmployees: string = "Selecionar colaboradores"
  titleRegister: string = "Cadastrar"
  titleApp: string = "Portaria"
  titleForgotPassword: string = 'Esqueci a senha'
  titleOr: string = 'Ou'
  titleHelp: string = "Ajuda"
  titleFacebook: string = 'Logar com Facebook'
  titleGoogle: string = 'Logar com Google'
  titleLogin: string = 'Logar'
  titleCleanCal: string = "Limpar calendário"
  titleEmployeers: string = 'Colaboradores'
  titleDateEndBeforeDateStart = 'Horário final não pode ser maior que o horário inicial'
  titleGuests: string = 'Visitantes'
  titleCopyProfile: string = " - Copia"
  titleSelectAll: string = "Selecionar todos"
  titleDeselectAll: string = "Deselecionar todos"
  titlePermissions: string = "Gerenciamento de Perfis"  
  titlePermissionsAccess: string = "Gerenciamento de Perfis"
  titleAccessPoints: string = "Pontos de acesso"
  titleInstagram: string = 'Instagram'
  titleWhatsApp: string = 'WhatsApp'
  titleLoadingInformations: string = "Carregando informações...."
  titleDateendGreaterDateStart: string = "Data final não pode ser maior que a inicial"  
  titleBack: string = "Voltar"
  titleAuthError: string = "Falha ao autenticar"
  titleAuthRecoveryError: string = "E-mail incorreto"
  titleCheckMailbox: string = "Verifique sua caixa de e-mails"
  titleContinue: string = "Continuar"
  titleAuthErrorSignUp: string = "Falha ao se cadastrar, email já existe"
  titleMenu: string = "Menu"
  titleProfileExpire: string = 'Período'
  titleProfileDatetime: string = 'Datas específicas + horários'
  titleProfileDayweek: string = 'Dias da Semana + horários'
  titleProfileVacation: string = 'Férias, folgas e afastamentos'
  titleSuccess: string = "Sucesso"
  titleTitle: string = "Título"
  titleSaveError: string = "Erro ao salvar"  
  titleAcl: string = "Lista de controle de acesso"
  titleProfileCreated: string = "Perfil criado"
  titleProfileUpdated: string = "Perfil atualizado"
  titleProfile: string = "Perfil"
  titleName: string = "Nome"
  titleComumName: string = "Nome Comum"
  titleDescription: string = "Descrição"
  titleAccessType: string = "Tipo acesso"
  titleType: string = "Tipo"
  titleRegistration: string = "Matricula"
  titleCPF: string = "CPF"
  titleDistrict: string = "Bairro"
  titleTel: string = "Telefone"
  titleRamal: string = "Ramal"
  titleRG: string = "RG"
  titleBadge: string = "Crachá"
  titleOffice: string = "Cargo"
  titleCompany: string = "Empresa"
  titleAccessAssociate: string = "Seleção de Perfil"
  titleAssociate: string = "Associar"
  titleDaysWeek: string = "Dias da semana"
  titleMonday: string = "Segunda-Feira"
  titleTuesday: string = "Terça-Feira"
  titleWednesday: string = "Quarta-Feira"
  titleThursday: string = "Quinta-Feira"
  titleFriday: string = "Sexta-Feira"
  titleSaturday: string = "Sábado"
  titleSunday: string = "Domingo"
  titleEntrace: string = "Entrada"
  titleExit: string = "Saída"
  titleApplyChecked: string = "Aplicar marcados"  
  titleWarning: string = "Atenção"  
  titlePleaseUnselect: string = "Deseja remover a data final?"
  titleBefore: string = "Anterior"
  titleAfter: string = "Próximo"
  titleRange: string = "Range"
  titleConfirmStart: string = "Confirmar data inicial?"
  titleConfirmEnd: string = "Confirmar data final?"
  titleSelect: string = 'Selecionar'
  titleBlockUser: string = "Bloquear usuário"  
  titleActiveUser: string = "Desbloquear usuário"
  titleSelectOption: string = 'Selecionar Opção'
  titleMultipleUpdate: string = "Atualização múltipla"
  titleAccessRules: string = "Perfis de acesso"
  titleContinueOperation: string = "Deseja continuar?"
  titleRemoveProfile: string = "Remover Perfil"
  titleSearch: string = "Procurar"
  titleCancel: string = "Cancelar"
  titleCalendarDatetime: string = "Calendário com horários"
  titleCalendar: string = "Calendário"
  titleDuplicate: string = "Duplicar"
  titleDoYouWantRemove: string = "Confirmar remoção?"
  titleDoYouWantUpdate: string = "Confirmar edição?"
  titleDoYouBlockThisUser: string = "Deseja realmente inativar esse usuário?"
  titleDoYouActiveThisUser: string = "Deseja realmente ativar esse usuário?"
  titleOperationSuccess: string = "Operação realizada com sucesso!"
  titleRemove: string = "Remover"
  titleEdit: string = "Editar"
  titleMessageAndAlerts: string = "Mensagens e alertas"
  titleNotInformed: string = "Não informado"
  titleCopy: string = "Duplicar"  
  titlePeriod: string = "Período"  
  pleaseWait: string = "Favor aguarde";
  uploading: string = "Enviando foto";  
  erro: string = "Erro"
  notAvailable: string = "Não acessível do browser"
  added: string = "Adicionado"    
  titleAreYouSure: string = "Tem certeza disso?"  
  titleUsernameMinLenght: string = "Usuário deve ter apartir de 6 caracteres"    
  titleUsers: string = "Usuários"
  titlePasswordMinLenght: string = "Senha deve ter apartir de 6 caracteres"    

  constructor(public platform: Platform) {    

   if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isWeb = true;
    } else {
      this.isWeb = false;
    }

    moment.locale('pt-br');  
    this.startClock()    

    this.employeeType = [{
      id:
      name, 
    }]

    this.camerasMonitor = []
  }

  startClock(){
    let self = this
    this.clock = moment().format("DD/MM/YY hh:mm")

    setInterval(function(){
      self.clock = moment().format("DD/MM/YY hh:mm")
    }, 10000);   
  }

  dataURItoBlob(dataURI) {    
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };  

  getData(){    
    return moment().format('LLLL');     
  }

  getDataStr(date){
    return moment(date).format()
  }

  public validacpf(cpf: string): boolean {
    
    if (cpf == null) {
        return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
  }

  format(valString) {
    if (!valString) {
        return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if(parts[0].length <= 11){
      this.maskedId = this.cpf_mask(parts[0]);
      return this.maskedId;
    }else{
      this.maskedId = this.cnpjj(parts[0]);
      return this.maskedId;
    }
};

unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
};

 cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
}

 cnpjj(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
    return v;
}



validarCNPJ(cnpj) {
 
  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj == '') return false;
   
  if (cnpj.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
      cnpj == "11111111111111" || 
      cnpj == "22222222222222" || 
      cnpj == "33333333333333" || 
      cnpj == "44444444444444" || 
      cnpj == "55555555555555" || 
      cnpj == "66666666666666" || 
      cnpj == "77777777777777" || 
      cnpj == "88888888888888" || 
      cnpj == "99999999999999")
      return false;
       
  // Valida DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0,tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  let  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;
       
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;
         
  return true;
  
}

 
}