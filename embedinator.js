(function(){
    if(!/(ipad|iphone|ipod|android|webos)/.test(navigator.userAgent.toLowerCase())) {
        return false;
    }

    var objects = document.getElementsByTagName('object'),
    object, params, param, name, value;

    for( var i=0; i<objects.length; i++ ) {
        object = objects[i],
        params = object.getElementsByTagName('param');

        value = object.getAttribute('data');

        //Checks for url in the object data attribute
        if(/moogaloop/.test(value)) {
            getParams(object, value);
        }
        //Checks for url in the object's params
        else {
            for( var j=0; j<params.length; j++) {
                param = params[j];
                name = param.getAttribute('name');

                if( name == 'src' || name == 'movie' ) {
                    value = param.getAttribute('value');

                    if(/moogaloop/.test(value)) {
                        (function(o, v) {
                            setTimeout(function(){
                                getParams(o, v);
                            }, 10);
                        })(object, value);
                        break;
                    }
                }
            }
        }
    }

    function getParams(target, val) {
        var paramsArr = val.split('?')[1].split('clip_id=')[1].split('&'),
        clip_id = paramsArr[0],
        qparams = paramsArr[1];

        replace(target, clip_id, qparams, object.getAttribute('width'), object.getAttribute('height'));
    }

    function replace(target, clip_id, qparams, width, height) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', height);
        iframe.setAttribute('src', 'http://player.vimeo.com/video/'+clip_id+'?'+qparams);
        iframe.setAttribute('frameborder', 0);

        //insert iframe
        target.parentNode.insertBefore(iframe, target);

        //remove original
        target.parentNode.removeChild(target);
    }
})();