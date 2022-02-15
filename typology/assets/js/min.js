!(function (n) {
    "use strict";
    (n.fn.fitVids = function (t) {
        var e,
            i,
            o = { customSelector: null, ignore: null };
        return (
            document.getElementById("fit-vids-style") ||
                ((e = document.head || document.getElementsByTagName("head")[0]),
                ((i = document.createElement("div")).innerHTML =
                    '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
                e.appendChild(i.childNodes[1])),
            t && n.extend(o, t),
            this.each(function () {
                var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
                o.customSelector && t.push(o.customSelector);
                var s = ".fitvidsignore";
                o.ignore && (s = s + ", " + o.ignore);
                var e = n(this).find(t.join(","));
                (e = (e = e.not("object object")).not(s)).each(function () {
                    var t,
                        e,
                        i = n(this);
                    0 < i.parents(s).length ||
                        ("embed" === this.tagName.toLowerCase() && i.parent("object").length) ||
                        i.parent(".fluid-width-video-wrapper").length ||
                        (i.css("height") || i.css("width") || (!isNaN(i.attr("height")) && !isNaN(i.attr("width"))) || (i.attr("height", 9), i.attr("width", 16)),
                        (t =
                            ("object" === this.tagName.toLowerCase() || (i.attr("height") && !isNaN(parseInt(i.attr("height"), 10))) ? parseInt(i.attr("height"), 10) : i.height()) /
                            (isNaN(parseInt(i.attr("width"), 10)) ? i.width() : parseInt(i.attr("width"), 10))),
                        i.attr("name") || ((e = "fitvid" + n.fn.fitVids._count), i.attr("name", e), n.fn.fitVids._count++),
                        i
                            .wrap('<div class="fluid-width-video-wrapper"></div>')
                            .parent(".fluid-width-video-wrapper")
                            .css("padding-top", 100 * t + "%"),
                        i.removeAttr("height").removeAttr("width"));
                });
            })
        );
    }),
    (n.fn.fitVids._count = 0);
})(window.jQuery || window.Zepto),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? t(require("jquery")) : t(window.jQuery || window.Zepto);
    })(function (h) {
        function t() {}
        function p(t, e) {
            g.ev.on(i + t + w, e);
        }
        function d(t, e, i, s) {
            var o = document.createElement("div");
            return (o.className = "mfp-" + t), i && (o.innerHTML = i), s ? e && e.appendChild(o) : ((o = h(o)), e && o.appendTo(e)), o;
        }
        function u(t, e) {
            g.ev.triggerHandler(i + t, e), g.st.callbacks && ((t = t.charAt(0).toLowerCase() + t.slice(1)), g.st.callbacks[t] && g.st.callbacks[t].apply(g, h.isArray(e) ? e : [e]));
        }
        function A(t) {
            return (t === e && g.currTemplate.closeBtn) || ((g.currTemplate.closeBtn = h(g.st.closeMarkup.replace("%title%", g.st.tClose))), (e = t)), g.currTemplate.closeBtn;
        }
        function n() {
            h.magnificPopup.instance || ((g = new t()).init(), (h.magnificPopup.instance = g));
        }
        var g,
            s,
            m,
            o,
            f,
            e,
            l = "Close",
            c = "BeforeClose",
            y = "MarkupParse",
            v = "Open",
            r = "Change",
            i = "mfp",
            w = "." + i,
            _ = "mfp-ready",
            a = "mfp-removing",
            b = "mfp-prevent-close",
            x = !!window.jQuery,
            C = h(window);
        (t.prototype = {
            constructor: t,
            init: function () {
                var t = navigator.appVersion;
                (g.isIE7 = -1 !== t.indexOf("MSIE 7.")),
                    (g.isIE8 = -1 !== t.indexOf("MSIE 8.")),
                    (g.isLowIE = g.isIE7 || g.isIE8),
                    (g.isAndroid = /android/gi.test(t)),
                    (g.isIOS = /iphone|ipad|ipod/gi.test(t)),
                    (g.supportsTransition = (function () {
                        var t = document.createElement("p").style,
                            e = ["ms", "O", "Moz", "Webkit"];
                        if (void 0 !== t.transition) return !0;
                        for (; e.length; ) if (e.pop() + "Transition" in t) return !0;
                        return !1;
                    })()),
                    (g.probablyMobile = g.isAndroid || g.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                    (m = h(document)),
                    (g.popupsCache = {});
            },
            open: function (t) {
                if (!1 === t.isObj) {
                    (g.items = t.items.toArray()), (g.index = 0);
                    for (var e, i = t.items, s = 0; s < i.length; s++)
                        if (((e = i[s]).parsed && (e = e.el[0]), e === t.el[0])) {
                            g.index = s;
                            break;
                        }
                } else (g.items = h.isArray(t.items) ? t.items : [t.items]), (g.index = t.index || 0);
                if (!g.isOpen) {
                    (g.types = []),
                        (f = ""),
                        t.mainEl && t.mainEl.length ? (g.ev = t.mainEl.eq(0)) : (g.ev = m),
                        t.key ? (g.popupsCache[t.key] || (g.popupsCache[t.key] = {}), (g.currTemplate = g.popupsCache[t.key])) : (g.currTemplate = {}),
                        (g.st = h.extend(!0, {}, h.magnificPopup.defaults, t)),
                        (g.fixedContentPos = "auto" === g.st.fixedContentPos ? !g.probablyMobile : g.st.fixedContentPos),
                        g.st.modal && ((g.st.closeOnContentClick = !1), (g.st.closeOnBgClick = !1), (g.st.showCloseBtn = !1), (g.st.enableEscapeKey = !1)),
                        g.bgOverlay ||
                            ((g.bgOverlay = d("bg").on("click" + w, function () {
                                g.close();
                            })),
                            (g.wrap = d("wrap")
                                .attr("tabindex", -1)
                                .on("click" + w, function (t) {
                                    g._checkIfClose(t.target) && g.close();
                                })),
                            (g.container = d("container", g.wrap))),
                        (g.contentContainer = d("content")),
                        g.st.preloader && (g.preloader = d("preloader", g.container, g.st.tLoading));
                    var o = h.magnificPopup.modules;
                    for (s = 0; s < o.length; s++) {
                        var n = (n = o[s]).charAt(0).toUpperCase() + n.slice(1);
                        g["init" + n].call(g);
                    }
                    u("BeforeOpen"),
                        g.st.showCloseBtn &&
                            (g.st.closeBtnInside
                                ? (p(y, function (t, e, i, s) {
                                      i.close_replaceWith = A(s.type);
                                  }),
                                  (f += " mfp-close-btn-in"))
                                : g.wrap.append(A())),
                        g.st.alignTop && (f += " mfp-align-top"),
                        g.fixedContentPos ? g.wrap.css({ overflow: g.st.overflowY, overflowX: "hidden", overflowY: g.st.overflowY }) : g.wrap.css({ top: C.scrollTop(), position: "absolute" }),
                        (!1 !== g.st.fixedBgPos && ("auto" !== g.st.fixedBgPos || g.fixedContentPos)) || g.bgOverlay.css({ height: m.height(), position: "absolute" }),
                        g.st.enableEscapeKey &&
                            m.on("keyup" + w, function (t) {
                                27 === t.keyCode && g.close();
                            }),
                        C.on("resize" + w, function () {
                            g.updateSize();
                        }),
                        g.st.closeOnContentClick || (f += " mfp-auto-cursor"),
                        f && g.wrap.addClass(f);
                    var r,
                        a = (g.wH = C.height()),
                        l = {};
                    g.fixedContentPos && (!g._hasScrollBar(a) || ((r = g._getScrollbarSize()) && (l.marginRight = r))), g.fixedContentPos && (g.isIE7 ? h("body, html").css("overflow", "hidden") : (l.overflow = "hidden"));
                    var c = g.st.mainClass;
                    return (
                        g.isIE7 && (c += " mfp-ie7"),
                        c && g._addClassToMFP(c),
                        g.updateItemHTML(),
                        u("BuildControls"),
                        h("html").css(l),
                        g.bgOverlay.add(g.wrap).prependTo(g.st.prependTo || h(document.body)),
                        (g._lastFocusedEl = document.activeElement),
                        setTimeout(function () {
                            g.content ? (g._addClassToMFP(_), g._setFocus()) : g.bgOverlay.addClass(_), m.on("focusin" + w, g._onFocusIn);
                        }, 16),
                        (g.isOpen = !0),
                        g.updateSize(a),
                        u(v),
                        t
                    );
                }
                g.updateItemHTML();
            },
            close: function () {
                g.isOpen &&
                    (u(c),
                    (g.isOpen = !1),
                    g.st.removalDelay && !g.isLowIE && g.supportsTransition
                        ? (g._addClassToMFP(a),
                          setTimeout(function () {
                              g._close();
                          }, g.st.removalDelay))
                        : g._close());
            },
            _close: function () {
                u(l);
                var t,
                    e = a + " " + _ + " ";
                g.bgOverlay.detach(),
                    g.wrap.detach(),
                    g.container.empty(),
                    g.st.mainClass && (e += g.st.mainClass + " "),
                    g._removeClassFromMFP(e),
                    g.fixedContentPos && ((t = { marginRight: "" }), g.isIE7 ? h("body, html").css("overflow", "") : (t.overflow = ""), h("html").css(t)),
                    m.off("keyup.mfp focusin" + w),
                    g.ev.off(w),
                    g.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                    g.bgOverlay.attr("class", "mfp-bg"),
                    g.container.attr("class", "mfp-container"),
                    !g.st.showCloseBtn || (g.st.closeBtnInside && !0 !== g.currTemplate[g.currItem.type]) || (g.currTemplate.closeBtn && g.currTemplate.closeBtn.detach()),
                    g._lastFocusedEl && h(g._lastFocusedEl).focus(),
                    (g.currItem = null),
                    (g.content = null),
                    (g.currTemplate = null),
                    (g.prevHeight = 0),
                    u("AfterClose");
            },
            updateSize: function (t) {
                var e, i;
                g.isIOS ? ((e = document.documentElement.clientWidth / window.innerWidth), (i = window.innerHeight * e), g.wrap.css("height", i), (g.wH = i)) : (g.wH = t || C.height()),
                    g.fixedContentPos || g.wrap.css("height", g.wH),
                    u("Resize");
            },
            updateItemHTML: function () {
                var t = g.items[g.index];
                g.contentContainer.detach(), g.content && g.content.detach(), t.parsed || (t = g.parseEl(g.index));
                var e,
                    i = t.type;
                u("BeforeChange", [g.currItem ? g.currItem.type : "", i]),
                    (g.currItem = t),
                    g.currTemplate[i] || ((e = !!g.st[i] && g.st[i].markup), u("FirstMarkupParse", e), (g.currTemplate[i] = !e || h(e))),
                    o && o !== t.type && g.container.removeClass("mfp-" + o + "-holder");
                var s = g["get" + i.charAt(0).toUpperCase() + i.slice(1)](t, g.currTemplate[i]);
                g.appendContent(s, i), (t.preloaded = !0), u(r, t), (o = t.type), g.container.prepend(g.contentContainer), u("AfterChange");
            },
            appendContent: function (t, e) {
                (g.content = t) ? (g.st.showCloseBtn && g.st.closeBtnInside && !0 === g.currTemplate[e] ? g.content.find(".mfp-close").length || g.content.append(A()) : (g.content = t)) : (g.content = ""),
                    u("BeforeAppend"),
                    g.container.addClass("mfp-" + e + "-holder"),
                    g.contentContainer.append(g.content);
            },
            parseEl: function (t) {
                var e,
                    i = g.items[t];
                if ((i = i.tagName ? { el: h(i) } : ((e = i.type), { data: i, src: i.src })).el) {
                    for (var s = g.types, o = 0; o < s.length; o++)
                        if (i.el.hasClass("mfp-" + s[o])) {
                            e = s[o];
                            break;
                        }
                    (i.src = i.el.attr("data-mfp-src")), i.src || (i.src = i.el.attr("href"));
                }
                return (i.type = e || g.st.type || "inline"), (i.index = t), (i.parsed = !0), (g.items[t] = i), u("ElementParse", i), g.items[t];
            },
            addGroup: function (e, i) {
                function t(t) {
                    (t.mfpEl = this), g._openClick(t, e, i);
                }
                var s = "click.magnificPopup";
                ((i = i || {}).mainEl = e), i.items ? ((i.isObj = !0), e.off(s).on(s, t)) : ((i.isObj = !1), i.delegate ? e.off(s).on(s, i.delegate, t) : (i.items = e).off(s).on(s, t));
            },
            _openClick: function (t, e, i) {
                if ((void 0 !== i.midClick ? i.midClick : h.magnificPopup.defaults.midClick) || (2 !== t.which && !t.ctrlKey && !t.metaKey)) {
                    var s = void 0 !== i.disableOn ? i.disableOn : h.magnificPopup.defaults.disableOn;
                    if (s)
                        if (h.isFunction(s)) {
                            if (!s.call(g)) return !0;
                        } else if (C.width() < s) return !0;
                    t.type && (t.preventDefault(), g.isOpen && t.stopPropagation()), (i.el = h(t.mfpEl)), i.delegate && (i.items = e.find(i.delegate)), g.open(i);
                }
            },
            updateStatus: function (t, e) {
                var i;
                g.preloader &&
                    (s !== t && g.container.removeClass("mfp-s-" + s),
                    e || "loading" !== t || (e = g.st.tLoading),
                    u("UpdateStatus", (i = { status: t, text: e })),
                    (t = i.status),
                    (e = i.text),
                    g.preloader.html(e),
                    g.preloader.find("a").on("click", function (t) {
                        t.stopImmediatePropagation();
                    }),
                    g.container.addClass("mfp-s-" + t),
                    (s = t));
            },
            _checkIfClose: function (t) {
                if (!h(t).hasClass(b)) {
                    var e = g.st.closeOnContentClick,
                        i = g.st.closeOnBgClick;
                    if (e && i) return !0;
                    if (!g.content || h(t).hasClass("mfp-close") || (g.preloader && t === g.preloader[0])) return !0;
                    if (t === g.content[0] || h.contains(g.content[0], t)) {
                        if (e) return !0;
                    } else if (i && h.contains(document, t)) return !0;
                    return !1;
                }
            },
            _addClassToMFP: function (t) {
                g.bgOverlay.addClass(t), g.wrap.addClass(t);
            },
            _removeClassFromMFP: function (t) {
                this.bgOverlay.removeClass(t), g.wrap.removeClass(t);
            },
            _hasScrollBar: function (t) {
                return (g.isIE7 ? m.height() : document.body.scrollHeight) > (t || C.height());
            },
            _setFocus: function () {
                (g.st.focus ? g.content.find(g.st.focus).eq(0) : g.wrap).focus();
            },
            _onFocusIn: function (t) {
                if (t.target !== g.wrap[0] && !h.contains(g.wrap[0], t.target)) return g._setFocus(), !1;
            },
            _parseMarkup: function (o, t, e) {
                var n;
                e.data && (t = h.extend(e.data, t)),
                    u(y, [o, t, e]),
                    h.each(t, function (t, e) {
                        return (
                            void 0 === e ||
                            !1 === e ||
                            void (1 < (n = t.split("_")).length
                                ? 0 < (i = o.find(w + "-" + n[0])).length &&
                                  ("replaceWith" === (s = n[1])
                                      ? i[0] !== e[0] && i.replaceWith(e)
                                      : "img" === s
                                      ? i.is("img")
                                          ? i.attr("src", e)
                                          : i.replaceWith('<img src="' + e + '" class="' + i.attr("class") + '" />')
                                      : i.attr(n[1], e))
                                : o.find(w + "-" + t).html(e))
                        );
                        var i, s;
                    });
            },
            _getScrollbarSize: function () {
                var t;
                return (
                    void 0 === g.scrollbarSize &&
                        (((t = document.createElement("div")).style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
                        document.body.appendChild(t),
                        (g.scrollbarSize = t.offsetWidth - t.clientWidth),
                        document.body.removeChild(t)),
                    g.scrollbarSize
                );
            },
        }),
            (h.magnificPopup = {
                instance: null,
                proto: t.prototype,
                modules: [],
                open: function (t, e) {
                    return n(), ((t = t ? h.extend(!0, {}, t) : {}).isObj = !0), (t.index = e || 0), this.instance.open(t);
                },
                close: function () {
                    return h.magnificPopup.instance && h.magnificPopup.instance.close();
                },
                registerModule: function (t, e) {
                    e.options && (h.magnificPopup.defaults[t] = e.options), h.extend(this.proto, e.proto), this.modules.push(t);
                },
                defaults: {
                    disableOn: 0,
                    key: null,
                    midClick: !1,
                    mainClass: "",
                    preloader: !0,
                    focus: "",
                    closeOnContentClick: !1,
                    closeOnBgClick: !0,
                    closeBtnInside: !0,
                    showCloseBtn: !0,
                    enableEscapeKey: !0,
                    modal: !1,
                    alignTop: !1,
                    removalDelay: 0,
                    prependTo: null,
                    fixedContentPos: "auto",
                    fixedBgPos: "auto",
                    overflowY: "auto",
                    closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                    tClose: "Close (Esc)",
                    tLoading: "Loading...",
                },
            }),
            (h.fn.magnificPopup = function (t) {
                n();
                var e,
                    i,
                    s,
                    o = h(this);
                return (
                    "string" == typeof t
                        ? "open" === t
                            ? ((e = x ? o.data("magnificPopup") : o[0].magnificPopup),
                              (i = parseInt(arguments[1], 10) || 0),
                              (s = e.items ? e.items[i] : ((s = o), e.delegate && (s = s.find(e.delegate)), s.eq(i))),
                              g._openClick({ mfpEl: s }, o, e))
                            : g.isOpen && g[t].apply(g, Array.prototype.slice.call(arguments, 1))
                        : ((t = h.extend(!0, {}, t)), x ? o.data("magnificPopup", t) : (o[0].magnificPopup = t), g.addGroup(o, t)),
                    o
                );
            });
        function T() {
            B && (E.after(B.addClass(k)).detach(), (B = null));
        }
        var k,
            E,
            B,
            z = "inline";
        h.magnificPopup.registerModule(z, {
            options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
            proto: {
                initInline: function () {
                    g.types.push(z),
                        p(l + "." + z, function () {
                            T();
                        });
                },
                getInline: function (t, e) {
                    if ((T(), t.src)) {
                        var i,
                            s = g.st.inline,
                            o = h(t.src);
                        return (
                            o.length
                                ? ((i = o[0].parentNode) && i.tagName && (E || ((k = s.hiddenClass), (E = d(k)), (k = "mfp-" + k)), (B = o.after(E).detach().removeClass(k))), g.updateStatus("ready"))
                                : (g.updateStatus("error", s.tNotFound), (o = h("<div>"))),
                            (t.inlineElement = o)
                        );
                    }
                    return g.updateStatus("ready"), g._parseMarkup(e, {}, t), e;
                },
            },
        });
        function I() {
            S && h(document.body).removeClass(S);
        }
        function M() {
            I(), g.req && g.req.abort();
        }
        var S,
            P = "ajax";
        h.magnificPopup.registerModule(P, {
            options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
            proto: {
                initAjax: function () {
                    g.types.push(P), (S = g.st.ajax.cursor), p(l + "." + P, M), p("BeforeChange." + P, M);
                },
                getAjax: function (o) {
                    S && h(document.body).addClass(S), g.updateStatus("loading");
                    var t = h.extend(
                        {
                            url: o.src,
                            success: function (t, e, i) {
                                var s = { data: t, xhr: i };
                                u("ParseAjax", s),
                                    g.appendContent(h(s.data), P),
                                    (o.finished = !0),
                                    I(),
                                    g._setFocus(),
                                    setTimeout(function () {
                                        g.wrap.addClass(_);
                                    }, 16),
                                    g.updateStatus("ready"),
                                    u("AjaxContentAdded");
                            },
                            error: function () {
                                I(), (o.finished = o.loadError = !0), g.updateStatus("error", g.st.ajax.tError.replace("%url%", o.src));
                            },
                        },
                        g.st.ajax.settings
                    );
                    return (g.req = h.ajax(t)), "";
                },
            },
        });
        var D;
        h.magnificPopup.registerModule("image", {
            options: {
                markup:
                    '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.',
            },
            proto: {
                initImage: function () {
                    var t = g.st.image,
                        e = ".image";
                    g.types.push("image"),
                        p(v + e, function () {
                            "image" === g.currItem.type && t.cursor && h(document.body).addClass(t.cursor);
                        }),
                        p(l + e, function () {
                            t.cursor && h(document.body).removeClass(t.cursor), C.off("resize" + w);
                        }),
                        p("Resize" + e, g.resizeImage),
                        g.isLowIE && p("AfterChange", g.resizeImage);
                },
                resizeImage: function () {
                    var t,
                        e = g.currItem;
                    e && e.img && g.st.image.verticalFit && ((t = 0), g.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", g.wH - t));
                },
                _onImageHasSize: function (t) {
                    t.img && ((t.hasSize = !0), D && clearInterval(D), (t.isCheckingImgSize = !1), u("ImageHasSize", t), t.imgHidden && (g.content && g.content.removeClass("mfp-loading"), (t.imgHidden = !1)));
                },
                findImageSize: function (e) {
                    var i = 0,
                        s = e.img[0],
                        o = function (t) {
                            D && clearInterval(D),
                                (D = setInterval(function () {
                                    0 < s.naturalWidth ? g._onImageHasSize(e) : (200 < i && clearInterval(D), 3 === ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500));
                                }, t));
                        };
                    o(1);
                },
                getImage: function (t, e) {
                    var i,
                        s = 0,
                        o = function () {
                            t &&
                                (t.img[0].complete
                                    ? (t.img.off(".mfploader"), t === g.currItem && (g._onImageHasSize(t), g.updateStatus("ready")), (t.hasSize = !0), (t.loaded = !0), u("ImageLoadComplete"))
                                    : ++s < 200
                                    ? setTimeout(o, 100)
                                    : n());
                        },
                        n = function () {
                            t && (t.img.off(".mfploader"), t === g.currItem && (g._onImageHasSize(t), g.updateStatus("error", r.tError.replace("%url%", t.src))), (t.hasSize = !0), (t.loaded = !0), (t.loadError = !0));
                        },
                        r = g.st.image,
                        a = e.find(".mfp-img");
                    return (
                        a.length &&
                            (((i = document.createElement("img")).className = "mfp-img"),
                            t.el && t.el.find("img").length && (i.alt = t.el.find("img").attr("alt")),
                            (t.img = h(i).on("load.mfploader", o).on("error.mfploader", n)),
                            (i.src = t.src),
                            a.is("img") && (t.img = t.img.clone()),
                            0 < (i = t.img[0]).naturalWidth ? (t.hasSize = !0) : i.width || (t.hasSize = !1)),
                        g._parseMarkup(
                            e,
                            {
                                title: (function (t) {
                                    if (t.data && void 0 !== t.data.title) return t.data.title;
                                    var e = g.st.image.titleSrc;
                                    if (e) {
                                        if (h.isFunction(e)) return e.call(g, t);
                                        if (t.el) return t.el.attr(e) || "";
                                    }
                                    return "";
                                })(t),
                                img_replaceWith: t.img,
                            },
                            t
                        ),
                        g.resizeImage(),
                        t.hasSize
                            ? (D && clearInterval(D), t.loadError ? (e.addClass("mfp-loading"), g.updateStatus("error", r.tError.replace("%url%", t.src))) : (e.removeClass("mfp-loading"), g.updateStatus("ready")))
                            : (g.updateStatus("loading"), (t.loading = !0), t.hasSize || ((t.imgHidden = !0), e.addClass("mfp-loading"), g.findImageSize(t))),
                        e
                    );
                },
            },
        });
        var $;
        h.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function (t) {
                    return t.is("img") ? t : t.find("img");
                },
            },
            proto: {
                initZoom: function () {
                    var t,
                        e,
                        i,
                        s,
                        o,
                        n,
                        r = g.st.zoom,
                        a = ".zoom";
                    r.enabled &&
                        g.supportsTransition &&
                        ((e = r.duration),
                        (i = function (t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + r.duration / 1e3 + "s " + r.easing,
                                s = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                o = "transition";
                            return (s["-webkit-" + o] = s["-moz-" + o] = s["-o-" + o] = s[o] = i), e.css(s), e;
                        }),
                        (s = function () {
                            g.content.css("visibility", "visible");
                        }),
                        p("BuildControls" + a, function () {
                            if (g._allowZoom()) {
                                if ((clearTimeout(o), g.content.css("visibility", "hidden"), !(t = g._getItemToZoom()))) return void s();
                                (n = i(t)).css(g._getOffset()),
                                    g.wrap.append(n),
                                    (o = setTimeout(function () {
                                        n.css(g._getOffset(!0)),
                                            (o = setTimeout(function () {
                                                s(),
                                                    setTimeout(function () {
                                                        n.remove(), (t = n = null), u("ZoomAnimationEnded");
                                                    }, 16);
                                            }, e));
                                    }, 16));
                            }
                        }),
                        p(c + a, function () {
                            if (g._allowZoom()) {
                                if ((clearTimeout(o), (g.st.removalDelay = e), !t)) {
                                    if (!(t = g._getItemToZoom())) return;
                                    n = i(t);
                                }
                                n.css(g._getOffset(!0)),
                                    g.wrap.append(n),
                                    g.content.css("visibility", "hidden"),
                                    setTimeout(function () {
                                        n.css(g._getOffset());
                                    }, 16);
                            }
                        }),
                        p(l + a, function () {
                            g._allowZoom() && (s(), n && n.remove(), (t = null));
                        }));
                },
                _allowZoom: function () {
                    return "image" === g.currItem.type;
                },
                _getItemToZoom: function () {
                    return !!g.currItem.hasSize && g.currItem.img;
                },
                _getOffset: function (t) {
                    var e = t ? g.currItem.img : g.st.zoom.opener(g.currItem.el || g.currItem),
                        i = e.offset(),
                        s = parseInt(e.css("padding-top"), 10),
                        o = parseInt(e.css("padding-bottom"), 10);
                    i.top -= h(window).scrollTop() - s;
                    var n = { width: e.width(), height: (x ? e.innerHeight() : e[0].offsetHeight) - o - s };
                    return void 0 === $ && ($ = void 0 !== document.createElement("p").style.MozTransform), $ ? (n["-moz-transform"] = n.transform = "translate(" + i.left + "px," + i.top + "px)") : ((n.left = i.left), (n.top = i.top)), n;
                },
            },
        });
        function H(t) {
            var e;
            !g.currTemplate[O] || ((e = g.currTemplate[O].find("iframe")).length && (t || (e[0].src = "//about:blank"), g.isIE8 && e.css("display", t ? "block" : "none")));
        }
        var O = "iframe";
        h.magnificPopup.registerModule(O, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                    vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                    gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
                },
            },
            proto: {
                initIframe: function () {
                    g.types.push(O),
                        p("BeforeChange", function (t, e, i) {
                            e !== i && (e === O ? H() : i === O && H(!0));
                        }),
                        p(l + "." + O, function () {
                            H();
                        });
                },
                getIframe: function (t, e) {
                    var i = t.src,
                        s = g.st.iframe;
                    h.each(s.patterns, function () {
                        if (-1 < i.indexOf(this.index)) return this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), (i = this.src.replace("%id%", i)), !1;
                    });
                    var o = {};
                    return s.srcAction && (o[s.srcAction] = i), g._parseMarkup(e, o, t), g.updateStatus("ready"), e;
                },
            },
        });
        function j(t) {
            var e = g.items.length;
            return e - 1 < t ? t - e : t < 0 ? e + t : t;
        }
        function W(t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i);
        }
        h.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%",
            },
            proto: {
                initGallery: function () {
                    var n = g.st.gallery,
                        t = ".mfp-gallery",
                        o = Boolean(h.fn.mfpFastClick);
                    if (((g.direction = !0), !n || !n.enabled)) return !1;
                    (f += " mfp-gallery"),
                        p(v + t, function () {
                            n.navigateByImgClick &&
                                g.wrap.on("click" + t, ".mfp-img", function () {
                                    if (1 < g.items.length) return g.next(), !1;
                                }),
                                m.on("keydown" + t, function (t) {
                                    37 === t.keyCode ? g.prev() : 39 === t.keyCode && g.next();
                                });
                        }),
                        p("UpdateStatus" + t, function (t, e) {
                            e.text && (e.text = W(e.text, g.currItem.index, g.items.length));
                        }),
                        p(y + t, function (t, e, i, s) {
                            var o = g.items.length;
                            i.counter = 1 < o ? W(n.tCounter, s.index, o) : "";
                        }),
                        p("BuildControls" + t, function () {
                            var t, e, i, s;
                            1 < g.items.length &&
                                n.arrows &&
                                !g.arrowLeft &&
                                ((t = n.arrowMarkup),
                                (e = g.arrowLeft = h(t.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(b)),
                                (i = g.arrowRight = h(t.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(b)),
                                e[(s = o ? "mfpFastClick" : "click")](function () {
                                    g.prev();
                                }),
                                i[s](function () {
                                    g.next();
                                }),
                                g.isIE7 && (d("b", e[0], !1, !0), d("a", e[0], !1, !0), d("b", i[0], !1, !0), d("a", i[0], !1, !0)),
                                g.container.append(e.add(i)));
                        }),
                        p(r + t, function () {
                            g._preloadTimeout && clearTimeout(g._preloadTimeout),
                                (g._preloadTimeout = setTimeout(function () {
                                    g.preloadNearbyImages(), (g._preloadTimeout = null);
                                }, 16));
                        }),
                        p(l + t, function () {
                            m.off(t), g.wrap.off("click" + t), g.arrowLeft && o && g.arrowLeft.add(g.arrowRight).destroyMfpFastClick(), (g.arrowRight = g.arrowLeft = null);
                        });
                },
                next: function () {
                    (g.direction = !0), (g.index = j(g.index + 1)), g.updateItemHTML();
                },
                prev: function () {
                    (g.direction = !1), (g.index = j(g.index - 1)), g.updateItemHTML();
                },
                goTo: function (t) {
                    (g.direction = t >= g.index), (g.index = t), g.updateItemHTML();
                },
                preloadNearbyImages: function () {
                    for (var t = g.st.gallery.preload, e = Math.min(t[0], g.items.length), i = Math.min(t[1], g.items.length), s = 1; s <= (g.direction ? i : e); s++) g._preloadItem(g.index + s);
                    for (s = 1; s <= (g.direction ? e : i); s++) g._preloadItem(g.index - s);
                },
                _preloadItem: function (t) {
                    var e;
                    (t = j(t)),
                        g.items[t].preloaded ||
                            ((e = g.items[t]).parsed || (e = g.parseEl(t)),
                            u("LazyLoad", e),
                            "image" === e.type &&
                                (e.img = h('<img class="mfp-img" />')
                                    .on("load.mfploader", function () {
                                        e.hasSize = !0;
                                    })
                                    .on("error.mfploader", function () {
                                        (e.hasSize = !0), (e.loadError = !0), u("LazyLoadError", e);
                                    })
                                    .attr("src", e.src)),
                            (e.preloaded = !0));
                },
            },
        });
        var F,
            Z,
            L = "retina";
        function Q() {
            C.off("touchmove" + Z + " touchend" + Z);
        }
        h.magnificPopup.registerModule(L, {
            options: {
                replaceSrc: function (t) {
                    return t.src.replace(/\.\w+$/, function (t) {
                        return "@2x" + t;
                    });
                },
                ratio: 1,
            },
            proto: {
                initRetina: function () {
                    var i, s;
                    1 < window.devicePixelRatio &&
                        ((i = g.st.retina),
                        (s = i.ratio),
                        1 < (s = isNaN(s) ? s() : s) &&
                            (p("ImageHasSize." + L, function (t, e) {
                                e.img.css({ "max-width": e.img[0].naturalWidth / s, width: "100%" });
                            }),
                            p("ElementParse." + L, function (t, e) {
                                e.src = i.replaceSrc(e, s);
                            })));
                },
            },
        }),
            (F = "ontouchstart" in window),
            (Z = ".mfpFastClick"),
            (h.fn.mfpFastClick = function (l) {
                return h(this).each(function () {
                    var e,
                        i,
                        s,
                        o,
                        n,
                        r,
                        a,
                        t = h(this);
                    F &&
                        t.on("touchstart" + Z, function (t) {
                            (n = !1),
                                (a = 1),
                                (r = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0]),
                                (s = r.clientX),
                                (o = r.clientY),
                                C.on("touchmove" + Z, function (t) {
                                    (r = t.originalEvent ? t.originalEvent.touches : t.touches), (a = r.length), (r = r[0]), (10 < Math.abs(r.clientX - s) || 10 < Math.abs(r.clientY - o)) && ((n = !0), Q());
                                }).on("touchend" + Z, function (t) {
                                    Q(),
                                        n ||
                                            1 < a ||
                                            ((e = !0),
                                            t.preventDefault(),
                                            clearTimeout(i),
                                            (i = setTimeout(function () {
                                                e = !1;
                                            }, 1e3)),
                                            l());
                                });
                        }),
                        t.on("click" + Z, function () {
                            e || l();
                        });
                });
            }),
            (h.fn.destroyMfpFastClick = function () {
                h(this).off("touchstart" + Z + " click" + Z), F && C.off("touchmove" + Z + " touchend" + Z);
            }),
            n();
    }),
    (function (l, i, o, n) {
        function c(t, e) {
            (this.settings = null),
                (this.options = l.extend({}, c.Defaults, e)),
                (this.$element = l(t)),
                (this._handlers = {}),
                (this._plugins = {}),
                (this._supress = {}),
                (this._current = null),
                (this._speed = null),
                (this._coordinates = []),
                (this._breakpoint = null),
                (this._width = null),
                (this._items = []),
                (this._clones = []),
                (this._mergers = []),
                (this._widths = []),
                (this._invalidated = {}),
                (this._pipe = []),
                (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
                (this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }),
                l.each(
                    ["onResize", "onThrottledResize"],
                    l.proxy(function (t, e) {
                        this._handlers[e] = l.proxy(this[e], this);
                    }, this)
                ),
                l.each(
                    c.Plugins,
                    l.proxy(function (t, e) {
                        this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
                    }, this)
                ),
                l.each(
                    c.Workers,
                    l.proxy(function (t, e) {
                        this._pipe.push({ filter: e.filter, run: l.proxy(e.run, this) });
                    }, this)
                ),
                this.setup(),
                this.initialize();
        }
        (c.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: i,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab",
        }),
            (c.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
            (c.Type = { Event: "event", State: "state" }),
            (c.Plugins = {}),
            (c.Workers = [
                {
                    filter: ["width", "settings"],
                    run: function () {
                        this._width = this.$element.width();
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        t.current = this._items && this._items[this.relative(this._current)];
                    },
                },
                {
                    filter: ["items", "settings"],
                    run: function () {
                        this.$stage.children(".cloned").remove();
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = this.settings.margin || "",
                            i = !this.settings.autoWidth,
                            s = this.settings.rtl,
                            o = { width: "auto", "margin-left": s ? e : "", "margin-right": s ? "" : e };
                        i || this.$stage.children().css(o), (t.css = o);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                            i = null,
                            s = this._items.length,
                            o = !this.settings.autoWidth,
                            n = [];
                        for (t.items = { merge: !1, width: e }; s--; )
                            (i = this._mergers[s]), (i = (this.settings.mergeFit && Math.min(i, this.settings.items)) || i), (t.items.merge = 1 < i || t.items.merge), (n[s] = o ? e * i : this._items[s].width());
                        this._widths = n;
                    },
                },
                {
                    filter: ["items", "settings"],
                    run: function () {
                        var t = [],
                            e = this._items,
                            i = this.settings,
                            s = Math.max(2 * i.items, 4),
                            o = 2 * Math.ceil(e.length / 2),
                            n = i.loop && e.length ? (i.rewind ? s : Math.max(s, o)) : 0,
                            r = "",
                            a = "";
                        for (n /= 2; n--; ) t.push(this.normalize(t.length / 2, !0)), (r += e[t[t.length - 1]][0].outerHTML), t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), (a = e[t[t.length - 1]][0].outerHTML + a);
                        (this._clones = t), l(r).addClass("cloned").appendTo(this.$stage), l(a).addClass("cloned").prependTo(this.$stage);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function () {
                        for (var t, e, i = this.settings.rtl ? 1 : -1, s = this._clones.length + this._items.length, o = -1, n = []; ++o < s; )
                            (t = n[o - 1] || 0), (e = this._widths[this.relative(o)] + this.settings.margin), n.push(t + e * i);
                        this._coordinates = n;
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function () {
                        var t = this.settings.stagePadding,
                            e = this._coordinates,
                            i = { width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t, "padding-left": t || "", "padding-right": t || "" };
                        this.$stage.css(i);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = this._coordinates.length,
                            i = !this.settings.autoWidth,
                            s = this.$stage.children();
                        if (i && t.items.merge) for (; e--; ) (t.css.width = this._widths[this.relative(e)]), s.eq(e).css(t.css);
                        else i && ((t.css.width = t.items.width), s.css(t.css));
                    },
                },
                {
                    filter: ["items"],
                    run: function () {
                        this._coordinates.length < 1 && this.$stage.removeAttr("style");
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        (t.current = t.current ? this.$stage.children().index(t.current) : 0), (t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current))), this.reset(t.current);
                    },
                },
                {
                    filter: ["position"],
                    run: function () {
                        this.animate(this.coordinates(this._current));
                    },
                },
                {
                    filter: ["width", "position", "items", "settings"],
                    run: function () {
                        for (var t, e, i = this.settings.rtl ? 1 : -1, s = 2 * this.settings.stagePadding, o = this.coordinates(this.current()) + s, n = o + this.width() * i, r = [], a = 0, l = this._coordinates.length; a < l; a++)
                            (t = this._coordinates[a - 1] || 0), (e = Math.abs(this._coordinates[a]) + s * i), ((this.op(t, "<=", o) && this.op(t, ">", n)) || (this.op(e, "<", o) && this.op(e, ">", n))) && r.push(a);
                        this.$stage.children(".active").removeClass("active"),
                            this.$stage.children(":eq(" + r.join("), :eq(") + ")").addClass("active"),
                            this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"));
                    },
                },
            ]),
            (c.prototype.initialize = function () {
                var t, e, i;
                this.enter("initializing"),
                    this.trigger("initialize"),
                    this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
                    this.settings.autoWidth &&
                        !this.is("pre-loading") &&
                        ((t = this.$element.find("img")), (e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n), (i = this.$element.children(e).width()), t.length && i <= 0 && this.preloadAutoWidthImages(t)),
                    this.$element.addClass(this.options.loadingClass),
                    (this.$stage = l("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
                    this.$element.append(this.$stage.parent()),
                    this.replace(this.$element.children().not(this.$stage.parent())),
                    this.$element.is(":visible") ? this.refresh() : this.invalidate("width"),
                    this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),
                    this.registerEventHandlers(),
                    this.leave("initializing"),
                    this.trigger("initialized");
            }),
            (c.prototype.setup = function () {
                var e = this.viewport(),
                    t = this.options.responsive,
                    i = -1,
                    s = null;
                t
                    ? (l.each(t, function (t) {
                          t <= e && i < t && (i = Number(t));
                      }),
                      "function" == typeof (s = l.extend({}, this.options, t[i])).stagePadding && (s.stagePadding = s.stagePadding()),
                      delete s.responsive,
                      s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i)))
                    : (s = l.extend({}, this.options)),
                    this.trigger("change", { property: { name: "settings", value: s } }),
                    (this._breakpoint = i),
                    (this.settings = s),
                    this.invalidate("settings"),
                    this.trigger("changed", { property: { name: "settings", value: this.settings } });
            }),
            (c.prototype.optionsLogic = function () {
                this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
            }),
            (c.prototype.prepare = function (t) {
                var e = this.trigger("prepare", { content: t });
                return (
                    e.data ||
                        (e.data = l("<" + this.settings.itemElement + "/>")
                            .addClass(this.options.itemClass)
                            .append(t)),
                    this.trigger("prepared", { content: e.data }),
                    e.data
                );
            }),
            (c.prototype.update = function () {
                for (
                    var t = 0,
                        e = this._pipe.length,
                        i = l.proxy(function (t) {
                            return this[t];
                        }, this._invalidated),
                        s = {};
                    t < e;

                )
                    (this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(s), t++;
                (this._invalidated = {}), this.is("valid") || this.enter("valid");
            }),
            (c.prototype.width = function (t) {
                switch ((t = t || c.Width.Default)) {
                    case c.Width.Inner:
                    case c.Width.Outer:
                        return this._width;
                    default:
                        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
                }
            }),
            (c.prototype.refresh = function () {
                this.enter("refreshing"),
                    this.trigger("refresh"),
                    this.setup(),
                    this.optionsLogic(),
                    this.$element.addClass(this.options.refreshClass),
                    this.update(),
                    this.$element.removeClass(this.options.refreshClass),
                    this.leave("refreshing"),
                    this.trigger("refreshed");
            }),
            (c.prototype.onThrottledResize = function () {
                i.clearTimeout(this.resizeTimer), (this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
            }),
            (c.prototype.onResize = function () {
                return (
                    !!this._items.length &&
                    this._width !== this.$element.width() &&
                    !!this.$element.is(":visible") &&
                    (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
                );
            }),
            (c.prototype.registerEventHandlers = function () {
                l.support.transition && this.$stage.on(l.support.transition.end + ".owl.core", l.proxy(this.onTransitionEnd, this)),
                    !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize),
                    this.settings.mouseDrag &&
                        (this.$element.addClass(this.options.dragClass),
                        this.$stage.on("mousedown.owl.core", l.proxy(this.onDragStart, this)),
                        this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                            return !1;
                        })),
                    this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", l.proxy(this.onDragEnd, this)));
            }),
            (c.prototype.onDragStart = function (t) {
                var e = null;
                3 !== t.which &&
                    ((e = l.support.transform
                        ? {
                              x: (e = this.$stage
                                  .css("transform")
                                  .replace(/.*\(|\)| /g, "")
                                  .split(","))[16 === e.length ? 12 : 4],
                              y: e[16 === e.length ? 13 : 5],
                          }
                        : ((e = this.$stage.position()), { x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left, y: e.top })),
                    this.is("animating") && (l.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")),
                    this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type),
                    this.speed(0),
                    (this._drag.time = new Date().getTime()),
                    (this._drag.target = l(t.target)),
                    (this._drag.stage.start = e),
                    (this._drag.stage.current = e),
                    (this._drag.pointer = this.pointer(t)),
                    l(o).on("mouseup.owl.core touchend.owl.core", l.proxy(this.onDragEnd, this)),
                    l(o).one(
                        "mousemove.owl.core touchmove.owl.core",
                        l.proxy(function (t) {
                            var e = this.difference(this._drag.pointer, this.pointer(t));
                            l(o).on("mousemove.owl.core touchmove.owl.core", l.proxy(this.onDragMove, this)), (Math.abs(e.x) < Math.abs(e.y) && this.is("valid")) || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                        }, this)
                    ));
            }),
            (c.prototype.onDragMove = function (t) {
                var e,
                    i = null,
                    s = null,
                    o = this.difference(this._drag.pointer, this.pointer(t)),
                    n = this.difference(this._drag.stage.start, o);
                this.is("dragging") &&
                    (t.preventDefault(),
                    this.settings.loop
                        ? ((i = this.coordinates(this.minimum())), (s = this.coordinates(this.maximum() + 1) - i), (n.x = ((((n.x - i) % s) + s) % s) + i))
                        : ((i = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                          (s = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                          (e = this.settings.pullDrag ? (-1 * o.x) / 5 : 0),
                          (n.x = Math.max(Math.min(n.x, i + e), s + e))),
                    (this._drag.stage.current = n),
                    this.animate(n.x));
            }),
            (c.prototype.onDragEnd = function (t) {
                var e = this.difference(this._drag.pointer, this.pointer(t)),
                    i = this._drag.stage.current,
                    s = (0 < e.x) ^ this.settings.rtl ? "left" : "right";
                l(o).off(".owl.core"),
                    this.$element.removeClass(this.options.grabClass),
                    ((0 !== e.x && this.is("dragging")) || !this.is("valid")) &&
                        (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                        this.current(this.closest(i.x, 0 !== e.x ? s : this._drag.direction)),
                        this.invalidate("position"),
                        this.update(),
                        (this._drag.direction = s),
                        (3 < Math.abs(e.x) || 300 < new Date().getTime() - this._drag.time) &&
                            this._drag.target.one("click.owl.core", function () {
                                return !1;
                            })),
                    this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
            }),
            (c.prototype.closest = function (i, s) {
                var o = -1,
                    n = this.width(),
                    r = this.coordinates();
                return (
                    this.settings.freeDrag ||
                        l.each(
                            r,
                            l.proxy(function (t, e) {
                                return (
                                    "left" === s && e - 30 < i && i < e + 30
                                        ? (o = t)
                                        : "right" === s && e - n - 30 < i && i < e - n + 30
                                        ? (o = t + 1)
                                        : this.op(i, "<", e) && this.op(i, ">", r[t + 1] || e - n) && (o = "left" === s ? t + 1 : t),
                                    -1 === o
                                );
                            }, this)
                        ),
                    this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? (o = i = this.minimum()) : this.op(i, "<", r[this.maximum()]) && (o = i = this.maximum())),
                    o
                );
            }),
            (c.prototype.animate = function (t) {
                var e = 0 < this.speed();
                this.is("animating") && this.onTransitionEnd(),
                    e && (this.enter("animating"), this.trigger("translate")),
                    l.support.transform3d && l.support.transition
                        ? this.$stage.css({ transform: "translate3d(" + t + "px,0px,0px)", transition: this.speed() / 1e3 + "s" })
                        : e
                        ? this.$stage.animate({ left: t + "px" }, this.speed(), this.settings.fallbackEasing, l.proxy(this.onTransitionEnd, this))
                        : this.$stage.css({ left: t + "px" });
            }),
            (c.prototype.is = function (t) {
                return this._states.current[t] && 0 < this._states.current[t];
            }),
            (c.prototype.current = function (t) {
                return t === n
                    ? this._current
                    : 0 === this._items.length
                    ? n
                    : ((t = this.normalize(t)),
                      this._current !== t &&
                          ((e = this.trigger("change", { property: { name: "position", value: t } })).data !== n && (t = this.normalize(e.data)),
                          (this._current = t),
                          this.invalidate("position"),
                          this.trigger("changed", { property: { name: "position", value: this._current } })),
                      this._current);
                var e;
            }),
            (c.prototype.invalidate = function (t) {
                return (
                    "string" === l.type(t) && ((this._invalidated[t] = !0), this.is("valid") && this.leave("valid")),
                    l.map(this._invalidated, function (t, e) {
                        return e;
                    })
                );
            }),
            (c.prototype.reset = function (t) {
                (t = this.normalize(t)) !== n && ((this._speed = 0), (this._current = t), this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]));
            }),
            (c.prototype.normalize = function (t, e) {
                var i = this._items.length,
                    s = e ? 0 : this._clones.length;
                return !this.isNumeric(t) || i < 1 ? (t = n) : (t < 0 || i + s <= t) && (t = ((((t - s / 2) % i) + i) % i) + s / 2), t;
            }),
            (c.prototype.relative = function (t) {
                return (t -= this._clones.length / 2), this.normalize(t, !0);
            }),
            (c.prototype.maximum = function (t) {
                var e,
                    i,
                    s,
                    o = this.settings,
                    n = this._coordinates.length;
                if (o.loop) n = this._clones.length / 2 + this._items.length - 1;
                else if (o.autoWidth || o.merge) {
                    for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !(s < (i += this._items[e].width() + this.settings.margin)); );
                    n = e + 1;
                } else n = o.center ? this._items.length - 1 : this._items.length - o.items;
                return t && (n -= this._clones.length / 2), Math.max(n, 0);
            }),
            (c.prototype.minimum = function (t) {
                return t ? 0 : this._clones.length / 2;
            }),
            (c.prototype.items = function (t) {
                return t === n ? this._items.slice() : ((t = this.normalize(t, !0)), this._items[t]);
            }),
            (c.prototype.mergers = function (t) {
                return t === n ? this._mergers.slice() : ((t = this.normalize(t, !0)), this._mergers[t]);
            }),
            (c.prototype.clones = function (i) {
                function s(t) {
                    return t % 2 == 0 ? o + t / 2 : e - (t + 1) / 2;
                }
                var e = this._clones.length / 2,
                    o = e + this._items.length;
                return i === n
                    ? l.map(this._clones, function (t, e) {
                          return s(e);
                      })
                    : l.map(this._clones, function (t, e) {
                          return t === i ? s(e) : null;
                      });
            }),
            (c.prototype.speed = function (t) {
                return t !== n && (this._speed = t), this._speed;
            }),
            (c.prototype.coordinates = function (t) {
                var e,
                    i = 1,
                    s = t - 1;
                return t === n
                    ? l.map(
                          this._coordinates,
                          l.proxy(function (t, e) {
                              return this.coordinates(e);
                          }, this)
                      )
                    : (this.settings.center ? (this.settings.rtl && ((i = -1), (s = t + 1)), (e = this._coordinates[t]), (e += ((this.width() - e + (this._coordinates[s] || 0)) / 2) * i)) : (e = this._coordinates[s] || 0),
                      (e = Math.ceil(e)));
            }),
            (c.prototype.duration = function (t, e, i) {
                return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed);
            }),
            (c.prototype.to = function (t, e) {
                var i,
                    s = this.current(),
                    o = t - this.relative(s),
                    n = (0 < o) - (o < 0),
                    r = this._items.length,
                    a = this.minimum(),
                    l = this.maximum();
                this.settings.loop
                    ? (!this.settings.rewind && Math.abs(o) > r / 2 && (o += -1 * n * r), (i = (((((t = s + o) - a) % r) + r) % r) + a) !== t && i - o <= l && 0 < i - o && ((s = i - o), (t = i), this.reset(s)))
                    : (t = this.settings.rewind ? ((t % (l += 1)) + l) % l : Math.max(a, Math.min(l, t))),
                    this.speed(this.duration(s, t, e)),
                    this.current(t),
                    this.$element.is(":visible") && this.update();
            }),
            (c.prototype.next = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) + 1, t);
            }),
            (c.prototype.prev = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) - 1, t);
            }),
            (c.prototype.onTransitionEnd = function (t) {
                return (t === n || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"));
            }),
            (c.prototype.viewport = function () {
                var t;
                if (this.options.responsiveBaseElement !== i) t = l(this.options.responsiveBaseElement).width();
                else if (i.innerWidth) t = i.innerWidth;
                else {
                    if (!o.documentElement || !o.documentElement.clientWidth) throw "Can not detect viewport width.";
                    t = o.documentElement.clientWidth;
                }
                return t;
            }),
            (c.prototype.replace = function (t) {
                this.$stage.empty(),
                    (this._items = []),
                    (t = t && (t instanceof jQuery ? t : l(t))),
                    this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)),
                    t
                        .filter(function () {
                            return 1 === this.nodeType;
                        })
                        .each(
                            l.proxy(function (t, e) {
                                (e = this.prepare(e)), this.$stage.append(e), this._items.push(e), this._mergers.push(+e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                            }, this)
                        ),
                    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                    this.invalidate("items");
            }),
            (c.prototype.add = function (t, e) {
                var i = this.relative(this._current);
                (e = e === n ? this._items.length : this.normalize(e, !0)),
                    (t = t instanceof jQuery ? t : l(t)),
                    this.trigger("add", { content: t, position: e }),
                    (t = this.prepare(t)),
                    0 === this._items.length || e === this._items.length
                        ? (0 === this._items.length && this.$stage.append(t),
                          0 !== this._items.length && this._items[e - 1].after(t),
                          this._items.push(t),
                          this._mergers.push(+t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                        : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, +t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                    this._items[i] && this.reset(this._items[i].index()),
                    this.invalidate("items"),
                    this.trigger("added", { content: t, position: e });
            }),
            (c.prototype.remove = function (t) {
                (t = this.normalize(t, !0)) !== n &&
                    (this.trigger("remove", { content: this._items[t], position: t }),
                    this._items[t].remove(),
                    this._items.splice(t, 1),
                    this._mergers.splice(t, 1),
                    this.invalidate("items"),
                    this.trigger("removed", { content: null, position: t }));
            }),
            (c.prototype.preloadAutoWidthImages = function (t) {
                t.each(
                    l.proxy(function (t, e) {
                        this.enter("pre-loading"),
                            (e = l(e)),
                            l(new Image())
                                .one(
                                    "load",
                                    l.proxy(function (t) {
                                        e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh();
                                    }, this)
                                )
                                .attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
                    }, this)
                );
            }),
            (c.prototype.destroy = function () {
                for (var t in (this.$element.off(".owl.core"),
                this.$stage.off(".owl.core"),
                l(o).off(".owl.core"),
                !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)),
                this._plugins))
                    this._plugins[t].destroy();
                this.$stage.children(".cloned").remove(),
                    this.$stage.unwrap(),
                    this.$stage.children().contents().unwrap(),
                    this.$stage.children().unwrap(),
                    this.$element
                        .removeClass(this.options.refreshClass)
                        .removeClass(this.options.loadingClass)
                        .removeClass(this.options.loadedClass)
                        .removeClass(this.options.rtlClass)
                        .removeClass(this.options.dragClass)
                        .removeClass(this.options.grabClass)
                        .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                        .removeData("owl.carousel");
            }),
            (c.prototype.op = function (t, e, i) {
                var s = this.settings.rtl;
                switch (e) {
                    case "<":
                        return s ? i < t : t < i;
                    case ">":
                        return s ? t < i : i < t;
                    case ">=":
                        return s ? t <= i : i <= t;
                    case "<=":
                        return s ? i <= t : t <= i;
                }
            }),
            (c.prototype.on = function (t, e, i, s) {
                t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i);
            }),
            (c.prototype.off = function (t, e, i, s) {
                t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i);
            }),
            (c.prototype.trigger = function (t, e, i, s, o) {
                var n = { item: { count: this._items.length, index: this.current() } },
                    r = l.camelCase(
                        l
                            .grep(["on", t, i], function (t) {
                                return t;
                            })
                            .join("-")
                            .toLowerCase()
                    ),
                    a = l.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), l.extend({ relatedTarget: this }, n, e));
                return (
                    this._supress[t] ||
                        (l.each(this._plugins, function (t, e) {
                            e.onTrigger && e.onTrigger(a);
                        }),
                        this.register({ type: c.Type.Event, name: t }),
                        this.$element.trigger(a),
                        this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)),
                    a
                );
            }),
            (c.prototype.enter = function (t) {
                l.each(
                    [t].concat(this._states.tags[t] || []),
                    l.proxy(function (t, e) {
                        this._states.current[e] === n && (this._states.current[e] = 0), this._states.current[e]++;
                    }, this)
                );
            }),
            (c.prototype.leave = function (t) {
                l.each(
                    [t].concat(this._states.tags[t] || []),
                    l.proxy(function (t, e) {
                        this._states.current[e]--;
                    }, this)
                );
            }),
            (c.prototype.register = function (i) {
                var e;
                i.type === c.Type.Event
                    ? (l.event.special[i.name] || (l.event.special[i.name] = {}),
                      l.event.special[i.name].owl ||
                          ((e = l.event.special[i.name]._default),
                          (l.event.special[i.name]._default = function (t) {
                              return !e || !e.apply || (t.namespace && -1 !== t.namespace.indexOf("owl")) ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments);
                          }),
                          (l.event.special[i.name].owl = !0)))
                    : i.type === c.Type.State &&
                      (this._states.tags[i.name] ? (this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags)) : (this._states.tags[i.name] = i.tags),
                      (this._states.tags[i.name] = l.grep(
                          this._states.tags[i.name],
                          l.proxy(function (t, e) {
                              return l.inArray(t, this._states.tags[i.name]) === e;
                          }, this)
                      )));
            }),
            (c.prototype.suppress = function (t) {
                l.each(
                    t,
                    l.proxy(function (t, e) {
                        this._supress[e] = !0;
                    }, this)
                );
            }),
            (c.prototype.release = function (t) {
                l.each(
                    t,
                    l.proxy(function (t, e) {
                        delete this._supress[e];
                    }, this)
                );
            }),
            (c.prototype.pointer = function (t) {
                var e = { x: null, y: null };
                return (
                    (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX
                        ? ((e.x = t.pageX), (e.y = t.pageY))
                        : ((e.x = t.clientX), (e.y = t.clientY)),
                    e
                );
            }),
            (c.prototype.isNumeric = function (t) {
                return !isNaN(parseFloat(t));
            }),
            (c.prototype.difference = function (t, e) {
                return { x: t.x - e.x, y: t.y - e.y };
            }),
            (l.fn.owlCarousel = function (e) {
                var s = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                    var t = l(this),
                        i = t.data("owl.carousel");
                    i ||
                        ((i = new c(this, "object" == typeof e && e)),
                        t.data("owl.carousel", i),
                        l.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, e) {
                            i.register({ type: c.Type.Event, name: e }),
                                i.$element.on(
                                    e + ".owl.carousel.core",
                                    l.proxy(function (t) {
                                        t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]));
                                    }, i)
                                );
                        })),
                        "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, s);
                });
            }),
            (l.fn.owlCarousel.Constructor = c);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i) {
        var s = function (t) {
            (this._core = t),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": e.proxy(function (t) {
                        t.namespace && this._core.settings.autoRefresh && this.watch();
                    }, this),
                }),
                (this._core.options = e.extend({}, s.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (s.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (s.prototype.watch = function () {
                this._interval || ((this._visible = this._core.$element.is(":visible")), (this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
            }),
            (s.prototype.refresh = function () {
                this._core.$element.is(":visible") !== this._visible &&
                    ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
            }),
            (s.prototype.destroy = function () {
                var t, e;
                for (t in (i.clearInterval(this._interval), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, n) {
        var e = function (t) {
            (this._core = t),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (t) {
                        if (t.namespace && this._core.settings && this._core.settings.lazyLoad && ((t.property && "position" == t.property.name) || "initialized" == t.type))
                            for (
                                var e = this._core.settings,
                                    i = (e.center && Math.ceil(e.items / 2)) || e.items,
                                    s = (e.center && -1 * i) || 0,
                                    o = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + s,
                                    n = this._core.clones().length,
                                    r = a.proxy(function (t, e) {
                                        this.load(e);
                                    }, this);
                                s++ < i;

                            )
                                this.load(n / 2 + this._core.relative(o)), n && a.each(this._core.clones(this._core.relative(o)), r), o++;
                    }, this),
                }),
                (this._core.options = a.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { lazyLoad: !1 }),
            (e.prototype.load = function (t) {
                var e = this._core.$stage.children().eq(t),
                    i = e && e.find(".owl-lazy");
                !i ||
                    -1 < a.inArray(e.get(0), this._loaded) ||
                    (i.each(
                        a.proxy(function (t, e) {
                            var i,
                                s = a(e),
                                o = (1 < n.devicePixelRatio && s.attr("data-src-retina")) || s.attr("data-src");
                            this._core.trigger("load", { element: s, url: o }, "lazy"),
                                s.is("img")
                                    ? s
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  s.css("opacity", 1), this._core.trigger("loaded", { element: s, url: o }, "lazy");
                                              }, this)
                                          )
                                          .attr("src", o)
                                    : (((i = new Image()).onload = a.proxy(function () {
                                          s.css({ "background-image": "url(" + o + ")", opacity: "1" }), this._core.trigger("loaded", { element: s, url: o }, "lazy");
                                      }, this)),
                                      (i.src = o));
                        }, this)
                    ),
                    this._loaded.push(e.get(0)));
            }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (n) {
        var e = function (t) {
            (this._core = t),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update();
                    }, this),
                    "loaded.owl.lazy": n.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                    }, this),
                }),
                (this._core.options = n.extend({}, e.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (e.prototype.update = function () {
                var t,
                    e = this._core._current,
                    i = e + this._core.settings.items,
                    s = this._core.$stage.children().toArray().slice(e, i),
                    o = [];
                n.each(s, function (t, e) {
                    o.push(n(e).height());
                }),
                    (t = Math.max.apply(null, o)),
                    this._core.$stage.parent().height(t).addClass(this._core.settings.autoHeightClass);
            }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (n.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
    })(window.Zepto || window.jQuery, (window, document)),
    (function (h, e) {
        var i = function (t) {
            (this._core = t),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": h.proxy(function (t) {
                        t.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                    }, this),
                    "resize.owl.carousel": h.proxy(function (t) {
                        t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": h.proxy(function (t) {
                        t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                    }, this),
                    "changed.owl.carousel": h.proxy(function (t) {
                        t.namespace && "position" === t.property.name && this._playing && this.stop();
                    }, this),
                    "prepared.owl.carousel": h.proxy(function (t) {
                        var e;
                        !t.namespace || ((e = h(t.content).find(".owl-video")).length && (e.css("display", "none"), this.fetch(e, h(t.content))));
                    }, this),
                }),
                (this._core.options = h.extend({}, i.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    h.proxy(function (t) {
                        this.play(t);
                    }, this)
                );
        };
        (i.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (i.prototype.fetch = function (t, e) {
                var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
                    s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                    o = t.attr("data-width") || this._core.settings.videoWidth,
                    n = t.attr("data-height") || this._core.settings.videoHeight,
                    r = t.attr("href");
                if (!r) throw new Error("Missing video URL.");
                if (
                    -1 <
                    (s = r.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    ))[3].indexOf("youtu")
                )
                    i = "youtube";
                else if (-1 < s[3].indexOf("vimeo")) i = "vimeo";
                else {
                    if (!(-1 < s[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
                    i = "vzaar";
                }
                (s = s[6]), (this._videos[r] = { type: i, id: s, width: o, height: n }), e.attr("data-video", r), this.thumbnail(t, this._videos[r]);
            }),
            (i.prototype.thumbnail = function (e, t) {
                function i(t) {
                    (s = c.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + a + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>'),
                        e.after(s),
                        e.after('<div class="owl-video-play-icon"></div>');
                }
                var s,
                    o,
                    n = t.width && t.height ? 'style="width:' + t.width + "px;height:" + t.height + 'px;"' : "",
                    r = e.find("img"),
                    a = "src",
                    l = "",
                    c = this._core.settings;
                return (
                    e.wrap('<div class="owl-video-wrapper"' + n + "></div>"),
                    this._core.settings.lazyLoad && ((a = "data-src"), (l = "owl-lazy")),
                    r.length
                        ? (i(r.attr(a)), r.remove(), !1)
                        : void ("youtube" === t.type
                              ? ((o = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg"), i(o))
                              : "vimeo" === t.type
                              ? h.ajax({
                                    type: "GET",
                                    url: "//vimeo.com/api/v2/video/" + t.id + ".json",
                                    jsonp: "callback",
                                    dataType: "jsonp",
                                    success: function (t) {
                                        (o = t[0].thumbnail_large), i(o);
                                    },
                                })
                              : "vzaar" === t.type &&
                                h.ajax({
                                    type: "GET",
                                    url: "//vzaar.com/api/videos/" + t.id + ".json",
                                    jsonp: "callback",
                                    dataType: "jsonp",
                                    success: function (t) {
                                        (o = t.framegrab_url), i(o);
                                    },
                                }))
                );
            }),
            (i.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (i.prototype.play = function (t) {
                var e,
                    i = h(t.target).closest("." + this._core.settings.itemClass),
                    s = this._videos[i.attr("data-video")],
                    o = s.width || "100%",
                    n = s.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (i = this._core.items(this._core.relative(i.index()))),
                    this._core.reset(i.index()),
                    "youtube" === s.type
                        ? (e = '<iframe width="' + o + '" height="' + n + '" src="//www.youtube.com/embed/' + s.id + "?autoplay=1&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>')
                        : "vimeo" === s.type
                        ? (e = '<iframe src="//player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + o + '" height="' + n + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
                        : "vzaar" === s.type && (e = '<iframe frameborder="0"height="' + n + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + s.id + '/player?autoplay=true"></iframe>'),
                    h('<div class="owl-video-frame">' + e + "</div>").insertAfter(i.find(".owl-video")),
                    (this._playing = i.addClass("owl-video-playing")));
            }),
            (i.prototype.isInFullScreen = function () {
                var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
                return t && h(t).parent().hasClass("owl-video-frame");
            }),
            (i.prototype.destroy = function () {
                var t, e;
                for (t in (this._core.$element.off("click.owl.video"), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (h.fn.owlCarousel.Constructor.Plugins.Video = i);
    })(window.Zepto || window.jQuery, (window, document)),
    (function (r) {
        var e = function (t) {
            (this.core = t),
                (this.core.options = r.extend({}, e.Defaults, this.core.options)),
                (this.swapping = !0),
                (this.previous = void 0),
                (this.next = void 0),
                (this.handlers = {
                    "change.owl.carousel": r.proxy(function (t) {
                        t.namespace && "position" == t.property.name && ((this.previous = this.core.current()), (this.next = t.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function (t) {
                        t.namespace && (this.swapping = "translated" == t.type);
                    }, this),
                    "translate.owl.carousel": r.proxy(function (t) {
                        t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (e.Defaults = { animateOut: !1, animateIn: !1 }),
            (e.prototype.swap = function () {
                var t, e, i, s, o, n;
                1 === this.core.settings.items &&
                    r.support.animation &&
                    r.support.transition &&
                    (this.core.speed(0),
                    (e = r.proxy(this.clear, this)),
                    (i = this.core.$stage.children().eq(this.previous)),
                    (s = this.core.$stage.children().eq(this.next)),
                    (o = this.core.settings.animateIn),
                    (n = this.core.settings.animateOut),
                    this.core.current() !== this.previous &&
                        (n &&
                            ((t = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                            i
                                .one(r.support.animation.end, e)
                                .css({ left: t + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(n)),
                        o && s.one(r.support.animation.end, e).addClass("animated owl-animated-in").addClass(o)));
            }),
            (e.prototype.clear = function (t) {
                r(t.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
            }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (r.fn.owlCarousel.Constructor.Plugins.Animate = e);
    })(window.Zepto || window.jQuery, (window, document)),
    (function (i, s, o) {
        var e = function (t) {
            (this._core = t),
                (this._timeout = null),
                (this._paused = !1),
                (this._handlers = {
                    "changed.owl.carousel": i.proxy(function (t) {
                        t.namespace && "settings" === t.property.name
                            ? this._core.settings.autoplay
                                ? this.play()
                                : this.stop()
                            : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval();
                    }, this),
                    "initialized.owl.carousel": i.proxy(function (t) {
                        t.namespace && this._core.settings.autoplay && this.play();
                    }, this),
                    "play.owl.autoplay": i.proxy(function (t, e, i) {
                        t.namespace && this.play(e, i);
                    }, this),
                    "stop.owl.autoplay": i.proxy(function (t) {
                        t.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": i.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": i.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                    }, this),
                    "touchstart.owl.core": i.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "touchend.owl.core": i.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = i.extend({}, e.Defaults, this._core.options));
        };
        (e.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
            (e.prototype.play = function (t, e) {
                (this._paused = !1), this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval());
            }),
            (e.prototype._getNextTimeout = function (t, e) {
                return (
                    this._timeout && s.clearTimeout(this._timeout),
                    s.setTimeout(
                        i.proxy(function () {
                            this._paused || this._core.is("busy") || this._core.is("interacting") || o.hidden || this._core.next(e || this._core.settings.autoplaySpeed);
                        }, this),
                        t || this._core.settings.autoplayTimeout
                    )
                );
            }),
            (e.prototype._setAutoPlayInterval = function () {
                this._timeout = this._getNextTimeout();
            }),
            (e.prototype.stop = function () {
                this._core.is("rotating") && (s.clearTimeout(this._timeout), this._core.leave("rotating"));
            }),
            (e.prototype.pause = function () {
                this._core.is("rotating") && (this._paused = !0);
            }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in (this.stop(), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (i.fn.owlCarousel.Constructor.Plugins.autoplay = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (n) {
        "use strict";
        var e = function (t) {
            (this._core = t),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
                (this._handlers = {
                    "prepared.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + n(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                    }, this),
                    "added.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
                    }, this),
                    "remove.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
                    }, this),
                    "changed.owl.carousel": n.proxy(function (t) {
                        t.namespace && "position" == t.property.name && this.draw();
                    }, this),
                    "initialized.owl.carousel": n.proxy(function (t) {
                        t.namespace &&
                            !this._initialized &&
                            (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                    }, this),
                    "refreshed.owl.carousel": n.proxy(function (t) {
                        t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                    }, this),
                }),
                (this._core.options = n.extend({}, e.Defaults, this._core.options)),
                this.$element.on(this._handlers);
        };
        (e.Defaults = {
            nav: !1,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (e.prototype.initialize = function () {
                var t,
                    i = this._core.settings;
                for (t in ((this._controls.$relative = (i.navContainer ? n(i.navContainer) : n("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                (this._controls.$previous = n("<" + i.navElement + ">")
                    .addClass(i.navClass[0])
                    .html(i.navText[0])
                    .prependTo(this._controls.$relative)
                    .on(
                        "click",
                        n.proxy(function (t) {
                            this.prev(i.navSpeed);
                        }, this)
                    )),
                (this._controls.$next = n("<" + i.navElement + ">")
                    .addClass(i.navClass[1])
                    .html(i.navText[1])
                    .appendTo(this._controls.$relative)
                    .on(
                        "click",
                        n.proxy(function (t) {
                            this.next(i.navSpeed);
                        }, this)
                    )),
                i.dotsData || (this._templates = [n("<div>").addClass(i.dotClass).append(n("<span>")).prop("outerHTML")]),
                (this._controls.$absolute = (i.dotsContainer ? n(i.dotsContainer) : n("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled")),
                this._controls.$absolute.on(
                    "click",
                    "div",
                    n.proxy(function (t) {
                        var e = n(t.target).parent().is(this._controls.$absolute) ? n(t.target).index() : n(t.target).parent().index();
                        t.preventDefault(), this.to(e, i.dotsSpeed);
                    }, this)
                ),
                this._overrides))
                    this._core[t] = n.proxy(this[t], this);
            }),
            (e.prototype.destroy = function () {
                var t, e, i, s;
                for (t in this._handlers) this.$element.off(t, this._handlers[t]);
                for (e in this._controls) this._controls[e].remove();
                for (s in this.overides) this._core[s] = this._overrides[s];
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.prototype.update = function () {
                var t,
                    e,
                    i = this._core.clones().length / 2,
                    s = i + this._core.items().length,
                    o = this._core.maximum(!0),
                    n = this._core.settings,
                    r = n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items;
                if (("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy))
                    for (this._pages = [], t = i, e = 0; t < s; t++) {
                        if (r <= e || 0 === e) {
                            if ((this._pages.push({ start: Math.min(o, t - i), end: t - i + r - 1 }), Math.min(o, t - i) === o)) break;
                            (e = 0), 0;
                        }
                        e += this._core.mergers(this._core.relative(t));
                    }
            }),
            (e.prototype.draw = function () {
                var t,
                    e = this._core.settings,
                    i = this._core.items().length <= e.items,
                    s = this._core.relative(this._core.current()),
                    o = e.loop || e.rewind;
                this._controls.$relative.toggleClass("disabled", !e.nav || i),
                    e.nav && (this._controls.$previous.toggleClass("disabled", !o && s <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && s >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !e.dots || i),
                    e.dots &&
                        ((t = this._pages.length - this._controls.$absolute.children().length),
                        e.dotsData && 0 != t
                            ? this._controls.$absolute.html(this._templates.join(""))
                            : 0 < t
                            ? this._controls.$absolute.append(new Array(1 + t).join(this._templates[0]))
                            : t < 0 && this._controls.$absolute.children().slice(t).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(n.inArray(this.current(), this._pages)).addClass("active"));
            }),
            (e.prototype.onTrigger = function (t) {
                var e = this._core.settings;
                t.page = { index: n.inArray(this.current(), this._pages), count: this._pages.length, size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items) };
            }),
            (e.prototype.current = function () {
                var i = this._core.relative(this._core.current());
                return n
                    .grep(
                        this._pages,
                        n.proxy(function (t, e) {
                            return t.start <= i && t.end >= i;
                        }, this)
                    )
                    .pop();
            }),
            (e.prototype.getPosition = function (t) {
                var e,
                    i,
                    s = this._core.settings;
                return (
                    "page" == s.slideBy
                        ? ((e = n.inArray(this.current(), this._pages)), (i = this._pages.length), t ? ++e : --e, (e = this._pages[((e % i) + i) % i].start))
                        : ((e = this._core.relative(this._core.current())), (i = this._core.items().length), t ? (e += s.slideBy) : (e -= s.slideBy)),
                    e
                );
            }),
            (e.prototype.next = function (t) {
                n.proxy(this._overrides.to, this._core)(this.getPosition(!0), t);
            }),
            (e.prototype.prev = function (t) {
                n.proxy(this._overrides.to, this._core)(this.getPosition(!1), t);
            }),
            (e.prototype.to = function (t, e, i) {
                var s;
                !i && this._pages.length ? ((s = this._pages.length), n.proxy(this._overrides.to, this._core)(this._pages[((t % s) + s) % s].start, e)) : n.proxy(this._overrides.to, this._core)(t, e);
            }),
            (n.fn.owlCarousel.Constructor.Plugins.Navigation = e);
    })(window.Zepto || window.jQuery, (window, document)),
    (function (s, o) {
        "use strict";
        var e = function (t) {
            (this._core = t),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": s.proxy(function (t) {
                        t.namespace && "URLHash" === this._core.settings.startPosition && s(o).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": s.proxy(function (t) {
                        if (t.namespace) {
                            var e = s(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!e) return;
                            this._hashes[e] = t.content;
                        }
                    }, this),
                    "changed.owl.carousel": s.proxy(function (t) {
                        if (t.namespace && "position" === t.property.name) {
                            var i = this._core.items(this._core.relative(this._core.current())),
                                e = s
                                    .map(this._hashes, function (t, e) {
                                        return t === i ? e : null;
                                    })
                                    .join();
                            if (!e || o.location.hash.slice(1) === e) return;
                            o.location.hash = e;
                        }
                    }, this),
                }),
                (this._core.options = s.extend({}, e.Defaults, this._core.options)),
                this.$element.on(this._handlers),
                s(o).on(
                    "hashchange.owl.navigation",
                    s.proxy(function (t) {
                        var e = o.location.hash.substring(1),
                            i = this._core.$stage.children(),
                            s = this._hashes[e] && i.index(this._hashes[e]);
                        void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0);
                    }, this)
                );
        };
        (e.Defaults = { URLhashListener: !1 }),
            (e.prototype.destroy = function () {
                var t, e;
                for (t in (s(o).off("hashchange.owl.navigation"), this._handlers)) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (s.fn.owlCarousel.Constructor.Plugins.Hash = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (o, n) {
        function e(t, i) {
            var s = !1,
                e = t.charAt(0).toUpperCase() + t.slice(1);
            return (
                o.each((t + " " + a.join(e + " ") + e).split(" "), function (t, e) {
                    return r[e] !== n ? ((s = !i || e), !1) : void 0;
                }),
                s
            );
        }
        function t(t) {
            return e(t, !0);
        }
        var r = o("<support>").get(0).style,
            a = "Webkit Moz O ms".split(" "),
            i = {
                transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
                animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
            },
            s = function () {
                return !!e("transform");
            },
            l = function () {
                return !!e("perspective");
            },
            c = function () {
                return !!e("animation");
            };
        !(function () {
            return !!e("transition");
        })() || ((o.support.transition = new String(t("transition"))), (o.support.transition.end = i.transition.end[o.support.transition])),
            c() && ((o.support.animation = new String(t("animation"))), (o.support.animation.end = i.animation.end[o.support.animation])),
            s() && ((o.support.transform = new String(t("transform"))), (o.support.transform3d = l()));
    })(window.Zepto || window.jQuery, (window, void document)),
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Sweetalert2=t()}(this,function(){"use strict";const u=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),t="SweetAlert2:",o=e=>e.charAt(0).toUpperCase()+e.slice(1),s=e=>Array.prototype.slice.call(e),a=e=>{console.warn("".concat(t," ").concat("object"==typeof e?e.join(" "):e))},r=e=>{console.error("".concat(t," ").concat(e))},n=[],i=(e,t)=>{t='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),n.includes(t)||(n.push(t),a(t))},d=e=>"function"==typeof e?e():e,c=e=>e&&"function"==typeof e.toPromise,l=e=>c(e)?e.toPromise():Promise.resolve(e),p=e=>e&&Promise.resolve(e)===e,m=e=>"object"==typeof e&&e.jquery,g=e=>e instanceof Element||m(e);var e=e=>{const t={};for(const n in e)t[e[n]]="swal2-"+e[n];return t};const h=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),f=e(["success","warning","info","question","error"]),b=()=>document.body.querySelector(".".concat(h.container)),y=e=>{const t=b();return t?t.querySelector(e):null},v=e=>y(".".concat(e)),w=()=>v(h.popup),C=()=>v(h.icon),k=()=>v(h.title),A=()=>v(h["html-container"]),P=()=>v(h.image),B=()=>v(h["progress-steps"]),x=()=>v(h["validation-message"]),E=()=>y(".".concat(h.actions," .").concat(h.confirm)),S=()=>y(".".concat(h.actions," .").concat(h.deny));const T=()=>y(".".concat(h.loader)),L=()=>y(".".concat(h.actions," .").concat(h.cancel)),O=()=>v(h.actions),j=()=>v(h.footer),D=()=>v(h["timer-progress-bar"]),M=()=>v(h.close),I=()=>{const e=s(w().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>(e=parseInt(e.getAttribute("tabindex")),(t=parseInt(t.getAttribute("tabindex")))<e?1:e<t?-1:0));var t=s(w().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));return(t=>{const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n})(e.concat(t)).filter(e=>ee(e))},H=()=>!q()&&!document.body.classList.contains(h["no-backdrop"]),q=()=>document.body.classList.contains(h["toast-shown"]);function V(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];const n=D();ee(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))}const N={previousBodyPadding:null},U=(t,e)=>{if(t.textContent="",e){const n=new DOMParser,o=n.parseFromString(e,"text/html");s(o.querySelector("head").childNodes).forEach(e=>{t.appendChild(e)}),s(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})}},F=(t,e)=>{if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)if(!t.classList.contains(n[e]))return!1;return!0},R=(e,t,n)=>{var o,i;if(o=e,i=t,s(o.classList).forEach(e=>{Object.values(h).includes(e)||Object.values(f).includes(e)||Object.values(i.showClass).includes(e)||o.classList.remove(e)}),t.customClass&&t.customClass[n]){if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return a("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));K(e,t.customClass[n])}},z=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return Z(e,h[t]);case"checkbox":return e.querySelector(".".concat(h.checkbox," input"));case"radio":return e.querySelector(".".concat(h.radio," input:checked"))||e.querySelector(".".concat(h.radio," input:first-child"));case"range":return e.querySelector(".".concat(h.range," input"));default:return Z(e,h.input)}},W=e=>{var t;e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},_=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{e.forEach?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},K=(e,t)=>{_(e,t,!0)},Y=(e,t)=>{_(e,t,!1)},Z=(t,n)=>{for(let e=0;e<t.childNodes.length;e++)if(F(t.childNodes[e],n))return t.childNodes[e]},J=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},X=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},$=e=>{e.style.display="none"},G=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},Q=(e,t,n)=>{t?X(e,n):$(e)},ee=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),te=()=>!ee(E())&&!ee(S())&&!ee(L()),ne=e=>!!(e.scrollHeight>e.clientHeight),oe=e=>{const t=window.getComputedStyle(e);var n=parseFloat(t.getPropertyValue("animation-duration")||"0"),e=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<n||0<e},ie=()=>"undefined"==typeof window||"undefined"==typeof document,se='\n <div aria-labelledby="'.concat(h.title,'" aria-describedby="').concat(h["html-container"],'" class="').concat(h.popup,'" tabindex="-1">\n   <button type="button" class="').concat(h.close,'"></button>\n   <ul class="').concat(h["progress-steps"],'"></ul>\n   <div class="').concat(h.icon,'"></div>\n   <img class="').concat(h.image,'" />\n   <h2 class="').concat(h.title,'" id="').concat(h.title,'"></h2>\n   <div class="').concat(h["html-container"],'" id="').concat(h["html-container"],'"></div>\n   <input class="').concat(h.input,'" />\n   <input type="file" class="').concat(h.file,'" />\n   <div class="').concat(h.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(h.select,'"></select>\n   <div class="').concat(h.radio,'"></div>\n   <label for="').concat(h.checkbox,'" class="').concat(h.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(h.label,'"></span>\n   </label>\n   <textarea class="').concat(h.textarea,'"></textarea>\n   <div class="').concat(h["validation-message"],'" id="').concat(h["validation-message"],'"></div>\n   <div class="').concat(h.actions,'">\n     <div class="').concat(h.loader,'"></div>\n     <button type="button" class="').concat(h.confirm,'"></button>\n     <button type="button" class="').concat(h.deny,'"></button>\n     <button type="button" class="').concat(h.cancel,'"></button>\n   </div>\n   <div class="').concat(h.footer,'"></div>\n   <div class="').concat(h["timer-progress-bar-container"],'">\n     <div class="').concat(h["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),ae=()=>{on.isVisible()&&on.resetValidationMessage()},re=e=>{var t=(()=>{const e=b();return!!e&&(e.remove(),Y([document.documentElement,document.body],[h["no-backdrop"],h["toast-shown"],h["has-column"]]),!0)})();if(ie())r("SweetAlert2 requires document to initialize");else{const n=document.createElement("div");n.className=h.container,t&&K(n,h["no-transition"]),U(n,se);const o="string"==typeof(t=e.target)?document.querySelector(t):t;o.appendChild(n),(e=>{const t=w();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")})(e),e=o,"rtl"===window.getComputedStyle(e).direction&&K(b(),h.rtl),(()=>{const e=w(),t=Z(e,h.input),n=Z(e,h.file),o=e.querySelector(".".concat(h.range," input")),i=e.querySelector(".".concat(h.range," output")),s=Z(e,h.select),a=e.querySelector(".".concat(h.checkbox," input")),r=Z(e,h.textarea);t.oninput=ae,n.onchange=ae,s.onchange=ae,a.onchange=ae,r.oninput=ae,o.oninput=()=>{ae(),i.value=o.value},o.onchange=()=>{ae(),o.nextSibling.value=o.value}})()}},ce=(e,t)=>{e instanceof HTMLElement?t.appendChild(e):"object"==typeof e?((e,t)=>{if(e.jquery)le(t,e);else U(t,e.toString())})(e,t):e&&U(t,e)},le=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},ue=(()=>{if(ie())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),de=(e,t)=>{var n,o,i,s,a,r=O(),c=T();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?X:$)(r),R(r,t,"actions"),n=r,o=c,i=t,s=E(),a=S(),r=L(),pe(s,"confirm",i),pe(a,"deny",i),pe(r,"cancel",i),function(e,t,n,o){if(!o.buttonsStyling)return Y([e,t,n],h.styled);K([e,t,n],h.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,K(e,h["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,K(t,h["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,K(n,h["default-outline"]))}(s,a,r,i),i.reverseButtons&&(i.toast?(n.insertBefore(r,s),n.insertBefore(a,s)):(n.insertBefore(r,o),n.insertBefore(a,o),n.insertBefore(s,o))),U(c,t.loaderHtml),R(c,t,"loader")};function pe(e,t,n){Q(e,n["show".concat(o(t),"Button")],"inline-block"),U(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=h[t],R(e,n,"".concat(t,"Button")),K(e,n["".concat(t,"ButtonClass")])}const me=(e,t)=>{var n,o,i=b();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||K([document.documentElement,document.body],h["no-backdrop"]),o=i,(n=t.position)in h?K(o,h[n]):(a('The "position" parameter is not valid, defaulting to "center"'),K(o,h.center)),n=i,!(o=t.grow)||"string"!=typeof o||(o="grow-".concat(o))in h&&K(n,h[o]),R(i,t,"container"))};var ge={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const he=["input","file","range","select","radio","checkbox","textarea"],fe=(e,o)=>{const i=w();e=ge.innerParams.get(e);const s=!e||o.input!==e.input;he.forEach(e=>{var t=h[e];const n=Z(i,t);((e,t)=>{const n=z(w(),e);if(n){be(n);for(const o in t)n.setAttribute(o,t[o])}})(e,o.inputAttributes),n.className=t,s&&$(n)}),o.input&&(s&&(e=>{if(!Ce[e.input])return r('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=we(e.input),n=Ce[e.input](t,e);X(n),setTimeout(()=>{W(n)})})(o),(e=>{const t=we(e.input);if(e.customClass)K(t,e.customClass.input)})(o))},be=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},ye=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},ve=(e,t,n)=>{if(n.inputLabel){e.id=h.input;const i=document.createElement("label");var o=h["input-label"];i.setAttribute("for",e.id),i.className=o,K(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},we=e=>{e=h[e]||h.input;return Z(w(),e)},Ce={};Ce.text=Ce.email=Ce.password=Ce.number=Ce.tel=Ce.url=(e,t)=>("string"==typeof t.inputValue||"number"==typeof t.inputValue?e.value=t.inputValue:p(t.inputValue)||a('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t.inputValue,'"')),ve(e,e,t),ye(e,t),e.type=t.input,e),Ce.file=(e,t)=>(ve(e,e,t),ye(e,t),e),Ce.range=(e,t)=>{const n=e.querySelector("input"),o=e.querySelector("output");return n.value=t.inputValue,n.type=t.input,o.value=t.inputValue,ve(n,e,t),e},Ce.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");U(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return ve(e,e,t),e},Ce.radio=e=>(e.textContent="",e),Ce.checkbox=(e,t)=>{const n=z(w(),"checkbox");n.value=1,n.id=h.checkbox,n.checked=Boolean(t.inputValue);var o=e.querySelector("span");return U(o,t.inputPlaceholder),e},Ce.textarea=(n,e)=>{n.value=e.inputValue,ye(n,e),ve(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(w()).width);new MutationObserver(()=>{var e,e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?w().style.width="".concat(e,"px"):w().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n};const ke=(e,t)=>{const n=A();R(n,t,"htmlContainer"),t.html?(ce(t.html,n),X(n,"block")):t.text?(n.textContent=t.text,X(n,"block")):$(n),fe(e,t)},Ae=(e,t)=>{var n=j();Q(n,t.footer),t.footer&&ce(t.footer,n),R(n,t,"footer")},Pe=(e,t)=>{const n=M();U(n,t.closeButtonHtml),R(n,t,"closeButton"),Q(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},Be=(e,t)=>{var n=ge.innerParams.get(e),e=C();return n&&t.icon===n.icon?(Se(e,t),void xe(e,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(f).indexOf(t.icon)?(r('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),$(e)):(X(e),Se(e,t),xe(e,t),void K(e,t.showClass.icon)):$(e)},xe=(e,t)=>{for(const n in f)t.icon!==n&&Y(e,f[n]);K(e,f[t.icon]),Te(e,t),Ee(),R(e,t,"icon")},Ee=()=>{const e=w();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Se=(e,t)=>{var n;e.textContent="",t.iconHtml?U(e,Le(t.iconHtml)):"success"===t.icon?U(e,'\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '):"error"===t.icon?U(e,'\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '):(n={question:"?",warning:"!",info:"i"},U(e,Le(n[t.icon])))},Te=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])G(e,n,"backgroundColor",t.iconColor);G(e,".swal2-success-ring","borderColor",t.iconColor)}},Le=e=>'<div class="'.concat(h["icon-content"],'">').concat(e,"</div>"),Oe=(e,t)=>{const n=P();if(!t.imageUrl)return $(n);X(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),J(n,"width",t.imageWidth),J(n,"height",t.imageHeight),n.className=h.image,R(n,t,"image")},je=(e,o)=>{const i=B();if(!o.progressSteps||0===o.progressSteps.length)return $(i);X(i),i.textContent="",o.currentProgressStep>=o.progressSteps.length&&a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.progressSteps.forEach((e,t)=>{var n,e=(n=e,e=document.createElement("li"),K(e,h["progress-step"]),U(e,n),e);i.appendChild(e),t===o.currentProgressStep&&K(e,h["active-progress-step"]),t!==o.progressSteps.length-1&&(t=(e=>{const t=document.createElement("li");return K(t,h["progress-step-line"]),e.progressStepsDistance&&(t.style.width=e.progressStepsDistance),t})(o),i.appendChild(t))})},De=(e,t)=>{const n=k();Q(n,t.title||t.titleText,"block"),t.title&&ce(t.title,n),t.titleText&&(n.innerText=t.titleText),R(n,t,"title")},Me=(e,t)=>{var n=b();const o=w();t.toast?(J(n,"width",t.width),o.style.width="100%",o.insertBefore(T(),C())):J(o,"width",t.width),J(o,"padding",t.padding),t.background&&(o.style.background=t.background),$(x()),((e,t)=>{if(e.className="".concat(h.popup," ").concat(ee(e)?t.showClass.popup:""),t.toast){K([document.documentElement,document.body],h["toast-shown"]);K(e,h.toast)}else K(e,h.modal);if(R(e,t,"popup"),typeof t.customClass==="string")K(e,t.customClass);if(t.icon)K(e,h["icon-".concat(t.icon)])})(o,t)},Ie=(e,t)=>{Me(e,t),me(e,t),je(e,t),Be(e,t),Oe(e,t),De(e,t),Pe(e,t),ke(e,t),de(e,t),Ae(e,t),"function"==typeof t.didRender&&t.didRender(w())};const He=()=>E()&&E().click();const qe=e=>{let t=w();t||on.fire(),t=w();var n=T();q()?$(C()):((e,t)=>{const n=O(),o=T();if(!t&&ee(E()))t=E();if(X(n),t){$(t);o.setAttribute("data-button-to-replace",t.className)}o.parentNode.insertBefore(o,t),K([e,n],h.loading)})(t,e),X(n),t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()},Ve=100,Ne={},Ue=()=>{Ne.previousActiveElement&&Ne.previousActiveElement.focus?(Ne.previousActiveElement.focus(),Ne.previousActiveElement=null):document.body&&document.body.focus()},Fe=o=>new Promise(e=>{if(!o)return e();var t=window.scrollX,n=window.scrollY;Ne.restoreFocusTimeout=setTimeout(()=>{Ue(),e()},Ve),window.scrollTo(t,n)});const Re=()=>{if(Ne.timeout)return(()=>{const e=D();var t=parseInt(window.getComputedStyle(e).width);e.style.removeProperty("transition"),e.style.width="100%";var n=parseInt(window.getComputedStyle(e).width),n=parseInt(t/n*100);e.style.removeProperty("transition"),e.style.width="".concat(n,"%")})(),Ne.timeout.stop()},ze=()=>{if(Ne.timeout){var e=Ne.timeout.start();return V(e),e}};let We=!1;const _e={};const Ke=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const o in _e){var n=e.getAttribute(o);if(n)return void _e[o].fire({template:n})}},Ye={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},Ze=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],Je={},Xe=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],$e=e=>Object.prototype.hasOwnProperty.call(Ye,e);const Ge=e=>Je[e],Qe=e=>{$e(e)||a('Unknown parameter "'.concat(e,'"'))},et=e=>{Xe.includes(e)&&a('The parameter "'.concat(e,'" is incompatible with toasts'))},tt=e=>{Ge(e)&&i(e,Ge(e))};var nt=Object.freeze({isValidParameter:$e,isUpdatableParameter:e=>-1!==Ze.indexOf(e),isDeprecatedParameter:Ge,argsToParams:n=>{const o={};return"object"!=typeof n[0]||g(n[0])?["title","html","icon"].forEach((e,t)=>{t=n[t];"string"==typeof t||g(t)?o[e]=t:void 0!==t&&r("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>ee(w()),clickConfirm:He,clickDeny:()=>S()&&S().click(),clickCancel:()=>L()&&L().click(),getContainer:b,getPopup:w,getTitle:k,getHtmlContainer:A,getImage:P,getIcon:C,getInputLabel:()=>v(h["input-label"]),getCloseButton:M,getActions:O,getConfirmButton:E,getDenyButton:S,getCancelButton:L,getLoader:T,getFooter:j,getTimerProgressBar:D,getFocusableElements:I,getValidationMessage:x,isLoading:()=>w().hasAttribute("data-loading"),fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new this(...t)},mixin:function(n){class e extends this{_main(e,t){return super._main(e,Object.assign({},n,t))}}return e},showLoading:qe,enableLoading:qe,getTimerLeft:()=>Ne.timeout&&Ne.timeout.getTimerLeft(),stopTimer:Re,resumeTimer:ze,toggleTimer:()=>{var e=Ne.timeout;return e&&(e.running?Re:ze)()},increaseTimer:e=>{if(Ne.timeout){e=Ne.timeout.increase(e);return V(e,!0),e}},isTimerRunning:()=>Ne.timeout&&Ne.timeout.isRunning(),bindClickHandler:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-swal-template";_e[e]=this,We||(document.body.addEventListener("click",Ke),We=!0)}});function ot(){var e=ge.innerParams.get(this);if(e){const t=ge.domCache.get(this);$(t.loader),q()?e.icon&&X(C()):(e=>{const t=e.popup.getElementsByClassName(e.loader.getAttribute("data-button-to-replace"));if(t.length)X(t[0],"inline-block");else if(te())$(e.actions)})(t),Y([t.popup,t.actions],h.loading),t.popup.removeAttribute("aria-busy"),t.popup.removeAttribute("data-loading"),t.confirmButton.disabled=!1,t.denyButton.disabled=!1,t.cancelButton.disabled=!1}}const it=()=>{null===N.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(N.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(N.previousBodyPadding+(()=>{const e=document.createElement("div");e.className=h["scrollbar-measure"],document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})(),"px"))},st=()=>{null!==N.previousBodyPadding&&(document.body.style.paddingRight="".concat(N.previousBodyPadding,"px"),N.previousBodyPadding=null)},at=()=>{var e;(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!F(document.body,h.iosfix)&&(e=document.body.scrollTop,document.body.style.top="".concat(-1*e,"px"),K(document.body,h.iosfix),(()=>{const e=b();let t;e.ontouchstart=e=>{t=rt(e)},e.ontouchmove=e=>{if(t){e.preventDefault();e.stopPropagation()}}})(),(()=>{const e=!navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);if(e){const t=44;if(w().scrollHeight>window.innerHeight-t)b().style.paddingBottom="".concat(t,"px")}})())},rt=e=>{var t,n=e.target,o=b();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(e=e).touches&&1<e.touches.length)&&(n===o||!(ne(o)||"INPUT"===n.tagName||"TEXTAREA"===n.tagName||ne(A())&&A().contains(n)))},ct=()=>{var e;F(document.body,h.iosfix)&&(e=parseInt(document.body.style.top,10),Y(document.body,h.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},lt=()=>{const e=s(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})};var ut={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};function dt(e,t,n,o){q()?ht(e,o):(Fe(n).then(()=>ht(e,o)),Ne.keydownTarget.removeEventListener("keydown",Ne.keydownHandler,{capture:Ne.keydownListenerCapture}),Ne.keydownHandlerAdded=!1),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),H()&&(st(),ct(),lt()),Y([document.documentElement,document.body],[h.shown,h["height-auto"],h["no-backdrop"],h["toast-shown"]])}function pt(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=ut.swalPromiseResolve.get(this);var n=(e=>{const t=w();if(!t)return false;const n=ge.innerParams.get(e);if(!n||F(t,n.hideClass.popup))return false;Y(t,n.showClass.popup),K(t,n.hideClass.popup);const o=b();return Y(o,n.showClass.backdrop),K(o,n.hideClass.backdrop),gt(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(mt(this),t(e)):n&&t(e)}const mt=e=>{e.isAwaitingPromise()&&(ge.awaitingPromise.delete(e),ge.innerParams.get(e)||e._destroy())},gt=(e,t,n)=>{var o,i,s,a=b(),r=ue&&oe(t);"function"==typeof n.willClose&&n.willClose(t),r?(o=e,i=t,s=a,r=n.returnFocus,t=n.didClose,Ne.swalCloseEventFinishedCallback=dt.bind(null,o,s,r,t),i.addEventListener(ue,function(e){e.target===i&&(Ne.swalCloseEventFinishedCallback(),delete Ne.swalCloseEventFinishedCallback)})):dt(e,a,n.returnFocus,n.didClose)},ht=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function ft(e,t,n){const o=ge.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function bt(e,t){if(!e)return!1;if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}class yt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date-this.started),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}var vt={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function wt(e){var t,n;(t=e).inputValidator||Object.keys(vt).forEach(e=>{t.input===e&&(t.inputValidator=vt[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&a("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(a('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />")),re(e)}const Ct=["swal-title","swal-html","swal-footer"],kt=e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content;return(e=>{const n=Ct.concat(["swal-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);s(e.children).forEach(e=>{const t=e.tagName.toLowerCase();if(n.indexOf(t)===-1)a("Unrecognized element <".concat(t,">"))})})(e),Object.assign((e=>{const o={};return s(e.querySelectorAll("swal-param")).forEach(e=>{At(e,["name","value"]);const t=e.getAttribute("name");let n=e.getAttribute("value");if(typeof Ye[t]==="boolean"&&n==="false")n=false;if(typeof Ye[t]==="object")n=JSON.parse(n);o[t]=n}),o})(e),(e=>{const n={};return s(e.querySelectorAll("swal-button")).forEach(e=>{At(e,["type","color","aria-label"]);const t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML;n["show".concat(o(t),"Button")]=true;if(e.hasAttribute("color"))n["".concat(t,"ButtonColor")]=e.getAttribute("color");if(e.hasAttribute("aria-label"))n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label")}),n})(e),(e=>{const t={},n=e.querySelector("swal-image");if(n){At(n,["src","width","height","alt"]);if(n.hasAttribute("src"))t.imageUrl=n.getAttribute("src");if(n.hasAttribute("width"))t.imageWidth=n.getAttribute("width");if(n.hasAttribute("height"))t.imageHeight=n.getAttribute("height");if(n.hasAttribute("alt"))t.imageAlt=n.getAttribute("alt")}return t})(e),(e=>{const t={},n=e.querySelector("swal-icon");if(n){At(n,["type","color"]);if(n.hasAttribute("type"))t.icon=n.getAttribute("type");if(n.hasAttribute("color"))t.iconColor=n.getAttribute("color");t.iconHtml=n.innerHTML}return t})(e),(e=>{const o={},t=e.querySelector("swal-input");if(t){At(t,["type","label","placeholder","value"]);o.input=t.getAttribute("type")||"text";if(t.hasAttribute("label"))o.inputLabel=t.getAttribute("label");if(t.hasAttribute("placeholder"))o.inputPlaceholder=t.getAttribute("placeholder");if(t.hasAttribute("value"))o.inputValue=t.getAttribute("value")}const n=e.querySelectorAll("swal-input-option");if(n.length){o.inputOptions={};s(n).forEach(e=>{At(e,["value"]);const t=e.getAttribute("value");const n=e.innerHTML;o.inputOptions[t]=n})}return o})(e),((e,t)=>{const n={};for(const o in t){const i=t[o];const s=e.querySelector(i);if(s){At(s,[]);n[i.replace(/^swal-/,"")]=s.innerHTML.trim()}}return n})(e,Ct))},At=(t,n)=>{s(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&a(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})},Pt=10,Bt=e=>{const t=b(),n=w();"function"==typeof e.willOpen&&e.willOpen(n);var o=window.getComputedStyle(document.body).overflowY;((e,t,n)=>{if(K(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),X(t,"grid"),setTimeout(()=>{K(t,n.showClass.popup);t.style.removeProperty("opacity")},Pt),K([document.documentElement,document.body],h.shown),n.heightAuto&&n.backdrop&&!n.toast)K([document.documentElement,document.body],h["height-auto"])})(t,n,e),setTimeout(()=>{((e,t)=>{if(ue&&oe(t)){e.style.overflowY="hidden";t.addEventListener(ue,xt)}else e.style.overflowY="auto"})(t,n)},Pt),H()&&(((e,t,n)=>{if(at(),t&&n!=="hidden")it();setTimeout(()=>{e.scrollTop=0})})(t,e.scrollbarPadding,o),(()=>{const e=s(document.body.children);e.forEach(e=>{e===b()||e.contains(b())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})})()),q()||Ne.previousActiveElement||(Ne.previousActiveElement=document.activeElement),"function"==typeof e.didOpen&&setTimeout(()=>e.didOpen(n)),Y(t,h["no-transition"])},xt=e=>{const t=w();if(e.target===t){const n=b();t.removeEventListener(ue,xt),n.style.overflowY="auto"}},Et=(e,t)=>{"select"===t.input||"radio"===t.input?((t,n)=>{const o=w(),i=e=>Tt[n.input](o,Lt(e),n);if(c(n.inputOptions)||p(n.inputOptions)){qe(E());l(n.inputOptions).then(e=>{t.hideLoading();i(e)})}else if(typeof n.inputOptions==="object")i(n.inputOptions);else r("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))})(e,t):["text","email","number","tel","textarea"].includes(t.input)&&(c(t.inputValue)||p(t.inputValue))&&(qe(E()),((t,n)=>{const o=t.getInput();$(o),l(n.inputValue).then(e=>{o.value=n.input==="number"?parseFloat(e)||0:"".concat(e);X(o);o.focus();t.hideLoading()}).catch(e=>{r("Error in inputValue promise: ".concat(e));o.value="";X(o);o.focus();t.hideLoading()})})(e,t))},St=(e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o},Tt={select:(e,t,i)=>{const s=Z(e,h.select),a=(e,t,n)=>{const o=document.createElement("option");o.value=n,U(o,t),o.selected=Ot(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,s.appendChild(o),n.forEach(e=>a(o,e[1],e[0]))}else a(s,n,t)}),s.focus()},radio:(e,t,s)=>{const a=Z(e,h.radio);t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label");n.type="radio",n.name=h.radio,n.value=t,Ot(t,s.inputValue)&&(n.checked=!0);const i=document.createElement("span");U(i,e),i.className=h.label,o.appendChild(n),o.appendChild(i),a.appendChild(o)});const n=a.querySelectorAll("input");n.length&&n[0].focus()}},Lt=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Lt(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Lt(t)),o.push([e,t])}),o},Ot=(e,t)=>t&&t.toString()===e.toString(),jt=e=>{var t=ge.innerParams.get(e);e.disableButtons(),t.input?It(e,"confirm"):Ut(e,!0)},Dt=e=>{var t=ge.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?It(e,"deny"):qt(e,!1)},Mt=(e,t)=>{e.disableButtons(),t(u.cancel)},It=(e,t)=>{var n=ge.innerParams.get(e),o=St(e,n);n.inputValidator?Ht(e,o,t):e.getInput().checkValidity()?("deny"===t?qt:Ut)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},Ht=(t,n,o)=>{const e=ge.innerParams.get(t);t.disableInput();const i=Promise.resolve().then(()=>l(e.inputValidator(n,e.validationMessage)));i.then(e=>{t.enableButtons(),t.enableInput(),e?t.showValidationMessage(e):("deny"===o?qt:Ut)(t,n)})},qt=(t,n)=>{const e=ge.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&qe(S()),e.preDeny){ge.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>l(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?t.hideLoading():t.closePopup({isDenied:!0,value:void 0===e?n:e})}).catch(e=>Nt(t||void 0,e))}else t.closePopup({isDenied:!0,value:n})},Vt=(e,t)=>{e.closePopup({isConfirmed:!0,value:t})},Nt=(e,t)=>{e.rejectPromise(t)},Ut=(t,n)=>{const e=ge.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&qe(),e.preConfirm){t.resetValidationMessage(),ge.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>l(e.preConfirm(n,e.validationMessage)));o.then(e=>{ee(x())||!1===e?t.hideLoading():Vt(t,void 0===e?n:e)}).catch(e=>Nt(t||void 0,e))}else Vt(t,n)},Ft=(t,e,n,o)=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1),n.toast||(e.keydownHandler=e=>((e,t,n)=>{const o=ge.innerParams.get(e);o&&(o.stopKeydownPropagation&&t.stopPropagation(),"Enter"===t.key?_t(e,t,o):"Tab"===t.key?Kt(t,o):[...zt,...Wt].includes(t.key)?Yt(t.key):"Escape"===t.key&&Zt(t,o,n))})(t,e,o),e.keydownTarget=n.keydownListenerCapture?window:w(),e.keydownListenerCapture=n.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0)},Rt=(e,t,n)=>{const o=I();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();w().focus()},zt=["ArrowRight","ArrowDown"],Wt=["ArrowLeft","ArrowUp"],_t=(e,t,n)=>{t.isComposing||t.target&&e.getInput()&&t.target.outerHTML===e.getInput().outerHTML&&(["textarea","file"].includes(n.input)||(He(),t.preventDefault()))},Kt=(e,t)=>{var n=e.target,o=I();let i=-1;for(let e=0;e<o.length;e++)if(n===o[e]){i=e;break}e.shiftKey?Rt(0,i,-1):Rt(0,i,1),e.stopPropagation(),e.preventDefault()},Yt=e=>{const t=E(),n=S(),o=L();if([t,n,o].includes(document.activeElement)){e=zt.includes(e)?"nextElementSibling":"previousElementSibling";const i=document.activeElement[e];i&&i.focus()}},Zt=(e,t,n)=>{d(t.allowEscapeKey)&&(e.preventDefault(),n(u.esc))},Jt=(e,t,n)=>{var o,i,s,a,r,c,l;ge.innerParams.get(e).toast?(c=e,l=n,t.popup.onclick=()=>{var e=ge.innerParams.get(c);e.showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||e.timer||e.input||l(u.close)}):((r=t).popup.onmousedown=()=>{r.container.onmouseup=function(e){r.container.onmouseup=void 0,e.target===r.container&&(Xt=!0)}},(a=t).container.onmousedown=()=>{a.popup.onmouseup=function(e){a.popup.onmouseup=void 0,e.target!==a.popup&&!a.popup.contains(e.target)||(Xt=!0)}},o=e,s=n,(i=t).container.onclick=e=>{var t=ge.innerParams.get(o);Xt?Xt=!1:e.target===i.container&&d(t.allowOutsideClick)&&s(u.backdrop)})};let Xt=!1;const $t=(e,t,n)=>{var o=D();$(o),t.timer&&(e.timeout=new yt(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(X(o),setTimeout(()=>{e.timeout&&e.timeout.running&&V(t.timer)})))},Gt=(e,t)=>{if(!t.toast)return d(t.allowEnterKey)?void(((e,t)=>{if(t.focusDeny&&ee(e.denyButton)){e.denyButton.focus();return true}if(t.focusCancel&&ee(e.cancelButton)){e.cancelButton.focus();return true}if(t.focusConfirm&&ee(e.confirmButton)){e.confirmButton.focus();return true}return false})(e,t)||Rt(0,-1,1)):(()=>{if(document.activeElement&&typeof document.activeElement.blur==="function")document.activeElement.blur()})()};const Qt=e=>{e.isAwaitingPromise()?(en(ge,e),ge.awaitingPromise.set(e,!0)):(en(ut,e),en(ge,e))},en=(e,t)=>{for(const n in e)e[n].delete(t)};e=Object.freeze({hideLoading:ot,disableLoading:ot,getInput:function(e){var t=ge.innerParams.get(e||this);return(e=ge.domCache.get(e||this))?z(e.popup,t.input):null},close:pt,isAwaitingPromise:function(){return!!ge.awaitingPromise.get(this)},rejectPromise:function(e){const t=ut.swalPromiseReject.get(this);mt(this),t&&t(e)},closePopup:pt,closeModal:pt,closeToast:pt,enableButtons:function(){ft(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){ft(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return bt(this.getInput(),!1)},disableInput:function(){return bt(this.getInput(),!0)},showValidationMessage:function(e){const t=ge.domCache.get(this);var n=ge.innerParams.get(this);U(t.validationMessage,e),t.validationMessage.className=h["validation-message"],n.customClass&&n.customClass.validationMessage&&K(t.validationMessage,n.customClass.validationMessage),X(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",h["validation-message"]),W(o),K(o,h.inputerror))},resetValidationMessage:function(){var e=ge.domCache.get(this);e.validationMessage&&$(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),Y(t,h.inputerror))},getProgressSteps:function(){return ge.domCache.get(this).progressSteps},_main:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};(e=>{!e.backdrop&&e.allowOutsideClick&&a('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const t in e)Qe(t),e.toast&&et(t),tt(t)})(Object.assign({},t,e)),Ne.currentInstance&&(Ne.currentInstance._destroy(),H()&&lt()),Ne.currentInstance=this,wt(e=((e,t)=>{const n=kt(e),o=Object.assign({},Ye,t,n,e);return o.showClass=Object.assign({},Ye.showClass,o.showClass),o.hideClass=Object.assign({},Ye.hideClass,o.hideClass),o})(e,t)),Object.freeze(e),Ne.timeout&&(Ne.timeout.stop(),delete Ne.timeout),clearTimeout(Ne.restoreFocusTimeout);var o,i,s,t=(e=>{const t={popup:w(),container:b(),actions:O(),confirmButton:E(),denyButton:S(),cancelButton:L(),loader:T(),closeButton:M(),validationMessage:x(),progressSteps:B()};return ge.domCache.set(e,t),t})(this);return Ie(this,e),ge.innerParams.set(this,e),o=this,i=t,s=e,new Promise((e,t)=>{const n=e=>{o.closePopup({isDismissed:!0,dismiss:e})};ut.swalPromiseResolve.set(o,e),ut.swalPromiseReject.set(o,t),i.confirmButton.onclick=()=>jt(o),i.denyButton.onclick=()=>Dt(o),i.cancelButton.onclick=()=>Mt(o,n),i.closeButton.onclick=()=>n(u.close),Jt(o,i,n),Ft(o,Ne,s,n),Et(o,s),Bt(s),$t(Ne,s,n),Gt(i,s),setTimeout(()=>{i.container.scrollTop=0})})},update:function(t){var e=w(),n=ge.innerParams.get(this);if(!e||F(e,n.hideClass.popup))return a("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");const o={};Object.keys(t).forEach(e=>{on.isUpdatableParameter(e)?o[e]=t[e]:a('Invalid parameter to update: "'.concat(e,'". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'))}),n=Object.assign({},n,o),Ie(this,n),ge.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,t),writable:!1,enumerable:!0}})},_destroy:function(){var e=ge.domCache.get(this);const t=ge.innerParams.get(this);t?(e.popup&&Ne.swalCloseEventFinishedCallback&&(Ne.swalCloseEventFinishedCallback(),delete Ne.swalCloseEventFinishedCallback),Ne.deferDisposalTimer&&(clearTimeout(Ne.deferDisposalTimer),delete Ne.deferDisposalTimer),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,Qt(e),delete e.params,delete Ne.keydownHandler,delete Ne.keydownTarget,delete Ne.currentInstance):Qt(this)}});let tn;class nn{constructor(){if("undefined"!=typeof window){tn=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t));Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}});o=this._main(this.params);ge.promise.set(this,o)}}then(e){const t=ge.promise.get(this);return t.then(e)}finally(e){const t=ge.promise.get(this);return t.finally(e)}}Object.assign(nn.prototype,e),Object.assign(nn,nt),Object.keys(e).forEach(e=>{nn[e]=function(){if(tn)return tn[e](...arguments)}}),nn.DismissReason=u,nn.version="11.2.1";const on=nn;return on.default=on,on}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2),(function (A) {
        "use strict";
        var g = {
            settings: { cover_height: "auto", admin_bar: { height: 0, position: "" } },
            pushes: { url: [], up: 0, down: 0 },
            init: function () {
                this.sidebar(),
                    this.cover_slider(),
                    this.reverse_menu(),
                    this.browser_check(),
                    this.push_state_for_loading(),
                    this.load_more(),
                    this.infinite_scroll(),
                    this.accordion_widget(),
                    this.single_sticky_bottom(),
                    this.responsive_videos(),
                    this.scroll_to_top(),
                    this.scroll_down(),
                    this.read_later(),
                    this.scroll_to_comments(),
                    this.logo_setup(),
                    this.admin_bar_check(),
                    this.cover_height(),
                    this.gallery_slider(A(".section-content")),
                    this.gallery_popup(A(".section-content")),
                    this.sticky_header(),
                    this.center_layout_items(),
                    this.responsive_navigation(),
                    this.video_fallback_image(),
                    this.align_full_fix(),
                    this.search_action_hover();
            },
            resize: function () {
                this.admin_bar_check(), this.responsive_navigation(), this.align_full_fix(), 500 < A(window).width() && this.cover_height();
            },
            admin_bar_check: function () {
                var t;
                A("#wpadminbar").length &&
                    A("#wpadminbar").is(":visible") &&
                    ((this.settings.admin_bar.height = A("#wpadminbar").height()),
                    (this.settings.admin_bar.position = A("#wpadminbar").css("position")),
                    A(".typology-header").length && ((t = "relative" != this.settings.admin_bar.position ? this.settings.admin_bar.height : 0), A(".typology-header").css("top", t)));
            },
            cover_height: function () {
                var t, e, i, s, o;
                A(".typology-cover-empty").length ||
                    ((t = A(window).height() - this.settings.admin_bar.height + Math.abs(parseInt(A(".typology-section:first").css("top"), 10))),
                    (e = A(".cover-item-container").height()),
                    (i = A(".typology-scroll-down-arrow")),
                    (o = !0),
                    t < 450 && (t = 450),
                    t - (s = A("#typology-header").height()) < e && ((t = e + s + 100), (o = !1)),
                    A(window).width() <= 1366
                        ? ((this.settings.cover_height = t),
                          A(".typology-cover-item, .typology-cover-img").css("height", t),
                          A(".typology-cover-slider").length && A(".typology-cover-slider .owl-stage-outer").css("height", t),
                          A(".typology-cover").css("height", t),
                          i.length && A(".typology-cover-slider .owl-dots").hide())
                        : (A(".typology-cover-item").css("height", A(".typology-cover").height()), A(".typology-cover").css("height", A(".typology-cover").height()), (this.settings.cover_height = A(".typology-cover").height())),
                    o && (A(".typology-cover-slider").length ? A(".typology-slider-wrapper-fixed").css("position", "fixed") : A(".typology-cover-item").css("position", "fixed")));
            },
            cover_slider: function () {
                A(".typology-cover-slider").owlCarousel({
                    rtl: !!typology_js_settings.rtl_mode,
                    loop: !0,
                    autoHeight: !0,
                    autoWidth: !1,
                    items: 1,
                    margin: 0,
                    nav: !0,
                    dots: !(0 < typology_js_settings.scroll_down_arrow),
                    center: !1,
                    fluidSpeed: 100,
                    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                    autoplay: 0 < typology_js_settings.slider_autoplay,
                    autoplayTimeout: typology_js_settings.slider_autoplay,
                    autoplaySpeed: 400,
                    navSpeed: 400,
                    responsive: { 0: { autoHeight: !1 }, 1e3: { autoHeight: !0 } },
                });
            },
            gallery_slider: function (t) {
                typology_js_settings.use_gallery &&
                    A("body").imagesLoaded(function () {
                        t.find(".gallery-columns-1, .wp-block-gallery.columns-1")
                            .addClass("owl-carousel")
                            .owlCarousel({
                                rtl: !!typology_js_settings.rtl_mode,
                                loop: !0,
                                nav: !0,
                                autoWidth: !1,
                                autoHeight: !0,
                                center: !1,
                                fluidSpeed: 100,
                                margin: 0,
                                items: 1,
                                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                            });
                    });
            },
            gallery_popup: function (t) {
                typology_js_settings.use_gallery &&
                    t.find(".gallery, .wp-block-gallery").each(function () {
                        var i = A(this),
                            t = i.hasClass("wp-block-gallery") ? ".blocks-gallery-item a" : ".gallery-icon a.typology-popup";
                        A(this)
                            .find(t)
                            .magnificPopup({
                                type: "image",
                                gallery: { enabled: !0 },
                                image: {
                                    titleSrc: function (t) {
                                        var e = i.hasClass("wp-block-gallery") ? t.el.closest("figure").find("figcaption") : t.el.closest(".gallery-item").find(".gallery-caption");
                                        return "undefined" != e ? e.text() : "";
                                    },
                                },
                            });
                    });
            },
            sidebar: function () {
                var e = "typology-sidebar-open typology-lock";
                A("body").on("click", ".typology-action-sidebar", function () {
                    A("body").addClass(e), A(".typology-sidebar").css("top", g.settings.admin_bar.height);
                }),
                    A("body").on("click", ".typology-sidebar-close, .typology-sidebar-overlay", function () {
                        A("body").removeClass(e);
                    }),
                    A(document).keyup(function (t) {
                        27 == t.keyCode && A("body").hasClass(e) && A("body").removeClass(e);
                    });
            },
            reverse_menu: function () {
                A(".typology-header").on("mouseenter", ".typology-nav li", function (t) {
                    A(this).find("ul").length && A(window).width() - (A(this).find("ul").offset().left + A(this).find("ul").outerWidth()) < 0 && A(this).find("ul").addClass("typology-rev");
                });
            },
            logo_setup: function () {
                1 < window.devicePixelRatio &&
                    typology_js_settings.logo_retina &&
                    A(".typology-logo").length &&
                    A(".typology-logo").imagesLoaded(function () {
                        A(".typology-logo").each(function () {
                            var t;
                            A(this).is(":visible") &&
                                ((t = A(this).width()),
                                A(this)
                                    .attr("src", typology_js_settings.logo_retina)
                                    .css("width", t + "px"));
                        });
                    });
            },
            sticky_header: function () {
                var t = A(".typology-section");
                if (!t.length) return !1;
                var s = "fixed" == this.settings.admin_bar.position ? this.settings.admin_bar.height : 0,
                    o = t.first().offset().top - s + Math.abs(parseInt(t.first().css("top"))) + 400,
                    n = o - 400 - Math.abs(parseInt(t.first().css("top"))) - A(".typology-header").height() / 2,
                    r = A(".typology-cover-empty").length ? 0 : o - 400,
                    a = A(".cover-item-container"),
                    l = A(".typology-scroll-down-arrow"),
                    c = A(".typology-header"),
                    h = 0,
                    p = "down",
                    d = !1,
                    u = !0;
                50 < A(window).scrollTop() && u && (c.css("z-index", 1e3), (u = !1)),
                    A(window).scroll(function () {
                        var t = "relative" != g.settings.admin_bar.position ? g.settings.admin_bar.height : 0;
                        typology_js_settings.header_sticky &&
                            (A(window).scrollTop() < o
                                ? d &&
                                  (c.animate({ top: -70 + s }, 200, function () {
                                      A(this).removeClass("typology-header-sticky"), A(this).css("top", t), A(this).css("z-index", 1e3);
                                  }),
                                  (d = !1))
                                : d ||
                                  (c
                                      .css("top", -70 + s)
                                      .addClass("typology-header-sticky")
                                      .animate({ top: s }, 200),
                                  c.css("z-index", 9001),
                                  (d = !0))),
                            A(window).scrollTop() < n ? u || (c.css("z-index", 9001), (u = !0)) : u && (c.css("z-index", 1e3), (u = !1));
                        var e,
                            i = 0;
                        A(window).scrollTop() < r &&
                            ((e = (100 - (100 * A(window).scrollTop()) / r) / 100),
                            "down" === p ? (i = e - 0.8) : A(window).scrollTop() < 150 && (i = 0.002 + e),
                            a.css("opacity", e),
                            l.css("opacity", i),
                            (p = h < i ? "up" : "down"),
                            (h = i));
                    }),
                    (A.fn.scrollEnd = function (e, i) {
                        A(this).scroll(function () {
                            var t = A(this);
                            t.data("scrollTimeout") && clearTimeout(t.data("scrollTimeout")), t.data("scrollTimeout", setTimeout(e, i));
                        });
                    }),
                    A(window).scrollEnd(function () {
                        A(window).scrollTop() < n ? (c.css("z-index", 9001), (u = !0)) : u && (c.css("z-index", 1e3), (u = !1));
                    }, 1e3);
            },
            accordion_widget: function () {
                A(".typology-responsive-menu .typology-nav").each(function () {
                    A(this).find(".menu-item-has-children > a").after('<span class="typology-nav-widget-acordion"><i class="fa fa-angle-down"></i></span>');
                }),
                    A("body").on("click", ".typology-responsive-menu .typology-nav-widget-acordion", function () {
                        A(this).next("ul.sub-menu:first, ul.children:first").slideToggle("fast").parent().toggleClass("active");
                    });
            },
            single_sticky_bottom: function () {
                var t, e, i;
                A("#typology-single-sticky").length &&
                    ((t = A(".typology-single-post").offset().top + 300),
                    (e = A(".typology-single-post").offset().top + A(".typology-single-post").height() - A(window).height()),
                    (i = A("#typology-footer").offset().top - A(window).height() - 100),
                    A(window).scroll(function () {
                        A(window).scrollTop() > t
                            ? A(".typology-sticky-content.meta").parent().addClass("typology-single-sticky-show typology-show-meta")
                            : A(".typology-sticky-content.meta").parent().removeClass("typology-single-sticky-show"),
                            A(window).scrollTop() > e
                                ? (console.log(A(window).scrollTop()),
                                  A(".typology-sticky-content.meta").parent().removeClass("typology-show-meta"),
                                  A(window).scrollTop() < i
                                      ? A(".typology-sticky-content.prev-next").parent().addClass("typology-show-prev-next")
                                      : A(".typology-sticky-content.meta").parent().removeClass("typology-single-sticky-show typology-show-meta"))
                                : A(".typology-sticky-content.prev-next").parent().removeClass("typology-show-prev-next");
                    }));
            },
            responsive_videos: function () {
                A(".entry-content").fitVids({
                    customSelector: [
                        "iframe[src*='youtube.com/embed']",
                        "iframe[src*='player.vimeo.com/video']",
                        "iframe[src*='kickstarter.com/projects']",
                        "iframe[src*='players.brightcove.net']",
                        "iframe[src*='hulu.com/embed']",
                        "iframe[src*='vine.co/v']",
                        "iframe[src*='videopress.com/embed']",
                        "iframe[src*='dailymotion.com/embed']",
                        "iframe[src*='vid.me/e']",
                        "iframe[src*='player.twitch.tv']",
                        "iframe[src*='facebook.com/plugins/video.php']",
                        "iframe[src*='gfycat.com/ifr/']",
                        "iframe[src*='liveleak.com/ll_embed']",
                        "iframe[src*='media.myspace.com']",
                        "iframe[src*='archive.org/embed']",
                        "iframe[src*='channel9.msdn.com']",
                        "iframe[src*='content.jwplatform.com']",
                        "iframe[src*='wistia.com']",
                        "iframe[src*='vooplayer.com']",
                        "iframe[src*='content.zetatv.com.uy']",
                        "iframe[src*='embed.wirewax.com']",
                        "iframe[src*='eventopedia.navstream.com']",
                        "iframe[src*='cdn.playwire.com']",
                        "iframe[src*='drive.google.com']",
                        "iframe[src*='videos.sproutvideo.com']",
                    ].join(","),
                    ignore: '[class^="wp-block"]',
                });
            },
            scroll_to_top: function () {
                A(".typology-sticky-to-top").length &&
                    A("body").on("click", ".typology-sticky-to-top", function (t) {
                        return t.preventDefault(), A("body,html").animate({ scrollTop: 0 }, 800), !1;
                    });
            },
            scroll_down: function () {
                var e = A(".typology-section");
                if (!e.length) return !1;
                A("body").on("click", ".typology-scroll-down-arrow", function (t) {
                    return t.preventDefault(), A("body,html").animate({ scrollTop: e.offset().top }, 800), !1;
                });
            },
            scroll_to_comments: function () {
                A("body").on("click", ".typology-single-post .meta-comments a, .typology-cover-single .meta-comments a, .typology-sticky-comments a", function (t) {
                    t.preventDefault();
                    var e = this.hash,
                        i = A(e);
                    A("html, body")
                        .stop()
                        .animate({ scrollTop: i.offset().top - 100 }, 800, "swing", function () {
                            window.location.hash = e;
                        });
                });
            },
            read_later: function () {
                A("body").on("click", ".typology-rl", function (t) {
                    t.preventDefault(), A(this).hasClass("pocket") && g.share_popup(A(this).attr("data-url"));
                });
            },
            center_layout_items: function () {
                A(".section-content-c .typology-posts .typology-layout-c").length % 2 != 0
                    ? A(".section-content-c").addClass("layout-even").removeClass("layout-odd")
                    : A(".section-content-c").addClass("layout-odd").removeClass("layout-even");
            },
            push_state_for_loading: function () {
                var t, e, i;
                (A(".typology-pagination .load-more a").length || A(".typology-pagination .infinite-scroll").length) &&
                    ((t = { prev: window.location.href, next: "", offset: A(window).scrollTop(), prev_title: window.document.title, next_title: window.document.title }),
                    g.pushes.url.push(t),
                    window.history.pushState(t, "", window.location.href),
                    (i = 0),
                    A(window).scroll(function () {
                        g.pushes.url[g.pushes.up].offset != e &&
                            A(window).scrollTop() < g.pushes.url[g.pushes.up].offset &&
                            ((e = g.pushes.url[g.pushes.up].offset),
                            (i = 0),
                            (window.document.title = g.pushes.url[g.pushes.up].prev_title),
                            window.history.replaceState(g.pushes.url, "", g.pushes.url[g.pushes.up].prev),
                            (g.pushes.down = g.pushes.up),
                            0 !== g.pushes.up && g.pushes.up--),
                            g.pushes.url[g.pushes.down].offset != i &&
                                A(window).scrollTop() > g.pushes.url[g.pushes.down].offset &&
                                ((i = g.pushes.url[g.pushes.down].offset),
                                (e = 0),
                                (window.document.title = g.pushes.url[g.pushes.down].next_title),
                                window.history.replaceState(g.pushes.url, "", g.pushes.url[g.pushes.down].next),
                                (g.pushes.up = g.pushes.down),
                                g.pushes.down < g.pushes.url.length - 1 && g.pushes.down++);
                    }));
            },
            load_more: function () {
                var l = 0;
                A("body").on("click", ".typology-pagination .load-more a", function (t) {
                    t.preventDefault();
                    var n = window.location.href,
                        r = window.document.title,
                        e = A(this),
                        a = e.attr("href");
                    e.parent().addClass("load-more-active"),
                        A("<div>").load(a, function () {
                            var t = l.toString(),
                                i = A(".typology-posts").last(),
                                s = A(this),
                                o = s
                                    .find(".typology-posts")
                                    .last()
                                    .children()
                                    .addClass("typology-new-" + t);
                            o.imagesLoaded(function () {
                                var t, e;
                                return (
                                    o.hide().appendTo(i).fadeIn(400),
                                    g.center_layout_items(),
                                    s.find(".typology-pagination").length ? A(".typology-pagination").html(s.find(".typology-pagination").html()) : A(".typology-pagination").fadeOut("fast").remove(),
                                    a != window.location &&
                                        (g.pushes.up++,
                                        g.pushes.down++,
                                        (t = s.find("title").text()),
                                        (e = { prev: n, next: a, offset: A(window).scrollTop(), prev_title: r, next_title: t }),
                                        g.pushes.url.push(e),
                                        (window.document.title = t),
                                        window.history.pushState(e, "", a)),
                                    l++,
                                    !1
                                );
                            });
                        });
                });
            },
            share_popup: function (t) {
                window.open(t, "Share", "height=500,width=760,top=" + (A(window).height() / 2 - 250) + ", left=" + (A(window).width() / 2 - 380) + "resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0");
            },
            infinite_scroll: function () {
                var l, c;
                A(".typology-pagination .infinite-scroll").length &&
                    ((l = !0),
                    (c = 0),
                    A(window).scroll(function () {
                        var n, r, t, a;
                        l &&
                            A(this).scrollTop() > A(".typology-pagination").offset().top - A(this).height() - 200 &&
                            ((l = !1),
                            (n = window.location.href),
                            (r = window.document.title),
                            (t = A(".typology-pagination .infinite-scroll a")),
                            (a = t.attr("href")),
                            t.parent().addClass("load-more-active"),
                            void 0 !== a &&
                                A("<div>").load(a, function () {
                                    var t = c.toString(),
                                        i = A(".typology-posts").last(),
                                        s = A(this),
                                        o = s
                                            .find(".typology-posts")
                                            .last()
                                            .children()
                                            .addClass("typology-new-" + t);
                                    o.imagesLoaded(function () {
                                        var t, e;
                                        return (
                                            o.hide().appendTo(i).fadeIn(400),
                                            g.center_layout_items(),
                                            s.find(".typology-pagination").length ? (A(".typology-pagination").html(s.find(".typology-pagination").html()), (l = !0)) : A(".typology-pagination").fadeOut("fast").remove(),
                                            a != window.location &&
                                                (g.pushes.up++,
                                                g.pushes.down++,
                                                (t = s.find("title").text()),
                                                (e = { prev: n, next: a, offset: A(window).scrollTop(), prev_title: r, next_title: t }),
                                                g.pushes.url.push(e),
                                                (window.document.title = t),
                                                window.history.pushState(e, "", a)),
                                            c++,
                                            !1
                                        );
                                    });
                                }));
                    }));
            },
            responsive_navigation: function () {
                A("#typology-header .typology-main-navigation").length &&
                    480 < A(window).width() &&
                    (A("#typology-header .container:first").width() - 50 <
                    (A("#typology-header .typology-site-branding").length ? A("#typology-header .typology-site-branding").width() : 0) +
                        A("#typology-header .typology-main-navigation").width() +
                        A("#typology-header .typology-actions-list").width()
                        ? (A("#typology-header .typology-main-navigation").css("opacity", 0).css("position", "absolute"),
                          A(".typology-responsive-menu").show(),
                          A(".typology-action-sidebar.typology-mobile-visible").css({ display: "inline-block" }))
                        : (A("#typology-header .typology-main-navigation").css("opacity", 1).css("position", "relative"),
                          A(".typology-responsive-menu").hide(),
                          A(".typology-action-sidebar.typology-mobile-visible").css({ display: "none" })));
            },
            is_autoplay_supported: function (t) {
                if ("function" != typeof t) return console.log("is_autoplay_supported: Callback must be a function!"), !1;
                var e;
                sessionStorage.autoplay_supported
                    ? "true" === sessionStorage.autoplay_supported
                        ? t(!0)
                        : t(!1)
                    : (((e = document.createElement("video")).autoplay = !0),
                      (e.src =
                          "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAAAAG1wNDJtcDQxaXNvbWF2YzEAAATKbW9vdgAAAGxtdmhkAAAAANLEP5XSxD+VAAB1MAAAdU4AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAACFpb2RzAAAAABCAgIAQAE////9//w6AgIAEAAAAAQAABDV0cmFrAAAAXHRraGQAAAAH0sQ/ldLEP5UAAAABAAAAAAAAdU4AAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAoAAAAFoAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAHVOAAAH0gABAAAAAAOtbWRpYQAAACBtZGhkAAAAANLEP5XSxD+VAAB1MAAAdU5VxAAAAAAANmhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABMLVNNQVNIIFZpZGVvIEhhbmRsZXIAAAADT21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAw9zdGJsAAAAwXN0c2QAAAAAAAAAAQAAALFhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAoABaABIAAAASAAAAAAAAAABCkFWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAOGF2Y0MBZAAf/+EAHGdkAB+s2UCgL/lwFqCgoKgAAB9IAAdTAHjBjLABAAVo6+yyLP34+AAAAAATY29scm5jbHgABQAFAAUAAAAAEHBhc3AAAAABAAAAAQAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAAQBjdHRzAAAAAAAAAB4AAAABAAAH0gAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAE40AAAABAAAH0gAAAAEAAAAAAAAAAQAAA+kAAAABAAATjQAAAAEAAAfSAAAAAQAAAAAAAAABAAAD6QAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAE40AAAABAAAH0gAAAAEAAAAAAAAAAQAAA+kAAAABAAATjQAAAAEAAAfSAAAAAQAAAAAAAAABAAAD6QAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAB9IAAAAUc3RzcwAAAAAAAAABAAAAAQAAACpzZHRwAAAAAKaWlpqalpaampaWmpqWlpqalpaampaWmpqWlpqalgAAABxzdHNjAAAAAAAAAAEAAAABAAAAHgAAAAEAAACMc3RzegAAAAAAAAAAAAAAHgAAA5YAAAAVAAAAEwAAABMAAAATAAAAGwAAABUAAAATAAAAEwAAABsAAAAVAAAAEwAAABMAAAAbAAAAFQAAABMAAAATAAAAGwAAABUAAAATAAAAEwAAABsAAAAVAAAAEwAAABMAAAAbAAAAFQAAABMAAAATAAAAGwAAABRzdGNvAAAAAAAAAAEAAAT6AAAAGHNncGQBAAAAcm9sbAAAAAIAAAAAAAAAHHNiZ3AAAAAAcm9sbAAAAAEAAAAeAAAAAAAAAAhmcmVlAAAGC21kYXQAAAMfBgX///8b3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMTEgNzU5OTIxMCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTUgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xMSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgc3RpdGNoYWJsZT0xIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PWluZmluaXRlIGtleWludF9taW49Mjkgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz0ycGFzcyBtYnRyZWU9MSBiaXRyYXRlPTExMiByYXRldG9sPTEuMCBxY29tcD0wLjYwIHFwbWluPTUgcXBtYXg9NjkgcXBzdGVwPTQgY3BseGJsdXI9MjAuMCBxYmx1cj0wLjUgdmJ2X21heHJhdGU9ODI1IHZidl9idWZzaXplPTkwMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAG9liIQAFf/+963fgU3DKzVrulc4tMurlDQ9UfaUpni2SAAAAwAAAwAAD/DNvp9RFdeXpgAAAwB+ABHAWYLWHUFwGoHeKCOoUwgBAAADAAADAAADAAADAAAHgvugkks0lyOD2SZ76WaUEkznLgAAFFEAAAARQZokbEFf/rUqgAAAAwAAHVAAAAAPQZ5CeIK/AAADAAADAA6ZAAAADwGeYXRBXwAAAwAAAwAOmAAAAA8BnmNqQV8AAAMAAAMADpkAAAAXQZpoSahBaJlMCCv//rUqgAAAAwAAHVEAAAARQZ6GRREsFf8AAAMAAAMADpkAAAAPAZ6ldEFfAAADAAADAA6ZAAAADwGep2pBXwAAAwAAAwAOmAAAABdBmqxJqEFsmUwIK//+tSqAAAADAAAdUAAAABFBnspFFSwV/wAAAwAAAwAOmQAAAA8Bnul0QV8AAAMAAAMADpgAAAAPAZ7rakFfAAADAAADAA6YAAAAF0Ga8EmoQWyZTAgr//61KoAAAAMAAB1RAAAAEUGfDkUVLBX/AAADAAADAA6ZAAAADwGfLXRBXwAAAwAAAwAOmQAAAA8Bny9qQV8AAAMAAAMADpgAAAAXQZs0SahBbJlMCCv//rUqgAAAAwAAHVAAAAARQZ9SRRUsFf8AAAMAAAMADpkAAAAPAZ9xdEFfAAADAAADAA6YAAAADwGfc2pBXwAAAwAAAwAOmAAAABdBm3hJqEFsmUwIK//+tSqAAAADAAAdUQAAABFBn5ZFFSwV/wAAAwAAAwAOmAAAAA8Bn7V0QV8AAAMAAAMADpkAAAAPAZ+3akFfAAADAAADAA6ZAAAAF0GbvEmoQWyZTAgr//61KoAAAAMAAB1QAAAAEUGf2kUVLBX/AAADAAADAA6ZAAAADwGf+XRBXwAAAwAAAwAOmAAAAA8Bn/tqQV8AAAMAAAMADpkAAAAXQZv9SahBbJlMCCv//rUqgAAAAwAAHVE="),
                      e.load(),
                      (e.style.display = "none"),
                      (e.playing = !1),
                      e.play(),
                      (e.onplay = function () {
                          this.playing = !0;
                      }),
                      (e.oncanplay = function () {
                          e.playing ? ((sessionStorage.autoplay_supported = "true"), t(!0)) : ((sessionStorage.autoplay_supported = "false"), t(!1));
                      }));
            },
            video_fallback_image: function () {
                typology_js_settings.cover_video_image_fallback &&
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
                    this.is_autoplay_supported(function (t) {
                        t || (A(".typology-cover-img video").css("display", "none"), A(".typology-cover-img .typology-fallback-video-img").css("display", "block"));
                    });
            },
            browser_check: function () {
                -1 !== navigator.appVersion.indexOf("MSIE 9.") && A("body").addClass("typology-ie9");
            },
            align_full_fix: function () {
                var t = "";
                A("body").hasClass("typology-flat")
                    ? ((t = ".alignfull { width: " + A(window).width() + "px; margin-left: -" + A(window).width() / 2 + "px; margin-right: -" + A(window).width() / 2 + "px; left:50%; right:50%;position: relative;max-width: initial; }"),
                      A("#typology-align-fix").length ? A("#typology-align-fix").html(t) : A("head").append('<style id="typology-align-fix" type="text/css">' + t + "</style>"))
                    : ((t = ".alignfull { max-width: " + A(".typology-section").outerWidth() + "px; width: 100vw; left:-" + (A(".typology-section").outerWidth() - A(".entry-content").outerWidth()) / 2 + "px; }"),
                      A("#typology-full-fix").length ? A("#typology-full-fix").html(t) : A("head").append('<style id="typology-full-fix" type="text/css">' + t + "</style>"));
            },
            search_action_hover: function (t) {
                A("body").on("click", ".typology-header .typology-search-form input[type=text]", function () {
                    A(".typology-header .typology-action-search").addClass("search-action-active");
                });
                A("body").mouseup(function () {
                    A(".typology-header .typology-action-search").removeClass("search-action-active");
                });
            },
        };
        A(document).ready(function () {
            g.init();
        }),
            A(window).resize(function () {
                g.resize();
            });

    A(document).on("change", "form.new-order [name]", function () {
      var key = jQuery(this).attr("name");
      var val = jQuery(this).val();
      localStorage.setItem(key, val);
    });

    A(".add_episode").on('click', function (e) {
        e.preventDefault();
        var cln = jQuery("section.section_episode").eq(0).clone().find("[name]:not([type=radio]):not([type=checkbox])").val("").end();
        cln.find("[name]").prop("checked", false).end();
        cln.find(".yes,.no").hide();
        cln.find('.after_checked').show();
        cln.find("[name]").each(function () {
          jQuery(this).attr(
            "name",
            jQuery(this).attr("name") +
              "_episode_" +
              (jQuery("section.section_episode").length + 1)
          );
        });
        cln.addClass('new_episode')
        cln.prepend('<h2>Эпизод '+(jQuery("section.section_episode").length + 1) +'</h2>')
        jQuery(this).before(cln);
        if (jQuery("[name][required]:not(:visible)").length > 0) {
          jQuery("[name][required]:not(:visible)").addClass("was_required");
          jQuery("[name][required]:not(:visible)").removeAttr("required");
        }
        cln.find('.yes,.hide').hide();
    });

    A(document).on(
      "change",
      '[name^="visited_police"],[name^="visited_medical"]',
        function () {
            if(jQuery(this).val() == "Нет") {
                var visited_police = jQuery(this)
                  .parents(".section_episode")
                  .find('[name^="visited_police"]:checked').val();
                var visited_medical = jQuery(this)
                  .parents(".section_episode")
                    .find('[name^="visited_medical"]:checked').val();
                if (visited_police == "Нет" && visited_medical == "Нет") {
                    jQuery(this).parents('.section_episode').find('.after_checked').hide();
                    if (jQuery(this).parents('.section_episode').find('[name="visited_police_episode_3"]').length) {
                        if (
                            jQuery(
                                '[name="visited_medical"]:checked'
                            ).val() == "Нет" &&
                            jQuery(
                                '[name="visited_police"]:checked'
                            ).val() == "Нет" &&
                            jQuery(
                                '[name="visited_medical_episode_2"]:checked'
                            ).val() == "Нет" &&
                            jQuery(
                                '[name="visited_police_episode_2"]:checked'
                            ).val() == "Нет" &&
                            jQuery(
                                '[name="visited_medical_episode_3"]:checked'
                            ).val() == "Нет" &&
                            jQuery(
                                '[name="visited_police_episode_3"]:checked'
                            ).val() == "Нет"
                        ) {
                            Swal.fire({
                                title:
                                    "Остались ли у вас видимые телесные повреждения от любого из инцидентов?",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Да",
                                cancelButtonText: "Нет",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire(
                                        "Пожалуйста, обратитесь в медицинское учреждение ИЛИ полицию",
                                        "",
                                        "warning"
                                    );
                                } else {
                                    Swal.fire(
                                      "К сожалению, по данным эпизодам вы уже не можете обратиться в Европейский Суд",
                                      "",
                                      "error"
                                    );
                                }
                            });
                        }
                    }
                }
            }
      }
    );

    A(document).on('change', '[type=file]', function (e) {
        jQuery('label[for=' + jQuery(this).attr('id') + ']').html('Файл загружен.');
    })

    A(document).on("blur", '[name="date_of_incident"]', function () {
      var now = new Date();
      var MonthBeforeNow = new Date(now).setMonth(now.getMonth() - 4);
      var mydate = new Date(jQuery(this).val());
      if (new Date(mydate).getTime() < MonthBeforeNow) {
        Swal.fire({
          title: "Продолжить заполнение формы?",
          text: "К сожалению, в Европейский Суд можно обратиться только в течение 6 месяцев с даты последнего эпизода",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Да",
          cancelButtonText: "Нет",
        });
      } else {
        var mindate = jQuery(this).val();
        jQuery(this)
          .parents(".section_episode")
          .find(
            "[type=date][name^=date_hospital_visit],[type=date][name^=date_police_visit]"
          )
          .each(function (i, el) {
            jQuery(this).attr("min", mindate);
          });
      }
    });

    if (A('form.new-order').length > 0) {
        if (localStorage.getItem('lastname') != null) {
            let Confirm = confirm('Восстановить сохранённые данные?');
            if (Confirm) {
                Object.keys(localStorage).forEach(function (key) {
                    if (jQuery("form.new-order [name='" + key + "']".length > 0)) {
                        jQuery("form.new-order [name='" + key + "']").val(
                            localStorage.getItem(key)
                        );
                        localStorage.removeItem(key);
                    }
                });
            }
        }
    }

    jQuery(document).on("change", "#police_decision_on_application", function (e) {
        e.preventDefault();
        if (jQuery(this).val() != "полиция не ответила") {
          jQuery(this).next().show();
          jQuery(this).next().removeClass("d-none");
        } else {
          jQuery(this).next().hide();
          jQuery(this).next().addClass("d-none");
        }
        return false;
    });

    jQuery(document).on("change", 'input[type="radio"]', function () {

      
    if(jQuery(this).parents(".section_episode").hasClass("new_episode")) {
        jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div .only_after_ones_episode").css('display', '');
    }

      if (jQuery(this).val() == "Да") {
        jQuery(this).parents(".form-group").eq(0).find(">div.no").hide();
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.no [name]:not([type=checkbox])")
          .val("");
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.no [name][type=checkbox]")
          .prop("checked", false);
        if (
          jQuery(this).parents(".form-group").eq(0).find(">div.another").length
        ) {
          jQuery(this).parents(".form-group").eq(0).find(">div.another").hide();
          jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div.another [name]:not([type=checkbox])")
            .val("");
          jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div.another [name][type=checkbox]")
            .prop("checked", false);
        }
        if (jQuery(this).parents(".form-group").eq(0).find(">div.yes").length) {
          jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div.yes")
            .slideDown();
        }
      } else if (jQuery(this).val() == "Нет") {
        jQuery(this).parents(".form-group").eq(0).find(">div.yes").hide();
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.yes [name]:not([type=checkbox])")
          .val("");
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.yes [name][type=checkbox]")
          .prop("checked", false);
        if (
          jQuery(this).parents(".form-group").eq(0).find(">div.another").length
        ) {
          jQuery(this).parents(".form-group").eq(0).find(">div.another").hide();
          jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div.another [name]:not([type=checkbox])")
            .val("");
          jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div.another [name][type=checkbox]")
            .prop("checked", false);
        }
        if (jQuery(this).parents(".form-group").eq(0).find(">div.no").length) {
          jQuery(this).parents(".form-group").eq(0).find(">div.no").slideDown();
        }
      }else if (jQuery(this).val() == "Иное") {
        jQuery(this).parents(".form-group").eq(0).find(">div.no").hide();
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.no [name]:not([type=checkbox])")
          .val("");
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.no [name][type=checkbox]")
          .prop("checked", false);
        jQuery(this).parents(".form-group").eq(0).find(">div.yes").hide();
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.yes [name]:not([type=checkbox])")
          .val("");
        jQuery(this)
          .parents(".form-group")
          .eq(0)
          .find(">div.yes [name][type=checkbox]")
          .prop("checked", false);
        if (
          jQuery(this).parents(".form-group").eq(0).find(">div.another").length
        ) {
          jQuery(this)
            .parents(".form-group")
            .eq(0)
            .find(">div.another")
            .slideDown();
        }
      } else {
          jQuery(this).parents(".form-group").eq(0).find(">div.no").hide();
          jQuery(this).parents(".form-group").eq(0).find(">div.yes").hide();
          if (jQuery(this).parents(".form-group").eq(0).find(">div.another").length) {
            jQuery(this).parents(".form-group").eq(0).find(">div.another").hide();
          }
      }
      jQuery("[name][required]:not(:visible)").addClass("was_required");
      jQuery("[name][required]:not(:visible)").removeAttr("required");
      jQuery(this)
        .parents(".form-group")
        .eq(0)
        .find(".was_required:visible")
        .attr("required", "required");
    });

    A(".order a.take_on_work").on("click", function (e) {
      e.preventDefault();

      let Confirm = confirm(
        "Подтвердите, что хотите взять заявку " +
          jQuery(this).prev().text() +
          " в работу"
      );
      if (Confirm) {
        jQuery.ajax({
          type: "POST",
          url: wp_data.ajax_url,
          data: {
            action: "order_link",
            post_id: jQuery(this).parent().attr("post_id"),
            user_id: wp_data.user_id,
          },
          success: function (response) {
            location.href = response;
          },
        });
      }

      return false;
    });
    
    })(jQuery);
