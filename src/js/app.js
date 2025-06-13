// Le Baladeur v-0.0.1
// Projet étudiant de l'Université de Montréal (UdeM)
'use strict';

var TabRegistry = require('./tabregistry'),
  Timeline = require('./timeline'),
  Info = require('./modules/info'),
  Share = require('./modules/share'),
  Downloads = require('./modules/downloads'),
  Chapters = require('./modules/chapter'),
  SaveTime = require('./modules/savetime'),
  Controls = require('./controls'),
  player = require('./player'),
  ProgressBar = require('./modules/progressbar'),
  autoplay = false;

var pwp;

// will expose/attach itself to the $ global
require('../../bower_components/mediaelement/build/mediaelement.js');

// FIXME put in compat mode module
if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

/**
 * The most missing feature regarding embedded players
 * @param {string} title
 * @param {string} url
 * @returns {string}
 */
function renderShowTitle(title, url) {
  if (!title) {
    return '';
  }
  if (url) {
    title = '<a href="' + url + '">' + title + '</a>';
  }
  return '<h4 class="showtitle">' + title + '</h4>';
}

/**
 * Render episode title HTML
 * @param {string} text
 * @param {string} link
 * @returns {string}
 */
function renderTitle(text, link) {
  var titleBegin = '<h2 class="episodetitle">',
    titleEnd = '</h2>';
  if (text !== undefined && link !== undefined) {
    text = '<a href="' + link + '">' + text + '</a>';
  }
  return titleBegin + text + titleEnd;
}

/**
 * Render HTML subtitle
 * @param {string} text
 * @returns {string}
 */
function renderSubTitle(text) {
  if (!text) {
    return '';
  }
  return '<h3 class="subtitle">' + text + '</h3>';
}

/**
 * Render HTML title area
 * @param params
 * @returns {string}
 */
function renderTitleArea(params) {
  return '<header>' +
    renderShowTitle(params.show.title, params.show.url) +
    renderTitle(params.title, params.permalink) +
    renderSubTitle(params.subtitle) +
    '</header>';
}


/**
 * Render HTML playbutton
 * @returns {string}
 */
function renderPlaybutton() {
  return '<a class="play" title="Play Episode" href="#"></a>';
}

/**
 * Render the poster image in HTML
 * returns an empty string if posterUrl is empty
 * @param {string} posterUrl
 * @returns {string} rendered HTML
 */
function renderPoster(posterUrl) {
  if (!posterUrl) {
    return '';
  }
  return '<div class="coverart"><img class="coverimg" src="' + posterUrl + '" data-img="' + posterUrl + '" alt="Poster Image"></div>';
}

/**
 * checks if the current window is hidden
 * @returns {boolean} true if the window is hidden
 */
function isHidden() {
  var props = [
    'hidden',
    'mozHidden',
    'msHidden',
    'webkitHidden'
  ];

  for (var index in props) {
    if (props[index] in document) {
      return !!document[props[index]];
    }
  }
  return false;
}

/**
 * add chapter behavior and deeplinking: skip to referenced
 * time position & write current time into address
 * @param {object} player
 * @param {object} params
 * @param {object} wrapper
 */
var addBehavior = function (player, params, wrapper) {
  var jqPlayer = $(player),

    timeline = new Timeline(player, params),
    controls = new Controls(player, timeline),
    tabs = new TabRegistry(),

    hasChapters = timeline.hasChapters,
    metaElement = $('<div class="titlebar"></div>'),
    playerType = params.type,
    controlBox = controls.box,

    deepLink;


  console.debug('webplayer', 'metadata', timeline.getData());

  /**
   * Build rich player with meta data
   */
  wrapper.addClass('podlovewebplayer_' + playerType);

  if (playerType === 'audio') {
    // Render playbutton
    metaElement.prepend(renderPlaybutton());
    var poster = params.poster || jqPlayer.attr('poster');
    metaElement.append(renderPoster(poster));
    wrapper.prepend(metaElement);
  }

  if (playerType === 'video') {
    wrapper.prepend('<div class="podlovewebplayer_top"></div>');
    wrapper.append(metaElement);
  }

  // Render title area with title h2 and subtitle h3
  metaElement.append(renderTitleArea(params));

  /**
   *
   * @type {ProgressBar}
   */
  var progressBar = new ProgressBar(timeline, params);
  timeline.addModule(progressBar);
  wrapper.append(progressBar.render());

  progressBar.addEvents();

  /**
   * Timecontrols
   */
    //always render toggler buttons wrapper
  wrapper.append(controlBox);

  /**
   * -- TABS --
   * FIXME enable chapter tab
   * The tabs in controlbar will appear in following order:
   */
  controlBox.append(tabs.togglebar);
  wrapper.append(tabs.container);

  var chapters;
  if (hasChapters) {
    chapters = new Chapters(timeline);
    tabs.add(chapters.tab);
    timeline.addModule(chapters);
    if ((params.chaptersVisible === 'true') || (params.chaptersVisible === true)) {
      tabs.open(chapters.tab);
    }
  }

  var sharing = new Share(params);
  tabs.add(sharing.tab);

  var downloads = new Downloads(params);
  tabs.add(downloads.tab);

  var infos = new Info(params);
  tabs.add(infos.tab);

  var saveTime = new SaveTime(timeline, params);
  timeline.addModule(saveTime);


  chapters.addEventhandlers(player);
  controls.createTimeControls(chapters);

  // expose the player interface
  wrapper.data('podlovewebplayer', {
    player: jqPlayer
  });

  // parse deeplink
  deepLink = require('./url').checkCurrent();
  if (deepLink[0] && pwp.players.length === 1) {
    var playerAttributes = {preload: 'auto'};
    if (!isHidden() && autoplay) {
      playerAttributes.autoplay = 'autoplay';
    }
    jqPlayer.attr(playerAttributes);
    //stopAtTime = deepLink[1];
    timeline.playRange(deepLink);

    $('html, body').delay(150).animate({
      scrollTop: $('.container:first').offset().top - 25
    });
  }

  // cache some jQ objects
  var playButton = metaElement.find('.play');
  playButton.on('click', function () {
    var playButton = $(this);
    console.log(playButton);
    if ((typeof player.currentTime === 'number') && (player.currentTime > 0)) {
      if (player.paused) {
        playButton.addClass('playing');
        player.play();
      } else {
        playButton.removeClass('playing');
        player.pause();
      }
    } else {
      if (!playButton.hasClass('playing')) {
        playButton.addClass('playing');
      }
      // flash fallback needs additional pause
      if (player.pluginType === 'flash') {
        player.pause();
      }
      player.play();
    }
  });

  // wait for the player or you'll get DOM EXCEPTIONS
  // And just listen once because of a special behaviour in firefox
  // --> https://bugzilla.mozilla.org/show_bug.cgi?id=664842
  jqPlayer.one('canplay', function (evt) {
    console.debug('canplay', evt);
  });

  jqPlayer
    .on('timelineElement', function (event) {
      console.log(event.currentTarget.id, event);
    })
    .on('timeupdate', function (event) {
      timeline.update(event);
      timeline.setBufferedTime(event);
    })
    .on('progress', function (e) {
      console.log('progress', e.currentTarget.id, e);
      timeline.setBufferedTime(e);
    })
    // update play/pause status
    .on('play', function () {
      //console.log('Player.play fired', event);
      //player.setCurrentTime(0);
    })
    .on('playing', function () {
      //console.log('Player.playing fired', event);
      playButton.addClass('playing');
      pwp.embed.postToOpener({ action: 'play', arg: player.currentTime });
    })
    .on('pause', function () {
      //console.log('Player.pause playButton', playButton);
      playButton.removeClass('playing');
      pwp.embed.postToOpener({ action: 'pause', arg: player.currentTime });
    })
    .on('ended', function () {
      pwp.embed.postToOpener({ action: 'stop', arg: player.currentTime });
      timeline.rewind();
      // delete the cached play time
      saveTime.removeItem();
    });
};

/**
 *
 * @param {object} options
 * @returns {jQuery}
 */
$.fn.podlovewebplayer = function webPlayer(options) {
  // Additional parameters default values
  var params = $.extend({}, player.defaults, options);

  // turn each player in the current set into a Podlove Web Player
  return this.each(function (i, playerElement) {
    player.create(playerElement, params, addBehavior);
  });
};

pwp = {
  tc: require('./timecode'),
  players: player.players,
  embed: require('./embed')
};

//FIXME without embed animations are fluent
pwp.embed.init($, player.players);

window.pwp = pwp;
//module.exports = pwp;
