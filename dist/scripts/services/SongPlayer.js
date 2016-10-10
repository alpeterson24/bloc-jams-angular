(function() {
     function SongPlayer(fixtures) {
         var SongPlayer = {};
         
         /**
         * @desc Current album returned fixture's getAlbum function
         * @type {object}
         */
         var currentAlbum = Fixtures.getAlbum();
         
         /**
         * @function getSongIndex
         * @desc returns the index of the current song in the album
         * @param {object} song
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
         /**
         * @desc Object holding song data
         * @type {Object}
         */
         
         SongPlayer.currentSong = null;
         
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
         }
 
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
         });
 
         SongPlayer.currentSong = song;
         };

         /**
         * @function playSong
         * @desc Play the currentBuzzObject sets song playing to true
         * @param {Object} song
         */
         var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
         }
         
         /**
         * @function play
         * @desc Plays the selected song 
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
               setSong(song);
               playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
                }
            }
         };
         
         /**
         * @function pause
         * @desc Pauses the song set song playing to false
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
         };
         
         /**
         * @function previous
         * @desc Sets song to previous song in album
         */
         SongPlayer.previous = function(){
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             
             if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
             } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
               }
         };
         return SongPlayer;
     };
         
         
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();