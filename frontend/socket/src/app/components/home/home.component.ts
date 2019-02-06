import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textContent = [];
  currentMsg = '';
  messageArray:Array<{user:String,message:String}> = [];
  i=0;
  constructor(private chatService: ChatService) {


    this.chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));
  }

  ngOnInit() {
    this.getChats();
  }

  getChats(){
    this.chatService.getGroupChat('demogroup1').subscribe(res => {
      console.log('Chats', res)
      this.textContent = res['0']['msgList']
    });
  }

  msgPush() {
    let msgObj = {
      "groupName": "demogroup1",
      "userMsg": {
        "username": "Ramesh",
        "time": new Date().toISOString(),
        "grantLevel": "ind",
        "msg": this.currentMsg
      }
    }
    this.chatService.pushMsg(msgObj).subscribe(res => {
      console.log('sjdj');
      this.getChats();
    });
  }

  join(){ 
  
    this.chatService.joinRoom({user:'Ramesh'+this.i, room:'Smack'});
    this.i++;
}

}
