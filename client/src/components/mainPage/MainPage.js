import React from 'react'
import './MainPage.css'
import {connect} from 'react-redux'
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css"
import FaHeadphones from "react-icons/lib/fa/headphones"
import Search from './search'

const mapDispatchToProps = dispatch => {
    return {}
};


const options = {
    /**
     * audio lists model
     * @param {Array} audioLists
     * @param {String | ReactNode } audioLists.name  audio name  [ required ]
     * @param {String | ReactNode } audioLists.singer  singer name of the playing song  [ not required ]
     * @param {String } audioLists.cover  audio cover  [ required ]
     * @param {String } audioLists.musicSrc  audio music source  [ required ]
     */
    audioLists: [{
        name: "丑",
        singer: "草东没有派对",
        cover: "http://www.lijinke.cn/music/1387583682387727.jpg",
        musicSrc: "http://www.lijinke.cn/music/201711082.mp3"
    }],

    //color of the music player theme    [ type `string: 'light' or 'drak'  ` default 'drak' ]
    theme: "drak",

    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition: {
        top: 120,
        left: 120
    },

    //play mode text config of the audio player
    playModeText: {
        order: "order",
        orderLoop: "orderLoop",
        singleLoop: "singleLoop",
        shufflePlay: "shufflePlay"
    },

    //audio controller open text  [ type `String | ReactNode` default 'open']
    openText: "open",

    //audio controller close text  [ type `String | ReactNode` default 'close']
    closeText: "close",

    //audio list panel title [ type `String` | ReactNode default 'PlayList' ]
    panelTitle: "PlayList",

    //audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
    notContentText: "no music",

    //audio theme switch checkedText  [ type `String | ReactNode` default '-']
    checkedText: "",

    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText: "",

    //default play mode of the audio player options 'order' 'orderLoop' 'singleLoop' 'shufflePlay' [ type `String` default 'order' ]
    defaultPlayMode: "order",

    //audio mode        mini | full          [type `String`  default `mini`]
    mode: "full",

    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: false,

    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Bollean' default 'true']
    toggleMode: false,

    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover: true,

    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: false,

    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones/>,

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //dowload button display of the audio player panel   [type `Boolean` default `true`]
    showDowload: true,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showPlayMode: true,

    //theme toogle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch: true,

    //Extensible custom content       [type 'Array' default '[]' ]
    extendsContent: [],

    //default volume of the audio player [type `Number` default `100` range `0-100`]
    defaultVolume: 100,

    //Music is downloaded handle
    audioDowload(audioInfo) {
        console.log('audio dowload', audioInfo);
    },

    //audio play handle
    audioPlay(audioInfo) {
        console.log('audio playing', audioInfo);
    },

    //audio pause handle
    audioPause(audioInfo) {
        console.log('audio pause', audioInfo);
    },

    //When the user has moved/jumped to a new location in audio
    audioSeeked(audioInfo) {
        console.log('audio seeked', audioInfo);
    },

    //When the volume has changed  min = 0.0  max = 1.0
    audioVolumeChange(currentVolume) {
        console.log('audio volume change', currentVolume);
    },

    //The single song is ended handle
    audioEnded(audioInfo) {
        console.log('audio ended', audioInfo);
    },

    //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
    audioAbort(e) {
        console.log('audio abort', e);
    },

    //audio play progress handle
    audioProgress(audioInfo) {
        console.log('audio progress', audioInfo);
    },

    //audio load faild error handle
    loadAudioError(e) {
        console.log('audio load err', e);
    }
}

const DisconnectedMainPage = ({}) => (
    <div>
        <Search/>
        <div className="col-xs-12">
            <ReactJkMusicPlayer {...options} />
        </div>
    </div>
);

const MainPage = connect(null, mapDispatchToProps)(DisconnectedMainPage);

export default MainPage
