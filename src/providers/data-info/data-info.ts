import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';

@Injectable()
export class DataInfoProvider {  

  isWeb: Boolean = true
  serverId: number = 1;
  userId: number = 0;
  userInfo: any;

  authorExample: string = 'Diego Queiroz dos Santos'

  latitude: number = 0
  longitude: number = 0
  userType: number = 2
  
  appName: string = 'Portaria Web'
  isAdmin: Boolean = true;
  addressServer: string = "localhost"
  
  clientPicDefault: string = "assets/imgs/100x100.png"
  imgDefaultBackground: string = "assets/imgs/background.jpg"
  imgDefaultClient: string = "assets/img/avatar-leia.png"
    
  titleCheckMonday: string = "Verificar horários de segunda-feira"
  titleCheckTuesday: string = "Verificar horários de terça-feira"
  titleCheckWednesday: string =  "Verificar horários de quarta-feira"
  titleCheckThursday: string = "Verificar horários de quinta-feira"
  titleCheckFriday: string = "Verificar horários de sexta-feira"
  titleCheckSaturnday: string = "Verificar horários de sábado"
  titleCheckSunday: string = "Verificar horários de domingo"

  titleSave: string = "Salvar"
  titleSelectSectorAndProfiles: string = "Selecionar setor e profiles"
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
  titleDateEndBeforeDateStart = 'Horário final não pode ser mair que o horário inicial'
  titleGuests: string = 'Visitantes'
  titleCopyProfile: string = " - Copia"
  titleSelectAll: string = "Selecionar todos"
  titleDeselectAll: string = "Deselecionar todos"
  titlePermissions: string = "Acessos"
  titlePermissionsAccess: string = "Grupos de acesso"
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
  titleProfileExpire: string = 'Vencimento'
  titleProfileDatetime: string = 'Datas específicas + horários'
  titleProfileDayweek: string = 'Dias da Semana + horários'
  titleSuccess: string = "Sucesso"
  titleProfileCreated: string = "Perfil criado"
  titleProfileUpdated: string = "Perfil atualizado"
  titleProfile: string = "Perfil"
  titleName: string = "Nome"
  titleDescription: string = "Descrição"
  titleAccessType: string = "Tipo acesso"
  titleType: string = "Tipo"
  titleRegistration: string = "Matricula"
  titleCPF: string = "CPF"
  titleRG: string = "RG"
  titleBadge: string = "Crachá"
  titleOffice: string = "Cargo"
  titleCompany: string = "Empresa"
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
  titlePleaseUnselect: string = "Favor desmarcar os dias selecionados"
  titleConfirmStart: string = "Confirmar data inicial?"
  titleConfirmEnd: string = "Confirmar data final?"
  titleSelect: string = 'Selecionar'
  titleMultipleUpdate: string = "Atualização múltipla"
  titleAccessRules: string = "Regras de acesso"
  titleContinueOperation: string = "Deseja continuar?"
  titleRemoveProfile: string = "Remover Perfil"
  titleDoYouWantRemove: string = "Deseja realmente remover? A ação não poderá ser refeita."
  titleOperationSuccess: string = "Operação realizada com sucesso!"
  titleRemove: string = "Remover"
  titleEdit: string = "Editar"
  titleMessageAndAlerts: string = "Mensagens e alertas"
  titleNotInformed: string = "Não informado"
  titleCopy: string = "Duplicar"
  
  pleaseWait: string = "Favor aguarde";
  uploading: string = "Enviando foto";
  
  erro: string = "Erro"
  notAvailable: string = "Não acessível do browser"
  added: string = "Adicionado"
    
  titleAreYouSure: string = "Tem certeza disso?"  
  titleUsernameMinLenght: string = "Usuário deve ter apartir de 6 caracteres"    

  titlePasswordMinLenght: string = "Senha deve ter apartir de 6 caracteres"    

  constructor(public platform: Platform) {    

   if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isWeb = true;
    } else {
      this.isWeb = false;
    }

    moment.locale('pt-br');    
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

 
}