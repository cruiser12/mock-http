var http_mock = function(response)
{
    var http = function()
    {
        var r = this;

        var request = function(p,cb)
        {
            var res = function()
            {
                var on = function(event,data)
                {
                    //send back the as chunk
                    data((r.data)? r.data : null);
                    return true
                };
                return {
                    statusCode : (r.statusCode)? r.statusCode : null,
                    statusMessage : (r.statusMessage)? r.statusMessage : null,
                    on : on
                }
            }();
            cb(res);

            return this;
        };

        return {
            get                 : request,
            request             : request,
            on                  : function(p,cb){ return this; },
            setTimeout          : function(p,cb){ return this; },
            setNoDelay          : function(p,cb){ return this; },
            setSocketKeepAlive  : function(p,cb){ return this; },
            abort               : function(p,cb){ return this; },
            end                 : function(p,cb){ return this; }
        };
    };

    return http.call(response);
};

module.exports = http_mock;