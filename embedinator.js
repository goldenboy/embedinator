(function(){
    var objects = document.getElementsByTagName('object'),
    object, params, param, name, value, clip_id, paramsArr, finds;

    for( var i=0; i<objects.length; i++ ) {
        object = objects[i],
        params = object.getElementsByTagName('param');
        finds = 0;

        for( var ii=0; ii<params.length && finds == 0; ii++) {
            param = params[ii];
            name = param.getAttribute('name');

            if( name == 'src' || name == 'movie' ) {
                value = param.getAttribute('value');

                if(/moogaloop/.test(value)) {
                    finds++;

                    paramsArr = value.split('?')[1].split('clip_id=')[1].split('&');
                    clip_id = paramsArr[0];
                    qparams = paramsArr[1];

                    replace(object, clip_id, qparams, object.getAttribute('width'), object.getAttribute('height'));
                }
            }
        }
    }

    function replace(target, clip_id, params, width, height) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', height);
        iframe.setAttribute('src', 'http://player.vimeo.com/video/'+clip_id+'?'+params);
        iframe.setAttribute('frameborder', 0);

        //insert iframe
        target.parentNode.insertBefore(iframe, target);

        //remove original
        target.parentNode.removeChild(target);
    }
})();