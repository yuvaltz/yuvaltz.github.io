/**
 * @version 0.2.1.0
 * @copyright Copyright ☺ 2016
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("Granular.Host", function ($asm, globals) {
    "use strict";

    Bridge.define("Granular.Host.ElementExtensions");

    Bridge.define("Granular.Host.HtmlDefinition", {
        statics: {
            tags: null,
            config: {
                init: function () {
                    this.tags = System.Array.init(["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"], String);
                }
            }
        }
    });

    Bridge.define("Granular.Host.HtmlStyleDictionary", {
        isValid: false,
        element: null,
        properties: null,
        setProperties: null,
        clearProperties: null,
        config: {
            events: {
                Invalidated: null
            }
        },
        ctor: function (element) {
            this.$initialize();
            this.element = element;

            this.properties = {  };
            this.setProperties = {  };
            this.clearProperties = {  };

            this.setIsValid(true);
        },
        getIsValid: function () {
            return this.isValid;
        },
        setIsValid: function (value) {
            if (this.isValid === value) {
                return;
            }

            this.isValid = value;

            if (!this.isValid) {
                Granular.Extensions.EventHandlerExtensions.raise$2(this.Invalidated, this);
            }
        },
        setValue: function (key, value) {
            if (Bridge.referenceEquals(Bridge.cast(this.properties[key], String), value)) {
                return;
            }

            this.properties[key] = value;
            this.setProperties[key] = value;
            delete this.clearProperties[key];

            this.setIsValid(false);
        },
        clearValue: function (key) {
            if ((this.properties[key] === undefined)) {
                return;
            }

            delete this.properties[key];
            delete this.setProperties[key];
            this.clearProperties[key] = null;

            this.setIsValid(false);
        },
        apply: function () {
            var $t, $t1;
            if (this.getIsValid()) {
                return;
            }

            $t = Bridge.getEnumerator(Object.keys(this.setProperties));
            while ($t.moveNext()) {
                var key = $t.getCurrent();
                this.element.style.setProperty(key, Bridge.cast(this.setProperties[key], String));
            }

            $t1 = Bridge.getEnumerator(Object.keys(this.clearProperties));
            while ($t1.moveNext()) {
                var key1 = $t1.getCurrent();
                this.element.style.removeProperty(key1);
            }

            this.setProperties = {  };
            this.clearProperties = {  };

            this.setIsValid(true);
        }
    });

    Bridge.define("Granular.Host.HtmlStyleDictionaryExtensions", {
        statics: {
            setBackground: function (style, background, targetRect, converter) {
                style.clearValue("background-color");
                style.clearValue("background-image");

                if (Bridge.is(background, System.Windows.Media.SolidColorBrush)) {
                    style.setValue("background-color", converter.Granular$Host$IHtmlValueConverter$toColorString$1(Bridge.cast(background, System.Windows.Media.SolidColorBrush)));
                } else if (background != null) {
                    style.setValue("background-image", Granular.Host.HtmlValueConverterExtensions.toImageString(converter, background, targetRect));
                }
            },
            setBackgroundLocation: function (style, location, converter) {
                if (System.Windows.Point.isNullOrEmpty(location)) {
                    style.clearValue("background-position");
                } else {
                    style.setValue("background-position", converter.Granular$Host$IHtmlValueConverter$toPixelString$1(location));
                }
            },
            setBackgroundSize: function (style, size, converter) {
                if (System.Windows.Size.isNullOrEmpty(size)) {
                    style.clearValue("background-size");
                } else {
                    style.setValue("background-size", converter.Granular$Host$IHtmlValueConverter$toPixelString$2(size));
                }
            },
            setBackgroundBounds: function (style, bounds, converter) {
                Granular.Host.HtmlStyleDictionaryExtensions.setBackgroundLocation(style, bounds.getLocation(), converter);
                Granular.Host.HtmlStyleDictionaryExtensions.setBackgroundSize(style, bounds.getSize(), converter);
            },
            setBorderThickness: function (style, borderThickness, converter) {
                if (System.Windows.Thickness.op_Equality(borderThickness, System.Windows.Thickness.zero)) {
                    style.clearValue("border-style");
                    style.clearValue("border-width");
                    style.clearValue("border-image-slice");
                } else {
                    style.setValue("border-style", "solid");
                    style.setValue("border-width", converter.Granular$Host$IHtmlValueConverter$toPixelString$3(borderThickness));
                    style.setValue("border-image-slice", converter.Granular$Host$IHtmlValueConverter$toImplicitValueString$2(borderThickness));
                }
            },
            setBorderBrush: function (style, borderBrush, targetSize, converter) {
                style.clearValue("border-color");
                style.clearValue("border-image-source");

                if (Bridge.is(borderBrush, System.Windows.Media.SolidColorBrush)) {
                    style.setValue("border-color", converter.Granular$Host$IHtmlValueConverter$toColorString$1(Bridge.cast(borderBrush, System.Windows.Media.SolidColorBrush)));
                } else if (borderBrush != null) {
                    style.setValue("border-image-source", Granular.Host.HtmlValueConverterExtensions.toImageString(converter, borderBrush, new System.Windows.Rect.$ctor3(targetSize)));
                }
            },
            setBounds: function (style, bounds, converter) {
                Granular.Host.HtmlStyleDictionaryExtensions.setLocation(style, bounds.getLocation(), converter);
                Granular.Host.HtmlStyleDictionaryExtensions.setSize(style, bounds.getSize(), converter);
            },
            setLocation: function (style, location, converter) {
                style.setValue("position", "absolute");
                style.setValue("left", converter.Granular$Host$IHtmlValueConverter$toPixelString(location.getX()));
                style.setValue("top", converter.Granular$Host$IHtmlValueConverter$toPixelString(location.getY()));
            },
            setSize: function (style, size, converter) {
                if (Granular.Extensions.DoubleExtensions.isNaN(size.getWidth())) {
                    style.clearValue("width");
                } else {
                    style.setValue("width", converter.Granular$Host$IHtmlValueConverter$toPixelString(size.getWidth()));
                }

                if (Granular.Extensions.DoubleExtensions.isNaN(size.getHeight())) {
                    style.clearValue("height");
                } else {
                    style.setValue("height", converter.Granular$Host$IHtmlValueConverter$toPixelString(size.getHeight()));
                }
            },
            setClipToBounds: function (style, clipToBounds) {
                style.setValue("overflow", clipToBounds ? "hidden" : "visible");
            },
            setIsHitTestVisible: function (style, isHitTestVisible) {
                style.setValue("pointer-events", isHitTestVisible ? "auto" : "none");
            },
            setIsVisible: function (style, isVisible) {
                if (isVisible) {
                    style.clearValue("display");
                } else {
                    style.setValue("display", "none");
                }
            },
            setCornerRadius: function (style, cornerRadius, converter) {
                style.clearValue("border-radius");
                style.clearValue("border-top-left-radius");
                style.clearValue("border-top-right-radius");
                style.clearValue("border-bottom-left-radius");
                style.clearValue("border-bottom-right-radius");

                if (System.Windows.CornerRadius.op_Inequality(cornerRadius, System.Windows.CornerRadius.zero)) {
                    if (cornerRadius.getIsUniform()) {
                        style.setValue("border-radius", converter.Granular$Host$IHtmlValueConverter$toPixelString(cornerRadius.getTopLeft()));
                    } else {
                        style.setValue("border-top-left-radius", converter.Granular$Host$IHtmlValueConverter$toPixelString(cornerRadius.getTopLeft()));
                        style.setValue("border-top-right-radius", converter.Granular$Host$IHtmlValueConverter$toPixelString(cornerRadius.getTopRight()));
                        style.setValue("border-bottom-left-radius", converter.Granular$Host$IHtmlValueConverter$toPixelString(cornerRadius.getBottomLeft()));
                        style.setValue("border-bottom-right-radius", converter.Granular$Host$IHtmlValueConverter$toPixelString(cornerRadius.getBottomRight()));
                    }
                }
            },
            setForeground: function (style, foreground, converter) {
                if (foreground == null) {
                    style.clearValue("color");
                } else if (Bridge.is(foreground, System.Windows.Media.SolidColorBrush)) {
                    style.setValue("color", converter.Granular$Host$IHtmlValueConverter$toColorString$1(Bridge.cast(foreground, System.Windows.Media.SolidColorBrush)));
                } else {
                    throw new Granular.Exception("A \"{0}\" foreground brush is not supported", [Bridge.getType(foreground)]);
                }
            },
            setOpacity: function (style, opacity, converter) {
                if (opacity === 1.0) {
                    style.clearValue("opacity");
                } else {
                    style.setValue("opacity", converter.Granular$Host$IHtmlValueConverter$toImplicitValueString(opacity));
                }
            },
            setTransform: function (style, transform, converter) {
                if (System.Windows.Media.Matrix.op_Equality(transform, System.Windows.Media.Matrix.identity)) {
                    style.clearValue("transform");
                    style.clearValue("transform-origin");
                } else {
                    style.setValue("transform", converter.Granular$Host$IHtmlValueConverter$toTransformString(transform));
                    style.setValue("transform-origin", "0 0");
                }
            },
            setFontFamily: function (style, fontFamily, converter) {
                if (!System.Linq.Enumerable.from(fontFamily.getFamilyNames()).any()) {
                    style.clearValue("font-family");
                } else {
                    style.setValue("font-family", converter.Granular$Host$IHtmlValueConverter$toFontFamilyNamesString(fontFamily));
                }
            },
            setFontSize: function (style, fontSize, converter) {
                if (Granular.Extensions.DoubleExtensions.isNaN(fontSize)) {
                    style.clearValue("font-size");
                } else {
                    style.setValue("font-size", converter.Granular$Host$IHtmlValueConverter$toPixelString(fontSize));
                }
            },
            setFontStyle: function (style, fontStyle, converter) {
                if (fontStyle === System.Windows.FontStyle.Normal) {
                    style.clearValue("font-style");
                } else {
                    style.setValue("font-style", converter.Granular$Host$IHtmlValueConverter$toFontStyleString(fontStyle));
                }
            },
            setFontWeight: function (style, fontWeight, converter) {
                if (fontWeight === System.Windows.FontWeight.Normal) {
                    style.clearValue("font-weight");
                } else {
                    style.setValue("font-weight", converter.Granular$Host$IHtmlValueConverter$toFontWeightString(fontWeight));
                }
            },
            setFontStretch: function (style, fontStretch, converter) {
                if (fontStretch === System.Windows.FontStretch.Normal) {
                    style.clearValue("font-stretch");
                } else {
                    style.setValue("font-stretch", converter.Granular$Host$IHtmlValueConverter$toFontStretchString(fontStretch));
                }
            },
            setTextAlignment: function (style, textAlignment, converter) {
                style.setValue("text-align", converter.Granular$Host$IHtmlValueConverter$toTextAlignmentString(textAlignment));
            },
            setTextTrimming: function (style, textTrimming) {
                if (textTrimming === System.Windows.TextTrimming.None) {
                    style.clearValue("text-overflow");
                } else {
                    style.setValue("text-overflow", "ellipsis");
                }
            },
            setTextWrapping: function (style, textWrapping, converter) {
                style.setValue("white-space", converter.Granular$Host$IHtmlValueConverter$toWhiteSpaceString(textWrapping));
            },
            setHorizontalScrollBarVisibility: function (style, scrollBarVisibility, converter) {
                style.setValue("overflow-x", converter.Granular$Host$IHtmlValueConverter$toOverflowString(scrollBarVisibility));
            },
            setVerticalScrollBarVisibility: function (style, scrollBarVisibility, converter) {
                style.setValue("overflow-y", converter.Granular$Host$IHtmlValueConverter$toOverflowString(scrollBarVisibility));
            },
            setBackgroundImage: function (style, imageSource, converter) {
                if (imageSource == null) {
                    style.clearValue("background-image");
                } else {
                    style.setValue("background-image", converter.Granular$Host$IHtmlValueConverter$toUrlString(Bridge.cast(imageSource.getRenderImageSource(), Granular.Host.RenderImageSource).getUrl()));
                }
            }
        }
    });

    Bridge.define("Granular.Host.IHtmlValueConverter", {
        $kind: "interface"
    });

    Bridge.define("Granular.Host.HtmlValueConverterExtensions", {
        statics: {
            toImageString: function (converter, brush, targetRect) {
                if (Bridge.is(brush, System.Windows.Media.LinearGradientBrush)) {
                    return converter.Granular$Host$IHtmlValueConverter$toImageString$1(Bridge.cast(brush, System.Windows.Media.LinearGradientBrush), targetRect);
                }

                if (Bridge.is(brush, System.Windows.Media.RadialGradientBrush)) {
                    return converter.Granular$Host$IHtmlValueConverter$toImageString$2(Bridge.cast(brush, System.Windows.Media.RadialGradientBrush));
                }

                if (Bridge.is(brush, System.Windows.Media.ImageBrush)) {
                    return converter.Granular$Host$IHtmlValueConverter$toImageString(Bridge.cast(brush, System.Windows.Media.ImageBrush));
                }

                throw new Granular.Exception("Unexpected brush type \"{0}\"", [Bridge.getType(brush)]);
            }
        }
    });

    Bridge.define("Granular.Host.IRenderItem", {
        $kind: "interface"
    });

    Bridge.define("Granular.Host.IRenderQueue", {
        $kind: "interface"
    });

    Bridge.define("Granular.Host.PresentationSource", {
        inherits: [System.Windows.IPresentationSource],
        converter: null,
        window: null,
        mouseDownHandled: false,
        mouseMoveHandled: false,
        mouseUpHandled: false,
        keyDownHandled: false,
        keyUpHandled: false,
        config: {
            properties: {
                RootElement: null,
                MouseDevice: null,
                KeyboardDevice: null
            },
            alias: [
            "addHitTestInvalidated", "System$Windows$IPresentationSource$addHitTestInvalidated",
            "removeHitTestInvalidated", "System$Windows$IPresentationSource$removeHitTestInvalidated",
            "getRootElement", "System$Windows$IPresentationSource$getRootElement",
            "setRootElement", "System$Windows$IPresentationSource$setRootElement",
            "getMouseDevice", "System$Windows$IPresentationSource$getMouseDevice",
            "setMouseDevice", "System$Windows$IPresentationSource$setMouseDevice",
            "getKeyboardDevice", "System$Windows$IPresentationSource$getKeyboardDevice",
            "setKeyboardDevice", "System$Windows$IPresentationSource$setKeyboardDevice",
            "getTitle", "System$Windows$IPresentationSource$getTitle",
            "setTitle", "System$Windows$IPresentationSource$setTitle",
            "hitTest", "System$Windows$IPresentationSource$hitTest",
            "getTimestamp", "System$Windows$IPresentationSource$getTimestamp"
            ]
        },
        ctor: function (rootElement, converter) {
            this.$initialize();
            this.setRootElement(rootElement);
            this.converter = converter;

            this.getRootElement().setIsRootElement(true);

            this.setMouseDevice(new System.Windows.Input.MouseDevice(this));
            this.setKeyboardDevice(new System.Windows.Input.KeyboardDevice(this));

            this.window = window;

            this.getMouseDevice().addCursorChanged(Bridge.fn.bind(this, function (sender, e) {
                window.document.body.style.setProperty("cursor", converter.Granular$Host$IHtmlValueConverter$toCursorString(this.getMouseDevice().getCursor()));
            }));
            window.document.body.style.setProperty("cursor", converter.Granular$Host$IHtmlValueConverter$toCursorString(this.getMouseDevice().getCursor()));

            window.onkeydown = Bridge.fn.cacheBind(this, this.onKeyDown);
            window.onkeyup = Bridge.fn.cacheBind(this, this.onKeyUp);
            window.onkeypress = Bridge.fn.cacheBind(this, this.preventKeyboardHandled);
            window.onmousemove = Bridge.fn.cacheBind(this, this.onMouseMove);
            window.onmousedown = Bridge.fn.cacheBind(this, this.onMouseDown);
            window.onmouseup = Bridge.fn.cacheBind(this, this.onMouseUp);
            window.onscroll = Bridge.fn.cacheBind(this, this.onMouseWheel);
            window.onfocus = Bridge.fn.bind(this, $asm.$.Granular.Host.PresentationSource.f1);
            window.onblur = Bridge.fn.bind(this, $asm.$.Granular.Host.PresentationSource.f2);
            window.onresize = Bridge.fn.bind(this, $asm.$.Granular.Host.PresentationSource.f3);
            window.onclick = Bridge.fn.cacheBind(this, this.preventMouseHandled);
            window.oncontextmenu = Bridge.fn.cacheBind(this, this.preventMouseHandled);
            window.addEventListener("ondblclick", Bridge.fn.cacheBind(this, this.preventMouseHandled));
            window.addEventListener("wheel", Bridge.fn.cacheBind(this, this.onMouseWheel));

            this.setRootElementSize();
            Bridge.cast(this.getRootElement(), System.Windows.FrameworkElement).arrange(new System.Windows.Rect.ctor(this.window.innerWidth, this.window.innerHeight));

            window.document.body.style.overflow = "hidden";
            window.document.body.appendChild(Bridge.cast(this.getRootElement().getRenderElement(Granular.Host.Render.HtmlRenderElementFactory.default), Granular.Host.Render.HtmlRenderElement).getHtmlElement());

            this.getMouseDevice().activate();
            this.getKeyboardDevice().activate();
        },
        addHitTestInvalidated: function (value) {
        },
        removeHitTestInvalidated: function (value) {
        },
        getTitle: function () {
            return window.document.title;
        },
        setTitle: function (value) {
            window.document.title = value;
        },
        setRootElementSize: function () {
            Bridge.cast(this.getRootElement(), System.Windows.FrameworkElement).setWidth(this.window.innerWidth);
            Bridge.cast(this.getRootElement(), System.Windows.FrameworkElement).setHeight(this.window.innerHeight);
        },
        onKeyDown: function (e) {
            var keyboardEvent = Bridge.cast(e, KeyboardEvent);

            var key = this.converter.Granular$Host$IHtmlValueConverter$convertBackKey(keyboardEvent.keyCode, keyboardEvent.location);

            this.keyDownHandled = this.processKeyboardEvent(new System.Windows.Input.RawKeyboardEventArgs(key, System.Windows.Input.KeyStates.Down, keyboardEvent.repeat, this.getTimestamp()));

            if (this.keyDownHandled) {
                e.preventDefault();
            }
        },
        onKeyUp: function (e) {
            var keyboardEvent = Bridge.cast(e, KeyboardEvent);

            var key = this.converter.Granular$Host$IHtmlValueConverter$convertBackKey(keyboardEvent.keyCode, keyboardEvent.location);

            this.keyUpHandled = this.processKeyboardEvent(new System.Windows.Input.RawKeyboardEventArgs(key, System.Windows.Input.KeyStates.None, keyboardEvent.repeat, this.getTimestamp()));

            if (this.keyDownHandled || this.keyUpHandled) {
                e.preventDefault();
            }
        },
        preventKeyboardHandled: function (e) {
            if (this.keyDownHandled || this.keyUpHandled) {
                e.preventDefault();
            }
        },
        onMouseDown: function (e) {
            var mouseEvent = Bridge.cast(e, MouseEvent);

            var position = new System.Windows.Point.$ctor1(mouseEvent.pageX, mouseEvent.pageY);
            var button = this.converter.Granular$Host$IHtmlValueConverter$convertBackMouseButton(mouseEvent.button);

            this.mouseDownHandled = this.processMouseEvent(new System.Windows.Input.RawMouseButtonEventArgs(button, System.Windows.Input.MouseButtonState.Pressed, position, this.getTimestamp()));

            if (this.mouseDownHandled || this.getMouseDevice().getCaptureTarget() != null) {
                e.preventDefault();
            }
        },
        onMouseUp: function (e) {
            var mouseEvent = Bridge.cast(e, MouseEvent);

            var position = new System.Windows.Point.$ctor1(mouseEvent.pageX, mouseEvent.pageY);
            var button = this.converter.Granular$Host$IHtmlValueConverter$convertBackMouseButton(mouseEvent.button);

            this.mouseUpHandled = this.processMouseEvent(new System.Windows.Input.RawMouseButtonEventArgs(button, System.Windows.Input.MouseButtonState.Released, position, this.getTimestamp()));

            if (this.mouseDownHandled || this.mouseMoveHandled || this.mouseUpHandled || this.getMouseDevice().getCaptureTarget() != null) {
                e.preventDefault();
            }
        },
        onMouseWheel: function (e) {
            var uiEvent = Bridge.cast(e, UIEvent);
            var wheelEvent = Bridge.cast(e, WheelEvent);

            var position = new System.Windows.Point.$ctor1(uiEvent.pageX, uiEvent.pageY);
            var delta = (wheelEvent).deltaY > 0 ? -100 : 100;

            if (this.processMouseEvent(new System.Windows.Input.RawMouseWheelEventArgs(delta, position, this.getTimestamp()))) {
                e.preventDefault();
            }
        },
        onMouseMove: function (e) {
            if (!(Bridge.is(e, MouseEvent))) {
                return;
            }

            var mouseEvent = Bridge.cast(e, MouseEvent);

            var position = new System.Windows.Point.$ctor1(mouseEvent.pageX, mouseEvent.pageY);

            this.mouseMoveHandled = this.processMouseEvent(new System.Windows.Input.RawMouseEventArgs(position, this.getTimestamp()));

            if (this.mouseDownHandled || this.mouseMoveHandled || this.getMouseDevice().getCaptureTarget() != null) {
                e.preventDefault();
            }
        },
        preventMouseHandled: function (e) {
            if (this.mouseDownHandled || this.mouseMoveHandled || this.mouseUpHandled || this.getMouseDevice().getCaptureTarget() != null) {
                e.preventDefault();
            }
        },
        hitTest: function (position) {
            return Bridge.as(this.getRootElement().hitTest(position), System.Windows.IInputElement);
        },
        getTimestamp: function () {
            return 0; //(int)(DateTime.Now.GetTime());
        },
        processKeyboardEvent: function (keyboardEventArgs) {
            return System.Windows.Threading.Dispatcher.currentDispatcher.invoke(Boolean, Bridge.fn.bind(this, function () {
                return this.getKeyboardDevice().processRawEvent(keyboardEventArgs);
            }), System.Windows.Threading.DispatcherPriority.Input);
        },
        processMouseEvent: function (mouseEventArgs) {
            return System.Windows.Threading.Dispatcher.currentDispatcher.invoke(Boolean, Bridge.fn.bind(this, function () {
                return this.getMouseDevice().processRawEvent(mouseEventArgs);
            }), System.Windows.Threading.DispatcherPriority.Input);
        }
    });

    Bridge.ns("Granular.Host.PresentationSource", $asm.$);

    Bridge.apply($asm.$.Granular.Host.PresentationSource, {
        f1: function (e) {
            this.getMouseDevice().activate();
        },
        f2: function (e) {
            this.getMouseDevice().deactivate();
        },
        f3: function (e) {
            this.setRootElementSize();
        }
    });

    Bridge.define("Granular.Host.PresentationSourceFactory", {
        inherits: [System.Windows.IPresentationSourceFactory],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.PresentationSourceFactory();
                }
            }
        },
        presentationSources: null,
        config: {
            alias: [
            "createPresentationSource", "System$Windows$IPresentationSourceFactory$createPresentationSource",
            "getPresentationSourceFromElement", "System$Windows$IPresentationSourceFactory$getPresentationSourceFromElement"
            ]
        },
        ctor: function () {
            this.$initialize();
            this.presentationSources = new (System.Collections.Generic.List$1(Granular.Host.PresentationSource))();
        },
        createPresentationSource: function (rootElement) {
            var presentationSource = new Granular.Host.PresentationSource(rootElement, Granular.Host.HtmlValueConverter.default);
            this.presentationSources.add(presentationSource);

            return presentationSource;
        },
        getPresentationSourceFromElement: function (element) {
            while (Bridge.is(element.getVisualParent(), System.Windows.FrameworkElement)) {
                element = Bridge.cast(element.getVisualParent(), System.Windows.FrameworkElement);
            }

            return System.Linq.Enumerable.from(this.presentationSources).firstOrDefault(function (presentationSource) {
                    return Bridge.referenceEquals(presentationSource.getRootElement(), element);
                }, null);
        }
    });

    Bridge.define("Granular.Host.Render.HtmlRenderElementFactory", {
        inherits: [System.Windows.Media.IRenderElementFactory],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.Render.HtmlRenderElementFactory();
                }
            }
        },
        config: {
            alias: [
            "createVisualRenderElement", "System$Windows$Media$IRenderElementFactory$createVisualRenderElement",
            "createDrawingRenderElement", "System$Windows$Media$IRenderElementFactory$createDrawingRenderElement",
            "createTextBoxRenderElement", "System$Windows$Media$IRenderElementFactory$createTextBoxRenderElement",
            "createTextBlockRenderElement", "System$Windows$Media$IRenderElementFactory$createTextBlockRenderElement",
            "createBorderRenderElement", "System$Windows$Media$IRenderElementFactory$createBorderRenderElement",
            "createImageRenderElement", "System$Windows$Media$IRenderElementFactory$createImageRenderElement"
            ]
        },
        ctor: function () {
            this.$initialize();
            //
        },
        createVisualRenderElement: function (owner) {
            return new Granular.Host.Render.HtmlVisualRenderElement(owner, Granular.Host.RenderQueue.default, Granular.Host.HtmlValueConverter.default);
        },
        createDrawingRenderElement: function (owner) {
            throw new System.NotImplementedException();
        },
        createTextBoxRenderElement: function (owner) {
            return new Granular.Host.Render.HtmlTextBoxRenderElement(Granular.Host.RenderQueue.default, Granular.Host.HtmlValueConverter.default);
        },
        createTextBlockRenderElement: function (owner) {
            return new Granular.Host.Render.HtmlTextBlockRenderElement(Granular.Host.RenderQueue.default, Granular.Host.HtmlValueConverter.default);
        },
        createBorderRenderElement: function (owner) {
            return new Granular.Host.Render.HtmlBorderRenderElement(Granular.Host.RenderQueue.default, Granular.Host.HtmlValueConverter.default);
        },
        createImageRenderElement: function (owner) {
            return new Granular.Host.Render.HtmlImageRenderElement(Granular.Host.RenderQueue.default, Granular.Host.HtmlValueConverter.default);
        }
    });

    Bridge.define("Granular.Host.RenderImageSource", {
        inherits: [System.Windows.Media.IRenderImageSource],
        state: 0,
        container: null,
        image: null,
        config: {
            events: {
                StateChanged: null
            },
            properties: {
                Size: null,
                Url: null,
                SourceRect: null,
                ImageSize: null
            },
            alias: [
            "addStateChanged", "System$Windows$Media$IRenderImageSource$addStateChanged",
            "removeStateChanged", "System$Windows$Media$IRenderImageSource$removeStateChanged",
            "getState", "System$Windows$Media$IRenderImageSource$getState",
            "setState", "System$Windows$Media$IRenderImageSource$setState",
            "getSize", "System$Windows$Media$IRenderImageSource$getSize",
            "setSize", "System$Windows$Media$IRenderImageSource$setSize"
            ]
        },
        ctor: function (container, url, isLocalUrl, sourceRect) {
            this.$initialize();
            this.container = container;

            this.setUrl(url);
            this.setSourceRect(sourceRect);
            this.setState(isLocalUrl ? System.Windows.Media.RenderImageState.Idle : System.Windows.Media.RenderImageState.DownloadProgress);

            this.image = document.createElement("img");
            container.appendChild(this.image);

            this.image.addEventListener("load", Bridge.fn.cacheBind(this, this.onImageLoad));
            this.image.addEventListener("error", Bridge.fn.cacheBind(this, this.onImageError));
            this.image.addEventListener("abort", Bridge.fn.cacheBind(this, this.onImageAbort));

            this.image.setAttribute("src", url);

            this.setImageSize(System.Windows.Size.empty);
            this.setSize(System.Windows.Size.empty);
        },
        getState: function () {
            return this.state;
        },
        setState: function (value) {
            if (this.state === value) {
                return;
            }

            this.state = value;
            Granular.Extensions.EventHandlerExtensions.raise$2(this.StateChanged, this);
        },
        onImageLoad: function () {
            this.setImageSize(new System.Windows.Size(this.image.clientWidth, this.image.clientHeight));
            this.setSize(!System.Windows.RectExtensions.isNullOrEmpty(this.getSourceRect()) ? this.getSourceRect().getSize() : this.getImageSize());
            this.setState(System.Windows.Media.RenderImageState.DownloadCompleted);
            this.container.removeChild(this.image);
        },
        onImageError: function () {
            this.setState(System.Windows.Media.RenderImageState.DownloadFailed);
            this.container.removeChild(this.image);
        },
        onImageAbort: function () {
            this.setState(System.Windows.Media.RenderImageState.DownloadFailed);
            this.container.removeChild(this.image);
        }
    });

    Bridge.define("Granular.Host.RenderImageSourceFactory", {
        inherits: [System.Windows.IRenderImageSourceFactory],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.RenderImageSourceFactory(Granular.Host.HtmlValueConverter.default);
                }
            },
            getRenderImageType: function (uri) {
                var extension = uri.substr(((uri.lastIndexOf(String.fromCharCode(46)) + 1) | 0)).toLowerCase();

                switch (extension) {
                    case "gif": 
                        return System.Windows.Media.RenderImageType.Gif;
                    case "jpg": 
                        return System.Windows.Media.RenderImageType.Jpeg;
                    case "png": 
                        return System.Windows.Media.RenderImageType.Png;
                    case "svg": 
                        return System.Windows.Media.RenderImageType.Svg;
                }

                return System.Windows.Media.RenderImageType.Unknown;
            }
        },
        container: null,
        converter: null,
        objectUrlCache: null,
        config: {
            alias: [
            "createRenderImageSource", "System$Windows$IRenderImageSourceFactory$createRenderImageSource",
            "createRenderImageSource$1", "System$Windows$IRenderImageSourceFactory$createRenderImageSource$1"
            ]
        },
        ctor: function (converter) {
            this.$initialize();
            this.converter = converter;
            this.objectUrlCache = Granular.Collections.CacheDictionary$2(String,String).createUsingStringKeys(Bridge.fn.cacheBind(this, this.resolveObjectUrl));
        },
        getContainer: function () {
            if (this.container == null) {
                this.container = document.createElement("div");
                this.container.style.setProperty("visibility", "hidden");
                this.container.style.setProperty("overflow", "hidden");
                this.container.style.width = "0px";
                this.container.style.height = "0px";

                document.body.appendChild(this.container);
            }

            return this.container;
        },
        createRenderImageSource: function (uri, sourceRect) {
            if (Bridge.referenceEquals(System.UriExtensions.getScheme(uri), "http") || Bridge.referenceEquals(System.UriExtensions.getScheme(uri), "https")) {
                return new Granular.Host.RenderImageSource(this.getContainer(), System.UriExtensions.getAbsoluteUri(uri), false, sourceRect);
            }

            return new Granular.Host.RenderImageSource(this.getContainer(), this.objectUrlCache.getValue(System.UriExtensions.getAbsoluteUri(uri)), true, sourceRect);
        },
        createRenderImageSource$1: function (imageType, imageData, sourceRect) {
            var mimeType = this.converter.Granular$Host$IHtmlValueConverter$toMimeTypeString(imageType);
            var url = URL.createObjectURL(new Blob([new Uint8Array(imageData)], {type: mimeType}));

            return new Granular.Host.RenderImageSource(this.getContainer(), url, true, sourceRect);
        },
        resolveObjectUrl: function (uri) {
            var imageData = System.Windows.EmbeddedResourceLoader.loadResourceData(new System.Uri(uri));
            var mimeType = this.converter.Granular$Host$IHtmlValueConverter$toMimeTypeString(Granular.Host.RenderImageSourceFactory.getRenderImageType(uri));

            return URL.createObjectURL(new Blob([new Uint8Array(imageData)], {type: mimeType}));
        }
    });

    Bridge.define("Granular.Host.TaskScheduler", {
        inherits: [System.Windows.Threading.ITaskScheduler],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.TaskScheduler();
                }
            }
        },
        config: {
            alias: [
            "scheduleTask", "System$Windows$Threading$ITaskScheduler$scheduleTask"
            ]
        },
        ctor: function () {
            this.$initialize();
            //
        },
        scheduleTask: function (timeSpan, action) {
            var token = window.setTimeout(action, Bridge.Int.clip32(timeSpan.getTotalMilliseconds()));
            return new Granular.Disposable(function () {
                window.clearTimeout(token);
            });
        }
    });

    Bridge.define("Granular.Host.TextMeasurementService", {
        inherits: [System.Windows.ITextMeasurementService],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.TextMeasurementService(Granular.Host.HtmlValueConverter.default);
                }
            }
        },
        converter: null,
        htmlElement: null,
        style: null,
        config: {
            alias: [
            "measure", "System$Windows$ITextMeasurementService$measure"
            ]
        },
        ctor: function (converter) {
            this.$initialize();
            this.converter = converter;
        },
        measure: function (text, fontSize, typeface, maxWidth) {
            if (this.htmlElement == null) {
                this.htmlElement = document.createElement("div");
                this.style = new Granular.Host.HtmlStyleDictionary(this.htmlElement);

                document.body.appendChild(this.htmlElement);
            }

            this.style.setValue("position", "absolute");
            this.style.setValue("visibility", "hidden");
            Granular.Host.HtmlStyleDictionaryExtensions.setFontSize(this.style, fontSize, this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontFamily(this.style, typeface.getFontFamily(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStretch(this.style, typeface.getStretch(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStyle(this.style, typeface.getStyle(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontWeight(this.style, typeface.getWeight(), this.converter);

            if (Granular.Extensions.DoubleExtensions.isNaN(maxWidth) || !isFinite(maxWidth)) {
                Granular.Host.HtmlStyleDictionaryExtensions.setTextWrapping(this.style, System.Windows.TextWrapping.NoWrap, this.converter);
                this.style.clearValue("max-width");
            } else {
                Granular.Host.HtmlStyleDictionaryExtensions.setTextWrapping(this.style, System.Windows.TextWrapping.Wrap, this.converter);
                this.style.setValue("max-width", this.converter.Granular$Host$IHtmlValueConverter$toPixelString(maxWidth));
            }

            this.style.apply();

            this.htmlElement.innerHTML = this.converter.Granular$Host$IHtmlValueConverter$toHtmlContentString(Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(text, "A"));

            return new System.Windows.Size(Granular.Extensions.StringExtensions.isNullOrEmpty(text) ? 0 : ((this.htmlElement.offsetWidth + 2) | 0), this.htmlElement.offsetHeight);
        }
    });

    Bridge.define("Granular.Host.WebApplicationHost", {
        inherits: [System.Windows.IApplicationHost],
        config: {
            alias: [
            "getPresentationSourceFactory", "System$Windows$IApplicationHost$getPresentationSourceFactory",
            "getTaskScheduler", "System$Windows$IApplicationHost$getTaskScheduler",
            "getTextMeasurementService", "System$Windows$IApplicationHost$getTextMeasurementService",
            "getRenderImageSourceFactory", "System$Windows$IApplicationHost$getRenderImageSourceFactory",
            "run", "System$Windows$IApplicationHost$run"
            ]
        },
        ctor: function () {
            this.$initialize();
            //
        },
        getPresentationSourceFactory: function () {
            return Granular.Host.PresentationSourceFactory.default;
        },
        getTaskScheduler: function () {
            return Granular.Host.TaskScheduler.default;
        },
        getTextMeasurementService: function () {
            return Granular.Host.TextMeasurementService.default;
        },
        getRenderImageSourceFactory: function () {
            return Granular.Host.RenderImageSourceFactory.default;
        },
        run: function (applicationEntryPoint) {
            window.onload = Bridge.fn.combine(window.onload, function (e) {
                applicationEntryPoint();
            });
        }
    });

    Bridge.define("Granular.Host.HtmlValueConverter", {
        inherits: [Granular.Host.IHtmlValueConverter],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.HtmlValueConverter();
                }
            },
            scaleGradientStops$1: function (gradientStops, startPoint, endPoint, targetSize) {
                if (startPoint.getX() === endPoint.getX()) {
                    return startPoint.getY() < endPoint.getY() ? Granular.Host.HtmlValueConverter.scaleGradientStops(gradientStops, startPoint.getY() / targetSize.getHeight(), endPoint.getY() / targetSize.getHeight()) : Granular.Host.HtmlValueConverter.scaleGradientStops(gradientStops, 1 - startPoint.getY() / targetSize.getHeight(), 1 - endPoint.getY() / targetSize.getHeight());
                }

                if (startPoint.getY() === endPoint.getY()) {
                    return startPoint.getX() < endPoint.getX() ? Granular.Host.HtmlValueConverter.scaleGradientStops(gradientStops, startPoint.getX() / targetSize.getWidth(), endPoint.getX() / targetSize.getWidth()) : Granular.Host.HtmlValueConverter.scaleGradientStops(gradientStops, 1 - startPoint.getX() / targetSize.getWidth(), 1 - endPoint.getX() / targetSize.getWidth());
                }

                var direction = System.Windows.Point.op_Subtraction(endPoint, startPoint);
                var directionLength = System.Windows.PointExtensions.getLength(direction);

                var sin = direction.getY() / directionLength;
                var cos = direction.getX() / directionLength;

                // generated gradient image size
                var generatedImageWidth = Granular.Extensions.DoubleExtensions.abs(cos) * targetSize.getWidth() + Granular.Extensions.DoubleExtensions.abs(sin) * targetSize.getHeight();
                var generatedImageHeight = Granular.Extensions.DoubleExtensions.abs(sin) * targetSize.getWidth() + Granular.Extensions.DoubleExtensions.abs(cos) * targetSize.getHeight();

                // transformation from a unit square to the generated gradient image rectangle
                var matrix = System.Windows.Media.Matrix.op_Multiply(System.Windows.Media.Matrix.op_Multiply(System.Windows.Media.Matrix.op_Multiply(System.Windows.Media.Matrix.translationMatrix(-0.5, -0.5), System.Windows.Media.Matrix.scalingMatrix(generatedImageWidth, generatedImageHeight)), new System.Windows.Media.Matrix(cos, sin, -sin, cos, 0, 0)), System.Windows.Media.Matrix.translationMatrix(targetSize.getWidth() / 2, targetSize.getHeight() / 2)); // translate to the target rectangle center

                var relativeStart = System.Windows.Media.Matrix.op_Multiply$1(startPoint, matrix.getInverse());
                var relativeEnd = System.Windows.Media.Matrix.op_Multiply$1(endPoint, matrix.getInverse());

                return Granular.Host.HtmlValueConverter.scaleGradientStops(gradientStops, relativeStart.getX(), relativeEnd.getX());
            },
            scaleGradientStops: function (gradientStops, start, end) {
                return System.Linq.Enumerable.from(gradientStops).select(function (gradientStop) {
                        return new System.Windows.Media.GradientStop.$ctor1(gradientStop.getColor(), start + gradientStop.getOffset() * (end - start));
                    }).toArray();
            },
            getReflectedGradientStops: function (gradientStops) {
                return System.Linq.Enumerable.from(gradientStops).select($asm.$.Granular.Host.HtmlValueConverter.f1).concat(System.Linq.Enumerable.from(gradientStops).select($asm.$.Granular.Host.HtmlValueConverter.f2).reverse()).toArray();
            }
        },
        config: {
            alias: [
            "toPixelString", "Granular$Host$IHtmlValueConverter$toPixelString",
            "toPercentString", "Granular$Host$IHtmlValueConverter$toPercentString",
            "toDegreesString", "Granular$Host$IHtmlValueConverter$toDegreesString",
            "toImplicitValueString", "Granular$Host$IHtmlValueConverter$toImplicitValueString",
            "toPixelString$1", "Granular$Host$IHtmlValueConverter$toPixelString$1",
            "toPercentString$1", "Granular$Host$IHtmlValueConverter$toPercentString$1",
            "toImplicitValueString$1", "Granular$Host$IHtmlValueConverter$toImplicitValueString$1",
            "toPixelString$2", "Granular$Host$IHtmlValueConverter$toPixelString$2",
            "toColorString", "Granular$Host$IHtmlValueConverter$toColorString",
            "toPixelString$3", "Granular$Host$IHtmlValueConverter$toPixelString$3",
            "toImplicitValueString$2", "Granular$Host$IHtmlValueConverter$toImplicitValueString$2",
            "toUrlString", "Granular$Host$IHtmlValueConverter$toUrlString",
            "toLinearGradientString", "Granular$Host$IHtmlValueConverter$toLinearGradientString",
            "toRadialGradientString", "Granular$Host$IHtmlValueConverter$toRadialGradientString",
            "toColorStopsString", "Granular$Host$IHtmlValueConverter$toColorStopsString",
            "toColorString$1", "Granular$Host$IHtmlValueConverter$toColorString$1",
            "toImageString$1", "Granular$Host$IHtmlValueConverter$toImageString$1",
            "toImageString$2", "Granular$Host$IHtmlValueConverter$toImageString$2",
            "toImageString", "Granular$Host$IHtmlValueConverter$toImageString",
            "toFontStyleString", "Granular$Host$IHtmlValueConverter$toFontStyleString",
            "toFontStretchString", "Granular$Host$IHtmlValueConverter$toFontStretchString",
            "toFontWeightString", "Granular$Host$IHtmlValueConverter$toFontWeightString",
            "toTextAlignmentString", "Granular$Host$IHtmlValueConverter$toTextAlignmentString",
            "toOverflowString", "Granular$Host$IHtmlValueConverter$toOverflowString",
            "toHtmlContentString", "Granular$Host$IHtmlValueConverter$toHtmlContentString",
            "toWrapString", "Granular$Host$IHtmlValueConverter$toWrapString",
            "toWhiteSpaceString", "Granular$Host$IHtmlValueConverter$toWhiteSpaceString",
            "toFontFamilyNamesString", "Granular$Host$IHtmlValueConverter$toFontFamilyNamesString",
            "toBooleanString", "Granular$Host$IHtmlValueConverter$toBooleanString",
            "toMimeTypeString", "Granular$Host$IHtmlValueConverter$toMimeTypeString",
            "toCursorString", "Granular$Host$IHtmlValueConverter$toCursorString",
            "toTransformString", "Granular$Host$IHtmlValueConverter$toTransformString",
            "convertBackMouseButton", "Granular$Host$IHtmlValueConverter$convertBackMouseButton",
            "convertBackKey", "Granular$Host$IHtmlValueConverter$convertBackKey"
            ]
        },
        ctor: function () {
            this.$initialize();
            //
        },
        toPixelString: function (value) {
            if (Granular.Extensions.DoubleExtensions.isNaN(value) || !isFinite(value)) {
                throw new Granular.Exception("Can't convert {0} to pixel string", [value]);
            }

            return System.String.format("{0}px", Bridge.Math.round(value, 2, 6));
        },
        toPixelString$1: function (point) {
            return System.String.format("{0} {1}", this.toPixelString(point.getX()), this.toPixelString(point.getY()));
        },
        toPixelString$2: function (size) {
            return System.String.format("{0} {1}", this.toPixelString(size.getWidth()), this.toPixelString(size.getHeight()));
        },
        toPixelString$3: function (thickness) {
            return thickness.getIsUniform() ? this.toPixelString(thickness.getTop()) : System.String.format("{0} {1} {2} {3}", this.toPixelString(thickness.getTop()), this.toPixelString(thickness.getRight()), this.toPixelString(thickness.getBottom()), this.toPixelString(thickness.getLeft()));
        },
        toPercentString: function (value) {
            if (Granular.Extensions.DoubleExtensions.isNaN(value)) {
                throw new Granular.Exception("Can't convert Double.NaN to percent string");
            }

            return System.String.format("{0}%", Bridge.Math.round(value * 100, 2, 6));
        },
        toPercentString$1: function (point) {
            return System.String.format("{0} {1}", this.toPercentString(point.getX()), this.toPercentString(point.getY()));
        },
        toDegreesString: function (value) {
            if (Granular.Extensions.DoubleExtensions.isNaN(value)) {
                throw new Granular.Exception("Can't convert Double.NaN to degrees string");
            }

            return System.String.format("{0}deg", Bridge.Math.round(value, 2, 6));
        },
        toImplicitValueString: function (value) {
            return System.String.format("{0}", Bridge.Math.round(value, 2, 6));
        },
        toImplicitValueString$1: function (point) {
            return System.String.format("{0} {1}", this.toImplicitValueString(point.getX()), this.toImplicitValueString(point.getY()));
        },
        toImplicitValueString$2: function (thickness) {
            return System.String.format("{0} {1} {2} {3}", this.toImplicitValueString(thickness.getTop()), this.toImplicitValueString(thickness.getRight()), this.toImplicitValueString(thickness.getBottom()), this.toImplicitValueString(thickness.getLeft()));
        },
        toColorString: function (color) {
            return color.getA() === 255 ? System.String.format("#{0:x2}{1:x2}{2:x2}", color.getR(), color.getG(), color.getB()) : System.String.format("rgba({0}, {1}, {2}, {3})", color.getR(), color.getG(), color.getB(), Bridge.Math.round(color.getA() / 255, 2, 6));
        },
        toColorString$1: function (brush) {
            return this.toColorString(System.Windows.Media.ColorExtensions.applyOpacity(brush.getColor(), brush.getOpacity()));
        },
        toUrlString: function (url) {
            return System.String.format("url({0})", url);
        },
        toLinearGradientString: function (brush, targetRect) {
            if (System.Windows.Size.op_Equality(targetRect.getSize(), System.Windows.Size.zero)) {
                return "";
            }

            var gradientStops = brush.getGradientStops();

            if (brush.getSpreadMethod() === System.Windows.Media.GradientSpreadMethod.Reflect) {
                gradientStops = Granular.Host.HtmlValueConverter.getReflectedGradientStops(brush.getGradientStops());
            }

            var startPoint = brush.getStartPoint();
            var endPoint = brush.getEndPoint();

            if (brush.getMappingMode() === System.Windows.Media.BrushMappingMode.Absolute) {
                startPoint = System.Windows.Point.op_Subtraction(startPoint, targetRect.getLocation());
                endPoint = System.Windows.Point.op_Subtraction(endPoint, targetRect.getLocation());
            } else {
                startPoint = System.Windows.Point.op_Multiply$2(startPoint, targetRect.getSize());
                endPoint = System.Windows.Point.op_Multiply$2(endPoint, targetRect.getSize());
            }

            gradientStops = Granular.Host.HtmlValueConverter.scaleGradientStops$1(gradientStops, startPoint, endPoint, targetRect.getSize());

            var angle = System.Windows.PointExtensions.getAngle((System.Windows.Point.op_Subtraction(endPoint, startPoint)));
            var gradientType = brush.getSpreadMethod() === System.Windows.Media.GradientSpreadMethod.Repeat ? "repeating-linear-gradient" : "linear-gradient";
            return System.String.format("{0}({1}, {2})", gradientType, this.toDegreesString(90 + 180 * (angle / Math.PI)), this.toColorStopsString(gradientStops));
        },
        toRadialGradientString: function (brush) {
            var gradientStops = brush.getSpreadMethod() === System.Windows.Media.GradientSpreadMethod.Reflect ? Granular.Host.HtmlValueConverter.getReflectedGradientStops(brush.getGradientStops()) : brush.getGradientStops();

            var gradientType = brush.getSpreadMethod() === System.Windows.Media.GradientSpreadMethod.Repeat ? "repeating-radial-gradient" : "radial-gradient";
            return System.String.format("{0}(ellipse {1} {2} at {3}, {4})", gradientType, this.toPercentString(brush.getRadiusX()), this.toPercentString(brush.getRadiusY()), this.toPercentString$1(brush.getGradientOrigin()), this.toColorStopsString(gradientStops));
        },
        toColorStopsString: function (gradientStops) {
            return System.Linq.Enumerable.from(gradientStops).select(Bridge.fn.bind(this, $asm.$.Granular.Host.HtmlValueConverter.f3)).defaultIfEmpty("").aggregate($asm.$.Granular.Host.HtmlValueConverter.f4);
        },
        toImageString$1: function (brush, targetRect) {
            return this.toLinearGradientString(brush, targetRect);
        },
        toImageString$2: function (brush) {
            return this.toRadialGradientString(brush);
        },
        toImageString: function (brush) {
            return this.toUrlString(brush.getImageSource());
        },
        toFontStyleString: function (fontStyle) {
            switch (fontStyle) {
                case System.Windows.FontStyle.Normal: 
                    return "normal";
                case System.Windows.FontStyle.Italic: 
                    return "italic";
                case System.Windows.FontStyle.Oblique: 
                    return "oblique";
            }

            throw new Granular.Exception("Unexpected FontStyle \"{0}\"", [fontStyle]);
        },
        toFontStretchString: function (fontStretch) {
            switch (fontStretch) {
                case System.Windows.FontStretch.UltraCondensed: 
                    return "ultra-condensed";
                case System.Windows.FontStretch.ExtraCondensed: 
                    return "extra-condensed";
                case System.Windows.FontStretch.Condensed: 
                    return "condensed";
                case System.Windows.FontStretch.SemiCondensed: 
                    return "semi-condensed";
                case System.Windows.FontStretch.Medium: 
                case System.Windows.FontStretch.Normal: 
                    return "normal";
                case System.Windows.FontStretch.SemiExpanded: 
                    return "semi-expanded";
                case System.Windows.FontStretch.Expanded: 
                    return "expanded";
                case System.Windows.FontStretch.ExtraExpanded: 
                    return "extra-expanded";
                case System.Windows.FontStretch.UltraExpanded: 
                    return "ultra-expanded";
            }

            throw new Granular.Exception("Unexpected FontStretch \"{0}\"", [fontStretch]);
        },
        toFontWeightString: function (fontWeight) {
            switch (fontWeight) {
                case System.Windows.FontWeight.Thin: 
                    return "100";
                case System.Windows.FontWeight.ExtraLight: 
                case System.Windows.FontWeight.UltraLight: 
                    return "200";
                case System.Windows.FontWeight.Light: 
                    return "300";
                case System.Windows.FontWeight.Normal: 
                case System.Windows.FontWeight.Regular: 
                    return "400";
                case System.Windows.FontWeight.Medium: 
                    return "500";
                case System.Windows.FontWeight.DemiBold: 
                case System.Windows.FontWeight.SemiBold: 
                    return "600";
                case System.Windows.FontWeight.Bold: 
                    return "700";
                case System.Windows.FontWeight.ExtraBold: 
                case System.Windows.FontWeight.UltraBold: 
                    return "800";
                case System.Windows.FontWeight.Black: 
                case System.Windows.FontWeight.Heavy: 
                    return "900";
                case System.Windows.FontWeight.ExtraBlack: 
                case System.Windows.FontWeight.UltraBlack: 
                    return "950";
            }

            throw new Granular.Exception("Unexpected FontWeight \"{0}\"", [fontWeight]);
        },
        toTextAlignmentString: function (textAlignment) {
            switch (textAlignment) {
                case System.Windows.TextAlignment.Left: 
                    return "left";
                case System.Windows.TextAlignment.Right: 
                    return "right";
                case System.Windows.TextAlignment.Center: 
                    return "center";
                case System.Windows.TextAlignment.Justify: 
                    return "justify";
            }

            throw new Granular.Exception("Unexpected TextAlignment \"{0}\"", [textAlignment]);
        },
        toOverflowString: function (scrollBarVisibility) {
            switch (scrollBarVisibility) {
                case System.Windows.Controls.ScrollBarVisibility.Disabled: 
                    return "hidden";
                case System.Windows.Controls.ScrollBarVisibility.Auto: 
                    return "auto";
                case System.Windows.Controls.ScrollBarVisibility.Hidden: 
                    return "hidden";
                case System.Windows.Controls.ScrollBarVisibility.Visible: 
                    return "scroll";
            }

            throw new Granular.Exception("Unexpected ScrollBarVisibility \"{0}\"", [scrollBarVisibility]);
        },
        toHtmlContentString: function (value) {
            return System.String.replaceAll(value, '\n', "<br/>");
        },
        toWrapString: function (textWrapping) {
            switch (textWrapping) {
                case System.Windows.TextWrapping.Wrap: 
                    return "soft";
                case System.Windows.TextWrapping.NoWrap: 
                    return "off";
            }

            throw new Granular.Exception("Unexpected TextWrapping \"{0}\"", [textWrapping]);
        },
        toWhiteSpaceString: function (textWrapping) {
            switch (textWrapping) {
                case System.Windows.TextWrapping.Wrap: 
                    return "pre-wrap";
                case System.Windows.TextWrapping.NoWrap: 
                    return "pre";
            }

            throw new Granular.Exception("Unexpected TextWrapping \"{0}\"", [textWrapping]);
        },
        toFontFamilyNamesString: function (fontFamily) {
            return System.Linq.Enumerable.from(fontFamily.getFamilyNames()).select($asm.$.Granular.Host.HtmlValueConverter.f5).aggregate($asm.$.Granular.Host.HtmlValueConverter.f4);
        },
        toBooleanString: function (value) {
            return value ? "true" : "false";
        },
        toMimeTypeString: function (renderImageType) {
            switch (renderImageType) {
                case System.Windows.Media.RenderImageType.Unknown: 
                    return "";
                case System.Windows.Media.RenderImageType.Gif: 
                    return "image/gif";
                case System.Windows.Media.RenderImageType.Jpeg: 
                    return "image/jpeg";
                case System.Windows.Media.RenderImageType.Png: 
                    return "image/png";
                case System.Windows.Media.RenderImageType.Svg: 
                    return "image/svg+xml";
            }

            throw new Granular.Exception("Unexpected RenderImageType \"{0}\"", [renderImageType]);
        },
        toCursorString: function (cursor) {
            if (cursor == null) {
                return "default";
            }

            if (cursor.getImageSource() != null) {
                var urlString = this.toUrlString(Bridge.cast(cursor.getImageSource().getRenderImageSource(), Granular.Host.RenderImageSource).getUrl());

                return !System.Windows.Point.isNullOrEmpty(cursor.getHotspot()) ? System.String.format("{0} {1}, default", urlString, this.toImplicitValueString$1(cursor.getHotspot())) : System.String.format("{0}, default", urlString);
            }

            switch (cursor.getCursorType()) {
                case System.Windows.Input.CursorType.None: 
                    return "none";
                case System.Windows.Input.CursorType.No: 
                    return "not-allowed";
                case System.Windows.Input.CursorType.Arrow: 
                    return "default";
                case System.Windows.Input.CursorType.AppStarting: 
                    return "progress";
                case System.Windows.Input.CursorType.Cross: 
                    return "crosshair";
                case System.Windows.Input.CursorType.Help: 
                    return "help";
                case System.Windows.Input.CursorType.IBeam: 
                    return "text";
                case System.Windows.Input.CursorType.SizeAll: 
                    return "move";
                case System.Windows.Input.CursorType.SizeNESW: 
                    return "nesw-resize";
                case System.Windows.Input.CursorType.SizeNS: 
                    return "ns-resize";
                case System.Windows.Input.CursorType.SizeNWSE: 
                    return "nwse-resize";
                case System.Windows.Input.CursorType.SizeWE: 
                    return "ew-resize";
                case System.Windows.Input.CursorType.Wait: 
                    return "wait";
                case System.Windows.Input.CursorType.Hand: 
                    return "pointer";
                case System.Windows.Input.CursorType.UpArrow: 
                case System.Windows.Input.CursorType.Pen: 
                case System.Windows.Input.CursorType.ScrollNS: 
                case System.Windows.Input.CursorType.ScrollWE: 
                case System.Windows.Input.CursorType.ScrollAll: 
                case System.Windows.Input.CursorType.ScrollN: 
                case System.Windows.Input.CursorType.ScrollS: 
                case System.Windows.Input.CursorType.ScrollW: 
                case System.Windows.Input.CursorType.ScrollE: 
                case System.Windows.Input.CursorType.ScrollNW: 
                case System.Windows.Input.CursorType.ScrollNE: 
                case System.Windows.Input.CursorType.ScrollSW: 
                case System.Windows.Input.CursorType.ScrollSE: 
                case System.Windows.Input.CursorType.ArrowCD: 
                    return "default";
            }

            throw new Granular.Exception("Unexpected CursorType \"{0}\"", [cursor.getCursorType()]);
        },
        toTransformString: function (matrix) {
            return System.String.format("matrix({0}, {1}, {2}, {3}, {4}, {5}", Bridge.Math.round(matrix.getM11(), 2, 6), Bridge.Math.round(matrix.getM12(), 2, 6), Bridge.Math.round(matrix.getM21(), 2, 6), Bridge.Math.round(matrix.getM22(), 2, 6), Bridge.Math.round(matrix.getOffsetX(), 2, 6), Bridge.Math.round(matrix.getOffsetY(), 2, 6));
        },
        convertBackMouseButton: function (buttonIndex) {
            switch (buttonIndex) {
                case 0: 
                    return System.Windows.Input.MouseButton.Left;
                case 1: 
                    return System.Windows.Input.MouseButton.Middle;
                case 2: 
                    return System.Windows.Input.MouseButton.Right;
            }

            throw new Granular.Exception("Unexpected button index \"{0}\"", [buttonIndex]);
        },
        convertBackKey: function (keyCode, location) {
            switch (keyCode) {
                case 8: 
                    return System.Windows.Input.Key.Back;
                case 9: 
                    return System.Windows.Input.Key.Tab;
                case 13: 
                    return System.Windows.Input.Key.Enter;
                case 16: 
                    return location === 1 ? System.Windows.Input.Key.LeftShift : System.Windows.Input.Key.RightShift;
                case 17: 
                    return location === 1 ? System.Windows.Input.Key.LeftCtrl : System.Windows.Input.Key.RightCtrl;
                case 18: 
                    return location === 1 ? System.Windows.Input.Key.LeftAlt : System.Windows.Input.Key.RightAlt;
                case 19: 
                    return System.Windows.Input.Key.Pause;
                case 20: 
                    return System.Windows.Input.Key.CapsLock;
                case 27: 
                    return System.Windows.Input.Key.Escape;
                case 32: 
                    return System.Windows.Input.Key.Space;
                case 33: 
                    return System.Windows.Input.Key.PageUp;
                case 34: 
                    return System.Windows.Input.Key.PageDown;
                case 35: 
                    return System.Windows.Input.Key.End;
                case 36: 
                    return System.Windows.Input.Key.Home;
                case 37: 
                    return System.Windows.Input.Key.Left;
                case 38: 
                    return System.Windows.Input.Key.Up;
                case 39: 
                    return System.Windows.Input.Key.Right;
                case 40: 
                    return System.Windows.Input.Key.Down;
                case 45: 
                    return System.Windows.Input.Key.Insert;
                case 46: 
                    return System.Windows.Input.Key.Delete;
                case 48: 
                    return System.Windows.Input.Key.D0;
                case 49: 
                    return System.Windows.Input.Key.D1;
                case 50: 
                    return System.Windows.Input.Key.D2;
                case 51: 
                    return System.Windows.Input.Key.D3;
                case 52: 
                    return System.Windows.Input.Key.D4;
                case 53: 
                    return System.Windows.Input.Key.D5;
                case 54: 
                    return System.Windows.Input.Key.D6;
                case 55: 
                    return System.Windows.Input.Key.D7;
                case 56: 
                    return System.Windows.Input.Key.D8;
                case 57: 
                    return System.Windows.Input.Key.D9;
                case 59: 
                    return System.Windows.Input.Key.OemSemicolon;
                case 65: 
                    return System.Windows.Input.Key.A;
                case 66: 
                    return System.Windows.Input.Key.B;
                case 67: 
                    return System.Windows.Input.Key.C;
                case 68: 
                    return System.Windows.Input.Key.D;
                case 69: 
                    return System.Windows.Input.Key.E;
                case 70: 
                    return System.Windows.Input.Key.F;
                case 71: 
                    return System.Windows.Input.Key.G;
                case 72: 
                    return System.Windows.Input.Key.H;
                case 73: 
                    return System.Windows.Input.Key.I;
                case 74: 
                    return System.Windows.Input.Key.J;
                case 75: 
                    return System.Windows.Input.Key.K;
                case 76: 
                    return System.Windows.Input.Key.L;
                case 77: 
                    return System.Windows.Input.Key.M;
                case 78: 
                    return System.Windows.Input.Key.N;
                case 79: 
                    return System.Windows.Input.Key.O;
                case 80: 
                    return System.Windows.Input.Key.P;
                case 81: 
                    return System.Windows.Input.Key.Q;
                case 82: 
                    return System.Windows.Input.Key.R;
                case 83: 
                    return System.Windows.Input.Key.S;
                case 84: 
                    return System.Windows.Input.Key.T;
                case 85: 
                    return System.Windows.Input.Key.U;
                case 86: 
                    return System.Windows.Input.Key.V;
                case 87: 
                    return System.Windows.Input.Key.W;
                case 88: 
                    return System.Windows.Input.Key.X;
                case 89: 
                    return System.Windows.Input.Key.Y;
                case 90: 
                    return System.Windows.Input.Key.Z;
                case 91: 
                    return location === 1 ? System.Windows.Input.Key.LWin : System.Windows.Input.Key.RWin;
                case 93: 
                    return System.Windows.Input.Key.Apps;
                case 96: 
                    return System.Windows.Input.Key.NumPad0;
                case 97: 
                    return System.Windows.Input.Key.NumPad1;
                case 98: 
                    return System.Windows.Input.Key.NumPad2;
                case 99: 
                    return System.Windows.Input.Key.NumPad3;
                case 100: 
                    return System.Windows.Input.Key.NumPad4;
                case 101: 
                    return System.Windows.Input.Key.NumPad5;
                case 102: 
                    return System.Windows.Input.Key.NumPad6;
                case 103: 
                    return System.Windows.Input.Key.NumPad7;
                case 104: 
                    return System.Windows.Input.Key.NumPad8;
                case 105: 
                    return System.Windows.Input.Key.NumPad9;
                case 106: 
                    return System.Windows.Input.Key.Multiply;
                case 107: 
                    return System.Windows.Input.Key.Add;
                case 109: 
                    return System.Windows.Input.Key.Subtract;
                case 110: 
                    return System.Windows.Input.Key.Decimal;
                case 111: 
                    return System.Windows.Input.Key.Divide;
                case 112: 
                    return System.Windows.Input.Key.F1;
                case 113: 
                    return System.Windows.Input.Key.F2;
                case 114: 
                    return System.Windows.Input.Key.F3;
                case 115: 
                    return System.Windows.Input.Key.F4;
                case 116: 
                    return System.Windows.Input.Key.F5;
                case 117: 
                    return System.Windows.Input.Key.F6;
                case 118: 
                    return System.Windows.Input.Key.F7;
                case 119: 
                    return System.Windows.Input.Key.F8;
                case 120: 
                    return System.Windows.Input.Key.F9;
                case 121: 
                    return System.Windows.Input.Key.F10;
                case 122: 
                    return System.Windows.Input.Key.F11;
                case 123: 
                    return System.Windows.Input.Key.F12;
                case 144: 
                    return System.Windows.Input.Key.NumLock;
                case 145: 
                    return System.Windows.Input.Key.Scroll;
                case 173: 
                    return System.Windows.Input.Key.OemMinus;
                case 188: 
                    return System.Windows.Input.Key.OemComma;
                case 190: 
                    return System.Windows.Input.Key.OemPeriod;
                case 191: 
                    return System.Windows.Input.Key.OemQuestion;
                case 192: 
                    return System.Windows.Input.Key.OemTilde;
                case 219: 
                    return System.Windows.Input.Key.OemOpenBrackets;
                case 220: 
                    return System.Windows.Input.Key.OemPipe;
                case 221: 
                    return System.Windows.Input.Key.OemCloseBrackets;
                case 222: 
                    return System.Windows.Input.Key.OemQuotes;
            }

            return System.Windows.Input.Key.None;
        }
    });

    Bridge.ns("Granular.Host.HtmlValueConverter", $asm.$);

    Bridge.apply($asm.$.Granular.Host.HtmlValueConverter, {
        f1: function (gradientStop) {
            return new System.Windows.Media.GradientStop.$ctor1(gradientStop.getColor(), gradientStop.getOffset() / 2);
        },
        f2: function (gradientStop) {
            return new System.Windows.Media.GradientStop.$ctor1(gradientStop.getColor(), 1.0 - gradientStop.getOffset() / 2);
        },
        f3: function (gradientStop) {
            return System.String.format("{0} {1}", this.toColorString(gradientStop.getColor()), this.toPercentString(gradientStop.getOffset()));
        },
        f4: function (s1, s2) {
            return System.String.format("{0}, {1}", s1, s2);
        },
        f5: function (familyName) {
            return System.String.format("\"{0}\"", familyName);
        }
    });

    Bridge.define("Granular.Host.Render.HtmlRenderElement", {
        inherits: [Granular.Host.IRenderItem],
        isRenderValid: false,
        renderQueue: null,
        config: {
            properties: {
                HtmlElement: null,
                Style: null
            },
            alias: [
            "render", "Granular$Host$IRenderItem$render"
            ]
        },
        ctor: function (renderQueue) {
            Granular.Host.Render.HtmlRenderElement.$ctor2.call(this, "div", "", renderQueue);
            //
        },
        $ctor1: function (htmlElementTagName, renderQueue) {
            Granular.Host.Render.HtmlRenderElement.$ctor2.call(this, htmlElementTagName, "", renderQueue);
            //
        },
        $ctor2: function (htmlElementTagName, htmlElementId, renderQueue) {
            this.$initialize();
            this.setHtmlElement(document.createElement(htmlElementTagName));
            this.renderQueue = renderQueue;

            if (!Granular.Extensions.StringExtensions.isNullOrEmpty(htmlElementId)) {
                this.getHtmlElement().id = htmlElementId;
            }

            this.setStyle(new Granular.Host.HtmlStyleDictionary(this.getHtmlElement()));
            this.getStyle().addInvalidated(Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlRenderElement.f1));

            this.isRenderValid = true;
        },
        invalidateRender: function () {
            if (!this.isRenderValid) {
                return;
            }

            this.isRenderValid = false;
            this.renderQueue.Granular$Host$IRenderQueue$add(this);
        },
        render: function () {
            this.isRenderValid = true;

            this.getStyle().apply();

            this.onRender();
        },
        onRender: function () {
            //
        }
    });

    Bridge.ns("Granular.Host.Render.HtmlRenderElement", $asm.$);

    Bridge.apply($asm.$.Granular.Host.Render.HtmlRenderElement, {
        f1: function (sender, e) {
            this.invalidateRender();
        }
    });

    Bridge.define("Granular.Host.RenderQueue", {
        inherits: [Granular.Host.IRenderQueue],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new Granular.Host.RenderQueue();
                }
            },
            render: function (items) {
                var $t;
                $t = Bridge.getEnumerator(items, Granular.Host.IRenderItem);
                while ($t.moveNext()) {
                    var item = $t.getCurrent();
                    item.Granular$Host$IRenderItem$render();
                }
            }
        },
        items: null,
        isRenderScheduled: false,
        config: {
            alias: [
            "add", "Granular$Host$IRenderQueue$add"
            ]
        },
        ctor: function () {
            this.$initialize();
            this.items = new (System.Collections.Generic.List$1(Granular.Host.IRenderItem))();
        },
        add: function (item) {
            this.items.add(item);

            if (!this.isRenderScheduled) {
                this.isRenderScheduled = true;
                System.Windows.Threading.Dispatcher.currentDispatcher.invokeAsync(Bridge.fn.bind(this, $asm.$.Granular.Host.RenderQueue.f1), System.Windows.Threading.DispatcherPriority.Render);
            }
        }
    });

    Bridge.ns("Granular.Host.RenderQueue", $asm.$);

    Bridge.apply($asm.$.Granular.Host.RenderQueue, {
        f1: function () {
            this.isRenderScheduled = false;

            var currentItems = this.items.toArray();
            this.items.clear();

            window.requestAnimationFrame(function (time) {
                Granular.Host.RenderQueue.render(currentItems);
            });
        }
    });

    Bridge.define("Granular.Host.Render.HtmlBorderRenderElement", {
        inherits: [Granular.Host.Render.HtmlRenderElement,System.Windows.Media.IBorderRenderElement],
        background: null,
        borderThickness: null,
        borderBrush: null,
        bounds: null,
        cornerRadius: null,
        isHitTestVisible: false,
        converter: null,
        config: {
            alias: [
            "getBackground", "System$Windows$Media$IBorderRenderElement$getBackground",
            "setBackground", "System$Windows$Media$IBorderRenderElement$setBackground",
            "getBorderThickness", "System$Windows$Media$IBorderRenderElement$getBorderThickness",
            "setBorderThickness", "System$Windows$Media$IBorderRenderElement$setBorderThickness",
            "getBorderBrush", "System$Windows$Media$IBorderRenderElement$getBorderBrush",
            "setBorderBrush", "System$Windows$Media$IBorderRenderElement$setBorderBrush",
            "getBounds", "System$Windows$Media$IBorderRenderElement$getBounds",
            "setBounds", "System$Windows$Media$IBorderRenderElement$setBounds",
            "getCornerRadius", "System$Windows$Media$IBorderRenderElement$getCornerRadius",
            "setCornerRadius", "System$Windows$Media$IBorderRenderElement$setCornerRadius",
            "getIsHitTestVisible", "System$Windows$Media$IBorderRenderElement$getIsHitTestVisible",
            "setIsHitTestVisible", "System$Windows$Media$IBorderRenderElement$setIsHitTestVisible"
            ]
        },
        ctor: function (renderQueue, converter) {
            this.$initialize();
            Granular.Host.Render.HtmlRenderElement.ctor.call(this, renderQueue);
            this.converter = converter;

            this.bounds = System.Windows.Rect.zero;
            this.borderThickness = System.Windows.Thickness.zero;
            this.cornerRadius = System.Windows.CornerRadius.zero;

            this.getStyle().setValue("background-clip", "content-box");

            this.setBackground$1();
            this.setBorderBrush$1();
            this.setBounds$1();
            this.setCornerRadius$1();
            this.setIsHitTestVisible$1();
        },
        getBackground: function () {
            return this.background;
        },
        setBackground: function (value) {
            if (Bridge.referenceEquals(this.background, value)) {
                return;
            }

            if (this.background != null) {
                this.background.removeChanged(Bridge.fn.cacheBind(this, this.onBackgroundChanged));
            }

            this.background = value;
            this.setBackground$1();
            this.setIsHitTestVisible$1();

            if (this.background != null) {
                this.background.addChanged(Bridge.fn.cacheBind(this, this.onBackgroundChanged));
            }
        },
        getBorderThickness: function () {
            return this.borderThickness;
        },
        setBorderThickness: function (value) {
            if (System.Windows.Thickness.op_Equality(this.borderThickness, value)) {
                return;
            }

            this.borderThickness = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBorderThickness(this.getStyle(), this.borderThickness, this.converter);
            this.setBounds$1();
            this.setBackground$1();
            this.setCornerRadius$1();
        },
        getBorderBrush: function () {
            return this.borderBrush;
        },
        setBorderBrush: function (value) {
            if (Bridge.referenceEquals(this.borderBrush, value)) {
                return;
            }

            if (this.borderBrush != null) {
                this.borderBrush.removeChanged(Bridge.fn.cacheBind(this, this.onBorderBrushChanged));
            }

            this.borderBrush = value;
            this.setBorderBrush$1();

            if (this.borderBrush != null) {
                this.borderBrush.addChanged(Bridge.fn.cacheBind(this, this.onBorderBrushChanged));
            }
        },
        getBounds: function () {
            return this.bounds;
        },
        setBounds: function (value) {
            if (System.Windows.Rect.op_Equality(this.bounds, value)) {
                return;
            }

            this.bounds = value;
            this.setBounds$1();
            this.setBackground$1();
            this.setBorderBrush$1();
        },
        getCornerRadius: function () {
            return this.cornerRadius;
        },
        setCornerRadius: function (value) {
            if (System.Windows.CornerRadius.op_Equality(this.cornerRadius, value)) {
                return;
            }

            this.cornerRadius = value;
            this.setCornerRadius$1();
        },
        getIsHitTestVisible: function () {
            return this.isHitTestVisible;
        },
        setIsHitTestVisible: function (value) {
            if (this.isHitTestVisible === value) {
                return;
            }

            this.isHitTestVisible = value;
            this.setIsHitTestVisible$1();
        },
        onBackgroundChanged: function (sender, e) {
            this.setBackground$1();
        },
        onBorderBrushChanged: function (sender, e) {
            this.setBorderBrush$1();
        },
        setBackground$1: function () {
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getStyle(), this.background, new System.Windows.Rect.$ctor2(this.getBorderThickness().getLocation(), System.Windows.SizeExtensions.max((System.Windows.Size.op_Subtraction(this.getBounds().getSize(), this.getBorderThickness().getSize())), System.Windows.Size.zero)), this.converter);
        },
        setBorderBrush$1: function () {
            Granular.Host.HtmlStyleDictionaryExtensions.setBorderBrush(this.getStyle(), this.getBorderBrush(), this.getBounds().getSize(), this.converter);
        },
        setBounds$1: function () {
            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), new System.Windows.Rect.$ctor2(this.getBounds().getLocation(), System.Windows.SizeExtensions.max((System.Windows.Size.op_Subtraction(this.getBounds().getSize(), this.getBorderThickness().getSize())), System.Windows.Size.zero)), this.converter);
        },
        setCornerRadius$1: function () {
            // CornerRadius is relative to the center of the border line, interpolate the outline radius
            var borderOutlineCornerRadius = System.Windows.CornerRadius.op_Equality(this.getCornerRadius(), System.Windows.CornerRadius.zero) ? System.Windows.CornerRadius.zero : new System.Windows.CornerRadius.$ctor1(this.getCornerRadius().getTopLeft() + (this.getBorderThickness().getTop() + this.getBorderThickness().getLeft()) / 4, this.getCornerRadius().getTopRight() + (this.getBorderThickness().getTop() + this.getBorderThickness().getRight()) / 4, this.getCornerRadius().getBottomRight() + (this.getBorderThickness().getBottom() + this.getBorderThickness().getRight()) / 4, this.getCornerRadius().getBottomLeft() + (this.getBorderThickness().getBottom() + this.getBorderThickness().getLeft()) / 4);

            Granular.Host.HtmlStyleDictionaryExtensions.setCornerRadius(this.getStyle(), borderOutlineCornerRadius, this.converter);
        },
        setIsHitTestVisible$1: function () {
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getStyle(), this.getIsHitTestVisible() && this.getBackground() != null);
        }
    });

    Bridge.define("Granular.Host.Render.HtmlImageRenderElement", {
        inherits: [Granular.Host.Render.HtmlRenderElement,System.Windows.Media.IImageRenderElement],
        bounds: null,
        source: null,
        converter: null,
        config: {
            alias: [
            "getBounds", "System$Windows$Media$IImageRenderElement$getBounds",
            "setBounds", "System$Windows$Media$IImageRenderElement$setBounds",
            "getSource", "System$Windows$Media$IImageRenderElement$getSource",
            "setSource", "System$Windows$Media$IImageRenderElement$setSource"
            ]
        },
        ctor: function (renderQueue, converter) {
            this.$initialize();
            Granular.Host.Render.HtmlRenderElement.ctor.call(this, renderQueue);
            this.converter = converter;

            this.bounds = System.Windows.Rect.zero;

            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.getBounds(), converter);
        },
        getBounds: function () {
            return this.bounds;
        },
        setBounds: function (value) {
            if (System.Windows.Rect.op_Equality(this.bounds, value)) {
                return;
            }

            this.bounds = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.bounds, this.converter);
            this.setSourceRect();
        },
        getSource: function () {
            return this.source;
        },
        setSource: function (value) {
            if (Bridge.referenceEquals(this.source, value)) {
                return;
            }

            this.source = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBackgroundImage(this.getStyle(), this.source, this.converter);
            this.setSourceRect();
        },
        setSourceRect: function () {
            if (this.getSource() == null || System.Windows.RectExtensions.isNullOrEmpty(this.getBounds()) || this.getBounds().getSize().getWidth() === 0 || this.getBounds().getSize().getHeight() === 0) {
                return;
            }

            var sourceRect = Bridge.cast(this.getSource().getRenderImageSource(), Granular.Host.RenderImageSource).getSourceRect();
            var imageSize = Bridge.cast(this.getSource().getRenderImageSource(), Granular.Host.RenderImageSource).getImageSize();

            if (!System.Windows.RectExtensions.isNullOrEmpty(sourceRect)) {
                var widthFactor = this.getBounds().getSize().getWidth() / sourceRect.getWidth();
                var heightFactor = this.getBounds().getSize().getHeight() / sourceRect.getHeight();

                var location = new System.Windows.Point.$ctor1(-sourceRect.getLeft() * widthFactor, -sourceRect.getTop() * heightFactor);
                var size = new System.Windows.Size(imageSize.getWidth() * widthFactor, imageSize.getHeight() * heightFactor);

                Granular.Host.HtmlStyleDictionaryExtensions.setBackgroundBounds(this.getStyle(), new System.Windows.Rect.$ctor2(location, size), this.converter);
            } else {
                Granular.Host.HtmlStyleDictionaryExtensions.setBackgroundBounds(this.getStyle(), new System.Windows.Rect.$ctor3(this.getBounds().getSize()), this.converter);
            }
        }
    });

    Bridge.define("Granular.Host.Render.HtmlTextBlockRenderElement", {
        inherits: [Granular.Host.Render.HtmlRenderElement,System.Windows.Media.ITextBlockRenderElement],
        text: null,
        bounds: null,
        foreground: null,
        fontFamily: null,
        fontSize: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontStretch: 0,
        textAlignment: 0,
        textTrimming: 0,
        textWrapping: 0,
        converter: null,
        isTextDirty: false,
        config: {
            alias: [
            "getText", "System$Windows$Media$ITextBlockRenderElement$getText",
            "setText", "System$Windows$Media$ITextBlockRenderElement$setText",
            "getBounds", "System$Windows$Media$ITextBlockRenderElement$getBounds",
            "setBounds", "System$Windows$Media$ITextBlockRenderElement$setBounds",
            "getForeground", "System$Windows$Media$ITextBlockRenderElement$getForeground",
            "setForeground", "System$Windows$Media$ITextBlockRenderElement$setForeground",
            "getFontFamily", "System$Windows$Media$ITextBlockRenderElement$getFontFamily",
            "setFontFamily", "System$Windows$Media$ITextBlockRenderElement$setFontFamily",
            "getFontSize", "System$Windows$Media$ITextBlockRenderElement$getFontSize",
            "setFontSize", "System$Windows$Media$ITextBlockRenderElement$setFontSize",
            "getFontStyle", "System$Windows$Media$ITextBlockRenderElement$getFontStyle",
            "setFontStyle", "System$Windows$Media$ITextBlockRenderElement$setFontStyle",
            "getFontWeight", "System$Windows$Media$ITextBlockRenderElement$getFontWeight",
            "setFontWeight", "System$Windows$Media$ITextBlockRenderElement$setFontWeight",
            "getFontStretch", "System$Windows$Media$ITextBlockRenderElement$getFontStretch",
            "setFontStretch", "System$Windows$Media$ITextBlockRenderElement$setFontStretch",
            "getTextAlignment", "System$Windows$Media$ITextBlockRenderElement$getTextAlignment",
            "setTextAlignment", "System$Windows$Media$ITextBlockRenderElement$setTextAlignment",
            "getTextTrimming", "System$Windows$Media$ITextBlockRenderElement$getTextTrimming",
            "setTextTrimming", "System$Windows$Media$ITextBlockRenderElement$setTextTrimming",
            "getTextWrapping", "System$Windows$Media$ITextBlockRenderElement$getTextWrapping",
            "setTextWrapping", "System$Windows$Media$ITextBlockRenderElement$setTextWrapping"
            ]
        },
        ctor: function (renderQueue, converter) {
            this.$initialize();
            Granular.Host.Render.HtmlRenderElement.ctor.call(this, renderQueue);
            this.converter = converter;

            this.bounds = System.Windows.Rect.zero;
            this.fontFamily = System.Windows.Media.FontFamily.default;
            this.fontSize = Number.NaN;

            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.getBounds(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getStyle(), this.getForeground(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontFamily(this.getStyle(), this.getFontFamily(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontSize(this.getStyle(), this.getFontSize(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStyle(this.getStyle(), this.getFontStyle(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontWeight(this.getStyle(), this.getFontWeight(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStretch(this.getStyle(), this.getFontStretch(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getStyle(), false);
            Granular.Host.HtmlStyleDictionaryExtensions.setTextAlignment(this.getStyle(), this.getTextAlignment(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setTextTrimming(this.getStyle(), this.getTextTrimming());
            Granular.Host.HtmlStyleDictionaryExtensions.setTextWrapping(this.getStyle(), this.getTextWrapping(), converter);
        },
        getText: function () {
            return this.text;
        },
        setText: function (value) {
            if (Bridge.referenceEquals(this.text, value)) {
                return;
            }

            this.text = value;
            this.isTextDirty = true;
            this.invalidateRender();
        },
        getBounds: function () {
            return this.bounds;
        },
        setBounds: function (value) {
            if (System.Windows.Rect.op_Equality(this.bounds, value)) {
                return;
            }

            this.bounds = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.bounds, this.converter);
        },
        getForeground: function () {
            return this.foreground;
        },
        setForeground: function (value) {
            if (Bridge.referenceEquals(this.foreground, value)) {
                return;
            }

            if (this.foreground != null) {
                this.foreground.removeChanged(Bridge.fn.cacheBind(this, this.onForegroundChanged));
            }

            this.foreground = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getStyle(), this.getForeground(), this.converter);

            if (this.foreground != null) {
                this.foreground.addChanged(Bridge.fn.cacheBind(this, this.onForegroundChanged));
            }
        },
        getFontFamily: function () {
            return this.fontFamily;
        },
        setFontFamily: function (value) {
            if (Bridge.referenceEquals(this.fontFamily, value)) {
                return;
            }

            this.fontFamily = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontFamily(this.getStyle(), this.fontFamily, this.converter);
        },
        getFontSize: function () {
            return this.fontSize;
        },
        setFontSize: function (value) {
            if (this.fontSize === value) {
                return;
            }

            this.fontSize = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontSize(this.getStyle(), this.fontSize, this.converter);
        },
        getFontStyle: function () {
            return this.fontStyle;
        },
        setFontStyle: function (value) {
            if (this.fontStyle === value) {
                return;
            }

            this.fontStyle = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStyle(this.getStyle(), this.fontStyle, this.converter);
        },
        getFontWeight: function () {
            return this.fontWeight;
        },
        setFontWeight: function (value) {
            if (this.fontWeight === value) {
                return;
            }

            this.fontWeight = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontWeight(this.getStyle(), this.fontWeight, this.converter);
        },
        getFontStretch: function () {
            return this.fontStretch;
        },
        setFontStretch: function (value) {
            if (this.fontStretch === value) {
                return;
            }

            this.fontStretch = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStretch(this.getStyle(), this.fontStretch, this.converter);
        },
        getTextAlignment: function () {
            return this.textAlignment;
        },
        setTextAlignment: function (value) {
            if (this.textAlignment === value) {
                return;
            }

            this.textAlignment = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setTextAlignment(this.getStyle(), this.textAlignment, this.converter);
        },
        getTextTrimming: function () {
            return this.textTrimming;
        },
        setTextTrimming: function (value) {
            if (this.textTrimming === value) {
                return;
            }

            this.textTrimming = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setTextTrimming(this.getStyle(), this.textTrimming);
        },
        getTextWrapping: function () {
            return this.textWrapping;
        },
        setTextWrapping: function (value) {
            if (this.textWrapping === value) {
                return;
            }

            this.textWrapping = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setTextWrapping(this.getStyle(), this.textWrapping, this.converter);
        },
        onRender: function () {
            if (this.isTextDirty) {
                this.getHtmlElement().textContent = this.text;
                this.isTextDirty = false;
            }
        },
        onForegroundChanged: function (sender, e) {
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getStyle(), this.getForeground(), this.converter);
        }
    });

    Bridge.define("Granular.Host.Render.HtmlTextBoxRenderElement", {
        inherits: [Granular.Host.Render.HtmlRenderElement,System.Windows.Media.ITextBoxRenderElement],
        contentElement: null,
        text: null,
        maxLength: 0,
        caretIndex: 0,
        selectionStart: 0,
        selectionLength: 0,
        isPassword: false,
        isReadOnly: false,
        spellCheck: false,
        bounds: null,
        foreground: null,
        fontFamily: null,
        fontSize: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontStretch: 0,
        textAlignment: 0,
        textTrimming: 0,
        textWrapping: 0,
        acceptsReturn: false,
        horizontalScrollBarVisibility: 0,
        verticalScrollBarVisibility: 0,
        isHitTestVisible: false,
        renderQueue$1: null,
        converter: null,
        isFocused: false,
        config: {
            events: {
                TextChanged: null,
                CaretIndexChanged: null,
                SelectionStartChanged: null,
                SelectionLengthChanged: null
            },
            properties: {
                AcceptsTab: false
            },
            alias: [
            "addTextChanged", "System$Windows$Media$ITextBoxRenderElement$addTextChanged",
            "removeTextChanged", "System$Windows$Media$ITextBoxRenderElement$removeTextChanged",
            "getText", "System$Windows$Media$ITextBoxRenderElement$getText",
            "setText", "System$Windows$Media$ITextBoxRenderElement$setText",
            "getMaxLength", "System$Windows$Media$ITextBoxRenderElement$getMaxLength",
            "setMaxLength", "System$Windows$Media$ITextBoxRenderElement$setMaxLength",
            "addCaretIndexChanged", "System$Windows$Media$ITextBoxRenderElement$addCaretIndexChanged",
            "removeCaretIndexChanged", "System$Windows$Media$ITextBoxRenderElement$removeCaretIndexChanged",
            "getCaretIndex", "System$Windows$Media$ITextBoxRenderElement$getCaretIndex",
            "setCaretIndex", "System$Windows$Media$ITextBoxRenderElement$setCaretIndex",
            "addSelectionStartChanged", "System$Windows$Media$ITextBoxRenderElement$addSelectionStartChanged",
            "removeSelectionStartChanged", "System$Windows$Media$ITextBoxRenderElement$removeSelectionStartChanged",
            "getSelectionStart", "System$Windows$Media$ITextBoxRenderElement$getSelectionStart",
            "setSelectionStart", "System$Windows$Media$ITextBoxRenderElement$setSelectionStart",
            "addSelectionLengthChanged", "System$Windows$Media$ITextBoxRenderElement$addSelectionLengthChanged",
            "removeSelectionLengthChanged", "System$Windows$Media$ITextBoxRenderElement$removeSelectionLengthChanged",
            "getSelectionLength", "System$Windows$Media$ITextBoxRenderElement$getSelectionLength",
            "setSelectionLength", "System$Windows$Media$ITextBoxRenderElement$setSelectionLength",
            "getIsPassword", "System$Windows$Media$ITextBoxRenderElement$getIsPassword",
            "setIsPassword", "System$Windows$Media$ITextBoxRenderElement$setIsPassword",
            "getIsReadOnly", "System$Windows$Media$ITextBoxRenderElement$getIsReadOnly",
            "setIsReadOnly", "System$Windows$Media$ITextBoxRenderElement$setIsReadOnly",
            "getSpellCheck", "System$Windows$Media$ITextBoxRenderElement$getSpellCheck",
            "setSpellCheck", "System$Windows$Media$ITextBoxRenderElement$setSpellCheck",
            "getBounds", "System$Windows$Media$ITextBoxRenderElement$getBounds",
            "setBounds", "System$Windows$Media$ITextBoxRenderElement$setBounds",
            "getForeground", "System$Windows$Media$ITextBoxRenderElement$getForeground",
            "setForeground", "System$Windows$Media$ITextBoxRenderElement$setForeground",
            "getFontFamily", "System$Windows$Media$ITextBoxRenderElement$getFontFamily",
            "setFontFamily", "System$Windows$Media$ITextBoxRenderElement$setFontFamily",
            "getFontSize", "System$Windows$Media$ITextBoxRenderElement$getFontSize",
            "setFontSize", "System$Windows$Media$ITextBoxRenderElement$setFontSize",
            "getFontStyle", "System$Windows$Media$ITextBoxRenderElement$getFontStyle",
            "setFontStyle", "System$Windows$Media$ITextBoxRenderElement$setFontStyle",
            "getFontWeight", "System$Windows$Media$ITextBoxRenderElement$getFontWeight",
            "setFontWeight", "System$Windows$Media$ITextBoxRenderElement$setFontWeight",
            "getFontStretch", "System$Windows$Media$ITextBoxRenderElement$getFontStretch",
            "setFontStretch", "System$Windows$Media$ITextBoxRenderElement$setFontStretch",
            "getTextAlignment", "System$Windows$Media$ITextBoxRenderElement$getTextAlignment",
            "setTextAlignment", "System$Windows$Media$ITextBoxRenderElement$setTextAlignment",
            "getTextWrapping", "System$Windows$Media$ITextBoxRenderElement$getTextWrapping",
            "setTextWrapping", "System$Windows$Media$ITextBoxRenderElement$setTextWrapping",
            "getAcceptsReturn", "System$Windows$Media$ITextBoxRenderElement$getAcceptsReturn",
            "setAcceptsReturn", "System$Windows$Media$ITextBoxRenderElement$setAcceptsReturn",
            "getHorizontalScrollBarVisibility", "System$Windows$Media$ITextBoxRenderElement$getHorizontalScrollBarVisibility",
            "setHorizontalScrollBarVisibility", "System$Windows$Media$ITextBoxRenderElement$setHorizontalScrollBarVisibility",
            "getVerticalScrollBarVisibility", "System$Windows$Media$ITextBoxRenderElement$getVerticalScrollBarVisibility",
            "setVerticalScrollBarVisibility", "System$Windows$Media$ITextBoxRenderElement$setVerticalScrollBarVisibility",
            "getIsHitTestVisible", "System$Windows$Media$ITextBoxRenderElement$getIsHitTestVisible",
            "setIsHitTestVisible", "System$Windows$Media$ITextBoxRenderElement$setIsHitTestVisible",
            "getAcceptsTab", "System$Windows$Media$ITextBoxRenderElement$getAcceptsTab",
            "setAcceptsTab", "System$Windows$Media$ITextBoxRenderElement$setAcceptsTab",
            "focus", "System$Windows$Media$ITextBoxRenderElement$focus",
            "clearFocus", "System$Windows$Media$ITextBoxRenderElement$clearFocus",
            "processKeyEvent", "System$Windows$Media$ITextBoxRenderElement$processKeyEvent"
            ]
        },
        ctor: function (renderQueue, converter) {
            this.$initialize();
            Granular.Host.Render.HtmlRenderElement.$ctor1.call(this, "div", renderQueue);
            this.renderQueue$1 = renderQueue;
            this.converter = converter;

            this.bounds = System.Windows.Rect.empty;
            this.fontFamily = System.Windows.Media.FontFamily.default;

            var styleElement = document.createElement("style");
            styleElement.textContent = "::-ms-clear { width: 0px; height: 0px; }";

            this.getHtmlElement().appendChild(styleElement);

            this.setContentElement$1();
        },
        getContentElement: function () {
            return this.contentElement;
        },
        setContentElement: function (value) {
            if (Bridge.referenceEquals(this.contentElement, value)) {
                return;
            }

            if (this.contentElement != null) {
                this.getHtmlElement().removeChild(this.contentElement.getHtmlElement());
            }

            this.contentElement = value;

            if (this.contentElement != null) {
                this.getHtmlElement().appendChild(this.contentElement.getHtmlElement());
            }
        },
        getText: function () {
            return this.text;
        },
        setText: function (value) {
            if (Bridge.referenceEquals(this.text, value)) {
                return;
            }

            this.text = value;

            this.setContentElementText();
            this.getContentElementSelection();
            Granular.Extensions.EventHandlerExtensions.raise$2(this.TextChanged, this);
        },
        getMaxLength: function () {
            return this.maxLength;
        },
        setMaxLength: function (value) {
            if (this.maxLength === value) {
                return;
            }

            this.maxLength = value;
            this.setContentElementMaxLength();
        },
        getCaretIndex: function () {
            return this.caretIndex;
        },
        setCaretIndex: function (value) {
            if (this.caretIndex === value) {
                return;
            }

            this.caretIndex = value;
            this.setContentElementCaretIndex();
            Granular.Extensions.EventHandlerExtensions.raise$2(this.CaretIndexChanged, this);
        },
        getSelectionStart: function () {
            return this.selectionStart;
        },
        setSelectionStart: function (value) {
            if (this.selectionStart === value) {
                return;
            }

            this.selectionStart = value;
            this.setContentElementSelectionStart();
            Granular.Extensions.EventHandlerExtensions.raise$2(this.SelectionStartChanged, this);
        },
        getSelectionLength: function () {
            return this.selectionLength;
        },
        setSelectionLength: function (value) {
            if (this.selectionLength === value) {
                return;
            }

            this.selectionLength = value;
            this.setContentElementSelectionLength();
            Granular.Extensions.EventHandlerExtensions.raise$2(this.SelectionLengthChanged, this);
        },
        getIsPassword: function () {
            return this.isPassword;
        },
        setIsPassword: function (value) {
            if (this.isPassword === value) {
                return;
            }

            this.isPassword = value;
            this.setContentElement$1();
        },
        getIsReadOnly: function () {
            return this.isReadOnly;
        },
        setIsReadOnly: function (value) {
            if (this.isReadOnly === value) {
                return;
            }

            this.isReadOnly = value;
            this.setContentElementIsReadOnly();
        },
        getSpellCheck: function () {
            return this.spellCheck;
        },
        setSpellCheck: function (value) {
            if (this.spellCheck === value) {
                return;
            }

            this.spellCheck = value;
            this.setContentElementSpellCheck();
        },
        getBounds: function () {
            return this.bounds;
        },
        setBounds: function (value) {
            if (System.Windows.Rect.op_Equality(this.bounds, value)) {
                return;
            }

            this.bounds = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.bounds, this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setSize(this.getContentElement().getStyle(), this.bounds.getSize(), this.converter);
        },
        getForeground: function () {
            return this.foreground;
        },
        setForeground: function (value) {
            if (Bridge.referenceEquals(this.foreground, value)) {
                return;
            }

            if (this.foreground != null) {
                this.foreground.removeChanged(Bridge.fn.cacheBind(this, this.onForegroundChanged));
            }

            this.foreground = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getContentElement().getStyle(), this.getForeground(), this.converter);

            if (this.foreground != null) {
                this.foreground.addChanged(Bridge.fn.cacheBind(this, this.onForegroundChanged));
            }
        },
        getFontFamily: function () {
            return this.fontFamily;
        },
        setFontFamily: function (value) {
            if (Bridge.referenceEquals(this.fontFamily, value)) {
                return;
            }

            this.fontFamily = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontFamily(this.getContentElement().getStyle(), this.fontFamily, this.converter);
        },
        getFontSize: function () {
            return this.fontSize;
        },
        setFontSize: function (value) {
            if (this.fontSize === value) {
                return;
            }

            this.fontSize = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontSize(this.getContentElement().getStyle(), this.fontSize, this.converter);
        },
        getFontStyle: function () {
            return this.fontStyle;
        },
        setFontStyle: function (value) {
            if (this.fontStyle === value) {
                return;
            }

            this.fontStyle = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStyle(this.getContentElement().getStyle(), this.fontStyle, this.converter);
        },
        getFontWeight: function () {
            return this.fontWeight;
        },
        setFontWeight: function (value) {
            if (this.fontWeight === value) {
                return;
            }

            this.fontWeight = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontWeight(this.getContentElement().getStyle(), this.fontWeight, this.converter);
        },
        getFontStretch: function () {
            return this.fontStretch;
        },
        setFontStretch: function (value) {
            if (this.fontStretch === value) {
                return;
            }

            this.fontStretch = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStretch(this.getContentElement().getStyle(), this.fontStretch, this.converter);
        },
        getTextAlignment: function () {
            return this.textAlignment;
        },
        setTextAlignment: function (value) {
            if (this.textAlignment === value) {
                return;
            }

            this.textAlignment = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setTextAlignment(this.getContentElement().getStyle(), this.textAlignment, this.converter);
        },
        getTextTrimming: function () {
            return this.textTrimming;
        },
        setTextTrimming: function (value) {
            if (this.textTrimming === value) {
                return;
            }

            this.textTrimming = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setTextTrimming(this.getContentElement().getStyle(), this.textTrimming);
        },
        getTextWrapping: function () {
            return this.textWrapping;
        },
        setTextWrapping: function (value) {
            if (this.textWrapping === value) {
                return;
            }

            this.textWrapping = value;
            this.setContentElementTextWrapping();
        },
        getAcceptsReturn: function () {
            return this.acceptsReturn;
        },
        setAcceptsReturn: function (value) {
            if (this.acceptsReturn === value) {
                return;
            }

            this.acceptsReturn = value;
            this.setContentElement$1();
        },
        getHorizontalScrollBarVisibility: function () {
            return this.horizontalScrollBarVisibility;
        },
        setHorizontalScrollBarVisibility: function (value) {
            if (this.horizontalScrollBarVisibility === value) {
                return;
            }

            this.horizontalScrollBarVisibility = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setHorizontalScrollBarVisibility(this.getContentElement().getStyle(), this.horizontalScrollBarVisibility, this.converter);
        },
        getVerticalScrollBarVisibility: function () {
            return this.verticalScrollBarVisibility;
        },
        setVerticalScrollBarVisibility: function (value) {
            if (this.verticalScrollBarVisibility === value) {
                return;
            }

            this.verticalScrollBarVisibility = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setVerticalScrollBarVisibility(this.getContentElement().getStyle(), this.verticalScrollBarVisibility, this.converter);
        },
        getIsHitTestVisible: function () {
            return this.isHitTestVisible;
        },
        setIsHitTestVisible: function (value) {
            if (this.isHitTestVisible === value) {
                return;
            }

            this.isHitTestVisible = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getContentElement().getStyle(), this.getIsHitTestVisible());
        },
        setContentElement$1: function () {
            if (this.getIsPassword() || !this.getAcceptsReturn()) {
                this.setContentElement(new Granular.Host.Render.HtmlRenderElement.$ctor1("input", this.renderQueue$1));
                this.getContentElement().getHtmlElement().setAttribute("type", this.getIsPassword() ? "password" : "text");
            } else {
                this.setContentElement(new Granular.Host.Render.HtmlRenderElement.$ctor1("textarea", this.renderQueue$1));
            }

            this.setContentElementText();
            this.setContentElementMaxLength();
            this.setContentElementSelectionStart();
            this.setContentElementSelectionLength();
            this.setContentElementIsReadOnly();
            this.setContentElementSpellCheck();
            this.setContentElementTextWrapping();

            this.getContentElement().getStyle().setValue("resize", "none");
            this.getContentElement().getStyle().setValue("margin", "0px");
            this.getContentElement().getStyle().setValue("padding", "0px");
            this.getContentElement().getStyle().setValue("border", "0px solid transparent");
            this.getContentElement().getStyle().setValue("outline", "1px solid transparent");
            this.getContentElement().getStyle().setValue("cursor", "inherit");
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getContentElement().getStyle(), System.Windows.Media.Brushes.getTransparent(), System.Windows.Rect.zero, this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setLocation(this.getContentElement().getStyle(), System.Windows.Point.zero, this.converter);

            Granular.Host.HtmlStyleDictionaryExtensions.setSize(this.getContentElement().getStyle(), this.getBounds().getSize(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getContentElement().getStyle(), this.getForeground(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontFamily(this.getContentElement().getStyle(), this.getFontFamily(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontSize(this.getContentElement().getStyle(), this.getFontSize(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStyle(this.getContentElement().getStyle(), this.getFontStyle(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontWeight(this.getContentElement().getStyle(), this.getFontWeight(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setFontStretch(this.getContentElement().getStyle(), this.getFontStretch(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getContentElement().getStyle(), this.getIsHitTestVisible());
            Granular.Host.HtmlStyleDictionaryExtensions.setTextAlignment(this.getContentElement().getStyle(), this.getTextAlignment(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setTextTrimming(this.getContentElement().getStyle(), this.getTextTrimming());
            Granular.Host.HtmlStyleDictionaryExtensions.setHorizontalScrollBarVisibility(this.getContentElement().getStyle(), this.getHorizontalScrollBarVisibility(), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setVerticalScrollBarVisibility(this.getContentElement().getStyle(), this.getVerticalScrollBarVisibility(), this.converter);

            this.getContentElement().getHtmlElement().oninput = Bridge.fn.combine(this.getContentElement().getHtmlElement().oninput, Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlTextBoxRenderElement.f1));
            this.getContentElement().getHtmlElement().onkeydown = Bridge.fn.combine(this.getContentElement().getHtmlElement().onkeydown, Bridge.fn.cacheBind(this, this.onContentElementKeyDown));
            this.getContentElement().getHtmlElement().onselect = Bridge.fn.combine(this.getContentElement().getHtmlElement().onselect, Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlTextBoxRenderElement.f2));
            this.getContentElement().getHtmlElement().onkeyup = Bridge.fn.combine(this.getContentElement().getHtmlElement().onkeyup, Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlTextBoxRenderElement.f2));
            this.getContentElement().getHtmlElement().onmouseup = Bridge.fn.combine(this.getContentElement().getHtmlElement().onmouseup, Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlTextBoxRenderElement.f2));
        },
        focus: function () {
            this.isFocused = true;
            this.getContentElement().getHtmlElement().focus();
        },
        clearFocus: function () {
            this.isFocused = false;
            this.getContentElement().getHtmlElement().blur();
        },
        onForegroundChanged: function (sender, e) {
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getContentElement().getStyle(), this.getForeground(), this.converter);
        },
        onContentElementKeyDown: function (e) {
            if (!this.getIsReadOnly() && this.getAcceptsTab() && Bridge.cast(e, KeyboardEvent).keyCode === 9) {
                var selectionStart = this.getSelectionStart();

                var contentElementText = this.getContentElement().getHtmlElement().value;
                this.setText(System.String.format("{0}\t{1}", contentElementText.substr(0, this.getSelectionStart()), contentElementText.substr(((this.getSelectionStart() + this.getSelectionLength()) | 0))));

                this.getContentElement().getHtmlElement().selectionStart = ((selectionStart + 1) | 0);
                this.getContentElement().getHtmlElement().selectionEnd = ((selectionStart + 1) | 0);
                this.getContentElementSelection();

                e.preventDefault();
            }
        },
        getContentElementSelection: function () {
            var selectionStart = this.getContentElement().getHtmlElement().selectionStart;
            var selectionEnd = this.getContentElement().getHtmlElement().selectionEnd;

            if (this.getSelectionStart() !== selectionStart || this.getSelectionLength() !== ((selectionEnd - selectionStart) | 0)) {
                var changeIndex = ((this.getSelectionStart() + this.getSelectionLength()) | 0) !== selectionEnd ? selectionEnd : selectionStart;

                this.setSelectionStart(selectionStart);
                this.setSelectionLength((selectionEnd - selectionStart) | 0);
                this.setCaretIndex(changeIndex);
            }
        },
        setContentElementCaretIndex: function () {
            var $t;
            if (this.isFocused && this.getCaretIndex() !== this.getSelectionStart() && this.getCaretIndex() !== ((this.getSelectionStart() + this.getSelectionLength()) | 0)) {
                this.getContentElement().getHtmlElement().focus();
                ($t=this.getCaretIndex(), this.getContentElement().getHtmlElement().setSelectionRange($t, $t));
            }
        },
        setContentElementSelectionStart: function () {
            if (this.getContentElement().getHtmlElement().selectionStart !== this.getSelectionStart()) {
                this.getContentElement().getHtmlElement().selectionStart = this.getSelectionStart();
            }
        },
        setContentElementSelectionLength: function () {
            if (this.getContentElement().getHtmlElement().selectionEnd !== ((this.getSelectionStart() + this.getSelectionLength()) | 0)) {
                this.getContentElement().getHtmlElement().selectionEnd = ((this.getSelectionStart() + this.getSelectionLength()) | 0);
            }
        },
        setContentElementText: function () {
            if (!Bridge.referenceEquals(this.getContentElement().getHtmlElement().value, Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(this.getText()))) {
                this.getContentElement().getHtmlElement().value = this.getText();
            }
        },
        setContentElementMaxLength: function () {
            if (this.maxLength > 0) {
                this.getContentElement().getHtmlElement().setAttribute("maxLength", this.maxLength.toString());
            } else {
                this.getContentElement().getHtmlElement().removeAttribute("maxLength");
            }
        },
        setContentElementIsReadOnly: function () {
            if (this.getIsReadOnly()) {
                this.getContentElement().getHtmlElement().setAttribute("readonly", "");
            } else {
                this.getContentElement().getHtmlElement().removeAttribute("readonly");
            }
        },
        setContentElementSpellCheck: function () {
            this.getContentElement().getHtmlElement().setAttribute("spellcheck", this.converter.Granular$Host$IHtmlValueConverter$toBooleanString(this.getSpellCheck()));
        },
        setContentElementTextWrapping: function () {
            this.getContentElement().getHtmlElement().setAttribute("wrap", this.converter.Granular$Host$IHtmlValueConverter$toWrapString(this.getTextWrapping()));
        },
        processKeyEvent: function (e) {
            e.setForceHostHandling(true);
            e.setHandled(true);
        }
    });

    Bridge.ns("Granular.Host.Render.HtmlTextBoxRenderElement", $asm.$);

    Bridge.apply($asm.$.Granular.Host.Render.HtmlTextBoxRenderElement, {
        f1: function (e) {
            this.setText(this.getContentElement().getHtmlElement().value);
        },
        f2: function (e) {
            this.getContentElementSelection();
        }
    });

    Bridge.define("Granular.Host.Render.HtmlVisualRenderElement", {
        inherits: [Granular.Host.Render.HtmlRenderElement,System.Windows.Media.IVisualRenderElement],
        statics: {
            elementTagNameCache: null,
            config: {
                init: function () {
                    this.elementTagNameCache = Granular.Collections.CacheDictionary$2(Function,String).createUsingStringKeys(Granular.Host.Render.HtmlVisualRenderElement.resolveElementTagName, $asm.$.Granular.Host.Render.HtmlVisualRenderElement.f1);
                }
            },
            getElementTagName: function (target) {
                return Granular.Host.Render.HtmlVisualRenderElement.elementTagNameCache.getValue(Bridge.getType(target));
            },
            resolveElementTagName: function (type) {
                var typeName = System.String.replaceAll(Bridge.Reflection.getTypeName(type), String.fromCharCode(36), String.fromCharCode(95));
                return System.Linq.Enumerable.from(Granular.Host.HtmlDefinition.tags).contains(typeName.toLowerCase()) ? System.String.format("{0}_", typeName) : typeName;
            },
            getElementId: function (target) {
                var nameAttribute = Bridge.as(System.Linq.Enumerable.from(Bridge.Reflection.getAttributes(Bridge.getType(target), System.Windows.Markup.RuntimeNamePropertyAttribute, true)).firstOrDefault(null, null), System.Windows.Markup.RuntimeNamePropertyAttribute);
                return nameAttribute != null ? Bridge.cast(Bridge.Reflection.midel(Bridge.Reflection.getMembers(Bridge.getType(target), 16, 284, nameAttribute.getName()).g, target)(), String) : "";
            }
        },
        background: null,
        bounds: null,
        clipToBounds: false,
        isHitTestVisible: false,
        isVisible: false,
        opacity: 0,
        transform: null,
        content: null,
        childrenStartIndex: 0,
        children: null,
        childrenActions: null,
        converter: null,
        config: {
            alias: [
            "getBackground", "System$Windows$Media$IVisualRenderElement$getBackground",
            "setBackground", "System$Windows$Media$IVisualRenderElement$setBackground",
            "getBounds", "System$Windows$Media$IVisualRenderElement$getBounds",
            "setBounds", "System$Windows$Media$IVisualRenderElement$setBounds",
            "getClipToBounds", "System$Windows$Media$IVisualRenderElement$getClipToBounds",
            "setClipToBounds", "System$Windows$Media$IVisualRenderElement$setClipToBounds",
            "getIsHitTestVisible", "System$Windows$Media$IVisualRenderElement$getIsHitTestVisible",
            "setIsHitTestVisible", "System$Windows$Media$IVisualRenderElement$setIsHitTestVisible",
            "getIsVisible", "System$Windows$Media$IVisualRenderElement$getIsVisible",
            "setIsVisible", "System$Windows$Media$IVisualRenderElement$setIsVisible",
            "getOpacity", "System$Windows$Media$IVisualRenderElement$getOpacity",
            "setOpacity", "System$Windows$Media$IVisualRenderElement$setOpacity",
            "getTransform", "System$Windows$Media$IVisualRenderElement$getTransform",
            "setTransform", "System$Windows$Media$IVisualRenderElement$setTransform",
            "getContent", "System$Windows$Media$IVisualRenderElement$getContent",
            "setContent", "System$Windows$Media$IVisualRenderElement$setContent",
            "getChildren", "System$Windows$Media$IVisualRenderElement$getChildren",
            "insertChild", "System$Windows$Media$IVisualRenderElement$insertChild",
            "removeChild", "System$Windows$Media$IVisualRenderElement$removeChild"
            ]
        },
        ctor: function (owner, renderQueue, converter) {
            this.$initialize();
            Granular.Host.Render.HtmlRenderElement.$ctor2.call(this, Granular.Host.Render.HtmlVisualRenderElement.getElementTagName(owner), Granular.Host.Render.HtmlVisualRenderElement.getElementId(owner), renderQueue);
            this.converter = converter;

            this.children = new (System.Collections.Generic.List$1(Object))();
            this.childrenActions = new (System.Collections.Generic.List$1(Function))();

            this.bounds = System.Windows.Rect.zero;
            this.isVisible = true;
            this.opacity = 1;
            this.transform = System.Windows.Media.Matrix.identity;

            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.getBounds(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setClipToBounds(this.getStyle(), this.getClipToBounds());
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getStyle(), this.getIsHitTestVisible() && this.getBackground() != null);
            Granular.Host.HtmlStyleDictionaryExtensions.setIsVisible(this.getStyle(), this.getIsVisible());
            Granular.Host.HtmlStyleDictionaryExtensions.setOpacity(this.getStyle(), this.getOpacity(), converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setTransform(this.getStyle(), this.getTransform(), converter);
        },
        getBackground: function () {
            return this.background;
        },
        setBackground: function (value) {
            if (Bridge.referenceEquals(this.background, value)) {
                return;
            }

            if (this.background != null) {
                this.background.removeChanged(Bridge.fn.cacheBind(this, this.onBackgroundChanged));
            }

            this.background = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getStyle(), this.background, new System.Windows.Rect.$ctor3(this.getBounds().getSize()), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getStyle(), this.getIsHitTestVisible() && this.background != null);

            if (this.background != null) {
                this.background.addChanged(Bridge.fn.cacheBind(this, this.onBackgroundChanged));
            }
        },
        getBounds: function () {
            return this.bounds;
        },
        setBounds: function (value) {
            if (System.Windows.Rect.op_Equality(this.bounds, value)) {
                return;
            }

            this.bounds = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBounds(this.getStyle(), this.bounds, this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getStyle(), this.background, new System.Windows.Rect.$ctor3(this.getBounds().getSize()), this.converter);
        },
        getClipToBounds: function () {
            return this.clipToBounds;
        },
        setClipToBounds: function (value) {
            if (this.clipToBounds === value) {
                return;
            }

            this.clipToBounds = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setClipToBounds(this.getStyle(), this.clipToBounds);
        },
        getIsHitTestVisible: function () {
            return this.isHitTestVisible;
        },
        setIsHitTestVisible: function (value) {
            if (this.isHitTestVisible === value) {
                return;
            }

            this.isHitTestVisible = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getStyle(), this.isHitTestVisible && this.getBackground() != null);
        },
        getIsVisible: function () {
            return this.isVisible;
        },
        setIsVisible: function (value) {
            if (this.isVisible === value) {
                return;
            }

            this.isVisible = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setIsVisible(this.getStyle(), this.isVisible);
        },
        getOpacity: function () {
            return this.opacity;
        },
        setOpacity: function (value) {
            if (this.opacity === value) {
                return;
            }

            this.opacity = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setOpacity(this.getStyle(), this.opacity, this.converter);
        },
        getTransform: function () {
            return this.transform;
        },
        setTransform: function (value) {
            if (System.Windows.Media.Matrix.op_Equality(this.transform, value)) {
                return;
            }

            this.transform = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setTransform(this.getStyle(), this.transform, this.converter);
        },
        getContent: function () {
            return this.content;
        },
        setContent: function (value) {
            if (Bridge.referenceEquals(this.content, value)) {
                return;
            }

            if (this.content != null) {
                this.childrenActions.add(Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlVisualRenderElement.f2));
            }

            this.content = value;

            if (this.content != null) {
                this.childrenActions.add(Bridge.fn.bind(this, $asm.$.Granular.Host.Render.HtmlVisualRenderElement.f3));
            }
        },
        getChildren: function () {
            return this.children;
        },
        onRender: function () {
            var $t;
            $t = Bridge.getEnumerator(this.childrenActions);
            while ($t.moveNext()) {
                var action = $t.getCurrent();
                action();
            }

            this.childrenActions.clear();
        },
        insertChild: function (index, child) {
            if (!(Bridge.is(child, Granular.Host.Render.HtmlRenderElement))) {
                throw new Granular.Exception("Can't add child of type \"{0}\"", [Bridge.Reflection.getTypeName(Bridge.getType(child))]);
            }

            this.children.insert(index, child);

            this.childrenActions.add(Bridge.fn.bind(this, function () {
                this.insertChildElement(((index + this.childrenStartIndex) | 0), Bridge.cast(child, Granular.Host.Render.HtmlRenderElement).getHtmlElement());
            }));

            this.invalidateRender();
        },
        removeChild: function (child) {
            if (!(Bridge.is(child, Granular.Host.Render.HtmlRenderElement))) {
                throw new Granular.Exception("Can't remove child of type \"{0}\"", [Bridge.Reflection.getTypeName(Bridge.getType(child))]);
            }

            var childIndex = this.children.indexOf(child);

            if (childIndex !== -1) {
                this.children.removeAt(childIndex);
                this.childrenActions.add(Bridge.fn.bind(this, function () {
                    this.getHtmlElement().removeChild(Bridge.cast(child, Granular.Host.Render.HtmlRenderElement).getHtmlElement());
                }));
            }

            this.invalidateRender();
        },
        insertChildElement: function (index, child) {
            if (index < this.getHtmlElement().childElementCount) {
                this.getHtmlElement().insertBefore(child, this.getHtmlElement().children[index]);
            } else {
                this.getHtmlElement().appendChild(child);
            }
        },
        removeChildElement: function (child) {
            this.getHtmlElement().removeChild(child);
        },
        onBackgroundChanged: function (sender, e) {
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getStyle(), this.background, new System.Windows.Rect.$ctor3(this.getBounds().getSize()), this.converter);
        }
    });

    Bridge.ns("Granular.Host.Render.HtmlVisualRenderElement", $asm.$);

    Bridge.apply($asm.$.Granular.Host.Render.HtmlVisualRenderElement, {
        f1: function (type) {
            return Bridge.Reflection.getTypeFullName(type);
        },
        f2: function () {
            this.removeChildElement(Bridge.cast(this.content, Granular.Host.Render.HtmlRenderElement).getHtmlElement());
            this.childrenStartIndex = (this.childrenStartIndex - 1) | 0;
        },
        f3: function () {
            this.insertChildElement(0, Bridge.cast(this.content, Granular.Host.Render.HtmlRenderElement).getHtmlElement());
            this.childrenStartIndex = (this.childrenStartIndex + 1) | 0;
        }
    });
});
