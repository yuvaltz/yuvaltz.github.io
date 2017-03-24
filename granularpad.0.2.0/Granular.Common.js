/**
 * @version 0.2.0.0
 * @copyright Copyright ☺ 2016
 * @compiler Bridge.NET 15.5.0
 */
Bridge.assembly("Granular.Common", function ($asm, globals) {
    "use strict";

    Bridge.define("Granular.Collections.CacheDictionary$2", function (TKey, TValue) { return {
        statics: {
            defaultValue: null
        },
        tryResolveValue: null,
        resolveValue: null,
        dictionary: null,
        unsetValues: null,
        ctor: function (resolveValue, equalityComparer) {
            if (equalityComparer === void 0) { equalityComparer = null; }

            Granular.Collections.CacheDictionary$2(TKey,TValue).$ctor1.call(this, null, resolveValue, equalityComparer);
            //
        },
        $ctor2: function (tryResolveValue, equalityComparer) {
            if (equalityComparer === void 0) { equalityComparer = null; }

            Granular.Collections.CacheDictionary$2(TKey,TValue).$ctor1.call(this, tryResolveValue, null, equalityComparer);
            //
        },
        $ctor1: function (tryResolveValue, resolveValue, equalityComparer) {
            this.$initialize();
            this.tryResolveValue = tryResolveValue;
            this.resolveValue = resolveValue;

            this.dictionary = new (System.Collections.Generic.Dictionary$2(TKey, TValue))(null, equalityComparer);
            this.unsetValues = new (System.Collections.Generic.HashSet$1(TKey))();
        },
        getValue: function (key) {
            var value = { };
            if (this.tryGetValue(key, value)) {
                return value.v;
            }

            throw new Granular.Exception("Key \"{0}\" was not found", [key]);
        },
        tryGetValue: function (key, value) {
            if (this.dictionary.tryGetValue(key, value)) {
                return true;
            }

            if (this.unsetValues.contains(key)) {
                value.v = Granular.Collections.CacheDictionary$2(TKey,TValue).defaultValue;
                return false;
            }

            if (!Bridge.staticEquals(this.tryResolveValue, null) && this.tryResolveValue(key, value)) {
                this.dictionary.add(key, value.v);
                return true;
            }

            if (!Bridge.staticEquals(this.resolveValue, null)) {
                value.v = this.resolveValue(key);
                this.dictionary.add(key, value.v);
                return true;
            }

            this.unsetValues.add(key);
            value.v = Granular.Collections.CacheDictionary$2(TKey,TValue).defaultValue;
            return false;
        },
        contains: function (key) {
            return this.dictionary.containsKey(key) || this.unsetValues.contains(key);
        },
        remove: function (key) {
            this.dictionary.remove(key);
            this.unsetValues.remove(key);
        },
        clear: function () {
            this.dictionary.clear();
            this.unsetValues.clear();
        }
    }; });

    Bridge.define("Granular.Collections.INotifyCollectionChanged", {
        $kind: "interface"
    });

    Bridge.definei("Granular.Collections.IListDictionary$2", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IEnumerable$1(System.Collections.Generic.KeyValuePair$2(TKey,TValue))],
        $kind: "interface"
    }; });

    Bridge.define("Granular.Collections.IListDictionaryExtensions", {
        statics: {
            getKeys: function (TKey, TValue, listDictionary) {
                return listDictionary["Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getKeys"]();
            },
            getValues: function (TKey, TValue, listDictionary) {
                return listDictionary["Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getValues"]();
            },
            contains: function (TKey, TValue, listDictionary, key, value) {
                return System.Linq.Enumerable.from(listDictionary["Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getValues$1"](key)).contains(value);
            }
        }
    });

    Bridge.define("Granular.Collections.ListSortDirection", {
        $kind: "enum",
        statics: {
            Ascending: 0,
            Descending: 1
        }
    });

    Bridge.define("Granular.Collections.NotifyCollectionChangedAction", {
        $kind: "enum",
        statics: {
            Add: 0,
            Remove: 1,
            Replace: 2,
            Move: 3,
            Reset: 4
        }
    });

    Bridge.define("Granular.Collections.NotifyCollectionChangedEventArgs", {
        statics: {
            add: function (item, index) {
                return Granular.Collections.NotifyCollectionChangedEventArgs.addRange([item], index);
            },
            addRange: function (items, startingIndex) {
                return new Granular.Collections.NotifyCollectionChangedEventArgs(Granular.Collections.NotifyCollectionChangedAction.Add, System.Array.init(0, null), -1, items, startingIndex);
            },
            remove: function (item, index) {
                return Granular.Collections.NotifyCollectionChangedEventArgs.removeRange([item], index);
            },
            removeRange: function (items, startingIndex) {
                return new Granular.Collections.NotifyCollectionChangedEventArgs(Granular.Collections.NotifyCollectionChangedAction.Remove, items, startingIndex, System.Array.init(0, null), -1);
            },
            replace: function (oldItem, newItem, index) {
                return Granular.Collections.NotifyCollectionChangedEventArgs.replaceRange([oldItem], [newItem], index);
            },
            replaceRange: function (oldItems, newItems, index) {
                return new Granular.Collections.NotifyCollectionChangedEventArgs(Granular.Collections.NotifyCollectionChangedAction.Replace, oldItems, index, newItems, index);
            },
            move: function (item, oldIndex, newIndex) {
                return Granular.Collections.NotifyCollectionChangedEventArgs.moveRange([item], oldIndex, newIndex);
            },
            moveRange: function (items, oldStartingIndex, newStartingIndex) {
                return new Granular.Collections.NotifyCollectionChangedEventArgs(Granular.Collections.NotifyCollectionChangedAction.Move, items, oldStartingIndex, items, newStartingIndex);
            },
            reset: function (oldItems, newItems) {
                return new Granular.Collections.NotifyCollectionChangedEventArgs(Granular.Collections.NotifyCollectionChangedAction.Reset, oldItems, 0, newItems, 0);
            }
        },
        config: {
            properties: {
                Action: 0,
                NewItems: null,
                NewStartingIndex: 0,
                OldItems: null,
                OldStartingIndex: 0
            }
        },
        ctor: function (action, oldItems, oldStartingIndex, newItems, newStartingIndex) {
            this.$initialize();
            this.setAction(action);
            this.setOldItems(oldItems);
            this.setOldStartingIndex(oldStartingIndex);
            this.setNewItems(newItems);
            this.setNewStartingIndex(newStartingIndex);
        }
    });

    Bridge.define("Granular.Collections.NotifyCollectionChangedEventHandlerExtensions", {
        statics: {
            raise: function (handler, sender, e) {
                if (!Bridge.staticEquals(handler, null)) {
                    handler(sender, e);
                }
            }
        }
    });

    Bridge.define("Granular.Collections.PriorityQueue$2", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IEnumerable$1(System.Collections.Generic.KeyValuePair$2(TKey,TValue))],
        statics: {
            defaultValue: null
        },
        comparer: null,
        items: null,
        config: {
            alias: [
            "getEnumerator", "System$Collections$Generic$IEnumerable$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getEnumerator"
            ]
        },
        ctor: function () {
            Granular.Collections.PriorityQueue$2(TKey,TValue).$ctor1.call(this, Granular.Compatibility.Comparer$1(TKey).getDefault());
            //
        },
        $ctor1: function (comparer) {
            this.$initialize();
            this.comparer = comparer;
            this.items = new (System.Collections.Generic.List$1(System.Collections.Generic.KeyValuePair$2(TKey,TValue)))();
        },
        getCount: function () {
            return this.items.getCount();
        },
        enqueue: function (key, value) {
            this.items.insert(this.getKeyIndex(key, 0, this.items.getCount()), new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(key, value));
        },
        getKeyIndex: function (key, startIndex, endIndex) {
            if (((endIndex - startIndex) | 0) === 0) {
                return endIndex;
            }

            if (((endIndex - startIndex) | 0) === 1) {
                return this.comparer["System$Collections$Generic$IComparer$1$" + Bridge.getTypeAlias(TKey) + "$compare"](key, this.items.getItem(startIndex).key) > 0 ? startIndex : endIndex;
            }

            var middleIndex = (Bridge.Int.div((((startIndex + endIndex) | 0)), 2)) | 0;

            return this.comparer["System$Collections$Generic$IComparer$1$" + Bridge.getTypeAlias(TKey) + "$compare"](key, this.items.getItem(middleIndex).key) > 0 ? this.getKeyIndex(key, startIndex, middleIndex) : this.getKeyIndex(key, middleIndex, endIndex);
        },
        dequeue: function () {
            var value = { };
            if (this.tryDequeue(value)) {
                return value.v;
            }

            throw new System.InvalidOperationException("Queue is empty");
        },
        tryDequeue: function (value) {
            if (this.tryPeek(value)) {
                this.items.removeAt(0);
                return true;
            }

            value.v = Granular.Collections.PriorityQueue$2(TKey,TValue).defaultValue;
            return false;
        },
        peek: function () {
            var value = { };
            if (this.tryPeek(value)) {
                return value.v;
            }

            throw new System.InvalidOperationException("Queue is empty");
        },
        tryPeek: function (value) {
            if (this.items.getCount() > 0) {
                value.v = this.items.getItem(0).value;
                return true;
            }

            value.v = Granular.Collections.PriorityQueue$2(TKey,TValue).defaultValue;
            return false;
        },
        getEnumerator: function () {
            return this.items.getEnumerator();
        },
        System$Collections$IEnumerable$getEnumerator: function () {
            return this.items.getEnumerator();
        }
    }; });

    Bridge.define("Granular.Collections.ReadOnlyStack$1", function (T) { return {
        enumerator: null,
        config: {
            properties: {
                IsEmpty: false
            }
        },
        ctor: function (source) {
            this.$initialize();
            this.enumerator = Bridge.getEnumerator(source, T);

            this.moveNext();
        },
        pop: function () {
            if (this.getIsEmpty()) {
                throw new Granular.Exception("Stack is empty");
            }

            var current = this.enumerator[Bridge.geti(this.enumerator, "System$Collections$Generic$IEnumerator$1$" + Bridge.getTypeAlias(T) + "$getCurrent$1", "getCurrent$1")]();

            this.moveNext();

            return current;
        },
        peek: function () {
            if (this.getIsEmpty()) {
                throw new Granular.Exception("Stack is empty");
            }

            return this.enumerator[Bridge.geti(this.enumerator, "System$Collections$Generic$IEnumerator$1$" + Bridge.getTypeAlias(T) + "$getCurrent$1", "getCurrent$1")]();
        },
        moveNext: function () {
            this.setIsEmpty(!this.enumerator.System$Collections$IEnumerator$moveNext());
        }
    }; });

    Bridge.define("Granular.Compatibility.AppDomain");

    Bridge.define("Granular.Compatibility.Array", {
        statics: {
            indexOf: function (T, array, value) {
                for (var i = 0; i < array.length; i = (i + 1) | 0) {
                    if (Granular.Compatibility.EqualityComparer$1(T).default.equals2(array[i], value)) {
                        return i;
                    }
                }

                return -1;
            },
            findIndex: function (T, array, match) {
                for (var i = 0; i < array.length; i = (i + 1) | 0) {
                    if (match(array[i])) {
                        return i;
                    }
                }

                return -1;
            },
            findLastIndex: function (T, array, match) {
                var lastIndex = -1;

                for (var i = 0; i < array.length; i = (i + 1) | 0) {
                    if (match(array[i])) {
                        lastIndex = i;
                    }
                }

                return lastIndex;
            }
        }
    });

    Bridge.define("Granular.Compatibility.AssemblyReferenceAttribute", {
        inherits: [System.Attribute],
        ctor: function (reference) {
            this.$initialize();
            System.Attribute.ctor.call(this);
            //
        }
    });

    Bridge.define("Granular.Compatibility.BindingFlags", {
        statics: {
            InstanceNonPublic: 4,
            InstancePublicNonPublicFlattenHierarchy: 84
        }
    });

    Bridge.define("Granular.Compatibility.Collection");

    Bridge.define("Granular.Compatibility.Comparer$1", function (T) { return {
        statics: {
            getDefault: function () {
                return new (Granular.Compatibility.Comparer$1.CompatibleComparer(T))(new (System.Collections.Generic.Comparer$1(T))(System.Collections.Generic.Comparer$1.$default.fn));
            }
        }
    }; });

    Bridge.define("Granular.Compatibility.Comparer$1.CompatibleComparer", function (T) { return {
        inherits: [System.Collections.Generic.IComparer$1(T)],
        comparer: null,
        config: {
            alias: [
            "compare", "System$Collections$Generic$IComparer$1$" + Bridge.getTypeAlias(T) + "$compare"
            ]
        },
        ctor: function (comparer) {
            this.$initialize();
            this.comparer = comparer;
        },
        compare: function (x, y) {
            return this.comparer.compare(x, y);
        }
    }; });

    Bridge.define("Granular.Compatibility.Convert", {
        statics: {
            HexDigits: "0123456789ABCDEF",
            toUInt32: function (value, fromBase) {
                if (fromBase <= 0 || fromBase > Granular.Compatibility.Convert.HexDigits.length) {
                    throw new Granular.Exception("Can't convert to UInt32 from \"{0}\" base", [fromBase]);
                }

                var hexValue = 0;

                for (var i = 0; i < value.length; i = (i + 1) | 0) {
                    var hexChar = System.String.indexOf(Granular.Compatibility.Convert.HexDigits, String.fromCharCode(value.charCodeAt(i)));

                    if (hexChar === -1) {
                        throw new Granular.Exception("Can't convert \"{0}\" from base \"{1}\" to UInt32", [value, fromBase]);
                    }

                    hexValue = (((hexValue * (fromBase >>> 0)) >>> 0) + (hexChar >>> 0)) >>> 0;
                }

                return hexValue;
            },
            changeType: function (value, conversionType) {
                if (Bridge.is(value, System.Int32) && Bridge.referenceEquals(conversionType, System.Double)) {
                    return System.Nullable.getValue(Bridge.cast(value, System.Int32));
                }

                if (Bridge.is(value, String)) {
                    if (Bridge.referenceEquals(conversionType, System.Int32)) {
                        return System.Int32.parse(Bridge.cast(value, String));
                    }

                    if (Bridge.referenceEquals(conversionType, System.Double)) {
                        return System.Double.parse(Bridge.cast(value, String));
                    }
                }

                throw new Granular.Exception("Can't convert value \"{0}\" from \"{1}\" to \"{2}\"", [value, Bridge.Reflection.getTypeName(Bridge.getType(value)), Bridge.Reflection.getTypeName(conversionType)]);
            }
        }
    });

    Bridge.define("Granular.Compatibility.Dictionary");

    Bridge.define("Granular.Compatibility.Double", {
        statics: {
            doubleFormat: null,
            config: {
                init: function () {
                    this.doubleFormat = new System.Text.RegularExpressions.Regex.ctor("[+-]?([0-9]*,)*[0-9]*(\\.([0-9]*))?([eE]([+-]?)[0-9]*)?");
                }
            },
            tryParse: function (s, result) {
                if (!Granular.Compatibility.Double.doubleFormat.match(s).getSuccess()) {
                    result.v = Number.NaN;
                    return false;
                }

                result.v = System.Double.parse(s);
                return true;
            },
            isInfinity: function (d) {
                return !isFinite(d);
            }
        }
    });

    Bridge.define("Granular.Compatibility.EqualityComparer", {
        statics: {
            default: null,
            double: null,
            config: {
                init: function () {
                    this.default = new (Granular.Compatibility.EqualityComparer$1(Object))(System.Collections.Generic.EqualityComparer$1(Object).def);
                    this.double = new (Granular.Compatibility.EqualityComparer$1(System.Double))(System.Collections.Generic.EqualityComparer$1(System.Double).def);
                }
            }
        }
    });

    Bridge.define("Granular.Compatibility.EqualityComparer$1", function (T) { return {
        inherits: [System.Collections.Generic.IEqualityComparer$1(T)],
        statics: {
            default: null,
            config: {
                init: function () {
                    this.default = new (Granular.Compatibility.EqualityComparer$1(T))(System.Collections.Generic.EqualityComparer$1(T).def);
                }
            }
        },
        comparer: null,
        config: {
            alias: [
            "equals2", "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(T) + "$equals2",
            "getHashCode2", "System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(T) + "$getHashCode2"
            ]
        },
        ctor: function (comparer) {
            this.$initialize();
            this.comparer = comparer;
        },
        equals2: function (x, y) {
            return this.comparer["System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(T) + "$equals2"](x, y) || x !== x && y !== y;
        },
        getHashCode2: function (obj) {
            return this.comparer["System$Collections$Generic$IEqualityComparer$1$" + Bridge.getTypeAlias(T) + "$getHashCode2"](obj);
        }
    }; });

    Bridge.define("Granular.Compatibility.String", {
        statics: {
            fromByteArray: function (data) {
                return decodeURIComponent(escape(String.fromCharCode.apply(null, data)));
            }
        }
    });

    Bridge.define("Granular.Compatibility.TimeSpan", {
        statics: {
            timeSpanFormatRegex: null,
            TimeSpanFormatSignGroupIndex: 1,
            TimeSpanFormatDaysGroupIndex: 5,
            TimeSpanFormatHoursGroupIndex: 6,
            TimeSpanFormatMinutesGroupIndex: 7,
            TimeSpanFormatSecondsGroupIndex: 9,
            TimeSpanFormatMillisecondsGroupIndex: 11,
            TimeSpanFormatDaysAlternativeGroupIndex: 12,
            config: {
                init: function () {
                    this.minValue = System.TimeSpan.fromDays(-10000) || new System.TimeSpan();
                    this.maxValue = System.TimeSpan.fromDays(10000) || new System.TimeSpan();
                    this.timeSpanFormatRegex = new System.Text.RegularExpressions.Regex.ctor("(-?)(((([0-9]+)\\.)?([0-9]+):([0-9]+)(:([0-9]*)(\\.([0-9]+))?)?)|([0-9]+))");
                }
            },
            tryParse: function (s, result) {
                var days = { v : 0 };
                var hours = 0;
                var minutes = 0;
                var seconds = 0;
                var milliseconds = 0;

                var match = Granular.Compatibility.TimeSpan.timeSpanFormatRegex.match(s);

                if (!match.getSuccess()) {
                    result.v = System.TimeSpan.zero;
                    return false;
                }

                if (!System.Int32.tryParse(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatDaysAlternativeGroupIndex).getValue(), days)) {
                    days.v = System.Int32.parse(Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatDaysGroupIndex).getValue(), "0"));
                    hours = System.Int32.parse(Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatHoursGroupIndex).getValue(), "0"));
                    minutes = System.Int32.parse(Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatMinutesGroupIndex).getValue(), "0"));
                    seconds = System.Int32.parse(Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatSecondsGroupIndex).getValue(), "0"));
                    milliseconds = System.Int32.parse(System.String.alignString(Granular.Extensions.StringExtensions.defaultIfNullOrEmpty(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatMillisecondsGroupIndex).getValue(), "000"), -3, 48));
                }

                if (hours >= 24 || minutes >= 60 || seconds >= 60 || milliseconds >= 1000) {
                    result.v = System.TimeSpan.zero;
                    return false;
                }

                if (Bridge.referenceEquals(match.getGroups().get(Granular.Compatibility.TimeSpan.TimeSpanFormatSignGroupIndex).getValue(), "-")) {
                    days.v = (-days.v) | 0;
                    hours = (-hours) | 0;
                    minutes = (-minutes) | 0;
                    seconds = (-seconds) | 0;
                    milliseconds = (-milliseconds) | 0;
                }

                result.v = new System.TimeSpan(days.v, hours, minutes, seconds, milliseconds);
                return true;
            },
            subtract: function (value1, value2) {
                return Bridge.Date.subdd(value1, value2);
            }
        }
    });

    Bridge.define("Granular.Compatibility.Type", {
        statics: {
            getType: function (name) {
                if (Bridge.referenceEquals(name, "System.Double")) {
                    return System.Double;
                }

                if (Bridge.referenceEquals(name, "System.Int32")) {
                    return System.Int32;
                }

                if (Bridge.referenceEquals(name, "System.String")) {
                    return String;
                }

                return Bridge.Reflection.getType(name);
            },
            getTypeInterfaceGenericArguments: function (type, interfaceType) {
                var $arguments = Bridge.Reflection.getGenericArguments(interfaceType);

                if ($arguments != null) {
                    return $arguments;
                }

                if (Bridge.referenceEquals(interfaceType, System.Collections.Generic.ICollection$1)) {
                    return (System.Linq.Enumerable.from(Bridge.Reflection.getMembers(type, 8, 20)).where($asm.$.Granular.Compatibility.Type.f1).first().p || []);
                }

                if (Bridge.referenceEquals(interfaceType, System.Collections.Generic.IDictionary$2)) {
                    return (System.Linq.Enumerable.from(Bridge.Reflection.getMembers(type, 8, 20)).where($asm.$.Granular.Compatibility.Type.f2).first().p || []);
                }

                throw new Granular.Exception("Can't get generic arguments for type \"{0}\" interface \"{1}\"", [Bridge.Reflection.getTypeName(type), Bridge.Reflection.getTypeName(interfaceType)]);
            }
        }
    });

    Bridge.ns("Granular.Compatibility.Type", $asm.$);

    Bridge.apply($asm.$.Granular.Compatibility.Type, {
        f1: function (methodInfo) {
            return Bridge.referenceEquals(methodInfo.n, "Add") && (methodInfo.p || []).length === 1;
        },
        f2: function (methodInfo) {
            return Bridge.referenceEquals(methodInfo.n, "Add") && (methodInfo.p || []).length === 2;
        }
    });

    Bridge.define("Granular.Compatibility.Uri", {
        statics: {
            packUriScheme: "pack",
            registerPackUriParser: function () {
                //
            },
            createRelativeOrAbsoluteUri: function (relativeUriString) {
                return new System.Uri(relativeUriString);
            },
            createAbsoluteUri: function (absoluteUriString) {
                var uri = { };

                if (!Granular.Compatibility.Uri.tryCreateAbsoluteUri(absoluteUriString, uri)) {
                    throw new Granular.Exception("Can't create CreateAbsoluteUri from {0}", [absoluteUriString]);
                }

                return uri.v;
            },
            createAbsoluteUri$1: function (baseUri, relativeUriString) {
                var uri = { };

                if (!Granular.Compatibility.Uri.tryCreateAbsoluteUri$1(baseUri, relativeUriString, uri)) {
                    throw new Granular.Exception("Can't create CreateAbsoluteUri from {0} and {1}", [System.UriExtensions.getAbsolutePath(baseUri), relativeUriString]);
                }

                return uri.v;
            },
            createRelativeUri: function (relativeUriString) {
                return new System.Uri(relativeUriString);
            },
            tryCreateAbsoluteUri: function (absoluteUriString, uri) {
                uri.v = new System.Uri(absoluteUriString);
                var uriComponents = { };

                if (!Granular.Compatibility.Uri.tryGetUriComponents(uri.v, uriComponents)) {
                    uri.v = null;
                    return false;
                }

                return true;
            },
            tryCreateAbsoluteUri$1: function (baseUri, relativeUriString, uri) {
                var baseUriComponents = { };

                if (!Granular.Compatibility.Uri.tryGetUriComponents(baseUri, baseUriComponents)) {
                    uri.v = null;
                    return false;
                }

                var uriComponents = baseUriComponents.v.combine(relativeUriString);

                uri.v = new System.Uri(uriComponents.getAbsoluteUri());
                uri.v.UriComponents = uriComponents;

                return true;
            },
            getUriComponents: function (uri) {
                var uriComponents = { };
                if (!Granular.Compatibility.Uri.tryGetUriComponents(uri, uriComponents)) {
                    throw new System.InvalidOperationException("This operation is not supported for a relative URI.");
                }

                return uriComponents.v;
            },
            tryGetUriComponents: function (uri, uriComponents) {
                if (uri.hasOwnProperty("UriComponents")) {
                    uriComponents.v = Bridge.cast(uri.UriComponents, Granular.Compatibility.UriComponents);
                } else {
                    if (!Granular.Compatibility.UriComponents.tryParse(uri.getAbsoluteUri(), uriComponents)) {
                        uriComponents.v = null;
                    }

                    uri.UriComponents = uriComponents.v;
                }

                return uriComponents.v != null;
            }
        }
    });

    Bridge.define("Granular.Compatibility.UriComponents", {
        statics: {
            absoluteUriRegex: null,
            relativeUriRegex: null,
            rootedPathRegex: null,
            HttpDefaultPort: 80,
            HttpsDefaultPort: 443,
            config: {
                init: function () {
                    this.absoluteUriRegex = new System.Text.RegularExpressions.Regex.ctor("^(?<scheme>[^:]*):(//((?<userInfo>[^@]*)@)?(?<host>[^:/]*)(?<port>:[^/]*)?)?(?<path>/?[^\\?#]*)(?<query>\\?[^#]*)?((?<fragment>#.*))?$");
                    this.relativeUriRegex = new System.Text.RegularExpressions.Regex.ctor("^(?<path>/?[^\\?#]*)(?<query>\\?[^#]*)?((?<fragment>#.*))?$");
                    this.rootedPathRegex = new System.Text.RegularExpressions.Regex.ctor("^(?<root>[a-zA-Z]:/)[^/]");
                }
            },
            combineFilePath: function (path, relativePath) {
                if (Granular.Compatibility.UriComponents.rootedPathRegex.isMatch(relativePath)) {
                    return relativePath;
                }

                if (System.String.startsWith(relativePath, "/")) {
                    return System.String.concat(path.substr(0, ((System.String.indexOf(path, String.fromCharCode(58)) + 1) | 0)), relativePath);
                }

                return System.String.concat(path.substr(0, ((path.lastIndexOf(String.fromCharCode(47)) + 1) | 0)), relativePath);
            },
            combineUncPath: function (absolutePath, relativePath) {
                return System.String.startsWith(relativePath, "/") ? (System.String.concat(absolutePath, relativePath)) : (System.String.concat(absolutePath.substr(0, ((absolutePath.lastIndexOf(String.fromCharCode(47)) + 1) | 0)), relativePath));
            },
            tryParse: function (uriString, uriComponents) {
                uriString = System.String.replaceAll(uriString, String.fromCharCode(92), String.fromCharCode(47));

                if (Granular.Compatibility.UriComponents.rootedPathRegex.isMatch(uriString)) {
                    uriString = System.String.format("file:///{0}", uriString);
                }

                var absoluteUriMatch = Granular.Compatibility.UriComponents.absoluteUriRegex.match(uriString);
                if (!absoluteUriMatch.getSuccess()) {
                    uriComponents.v = null;
                    return false;
                }

                var scheme = absoluteUriMatch.getGroups().getByName("scheme").getValue();
                var userInfo = absoluteUriMatch.getGroups().getByName("userInfo").getValue();
                var path = absoluteUriMatch.getGroups().getByName("path").getValue();
                var query = absoluteUriMatch.getGroups().getByName("query").getValue();
                var fragment = absoluteUriMatch.getGroups().getByName("fragment").getValue();

                var host;
                var port = { };

                var hostGroupValue = absoluteUriMatch.getGroups().getByName("host").getValue();
                var portGroupValue = absoluteUriMatch.getGroups().getByName("port").getValue();

                if (Granular.Extensions.StringExtensions.isNullOrEmpty(portGroupValue)) {
                    host = hostGroupValue;
                    port.v = Granular.Compatibility.UriComponents.getDefaultPort(scheme);
                } else if (!System.Int32.tryParse(portGroupValue.substr(1), port)) {
                    host = System.String.concat(hostGroupValue, portGroupValue);
                    port.v = -1;
                } else {
                    host = hostGroupValue;
                }

                uriComponents.v = new Granular.Compatibility.UriComponents(scheme, userInfo, host, port.v, path, query, fragment);
                return true;
            },
            getDefaultPort: function (scheme) {
                if (System.String.equals(scheme, "http", 3)) {
                    return Granular.Compatibility.UriComponents.HttpDefaultPort;
                }

                if (System.String.equals(scheme, "https", 3)) {
                    return Granular.Compatibility.UriComponents.HttpsDefaultPort;
                }

                return -1;
            },
            getPathSegments: function (path) {
                var segments = path.split(String.fromCharCode(47));
                return System.Linq.Enumerable.from(segments).take(((segments.length - 1) | 0)).select($asm.$.Granular.Compatibility.UriComponents.f1).concat([System.Linq.Enumerable.from(segments).last()]).toArray();
            },
            getAbsoluteUri: function (scheme, userInfo, host, port, path, query, fragment) {
                var stringBuilder = new System.Text.StringBuilder();

                stringBuilder.append(scheme);
                stringBuilder.append("://");

                if (!Granular.Extensions.StringExtensions.isNullOrEmpty(userInfo)) {
                    stringBuilder.append(userInfo);
                    stringBuilder.append("@");
                }

                stringBuilder.append(host);

                if (port !== Granular.Compatibility.UriComponents.getDefaultPort(scheme)) {
                    stringBuilder.append(":");
                    stringBuilder.append(port);
                }

                stringBuilder.append(path);
                stringBuilder.append(query);
                stringBuilder.append(fragment);

                return stringBuilder.toString();
            }
        },
        config: {
            properties: {
                Scheme: null,
                AbsoluteUri: null,
                AbsolutePath: null,
                LocalPath: null,
                Segments: null,
                UserInfo: null,
                Host: null,
                Port: 0,
                Query: null,
                Fragment: null,
                IsDefaultPort: false,
                IsFile: false,
                IsUnc: false,
                IsLoopback: false,
                PathAndQuery: null
            }
        },
        ctor: function (scheme, userInfo, host, port, path, query, fragment) {
            this.$initialize();
            var isFile = System.String.equals(scheme, "file", 3);
            var isUnc = isFile && !Granular.Extensions.StringExtensions.isNullOrEmpty(host);
            var isLocalhost = System.String.equals(host, "localhost", 3);
            var absolutePath = isFile && !isUnc ? System.String.trimStart(path, [47]) : path;

            this.setScheme(scheme);
            this.setAbsolutePath(absolutePath);
            this.setUserInfo(userInfo);
            this.setHost(host);
            this.setPort(port);
            this.setQuery(query);
            this.setFragment(fragment);

            this.setIsFile(isFile);
            this.setIsUnc(isUnc);
            this.setIsLoopback(isFile && !isUnc || isLocalhost);
            this.setLocalPath(isUnc ? System.String.format("\\\\{0}{1}", host, System.String.replaceAll(absolutePath, String.fromCharCode(47), String.fromCharCode(92))) : isFile ? System.String.replaceAll(absolutePath, String.fromCharCode(47), String.fromCharCode(92)) : absolutePath);
            this.setIsDefaultPort(this.getPort() === Granular.Compatibility.UriComponents.getDefaultPort(scheme));
            this.setPathAndQuery(System.String.format("{0}{1}", absolutePath, query));
            this.setAbsoluteUri(Granular.Compatibility.UriComponents.getAbsoluteUri(scheme, userInfo, host, port, path, query, fragment));
            this.setSegments(Granular.Compatibility.UriComponents.getPathSegments(path));
        },
        combine: function (relativeUriString) {
            relativeUriString = System.String.replaceAll(relativeUriString, String.fromCharCode(92), String.fromCharCode(47));

            if (this.getIsUnc()) {
                return new Granular.Compatibility.UriComponents(this.getScheme(), this.getUserInfo(), this.getHost(), this.getPort(), Granular.Compatibility.UriComponents.combineUncPath(this.getAbsolutePath(), relativeUriString), this.getQuery(), this.getFragment());
            }

            if (this.getIsFile()) {
                return new Granular.Compatibility.UriComponents(this.getScheme(), this.getUserInfo(), this.getHost(), this.getPort(), System.String.concat("/", Granular.Compatibility.UriComponents.combineFilePath(this.getAbsolutePath(), relativeUriString)), this.getQuery(), this.getFragment());
            }

            var relativeUriMatch = Granular.Compatibility.UriComponents.relativeUriRegex.match(relativeUriString);

            var path = relativeUriMatch.getGroups().getByName("path").getValue();
            var query = relativeUriMatch.getGroups().getByName("query").getValue();
            var fragment = relativeUriMatch.getGroups().getByName("fragment").getValue();

            var combinedPath = System.String.startsWith(path, "/") ? path : (System.String.concat(this.getAbsolutePath().substr(0, ((this.getAbsolutePath().lastIndexOf(String.fromCharCode(47)) + 1) | 0)), path));

            return new Granular.Compatibility.UriComponents(this.getScheme(), this.getUserInfo(), this.getHost(), this.getPort(), combinedPath, query, fragment);
        }
    });

    Bridge.ns("Granular.Compatibility.UriComponents", $asm.$);

    Bridge.apply($asm.$.Granular.Compatibility.UriComponents, {
        f1: function (segment) {
            return System.String.format("{0}/", segment);
        }
    });

    Bridge.define("Granular.Diagnostics.HitCounter", {
        name: null,
        getAdditionalStatus: null,
        totalHitsCount: 0,
        lastHitsCount: 0,
        config: {
            init: function () {
                this.lastReportTime = new Date(-864e13);
            }
        },
        ctor: function (name, getAdditionalStatus) {
            if (getAdditionalStatus === void 0) { getAdditionalStatus = null; }

            this.$initialize();
            this.name = name;
            this.getAdditionalStatus = getAdditionalStatus;

            this.lastReportTime = new Date();
            Bridge.Console.log(System.String.format("{0} - HitCounter initialized", name));
        },
        hit: function () {
            this.totalHitsCount = (this.totalHitsCount + 1) | 0;

            var now = new Date();
            var interval = Granular.Compatibility.TimeSpan.subtract(now, this.lastReportTime);

            if (System.TimeSpan.gte(interval, System.TimeSpan.fromSeconds(1))) {
                var rate = Bridge.Math.round((((this.totalHitsCount - this.lastHitsCount) | 0)) / interval.getTotalSeconds(), 1, 6);
                var additionalStatus = !Bridge.staticEquals(this.getAdditionalStatus, null) ? this.getAdditionalStatus() : "";

                if (Granular.Extensions.StringExtensions.isNullOrEmpty(additionalStatus)) {
                    Bridge.Console.log(System.String.format("{0} - Total: {1} hits, Rate: {2} hits/sec", this.name, this.totalHitsCount, rate));
                } else {
                    Bridge.Console.log(System.String.format("{0} - Total: {1} hits, Rate: {2} hits/sec - {3}", this.name, this.totalHitsCount, rate, additionalStatus));
                }

                this.lastReportTime = now;
                this.lastHitsCount = this.totalHitsCount;
            }
        }
    });

    Bridge.define("Granular.Diagnostics.Profiler", {
        statics: {
            scopes: null,
            config: {
                init: function () {
                    this.scopes = new (System.Collections.Generic.Dictionary$2(String,Granular.Diagnostics.Profiler.ProfilingScope))();
                }
            },
            includeScope: function (scopeName) {
                return Granular.Diagnostics.Profiler.getInitializedScope(scopeName).include();
            },
            excludeScope: function (scopeName) {
                return Granular.Diagnostics.Profiler.getInitializedScope(scopeName).exclude();
            },
            getInitializedScope: function (scopeName) {
                var scope = { };
                if (!Granular.Diagnostics.Profiler.scopes.tryGetValue(scopeName, scope)) {
                    scope.v = new Granular.Diagnostics.Profiler.ProfilingScope(scopeName);
                    Granular.Diagnostics.Profiler.scopes.add(scopeName, scope.v);
                }

                return scope.v;
            }
        }
    });

    Bridge.define("Granular.Diagnostics.Profiler.ProfilingScope", {
        includeLevel: 0,
        isIncluding: false,
        name: null,
        config: {
            init: function () {
                this.totalInclusiveTime = new System.TimeSpan();
                this.totalExclusiveTime = new System.TimeSpan();
                this.exclusiveTime = new System.TimeSpan();
            }
        },
        ctor: function (name) {
            this.$initialize();
            this.name = name;

            this.totalInclusiveTime = System.TimeSpan.zero;
            this.totalExclusiveTime = System.TimeSpan.zero;
        },
        include: function () {
            if (this.includeLevel === 0) {
                this.exclusiveTime = System.TimeSpan.zero;
            }

            if (this.isIncluding) {
                return Granular.Disposable.empty;
            }

            this.includeLevel = (this.includeLevel + 1) | 0;
            this.isIncluding = true;

            var includeStartTime = new Date();

            return new Granular.Disposable(Bridge.fn.bind(this, function () {
                this.includeLevel = (this.includeLevel - 1) | 0;
                this.isIncluding = false;

                var includeTime = Bridge.Date.subdd(new Date(), includeStartTime);
                this.exclusiveTime = System.TimeSpan.add(this.exclusiveTime, includeTime);

                if (this.includeLevel === 0) {
                    this.totalExclusiveTime = System.TimeSpan.add(this.totalExclusiveTime, this.exclusiveTime);
                    this.totalInclusiveTime = System.TimeSpan.add(this.totalInclusiveTime, includeTime);

                    Bridge.Console.log(System.String.format("{0} - exclusive {1}ms (total {2}ms), inclusive {3}ms (total {4}ms)", this.name, Bridge.Int.clip64(this.exclusiveTime.getTotalMilliseconds()), Bridge.Int.clip64(this.totalExclusiveTime.getTotalMilliseconds()), Bridge.Int.clip64(includeTime.getTotalMilliseconds()), Bridge.Int.clip64(this.totalInclusiveTime.getTotalMilliseconds())));
                }
            }));
        },
        exclude: function () {
            if (!this.isIncluding) {
                return Granular.Disposable.empty;
            }

            this.isIncluding = false;

            var excludeStartTime = new Date();

            return new Granular.Disposable(Bridge.fn.bind(this, function () {
                this.isIncluding = true;

                var excludeTime = Bridge.Date.subdd(new Date(), excludeStartTime);

                this.exclusiveTime = System.TimeSpan.sub(this.exclusiveTime, excludeTime);
            }));
        }
    });

    Bridge.define("Granular.Disposable", {
        inherits: [System.IDisposable],
        statics: {
            empty: null,
            config: {
                init: function () {
                    this.empty = new Granular.Disposable.EmptyDisposable();
                }
            },
            combine: function (disposable1, disposable2) {
                return new Granular.Disposable(function () {
                    disposable1.System$IDisposable$dispose();
                    disposable2.System$IDisposable$dispose();
                });
            }
        },
        dispose$1: null,
        config: {
            alias: [
            "dispose", "System$IDisposable$dispose"
            ]
        },
        ctor: function (dispose) {
            this.$initialize();
            this.dispose$1 = dispose;
        },
        dispose: function () {
            this.dispose$1();
        }
    });

    Bridge.define("Granular.Disposable.EmptyDisposable", {
        inherits: [System.IDisposable],
        config: {
            alias: [
            "dispose", "System$IDisposable$dispose"
            ]
        },
        dispose: function () {
            //
        }
    });

    Bridge.define("Granular.Exception", {
        inherits: [System.Exception],
        ctor: function (format, args) {
            if (args === void 0) { args = []; }

            this.$initialize();
            System.Exception.ctor.call(this, System.String.format.apply(System.String, [format].concat(args)));
            //
        },
        toString: function () {
            return this.getMessage();
        }
    });

    Bridge.define("Granular.Extensions.AssemblyExtensions", {
        statics: {
            attributesCache: null,
            config: {
                init: function () {
                    this.attributesCache = new (System.Collections.Generic.Dictionary$2(String,System.Collections.Generic.IEnumerable$1(Object)))();
                }
            },
            getCustomAttributesCached: function (T, assembly) {
                var attributes = { };

                if (Granular.Extensions.AssemblyExtensions.attributesCache.tryGetValue(assembly.name, attributes)) {
                    return System.Linq.Enumerable.from(attributes.v).ofType(T);
                }

                attributes.v = assembly.getCustomAttributes(false) || System.Array.init(0, null);

                Granular.Extensions.AssemblyExtensions.attributesCache.add(assembly.name, attributes.v);
                return System.Linq.Enumerable.from(attributes.v).ofType(T);
            },
            firstOrDefaultCustomAttributeCached: function (T, assembly) {
                return System.Linq.Enumerable.from(Granular.Extensions.AssemblyExtensions.getCustomAttributesCached(T, assembly)).firstOrDefault(null, Bridge.getDefaultValue(T));
            }
        }
    });

    Bridge.define("Granular.Extensions.CollectionExtensions", {
        statics: {
            addRange: function (T, collection, items) {
                var $t;
                $t = Bridge.getEnumerator(items, T);
                while ($t.moveNext()) {
                    var item = $t.getCurrent();
                    System.Array.add(collection, item, T);
                }
            }
        }
    });

    Bridge.define("Granular.Extensions.DoubleExtensions", {
        statics: {
            Epsilon: 1E-10,
            isClose: function ($this, value) {
                // |a-b|/(|a|+|b|+1) < Epsilon
                return ($this === value) || Granular.Extensions.DoubleExtensions.isNaN($this) && Granular.Extensions.DoubleExtensions.isNaN(value) || Math.abs($this - value) < Granular.Extensions.DoubleExtensions.Epsilon * (Math.abs($this) + Math.abs(value) + 1);
            },
            isNaN: function ($this) {
                return isNaN($this);
            },
            defaultIfNaN: function ($this, defaultValue) {
                return isNaN($this) ? defaultValue : $this;
            },
            min: function ($this, value) {
                return $this < value ? $this : value;
            },
            max: function ($this, value) {
                return $this > value ? $this : value;
            },
            bounds: function ($this, minimum, maximum) {
                if (minimum > maximum) {
                    throw new Granular.Exception("Invalid bounds (minimum: {0}, maximum: {1})", [minimum, maximum]);
                }

                return Granular.Extensions.DoubleExtensions.min(Granular.Extensions.DoubleExtensions.max($this, minimum), maximum);
            },
            abs: function ($this) {
                return Math.abs($this);
            }
        }
    });

    Bridge.define("Granular.Extensions.EnumerableExtensions", {
        statics: {
            concatSingle: function (TSource, source, value) {
                return System.Linq.Enumerable.from(source).concat([value]);
            },
            trySelect: function (TSource, TResult, source, selector) {
                var $t;
                var $yield = [];
                $t = Bridge.getEnumerator(source, TSource);
                while ($t.moveNext()) {
                    var item = $t.getCurrent();
                    var result = { };
                    if (selector(item, result)) {
                        $yield.push(result.v);
                    }
                }
                return System.Array.toEnumerable($yield);
            }
        }
    });

    Bridge.define("Granular.Extensions.EventHandlerExtensions", {
        statics: {
            raise$2: function (handler, sender) {
                if (!Bridge.staticEquals(handler, null)) {
                    handler(sender, Object.empty);
                }
            },
            raise$3: function (handler, sender, e) {
                if (!Bridge.staticEquals(handler, null)) {
                    handler(sender, e);
                }
            },
            raise$4: function (T, handler, sender, e) {
                if (!Bridge.staticEquals(handler, null)) {
                    handler(sender, e);
                }
            },
            raise$1: function (handler, sender, propertyName) {
                Granular.Extensions.EventHandlerExtensions.raise(handler, sender, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            },
            raise: function (handler, sender, e) {
                if (!Bridge.staticEquals(handler, null)) {
                    handler(sender, e);
                }
            }
        }
    });

    Bridge.define("Granular.Extensions.IntExtensions", {
        statics: {
            min: function ($this, value) {
                return $this < value ? $this : value;
            },
            max: function ($this, value) {
                return $this > value ? $this : value;
            },
            bounds: function ($this, minimum, maximum) {
                if (minimum > maximum) {
                    throw new Granular.Exception("Invalid bounds (minimum: {0}, maximum: {1})", [minimum, maximum]);
                }

                return Granular.Extensions.IntExtensions.min(Granular.Extensions.IntExtensions.max($this, minimum), maximum);
            }
        }
    });

    Bridge.define("Granular.Extensions.ListExtensions", {
        statics: {
            insertRange: function (T, list, index, values) {
                var $t;
                $t = Bridge.getEnumerator(values, T);
                while ($t.moveNext()) {
                    var value = $t.getCurrent();
                    System.Array.insert(list, index, value, T);
                    index = (index + 1) | 0;
                }
            },
            removeRange: function (T, list, index, count) {
                for (var i = 0; i < count; i = (i + 1) | 0) {
                    System.Array.removeAt(list, index, T);
                }
            }
        }
    });

    Bridge.define("Granular.Extensions.StringExtensions", {
        statics: {
            isNullOrEmpty: function ($this) {
                return System.String.isNullOrEmpty($this);
            },
            isNullOrWhiteSpace: function ($this) {
                return System.String.isNullOrWhiteSpace($this);
            },
            defaultIfNullOrEmpty: function ($this, defaultValue) {
                var $t;
                if (defaultValue === void 0) { defaultValue = null; }
                return System.String.isNullOrEmpty($this) ? (($t = defaultValue, $t != null ? $t : "")) : $this;
            },
            getCharacterIndexFromLineIndex: function ($this, lineIndex) {
                var linesStartIndex = System.Linq.Enumerable.from(Bridge.cast([0], System.Collections.Generic.IEnumerable$1(System.Int32))).concat(System.Linq.Enumerable.from(Granular.Extensions.StringExtensions.indexOfAll($this, "\n")).select($asm.$.Granular.Extensions.StringExtensions.f1)).toArray();

                return lineIndex >= 0 && lineIndex < linesStartIndex.length ? linesStartIndex[lineIndex] : -1;
            },
            getLineIndexFromCharacterIndex: function ($this, charIndex) {
                var linesIndex = Granular.Extensions.StringExtensions.indexOfAll($this, "\n");
                var linesStartIndex = System.Linq.Enumerable.from(Bridge.cast([0], System.Collections.Generic.IEnumerable$1(System.Int32))).concat(System.Linq.Enumerable.from(linesIndex).select($asm.$.Granular.Extensions.StringExtensions.f1)).toArray();
                var linesEndIndex = System.Linq.Enumerable.from(Bridge.cast(linesIndex, System.Collections.Generic.IEnumerable$1(System.Int32))).concat([$this.length]).toArray();

                for (var i = 0; i < linesStartIndex.length; i = (i + 1) | 0) {
                    if (linesStartIndex[i] <= charIndex && charIndex <= linesEndIndex[i]) {
                        return i;
                    }
                }

                return -1;
            },
            getLineLength: function ($this, lineIndex) {
                var lines = Granular.Extensions.StringExtensions.getLines($this);
                return lineIndex >= 0 && lineIndex < lines.length ? lines[lineIndex].length : -1;
            },
            getLineText: function ($this, lineIndex) {
                var lines = Granular.Extensions.StringExtensions.getLines($this);
                return lineIndex >= 0 && lineIndex < lines.length ? lines[lineIndex] : "";
            },
            getLines: function ($this) {
                var linesIndex = Granular.Extensions.StringExtensions.indexOfAll($this, "\n");

                var linesStartIndex = System.Linq.Enumerable.from(Bridge.cast([0], System.Collections.Generic.IEnumerable$1(System.Int32))).concat(System.Linq.Enumerable.from(linesIndex).select($asm.$.Granular.Extensions.StringExtensions.f1));
                var linesEndIndex = System.Linq.Enumerable.from(Bridge.cast(linesIndex, System.Collections.Generic.IEnumerable$1(System.Int32))).concat([$this.length]).select(function(x) {{ return Bridge.cast(x, System.Int32); }});

                return System.Linq.Enumerable.from(linesStartIndex).zip(linesEndIndex, function (lineStartIndex, lineEndIndex) {
                        return System.String.trimEnd($this.substr(lineStartIndex, ((lineEndIndex - lineStartIndex) | 0)), [13]);
                    }).toArray();
            },
            indexOfAll: function ($this, allOf) {
                var list = new (System.Collections.Generic.List$1(System.Int32))();

                for (var i = 0; i < (($this.length - allOf.length) | 0); i = (i + 1) | 0) {
                    var match = true;

                    for (var j = 0; j < allOf.length; j = (j + 1) | 0) {
                        if ($this.charCodeAt(((i + j) | 0)) !== allOf.charCodeAt(j)) {
                            match = false;
                            break;
                        }
                    }

                    if (match) {
                        list.add(i);
                    }
                }

                return list.toArray();
            }
        }
    });

    Bridge.ns("Granular.Extensions.StringExtensions", $asm.$);

    Bridge.apply($asm.$.Granular.Extensions.StringExtensions, {
        f1: function (index) {
            return ((index + 1) | 0);
        }
    });

    Bridge.define("Granular.Extensions.TimeSpanExtensions", {
        statics: {
            scale: function (timeSpan, factor) {
                return System.TimeSpan.fromTicks(Bridge.Int.clip64(System.Int64.toNumber(timeSpan.getTicks()) * factor));
            },
            divide: function ($this, timeSpan) {
                return $this.getTicks() / System.Int64.toNumber(timeSpan.getTicks());
            },
            min: function ($this, timeSpan) {
                return System.TimeSpan.lt($this, timeSpan) ? $this : timeSpan;
            },
            max: function ($this, timeSpan) {
                return System.TimeSpan.gt($this, timeSpan) ? $this : timeSpan;
            }
        }
    });

    Bridge.define("Granular.Extensions.TypeExtensions", {
        statics: {
            getInstanceProperty: function (type, propertyName) {
                return Bridge.Reflection.getMembers(type, 16, 84 | 256, propertyName);
            },
            getDefaultIndexProperty: function (type) {
                return System.Linq.Enumerable.from(Bridge.Reflection.getMembers(type, 16, 28)).firstOrDefault($asm.$.Granular.Extensions.TypeExtensions.f1, null);
            },
            getInterfaceType: function (type, interfaceGenericType) {
                return System.Linq.Enumerable.from(Bridge.Reflection.getInterfaces(type)).firstOrDefault(function (interfaceType) {
                        return Bridge.referenceEquals(interfaceType, interfaceGenericType) || (interfaceType.$genericTypeDefinition !== undefined) && Bridge.referenceEquals(interfaceGenericType, Bridge.Reflection.getGenericTypeDefinition(interfaceType));
                    }, null);
            }
        }
    });

    Bridge.ns("Granular.Extensions.TypeExtensions", $asm.$);

    Bridge.apply($asm.$.Granular.Extensions.TypeExtensions, {
        f1: function (property) {
            return System.Linq.Enumerable.from((property.ipi || [])).any();
        }
    });

    Bridge.define("Granular.ReentrancyLock", {
        statics: {
            op_Implicit: function (ScopeEntrancyLock) {
                return ScopeEntrancyLock.getIsEntered();
            }
        },
        config: {
            properties: {
                IsEntered: false
            }
        },
        ctor: function () {
            this.$initialize();
            this.setIsEntered(false);
        },
        enter: function () {
            if (this.getIsEntered()) {
                throw new Granular.Exception("Can't enter the scope more than once");
            }

            this.setIsEntered(true);
            return new Granular.Disposable(Bridge.fn.bind(this, $asm.$.Granular.ReentrancyLock.f1));
        }
    });

    Bridge.ns("Granular.ReentrancyLock", $asm.$);

    Bridge.apply($asm.$.Granular.ReentrancyLock, {
        f1: function () {
            this.setIsEntered(false);
        }
    });

    Bridge.define("System.AssemblyExtensions", {
        statics: {
            getName: function (assembly) {
                return new System.AssemblyName(assembly.name);
            }
        }
    });

    Bridge.define("System.AssemblyName", {
        config: {
            properties: {
                Name: null
            }
        },
        ctor: function (name) {
            this.$initialize();
            this.setName(name);
        }
    });

    Bridge.define("System.Collections.Generic.DictionaryExtensions", {
        statics: {
            getKeys: function (TKey, TValue, dictionary) {
                return dictionary["System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getKeys"]();
            },
            getValues: function (TKey, TValue, dictionary) {
                return dictionary["System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getValues"]();
            }
        }
    });

    Bridge.define("System.Collections.Generic.HashSet$1", function (T) { return {
        inherits: [System.Collections.Generic.ICollection$1(T)],
        dictionary: null,
        config: {
            alias: [
            "getCount", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$getCount",
            "getIsReadOnly", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$getIsReadOnly",
            "contains", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$contains",
            "add", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$add",
            "remove", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$remove",
            "clear", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$clear",
            "getEnumerator", "System$Collections$Generic$IEnumerable$1$" + Bridge.getTypeAlias(T) + "$getEnumerator",
            "copyTo", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$copyTo"
            ]
        },
        ctor: function () {
            this.$initialize();
            this.dictionary = new (System.Collections.Generic.Dictionary$2(T,Object))();
        },
        getCount: function () {
            return this.dictionary.getCount();
        },
        getIsReadOnly: function () {
            return false;
        },
        contains: function (item) {
            return this.dictionary.containsKey(item);
        },
        add: function (item) {
            this.dictionary.set(item, null);
        },
        remove: function (item) {
            return this.dictionary.remove(item);
        },
        clear: function () {
            this.dictionary.clear();
        },
        getEnumerator: function () {
            return Bridge.getEnumerator(this.dictionary.getKeys(), T);
        },
        System$Collections$IEnumerable$getEnumerator: function () {
            return this.getEnumerator();
        },
        copyTo: function (array, arrayIndex) {
            //
        }
    }; });

    Bridge.define("System.Collections.Generic.SortedList$2", function (TKey, TValue) { return {
        inherits: [System.Collections.Generic.IDictionary$2(TKey,TValue)],
        statics: {
            defaultValue: null
        },
        keys: null,
        readOnlyKeys: null,
        values: null,
        readOnlyValues: null,
        comparer: null,
        config: {
            alias: [
            "System$Collections$Generic$IDictionary$2$TKey$TValue$getKeys", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getKeys",
            "System$Collections$Generic$IDictionary$2$TKey$TValue$getValues", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getValues",
            "getItem", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getItem",
            "setItem", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$setItem",
            "getCount", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getCount",
            "containsKey", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$containsKey",
            "add", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$add",
            "remove", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$remove",
            "tryGetValue", "System$Collections$Generic$IDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$tryGetValue",
            "getEnumerator", "System$Collections$Generic$IEnumerable$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getEnumerator"
            ]
        },
        ctor: function (comparer) {
            this.$initialize();
            this.comparer = comparer;

            this.keys = new (System.Collections.Generic.List$1(TKey))();
            this.readOnlyKeys = new (System.Collections.ObjectModel.ReadOnlyCollection$1(TKey))(this.keys);

            this.values = new (System.Collections.Generic.List$1(TValue))();
            this.readOnlyValues = new (System.Collections.ObjectModel.ReadOnlyCollection$1(TValue))(this.values);
        },
        System$Collections$Generic$IDictionary$2$TKey$TValue$getKeys: function () {
            return this.readOnlyKeys;
        },
        System$Collections$Generic$IDictionary$2$TKey$TValue$getValues: function () {
            return this.readOnlyValues;
        },
        getItem: function (key) {
            var index = { };
            if (!this.findItem$1(key, index)) {
                throw new Granular.Exception("Item with key \"{0}\" does not exist", [key]);
            }

            return this.values.getItem(index.v);
        },
        setItem: function (key, value) {
            var index = { };
            if (!this.findItem$1(key, index)) {
                this.keys.insert(index.v, key);
                this.values.insert(index.v, value);
            } else {
                this.keys.setItem(index.v, key);
                this.values.setItem(index.v, value);
            }
        },
        getCount: function () {
            return this.keys.getCount();
        },
        getIsReadOnly: function () {
            return false;
        },
        containsKey: function (key) {
            var index = { };
            return this.findItem$1(key, index);
        },
        add: function (key, value) {
            var index = { };
            if (this.findItem$1(key, index)) {
                throw new Granular.Exception("Item with key \"{0}\" already exists", [key]);
            }

            this.keys.insert(index.v, key);
            this.values.insert(index.v, value);
        },
        remove: function (key) {
            var index = { };
            if (!this.findItem$1(key, index)) {
                return false;
            }

            this.keys.removeAt(index.v);
            this.values.removeAt(index.v);
            return true;
        },
        removeAt: function (index) {
            if (index >= this.getCount()) {
                return false;
            }

            this.keys.removeAt(index);
            this.values.removeAt(index);
            return true;
        },
        tryGetValue: function (key, value) {
            var index = { };
            if (!this.findItem$1(key, index)) {
                value.v = System.Collections.Generic.SortedList$2(TKey,TValue).defaultValue;
                return false;
            }

            value.v = this.values.getItem(index.v);
            return true;
        },
        clear: function () {
            this.keys.clear();
            this.values.clear();
        },
        findItem$1: function (key, closestIndex) {
            return this.findItem(key, 0, ((this.keys.getCount() - 1) | 0), closestIndex);
        },
        findItem: function (key, firstIndex, lastIndex, closestIndex) {
            if (firstIndex > lastIndex) {
                closestIndex.v = firstIndex;
                return false;
            }

            var middleIndex = (Bridge.Int.div((((firstIndex + lastIndex) | 0)), 2)) | 0;
            var compareResult = this.comparer["System$Collections$Generic$IComparer$1$" + Bridge.getTypeAlias(TKey) + "$compare"](key, this.keys.getItem(middleIndex));

            if (compareResult < 0) {
                return this.findItem(key, firstIndex, ((middleIndex - 1) | 0), closestIndex);
            }

            if (compareResult > 0) {
                return this.findItem(key, ((middleIndex + 1) | 0), lastIndex, closestIndex);
            }

            closestIndex.v = middleIndex;
            return true;
        },
        getEnumerator: function () {
            return System.Linq.Enumerable.from(this.keys).zip(this.values, function (key, value) {
                    return new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(key, value);
                }).getEnumerator();
        },
        System$Collections$IEnumerable$getEnumerator: function () {
            return this.getEnumerator();
        }
    }; });

    Bridge.define("System.Diagnostics.DebuggerNonUserCodeAttribute", {
        inherits: [System.Attribute]
    });

    Bridge.define("System.Linq.EnumerableExtensions", {
        statics: {
            copyTo: function (T, source, array, arrayIndex) {
                var $t;
                var i = arrayIndex;
                $t = Bridge.getEnumerator(source, T);
                while ($t.moveNext()) {
                    var item = $t.getCurrent();
                    array[i] = item;
                    i = (i + 1) | 0;
                }
            }
        }
    });

    Bridge.define("System.Reflection.EventInfoExtensions", {
        statics: {
            getEventHandlerType: function (eventInfo) {
                return Function;
            }
        }
    });

    Bridge.define("System.Reflection.PropertyInfoExtensions", {
        statics: {
            getGetMethod: function (propertyInfo) {
                return propertyInfo.g;
            },
            getSetMethod: function (propertyInfo) {
                return propertyInfo.s;
            },
            isDelegate: function (propertyInfo) {
                return !System.String.endsWith(propertyInfo.n, "Type") && Bridge.Reflection.isAssignableFrom(Function, propertyInfo.rt);
            }
        }
    });

    Bridge.define("System.STAThreadAttribute", {
        inherits: [System.Attribute]
    });

    Bridge.define("System.TypeExtensions", {
        statics: {
            getIsAbstract: function (type) {
                return false;
            },
            getIsValueType: function (type) {
                return !Bridge.Reflection.isClass(type) && !Bridge.Reflection.isInterface(type);
            },
            getDefaultConstructor: function (type) {
                return System.Linq.Enumerable.from(Bridge.Reflection.getMembers(type, 1, 28)).firstOrDefault($asm.$.System.TypeExtensions.f1, null);
            },
            getTypeHandle: function (type) {
                return type;
            }
        }
    });

    Bridge.ns("System.TypeExtensions", $asm.$);

    Bridge.apply($asm.$.System.TypeExtensions, {
        f1: function (constructorInfo) {
            return Bridge.referenceEquals(constructorInfo.n, ".ctor") && (constructorInfo.p || []).length === 0;
        }
    });

    Bridge.define("System.UriExtensions", {
        statics: {
            resolveAbsoluteUri: function (uri, baseUri) {
                if (System.UriExtensions.getIsAbsoluteUri(uri)) {
                    return uri;
                }

                if (baseUri != null && System.UriExtensions.getIsAbsoluteUri(baseUri)) {
                    return Granular.Compatibility.Uri.createAbsoluteUri$1(baseUri, System.UriExtensions.getOriginalString(uri));
                }

                if (baseUri == null) {
                    throw new Granular.Exception("Can't resolve absolute uri for \"{0}\", base uri is null", [System.UriExtensions.getOriginalString(uri)]);
                }

                throw new Granular.Exception("Can't resolve absolute uri for \"{0}\", base uri \"{1}\" is not an absolute Uri", [System.UriExtensions.getOriginalString(uri), System.UriExtensions.getOriginalString(baseUri)]);
            },
            getOriginalString: function (uri) {
                return uri.getAbsoluteUri();
            },
            getIsAbsoluteUri: function (uri) {
                var uriComponents = { };
                return Granular.Compatibility.Uri.tryGetUriComponents(uri, uriComponents);
            },
            getScheme: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getScheme();
            },
            getAbsoluteUri: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getAbsoluteUri();
            },
            getAbsolutePath: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getAbsolutePath();
            },
            getLocalPath: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getLocalPath();
            },
            getSegments: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getSegments();
            },
            getUserInfo: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getUserInfo();
            },
            getHost: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getHost();
            },
            getPort: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getPort();
            },
            getQuery: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getQuery();
            },
            getFragment: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getFragment();
            },
            getIsDefaultPort: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getIsDefaultPort();
            },
            getIsFile: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getIsFile();
            },
            getIsUnc: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getIsUnc();
            },
            getIsLoopback: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getIsLoopback();
            },
            getPathAndQuery: function (uri) {
                return Granular.Compatibility.Uri.getUriComponents(uri).getPathAndQuery();
            }
        }
    });

    Bridge.define("System.Windows.Input.ICommand", {
        $kind: "interface"
    });

    Bridge.define("System.Windows.Markup.ITokenDefinition", {
        $kind: "interface"
    });

    Bridge.define("System.Windows.Markup.Lexer", {
        statics: {
            whiteSpaceRegex: null,
            config: {
                init: function () {
                    this.whiteSpaceRegex = new System.Text.RegularExpressions.Regex.ctor("[ \t]+");
                }
            }
        },
        tokensDefinition: null,
        ctor: function (tokensDefinition) {
            if (tokensDefinition === void 0) { tokensDefinition = []; }

            this.$initialize();
            this.tokensDefinition = tokensDefinition;
        },
        getTokens: function (stream) {
            var $t;
            var $yield = [];
            var start = 0;

            while (start < stream.length) {
                var match = System.Windows.Markup.Lexer.whiteSpaceRegex.match(stream.substr(start));

                if (match.getSuccess() && match.getGroups().get(0).getIndex() === 0) {
                    start = (start + match.getGroups().get(0).getLength()) | 0;
                }

                var selectedToken = null;

                $t = Bridge.getEnumerator(this.tokensDefinition, System.Windows.Markup.ITokenDefinition);
                while ($t.moveNext()) {
                    var tokenDefinition = $t.getCurrent();
                    var matchedToken = tokenDefinition.System$Windows$Markup$ITokenDefinition$match(stream, start);
                    if (matchedToken != null && (selectedToken == null || matchedToken.getValue().length > selectedToken.getValue().length)) {
                        selectedToken = matchedToken;
                    }
                }

                if (selectedToken == null) {
                    throw new Granular.Exception("Can't parse \"{0}\" at index {1} ('{2}' is unexpected)", [stream, start, String.fromCharCode(stream.charCodeAt(start))]);
                }

                start = (start + selectedToken.getValue().length) | 0;

                $yield.push(selectedToken);
            }
            return System.Array.toEnumerable($yield);
        }
    });

    Bridge.define("System.Windows.Markup.MarkupCompatibility", {
        statics: {
            NamespaceName: "http://schemas.openxmlformats.org/markup-compatibility/2006",
            ignorableDirective: null,
            config: {
                init: function () {
                    this.ignorableDirective = new System.Windows.Markup.XamlName("Ignorable", System.Windows.Markup.MarkupCompatibility.NamespaceName);
                }
            },
            isDirective: function (namespaceName, localName) {
                return Bridge.referenceEquals(namespaceName, System.Windows.Markup.MarkupCompatibility.ignorableDirective.getNamespaceName()) && Bridge.referenceEquals(localName, System.Windows.Markup.MarkupCompatibility.ignorableDirective.getLocalName());
            }
        }
    });

    Bridge.define("System.Windows.Markup.MarkupExtensionParser", {
        statics: {
            lexer: null,
            config: {
                init: function () {
                    this.lexer = new System.Windows.Markup.Lexer([new System.Windows.Markup.RegexTokenDefinition(System.Windows.Markup.MarkupExtensionParser.TokenType.Terminal, new System.Text.RegularExpressions.Regex.ctor("[{}=,]")), new System.Windows.Markup.RegexTokenDefinition(System.Windows.Markup.MarkupExtensionParser.TokenType.Boolean, new System.Text.RegularExpressions.Regex.ctor("true|True|false|False")), new System.Windows.Markup.RegexTokenDefinition(System.Windows.Markup.MarkupExtensionParser.TokenType.String, new System.Text.RegularExpressions.Regex.ctor("'([^']|'')*'")), new System.Windows.Markup.RegexTokenDefinition(System.Windows.Markup.MarkupExtensionParser.TokenType.Integer, new System.Text.RegularExpressions.Regex.ctor("[0-9]+")), new System.Windows.Markup.RegexTokenDefinition(System.Windows.Markup.MarkupExtensionParser.TokenType.Decimal, new System.Text.RegularExpressions.Regex.ctor("[0-9]*\\.[0-9]+")), new System.Windows.Markup.RegexTokenDefinition(System.Windows.Markup.MarkupExtensionParser.TokenType.Identifier, new System.Text.RegularExpressions.Regex.ctor("[A-Za-z0-9_:\\(\\)\\.]*"))]);
                }
            },
            booleanParse: function (value) {
                value = value.toLowerCase();
                if (System.String.compare(value, "true") === 0 || System.String.compare(value, "false") === 0) {
                    return System.String.compare(value, "true") === 0;
                }

                throw new Granular.Exception("Can't parse boolean value \"{0}\"", [value]);
            },
            parse: function (text, namespaces, sourceUri) {
                if (sourceUri === void 0) { sourceUri = null; }
                if (System.Windows.Markup.MarkupExtensionParser.isEscaped(text)) {
                    return System.Windows.Markup.MarkupExtensionParser.getEscapedText(text);
                }

                if (System.Windows.Markup.MarkupExtensionParser.isMarkupExtension(text)) {
                    return new System.Windows.Markup.MarkupExtensionParser(text, namespaces, sourceUri).parse();
                }

                return text;
            },
            isMarkupExtension: function (text) {
                text = text.trim();
                return System.String.startsWith(text, "{") && System.String.endsWith(text, "}");
            },
            isEscaped: function (text) {
                return System.String.startsWith(text, "{}");
            },
            getEscapedText: function (text) {
                return text.substr(2);
            }
        },
        text: null,
        namespaces: null,
        sourceUri: null,
        tokens: null,
        ctor: function (text, namespaces, sourceUri) {
            this.$initialize();
            this.text = text;
            this.namespaces = namespaces;
            this.sourceUri = sourceUri;
        },
        parse: function () {
            this.tokens = new (Granular.Collections.ReadOnlyStack$1(System.Windows.Markup.Token))(System.Windows.Markup.MarkupExtensionParser.lexer.getTokens(this.text));

            var root = this.matchElement();

            if (!this.tokens.getIsEmpty()) {
                throw new Granular.Exception("Can't parse \"{0}\", end of stream is expected at index {1}", [this.text, this.tokens.peek().getStart()]);
            }

            return root;
        },
        matchElement: function () {
            this.verifyTokensExists();

            this.matchTerminal("{");
            var typeFullName = this.matchIdentifier();
            var membersList = this.matchMembersList();
            this.matchTerminal("}");

            return new System.Windows.Markup.XamlElement(new System.Windows.Markup.XamlName(this.getTypeName(typeFullName), this.getTypeNamespace(typeFullName)), this.namespaces, this.sourceUri, membersList, void 0, void 0);
        },
        matchMembersList: function () {
            this.verifyTokensExists();

            var list = new (System.Collections.Generic.List$1(System.Windows.Markup.XamlMember))();

            if (!Bridge.referenceEquals(this.tokens.peek().getValue(), "}")) {
                list.add(this.matchMember());
                list.addRange(this.matchMembersListEnd());
            }

            return list;
        },
        matchMembersListEnd: function () {
            this.verifyTokensExists();

            var list = new (System.Collections.Generic.List$1(System.Windows.Markup.XamlMember))();

            if (!Bridge.referenceEquals(this.tokens.peek().getValue(), "}")) {
                this.matchTerminal(",");

                list.add(this.matchMember());
                list.addRange(this.matchMembersListEnd());
            }

            return list;
        },
        matchMember: function () {
            this.verifyTokensExists();

            var name = "";
            var value;

            if (System.Nullable.getValue(Bridge.cast(this.tokens.peek().getId(), System.Int32)) === System.Windows.Markup.MarkupExtensionParser.TokenType.Identifier) {
                var identifier = this.matchIdentifier();
                value = this.matchNamedValue();

                if (value == null) {
                    value = identifier;
                } else {
                    name = identifier;
                }
            } else {
                value = this.matchValue();
            }

            return new System.Windows.Markup.XamlMember.$ctor1(new System.Windows.Markup.XamlName(name), this.namespaces, this.sourceUri, value);
        },
        matchNamedValue: function () {
            this.verifyTokensExists();

            var token = this.tokens.peek();
            if (System.Nullable.getValue(Bridge.cast(token.getId(), System.Int32)) !== System.Windows.Markup.MarkupExtensionParser.TokenType.Terminal || !Bridge.referenceEquals(token.getValue(), "=")) {
                return null;
            }

            this.matchTerminal("=");

            return this.matchValue();
        },
        matchValue: function () {
            this.verifyTokensExists();

            if (System.Nullable.getValue(Bridge.cast(this.tokens.peek().getId(), System.Int32)) === System.Windows.Markup.MarkupExtensionParser.TokenType.Terminal) {
                return this.matchElement();
            }

            var token = this.tokens.pop();
            var constValue;

            switch (System.Nullable.getValue(Bridge.cast(token.getId(), System.Int32))) {
                case System.Windows.Markup.MarkupExtensionParser.TokenType.Identifier: 
                    constValue = token.getValue();
                    break;
                case System.Windows.Markup.MarkupExtensionParser.TokenType.String: 
                    constValue = System.String.replaceAll(token.getValue().substr(1, ((token.getValue().length - 2) | 0)), "''", "'");
                    break;
                case System.Windows.Markup.MarkupExtensionParser.TokenType.Boolean: 
                    constValue = System.Windows.Markup.MarkupExtensionParser.booleanParse(token.getValue());
                    break;
                case System.Windows.Markup.MarkupExtensionParser.TokenType.Integer: 
                    constValue = System.Int32.parse(token.getValue());
                    break;
                case System.Windows.Markup.MarkupExtensionParser.TokenType.Decimal: 
                    constValue = System.Double.parse(token.getValue());
                    break;
                default: 
                    throw new Granular.Exception("Can't parse \"{0}\", value is expected, \"{1}\" was found at index {2}", [this.text, token.getValue(), token.getStart()]);
            }

            return constValue;
        },
        matchIdentifier: function () {
            this.verifyTokensExists();

            var token = this.tokens.pop();

            if (System.Nullable.getValue(Bridge.cast(token.getId(), System.Int32)) !== System.Windows.Markup.MarkupExtensionParser.TokenType.Identifier) {
                throw new Granular.Exception("Can't parse \"{0}\", identifier is expected, \"{1}\" was found at index {2}", [this.text, token.getValue(), token.getStart()]);
            }

            return token.getValue();
        },
        matchTerminal: function (terminal) {
            this.verifyTokensExists();

            var token = this.tokens.pop();

            if (System.Nullable.getValue(Bridge.cast(token.getId(), System.Int32)) !== System.Windows.Markup.MarkupExtensionParser.TokenType.Terminal || !Bridge.referenceEquals(token.getValue(), terminal)) {
                throw new Granular.Exception("Can't parse \"{0}\", \"{1}\" is expected, \"{2}\" was found at index {3}", [this.text, terminal, token.getValue(), token.getStart()]);
            }

            return token;
        },
        verifyTokensExists: function () {
            if (this.tokens.getIsEmpty()) {
                throw new Granular.Exception("Can't parse \"{0}\", stream was terminated unexpectedly", [this.text]);
            }
        },
        getTypeName: function (typeFullName) {
            var namespaceSeparatorIndex = System.String.indexOf(typeFullName, ":");
            return namespaceSeparatorIndex !== -1 ? typeFullName.substr(((namespaceSeparatorIndex + 1) | 0)) : typeFullName;
        },
        getTypeNamespace: function (typeFullName) {
            var namespaceSeparatorIndex = System.String.indexOf(typeFullName, ":");
            return this.namespaces.getNamespace(namespaceSeparatorIndex !== -1 ? typeFullName.substr(0, namespaceSeparatorIndex) : "");
        }
    });

    Bridge.define("System.Windows.Markup.MarkupExtensionParser.TokenType", {
        $kind: "enum",
        statics: {
            Terminal: 0,
            Identifier: 1,
            String: 2,
            Boolean: 3,
            Integer: 4,
            Decimal: 5
        }
    });

    Bridge.define("System.Windows.Markup.NamespaceDeclaration", {
        config: {
            properties: {
                Prefix: null,
                Namespace: null
            }
        },
        ctor: function ($namespace) {
            System.Windows.Markup.NamespaceDeclaration.$ctor1.call(this, "", $namespace);
            //
        },
        $ctor1: function (prefix, $namespace) {
            this.$initialize();
            this.setPrefix(prefix);
            this.setNamespace($namespace);
        },
        equals: function (obj) {
            var other = Bridge.as(obj, System.Windows.Markup.NamespaceDeclaration);

            return Bridge.referenceEquals(this, other) || !Bridge.referenceEquals(other, null) && Bridge.referenceEquals(this.getPrefix(), other.getPrefix()) && Bridge.referenceEquals(this.getNamespace(), other.getNamespace());
        },
        getHashCode: function () {
            return Bridge.getHashCode(this.getPrefix()) ^ Bridge.getHashCode(this.getPrefix());
        }
    });

    Bridge.define("System.Windows.Markup.Token", {
        config: {
            properties: {
                Id: null,
                Value: null,
                Start: 0
            }
        },
        ctor: function (id, value, start) {
            this.$initialize();
            this.setId(id);
            this.setValue(value);
            this.setStart(start);
        },
        toString: function () {
            return System.String.format("{0} \"{1}\" ({2})", this.getId(), this.getValue(), this.getStart());
        }
    });

    Bridge.define("System.Windows.Markup.XamlNode", {
        config: {
            properties: {
                Name: null,
                Namespaces: null,
                SourceUri: null
            }
        },
        ctor: function (name, namespaces, sourceUri) {
            this.$initialize();
            this.setName(name);
            this.setNamespaces(namespaces);
            this.setSourceUri(sourceUri);
        },
        toString: function () {
            return this.getName().toString();
        }
    });

    Bridge.define("System.Windows.Markup.XamlLanguage", {
        statics: {
            NamespaceName: "http://schemas.microsoft.com/winfx/2006/xaml",
            classDirective: null,
            nameDirective: null,
            keyDirective: null,
            sharedDirective: null,
            directives: null,
            nullTypeName: null,
            typeTypeName: null,
            xamlTypes: null,
            config: {
                init: function () {
                    this.classDirective = new System.Windows.Markup.XamlName("Class", System.Windows.Markup.XamlLanguage.NamespaceName);
                    this.nameDirective = new System.Windows.Markup.XamlName("Name", System.Windows.Markup.XamlLanguage.NamespaceName);
                    this.keyDirective = new System.Windows.Markup.XamlName("Key", System.Windows.Markup.XamlLanguage.NamespaceName);
                    this.sharedDirective = new System.Windows.Markup.XamlName("Shared", System.Windows.Markup.XamlLanguage.NamespaceName);
                    this.directives = [System.Windows.Markup.XamlLanguage.classDirective, System.Windows.Markup.XamlLanguage.nameDirective, System.Windows.Markup.XamlLanguage.keyDirective, System.Windows.Markup.XamlLanguage.sharedDirective];
                    this.nullTypeName = new System.Windows.Markup.XamlName("Null", System.Windows.Markup.XamlLanguage.NamespaceName);
                    this.typeTypeName = new System.Windows.Markup.XamlName("Type", System.Windows.Markup.XamlLanguage.NamespaceName);
                    this.xamlTypes = [System.Windows.Markup.XamlLanguage.nullTypeName, System.Windows.Markup.XamlLanguage.typeTypeName];
                }
            },
            isDirective: function (namespaceName, localName) {
                return Bridge.referenceEquals(namespaceName, System.Windows.Markup.XamlLanguage.NamespaceName) && System.Linq.Enumerable.from(System.Windows.Markup.XamlLanguage.directives).contains(new System.Windows.Markup.XamlName(localName, namespaceName));
            },
            isXamlType: function (name) {
                return System.Linq.Enumerable.from(System.Windows.Markup.XamlLanguage.xamlTypes).contains(name);
            }
        }
    });

    Bridge.define("System.Windows.Markup.XamlMemberExtensions", {
        statics: {
            getSingleValue: function (member) {
                if (!System.Linq.Enumerable.from(member.getValues()).any()) {
                    throw new Granular.Exception("Member \"{0}\" doesn't have values", [member.getName()]);
                }

                if (System.Linq.Enumerable.from(member.getValues()).count() > 1) {
                    throw new Granular.Exception("Member \"{0}\" cannot have multiple values", [member.getName()]);
                }

                return System.Linq.Enumerable.from(member.getValues()).first();
            }
        }
    });

    Bridge.define("System.Windows.Markup.XamlName", {
        statics: {
            empty: null,
            config: {
                init: function () {
                    this.empty = new System.Windows.Markup.XamlName("");
                }
            },
            fromPrefixedName: function (prefixedName, namespaces) {
                var typeName = prefixedName;
                var typeNamespacePrefix = "";

                var namespaceSeparatorIndex = System.String.indexOf(prefixedName, ":");
                if (namespaceSeparatorIndex !== -1) {
                    typeNamespacePrefix = prefixedName.substr(0, namespaceSeparatorIndex);
                    typeName = prefixedName.substr(((namespaceSeparatorIndex + 1) | 0));
                }

                return namespaces.containsPrefix(typeNamespacePrefix) ? new System.Windows.Markup.XamlName(typeName, namespaces.getNamespace(typeNamespacePrefix)) : System.Windows.Markup.XamlName.empty;
            },
            op_Equality: function (name1, name2) {
                return Bridge.equals(name1, name2);
            },
            op_Inequality: function (name1, name2) {
                return !(System.Windows.Markup.XamlName.op_Equality(name1, name2));
            }
        },
        config: {
            properties: {
                LocalName: null,
                NamespaceName: null,
                IsMemberName: false,
                MemberName: null,
                ContainingTypeName: null
            }
        },
        ctor: function (localName, namespaceName) {
            if (namespaceName === void 0) { namespaceName = null; }

            this.$initialize();            var $t, $t1;

            this.setLocalName(($t = localName, $t != null ? $t : ""));
            this.setNamespaceName(($t1 = namespaceName, $t1 != null ? $t1 : ""));

            var typeSeparatorIndex = System.String.indexOf(this.getLocalName(), String.fromCharCode(46));

            if (typeSeparatorIndex !== -1) {
                this.setMemberName(this.getLocalName().substr(((typeSeparatorIndex + 1) | 0)));
                this.setContainingTypeName(new System.Windows.Markup.XamlName(this.getLocalName().substr(0, typeSeparatorIndex), this.getNamespaceName()));

                this.setIsMemberName(true);
            } else {
                this.setMemberName(this.getLocalName());
            }
    },
    getIsEmpty: function () {
        return Granular.Extensions.StringExtensions.isNullOrEmpty(this.getLocalName());
    },
    toString: function () {
        return Granular.Extensions.StringExtensions.isNullOrEmpty(this.getNamespaceName()) ? this.getLocalName() : System.String.format("{0}:{1}", this.getNamespaceName(), this.getLocalName());
    },
    getHashCode: function () {
        return Bridge.getHashCode(this.getLocalName()) ^ Bridge.getHashCode(this.getNamespaceName());
    },
    equals: function (obj) {
        var other = Bridge.as(obj, System.Windows.Markup.XamlName);

        return Bridge.referenceEquals(this, other) || !Bridge.referenceEquals(other, null) && Bridge.referenceEquals(this.getLocalName(), other.getLocalName()) && Bridge.referenceEquals(this.getNamespaceName(), other.getNamespaceName());
    }
    });

    Bridge.define("System.Windows.Markup.XamlNamespaces", {
        statics: {
            empty: null,
            config: {
                init: function () {
                    this.empty = new System.Windows.Markup.XamlNamespaces.ctor(System.Array.init(0, null));
                }
            }
        },
        items: null,
        $ctor1: function ($namespace) {
            System.Windows.Markup.XamlNamespaces.ctor.call(this, [new System.Windows.Markup.NamespaceDeclaration.ctor($namespace)]);
            //
        },
        $ctor2: function (prefix, $namespace) {
            System.Windows.Markup.XamlNamespaces.ctor.call(this, [new System.Windows.Markup.NamespaceDeclaration.$ctor1(prefix, $namespace)]);
            //
        },
        ctor: function (items) {
            this.$initialize();
            this.items = items;
        },
        toString: function () {
            var count = System.Linq.Enumerable.from(this.items).count();
            return count === 0 ? "XamlNamespaces.Empty" : System.String.format("XamlNamespaces[{0}]", count);
        },
        containsPrefix: function (prefix) {
            return System.Linq.Enumerable.from(this.items).any(function (item) {
                    return Bridge.referenceEquals(item.getPrefix(), prefix);
                });
        },
        containsNamespace: function ($namespace) {
            return System.Linq.Enumerable.from(this.items).any(function (item) {
                    return Bridge.referenceEquals(item.getNamespace(), $namespace);
                });
        },
        getNamespace: function (prefix) {
            return this.getNamespaceDeclaration(prefix).getNamespace();
        },
        getNamespaceDeclaration: function (prefix) {
            var namespaceDeclaration = System.Linq.Enumerable.from(this.items).firstOrDefault(function (item) {
                    return Bridge.referenceEquals(item.getPrefix(), prefix);
                }, null);

            if (namespaceDeclaration == null) {
                throw new Granular.Exception("Namespaces doesn't contain a namespace with prefix \"{0}\"", [prefix]);
            }

            return namespaceDeclaration;
        },
        merge: function (namespaceDeclarations) {
            return System.Linq.Enumerable.from(namespaceDeclarations).any() ? new System.Windows.Markup.XamlNamespaces.ctor(System.Linq.Enumerable.from(this.items).concat(namespaceDeclarations).distinct().toArray()) : this;
        }
    });

    Bridge.define("System.Windows.Markup.XamlNamespacesExtensions", {
        statics: {
            containsDefaultNamespace: function ($this) {
                return $this.containsPrefix("");
            },
            getDefaultNamespace: function ($this) {
                return $this.getNamespace("");
            }
        }
    });

    Bridge.define("System.Windows.Markup.XamlParser", {
        statics: {
            parse: function (content, sourceUri) {
                if (sourceUri === void 0) { sourceUri = null; }
                return System.Windows.Markup.XamlParser.parse$1(System.Xml.Linq.XDocument.parse(content).getRoot(), sourceUri);
            },
            parse$1: function (element, sourceUri) {
                if (sourceUri === void 0) { sourceUri = null; }
                var namespaces = new System.Windows.Markup.XamlNamespaces.ctor(System.Windows.Markup.XamlParser.getNamespaces(element));
                var ignorableNamespaces = new System.Windows.Markup.XamlNamespaces.ctor(System.Windows.Markup.XamlParser.getIgnorableNamespaces(element, namespaces));

                return System.Windows.Markup.XamlParser.createXamlElement(element, namespaces, ignorableNamespaces, sourceUri);
            },
            createXamlElement: function (element, namespaces, ignorableNamespaces, sourceUri) {
                return new System.Windows.Markup.XamlElement(new System.Windows.Markup.XamlName(element.getName().getLocalName(), element.getName().getNamespaceName()), namespaces, sourceUri, System.Windows.Markup.XamlParser.createXamlMembers(element, namespaces, ignorableNamespaces, sourceUri), System.Windows.Markup.XamlParser.createValues(element, namespaces, ignorableNamespaces, sourceUri), System.Windows.Markup.XamlParser.createDirectives(element, namespaces, ignorableNamespaces, sourceUri));
            },
            createXamlMembers: function (element, namespaces, ignorableNamespaces, sourceUri) {
                var $t;
                var members = new (System.Collections.Generic.List$1(System.Windows.Markup.XamlMember))(System.Linq.Enumerable.from(element.attributes()).where(function (attribute) {
                        return !System.Windows.Markup.XamlParser.isDirective(attribute.getName()) && !attribute.getIsNamespaceDeclaration() && !System.Windows.Markup.XamlParser.isIgnorableAttribute(attribute) && !System.Windows.Markup.XamlParser.isIgnorable(attribute.getName(), ignorableNamespaces);
                    }).select(function (attribute) {
                    return System.Windows.Markup.XamlParser.createXamlMember(attribute, namespaces, ignorableNamespaces, sourceUri);
                }));

                $t = Bridge.getEnumerator(element.elements(), System.Xml.Linq.XElement);
                while ($t.moveNext()) {
                    var memberElement = $t.getCurrent();
                    if (!System.Windows.Markup.XamlParser.isMemberName(memberElement.getName())) {
                        continue;
                    }

                    var memberNamespaces = namespaces.merge(System.Windows.Markup.XamlParser.getNamespaces(memberElement));
                    var memberIgnorableNamespaces = ignorableNamespaces.merge(System.Windows.Markup.XamlParser.getIgnorableNamespaces(memberElement, memberNamespaces));

                    if (System.Windows.Markup.XamlParser.isIgnorable(memberElement.getName(), memberIgnorableNamespaces)) {
                        continue;
                    }

                    members.add(System.Windows.Markup.XamlParser.createXamlMember$1(memberElement, memberNamespaces, memberIgnorableNamespaces, sourceUri));
                }

                return members;
            },
            createXamlMember: function (attribute, namespaces, ignorableNamespaces, sourceUri) {
                var name = new System.Windows.Markup.XamlName(attribute.getName().getLocalName(), Granular.Extensions.StringExtensions.isNullOrEmpty(attribute.getName().getNamespaceName()) ? System.Windows.Markup.XamlNamespacesExtensions.getDefaultNamespace(namespaces) : attribute.getName().getNamespaceName());
                var value = System.Windows.Markup.MarkupExtensionParser.parse(attribute.getValue(), namespaces, sourceUri);

                return new System.Windows.Markup.XamlMember.$ctor1(name, namespaces, sourceUri, value);
            },
            createXamlMember$1: function (element, namespaces, ignorableNamespaces, sourceUri) {
                var name = new System.Windows.Markup.XamlName(element.getName().getLocalName(), Granular.Extensions.StringExtensions.isNullOrEmpty(element.getName().getNamespaceName()) ? System.Windows.Markup.XamlNamespacesExtensions.getDefaultNamespace(namespaces) : element.getName().getNamespaceName());

                if (System.Linq.Enumerable.from(element.attributes()).any(function (attribute) {
                        return !System.Windows.Markup.XamlParser.isIgnorable(attribute.getName(), ignorableNamespaces);
                    })) {
                    throw new Granular.Exception("Member \"{0}\" cannot contain attributes", [element.getName()]);
                }

                if (System.Linq.Enumerable.from(element.elements()).any(function (child) {
                        return !System.Windows.Markup.XamlParser.isIgnorable(child.getName(), ignorableNamespaces) && System.Windows.Markup.XamlParser.isMemberName(child.getName());
                    })) {
                    throw new Granular.Exception("Member \"{0}\" cannot contain member elements", [element.getName()]);
                }

                return new System.Windows.Markup.XamlMember.ctor(name, namespaces, sourceUri, System.Windows.Markup.XamlParser.createValues(element, namespaces, ignorableNamespaces, sourceUri));
            },
            createDirectives: function (element, namespaces, ignorableNamespaces, sourceUri) {
                var attributeDirectives = System.Linq.Enumerable.from(element.attributes()).where($asm.$.System.Windows.Markup.XamlParser.f1).select(function (attribute) {
                    return System.Windows.Markup.XamlParser.createXamlMember(attribute, namespaces, ignorableNamespaces, sourceUri);
                });
                var elementDirectives = System.Linq.Enumerable.from(element.elements()).where($asm.$.System.Windows.Markup.XamlParser.f2).select(function (child) {
                    return System.Windows.Markup.XamlParser.createXamlMember$1(child, namespaces, ignorableNamespaces, sourceUri);
                });

                return System.Linq.Enumerable.from(attributeDirectives).concat(elementDirectives).toArray();
            },
            createValues: function (element, namespaces, ignorableNamespaces, sourceUri) {
                var $t;
                var values = new (System.Collections.Generic.List$1(Object))();

                $t = Bridge.getEnumerator(element.nodes(), System.Xml.Linq.XNode);
                while ($t.moveNext()) {
                    var value = $t.getCurrent();
                    var valueText = Bridge.as(value, System.Xml.Linq.XText);
                    if (valueText != null) {
                        values.add(valueText.getValue().trim());
                    }

                    var valueElement = Bridge.as(value, System.Xml.Linq.XElement);
                    if (valueElement != null) {
                        if (!System.Windows.Markup.XamlParser.isValueName(valueElement.getName())) {
                            continue;
                        }

                        var valueNamespaces = namespaces.merge(System.Windows.Markup.XamlParser.getNamespaces(valueElement));
                        var valueIgnorableNamespaces = ignorableNamespaces.merge(System.Windows.Markup.XamlParser.getIgnorableNamespaces(valueElement, valueNamespaces));

                        if (System.Windows.Markup.XamlParser.isIgnorable(valueElement.getName(), valueIgnorableNamespaces)) {
                            continue;
                        }

                        values.add(System.Windows.Markup.XamlParser.createXamlElement(valueElement, valueNamespaces, valueIgnorableNamespaces, sourceUri));
                    }
                }

                return values;
            },
            isMemberName: function (name) {
                return System.Linq.Enumerable.from(name.getLocalName()).contains(46) && !System.Windows.Markup.XamlParser.isDirective(name);
            },
            isValueName: function (name) {
                return !System.Linq.Enumerable.from(name.getLocalName()).contains(46) && !System.Windows.Markup.XamlParser.isDirective(name);
            },
            isDirective: function (name) {
                return System.Windows.Markup.XamlLanguage.isDirective(name.getNamespaceName(), name.getLocalName());
            },
            isIgnorable: function (name, ignorableNamespaces) {
                return ignorableNamespaces.containsNamespace(name.getNamespaceName());
            },
            isIgnorableAttribute: function (attribute) {
                return Bridge.referenceEquals(attribute.getName().getNamespaceName(), System.Windows.Markup.MarkupCompatibility.ignorableDirective.getNamespaceName()) && Bridge.referenceEquals(attribute.getName().getLocalName(), System.Windows.Markup.MarkupCompatibility.ignorableDirective.getLocalName());
            },
            getNamespaces: function (element) {
                return System.Linq.Enumerable.from(element.attributes()).where($asm.$.System.Windows.Markup.XamlParser.f3).select($asm.$.System.Windows.Markup.XamlParser.f4).toArray();
            },
            getIgnorableNamespaces: function (element, namespaces) {
                return System.Linq.Enumerable.from(element.attributes()).where(System.Windows.Markup.XamlParser.isIgnorableAttribute).selectMany($asm.$.System.Windows.Markup.XamlParser.f5).select(function (prefix) {
                    return namespaces.getNamespaceDeclaration(prefix);
                }).toArray();
            },
            getNamespaceDeclarationPrefix: function (attribute) {
                return Granular.Extensions.StringExtensions.isNullOrEmpty(attribute.getName().getNamespaceName()) ? "" : attribute.getName().getLocalName();
            }
        }
    });

    Bridge.ns("System.Windows.Markup.XamlParser", $asm.$);

    Bridge.apply($asm.$.System.Windows.Markup.XamlParser, {
        f1: function (attribute) {
            return System.Windows.Markup.XamlParser.isDirective(attribute.getName());
        },
        f2: function (child) {
            return System.Windows.Markup.XamlParser.isDirective(child.getName());
        },
        f3: function (attribute) {
            return attribute.getIsNamespaceDeclaration();
        },
        f4: function (attribute) {
            return new System.Windows.Markup.NamespaceDeclaration.$ctor1(System.Windows.Markup.XamlParser.getNamespaceDeclarationPrefix(attribute), attribute.getValue());
        },
        f5: function (attribute) {
            return attribute.getValue().split(String.fromCharCode(32));
        }
    });

    Bridge.define("System.Xml.Linq.NodeExtensions", {
        statics: {
            getLocalName: function (node) {
                return node.nodeName.substr(((System.String.indexOf(node.nodeName, String.fromCharCode(58)) + 1) | 0));
            }
        }
    });

    Bridge.define("System.Xml.Linq.XAttribute", {
        node: null,
        config: {
            properties: {
                Name: null,
                Value: null,
                IsNamespaceDeclaration: false
            }
        },
        ctor: function (node) {
            this.$initialize();
            this.node = node;

            var nodeName = node.nodeName;

            if (Bridge.referenceEquals(nodeName, "xmlns")) {
                this.setName(System.Xml.Linq.XName.get("", node.namespaceURI));
                this.setIsNamespaceDeclaration(true);
            } else {
                this.setName(System.Xml.Linq.XName.get(System.Xml.Linq.NodeExtensions.getLocalName(node), node.namespaceURI));
                this.setIsNamespaceDeclaration(System.String.startsWith(nodeName, "xmlns:"));
            }

            this.setValue(node.nodeValue);
        }
    });

    Bridge.define("System.Xml.Linq.XNode");

    Bridge.define("System.Xml.Linq.XName", {
        statics: {
            get: function (localName, namespaceName) {
                return new System.Xml.Linq.XName(localName, namespaceName);
            }
        },
        config: {
            properties: {
                LocalName: null,
                NamespaceName: null
            }
        },
        ctor: function (localName, namespaceName) {
            this.$initialize();
            this.setLocalName(localName);
            this.setNamespaceName(namespaceName);
        },
        toString: function () {
            return System.String.isNullOrEmpty(this.getNamespaceName()) ? this.getLocalName() : System.String.format("{{{0}}}{1}", this.getNamespaceName(), this.getLocalName());
        }
    });

    Bridge.define("System.Xml.Linq.XNodeFactory", {
        statics: {
            tryCreateNode: function (node, result) {
                if (node.nodeType === 1) {
                    result.v = new System.Xml.Linq.XElement(Bridge.cast(node, Element));
                    return true;
                }

                if (node.nodeType === 3 && !Granular.Extensions.StringExtensions.isNullOrWhiteSpace(node.nodeValue)) {
                    result.v = new System.Xml.Linq.XText(node);
                    return true;
                }

                result.v = null;
                return false;
            }
        }
    });

    Bridge.definei("Granular.Collections.IObservableCollection$1", function (T) { return {
        inherits: [System.Collections.Generic.IEnumerable$1(T),Granular.Collections.INotifyCollectionChanged],
        $kind: "interface"
    }; });

    Bridge.define("Granular.Collections.ListDictionary$2", function (TKey, TValue) { return {
        inherits: [Granular.Collections.IListDictionary$2(TKey,TValue)],
        dictionary: null,
        config: {
            alias: [
            "Granular$Collections$IListDictionary$2$TKey$TValue$getKeys", "Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getKeys",
            "Granular$Collections$IListDictionary$2$TKey$TValue$getValues", "Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getValues",
            "add", "Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$add",
            "remove", "Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$remove",
            "getValues", "Granular$Collections$IListDictionary$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getValues$1",
            "getEnumerator", "System$Collections$Generic$IEnumerable$1$System$Collections$Generic$KeyValuePair$2$" + Bridge.getTypeAlias(TKey) + "$" + Bridge.getTypeAlias(TValue) + "$getEnumerator"
            ]
        },
        ctor: function () {
            this.$initialize();
            this.dictionary = new (System.Collections.Generic.Dictionary$2(TKey,System.Collections.Generic.List$1(TValue)))();
        },
        Granular$Collections$IListDictionary$2$TKey$TValue$getKeys: function () {
            return this.dictionary.getKeys();
        },
        Granular$Collections$IListDictionary$2$TKey$TValue$getValues: function () {
            return System.Linq.Enumerable.from(this.dictionary).selectMany($asm.$.Granular.Collections.ListDictionary$2.f1);
        },
        add: function (key, value) {
            var list = { };

            if (!this.dictionary.tryGetValue(key, list)) {
                list.v = new (System.Collections.Generic.List$1(TValue))();
                this.dictionary.add(key, list.v);
            }

            list.v.add(value);
        },
        remove: function (key, value) {
            var list = { };

            if (!this.dictionary.tryGetValue(key, list)) {
                return false;
            }

            if (!list.v.remove(value)) {
                return false;
            }

            if (list.v.getCount() === 0) {
                this.dictionary.remove(key);
            }

            return true;
        },
        getValues: function (key) {
            return this.dictionary.containsKey(key) ? Bridge.cast(this.dictionary.get(key), System.Collections.Generic.IEnumerable$1(TValue)) : System.Array.init(0, function (){
                return Bridge.getDefaultValue(TValue);
            });
        },
        getEnumerator: function () {
            return System.Linq.Enumerable.from(this.dictionary).selectMany(function (pair) {
                    return System.Linq.Enumerable.from(pair.value).select(function (value) {
                            return new (System.Collections.Generic.KeyValuePair$2(TKey,TValue))(pair.key, value);
                        });
                }).getEnumerator();
        },
        System$Collections$IEnumerable$getEnumerator: function () {
            return this.getEnumerator();
        }
    }; });

    Bridge.ns("Granular.Collections.ListDictionary$2", $asm.$);

    Bridge.apply($asm.$.Granular.Collections.ListDictionary$2, {
        f1: function (pair) {
            return pair.value;
        }
    });

    Bridge.define("System.Windows.Markup.RegexTokenDefinition", {
        inherits: [System.Windows.Markup.ITokenDefinition],
        id: null,
        regex: null,
        config: {
            alias: [
            "match", "System$Windows$Markup$ITokenDefinition$match"
            ]
        },
        ctor: function (id, regex) {
            this.$initialize();
            this.id = id;
            this.regex = regex;
        },
        match: function (stream, start) {
            var match = this.regex.match(stream.substr(start));

            if (match.getSuccess() && match.getIndex() === 0) {
                return new System.Windows.Markup.Token(this.id, match.getGroups().get(0).getValue(), start);
            }

            return null;
        }
    });

    Bridge.define("System.Windows.Markup.XamlElement", {
        inherits: [System.Windows.Markup.XamlNode],
        statics: {
            emptyMembers: null,
            emptyValues: null,
            emptyDirectives: null,
            config: {
                init: function () {
                    this.emptyMembers = System.Array.init(0, null);
                    this.emptyValues = System.Array.init(0, null);
                    this.emptyDirectives = System.Array.init(0, null);
                }
            }
        },
        config: {
            properties: {
                Members: null,
                Values: null,
                Directives: null
            }
        },
        ctor: function (name, namespaces, sourceUri, members, values, directives) {
            if (members === void 0) { members = null; }
            if (values === void 0) { values = null; }
            if (directives === void 0) { directives = null; }

            this.$initialize();
            System.Windows.Markup.XamlNode.ctor.call(this, name, namespaces, sourceUri);
            this.setMembers(members || System.Windows.Markup.XamlElement.emptyMembers);
            this.setValues(values || System.Windows.Markup.XamlElement.emptyValues);
            this.setDirectives(directives || System.Windows.Markup.XamlElement.emptyDirectives);
        }
    });

    Bridge.define("System.Windows.Markup.XamlMember", {
        inherits: [System.Windows.Markup.XamlNode],
        statics: {
            emptyValues: null,
            config: {
                init: function () {
                    this.emptyValues = System.Array.init(0, null);
                }
            }
        },
        config: {
            properties: {
                Values: null
            }
        },
        $ctor1: function (name, namespaces, sourceUri, value) {
            System.Windows.Markup.XamlMember.ctor.call(this, name, namespaces, sourceUri, [value]);
            //
        },
        ctor: function (name, namespaces, sourceUri, values) {
            this.$initialize();
            System.Windows.Markup.XamlNode.ctor.call(this, name, namespaces, sourceUri);
            this.setValues(values || System.Windows.Markup.XamlMember.emptyValues);
        },
        toString: function () {
            return System.Linq.Enumerable.from(this.getValues()).count() === 1 ? System.String.format("{0}={1}", System.Windows.Markup.XamlNode.prototype.toString.call(this), System.Linq.Enumerable.from(this.getValues()).first().toString()) : System.Windows.Markup.XamlNode.prototype.toString.call(this);
        }
    });

    Bridge.define("System.Xml.Linq.XContainer", {
        inherits: [System.Xml.Linq.XNode],
        node: null,
        nodes$1: null,
        elements$1: null,
        ctor: function (node) {
            this.$initialize();
            System.Xml.Linq.XNode.ctor.call(this);
            this.node = node;
            this.nodes$1 = System.Linq.Enumerable.from(Granular.Extensions.EnumerableExtensions.trySelect(Node, System.Xml.Linq.XNode, node.childNodes, System.Xml.Linq.XNodeFactory.tryCreateNode)).toArray();
            this.elements$1 = System.Linq.Enumerable.from(this.nodes$1).ofType(System.Xml.Linq.XElement).toArray();
        },
        nodes: function () {
            return this.nodes$1;
        },
        elements: function () {
            return this.elements$1;
        }
    });

    Bridge.define("System.Xml.Linq.XText", {
        inherits: [System.Xml.Linq.XNode],
        node: null,
        config: {
            properties: {
                Value: null
            }
        },
        ctor: function (node) {
            this.$initialize();
            System.Xml.Linq.XNode.ctor.call(this);
            this.node = node;
            this.setValue(node.nodeValue);
        }
    });

    Bridge.define("Granular.Collections.ICollectionView", {
        inherits: [Granular.Collections.IObservableCollection$1(Object)],
        $kind: "interface"
    });

    Bridge.define("Granular.Collections.ObservableCollection$1", function (T) { return {
        inherits: [Granular.Collections.IObservableCollection$1(T),System.Collections.Generic.IList$1(T),System.ComponentModel.INotifyPropertyChanged],
        statics: {
            countPropertyChangedEventArgs: null,
            config: {
                init: function () {
                    this.countPropertyChangedEventArgs = new System.ComponentModel.PropertyChangedEventArgs("Count");
                }
            }
        },
        items: null,
        config: {
            events: {
                CollectionChanged: null,
                PropertyChanged: null
            },
            alias: [
            "addCollectionChanged", "Granular$Collections$INotifyCollectionChanged$addCollectionChanged",
            "removeCollectionChanged", "Granular$Collections$INotifyCollectionChanged$removeCollectionChanged",
            "addPropertyChanged", "System$ComponentModel$INotifyPropertyChanged$addPropertyChanged",
            "removePropertyChanged", "System$ComponentModel$INotifyPropertyChanged$removePropertyChanged",
            "getCount", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$getCount",
            "getItem", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$getItem",
            "setItem", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$setItem",
            "getIsReadOnly", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$getIsReadOnly",
            "add", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$add",
            "clear", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$clear",
            "contains", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$contains",
            "indexOf", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$indexOf",
            "insert", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$insert",
            "remove", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$remove",
            "removeAt", "System$Collections$Generic$IList$1$" + Bridge.getTypeAlias(T) + "$removeAt",
            "copyTo", "System$Collections$Generic$ICollection$1$" + Bridge.getTypeAlias(T) + "$copyTo",
            "getEnumerator", "System$Collections$Generic$IEnumerable$1$" + Bridge.getTypeAlias(T) + "$getEnumerator"
            ]
        },
        ctor: function () {
            Granular.Collections.ObservableCollection$1(T).$ctor2.call(this, new (System.Collections.Generic.List$1(T))());
            //
        },
        $ctor1: function (collection) {
            Granular.Collections.ObservableCollection$1(T).$ctor2.call(this, new (System.Collections.Generic.List$1(T))(collection));
            //
        },
        $ctor3: function (capacity) {
            Granular.Collections.ObservableCollection$1(T).$ctor2.call(this, new (System.Collections.Generic.List$1(T))(capacity));
            //
        },
        $ctor2: function (items) {
            this.$initialize();
            this.items = items;
        },
        getCount: function () {
            return this.items.getCount();
        },
        getItem: function (index) {
            return this.items.getItem(index);
        },
        setItem: function (index, value) {
            if (Granular.Compatibility.EqualityComparer$1(T).default.equals2(this.items.getItem(index), value)) {
                return;
            }

            var oldItem = this.items.getItem(index);
            this.items.setItem(index, value);
            Granular.Collections.NotifyCollectionChangedEventHandlerExtensions.raise(this.CollectionChanged, this, Granular.Collections.NotifyCollectionChangedEventArgs.replace(oldItem, this.items.getItem(index), index));
        },
        getIsReadOnly: function () {
            return false;
        },
        add: function (item) {
            this.items.add(item);
            Granular.Collections.NotifyCollectionChangedEventHandlerExtensions.raise(this.CollectionChanged, this, Granular.Collections.NotifyCollectionChangedEventArgs.add(item, ((this.getCount() - 1) | 0)));
            Granular.Extensions.EventHandlerExtensions.raise(this.PropertyChanged, this, Granular.Collections.ObservableCollection$1(T).countPropertyChangedEventArgs);
        },
        clear: function () {
            var e = Granular.Collections.NotifyCollectionChangedEventArgs.removeRange(System.Linq.Enumerable.from(this.items).select(function(x) { return Bridge.cast(x, Object); }).toArray(), 0);
            this.items.clear();
            Granular.Collections.NotifyCollectionChangedEventHandlerExtensions.raise(this.CollectionChanged, this, e);
            Granular.Extensions.EventHandlerExtensions.raise(this.PropertyChanged, this, Granular.Collections.ObservableCollection$1(T).countPropertyChangedEventArgs);
        },
        contains: function (item) {
            return this.items.contains(item);
        },
        indexOf: function (item) {
            return this.items.indexOf(item);
        },
        insert: function (index, item) {
            this.items.insert(index, item);
            Granular.Collections.NotifyCollectionChangedEventHandlerExtensions.raise(this.CollectionChanged, this, Granular.Collections.NotifyCollectionChangedEventArgs.add(item, index));
            Granular.Extensions.EventHandlerExtensions.raise(this.PropertyChanged, this, Granular.Collections.ObservableCollection$1(T).countPropertyChangedEventArgs);
        },
        remove: function (item) {
            var index = this.items.indexOf(item);

            if (index === -1) {
                return false;
            }

            this.removeAt(index);
            return true;
        },
        removeAt: function (index) {
            var e = Granular.Collections.NotifyCollectionChangedEventArgs.remove(this.items.getItem(index), index);
            this.items.removeAt(index);
            Granular.Collections.NotifyCollectionChangedEventHandlerExtensions.raise(this.CollectionChanged, this, e);
            Granular.Extensions.EventHandlerExtensions.raise(this.PropertyChanged, this, Granular.Collections.ObservableCollection$1(T).countPropertyChangedEventArgs);
        },
        copyTo: function (array, arrayIndex) {
            this.items.copyTo(array, arrayIndex);
        },
        getEnumerator: function () {
            return this.items.getEnumerator();
        },
        System$Collections$IEnumerable$getEnumerator: function () {
            return this.getEnumerator();
        }
    }; });

    Bridge.define("System.Xml.Linq.XDocument", {
        inherits: [System.Xml.Linq.XContainer],
        statics: {
            parse: function (text) {
                var parser = new DOMParser();
                return new System.Xml.Linq.XDocument(parser.parseFromString(text, "application/xml"));
            }
        },
        node$1: null,
        config: {
            properties: {
                Root: null
            }
        },
        ctor: function (node) {
            this.$initialize();
            System.Xml.Linq.XContainer.ctor.call(this, node);
            this.node$1 = node;
            this.setRoot(new System.Xml.Linq.XElement(Bridge.cast(System.Linq.Enumerable.from(node.childNodes).single(), Element)));
        }
    });

    Bridge.define("System.Xml.Linq.XElement", {
        inherits: [System.Xml.Linq.XContainer],
        element: null,
        attributes$1: null,
        config: {
            properties: {
                Name: null
            }
        },
        ctor: function (element) {
            this.$initialize();
            System.Xml.Linq.XContainer.ctor.call(this, element);
            this.element = element;
            this.setName(System.Xml.Linq.XName.get(System.Xml.Linq.NodeExtensions.getLocalName(element), element.namespaceURI));
            this.attributes$1 = System.Linq.Enumerable.from(element.attributes).select($asm.$.System.Xml.Linq.XElement.f1);
        },
        attributes: function () {
            return this.attributes$1;
        }
    });

    Bridge.ns("System.Xml.Linq.XElement", $asm.$);

    Bridge.apply($asm.$.System.Xml.Linq.XElement, {
        f1: function (node) {
            return new System.Xml.Linq.XAttribute(node);
        }
    });

    var $m = Bridge.setMetadata,
        $n = [System,Granular.Collections,Granular.Compatibility,Granular.Extensions];
    $m($n[1].NotifyCollectionChangedEventHandlerExtensions, function () { return {"at":[new System.Diagnostics.DebuggerNonUserCodeAttribute()]}; });
    $m($n[2].AssemblyReferenceAttribute, function () { return {"am":true}; });
    $m($n[3].EventHandlerExtensions, function () { return {"at":[new System.Diagnostics.DebuggerNonUserCodeAttribute()]}; });
    $m($n[1].ObservableCollection$1, function (T) { return {"m":[{"a":2,"n":"Count","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Count","t":8,"sn":"getCount","rt":$n[0].Int32}},{"a":2,"n":"Item","t":16,"rt":T,"p":[$n[0].Int32],"i":true,"ipi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"g":{"a":2,"n":"get_Item","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"getItem","rt":T,"p":[$n[0].Int32]},"s":{"a":2,"n":"set_Item","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0},{"n":"value","pt":T,"ps":1}],"sn":"setItem","rt":Object,"p":[$n[0].Int32,T]}}]}; });
});
