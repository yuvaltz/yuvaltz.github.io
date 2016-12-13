/**
 * @version 0.2.0.0
 * @copyright Copyright ☺ 2016
 * @compiler Bridge.NET 15.5.0
 */
Bridge.assembly("Granular.Host", function ($asm, globals) {
    "use strict";

    Bridge.define("Granular.Host.ElementExtensions");

    Bridge.define("Granular.Host.HtmlDefinition", {
        statics: {
            tags: null,
            config: {
                init: function () {
                    this.tags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"];
                }
            }
        }
    });

    Bridge.define("Granular.Host.HtmlStyleDictionary", {
        isValid: false,
        element: null,
        dictionary: null,
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

            this.dictionary = new (System.Collections.Generic.Dictionary$2(String,String))();
            this.setProperties = new (System.Collections.Generic.Dictionary$2(String,String))();
            this.clearProperties = new (System.Collections.Generic.HashSet$1(String))();

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
            var currentValue = { };
            if (this.dictionary.tryGetValue(key, currentValue) && Bridge.referenceEquals(currentValue.v, value)) {
                return;
            }

            this.dictionary.set(key, value);
            this.setProperties.set(key, value);
            this.clearProperties.remove(key);

            this.setIsValid(false);
        },
        clearValue: function (key) {
            if (!this.dictionary.containsKey(key)) {
                return;
            }

            this.dictionary.remove(key);
            this.setProperties.remove(key);
            this.clearProperties.add(key);

            this.setIsValid(false);
        },
        apply: function () {
            var $t, $t1;
            if (this.getIsValid()) {
                return;
            }

            $t = Bridge.getEnumerator(this.setProperties);
            while ($t.moveNext()) {
                var pair = $t.getCurrent();
                this.element.style.setProperty(pair.key, pair.value);
            }

            $t1 = Bridge.getEnumerator(this.clearProperties);
            while ($t1.moveNext()) {
                var key = $t1.getCurrent();
                this.element.style.removeProperty(key);
            }

            this.setProperties.clear();
            this.clearProperties.clear();

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

            window.onkeydown = Bridge.fn.bind(this, this.onKeyDown);
            window.onkeyup = Bridge.fn.bind(this, this.onKeyUp);
            window.onkeypress = Bridge.fn.bind(this, this.preventKeyboardHandled);
            window.onmousemove = Bridge.fn.bind(this, this.onMouseMove);
            window.onmousedown = Bridge.fn.bind(this, this.onMouseDown);
            window.onmouseup = Bridge.fn.bind(this, this.onMouseUp);
            window.onscroll = Bridge.fn.bind(this, this.onMouseWheel);
            window.onfocus = Bridge.fn.bind(this, $asm.$.Granular.Host.PresentationSource.f1);
            window.onblur = Bridge.fn.bind(this, $asm.$.Granular.Host.PresentationSource.f2);
            window.onresize = Bridge.fn.bind(this, $asm.$.Granular.Host.PresentationSource.f3);
            window.onclick = Bridge.fn.bind(this, this.preventMouseHandled);
            window.oncontextmenu = Bridge.fn.bind(this, this.preventMouseHandled);
            window.addEventListener("ondblclick", Bridge.fn.bind(this, this.preventMouseHandled));
            window.addEventListener("wheel", Bridge.fn.bind(this, this.onMouseWheel));

            this.setRootElementSize();
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

            this.image.addEventListener("load", Bridge.fn.bind(this, this.onImageLoad));
            this.image.addEventListener("error", Bridge.fn.bind(this, this.onImageError));
            this.image.addEventListener("abort", Bridge.fn.bind(this, this.onImageAbort));

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
            this.objectUrlCache = new (Granular.Collections.CacheDictionary$2(String,String)).ctor(Bridge.fn.bind(this, this.resolveObjectUrl));
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
                this.background.removeChanged(Bridge.fn.bind(this, this.onBackgroundChanged));
            }

            this.background = value;
            this.setBackground$1();
            this.setIsHitTestVisible$1();

            if (this.background != null) {
                this.background.addChanged(Bridge.fn.bind(this, this.onBackgroundChanged));
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
                this.borderBrush.removeChanged(Bridge.fn.bind(this, this.onBorderBrushChanged));
            }

            this.borderBrush = value;
            this.setBorderBrush$1();

            if (this.borderBrush != null) {
                this.borderBrush.addChanged(Bridge.fn.bind(this, this.onBorderBrushChanged));
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
                this.foreground.removeChanged(Bridge.fn.bind(this, this.onForegroundChanged));
            }

            this.foreground = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getStyle(), this.getForeground(), this.converter);

            if (this.foreground != null) {
                this.foreground.addChanged(Bridge.fn.bind(this, this.onForegroundChanged));
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
                this.foreground.removeChanged(Bridge.fn.bind(this, this.onForegroundChanged));
            }

            this.foreground = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setForeground(this.getContentElement().getStyle(), this.getForeground(), this.converter);

            if (this.foreground != null) {
                this.foreground.addChanged(Bridge.fn.bind(this, this.onForegroundChanged));
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
            this.getContentElement().getHtmlElement().onkeydown = Bridge.fn.combine(this.getContentElement().getHtmlElement().onkeydown, Bridge.fn.bind(this, this.onContentElementKeyDown));
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
            getElementTagName: function (target) {
                var typeName = System.String.replaceAll(Bridge.Reflection.getTypeName(Bridge.getType(target)), String.fromCharCode(36), String.fromCharCode(95));
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
                this.background.removeChanged(Bridge.fn.bind(this, this.onBackgroundChanged));
            }

            this.background = value;
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getStyle(), this.background, new System.Windows.Rect.$ctor3(this.getBounds().getSize()), this.converter);
            Granular.Host.HtmlStyleDictionaryExtensions.setIsHitTestVisible(this.getStyle(), this.getIsHitTestVisible() && this.background != null);

            if (this.background != null) {
                this.background.addChanged(Bridge.fn.bind(this, this.onBackgroundChanged));
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

            if (index < this.children.getCount()) {
                this.children.insert(index, child);
                this.childrenActions.add(Bridge.fn.bind(this, function () {
                    this.getHtmlElement().insertBefore(Bridge.cast(child, Granular.Host.Render.HtmlRenderElement).getHtmlElement(), this.getHtmlElement().children[index]);
                }));
            } else {
                this.children.add(child);
                this.childrenActions.add(Bridge.fn.bind(this, function () {
                    this.getHtmlElement().appendChild(Bridge.cast(child, Granular.Host.Render.HtmlRenderElement).getHtmlElement());
                }));
            }

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
        onBackgroundChanged: function (sender, e) {
            Granular.Host.HtmlStyleDictionaryExtensions.setBackground(this.getStyle(), this.background, new System.Windows.Rect.$ctor3(this.getBounds().getSize()), this.converter);
        }
    });

    var $m = Bridge.setMetadata,
        $n = [System,System.Windows,System.Windows.Data,Granular.Collections,System.Windows.Input,System.Windows.Media,System.Reflection,System.Collections.Generic,System.Windows.Media.Animation,System.Collections.ObjectModel,System.Collections,System.Windows.Controls,System.Windows.Controls.Primitives,System.Windows.Documents,System.Windows.Media.Imaging,System.Windows.Markup];
    $m($n[1].Application, function () { return {"m":[{"a":2,"n":"BaseUri","t":16,"rt":$n[0].Uri,"g":{"a":2,"n":"get_BaseUri","t":8,"sn":"getBaseUri","rt":$n[0].Uri},"s":{"a":2,"n":"set_BaseUri","t":8,"pi":[{"n":"value","pt":$n[0].Uri,"ps":0}],"sn":"setBaseUri","rt":Object,"p":[$n[0].Uri]}},{"a":2,"n":"MainWindow","t":16,"rt":$n[1].Window,"g":{"a":2,"n":"get_MainWindow","t":8,"sn":"getMainWindow","rt":$n[1].Window},"s":{"a":2,"n":"set_MainWindow","t":8,"pi":[{"n":"value","pt":$n[1].Window,"ps":0}],"sn":"setMainWindow","rt":Object,"p":[$n[1].Window]}},{"a":2,"n":"Resources","t":16,"rt":$n[1].ResourceDictionary,"g":{"a":2,"n":"get_Resources","t":8,"sn":"getResources","rt":$n[1].ResourceDictionary},"s":{"a":2,"n":"set_Resources","t":8,"pi":[{"n":"value","pt":$n[1].ResourceDictionary,"ps":0}],"sn":"setResources","rt":Object,"p":[$n[1].ResourceDictionary]}},{"a":2,"n":"StartupUri","t":16,"rt":$n[0].Uri,"g":{"a":2,"n":"get_StartupUri","t":8,"sn":"getStartupUri","rt":$n[0].Uri},"s":{"a":2,"n":"set_StartupUri","t":8,"pi":[{"n":"value","pt":$n[0].Uri,"ps":0}],"sn":"setStartupUri","rt":Object,"p":[$n[0].Uri]}},{"a":2,"n":"LoadCompleted","t":2,"ad":{"a":2,"n":"add_LoadCompleted","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addLoadCompleted","rt":Object,"p":[Function]},"r":{"a":2,"n":"remove_LoadCompleted","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeLoadCompleted","rt":Object,"p":[Function]}},{"a":2,"n":"ResourcesChanged","t":2,"ad":{"a":2,"n":"add_ResourcesChanged","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addResourcesChanged","rt":Object,"p":[Function]},"r":{"a":2,"n":"remove_ResourcesChanged","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeResourcesChanged","rt":Object,"p":[Function]}},{"a":2,"n":"Startup","t":2,"ad":{"a":2,"n":"add_Startup","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"addStartup","rt":Object,"p":[Function]},"r":{"a":2,"n":"remove_Startup","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"removeStartup","rt":Object,"p":[Function]}}]}; });
    $m($n[1].Condition, function () { return {"m":[{"a":2,"n":"Binding","t":16,"rt":$n[2].Binding,"g":{"a":2,"n":"get_Binding","t":8,"sn":"getBinding","rt":$n[2].Binding},"s":{"a":2,"n":"set_Binding","t":8,"pi":[{"n":"value","pt":$n[2].Binding,"ps":0}],"sn":"setBinding","rt":Object,"p":[$n[2].Binding]}},{"a":2,"n":"Property","t":16,"rt":$n[1].IPropertyPathElement,"g":{"a":2,"n":"get_Property","t":8,"sn":"getProperty","rt":$n[1].IPropertyPathElement},"s":{"a":2,"n":"set_Property","t":8,"pi":[{"n":"value","pt":$n[1].IPropertyPathElement,"ps":0}],"sn":"setProperty","rt":Object,"p":[$n[1].IPropertyPathElement]}},{"a":2,"n":"SourceName","t":16,"rt":String,"g":{"a":2,"n":"get_SourceName","t":8,"sn":"getSourceName","rt":String},"s":{"a":2,"n":"set_SourceName","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setSourceName","rt":Object,"p":[String]}},{"a":2,"n":"Value","t":16,"rt":Object,"g":{"a":2,"n":"get_Value","t":8,"sn":"getValue","rt":Object},"s":{"a":2,"n":"set_Value","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setValue","rt":Object,"p":[Object]}}]}; });
    $m($n[1].DataTemplate, function () { return {"at":[new System.Windows.Markup.DictionaryKeyPropertyAttribute("Key")],"m":[{"a":2,"n":"DataType","t":16,"rt":Function,"g":{"a":2,"n":"get_DataType","t":8,"sn":"getDataType","rt":Function},"s":{"a":2,"n":"set_DataType","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setDataType","rt":Object,"p":[Function]}},{"a":2,"n":"Key","t":16,"rt":Object,"g":{"a":2,"n":"get_Key","t":8,"sn":"getKey","rt":Object},"s":{"a":2,"n":"set_Key","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setKey","rt":Object,"p":[Object]}}]}; });
    $m($n[1].DataTrigger, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Setters")],"m":[{"a":2,"n":"Binding","t":16,"rt":$n[2].Binding,"g":{"a":2,"n":"get_Binding","t":8,"sn":"getBinding","rt":$n[2].Binding},"s":{"a":2,"n":"set_Binding","t":8,"pi":[{"n":"value","pt":$n[2].Binding,"ps":0}],"sn":"setBinding","rt":Object,"p":[$n[2].Binding]}},{"a":2,"n":"Setters","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"g":{"a":2,"n":"get_Setters","t":8,"sn":"getSetters","rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction)},"s":{"a":1,"n":"set_Setters","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"ps":0}],"sn":"setSetters","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITriggerAction)]}},{"a":2,"n":"Value","t":16,"rt":Object,"g":{"a":2,"n":"get_Value","t":8,"sn":"getValue$5","rt":Object},"s":{"a":2,"n":"set_Value","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setValue$5","rt":Object,"p":[Object]}}]}; });
    $m($n[1].DynamicResourceExtension, function () { return {"at":[new System.Windows.Markup.MarkupExtensionParameterAttribute("ResourceKey", 0)],"m":[{"a":2,"n":"ResourceKey","t":16,"rt":Object,"g":{"a":2,"n":"get_ResourceKey","t":8,"sn":"getResourceKey","rt":Object},"s":{"a":2,"n":"set_ResourceKey","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setResourceKey","rt":Object,"p":[Object]}}]}; });
    $m($n[1].EventSetter, function () { return {"m":[{"a":2,"n":"Event","t":16,"rt":$n[1].RoutedEvent,"g":{"a":2,"n":"get_Event","t":8,"sn":"getEvent","rt":$n[1].RoutedEvent},"s":{"a":2,"n":"set_Event","t":8,"pi":[{"n":"value","pt":$n[1].RoutedEvent,"ps":0}],"sn":"setEvent","rt":Object,"p":[$n[1].RoutedEvent]}},{"a":2,"n":"HandledEventsToo","t":16,"rt":Boolean,"g":{"a":2,"n":"get_HandledEventsToo","t":8,"sn":"getHandledEventsToo","rt":Boolean},"s":{"a":2,"n":"set_HandledEventsToo","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setHandledEventsToo","rt":Object,"p":[Boolean]}},{"a":2,"n":"Handler","t":16,"rt":Function,"g":{"a":2,"n":"get_Handler","t":8,"sn":"getHandler","rt":Function},"s":{"a":2,"n":"set_Handler","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setHandler","rt":Object,"p":[Function]}}]}; });
    $m($n[1].EventTrigger, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Actions")],"m":[{"a":2,"n":"Actions","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"g":{"a":2,"n":"get_Actions","t":8,"sn":"getActions","rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction)},"s":{"a":1,"n":"set_Actions","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"ps":0}],"sn":"setActions","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITriggerAction)]}},{"a":2,"n":"RoutedEvent","t":16,"rt":$n[1].RoutedEvent,"g":{"a":2,"n":"get_RoutedEvent","t":8,"sn":"getRoutedEvent","rt":$n[1].RoutedEvent},"s":{"a":2,"n":"set_RoutedEvent","t":8,"pi":[{"n":"value","pt":$n[1].RoutedEvent,"ps":0}],"sn":"setRoutedEvent","rt":Object,"p":[$n[1].RoutedEvent]}},{"a":2,"n":"SourceName","t":16,"rt":String,"g":{"a":2,"n":"get_SourceName","t":8,"sn":"getSourceName","rt":String},"s":{"a":2,"n":"set_SourceName","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setSourceName","rt":Object,"p":[String]}}]}; });
    $m($n[1].FrameworkElement, function () { return {"at":[new System.Windows.Markup.RuntimeNamePropertyAttribute("Name")],"m":[{"a":2,"n":"ActualHeight","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_ActualHeight","t":8,"sn":"getActualHeight","rt":$n[0].Double},"s":{"a":1,"n":"set_ActualHeight","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setActualHeight","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"ActualSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_ActualSize","t":8,"sn":"getActualSize","rt":$n[1].Size},"s":{"a":1,"n":"set_ActualSize","t":8,"pi":[{"n":"value","pt":$n[1].Size,"ps":0}],"sn":"setActualSize","rt":Object,"p":[$n[1].Size]}},{"a":2,"n":"ActualWidth","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_ActualWidth","t":8,"sn":"getActualWidth","rt":$n[0].Double},"s":{"a":1,"n":"set_ActualWidth","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setActualWidth","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"Cursor","t":16,"rt":$n[4].Cursor,"g":{"a":2,"n":"get_Cursor","t":8,"sn":"getCursor","rt":$n[4].Cursor},"s":{"a":2,"n":"set_Cursor","t":8,"pi":[{"n":"value","pt":$n[4].Cursor,"ps":0}],"sn":"setCursor","rt":Object,"p":[$n[4].Cursor]}},{"a":2,"n":"DataContext","t":16,"rt":Object,"g":{"a":2,"n":"get_DataContext","t":8,"sn":"getDataContext","rt":Object},"s":{"a":2,"n":"set_DataContext","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setDataContext","rt":Object,"p":[Object]}},{"a":2,"n":"FocusVisualStyle","t":16,"rt":$n[1].Style,"g":{"a":2,"n":"get_FocusVisualStyle","t":8,"sn":"getFocusVisualStyle","rt":$n[1].Style},"s":{"a":2,"n":"set_FocusVisualStyle","t":8,"pi":[{"n":"value","pt":$n[1].Style,"ps":0}],"sn":"setFocusVisualStyle","rt":Object,"p":[$n[1].Style]}},{"a":2,"n":"ForceCursor","t":16,"rt":Boolean,"g":{"a":2,"n":"get_ForceCursor","t":8,"sn":"getForceCursor","rt":Boolean},"s":{"a":2,"n":"set_ForceCursor","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setForceCursor","rt":Object,"p":[Boolean]}},{"a":2,"n":"Height","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Height","t":8,"sn":"getHeight","rt":$n[0].Double},"s":{"a":2,"n":"set_Height","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setHeight","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"HorizontalAlignment","t":16,"rt":$n[1].HorizontalAlignment,"g":{"a":2,"n":"get_HorizontalAlignment","t":8,"sn":"getHorizontalAlignment","rt":$n[1].HorizontalAlignment},"s":{"a":2,"n":"set_HorizontalAlignment","t":8,"pi":[{"n":"value","pt":$n[1].HorizontalAlignment,"ps":0}],"sn":"setHorizontalAlignment","rt":Object,"p":[$n[1].HorizontalAlignment]}},{"a":2,"n":"IsInitialized","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsInitialized","t":8,"sn":"getIsInitialized","rt":Boolean},"s":{"a":1,"n":"set_IsInitialized","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsInitialized","rt":Object,"p":[Boolean]}},{"a":2,"n":"LayoutTransform","t":16,"rt":$n[5].Transform,"g":{"a":2,"n":"get_LayoutTransform","t":8,"sn":"getLayoutTransform","rt":$n[5].Transform},"s":{"a":2,"n":"set_LayoutTransform","t":8,"pi":[{"n":"value","pt":$n[5].Transform,"ps":0}],"sn":"setLayoutTransform","rt":Object,"p":[$n[5].Transform]}},{"a":2,"n":"Margin","t":16,"rt":$n[1].Thickness,"g":{"a":2,"n":"get_Margin","t":8,"sn":"getMargin","rt":$n[1].Thickness},"s":{"a":2,"n":"set_Margin","t":8,"pi":[{"n":"value","pt":$n[1].Thickness,"ps":0}],"sn":"setMargin","rt":Object,"p":[$n[1].Thickness]}},{"a":2,"n":"MaxHeight","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_MaxHeight","t":8,"sn":"getMaxHeight","rt":$n[0].Double},"s":{"a":2,"n":"set_MaxHeight","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setMaxHeight","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"MaxSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_MaxSize","t":8,"sn":"getMaxSize","rt":$n[1].Size},"s":{"a":1,"n":"set_MaxSize","t":8,"pi":[{"n":"value","pt":$n[1].Size,"ps":0}],"sn":"setMaxSize","rt":Object,"p":[$n[1].Size]}},{"a":2,"n":"MaxWidth","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_MaxWidth","t":8,"sn":"getMaxWidth","rt":$n[0].Double},"s":{"a":2,"n":"set_MaxWidth","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setMaxWidth","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"MinHeight","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_MinHeight","t":8,"sn":"getMinHeight","rt":$n[0].Double},"s":{"a":2,"n":"set_MinHeight","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setMinHeight","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"MinSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_MinSize","t":8,"sn":"getMinSize","rt":$n[1].Size},"s":{"a":1,"n":"set_MinSize","t":8,"pi":[{"n":"value","pt":$n[1].Size,"ps":0}],"sn":"setMinSize","rt":Object,"p":[$n[1].Size]}},{"a":2,"n":"MinWidth","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_MinWidth","t":8,"sn":"getMinWidth","rt":$n[0].Double},"s":{"a":2,"n":"set_MinWidth","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setMinWidth","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"Name","t":16,"rt":String,"g":{"a":2,"n":"get_Name","t":8,"sn":"getName","rt":String},"s":{"a":2,"n":"set_Name","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setName","rt":Object,"p":[String]}},{"a":2,"n":"Resources","t":16,"rt":$n[1].ResourceDictionary,"g":{"a":2,"n":"get_Resources","t":8,"sn":"getResources","rt":$n[1].ResourceDictionary},"s":{"a":2,"n":"set_Resources","t":8,"pi":[{"n":"value","pt":$n[1].ResourceDictionary,"ps":0}],"sn":"setResources","rt":Object,"p":[$n[1].ResourceDictionary]}},{"a":2,"n":"Size","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_Size","t":8,"sn":"getSize","rt":$n[1].Size},"s":{"a":1,"n":"set_Size","t":8,"pi":[{"n":"value","pt":$n[1].Size,"ps":0}],"sn":"setSize","rt":Object,"p":[$n[1].Size]}},{"a":2,"n":"Style","t":16,"rt":$n[1].Style,"g":{"a":2,"n":"get_Style","t":8,"sn":"getStyle","rt":$n[1].Style},"s":{"a":2,"n":"set_Style","t":8,"pi":[{"n":"value","pt":$n[1].Style,"ps":0}],"sn":"setStyle","rt":Object,"p":[$n[1].Style]}},{"a":2,"n":"TemplateChild","t":16,"rt":$n[1].UIElement,"g":{"a":2,"n":"get_TemplateChild","t":8,"sn":"getTemplateChild","rt":$n[1].UIElement},"s":{"a":2,"n":"set_TemplateChild","t":8,"pi":[{"n":"value","pt":$n[1].UIElement,"ps":0}],"sn":"setTemplateChild","rt":Object,"p":[$n[1].UIElement]}},{"a":2,"n":"TemplatedParent","t":16,"rt":$n[1].FrameworkElement,"g":{"a":2,"n":"get_TemplatedParent","t":8,"sn":"getTemplatedParent","rt":$n[1].FrameworkElement},"s":{"a":4,"n":"set_TemplatedParent","t":8,"pi":[{"n":"value","pt":$n[1].FrameworkElement,"ps":0}],"sn":"setTemplatedParent","rt":Object,"p":[$n[1].FrameworkElement]}},{"a":2,"n":"Triggers","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITrigger),"g":{"a":2,"n":"get_Triggers","t":8,"sn":"getTriggers","rt":$n[3].ObservableCollection$1(System.Windows.ITrigger)},"s":{"a":1,"n":"set_Triggers","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITrigger),"ps":0}],"sn":"setTriggers","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITrigger)]}},{"a":2,"n":"VerticalAlignment","t":16,"rt":$n[1].VerticalAlignment,"g":{"a":2,"n":"get_VerticalAlignment","t":8,"sn":"getVerticalAlignment","rt":$n[1].VerticalAlignment},"s":{"a":2,"n":"set_VerticalAlignment","t":8,"pi":[{"n":"value","pt":$n[1].VerticalAlignment,"ps":0}],"sn":"setVerticalAlignment","rt":Object,"p":[$n[1].VerticalAlignment]}},{"a":2,"n":"Width","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Width","t":8,"sn":"getWidth","rt":$n[0].Double},"s":{"a":2,"n":"set_Width","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setWidth","rt":Object,"p":[$n[0].Double]}}]}; });
    $m($n[1].FrameworkTemplate, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("FrameworkElementFactory")],"m":[{"a":2,"n":"FrameworkElementFactory","t":16,"rt":$n[1].IFrameworkElementFactory,"g":{"a":2,"n":"get_FrameworkElementFactory","t":8,"sn":"getFrameworkElementFactory","rt":$n[1].IFrameworkElementFactory},"s":{"a":2,"n":"set_FrameworkElementFactory","t":8,"pi":[{"n":"value","pt":$n[1].IFrameworkElementFactory,"ps":0}],"sn":"setFrameworkElementFactory","rt":Object,"p":[$n[1].IFrameworkElementFactory]}},{"a":2,"n":"Triggers","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITrigger),"g":{"a":2,"n":"get_Triggers","t":8,"sn":"getTriggers","rt":$n[3].ObservableCollection$1(System.Windows.ITrigger)},"s":{"a":1,"n":"set_Triggers","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITrigger),"ps":0}],"sn":"setTriggers","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITrigger)]}}]}; });
    $m($n[1].MultiDataTriggerBase, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Setters")],"m":[{"a":2,"n":"Conditions","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.Condition),"g":{"a":2,"n":"get_Conditions","t":8,"sn":"getConditions","rt":$n[3].ObservableCollection$1(System.Windows.Condition)},"s":{"a":1,"n":"set_Conditions","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.Condition),"ps":0}],"sn":"setConditions","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.Condition)]}},{"a":2,"n":"Setters","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"g":{"a":2,"n":"get_Setters","t":8,"sn":"getSetters","rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction)},"s":{"a":1,"n":"set_Setters","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"ps":0}],"sn":"setSetters","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITriggerAction)]}}]}; });
    $m($n[1].Point, function () { return {"at":[new System.Windows.Markup.TypeConverterAttribute(System.Windows.PointTypeConverter)],"m":[{"a":2,"n":"IsEmpty","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsEmpty","t":8,"sn":"getIsEmpty","rt":Boolean},"s":{"a":1,"n":"set_IsEmpty","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsEmpty","rt":Object,"p":[Boolean]}},{"a":2,"n":"X","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_X","t":8,"sn":"getX","rt":$n[0].Double},"s":{"a":1,"n":"set_X","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setX","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"Y","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Y","t":8,"sn":"getY","rt":$n[0].Double},"s":{"a":1,"n":"set_Y","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setY","rt":Object,"p":[$n[0].Double]}}]}; });
    $m($n[1].ResourceDictionary, function () { return {"m":[{"a":2,"n":"BaseUri","t":16,"rt":$n[0].Uri,"g":{"a":2,"n":"get_BaseUri","t":8,"sn":"getBaseUri","rt":$n[0].Uri},"s":{"a":2,"n":"set_BaseUri","t":8,"pi":[{"n":"value","pt":$n[0].Uri,"ps":0}],"sn":"setBaseUri","rt":Object,"p":[$n[0].Uri]}},{"a":2,"n":"Count","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Count","t":8,"sn":"getCount","rt":$n[0].Int32}},{"a":2,"n":"IsReadOnly","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsReadOnly","t":8,"sn":"getIsReadOnly","rt":Boolean}},{"a":2,"n":"MergedDictionaries","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ResourceDictionary),"g":{"a":2,"n":"get_MergedDictionaries","t":8,"sn":"getMergedDictionaries","rt":$n[3].ObservableCollection$1(System.Windows.ResourceDictionary)},"s":{"a":1,"n":"set_MergedDictionaries","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ResourceDictionary),"ps":0}],"sn":"setMergedDictionaries","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ResourceDictionary)]}},{"a":2,"n":"Source","t":16,"rt":$n[0].Uri,"g":{"a":2,"n":"get_Source","t":8,"sn":"getSource","rt":$n[0].Uri},"s":{"a":2,"n":"set_Source","t":8,"pi":[{"n":"value","pt":$n[0].Uri,"ps":0}],"sn":"setSource","rt":Object,"p":[$n[0].Uri]}}]}; });
    $m($n[1].ComponentResourceKey, function () { return {"m":[{"a":2,"n":"Assembly","t":16,"rt":$n[6].Assembly,"g":{"a":2,"n":"get_Assembly","t":8,"sn":"getAssembly","rt":$n[6].Assembly}},{"a":2,"n":"ResourceId","t":16,"rt":Object,"g":{"a":2,"n":"get_ResourceId","t":8,"sn":"getResourceId","rt":Object},"s":{"a":2,"n":"set_ResourceId","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setResourceId","rt":Object,"p":[Object]}},{"a":2,"n":"TypeInTargetAssembly","t":16,"rt":Function,"g":{"a":2,"n":"get_TypeInTargetAssembly","t":8,"sn":"getTypeInTargetAssembly","rt":Function},"s":{"a":2,"n":"set_TypeInTargetAssembly","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setTypeInTargetAssembly","rt":Object,"p":[Function]}}]}; });
    $m($n[1].Setter, function () { return {"m":[{"a":2,"n":"Property","t":16,"rt":$n[1].IPropertyPathElement,"g":{"a":2,"n":"get_Property","t":8,"sn":"getProperty","rt":$n[1].IPropertyPathElement},"s":{"a":2,"n":"set_Property","t":8,"pi":[{"n":"value","pt":$n[1].IPropertyPathElement,"ps":0}],"sn":"setProperty","rt":Object,"p":[$n[1].IPropertyPathElement]}},{"a":2,"n":"TargetName","t":16,"rt":String,"g":{"a":2,"n":"get_TargetName","t":8,"sn":"getTargetName","rt":String},"s":{"a":2,"n":"set_TargetName","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setTargetName","rt":Object,"p":[String]}},{"a":2,"n":"Value","t":16,"rt":Object,"g":{"a":2,"n":"get_Value","t":8,"sn":"getValue","rt":Object},"s":{"a":2,"n":"set_Value","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setValue","rt":Object,"p":[Object]}}]}; });
    $m($n[1].StaticResourceExtension, function () { return {"at":[new System.Windows.Markup.MarkupExtensionParameterAttribute("ResourceKey", 0)],"m":[{"a":2,"n":"ResourceKey","t":16,"rt":Object,"g":{"a":2,"n":"get_ResourceKey","t":8,"sn":"getResourceKey","rt":Object},"s":{"a":2,"n":"set_ResourceKey","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setResourceKey","rt":Object,"p":[Object]}}]}; });
    $m($n[1].Style, function () { return {"at":[new System.Windows.Markup.DictionaryKeyPropertyAttribute("Key"),new System.Windows.Markup.ContentPropertyAttribute("Setters")],"m":[{"a":2,"n":"BasedOn","t":16,"rt":$n[1].Style,"g":{"a":2,"n":"get_BasedOn","t":8,"sn":"getBasedOn","rt":$n[1].Style},"s":{"a":2,"n":"set_BasedOn","t":8,"pi":[{"n":"value","pt":$n[1].Style,"ps":0}],"sn":"setBasedOn","rt":Object,"p":[$n[1].Style]}},{"a":2,"n":"Key","t":16,"rt":Object,"g":{"a":2,"n":"get_Key","t":8,"sn":"getKey","rt":Object},"s":{"a":2,"n":"set_Key","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setKey","rt":Object,"p":[Object]}},{"a":2,"n":"Setters","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"g":{"a":2,"n":"get_Setters","t":8,"sn":"getSetters","rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction)},"s":{"a":1,"n":"set_Setters","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"ps":0}],"sn":"setSetters","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITriggerAction)]}},{"a":2,"n":"TargetType","t":16,"rt":Function,"g":{"a":2,"n":"get_TargetType","t":8,"sn":"getTargetType","rt":Function},"s":{"a":2,"n":"set_TargetType","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setTargetType","rt":Object,"p":[Function]}},{"a":2,"n":"Triggers","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITrigger),"g":{"a":2,"n":"get_Triggers","t":8,"sn":"getTriggers","rt":$n[3].ObservableCollection$1(System.Windows.ITrigger)},"s":{"a":1,"n":"set_Triggers","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITrigger),"ps":0}],"sn":"setTriggers","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITrigger)]}}]}; });
    $m($n[1].TemplateBindingExtension, function () { return {"at":[new System.Windows.Markup.MarkupExtensionParameterAttribute("Property", 0)],"m":[{"a":2,"n":"Converter","t":16,"rt":$n[2].IValueConverter,"g":{"a":2,"n":"get_Converter","t":8,"sn":"getConverter","rt":$n[2].IValueConverter},"s":{"a":2,"n":"set_Converter","t":8,"pi":[{"n":"value","pt":$n[2].IValueConverter,"ps":0}],"sn":"setConverter","rt":Object,"p":[$n[2].IValueConverter]}},{"a":2,"n":"ConverterParameter","t":16,"rt":Object,"g":{"a":2,"n":"get_ConverterParameter","t":8,"sn":"getConverterParameter","rt":Object},"s":{"a":2,"n":"set_ConverterParameter","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setConverterParameter","rt":Object,"p":[Object]}},{"a":2,"n":"Property","t":16,"rt":$n[1].IPropertyPathElement,"g":{"a":2,"n":"get_Property","t":8,"sn":"getProperty","rt":$n[1].IPropertyPathElement},"s":{"a":2,"n":"set_Property","t":8,"pi":[{"n":"value","pt":$n[1].IPropertyPathElement,"ps":0}],"sn":"setProperty","rt":Object,"p":[$n[1].IPropertyPathElement]}}]}; });
    $m($n[1].Trigger, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Setters")],"m":[{"a":2,"n":"Property","t":16,"rt":$n[1].IPropertyPathElement,"g":{"a":2,"n":"get_Property","t":8,"sn":"getProperty","rt":$n[1].IPropertyPathElement},"s":{"a":2,"n":"set_Property","t":8,"pi":[{"n":"value","pt":$n[1].IPropertyPathElement,"ps":0}],"sn":"setProperty","rt":Object,"p":[$n[1].IPropertyPathElement]}},{"a":2,"n":"Setters","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"g":{"a":2,"n":"get_Setters","t":8,"sn":"getSetters","rt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction)},"s":{"a":1,"n":"set_Setters","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.ITriggerAction),"ps":0}],"sn":"setSetters","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.ITriggerAction)]}},{"a":2,"n":"SourceName","t":16,"rt":String,"g":{"a":2,"n":"get_SourceName","t":8,"sn":"getSourceName","rt":String},"s":{"a":2,"n":"set_SourceName","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setSourceName","rt":Object,"p":[String]}},{"a":2,"n":"Value","t":16,"rt":Object,"g":{"a":2,"n":"get_Value","t":8,"sn":"getValue$5","rt":Object},"s":{"a":2,"n":"set_Value","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setValue$5","rt":Object,"p":[Object]}}]}; });
    $m($n[1].UIElement, function () { return {"m":[{"a":2,"n":"ClipToBounds","t":16,"rt":Boolean,"g":{"a":2,"n":"get_ClipToBounds","t":8,"sn":"getClipToBounds","rt":Boolean},"s":{"a":2,"n":"set_ClipToBounds","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setClipToBounds","rt":Object,"p":[Boolean]}},{"a":2,"n":"DesiredSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_DesiredSize","t":8,"sn":"getDesiredSize","rt":$n[1].Size},"s":{"a":2,"n":"set_DesiredSize","t":8,"pi":[{"n":"value","pt":$n[1].Size,"ps":0}],"sn":"setDesiredSize","rt":Object,"p":[$n[1].Size]}},{"a":2,"n":"Focusable","t":16,"rt":Boolean,"g":{"a":2,"n":"get_Focusable","t":8,"sn":"getFocusable","rt":Boolean},"s":{"a":2,"n":"set_Focusable","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setFocusable","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsArrangeValid","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsArrangeValid","t":8,"sn":"getIsArrangeValid","rt":Boolean},"s":{"a":1,"n":"set_IsArrangeValid","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsArrangeValid","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsEnabled","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsEnabled","t":8,"sn":"getIsEnabled","rt":Boolean},"s":{"a":2,"n":"set_IsEnabled","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsEnabled","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsFocused","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsFocused","t":8,"sn":"getIsFocused","rt":Boolean},"s":{"a":1,"n":"set_IsFocused","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsFocused","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsHitTestVisible","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsHitTestVisible","t":8,"sn":"getIsHitTestVisible","rt":Boolean},"s":{"a":2,"n":"set_IsHitTestVisible","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsHitTestVisible","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsKeyboardFocusWithin","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsKeyboardFocusWithin","t":8,"sn":"getIsKeyboardFocusWithin","rt":Boolean},"s":{"a":1,"n":"set_IsKeyboardFocusWithin","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsKeyboardFocusWithin","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsKeyboardFocused","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsKeyboardFocused","t":8,"sn":"getIsKeyboardFocused","rt":Boolean},"s":{"a":1,"n":"set_IsKeyboardFocused","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsKeyboardFocused","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsMeasureValid","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsMeasureValid","t":8,"sn":"getIsMeasureValid","rt":Boolean},"s":{"a":1,"n":"set_IsMeasureValid","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsMeasureValid","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsMouseOver","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsMouseOver","t":8,"sn":"getIsMouseOver","rt":Boolean},"s":{"a":1,"n":"set_IsMouseOver","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsMouseOver","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsRootElement","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsRootElement","t":8,"sn":"getIsRootElement","rt":Boolean},"s":{"a":2,"n":"set_IsRootElement","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsRootElement","rt":Object,"p":[Boolean]}},{"a":2,"n":"IsVisible","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsVisible","t":8,"sn":"getIsVisible","rt":Boolean},"s":{"a":1,"n":"set_IsVisible","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsVisible","rt":Object,"p":[Boolean]}},{"a":2,"n":"LogicalChildren","t":16,"rt":$n[7].IEnumerable$1(Object),"g":{"a":2,"n":"get_LogicalChildren","t":8,"sn":"getLogicalChildren","rt":$n[7].IEnumerable$1(Object)},"s":{"a":1,"n":"set_LogicalChildren","t":8,"pi":[{"n":"value","pt":$n[7].IEnumerable$1(Object),"ps":0}],"sn":"setLogicalChildren","rt":Object,"p":[$n[7].IEnumerable$1(Object)]}},{"a":2,"n":"LogicalParent","t":16,"rt":$n[1].UIElement,"g":{"a":2,"n":"get_LogicalParent","t":8,"sn":"getLogicalParent","rt":$n[1].UIElement},"s":{"a":1,"n":"set_LogicalParent","t":8,"pi":[{"n":"value","pt":$n[1].UIElement,"ps":0}],"sn":"setLogicalParent","rt":Object,"p":[$n[1].UIElement]}},{"a":2,"n":"Opacity","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Opacity","t":8,"sn":"getOpacity","rt":$n[0].Double},"s":{"a":2,"n":"set_Opacity","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setOpacity","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"PreviousAvailableSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_PreviousAvailableSize","t":8,"sn":"getPreviousAvailableSize","rt":$n[1].Size},"s":{"a":1,"n":"set_PreviousAvailableSize","t":8,"pi":[{"n":"value","pt":$n[1].Size,"ps":0}],"sn":"setPreviousAvailableSize","rt":Object,"p":[$n[1].Size]}},{"a":2,"n":"PreviousFinalRect","t":16,"rt":$n[1].Rect,"g":{"a":2,"n":"get_PreviousFinalRect","t":8,"sn":"getPreviousFinalRect","rt":$n[1].Rect},"s":{"a":1,"n":"set_PreviousFinalRect","t":8,"pi":[{"n":"value","pt":$n[1].Rect,"ps":0}],"sn":"setPreviousFinalRect","rt":Object,"p":[$n[1].Rect]}},{"a":2,"n":"RenderSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_RenderSize","t":8,"sn":"getRenderSize","rt":$n[1].Size}},{"a":2,"n":"RenderTransform","t":16,"rt":$n[5].Transform,"g":{"a":2,"n":"get_RenderTransform","t":8,"sn":"getRenderTransform","rt":$n[5].Transform},"s":{"a":2,"n":"set_RenderTransform","t":8,"pi":[{"n":"value","pt":$n[5].Transform,"ps":0}],"sn":"setRenderTransform","rt":Object,"p":[$n[5].Transform]}},{"a":2,"n":"RenderTransformOrigin","t":16,"rt":$n[1].Point,"g":{"a":2,"n":"get_RenderTransformOrigin","t":8,"sn":"getRenderTransformOrigin","rt":$n[1].Point},"s":{"a":2,"n":"set_RenderTransformOrigin","t":8,"pi":[{"n":"value","pt":$n[1].Point,"ps":0}],"sn":"setRenderTransformOrigin","rt":Object,"p":[$n[1].Point]}},{"a":2,"n":"Visibility","t":16,"rt":$n[1].Visibility,"g":{"a":2,"n":"get_Visibility","t":8,"sn":"getVisibility","rt":$n[1].Visibility},"s":{"a":2,"n":"set_Visibility","t":8,"pi":[{"n":"value","pt":$n[1].Visibility,"ps":0}],"sn":"setVisibility","rt":Object,"p":[$n[1].Visibility]}}]}; });
    $m($n[1].VisualState, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Storyboard"),new System.Windows.Markup.RuntimeNamePropertyAttribute("Name")],"m":[{"a":2,"n":"Name","t":16,"rt":String,"g":{"a":2,"n":"get_Name","t":8,"sn":"getName","rt":String},"s":{"a":2,"n":"set_Name","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setName","rt":Object,"p":[String]}},{"a":2,"n":"Storyboard","t":16,"rt":$n[8].Storyboard,"g":{"a":2,"n":"get_Storyboard","t":8,"sn":"getStoryboard","rt":$n[8].Storyboard},"s":{"a":2,"n":"set_Storyboard","t":8,"pi":[{"n":"value","pt":$n[8].Storyboard,"ps":0}],"sn":"setStoryboard","rt":Object,"p":[$n[8].Storyboard]}}]}; });
    $m($n[1].VisualStateGroup, function () { return {"at":[new System.Windows.Markup.RuntimeNamePropertyAttribute("Name"),new System.Windows.Markup.ContentPropertyAttribute("States")],"m":[{"a":2,"n":"CurrentState","t":16,"rt":$n[1].VisualState,"g":{"a":2,"n":"get_CurrentState","t":8,"sn":"getCurrentState","rt":$n[1].VisualState},"s":{"a":1,"n":"set_CurrentState","t":8,"pi":[{"n":"value","pt":$n[1].VisualState,"ps":0}],"sn":"setCurrentState","rt":Object,"p":[$n[1].VisualState]}},{"a":2,"n":"Name","t":16,"rt":String,"g":{"a":2,"n":"get_Name","t":8,"sn":"getName","rt":String},"s":{"a":2,"n":"set_Name","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setName","rt":Object,"p":[String]}},{"a":2,"n":"States","t":16,"rt":$n[1].FreezableCollection$1(System.Windows.VisualState),"g":{"a":2,"n":"get_States","t":8,"sn":"getStates","rt":$n[1].FreezableCollection$1(System.Windows.VisualState)},"s":{"a":1,"n":"set_States","t":8,"pi":[{"n":"value","pt":$n[1].FreezableCollection$1(System.Windows.VisualState),"ps":0}],"sn":"setStates","rt":Object,"p":[$n[1].FreezableCollection$1(System.Windows.VisualState)]}},{"a":2,"n":"Transitions","t":16,"rt":$n[1].FreezableCollection$1(System.Windows.VisualTransition),"g":{"a":2,"n":"get_Transitions","t":8,"sn":"getTransitions","rt":$n[1].FreezableCollection$1(System.Windows.VisualTransition)},"s":{"a":1,"n":"set_Transitions","t":8,"pi":[{"n":"value","pt":$n[1].FreezableCollection$1(System.Windows.VisualTransition),"ps":0}],"sn":"setTransitions","rt":Object,"p":[$n[1].FreezableCollection$1(System.Windows.VisualTransition)]}}]}; });
    $m($n[1].VisualTransition, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Storyboard")],"m":[{"a":2,"n":"From","t":16,"rt":String,"g":{"a":2,"n":"get_From","t":8,"sn":"getFrom","rt":String},"s":{"a":2,"n":"set_From","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setFrom","rt":Object,"p":[String]}},{"a":2,"n":"Storyboard","t":16,"rt":$n[8].Storyboard,"g":{"a":2,"n":"get_Storyboard","t":8,"sn":"getStoryboard","rt":$n[8].Storyboard},"s":{"a":2,"n":"set_Storyboard","t":8,"pi":[{"n":"value","pt":$n[8].Storyboard,"ps":0}],"sn":"setStoryboard","rt":Object,"p":[$n[8].Storyboard]}},{"a":2,"n":"To","t":16,"rt":String,"g":{"a":2,"n":"get_To","t":8,"sn":"getTo","rt":String},"s":{"a":2,"n":"set_To","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setTo","rt":Object,"p":[String]}}]}; });
    $m($n[5].Brushes, function () { return {"m":[{"a":2,"n":"AliceBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_AliceBlue","is":true,"t":8,"sn":"getAliceBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"AntiqueWhite","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_AntiqueWhite","is":true,"t":8,"sn":"getAntiqueWhite","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Aqua","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Aqua","is":true,"t":8,"sn":"getAqua","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Aquamarine","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Aquamarine","is":true,"t":8,"sn":"getAquamarine","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Azure","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Azure","is":true,"t":8,"sn":"getAzure","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Beige","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Beige","is":true,"t":8,"sn":"getBeige","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Bisque","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Bisque","is":true,"t":8,"sn":"getBisque","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Black","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Black","is":true,"t":8,"sn":"getBlack","rt":$n[5].SolidColorBrush}},{"a":2,"n":"BlanchedAlmond","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_BlanchedAlmond","is":true,"t":8,"sn":"getBlanchedAlmond","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Blue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Blue","is":true,"t":8,"sn":"getBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"BlueViolet","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_BlueViolet","is":true,"t":8,"sn":"getBlueViolet","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Brown","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Brown","is":true,"t":8,"sn":"getBrown","rt":$n[5].SolidColorBrush}},{"a":2,"n":"BurlyWood","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_BurlyWood","is":true,"t":8,"sn":"getBurlyWood","rt":$n[5].SolidColorBrush}},{"a":2,"n":"CadetBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_CadetBlue","is":true,"t":8,"sn":"getCadetBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Chartreuse","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Chartreuse","is":true,"t":8,"sn":"getChartreuse","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Chocolate","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Chocolate","is":true,"t":8,"sn":"getChocolate","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Coral","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Coral","is":true,"t":8,"sn":"getCoral","rt":$n[5].SolidColorBrush}},{"a":2,"n":"CornflowerBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_CornflowerBlue","is":true,"t":8,"sn":"getCornflowerBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Cornsilk","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Cornsilk","is":true,"t":8,"sn":"getCornsilk","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Crimson","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Crimson","is":true,"t":8,"sn":"getCrimson","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Cyan","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Cyan","is":true,"t":8,"sn":"getCyan","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkBlue","is":true,"t":8,"sn":"getDarkBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkCyan","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkCyan","is":true,"t":8,"sn":"getDarkCyan","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkGoldenrod","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkGoldenrod","is":true,"t":8,"sn":"getDarkGoldenrod","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkGray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkGray","is":true,"t":8,"sn":"getDarkGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkGreen","is":true,"t":8,"sn":"getDarkGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkKhaki","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkKhaki","is":true,"t":8,"sn":"getDarkKhaki","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkMagenta","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkMagenta","is":true,"t":8,"sn":"getDarkMagenta","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkOliveGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkOliveGreen","is":true,"t":8,"sn":"getDarkOliveGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkOrange","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkOrange","is":true,"t":8,"sn":"getDarkOrange","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkOrchid","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkOrchid","is":true,"t":8,"sn":"getDarkOrchid","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkRed","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkRed","is":true,"t":8,"sn":"getDarkRed","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkSalmon","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkSalmon","is":true,"t":8,"sn":"getDarkSalmon","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkSeaGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkSeaGreen","is":true,"t":8,"sn":"getDarkSeaGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkSlateBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkSlateBlue","is":true,"t":8,"sn":"getDarkSlateBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkSlateGray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkSlateGray","is":true,"t":8,"sn":"getDarkSlateGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkTurquoise","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkTurquoise","is":true,"t":8,"sn":"getDarkTurquoise","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DarkViolet","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DarkViolet","is":true,"t":8,"sn":"getDarkViolet","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DeepPink","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DeepPink","is":true,"t":8,"sn":"getDeepPink","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DeepSkyBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DeepSkyBlue","is":true,"t":8,"sn":"getDeepSkyBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DimGray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DimGray","is":true,"t":8,"sn":"getDimGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"DodgerBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_DodgerBlue","is":true,"t":8,"sn":"getDodgerBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Firebrick","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Firebrick","is":true,"t":8,"sn":"getFirebrick","rt":$n[5].SolidColorBrush}},{"a":2,"n":"FloralWhite","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_FloralWhite","is":true,"t":8,"sn":"getFloralWhite","rt":$n[5].SolidColorBrush}},{"a":2,"n":"ForestGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_ForestGreen","is":true,"t":8,"sn":"getForestGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Fuchsia","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Fuchsia","is":true,"t":8,"sn":"getFuchsia","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Gainsboro","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Gainsboro","is":true,"t":8,"sn":"getGainsboro","rt":$n[5].SolidColorBrush}},{"a":2,"n":"GhostWhite","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_GhostWhite","is":true,"t":8,"sn":"getGhostWhite","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Gold","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Gold","is":true,"t":8,"sn":"getGold","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Goldenrod","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Goldenrod","is":true,"t":8,"sn":"getGoldenrod","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Gray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Gray","is":true,"t":8,"sn":"getGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Green","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Green","is":true,"t":8,"sn":"getGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"GreenYellow","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_GreenYellow","is":true,"t":8,"sn":"getGreenYellow","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Honeydew","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Honeydew","is":true,"t":8,"sn":"getHoneydew","rt":$n[5].SolidColorBrush}},{"a":2,"n":"HotPink","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_HotPink","is":true,"t":8,"sn":"getHotPink","rt":$n[5].SolidColorBrush}},{"a":2,"n":"IndianRed","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_IndianRed","is":true,"t":8,"sn":"getIndianRed","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Indigo","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Indigo","is":true,"t":8,"sn":"getIndigo","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Ivory","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Ivory","is":true,"t":8,"sn":"getIvory","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Khaki","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Khaki","is":true,"t":8,"sn":"getKhaki","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Lavender","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Lavender","is":true,"t":8,"sn":"getLavender","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LavenderBlush","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LavenderBlush","is":true,"t":8,"sn":"getLavenderBlush","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LawnGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LawnGreen","is":true,"t":8,"sn":"getLawnGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LemonChiffon","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LemonChiffon","is":true,"t":8,"sn":"getLemonChiffon","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightBlue","is":true,"t":8,"sn":"getLightBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightCoral","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightCoral","is":true,"t":8,"sn":"getLightCoral","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightCyan","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightCyan","is":true,"t":8,"sn":"getLightCyan","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightGoldenrodYellow","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightGoldenrodYellow","is":true,"t":8,"sn":"getLightGoldenrodYellow","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightGray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightGray","is":true,"t":8,"sn":"getLightGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightGreen","is":true,"t":8,"sn":"getLightGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightPink","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightPink","is":true,"t":8,"sn":"getLightPink","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightSalmon","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightSalmon","is":true,"t":8,"sn":"getLightSalmon","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightSeaGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightSeaGreen","is":true,"t":8,"sn":"getLightSeaGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightSkyBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightSkyBlue","is":true,"t":8,"sn":"getLightSkyBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightSlateGray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightSlateGray","is":true,"t":8,"sn":"getLightSlateGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightSteelBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightSteelBlue","is":true,"t":8,"sn":"getLightSteelBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LightYellow","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LightYellow","is":true,"t":8,"sn":"getLightYellow","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Lime","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Lime","is":true,"t":8,"sn":"getLime","rt":$n[5].SolidColorBrush}},{"a":2,"n":"LimeGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_LimeGreen","is":true,"t":8,"sn":"getLimeGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Linen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Linen","is":true,"t":8,"sn":"getLinen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Magenta","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Magenta","is":true,"t":8,"sn":"getMagenta","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Maroon","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Maroon","is":true,"t":8,"sn":"getMaroon","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumAquamarine","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumAquamarine","is":true,"t":8,"sn":"getMediumAquamarine","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumBlue","is":true,"t":8,"sn":"getMediumBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumOrchid","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumOrchid","is":true,"t":8,"sn":"getMediumOrchid","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumPurple","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumPurple","is":true,"t":8,"sn":"getMediumPurple","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumSeaGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumSeaGreen","is":true,"t":8,"sn":"getMediumSeaGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumSlateBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumSlateBlue","is":true,"t":8,"sn":"getMediumSlateBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumSpringGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumSpringGreen","is":true,"t":8,"sn":"getMediumSpringGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumTurquoise","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumTurquoise","is":true,"t":8,"sn":"getMediumTurquoise","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MediumVioletRed","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MediumVioletRed","is":true,"t":8,"sn":"getMediumVioletRed","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MidnightBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MidnightBlue","is":true,"t":8,"sn":"getMidnightBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MintCream","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MintCream","is":true,"t":8,"sn":"getMintCream","rt":$n[5].SolidColorBrush}},{"a":2,"n":"MistyRose","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_MistyRose","is":true,"t":8,"sn":"getMistyRose","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Moccasin","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Moccasin","is":true,"t":8,"sn":"getMoccasin","rt":$n[5].SolidColorBrush}},{"a":2,"n":"NavajoWhite","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_NavajoWhite","is":true,"t":8,"sn":"getNavajoWhite","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Navy","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Navy","is":true,"t":8,"sn":"getNavy","rt":$n[5].SolidColorBrush}},{"a":2,"n":"OldLace","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_OldLace","is":true,"t":8,"sn":"getOldLace","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Olive","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Olive","is":true,"t":8,"sn":"getOlive","rt":$n[5].SolidColorBrush}},{"a":2,"n":"OliveDrab","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_OliveDrab","is":true,"t":8,"sn":"getOliveDrab","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Orange","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Orange","is":true,"t":8,"sn":"getOrange","rt":$n[5].SolidColorBrush}},{"a":2,"n":"OrangeRed","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_OrangeRed","is":true,"t":8,"sn":"getOrangeRed","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Orchid","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Orchid","is":true,"t":8,"sn":"getOrchid","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PaleGoldenrod","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PaleGoldenrod","is":true,"t":8,"sn":"getPaleGoldenrod","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PaleGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PaleGreen","is":true,"t":8,"sn":"getPaleGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PaleTurquoise","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PaleTurquoise","is":true,"t":8,"sn":"getPaleTurquoise","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PaleVioletRed","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PaleVioletRed","is":true,"t":8,"sn":"getPaleVioletRed","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PapayaWhip","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PapayaWhip","is":true,"t":8,"sn":"getPapayaWhip","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PeachPuff","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PeachPuff","is":true,"t":8,"sn":"getPeachPuff","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Peru","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Peru","is":true,"t":8,"sn":"getPeru","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Pink","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Pink","is":true,"t":8,"sn":"getPink","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Plum","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Plum","is":true,"t":8,"sn":"getPlum","rt":$n[5].SolidColorBrush}},{"a":2,"n":"PowderBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_PowderBlue","is":true,"t":8,"sn":"getPowderBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Purple","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Purple","is":true,"t":8,"sn":"getPurple","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Red","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Red","is":true,"t":8,"sn":"getRed","rt":$n[5].SolidColorBrush}},{"a":2,"n":"RosyBrown","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_RosyBrown","is":true,"t":8,"sn":"getRosyBrown","rt":$n[5].SolidColorBrush}},{"a":2,"n":"RoyalBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_RoyalBlue","is":true,"t":8,"sn":"getRoyalBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SaddleBrown","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SaddleBrown","is":true,"t":8,"sn":"getSaddleBrown","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Salmon","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Salmon","is":true,"t":8,"sn":"getSalmon","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SandyBrown","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SandyBrown","is":true,"t":8,"sn":"getSandyBrown","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SeaGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SeaGreen","is":true,"t":8,"sn":"getSeaGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SeaShell","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SeaShell","is":true,"t":8,"sn":"getSeaShell","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Sienna","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Sienna","is":true,"t":8,"sn":"getSienna","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Silver","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Silver","is":true,"t":8,"sn":"getSilver","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SkyBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SkyBlue","is":true,"t":8,"sn":"getSkyBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SlateBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SlateBlue","is":true,"t":8,"sn":"getSlateBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SlateGray","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SlateGray","is":true,"t":8,"sn":"getSlateGray","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Snow","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Snow","is":true,"t":8,"sn":"getSnow","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SpringGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SpringGreen","is":true,"t":8,"sn":"getSpringGreen","rt":$n[5].SolidColorBrush}},{"a":2,"n":"SteelBlue","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_SteelBlue","is":true,"t":8,"sn":"getSteelBlue","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Tan","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Tan","is":true,"t":8,"sn":"getTan","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Teal","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Teal","is":true,"t":8,"sn":"getTeal","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Thistle","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Thistle","is":true,"t":8,"sn":"getThistle","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Tomato","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Tomato","is":true,"t":8,"sn":"getTomato","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Transparent","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Transparent","is":true,"t":8,"sn":"getTransparent","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Turquoise","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Turquoise","is":true,"t":8,"sn":"getTurquoise","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Violet","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Violet","is":true,"t":8,"sn":"getViolet","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Wheat","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Wheat","is":true,"t":8,"sn":"getWheat","rt":$n[5].SolidColorBrush}},{"a":2,"n":"White","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_White","is":true,"t":8,"sn":"getWhite","rt":$n[5].SolidColorBrush}},{"a":2,"n":"WhiteSmoke","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_WhiteSmoke","is":true,"t":8,"sn":"getWhiteSmoke","rt":$n[5].SolidColorBrush}},{"a":2,"n":"Yellow","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_Yellow","is":true,"t":8,"sn":"getYellow","rt":$n[5].SolidColorBrush}},{"a":2,"n":"YellowGreen","is":true,"t":16,"rt":$n[5].SolidColorBrush,"g":{"a":2,"n":"get_YellowGreen","is":true,"t":8,"sn":"getYellowGreen","rt":$n[5].SolidColorBrush}}]}; });
    $m($n[5].Colors, function () { return {"m":[{"a":2,"n":"AliceBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_AliceBlue","is":true,"t":8,"sn":"getAliceBlue","rt":$n[5].Color}},{"a":2,"n":"AntiqueWhite","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_AntiqueWhite","is":true,"t":8,"sn":"getAntiqueWhite","rt":$n[5].Color}},{"a":2,"n":"Aqua","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Aqua","is":true,"t":8,"sn":"getAqua","rt":$n[5].Color}},{"a":2,"n":"Aquamarine","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Aquamarine","is":true,"t":8,"sn":"getAquamarine","rt":$n[5].Color}},{"a":2,"n":"Azure","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Azure","is":true,"t":8,"sn":"getAzure","rt":$n[5].Color}},{"a":2,"n":"Beige","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Beige","is":true,"t":8,"sn":"getBeige","rt":$n[5].Color}},{"a":2,"n":"Bisque","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Bisque","is":true,"t":8,"sn":"getBisque","rt":$n[5].Color}},{"a":2,"n":"Black","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Black","is":true,"t":8,"sn":"getBlack","rt":$n[5].Color}},{"a":2,"n":"BlanchedAlmond","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_BlanchedAlmond","is":true,"t":8,"sn":"getBlanchedAlmond","rt":$n[5].Color}},{"a":2,"n":"Blue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Blue","is":true,"t":8,"sn":"getBlue","rt":$n[5].Color}},{"a":2,"n":"BlueViolet","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_BlueViolet","is":true,"t":8,"sn":"getBlueViolet","rt":$n[5].Color}},{"a":2,"n":"Brown","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Brown","is":true,"t":8,"sn":"getBrown","rt":$n[5].Color}},{"a":2,"n":"BurlyWood","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_BurlyWood","is":true,"t":8,"sn":"getBurlyWood","rt":$n[5].Color}},{"a":2,"n":"CadetBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_CadetBlue","is":true,"t":8,"sn":"getCadetBlue","rt":$n[5].Color}},{"a":2,"n":"Chartreuse","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Chartreuse","is":true,"t":8,"sn":"getChartreuse","rt":$n[5].Color}},{"a":2,"n":"Chocolate","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Chocolate","is":true,"t":8,"sn":"getChocolate","rt":$n[5].Color}},{"a":2,"n":"Coral","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Coral","is":true,"t":8,"sn":"getCoral","rt":$n[5].Color}},{"a":2,"n":"CornflowerBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_CornflowerBlue","is":true,"t":8,"sn":"getCornflowerBlue","rt":$n[5].Color}},{"a":2,"n":"Cornsilk","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Cornsilk","is":true,"t":8,"sn":"getCornsilk","rt":$n[5].Color}},{"a":2,"n":"Crimson","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Crimson","is":true,"t":8,"sn":"getCrimson","rt":$n[5].Color}},{"a":2,"n":"Cyan","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Cyan","is":true,"t":8,"sn":"getCyan","rt":$n[5].Color}},{"a":2,"n":"DarkBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkBlue","is":true,"t":8,"sn":"getDarkBlue","rt":$n[5].Color}},{"a":2,"n":"DarkCyan","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkCyan","is":true,"t":8,"sn":"getDarkCyan","rt":$n[5].Color}},{"a":2,"n":"DarkGoldenrod","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkGoldenrod","is":true,"t":8,"sn":"getDarkGoldenrod","rt":$n[5].Color}},{"a":2,"n":"DarkGray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkGray","is":true,"t":8,"sn":"getDarkGray","rt":$n[5].Color}},{"a":2,"n":"DarkGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkGreen","is":true,"t":8,"sn":"getDarkGreen","rt":$n[5].Color}},{"a":2,"n":"DarkKhaki","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkKhaki","is":true,"t":8,"sn":"getDarkKhaki","rt":$n[5].Color}},{"a":2,"n":"DarkMagenta","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkMagenta","is":true,"t":8,"sn":"getDarkMagenta","rt":$n[5].Color}},{"a":2,"n":"DarkOliveGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkOliveGreen","is":true,"t":8,"sn":"getDarkOliveGreen","rt":$n[5].Color}},{"a":2,"n":"DarkOrange","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkOrange","is":true,"t":8,"sn":"getDarkOrange","rt":$n[5].Color}},{"a":2,"n":"DarkOrchid","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkOrchid","is":true,"t":8,"sn":"getDarkOrchid","rt":$n[5].Color}},{"a":2,"n":"DarkRed","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkRed","is":true,"t":8,"sn":"getDarkRed","rt":$n[5].Color}},{"a":2,"n":"DarkSalmon","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkSalmon","is":true,"t":8,"sn":"getDarkSalmon","rt":$n[5].Color}},{"a":2,"n":"DarkSeaGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkSeaGreen","is":true,"t":8,"sn":"getDarkSeaGreen","rt":$n[5].Color}},{"a":2,"n":"DarkSlateBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkSlateBlue","is":true,"t":8,"sn":"getDarkSlateBlue","rt":$n[5].Color}},{"a":2,"n":"DarkSlateGray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkSlateGray","is":true,"t":8,"sn":"getDarkSlateGray","rt":$n[5].Color}},{"a":2,"n":"DarkTurquoise","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkTurquoise","is":true,"t":8,"sn":"getDarkTurquoise","rt":$n[5].Color}},{"a":2,"n":"DarkViolet","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DarkViolet","is":true,"t":8,"sn":"getDarkViolet","rt":$n[5].Color}},{"a":2,"n":"DeepPink","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DeepPink","is":true,"t":8,"sn":"getDeepPink","rt":$n[5].Color}},{"a":2,"n":"DeepSkyBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DeepSkyBlue","is":true,"t":8,"sn":"getDeepSkyBlue","rt":$n[5].Color}},{"a":2,"n":"DimGray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DimGray","is":true,"t":8,"sn":"getDimGray","rt":$n[5].Color}},{"a":2,"n":"DodgerBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_DodgerBlue","is":true,"t":8,"sn":"getDodgerBlue","rt":$n[5].Color}},{"a":2,"n":"Firebrick","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Firebrick","is":true,"t":8,"sn":"getFirebrick","rt":$n[5].Color}},{"a":2,"n":"FloralWhite","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_FloralWhite","is":true,"t":8,"sn":"getFloralWhite","rt":$n[5].Color}},{"a":2,"n":"ForestGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_ForestGreen","is":true,"t":8,"sn":"getForestGreen","rt":$n[5].Color}},{"a":2,"n":"Fuchsia","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Fuchsia","is":true,"t":8,"sn":"getFuchsia","rt":$n[5].Color}},{"a":2,"n":"Gainsboro","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Gainsboro","is":true,"t":8,"sn":"getGainsboro","rt":$n[5].Color}},{"a":2,"n":"GhostWhite","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_GhostWhite","is":true,"t":8,"sn":"getGhostWhite","rt":$n[5].Color}},{"a":2,"n":"Gold","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Gold","is":true,"t":8,"sn":"getGold","rt":$n[5].Color}},{"a":2,"n":"Goldenrod","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Goldenrod","is":true,"t":8,"sn":"getGoldenrod","rt":$n[5].Color}},{"a":2,"n":"Gray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Gray","is":true,"t":8,"sn":"getGray","rt":$n[5].Color}},{"a":2,"n":"Green","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Green","is":true,"t":8,"sn":"getGreen","rt":$n[5].Color}},{"a":2,"n":"GreenYellow","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_GreenYellow","is":true,"t":8,"sn":"getGreenYellow","rt":$n[5].Color}},{"a":2,"n":"Honeydew","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Honeydew","is":true,"t":8,"sn":"getHoneydew","rt":$n[5].Color}},{"a":2,"n":"HotPink","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_HotPink","is":true,"t":8,"sn":"getHotPink","rt":$n[5].Color}},{"a":2,"n":"IndianRed","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_IndianRed","is":true,"t":8,"sn":"getIndianRed","rt":$n[5].Color}},{"a":2,"n":"Indigo","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Indigo","is":true,"t":8,"sn":"getIndigo","rt":$n[5].Color}},{"a":2,"n":"Ivory","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Ivory","is":true,"t":8,"sn":"getIvory","rt":$n[5].Color}},{"a":2,"n":"Khaki","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Khaki","is":true,"t":8,"sn":"getKhaki","rt":$n[5].Color}},{"a":2,"n":"Lavender","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Lavender","is":true,"t":8,"sn":"getLavender","rt":$n[5].Color}},{"a":2,"n":"LavenderBlush","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LavenderBlush","is":true,"t":8,"sn":"getLavenderBlush","rt":$n[5].Color}},{"a":2,"n":"LawnGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LawnGreen","is":true,"t":8,"sn":"getLawnGreen","rt":$n[5].Color}},{"a":2,"n":"LemonChiffon","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LemonChiffon","is":true,"t":8,"sn":"getLemonChiffon","rt":$n[5].Color}},{"a":2,"n":"LightBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightBlue","is":true,"t":8,"sn":"getLightBlue","rt":$n[5].Color}},{"a":2,"n":"LightCoral","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightCoral","is":true,"t":8,"sn":"getLightCoral","rt":$n[5].Color}},{"a":2,"n":"LightCyan","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightCyan","is":true,"t":8,"sn":"getLightCyan","rt":$n[5].Color}},{"a":2,"n":"LightGoldenrodYellow","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightGoldenrodYellow","is":true,"t":8,"sn":"getLightGoldenrodYellow","rt":$n[5].Color}},{"a":2,"n":"LightGray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightGray","is":true,"t":8,"sn":"getLightGray","rt":$n[5].Color}},{"a":2,"n":"LightGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightGreen","is":true,"t":8,"sn":"getLightGreen","rt":$n[5].Color}},{"a":2,"n":"LightPink","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightPink","is":true,"t":8,"sn":"getLightPink","rt":$n[5].Color}},{"a":2,"n":"LightSalmon","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightSalmon","is":true,"t":8,"sn":"getLightSalmon","rt":$n[5].Color}},{"a":2,"n":"LightSeaGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightSeaGreen","is":true,"t":8,"sn":"getLightSeaGreen","rt":$n[5].Color}},{"a":2,"n":"LightSkyBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightSkyBlue","is":true,"t":8,"sn":"getLightSkyBlue","rt":$n[5].Color}},{"a":2,"n":"LightSlateGray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightSlateGray","is":true,"t":8,"sn":"getLightSlateGray","rt":$n[5].Color}},{"a":2,"n":"LightSteelBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightSteelBlue","is":true,"t":8,"sn":"getLightSteelBlue","rt":$n[5].Color}},{"a":2,"n":"LightYellow","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LightYellow","is":true,"t":8,"sn":"getLightYellow","rt":$n[5].Color}},{"a":2,"n":"Lime","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Lime","is":true,"t":8,"sn":"getLime","rt":$n[5].Color}},{"a":2,"n":"LimeGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_LimeGreen","is":true,"t":8,"sn":"getLimeGreen","rt":$n[5].Color}},{"a":2,"n":"Linen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Linen","is":true,"t":8,"sn":"getLinen","rt":$n[5].Color}},{"a":2,"n":"Magenta","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Magenta","is":true,"t":8,"sn":"getMagenta","rt":$n[5].Color}},{"a":2,"n":"Maroon","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Maroon","is":true,"t":8,"sn":"getMaroon","rt":$n[5].Color}},{"a":2,"n":"MediumAquamarine","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumAquamarine","is":true,"t":8,"sn":"getMediumAquamarine","rt":$n[5].Color}},{"a":2,"n":"MediumBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumBlue","is":true,"t":8,"sn":"getMediumBlue","rt":$n[5].Color}},{"a":2,"n":"MediumOrchid","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumOrchid","is":true,"t":8,"sn":"getMediumOrchid","rt":$n[5].Color}},{"a":2,"n":"MediumPurple","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumPurple","is":true,"t":8,"sn":"getMediumPurple","rt":$n[5].Color}},{"a":2,"n":"MediumSeaGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumSeaGreen","is":true,"t":8,"sn":"getMediumSeaGreen","rt":$n[5].Color}},{"a":2,"n":"MediumSlateBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumSlateBlue","is":true,"t":8,"sn":"getMediumSlateBlue","rt":$n[5].Color}},{"a":2,"n":"MediumSpringGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumSpringGreen","is":true,"t":8,"sn":"getMediumSpringGreen","rt":$n[5].Color}},{"a":2,"n":"MediumTurquoise","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumTurquoise","is":true,"t":8,"sn":"getMediumTurquoise","rt":$n[5].Color}},{"a":2,"n":"MediumVioletRed","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MediumVioletRed","is":true,"t":8,"sn":"getMediumVioletRed","rt":$n[5].Color}},{"a":2,"n":"MidnightBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MidnightBlue","is":true,"t":8,"sn":"getMidnightBlue","rt":$n[5].Color}},{"a":2,"n":"MintCream","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MintCream","is":true,"t":8,"sn":"getMintCream","rt":$n[5].Color}},{"a":2,"n":"MistyRose","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_MistyRose","is":true,"t":8,"sn":"getMistyRose","rt":$n[5].Color}},{"a":2,"n":"Moccasin","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Moccasin","is":true,"t":8,"sn":"getMoccasin","rt":$n[5].Color}},{"a":2,"n":"NavajoWhite","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_NavajoWhite","is":true,"t":8,"sn":"getNavajoWhite","rt":$n[5].Color}},{"a":2,"n":"Navy","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Navy","is":true,"t":8,"sn":"getNavy","rt":$n[5].Color}},{"a":2,"n":"OldLace","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_OldLace","is":true,"t":8,"sn":"getOldLace","rt":$n[5].Color}},{"a":2,"n":"Olive","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Olive","is":true,"t":8,"sn":"getOlive","rt":$n[5].Color}},{"a":2,"n":"OliveDrab","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_OliveDrab","is":true,"t":8,"sn":"getOliveDrab","rt":$n[5].Color}},{"a":2,"n":"Orange","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Orange","is":true,"t":8,"sn":"getOrange","rt":$n[5].Color}},{"a":2,"n":"OrangeRed","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_OrangeRed","is":true,"t":8,"sn":"getOrangeRed","rt":$n[5].Color}},{"a":2,"n":"Orchid","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Orchid","is":true,"t":8,"sn":"getOrchid","rt":$n[5].Color}},{"a":2,"n":"PaleGoldenrod","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PaleGoldenrod","is":true,"t":8,"sn":"getPaleGoldenrod","rt":$n[5].Color}},{"a":2,"n":"PaleGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PaleGreen","is":true,"t":8,"sn":"getPaleGreen","rt":$n[5].Color}},{"a":2,"n":"PaleTurquoise","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PaleTurquoise","is":true,"t":8,"sn":"getPaleTurquoise","rt":$n[5].Color}},{"a":2,"n":"PaleVioletRed","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PaleVioletRed","is":true,"t":8,"sn":"getPaleVioletRed","rt":$n[5].Color}},{"a":2,"n":"PapayaWhip","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PapayaWhip","is":true,"t":8,"sn":"getPapayaWhip","rt":$n[5].Color}},{"a":2,"n":"PeachPuff","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PeachPuff","is":true,"t":8,"sn":"getPeachPuff","rt":$n[5].Color}},{"a":2,"n":"Peru","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Peru","is":true,"t":8,"sn":"getPeru","rt":$n[5].Color}},{"a":2,"n":"Pink","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Pink","is":true,"t":8,"sn":"getPink","rt":$n[5].Color}},{"a":2,"n":"Plum","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Plum","is":true,"t":8,"sn":"getPlum","rt":$n[5].Color}},{"a":2,"n":"PowderBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_PowderBlue","is":true,"t":8,"sn":"getPowderBlue","rt":$n[5].Color}},{"a":2,"n":"Purple","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Purple","is":true,"t":8,"sn":"getPurple","rt":$n[5].Color}},{"a":2,"n":"Red","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Red","is":true,"t":8,"sn":"getRed","rt":$n[5].Color}},{"a":2,"n":"RosyBrown","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_RosyBrown","is":true,"t":8,"sn":"getRosyBrown","rt":$n[5].Color}},{"a":2,"n":"RoyalBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_RoyalBlue","is":true,"t":8,"sn":"getRoyalBlue","rt":$n[5].Color}},{"a":2,"n":"SaddleBrown","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SaddleBrown","is":true,"t":8,"sn":"getSaddleBrown","rt":$n[5].Color}},{"a":2,"n":"Salmon","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Salmon","is":true,"t":8,"sn":"getSalmon","rt":$n[5].Color}},{"a":2,"n":"SandyBrown","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SandyBrown","is":true,"t":8,"sn":"getSandyBrown","rt":$n[5].Color}},{"a":2,"n":"SeaGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SeaGreen","is":true,"t":8,"sn":"getSeaGreen","rt":$n[5].Color}},{"a":2,"n":"SeaShell","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SeaShell","is":true,"t":8,"sn":"getSeaShell","rt":$n[5].Color}},{"a":2,"n":"Sienna","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Sienna","is":true,"t":8,"sn":"getSienna","rt":$n[5].Color}},{"a":2,"n":"Silver","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Silver","is":true,"t":8,"sn":"getSilver","rt":$n[5].Color}},{"a":2,"n":"SkyBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SkyBlue","is":true,"t":8,"sn":"getSkyBlue","rt":$n[5].Color}},{"a":2,"n":"SlateBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SlateBlue","is":true,"t":8,"sn":"getSlateBlue","rt":$n[5].Color}},{"a":2,"n":"SlateGray","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SlateGray","is":true,"t":8,"sn":"getSlateGray","rt":$n[5].Color}},{"a":2,"n":"Snow","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Snow","is":true,"t":8,"sn":"getSnow","rt":$n[5].Color}},{"a":2,"n":"SpringGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SpringGreen","is":true,"t":8,"sn":"getSpringGreen","rt":$n[5].Color}},{"a":2,"n":"SteelBlue","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_SteelBlue","is":true,"t":8,"sn":"getSteelBlue","rt":$n[5].Color}},{"a":2,"n":"Tan","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Tan","is":true,"t":8,"sn":"getTan","rt":$n[5].Color}},{"a":2,"n":"Teal","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Teal","is":true,"t":8,"sn":"getTeal","rt":$n[5].Color}},{"a":2,"n":"Thistle","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Thistle","is":true,"t":8,"sn":"getThistle","rt":$n[5].Color}},{"a":2,"n":"Tomato","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Tomato","is":true,"t":8,"sn":"getTomato","rt":$n[5].Color}},{"a":2,"n":"Transparent","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Transparent","is":true,"t":8,"sn":"getTransparent","rt":$n[5].Color}},{"a":2,"n":"Turquoise","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Turquoise","is":true,"t":8,"sn":"getTurquoise","rt":$n[5].Color}},{"a":2,"n":"Violet","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Violet","is":true,"t":8,"sn":"getViolet","rt":$n[5].Color}},{"a":2,"n":"Wheat","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Wheat","is":true,"t":8,"sn":"getWheat","rt":$n[5].Color}},{"a":2,"n":"White","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_White","is":true,"t":8,"sn":"getWhite","rt":$n[5].Color}},{"a":2,"n":"WhiteSmoke","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_WhiteSmoke","is":true,"t":8,"sn":"getWhiteSmoke","rt":$n[5].Color}},{"a":2,"n":"Yellow","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_Yellow","is":true,"t":8,"sn":"getYellow","rt":$n[5].Color}},{"a":2,"n":"YellowGreen","is":true,"t":16,"rt":$n[5].Color,"g":{"a":2,"n":"get_YellowGreen","is":true,"t":8,"sn":"getYellowGreen","rt":$n[5].Color}}]}; });
    $m($n[5].FontFamily, function () { return {"at":[new System.Windows.Markup.TypeConverterAttribute(System.Windows.Media.FontFamilyTypeConverter)],"m":[{"a":2,"n":"FamilyName","t":16,"rt":String,"g":{"a":2,"n":"get_FamilyName","t":8,"sn":"getFamilyName","rt":String}},{"a":2,"n":"FamilyNames","t":16,"rt":$n[7].IEnumerable$1(String),"g":{"a":2,"n":"get_FamilyNames","t":8,"sn":"getFamilyNames","rt":$n[7].IEnumerable$1(String)},"s":{"a":1,"n":"set_FamilyNames","t":8,"pi":[{"n":"value","pt":$n[7].IEnumerable$1(String),"ps":0}],"sn":"setFamilyNames","rt":Object,"p":[$n[7].IEnumerable$1(String)]}}]}; });
    $m($n[5].LinearGradientBrush, function () { return {"m":[{"a":2,"n":"EndPoint","t":16,"rt":$n[1].Point,"g":{"a":2,"n":"get_EndPoint","t":8,"sn":"getEndPoint","rt":$n[1].Point},"s":{"a":2,"n":"set_EndPoint","t":8,"pi":[{"n":"value","pt":$n[1].Point,"ps":0}],"sn":"setEndPoint","rt":Object,"p":[$n[1].Point]}},{"a":2,"n":"StartPoint","t":16,"rt":$n[1].Point,"g":{"a":2,"n":"get_StartPoint","t":8,"sn":"getStartPoint","rt":$n[1].Point},"s":{"a":2,"n":"set_StartPoint","t":8,"pi":[{"n":"value","pt":$n[1].Point,"ps":0}],"sn":"setStartPoint","rt":Object,"p":[$n[1].Point]}}]}; });
    $m($n[5].TransformGroup, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Children")],"m":[{"a":2,"n":"Children","t":16,"rt":$n[1].FreezableCollection$1(System.Windows.Media.Transform),"g":{"a":2,"n":"get_Children","t":8,"sn":"getChildren","rt":$n[1].FreezableCollection$1(System.Windows.Media.Transform)},"s":{"a":1,"n":"set_Children","t":8,"pi":[{"n":"value","pt":$n[1].FreezableCollection$1(System.Windows.Media.Transform),"ps":0}],"sn":"setChildren","rt":Object,"p":[$n[1].FreezableCollection$1(System.Windows.Media.Transform)]}},{"ov":true,"a":2,"n":"Value","t":16,"rt":$n[5].Matrix,"g":{"ov":true,"a":2,"n":"get_Value","t":8,"sn":"getValue$5","rt":$n[5].Matrix}}]}; });
    $m($n[5].Visual, function () { return {"m":[{"a":2,"n":"VisualBounds","t":16,"rt":$n[1].Rect,"g":{"a":2,"n":"get_VisualBounds","t":8,"sn":"getVisualBounds","rt":$n[1].Rect},"s":{"a":3,"n":"set_VisualBounds","t":8,"pi":[{"n":"value","pt":$n[1].Rect,"ps":0}],"sn":"setVisualBounds","rt":Object,"p":[$n[1].Rect]}},{"a":2,"n":"VisualChildren","t":16,"rt":$n[9].ReadOnlyCollection$1(System.Windows.Media.Visual),"g":{"a":2,"n":"get_VisualChildren","t":8,"sn":"getVisualChildren","rt":$n[9].ReadOnlyCollection$1(System.Windows.Media.Visual)},"s":{"a":1,"n":"set_VisualChildren","t":8,"pi":[{"n":"value","pt":$n[9].ReadOnlyCollection$1(System.Windows.Media.Visual),"ps":0}],"sn":"setVisualChildren","rt":Object,"p":[$n[9].ReadOnlyCollection$1(System.Windows.Media.Visual)]}},{"a":2,"n":"VisualLevel","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_VisualLevel","t":8,"sn":"getVisualLevel","rt":$n[0].Int32}},{"a":2,"n":"VisualOffset","t":16,"rt":$n[1].Point,"g":{"a":2,"n":"get_VisualOffset","t":8,"sn":"getVisualOffset","rt":$n[1].Point}},{"a":2,"n":"VisualParent","t":16,"rt":$n[5].Visual,"g":{"a":2,"n":"get_VisualParent","t":8,"sn":"getVisualParent","rt":$n[5].Visual},"s":{"a":1,"n":"set_VisualParent","t":8,"pi":[{"n":"value","pt":$n[5].Visual,"ps":0}],"sn":"setVisualParent","rt":Object,"p":[$n[5].Visual]}},{"a":2,"n":"VisualSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_VisualSize","t":8,"sn":"getVisualSize","rt":$n[1].Size}},{"a":2,"n":"VisualTransform","t":16,"rt":$n[5].Matrix,"g":{"a":2,"n":"get_VisualTransform","t":8,"sn":"getVisualTransform","rt":$n[5].Matrix},"s":{"a":1,"n":"set_VisualTransform","t":8,"pi":[{"n":"value","pt":$n[5].Matrix,"ps":0}],"sn":"setVisualTransform","rt":Object,"p":[$n[5].Matrix]}}]}; });
    $m($n[14].BitmapSource, function () { return {"m":[{"a":2,"n":"IsDownloading","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsDownloading","t":8,"sn":"getIsDownloading","rt":Boolean},"s":{"a":1,"n":"set_IsDownloading","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsDownloading","rt":Object,"p":[Boolean]}},{"ov":true,"a":2,"n":"RenderImageSource","t":16,"rt":$n[5].IRenderImageSource,"g":{"ov":true,"a":2,"n":"get_RenderImageSource","t":8,"sn":"getRenderImageSource","rt":$n[5].IRenderImageSource}}]}; });
    $m($n[8].KeyFramesAnimationTimeline$1, function (T) { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("KeyFrames")],"m":[{"a":2,"n":"KeyFrames","t":16,"rt":$n[1].FreezableCollection$1(System.Windows.Media.Animation.KeyFrame$1(T)),"g":{"a":2,"n":"get_KeyFrames","t":8,"sn":"getKeyFrames","rt":$n[1].FreezableCollection$1(System.Windows.Media.Animation.KeyFrame$1(T))},"s":{"a":1,"n":"set_KeyFrames","t":8,"pi":[{"n":"value","pt":$n[1].FreezableCollection$1(System.Windows.Media.Animation.KeyFrame$1(T)),"ps":0}],"sn":"setKeyFrames","rt":Object,"p":[$n[1].FreezableCollection$1(System.Windows.Media.Animation.KeyFrame$1(T))]}}]}; });
    $m($n[8].BeginStoryboard, function () { return {"at":[new System.Windows.Markup.RuntimeNamePropertyAttribute("Name"),new System.Windows.Markup.ContentPropertyAttribute("Storyboard")],"m":[{"a":2,"n":"HandoffBehavior","t":16,"rt":$n[8].HandoffBehavior,"g":{"a":2,"n":"get_HandoffBehavior","t":8,"sn":"getHandoffBehavior","rt":$n[8].HandoffBehavior},"s":{"a":2,"n":"set_HandoffBehavior","t":8,"pi":[{"n":"value","pt":$n[8].HandoffBehavior,"ps":0}],"sn":"setHandoffBehavior","rt":Object,"p":[$n[8].HandoffBehavior]}},{"a":2,"n":"Name","t":16,"rt":String,"g":{"a":2,"n":"get_Name","t":8,"sn":"getName","rt":String},"s":{"a":2,"n":"set_Name","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setName","rt":Object,"p":[String]}},{"a":2,"n":"Storyboard","t":16,"rt":$n[8].Storyboard,"g":{"a":2,"n":"get_Storyboard","t":8,"sn":"getStoryboard","rt":$n[8].Storyboard},"s":{"a":2,"n":"set_Storyboard","t":8,"pi":[{"n":"value","pt":$n[8].Storyboard,"ps":0}],"sn":"setStoryboard","rt":Object,"p":[$n[8].Storyboard]}}]}; });
    $m($n[8].StoryboardAction, function () { return {"m":[{"a":2,"n":"BeginStoryboardName","t":16,"rt":String,"g":{"a":2,"n":"get_BeginStoryboardName","t":8,"sn":"getBeginStoryboardName","rt":String},"s":{"a":2,"n":"set_BeginStoryboardName","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setBeginStoryboardName","rt":Object,"p":[String]}}]}; });
    $m($n[8].Timeline, function () { return {"m":[{"a":2,"n":"AutoReverse","t":16,"rt":Boolean,"g":{"a":2,"n":"get_AutoReverse","t":8,"sn":"getAutoReverse","rt":Boolean},"s":{"a":2,"n":"set_AutoReverse","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setAutoReverse","rt":Object,"p":[Boolean]}},{"a":2,"n":"BeginTime","t":16,"rt":$n[0].TimeSpan,"g":{"a":2,"n":"get_BeginTime","t":8,"sn":"getBeginTime","rt":$n[0].TimeSpan},"s":{"a":2,"n":"set_BeginTime","t":8,"pi":[{"n":"value","pt":$n[0].TimeSpan,"ps":0}],"sn":"setBeginTime","rt":Object,"p":[$n[0].TimeSpan]}},{"a":2,"n":"Duration","t":16,"rt":$n[1].Duration,"g":{"a":2,"n":"get_Duration","t":8,"sn":"getDuration","rt":$n[1].Duration},"s":{"a":2,"n":"set_Duration","t":8,"pi":[{"n":"value","pt":$n[1].Duration,"ps":0}],"sn":"setDuration","rt":Object,"p":[$n[1].Duration]}},{"a":2,"n":"FillBehavior","t":16,"rt":$n[8].FillBehavior,"g":{"a":2,"n":"get_FillBehavior","t":8,"sn":"getFillBehavior","rt":$n[8].FillBehavior},"s":{"a":2,"n":"set_FillBehavior","t":8,"pi":[{"n":"value","pt":$n[8].FillBehavior,"ps":0}],"sn":"setFillBehavior","rt":Object,"p":[$n[8].FillBehavior]}},{"a":2,"n":"Parent","t":16,"rt":$n[8].TimelineGroup,"g":{"a":2,"n":"get_Parent","t":8,"sn":"getParent","rt":$n[8].TimelineGroup},"s":{"a":2,"n":"set_Parent","t":8,"pi":[{"n":"value","pt":$n[8].TimelineGroup,"ps":0}],"sn":"setParent","rt":Object,"p":[$n[8].TimelineGroup]}},{"a":2,"n":"RepeatBehavior","t":16,"rt":$n[8].RepeatBehavior,"g":{"a":2,"n":"get_RepeatBehavior","t":8,"sn":"getRepeatBehavior","rt":$n[8].RepeatBehavior},"s":{"a":2,"n":"set_RepeatBehavior","t":8,"pi":[{"n":"value","pt":$n[8].RepeatBehavior,"ps":0}],"sn":"setRepeatBehavior","rt":Object,"p":[$n[8].RepeatBehavior]}}]}; });
    $m($n[8].TimelineClock, function () { return {"m":[{"a":2,"n":"CurrentState","t":16,"rt":$n[8].ClockState,"g":{"a":2,"n":"get_CurrentState","t":8,"sn":"getCurrentState","rt":$n[8].ClockState},"s":{"a":1,"n":"set_CurrentState","t":8,"pi":[{"n":"value","pt":$n[8].ClockState,"ps":0}],"sn":"setCurrentState","rt":Object,"p":[$n[8].ClockState]}},{"a":2,"n":"Duration","t":16,"rt":$n[0].TimeSpan,"g":{"a":2,"n":"get_Duration","t":8,"sn":"getDuration","rt":$n[0].TimeSpan}},{"a":2,"n":"FirstTick","t":16,"rt":$n[0].TimeSpan,"g":{"a":2,"n":"get_FirstTick","t":8,"sn":"getFirstTick","rt":$n[0].TimeSpan}},{"a":2,"n":"IsFilling","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsFilling","t":8,"sn":"getIsFilling","rt":Boolean}},{"a":2,"n":"LastTick","t":16,"rt":$n[0].TimeSpan,"g":{"a":2,"n":"get_LastTick","t":8,"sn":"getLastTick","rt":$n[0].TimeSpan}},{"a":2,"n":"Timeline","t":16,"rt":$n[8].Timeline,"g":{"a":2,"n":"get_Timeline","t":8,"sn":"getTimeline","rt":$n[8].Timeline},"s":{"a":1,"n":"set_Timeline","t":8,"pi":[{"n":"value","pt":$n[8].Timeline,"ps":0}],"sn":"setTimeline","rt":Object,"p":[$n[8].Timeline]}}]}; });
    $m($n[8].TimelineGroup, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Children")],"m":[{"a":2,"n":"Children","t":16,"rt":$n[3].ObservableCollection$1(System.Windows.Media.Animation.Timeline),"g":{"a":2,"n":"get_Children","t":8,"sn":"getChildren","rt":$n[3].ObservableCollection$1(System.Windows.Media.Animation.Timeline)},"s":{"a":1,"n":"set_Children","t":8,"pi":[{"n":"value","pt":$n[3].ObservableCollection$1(System.Windows.Media.Animation.Timeline),"ps":0}],"sn":"setChildren","rt":Object,"p":[$n[3].ObservableCollection$1(System.Windows.Media.Animation.Timeline)]}}]}; });
    $m($n[8].TimelineGroupClock, function () { return {"m":[{"a":2,"n":"Children","t":16,"rt":$n[7].IEnumerable$1(System.Windows.Media.Animation.TimelineClock),"g":{"a":2,"n":"get_Children","t":8,"sn":"getChildren","rt":$n[7].IEnumerable$1(System.Windows.Media.Animation.TimelineClock)},"s":{"a":1,"n":"set_Children","t":8,"pi":[{"n":"value","pt":$n[7].IEnumerable$1(System.Windows.Media.Animation.TimelineClock),"ps":0}],"sn":"setChildren","rt":Object,"p":[$n[7].IEnumerable$1(System.Windows.Media.Animation.TimelineClock)]}}]}; });
    $m($n[15].XamlTypes.TypeProvider, function () { return {"at":[new System.Windows.Markup.MarkupExtensionParameterAttribute("Type", 0)],"m":[{"a":2,"n":"Type","t":16,"rt":Function,"g":{"a":2,"n":"get_Type","t":8,"sn":"getType","rt":Function},"s":{"a":2,"n":"set_Type","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setType","rt":Object,"p":[Function]}}]}; });
    $m($n[13].Adorner, function () { return {"m":[{"a":2,"n":"AdornedElement","t":16,"rt":$n[1].UIElement,"g":{"a":2,"n":"get_AdornedElement","t":8,"sn":"getAdornedElement","rt":$n[1].UIElement},"s":{"a":1,"n":"set_AdornedElement","t":8,"pi":[{"n":"value","pt":$n[1].UIElement,"ps":0}],"sn":"setAdornedElement","rt":Object,"p":[$n[1].UIElement]}},{"a":2,"n":"Child","t":16,"rt":$n[1].UIElement,"g":{"a":2,"n":"get_Child","t":8,"sn":"getChild","rt":$n[1].UIElement},"s":{"a":2,"n":"set_Child","t":8,"pi":[{"n":"value","pt":$n[1].UIElement,"ps":0}],"sn":"setChild","rt":Object,"p":[$n[1].UIElement]}}]}; });
    $m($n[2].Binding, function () { return {"at":[new System.Windows.Markup.MarkupExtensionParameterAttribute("Path", 0)],"m":[{"a":2,"n":"Converter","t":16,"rt":$n[2].IValueConverter,"g":{"a":2,"n":"get_Converter","t":8,"sn":"getConverter","rt":$n[2].IValueConverter},"s":{"a":2,"n":"set_Converter","t":8,"pi":[{"n":"value","pt":$n[2].IValueConverter,"ps":0}],"sn":"setConverter","rt":Object,"p":[$n[2].IValueConverter]}},{"a":2,"n":"ConverterParameter","t":16,"rt":Object,"g":{"a":2,"n":"get_ConverterParameter","t":8,"sn":"getConverterParameter","rt":Object},"s":{"a":2,"n":"set_ConverterParameter","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setConverterParameter","rt":Object,"p":[Object]}},{"a":2,"n":"ElementName","t":16,"rt":String,"g":{"a":2,"n":"get_ElementName","t":8,"sn":"getElementName","rt":String},"s":{"a":2,"n":"set_ElementName","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setElementName","rt":Object,"p":[String]}},{"a":2,"n":"FallbackValue","t":16,"rt":Object,"g":{"a":2,"n":"get_FallbackValue","t":8,"sn":"getFallbackValue","rt":Object},"s":{"a":2,"n":"set_FallbackValue","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setFallbackValue","rt":Object,"p":[Object]}},{"a":2,"n":"Mode","t":16,"rt":$n[2].BindingMode,"g":{"a":2,"n":"get_Mode","t":8,"sn":"getMode","rt":$n[2].BindingMode},"s":{"a":2,"n":"set_Mode","t":8,"pi":[{"n":"value","pt":$n[2].BindingMode,"ps":0}],"sn":"setMode","rt":Object,"p":[$n[2].BindingMode]}},{"a":2,"n":"Path","t":16,"rt":$n[1].PropertyPath,"g":{"a":2,"n":"get_Path","t":8,"sn":"getPath","rt":$n[1].PropertyPath},"s":{"a":2,"n":"set_Path","t":8,"pi":[{"n":"value","pt":$n[1].PropertyPath,"ps":0}],"sn":"setPath","rt":Object,"p":[$n[1].PropertyPath]}},{"a":2,"n":"RelativeSource","t":16,"rt":$n[2].RelativeSource,"g":{"a":2,"n":"get_RelativeSource","t":8,"sn":"getRelativeSource","rt":$n[2].RelativeSource},"s":{"a":2,"n":"set_RelativeSource","t":8,"pi":[{"n":"value","pt":$n[2].RelativeSource,"ps":0}],"sn":"setRelativeSource","rt":Object,"p":[$n[2].RelativeSource]}},{"a":2,"n":"Source","t":16,"rt":Object,"g":{"a":2,"n":"get_Source","t":8,"sn":"getSource","rt":Object},"s":{"a":2,"n":"set_Source","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setSource","rt":Object,"p":[Object]}},{"a":2,"n":"StringFormat","t":16,"rt":String,"g":{"a":2,"n":"get_StringFormat","t":8,"sn":"getStringFormat","rt":String},"s":{"a":2,"n":"set_StringFormat","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setStringFormat","rt":Object,"p":[String]}},{"a":2,"n":"TargetNullValue","t":16,"rt":Object,"g":{"a":2,"n":"get_TargetNullValue","t":8,"sn":"getTargetNullValue","rt":Object},"s":{"a":2,"n":"set_TargetNullValue","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setTargetNullValue","rt":Object,"p":[Object]}},{"a":2,"n":"UpdateSourceTrigger","t":16,"rt":$n[2].UpdateSourceTrigger,"g":{"a":2,"n":"get_UpdateSourceTrigger","t":8,"sn":"getUpdateSourceTrigger","rt":$n[2].UpdateSourceTrigger},"s":{"a":2,"n":"set_UpdateSourceTrigger","t":8,"pi":[{"n":"value","pt":$n[2].UpdateSourceTrigger,"ps":0}],"sn":"setUpdateSourceTrigger","rt":Object,"p":[$n[2].UpdateSourceTrigger]}}]}; });
    $m($n[2].CollectionView, function () { return {"m":[{"a":2,"n":"CanFilter","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanFilter","t":8,"sn":"getCanFilter","rt":Boolean}},{"a":2,"n":"CanSort","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanSort","t":8,"sn":"getCanSort","rt":Boolean}},{"a":2,"n":"CurrentItem","t":16,"rt":Object,"g":{"a":2,"n":"get_CurrentItem","t":8,"sn":"getCurrentItem","rt":Object},"s":{"a":2,"n":"set_CurrentItem","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setCurrentItem","rt":Object,"p":[Object]}},{"a":2,"n":"CurrentItemIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_CurrentItemIndex","t":8,"sn":"getCurrentItemIndex","rt":$n[0].Int32},"s":{"a":2,"n":"set_CurrentItemIndex","t":8,"pi":[{"n":"value","pt":$n[0].Int32,"ps":0}],"sn":"setCurrentItemIndex","rt":Object,"p":[$n[0].Int32]}},{"a":2,"n":"FilterPredicate","t":16,"rt":Function,"g":{"a":2,"n":"get_FilterPredicate","t":8,"sn":"getFilterPredicate","rt":Function},"s":{"a":2,"n":"set_FilterPredicate","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setFilterPredicate","rt":Object,"p":[Function]}},{"a":2,"n":"SortDirection","t":16,"rt":$n[3].ListSortDirection,"g":{"a":2,"n":"get_SortDirection","t":8,"sn":"getSortDirection","rt":$n[3].ListSortDirection},"s":{"a":2,"n":"set_SortDirection","t":8,"pi":[{"n":"value","pt":$n[3].ListSortDirection,"ps":0}],"sn":"setSortDirection","rt":Object,"p":[$n[3].ListSortDirection]}},{"a":2,"n":"SortKeySelector","t":16,"rt":Function,"g":{"a":2,"n":"get_SortKeySelector","t":8,"sn":"getSortKeySelector","rt":Function},"s":{"a":2,"n":"set_SortKeySelector","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setSortKeySelector","rt":Object,"p":[Function]}},{"a":2,"n":"SourceCollection","t":16,"rt":$n[10].IEnumerable,"g":{"a":2,"n":"get_SourceCollection","t":8,"sn":"getSourceCollection","rt":$n[10].IEnumerable},"s":{"a":1,"n":"set_SourceCollection","t":8,"pi":[{"n":"value","pt":$n[10].IEnumerable,"ps":0}],"sn":"setSourceCollection","rt":Object,"p":[$n[10].IEnumerable]}}]}; });
    $m($n[2].RelativeSource, function () { return {"at":[new System.Windows.Markup.MarkupExtensionParameterAttribute("Mode", 0)],"m":[{"a":2,"n":"AncestorLevel","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_AncestorLevel","t":8,"sn":"getAncestorLevel","rt":$n[0].Int32},"s":{"a":2,"n":"set_AncestorLevel","t":8,"pi":[{"n":"value","pt":$n[0].Int32,"ps":0}],"sn":"setAncestorLevel","rt":Object,"p":[$n[0].Int32]}},{"a":2,"n":"AncestorType","t":16,"rt":Function,"g":{"a":2,"n":"get_AncestorType","t":8,"sn":"getAncestorType","rt":Function},"s":{"a":2,"n":"set_AncestorType","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setAncestorType","rt":Object,"p":[Function]}},{"a":2,"n":"Mode","t":16,"rt":$n[2].RelativeSourceMode,"g":{"a":2,"n":"get_Mode","t":8,"sn":"getMode","rt":$n[2].RelativeSourceMode},"s":{"a":2,"n":"set_Mode","t":8,"pi":[{"n":"value","pt":$n[2].RelativeSourceMode,"ps":0}],"sn":"setMode","rt":Object,"p":[$n[2].RelativeSourceMode]}}]}; });
    $m($n[11].Control, function () { return {"m":[{"a":2,"n":"Background","t":16,"rt":$n[5].Brush,"g":{"a":2,"n":"get_Background","t":8,"sn":"getBackground","rt":$n[5].Brush},"s":{"a":2,"n":"set_Background","t":8,"pi":[{"n":"value","pt":$n[5].Brush,"ps":0}],"sn":"setBackground","rt":Object,"p":[$n[5].Brush]}},{"a":2,"n":"BorderBrush","t":16,"rt":$n[5].Brush,"g":{"a":2,"n":"get_BorderBrush","t":8,"sn":"getBorderBrush","rt":$n[5].Brush},"s":{"a":2,"n":"set_BorderBrush","t":8,"pi":[{"n":"value","pt":$n[5].Brush,"ps":0}],"sn":"setBorderBrush","rt":Object,"p":[$n[5].Brush]}},{"a":2,"n":"BorderThickness","t":16,"rt":$n[1].Thickness,"g":{"a":2,"n":"get_BorderThickness","t":8,"sn":"getBorderThickness","rt":$n[1].Thickness},"s":{"a":2,"n":"set_BorderThickness","t":8,"pi":[{"n":"value","pt":$n[1].Thickness,"ps":0}],"sn":"setBorderThickness","rt":Object,"p":[$n[1].Thickness]}},{"a":2,"n":"FontFamily","t":16,"rt":$n[5].FontFamily,"g":{"a":2,"n":"get_FontFamily","t":8,"sn":"getFontFamily","rt":$n[5].FontFamily},"s":{"a":2,"n":"set_FontFamily","t":8,"pi":[{"n":"value","pt":$n[5].FontFamily,"ps":0}],"sn":"setFontFamily","rt":Object,"p":[$n[5].FontFamily]}},{"a":2,"n":"FontSize","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_FontSize","t":8,"sn":"getFontSize","rt":$n[0].Double},"s":{"a":2,"n":"set_FontSize","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setFontSize","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"FontStretch","t":16,"rt":$n[1].FontStretch,"g":{"a":2,"n":"get_FontStretch","t":8,"sn":"getFontStretch","rt":$n[1].FontStretch},"s":{"a":2,"n":"set_FontStretch","t":8,"pi":[{"n":"value","pt":$n[1].FontStretch,"ps":0}],"sn":"setFontStretch","rt":Object,"p":[$n[1].FontStretch]}},{"a":2,"n":"FontStyle","t":16,"rt":$n[1].FontStyle,"g":{"a":2,"n":"get_FontStyle","t":8,"sn":"getFontStyle","rt":$n[1].FontStyle},"s":{"a":2,"n":"set_FontStyle","t":8,"pi":[{"n":"value","pt":$n[1].FontStyle,"ps":0}],"sn":"setFontStyle","rt":Object,"p":[$n[1].FontStyle]}},{"a":2,"n":"FontWeight","t":16,"rt":$n[1].FontWeight,"g":{"a":2,"n":"get_FontWeight","t":8,"sn":"getFontWeight","rt":$n[1].FontWeight},"s":{"a":2,"n":"set_FontWeight","t":8,"pi":[{"n":"value","pt":$n[1].FontWeight,"ps":0}],"sn":"setFontWeight","rt":Object,"p":[$n[1].FontWeight]}},{"a":2,"n":"Foreground","t":16,"rt":$n[5].Brush,"g":{"a":2,"n":"get_Foreground","t":8,"sn":"getForeground","rt":$n[5].Brush},"s":{"a":2,"n":"set_Foreground","t":8,"pi":[{"n":"value","pt":$n[5].Brush,"ps":0}],"sn":"setForeground","rt":Object,"p":[$n[5].Brush]}},{"a":2,"n":"HorizontalContentAlignment","t":16,"rt":$n[1].HorizontalAlignment,"g":{"a":2,"n":"get_HorizontalContentAlignment","t":8,"sn":"getHorizontalContentAlignment","rt":$n[1].HorizontalAlignment},"s":{"a":2,"n":"set_HorizontalContentAlignment","t":8,"pi":[{"n":"value","pt":$n[1].HorizontalAlignment,"ps":0}],"sn":"setHorizontalContentAlignment","rt":Object,"p":[$n[1].HorizontalAlignment]}},{"a":2,"n":"IsTabStop","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsTabStop","t":8,"sn":"getIsTabStop","rt":Boolean},"s":{"a":2,"n":"set_IsTabStop","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsTabStop","rt":Object,"p":[Boolean]}},{"a":2,"n":"Padding","t":16,"rt":$n[1].Thickness,"g":{"a":2,"n":"get_Padding","t":8,"sn":"getPadding","rt":$n[1].Thickness},"s":{"a":2,"n":"set_Padding","t":8,"pi":[{"n":"value","pt":$n[1].Thickness,"ps":0}],"sn":"setPadding","rt":Object,"p":[$n[1].Thickness]}},{"a":2,"n":"TabIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_TabIndex","t":8,"sn":"getTabIndex","rt":$n[0].Int32},"s":{"a":2,"n":"set_TabIndex","t":8,"pi":[{"n":"value","pt":$n[0].Int32,"ps":0}],"sn":"setTabIndex","rt":Object,"p":[$n[0].Int32]}},{"a":2,"n":"Template","t":16,"rt":$n[11].ControlTemplate,"g":{"a":2,"n":"get_Template","t":8,"sn":"getTemplate$1","rt":$n[11].ControlTemplate},"s":{"a":2,"n":"set_Template","t":8,"pi":[{"n":"value","pt":$n[11].ControlTemplate,"ps":0}],"sn":"setTemplate$1","rt":Object,"p":[$n[11].ControlTemplate]}},{"a":2,"n":"VerticalContentAlignment","t":16,"rt":$n[1].VerticalAlignment,"g":{"a":2,"n":"get_VerticalContentAlignment","t":8,"sn":"getVerticalContentAlignment","rt":$n[1].VerticalAlignment},"s":{"a":2,"n":"set_VerticalContentAlignment","t":8,"pi":[{"n":"value","pt":$n[1].VerticalAlignment,"ps":0}],"sn":"setVerticalContentAlignment","rt":Object,"p":[$n[1].VerticalAlignment]}}]}; });
    $m($n[11].ControlTemplate, function () { return {"at":[new System.Windows.Markup.DictionaryKeyPropertyAttribute("Key")],"m":[{"a":2,"n":"Key","t":16,"rt":Object,"g":{"a":2,"n":"get_Key","t":8,"sn":"getKey","rt":Object},"s":{"a":2,"n":"set_Key","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setKey","rt":Object,"p":[Object]}},{"a":2,"n":"TargetType","t":16,"rt":Function,"g":{"a":2,"n":"get_TargetType","t":8,"sn":"getTargetType","rt":Function},"s":{"a":2,"n":"set_TargetType","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setTargetType","rt":Object,"p":[Function]}}]}; });
    $m($n[11].Decorator, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Child")],"m":[{"a":2,"n":"Child","t":16,"rt":$n[1].UIElement,"g":{"a":2,"n":"get_Child","t":8,"sn":"getChild","rt":$n[1].UIElement},"s":{"a":2,"n":"set_Child","t":8,"pi":[{"n":"value","pt":$n[1].UIElement,"ps":0}],"sn":"setChild","rt":Object,"p":[$n[1].UIElement]}}]}; });
    $m($n[11].Grid, function () { return {"m":[{"a":2,"n":"ColumnDefinitions","t":16,"rt":$n[1].FreezableCollection$1(System.Windows.Controls.ColumnDefinition),"g":{"a":2,"n":"get_ColumnDefinitions","t":8,"sn":"getColumnDefinitions","rt":$n[1].FreezableCollection$1(System.Windows.Controls.ColumnDefinition)},"s":{"a":1,"n":"set_ColumnDefinitions","t":8,"pi":[{"n":"value","pt":$n[1].FreezableCollection$1(System.Windows.Controls.ColumnDefinition),"ps":0}],"sn":"setColumnDefinitions","rt":Object,"p":[$n[1].FreezableCollection$1(System.Windows.Controls.ColumnDefinition)]}},{"a":2,"n":"RowDefinitions","t":16,"rt":$n[1].FreezableCollection$1(System.Windows.Controls.RowDefinition),"g":{"a":2,"n":"get_RowDefinitions","t":8,"sn":"getRowDefinitions","rt":$n[1].FreezableCollection$1(System.Windows.Controls.RowDefinition)},"s":{"a":1,"n":"set_RowDefinitions","t":8,"pi":[{"n":"value","pt":$n[1].FreezableCollection$1(System.Windows.Controls.RowDefinition),"ps":0}],"sn":"setRowDefinitions","rt":Object,"p":[$n[1].FreezableCollection$1(System.Windows.Controls.RowDefinition)]}}]}; });
    $m($n[11].ItemCollection, function () { return {"m":[{"a":2,"n":"CanFilter","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanFilter","t":8,"sn":"getCanFilter","rt":Boolean}},{"a":2,"n":"CanSort","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanSort","t":8,"sn":"getCanSort","rt":Boolean}},{"a":2,"n":"Count","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Count","t":8,"sn":"getCount","rt":$n[0].Int32}},{"a":2,"n":"CurrentItem","t":16,"rt":Object,"g":{"a":2,"n":"get_CurrentItem","t":8,"sn":"getCurrentItem","rt":Object},"s":{"a":2,"n":"set_CurrentItem","t":8,"pi":[{"n":"value","pt":Object,"ps":0}],"sn":"setCurrentItem","rt":Object,"p":[Object]}},{"a":2,"n":"CurrentItemIndex","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_CurrentItemIndex","t":8,"sn":"getCurrentItemIndex","rt":$n[0].Int32},"s":{"a":2,"n":"set_CurrentItemIndex","t":8,"pi":[{"n":"value","pt":$n[0].Int32,"ps":0}],"sn":"setCurrentItemIndex","rt":Object,"p":[$n[0].Int32]}},{"a":2,"n":"FilterPredicate","t":16,"rt":Function,"g":{"a":2,"n":"get_FilterPredicate","t":8,"sn":"getFilterPredicate","rt":Function},"s":{"a":2,"n":"set_FilterPredicate","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setFilterPredicate","rt":Object,"p":[Function]}},{"a":2,"n":"IsReadOnly","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsReadOnly","t":8,"sn":"getIsReadOnly","rt":Boolean}},{"a":2,"n":"SortDirection","t":16,"rt":$n[3].ListSortDirection,"g":{"a":2,"n":"get_SortDirection","t":8,"sn":"getSortDirection","rt":$n[3].ListSortDirection},"s":{"a":2,"n":"set_SortDirection","t":8,"pi":[{"n":"value","pt":$n[3].ListSortDirection,"ps":0}],"sn":"setSortDirection","rt":Object,"p":[$n[3].ListSortDirection]}},{"a":2,"n":"SortKeySelector","t":16,"rt":Function,"g":{"a":2,"n":"get_SortKeySelector","t":8,"sn":"getSortKeySelector","rt":Function},"s":{"a":2,"n":"set_SortKeySelector","t":8,"pi":[{"n":"value","pt":Function,"ps":0}],"sn":"setSortKeySelector","rt":Object,"p":[Function]}},{"a":2,"n":"SourceCollection","t":16,"rt":$n[10].IEnumerable,"g":{"a":2,"n":"get_SourceCollection","t":8,"sn":"getSourceCollection","rt":$n[10].IEnumerable}}]}; });
    $m($n[11].ItemsControl, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Items")],"m":[{"a":2,"n":"ItemContainerGenerator","t":16,"rt":$n[12].IItemContainerGenerator,"g":{"a":2,"n":"get_ItemContainerGenerator","t":8,"sn":"getItemContainerGenerator","rt":$n[12].IItemContainerGenerator},"s":{"a":1,"n":"set_ItemContainerGenerator","t":8,"pi":[{"n":"value","pt":$n[12].IItemContainerGenerator,"ps":0}],"sn":"setItemContainerGenerator","rt":Object,"p":[$n[12].IItemContainerGenerator]}},{"a":2,"n":"ItemContainerStyle","t":16,"rt":$n[1].Style,"g":{"a":2,"n":"get_ItemContainerStyle","t":8,"sn":"getItemContainerStyle","rt":$n[1].Style},"s":{"a":2,"n":"set_ItemContainerStyle","t":8,"pi":[{"n":"value","pt":$n[1].Style,"ps":0}],"sn":"setItemContainerStyle","rt":Object,"p":[$n[1].Style]}},{"a":2,"n":"ItemContainerStyleSelector","t":16,"rt":$n[11].IStyleSelector,"g":{"a":2,"n":"get_ItemContainerStyleSelector","t":8,"sn":"getItemContainerStyleSelector","rt":$n[11].IStyleSelector},"s":{"a":2,"n":"set_ItemContainerStyleSelector","t":8,"pi":[{"n":"value","pt":$n[11].IStyleSelector,"ps":0}],"sn":"setItemContainerStyleSelector","rt":Object,"p":[$n[11].IStyleSelector]}},{"a":2,"n":"ItemTemplate","t":16,"rt":$n[1].DataTemplate,"g":{"a":2,"n":"get_ItemTemplate","t":8,"sn":"getItemTemplate","rt":$n[1].DataTemplate},"s":{"a":2,"n":"set_ItemTemplate","t":8,"pi":[{"n":"value","pt":$n[1].DataTemplate,"ps":0}],"sn":"setItemTemplate","rt":Object,"p":[$n[1].DataTemplate]}},{"a":2,"n":"ItemTemplateSelector","t":16,"rt":$n[11].IDataTemplateSelector,"g":{"a":2,"n":"get_ItemTemplateSelector","t":8,"sn":"getItemTemplateSelector","rt":$n[11].IDataTemplateSelector},"s":{"a":2,"n":"set_ItemTemplateSelector","t":8,"pi":[{"n":"value","pt":$n[11].IDataTemplateSelector,"ps":0}],"sn":"setItemTemplateSelector","rt":Object,"p":[$n[11].IDataTemplateSelector]}},{"a":2,"n":"Items","t":16,"rt":$n[11].ItemCollection,"g":{"a":2,"n":"get_Items","t":8,"sn":"getItems","rt":$n[11].ItemCollection},"s":{"a":1,"n":"set_Items","t":8,"pi":[{"n":"value","pt":$n[11].ItemCollection,"ps":0}],"sn":"setItems","rt":Object,"p":[$n[11].ItemCollection]}},{"a":2,"n":"ItemsPanel","t":16,"rt":$n[1].IFrameworkTemplate,"g":{"a":2,"n":"get_ItemsPanel","t":8,"sn":"getItemsPanel","rt":$n[1].IFrameworkTemplate},"s":{"a":2,"n":"set_ItemsPanel","t":8,"pi":[{"n":"value","pt":$n[1].IFrameworkTemplate,"ps":0}],"sn":"setItemsPanel","rt":Object,"p":[$n[1].IFrameworkTemplate]}},{"a":2,"n":"ItemsSource","t":16,"rt":$n[10].IEnumerable,"g":{"a":2,"n":"get_ItemsSource","t":8,"sn":"getItemsSource","rt":$n[10].IEnumerable},"s":{"a":2,"n":"set_ItemsSource","t":8,"pi":[{"n":"value","pt":$n[10].IEnumerable,"ps":0}],"sn":"setItemsSource","rt":Object,"p":[$n[10].IEnumerable]}}]}; });
    $m($n[11].Panel, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Children")],"m":[{"a":2,"n":"Background","t":16,"rt":$n[5].Brush,"g":{"a":2,"n":"get_Background","t":8,"sn":"getBackground","rt":$n[5].Brush},"s":{"a":2,"n":"set_Background","t":8,"pi":[{"n":"value","pt":$n[5].Brush,"ps":0}],"sn":"setBackground","rt":Object,"p":[$n[5].Brush]}},{"a":2,"n":"Children","t":16,"rt":$n[11].UIElementCollection,"g":{"a":2,"n":"get_Children","t":8,"sn":"getChildren","rt":$n[11].UIElementCollection},"s":{"a":1,"n":"set_Children","t":8,"pi":[{"n":"value","pt":$n[11].UIElementCollection,"ps":0}],"sn":"setChildren","rt":Object,"p":[$n[11].UIElementCollection]}},{"a":2,"n":"IsItemsHost","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsItemsHost","t":8,"sn":"getIsItemsHost","rt":Boolean},"s":{"a":2,"n":"set_IsItemsHost","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsItemsHost","rt":Object,"p":[Boolean]}},{"a":2,"n":"ItemContainerGenerator","t":16,"rt":$n[12].IItemContainerGenerator,"g":{"a":2,"n":"get_ItemContainerGenerator","t":8,"sn":"getItemContainerGenerator","rt":$n[12].IItemContainerGenerator},"s":{"a":2,"n":"set_ItemContainerGenerator","t":8,"pi":[{"n":"value","pt":$n[12].IItemContainerGenerator,"ps":0}],"sn":"setItemContainerGenerator","rt":Object,"p":[$n[12].IItemContainerGenerator]}}]}; });
    $m($n[11].PasswordBox, function () { return {"at":[new System.Windows.TemplatePartAttribute.$ctor1("PART_ContentHost", System.Windows.FrameworkElement)],"m":[{"a":2,"n":"MaxLength","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_MaxLength","t":8,"sn":"getMaxLength","rt":$n[0].Int32},"s":{"a":2,"n":"set_MaxLength","t":8,"pi":[{"n":"value","pt":$n[0].Int32,"ps":0}],"sn":"setMaxLength","rt":Object,"p":[$n[0].Int32]}},{"a":2,"n":"Password","t":16,"rt":String,"g":{"a":2,"n":"get_Password","t":8,"sn":"getPassword","rt":String},"s":{"a":2,"n":"set_Password","t":8,"pi":[{"n":"value","pt":String,"ps":0}],"sn":"setPassword","rt":Object,"p":[String]}}]}; });
    $m($n[11].ScrollContentPresenter, function () { return {"m":[{"a":2,"n":"AdornerLayer","t":16,"rt":$n[13].AdornerLayer,"g":{"a":2,"n":"get_AdornerLayer","t":8,"sn":"getAdornerLayer","rt":$n[13].AdornerLayer},"s":{"a":1,"n":"set_AdornerLayer","t":8,"pi":[{"n":"value","pt":$n[13].AdornerLayer,"ps":0}],"sn":"setAdornerLayer","rt":Object,"p":[$n[13].AdornerLayer]}},{"a":2,"n":"CanContentScroll","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanContentScroll","t":8,"sn":"getCanContentScroll","rt":Boolean},"s":{"a":2,"n":"set_CanContentScroll","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setCanContentScroll","rt":Object,"p":[Boolean]}},{"a":2,"n":"CanHorizontallyScroll","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanHorizontallyScroll","t":8,"sn":"getCanHorizontallyScroll","rt":Boolean},"s":{"a":2,"n":"set_CanHorizontallyScroll","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setCanHorizontallyScroll","rt":Object,"p":[Boolean]}},{"a":2,"n":"CanVerticallyScroll","t":16,"rt":Boolean,"g":{"a":2,"n":"get_CanVerticallyScroll","t":8,"sn":"getCanVerticallyScroll","rt":Boolean},"s":{"a":2,"n":"set_CanVerticallyScroll","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setCanVerticallyScroll","rt":Object,"p":[Boolean]}},{"a":2,"n":"ExtentSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_ExtentSize","t":8,"sn":"getExtentSize","rt":$n[1].Size}},{"a":2,"n":"Offset","t":16,"rt":$n[1].Point,"g":{"a":2,"n":"get_Offset","t":8,"sn":"getOffset","rt":$n[1].Point},"s":{"a":2,"n":"set_Offset","t":8,"pi":[{"n":"value","pt":$n[1].Point,"ps":0}],"sn":"setOffset","rt":Object,"p":[$n[1].Point]}},{"a":2,"n":"ViewportSize","t":16,"rt":$n[1].Size,"g":{"a":2,"n":"get_ViewportSize","t":8,"sn":"getViewportSize","rt":$n[1].Size}}]}; });
    $m($n[11].UIElementCollection, function () { return {"m":[{"a":2,"n":"Count","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Count","t":8,"sn":"getCount","rt":$n[0].Int32}},{"a":2,"n":"IsReadOnly","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsReadOnly","t":8,"sn":"getIsReadOnly","rt":Boolean}}]}; });
    $m($n[12].Popup, function () { return {"at":[new System.Windows.Markup.ContentPropertyAttribute("Child")],"m":[{"a":2,"n":"Child","t":16,"rt":$n[1].UIElement,"g":{"a":2,"n":"get_Child","t":8,"sn":"getChild","rt":$n[1].UIElement},"s":{"a":2,"n":"set_Child","t":8,"pi":[{"n":"value","pt":$n[1].UIElement,"ps":0}],"sn":"setChild","rt":Object,"p":[$n[1].UIElement]}},{"a":2,"n":"HorizontalOffset","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_HorizontalOffset","t":8,"sn":"getHorizontalOffset","rt":$n[0].Double},"s":{"a":2,"n":"set_HorizontalOffset","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setHorizontalOffset","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"IsOpen","t":16,"rt":Boolean,"g":{"a":2,"n":"get_IsOpen","t":8,"sn":"getIsOpen","rt":Boolean},"s":{"a":2,"n":"set_IsOpen","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setIsOpen","rt":Object,"p":[Boolean]}},{"a":2,"n":"Placement","t":16,"rt":$n[12].PlacementMode,"g":{"a":2,"n":"get_Placement","t":8,"sn":"getPlacement","rt":$n[12].PlacementMode},"s":{"a":2,"n":"set_Placement","t":8,"pi":[{"n":"value","pt":$n[12].PlacementMode,"ps":0}],"sn":"setPlacement","rt":Object,"p":[$n[12].PlacementMode]}},{"a":2,"n":"PlacementRectangle","t":16,"rt":$n[1].Rect,"g":{"a":2,"n":"get_PlacementRectangle","t":8,"sn":"getPlacementRectangle","rt":$n[1].Rect},"s":{"a":2,"n":"set_PlacementRectangle","t":8,"pi":[{"n":"value","pt":$n[1].Rect,"ps":0}],"sn":"setPlacementRectangle","rt":Object,"p":[$n[1].Rect]}},{"a":2,"n":"PlacementTarget","t":16,"rt":$n[5].Visual,"g":{"a":2,"n":"get_PlacementTarget","t":8,"sn":"getPlacementTarget","rt":$n[5].Visual},"s":{"a":2,"n":"set_PlacementTarget","t":8,"pi":[{"n":"value","pt":$n[5].Visual,"ps":0}],"sn":"setPlacementTarget","rt":Object,"p":[$n[5].Visual]}},{"a":2,"n":"StaysOpen","t":16,"rt":Boolean,"g":{"a":2,"n":"get_StaysOpen","t":8,"sn":"getStaysOpen","rt":Boolean},"s":{"a":2,"n":"set_StaysOpen","t":8,"pi":[{"n":"value","pt":Boolean,"ps":0}],"sn":"setStaysOpen","rt":Object,"p":[Boolean]}},{"a":2,"n":"VerticalOffset","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_VerticalOffset","t":8,"sn":"getVerticalOffset","rt":$n[0].Double},"s":{"a":2,"n":"set_VerticalOffset","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setVerticalOffset","rt":Object,"p":[$n[0].Double]}}]}; });
    $m($n[12].Track, function () { return {"m":[{"a":2,"n":"DecreaseRepeatButton","t":16,"rt":$n[12].RepeatButton,"g":{"a":2,"n":"get_DecreaseRepeatButton","t":8,"sn":"getDecreaseRepeatButton","rt":$n[12].RepeatButton},"s":{"a":2,"n":"set_DecreaseRepeatButton","t":8,"pi":[{"n":"value","pt":$n[12].RepeatButton,"ps":0}],"sn":"setDecreaseRepeatButton","rt":Object,"p":[$n[12].RepeatButton]}},{"a":2,"n":"IncreaseRepeatButton","t":16,"rt":$n[12].RepeatButton,"g":{"a":2,"n":"get_IncreaseRepeatButton","t":8,"sn":"getIncreaseRepeatButton","rt":$n[12].RepeatButton},"s":{"a":2,"n":"set_IncreaseRepeatButton","t":8,"pi":[{"n":"value","pt":$n[12].RepeatButton,"ps":0}],"sn":"setIncreaseRepeatButton","rt":Object,"p":[$n[12].RepeatButton]}},{"a":2,"n":"Maximum","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Maximum","t":8,"sn":"getMaximum","rt":$n[0].Double},"s":{"a":2,"n":"set_Maximum","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setMaximum","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"Minimum","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Minimum","t":8,"sn":"getMinimum","rt":$n[0].Double},"s":{"a":2,"n":"set_Minimum","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setMinimum","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"Orientation","t":16,"rt":$n[11].Orientation,"g":{"a":2,"n":"get_Orientation","t":8,"sn":"getOrientation","rt":$n[11].Orientation},"s":{"a":2,"n":"set_Orientation","t":8,"pi":[{"n":"value","pt":$n[11].Orientation,"ps":0}],"sn":"setOrientation","rt":Object,"p":[$n[11].Orientation]}},{"a":2,"n":"Thumb","t":16,"rt":$n[12].Thumb,"g":{"a":2,"n":"get_Thumb","t":8,"sn":"getThumb","rt":$n[12].Thumb},"s":{"a":2,"n":"set_Thumb","t":8,"pi":[{"n":"value","pt":$n[12].Thumb,"ps":0}],"sn":"setThumb","rt":Object,"p":[$n[12].Thumb]}},{"a":2,"n":"ThumbMinLength","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_ThumbMinLength","t":8,"sn":"getThumbMinLength","rt":$n[0].Double},"s":{"a":2,"n":"set_ThumbMinLength","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setThumbMinLength","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"Value","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Value","t":8,"sn":"getValue$5","rt":$n[0].Double},"s":{"a":2,"n":"set_Value","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setValue$5","rt":Object,"p":[$n[0].Double]}},{"a":2,"n":"ViewportSize","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_ViewportSize","t":8,"sn":"getViewportSize","rt":$n[0].Double},"s":{"a":2,"n":"set_ViewportSize","t":8,"pi":[{"n":"value","pt":$n[0].Double,"ps":0}],"sn":"setViewportSize","rt":Object,"p":[$n[0].Double]}}]}; });
});
