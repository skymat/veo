'use strict';

var download = require('downloadjs'); 
var webrtc, socket, _$scope;

// RoomCtrl class
function RoomCtrl($routeParams, $scope) {
    _$scope = $scope;
    this.roomId = $routeParams.id;
    this.isMute = false;
    this.isPlaying = true;
    this.peers = [];
    this.chatMsgs = [];
    
    this.initializeWebRtc();
}

RoomCtrl.prototype.initializeWebRtc = function () {
    socket = io();
    
    webrtc = new SimpleWebRTC({
        localVideoEl: 'local',
        remoteVideosEl: 'remotes',
        autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
        var id = 'veo_' + this.roomId;
        webrtc.joinRoom('veo-' + id);
        socket.emit('create_channel', id);
    }.bind(this));

    webrtc.on('createdPeer', function (peer) {
        console.log('createdPeer', peer);
        peer.on('fileTransfer', function (metadata, receiver) {
            console.log('incoming filetransfer', metadata);
            receiver.on('progress', function (bytesReceived) {
                console.log('receive progress', bytesReceived, 'out of', metadata.size);
            });
            receiver.on('receivedFile', function (file, metadata) {
                console.log('received file', metadata.name, metadata.size);
                download(file, metadata.name, null);
                receiver.channel.close();
            });
        });

        this.peers.push(peer);
    }.bind(this));

    webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
    });

    webrtc.on('mute', function (data) {
        console.log('on mute', data);
    });
    
    socket.on('chat_msg', function(msg){
        this.chatMsgs.push(msg);
        _$scope.$apply();
    }.bind(this));
    
    var self = this;
    $('#fileselector').change(function () {
        var file = this.files[0];
        self.peers[0].sendFile(file);
    });
};

RoomCtrl.prototype.toggleMute = function () {
    if (this.isMute) {
        webrtc.unmute();
    } else {
        webrtc.mute();
    }
    this.isMute = !this.isMute;
};

RoomCtrl.prototype.toggleVideo = function () {
    if (this.isPlaying) {
        webrtc.pauseVideo();
    } else {
        webrtc.resumeVideo();
    }
    this.isPlaying = !this.isPlaying;
};

RoomCtrl.prototype.onFileTransfertChange = function () {

};

RoomCtrl.prototype.sendMsg = function () {
    socket.emit('chat_msg', this.newChatMsg);
    this.newChatMsg = '';  
};

module.exports = RoomCtrl;