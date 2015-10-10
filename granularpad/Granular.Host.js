(function() {
	'use strict';
	var $asm = {};
	global.Granular = global.Granular || {};
	global.Granular.Host = global.Granular.Host || {};
	global.Granular.Host.Render = global.Granular.Host.Render || {};
	ss.initAssembly($asm, 'Granular.Host');
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.HtmlStyleDictionaryExtensions
	var $Granular_Host_$HtmlStyleDictionaryExtensions = function() {
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.__typeName = 'Granular.Host.$HtmlStyleDictionaryExtensions';
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground = function(style, background, converter) {
		style.ClearValue('background-color');
		style.ClearValue('background-image');
		if (ss.isInstanceOfType(background, System.Windows.Media.SolidColorBrush)) {
			style.SetValue('background-color', converter.ToColorString$1(ss.cast(background, System.Windows.Media.SolidColorBrush)));
		}
		else if (ss.isValue(background)) {
			style.SetValue('background-image', $Granular_Host_HtmlValueConverterExtensions.ToImageString(converter, background));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundLocation = function(style, location, converter) {
		if (System.Windows.Point.IsNullOrEmpty(location)) {
			style.ClearValue('background-position');
		}
		else {
			style.SetValue('background-position', converter.ToPixelString$1(location));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundSize = function(style, size, converter) {
		if (System.Windows.Size.IsNullOrEmpty(size)) {
			style.ClearValue('background-size');
		}
		else {
			style.SetValue('background-size', converter.ToPixelString$2(size));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundBounds = function(style, bounds, converter) {
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundLocation(style, bounds.get_Location(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundSize(style, bounds.get_Size(), converter);
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderThickness = function(style, borderThickness, converter) {
		if (ss.referenceEquals(borderThickness, System.Windows.Thickness.Zero)) {
			style.ClearValue('border-style');
			style.ClearValue('border-width');
			style.ClearValue('border-image-slice');
		}
		else {
			style.SetValue('border-style', 'solid');
			style.SetValue('border-width', converter.ToPixelString$3(borderThickness));
			style.SetValue('border-image-slice', converter.ToImplicitValueString$2(borderThickness));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderBrush = function(style, borderBrush, converter) {
		style.ClearValue('border-color');
		style.ClearValue('border-image-source');
		if (ss.isInstanceOfType(borderBrush, System.Windows.Media.SolidColorBrush)) {
			style.SetValue('border-color', converter.ToColorString$1(ss.cast(borderBrush, System.Windows.Media.SolidColorBrush)));
		}
		else if (ss.isValue(borderBrush)) {
			style.SetValue('border-image-source', $Granular_Host_HtmlValueConverterExtensions.ToImageString(converter, borderBrush));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds = function(style, bounds, converter) {
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetLocation(style, bounds.get_Location(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetSize(style, bounds.get_Size(), converter);
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetLocation = function(style, location, converter) {
		style.SetValue('position', 'absolute');
		style.SetValue('left', converter.ToPixelString(location.get_X()));
		style.SetValue('top', converter.ToPixelString(location.get_Y()));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetSize = function(style, size, converter) {
		if (Granular.Extensions.DoubleExtensions.IsNaN(size.get_Width())) {
			style.ClearValue('width');
		}
		else {
			style.SetValue('width', converter.ToPixelString(size.get_Width()));
		}
		if (Granular.Extensions.DoubleExtensions.IsNaN(size.get_Height())) {
			style.ClearValue('height');
		}
		else {
			style.SetValue('height', converter.ToPixelString(size.get_Height()));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetClipToBounds = function(style, clipToBounds) {
		style.SetValue('overflow', (clipToBounds ? 'hidden' : 'visible'));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible = function(style, isHitTestVisible) {
		style.SetValue('pointer-events', (isHitTestVisible ? 'auto' : 'none'));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsVisible = function(style, isVisible) {
		if (isVisible) {
			style.ClearValue('display');
		}
		else {
			style.SetValue('display', 'none');
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetCornerRadius = function(style, cornerRadius, converter) {
		style.ClearValue('border-radius');
		style.ClearValue('border-top-left-radius');
		style.ClearValue('border-top-right-radius');
		style.ClearValue('border-bottom-left-radius');
		style.ClearValue('border-bottom-right-radius');
		if (System.Windows.CornerRadius.op_Inequality(cornerRadius, System.Windows.CornerRadius.Zero)) {
			if (cornerRadius.get_IsUniform()) {
				style.SetValue('border-radius', converter.ToPixelString(cornerRadius.get_TopLeft()));
			}
			else {
				style.SetValue('border-top-left-radius', converter.ToPixelString(cornerRadius.get_TopLeft()));
				style.SetValue('border-top-right-radius', converter.ToPixelString(cornerRadius.get_TopRight()));
				style.SetValue('border-bottom-left-radius', converter.ToPixelString(cornerRadius.get_BottomLeft()));
				style.SetValue('border-bottom-right-radius', converter.ToPixelString(cornerRadius.get_BottomRight()));
			}
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground = function(style, foreground, converter) {
		if (ss.isNullOrUndefined(foreground)) {
			style.ClearValue('color');
		}
		else if (ss.isInstanceOfType(foreground, System.Windows.Media.SolidColorBrush)) {
			style.SetValue('color', converter.ToColorString$1(ss.cast(foreground, System.Windows.Media.SolidColorBrush)));
		}
		else {
			throw new Granular.Exception('A "{0}" foreground brush is not supported', [ss.getInstanceType(foreground)]);
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetOpacity = function(style, opacity, converter) {
		if (opacity === 1) {
			style.ClearValue('opacity');
		}
		else {
			style.SetValue('opacity', converter.ToImplicitValueString(opacity));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTransform = function(style, transform, converter) {
		if (ss.referenceEquals(transform, System.Windows.Media.Transform.Identity)) {
			style.ClearValue('transform');
		}
		else {
			style.SetValue('transform', transform.get_Value().toString());
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontFamily = function(style, fontFamily, converter) {
		if (!Enumerable.from(fontFamily.get_FamilyNames()).any()) {
			style.ClearValue('font-family');
		}
		else {
			style.SetValue('font-family', converter.ToFontFamilyNamesString(fontFamily));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontSize = function(style, fontSize, converter) {
		if (Granular.Extensions.DoubleExtensions.IsNaN(fontSize)) {
			style.ClearValue('font-size');
		}
		else {
			style.SetValue('font-size', converter.ToPixelString(fontSize));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStyle = function(style, fontStyle, converter) {
		if (fontStyle === 0) {
			style.ClearValue('font-style');
		}
		else {
			style.SetValue('font-style', converter.ToFontStyleString(fontStyle));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontWeight = function(style, fontWeight, converter) {
		if (fontWeight === 0) {
			style.ClearValue('font-weight');
		}
		else {
			style.SetValue('font-weight', converter.ToFontWeightString(fontWeight));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStretch = function(style, fontStretch, converter) {
		if (fontStretch === 0) {
			style.ClearValue('font-stretch');
		}
		else {
			style.SetValue('font-stretch', converter.ToFontStretchString(fontStretch));
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextAlignment = function(style, textAlignment, converter) {
		style.SetValue('text-align', converter.ToTextAlignmentString(textAlignment));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextTrimming = function(style, textTrimming) {
		if (textTrimming === 0) {
			style.ClearValue('text-overflow');
		}
		else {
			style.SetValue('text-overflow', 'ellipsis');
		}
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextWrapping = function(style, textWrapping, converter) {
		style.SetValue('white-space', converter.ToWhiteSpaceString(textWrapping));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetHorizontalScrollBarVisibility = function(style, scrollBarVisibility, converter) {
		style.SetValue('overflow-x', converter.ToOverflowString(scrollBarVisibility));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetVerticalScrollBarVisibility = function(style, scrollBarVisibility, converter) {
		style.SetValue('overflow-y', converter.ToOverflowString(scrollBarVisibility));
	};
	$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundImage = function(style, imageSource, converter) {
		if (ss.isNullOrUndefined(imageSource)) {
			style.ClearValue('background-image');
		}
		else {
			style.SetValue('background-image', converter.ToUrlString(ss.cast(imageSource.get_RenderImageSource(), $Granular_Host_RenderImageSource).get_Url()));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.ElementExtensions
	var $Granular_Host_ElementExtensions = function() {
	};
	$Granular_Host_ElementExtensions.__typeName = 'Granular.Host.ElementExtensions';
	global.Granular.Host.ElementExtensions = $Granular_Host_ElementExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.HtmlDefinition
	var $Granular_Host_HtmlDefinition = function() {
	};
	$Granular_Host_HtmlDefinition.__typeName = 'Granular.Host.HtmlDefinition';
	global.Granular.Host.HtmlDefinition = $Granular_Host_HtmlDefinition;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.HtmlStyleDictionary
	var $Granular_Host_HtmlStyleDictionary = function(element) {
		this.$1$InvalidatedField = null;
		this.$isValid = false;
		this.$element = null;
		this.$dictionary = null;
		this.$setProperties = null;
		this.$clearProperties = null;
		this.$element = element;
		this.$dictionary = new (ss.makeGenericType(ss.Dictionary$2, [String, String]))();
		this.$setProperties = new (ss.makeGenericType(ss.Dictionary$2, [String, String]))();
		this.$clearProperties = new (ss.makeGenericType(System.Collections.Generic.HashSet$1, [String]))();
		this.set_IsValid(true);
	};
	$Granular_Host_HtmlStyleDictionary.__typeName = 'Granular.Host.HtmlStyleDictionary';
	global.Granular.Host.HtmlStyleDictionary = $Granular_Host_HtmlStyleDictionary;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.HtmlValueConverter
	var $Granular_Host_HtmlValueConverter = function() {
		//
	};
	$Granular_Host_HtmlValueConverter.__typeName = 'Granular.Host.HtmlValueConverter';
	$Granular_Host_HtmlValueConverter.$GetReflectedGradientStops = function(gradientStops) {
		return Enumerable.from(gradientStops).select(function(gradientStop) {
			return new System.Windows.Media.GradientStop.$ctor1(gradientStop.get_Color(), gradientStop.get_Offset() / 2);
		}).concat(Enumerable.from(gradientStops).select(function(gradientStop1) {
			return new System.Windows.Media.GradientStop.$ctor1(gradientStop1.get_Color(), 1 - gradientStop1.get_Offset() / 2);
		}).reverse());
	};
	global.Granular.Host.HtmlValueConverter = $Granular_Host_HtmlValueConverter;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.HtmlValueConverterExtensions
	var $Granular_Host_HtmlValueConverterExtensions = function() {
	};
	$Granular_Host_HtmlValueConverterExtensions.__typeName = 'Granular.Host.HtmlValueConverterExtensions';
	$Granular_Host_HtmlValueConverterExtensions.ToImageString = function(converter, brush) {
		if (ss.isInstanceOfType(brush, System.Windows.Media.LinearGradientBrush)) {
			return converter.ToImageString$1(ss.cast(brush, System.Windows.Media.LinearGradientBrush));
		}
		if (ss.isInstanceOfType(brush, System.Windows.Media.RadialGradientBrush)) {
			return converter.ToImageString$2(ss.cast(brush, System.Windows.Media.RadialGradientBrush));
		}
		if (ss.isInstanceOfType(brush, System.Windows.Media.ImageBrush)) {
			return converter.ToImageString(ss.cast(brush, System.Windows.Media.ImageBrush));
		}
		throw new Granular.Exception('Unexpected brush type "{0}"', [ss.getInstanceType(brush)]);
	};
	global.Granular.Host.HtmlValueConverterExtensions = $Granular_Host_HtmlValueConverterExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.IHtmlValueConverter
	var $Granular_Host_IHtmlValueConverter = function() {
	};
	$Granular_Host_IHtmlValueConverter.__typeName = 'Granular.Host.IHtmlValueConverter';
	global.Granular.Host.IHtmlValueConverter = $Granular_Host_IHtmlValueConverter;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.IRenderItem
	var $Granular_Host_IRenderItem = function() {
	};
	$Granular_Host_IRenderItem.__typeName = 'Granular.Host.IRenderItem';
	global.Granular.Host.IRenderItem = $Granular_Host_IRenderItem;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.IRenderQueue
	var $Granular_Host_IRenderQueue = function() {
	};
	$Granular_Host_IRenderQueue.__typeName = 'Granular.Host.IRenderQueue';
	global.Granular.Host.IRenderQueue = $Granular_Host_IRenderQueue;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.PresentationSource
	var $Granular_Host_PresentationSource = function(rootElement, converter) {
		this.$1$RootElementField = null;
		this.$1$MouseDeviceField = null;
		this.$1$KeyboardDeviceField = null;
		this.$converter = null;
		this.$window = null;
		this.$mouseDownHandled = false;
		this.$mouseMoveHandled = false;
		this.$mouseUpHandled = false;
		this.$keyDownHandled = false;
		this.$keyUpHandled = false;
		this.set_RootElement(rootElement);
		this.$converter = converter;
		this.get_RootElement().set_IsRootElement(true);
		this.set_MouseDevice(new System.Windows.Input.MouseDevice(this));
		this.set_KeyboardDevice(new System.Windows.Input.KeyboardDevice(this));
		this.$window = window.window;
		this.get_MouseDevice().add_CursorChanged(ss.mkdel(this, function(sender, e) {
			window.document.body.style.cursor = converter.ToCursorString(this.get_MouseDevice().get_Cursor());
		}));
		window.document.body.style.cursor = converter.ToCursorString(this.get_MouseDevice().get_Cursor());
		window.onkeydown = ss.mkdel(this, this.$OnKeyDown);
		window.onkeyup = ss.mkdel(this, this.$OnKeyUp);
		window.onkeypress = ss.mkdel(this, this.$PreventKeyboardHandled);
		window.onmousemove = ss.mkdel(this, this.$OnMouseMove);
		window.onmousedown = ss.mkdel(this, this.$OnMouseDown);
		window.onmouseup = ss.mkdel(this, this.$OnMouseUp);
		window.onscroll = ss.mkdel(this, this.$OnMouseWheel);
		window.onfocus = ss.mkdel(this, function(e1) {
			this.get_MouseDevice().Activate();
		});
		window.onblur = ss.mkdel(this, function(e2) {
			this.get_MouseDevice().Deactivate();
		});
		window.onresize = ss.mkdel(this, function(e3) {
			this.$SetRootElementSize();
		});
		window.onclick = ss.mkdel(this, this.$PreventMouseHandled);
		window.ondblclick = ss.mkdel(this, this.$PreventMouseHandled);
		window.oncontextmenu = ss.mkdel(this, this.$PreventMouseHandled);
		window.addEventListener('wheel', ss.mkdel(this, this.$OnMouseWheel));
		this.$SetRootElementSize();
		window.document.body.style.overflow = 'hidden';
		window.document.body.appendChild(ss.cast(this.get_RootElement().GetRenderElement($Granular_Host_Render_HtmlRenderElementFactory.Default), $Granular_Host_Render_HtmlRenderElement).get_HtmlElement());
		this.get_MouseDevice().Activate();
		this.get_KeyboardDevice().Activate();
	};
	$Granular_Host_PresentationSource.__typeName = 'Granular.Host.PresentationSource';
	global.Granular.Host.PresentationSource = $Granular_Host_PresentationSource;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.PresentationSourceFactory
	var $Granular_Host_PresentationSourceFactory = function() {
		this.$presentationSources = null;
		this.$presentationSources = [];
	};
	$Granular_Host_PresentationSourceFactory.__typeName = 'Granular.Host.PresentationSourceFactory';
	global.Granular.Host.PresentationSourceFactory = $Granular_Host_PresentationSourceFactory;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.RenderImageSource
	var $Granular_Host_RenderImageSource = function(container, url, isLocalUrl, sourceRect) {
		this.$1$StateChangedField = null;
		this.$state = 0;
		this.$1$SizeField = null;
		this.$1$UrlField = null;
		this.$1$SourceRectField = null;
		this.$1$ImageSizeField = null;
		this.$container = null;
		this.$image = null;
		this.$container = container;
		this.set_Url(url);
		this.set_SourceRect(sourceRect);
		this.set_State((isLocalUrl ? 0 : 1));
		this.$image = document.createElement('img');
		container.appendChild(this.$image);
		this.$image.addEventListener('load', ss.mkdel(this, this.$OnImageLoad));
		this.$image.addEventListener('error', ss.mkdel(this, this.$OnImageError));
		this.$image.addEventListener('abort', ss.mkdel(this, this.$OnImageAbort));
		this.$image.setAttribute('src', url);
		this.set_ImageSize(System.Windows.Size.Empty);
		this.set_Size(System.Windows.Size.Empty);
	};
	$Granular_Host_RenderImageSource.__typeName = 'Granular.Host.RenderImageSource';
	global.Granular.Host.RenderImageSource = $Granular_Host_RenderImageSource;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.RenderImageSourceFactory
	var $Granular_Host_RenderImageSourceFactory = function(converter) {
		this.$container = null;
		this.$converter = null;
		this.$objectUrlCache = null;
		this.$converter = converter;
		this.$objectUrlCache = new (ss.makeGenericType(Granular.Collections.CacheDictionary$2, [String, String]))(ss.mkdel(this, this.$ResolveObjectUrl));
	};
	$Granular_Host_RenderImageSourceFactory.__typeName = 'Granular.Host.RenderImageSourceFactory';
	$Granular_Host_RenderImageSourceFactory.$IsUrl = function(uri) {
		return uri.indexOf('://') !== -1;
	};
	$Granular_Host_RenderImageSourceFactory.$GetRenderImageType = function(uri) {
		var extension = uri.substring(uri.lastIndexOf(String.fromCharCode(46)) + 1).toLowerCase();
		switch (extension) {
			case 'gif': {
				return 1;
			}
			case 'jpg': {
				return 2;
			}
			case 'png': {
				return 3;
			}
			case 'svg': {
				return 4;
			}
		}
		return 0;
	};
	global.Granular.Host.RenderImageSourceFactory = $Granular_Host_RenderImageSourceFactory;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.RenderQueue
	var $Granular_Host_RenderQueue = function() {
		this.$items = null;
		this.$items = [];
	};
	$Granular_Host_RenderQueue.__typeName = 'Granular.Host.RenderQueue';
	global.Granular.Host.RenderQueue = $Granular_Host_RenderQueue;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.TaskScheduler
	var $Granular_Host_TaskScheduler = function() {
		//
	};
	$Granular_Host_TaskScheduler.__typeName = 'Granular.Host.TaskScheduler';
	global.Granular.Host.TaskScheduler = $Granular_Host_TaskScheduler;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.TextMeasurementService
	var $Granular_Host_TextMeasurementService = function(converter) {
		this.$converter = null;
		this.$htmlElement = null;
		this.$style = null;
		this.$converter = converter;
	};
	$Granular_Host_TextMeasurementService.__typeName = 'Granular.Host.TextMeasurementService';
	global.Granular.Host.TextMeasurementService = $Granular_Host_TextMeasurementService;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.WebApplicationHost
	var $Granular_Host_WebApplicationHost = function() {
		//
	};
	$Granular_Host_WebApplicationHost.__typeName = 'Granular.Host.WebApplicationHost';
	global.Granular.Host.WebApplicationHost = $Granular_Host_WebApplicationHost;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlBorderRenderElement
	var $Granular_Host_Render_HtmlBorderRenderElement = function(renderQueue, converter) {
		this.$background = null;
		this.$borderThickness = null;
		this.$borderBrush = null;
		this.$bounds = System.Windows.Rect.Zero;
		this.$cornerRadius = null;
		this.$isHitTestVisible = false;
		this.$converter = null;
		$Granular_Host_Render_HtmlRenderElement.call(this, renderQueue);
		this.$converter = converter;
		this.$bounds = System.Windows.Rect.Zero;
		this.$borderThickness = System.Windows.Thickness.Zero;
		this.$cornerRadius = System.Windows.CornerRadius.Zero;
		this.get_Style().SetValue('background-clip', 'content-box');
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_Style(), this.get_Background(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderThickness(this.get_Style(), this.get_BorderThickness(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), new System.Windows.Rect.$ctor2(this.get_Bounds().get_Location(), System.Windows.SizeExtensions.Max(System.Windows.Size.op_Subtraction(this.get_Bounds().get_Size(), this.get_BorderThickness().get_Size()), System.Windows.Size.Zero)), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderBrush(this.get_Style(), this.get_BorderBrush(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetCornerRadius(this.get_Style(), this.$cornerRadius, converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), this.get_IsHitTestVisible() && ss.isValue(this.get_Background()));
	};
	$Granular_Host_Render_HtmlBorderRenderElement.__typeName = 'Granular.Host.Render.HtmlBorderRenderElement';
	global.Granular.Host.Render.HtmlBorderRenderElement = $Granular_Host_Render_HtmlBorderRenderElement;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlImageRenderElement
	var $Granular_Host_Render_HtmlImageRenderElement = function(renderQueue, converter) {
		this.$bounds = null;
		this.$source = null;
		this.$converter = null;
		$Granular_Host_Render_HtmlRenderElement.call(this, renderQueue);
		this.$converter = converter;
		this.$bounds = System.Windows.Rect.Zero;
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.get_Bounds(), converter);
	};
	$Granular_Host_Render_HtmlImageRenderElement.__typeName = 'Granular.Host.Render.HtmlImageRenderElement';
	global.Granular.Host.Render.HtmlImageRenderElement = $Granular_Host_Render_HtmlImageRenderElement;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlRenderElement
	var $Granular_Host_Render_HtmlRenderElement = function(renderQueue) {
		$Granular_Host_Render_HtmlRenderElement.$ctor2.call(this, 'div', '', renderQueue);
		//
	};
	$Granular_Host_Render_HtmlRenderElement.__typeName = 'Granular.Host.Render.HtmlRenderElement';
	$Granular_Host_Render_HtmlRenderElement.$ctor1 = function(htmlElementTagName, renderQueue) {
		$Granular_Host_Render_HtmlRenderElement.$ctor2.call(this, htmlElementTagName, '', renderQueue);
		//
	};
	$Granular_Host_Render_HtmlRenderElement.$ctor2 = function(htmlElementTagName, htmlElementId, renderQueue) {
		this.$1$HtmlElementField = null;
		this.$1$StyleField = null;
		this.$isRenderValid = false;
		this.$renderQueue = null;
		this.set_HtmlElement(document.createElement(htmlElementTagName));
		this.$renderQueue = renderQueue;
		if (!Granular.Extensions.StringExtensions.IsNullOrEmpty(htmlElementId)) {
			this.get_HtmlElement().id = htmlElementId;
		}
		this.set_Style(new $Granular_Host_HtmlStyleDictionary(this.get_HtmlElement()));
		this.get_Style().add_Invalidated(ss.mkdel(this, function(sender, e) {
			this.InvalidateRender();
		}));
		this.$isRenderValid = true;
	};
	global.Granular.Host.Render.HtmlRenderElement = $Granular_Host_Render_HtmlRenderElement;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlRenderElementFactory
	var $Granular_Host_Render_HtmlRenderElementFactory = function() {
		//
	};
	$Granular_Host_Render_HtmlRenderElementFactory.__typeName = 'Granular.Host.Render.HtmlRenderElementFactory';
	global.Granular.Host.Render.HtmlRenderElementFactory = $Granular_Host_Render_HtmlRenderElementFactory;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlTextBlockRenderElement
	var $Granular_Host_Render_HtmlTextBlockRenderElement = function(renderQueue, converter) {
		this.$text = null;
		this.$bounds = null;
		this.$foreground = null;
		this.$fontFamily = null;
		this.$fontSize = 0;
		this.$fontStyle = 0;
		this.$fontWeight = 0;
		this.$fontStretch = 0;
		this.$textAlignment = 0;
		this.$textTrimming = 0;
		this.$textWrapping = 0;
		this.$converter = null;
		this.$isTextDirty = false;
		$Granular_Host_Render_HtmlRenderElement.call(this, renderQueue);
		this.$converter = converter;
		this.$bounds = System.Windows.Rect.Zero;
		this.$fontFamily = System.Windows.FontFamily.Default;
		this.$fontSize = Number.NaN;
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.get_Bounds(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground(this.get_Style(), this.get_Foreground(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontFamily(this.get_Style(), this.get_FontFamily(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontSize(this.get_Style(), this.get_FontSize(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStyle(this.get_Style(), this.get_FontStyle(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontWeight(this.get_Style(), this.get_FontWeight(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStretch(this.get_Style(), this.get_FontStretch(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), false);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextAlignment(this.get_Style(), this.get_TextAlignment(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextTrimming(this.get_Style(), this.get_TextTrimming());
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextWrapping(this.get_Style(), this.get_TextWrapping(), converter);
	};
	$Granular_Host_Render_HtmlTextBlockRenderElement.__typeName = 'Granular.Host.Render.HtmlTextBlockRenderElement';
	global.Granular.Host.Render.HtmlTextBlockRenderElement = $Granular_Host_Render_HtmlTextBlockRenderElement;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlTextBoxRenderElement
	var $Granular_Host_Render_HtmlTextBoxRenderElement = function(renderQueue, converter) {
		this.$contentElement = null;
		this.$2$TextChangedField = null;
		this.$text = null;
		this.$maxLength = 0;
		this.$2$CaretIndexChangedField = null;
		this.$caretIndex = 0;
		this.$2$SelectionStartChangedField = null;
		this.$selectionStart = 0;
		this.$2$SelectionLengthChangedField = null;
		this.$selectionLength = 0;
		this.$isPassword = false;
		this.$isReadOnly = false;
		this.$spellCheck = false;
		this.$bounds = null;
		this.$foreground = null;
		this.$fontFamily = null;
		this.$fontSize = 0;
		this.$fontStyle = 0;
		this.$fontWeight = 0;
		this.$fontStretch = 0;
		this.$textAlignment = 0;
		this.$textTrimming = 0;
		this.$textWrapping = 0;
		this.$acceptsReturn = false;
		this.$horizontalScrollBarVisibility = 0;
		this.$verticalScrollBarVisibility = 0;
		this.$isHitTestVisible = false;
		this.$2$AcceptsTabField = false;
		this.$renderQueue$1 = null;
		this.$converter = null;
		this.$isFocused = false;
		$Granular_Host_Render_HtmlRenderElement.$ctor1.call(this, 'div', renderQueue);
		this.$renderQueue$1 = renderQueue;
		this.$converter = converter;
		this.$bounds = System.Windows.Rect.Empty;
		this.$fontFamily = System.Windows.FontFamily.Default;
		var styleElement = document.createElement('style');
		styleElement.textContent = '::-ms-clear { width: 0px; height: 0px; }';
		this.get_HtmlElement().appendChild(styleElement);
		this.$SetContentElement();
	};
	$Granular_Host_Render_HtmlTextBoxRenderElement.__typeName = 'Granular.Host.Render.HtmlTextBoxRenderElement';
	global.Granular.Host.Render.HtmlTextBoxRenderElement = $Granular_Host_Render_HtmlTextBoxRenderElement;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Host.Render.HtmlVisualRenderElement
	var $Granular_Host_Render_HtmlVisualRenderElement = function(owner, renderQueue, converter) {
		this.$background = null;
		this.$bounds = null;
		this.$clipToBounds = false;
		this.$isHitTestVisible = false;
		this.$isVisible = false;
		this.$opacity = 0;
		this.$transform = null;
		this.$children = null;
		this.$childrenActions = null;
		this.$converter = null;
		$Granular_Host_Render_HtmlRenderElement.$ctor2.call(this, $Granular_Host_Render_HtmlVisualRenderElement.$GetElementTagName(owner), $Granular_Host_Render_HtmlVisualRenderElement.$GetElementId(owner), renderQueue);
		this.$converter = converter;
		this.$children = [];
		this.$childrenActions = [];
		this.$bounds = System.Windows.Rect.Zero;
		this.$isVisible = true;
		this.$opacity = 1;
		this.$transform = System.Windows.Media.Transform.Identity;
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_Style(), this.get_Background(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.get_Bounds(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetClipToBounds(this.get_Style(), this.get_ClipToBounds());
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), this.get_IsHitTestVisible() && ss.isValue(this.get_Background()));
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsVisible(this.get_Style(), this.get_IsVisible());
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetOpacity(this.get_Style(), this.get_Opacity(), converter);
		$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTransform(this.get_Style(), this.get_Transform(), converter);
	};
	$Granular_Host_Render_HtmlVisualRenderElement.__typeName = 'Granular.Host.Render.HtmlVisualRenderElement';
	$Granular_Host_Render_HtmlVisualRenderElement.$GetElementTagName = function(target) {
		var typeName = ss.replaceAllString(ss.getTypeName(ss.getInstanceType(target)), String.fromCharCode(36), String.fromCharCode(95));
		return (Enumerable.from($Granular_Host_HtmlDefinition.Tags).contains(typeName.toLowerCase()) ? ss.formatString('{0}_', typeName) : typeName);
	};
	$Granular_Host_Render_HtmlVisualRenderElement.$GetElementId = function(target) {
		var nameAttribute = ss.safeCast(Enumerable.from(ss.getAttributes(ss.getInstanceType(target), System.Windows.Markup.RuntimeNamePropertyAttribute, true)).firstOrDefault(null, ss.getDefaultValue(Object)), System.Windows.Markup.RuntimeNamePropertyAttribute);
		return (ss.isValue(nameAttribute) ? ss.cast(ss.midel(ss.getMembers(ss.getInstanceType(target), 16, 284, nameAttribute.get_Name()).getter, target)(), String) : '');
	};
	global.Granular.Host.Render.HtmlVisualRenderElement = $Granular_Host_Render_HtmlVisualRenderElement;
	ss.initClass($Granular_Host_$HtmlStyleDictionaryExtensions, $asm, {});
	ss.initClass($Granular_Host_ElementExtensions, $asm, {});
	ss.initClass($Granular_Host_HtmlDefinition, $asm, {});
	ss.initClass($Granular_Host_HtmlStyleDictionary, $asm, {
		add_Invalidated: function(value) {
			this.$1$InvalidatedField = ss.delegateCombine(this.$1$InvalidatedField, value);
		},
		remove_Invalidated: function(value) {
			this.$1$InvalidatedField = ss.delegateRemove(this.$1$InvalidatedField, value);
		},
		get_IsValid: function() {
			return this.$isValid;
		},
		set_IsValid: function(value) {
			if (this.$isValid === value) {
				return;
			}
			this.$isValid = value;
			if (!this.$isValid) {
				Granular.Extensions.EventHandlerExtensions.Raise(this.$1$InvalidatedField, this);
			}
		},
		SetValue: function(key, value) {
			var currentValue = {};
			if (this.$dictionary.tryGetValue(key, currentValue) && ss.referenceEquals(currentValue.$, value)) {
				return;
			}
			this.$dictionary.set_item(key, value);
			this.$setProperties.set_item(key, value);
			this.$clearProperties.remove(key);
			this.set_IsValid(false);
		},
		ClearValue: function(key) {
			if (!this.$dictionary.containsKey(key)) {
				return;
			}
			this.$dictionary.remove(key);
			this.$setProperties.remove(key);
			this.$clearProperties.add(key);
			this.set_IsValid(false);
		},
		Apply: function() {
			if (this.get_IsValid()) {
				return;
			}
			var $t1 = this.$setProperties.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var pair = $t1.current();
					this.$element.style.setProperty(pair.key, pair.value);
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = this.$clearProperties.getEnumerator();
			try {
				while ($t2.moveNext()) {
					var key = $t2.current();
					this.$element.style.removeProperty(key);
				}
			}
			finally {
				$t2.dispose();
			}
			this.$setProperties.clear();
			this.$clearProperties.clear();
			this.set_IsValid(true);
		}
	});
	ss.initInterface($Granular_Host_IHtmlValueConverter, $asm, { ToPixelString: null, ToPercentString: null, ToDegreesString: null, ToImplicitValueString: null, ToPixelString$1: null, ToPercentString$1: null, ToImplicitValueString$1: null, ToPixelString$2: null, ToColorString: null, ToPixelString$3: null, ToImplicitValueString$2: null, ToUrlString: null, ToLinearGradientString: null, ToRadialGradientString: null, ToColorStopsString: null, ToColorString$1: null, ToImageString$1: null, ToImageString$2: null, ToImageString: null, ToFontStyleString: null, ToFontStretchString: null, ToFontWeightString: null, ToTextAlignmentString: null, ToOverflowString: null, ToHtmlContentString: null, ToWrapString: null, ToWhiteSpaceString: null, ToFontFamilyNamesString: null, ToBooleanString: null, ToMimeTypeString: null, ToCursorString: null, ConvertBackMouseButton: null, ConvertBackKey: null });
	ss.initClass($Granular_Host_HtmlValueConverter, $asm, {
		ToPixelString: function(value) {
			if (Granular.Extensions.DoubleExtensions.IsNaN(value) || !isFinite(value)) {
				throw new Granular.Exception("Can't convert {0} to pixel string", [value]);
			}
			return ss.formatString('{0}px', ss.round(value, 2));
		},
		ToPercentString: function(value) {
			if (Granular.Extensions.DoubleExtensions.IsNaN(value)) {
				throw new Granular.Exception("Can't convert Double.NaN to percent string", []);
			}
			return ss.formatString('{0}%', ss.round(value * 100, 2));
		},
		ToDegreesString: function(value) {
			if (Granular.Extensions.DoubleExtensions.IsNaN(value)) {
				throw new Granular.Exception("Can't convert Double.NaN to degrees string", []);
			}
			return ss.formatString('{0}deg', ss.round(value, 2));
		},
		ToImplicitValueString: function(value) {
			return ss.formatString('{0}', ss.round(value, 2));
		},
		ToPixelString$1: function(point) {
			return ss.formatString('{0} {1}', this.ToPixelString(point.get_X()), this.ToPixelString(point.get_Y()));
		},
		ToPercentString$1: function(point) {
			return ss.formatString('{0} {1}', this.ToPercentString(point.get_X()), this.ToPercentString(point.get_Y()));
		},
		ToImplicitValueString$1: function(point) {
			return ss.formatString('{0} {1}', this.ToImplicitValueString(point.get_X()), this.ToImplicitValueString(point.get_Y()));
		},
		ToPixelString$2: function(size) {
			return ss.formatString('{0} {1}', this.ToPixelString(size.get_Width()), this.ToPixelString(size.get_Height()));
		},
		ToColorString: function(color) {
			return ((color.get_A() === 255) ? ss.formatString('#{0:x2}{1:x2}{2:x2}', color.get_R(), color.get_G(), color.get_B()) : ss.formatString('rgba({0}, {1}, {2}, {3})', color.get_R(), color.get_G(), color.get_B(), ss.round(color.get_A() / 255, 2)));
		},
		ToPixelString$3: function(thickness) {
			return (thickness.get_IsUniform() ? this.ToPixelString(thickness.get_Top()) : ss.formatString('{0} {1} {2} {3}', this.ToPixelString(thickness.get_Top()), this.ToPixelString(thickness.get_Right()), this.ToPixelString(thickness.get_Bottom()), this.ToPixelString(thickness.get_Left())));
		},
		ToImplicitValueString$2: function(thickness) {
			return ss.formatString('{0} {1} {2} {3}', this.ToImplicitValueString(thickness.get_Top()), this.ToImplicitValueString(thickness.get_Right()), this.ToImplicitValueString(thickness.get_Bottom()), this.ToImplicitValueString(thickness.get_Left()));
		},
		ToUrlString: function(url) {
			return ss.formatString('url({0})', url);
		},
		ToLinearGradientString: function(brush) {
			var gradientStops = ((brush.get_SpreadMethod() === 1) ? $Granular_Host_HtmlValueConverter.$GetReflectedGradientStops(brush.get_GradientStops()) : brush.get_GradientStops());
			var repeatingPrefix = ((brush.get_SpreadMethod() === 2) ? 'repeating-' : '');
			return ss.formatString('{0}linear-gradient({1}, {2})', repeatingPrefix, this.ToDegreesString(brush.get_Angle() + 90), this.ToColorStopsString(gradientStops));
		},
		ToRadialGradientString: function(brush) {
			var gradientStops = ((brush.get_SpreadMethod() === 1) ? $Granular_Host_HtmlValueConverter.$GetReflectedGradientStops(brush.get_GradientStops()) : brush.get_GradientStops());
			var repeatingPrefix = ((brush.get_SpreadMethod() === 2) ? 'repeating-' : '');
			return ss.formatString('{0}radial-gradient(ellipse {1} {2} at {3}, {4})', repeatingPrefix, this.ToPercentString(brush.get_RadiusX()), this.ToPercentString(brush.get_RadiusY()), this.ToPercentString$1(brush.get_GradientOrigin()), this.ToColorStopsString(gradientStops));
		},
		ToColorStopsString: function(gradientStops) {
			return Enumerable.from(gradientStops).select(ss.mkdel(this, function(gradientStop) {
				return ss.formatString('{0} {1}', this.ToColorString(gradientStop.get_Color()), this.ToPercentString(gradientStop.get_Offset()));
			})).defaultIfEmpty('').aggregate(function(s1, s2) {
				return ss.formatString('{0}, {1}', s1, s2);
			});
		},
		ToColorString$1: function(brush) {
			return this.ToColorString(System.Windows.Media.ColorExtensions.ApplyOpacity(brush.get_Color(), brush.get_Opacity()));
		},
		ToImageString$1: function(brush) {
			return this.ToLinearGradientString(brush);
		},
		ToImageString$2: function(brush) {
			return this.ToRadialGradientString(brush);
		},
		ToImageString: function(brush) {
			return this.ToUrlString(brush.get_ImageSource());
		},
		ToFontStyleString: function(fontStyle) {
			switch (fontStyle) {
				case 0: {
					return 'normal';
				}
				case 1: {
					return 'italic';
				}
				case 2: {
					return 'oblique';
				}
			}
			throw new Granular.Exception('Unexpected FontStyle "{0}"', [fontStyle]);
		},
		ToFontStretchString: function(fontStretch) {
			switch (fontStretch) {
				case 8: {
					return 'ultra-condensed';
				}
				case 3: {
					return 'extra-condensed';
				}
				case 1: {
					return 'condensed';
				}
				case 6: {
					return 'semi-condensed';
				}
				case 5:
				case 0: {
					return 'normal';
				}
				case 7: {
					return 'semi-expanded';
				}
				case 2: {
					return 'expanded';
				}
				case 4: {
					return 'extra-expanded';
				}
				case 9: {
					return 'ultra-expanded';
				}
			}
			throw new Granular.Exception('Unexpected FontStretch "{0}"', [fontStretch]);
		},
		ToFontWeightString: function(fontWeight) {
			switch (fontWeight) {
				case 12: {
					return '100';
				}
				case 6:
				case 15: {
					return '200';
				}
				case 8: {
					return '300';
				}
				case 0:
				case 10: {
					return '400';
				}
				case 9: {
					return '500';
				}
				case 3:
				case 11: {
					return '600';
				}
				case 2: {
					return '700';
				}
				case 5:
				case 14: {
					return '800';
				}
				case 1:
				case 7: {
					return '900';
				}
				case 4:
				case 13: {
					return '950';
				}
			}
			throw new Granular.Exception('Unexpected FontWeight "{0}"', [fontWeight]);
		},
		ToTextAlignmentString: function(textAlignment) {
			switch (textAlignment) {
				case 0: {
					return 'left';
				}
				case 1: {
					return 'right';
				}
				case 2: {
					return 'center';
				}
				case 3: {
					return 'justify';
				}
			}
			throw new Granular.Exception('Unexpected TextAlignment "{0}"', [textAlignment]);
		},
		ToOverflowString: function(scrollBarVisibility) {
			switch (scrollBarVisibility) {
				case 0: {
					return 'hidden';
				}
				case 1: {
					return 'auto';
				}
				case 2: {
					return 'hidden';
				}
				case 3: {
					return 'scroll';
				}
			}
			throw new Granular.Exception('Unexpected ScrollBarVisibility "{0}"', [scrollBarVisibility]);
		},
		ToHtmlContentString: function(value) {
			return ss.replaceAllString(value, '\n', '<br/>');
		},
		ToWrapString: function(textWrapping) {
			switch (textWrapping) {
				case 0: {
					return 'soft';
				}
				case 1: {
					return 'off';
				}
			}
			throw new Granular.Exception('Unexpected TextWrapping "{0}"', [textWrapping]);
		},
		ToWhiteSpaceString: function(textWrapping) {
			switch (textWrapping) {
				case 0: {
					return 'pre-wrap';
				}
				case 1: {
					return 'pre';
				}
			}
			throw new Granular.Exception('Unexpected TextWrapping "{0}"', [textWrapping]);
		},
		ToFontFamilyNamesString: function(fontFamily) {
			return Enumerable.from(fontFamily.get_FamilyNames()).select(function(familyName) {
				return ss.formatString('"{0}"', familyName);
			}).aggregate(function(s1, s2) {
				return ss.formatString('{0}, {1}', s1, s2);
			});
		},
		ToBooleanString: function(value) {
			return (value ? 'true' : 'false');
		},
		ToMimeTypeString: function(renderImageType) {
			switch (renderImageType) {
				case 0: {
					return '';
				}
				case 1: {
					return 'image/gif';
				}
				case 2: {
					return 'image/jpeg';
				}
				case 3: {
					return 'image/png';
				}
				case 4: {
					return 'image/svg+xml';
				}
			}
			throw new Granular.Exception('Unexpected RenderImageType "{0}"', [renderImageType]);
		},
		ToCursorString: function(cursor) {
			if (ss.isNullOrUndefined(cursor)) {
				return 'default';
			}
			if (ss.isValue(cursor.get_ImageSource())) {
				var urlString = this.ToUrlString(ss.cast(cursor.get_ImageSource().get_RenderImageSource(), $Granular_Host_RenderImageSource).get_Url());
				return (!System.Windows.Point.IsNullOrEmpty(cursor.get_Hotspot()) ? ss.formatString('{0} {1}, default', urlString, this.ToImplicitValueString$1(cursor.get_Hotspot())) : ss.formatString('{0}, default', urlString));
			}
			switch (cursor.get_CursorType()) {
				case 0: {
					return 'none';
				}
				case 1: {
					return 'not-allowed';
				}
				case 2: {
					return 'default';
				}
				case 3: {
					return 'progress';
				}
				case 4: {
					return 'crosshair';
				}
				case 5: {
					return 'help';
				}
				case 6: {
					return 'text';
				}
				case 7: {
					return 'move';
				}
				case 8: {
					return 'nesw-resize';
				}
				case 9: {
					return 'ns-resize';
				}
				case 10: {
					return 'nwse-resize';
				}
				case 11: {
					return 'ew-resize';
				}
				case 13: {
					return 'wait';
				}
				case 14: {
					return 'pointer';
				}
				case 12:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
				case 20:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27: {
					return 'default';
				}
			}
			throw new Granular.Exception('Unexpected CursorType "{0}"', [cursor.get_CursorType()]);
		},
		ConvertBackMouseButton: function(buttonIndex) {
			switch (buttonIndex) {
				case 0: {
					return 0;
				}
				case 1: {
					return 1;
				}
				case 2: {
					return 2;
				}
			}
			throw new Granular.Exception('Unexpected button index "{0}"', [buttonIndex]);
		},
		ConvertBackKey: function(keyCode, location) {
			switch (keyCode) {
				case 8: {
					return 2;
				}
				case 9: {
					return 3;
				}
				case 13: {
					return 6;
				}
				case 16: {
					return ((location === 1) ? 116 : 117);
				}
				case 17: {
					return ((location === 1) ? 118 : 119);
				}
				case 18: {
					return ((location === 1) ? 120 : 121);
				}
				case 19: {
					return 7;
				}
				case 20: {
					return 8;
				}
				case 27: {
					return 13;
				}
				case 32: {
					return 18;
				}
				case 33: {
					return 19;
				}
				case 34: {
					return 20;
				}
				case 35: {
					return 21;
				}
				case 36: {
					return 22;
				}
				case 37: {
					return 23;
				}
				case 38: {
					return 24;
				}
				case 39: {
					return 25;
				}
				case 40: {
					return 26;
				}
				case 45: {
					return 31;
				}
				case 46: {
					return 32;
				}
				case 48: {
					return 34;
				}
				case 49: {
					return 35;
				}
				case 50: {
					return 36;
				}
				case 51: {
					return 37;
				}
				case 52: {
					return 38;
				}
				case 53: {
					return 39;
				}
				case 54: {
					return 40;
				}
				case 55: {
					return 41;
				}
				case 56: {
					return 42;
				}
				case 57: {
					return 43;
				}
				case 59: {
					return 140;
				}
				case 65: {
					return 44;
				}
				case 66: {
					return 45;
				}
				case 67: {
					return 46;
				}
				case 68: {
					return 47;
				}
				case 69: {
					return 48;
				}
				case 70: {
					return 49;
				}
				case 71: {
					return 50;
				}
				case 72: {
					return 51;
				}
				case 73: {
					return 52;
				}
				case 74: {
					return 53;
				}
				case 75: {
					return 54;
				}
				case 76: {
					return 55;
				}
				case 77: {
					return 56;
				}
				case 78: {
					return 57;
				}
				case 79: {
					return 58;
				}
				case 80: {
					return 59;
				}
				case 81: {
					return 60;
				}
				case 82: {
					return 61;
				}
				case 83: {
					return 62;
				}
				case 84: {
					return 63;
				}
				case 85: {
					return 64;
				}
				case 86: {
					return 65;
				}
				case 87: {
					return 66;
				}
				case 88: {
					return 67;
				}
				case 89: {
					return 68;
				}
				case 90: {
					return 69;
				}
				case 91: {
					return ((location === 1) ? 70 : 71);
				}
				case 93: {
					return 72;
				}
				case 96: {
					return 74;
				}
				case 97: {
					return 75;
				}
				case 98: {
					return 76;
				}
				case 99: {
					return 77;
				}
				case 100: {
					return 78;
				}
				case 101: {
					return 79;
				}
				case 102: {
					return 80;
				}
				case 103: {
					return 81;
				}
				case 104: {
					return 82;
				}
				case 105: {
					return 83;
				}
				case 106: {
					return 84;
				}
				case 107: {
					return 85;
				}
				case 109: {
					return 87;
				}
				case 110: {
					return 88;
				}
				case 111: {
					return 89;
				}
				case 112: {
					return 90;
				}
				case 113: {
					return 91;
				}
				case 114: {
					return 92;
				}
				case 115: {
					return 93;
				}
				case 116: {
					return 94;
				}
				case 117: {
					return 95;
				}
				case 118: {
					return 96;
				}
				case 119: {
					return 97;
				}
				case 120: {
					return 98;
				}
				case 121: {
					return 99;
				}
				case 122: {
					return 100;
				}
				case 123: {
					return 101;
				}
				case 144: {
					return 114;
				}
				case 145: {
					return 115;
				}
				case 173: {
					return 143;
				}
				case 188: {
					return 142;
				}
				case 190: {
					return 144;
				}
				case 191: {
					return 145;
				}
				case 192: {
					return 146;
				}
				case 219: {
					return 149;
				}
				case 220: {
					return 150;
				}
				case 221: {
					return 151;
				}
				case 222: {
					return 152;
				}
			}
			return 0;
		}
	}, null, [$Granular_Host_IHtmlValueConverter]);
	ss.initClass($Granular_Host_HtmlValueConverterExtensions, $asm, {});
	ss.initInterface($Granular_Host_IRenderItem, $asm, { Render: null });
	ss.initInterface($Granular_Host_IRenderQueue, $asm, { Add: null });
	ss.initClass($Granular_Host_PresentationSource, $asm, {
		add_HitTestInvalidated: function(value) {
		},
		remove_HitTestInvalidated: function(value) {
		},
		get_RootElement: function() {
			return this.$1$RootElementField;
		},
		set_RootElement: function(value) {
			this.$1$RootElementField = value;
		},
		get_MouseDevice: function() {
			return this.$1$MouseDeviceField;
		},
		set_MouseDevice: function(value) {
			this.$1$MouseDeviceField = value;
		},
		get_KeyboardDevice: function() {
			return this.$1$KeyboardDeviceField;
		},
		set_KeyboardDevice: function(value) {
			this.$1$KeyboardDeviceField = value;
		},
		get_Title: function() {
			return window.document.title;
		},
		set_Title: function(value) {
			window.document.title = value;
		},
		$SetRootElementSize: function() {
			ss.cast(this.get_RootElement(), System.Windows.FrameworkElement).set_Width(this.$window.innerWidth);
			ss.cast(this.get_RootElement(), System.Windows.FrameworkElement).set_Height(this.$window.innerHeight);
		},
		$OnKeyDown: function(e) {
			var keyboardEvent = ss.cast(e, KeyboardEvent);
			var key = this.$converter.ConvertBackKey(keyboardEvent.keyCode, keyboardEvent.location);
			this.$keyDownHandled = this.get_KeyboardDevice().ProcessRawEvent(new System.Windows.Input.RawKeyboardEventArgs(key, 1, keyboardEvent.repeat, this.GetTimestamp()));
			if (this.$keyDownHandled) {
				e.preventDefault();
			}
		},
		$OnKeyUp: function(e) {
			var keyboardEvent = ss.cast(e, KeyboardEvent);
			var key = this.$converter.ConvertBackKey(keyboardEvent.keyCode, keyboardEvent.location);
			this.$keyUpHandled = this.get_KeyboardDevice().ProcessRawEvent(new System.Windows.Input.RawKeyboardEventArgs(key, 0, keyboardEvent.repeat, this.GetTimestamp()));
			if (this.$keyDownHandled || this.$keyUpHandled) {
				e.preventDefault();
			}
		},
		$PreventKeyboardHandled: function(e) {
			if (this.$keyDownHandled || this.$keyUpHandled) {
				e.preventDefault();
			}
		},
		$OnMouseDown: function(e) {
			var mouseEvent = ss.cast(e, MouseEvent);
			var position = new System.Windows.Point.$ctor1(mouseEvent.pageX, mouseEvent.pageY);
			var button = this.$converter.ConvertBackMouseButton(mouseEvent.button);
			this.$mouseDownHandled = this.get_MouseDevice().ProcessRawEvent(new System.Windows.Input.RawMouseButtonEventArgs(button, 1, position, this.GetTimestamp()));
			if (this.$mouseDownHandled || ss.isValue(this.get_MouseDevice().get_CaptureTarget())) {
				e.preventDefault();
			}
		},
		$OnMouseUp: function(e) {
			var mouseEvent = ss.cast(e, MouseEvent);
			var position = new System.Windows.Point.$ctor1(mouseEvent.pageX, mouseEvent.pageY);
			var button = this.$converter.ConvertBackMouseButton(mouseEvent.button);
			this.$mouseUpHandled = this.get_MouseDevice().ProcessRawEvent(new System.Windows.Input.RawMouseButtonEventArgs(button, 0, position, this.GetTimestamp()));
			if (this.$mouseDownHandled || this.$mouseMoveHandled || this.$mouseUpHandled || ss.isValue(this.get_MouseDevice().get_CaptureTarget())) {
				e.preventDefault();
			}
		},
		$OnMouseWheel: function(e) {
			var wheelEvent = ss.cast(e, WheelEvent);
			var position = new System.Windows.Point.$ctor1(wheelEvent.pageX, wheelEvent.pageY);
			var delta = ((wheelEvent.deltaY > 0) ? -100 : 100);
			if (this.get_MouseDevice().ProcessRawEvent(new System.Windows.Input.RawMouseWheelEventArgs(delta, position, this.GetTimestamp()))) {
				e.preventDefault();
			}
		},
		$OnMouseMove: function(e) {
			if (!ss.isInstanceOfType(e, MouseEvent)) {
				return;
			}
			var mouseEvent = ss.cast(e, MouseEvent);
			var position = new System.Windows.Point.$ctor1(mouseEvent.pageX, mouseEvent.pageY);
			this.$mouseMoveHandled = this.get_MouseDevice().ProcessRawEvent(new System.Windows.Input.RawMouseEventArgs(position, this.GetTimestamp()));
			if (this.$mouseDownHandled || this.$mouseMoveHandled || ss.isValue(this.get_MouseDevice().get_CaptureTarget())) {
				e.preventDefault();
			}
		},
		$PreventMouseHandled: function(e) {
			if (this.$mouseDownHandled || this.$mouseMoveHandled || this.$mouseUpHandled || ss.isValue(this.get_MouseDevice().get_CaptureTarget())) {
				e.preventDefault();
			}
		},
		HitTest: function(position) {
			return ss.safeCast(this.get_RootElement().HitTest(position), System.Windows.IInputElement);
		},
		GetTimestamp: function() {
			return 0;
			//(int)(DateTime.Now.GetTime());
		}
	}, null, [System.Windows.IPresentationSource]);
	ss.initClass($Granular_Host_PresentationSourceFactory, $asm, {
		CreatePresentationSource: function(rootElement) {
			var presentationSource = new $Granular_Host_PresentationSource(rootElement, $Granular_Host_HtmlValueConverter.Default);
			this.$presentationSources.push(presentationSource);
			return presentationSource;
		},
		GetPresentationSourceFromElement: function(element) {
			while (ss.isInstanceOfType(element.get_VisualParent(), System.Windows.FrameworkElement)) {
				element = ss.cast(element.get_VisualParent(), System.Windows.FrameworkElement);
			}
			return Enumerable.from(this.$presentationSources).firstOrDefault(function(presentationSource) {
				return ss.referenceEquals(presentationSource.get_RootElement(), element);
			}, ss.getDefaultValue($Granular_Host_PresentationSource));
		}
	}, null, [System.Windows.IPresentationSourceFactory]);
	ss.initClass($Granular_Host_RenderImageSource, $asm, {
		add_StateChanged: function(value) {
			this.$1$StateChangedField = ss.delegateCombine(this.$1$StateChangedField, value);
		},
		remove_StateChanged: function(value) {
			this.$1$StateChangedField = ss.delegateRemove(this.$1$StateChangedField, value);
		},
		get_State: function() {
			return this.$state;
		},
		set_State: function(value) {
			if (this.$state === value) {
				return;
			}
			this.$state = value;
			Granular.Extensions.EventHandlerExtensions.Raise(this.$1$StateChangedField, this);
		},
		get_Size: function() {
			return this.$1$SizeField;
		},
		set_Size: function(value) {
			this.$1$SizeField = value;
		},
		get_Url: function() {
			return this.$1$UrlField;
		},
		set_Url: function(value) {
			this.$1$UrlField = value;
		},
		get_SourceRect: function() {
			return this.$1$SourceRectField;
		},
		set_SourceRect: function(value) {
			this.$1$SourceRectField = value;
		},
		get_ImageSize: function() {
			return this.$1$ImageSizeField;
		},
		set_ImageSize: function(value) {
			this.$1$ImageSizeField = value;
		},
		$OnImageLoad: function() {
			this.set_ImageSize(new System.Windows.Size(this.$image.clientWidth, this.$image.clientHeight));
			this.set_Size((!System.Windows.RectExtensions.IsNullOrEmpty(this.get_SourceRect()) ? this.get_SourceRect().get_Size() : this.get_ImageSize()));
			this.set_State(2);
			this.$container.removeChild(this.$image);
		},
		$OnImageError: function() {
			this.set_State(3);
			this.$container.removeChild(this.$image);
		},
		$OnImageAbort: function() {
			this.set_State(3);
			this.$container.removeChild(this.$image);
		}
	}, null, [System.Windows.Media.IRenderImageSource]);
	ss.initClass($Granular_Host_RenderImageSourceFactory, $asm, {
		get_$Container: function() {
			if (ss.isNullOrUndefined(this.$container)) {
				this.$container = document.createElement('div');
				this.$container.style.visibility = 'hidden';
				this.$container.style.overflow = 'hidden';
				this.$container.style.width = '0px';
				this.$container.style.height = '0px';
				document.body.appendChild(this.$container);
			}
			return this.$container;
		},
		CreateRenderImageSource: function(uri, sourceRect) {
			if ($Granular_Host_RenderImageSourceFactory.$IsUrl(uri)) {
				return new $Granular_Host_RenderImageSource(this.get_$Container(), uri, false, sourceRect);
			}
			return new $Granular_Host_RenderImageSource(this.get_$Container(), this.$objectUrlCache.GetValue(uri), true, sourceRect);
		},
		CreateRenderImageSource$1: function(imageType, imageData, sourceRect) {
			var mimeType = this.$converter.ToMimeTypeString(imageType);
			var url = URL.createObjectURL(new Blob([new Uint8Array(imageData)], { type: mimeType }));
			return new $Granular_Host_RenderImageSource(this.get_$Container(), url, true, sourceRect);
		},
		$ResolveObjectUrl: function(uri) {
			var imageData = System.Windows.EmbeddedResourceLoader.LoadResourceData(uri);
			var mimeType = this.$converter.ToMimeTypeString($Granular_Host_RenderImageSourceFactory.$GetRenderImageType(uri));
			return URL.createObjectURL(new Blob([new Uint8Array(imageData)], { type: mimeType }));
		}
	}, null, [System.Windows.IRenderImageSourceFactory]);
	ss.initClass($Granular_Host_RenderQueue, $asm, {
		Add: function(item) {
			this.$items.push(item);
			if (this.$items.length === 1) {
				window.requestAnimationFrame(ss.mkdel(this, function(time) {
					this.$Render();
				}));
			}
		},
		$Render: function() {
			var currentItems = Array.prototype.slice.call(this.$items);
			ss.clear(this.$items);
			var $t1 = ss.getEnumerator(currentItems);
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					item.Render();
				}
			}
			finally {
				$t1.dispose();
			}
		}
	}, null, [$Granular_Host_IRenderQueue]);
	ss.initClass($Granular_Host_TaskScheduler, $asm, {
		ScheduleTask: function(timeSpan, action) {
			var token = window.setTimeout(action, ss.Int32.trunc(timeSpan.ticks / 10000));
			return new System.Windows.Disposable(function() {
				window.clearTimeout(token);
			});
		}
	}, null, [System.Windows.Threading.ITaskScheduler]);
	ss.initClass($Granular_Host_TextMeasurementService, $asm, {
		Measure: function(text, fontSize, typeface, maxWidth) {
			if (ss.isNullOrUndefined(this.$htmlElement)) {
				this.$htmlElement = document.createElement('div');
				this.$style = new $Granular_Host_HtmlStyleDictionary(this.$htmlElement);
				document.body.appendChild(this.$htmlElement);
			}
			this.$style.SetValue('position', 'absolute');
			this.$style.SetValue('visibility', 'hidden');
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontSize(this.$style, fontSize, this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontFamily(this.$style, typeface.get_FontFamily(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStretch(this.$style, typeface.get_Stretch(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStyle(this.$style, typeface.get_Style(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontWeight(this.$style, typeface.get_Weight(), this.$converter);
			if (Granular.Extensions.DoubleExtensions.IsNaN(maxWidth) || !isFinite(maxWidth)) {
				$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextWrapping(this.$style, 1, this.$converter);
				this.$style.ClearValue('max-width');
			}
			else {
				$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextWrapping(this.$style, 0, this.$converter);
				this.$style.SetValue('max-width', this.$converter.ToPixelString(maxWidth));
			}
			this.$style.Apply();
			this.$htmlElement.innerHTML = this.$converter.ToHtmlContentString(Granular.Extensions.StringExtensions.DefaultIfNullOrEmpty(text, 'A'));
			return new System.Windows.Size((Granular.Extensions.StringExtensions.IsNullOrEmpty(text) ? 0 : (this.$htmlElement.offsetWidth + 2)), this.$htmlElement.offsetHeight);
		}
	}, null, [System.Windows.ITextMeasurementService]);
	ss.initClass($Granular_Host_WebApplicationHost, $asm, {
		get_PresentationSourceFactory: function() {
			return $Granular_Host_PresentationSourceFactory.Default;
		},
		get_TaskScheduler: function() {
			return $Granular_Host_TaskScheduler.Default;
		},
		get_TextMeasurementService: function() {
			return $Granular_Host_TextMeasurementService.Default;
		},
		get_RenderImageSourceFactory: function() {
			return $Granular_Host_RenderImageSourceFactory.Default;
		},
		Run: function(applicationEntryPoint) {
			window.onload = ss.delegateCombine(window.onload, function(e) {
				applicationEntryPoint();
			});
		}
	}, null, [System.Windows.IApplicationHost]);
	ss.initClass($Granular_Host_Render_HtmlRenderElement, $asm, {
		get_HtmlElement: function() {
			return this.$1$HtmlElementField;
		},
		set_HtmlElement: function(value) {
			this.$1$HtmlElementField = value;
		},
		get_Style: function() {
			return this.$1$StyleField;
		},
		set_Style: function(value) {
			this.$1$StyleField = value;
		},
		InvalidateRender: function() {
			if (!this.$isRenderValid) {
				return;
			}
			this.$isRenderValid = false;
			this.$renderQueue.Add(this);
		},
		Render: function() {
			this.$isRenderValid = true;
			this.get_Style().Apply();
			this.OnRender();
		},
		OnRender: function() {
			//
		}
	}, null, [$Granular_Host_IRenderItem]);
	$Granular_Host_Render_HtmlRenderElement.$ctor1.prototype = $Granular_Host_Render_HtmlRenderElement.$ctor2.prototype = $Granular_Host_Render_HtmlRenderElement.prototype;
	ss.initClass($Granular_Host_Render_HtmlBorderRenderElement, $asm, {
		get_Background: function() {
			return this.$background;
		},
		set_Background: function(value) {
			if (ss.referenceEquals(this.$background, value)) {
				return;
			}
			if (ss.isValue(this.$background)) {
				this.$background.remove_Changed(ss.mkdel(this, this.$OnBackgroundChanged));
			}
			this.$background = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_Style(), this.$background, this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), this.get_IsHitTestVisible() && ss.isValue(this.$background));
			if (ss.isValue(this.$background)) {
				this.$background.add_Changed(ss.mkdel(this, this.$OnBackgroundChanged));
			}
		},
		get_BorderThickness: function() {
			return this.$borderThickness;
		},
		set_BorderThickness: function(value) {
			if (ss.referenceEquals(this.$borderThickness, value)) {
				return;
			}
			this.$borderThickness = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderThickness(this.get_Style(), this.$borderThickness, this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), new System.Windows.Rect.$ctor2(this.get_Bounds().get_Location(), System.Windows.SizeExtensions.Max(System.Windows.Size.op_Subtraction(this.get_Bounds().get_Size(), this.get_BorderThickness().get_Size()), System.Windows.Size.Zero)), this.$converter);
			this.$SetCornerRadius();
		},
		get_BorderBrush: function() {
			return this.$borderBrush;
		},
		set_BorderBrush: function(value) {
			if (ss.referenceEquals(this.$borderBrush, value)) {
				return;
			}
			if (ss.isValue(this.$borderBrush)) {
				this.$borderBrush.remove_Changed(ss.mkdel(this, this.$OnBorderBrushChanged));
			}
			this.$borderBrush = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderBrush(this.get_Style(), this.get_BorderBrush(), this.$converter);
			if (ss.isValue(this.$borderBrush)) {
				this.$borderBrush.add_Changed(ss.mkdel(this, this.$OnBorderBrushChanged));
			}
		},
		get_Bounds: function() {
			return this.$bounds;
		},
		set_Bounds: function(value) {
			if (System.Windows.Rect.op_Equality(this.$bounds, value)) {
				return;
			}
			this.$bounds = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), new System.Windows.Rect.$ctor2(this.get_Bounds().get_Location(), System.Windows.SizeExtensions.Max(System.Windows.Size.op_Subtraction(this.get_Bounds().get_Size(), this.get_BorderThickness().get_Size()), System.Windows.Size.Zero)), this.$converter);
		},
		get_CornerRadius: function() {
			return this.$cornerRadius;
		},
		set_CornerRadius: function(value) {
			if (System.Windows.CornerRadius.op_Equality(this.$cornerRadius, value)) {
				return;
			}
			this.$cornerRadius = value;
			this.$SetCornerRadius();
		},
		get_IsHitTestVisible: function() {
			return this.$isHitTestVisible;
		},
		set_IsHitTestVisible: function(value) {
			if (this.$isHitTestVisible === value) {
				return;
			}
			this.$isHitTestVisible = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), this.$isHitTestVisible && ss.isValue(this.get_Background()));
		},
		$SetCornerRadius: function() {
			// CornerRadius is relative to the center of the border line, interpolate the outline radius
			var borderOutlineCornerRadius = new System.Windows.CornerRadius.$ctor1(this.get_CornerRadius().get_TopLeft() + (this.get_BorderThickness().get_Top() + this.get_BorderThickness().get_Left()) / 4, this.get_CornerRadius().get_TopRight() + (this.get_BorderThickness().get_Top() + this.get_BorderThickness().get_Right()) / 4, this.get_CornerRadius().get_BottomRight() + (this.get_BorderThickness().get_Bottom() + this.get_BorderThickness().get_Right()) / 4, this.get_CornerRadius().get_BottomLeft() + (this.get_BorderThickness().get_Bottom() + this.get_BorderThickness().get_Left()) / 4);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetCornerRadius(this.get_Style(), borderOutlineCornerRadius, this.$converter);
		},
		$OnBackgroundChanged: function(sender, e) {
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_Style(), this.get_Background(), this.$converter);
		},
		$OnBorderBrushChanged: function(sender, e) {
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBorderBrush(this.get_Style(), this.get_BorderBrush(), this.$converter);
		}
	}, $Granular_Host_Render_HtmlRenderElement, [$Granular_Host_IRenderItem, System.Windows.Media.IBorderRenderElement]);
	ss.initClass($Granular_Host_Render_HtmlImageRenderElement, $asm, {
		get_Bounds: function() {
			return this.$bounds;
		},
		set_Bounds: function(value) {
			if (System.Windows.Rect.op_Equality(this.$bounds, value)) {
				return;
			}
			this.$bounds = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.$bounds, this.$converter);
			this.$SetSourceRect();
		},
		get_Source: function() {
			return this.$source;
		},
		set_Source: function(value) {
			if (ss.referenceEquals(this.$source, value)) {
				return;
			}
			this.$source = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundImage(this.get_Style(), this.$source, this.$converter);
			this.$SetSourceRect();
		},
		$SetSourceRect: function() {
			if (ss.isNullOrUndefined(this.get_Source()) || System.Windows.RectExtensions.IsNullOrEmpty(this.get_Bounds()) || this.get_Bounds().get_Size().get_Width() === 0 || this.get_Bounds().get_Size().get_Height() === 0) {
				return;
			}
			var sourceRect = ss.cast(this.get_Source().get_RenderImageSource(), $Granular_Host_RenderImageSource).get_SourceRect();
			var imageSize = ss.cast(this.get_Source().get_RenderImageSource(), $Granular_Host_RenderImageSource).get_ImageSize();
			if (!System.Windows.RectExtensions.IsNullOrEmpty(sourceRect)) {
				var widthFactor = this.get_Bounds().get_Size().get_Width() / sourceRect.get_Width();
				var heightFactor = this.get_Bounds().get_Size().get_Height() / sourceRect.get_Height();
				var location = new System.Windows.Point.$ctor1(-sourceRect.get_Left() * widthFactor, -sourceRect.get_Top() * heightFactor);
				var size = new System.Windows.Size(imageSize.get_Width() * widthFactor, imageSize.get_Height() * heightFactor);
				$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundBounds(this.get_Style(), new System.Windows.Rect.$ctor2(location, size), this.$converter);
			}
			else {
				$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackgroundBounds(this.get_Style(), new System.Windows.Rect(this.get_Bounds().get_Size()), this.$converter);
			}
		}
	}, $Granular_Host_Render_HtmlRenderElement, [$Granular_Host_IRenderItem, System.Windows.Media.IImageRenderElement]);
	ss.initClass($Granular_Host_Render_HtmlRenderElementFactory, $asm, {
		CreateVisualRenderElement: function(owner) {
			return new $Granular_Host_Render_HtmlVisualRenderElement(owner, $Granular_Host_RenderQueue.Default, $Granular_Host_HtmlValueConverter.Default);
		},
		CreateDrawingRenderElement: function(owner) {
			throw new ss.NotImplementedException();
		},
		CreateTextBoxRenderElement: function(owner) {
			return new $Granular_Host_Render_HtmlTextBoxRenderElement($Granular_Host_RenderQueue.Default, $Granular_Host_HtmlValueConverter.Default);
		},
		CreateTextBlockRenderElement: function(owner) {
			return new $Granular_Host_Render_HtmlTextBlockRenderElement($Granular_Host_RenderQueue.Default, $Granular_Host_HtmlValueConverter.Default);
		},
		CreateBorderRenderElement: function(owner) {
			return new $Granular_Host_Render_HtmlBorderRenderElement($Granular_Host_RenderQueue.Default, $Granular_Host_HtmlValueConverter.Default);
		},
		CreateImageRenderElement: function(owner) {
			return new $Granular_Host_Render_HtmlImageRenderElement($Granular_Host_RenderQueue.Default, $Granular_Host_HtmlValueConverter.Default);
		}
	}, null, [System.Windows.Media.IRenderElementFactory]);
	ss.initClass($Granular_Host_Render_HtmlTextBlockRenderElement, $asm, {
		get_Text: function() {
			return this.$text;
		},
		set_Text: function(value) {
			if (ss.referenceEquals(this.$text, value)) {
				return;
			}
			this.$text = value;
			this.$isTextDirty = true;
			this.InvalidateRender();
		},
		get_Bounds: function() {
			return this.$bounds;
		},
		set_Bounds: function(value) {
			if (System.Windows.Rect.op_Equality(this.$bounds, value)) {
				return;
			}
			this.$bounds = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.$bounds, this.$converter);
		},
		get_Foreground: function() {
			return this.$foreground;
		},
		set_Foreground: function(value) {
			if (ss.referenceEquals(this.$foreground, value)) {
				return;
			}
			if (ss.isValue(this.$foreground)) {
				this.$foreground.remove_Changed(ss.mkdel(this, this.$OnForegroundChanged));
			}
			this.$foreground = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground(this.get_Style(), this.get_Foreground(), this.$converter);
			if (ss.isValue(this.$foreground)) {
				this.$foreground.add_Changed(ss.mkdel(this, this.$OnForegroundChanged));
			}
		},
		get_FontFamily: function() {
			return this.$fontFamily;
		},
		set_FontFamily: function(value) {
			if (ss.referenceEquals(this.$fontFamily, value)) {
				return;
			}
			this.$fontFamily = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontFamily(this.get_Style(), this.$fontFamily, this.$converter);
		},
		get_FontSize: function() {
			return this.$fontSize;
		},
		set_FontSize: function(value) {
			if (this.$fontSize === value) {
				return;
			}
			this.$fontSize = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontSize(this.get_Style(), this.$fontSize, this.$converter);
		},
		get_FontStyle: function() {
			return this.$fontStyle;
		},
		set_FontStyle: function(value) {
			if (this.$fontStyle === value) {
				return;
			}
			this.$fontStyle = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStyle(this.get_Style(), this.$fontStyle, this.$converter);
		},
		get_FontWeight: function() {
			return this.$fontWeight;
		},
		set_FontWeight: function(value) {
			if (this.$fontWeight === value) {
				return;
			}
			this.$fontWeight = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontWeight(this.get_Style(), this.$fontWeight, this.$converter);
		},
		get_FontStretch: function() {
			return this.$fontStretch;
		},
		set_FontStretch: function(value) {
			if (this.$fontStretch === value) {
				return;
			}
			this.$fontStretch = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStretch(this.get_Style(), this.$fontStretch, this.$converter);
		},
		get_TextAlignment: function() {
			return this.$textAlignment;
		},
		set_TextAlignment: function(value) {
			if (this.$textAlignment === value) {
				return;
			}
			this.$textAlignment = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextAlignment(this.get_Style(), this.$textAlignment, this.$converter);
		},
		get_TextTrimming: function() {
			return this.$textTrimming;
		},
		set_TextTrimming: function(value) {
			if (this.$textTrimming === value) {
				return;
			}
			this.$textTrimming = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextTrimming(this.get_Style(), this.$textTrimming);
		},
		get_TextWrapping: function() {
			return this.$textWrapping;
		},
		set_TextWrapping: function(value) {
			if (this.$textWrapping === value) {
				return;
			}
			this.$textWrapping = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextWrapping(this.get_Style(), this.$textWrapping, this.$converter);
		},
		OnRender: function() {
			if (this.$isTextDirty) {
				this.get_HtmlElement().textContent = this.$text;
				this.$isTextDirty = false;
			}
		},
		$OnForegroundChanged: function(sender, e) {
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground(this.get_Style(), this.get_Foreground(), this.$converter);
		}
	}, $Granular_Host_Render_HtmlRenderElement, [$Granular_Host_IRenderItem, System.Windows.Media.ITextBlockRenderElement]);
	ss.initClass($Granular_Host_Render_HtmlTextBoxRenderElement, $asm, {
		get_$ContentElement: function() {
			return this.$contentElement;
		},
		set_$ContentElement: function(value) {
			if (ss.referenceEquals(this.$contentElement, value)) {
				return;
			}
			if (ss.isValue(this.$contentElement)) {
				this.get_HtmlElement().removeChild(this.$contentElement.get_HtmlElement());
			}
			this.$contentElement = value;
			if (ss.isValue(this.$contentElement)) {
				this.get_HtmlElement().appendChild(this.$contentElement.get_HtmlElement());
			}
		},
		add_TextChanged: function(value) {
			this.$2$TextChangedField = ss.delegateCombine(this.$2$TextChangedField, value);
		},
		remove_TextChanged: function(value) {
			this.$2$TextChangedField = ss.delegateRemove(this.$2$TextChangedField, value);
		},
		get_Text: function() {
			return this.$text;
		},
		set_Text: function(value) {
			if (ss.referenceEquals(this.$text, value)) {
				return;
			}
			this.$text = value;
			this.$SetContentElementText();
			this.$GetContentElementSelection();
			Granular.Extensions.EventHandlerExtensions.Raise(this.$2$TextChangedField, this);
		},
		get_MaxLength: function() {
			return this.$maxLength;
		},
		set_MaxLength: function(value) {
			if (this.$maxLength === value) {
				return;
			}
			this.$maxLength = value;
			this.$SetContentElementMaxLength();
		},
		add_CaretIndexChanged: function(value) {
			this.$2$CaretIndexChangedField = ss.delegateCombine(this.$2$CaretIndexChangedField, value);
		},
		remove_CaretIndexChanged: function(value) {
			this.$2$CaretIndexChangedField = ss.delegateRemove(this.$2$CaretIndexChangedField, value);
		},
		get_CaretIndex: function() {
			return this.$caretIndex;
		},
		set_CaretIndex: function(value) {
			if (this.$caretIndex === value) {
				return;
			}
			this.$caretIndex = value;
			this.$SetContentElementCaretIndex();
			Granular.Extensions.EventHandlerExtensions.Raise(this.$2$CaretIndexChangedField, this);
		},
		add_SelectionStartChanged: function(value) {
			this.$2$SelectionStartChangedField = ss.delegateCombine(this.$2$SelectionStartChangedField, value);
		},
		remove_SelectionStartChanged: function(value) {
			this.$2$SelectionStartChangedField = ss.delegateRemove(this.$2$SelectionStartChangedField, value);
		},
		get_SelectionStart: function() {
			return this.$selectionStart;
		},
		set_SelectionStart: function(value) {
			if (this.$selectionStart === value) {
				return;
			}
			this.$selectionStart = value;
			this.$SetContentElementSelectionStart();
			Granular.Extensions.EventHandlerExtensions.Raise(this.$2$SelectionStartChangedField, this);
		},
		add_SelectionLengthChanged: function(value) {
			this.$2$SelectionLengthChangedField = ss.delegateCombine(this.$2$SelectionLengthChangedField, value);
		},
		remove_SelectionLengthChanged: function(value) {
			this.$2$SelectionLengthChangedField = ss.delegateRemove(this.$2$SelectionLengthChangedField, value);
		},
		get_SelectionLength: function() {
			return this.$selectionLength;
		},
		set_SelectionLength: function(value) {
			if (this.$selectionLength === value) {
				return;
			}
			this.$selectionLength = value;
			this.$SetContentElementSelectionLength();
			Granular.Extensions.EventHandlerExtensions.Raise(this.$2$SelectionLengthChangedField, this);
		},
		get_IsPassword: function() {
			return this.$isPassword;
		},
		set_IsPassword: function(value) {
			if (this.$isPassword === value) {
				return;
			}
			this.$isPassword = value;
			this.$SetContentElement();
		},
		get_IsReadOnly: function() {
			return this.$isReadOnly;
		},
		set_IsReadOnly: function(value) {
			if (this.$isReadOnly === value) {
				return;
			}
			this.$isReadOnly = value;
			this.$SetContentElementIsReadOnly();
		},
		get_SpellCheck: function() {
			return this.$spellCheck;
		},
		set_SpellCheck: function(value) {
			if (this.$spellCheck === value) {
				return;
			}
			this.$spellCheck = value;
			this.$SetContentElementSpellCheck();
		},
		get_Bounds: function() {
			return this.$bounds;
		},
		set_Bounds: function(value) {
			if (System.Windows.Rect.op_Equality(this.$bounds, value)) {
				return;
			}
			this.$bounds = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.$bounds, this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetSize(this.get_$ContentElement().get_Style(), this.$bounds.get_Size(), this.$converter);
		},
		get_Foreground: function() {
			return this.$foreground;
		},
		set_Foreground: function(value) {
			if (ss.referenceEquals(this.$foreground, value)) {
				return;
			}
			if (ss.isValue(this.$foreground)) {
				this.$foreground.remove_Changed(ss.mkdel(this, this.$OnForegroundChanged));
			}
			this.$foreground = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground(this.get_$ContentElement().get_Style(), this.get_Foreground(), this.$converter);
			if (ss.isValue(this.$foreground)) {
				this.$foreground.add_Changed(ss.mkdel(this, this.$OnForegroundChanged));
			}
		},
		get_FontFamily: function() {
			return this.$fontFamily;
		},
		set_FontFamily: function(value) {
			if (ss.referenceEquals(this.$fontFamily, value)) {
				return;
			}
			this.$fontFamily = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontFamily(this.get_$ContentElement().get_Style(), this.$fontFamily, this.$converter);
		},
		get_FontSize: function() {
			return this.$fontSize;
		},
		set_FontSize: function(value) {
			if (this.$fontSize === value) {
				return;
			}
			this.$fontSize = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontSize(this.get_$ContentElement().get_Style(), this.$fontSize, this.$converter);
		},
		get_FontStyle: function() {
			return this.$fontStyle;
		},
		set_FontStyle: function(value) {
			if (this.$fontStyle === value) {
				return;
			}
			this.$fontStyle = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStyle(this.get_$ContentElement().get_Style(), this.$fontStyle, this.$converter);
		},
		get_FontWeight: function() {
			return this.$fontWeight;
		},
		set_FontWeight: function(value) {
			if (this.$fontWeight === value) {
				return;
			}
			this.$fontWeight = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontWeight(this.get_$ContentElement().get_Style(), this.$fontWeight, this.$converter);
		},
		get_FontStretch: function() {
			return this.$fontStretch;
		},
		set_FontStretch: function(value) {
			if (this.$fontStretch === value) {
				return;
			}
			this.$fontStretch = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStretch(this.get_$ContentElement().get_Style(), this.$fontStretch, this.$converter);
		},
		get_TextAlignment: function() {
			return this.$textAlignment;
		},
		set_TextAlignment: function(value) {
			if (this.$textAlignment === value) {
				return;
			}
			this.$textAlignment = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextAlignment(this.get_$ContentElement().get_Style(), this.$textAlignment, this.$converter);
		},
		get_TextTrimming: function() {
			return this.$textTrimming;
		},
		set_TextTrimming: function(value) {
			if (this.$textTrimming === value) {
				return;
			}
			this.$textTrimming = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextTrimming(this.get_$ContentElement().get_Style(), this.$textTrimming);
		},
		get_TextWrapping: function() {
			return this.$textWrapping;
		},
		set_TextWrapping: function(value) {
			if (this.$textWrapping === value) {
				return;
			}
			this.$textWrapping = value;
			this.$SetContentElementTextWrapping();
		},
		get_AcceptsReturn: function() {
			return this.$acceptsReturn;
		},
		set_AcceptsReturn: function(value) {
			if (this.$acceptsReturn === value) {
				return;
			}
			this.$acceptsReturn = value;
			this.$SetContentElement();
		},
		get_HorizontalScrollBarVisibility: function() {
			return this.$horizontalScrollBarVisibility;
		},
		set_HorizontalScrollBarVisibility: function(value) {
			if (this.$horizontalScrollBarVisibility === value) {
				return;
			}
			this.$horizontalScrollBarVisibility = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetHorizontalScrollBarVisibility(this.get_$ContentElement().get_Style(), this.$horizontalScrollBarVisibility, this.$converter);
		},
		get_VerticalScrollBarVisibility: function() {
			return this.$verticalScrollBarVisibility;
		},
		set_VerticalScrollBarVisibility: function(value) {
			if (this.$verticalScrollBarVisibility === value) {
				return;
			}
			this.$verticalScrollBarVisibility = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetVerticalScrollBarVisibility(this.get_$ContentElement().get_Style(), this.$verticalScrollBarVisibility, this.$converter);
		},
		get_IsHitTestVisible: function() {
			return this.$isHitTestVisible;
		},
		set_IsHitTestVisible: function(value) {
			if (this.$isHitTestVisible === value) {
				return;
			}
			this.$isHitTestVisible = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_$ContentElement().get_Style(), this.get_IsHitTestVisible());
		},
		get_AcceptsTab: function() {
			return this.$2$AcceptsTabField;
		},
		set_AcceptsTab: function(value) {
			this.$2$AcceptsTabField = value;
		},
		$SetContentElement: function() {
			if (this.get_IsPassword() || !this.get_AcceptsReturn()) {
				this.set_$ContentElement(new $Granular_Host_Render_HtmlRenderElement.$ctor1('input', this.$renderQueue$1));
				this.get_$ContentElement().get_HtmlElement().setAttribute('type', (this.get_IsPassword() ? 'password' : 'text'));
			}
			else {
				this.set_$ContentElement(new $Granular_Host_Render_HtmlRenderElement.$ctor1('textarea', this.$renderQueue$1));
			}
			this.$SetContentElementText();
			this.$SetContentElementMaxLength();
			this.$SetContentElementSelectionStart();
			this.$SetContentElementSelectionLength();
			this.$SetContentElementIsReadOnly();
			this.$SetContentElementSpellCheck();
			this.$SetContentElementTextWrapping();
			this.get_$ContentElement().get_Style().SetValue('resize', 'none');
			this.get_$ContentElement().get_Style().SetValue('margin', '0px');
			this.get_$ContentElement().get_Style().SetValue('padding', '0px');
			this.get_$ContentElement().get_Style().SetValue('border', '0px solid transparent');
			this.get_$ContentElement().get_Style().SetValue('outline', '1px solid transparent');
			this.get_$ContentElement().get_Style().SetValue('cursor', 'inherit');
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_$ContentElement().get_Style(), System.Windows.Media.Brushes.get_Transparent(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetLocation(this.get_$ContentElement().get_Style(), System.Windows.Point.Zero, this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetSize(this.get_$ContentElement().get_Style(), this.get_Bounds().get_Size(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground(this.get_$ContentElement().get_Style(), this.get_Foreground(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontFamily(this.get_$ContentElement().get_Style(), this.get_FontFamily(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontSize(this.get_$ContentElement().get_Style(), this.get_FontSize(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStyle(this.get_$ContentElement().get_Style(), this.get_FontStyle(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontWeight(this.get_$ContentElement().get_Style(), this.get_FontWeight(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetFontStretch(this.get_$ContentElement().get_Style(), this.get_FontStretch(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_$ContentElement().get_Style(), this.get_IsHitTestVisible());
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextAlignment(this.get_$ContentElement().get_Style(), this.get_TextAlignment(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTextTrimming(this.get_$ContentElement().get_Style(), this.get_TextTrimming());
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetHorizontalScrollBarVisibility(this.get_$ContentElement().get_Style(), this.get_HorizontalScrollBarVisibility(), this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetVerticalScrollBarVisibility(this.get_$ContentElement().get_Style(), this.get_VerticalScrollBarVisibility(), this.$converter);
			var $t1 = this.get_$ContentElement().get_HtmlElement();
			$t1.oninput = ss.delegateCombine($t1.oninput, ss.mkdel(this, function(e) {
				this.set_Text(this.get_$ContentElement().get_HtmlElement().value);
			}));
			var $t2 = this.get_$ContentElement().get_HtmlElement();
			$t2.onkeydown = ss.delegateCombine($t2.onkeydown, ss.mkdel(this, this.$OnContentElementKeyDown));
			var $t3 = this.get_$ContentElement().get_HtmlElement();
			$t3.onselect = ss.delegateCombine($t3.onselect, ss.mkdel(this, function(e1) {
				this.$GetContentElementSelection();
			}));
			var $t4 = this.get_$ContentElement().get_HtmlElement();
			$t4.onkeyup = ss.delegateCombine($t4.onkeyup, ss.mkdel(this, function(e2) {
				this.$GetContentElementSelection();
			}));
			var $t5 = this.get_$ContentElement().get_HtmlElement();
			$t5.onmouseup = ss.delegateCombine($t5.onmouseup, ss.mkdel(this, function(e3) {
				this.$GetContentElementSelection();
			}));
		},
		Focus: function() {
			this.$isFocused = true;
			this.get_$ContentElement().get_HtmlElement().focus();
		},
		ClearFocus: function() {
			this.$isFocused = false;
			this.get_$ContentElement().get_HtmlElement().blur();
		},
		$OnForegroundChanged: function(sender, e) {
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetForeground(this.get_$ContentElement().get_Style(), this.get_Foreground(), this.$converter);
		},
		$OnContentElementKeyDown: function(e) {
			if (!this.get_IsReadOnly() && this.get_AcceptsTab() && ss.cast(e, KeyboardEvent).keyCode === 9) {
				var selectionStart = this.get_SelectionStart();
				var contentElementText = this.get_$ContentElement().get_HtmlElement().value;
				this.set_Text(ss.formatString('{0}\t{1}', contentElementText.substr(0, this.get_SelectionStart()), contentElementText.substring(this.get_SelectionStart() + this.get_SelectionLength())));
				this.get_$ContentElement().get_HtmlElement().selectionStart = selectionStart + 1;
				this.get_$ContentElement().get_HtmlElement().selectionEnd = selectionStart + 1;
				this.$GetContentElementSelection();
				e.preventDefault();
			}
		},
		$GetContentElementSelection: function() {
			var selectionStart = this.get_$ContentElement().get_HtmlElement().selectionStart;
			var selectionEnd = this.get_$ContentElement().get_HtmlElement().selectionEnd;
			if (this.get_SelectionStart() !== selectionStart || this.get_SelectionLength() !== selectionEnd - selectionStart) {
				var changeIndex = ((this.get_SelectionStart() + this.get_SelectionLength() !== selectionEnd) ? selectionEnd : selectionStart);
				this.set_SelectionStart(selectionStart);
				this.set_SelectionLength(selectionEnd - selectionStart);
				this.set_CaretIndex(changeIndex);
			}
		},
		$SetContentElementCaretIndex: function() {
			if (this.$isFocused && this.get_CaretIndex() !== this.get_SelectionStart() && this.get_CaretIndex() !== this.get_SelectionStart() + this.get_SelectionLength()) {
				this.get_$ContentElement().get_HtmlElement().focus();
				var $t1 = this.get_$ContentElement().get_HtmlElement();
				var $t2 = this.get_CaretIndex();
				$t1.setSelectionRange($t2, $t2);
			}
		},
		$SetContentElementSelectionStart: function() {
			if (this.get_$ContentElement().get_HtmlElement().selectionStart !== this.get_SelectionStart()) {
				this.get_$ContentElement().get_HtmlElement().selectionStart = this.get_SelectionStart();
			}
		},
		$SetContentElementSelectionLength: function() {
			if (this.get_$ContentElement().get_HtmlElement().selectionEnd !== this.get_SelectionStart() + this.get_SelectionLength()) {
				this.get_$ContentElement().get_HtmlElement().selectionEnd = this.get_SelectionStart() + this.get_SelectionLength();
			}
		},
		$SetContentElementText: function() {
			if (!ss.referenceEquals(this.get_$ContentElement().get_HtmlElement().value, Granular.Extensions.StringExtensions.DefaultIfNullOrEmpty(this.get_Text(), null))) {
				this.get_$ContentElement().get_HtmlElement().value = this.get_Text();
			}
		},
		$SetContentElementMaxLength: function() {
			if (this.$maxLength > 0) {
				this.get_$ContentElement().get_HtmlElement().setAttribute('maxLength', this.$maxLength.toString());
			}
			else {
				this.get_$ContentElement().get_HtmlElement().removeAttribute('maxLength');
			}
		},
		$SetContentElementIsReadOnly: function() {
			if (this.get_IsReadOnly()) {
				this.get_$ContentElement().get_HtmlElement().setAttribute('readonly', '');
			}
			else {
				this.get_$ContentElement().get_HtmlElement().removeAttribute('readonly');
			}
		},
		$SetContentElementSpellCheck: function() {
			this.get_$ContentElement().get_HtmlElement().setAttribute('spellcheck', this.$converter.ToBooleanString(this.get_SpellCheck()));
		},
		$SetContentElementTextWrapping: function() {
			this.get_$ContentElement().get_HtmlElement().setAttribute('wrap', this.$converter.ToWrapString(this.get_TextWrapping()));
		},
		ProcessKeyEvent: function(e) {
			e.set_ForceHostHandling(true);
			e.set_Handled(true);
		}
	}, $Granular_Host_Render_HtmlRenderElement, [$Granular_Host_IRenderItem, System.Windows.Media.ITextBoxRenderElement]);
	ss.initClass($Granular_Host_Render_HtmlVisualRenderElement, $asm, {
		get_Background: function() {
			return this.$background;
		},
		set_Background: function(value) {
			if (ss.referenceEquals(this.$background, value)) {
				return;
			}
			if (ss.isValue(this.$background)) {
				this.$background.remove_Changed(ss.mkdel(this, this.$OnBackgroundChanged));
			}
			this.$background = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_Style(), this.$background, this.$converter);
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), this.get_IsHitTestVisible() && ss.isValue(this.$background));
			if (ss.isValue(this.$background)) {
				this.$background.add_Changed(ss.mkdel(this, this.$OnBackgroundChanged));
			}
		},
		get_Bounds: function() {
			return this.$bounds;
		},
		set_Bounds: function(value) {
			if (System.Windows.Rect.op_Equality(this.$bounds, value)) {
				return;
			}
			this.$bounds = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBounds(this.get_Style(), this.$bounds, this.$converter);
		},
		get_ClipToBounds: function() {
			return this.$clipToBounds;
		},
		set_ClipToBounds: function(value) {
			if (this.$clipToBounds === value) {
				return;
			}
			this.$clipToBounds = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetClipToBounds(this.get_Style(), this.$clipToBounds);
		},
		get_IsHitTestVisible: function() {
			return this.$isHitTestVisible;
		},
		set_IsHitTestVisible: function(value) {
			if (this.$isHitTestVisible === value) {
				return;
			}
			this.$isHitTestVisible = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsHitTestVisible(this.get_Style(), this.$isHitTestVisible && ss.isValue(this.get_Background()));
		},
		get_IsVisible: function() {
			return this.$isVisible;
		},
		set_IsVisible: function(value) {
			if (this.$isVisible === value) {
				return;
			}
			this.$isVisible = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetIsVisible(this.get_Style(), this.$isVisible);
		},
		get_Opacity: function() {
			return this.$opacity;
		},
		set_Opacity: function(value) {
			if (this.$opacity === value) {
				return;
			}
			this.$opacity = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetOpacity(this.get_Style(), this.$opacity, this.$converter);
		},
		get_Transform: function() {
			return this.$transform;
		},
		set_Transform: function(value) {
			if (ss.referenceEquals(this.$transform, value)) {
				return;
			}
			this.$transform = value;
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetTransform(this.get_Style(), this.$transform, this.$converter);
		},
		get_Children: function() {
			return this.$children;
		},
		OnRender: function() {
			for (var $t1 = 0; $t1 < this.$childrenActions.length; $t1++) {
				var action = this.$childrenActions[$t1];
				action();
			}
			ss.clear(this.$childrenActions);
		},
		InsertChild: function(index, child) {
			if (!ss.isInstanceOfType(child, $Granular_Host_Render_HtmlRenderElement)) {
				throw new Granular.Exception('Can\'t add child of type "{0}"', [ss.getTypeName(ss.getInstanceType(child))]);
			}
			if (index < this.$children.length) {
				ss.insert(this.$children, index, child);
				this.$childrenActions.push(ss.mkdel(this, function() {
					this.get_HtmlElement().insertBefore(ss.cast(child, $Granular_Host_Render_HtmlRenderElement).get_HtmlElement(), this.get_HtmlElement().children[index]);
				}));
			}
			else {
				this.$children.push(child);
				this.$childrenActions.push(ss.mkdel(this, function() {
					this.get_HtmlElement().appendChild(ss.cast(child, $Granular_Host_Render_HtmlRenderElement).get_HtmlElement());
				}));
			}
			this.InvalidateRender();
		},
		RemoveChild: function(child) {
			if (!ss.isInstanceOfType(child, $Granular_Host_Render_HtmlRenderElement)) {
				throw new Granular.Exception('Can\'t remove child of type "{0}"', [ss.getTypeName(ss.getInstanceType(child))]);
			}
			var childIndex = ss.indexOf(this.$children, child);
			if (childIndex !== -1) {
				ss.removeAt(this.$children, childIndex);
				this.$childrenActions.push(ss.mkdel(this, function() {
					this.get_HtmlElement().removeChild(ss.cast(child, $Granular_Host_Render_HtmlRenderElement).get_HtmlElement());
				}));
			}
			this.InvalidateRender();
		},
		$OnBackgroundChanged: function(sender, e) {
			$Granular_Host_$HtmlStyleDictionaryExtensions.$SetBackground(this.get_Style(), this.get_Background(), this.$converter);
		}
	}, $Granular_Host_Render_HtmlRenderElement, [$Granular_Host_IRenderItem, System.Windows.Media.IVisualRenderElement]);
	(function() {
		$Granular_Host_HtmlDefinition.Tags = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];
	})();
	(function() {
		$Granular_Host_HtmlValueConverter.Default = new $Granular_Host_HtmlValueConverter();
	})();
	(function() {
		$Granular_Host_RenderQueue.Default = new $Granular_Host_RenderQueue();
	})();
	(function() {
		$Granular_Host_Render_HtmlRenderElementFactory.Default = new $Granular_Host_Render_HtmlRenderElementFactory();
	})();
	(function() {
		$Granular_Host_PresentationSourceFactory.Default = new $Granular_Host_PresentationSourceFactory();
	})();
	(function() {
		$Granular_Host_RenderImageSourceFactory.Default = new $Granular_Host_RenderImageSourceFactory($Granular_Host_HtmlValueConverter.Default);
	})();
	(function() {
		$Granular_Host_TaskScheduler.Default = new $Granular_Host_TaskScheduler();
	})();
	(function() {
		$Granular_Host_TextMeasurementService.Default = new $Granular_Host_TextMeasurementService($Granular_Host_HtmlValueConverter.Default);
	})();
})();
