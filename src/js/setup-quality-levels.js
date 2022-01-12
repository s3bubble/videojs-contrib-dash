import dashjs from 'dashjs';
import videojs from 'video.js';

function handleQualityLevels(player, tech) {

  const mediaPlayer = player.dash.mediaPlayer;
  player.dashQualityLevels = mediaPlayer.getBitrateInfoListFor('video');
  player.trigger('dashQualityLevels');

  player.on("dashQualityLevelsSelected", function(e) {
    let select = e.target.player.dashQualityLevelsSelected;
    console.log('levels', select);

    let cfg = {
      'streaming': {
        'abr': {
          'autoSwitchBitrate': {}
        }
      }
    };

    cfg.streaming.abr.autoSwitchBitrate['video'] = false;
    mediaPlayer.updateSettings(cfg);
    mediaPlayer.setQualityFor('video', select, true);

  });

}

export default function setupAudioTracks(player, tech) {
  player.dash.mediaPlayer.on(
    dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED,
    handleQualityLevels.bind(null, player, tech)
  );
}
