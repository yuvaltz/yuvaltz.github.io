(function() {
	'use strict';
	var $asm = {};
	global.Granular = global.Granular || {};
	global.Granular.Collections = global.Granular.Collections || {};
	global.Granular.Compatibility = global.Granular.Compatibility || {};
	global.Granular.Diagnostics = global.Granular.Diagnostics || {};
	global.Granular.Extensions = global.Granular.Extensions || {};
	global.System = global.System || {};
	global.System.Collections = global.System.Collections || {};
	global.System.Collections.Generic = global.System.Collections.Generic || {};
	global.System.ComponentModel = global.System.ComponentModel || {};
	global.System.Diagnostics = global.System.Diagnostics || {};
	global.System.Linq = global.System.Linq || {};
	global.System.Reflection = global.System.Reflection || {};
	global.System.Text = global.System.Text || {};
	global.System.Text.RegularExpressions = global.System.Text.RegularExpressions || {};
	global.System.Xaml = global.System.Xaml || {};
	ss.initAssembly($asm, 'Granular.Common');
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Exception
	var $Granular_Exception = function(format, args) {
		ss.Exception.call(this, ss.formatString.apply(null, [format].concat(args)));
		//
	};
	$Granular_Exception.__typeName = 'Granular.Exception';
	global.Granular.Exception = $Granular_Exception;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.PriorityQueue.IndexedKey
	var $Granular_$Collections_PriorityQueue$2$IndexedKey = function(TKey, TValue) {
		var $type = function(key, index) {
			this.$1$KeyField = ss.getDefaultValue(TKey);
			this.$1$IndexField = 0;
			this.set_$Key(key);
			this.set_$Index(index);
		};
		ss.registerGenericClassInstance($type, $Granular_$Collections_PriorityQueue$2$IndexedKey, [TKey, TValue], {
			get_$Key: function() {
				return this.$1$KeyField;
			},
			set_$Key: function(value) {
				this.$1$KeyField = value;
			},
			get_$Index: function() {
				return this.$1$IndexField;
			},
			set_$Index: function(value) {
				this.$1$IndexField = value;
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [TKey, ss.Int32] }, { name: 'Index', type: 16, returnType: ss.Int32, getter: { name: 'get_Index', type: 8, sname: 'get_$Index', returnType: ss.Int32, params: [] }, setter: { name: 'set_Index', type: 8, sname: 'set_$Index', returnType: Object, params: [ss.Int32] } }, { name: 'Key', type: 16, returnType: TKey, getter: { name: 'get_Key', type: 8, sname: 'get_$Key', returnType: TKey, params: [] }, setter: { name: 'set_Key', type: 8, sname: 'set_$Key', returnType: Object, params: [TKey] } }] });
		return $type;
	};
	$Granular_$Collections_PriorityQueue$2$IndexedKey.__typeName = 'Granular.$Collections.PriorityQueue$2$IndexedKey';
	ss.initGenericClass($Granular_$Collections_PriorityQueue$2$IndexedKey, $asm, 2);
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.PriorityQueue.IndexedKeyComparer
	var $Granular_$Collections_PriorityQueue$2$IndexedKeyComparer = function(TKey, TValue) {
		var $type = function(comparer) {
			this.$comparer = null;
			this.$comparer = comparer;
		};
		ss.registerGenericClassInstance($type, $Granular_$Collections_PriorityQueue$2$IndexedKeyComparer, [TKey, TValue], {
			compare: function(x, y) {
				var result = this.$comparer.compare(x.get_$Key(), y.get_$Key());
				return ((result !== 0) ? result : ss.Comparer.def.compare(x.get_$Index(), y.get_$Index()));
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IComparer];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [ss.IComparer] }, { name: 'Compare', type: 8, sname: 'compare', returnType: ss.Int32, params: [ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [TKey, TValue]), ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [TKey, TValue])] }] });
		return $type;
	};
	$Granular_$Collections_PriorityQueue$2$IndexedKeyComparer.__typeName = 'Granular.$Collections.PriorityQueue$2$IndexedKeyComparer';
	ss.initGenericClass($Granular_$Collections_PriorityQueue$2$IndexedKeyComparer, $asm, 2);
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Comparer.CompatibleComparer
	var $Granular_$Compatibility_Comparer$1$CompatibleComparer = function(T) {
		var $type = function(comparer) {
			this.$comparer = null;
			this.$comparer = comparer;
		};
		ss.registerGenericClassInstance($type, $Granular_$Compatibility_Comparer$1$CompatibleComparer, [T], {
			compare: function(x, y) {
				return this.$comparer.compare(x, y);
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IComparer];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [ss.Comparer] }, { name: 'Compare', type: 8, sname: 'compare', returnType: ss.Int32, params: [T, T] }] });
		return $type;
	};
	$Granular_$Compatibility_Comparer$1$CompatibleComparer.__typeName = 'Granular.$Compatibility.Comparer$1$CompatibleComparer';
	ss.initGenericClass($Granular_$Compatibility_Comparer$1$CompatibleComparer, $asm, 1);
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.CacheDictionary
	var $Granular_Collections_CacheDictionary$2 = function(TKey, TValue) {
		var $type = function(resolveValue) {
			$type.$ctor2.call(this, null, resolveValue);
			//
		};
		$type.$ctor1 = function(tryResolveValue) {
			$type.$ctor2.call(this, tryResolveValue, null);
			//
		};
		$type.$ctor2 = function(tryResolveValue, resolveValue) {
			this.$tryResolveValue = null;
			this.$resolveValue = null;
			this.$dictionary = null;
			this.$unsetValues = null;
			this.$tryResolveValue = tryResolveValue;
			this.$resolveValue = resolveValue;
			this.$dictionary = new (ss.makeGenericType(ss.Dictionary$2, [TKey, TValue]))();
			this.$unsetValues = new (ss.makeGenericType($System_Collections_Generic_HashSet$1, [TKey]))();
		};
		ss.registerGenericClassInstance($type, $Granular_Collections_CacheDictionary$2, [TKey, TValue], {
			GetValue: function(key) {
				var value = {};
				if (this.TryGetValue(key, value)) {
					return value.$;
				}
				throw new $Granular_Exception('Key "{0}" was not found', [key]);
			},
			TryGetValue: function(key, value) {
				if (this.$dictionary.tryGetValue(key, value)) {
					return true;
				}
				if (this.$unsetValues.contains(key)) {
					value.$ = $type.$DefaultValue;
					return false;
				}
				if (!ss.staticEquals(this.$tryResolveValue, null) && this.$tryResolveValue(key, value)) {
					this.$dictionary.add(key, value.$);
					return true;
				}
				if (!ss.staticEquals(this.$resolveValue, null)) {
					value.$ = this.$resolveValue(key);
					this.$dictionary.add(key, value.$);
					return true;
				}
				this.$unsetValues.add(key);
				value.$ = $type.$DefaultValue;
				return false;
			},
			Contains: function(key) {
				return this.$dictionary.containsKey(key) || this.$unsetValues.contains(key);
			},
			Remove: function(key) {
				this.$dictionary.remove(key);
				this.$unsetValues.remove(key);
			},
			Clear: function() {
				this.$dictionary.clear();
				this.$unsetValues.clear();
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		$type.$ctor1.prototype = $type.$ctor2.prototype = $type.prototype;
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [Function] }, { name: '.ctor', type: 1, params: [Function], sname: '$ctor1' }, { name: 'Clear', type: 8, sname: 'Clear', returnType: Object, params: [] }, { name: 'Contains', type: 8, sname: 'Contains', returnType: Boolean, params: [TKey] }, { name: 'GetValue', type: 8, sname: 'GetValue', returnType: TValue, params: [TKey] }, { name: 'Remove', type: 8, sname: 'Remove', returnType: Object, params: [TKey] }] });
		$type.$DefaultValue = ss.getDefaultValue(TValue);
		return $type;
	};
	$Granular_Collections_CacheDictionary$2.__typeName = 'Granular.Collections.CacheDictionary$2';
	ss.initGenericClass($Granular_Collections_CacheDictionary$2, $asm, 2);
	global.Granular.Collections.CacheDictionary$2 = $Granular_Collections_CacheDictionary$2;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.IListDictionary
	var $Granular_Collections_IListDictionary$2 = function(TKey, TValue) {
		var $type = function() {
		};
		ss.registerGenericInterfaceInstance($type, $Granular_Collections_IListDictionary$2, [TKey, TValue], { get_Keys: null, get_Values: null, Add: null, Remove: null, GetValues: null }, function() {
			return [ss.IEnumerable, ss.IEnumerable];
		});
		ss.setMetadata($type, { members: [{ name: 'Add', type: 8, sname: 'Add', returnType: Object, params: [TKey, TValue] }, { name: 'GetValues', type: 8, sname: 'GetValues', returnType: ss.IEnumerable, params: [TKey] }, { name: 'Remove', type: 8, sname: 'Remove', returnType: Boolean, params: [TKey, TValue] }, { name: 'Keys', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Keys', type: 8, sname: 'get_Keys', returnType: ss.IEnumerable, params: [] } }, { name: 'Values', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Values', type: 8, sname: 'get_Values', returnType: ss.IEnumerable, params: [] } }] });
		return $type;
	};
	$Granular_Collections_IListDictionary$2.__typeName = 'Granular.Collections.IListDictionary$2';
	ss.initGenericInterface($Granular_Collections_IListDictionary$2, $asm, 2);
	global.Granular.Collections.IListDictionary$2 = $Granular_Collections_IListDictionary$2;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.IListDictionaryExtensions
	var $Granular_Collections_IListDictionaryExtensions = function() {
	};
	$Granular_Collections_IListDictionaryExtensions.__typeName = 'Granular.Collections.IListDictionaryExtensions';
	$Granular_Collections_IListDictionaryExtensions.GetKeys = function(TKey, TValue) {
		return function(listDictionary) {
			return listDictionary.get_Keys();
		};
	};
	$Granular_Collections_IListDictionaryExtensions.GetValues = function(TKey, TValue) {
		return function(listDictionary) {
			return listDictionary.get_Values();
		};
	};
	$Granular_Collections_IListDictionaryExtensions.Contains = function(TKey, TValue) {
		return function(listDictionary, key, value) {
			return Enumerable.from(listDictionary.GetValues(key)).contains(value);
		};
	};
	global.Granular.Collections.IListDictionaryExtensions = $Granular_Collections_IListDictionaryExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.INotifyCollectionChanged
	var $Granular_Collections_INotifyCollectionChanged = function() {
	};
	$Granular_Collections_INotifyCollectionChanged.__typeName = 'Granular.Collections.INotifyCollectionChanged';
	global.Granular.Collections.INotifyCollectionChanged = $Granular_Collections_INotifyCollectionChanged;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.IObservableCollection
	var $Granular_Collections_IObservableCollection$1 = function(T) {
		var $type = function() {
		};
		ss.registerGenericInterfaceInstance($type, $Granular_Collections_IObservableCollection$1, [T], {}, function() {
			return [ss.IEnumerable, ss.IEnumerable, $Granular_Collections_INotifyCollectionChanged];
		});
		return $type;
	};
	$Granular_Collections_IObservableCollection$1.__typeName = 'Granular.Collections.IObservableCollection$1';
	ss.initGenericInterface($Granular_Collections_IObservableCollection$1, $asm, 1);
	global.Granular.Collections.IObservableCollection$1 = $Granular_Collections_IObservableCollection$1;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.ListDictionary
	var $Granular_Collections_ListDictionary$2 = function(TKey, TValue) {
		var $type = function() {
			this.$dictionary = null;
			this.$dictionary = new (ss.makeGenericType(ss.Dictionary$2, [TKey, Array]))();
		};
		ss.registerGenericClassInstance($type, $Granular_Collections_ListDictionary$2, [TKey, TValue], {
			get_Keys: function() {
				return this.$dictionary.get_keys();
			},
			get_Values: function() {
				return Enumerable.from(this.$dictionary).selectMany(function(pair) {
					return pair.value;
				});
			},
			Add: function(key, value) {
				var list = {};
				if (!this.$dictionary.tryGetValue(key, list)) {
					list.$ = [];
					this.$dictionary.add(key, list.$);
				}
				list.$.push(value);
			},
			Remove: function(key, value) {
				var list = {};
				if (!this.$dictionary.tryGetValue(key, list)) {
					return false;
				}
				if (!ss.remove(list.$, value)) {
					return false;
				}
				if (list.$.length === 0) {
					this.$dictionary.remove(key);
				}
				return true;
			},
			GetValues: function(key) {
				return (this.$dictionary.containsKey(key) ? this.$dictionary.get_item(key) : []);
			},
			getEnumerator: function() {
				return Enumerable.from(this.$dictionary).selectMany(function(pair) {
					return Enumerable.from(pair.value).select(function(value) {
						return { key: pair.key, value: value };
					});
				}).getEnumerator();
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable, ss.makeGenericType($Granular_Collections_IListDictionary$2, [TKey, TValue])];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [] }, { name: 'Add', type: 8, sname: 'Add', returnType: Object, params: [TKey, TValue] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'GetValues', type: 8, sname: 'GetValues', returnType: ss.IEnumerable, params: [TKey] }, { name: 'Remove', type: 8, sname: 'Remove', returnType: Boolean, params: [TKey, TValue] }, { name: 'Keys', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Keys', type: 8, sname: 'get_Keys', returnType: ss.IEnumerable, params: [] } }, { name: 'Values', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Values', type: 8, sname: 'get_Values', returnType: ss.IEnumerable, params: [] } }] });
		return $type;
	};
	$Granular_Collections_ListDictionary$2.__typeName = 'Granular.Collections.ListDictionary$2';
	ss.initGenericClass($Granular_Collections_ListDictionary$2, $asm, 2);
	global.Granular.Collections.ListDictionary$2 = $Granular_Collections_ListDictionary$2;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.NotifyCollectionChangedAction
	var $Granular_Collections_NotifyCollectionChangedAction = function() {
	};
	$Granular_Collections_NotifyCollectionChangedAction.__typeName = 'Granular.Collections.NotifyCollectionChangedAction';
	global.Granular.Collections.NotifyCollectionChangedAction = $Granular_Collections_NotifyCollectionChangedAction;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.NotifyCollectionChangedEventArgs
	var $Granular_Collections_NotifyCollectionChangedEventArgs = function(action, oldItems, oldStartingIndex, newItems, newStartingIndex) {
		this.$2$ActionField = 0;
		this.$2$NewItemsField = null;
		this.$2$NewStartingIndexField = 0;
		this.$2$OldItemsField = null;
		this.$2$OldStartingIndexField = 0;
		ss.EventArgs.call(this);
		this.set_Action(action);
		this.set_OldItems(oldItems);
		this.set_OldStartingIndex(oldStartingIndex);
		this.set_NewItems(newItems);
		this.set_NewStartingIndex(newStartingIndex);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.__typeName = 'Granular.Collections.NotifyCollectionChangedEventArgs';
	$Granular_Collections_NotifyCollectionChangedEventArgs.Add = function(item, index) {
		return $Granular_Collections_NotifyCollectionChangedEventArgs.AddRange([item], index);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.AddRange = function(items, startingIndex) {
		return new $Granular_Collections_NotifyCollectionChangedEventArgs(0, [], -1, items, startingIndex);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.Remove = function(item, index) {
		return $Granular_Collections_NotifyCollectionChangedEventArgs.RemoveRange([item], index);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.RemoveRange = function(items, startingIndex) {
		return new $Granular_Collections_NotifyCollectionChangedEventArgs(1, items, startingIndex, [], -1);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.Replace = function(oldItem, newItem, index) {
		return $Granular_Collections_NotifyCollectionChangedEventArgs.ReplaceRange([oldItem], [newItem], index);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.ReplaceRange = function(oldItems, newItems, index) {
		return new $Granular_Collections_NotifyCollectionChangedEventArgs(2, oldItems, index, newItems, index);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.Move = function(item, oldIndex, newIndex) {
		return $Granular_Collections_NotifyCollectionChangedEventArgs.MoveRange([item], oldIndex, newIndex);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.MoveRange = function(items, oldStartingIndex, newStartingIndex) {
		return new $Granular_Collections_NotifyCollectionChangedEventArgs(3, items, oldStartingIndex, items, newStartingIndex);
	};
	$Granular_Collections_NotifyCollectionChangedEventArgs.Reset = function(oldItems, newItems) {
		return new $Granular_Collections_NotifyCollectionChangedEventArgs(4, oldItems, 0, newItems, 0);
	};
	global.Granular.Collections.NotifyCollectionChangedEventArgs = $Granular_Collections_NotifyCollectionChangedEventArgs;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.NotifyCollectionChangedEventHandlerExtensions
	var $Granular_Collections_NotifyCollectionChangedEventHandlerExtensions = function() {
	};
	$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.__typeName = 'Granular.Collections.NotifyCollectionChangedEventHandlerExtensions';
	$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.Raise = function(handler, sender, e) {
		if (!ss.staticEquals(handler, null)) {
			handler(sender, e);
		}
	};
	global.Granular.Collections.NotifyCollectionChangedEventHandlerExtensions = $Granular_Collections_NotifyCollectionChangedEventHandlerExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.ObservableCollection
	var $Granular_Collections_ObservableCollection$1 = function(T) {
		var $type = function() {
			$type.$ctor2.call(this, []);
			//
		};
		$type.$ctor1 = function(collection) {
			$type.$ctor2.call(this, ss.arrayFromEnumerable(collection));
			//
		};
		$type.$ctor3 = function(capacity) {
			$type.$ctor2.call(this, []);
			//
		};
		$type.$ctor2 = function(items) {
			this.$1$CollectionChangedField = null;
			this.$1$PropertyChangedField = null;
			this.$items = null;
			this.$items = items;
		};
		ss.registerGenericClassInstance($type, $Granular_Collections_ObservableCollection$1, [T], {
			add_CollectionChanged: function(value) {
				this.$1$CollectionChangedField = ss.delegateCombine(this.$1$CollectionChangedField, value);
			},
			remove_CollectionChanged: function(value) {
				this.$1$CollectionChangedField = ss.delegateRemove(this.$1$CollectionChangedField, value);
			},
			add_PropertyChanged: function(value) {
				this.$1$PropertyChangedField = ss.delegateCombine(this.$1$PropertyChangedField, value);
			},
			remove_PropertyChanged: function(value) {
				this.$1$PropertyChangedField = ss.delegateRemove(this.$1$PropertyChangedField, value);
			},
			get_count: function() {
				return this.$items.length;
			},
			get_item: function(index) {
				return this.$items[index];
			},
			set_item: function(index, value) {
				if (ss.makeGenericType($Granular_Compatibility_EqualityComparer$1, [T]).Default.areEqual(this.$items[index], value)) {
					return;
				}
				var oldItem = this.$items[index];
				this.$items[index] = value;
				$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.Raise(this.$1$CollectionChangedField, this, $Granular_Collections_NotifyCollectionChangedEventArgs.Replace(oldItem, this.$items[index], index));
			},
			get_IsReadOnly: function() {
				return false;
			},
			add: function(item) {
				this.$items.push(item);
				$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.Raise(this.$1$CollectionChangedField, this, $Granular_Collections_NotifyCollectionChangedEventArgs.Add(item, this.get_count() - 1));
				$Granular_Extensions_EventHandlerExtensions.Raise$1(this.$1$PropertyChangedField, this, $type.$CountPropertyChangedEventArgs);
			},
			clear: function() {
				var e = $Granular_Collections_NotifyCollectionChangedEventArgs.RemoveRange(Enumerable.from(this.$items).select(function(x) {
					return ss.cast(x, Object);
				}).toArray(), 0);
				ss.clear(this.$items);
				$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.Raise(this.$1$CollectionChangedField, this, e);
				$Granular_Extensions_EventHandlerExtensions.Raise$1(this.$1$PropertyChangedField, this, $type.$CountPropertyChangedEventArgs);
			},
			contains: function(item) {
				return ss.contains(this.$items, item);
			},
			indexOf: function(item) {
				return ss.indexOf(this.$items, item);
			},
			insert: function(index, item) {
				ss.insert(this.$items, index, item);
				$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.Raise(this.$1$CollectionChangedField, this, $Granular_Collections_NotifyCollectionChangedEventArgs.Add(item, index));
				$Granular_Extensions_EventHandlerExtensions.Raise$1(this.$1$PropertyChangedField, this, $type.$CountPropertyChangedEventArgs);
			},
			remove: function(item) {
				var index = ss.indexOf(this.$items, item);
				if (index === -1) {
					return false;
				}
				this.removeAt(index);
				return true;
			},
			removeAt: function(index) {
				var e = $Granular_Collections_NotifyCollectionChangedEventArgs.Remove(this.$items[index], index);
				ss.removeAt(this.$items, index);
				$Granular_Collections_NotifyCollectionChangedEventHandlerExtensions.Raise(this.$1$CollectionChangedField, this, e);
				$Granular_Extensions_EventHandlerExtensions.Raise$1(this.$1$PropertyChangedField, this, $type.$CountPropertyChangedEventArgs);
			},
			CopyTo: function(array, arrayIndex) {
				$System_Linq_EnumerableExtensions.CopyTo(T).call(null, this.$items, array, arrayIndex);
			},
			getEnumerator: function() {
				return ss.getEnumerator(this.$items);
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable, $Granular_Collections_INotifyCollectionChanged, ss.makeGenericType($Granular_Collections_IObservableCollection$1, [T]), ss.ICollection, ss.IList, $System_ComponentModel_INotifyPropertyChanged];
		});
		$type.$ctor1.prototype = $type.$ctor3.prototype = $type.$ctor2.prototype = $type.prototype;
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [] }, { name: '.ctor', type: 1, params: [ss.IEnumerable], sname: '$ctor1' }, { name: '.ctor', type: 1, params: [ss.Int32], sname: '$ctor3' }, { name: 'Add', type: 8, sname: 'add', returnType: Object, params: [T] }, { name: 'Clear', type: 8, sname: 'clear', returnType: Object, params: [] }, { name: 'Contains', type: 8, sname: 'contains', returnType: Boolean, params: [T] }, { name: 'CopyTo', type: 8, sname: 'CopyTo', returnType: Object, params: [Array, ss.Int32] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'IndexOf', type: 8, sname: 'indexOf', returnType: ss.Int32, params: [T] }, { name: 'Insert', type: 8, sname: 'insert', returnType: Object, params: [ss.Int32, T] }, { name: 'Remove', type: 8, sname: 'remove', returnType: Boolean, params: [T] }, { name: 'RemoveAt', type: 8, sname: 'removeAt', returnType: Object, params: [ss.Int32] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_count', returnType: ss.Int32, params: [] } }, { name: 'IsReadOnly', type: 16, returnType: Boolean, getter: { name: 'get_IsReadOnly', type: 8, sname: 'get_IsReadOnly', returnType: Boolean, params: [] } }, { name: 'Item', type: 16, returnType: T, params: [ss.Int32], getter: { name: 'get_Item', type: 8, sname: 'get_item', returnType: T, params: [ss.Int32] }, setter: { name: 'set_Item', type: 8, sname: 'set_item', returnType: Object, params: [ss.Int32, T] } }, { name: 'CollectionChanged', type: 2, adder: { name: 'add_CollectionChanged', type: 8, sname: 'add_CollectionChanged', returnType: Object, params: [Function] }, remover: { name: 'remove_CollectionChanged', type: 8, sname: 'remove_CollectionChanged', returnType: Object, params: [Function] } }, { name: 'PropertyChanged', type: 2, adder: { name: 'add_PropertyChanged', type: 8, sname: 'add_PropertyChanged', returnType: Object, params: [Function] }, remover: { name: 'remove_PropertyChanged', type: 8, sname: 'remove_PropertyChanged', returnType: Object, params: [Function] } }] });
		$type.$CountPropertyChangedEventArgs = new $System_ComponentModel_PropertyChangedEventArgs('Count');
		return $type;
	};
	$Granular_Collections_ObservableCollection$1.__typeName = 'Granular.Collections.ObservableCollection$1';
	ss.initGenericClass($Granular_Collections_ObservableCollection$1, $asm, 1);
	global.Granular.Collections.ObservableCollection$1 = $Granular_Collections_ObservableCollection$1;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.PriorityQueue
	var $Granular_Collections_PriorityQueue$2 = function(TKey, TValue) {
		var $type = function() {
			$type.$ctor1.call(this, ss.makeGenericType($Granular_Compatibility_Comparer$1, [TKey]).get_Default());
			//
		};
		$type.$ctor1 = function(comparer) {
			this.$list = null;
			this.$currentIndex = 0;
			this.$list = new (ss.makeGenericType($System_Collections_Generic_SortedList$2, [ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [TKey, TValue]), TValue]))(new (ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKeyComparer, [TKey, TValue]))(comparer));
		};
		ss.registerGenericClassInstance($type, $Granular_Collections_PriorityQueue$2, [TKey, TValue], {
			get_Count: function() {
				return this.$list.get_count();
			},
			Enqueue: function(key, value) {
				this.$list.add(new (ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [TKey, TValue]))(key, this.$currentIndex++), value);
			},
			Dequeue: function() {
				var value = {};
				if (this.TryDequeue(value)) {
					return value.$;
				}
				throw new ss.InvalidOperationException('Queue is empty');
			},
			TryDequeue: function(value) {
				if (this.TryPeek(value)) {
					this.$list.RemoveAt(0);
					return true;
				}
				value.$ = $type.$DefaultValue;
				return false;
			},
			Peek: function() {
				var value = {};
				if (this.TryPeek(value)) {
					return value.$;
				}
				throw new ss.InvalidOperationException('Queue is empty');
			},
			TryPeek: function(value) {
				if (this.$list.get_count() > 0) {
					value.$ = Enumerable.from($System_Collections_Generic_DictionaryExtensions.GetValues(ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [TKey, TValue]), TValue).call(null, this.$list)).first();
					return true;
				}
				value.$ = $type.$DefaultValue;
				return false;
			},
			getEnumerator: function() {
				return Enumerable.from(this.$list).select(function(pair) {
					return { key: pair.key.get_$Key(), value: pair.value };
				}).getEnumerator();
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable];
		});
		$type.$ctor1.prototype = $type.prototype;
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [] }, { name: '.ctor', type: 1, params: [ss.IComparer], sname: '$ctor1' }, { name: 'Dequeue', type: 8, sname: 'Dequeue', returnType: TValue, params: [] }, { name: 'Enqueue', type: 8, sname: 'Enqueue', returnType: Object, params: [TKey, TValue] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Peek', type: 8, sname: 'Peek', returnType: TValue, params: [] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_Count', returnType: ss.Int32, params: [] } }] });
		$type.$DefaultValue = ss.getDefaultValue(TValue);
		return $type;
	};
	$Granular_Collections_PriorityQueue$2.__typeName = 'Granular.Collections.PriorityQueue$2';
	ss.initGenericClass($Granular_Collections_PriorityQueue$2, $asm, 2);
	global.Granular.Collections.PriorityQueue$2 = $Granular_Collections_PriorityQueue$2;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Collections.ReadOnlyStack
	var $Granular_Collections_ReadOnlyStack$1 = function(T) {
		var $type = function(source) {
			this.$1$IsEmptyField = false;
			this.$enumerator = null;
			this.$enumerator = ss.getEnumerator(source);
			this.$MoveNext();
		};
		ss.registerGenericClassInstance($type, $Granular_Collections_ReadOnlyStack$1, [T], {
			get_IsEmpty: function() {
				return this.$1$IsEmptyField;
			},
			set_IsEmpty: function(value) {
				this.$1$IsEmptyField = value;
			},
			Pop: function() {
				if (this.get_IsEmpty()) {
					throw new $Granular_Exception('Stack is empty', []);
				}
				var current = this.$enumerator.current();
				this.$MoveNext();
				return current;
			},
			Peek: function() {
				if (this.get_IsEmpty()) {
					throw new $Granular_Exception('Stack is empty', []);
				}
				return this.$enumerator.current();
			},
			$MoveNext: function() {
				this.set_IsEmpty(!this.$enumerator.moveNext());
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [ss.IEnumerable] }, { name: 'Peek', type: 8, sname: 'Peek', returnType: T, params: [] }, { name: 'Pop', type: 8, sname: 'Pop', returnType: T, params: [] }, { name: 'IsEmpty', type: 16, returnType: Boolean, getter: { name: 'get_IsEmpty', type: 8, sname: 'get_IsEmpty', returnType: Boolean, params: [] }, setter: { name: 'set_IsEmpty', type: 8, sname: 'set_IsEmpty', returnType: Object, params: [Boolean] } }] });
		return $type;
	};
	$Granular_Collections_ReadOnlyStack$1.__typeName = 'Granular.Collections.ReadOnlyStack$1';
	ss.initGenericClass($Granular_Collections_ReadOnlyStack$1, $asm, 1);
	global.Granular.Collections.ReadOnlyStack$1 = $Granular_Collections_ReadOnlyStack$1;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Array
	var $Granular_Compatibility_Array = function() {
	};
	$Granular_Compatibility_Array.__typeName = 'Granular.Compatibility.Array';
	$Granular_Compatibility_Array.IndexOf = function(T) {
		return function(array, value) {
			for (var i = 0; i < array.length; i++) {
				if (ss.makeGenericType($Granular_Compatibility_EqualityComparer$1, [T]).Default.areEqual(array[i], value)) {
					return i;
				}
			}
			return -1;
		};
	};
	$Granular_Compatibility_Array.FindIndex = function(T) {
		return function(array, match) {
			for (var i = 0; i < array.length; i++) {
				if (match(array[i])) {
					return i;
				}
			}
			return -1;
		};
	};
	$Granular_Compatibility_Array.FindLastIndex = function(T) {
		return function(array, match) {
			var lastIndex = -1;
			for (var i = 0; i < array.length; i++) {
				if (match(array[i])) {
					lastIndex = i;
				}
			}
			return lastIndex;
		};
	};
	global.Granular.Compatibility.Array = $Granular_Compatibility_Array;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.BindingFlags
	var $Granular_Compatibility_BindingFlags = function() {
	};
	$Granular_Compatibility_BindingFlags.__typeName = 'Granular.Compatibility.BindingFlags';
	global.Granular.Compatibility.BindingFlags = $Granular_Compatibility_BindingFlags;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Collection
	var $Granular_Compatibility_Collection = function() {
	};
	$Granular_Compatibility_Collection.__typeName = 'Granular.Compatibility.Collection';
	global.Granular.Compatibility.Collection = $Granular_Compatibility_Collection;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Comparer
	var $Granular_Compatibility_Comparer$1 = function(T) {
		var $type = function() {
		};
		$type.get_Default = function() {
			return new (ss.makeGenericType($Granular_$Compatibility_Comparer$1$CompatibleComparer, [T]))(ss.Comparer.def);
		};
		ss.registerGenericClassInstance($type, $Granular_Compatibility_Comparer$1, [T], {}, function() {
			return null;
		}, function() {
			return [];
		});
		ss.setMetadata($type, { members: [{ name: 'Default', isStatic: true, type: 16, returnType: ss.IComparer, getter: { name: 'get_Default', isStatic: true, type: 8, sname: 'get_Default', returnType: ss.IComparer, params: [] } }] });
		return $type;
	};
	$Granular_Compatibility_Comparer$1.__typeName = 'Granular.Compatibility.Comparer$1';
	ss.initGenericClass($Granular_Compatibility_Comparer$1, $asm, 1);
	global.Granular.Compatibility.Comparer$1 = $Granular_Compatibility_Comparer$1;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Convert
	var $Granular_Compatibility_Convert = function() {
	};
	$Granular_Compatibility_Convert.__typeName = 'Granular.Compatibility.Convert';
	$Granular_Compatibility_Convert.ToUInt32 = function(value, fromBase) {
		if (fromBase <= 0 || fromBase > $Granular_Compatibility_Convert.$HexDigits.length) {
			throw new $Granular_Exception('Can\'t convert to UInt32 from "{0}" base', [fromBase]);
		}
		var hexValue = 0;
		for (var i = 0; i < value.length; i++) {
			var hexChar = $Granular_Compatibility_Convert.$HexDigits.indexOf(String.fromCharCode(value.charCodeAt(i)));
			if (hexChar === -1) {
				throw new $Granular_Exception('Can\'t convert "{0}" from base "{1}" to UInt32', [value, fromBase]);
			}
			hexValue = hexValue * fromBase + hexChar;
		}
		return hexValue;
	};
	$Granular_Compatibility_Convert.ChangeType = function(value, conversionType) {
		if (ss.isInstanceOfType(value, ss.Int32) && ss.referenceEquals(conversionType, Number)) {
			return ss.unbox(ss.cast(value, ss.Int32));
		}
		if (ss.isInstanceOfType(value, String)) {
			if (ss.referenceEquals(conversionType, ss.Int32)) {
				return parseInt(ss.cast(value, String));
			}
			if (ss.referenceEquals(conversionType, Number)) {
				return parseFloat(ss.cast(value, String));
			}
		}
		throw new $Granular_Exception('Can\'t convert value "{0}" from "{1}" to "{2}"', [value, ss.getTypeName(ss.getInstanceType(value)), ss.getTypeName(conversionType)]);
	};
	global.Granular.Compatibility.Convert = $Granular_Compatibility_Convert;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Dictionary
	var $Granular_Compatibility_Dictionary = function() {
	};
	$Granular_Compatibility_Dictionary.__typeName = 'Granular.Compatibility.Dictionary';
	global.Granular.Compatibility.Dictionary = $Granular_Compatibility_Dictionary;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Double
	var $Granular_Compatibility_Double = function() {
	};
	$Granular_Compatibility_Double.__typeName = 'Granular.Compatibility.Double';
	$Granular_Compatibility_Double.TryParse = function(s, result) {
		if (!$System_Text_RegularExpressions_RegexExtensions.Match($Granular_Compatibility_Double.$DoubleFormat, s).get_Success()) {
			result.$ = Number.NaN;
			return false;
		}
		result.$ = parseFloat(s);
		return true;
	};
	$Granular_Compatibility_Double.IsInfinity = function(d) {
		return !isFinite(d);
	};
	global.Granular.Compatibility.Double = $Granular_Compatibility_Double;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.EqualityComparer
	var $Granular_Compatibility_EqualityComparer$1 = function(T) {
		var $type = function(comparer) {
			this.$comparer = null;
			this.$comparer = comparer;
		};
		ss.registerGenericClassInstance($type, $Granular_Compatibility_EqualityComparer$1, [T], {
			areEqual: function(x, y) {
				return ss.isInstanceOfType(x, Number) && isNaN(ss.unbox(ss.cast(x, Number))) && ss.isInstanceOfType(y, Number) && isNaN(ss.unbox(ss.cast(y, Number))) || this.$comparer.areEqual(x, y);
			},
			getObjectHashCode: function(obj) {
				return this.$comparer.getObjectHashCode(obj);
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEqualityComparer, ss.IEqualityComparer];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [ss.IEqualityComparer] }, { name: 'Equals', type: 8, sname: 'areEqual', returnType: Boolean, params: [T, T] }, { name: 'GetHashCode', type: 8, sname: 'getObjectHashCode', returnType: ss.Int32, params: [T] }, { name: 'Default', isStatic: true, type: 4, returnType: $type, sname: 'Default' }] });
		$type.Default = new $type(ss.EqualityComparer.def);
		return $type;
	};
	$Granular_Compatibility_EqualityComparer$1.__typeName = 'Granular.Compatibility.EqualityComparer$1';
	ss.initGenericClass($Granular_Compatibility_EqualityComparer$1, $asm, 1);
	global.Granular.Compatibility.EqualityComparer$1 = $Granular_Compatibility_EqualityComparer$1;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.RuntimeHelpers
	var $Granular_Compatibility_RuntimeHelpers = function() {
	};
	$Granular_Compatibility_RuntimeHelpers.__typeName = 'Granular.Compatibility.RuntimeHelpers';
	$Granular_Compatibility_RuntimeHelpers.RunClassConstructor = function(type) {
		//
	};
	global.Granular.Compatibility.RuntimeHelpers = $Granular_Compatibility_RuntimeHelpers;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.String
	var $Granular_Compatibility_String = function() {
	};
	$Granular_Compatibility_String.__typeName = 'Granular.Compatibility.String';
	$Granular_Compatibility_String.IsNullOrWhitespace = function(value) {
		return ss.isValue($Granular_Compatibility_String.$StringWhitespaceFormat.exec(value));
	};
	$Granular_Compatibility_String.FromByteArray = function(data) {
		return decodeURIComponent(escape(String.fromCharCode.apply(null, data)));
	};
	global.Granular.Compatibility.String = $Granular_Compatibility_String;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.TimeSpan
	var $Granular_Compatibility_TimeSpan = function() {
	};
	$Granular_Compatibility_TimeSpan.__typeName = 'Granular.Compatibility.TimeSpan';
	$Granular_Compatibility_TimeSpan.TryParse = function(s, result) {
		var days = { $: 0 };
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var milliseconds = 0;
		var match = $System_Text_RegularExpressions_RegexExtensions.Match($Granular_Compatibility_TimeSpan.$TimeSpanFormatRegex, s);
		if (!match.get_Success()) {
			result.$ = new ss.TimeSpan(0);
			return false;
		}
		if (!ss.Int32.tryParse(match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatDaysAlternativeGroupIndex).get_Value(), days)) {
			days.$ = parseInt(ss.padLeftString(match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatDaysGroupIndex).get_Value(), 1, 48));
			hours = parseInt(ss.padLeftString(match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatHoursGroupIndex).get_Value(), 1, 48));
			minutes = parseInt(ss.padLeftString(match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatMinutesGroupIndex).get_Value(), 1, 48));
			seconds = parseInt(ss.padLeftString(match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatSecondsGroupIndex).get_Value(), 1, 48));
			milliseconds = parseInt(ss.padRightString(match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatMillisecondsGroupIndex).get_Value(), 3, 48));
		}
		if (hours >= 24 || minutes >= 60 || seconds >= 60 || milliseconds >= 1000) {
			result.$ = new ss.TimeSpan(0);
			return false;
		}
		if (match.get_Groups().get_Item($Granular_Compatibility_TimeSpan.$TimeSpanFormatSignGroupIndex).get_Value() === '-') {
			days.$ = -days.$;
			hours = -hours;
			minutes = -minutes;
			seconds = -seconds;
			milliseconds = -milliseconds;
		}
		result.$ = new ss.TimeSpan(((((days.$ * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds) * 10000);
		return true;
	};
	$Granular_Compatibility_TimeSpan.Subtract = function(value1, value2) {
		return new ss.TimeSpan((value1 - value2) * 10000);
	};
	global.Granular.Compatibility.TimeSpan = $Granular_Compatibility_TimeSpan;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Compatibility.Type
	var $Granular_Compatibility_Type = function() {
	};
	$Granular_Compatibility_Type.__typeName = 'Granular.Compatibility.Type';
	$Granular_Compatibility_Type.GetType = function(name) {
		if (name === 'System.Double') {
			return Number;
		}
		if (name === 'System.Int32') {
			return ss.Int32;
		}
		if (name === 'System.String') {
			return String;
		}
		return ss.getType(name);
	};
	$Granular_Compatibility_Type.GetTypeInterfaceGenericArguments = function(type, interfaceType) {
		var arguments1 = ss.getGenericArguments(interfaceType);
		if (ss.isValue(arguments1)) {
			return arguments1;
		}
		if (ss.referenceEquals(interfaceType, ss.ICollection)) {
			return Enumerable.from(ss.getMembers(type, 8, 20)).where(function(methodInfo) {
				return methodInfo.name === 'Add' && methodInfo.params.length === 1;
			}).first().params;
		}
		if (ss.referenceEquals(interfaceType, ss.IDictionary)) {
			return Enumerable.from(ss.getMembers(type, 8, 20)).where(function(methodInfo1) {
				return methodInfo1.name === 'Add' && methodInfo1.params.length === 2;
			}).first().params;
		}
		throw new $Granular_Exception('Can\'t get generic arguments for type "{0}" interface "{1}"', [ss.getTypeName(type), ss.getTypeName(interfaceType)]);
	};
	global.Granular.Compatibility.Type = $Granular_Compatibility_Type;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Diagnostics.HitCounter
	var $Granular_Diagnostics_HitCounter = function(name, getAdditionalStatus) {
		this.$name = null;
		this.$getAdditionalStatus = null;
		this.$totalHitsCount = 0;
		this.$lastHitsCount = 0;
		this.$lastReportTime = new Date(0);
		this.$name = name;
		this.$getAdditionalStatus = getAdditionalStatus;
		this.$lastReportTime = new Date();
		console.log(ss.formatString('{0} - HitCounter initialized', name));
	};
	$Granular_Diagnostics_HitCounter.__typeName = 'Granular.Diagnostics.HitCounter';
	global.Granular.Diagnostics.HitCounter = $Granular_Diagnostics_HitCounter;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.AssemblyExtensions
	var $Granular_Extensions_AssemblyExtensions = function() {
	};
	$Granular_Extensions_AssemblyExtensions.__typeName = 'Granular.Extensions.AssemblyExtensions';
	$Granular_Extensions_AssemblyExtensions.GetCustomAttributesCached = function(T) {
		return function(assembly) {
			var attributes = {};
			if ($Granular_Extensions_AssemblyExtensions.$attributesCache.tryGetValue(assembly.toString(), attributes)) {
				return Enumerable.from(attributes.$).ofType(T).select(function(x) {
					return ss.cast(x, T);
				});
			}
			attributes.$ = assembly.attr || [];
			$Granular_Extensions_AssemblyExtensions.$attributesCache.add(assembly.toString(), attributes.$);
			return Enumerable.from(attributes.$).ofType(T).select(function(x) {
				return ss.cast(x, T);
			});
		};
	};
	$Granular_Extensions_AssemblyExtensions.FirstOrDefaultCustomAttributeCached = function(T) {
		return function(assembly) {
			return Enumerable.from($Granular_Extensions_AssemblyExtensions.GetCustomAttributesCached(T).call(null, assembly)).firstOrDefault(null, ss.getDefaultValue(T));
		};
	};
	global.Granular.Extensions.AssemblyExtensions = $Granular_Extensions_AssemblyExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.CollectionExtensions
	var $Granular_Extensions_CollectionExtensions = function() {
	};
	$Granular_Extensions_CollectionExtensions.__typeName = 'Granular.Extensions.CollectionExtensions';
	$Granular_Extensions_CollectionExtensions.AddRange = function(T) {
		return function(collection, items) {
			var $t1 = ss.getEnumerator(items);
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					ss.add(collection, item);
				}
			}
			finally {
				$t1.dispose();
			}
		};
	};
	global.Granular.Extensions.CollectionExtensions = $Granular_Extensions_CollectionExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.DoubleExtensions
	var $Granular_Extensions_DoubleExtensions = function() {
	};
	$Granular_Extensions_DoubleExtensions.__typeName = 'Granular.Extensions.DoubleExtensions';
	$Granular_Extensions_DoubleExtensions.IsClose = function(this1, value) {
		// |a-b|/(|a|+|b|+1) < Epsilon
		return this1 === value || $Granular_Extensions_DoubleExtensions.IsNaN(this1) && $Granular_Extensions_DoubleExtensions.IsNaN(value) || Math.abs(this1 - value) < $Granular_Extensions_DoubleExtensions.$Epsilon * (Math.abs(this1) + Math.abs(value) + 1);
	};
	$Granular_Extensions_DoubleExtensions.IsNaN = function(this1) {
		return isNaN(this1);
	};
	$Granular_Extensions_DoubleExtensions.DefaultIfNaN = function(this1, defaultValue) {
		return (isNaN(this1) ? defaultValue : this1);
	};
	$Granular_Extensions_DoubleExtensions.Min = function(this1, value) {
		return ((this1 < value) ? this1 : value);
	};
	$Granular_Extensions_DoubleExtensions.Max = function(this1, value) {
		return ((this1 > value) ? this1 : value);
	};
	$Granular_Extensions_DoubleExtensions.Bounds = function(this1, minimum, maximum) {
		if (minimum > maximum) {
			throw new $Granular_Exception('Invalid bounds (minimum: {0}, maximum: {1})', [minimum, maximum]);
		}
		return $Granular_Extensions_DoubleExtensions.Min($Granular_Extensions_DoubleExtensions.Max(this1, minimum), maximum);
	};
	global.Granular.Extensions.DoubleExtensions = $Granular_Extensions_DoubleExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.EventHandlerExtensions
	var $Granular_Extensions_EventHandlerExtensions = function() {
	};
	$Granular_Extensions_EventHandlerExtensions.__typeName = 'Granular.Extensions.EventHandlerExtensions';
	$Granular_Extensions_EventHandlerExtensions.Raise = function(handler, sender) {
		if (!ss.staticEquals(handler, null)) {
			handler(sender, ss.EventArgs.Empty);
		}
	};
	$Granular_Extensions_EventHandlerExtensions.Raise$3 = function(handler, sender, e) {
		if (!ss.staticEquals(handler, null)) {
			handler(sender, e);
		}
	};
	$Granular_Extensions_EventHandlerExtensions.Raise$4 = function(T) {
		return function(handler, sender, e) {
			if (!ss.staticEquals(handler, null)) {
				handler(sender, e);
			}
		};
	};
	$Granular_Extensions_EventHandlerExtensions.Raise$2 = function(handler, sender, propertyName) {
		$Granular_Extensions_EventHandlerExtensions.Raise$1(handler, sender, new $System_ComponentModel_PropertyChangedEventArgs(propertyName));
	};
	$Granular_Extensions_EventHandlerExtensions.Raise$1 = function(handler, sender, e) {
		if (!ss.staticEquals(handler, null)) {
			handler(sender, e);
		}
	};
	global.Granular.Extensions.EventHandlerExtensions = $Granular_Extensions_EventHandlerExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.IntExtensions
	var $Granular_Extensions_IntExtensions = function() {
	};
	$Granular_Extensions_IntExtensions.__typeName = 'Granular.Extensions.IntExtensions';
	$Granular_Extensions_IntExtensions.Min = function(this1, value) {
		return ((this1 < value) ? this1 : value);
	};
	$Granular_Extensions_IntExtensions.Max = function(this1, value) {
		return ((this1 > value) ? this1 : value);
	};
	$Granular_Extensions_IntExtensions.Bounds = function(this1, minimum, maximum) {
		if (minimum > maximum) {
			throw new $Granular_Exception('Invalid bounds (minimum: {0}, maximum: {1})', [minimum, maximum]);
		}
		return $Granular_Extensions_IntExtensions.Min($Granular_Extensions_IntExtensions.Max(this1, minimum), maximum);
	};
	global.Granular.Extensions.IntExtensions = $Granular_Extensions_IntExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.ListExtensions
	var $Granular_Extensions_ListExtensions = function() {
	};
	$Granular_Extensions_ListExtensions.__typeName = 'Granular.Extensions.ListExtensions';
	$Granular_Extensions_ListExtensions.InsertRange = function(T) {
		return function(list, index, values) {
			var $t1 = ss.getEnumerator(values);
			try {
				while ($t1.moveNext()) {
					var value = $t1.current();
					ss.insert(list, index, value);
					index++;
				}
			}
			finally {
				$t1.dispose();
			}
		};
	};
	$Granular_Extensions_ListExtensions.RemoveRange = function(T) {
		return function(list, index, count) {
			for (var i = 0; i < count; i++) {
				ss.removeAt(list, index);
			}
		};
	};
	global.Granular.Extensions.ListExtensions = $Granular_Extensions_ListExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.StringExtensions
	var $Granular_Extensions_StringExtensions = function() {
	};
	$Granular_Extensions_StringExtensions.__typeName = 'Granular.Extensions.StringExtensions';
	$Granular_Extensions_StringExtensions.IsNullOrEmpty = function(this1) {
		return ss.isNullOrEmptyString(this1);
	};
	$Granular_Extensions_StringExtensions.IsNullOrWhitespace = function(this1) {
		return $Granular_Compatibility_String.IsNullOrWhitespace(this1);
	};
	$Granular_Extensions_StringExtensions.DefaultIfNullOrEmpty = function(this1, defaultValue) {
		return (ss.isNullOrEmptyString(this1) ? ss.coalesce(defaultValue, '') : this1);
	};
	$Granular_Extensions_StringExtensions.GetCharacterIndexFromLineIndex = function(this1, lineIndex) {
		var linesStartIndex = Enumerable.from([0]).concat(Enumerable.from($Granular_Extensions_StringExtensions.IndexOfAll(this1, '\n')).select(function(index) {
			return index + 1;
		})).toArray();
		return ((lineIndex >= 0 && lineIndex < linesStartIndex.length) ? linesStartIndex[lineIndex] : -1);
	};
	$Granular_Extensions_StringExtensions.GetLineIndexFromCharacterIndex = function(this1, charIndex) {
		var linesIndex = $Granular_Extensions_StringExtensions.IndexOfAll(this1, '\n');
		var linesStartIndex = Enumerable.from([0]).concat(Enumerable.from(linesIndex).select(function(index) {
			return index + 1;
		})).toArray();
		var linesEndIndex = Enumerable.from(linesIndex.concat([this1.length])).toArray();
		for (var i = 0; i < linesStartIndex.length; i++) {
			if (linesStartIndex[i] <= charIndex && charIndex <= linesEndIndex[i]) {
				return i;
			}
		}
		return -1;
	};
	$Granular_Extensions_StringExtensions.GetLineLength = function(this1, lineIndex) {
		var lines = $Granular_Extensions_StringExtensions.GetLines(this1);
		return ((lineIndex >= 0 && lineIndex < lines.length) ? lines[lineIndex].length : -1);
	};
	$Granular_Extensions_StringExtensions.GetLineText = function(this1, lineIndex) {
		var lines = $Granular_Extensions_StringExtensions.GetLines(this1);
		return ((lineIndex >= 0 && lineIndex < lines.length) ? lines[lineIndex] : '');
	};
	$Granular_Extensions_StringExtensions.GetLines = function(this1) {
		var linesIndex = $Granular_Extensions_StringExtensions.IndexOfAll(this1, '\n');
		var linesStartIndex = Enumerable.from([0]).concat(Enumerable.from(linesIndex).select(function(index) {
			return index + 1;
		}));
		var linesEndIndex = linesIndex.concat([this1.length]);
		return Enumerable.from(linesStartIndex).zip(linesEndIndex, function(lineStartIndex, lineEndIndex) {
			return ss.trimEndString(this1.substr(lineStartIndex, lineEndIndex - lineStartIndex), [13]);
		}).toArray();
	};
	$Granular_Extensions_StringExtensions.IndexOfAll = function(this1, allOf) {
		var list = [];
		for (var i = 0; i < this1.length - allOf.length; i++) {
			var match = true;
			for (var j = 0; j < allOf.length; j++) {
				if (this1.charCodeAt(i + j) !== allOf.charCodeAt(j)) {
					match = false;
					break;
				}
			}
			if (match) {
				list.push(i);
			}
		}
		return Array.prototype.slice.call(list);
	};
	global.Granular.Extensions.StringExtensions = $Granular_Extensions_StringExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.TimeSpanExtensions
	var $Granular_Extensions_TimeSpanExtensions = function() {
	};
	$Granular_Extensions_TimeSpanExtensions.__typeName = 'Granular.Extensions.TimeSpanExtensions';
	$Granular_Extensions_TimeSpanExtensions.Scale = function(timeSpan, factor) {
		return new ss.TimeSpan(ss.Int32.trunc(timeSpan.ticks * factor));
	};
	$Granular_Extensions_TimeSpanExtensions.Divide = function(this1, timeSpan) {
		return this1.ticks / timeSpan.ticks;
	};
	$Granular_Extensions_TimeSpanExtensions.Min = function(this1, timeSpan) {
		return ((this1.ticks < timeSpan.ticks) ? this1 : timeSpan);
	};
	$Granular_Extensions_TimeSpanExtensions.Max = function(this1, timeSpan) {
		return ((this1.ticks > timeSpan.ticks) ? this1 : timeSpan);
	};
	global.Granular.Extensions.TimeSpanExtensions = $Granular_Extensions_TimeSpanExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Granular.Extensions.TypeExtensions
	var $Granular_Extensions_TypeExtensions = function() {
	};
	$Granular_Extensions_TypeExtensions.__typeName = 'Granular.Extensions.TypeExtensions';
	$Granular_Extensions_TypeExtensions.GetInstanceProperty = function(type, propertyName) {
		return ss.getMembers(type, 16, 84 | 256, propertyName);
	};
	$Granular_Extensions_TypeExtensions.GetDefaultIndexProperty = function(type) {
		return Enumerable.from(ss.getMembers(type, 16, 28)).firstOrDefault(function(property) {
			return Enumerable.from($System_Reflection_ParameterInfoExtensions.GetIndexParameters(property)).any();
		}, ss.getDefaultValue(Object));
	};
	$Granular_Extensions_TypeExtensions.GetInterfaceType = function(type, interfaceGenericType) {
		return Enumerable.from(ss.getInterfaces(type)).firstOrDefault(function(interfaceType) {
			return ss.referenceEquals(interfaceType, interfaceGenericType) || $System_TypeExtensions.GetIsGenericType(interfaceType) && ss.referenceEquals(interfaceGenericType, ss.getGenericTypeDefinition(interfaceType));
		}, ss.getDefaultValue(Function));
	};
	global.Granular.Extensions.TypeExtensions = $Granular_Extensions_TypeExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.AssemblyExtensions
	var $System_AssemblyExtensions = function() {
	};
	$System_AssemblyExtensions.__typeName = 'System.AssemblyExtensions';
	$System_AssemblyExtensions.GetName = function(assembly) {
		return new $System_AssemblyName(assembly.toString());
	};
	global.System.AssemblyExtensions = $System_AssemblyExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.AssemblyName
	var $System_AssemblyName = function(name) {
		this.$1$NameField = null;
		this.set_Name(name);
	};
	$System_AssemblyName.__typeName = 'System.AssemblyName';
	global.System.AssemblyName = $System_AssemblyName;
	////////////////////////////////////////////////////////////////////////////////
	// System.STAThreadAttribute
	var $System_STAThreadAttribute = function() {
	};
	$System_STAThreadAttribute.__typeName = 'System.STAThreadAttribute';
	global.System.STAThreadAttribute = $System_STAThreadAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// System.TypeExtensions
	var $System_TypeExtensions = function() {
	};
	$System_TypeExtensions.__typeName = 'System.TypeExtensions';
	$System_TypeExtensions.GetIsAbstract = function(type) {
		return false;
	};
	$System_TypeExtensions.GetIsGenericType = function(type) {
		return ss.isValue(ss.getGenericTypeDefinition(type));
	};
	$System_TypeExtensions.GetIsValueType = function(type) {
		return !ss.isClass(type) && !ss.isInterface(type);
	};
	$System_TypeExtensions.GetDefaultConstructor = function(type) {
		return Enumerable.from(ss.getMembers(type, 1, 28)).firstOrDefault(function(constructorInfo) {
			return constructorInfo.name === '.ctor' && constructorInfo.params.length === 0;
		}, ss.getDefaultValue(Object));
	};
	global.System.TypeExtensions = $System_TypeExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.MarkupExtensionParser.TokenType
	var $System_$Xaml_MarkupExtensionParser$TokenType = function() {
	};
	$System_$Xaml_MarkupExtensionParser$TokenType.__typeName = 'System.$Xaml.MarkupExtensionParser$TokenType';
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XmlElementExtensions.XmlEnumerable
	var $System_$Xaml_XmlElementExtensions$XmlEnumerable$1 = function(T) {
		var $type = function(getEnumerator) {
			this.$getEnumerator = null;
			this.$getEnumerator = getEnumerator;
		};
		ss.registerGenericClassInstance($type, $System_$Xaml_XmlElementExtensions$XmlEnumerable$1, [T], {
			getEnumerator: function() {
				return this.$getEnumerator();
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [Function] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }] });
		return $type;
	};
	$System_$Xaml_XmlElementExtensions$XmlEnumerable$1.__typeName = 'System.$Xaml.XmlElementExtensions$XmlEnumerable$1';
	ss.initGenericClass($System_$Xaml_XmlElementExtensions$XmlEnumerable$1, $asm, 1);
	////////////////////////////////////////////////////////////////////////////////
	// System.Collections.Generic.DictionaryExtensions
	var $System_Collections_Generic_DictionaryExtensions = function() {
	};
	$System_Collections_Generic_DictionaryExtensions.__typeName = 'System.Collections.Generic.DictionaryExtensions';
	$System_Collections_Generic_DictionaryExtensions.GetKeys = function(TKey, TValue) {
		return function(dictionary) {
			return dictionary.get_keys();
		};
	};
	$System_Collections_Generic_DictionaryExtensions.GetValues = function(TKey, TValue) {
		return function(dictionary) {
			return dictionary.get_values();
		};
	};
	global.System.Collections.Generic.DictionaryExtensions = $System_Collections_Generic_DictionaryExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Collections.Generic.HashSet
	var $System_Collections_Generic_HashSet$1 = function(T) {
		var $type = function() {
			this.$dictionary = null;
			this.$dictionary = new (ss.makeGenericType(ss.Dictionary$2, [T, Object]))();
		};
		ss.registerGenericClassInstance($type, $System_Collections_Generic_HashSet$1, [T], {
			get_count: function() {
				return this.$dictionary.get_count();
			},
			contains: function(item) {
				return this.$dictionary.containsKey(item);
			},
			add: function(item) {
				this.$dictionary.set_item(item, null);
			},
			remove: function(item) {
				return this.$dictionary.remove(item);
			},
			clear: function() {
				this.$dictionary.clear();
			},
			getEnumerator: function() {
				return ss.getEnumerator(this.$dictionary.get_keys());
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable, ss.ICollection];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [] }, { name: 'Add', type: 8, sname: 'add', returnType: Object, params: [T] }, { name: 'Clear', type: 8, sname: 'clear', returnType: Object, params: [] }, { name: 'Contains', type: 8, sname: 'contains', returnType: Boolean, params: [T] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Remove', type: 8, sname: 'remove', returnType: Boolean, params: [T] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_count', returnType: ss.Int32, params: [] } }] });
		return $type;
	};
	$System_Collections_Generic_HashSet$1.__typeName = 'System.Collections.Generic.HashSet$1';
	ss.initGenericClass($System_Collections_Generic_HashSet$1, $asm, 1);
	global.System.Collections.Generic.HashSet$1 = $System_Collections_Generic_HashSet$1;
	////////////////////////////////////////////////////////////////////////////////
	// System.Collections.Generic.SortedList
	var $System_Collections_Generic_SortedList$2 = function(TKey, TValue) {
		var $type = function(comparer) {
			this.$keys = null;
			this.$readOnlyKeys = null;
			this.$values = null;
			this.$readOnlyValues = null;
			this.$comparer = null;
			this.$comparer = comparer;
			this.$keys = [];
			this.$readOnlyKeys = this.$keys;
			this.$values = [];
			this.$readOnlyValues = this.$values;
		};
		ss.registerGenericClassInstance($type, $System_Collections_Generic_SortedList$2, [TKey, TValue], {
			get_keys: function() {
				return this.$readOnlyKeys;
			},
			get_values: function() {
				return this.$readOnlyValues;
			},
			get_item: function(key) {
				var index = {};
				if (!this.$FindItem(key, index)) {
					throw new $Granular_Exception('Item with key "{0}" does not exist', [key]);
				}
				return this.$values[index.$];
			},
			set_item: function(key, value) {
				var index = {};
				if (!this.$FindItem(key, index)) {
					ss.insert(this.$keys, index.$, key);
					ss.insert(this.$values, index.$, value);
				}
				else {
					this.$keys[index.$] = key;
					this.$values[index.$] = value;
				}
			},
			get_count: function() {
				return this.$keys.length;
			},
			get_IsReadOnly: function() {
				return false;
			},
			containsKey: function(key) {
				var index = {};
				return this.$FindItem(key, index);
			},
			add: function(key, value) {
				var index = {};
				if (this.$FindItem(key, index)) {
					throw new $Granular_Exception('Item with key "{0}" already exists', [key]);
				}
				ss.insert(this.$keys, index.$, key);
				ss.insert(this.$values, index.$, value);
			},
			remove: function(key) {
				var index = {};
				if (!this.$FindItem(key, index)) {
					return false;
				}
				ss.removeAt(this.$keys, index.$);
				ss.removeAt(this.$values, index.$);
				return true;
			},
			RemoveAt: function(index) {
				if (index >= this.get_count()) {
					return false;
				}
				ss.removeAt(this.$keys, index);
				ss.removeAt(this.$values, index);
				return true;
			},
			tryGetValue: function(key, value) {
				var index = {};
				if (!this.$FindItem(key, index)) {
					value.$ = $type.$DefaultValue;
					return false;
				}
				value.$ = this.$values[index.$];
				return true;
			},
			Clear: function() {
				ss.clear(this.$keys);
				ss.clear(this.$values);
			},
			$FindItem: function(key, closestIndex) {
				return this.$FindItem$1(key, 0, this.$keys.length - 1, closestIndex);
			},
			$FindItem$1: function(key, firstIndex, lastIndex, closestIndex) {
				if (firstIndex > lastIndex) {
					closestIndex.$ = firstIndex;
					return false;
				}
				var middleIndex = ss.Int32.div(firstIndex + lastIndex, 2);
				var compareResult = this.$comparer.compare(key, this.$keys[middleIndex]);
				if (compareResult < 0) {
					return this.$FindItem$1(key, firstIndex, middleIndex - 1, closestIndex);
				}
				if (compareResult > 0) {
					return this.$FindItem$1(key, middleIndex + 1, lastIndex, closestIndex);
				}
				closestIndex.$ = middleIndex;
				return true;
			},
			getEnumerator: function() {
				return Enumerable.from(this.$keys).zip(this.$values, function(key, value) {
					return { key: key, value: value };
				}).getEnumerator();
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable, ss.IDictionary];
		});
		ss.setMetadata($type, { members: [{ name: '.ctor', type: 1, params: [ss.IComparer] }, { name: 'Add', type: 8, sname: 'add', returnType: Object, params: [TKey, TValue] }, { name: 'Clear', type: 8, sname: 'Clear', returnType: Object, params: [] }, { name: 'ContainsKey', type: 8, sname: 'containsKey', returnType: Boolean, params: [TKey] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Remove', type: 8, sname: 'remove', returnType: Boolean, params: [TKey] }, { name: 'RemoveAt', type: 8, sname: 'RemoveAt', returnType: Boolean, params: [ss.Int32] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_count', returnType: ss.Int32, params: [] } }, { name: 'IsReadOnly', type: 16, returnType: Boolean, getter: { name: 'get_IsReadOnly', type: 8, sname: 'get_IsReadOnly', returnType: Boolean, params: [] } }, { name: 'Item', type: 16, returnType: TValue, params: [TKey], getter: { name: 'get_Item', type: 8, sname: 'get_item', returnType: TValue, params: [TKey] }, setter: { name: 'set_Item', type: 8, sname: 'set_item', returnType: Object, params: [TKey, TValue] } }, { name: 'Keys', type: 16, returnType: ss.ICollection, getter: { name: 'get_Keys', type: 8, sname: 'get_keys', returnType: ss.ICollection, params: [] } }, { name: 'Values', type: 16, returnType: ss.ICollection, getter: { name: 'get_Values', type: 8, sname: 'get_values', returnType: ss.ICollection, params: [] } }] });
		$type.$DefaultValue = ss.getDefaultValue(TValue);
		return $type;
	};
	$System_Collections_Generic_SortedList$2.__typeName = 'System.Collections.Generic.SortedList$2';
	ss.initGenericClass($System_Collections_Generic_SortedList$2, $asm, 2);
	global.System.Collections.Generic.SortedList$2 = $System_Collections_Generic_SortedList$2;
	////////////////////////////////////////////////////////////////////////////////
	// System.ComponentModel.INotifyPropertyChanged
	var $System_ComponentModel_INotifyPropertyChanged = function() {
	};
	$System_ComponentModel_INotifyPropertyChanged.__typeName = 'System.ComponentModel.INotifyPropertyChanged';
	global.System.ComponentModel.INotifyPropertyChanged = $System_ComponentModel_INotifyPropertyChanged;
	////////////////////////////////////////////////////////////////////////////////
	// System.ComponentModel.PropertyChangedEventArgs
	var $System_ComponentModel_PropertyChangedEventArgs = function(propertyName) {
		this.$2$PropertyNameField = null;
		ss.EventArgs.call(this);
		this.set_PropertyName(propertyName);
	};
	$System_ComponentModel_PropertyChangedEventArgs.__typeName = 'System.ComponentModel.PropertyChangedEventArgs';
	global.System.ComponentModel.PropertyChangedEventArgs = $System_ComponentModel_PropertyChangedEventArgs;
	////////////////////////////////////////////////////////////////////////////////
	// System.Diagnostics.DebuggerNonUserCodeAttribute
	var $System_Diagnostics_DebuggerNonUserCodeAttribute = function() {
	};
	$System_Diagnostics_DebuggerNonUserCodeAttribute.__typeName = 'System.Diagnostics.DebuggerNonUserCodeAttribute';
	global.System.Diagnostics.DebuggerNonUserCodeAttribute = $System_Diagnostics_DebuggerNonUserCodeAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// System.Linq.EnumerableExtensions
	var $System_Linq_EnumerableExtensions = function() {
	};
	$System_Linq_EnumerableExtensions.__typeName = 'System.Linq.EnumerableExtensions';
	$System_Linq_EnumerableExtensions.Min = function(TSource) {
		return function(source) {
			var minimum = Enumerable.from(source).first();
			var $t1 = Enumerable.from(source).skip(1).getEnumerator();
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					if (ss.Comparer.def.compare(minimum, item) > 0) {
						minimum = item;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return minimum;
		};
	};
	$System_Linq_EnumerableExtensions.Max = function(TSource) {
		return function(source) {
			var maximum = Enumerable.from(source).first();
			var $t1 = Enumerable.from(source).skip(1).getEnumerator();
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					if (ss.Comparer.def.compare(maximum, item) < 0) {
						maximum = item;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return maximum;
		};
	};
	$System_Linq_EnumerableExtensions.CopyTo = function(T) {
		return function(source, array, arrayIndex) {
			var i = arrayIndex;
			var $t1 = ss.getEnumerator(source);
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					array[i] = item;
					i++;
				}
			}
			finally {
				$t1.dispose();
			}
		};
	};
	global.System.Linq.EnumerableExtensions = $System_Linq_EnumerableExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Reflection.EventInfoExtensions
	var $System_Reflection_EventInfoExtensions = function() {
	};
	$System_Reflection_EventInfoExtensions.__typeName = 'System.Reflection.EventInfoExtensions';
	$System_Reflection_EventInfoExtensions.GetEventHandlerType = function(eventInfo) {
		return Function;
	};
	global.System.Reflection.EventInfoExtensions = $System_Reflection_EventInfoExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Reflection.ParameterInfo
	var $System_Reflection_ParameterInfo = function(parameterType) {
		this.$1$ParameterTypeField = null;
		this.set_ParameterType(parameterType);
	};
	$System_Reflection_ParameterInfo.__typeName = 'System.Reflection.ParameterInfo';
	global.System.Reflection.ParameterInfo = $System_Reflection_ParameterInfo;
	////////////////////////////////////////////////////////////////////////////////
	// System.Reflection.ParameterInfoExtensions
	var $System_Reflection_ParameterInfoExtensions = function() {
	};
	$System_Reflection_ParameterInfoExtensions.__typeName = 'System.Reflection.ParameterInfoExtensions';
	$System_Reflection_ParameterInfoExtensions.GetParameters = function(constructorInfo) {
		return Enumerable.from(constructorInfo.params).select(function(type) {
			return new $System_Reflection_ParameterInfo(type);
		}).toArray();
	};
	$System_Reflection_ParameterInfoExtensions.GetParameters$1 = function(methodInfo) {
		return Enumerable.from(methodInfo.params).select(function(type) {
			return new $System_Reflection_ParameterInfo(type);
		}).toArray();
	};
	$System_Reflection_ParameterInfoExtensions.GetIndexParameters = function(propertyInfo) {
		return Enumerable.from(propertyInfo.params || []).select(function(type) {
			return new $System_Reflection_ParameterInfo(type);
		}).toArray();
	};
	global.System.Reflection.ParameterInfoExtensions = $System_Reflection_ParameterInfoExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Reflection.PropertyInfoExtensions
	var $System_Reflection_PropertyInfoExtensions = function() {
	};
	$System_Reflection_PropertyInfoExtensions.__typeName = 'System.Reflection.PropertyInfoExtensions';
	$System_Reflection_PropertyInfoExtensions.GetGetMethod = function(propertyInfo) {
		return propertyInfo.getter;
	};
	$System_Reflection_PropertyInfoExtensions.GetSetMethod = function(propertyInfo) {
		return propertyInfo.setter;
	};
	$System_Reflection_PropertyInfoExtensions.IsDelegate = function(propertyInfo) {
		return !ss.endsWithString(propertyInfo.name, 'Type') && ss.isAssignableFrom(Function, propertyInfo.returnType);
	};
	global.System.Reflection.PropertyInfoExtensions = $System_Reflection_PropertyInfoExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Text.RegularExpressions.Capture
	var $System_Text_RegularExpressions_Capture = function(index, value) {
		this.$1$IndexField = 0;
		this.$1$ValueField = null;
		this.set_Index(index);
		this.set_Value($Granular_Extensions_StringExtensions.DefaultIfNullOrEmpty(value, null));
	};
	$System_Text_RegularExpressions_Capture.__typeName = 'System.Text.RegularExpressions.Capture';
	global.System.Text.RegularExpressions.Capture = $System_Text_RegularExpressions_Capture;
	////////////////////////////////////////////////////////////////////////////////
	// System.Text.RegularExpressions.Group
	var $System_Text_RegularExpressions_Group = function(index, value, success) {
		this.$2$SuccessField = false;
		$System_Text_RegularExpressions_Capture.call(this, index, value);
		this.set_Success(success);
	};
	$System_Text_RegularExpressions_Group.__typeName = 'System.Text.RegularExpressions.Group';
	global.System.Text.RegularExpressions.Group = $System_Text_RegularExpressions_Group;
	////////////////////////////////////////////////////////////////////////////////
	// System.Text.RegularExpressions.GroupCollection
	var $System_Text_RegularExpressions_GroupCollection = function(groups) {
		this.$groups = null;
		this.$groups = groups;
	};
	$System_Text_RegularExpressions_GroupCollection.__typeName = 'System.Text.RegularExpressions.GroupCollection';
	global.System.Text.RegularExpressions.GroupCollection = $System_Text_RegularExpressions_GroupCollection;
	////////////////////////////////////////////////////////////////////////////////
	// System.Text.RegularExpressions.Match
	var $System_Text_RegularExpressions_Match = function(regexMatch) {
		this.$3$GroupsField = null;
		this.$regexMatch = null;
		$System_Text_RegularExpressions_Group.call(this, (ss.isValue(regexMatch) ? regexMatch.index : 0), (ss.isValue(regexMatch) ? regexMatch.input : ''), ss.isValue(regexMatch));
		this.$regexMatch = regexMatch;
		if (ss.isNullOrUndefined(regexMatch)) {
			this.set_Groups($System_Text_RegularExpressions_GroupCollection.Empty);
		}
		else {
			var startIndex = regexMatch.index;
			var groups = new Array(regexMatch.length);
			for (var i = 0; i < regexMatch.length; i++) {
				groups[i] = new $System_Text_RegularExpressions_Group(regexMatch.input.indexOf(regexMatch[i], startIndex), regexMatch[i], !ss.isNullOrEmptyString(regexMatch[i]));
				startIndex = groups[i].get_Index();
			}
			this.set_Groups(new $System_Text_RegularExpressions_GroupCollection(groups));
		}
	};
	$System_Text_RegularExpressions_Match.__typeName = 'System.Text.RegularExpressions.Match';
	global.System.Text.RegularExpressions.Match = $System_Text_RegularExpressions_Match;
	////////////////////////////////////////////////////////////////////////////////
	// System.Text.RegularExpressions.RegexExtensions
	var $System_Text_RegularExpressions_RegexExtensions = function() {
	};
	$System_Text_RegularExpressions_RegexExtensions.__typeName = 'System.Text.RegularExpressions.RegexExtensions';
	$System_Text_RegularExpressions_RegexExtensions.Match = function(regex, input) {
		return new $System_Text_RegularExpressions_Match(regex.exec(input));
	};
	global.System.Text.RegularExpressions.RegexExtensions = $System_Text_RegularExpressions_RegexExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.ITokenDefinition
	var $System_Xaml_ITokenDefinition = function() {
	};
	$System_Xaml_ITokenDefinition.__typeName = 'System.Xaml.ITokenDefinition';
	global.System.Xaml.ITokenDefinition = $System_Xaml_ITokenDefinition;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.Lexer
	var $System_Xaml_Lexer = function(tokensDefinition) {
		this.$tokensDefinition = null;
		this.$tokensDefinition = tokensDefinition;
	};
	$System_Xaml_Lexer.__typeName = 'System.Xaml.Lexer';
	global.System.Xaml.Lexer = $System_Xaml_Lexer;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.MarkupExtensionParser
	var $System_Xaml_MarkupExtensionParser = function(text, namespaces) {
		this.$text = null;
		this.$namespaces = null;
		this.$tokens = null;
		this.$text = text;
		this.$namespaces = namespaces;
	};
	$System_Xaml_MarkupExtensionParser.__typeName = 'System.Xaml.MarkupExtensionParser';
	$System_Xaml_MarkupExtensionParser.$BooleanParse = function(value) {
		value = value.toLowerCase();
		if (ss.compare(value, 'true') === 0 || ss.compare(value, 'false') === 0) {
			return ss.compare(value, 'true') === 0;
		}
		throw new $Granular_Exception('Can\'t parse boolean value "{0}"', [value]);
	};
	$System_Xaml_MarkupExtensionParser.Parse = function(text, namespaces) {
		if ($System_Xaml_MarkupExtensionParser.$IsEscaped(text)) {
			return $System_Xaml_MarkupExtensionParser.$GetEscapedText(text);
		}
		if ($System_Xaml_MarkupExtensionParser.$IsMarkupExtension(text)) {
			return (new $System_Xaml_MarkupExtensionParser(text, namespaces)).$Parse();
		}
		return text;
	};
	$System_Xaml_MarkupExtensionParser.$IsMarkupExtension = function(text) {
		text = text.trim();
		return ss.startsWithString(text, '{') && ss.endsWithString(text, '}');
	};
	$System_Xaml_MarkupExtensionParser.$IsEscaped = function(text) {
		return ss.startsWithString(text, '{}');
	};
	$System_Xaml_MarkupExtensionParser.$GetEscapedText = function(text) {
		return text.substring(2);
	};
	global.System.Xaml.MarkupExtensionParser = $System_Xaml_MarkupExtensionParser;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.NamespaceDeclaration
	var $System_Xaml_NamespaceDeclaration = function(namespace1) {
		$System_Xaml_NamespaceDeclaration.$ctor1.call(this, '', namespace1);
		//
	};
	$System_Xaml_NamespaceDeclaration.__typeName = 'System.Xaml.NamespaceDeclaration';
	$System_Xaml_NamespaceDeclaration.$ctor1 = function(prefix, namespace1) {
		this.$1$PrefixField = null;
		this.$1$NamespaceField = null;
		this.set_Prefix(prefix);
		this.set_Namespace(namespace1);
	};
	global.System.Xaml.NamespaceDeclaration = $System_Xaml_NamespaceDeclaration;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.RegexTokenDefinition
	var $System_Xaml_RegexTokenDefinition = function(id, regex) {
		this.$id = null;
		this.$regex = null;
		this.$id = id;
		this.$regex = regex;
	};
	$System_Xaml_RegexTokenDefinition.__typeName = 'System.Xaml.RegexTokenDefinition';
	global.System.Xaml.RegexTokenDefinition = $System_Xaml_RegexTokenDefinition;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.Token
	var $System_Xaml_Token = function(id, value, start) {
		this.$1$IdField = null;
		this.$1$ValueField = null;
		this.$1$StartField = 0;
		this.set_Id(id);
		this.set_Value(value);
		this.set_Start(start);
	};
	$System_Xaml_Token.__typeName = 'System.Xaml.Token';
	global.System.Xaml.Token = $System_Xaml_Token;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlElement
	var $System_Xaml_XamlElement = function(name, namespaces, members, values, directives) {
		this.$2$MembersField = null;
		this.$2$ValuesField = null;
		this.$2$DirectivesField = null;
		$System_Xaml_XamlNode.call(this, name, namespaces);
		this.set_Members(members || $System_Xaml_XamlElement.$EmptyMembers);
		this.set_Values(values || $System_Xaml_XamlElement.$EmptyValues);
		this.set_Directives(directives || $System_Xaml_XamlElement.$EmptyDirectives);
	};
	$System_Xaml_XamlElement.__typeName = 'System.Xaml.XamlElement';
	global.System.Xaml.XamlElement = $System_Xaml_XamlElement;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlLanguage
	var $System_Xaml_XamlLanguage = function() {
	};
	$System_Xaml_XamlLanguage.__typeName = 'System.Xaml.XamlLanguage';
	$System_Xaml_XamlLanguage.IsDirective = function(name) {
		return Enumerable.from($System_Xaml_XamlLanguage.$Directives).contains(name);
	};
	$System_Xaml_XamlLanguage.IsXamlType = function(name) {
		return Enumerable.from($System_Xaml_XamlLanguage.$XamlTypes).contains(name);
	};
	global.System.Xaml.XamlLanguage = $System_Xaml_XamlLanguage;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlMember
	var $System_Xaml_XamlMember = function(name, namespaces, values) {
		this.$2$ValuesField = null;
		$System_Xaml_XamlNode.call(this, name, namespaces);
		this.set_Values(values || $System_Xaml_XamlMember.$EmptyValues);
	};
	$System_Xaml_XamlMember.__typeName = 'System.Xaml.XamlMember';
	$System_Xaml_XamlMember.$ctor1 = function(name, namespaces, value) {
		$System_Xaml_XamlMember.call(this, name, namespaces, [value]);
		//
	};
	global.System.Xaml.XamlMember = $System_Xaml_XamlMember;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlMemberExtensions
	var $System_Xaml_XamlMemberExtensions = function() {
	};
	$System_Xaml_XamlMemberExtensions.__typeName = 'System.Xaml.XamlMemberExtensions';
	$System_Xaml_XamlMemberExtensions.GetSingleValue = function(member) {
		if (!Enumerable.from(member.get_Values()).any()) {
			throw new $Granular_Exception('Member "{0}" doesn\'t have values', [member.get_Name()]);
		}
		if (Enumerable.from(member.get_Values()).count() > 1) {
			throw new $Granular_Exception('Member "{0}" cannot have multiple values', [member.get_Name()]);
		}
		return Enumerable.from(member.get_Values()).first();
	};
	global.System.Xaml.XamlMemberExtensions = $System_Xaml_XamlMemberExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlName
	var $System_Xaml_XamlName = function(localName, namespaceName) {
		this.$1$LocalNameField = null;
		this.$1$NamespaceNameField = null;
		this.$1$IsMemberNameField = false;
		this.$1$MemberNameField = null;
		this.$1$ContainingTypeNameField = null;
		this.set_LocalName(ss.coalesce(localName, ''));
		this.set_NamespaceName(ss.coalesce(namespaceName, ''));
		var typeSeparatorIndex = this.get_LocalName().indexOf(String.fromCharCode(46));
		if (typeSeparatorIndex !== -1) {
			this.set_MemberName(this.get_LocalName().substring(typeSeparatorIndex + 1));
			this.set_ContainingTypeName(new $System_Xaml_XamlName(this.get_LocalName().substr(0, typeSeparatorIndex), this.get_NamespaceName()));
			this.set_IsMemberName(true);
		}
		else {
			this.set_MemberName(this.get_LocalName());
		}
	};
	$System_Xaml_XamlName.__typeName = 'System.Xaml.XamlName';
	$System_Xaml_XamlName.op_Equality = function(name1, name2) {
		return ss.referenceEquals(name1, null) && ss.referenceEquals(name2, null) || !ss.referenceEquals(name1, null) && name1.equals(name2);
	};
	$System_Xaml_XamlName.op_Inequality = function(name1, name2) {
		return !$System_Xaml_XamlName.op_Equality(name1, name2);
	};
	$System_Xaml_XamlName.FromPrefixedName = function(prefixedName, namespaces) {
		var typeName = prefixedName;
		var typeNamespacePrefix = '';
		var namespaceSeparatorIndex = prefixedName.indexOf(':');
		if (namespaceSeparatorIndex !== -1) {
			typeNamespacePrefix = prefixedName.substr(0, namespaceSeparatorIndex);
			typeName = prefixedName.substring(namespaceSeparatorIndex + 1);
		}
		return (namespaces.Contains(typeNamespacePrefix) ? new $System_Xaml_XamlName(typeName, namespaces.Get(typeNamespacePrefix)) : $System_Xaml_XamlName.Empty);
	};
	global.System.Xaml.XamlName = $System_Xaml_XamlName;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlNamespaces
	var $System_Xaml_XamlNamespaces = function(items) {
		this.$items = null;
		this.$items = items;
	};
	$System_Xaml_XamlNamespaces.__typeName = 'System.Xaml.XamlNamespaces';
	$System_Xaml_XamlNamespaces.$ctor1 = function(namespace1) {
		$System_Xaml_XamlNamespaces.call(this, [new $System_Xaml_NamespaceDeclaration(namespace1)]);
		//
	};
	$System_Xaml_XamlNamespaces.$ctor2 = function(prefix, namespace1) {
		$System_Xaml_XamlNamespaces.call(this, [new $System_Xaml_NamespaceDeclaration.$ctor1(prefix, namespace1)]);
		//
	};
	global.System.Xaml.XamlNamespaces = $System_Xaml_XamlNamespaces;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlNamespacesExtensions
	var $System_Xaml_XamlNamespacesExtensions = function() {
	};
	$System_Xaml_XamlNamespacesExtensions.__typeName = 'System.Xaml.XamlNamespacesExtensions';
	$System_Xaml_XamlNamespacesExtensions.ContainsDefault = function(this1) {
		return this1.Contains('');
	};
	$System_Xaml_XamlNamespacesExtensions.GetDefault = function(this1) {
		return this1.Get('');
	};
	global.System.Xaml.XamlNamespacesExtensions = $System_Xaml_XamlNamespacesExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlNode
	var $System_Xaml_XamlNode = function(name, namespaces) {
		this.$1$NameField = null;
		this.$1$NamespacesField = null;
		this.set_Name(name);
		this.set_Namespaces(namespaces);
	};
	$System_Xaml_XamlNode.__typeName = 'System.Xaml.XamlNode';
	global.System.Xaml.XamlNode = $System_Xaml_XamlNode;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XamlParser
	var $System_Xaml_XamlParser = function() {
	};
	$System_Xaml_XamlParser.__typeName = 'System.Xaml.XamlParser';
	$System_Xaml_XamlParser.Parse = function(content) {
		var domParser = new DOMParser();
		var xmlElement = domParser.parseFromString(content, 'application/xml').documentElement;
		if (xmlElement.nodeName === 'parsererror' || ss.isValue(xmlElement.firstChild) && xmlElement.firstChild.nodeName === 'parsererror') {
			throw new $Granular_Exception($System_Xaml_XamlParser.$GetParserErrorMessage(xmlElement.textContent), []);
		}
		return $System_Xaml_XamlParser.$Parse(xmlElement);
	};
	$System_Xaml_XamlParser.$Parse = function(element) {
		return $System_Xaml_XamlParser.$CreateXamlElement(element, $System_Xaml_XamlNamespaces.Empty);
	};
	$System_Xaml_XamlParser.$CreateXamlElement = function(element, namespaces) {
		var elementNamespaces = Enumerable.from($System_Xaml_XmlElementExtensions.Attributes(element)).where($System_Xaml_XamlParser.$IsNamespaceDeclaration).select(function(attribute) {
			return new $System_Xaml_NamespaceDeclaration.$ctor1($System_Xaml_XamlParser.$GetNamespaceDeclarationPrefix(attribute), attribute.value);
		}).toArray();
		if (Enumerable.from(elementNamespaces).any()) {
			namespaces = namespaces.Merge(elementNamespaces);
		}
		return new $System_Xaml_XamlElement(new $System_Xaml_XamlName(element.localName, element.namespaceURI), namespaces, $System_Xaml_XamlParser.$CreateXamlMembers(element, namespaces), $System_Xaml_XamlParser.$CreateValues(element, namespaces), $System_Xaml_XamlParser.$CreateDirectives(element, namespaces));
	};
	$System_Xaml_XamlParser.$CreateXamlMembers = function(element, namespaces) {
		var attributeMembers = Enumerable.from($System_Xaml_XmlElementExtensions.Attributes(element)).where(function(attribute) {
			return !$System_Xaml_XamlParser.$IsDirective(attribute) && !$System_Xaml_XamlParser.$IsNamespaceDeclaration(attribute);
		}).select(function(attribute1) {
			return $System_Xaml_XamlParser.$CreateXamlMember(attribute1, namespaces);
		});
		var elementMembers = Enumerable.from($System_Xaml_XmlElementExtensions.Elements(element)).where(function(child) {
			return $System_Xaml_XamlParser.$IsMemberName(child);
		}).select(function(child1) {
			return $System_Xaml_XamlParser.$CreateXamlMember$1(child1, namespaces);
		});
		return Enumerable.from(attributeMembers).concat(elementMembers).toArray();
	};
	$System_Xaml_XamlParser.$CreateXamlMember = function(attribute, namespaces) {
		var name = new $System_Xaml_XamlName(attribute.localName, ($Granular_Extensions_StringExtensions.IsNullOrEmpty(attribute.namespaceURI) ? namespaces.Get('') : attribute.namespaceURI));
		var value = $System_Xaml_MarkupExtensionParser.Parse(attribute.value, namespaces);
		return new $System_Xaml_XamlMember.$ctor1(name, namespaces, value);
	};
	$System_Xaml_XamlParser.$CreateXamlMember$1 = function(element, namespaces) {
		var name = new $System_Xaml_XamlName(element.localName, ($Granular_Extensions_StringExtensions.IsNullOrEmpty(element.namespaceURI) ? namespaces.Get('') : element.namespaceURI));
		if (Enumerable.from($System_Xaml_XmlElementExtensions.Attributes(element)).any()) {
			throw new $Granular_Exception('Member "{0}" cannot contain attributes', [element.localName]);
		}
		if (Enumerable.from($System_Xaml_XmlElementExtensions.Elements(element)).any(function(child) {
			return $System_Xaml_XamlParser.$IsMemberName(child);
		})) {
			throw new $Granular_Exception('Member "{0}" cannot contain member elements', [element.localName]);
		}
		return new $System_Xaml_XamlMember(name, namespaces, $System_Xaml_XamlParser.$CreateValues(element, namespaces));
	};
	$System_Xaml_XamlParser.$CreateDirectives = function(element, namespaces) {
		var attributeDirectives = Enumerable.from($System_Xaml_XmlElementExtensions.Attributes(element)).where(function(attribute) {
			return $System_Xaml_XamlParser.$IsDirective(attribute) && !$System_Xaml_XamlParser.$IsNamespaceDeclaration(attribute);
		}).select(function(attribute1) {
			return $System_Xaml_XamlParser.$CreateXamlMember(attribute1, namespaces);
		});
		var elementDirectives = Enumerable.from($System_Xaml_XmlElementExtensions.Elements(element)).where(function(child) {
			return $System_Xaml_XamlParser.$IsDirective$1(child);
		}).select(function(child1) {
			return $System_Xaml_XamlParser.$CreateXamlMember$1(child1, namespaces);
		});
		return Enumerable.from(attributeDirectives).concat(elementDirectives).toArray();
	};
	$System_Xaml_XamlParser.$CreateValues = function(element, namespaces) {
		return Enumerable.from($System_Xaml_XmlElementExtensions.Nodes(element)).where(function(node) {
			return $System_Xaml_XamlParser.$IsValue(node);
		}).select(function(node1) {
			return $System_Xaml_XamlParser.$CreateValue(node1, namespaces);
		}).toArray();
	};
	$System_Xaml_XamlParser.$IsValue = function(node) {
		return ss.isInstanceOfType(node, Text) && !$Granular_Extensions_StringExtensions.IsNullOrWhitespace(ss.cast(node, Text).nodeValue) || ss.isInstanceOfType(node, Element) && $System_Xaml_XamlParser.$IsValueName(ss.cast(node, Element));
	};
	$System_Xaml_XamlParser.$CreateValue = function(node, namespaces) {
		if (ss.isInstanceOfType(node, Text)) {
			return ss.cast(node, Text).nodeValue.trim();
		}
		if (ss.isInstanceOfType(node, Element)) {
			return $System_Xaml_XamlParser.$CreateXamlElement(ss.cast(node, Element), namespaces);
		}
		throw new $Granular_Exception('Node "{0}" doesn\'t contain a value', [node]);
	};
	$System_Xaml_XamlParser.$IsMemberName = function(element) {
		return element.localName.indexOf('.') !== -1 && !$System_Xaml_XamlParser.$IsDirective$1(element);
	};
	$System_Xaml_XamlParser.$IsValueName = function(element) {
		return !(element.localName.indexOf('.') !== -1) && !$System_Xaml_XamlParser.$IsDirective$1(element);
	};
	$System_Xaml_XamlParser.$IsDirective = function(attribute) {
		return ss.referenceEquals($System_Xaml_XamlLanguage.NamespaceName, attribute.namespaceURI) && $System_Xaml_XamlLanguage.IsDirective(new $System_Xaml_XamlName(attribute.localName, attribute.namespaceURI));
	};
	$System_Xaml_XamlParser.$IsDirective$1 = function(element) {
		return ss.referenceEquals($System_Xaml_XamlLanguage.NamespaceName, element.namespaceURI) && $System_Xaml_XamlLanguage.IsDirective(new $System_Xaml_XamlName(element.localName, element.namespaceURI));
	};
	$System_Xaml_XamlParser.$IsNamespaceDeclaration = function(attribute) {
		var name = attribute.name.toLowerCase();
		return name === 'xmlns' || ss.startsWithString(name, 'xmlns:');
	};
	$System_Xaml_XamlParser.$GetNamespaceDeclarationPrefix = function(attribute) {
		return ($Granular_Extensions_StringExtensions.IsNullOrEmpty(attribute.prefix) ? '' : attribute.localName);
	};
	$System_Xaml_XamlParser.$GetParserErrorMessage = function(textContent) {
		var errorMessage = ss.replaceAllString(textContent, '\n', ' ');
		if (ss.endsWithString(errorMessage, '^')) {
			errorMessage = errorMessage.substr(0, errorMessage.lastIndexOf(' '));
		}
		if (!ss.startsWithString(errorMessage.toLowerCase(), 'xml')) {
			errorMessage = ss.formatString('Xml parser error: {0}', errorMessage);
		}
		return errorMessage;
	};
	global.System.Xaml.XamlParser = $System_Xaml_XamlParser;
	////////////////////////////////////////////////////////////////////////////////
	// System.Xaml.XmlElementExtensions
	var $System_Xaml_XmlElementExtensions = function() {
	};
	$System_Xaml_XmlElementExtensions.__typeName = 'System.Xaml.XmlElementExtensions';
	$System_Xaml_XmlElementExtensions.Nodes = function(xmlElement) {
		return new (ss.makeGenericType($System_$Xaml_XmlElementExtensions$XmlEnumerable$1, [Node]))(function() {
			return new ss.ArrayEnumerator(xmlElement.childNodes);
		});
	};
	$System_Xaml_XmlElementExtensions.Elements = function(xmlElement) {
		return Enumerable.from($System_Xaml_XmlElementExtensions.Nodes(xmlElement)).ofType(Element);
	};
	$System_Xaml_XmlElementExtensions.Attributes = function(xmlElement) {
		return new (ss.makeGenericType($System_$Xaml_XmlElementExtensions$XmlEnumerable$1, [Attr]))(function() {
			return new ss.ArrayEnumerator(xmlElement.attributes);
		});
	};
	global.System.Xaml.XmlElementExtensions = $System_Xaml_XmlElementExtensions;
	ss.initClass($Granular_Exception, $asm, {
		toString: function() {
			return this.get_message();
		}
	}, ss.Exception);
	ss.initClass($Granular_Collections_IListDictionaryExtensions, $asm, {});
	ss.initInterface($Granular_Collections_INotifyCollectionChanged, $asm, { add_CollectionChanged: null, remove_CollectionChanged: null });
	ss.initEnum($Granular_Collections_NotifyCollectionChangedAction, $asm, { Add: 0, Remove: 1, Replace: 2, Move: 3, Reset: 4 });
	ss.initClass($Granular_Collections_NotifyCollectionChangedEventArgs, $asm, {
		get_Action: function() {
			return this.$2$ActionField;
		},
		set_Action: function(value) {
			this.$2$ActionField = value;
		},
		get_NewItems: function() {
			return this.$2$NewItemsField;
		},
		set_NewItems: function(value) {
			this.$2$NewItemsField = value;
		},
		get_NewStartingIndex: function() {
			return this.$2$NewStartingIndexField;
		},
		set_NewStartingIndex: function(value) {
			this.$2$NewStartingIndexField = value;
		},
		get_OldItems: function() {
			return this.$2$OldItemsField;
		},
		set_OldItems: function(value) {
			this.$2$OldItemsField = value;
		},
		get_OldStartingIndex: function() {
			return this.$2$OldStartingIndexField;
		},
		set_OldStartingIndex: function(value) {
			this.$2$OldStartingIndexField = value;
		}
	}, ss.EventArgs);
	ss.initClass($Granular_Collections_NotifyCollectionChangedEventHandlerExtensions, $asm, {});
	ss.initInterface($System_ComponentModel_INotifyPropertyChanged, $asm, { add_PropertyChanged: null, remove_PropertyChanged: null });
	ss.initClass($Granular_Compatibility_Array, $asm, {});
	ss.initClass($Granular_Compatibility_BindingFlags, $asm, {});
	ss.initClass($Granular_Compatibility_Collection, $asm, {});
	ss.initClass($Granular_Compatibility_Convert, $asm, {});
	ss.initClass($Granular_Compatibility_Dictionary, $asm, {});
	ss.initClass($Granular_Compatibility_Double, $asm, {});
	ss.initClass($Granular_Compatibility_RuntimeHelpers, $asm, {});
	ss.initClass($Granular_Compatibility_String, $asm, {});
	ss.initClass($Granular_Compatibility_TimeSpan, $asm, {});
	ss.initClass($Granular_Compatibility_Type, $asm, {});
	ss.initClass($Granular_Diagnostics_HitCounter, $asm, {
		Hit: function() {
			this.$totalHitsCount++;
			var now = new Date();
			var interval = $Granular_Compatibility_TimeSpan.Subtract(now, this.$lastReportTime);
			if (interval.ticks >= (new ss.TimeSpan(1 * 10000000)).ticks) {
				var rate = ss.round((this.$totalHitsCount - this.$lastHitsCount) / (interval.ticks / 10000000), 1);
				var additionalStatus = (!ss.staticEquals(this.$getAdditionalStatus, null) ? this.$getAdditionalStatus() : '');
				if ($Granular_Extensions_StringExtensions.IsNullOrEmpty(additionalStatus)) {
					console.log(ss.formatString('{0} - Total: {1} hits, Rate: {2} hits/sec', this.$name, this.$totalHitsCount, rate));
				}
				else {
					console.log(ss.formatString('{0} - Total: {1} hits, Rate: {2} hits/sec - {3}', this.$name, this.$totalHitsCount, rate, additionalStatus));
				}
				this.$lastReportTime = now;
				this.$lastHitsCount = this.$totalHitsCount;
			}
		}
	});
	ss.initClass($Granular_Extensions_AssemblyExtensions, $asm, {});
	ss.initClass($Granular_Extensions_CollectionExtensions, $asm, {});
	ss.initClass($Granular_Extensions_DoubleExtensions, $asm, {});
	ss.initClass($Granular_Extensions_EventHandlerExtensions, $asm, {});
	ss.initClass($Granular_Extensions_IntExtensions, $asm, {});
	ss.initClass($Granular_Extensions_ListExtensions, $asm, {});
	ss.initClass($Granular_Extensions_StringExtensions, $asm, {});
	ss.initClass($Granular_Extensions_TimeSpanExtensions, $asm, {});
	ss.initClass($Granular_Extensions_TypeExtensions, $asm, {});
	ss.initClass($System_AssemblyExtensions, $asm, {});
	ss.initClass($System_AssemblyName, $asm, {
		get_Name: function() {
			return this.$1$NameField;
		},
		set_Name: function(value) {
			this.$1$NameField = value;
		}
	});
	ss.initClass($System_STAThreadAttribute, $asm, {});
	ss.initClass($System_TypeExtensions, $asm, {});
	ss.initEnum($System_$Xaml_MarkupExtensionParser$TokenType, $asm, { $Terminal: 0, $Identifier: 1, $String: 2, $Boolean: 3, $Integer: 4, $Decimal: 5 });
	ss.initClass($System_Collections_Generic_DictionaryExtensions, $asm, {});
	ss.initClass($System_ComponentModel_PropertyChangedEventArgs, $asm, {
		get_PropertyName: function() {
			return this.$2$PropertyNameField;
		},
		set_PropertyName: function(value) {
			this.$2$PropertyNameField = value;
		}
	}, ss.EventArgs);
	ss.initClass($System_Diagnostics_DebuggerNonUserCodeAttribute, $asm, {});
	ss.initClass($System_Linq_EnumerableExtensions, $asm, {});
	ss.initClass($System_Reflection_EventInfoExtensions, $asm, {});
	ss.initClass($System_Reflection_ParameterInfo, $asm, {
		get_ParameterType: function() {
			return this.$1$ParameterTypeField;
		},
		set_ParameterType: function(value) {
			this.$1$ParameterTypeField = value;
		}
	});
	ss.initClass($System_Reflection_ParameterInfoExtensions, $asm, {});
	ss.initClass($System_Reflection_PropertyInfoExtensions, $asm, {});
	ss.initClass($System_Text_RegularExpressions_Capture, $asm, {
		get_Index: function() {
			return this.$1$IndexField;
		},
		set_Index: function(value) {
			this.$1$IndexField = value;
		},
		get_Value: function() {
			return this.$1$ValueField;
		},
		set_Value: function(value) {
			this.$1$ValueField = value;
		},
		get_Length: function() {
			return this.get_Value().length;
		},
		toString: function() {
			return this.get_Value();
		}
	});
	ss.initClass($System_Text_RegularExpressions_Group, $asm, {
		get_Success: function() {
			return this.$2$SuccessField;
		},
		set_Success: function(value) {
			this.$2$SuccessField = value;
		}
	}, $System_Text_RegularExpressions_Capture);
	ss.initClass($System_Text_RegularExpressions_GroupCollection, $asm, {
		get_Count: function() {
			return Enumerable.from(this.$groups).count();
		},
		get_Item: function(groupnum) {
			return Enumerable.from(this.$groups).elementAt(groupnum);
		},
		getEnumerator: function() {
			return ss.getEnumerator(this.$groups);
		}
	}, null, [ss.IEnumerable, ss.IEnumerable]);
	ss.initClass($System_Text_RegularExpressions_Match, $asm, {
		get_Groups: function() {
			return this.$3$GroupsField;
		},
		set_Groups: function(value) {
			this.$3$GroupsField = value;
		}
	}, $System_Text_RegularExpressions_Group);
	ss.initClass($System_Text_RegularExpressions_RegexExtensions, $asm, {});
	ss.initInterface($System_Xaml_ITokenDefinition, $asm, { Match: null });
	ss.initClass($System_Xaml_Lexer, $asm, {
		GetTokens: function(stream) {
			return new ss.IteratorBlockEnumerable(function() {
				return (function(stream) {
					var $result, $state = 0, start, match, selectedToken, $t1, tokenDefinition, matchedToken;
					return new ss.IteratorBlockEnumerator(function() {
						$sm1:
						for (;;) {
							switch ($state) {
								case 0: {
									$state = -1;
									start = 0;
									$state = 1;
									continue $sm1;
								}
								case 1: {
									$state = -1;
									if (!(start < stream.length)) {
										$state = -1;
										break $sm1;
									}
									match = $System_Text_RegularExpressions_RegexExtensions.Match($System_Xaml_Lexer.$WhiteSpaceRegex, stream.substring(start));
									if (match.get_Success() && match.get_Groups().get_Item(0).get_Index() === 0) {
										start += match.get_Groups().get_Item(0).get_Length();
									}
									selectedToken = null;
									$t1 = ss.getEnumerator(this.$tokensDefinition);
									try {
										while ($t1.moveNext()) {
											tokenDefinition = $t1.current();
											matchedToken = tokenDefinition.Match(stream, start);
											if (ss.isValue(matchedToken) && (ss.isNullOrUndefined(selectedToken) || matchedToken.get_Value().length > selectedToken.get_Value().length)) {
												selectedToken = matchedToken;
											}
										}
									}
									finally {
										$t1.dispose();
									}
									if (ss.isNullOrUndefined(selectedToken)) {
										throw new $Granular_Exception("Can't parse \"{0}\" at index {1} ('{2}' is unexpected)", [stream, start, String.fromCharCode(stream.charCodeAt(start))]);
									}
									start += selectedToken.get_Value().length;
									$result = selectedToken;
									$state = 1;
									return true;
								}
								default: {
									break $sm1;
								}
							}
						}
						return false;
					}, function() {
						return $result;
					}, null, this);
				}).call(this, stream);
			}, this);
		}
	});
	ss.initClass($System_Xaml_MarkupExtensionParser, $asm, {
		$Parse: function() {
			this.$tokens = new (ss.makeGenericType($Granular_Collections_ReadOnlyStack$1, [$System_Xaml_Token]))($System_Xaml_MarkupExtensionParser.$lexer.GetTokens(this.$text));
			var root = this.$MatchElement();
			if (!this.$tokens.get_IsEmpty()) {
				throw new $Granular_Exception('Can\'t parse "{0}", end of stream is expected at index {1}', [this.$text, this.$tokens.Peek().get_Start()]);
			}
			return root;
		},
		$MatchElement: function() {
			this.$VerifyTokensExists();
			this.$MatchTerminal('{');
			var typeFullName = this.$MatchIdentifier();
			var membersList = this.$MatchMembersList();
			this.$MatchTerminal('}');
			return new $System_Xaml_XamlElement(new $System_Xaml_XamlName(this.$GetTypeName(typeFullName), this.$GetTypeNamespace(typeFullName)), this.$namespaces, membersList, null, null);
		},
		$MatchMembersList: function() {
			this.$VerifyTokensExists();
			var list = [];
			if (this.$tokens.Peek().get_Value() !== '}') {
				list.push(this.$MatchMember());
				ss.arrayAddRange(list, this.$MatchMembersListEnd());
			}
			return list;
		},
		$MatchMembersListEnd: function() {
			this.$VerifyTokensExists();
			var list = [];
			if (this.$tokens.Peek().get_Value() !== '}') {
				this.$MatchTerminal(',');
				list.push(this.$MatchMember());
				ss.arrayAddRange(list, this.$MatchMembersListEnd());
			}
			return list;
		},
		$MatchMember: function() {
			this.$VerifyTokensExists();
			var name = '';
			var value;
			if (ss.cast(this.$tokens.Peek().get_Id(), ss.Int32) === 1) {
				var identifier = this.$MatchIdentifier();
				value = this.$MatchNamedValue();
				if (ss.isNullOrUndefined(value)) {
					value = identifier;
				}
				else {
					name = identifier;
				}
			}
			else {
				value = this.$MatchValue();
			}
			return new $System_Xaml_XamlMember.$ctor1(new $System_Xaml_XamlName(name, null), this.$namespaces, value);
		},
		$MatchNamedValue: function() {
			this.$VerifyTokensExists();
			var token = this.$tokens.Peek();
			if (ss.cast(token.get_Id(), ss.Int32) !== 0 || token.get_Value() !== '=') {
				return null;
			}
			this.$MatchTerminal('=');
			return this.$MatchValue();
		},
		$MatchValue: function() {
			this.$VerifyTokensExists();
			if (ss.cast(this.$tokens.Peek().get_Id(), ss.Int32) === 0) {
				return this.$MatchElement();
			}
			var token = this.$tokens.Pop();
			var constValue;
			switch (ss.cast(token.get_Id(), ss.Int32)) {
				case 1: {
					constValue = token.get_Value();
					break;
				}
				case 2: {
					constValue = ss.replaceAllString(token.get_Value().substr(1, token.get_Value().length - 2), "''", "'");
					break;
				}
				case 3: {
					constValue = $System_Xaml_MarkupExtensionParser.$BooleanParse(token.get_Value());
					break;
				}
				case 4: {
					constValue = parseInt(token.get_Value());
					break;
				}
				case 5: {
					constValue = parseFloat(token.get_Value());
					break;
				}
				default: {
					throw new $Granular_Exception('Can\'t parse "{0}", value is expected, "{1}" was found at index {2}', [this.$text, token.get_Value(), token.get_Start()]);
				}
			}
			return constValue;
		},
		$MatchIdentifier: function() {
			this.$VerifyTokensExists();
			var token = this.$tokens.Pop();
			if (ss.cast(token.get_Id(), ss.Int32) !== 1) {
				throw new $Granular_Exception('Can\'t parse "{0}", identifier is expected, "{1}" was found at index {2}', [this.$text, token.get_Value(), token.get_Start()]);
			}
			return token.get_Value();
		},
		$MatchTerminal: function(terminal) {
			this.$VerifyTokensExists();
			var token = this.$tokens.Pop();
			if (ss.cast(token.get_Id(), ss.Int32) !== 0 || !ss.referenceEquals(token.get_Value(), terminal)) {
				throw new $Granular_Exception('Can\'t parse "{0}", "{1}" is expected, "{2}" was found at index {3}', [this.$text, terminal, token.get_Value(), token.get_Start()]);
			}
			return token;
		},
		$VerifyTokensExists: function() {
			if (this.$tokens.get_IsEmpty()) {
				throw new $Granular_Exception('Can\'t parse "{0}", stream was terminated unexpectedly', [this.$text]);
			}
		},
		$GetTypeName: function(typeFullName) {
			var namespaceSeparatorIndex = typeFullName.indexOf(':');
			return ((namespaceSeparatorIndex !== -1) ? typeFullName.substring(namespaceSeparatorIndex + 1) : typeFullName);
		},
		$GetTypeNamespace: function(typeFullName) {
			var namespaceSeparatorIndex = typeFullName.indexOf(':');
			return this.$namespaces.Get(((namespaceSeparatorIndex !== -1) ? typeFullName.substr(0, namespaceSeparatorIndex) : ''));
		}
	});
	ss.initClass($System_Xaml_NamespaceDeclaration, $asm, {
		get_Prefix: function() {
			return this.$1$PrefixField;
		},
		set_Prefix: function(value) {
			this.$1$PrefixField = value;
		},
		get_Namespace: function() {
			return this.$1$NamespaceField;
		},
		set_Namespace: function(value) {
			this.$1$NamespaceField = value;
		},
		equals: function(obj) {
			var other = ss.safeCast(obj, $System_Xaml_NamespaceDeclaration);
			return ss.referenceEquals(this, other) || !ss.referenceEquals(other, null) && ss.referenceEquals(this.get_Prefix(), other.get_Prefix()) && ss.referenceEquals(this.get_Namespace(), other.get_Namespace());
		},
		getHashCode: function() {
			return ss.getHashCode(this.get_Prefix()) ^ ss.getHashCode(this.get_Prefix());
		}
	});
	$System_Xaml_NamespaceDeclaration.$ctor1.prototype = $System_Xaml_NamespaceDeclaration.prototype;
	ss.initClass($System_Xaml_RegexTokenDefinition, $asm, {
		Match: function(stream, start) {
			var match = $System_Text_RegularExpressions_RegexExtensions.Match(this.$regex, stream.substring(start));
			if (match.get_Success() && match.get_Index() === 0) {
				return new $System_Xaml_Token(this.$id, match.get_Groups().get_Item(0).get_Value(), start);
			}
			return null;
		}
	}, null, [$System_Xaml_ITokenDefinition]);
	ss.initClass($System_Xaml_Token, $asm, {
		get_Id: function() {
			return this.$1$IdField;
		},
		set_Id: function(value) {
			this.$1$IdField = value;
		},
		get_Value: function() {
			return this.$1$ValueField;
		},
		set_Value: function(value) {
			this.$1$ValueField = value;
		},
		get_Start: function() {
			return this.$1$StartField;
		},
		set_Start: function(value) {
			this.$1$StartField = value;
		},
		toString: function() {
			return ss.formatString('{0} "{1}" ({2})', this.get_Id(), this.get_Value(), this.get_Start());
		}
	});
	ss.initClass($System_Xaml_XamlNode, $asm, {
		get_Name: function() {
			return this.$1$NameField;
		},
		set_Name: function(value) {
			this.$1$NameField = value;
		},
		get_Namespaces: function() {
			return this.$1$NamespacesField;
		},
		set_Namespaces: function(value) {
			this.$1$NamespacesField = value;
		},
		toString: function() {
			return this.get_Name().toString();
		}
	});
	ss.initClass($System_Xaml_XamlElement, $asm, {
		get_Members: function() {
			return this.$2$MembersField;
		},
		set_Members: function(value) {
			this.$2$MembersField = value;
		},
		get_Values: function() {
			return this.$2$ValuesField;
		},
		set_Values: function(value) {
			this.$2$ValuesField = value;
		},
		get_Directives: function() {
			return this.$2$DirectivesField;
		},
		set_Directives: function(value) {
			this.$2$DirectivesField = value;
		}
	}, $System_Xaml_XamlNode);
	ss.initClass($System_Xaml_XamlLanguage, $asm, {});
	ss.initClass($System_Xaml_XamlMember, $asm, {
		get_Values: function() {
			return this.$2$ValuesField;
		},
		set_Values: function(value) {
			this.$2$ValuesField = value;
		},
		toString: function() {
			return ((Enumerable.from(this.get_Values()).count() === 1) ? ss.formatString('{0}={1}', $System_Xaml_XamlNode.prototype.toString.call(this), Enumerable.from(this.get_Values()).first().toString()) : $System_Xaml_XamlNode.prototype.toString.call(this));
		}
	}, $System_Xaml_XamlNode);
	$System_Xaml_XamlMember.$ctor1.prototype = $System_Xaml_XamlMember.prototype;
	ss.initClass($System_Xaml_XamlMemberExtensions, $asm, {});
	ss.initClass($System_Xaml_XamlName, $asm, {
		get_LocalName: function() {
			return this.$1$LocalNameField;
		},
		set_LocalName: function(value) {
			this.$1$LocalNameField = value;
		},
		get_NamespaceName: function() {
			return this.$1$NamespaceNameField;
		},
		set_NamespaceName: function(value) {
			this.$1$NamespaceNameField = value;
		},
		get_IsMemberName: function() {
			return this.$1$IsMemberNameField;
		},
		set_IsMemberName: function(value) {
			this.$1$IsMemberNameField = value;
		},
		get_MemberName: function() {
			return this.$1$MemberNameField;
		},
		set_MemberName: function(value) {
			this.$1$MemberNameField = value;
		},
		get_ContainingTypeName: function() {
			return this.$1$ContainingTypeNameField;
		},
		set_ContainingTypeName: function(value) {
			this.$1$ContainingTypeNameField = value;
		},
		get_IsEmpty: function() {
			return $Granular_Extensions_StringExtensions.IsNullOrEmpty(this.get_LocalName());
		},
		toString: function() {
			return ($Granular_Extensions_StringExtensions.IsNullOrEmpty(this.get_NamespaceName()) ? this.get_LocalName() : ss.formatString('{0}:{1}', this.get_NamespaceName(), this.get_LocalName()));
		},
		getHashCode: function() {
			return ss.getHashCode(this.get_LocalName()) ^ ss.getHashCode(this.get_NamespaceName());
		},
		equals: function(obj) {
			var other = ss.safeCast(obj, $System_Xaml_XamlName);
			return ss.referenceEquals(this, other) || !ss.referenceEquals(other, null) && ss.referenceEquals(this.get_LocalName(), other.get_LocalName()) && ss.referenceEquals(this.get_NamespaceName(), other.get_NamespaceName());
		}
	});
	ss.initClass($System_Xaml_XamlNamespaces, $asm, {
		toString: function() {
			var count = Enumerable.from(this.$items).count();
			return ((count === 0) ? 'XamlNamespaces.Empty' : ss.formatString('XamlNamespaces[{0}]', count));
		},
		Contains: function(prefix) {
			return Enumerable.from(this.$items).any(function(item) {
				return ss.referenceEquals(item.get_Prefix(), prefix);
			});
		},
		Get: function(prefix) {
			var namespaceDeclaration = Enumerable.from(this.$items).firstOrDefault(function(item) {
				return ss.referenceEquals(item.get_Prefix(), prefix);
			}, ss.getDefaultValue($System_Xaml_NamespaceDeclaration));
			if (ss.isNullOrUndefined(namespaceDeclaration)) {
				throw new $Granular_Exception('Namespaces doesn\'t contain a namespace with prefix "{0}"', [prefix]);
			}
			return namespaceDeclaration.get_Namespace();
		},
		Merge: function(namespaceDeclarations) {
			return new $System_Xaml_XamlNamespaces(Enumerable.from(this.$items).concat(namespaceDeclarations).distinct().toArray());
		}
	});
	$System_Xaml_XamlNamespaces.$ctor1.prototype = $System_Xaml_XamlNamespaces.$ctor2.prototype = $System_Xaml_XamlNamespaces.prototype;
	ss.initClass($System_Xaml_XamlNamespacesExtensions, $asm, {});
	ss.initClass($System_Xaml_XamlParser, $asm, {});
	ss.initClass($System_Xaml_XmlElementExtensions, $asm, {});
	ss.setMetadata($Granular_Exception, { members: [{ name: '.ctor', type: 1, params: [String, Array] }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }] });
	ss.setMetadata($Granular_$Collections_PriorityQueue$2$IndexedKey, { members: [{ name: '.ctor', type: 1, params: [Object, ss.Int32] }, { name: 'Index', type: 16, returnType: ss.Int32, getter: { name: 'get_Index', type: 8, sname: 'get_$Index', returnType: ss.Int32, params: [] }, setter: { name: 'set_Index', type: 8, sname: 'set_$Index', returnType: Object, params: [ss.Int32] } }, { name: 'Key', type: 16, returnType: Object, getter: { name: 'get_Key', type: 8, sname: 'get_$Key', returnType: Object, params: [] }, setter: { name: 'set_Key', type: 8, sname: 'set_$Key', returnType: Object, params: [Object] } }] });
	ss.setMetadata($Granular_$Collections_PriorityQueue$2$IndexedKeyComparer, { members: [{ name: '.ctor', type: 1, params: [ss.IComparer] }, { name: 'Compare', type: 8, sname: 'compare', returnType: ss.Int32, params: [ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [Object, Object]), ss.makeGenericType($Granular_$Collections_PriorityQueue$2$IndexedKey, [Object, Object])] }] });
	ss.setMetadata($Granular_$Compatibility_Comparer$1$CompatibleComparer, { members: [{ name: '.ctor', type: 1, params: [ss.Comparer] }, { name: 'Compare', type: 8, sname: 'compare', returnType: ss.Int32, params: [Object, Object] }] });
	ss.setMetadata($Granular_Collections_CacheDictionary$2, { members: [{ name: '.ctor', type: 1, params: [Function] }, { name: '.ctor', type: 1, params: [Function], sname: '$ctor1' }, { name: 'Clear', type: 8, sname: 'Clear', returnType: Object, params: [] }, { name: 'Contains', type: 8, sname: 'Contains', returnType: Boolean, params: [Object] }, { name: 'GetValue', type: 8, sname: 'GetValue', returnType: Object, params: [Object] }, { name: 'Remove', type: 8, sname: 'Remove', returnType: Object, params: [Object] }] });
	ss.setMetadata($Granular_Collections_IListDictionary$2, { members: [{ name: 'Add', type: 8, sname: 'Add', returnType: Object, params: [Object, Object] }, { name: 'GetValues', type: 8, sname: 'GetValues', returnType: ss.IEnumerable, params: [Object] }, { name: 'Remove', type: 8, sname: 'Remove', returnType: Boolean, params: [Object, Object] }, { name: 'Keys', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Keys', type: 8, sname: 'get_Keys', returnType: ss.IEnumerable, params: [] } }, { name: 'Values', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Values', type: 8, sname: 'get_Values', returnType: ss.IEnumerable, params: [] } }] });
	ss.setMetadata($Granular_Collections_IListDictionaryExtensions, { members: [{ name: 'Contains', isStatic: true, type: 8, tpcount: 2, sname: 'Contains', returnType: Boolean, params: [ss.makeGenericType($Granular_Collections_IListDictionary$2, [Object, Object]), Object, Object] }, { name: 'GetKeys', isStatic: true, type: 8, tpcount: 2, sname: 'GetKeys', returnType: ss.IEnumerable, params: [ss.makeGenericType($Granular_Collections_IListDictionary$2, [Object, Object])] }, { name: 'GetValues', isStatic: true, type: 8, tpcount: 2, sname: 'GetValues', returnType: ss.IEnumerable, params: [ss.makeGenericType($Granular_Collections_IListDictionary$2, [Object, Object])] }] });
	ss.setMetadata($Granular_Collections_INotifyCollectionChanged, { members: [{ name: 'CollectionChanged', type: 2, adder: { name: 'add_CollectionChanged', type: 8, sname: 'add_CollectionChanged', returnType: Object, params: [Function] }, remover: { name: 'remove_CollectionChanged', type: 8, sname: 'remove_CollectionChanged', returnType: Object, params: [Function] } }] });
	ss.setMetadata($Granular_Collections_ListDictionary$2, { members: [{ name: '.ctor', type: 1, params: [] }, { name: 'Add', type: 8, sname: 'Add', returnType: Object, params: [Object, Object] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'GetValues', type: 8, sname: 'GetValues', returnType: ss.IEnumerable, params: [Object] }, { name: 'Remove', type: 8, sname: 'Remove', returnType: Boolean, params: [Object, Object] }, { name: 'Keys', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Keys', type: 8, sname: 'get_Keys', returnType: ss.IEnumerable, params: [] } }, { name: 'Values', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Values', type: 8, sname: 'get_Values', returnType: ss.IEnumerable, params: [] } }] });
	ss.setMetadata($Granular_Collections_NotifyCollectionChangedEventArgs, { members: [{ name: 'Add', isStatic: true, type: 8, sname: 'Add', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [Object, ss.Int32] }, { name: 'AddRange', isStatic: true, type: 8, sname: 'AddRange', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [ss.IEnumerable, ss.Int32] }, { name: 'Move', isStatic: true, type: 8, sname: 'Move', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [Object, ss.Int32, ss.Int32] }, { name: 'MoveRange', isStatic: true, type: 8, sname: 'MoveRange', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [ss.IEnumerable, ss.Int32, ss.Int32] }, { name: 'Remove', isStatic: true, type: 8, sname: 'Remove', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [Object, ss.Int32] }, { name: 'RemoveRange', isStatic: true, type: 8, sname: 'RemoveRange', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [ss.IEnumerable, ss.Int32] }, { name: 'Replace', isStatic: true, type: 8, sname: 'Replace', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [Object, Object, ss.Int32] }, { name: 'ReplaceRange', isStatic: true, type: 8, sname: 'ReplaceRange', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [ss.IEnumerable, ss.IEnumerable, ss.Int32] }, { name: 'Reset', isStatic: true, type: 8, sname: 'Reset', returnType: $Granular_Collections_NotifyCollectionChangedEventArgs, params: [ss.IEnumerable, ss.IEnumerable] }, { name: 'Action', type: 16, returnType: $Granular_Collections_NotifyCollectionChangedAction, getter: { name: 'get_Action', type: 8, sname: 'get_Action', returnType: $Granular_Collections_NotifyCollectionChangedAction, params: [] }, setter: { name: 'set_Action', type: 8, sname: 'set_Action', returnType: Object, params: [$Granular_Collections_NotifyCollectionChangedAction] } }, { name: 'NewItems', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_NewItems', type: 8, sname: 'get_NewItems', returnType: ss.IEnumerable, params: [] }, setter: { name: 'set_NewItems', type: 8, sname: 'set_NewItems', returnType: Object, params: [ss.IEnumerable] } }, { name: 'NewStartingIndex', type: 16, returnType: ss.Int32, getter: { name: 'get_NewStartingIndex', type: 8, sname: 'get_NewStartingIndex', returnType: ss.Int32, params: [] }, setter: { name: 'set_NewStartingIndex', type: 8, sname: 'set_NewStartingIndex', returnType: Object, params: [ss.Int32] } }, { name: 'OldItems', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_OldItems', type: 8, sname: 'get_OldItems', returnType: ss.IEnumerable, params: [] }, setter: { name: 'set_OldItems', type: 8, sname: 'set_OldItems', returnType: Object, params: [ss.IEnumerable] } }, { name: 'OldStartingIndex', type: 16, returnType: ss.Int32, getter: { name: 'get_OldStartingIndex', type: 8, sname: 'get_OldStartingIndex', returnType: ss.Int32, params: [] }, setter: { name: 'set_OldStartingIndex', type: 8, sname: 'set_OldStartingIndex', returnType: Object, params: [ss.Int32] } }] });
	ss.setMetadata($Granular_Collections_NotifyCollectionChangedEventHandlerExtensions, { members: [{ name: 'Raise', isStatic: true, type: 8, sname: 'Raise', returnType: Object, params: [Function, Object, $Granular_Collections_NotifyCollectionChangedEventArgs] }] });
	ss.setMetadata($Granular_Collections_ObservableCollection$1, { members: [{ name: '.ctor', type: 1, params: [] }, { name: '.ctor', type: 1, params: [ss.IEnumerable], sname: '$ctor1' }, { name: '.ctor', type: 1, params: [ss.Int32], sname: '$ctor3' }, { name: 'Add', type: 8, sname: 'add', returnType: Object, params: [Object] }, { name: 'Clear', type: 8, sname: 'clear', returnType: Object, params: [] }, { name: 'Contains', type: 8, sname: 'contains', returnType: Boolean, params: [Object] }, { name: 'CopyTo', type: 8, sname: 'CopyTo', returnType: Object, params: [Array, ss.Int32] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'IndexOf', type: 8, sname: 'indexOf', returnType: ss.Int32, params: [Object] }, { name: 'Insert', type: 8, sname: 'insert', returnType: Object, params: [ss.Int32, Object] }, { name: 'Remove', type: 8, sname: 'remove', returnType: Boolean, params: [Object] }, { name: 'RemoveAt', type: 8, sname: 'removeAt', returnType: Object, params: [ss.Int32] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_count', returnType: ss.Int32, params: [] } }, { name: 'IsReadOnly', type: 16, returnType: Boolean, getter: { name: 'get_IsReadOnly', type: 8, sname: 'get_IsReadOnly', returnType: Boolean, params: [] } }, { name: 'Item', type: 16, returnType: Object, params: [ss.Int32], getter: { name: 'get_Item', type: 8, sname: 'get_item', returnType: Object, params: [ss.Int32] }, setter: { name: 'set_Item', type: 8, sname: 'set_item', returnType: Object, params: [ss.Int32, Object] } }, { name: 'CollectionChanged', type: 2, adder: { name: 'add_CollectionChanged', type: 8, sname: 'add_CollectionChanged', returnType: Object, params: [Function] }, remover: { name: 'remove_CollectionChanged', type: 8, sname: 'remove_CollectionChanged', returnType: Object, params: [Function] } }, { name: 'PropertyChanged', type: 2, adder: { name: 'add_PropertyChanged', type: 8, sname: 'add_PropertyChanged', returnType: Object, params: [Function] }, remover: { name: 'remove_PropertyChanged', type: 8, sname: 'remove_PropertyChanged', returnType: Object, params: [Function] } }] });
	ss.setMetadata($Granular_Collections_PriorityQueue$2, { members: [{ name: '.ctor', type: 1, params: [] }, { name: '.ctor', type: 1, params: [ss.IComparer], sname: '$ctor1' }, { name: 'Dequeue', type: 8, sname: 'Dequeue', returnType: Object, params: [] }, { name: 'Enqueue', type: 8, sname: 'Enqueue', returnType: Object, params: [Object, Object] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Peek', type: 8, sname: 'Peek', returnType: Object, params: [] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_Count', returnType: ss.Int32, params: [] } }] });
	ss.setMetadata($Granular_Collections_ReadOnlyStack$1, { members: [{ name: '.ctor', type: 1, params: [ss.IEnumerable] }, { name: 'Peek', type: 8, sname: 'Peek', returnType: Object, params: [] }, { name: 'Pop', type: 8, sname: 'Pop', returnType: Object, params: [] }, { name: 'IsEmpty', type: 16, returnType: Boolean, getter: { name: 'get_IsEmpty', type: 8, sname: 'get_IsEmpty', returnType: Boolean, params: [] }, setter: { name: 'set_IsEmpty', type: 8, sname: 'set_IsEmpty', returnType: Object, params: [Boolean] } }] });
	ss.setMetadata($Granular_Compatibility_Array, { members: [{ name: 'FindIndex', isStatic: true, type: 8, tpcount: 1, sname: 'FindIndex', returnType: ss.Int32, params: [Array, Function] }, { name: 'FindLastIndex', isStatic: true, type: 8, tpcount: 1, sname: 'FindLastIndex', returnType: ss.Int32, params: [Array, Function] }, {
		name: 'ImplicitCast',
		isStatic: true,
		type: 8,
		def: function(array) {
			return array;
		},
		returnType: Array,
		params: [Object]
	}, { name: 'IndexOf', isStatic: true, type: 8, tpcount: 1, sname: 'IndexOf', returnType: ss.Int32, params: [Array, Object] }] });
	ss.setMetadata($Granular_Compatibility_BindingFlags, { members: [{ name: 'InstanceNonPublic', isStatic: true, type: 4, returnType: System.Reflection.BindingFlags, sname: 'InstanceNonPublic' }, { name: 'InstancePublicNonPublicFlattenHierarchy', isStatic: true, type: 4, returnType: System.Reflection.BindingFlags, sname: 'InstancePublicNonPublicFlattenHierarchy' }] });
	ss.setMetadata($Granular_Compatibility_Collection, { members: [{
		name: 'DynamicAdd',
		isStatic: true,
		type: 8,
		def: function(collection, item) {
			ss.add(collection, item);
			return null;
		},
		returnType: Object,
		params: [Object, Object]
	}] });
	ss.setMetadata($Granular_Compatibility_Comparer$1, { members: [{ name: 'Default', isStatic: true, type: 16, returnType: ss.IComparer, getter: { name: 'get_Default', isStatic: true, type: 8, sname: 'get_Default', returnType: ss.IComparer, params: [] } }] });
	ss.setMetadata($Granular_Compatibility_Convert, { members: [{ name: 'ChangeType', isStatic: true, type: 8, sname: 'ChangeType', returnType: Object, params: [Object, Function] }, { name: 'ToUInt32', isStatic: true, type: 8, sname: 'ToUInt32', returnType: ss.Int32, params: [String, ss.Int32] }] });
	ss.setMetadata($Granular_Compatibility_Dictionary, { members: [{
		name: 'DynamicAdd',
		isStatic: true,
		type: 8,
		def: function(dictionary, key, value) {
			dictionary.add(key, value);
			return null;
		},
		returnType: Object,
		params: [Object, Object, Object]
	}] });
	ss.setMetadata($Granular_Compatibility_Double, { members: [{ name: 'IsInfinity', isStatic: true, type: 8, sname: 'IsInfinity', returnType: Boolean, params: [Number] }] });
	ss.setMetadata($Granular_Compatibility_EqualityComparer$1, { members: [{ name: '.ctor', type: 1, params: [ss.IEqualityComparer] }, { name: 'Equals', type: 8, sname: 'areEqual', returnType: Boolean, params: [Object, Object] }, { name: 'GetHashCode', type: 8, sname: 'getObjectHashCode', returnType: ss.Int32, params: [Object] }, { name: 'Default', isStatic: true, type: 4, returnType: ss.makeGenericType($Granular_Compatibility_EqualityComparer$1, [Object]), sname: 'Default' }] });
	ss.setMetadata($Granular_Compatibility_RuntimeHelpers, { members: [{ name: 'RunClassConstructor', isStatic: true, type: 8, sname: 'RunClassConstructor', returnType: Object, params: [Function] }] });
	ss.setMetadata($Granular_Compatibility_String, { members: [{ name: 'FromByteArray', isStatic: true, type: 8, sname: 'FromByteArray', returnType: String, params: [Array] }, { name: 'IsNullOrWhitespace', isStatic: true, type: 8, sname: 'IsNullOrWhitespace', returnType: Boolean, params: [String] }] });
	ss.setMetadata($Granular_Compatibility_TimeSpan, { members: [{ name: '.ctor', type: 1, params: [] }, { name: 'Subtract', isStatic: true, type: 8, sname: 'Subtract', returnType: ss.TimeSpan, params: [Date, Date] }, { name: 'MaxValue', isStatic: true, type: 4, returnType: ss.TimeSpan, sname: 'MaxValue' }, { name: 'MinValue', isStatic: true, type: 4, returnType: ss.TimeSpan, sname: 'MinValue' }] });
	ss.setMetadata($Granular_Compatibility_Type, { members: [{ name: 'GetType', isStatic: true, type: 8, sname: 'GetType', returnType: Function, params: [String] }, { name: 'GetTypeInterfaceGenericArguments', isStatic: true, type: 8, sname: 'GetTypeInterfaceGenericArguments', returnType: ss.IEnumerable, params: [Function, Function] }] });
	ss.setMetadata($Granular_Diagnostics_HitCounter, { members: [{ name: '.ctor', type: 1, params: [String, Function] }, { name: 'Hit', type: 8, sname: 'Hit', returnType: Object, params: [] }] });
	ss.setMetadata($Granular_Extensions_AssemblyExtensions, { members: [{ name: 'FirstOrDefaultCustomAttributeCached', isStatic: true, type: 8, tpcount: 1, sname: 'FirstOrDefaultCustomAttributeCached', returnType: Object, params: [Object] }, { name: 'GetCustomAttributesCached', isStatic: true, type: 8, tpcount: 1, sname: 'GetCustomAttributesCached', returnType: ss.IEnumerable, params: [Object] }] });
	ss.setMetadata($Granular_Extensions_CollectionExtensions, { members: [{ name: 'AddRange', isStatic: true, type: 8, tpcount: 1, sname: 'AddRange', returnType: Object, params: [ss.ICollection, ss.IEnumerable] }] });
	ss.setMetadata($Granular_Extensions_DoubleExtensions, { members: [{ name: 'Bounds', isStatic: true, type: 8, sname: 'Bounds', returnType: Number, params: [Number, Number, Number] }, { name: 'DefaultIfNaN', isStatic: true, type: 8, sname: 'DefaultIfNaN', returnType: Number, params: [Number, Number] }, { name: 'IsClose', isStatic: true, type: 8, sname: 'IsClose', returnType: Boolean, params: [Number, Number] }, { name: 'IsNaN', isStatic: true, type: 8, sname: 'IsNaN', returnType: Boolean, params: [Number] }, { name: 'Max', isStatic: true, type: 8, sname: 'Max', returnType: Number, params: [Number, Number] }, { name: 'Min', isStatic: true, type: 8, sname: 'Min', returnType: Number, params: [Number, Number] }] });
	ss.setMetadata($Granular_Extensions_EventHandlerExtensions, { attr: [new $System_Diagnostics_DebuggerNonUserCodeAttribute()], members: [{ name: 'Raise', isStatic: true, type: 8, sname: 'Raise', returnType: Object, params: [Function, Object] }, { name: 'Raise', isStatic: true, type: 8, sname: 'Raise$1', returnType: Object, params: [Function, Object, $System_ComponentModel_PropertyChangedEventArgs] }, { name: 'Raise', isStatic: true, type: 8, sname: 'Raise$2', returnType: Object, params: [Function, Object, String] }, { name: 'Raise', isStatic: true, type: 8, sname: 'Raise$3', returnType: Object, params: [Function, Object, ss.EventArgs] }, { name: 'Raise', isStatic: true, type: 8, tpcount: 1, sname: 'Raise$4', returnType: Object, params: [Function, Object, Object] }] });
	ss.setMetadata($Granular_Extensions_IntExtensions, { members: [{ name: 'Bounds', isStatic: true, type: 8, sname: 'Bounds', returnType: ss.Int32, params: [ss.Int32, ss.Int32, ss.Int32] }, { name: 'Max', isStatic: true, type: 8, sname: 'Max', returnType: ss.Int32, params: [ss.Int32, ss.Int32] }, { name: 'Min', isStatic: true, type: 8, sname: 'Min', returnType: ss.Int32, params: [ss.Int32, ss.Int32] }] });
	ss.setMetadata($Granular_Extensions_ListExtensions, { members: [{ name: 'InsertRange', isStatic: true, type: 8, tpcount: 1, sname: 'InsertRange', returnType: Object, params: [ss.IList, ss.Int32, ss.IEnumerable] }, { name: 'RemoveRange', isStatic: true, type: 8, tpcount: 1, sname: 'RemoveRange', returnType: Object, params: [ss.IList, ss.Int32, ss.Int32] }] });
	ss.setMetadata($Granular_Extensions_StringExtensions, { members: [{ name: 'DefaultIfNullOrEmpty', isStatic: true, type: 8, sname: 'DefaultIfNullOrEmpty', returnType: String, params: [String, String] }, { name: 'GetCharacterIndexFromLineIndex', isStatic: true, type: 8, sname: 'GetCharacterIndexFromLineIndex', returnType: ss.Int32, params: [String, ss.Int32] }, { name: 'GetLineIndexFromCharacterIndex', isStatic: true, type: 8, sname: 'GetLineIndexFromCharacterIndex', returnType: ss.Int32, params: [String, ss.Int32] }, { name: 'GetLineLength', isStatic: true, type: 8, sname: 'GetLineLength', returnType: ss.Int32, params: [String, ss.Int32] }, { name: 'GetLineText', isStatic: true, type: 8, sname: 'GetLineText', returnType: String, params: [String, ss.Int32] }, { name: 'GetLines', isStatic: true, type: 8, sname: 'GetLines', returnType: Array, params: [String] }, { name: 'IndexOfAll', isStatic: true, type: 8, sname: 'IndexOfAll', returnType: Array, params: [String, String] }, { name: 'IsNullOrEmpty', isStatic: true, type: 8, sname: 'IsNullOrEmpty', returnType: Boolean, params: [String] }, { name: 'IsNullOrWhitespace', isStatic: true, type: 8, sname: 'IsNullOrWhitespace', returnType: Boolean, params: [String] }] });
	ss.setMetadata($Granular_Extensions_TimeSpanExtensions, { members: [{ name: 'Divide', isStatic: true, type: 8, sname: 'Divide', returnType: Number, params: [ss.TimeSpan, ss.TimeSpan] }, { name: 'Max', isStatic: true, type: 8, sname: 'Max', returnType: ss.TimeSpan, params: [ss.TimeSpan, ss.TimeSpan] }, { name: 'Min', isStatic: true, type: 8, sname: 'Min', returnType: ss.TimeSpan, params: [ss.TimeSpan, ss.TimeSpan] }, { name: 'Scale', isStatic: true, type: 8, sname: 'Scale', returnType: ss.TimeSpan, params: [ss.TimeSpan, Number] }] });
	ss.setMetadata($Granular_Extensions_TypeExtensions, { members: [{ name: 'GetDefaultIndexProperty', isStatic: true, type: 8, sname: 'GetDefaultIndexProperty', returnType: Object, params: [Function] }, { name: 'GetInstanceProperty', isStatic: true, type: 8, sname: 'GetInstanceProperty', returnType: Object, params: [Function, String] }, { name: 'GetInterfaceType', isStatic: true, type: 8, sname: 'GetInterfaceType', returnType: Function, params: [Function, Function] }] });
	ss.setMetadata($System_AssemblyExtensions, { members: [{ name: 'GetName', isStatic: true, type: 8, sname: 'GetName', returnType: $System_AssemblyName, params: [Object] }] });
	ss.setMetadata($System_AssemblyName, { members: [{ name: '.ctor', type: 1, params: [String] }, { name: 'Name', type: 16, returnType: String, getter: { name: 'get_Name', type: 8, sname: 'get_Name', returnType: String, params: [] }, setter: { name: 'set_Name', type: 8, sname: 'set_Name', returnType: Object, params: [String] } }] });
	ss.setMetadata($System_STAThreadAttribute, { members: [{ name: '.ctor', type: 1, params: [] }] });
	ss.setMetadata($System_TypeExtensions, { members: [{ name: 'GetDefaultConstructor', isStatic: true, type: 8, sname: 'GetDefaultConstructor', returnType: Object, params: [Function] }, { name: 'GetIsAbstract', isStatic: true, type: 8, sname: 'GetIsAbstract', returnType: Boolean, params: [Function] }, { name: 'GetIsGenericType', isStatic: true, type: 8, sname: 'GetIsGenericType', returnType: Boolean, params: [Function] }, { name: 'GetIsValueType', isStatic: true, type: 8, sname: 'GetIsValueType', returnType: Boolean, params: [Function] }] });
	ss.setMetadata($System_$Xaml_XmlElementExtensions$XmlEnumerable$1, { members: [{ name: '.ctor', type: 1, params: [Function] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }] });
	ss.setMetadata($System_Collections_Generic_DictionaryExtensions, { members: [{ name: 'GetKeys', isStatic: true, type: 8, tpcount: 2, sname: 'GetKeys', returnType: ss.IEnumerable, params: [ss.IDictionary] }, { name: 'GetValues', isStatic: true, type: 8, tpcount: 2, sname: 'GetValues', returnType: ss.IEnumerable, params: [ss.IDictionary] }] });
	ss.setMetadata($System_Collections_Generic_HashSet$1, { members: [{ name: '.ctor', type: 1, params: [] }, { name: 'Add', type: 8, sname: 'add', returnType: Object, params: [Object] }, { name: 'Clear', type: 8, sname: 'clear', returnType: Object, params: [] }, { name: 'Contains', type: 8, sname: 'contains', returnType: Boolean, params: [Object] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Remove', type: 8, sname: 'remove', returnType: Boolean, params: [Object] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_count', returnType: ss.Int32, params: [] } }] });
	ss.setMetadata($System_Collections_Generic_SortedList$2, { members: [{ name: '.ctor', type: 1, params: [ss.IComparer] }, { name: 'Add', type: 8, sname: 'add', returnType: Object, params: [Object, Object] }, { name: 'Clear', type: 8, sname: 'Clear', returnType: Object, params: [] }, { name: 'ContainsKey', type: 8, sname: 'containsKey', returnType: Boolean, params: [Object] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Remove', type: 8, sname: 'remove', returnType: Boolean, params: [Object] }, { name: 'RemoveAt', type: 8, sname: 'RemoveAt', returnType: Boolean, params: [ss.Int32] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_count', returnType: ss.Int32, params: [] } }, { name: 'IsReadOnly', type: 16, returnType: Boolean, getter: { name: 'get_IsReadOnly', type: 8, sname: 'get_IsReadOnly', returnType: Boolean, params: [] } }, { name: 'Item', type: 16, returnType: Object, params: [Object], getter: { name: 'get_Item', type: 8, sname: 'get_item', returnType: Object, params: [Object] }, setter: { name: 'set_Item', type: 8, sname: 'set_item', returnType: Object, params: [Object, Object] } }, { name: 'Keys', type: 16, returnType: ss.ICollection, getter: { name: 'get_Keys', type: 8, sname: 'get_keys', returnType: ss.ICollection, params: [] } }, { name: 'Values', type: 16, returnType: ss.ICollection, getter: { name: 'get_Values', type: 8, sname: 'get_values', returnType: ss.ICollection, params: [] } }] });
	ss.setMetadata($System_ComponentModel_INotifyPropertyChanged, { members: [{ name: 'PropertyChanged', type: 2, adder: { name: 'add_PropertyChanged', type: 8, sname: 'add_PropertyChanged', returnType: Object, params: [Function] }, remover: { name: 'remove_PropertyChanged', type: 8, sname: 'remove_PropertyChanged', returnType: Object, params: [Function] } }] });
	ss.setMetadata($System_ComponentModel_PropertyChangedEventArgs, { members: [{ name: '.ctor', type: 1, params: [String] }, { name: 'PropertyName', type: 16, returnType: String, getter: { name: 'get_PropertyName', type: 8, sname: 'get_PropertyName', returnType: String, params: [] }, setter: { name: 'set_PropertyName', type: 8, sname: 'set_PropertyName', returnType: Object, params: [String] } }] });
	ss.setMetadata($System_Diagnostics_DebuggerNonUserCodeAttribute, { members: [{ name: '.ctor', type: 1, params: [] }] });
	ss.setMetadata($System_Linq_EnumerableExtensions, { members: [{ name: 'CopyTo', isStatic: true, type: 8, tpcount: 1, sname: 'CopyTo', returnType: Object, params: [ss.IEnumerable, Array, ss.Int32] }, { name: 'Max', isStatic: true, type: 8, tpcount: 1, sname: 'Max', returnType: Object, params: [ss.IEnumerable] }, { name: 'Min', isStatic: true, type: 8, tpcount: 1, sname: 'Min', returnType: Object, params: [ss.IEnumerable] }] });
	ss.setMetadata($System_Reflection_EventInfoExtensions, { members: [{ name: 'GetEventHandlerType', isStatic: true, type: 8, sname: 'GetEventHandlerType', returnType: Function, params: [Object] }] });
	ss.setMetadata($System_Reflection_ParameterInfo, { members: [{ name: '.ctor', type: 1, params: [Function] }, { name: 'ParameterType', type: 16, returnType: Function, getter: { name: 'get_ParameterType', type: 8, sname: 'get_ParameterType', returnType: Function, params: [] }, setter: { name: 'set_ParameterType', type: 8, sname: 'set_ParameterType', returnType: Object, params: [Function] } }] });
	ss.setMetadata($System_Reflection_ParameterInfoExtensions, { members: [{ name: 'GetIndexParameters', isStatic: true, type: 8, sname: 'GetIndexParameters', returnType: Array, params: [Object] }, { name: 'GetParameters', isStatic: true, type: 8, sname: 'GetParameters', returnType: Array, params: [Object] }, { name: 'GetParameters', isStatic: true, type: 8, sname: 'GetParameters$1', returnType: Array, params: [Object] }] });
	ss.setMetadata($System_Reflection_PropertyInfoExtensions, { members: [{ name: 'GetGetMethod', isStatic: true, type: 8, sname: 'GetGetMethod', returnType: Object, params: [Object] }, { name: 'GetSetMethod', isStatic: true, type: 8, sname: 'GetSetMethod', returnType: Object, params: [Object] }, { name: 'IsDelegate', isStatic: true, type: 8, sname: 'IsDelegate', returnType: Boolean, params: [Object] }] });
	ss.setMetadata($System_Text_RegularExpressions_Capture, { members: [{ name: '.ctor', type: 1, params: [ss.Int32, String] }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }, { name: 'Index', type: 16, returnType: ss.Int32, getter: { name: 'get_Index', type: 8, sname: 'get_Index', returnType: ss.Int32, params: [] }, setter: { name: 'set_Index', type: 8, sname: 'set_Index', returnType: Object, params: [ss.Int32] } }, { name: 'Length', type: 16, returnType: ss.Int32, getter: { name: 'get_Length', type: 8, sname: 'get_Length', returnType: ss.Int32, params: [] } }, { name: 'Value', type: 16, returnType: String, getter: { name: 'get_Value', type: 8, sname: 'get_Value', returnType: String, params: [] }, setter: { name: 'set_Value', type: 8, sname: 'set_Value', returnType: Object, params: [String] } }] });
	ss.setMetadata($System_Text_RegularExpressions_Group, { members: [{ name: '.ctor', type: 1, params: [ss.Int32, String, Boolean] }, { name: 'Success', type: 16, returnType: Boolean, getter: { name: 'get_Success', type: 8, sname: 'get_Success', returnType: Boolean, params: [] }, setter: { name: 'set_Success', type: 8, sname: 'set_Success', returnType: Object, params: [Boolean] } }] });
	ss.setMetadata($System_Text_RegularExpressions_GroupCollection, { members: [{ name: '.ctor', type: 1, params: [ss.IEnumerable] }, { name: 'GetEnumerator', type: 8, sname: 'getEnumerator', returnType: ss.IEnumerator, params: [] }, { name: 'Count', type: 16, returnType: ss.Int32, getter: { name: 'get_Count', type: 8, sname: 'get_Count', returnType: ss.Int32, params: [] } }, { name: 'Item', type: 16, returnType: $System_Text_RegularExpressions_Group, params: [ss.Int32], getter: { name: 'get_Item', type: 8, sname: 'get_Item', returnType: $System_Text_RegularExpressions_Group, params: [ss.Int32] } }, { name: 'Empty', isStatic: true, type: 4, returnType: $System_Text_RegularExpressions_GroupCollection, sname: 'Empty' }] });
	ss.setMetadata($System_Text_RegularExpressions_Match, { members: [{ name: '.ctor', type: 1, params: [System.Text.RegularExpressions.RegexMatch] }, { name: 'Groups', type: 16, returnType: $System_Text_RegularExpressions_GroupCollection, getter: { name: 'get_Groups', type: 8, sname: 'get_Groups', returnType: $System_Text_RegularExpressions_GroupCollection, params: [] }, setter: { name: 'set_Groups', type: 8, sname: 'set_Groups', returnType: Object, params: [$System_Text_RegularExpressions_GroupCollection] } }] });
	ss.setMetadata($System_Text_RegularExpressions_RegexExtensions, { members: [{ name: 'Match', isStatic: true, type: 8, sname: 'Match', returnType: $System_Text_RegularExpressions_Match, params: [RegExp, String] }] });
	ss.setMetadata($System_Xaml_ITokenDefinition, { members: [{ name: 'Match', type: 8, sname: 'Match', returnType: $System_Xaml_Token, params: [String, ss.Int32] }] });
	ss.setMetadata($System_Xaml_Lexer, { members: [{ name: '.ctor', type: 1, params: [Array] }, { name: 'GetTokens', type: 8, sname: 'GetTokens', returnType: ss.IEnumerable, params: [String] }] });
	ss.setMetadata($System_Xaml_MarkupExtensionParser, { members: [{ name: 'Parse', isStatic: true, type: 8, sname: 'Parse', returnType: Object, params: [String, $System_Xaml_XamlNamespaces] }] });
	ss.setMetadata($System_Xaml_NamespaceDeclaration, { members: [{ name: '.ctor', type: 1, params: [String] }, { name: '.ctor', type: 1, params: [String, String], sname: '$ctor1' }, { name: 'Equals', type: 8, sname: 'equals', returnType: Boolean, params: [Object] }, { name: 'GetHashCode', type: 8, sname: 'getHashCode', returnType: ss.Int32, params: [] }, { name: 'Namespace', type: 16, returnType: String, getter: { name: 'get_Namespace', type: 8, sname: 'get_Namespace', returnType: String, params: [] }, setter: { name: 'set_Namespace', type: 8, sname: 'set_Namespace', returnType: Object, params: [String] } }, { name: 'Prefix', type: 16, returnType: String, getter: { name: 'get_Prefix', type: 8, sname: 'get_Prefix', returnType: String, params: [] }, setter: { name: 'set_Prefix', type: 8, sname: 'set_Prefix', returnType: Object, params: [String] } }] });
	ss.setMetadata($System_Xaml_RegexTokenDefinition, { members: [{ name: '.ctor', type: 1, params: [Object, RegExp] }, { name: 'Match', type: 8, sname: 'Match', returnType: $System_Xaml_Token, params: [String, ss.Int32] }] });
	ss.setMetadata($System_Xaml_Token, { members: [{ name: '.ctor', type: 1, params: [Object, String, ss.Int32] }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }, { name: 'Id', type: 16, returnType: Object, getter: { name: 'get_Id', type: 8, sname: 'get_Id', returnType: Object, params: [] }, setter: { name: 'set_Id', type: 8, sname: 'set_Id', returnType: Object, params: [Object] } }, { name: 'Start', type: 16, returnType: ss.Int32, getter: { name: 'get_Start', type: 8, sname: 'get_Start', returnType: ss.Int32, params: [] }, setter: { name: 'set_Start', type: 8, sname: 'set_Start', returnType: Object, params: [ss.Int32] } }, { name: 'Value', type: 16, returnType: String, getter: { name: 'get_Value', type: 8, sname: 'get_Value', returnType: String, params: [] }, setter: { name: 'set_Value', type: 8, sname: 'set_Value', returnType: Object, params: [String] } }] });
	ss.setMetadata($System_Xaml_XamlElement, { members: [{ name: '.ctor', type: 1, params: [$System_Xaml_XamlName, $System_Xaml_XamlNamespaces, ss.IEnumerable, ss.IEnumerable, ss.IEnumerable] }, { name: 'Directives', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Directives', type: 8, sname: 'get_Directives', returnType: ss.IEnumerable, params: [] }, setter: { name: 'set_Directives', type: 8, sname: 'set_Directives', returnType: Object, params: [ss.IEnumerable] } }, { name: 'Members', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Members', type: 8, sname: 'get_Members', returnType: ss.IEnumerable, params: [] }, setter: { name: 'set_Members', type: 8, sname: 'set_Members', returnType: Object, params: [ss.IEnumerable] } }, { name: 'Values', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Values', type: 8, sname: 'get_Values', returnType: ss.IEnumerable, params: [] }, setter: { name: 'set_Values', type: 8, sname: 'set_Values', returnType: Object, params: [ss.IEnumerable] } }] });
	ss.setMetadata($System_Xaml_XamlLanguage, { members: [{ name: 'IsDirective', isStatic: true, type: 8, sname: 'IsDirective', returnType: Boolean, params: [$System_Xaml_XamlName] }, { name: 'IsXamlType', isStatic: true, type: 8, sname: 'IsXamlType', returnType: Boolean, params: [$System_Xaml_XamlName] }, { name: 'ClassDirective', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'ClassDirective' }, { name: 'KeyDirective', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'KeyDirective' }, { name: 'NameDirective', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'NameDirective' }, { name: 'NamespaceName', isStatic: true, type: 4, returnType: String, sname: 'NamespaceName' }, { name: 'NullTypeName', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'NullTypeName' }, { name: 'SharedDirective', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'SharedDirective' }, { name: 'TypeTypeName', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'TypeTypeName' }] });
	ss.setMetadata($System_Xaml_XamlMember, { members: [{ name: '.ctor', type: 1, params: [$System_Xaml_XamlName, $System_Xaml_XamlNamespaces, ss.IEnumerable] }, { name: '.ctor', type: 1, params: [$System_Xaml_XamlName, $System_Xaml_XamlNamespaces, Object], sname: '$ctor1' }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }, { name: 'Values', type: 16, returnType: ss.IEnumerable, getter: { name: 'get_Values', type: 8, sname: 'get_Values', returnType: ss.IEnumerable, params: [] }, setter: { name: 'set_Values', type: 8, sname: 'set_Values', returnType: Object, params: [ss.IEnumerable] } }] });
	ss.setMetadata($System_Xaml_XamlMemberExtensions, { members: [{ name: 'GetSingleValue', isStatic: true, type: 8, sname: 'GetSingleValue', returnType: Object, params: [$System_Xaml_XamlMember] }] });
	ss.setMetadata($System_Xaml_XamlName, { members: [{ name: '.ctor', type: 1, params: [String, String] }, { name: 'Equals', type: 8, sname: 'equals', returnType: Boolean, params: [Object] }, { name: 'FromPrefixedName', isStatic: true, type: 8, sname: 'FromPrefixedName', returnType: $System_Xaml_XamlName, params: [String, $System_Xaml_XamlNamespaces] }, { name: 'GetHashCode', type: 8, sname: 'getHashCode', returnType: ss.Int32, params: [] }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }, { name: 'op_Equality', isStatic: true, type: 8, sname: 'op_Equality', returnType: Boolean, params: [$System_Xaml_XamlName, $System_Xaml_XamlName] }, { name: 'op_Inequality', isStatic: true, type: 8, sname: 'op_Inequality', returnType: Boolean, params: [$System_Xaml_XamlName, $System_Xaml_XamlName] }, { name: 'ContainingTypeName', type: 16, returnType: $System_Xaml_XamlName, getter: { name: 'get_ContainingTypeName', type: 8, sname: 'get_ContainingTypeName', returnType: $System_Xaml_XamlName, params: [] }, setter: { name: 'set_ContainingTypeName', type: 8, sname: 'set_ContainingTypeName', returnType: Object, params: [$System_Xaml_XamlName] } }, { name: 'IsEmpty', type: 16, returnType: Boolean, getter: { name: 'get_IsEmpty', type: 8, sname: 'get_IsEmpty', returnType: Boolean, params: [] } }, { name: 'IsMemberName', type: 16, returnType: Boolean, getter: { name: 'get_IsMemberName', type: 8, sname: 'get_IsMemberName', returnType: Boolean, params: [] }, setter: { name: 'set_IsMemberName', type: 8, sname: 'set_IsMemberName', returnType: Object, params: [Boolean] } }, { name: 'LocalName', type: 16, returnType: String, getter: { name: 'get_LocalName', type: 8, sname: 'get_LocalName', returnType: String, params: [] }, setter: { name: 'set_LocalName', type: 8, sname: 'set_LocalName', returnType: Object, params: [String] } }, { name: 'MemberName', type: 16, returnType: String, getter: { name: 'get_MemberName', type: 8, sname: 'get_MemberName', returnType: String, params: [] }, setter: { name: 'set_MemberName', type: 8, sname: 'set_MemberName', returnType: Object, params: [String] } }, { name: 'NamespaceName', type: 16, returnType: String, getter: { name: 'get_NamespaceName', type: 8, sname: 'get_NamespaceName', returnType: String, params: [] }, setter: { name: 'set_NamespaceName', type: 8, sname: 'set_NamespaceName', returnType: Object, params: [String] } }, { name: 'Empty', isStatic: true, type: 4, returnType: $System_Xaml_XamlName, sname: 'Empty' }] });
	ss.setMetadata($System_Xaml_XamlNamespaces, { members: [{ name: '.ctor', type: 1, params: [ss.IEnumerable] }, { name: '.ctor', type: 1, params: [String], sname: '$ctor1' }, { name: '.ctor', type: 1, params: [String, String], sname: '$ctor2' }, { name: 'Contains', type: 8, sname: 'Contains', returnType: Boolean, params: [String] }, { name: 'Get', type: 8, sname: 'Get', returnType: String, params: [String] }, { name: 'Merge', type: 8, sname: 'Merge', returnType: $System_Xaml_XamlNamespaces, params: [ss.IEnumerable] }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }, { name: 'Empty', isStatic: true, type: 4, returnType: $System_Xaml_XamlNamespaces, sname: 'Empty' }] });
	ss.setMetadata($System_Xaml_XamlNamespacesExtensions, { members: [{ name: 'ContainsDefault', isStatic: true, type: 8, sname: 'ContainsDefault', returnType: Boolean, params: [$System_Xaml_XamlNamespaces] }, { name: 'GetDefault', isStatic: true, type: 8, sname: 'GetDefault', returnType: String, params: [$System_Xaml_XamlNamespaces] }] });
	ss.setMetadata($System_Xaml_XamlNode, { members: [{ name: '.ctor', type: 1, params: [$System_Xaml_XamlName, $System_Xaml_XamlNamespaces] }, { name: 'ToString', type: 8, sname: 'toString', returnType: String, params: [] }, { name: 'Name', type: 16, returnType: $System_Xaml_XamlName, getter: { name: 'get_Name', type: 8, sname: 'get_Name', returnType: $System_Xaml_XamlName, params: [] }, setter: { name: 'set_Name', type: 8, sname: 'set_Name', returnType: Object, params: [$System_Xaml_XamlName] } }, { name: 'Namespaces', type: 16, returnType: $System_Xaml_XamlNamespaces, getter: { name: 'get_Namespaces', type: 8, sname: 'get_Namespaces', returnType: $System_Xaml_XamlNamespaces, params: [] }, setter: { name: 'set_Namespaces', type: 8, sname: 'set_Namespaces', returnType: Object, params: [$System_Xaml_XamlNamespaces] } }] });
	ss.setMetadata($System_Xaml_XamlParser, { members: [{ name: 'Parse', isStatic: true, type: 8, sname: 'Parse', returnType: $System_Xaml_XamlElement, params: [String] }] });
	ss.setMetadata($System_Xaml_XmlElementExtensions, { members: [{ name: 'Attributes', isStatic: true, type: 8, sname: 'Attributes', returnType: ss.IEnumerable, params: [Element] }, { name: 'Elements', isStatic: true, type: 8, sname: 'Elements', returnType: ss.IEnumerable, params: [Element] }, { name: 'Nodes', isStatic: true, type: 8, sname: 'Nodes', returnType: ss.IEnumerable, params: [Element] }] });
	(function() {
		$Granular_Compatibility_BindingFlags.InstanceNonPublic = 4;
		$Granular_Compatibility_BindingFlags.InstancePublicNonPublicFlattenHierarchy = 84;
	})();
	(function() {
		$Granular_Compatibility_Convert.$HexDigits = '0123456789ABCDEF';
	})();
	(function() {
		$Granular_Compatibility_String.$StringWhitespaceFormat = new RegExp('^[ \t\r\n]*$');
	})();
	(function() {
		$System_Text_RegularExpressions_GroupCollection.Empty = new $System_Text_RegularExpressions_GroupCollection([]);
	})();
	(function() {
		$Granular_Compatibility_Double.$DoubleFormat = new RegExp('[+-]?([0-9]*,)*[0-9]*(\\.([0-9]*))?([eE]([+-]?)[0-9]*)?');
	})();
	(function() {
		$Granular_Compatibility_TimeSpan.MinValue = new ss.TimeSpan(-10000 * 864000000000);
		$Granular_Compatibility_TimeSpan.MaxValue = new ss.TimeSpan(10000 * 864000000000);
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatRegex = new RegExp('(-?)(((([0-9]+)\\.)?([0-9]+):([0-9]+)(:([0-9]*)(\\.([0-9]+))?)?)|([0-9]+))');
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatSignGroupIndex = 1;
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatDaysGroupIndex = 5;
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatHoursGroupIndex = 6;
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatMinutesGroupIndex = 7;
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatSecondsGroupIndex = 9;
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatMillisecondsGroupIndex = 11;
		$Granular_Compatibility_TimeSpan.$TimeSpanFormatDaysAlternativeGroupIndex = 12;
	})();
	(function() {
		$Granular_Extensions_AssemblyExtensions.$attributesCache = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.IEnumerable]))();
	})();
	(function() {
		$Granular_Extensions_DoubleExtensions.$Epsilon = 1E-10;
	})();
	(function() {
		$System_Xaml_Lexer.$WhiteSpaceRegex = new RegExp('[ \t]+');
	})();
	(function() {
		$System_Xaml_XamlElement.$EmptyMembers = [];
		$System_Xaml_XamlElement.$EmptyValues = [];
		$System_Xaml_XamlElement.$EmptyDirectives = [];
	})();
	(function() {
		$System_Xaml_XamlName.Empty = new $System_Xaml_XamlName('', null);
	})();
	(function() {
		$System_Xaml_XamlMember.$EmptyValues = [];
	})();
	(function() {
		$System_Xaml_MarkupExtensionParser.$lexer = new $System_Xaml_Lexer([new $System_Xaml_RegexTokenDefinition(0, new RegExp('[{}=,]')), new $System_Xaml_RegexTokenDefinition(3, new RegExp('true|True|false|False')), new $System_Xaml_RegexTokenDefinition(2, new RegExp("'([^']|'')*'")), new $System_Xaml_RegexTokenDefinition(4, new RegExp('[0-9]+')), new $System_Xaml_RegexTokenDefinition(5, new RegExp('[0-9]*\\.[0-9]+')), new $System_Xaml_RegexTokenDefinition(1, new RegExp('[A-Za-z0-9_:\\(\\)\\.]*'))]);
	})();
	(function() {
		$System_Xaml_XamlLanguage.NamespaceName = 'http://schemas.microsoft.com/winfx/2006/xaml';
		$System_Xaml_XamlLanguage.ClassDirective = new $System_Xaml_XamlName('Class', $System_Xaml_XamlLanguage.NamespaceName);
		$System_Xaml_XamlLanguage.NameDirective = new $System_Xaml_XamlName('Name', $System_Xaml_XamlLanguage.NamespaceName);
		$System_Xaml_XamlLanguage.KeyDirective = new $System_Xaml_XamlName('Key', $System_Xaml_XamlLanguage.NamespaceName);
		$System_Xaml_XamlLanguage.SharedDirective = new $System_Xaml_XamlName('Shared', $System_Xaml_XamlLanguage.NamespaceName);
		$System_Xaml_XamlLanguage.$Directives = [$System_Xaml_XamlLanguage.ClassDirective, $System_Xaml_XamlLanguage.NameDirective, $System_Xaml_XamlLanguage.KeyDirective, $System_Xaml_XamlLanguage.SharedDirective];
		$System_Xaml_XamlLanguage.NullTypeName = new $System_Xaml_XamlName('Null', $System_Xaml_XamlLanguage.NamespaceName);
		$System_Xaml_XamlLanguage.TypeTypeName = new $System_Xaml_XamlName('Type', $System_Xaml_XamlLanguage.NamespaceName);
		$System_Xaml_XamlLanguage.$XamlTypes = [$System_Xaml_XamlLanguage.NullTypeName, $System_Xaml_XamlLanguage.TypeTypeName];
	})();
	(function() {
		$System_Xaml_XamlNamespaces.Empty = new $System_Xaml_XamlNamespaces([]);
	})();
})();
