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
  
  appName: string = 'Limpa Fácil'
  isAdmin: Boolean = true;
  addressServer: string = "localhost"

  clientLogo: string = "assets/imgs/100x100.png"
  clientStamp: string = "assets/imgs/100x100.png"
  clientPicDefault: string = "assets/imgs/100x100.png"
  imgDefaultBackground: string = "assets/imgs/background.jpg"
  imgDefaultBackgroundClient: string = "assets/imgs/clientes.jpg"
  imgDefaultBackgroundHousekeeper: string = "assets/imgs/housekeeping.jpg"
  imgCanceledBackground: string = "assets/imgs/cancelada.png"
  imgWaitingOk: string = "assets/imgs/slideHome1.jpeg"
  imgDefaultClient: string = "assets/img/avatar-leia.png"
    

  titleSave: string = "Salvar"
  titleApp: string = "Portaria"
  titleForgotPassword: string = 'Esqueci a senha'
  titleOr: string = 'Ou'
  titleHelp: string = "Ajuda"
  titleQuestionMark: string = "???"
  titleFacebook: string = 'Logar com Facebook'
  titleGoogle: string = 'Logar com Google'
  titleLogin: string = 'Logar'

  titleEmployeers: string = 'Colaboradores'
  titleGuests: string = 'Visitantes'
  titlePermissions: string = "Acessos"
  titlePermissionsAccess: string = "Grupos de acesso"
  titleInstagram: string = 'Instagram'
  titleWhatsApp: string = 'WhatsApp'
  titleLoadingInformations: string = "Carregando informações...."
  titleDateendGreaterDateStart: string = "Data final não pode ser maior que a inicial"
  titleRanking: string = 'Ranking'
  titleProfile: string = "Perfil"
  titleShare: string = 'Compartilhar'    
  titleShareDescripton: string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
  titleBack: string = "Voltar"
  titleCheckInfoAndConfirm: string = "Verifique os dados e confirme a ação"
  titleAccept: string = "Aceitar"
  titleAuthError: string = "Falha ao autenticar"
  titleAuthRecoveryError: string = "E-mail incorreto"
  titleCheckMailbox: string = "Verifique sua caixa de e-mails"
  titleContinue: string = "Continuar"
  titleAuthErrorSignUp: string = "Falha ao se cadastrar, email já existe"
  titleMenu: string = "Menu"
  
  
  welcomeMsg: string = "Seja bem vindo ";  
  appDesc: string = "Agende uma faxina online"
  pleaseWait: string = "Favor aguarde";
  uploading: string = "Enviando foto";
  atention: string = "Atenção"
  finishRegister: string = "Favor preencher seus dados"  
  sucess: string = "Sucesso"
  erro: string = "Erro"
  notAvailable: string = "Não acessível do browser"
  added: string = "Adicionado"
    
  titleAreYouSure: string = "Tem certeza disso?"  
  titleWarning: string = "Aviso"    
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