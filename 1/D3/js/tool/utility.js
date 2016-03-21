//工具类
(function ($) {
    //关于string的常用方法
    $.extend(String.prototype, {
        //截取字符串，以字符计算
        subStr: function (bytelen) {
            var v = this.valueOf();
            var copy = "";
            var len = 0;
            for (var i = 0; i < v.length; i++) {
                var c = v.charCodeAt(i);
                if (c > 127 || c == 94) {
                    len += 2;
                } else {
                    len++;
                }

                if (len > bytelen) {
                    break;
                } else {
                    copy += String.fromCharCode(v.charCodeAt(i));
                }
            }
            return copy;
        },
        //获取字节长度
        byteLength: function () {
            var r1 = new RegExp('%u..', 'g');
            var r2 = new RegExp('%.', 'g');
            return escape(this.valueOf()).replace(r1, '').replace(r2, '').length;
        },
        //是否为邮箱
        isEmail: function () {
            var r = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return r.test(this.valueOf());
        },
        //是否为手机号
        isMobile: function () {
            var r = /^((\(\d{3}\))|(\d{3}\-))?(13|15|18|14|17)\d{9}$/;
            return r.test(this.valueOf());
        },
        //是否为电话号码
        isPhone: function () {
            var r = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
            return r.test(this.valueOf());
        },
        //是否数字
        isNumber: function () {
            var s = this.replace(/(^\s*)|(\s*$)/g, "");
            return (s.search(/^[+-]?[0-9.]*$/) >= 0);
        },
        //是否中文
        isChinese: function () {
            var s = this.replace(/(^\s*)|(\s*$)/g, "");
            return (s.search(/[^\u4E00-\u9FA5]/) >= 0);
        },
        //是否正整数
        isPositiveNum: function () {
            var s = this.replace(/(^\s*)|(\s*$)/g, "");
            return (s.search(/^[1-9]\d*$/) >= 0);
        },
        //验证字符串是否有非法字符
        isValid: function () {
            var efilter = /^[^<>'~`·!@#$%^&*()]+$/g;
            return efilter.test(this.valueOf());
        },
        //去除首尾的全角半角空格
        exactTrim: function () {
            var v = this.replace(/(^\s*)|(\s*$)/g, "");
            return v.replace(/(^　*)|(　*$)/g, "");
        },
        //是否为空
        isEmpty: function () {
            if (this.valueOf() == null || this.valueOf() == undefined) {
                return true;
            }
            return this.valueOf().replace(/(^\s*)|(\s*$)/g, "").length == 0;
        },
        //检验文件名是否包含无效字符
        checkFileNameValidate: function () {
            var invalidate = fileNameChar;
            for (var i = 0; i < this.valueOf().length; i++) {
                var charValue = this.valueOf().substr(i, 1);
                if ($.inArray(charValue, invalidate) >= 0) {
                    return false;
                }
            }
            return true;
        },
        //检验文件名是否包含无效字符
        checkCharsValidate: function () {
            var invalidate = ['\\', '/', ':', '*', '?', '"', '<', '>', '|', '#'];
            for (var i = 0; i < this.valueOf().length; i++) {
                var charValue = this.valueOf().substr(i, 1);
                if ($.inArray(charValue, invalidate) >= 0) {
                    return false;
                }
            }
            return true;
        },
        //去除头部字符
        trimStart: function (trim) {
            if (!trim) {
                return this;
            }
            var temp = this;
            while (true) {
                if (temp.substr(0, trim.length) != trim) {
                    break;
                }
                temp = temp.substr(trim.length);
            }
            return temp;
        },
        //去除首尾字符
        trimEnd: function (trim) {
            if (!trim) {
                return this;
            }
            var temp = this;
            while (true) {
                if (temp.substr(temp.length - trim.length, trim.length) != trim) {
                    break;
                }
                temp = temp.substr(0, temp.length - trim.length);
            }
            return temp;
        },
        //去除首尾字符
        trim: function (trim) {
            var temp = trim;
            if (!trim) {
                temp = " ";
            }
            return this.trimStart(temp).trimEnd(temp);
        },
        //字符串格式化，"test{0}".format(arguments)
        format: function () {
            if (arguments.length == 0)
                return null;
            var v = this.valueOf();
            for (var i = 0; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i) + '\\}', 'gm');
                v = v.replace(re, arguments[i]);
            }
            return v;
        },
        // 将多文本框中的val转化至html中显示（支持换行）
        valueToHtml: function () {
            var v = this.valueOf();
            return v.replace(/&/g, "&amp;").replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/ /g, '&nbsp;').replace(/\n/g, "<br>");
        },
        // 将html转化至多文本框中显示（与valueToHtml方法相反）
        htmlToValue: function () {
            var v = this.valueOf();
            return v.replace(/&amp;/g, "&").replace(/<br>/g, "\r\n").replace(/<BR>/g, "\r\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, ' ');
        },
        //多文本框内容格式化，后台转Model需要替换部分符号（现仅用于组题中心，其它模块转码请使用encodeURIComponent方法）
        encodeText: function () {
            var v = this.valueOf();
            return encodeURIComponent(v.replace(/\\/g, "\\\\").replace(/"/g, '\\"'));
        },
        //计算字符串中回车符号个数
        checkBrCharLength: function (txt) {
            var len = 0;
            for (var i = 0; i < txt.length; i++) {
                if (txt[i].match(/\n/) != null) {
                    len += 1;
                }
            }
            return len;
        }
    });

    //关于array的常用方法
    $.extend(Array.prototype, {
        //判断数组是否包含该元素
        contains: function (ele) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == ele) {
                    return true;
                }
            }
            return false;
        },
        //获取元素在数组中下标
        indexOf: function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        },
        //删除数组中指定元素
        remove: function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        }
    });

    //关于date的常用方法
    $.extend(Date.prototype, {
        //日期格式化
        format: function (format) {
            var str = format;
            var week = ['日', '一', '二', '三', '四', '五', '六'];

            str = str.replace(/yyyy|YYYY/, this.getFullYear());
            str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

            str = str.replace(/MM/, this.getMonth() >= 9 ? (parseInt(this.getMonth()) + 1).toString() : '0' + (parseInt(this.getMonth()) + 1)).toString();
            str = str.replace(/M/g, parseInt(this.getMonth()) + 1).toString();

            str = str.replace(/w|W/g, week[this.getDay()]);

            str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
            str = str.replace(/d|D/g, this.getDate());

            str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
            str = str.replace(/h|H/g, this.getHours());
            str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
            str = str.replace(/m/g, this.getMinutes());

            str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
            str = str.replace(/s|S/g, this.getSeconds());

            return str;
        }
    });
})(jQuery);

(function ($) {
    $.extend({
        //post方式扩展
        motkPost: function (
            url,//请求地址
            param,//请求参数
            success,//返回成功时
            loading,//loading加载
            container,//数据加载容器
            init,//初始化回调函数
            error,//返回错误时回调函数
            appendTo//loading追加对象,当loading不为空时，此属性必填
        ) {
            loading = $(loading);
            container && container.empty();//清空容器

            //设置loading容器对齐方式
            loading.setLoadingContainer({
                container: appendTo,//容器
                callback: function () {
                    if (loading.length) {//显示加载标志
                        loading.show();
                        loading.parent().show();
                    }
                }
            });

            init && init.call(this);
            $.ajax({
                url: url,
                type: 'post',
                data: param,
                datatype: 'html',
                success: function (data) {
                    success && success.call(this, data);

                    if (loading.length) {
                        loading.hide();
                        loading.parent().hide();
                    }
                },
                error: function () {
                    error && error.call(this);
                    if (loading.length) {
                        loading.hide();
                        loading.parent().hide();
                    }
                }
            });
        },
        //ajax方式扩展，异步请求数据时需要提交额外的客户端信息
        motkAjax: function (opts) {
            var client = new Object();
            client.screenX = window.screen.width;//屏幕宽度
            client.screenY = window.screen.height;//屏幕高度

            try {
                if (opts) {
                    opts.data.client = JSON.stringify(client);
                    $.ajax(opts);
                }
            }
            catch (ex) {
                console.log(ex);
            }
        }
    });
})(jQuery);

//获取path url的params
var request = function (paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};

//获取上一页url
var getReferrer = function () {
    var referrer = '';
    try {
        referrer = window.top.document.referrer;
    } catch (e) {
        if (window.parent) {
            try {
                referrer = window.parent.document.referrer;
            } catch (e2) {
                referrer = '';
            }
        }
    }
    if (referrer === '') {
        referrer = document.referrer;
    }
    return referrer;
};

//浏览器版本信息
var ua = navigator.userAgent.toLowerCase();
var s = null;
var browser = {
    msie: (s = ua.match(/msie\s*([\d\.]+)/)) ? s[1] : false,
    firefox: (s = ua.match(/firefox\/([\d\.]+)/)) ? s[1] : false,
    chrome: (s = ua.match(/chrome\/([\d\.]+)/)) ? s[1] : false,
    opera: (s = ua.match(/opera.([\d\.]+)/)) ? s[1] : false,
    safari: (s = ua.match(/varsion\/([\d\.]+).*safari/)) ? s[1] : false,
    mobile: !!ua.match(/applewebkit.*mobile.*/) || !!ua.match(/applewebkit/), //是否为移动终端
    ios: !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
    android: ua.indexOf('android') > -1 || ua.indexOf('linux') > -1, //android终端或者uc浏览器
    iPhone: ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1, //是否为iPhone或者QQHD浏览器
    iPad: ua.indexOf('ipad') > -1, //是否iPad
    webApp: ua.indexOf('safari') == -1 //是否web应该程序，没有头部与底部
};