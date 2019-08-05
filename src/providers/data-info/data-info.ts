import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataInfoProvider {  

  workFunctions: Observable<any>;
  employeeTypes: Observable<any>;
  guestTypes: Observable<any>;
  sectors: Observable<any>;
  companies: Observable<any>;
  offices: Observable<any>;  
  accessPoints: Observable<any>;  
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
  
  appName: string = 'Portaria Web'
  isAdmin: Boolean = true;
  addressServer: string = "localhost"
  
  clientPicDefault: string = "assets/imgs/100x100.png"
  imgDefaultBackground: string = "assets/imgs/background.jpg"
  imgDefaultClient: string = "assets/img/avatar-leia.png"      

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
  titleDoYouWantRemove: string = "Deseja realmente remover? A ação não poderá ser refeita."
  titleDoYouWantUpdate: string = "Deseja realmente atualizar? A ação não poderá ser refeita."
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

 
}