/**
 * jQuery lightpop plugin
 * This jQuery plugin was inspired on jQuery lightBox plugin by Leandro Vieira Pinho (http://leandrovieira.com/projects/jquery/lightbox/)
 * @name jquery.lightpop-0.7.5.js
 * @author wokamoto - http://dogmap.jp
 * @version 0.7.5
 * @date February 17, 2009
 * @category jQuery plugin
 * @copyright (c) 2007-2009 wokamoto (dogmap.jp)
 * @license  Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
 * @example http://dogmap.jp/lightpop_sample/sample.html
 */
(function(jQuery){
jQuery.browser = jQuery.extend(
  {chrome: /chrome/.test(navigator.userAgent.toLowerCase())}
 ,jQuery.browser
);

jQuery.fn.lightpop = function(settings, fileTypes, plugin_name, image_path, pre_image, pre_icon){
 plugin_name = plugin_name || 'lightpop';
 image_path  = image_path || 'images/';
 pre_image   = pre_image || image_path + plugin_name + '-';
 pre_icon    = pre_icon || image_path + 'icon-';

 settings = jQuery.extend( true, {
   overlayBgColor:	'#000'
  ,overlayOpacity:	0.7
  ,contentFrameType:	'border'
  ,contentBorder:	'none'
  ,boxBorderSize:	6
  ,containerBorderSize:	10
  ,containerResizeSpeed:'normal'
  ,contentBgColor:	'#FFF'
  ,imageBox:		pre_image + 'box.gif'
  ,imageBorderL:	pre_image + 'border-l.gif'
  ,imageBorderR:	pre_image + 'border-r.gif'
  ,imageLoading:	pre_image + 'ico-loading.gif'
  ,imageBtnPrev:	pre_image + 'btn-prev.gif'
  ,imageBtnNext:	pre_image + 'btn-next.gif'
  ,imageBtnClose:	pre_image + 'btn-close.gif'
  ,imageBlank:		pre_image + 'blank.gif'
  ,imageBtnPrevWidth:	63
  ,imageBtnNextWidth:	63
  ,imageBtnCloseWidth:	66
  ,txtImage:		null
  ,txtOf:		'of'
  ,setLinkToTitle:	false
  ,keyToClose:		'c'
  ,keyToPrev:		'p'
  ,keyToNext:		'n'
  ,flvplayer:		'mediaplayer.swf'
  ,iconAdd:		true
  ,detailsEnabled:	true
  ,initSize:		250
  ,defaultLater:	1500
  ,grouping:		true
  ,Image:		{enabled: true,	icon: pre_icon + 'image.png',		param: {},		size: new Array(0, 0)}
  ,Contents:		{enabled: true,	icon: pre_icon + 'contents.png',	param: {},		size: new Array(0, 0), iframeEnabled: true}
  ,Video:		{enabled: true,	icon: pre_icon + 'video.png',		param: {},		size: new Array(320, 240)}
  ,YouTube:		{enabled: true,	icon: pre_icon + 'youtube.png',		param: {hl:'ja'},	size: new Array(425, 355)}
  ,Metacafe:		{enabled: true,	icon: pre_icon + 'metacafe.png',	param: {},		size: new Array(400, 345)}
  ,LiveLeak:		{enabled: true,	icon: pre_icon + 'liveleak.png',	param: {},		size: new Array(450, 370)}
  ,GoogleVideo:		{enabled: true,	icon: pre_icon + 'googlevideo.png',	param: {hl:'ja'},	size: new Array(400, 326)}
  ,ifilm:		{enabled: true,	icon: pre_icon + 'ifilm.png',		param: {},		size: new Array(448, 365)}
  ,Dailymotion:		{enabled: true,	icon: pre_icon + 'dailymotion.png',	param: {},		size: new Array(420, 330)}
  ,superdeluxe:		{enabled: true,	icon: pre_icon + 'superdeluxe.png',	param: {},		size: new Array(400, 350)}
  ,nicovideo:		{enabled: true,	icon: pre_icon + 'nicovideo.png',	param: {},		size: new Array(312, 176)}
 }, settings);
 if (settings.imageMaxWidth || settings.imageMaxHeight) {
  settings = jQuery.extend( true, settings, {
   Image: {size: new Array((settings.imageMaxWidth || 0), (settings.imageMaxHeight || 0))}
  });
 }
 var frameBorder = /^border$/i.test(settings.contentFrameType);

 var arrContent = new Array();
 arrContent.length = 0;

 var d = document
   , w = window;
 var b = d.body
   , e = d.documentElement
   , images = d.images;
 var msie   = jQuery.browser.msie
   , gecko  = jQuery.browser.mozilla
   , opera  = jQuery.browser.opera
   , webkit = jQuery.browser.safari || jQuery.browser.chrome;

 fileTypes = jQuery.extend( true, {
  Image:{
   match: function(strUrl){return (settings.Image.enabled && /\.(jpe?g|gif|png|bmp)$/i.test(strUrl));}
  ,base: '/'
  ,defaultSize: settings.Image.size
  ,set: function(contentNo){image_set(contentNo, true);}
  ,preload: function(contentNo){image_set(contentNo, false);}
  }
 ,Video:{
   match: function(strUrl){return (settings.Video.enabled && /\.(flv|swf|rm|mov|3gp|mp4|asf|avi|mpg|wmv)$/i.test(strUrl));}
  ,defaultSize: settings.Video.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, strSrc){
    strSrc = strSrc || strUrl.replace(/\?.*$/, '');
    var arrParam = {};
    var playerAutoPlay = 'true';
    var playerEmbedOption = false;
    switch(strSrc.toLowerCase().match(/\.(flv|swf|rm|mov|3gp|mp4|asf|avi|mpg|wmv)$/i)[1]){
     case 'flv':
      intHeight += 22;
      strSrc = settings.flvplayer + '?file=' + strSrc;
     case 'swf':
      arrParam = {quality:'high',bgcolor:'#000'};
      strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam);
      break;
     case 'rm':
      arrParam = {autostart:	playerAutoPlay
                 ,controls:	'imagewindow,controlpanel'};
      strSrc = get_embed_src(strSrc, 'CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA', 'audio/x-pn-realaudio-plugin', intWidth, intHeight, arrParam, '', '', playerEmbedOption, true);
      break;
     case 'mov':
     case 'mp4':
     case '3gp':
      intHeight += 20;
      arrParam = {href:		strSrc
                 ,controller:	'true'
                 ,pluginspage:	'http://www.apple.com/quicktime/download/'
                 ,autoplay:	playerAutoPlay
                 ,bgcolor:	'000000'};
      strSrc = get_embed_src(strSrc, '02BF25D5-8C17-4B23-BC80-D3488ABDDC6B', 'video/quicktime', intWidth, intHeight, arrParam, ' codebase="http://www.apple.com/qtactivex/qtplugin.cab"', '', playerEmbedOption, true);
      break;
     case 'wmv':
      intHeight += 20;
      arrParam = {AutoStart:	playerAutoPlay
                 ,URL:		strSrc
                 ,uiMode:	'full'};
      playerEmbedOption = 'src="' + strSrc + '" name="player" width="' + intWidth + '" height="' + intHeight + '" type="application/x-mplayer2" pluginurl="http://www.microsoft.com/windows/windowsmedia" allowchangedisplaysize="1" autosize="1" displaysize="1" showcontrols="1" showstatusbar="0" autorewind="1" autostart="' + (playerAutoPlay == 'false' ? '0' : '1') + '"';
      strSrc = get_embed_src(strSrc, '6BF52A52-394A-11d3-B153-00C04F79FAA6', 'application/x-oleobject', intWidth, intHeight, arrParam, '', '', playerEmbedOption, false);
      break;
     default:
      intHeight += 20;
      arrParam = {href:		strSrc
                 ,autostart:	playerAutoPlay
                 ,uiMode:	'full'};
      strSrc = get_embed_src(strSrc, '6BF52A52-394A-11d3-B153-00C04F79FAA6', 'application/x-oleobject', intWidth, intHeight, arrParam, '', '', playerEmbedOption, false);
      break;
    }
    return {content:strSrc, width:intWidth, height:intHeight, later:Math.round(settings.defaultLater * 2 / 3)}
   }
  }
 ,YouTube:{
   match: function(strUrl){return (settings.YouTube.enabled && /\.youtube\.com\/watch/i.test(strUrl));}
  ,base: 'http://www.youtube.com/v/'
  ,defaultSize:  settings.YouTube.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\?v=(.*)$/i, '$1');
    strSrc = strSrc || arrInfo.base + vid;
    var arrParam = {allowFullScreen:'true'};
    for (var key in arrUrlParam) {
     if (/^fmt$/i.test(key)) {
       strSrc += '&ap=%2526fmt%3D' + arrUrlParam[key];
     } else {
       strSrc += '&' + key + '=' + arrUrlParam[key];
       if (!/^hl$/i.test(key)) arrParam[key] = arrUrlParam[key];
     }
    }
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam);
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,Metacafe:{
   match: function(strUrl){return (settings.Metacafe.enabled && /\.metacafe\.com\/watch/i.test(strUrl));}
  ,base: 'http://www.metacafe.com/fplayer/'
  ,defaultSize: settings.Metacafe.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\/watch\/([\d]+\/[^\/]*)\/?.*$/i, '$1');
    strSrc = strSrc || arrInfo.base + vid + '.swf';
    var arrParam = {};
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam, arrUrlParam);
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,LiveLeak:{
   match: function(strUrl){return (settings.LiveLeak.enabled && /\.liveleak\.com\/view/i.test(strUrl));}
  ,base: 'http://www.liveleak.com/player.swf?autostart=false&amp;token='
  ,defaultSize: settings.LiveLeak.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\?i=(.*)$/i, '$1');
    strSrc = strSrc || arrInfo.base + vid;
    var arrParam = {quality:'high'};
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam, arrUrlParam);
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,GoogleVideo:{
   match: function(strUrl){return (settings.GoogleVideo.enabled && /video\.google\.com\/videoplay/i.test(strUrl));}
  ,base: 'http://video.google.com/googleplayer.swf?docId='
  ,defaultSize: settings.GoogleVideo.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\?docid=([a-z\d\-]+).*$/i, '$1');
    strSrc = strSrc || arrInfo.base + vid;
    var arrParam = {flashvars:''};
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam, arrUrlParam);
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,ifilm:{
   match: function(strUrl){return (settings.ifilm.enabled && /\.ifilm\.com\/video/i.test(strUrl));}
  ,base: 'http://www.ifilm.com/efp'
  ,defaultSize: settings.ifilm.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/\?.*$/, '').replace(/^.*\/video\/([^\/]*)[\/]?$/i, '$1');
    strSrc = strSrc || arrInfo.base;
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam, arrUrlParam);
    var arrParam = {flashvars:	'flvbaseclip=' + vid + '&'
                   ,quality:	'high'
                   ,bgcolor:	'000000'};
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,Dailymotion:{
   match: function(strUrl){return (settings.Dailymotion.enabled && /\.dailymotion\.com\/video/i.test(strUrl));}
  ,base: 'http://www.dailymotion.com/swf/'
  ,defaultSize: settings.Dailymotion.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\/video\/([^_]*).*$/i, '$1');
    strSrc = strSrc || arrInfo.base + vid;
    var arrParam = {allowFullScreen:	'true'
                   ,allowScriptAccess:	'always'};
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam, arrUrlParam);
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,superdeluxe:{
   match: function(strUrl){return (settings.superdeluxe.enabled && /\.superdeluxe\.com\/sd/i.test(strUrl));}
  ,base: 'http://i.cdn.turner.com/sdx/static/swf/share_vidplayer.swf'
  ,defaultSize: settings.superdeluxe.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\?id=(.*)$/i, '$1');
    strSrc = strSrc || arrInfo.base;
    var arrParam = {allowFullScreen:'true'
                   ,FlashVars:	'id=' + vid};
    strSrc = get_flash_src(strSrc, intWidth, intHeight, arrParam, arrUrlParam);
    return {content:strSrc, width:intWidth, height:intHeight, later:settings.defaultLater}
   }
  }
 ,nicovideo:{
   match: function(strUrl){return (settings.nicovideo.enabled && /\.nicovideo\.jp\/watch/i.test(strUrl));}
  ,base: 'http://www.nicovideo.jp/watch/'
  ,defaultSize: settings.nicovideo.size
  ,getInfo: function(strUrl, intWidth, intHeight, arrUrlParam, arrInfo, vid, strSrc){
    vid = vid || strUrl.replace(/^.*\/watch\/(.*)$/i, '$1');
    strSrc = strSrc || arrInfo.base + vid;
    strSrc = '<iframe width="' + intWidth + '" height="' + intHeight + '" src="http://www.nicovideo.jp/thumb/' + vid + '" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"><a href="' + strSrc + '">' + arrInfo.tytle + '</iframe>';
    return {content:strSrc, width:intWidth, height:intHeight, later:Math.round(settings.defaultLater / 3)}
   }
  }
 ,Contents:{
   match: function(strUrl){return (settings.Contents.enabled && RegExp(w.location.host, 'i').test(strUrl) && !/\.(jpe?g|gif|png|bmp)$/i.test(strUrl));}
  ,defaultSize: settings.Contents.size
  ,set: function(contentNo, strSrc){
    var arrSizes = get_sizes_from_str(arrContent[contentNo].href);
    var strSizes = 'width="' + arrSizes[0] + '" height="' + arrSizes[1] + '"';
    if (settings.Contents.iframeEnabled) {
     strSrc = '<iframe ' + strSizes + ' src="' + arrContent[contentNo].href + '" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"><a href="' + arrContent[contentNo].href + '">' + arrContent[contentNo].tytle + '</a></iframe>';
     arrContent[contentNo] = jQuery.extend(arrContent[contentNo], {content:strSrc, width:arrSizes[0], height:arrSizes[1], later:500});
     set_content_to_view(contentNo);
    } else {
     jQuery.get(arrContent[contentNo].href, function(responseText, status){
      strSrc = '<div ' + strSizes + '>' + responseText.replace(/[\r\n]/g, '').replace(/.*<body.*?>(.*?)<\/body>.*$/, '$1').replace(/<script.*?>.*<\/script>/g, '') + '</div>';
      arrContent[contentNo] = jQuery.extend(arrContent[contentNo], {content:strSrc, width:arrSizes[0], height:arrSizes[1], later:500});
      set_content_to_view(contentNo);
     });
    }
   }
  ,preload: function(contentNo){}
  ,content_css: {textAlign:'left', lineHeight:'1.2em'}
  }
 }, fileTypes);

 // DOM Elements ID and CSS Path
 var Elements_ID = {
   overlay: 'overlay'
  ,lightpop: plugin_name
  ,box:      plugin_name + '-box'
  ,content:  plugin_name + '-content'
  ,nav:      plugin_name + '-nav'
  ,data:     plugin_name + '-data'
  ,details:  plugin_name + '-details'
  ,loading:  plugin_name + '-loading'
 };
 var csspath = {
   overlay:  '#' + Elements_ID.overlay
  ,lightpop: '#' + Elements_ID.lightpop
  ,box:      '#' + Elements_ID.box
  ,content:  '#' + Elements_ID.content
  ,nav:      '#' + Elements_ID.nav
  ,data:     '#' + Elements_ID.data
  ,details:  '#' + Elements_ID.details
  ,loading:  '#' + Elements_ID.loading
 };

 // initialize
 var init = function(jQueryObj, domMatchedObj){
  // image preload
  image_load(settings.imageBtnPrev,  function(s, w, h){
   settings.imageBtnPrevWidth  = (w > 0 ? w : settings.imageBtnPrevWidth);
   image_load(settings.imageBtnNext,  function(s, w, h){
    settings.imageBtnNextWidth  = (w > 0 ? w : settings.imageBtnNextWidth);
    image_load(settings.imageBtnClose, function(s, w, h){
     settings.imageBtnCloseWidth = (w > 0 ? w : settings.imageBtnCloseWidth);
     if (!frameBorder) {
      image_load(settings.imageBox, function(s, w, h){
       image_load(settings.imageBorderL, function(s, w, h){
        image_load(settings.imageBorderR, function(s, w, h){
         settings.contentBorder = 'none';
        });
       });
      });
     }
    });
   });
  });

  // get matched object
  domMatchedObj = domMatchedObj || new Array();
  var intImage = 0;
  jQueryObj.filter('a').each(function() {
   var location = w.location;
   var jQuery_this = jQuery(this);
   if (!/^https?:/i.test(jQuery_this.attr('href')) && /^https?:/i.test(location.protocol)) {
    jQuery_this.attr('href', (
     /^\//i.test(jQuery_this.attr('href'))
       ? location.protocol + '//' + location.hostname + '/' + jQuery_this.attr('href')
       : location.href.replace(/^(.*\/).*$/i, '$1') + jQuery_this.attr('href').replace(/^\/?(.*)$/i, '$1')
    ));
   }

   for (var key in fileTypes) {
    var filetype = fileTypes[key];
    if (filetype.match(jQuery_this.attr('href').replace(/\?.*$/, ''))) {
     var filetype_option = settings[key];
     // set icons to link
     if (settings.iconAdd && jQuery_this.children('img').length === 0) {
      jQuery_this.css({background:'transparent url(' + filetype_option.icon + ') no-repeat scroll 1px 0pt', paddingLeft:'20px'});
     }

     // content info
     arrContent.push({
      type:	key
     ,href:	jQuery_this.attr('href')
     ,title:	jQuery_this.attr('title') || jQuery_this.html().replace(/<[^>]*>/ig, '')
     ,base:	(filetype.base ? filetype.base : '/')
     });

     // bind click event
     jQuery_this.unbind('click').click((function(i){return function(){start_lightpop(i); return false;}})(intImage));

     // push array
     domMatchedObj.push(this);
     intImage++;
     break;
    }
   }
  });
  return new jQuery(domMatchedObj);
 };

 // start!
 var start_lightpop = function(intClickedContent, content_htm, data_htm, navi_htm, lightpop_htm){
  settings.grouping = (arrContent.length > 1 ? settings.grouping : false);

  // hide embed, object, select element
  set_visibility(jQuery('embed, object, select'), false);

  // set interface
  content_htm  = content_htm || '<div id="' + Elements_ID.content + '-wrap"><div id="' + Elements_ID.content + '" /></div>';
  data_htm     = data_htm || (settings.detailsEnabled ? '<div id="' + Elements_ID.data + '-wrap"><div id="' + Elements_ID.data + '"><div id="' + Elements_ID.details + '"><div id="' + Elements_ID.details + '-caption" /><div id="' + Elements_ID.details + '-number" /></div><div id="' + Elements_ID.data + '-nav"><a href="#" id="' + Elements_ID.data + '-nav-close"><img src="' + settings.imageBtnClose + '" /></a></div></div></div>' : '');
  navi_htm     = navi_htm || '<div id="' + Elements_ID.nav + '"><a href="#" id="' + Elements_ID.nav + '-prev" /><a href="#" id="' + Elements_ID.nav + '-next" /></div><div id="' + Elements_ID.loading + '"><a href="#" id="' + Elements_ID.loading + '-link"><img src="' + settings.imageLoading + '" /></a></div>';
  lightpop_htm = lightpop_htm ||
      '<div id="' + Elements_ID.overlay +'" />'
    + '<div id="' + Elements_ID.lightpop + '"><div id="' + Elements_ID.box + '">'
    + '<div id="' + Elements_ID.box + '-inner">'
    + (frameBorder
       ? content_htm + '</div>' + data_htm
       : '<div id="' + Elements_ID.box + '-hd"><div id="' + Elements_ID.box + '-hdc" /></div>'
        +'<div id="' + Elements_ID.box + '-bd"><div id="' + Elements_ID.box + '-bdc">' + content_htm + data_htm + '</div></div>'
        +'<div id="' + Elements_ID.box + '-ft"><div id="' + Elements_ID.box + '-ftc" /></div>'
        +'</div>')
    + navi_htm
    + '</div></div>';
  jQuery('body').append(jQuery(lightpop_htm).hide());

  // set interface CSS
  var arrPageSizes  = get_page_sizes();
  var arrPageScroll = get_page_scroll();
  var containerBorderSize = settings.containerBorderSize;

  // set position
  jQuery(csspath.overlay + ',' + csspath.lightpop + ',' + csspath.nav + ',' + csspath.loading).css({position:'absolute'});
  jQuery(csspath.box + ',' + csspath.data).css({position:'relative'});

  // overlay
  jQuery(csspath.overlay).css({top:0, left:0, backgroundColor:settings.overlayBgColor, opacity:settings.overlayOpacity, width:arrPageSizes[0], height:arrPageSizes[1], zIndex:90});
  jQuery(csspath.lightpop).css({top:arrPageScroll[1] + Math.round(arrPageSizes[3] / 10), left:arrPageScroll[0], width:'100%', height:0, overflow:'visible', textAlign:'center', lineHeight:0, border:'none', zIndex:100});
  jQuery(csspath.lightpop + ' a img').css({border:'none'});

  // container
  jQuery(csspath.box).css({width:settings.initSize, height:settings.initSize, top:0, margin:'0 auto', padding:0, backgroundColor:settings.contentBgColor, border:settings.contentBorder, overflow:(frameBorder ? 'hidden' : 'visible')});
  jQuery(csspath.box + '-inner').css({width:settings.initSize, height:settings.initSize, backgroundColor:'transparent', margin:'0 auto', padding:(frameBorder ? containerBorderSize : 0), overflow:(frameBorder ? 'hidden' : 'visible')});
  jQuery(csspath.content + '-wrap').css({backgroundColor:'transparent'});
  jQuery(csspath.content).css({margin:(frameBorder ? 0 : '0 auto'), padding:(frameBorder ? 0 : containerBorderSize + 'px 0'), zIndex:110});
  if (!frameBorder) {
   var boxBorderSize = settings.boxBorderSize;
   set_box_css(false).css({position:'relative'}).hide();
   jQuery(csspath.box + '-hd'  + ',' + csspath.box + '-hdc').css({height:boxBorderSize, top:0});
   jQuery(csspath.box + '-ft'  + ',' + csspath.box + '-ftc').css({height:boxBorderSize, bottom:0});
   jQuery(csspath.box + '-hd'  + ',' + csspath.box + '-ft' ).css({margin:'0 ' + boxBorderSize + 'px 0 0'});
   jQuery(csspath.box + '-hdc' + ',' + csspath.box + '-ftc').css({margin:'0 ' + boxBorderSize*-1 + 'px 0 ' + boxBorderSize + 'px'});
  }

  // navigation
  jQuery(csspath.nav).css({top:0, left:0, height:'10px', width:'100%', padding:0, margin:(frameBorder ? '0' : settings.boxBorderSize + 'px') + ' auto', zIndex:10});
  jQuery(csspath.nav + ' a').css({display:'block', height:'100%', zoom:1, margin:(frameBorder ? 0 : '0 ' + settings.boxBorderSize + 'px'), outline:'none'});
  jQuery(csspath.nav + '-prev').css(settings.grouping ? {width:settings.imageBtnPrevWidth, left:0, styleFloat:'left'}   : {display:'none'});
  jQuery(csspath.nav + '-next').css(settings.grouping ? {width:settings.imageBtnNextWidth, right:0, styleFloat:'right'} : {display:'none'});

  // loading image
  jQuery(csspath.loading).css({top:'40%', left:0, height:'20%', width:'100%', margin:'0 auto', textAlign:'center', lineHeight:0});

  // details
  if (settings.detailsEnabled) {
   jQuery(csspath.data + '-wrap').css({font:'10px Verdana, Helvetica, sans-serif', backgroundColor:settings.contentBgColor, lineHeight:'1.4em', width:'100%', margin:'0 auto', padding:'0 ' + containerBorderSize + 'px 0', overflow:'hidden'}).hide();
   jQuery(csspath.data).css({padding:'0 ' + containerBorderSize + 'px', color:'#666', left:0, bottom:0});
   jQuery(csspath.details).css({width:'70%', styleFloat:'left', textAlign:'left'});
   jQuery(csspath.details + '-caption').css({styleFloat:'left', 'font-weight':'bold', width:'100%'});
   jQuery(csspath.details + '-number').css({styleFloat:'left', clear:'left', width:'100%', 'padding-bottom':'1em'});
   jQuery(csspath.data + '-nav-close').css({styleFloat:'right', width:settings.imageBtnCloseWidth, 'padding':'.35em 0'});
  }

  // bind event
  jQuery(csspath.overlay).fadeIn(settings.containerResizeSpeed, function(){jQuery(csspath.lightpop).show();});
  jQuery(csspath.overlay + ',' + csspath.loading + '-link,' + csspath.data + '-nav-close').click(function(){finish_lightpop(); return false;});
  window_resize(true);

  // set content
  set_content(intClickedContent);
 };

 // set content
 var set_content = function(contentNo){
  set_visibility(jQuery(csspath.data + ',' + csspath.details + ',' + csspath.details + '-caption,' + csspath.details + '-number,' + csspath.data + '-nav-close'), false);
  jQuery(csspath.nav + ',' + csspath.nav + '-prev,' + csspath.nav + '-next').hide();
  jQuery(csspath.content).hide().children().remove();
  jQuery(csspath.loading + ',' + csspath.box + ',' + csspath.box + '-inner').show();
  set_box_css(false);
  if(settings.detailsEnabled && !frameBorder && webkit){jQuery(csspath.data + '-wrap').height('auto');}
  set_content_to_view(contentNo);
 };

 // set content to view
 var set_content_to_view = function(contentNo){
  (arrContent[contentNo].content
   ? function(n){jQuery(csspath.content).append(jQuery(arrContent[n].content)); setTimeout(function(){show_container(n);}, arrContent[n].later);}
   : (fileTypes[arrContent[contentNo].type].set ? fileTypes[arrContent[contentNo].type].set : (function(contentNo){set_video_info(contentNo); set_content_to_view(contentNo);}))
  )(contentNo);
 };

 // show data box
 var show_data_box = function(data_box, intWidth, intHeight, intDataboxHeight){
  if(settings.detailsEnabled) {
   intDataboxHeight = (intDataboxHeight < 28 ? 28 : intDataboxHeight);
   intHeight += intDataboxHeight;
  }
  (frameBorder
   ? (function(d){jQuery(csspath.box).animate({width:intWidth, height:intHeight}, 'fast', function(){set_visibility(d, true);});})
   : (function(d){if(settings.detailsEnabled && webkit){jQuery(csspath.data + '-wrap').height(intDataboxHeight);}set_visibility(d, true);})
  )(data_box);
 };

 // show container
 var show_container = function(contentNo){
  var containerBorderSize = settings.containerBorderSize
    , boxBorderSize = settings.boxBorderSize
    , contentInfo = arrContent[contentNo]
    , arrPageSizes  = get_page_sizes()
    , arrPageScroll = get_page_scroll();
  var intWidth  = contentInfo.width  + (containerBorderSize + (frameBorder ? 0 : boxBorderSize)) * 2
    , intHeight = contentInfo.height + containerBorderSize * 2;

  jQuery(csspath.lightpop).animate({top:arrPageScroll[1] + Math.round(arrPageSizes[3] / 10), left:arrPageScroll[0]}, settings.containerResizeSpeed, function(){
   jQuery(csspath.box).animate({width:intWidth, height:intHeight}, settings.containerResizeSpeed, function(){
    var fyletype = fileTypes[contentInfo.type];

    // resize content and data
    jQuery(csspath.box + '-inner').css({width:(frameBorder ? contentInfo.width : intWidth), height:contentInfo.height});
    jQuery(csspath.content).css({width:contentInfo.width, height:contentInfo.height});
    if (settings.detailsEnabled) {jQuery(csspath.data + '-wrap').css({width:contentInfo.width});}

    // set content css
    if (fyletype.content_css) {jQuery(csspath.content).children().css(fyletype.content_css);}

    // show content
    jQuery(csspath.loading).hide();
    if (/<object.*>/i.test(contentInfo.content)) {jQuery(csspath.content).show();} else {jQuery(csspath.content).fadeIn();}
    set_box_css(true);

    // set content data
    jQuery(csspath.details + '-caption').html(
     (settings.setLinkToTitle
      ? '<a href="' + contentInfo.href + '" title="' + contentInfo.title + '">' + contentInfo.title + '</a>'
      : contentInfo.title)
    );
    jQuery(csspath.details + '-number').html(
     (settings.txtImage || contentInfo.type) +
     (settings.grouping && arrContent.length > 1
      ? ' ' + (contentNo + 1) + ' ' + settings.txtOf + ' ' + arrContent.length
      : '')
    );
    var data_box = set_visibility(jQuery(csspath.data + ',' + csspath.details + ',' + csspath.details + '-caption,' + csspath.details + '-number,' + csspath.data + '-nav-close'), false).show();
    (settings.detailsEnabled
     ? function(d,w,h){jQuery(csspath.data + '-wrap').slideDown('fast', function(){show_data_box(d, w, h, (!webkit ? jQuery(this).height() : this.scrollHeight));});}
     : function(d,w,h){show_data_box(d, w, h);}
    )(data_box, intWidth, intHeight);

    // set navigation
    jQuery(csspath.nav).css({width:intWidth}).show(function(){
     if(settings.grouping){
      jQuery(csspath.nav + '-prev,' + csspath.nav + '-next').css({height:Math.round(intHeight / 3), background:'transparent url(' + settings.imageBlank + ') no-repeat'}).unbind();
      if(contentNo != 0){
       jQuery(csspath.nav + '-prev').hover(
        function(){jQuery(this).css({background:'url(' + settings.imageBtnPrev + ') left 30% no-repeat'});},
        function(){jQuery(this).css({background:'transparent url(' + settings.imageBlank + ') no-repeat'});}
       ).show().click((function(i){return function(){set_content(i); return false;}})(contentNo - 1));
      }
      if(contentNo != (arrContent.length - 1)){
       jQuery(csspath.nav + '-next').hover(
        function(){jQuery(this).css({background:'url(' + settings.imageBtnNext + ') right 30% no-repeat'});},
        function(){jQuery(this).css({background:'transparent url(' + settings.imageBlank + ') no-repeat'});}
       ).show().click((function(i){return function(){set_content(i); return false;}})(contentNo + 1));
      }
     }
     keyboard_navigation(true, contentNo);
    });

    // preload contents
    if(arrContent.length - 1 > contentNo){preload(contentNo + 1);}
    if(contentNo > 0){preload(contentNo - 1);}
   });
  });
 };

 // preload
 var preload = function(contentNo){
  if(!arrContent[contentNo].content) {
   (fileTypes[arrContent[contentNo].type].preload
    ? fileTypes[arrContent[contentNo].type].preload
    : (function(n){set_video_info(n);})
   )(contentNo);
  }
 };

 // get content information
 var get_sizes_from_str = function(strText, defaultSizes, maxSizes){
  var numWidth = 0, numHeight = 0;
  var arrText = strText.toLowerCase().replace(/[\r\n]/g,'').replace(/["']/g,'').match(/(width|height)=(\d+)/ig);
  if (arrText) {
   jQuery.each(arrText, function(){
    if (/^width=\d+$/i.test(this))  {numWidth  = Number(this.replace(/^width=(\d+)$/, '$1'));}
    if (/^height=\d+$/i.test(this)) {numHeight = Number(this.replace(/^height=(\d+)$/,'$1'));}
   });
  }
  if (numWidth === 0 || numHeight === 0) {
   if (defaultSizes) {
    numWidth  = defaultSizes[0];
    numHeight = defaultSizes[1];
   } else {
    var arrPageSizes = get_page_sizes();
    numWidth  = arrPageSizes[0] / 4;
    numHeight = arrPageSizes[1] / 4;
   }
  }
  if (maxSizes) {
   if (maxSizes[0] != 0 && numWidth > maxSizes[0]) {
      numHeight = numHeight * (maxSizes[0] / numWidth);
      numWidth  = maxSizes[0];
     }
     if (maxSizes[1] != 0 && numHeight > maxSizes[1]) {
      numWidth  = numWidth * (maxSizes[1] / numHeight);
      numHeight = maxSizes[1];
     }
  }
  return new Array(Math.round(numWidth), Math.round(numHeight));
 };

 var set_video_info = function(contentNo, vid, strSrc) {
  var arrSizes
    , arrUrlParam = {}
    , contentInfo = arrContent[contentNo];
  var filetype_option = settings[contentInfo.type]
    , fyletype = fileTypes[contentInfo.type]
    , strUrl = contentInfo.href.replace(/&.*$/i,'');
  if (/\?.*$/.test(contentInfo.href)) {
   var arrParams = contentInfo.href.replace(/^.*\?/,'').split("&");
   if (arrParams.length > 0) {
    jQuery.each(arrParams, function(){
     var wk_matched, wk_str = this.toString();
     if (!/^(width|height|v|i|docid|id)\=.*$/i.test(wk_str)) {
      wk_matched = (wk_str).match(/^([^=]*)=(.*)$/i);
      if (wk_matched.length > 2) arrUrlParam[wk_matched[1]] = wk_matched[2];
     }
    });
   }
  }
  arrUrlParam = jQuery.extend(arrUrlParam, filetype_option.param);
  arrSizes = get_sizes_from_str(contentInfo.href, fyletype.defaultSize);

  arrContent[contentNo] = jQuery.extend(contentInfo, fyletype.getInfo(strUrl, arrSizes[0], arrSizes[1], arrUrlParam, contentInfo));
 }

 var get_flash_src = function(url, width, height, param, url_param, strSrc) {
  if (typeof url_param === 'object') {
   jQuery.each(url_param, function(key){
    url += (url.indexOf(key + '=') < 0
            ? (url.indexOf('?') < 0 ? '?' : '&') + key + '=' + this
            : '');
   });
  }
  var wkParam = {movie: url, wmode: 'transparent'};
  param = (param ? jQuery.extend(wkParam, param) : wkParam);
  strSrc = strSrc || '<object width="' + width + '" height="' + height + '"' + ' data="' + url + '" wmode="' + param.wmode + '" type="application/x-shockwave-flash">';
  jQuery.each(param, function(key){
   strSrc += '<param name="' + key + '" value="' + this + '" />';
  });
  strSrc += '</object>';
  return strSrc;
 };

 var get_embed_src = function(url, clsid, apl_type, width, height, param, url_param, obj_option, embed_option, flg_noembed) {
  var strSrc = ''
    , strEmb = ''
    , wkParam = {src: url, width: width, height: height, type: apl_type};
  param = (param ? jQuery.extend(wkParam, param) : wkParam);
  strSrc += '<object width="' + width + '" height="' + height + '"' + (clsid != ' ' ? 'classid="clsid:' + clsid + '"' : '') + ' type="' + apl_type + '" ' + obj_option + '>';
  jQuery.each(param, function(key){
   strSrc += '<param name="' + key + '" value="' + this + '" />';
  });
  strEmb += '<embed '
         + (embed_option !== false 
            ? embed_option 
            : 'width="' + width + '" height="' + height + '"');
  if (embed_option === false) {
   jQuery.each(param, function(key){strEmb += ' ' + key + '="' + this + '"';});
  }
  strEmb += '>'
         + (flg_noembed 
            ? '<noembed><a href="' + url + '">' + url + '</a></noembed>'
            : '')
         + '</embed>';
  strSrc += strEmb + '</object>';
  return strSrc;
 };

 // set box css
 var set_box_css = function(enable, jQueryObj, bg_transparent) {
  if (!frameBorder) {
   jQueryObj = jQuery(csspath.box + '-hd, ' + csspath.box + '-hdc, ' + csspath.box + '-bd, ' + csspath.box + '-bdc, ' + csspath.box + '-ft, ' + csspath.box + '-ftc');
   bg_transparent = 'transparent';
   if (enable) {
    jQuery(csspath.box).css({backgroundColor:bg_transparent});
    jQuery(csspath.box + '-hd').css({background:bg_transparent + ' url(' + settings.imageBox + ') left top no-repeat'});
    jQuery(csspath.box + '-hdc').css({background:bg_transparent + ' url(' + settings.imageBox + ') right top no-repeat'});
    jQuery(csspath.box + '-bd').css({background:settings.contentBgColor + ' url(' + settings.imageBorderL + ') left top repeat-y'});
    jQuery(csspath.box + '-bdc').css({background:bg_transparent + ' url(' + settings.imageBorderR + ') right top repeat-y'});
    jQuery(csspath.box + '-ft').css({background:bg_transparent + ' url(' + settings.imageBox + ') left bottom no-repeat'});
    jQuery(csspath.box + '-ftc').css({background:bg_transparent + ' url(' + settings.imageBox + ') right bottom no-repeat'});
    jQueryObj.show();
   } else {
    jQuery(csspath.box).css({backgroundColor:settings.contentBgColor});
    jQueryObj.css({background:bg_transparent});
   }
   return jQueryObj;
  }
 };

 var image_set = function(contentNo, setFlag){
  image_load(arrContent[contentNo].href, (function(n, f){return function(src, width, height){
   var arrSizes = get_sizes_from_str(src, new Array(width, height), settings.Image.size);
   arrContent[n] = jQuery.extend(arrContent[n], {
     content:'<img src="' + src.replace(/\?.*$/, '') + '" width="' + arrSizes[0] + '" height="' + arrSizes[1] + '" />'
    ,width:arrSizes[0]
    ,height:arrSizes[1]
    ,later:(msie ? 250 : 100)
   });
   if (f) set_content_to_view(n);
  }})(contentNo, setFlag));
 }

 // image loader
 var image_load = function(src, onLoad, onError, delay, timeout) {
  onLoad  = onLoad  || function(){};
  onError = onError || function(){};
  delay   = delay   || 10;
  timeout = timeout || 2000;
  for (var i = 0, sz = images.length; i < sz; ++i) {
   if (images[i].src === src && images[i].complete) {
    onLoad(src, images[i].width, images[i].height);
    return;
   }
  }
  var img = new Image(), tick = 0;

  img.finish = false;
  img.onabort = img.onerror = function() {
   if (img.finish) { return; }
   img.finish = true;
   onError(src);
  };
  img.onload  = function() {
   img.finish = true;
   if (opera && !img.complete) {
    onError(src);
    return;
   }
   onLoad(src, img.width, img.height);
  };
  img.src = src;
  if (!img.finish && timeout) {
   setTimeout(function() {
    if (img.finish) { return; }
    if (img.complete) {
     img.finish = true;
     if (img.width) { return; }
     onError(src);
     return;
    }
    if ((tick += delay) > timeout) {
     img.finish = true;
     onError(src);
     return;
    }
    setTimeout(arguments.callee, delay);
   }, 0);
  }
 }

 // set visibility
 var set_visibility = function(jQueryObj, enable){
  return jQueryObj.css({visibility:(enable ? 'visible' : 'hidden')});
 }

 // set keydown event
 var keyboard_navigation = function(enable, contentNo){
  jQuery(d).unbind('keydown');
  if (enable) {
   jQuery(d).keydown(function(objEvent){
    var keycode = (objEvent || event).keyCode;
    var escapeKey = (objEvent ? objEvent.DOM_VK_ESCAPE : 27);
    var key = String.fromCharCode(keycode).toLowerCase();
    if ((key == settings.keyToClose) || (key == 'x') || (keycode == escapeKey)) {
     finish_lightpop();
    } else if (settings.grouping) {
     if (((key == settings.keyToPrev) || (keycode == 37)) && contentNo != 0) {
      set_content(contentNo - 1);
     } else if (((key == settings.keyToNext) || (keycode == 39)) && contentNo != (arrContent.length - 1)) {
      set_content(contentNo + 1);
     }
    }
   });
  }
 };

 // set window resize event
 var window_resize = function(enable){
  jQuery(w).unbind('resize');
  if (enable) {
   jQuery(w).resize(function(arrPageSizes, arrPageScroll){
    arrPageSizes  = get_page_sizes();
    arrPageScroll = get_page_scroll();
    jQuery(csspath.overlay).css({width:arrPageSizes[0], height:arrPageSizes[1]});
    jQuery(csspath.lightpop).css({top:arrPageScroll[1] + Math.round(arrPageSizes[3] / 10), left:arrPageScroll[0]});
   });
  }
 };

 // get page sizes
 var get_page_sizes = function(pageWidth, pageHeight, windowWidth, windowHeight){
  var back_compat = !(d.compatMode && d.compatMode !== "BackCompat");
  pageWidth  = (e && e.scrollWidth  ? e : b).scrollWidth;
  pageHeight = (e && e.scrollHeight ? e : b).scrollHeight;
  windowWidth  = (back_compat ? b : e).clientWidth;
  windowHeight = (back_compat ? b : e).clientHeight;
  pageWidth  = (pageWidth  < windowWidth  ? pageWidth : windowWidth);
  pageHeight = (pageHeight < windowHeight ? windowHeight : pageHeight);
  return new Array(pageWidth, pageHeight, windowWidth, windowHeight);
 };

 // get page scroll
 var get_page_scroll = function(){
  return new Array(
    (e && e.scrollLeft ? e : b).scrollLeft
   ,(e && e.scrollTop  ? e : b).scrollTop
  );
 };

 // finish!
 var finish_lightpop = function(){
  set_visibility(jQuery('object',jQuery(csspath.lightpop)), false).remove();
  jQuery(csspath.lightpop).height(jQuery(csspath.box).height()).slideUp(function(){
   jQuery(this).remove();
   jQuery(csspath.overlay).fadeOut(function(){
    jQuery(this).remove();
    // show embed, object, select element
    set_visibility(jQuery('embed, object, select'), true);
   });
  });
  keyboard_navigation(false);
  window_resize(false);
 };

 return init(this);
};})(jQuery);
