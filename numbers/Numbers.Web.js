(function() {
	'use strict';
	var $asm = {};
	global.Numbers = global.Numbers || {};
	global.Numbers.Web = global.Numbers.Web || {};
	global.Numbers.Web.Controls = global.Numbers.Web.Controls || {};
	global.Numbers.Web.Generic = global.Numbers.Web.Generic || {};
	global.Numbers.Web.Transitions = global.Numbers.Web.Transitions || {};
	global.Numbers.Web.ViewModels = global.Numbers.Web.ViewModels || {};
	global.Numbers.Web.Views = global.Numbers.Web.Views || {};
	ss.initAssembly($asm, 'Numbers.Web');
	////////////////////////////////////////////////////////////////////////////////
	// AssemblyInfo
	var $AssemblyInfo = function() {
	};
	$AssemblyInfo.__typeName = 'AssemblyInfo';
	global.AssemblyInfo = $AssemblyInfo;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.Transition.State
	var $Numbers_$Web_Transitions_Transition$State = function() {
	};
	$Numbers_$Web_Transitions_Transition$State.__typeName = 'Numbers.$Web.Transitions.Transition$State';
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.ValueBoundsExtensions.ReversedValueBounds
	var $Numbers_$Web_Transitions_ValueBoundsExtensions$ReversedValueBounds = function(source) {
		this.$source = null;
		this.$source = source;
	};
	$Numbers_$Web_Transitions_ValueBoundsExtensions$ReversedValueBounds.__typeName = 'Numbers.$Web.Transitions.ValueBoundsExtensions$ReversedValueBounds';
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.ToolsView.ShareService
	var $Numbers_$Web_Views_ToolsView$ShareService = function(imageIndex, header, urlFormat) {
		this.$1$ImageIndexField = 0;
		this.$1$HeaderField = null;
		this.$1$UrlFormatField = null;
		this.set_$imageIndex(imageIndex);
		this.set_$header(header);
		this.set_$urlFormat(urlFormat);
	};
	$Numbers_$Web_Views_ToolsView$ShareService.__typeName = 'Numbers.$Web.Views.ToolsView$ShareService';
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Application
	var $Numbers_Web_Application = function() {
		this.$gameLevel = 0;
		this.$game = null;
		this.$configuration = null;
		this.$dialogContainer = null;
		this.$customGame = false;
		this.$gameView = null;
		this.$toolsView = null;
		this.$statistics = null;
		this.$firstTime = false;
		//
	};
	$Numbers_Web_Application.__typeName = 'Numbers.Web.Application';
	$Numbers_Web_Application.$getContianerDimension = function(windowWidth, windowHeight, viewWidth, viewHeight, viewContainerWidth, viewContainerHeight) {
		if (windowWidth >= viewWidth && windowHeight >= viewHeight) {
			viewContainerWidth.$ = windowWidth;
			viewContainerHeight.$ = windowHeight;
			return;
		}
		var windowSizeRatio = windowWidth / windowHeight;
		var viewSizeRatio = viewWidth / viewHeight;
		if (windowSizeRatio > viewSizeRatio) {
			viewContainerWidth.$ = ss.Int32.trunc(viewHeight * windowSizeRatio);
			viewContainerHeight.$ = viewHeight;
		}
		else {
			viewContainerWidth.$ = viewWidth;
			viewContainerHeight.$ = ss.Int32.trunc(viewWidth / windowSizeRatio);
		}
	};
	$Numbers_Web_Application.main = function() {
		var application = new $Numbers_Web_Application();
		window.addEventListener('load', function(e) {
			application.run();
		});
	};
	global.Numbers.Web.Application = $Numbers_Web_Application;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Configuration
	var $Numbers_Web_Configuration = function() {
	};
	$Numbers_Web_Configuration.__typeName = 'Numbers.Web.Configuration';
	global.Numbers.Web.Configuration = $Numbers_Web_Configuration;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ConfigurationExtensions
	var $Numbers_Web_ConfigurationExtensions = function() {
	};
	$Numbers_Web_ConfigurationExtensions.__typeName = 'Numbers.Web.ConfigurationExtensions';
	$Numbers_Web_ConfigurationExtensions.setValue = function(configuration, key, value) {
		var $t1 = ss.today();
		configuration.setValue(key, value, new Date($t1.getFullYear() + 1, $t1.getMonth(), $t1.getDate(), $t1.getHours(), $t1.getMinutes(), $t1.getSeconds(), $t1.getMilliseconds()));
	};
	global.Numbers.Web.ConfigurationExtensions = $Numbers_Web_ConfigurationExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.DocumentExtensions
	var $Numbers_Web_DocumentExtensions = function() {
	};
	$Numbers_Web_DocumentExtensions.__typeName = 'Numbers.Web.DocumentExtensions';
	$Numbers_Web_DocumentExtensions.getMetaPropertyValue = function(propertyName) {
		return Enumerable.from($Numbers_Web_ElementCollectionExtensions.toArray(document.getElementsByTagName('meta'))).where(function(element) {
			return ss.referenceEquals(element.getAttribute('property'), propertyName);
		}).first().getAttribute('content');
	};
	global.Numbers.Web.DocumentExtensions = $Numbers_Web_DocumentExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ElementCollectionExtensions
	var $Numbers_Web_ElementCollectionExtensions = function() {
	};
	$Numbers_Web_ElementCollectionExtensions.__typeName = 'Numbers.Web.ElementCollectionExtensions';
	$Numbers_Web_ElementCollectionExtensions.toArray = function(collection) {
		var array = new Array(collection.length);
		for (var i = 0; i < collection.length; i++) {
			array[i] = collection[i];
		}
		return array;
	};
	global.Numbers.Web.ElementCollectionExtensions = $Numbers_Web_ElementCollectionExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ElementExtensions
	var $Numbers_Web_ElementExtensions = function() {
	};
	$Numbers_Web_ElementExtensions.__typeName = 'Numbers.Web.ElementExtensions';
	global.Numbers.Web.ElementExtensions = $Numbers_Web_ElementExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.EventExtensions
	var $Numbers_Web_EventExtensions = function() {
	};
	$Numbers_Web_EventExtensions.__typeName = 'Numbers.Web.EventExtensions';
	global.Numbers.Web.EventExtensions = $Numbers_Web_EventExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Game
	var $Numbers_Web_Game = function(values, targetValue, solutionsCount) {
		this.$1$SolvedField = null;
		this.$1$InitialValuesField = null;
		this.$1$CurrentNumbersField = null;
		this.$1$TargetValueField = 0;
		this.$1$SolutionsCountField = 0;
		this.$1$StepsCountField = 0;
		this.$1$HintsCountField = 0;
		this.$stack = null;
		this.set_initialValues(Enumerable.from(values).toArray());
		this.set_currentNumbers(Enumerable.from(values).select($Numbers_Web_Number.create).toArray());
		this.set_targetValue(targetValue);
		this.set_solutionsCount(solutionsCount);
		this.$stack = new Array();
	};
	$Numbers_Web_Game.__typeName = 'Numbers.Web.Game';
	global.Numbers.Web.Game = $Numbers_Web_Game;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.GameFactory
	var $Numbers_Web_GameFactory = function() {
	};
	$Numbers_Web_GameFactory.__typeName = 'Numbers.Web.GameFactory';
	$Numbers_Web_GameFactory.createFromHash = function(value) {
		var hashValues = Enumerable.from(value.split('-')).select(function(valueString) {
			return parseInt(valueString);
		}).take(7).toArray();
		var values = Enumerable.from(hashValues).take(Enumerable.from(hashValues).count() - 1);
		var targetValue = Enumerable.from(hashValues).last();
		var solutionsCount = $Numbers_Web_Solver.countSolutions(values, targetValue);
		return new $Numbers_Web_Game(values, targetValue, solutionsCount);
	};
	$Numbers_Web_GameFactory.createFromLevel = function(level) {
		if (level < 0 || level > 100) {
			throw new ss.Exception('Level must be between 0 (easiest) and 100 (hardest)');
		}
		var normalizedLevel = level / 100;
		var minimumSolutionsCount = ss.Int32.trunc((1 - normalizedLevel) * 140 + normalizedLevel * 1);
		var maximumSolutionsCount = minimumSolutionsCount + Math.max(ss.Int32.div(minimumSolutionsCount, 10), 3);
		var targetMean = (1 - normalizedLevel) * 60 + normalizedLevel * 120;
		var targetSd = (1 - normalizedLevel) * 20 + normalizedLevel * 60;
		console.log(ss.formatString('Looking for a problem at level {0} with {1}-{2} solutions and target value around {3} ± {4}', level, minimumSolutionsCount, maximumSolutionsCount, ss.Int32.trunc(targetMean), ss.Int32.trunc(targetSd)));
		while (true) {
			var values = $Numbers_Web_GameFactory.$generateRandomValues(normalizedLevel);
			var target = {};
			var solutionsCount = {};
			var preferredTarget = ss.Int32.trunc($Numbers_Web_GameFactory.$getNormalDistributedRandom(targetMean, targetSd));
			if ($Numbers_Web_GameFactory.$trySelectTarget(values, minimumSolutionsCount, maximumSolutionsCount, preferredTarget, target, solutionsCount)) {
				console.log(ss.formatString('Found {0}-{1} with {2} solutions', Enumerable.from(values).select(function(value) {
					return value.toString();
				}).aggregate(function(s1, s2) {
					return ss.formatString('{0}-{1}', s1, s2);
				}), target.$, solutionsCount.$));
				return new $Numbers_Web_Game(values, target.$, solutionsCount.$);
			}
		}
	};
	$Numbers_Web_GameFactory.$trySelectTarget = function(values, minimumSolutions, maximumSolutions, preferredTarget, selectedTarget, selectedTargetSolutions) {
		selectedTarget.$ = 0;
		selectedTargetSolutions.$ = 0;
		var solutionsCount = $Numbers_Web_Solver.countAllSolutions(values, $Numbers_Web_GameFactory.$maximumTarget);
		var targets = Enumerable.from(solutionsCount).select(function(count, target) {
			return { item1: count, item2: target };
		}).where(function(tuple) {
			return tuple.item1 >= minimumSolutions && tuple.item1 <= maximumSolutions;
		}).select(function(tuple1) {
			return tuple1.item2;
		}).where(function(target1) {
			return target1 >= $Numbers_Web_GameFactory.$minimumTarget;
		}).toArray();
		if (targets.length === 0) {
			return false;
		}
		selectedTarget.$ = Enumerable.from(targets).orderBy(function(target2) {
			return Math.abs(target2 - preferredTarget);
		}).first();
		selectedTargetSolutions.$ = solutionsCount[selectedTarget.$];
		return true;
	};
	$Numbers_Web_GameFactory.$getNormalDistributedRandom = function(mean, sd) {
		//Box-Muller transform
		var normalizedValue = Math.sqrt(-2 * Math.log($Numbers_Web_GameFactory.$random.nextDouble())) * Math.sin(2 * Math.PI * $Numbers_Web_GameFactory.$random.nextDouble());
		return mean + sd * normalizedValue;
	};
	$Numbers_Web_GameFactory.$generateRandomValues = function(normalizedLevel) {
		var values = [];
		var value = 0;
		ss.add(values, value += 1 + $Numbers_Web_GameFactory.$random.nextMax(2));
		ss.add(values, value += 1 + $Numbers_Web_GameFactory.$random.nextMax(3));
		ss.add(values, value += 1 + $Numbers_Web_GameFactory.$random.nextMax(4));
		ss.add(values, value += 1 + $Numbers_Web_GameFactory.$random.nextMax(4 + ss.Int32.trunc(ss.round(normalizedLevel * 4))));
		ss.add(values, value += 1 + $Numbers_Web_GameFactory.$random.nextMax(6 + ss.Int32.trunc(ss.round(normalizedLevel * 6))));
		ss.add(values, value += 1 + $Numbers_Web_GameFactory.$random.nextMax(10 + ss.Int32.trunc(ss.round(normalizedLevel * 10))));
		return values;
	};
	global.Numbers.Web.GameFactory = $Numbers_Web_GameFactory;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.IConfiguration
	var $Numbers_Web_IConfiguration = function() {
	};
	$Numbers_Web_IConfiguration.__typeName = 'Numbers.Web.IConfiguration';
	global.Numbers.Web.IConfiguration = $Numbers_Web_IConfiguration;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.IGameHost
	var $Numbers_Web_IGameHost = function() {
	};
	$Numbers_Web_IGameHost.__typeName = 'Numbers.Web.IGameHost';
	global.Numbers.Web.IGameHost = $Numbers_Web_IGameHost;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Number
	var $Numbers_Web_Number = function(value, level, operand1, operand2, operator) {
		this.$1$ValueField = 0;
		this.$1$LevelField = 0;
		this.$1$Operand1Field = null;
		this.$1$Operand2Field = null;
		this.$1$OperatorField = 0;
		this.set_value(value);
		this.set_level(level);
		this.set_operand1(operand1);
		this.set_operand2(operand2);
		this.set_operator(operator);
	};
	$Numbers_Web_Number.__typeName = 'Numbers.Web.Number';
	$Numbers_Web_Number.op_Equality = function(a, b) {
		return ss.referenceEquals(a, null) && ss.referenceEquals(b, null) || !ss.referenceEquals(a, null) && a.equals(b);
	};
	$Numbers_Web_Number.op_Inequality = function(a, b) {
		return !$Numbers_Web_Number.op_Equality(a, b);
	};
	$Numbers_Web_Number.create = function(value) {
		return new $Numbers_Web_Number(value, 1, null, null, 0);
	};
	$Numbers_Web_Number.add = function(a, b) {
		return new $Numbers_Web_Number(a.get_value() + b.get_value(), a.get_level() + b.get_level(), a, b, 1);
	};
	$Numbers_Web_Number.subtract = function(a, b) {
		if (a.get_value() < b.get_value()) {
			var c = a;
			a = b;
			b = c;
		}
		return new $Numbers_Web_Number(a.get_value() - b.get_value(), a.get_level() + b.get_level(), a, b, 2);
	};
	$Numbers_Web_Number.multiply = function(a, b) {
		return new $Numbers_Web_Number(a.get_value() * b.get_value(), a.get_level() + b.get_level(), a, b, 3);
	};
	$Numbers_Web_Number.divide = function(a, b) {
		if (a.get_value() < b.get_value()) {
			var c = a;
			a = b;
			b = c;
		}
		if (b.get_value() === 0 || a.get_value() % b.get_value() !== 0) {
			return null;
		}
		return new $Numbers_Web_Number(((a.get_value() > b.get_value()) ? ss.Int32.div(a.get_value(), b.get_value()) : ss.Int32.div(b.get_value(), a.get_value())), a.get_level() + b.get_level(), a, b, 4);
	};
	$Numbers_Web_Number.$getOperatorString = function(value) {
		switch (value) {
			case 0: {
				return 'Create';
			}
			case 1: {
				return '+';
			}
			case 2: {
				return '-';
			}
			case 3: {
				return '*';
			}
			case 4: {
				return '/';
			}
			default: {
				throw new ss.Exception('Unrecognized Operator');
			}
		}
	};
	global.Numbers.Web.Number = $Numbers_Web_Number;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Operator
	var $Numbers_Web_Operator = function() {
	};
	$Numbers_Web_Operator.__typeName = 'Numbers.Web.Operator';
	global.Numbers.Web.Operator = $Numbers_Web_Operator;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Solver
	var $Numbers_Web_Solver = function() {
	};
	$Numbers_Web_Solver.__typeName = 'Numbers.Web.Solver';
	$Numbers_Web_Solver.getSolution = function(numbers, targetValue) {
		return Enumerable.from($Numbers_Web_Solver.$getTargets(Enumerable.from(numbers).toArray(), false)).where(function(target) {
			return target.get_value() === targetValue;
		}).firstOrDefault(null, ss.getDefaultValue($Numbers_Web_Number));
	};
	$Numbers_Web_Solver.getDistinctSolutions = function(numbers, targetValue) {
		if (Enumerable.from(numbers).distinct(new (ss.makeGenericType($Numbers_Web_Generic_ComparableEqualityComparer$1, [$Numbers_Web_Number]))()).count() !== Enumerable.from(numbers).count()) {
			throw new ss.Exception('Values are not distinct');
		}
		return Enumerable.from($Numbers_Web_Solver.$getTargets(Enumerable.from(numbers).toArray(), true)).where(function(target) {
			return target.get_value() === targetValue;
		});
	};
	$Numbers_Web_Solver.countSolutions = function(values, targetValue) {
		return Enumerable.from($Numbers_Web_Solver.getDistinctSolutions(Enumerable.from(values).select($Numbers_Web_Number.create).toArray(), targetValue)).count();
	};
	$Numbers_Web_Solver.countAllSolutions = function(values, maximumTargetValue) {
		if (Enumerable.from(values).distinct().count() !== Enumerable.from(values).count()) {
			throw new ss.Exception('Values are not distinct');
		}
		var solutionsCount = ss.repeat(0, maximumTargetValue);
		var $t1 = ss.getEnumerator($Numbers_Web_Solver.$getTargets(Enumerable.from(values).select($Numbers_Web_Number.create).toArray(), true));
		try {
			while ($t1.moveNext()) {
				var target = $t1.current();
				if (target.get_value() < maximumTargetValue) {
					solutionsCount[target.get_value()]++;
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return solutionsCount;
	};
	$Numbers_Web_Solver.$getTargets = function(numbers, unique) {
		return new ss.IteratorBlockEnumerable(function() {
			return (function(numbers, unique) {
				var $result, $state = 0, $t1, split, $t2, target1, $t3, target2, $t4, result;
				var $finally = function() {
					$t1.dispose();
				};
				var $finally1 = function() {
					$t2.dispose();
				};
				var $finally2 = function() {
					$t3.dispose();
				};
				var $finally3 = function() {
					$t4.dispose();
				};
				return new ss.IteratorBlockEnumerator(function() {
					$sm1:
					for (;;) {
						switch ($state) {
							case 0: {
								$state = -1;
								if (numbers.length === 1) {
									$result = numbers[0];
									$state = 2;
									return true;
								}
								$state = 1;
								continue $sm1;
							}
							case 2: {
								$state = -1;
								break $sm1;
							}
							case 1: {
								$state = -1;
								$t1 = ss.getEnumerator($Numbers_Web_Solver.$getSplittedGroups($Numbers_Web_Number).call(null, numbers));
								$state = 5;
								continue $sm1;
							}
							case 5: {
								$state = 3;
								if (!$t1.moveNext()) {
									$state = 4;
									continue $sm1;
								}
								split = $t1.current();
								$t2 = ss.getEnumerator($Numbers_Web_Solver.$getTargets(split.item1, unique));
								$state = 8;
								continue $sm1;
							}
							case 4: {
								$state = -1;
								$finally.call(this);
								$state = -1;
								break $sm1;
							}
							case 8: {
								$state = 6;
								if (!$t2.moveNext()) {
									$state = 7;
									continue $sm1;
								}
								target1 = $t2.current();
								$t3 = ss.getEnumerator($Numbers_Web_Solver.$getTargets(split.item2, unique));
								$state = 11;
								continue $sm1;
							}
							case 7: {
								$state = 3;
								$finally1.call(this);
								$state = 5;
								continue $sm1;
							}
							case 11: {
								$state = 9;
								if (!$t3.moveNext()) {
									$state = 10;
									continue $sm1;
								}
								target2 = $t3.current();
								$t4 = ss.getEnumerator($Numbers_Web_Solver.$getNumbersOperations(target1, target2, unique));
								$state = 14;
								continue $sm1;
							}
							case 10: {
								$state = 6;
								$finally2.call(this);
								$state = 8;
								continue $sm1;
							}
							case 14: {
								$state = 12;
								if (!$t4.moveNext()) {
									$state = 13;
									continue $sm1;
								}
								result = $t4.current();
								$result = result;
								$state = 14;
								return true;
							}
							case 13: {
								$state = 9;
								$finally3.call(this);
								$state = 11;
								continue $sm1;
							}
							default: {
								break $sm1;
							}
						}
					}
					return false;
				}, function() {
					return $result;
				}, function() {
					try {
						switch ($state) {
							case 3:
							case 4:
							case 5:
							case 6:
							case 7:
							case 8:
							case 9:
							case 10:
							case 11:
							case 12:
							case 13:
							case 14: {
								try {
									switch ($state) {
										case 6:
										case 7:
										case 8:
										case 9:
										case 10:
										case 11:
										case 12:
										case 13:
										case 14: {
											try {
												switch ($state) {
													case 9:
													case 10:
													case 11:
													case 12:
													case 13:
													case 14: {
														try {
															switch ($state) {
																case 12:
																case 13:
																case 14: {
																	try {
																		break;
																	}
																	finally {
																		$finally3.call(this);
																	}
																}
															}
														}
														finally {
															$finally2.call(this);
														}
													}
												}
											}
											finally {
												$finally1.call(this);
											}
										}
									}
								}
								finally {
									$finally.call(this);
								}
							}
						}
					}
					finally {
						$state = -1;
					}
				}, this);
			}).call(this, numbers, unique);
		}, this);
	};
	$Numbers_Web_Solver.$getSplittedGroups = function(T) {
		return function(items) {
			return new ss.IteratorBlockEnumerable(function() {
				return (function(items) {
					var $result, $state = 0, count, split;
					return new ss.IteratorBlockEnumerator(function() {
						$sm1:
						for (;;) {
							switch ($state) {
								case 0: {
									$state = -1;
									count = 1 << items.length - 1;
									split = 1;
									$state = 1;
									continue $sm1;
								}
								case 1: {
									$state = -1;
									if (!(split < count)) {
										$state = -1;
										break $sm1;
									}
									$result = { item1: Enumerable.from(items).where(function(item, i) {
										return (split >> i & 1) === 0;
									}).toArray(), item2: Enumerable.from(items).where(function(item1, i1) {
										return (split >> i1 & 1) === 1;
									}).toArray() };
									$state = 2;
									return true;
								}
								case 2: {
									$state = -1;
									split++;
									$state = 1;
									continue $sm1;
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
				}).call(this, items);
			}, this);
		};
	};
	$Numbers_Web_Solver.$getNumbersOperations = function(number1, number2, unique) {
		return new ss.IteratorBlockEnumerable(function() {
			return (function(number1, number2, unique) {
				var $result, $state = 0, number3, result;
				return new ss.IteratorBlockEnumerator(function() {
					$sm1:
					for (;;) {
						switch ($state) {
							case 0: {
								$state = -1;
								if (number1.compareTo(number2) < 0) {
									number3 = number1;
									number1 = number2;
									number2 = number3;
								}
								// check only these patterns (where a > b > c) and skip any other combination:
								// (a+b)+c, (a+b)-c, (a-b)+c, (a-b)-c (when c is not (d+e) or (d-e))
								// (a*b)*c, (a*b)/c, (a/b)*c, (a/b)/c (when c is not (d*e) or (d/e))
								if (!unique || (number1.get_operator() !== 1 && number1.get_operator() !== 2 || number1.get_operand1().compareTo(number2) > 0 && number1.get_operand2().compareTo(number2) > 0) && number2.get_operator() !== 1 && number2.get_operator() !== 2) {
									$result = $Numbers_Web_Number.add(number1, number2);
									$state = 2;
									return true;
								}
								$state = 1;
								continue $sm1;
							}
							case 2: {
								$state = -1;
								if (number2.get_value() !== 0) {
									$result = $Numbers_Web_Number.subtract(number1, number2);
									$state = 1;
									return true;
								}
								$state = 1;
								continue $sm1;
							}
							case 1: {
								$state = -1;
								if (!unique || (number1.get_operator() !== 3 && number1.get_operator() !== 4 || number1.get_operand1().compareTo(number2) > 0 && number1.get_operand2().compareTo(number2) > 0) && number2.get_operator() !== 3 && number2.get_operator() !== 4) {
									$result = $Numbers_Web_Number.multiply(number1, number2);
									$state = 3;
									return true;
								}
								$state = -1;
								break $sm1;
							}
							case 3: {
								$state = -1;
								if (number2.get_value() !== 1) {
									result = $Numbers_Web_Number.divide(number1, number2);
									if ($Numbers_Web_Number.op_Inequality(result, null)) {
										$result = result;
										$state = -1;
										return true;
									}
									$state = -1;
									break $sm1;
								}
								$state = -1;
								break $sm1;
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
			}).call(this, number1, number2, unique);
		}, this);
	};
	$Numbers_Web_Solver.findInitialOperation = function(target, initialNumbers) {
		return $Numbers_Web_Solver.$findInitialOperation(target, Enumerable.from(initialNumbers).toArray());
	};
	$Numbers_Web_Solver.$findInitialOperation = function(target, initialNumbers) {
		if ($Numbers_Web_Number.op_Equality(target, null)) {
			return null;
		}
		if (ss.contains(initialNumbers, target.get_operand1()) && ss.contains(initialNumbers, target.get_operand2())) {
			return target;
		}
		return $Numbers_Web_Solver.$findInitialOperation(target.get_operand1(), initialNumbers) || $Numbers_Web_Solver.$findInitialOperation(target.get_operand2(), initialNumbers);
	};
	global.Numbers.Web.Solver = $Numbers_Web_Solver;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Statistics
	var $Numbers_Web_Statistics = function(configuration) {
		this.$configuration = null;
		this.$totalSolvedCount = 0;
		this.$sessionSolvedCount = 0;
		this.$currentGameStart = new Date(0);
		this.$currentGame = null;
		this.$configuration = configuration;
		var storedSolvedCount = {};
		this.$totalSolvedCount = (ss.Int32.tryParse(configuration.getValue($Numbers_Web_Statistics.$solvedCountConfigurationKey), storedSolvedCount) ? storedSolvedCount.$ : 0);
	};
	$Numbers_Web_Statistics.__typeName = 'Numbers.Web.Statistics';
	$Numbers_Web_Statistics.$getSolutionsCategory = function(solutionsCount) {
		var rangeSize;
		if (solutionsCount < 8) {
			rangeSize = 1;
		}
		else if (solutionsCount < 16) {
			rangeSize = 2;
		}
		else if (solutionsCount < 32) {
			rangeSize = 4;
		}
		else if (solutionsCount < 64) {
			rangeSize = 8;
		}
		else {
			rangeSize = 16;
		}
		return ((rangeSize === 1) ? ss.formatString('Game solutions {0}', solutionsCount) : ss.formatString('Game solutions {0}-{1}', rangeSize * ss.Int32.div(solutionsCount, rangeSize), rangeSize * (ss.Int32.div(solutionsCount, rangeSize) + 1) - 1));
	};
	$Numbers_Web_Statistics.$getTargetCategory = function(targetValue) {
		var rangeSize = 50;
		return ss.formatString('Game target {0}-{1}', rangeSize * ss.Int32.div(targetValue, rangeSize), rangeSize * (ss.Int32.div(targetValue, rangeSize) + 1) - 1);
	};
	global.Numbers.Web.Statistics = $Numbers_Web_Statistics;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.StyleExtensions
	var $Numbers_Web_StyleExtensions = function() {
	};
	$Numbers_Web_StyleExtensions.__typeName = 'Numbers.Web.StyleExtensions';
	$Numbers_Web_StyleExtensions.getTransitionDictionary = function(style) {
		return new $Numbers_Web_TokenDictionary(function() {
			return style.transition;
		}, function(value) {
			style.transition = value;
			null;
		});
	};
	global.Numbers.Web.StyleExtensions = $Numbers_Web_StyleExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.TokenDictionary
	var $Numbers_Web_TokenDictionary = function(getRawList, setRawList) {
		this.$getRawList = null;
		this.$setRawList = null;
		this.$getRawList = getRawList;
		this.$setRawList = setRawList;
	};
	$Numbers_Web_TokenDictionary.__typeName = 'Numbers.Web.TokenDictionary';
	$Numbers_Web_TokenDictionary.$createDictionary = function(rawList) {
		return (ss.isNullOrEmptyString(rawList) ? new (ss.makeGenericType(ss.Dictionary$2, [String, String]))() : Enumerable.from(rawList.split(String.fromCharCode($Numbers_Web_TokenDictionary.$tokenSeparator))).where(function(token) {
			return !ss.isNullOrEmptyString(token);
		}).toDictionary($Numbers_Web_TokenDictionary.$getTokenKey, $Numbers_Web_TokenDictionary.$getTokenValue, String, String));
	};
	$Numbers_Web_TokenDictionary.$createRawList = function(dictionary) {
		return Enumerable.from(dictionary.get_keys()).select(function(key) {
			return ss.formatString('{0}{1}{2}', key, String.fromCharCode($Numbers_Web_TokenDictionary.$keyValueSeparator), dictionary.get_item(key));
		}).defaultIfEmpty('').aggregate(function(s1, s2) {
			return ss.formatString('{0}{1} {2}', s1, String.fromCharCode($Numbers_Web_TokenDictionary.$tokenSeparator), s2);
		});
	};
	$Numbers_Web_TokenDictionary.$getTokenKey = function(token) {
		token = ss.trimStartString(token);
		var index = token.indexOf(String.fromCharCode($Numbers_Web_TokenDictionary.$keyValueSeparator));
		return ((index === -1) ? token : token.substr(0, index));
	};
	$Numbers_Web_TokenDictionary.$getTokenValue = function(token) {
		token = ss.trimStartString(token);
		var index = token.indexOf(String.fromCharCode($Numbers_Web_TokenDictionary.$keyValueSeparator));
		return ((index === -1) ? '' : ss.trimStartString(token.substring(index + 1), [$Numbers_Web_TokenDictionary.$keyValueSeparator]));
	};
	global.Numbers.Web.TokenDictionary = $Numbers_Web_TokenDictionary;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.Button
	var $Numbers_Web_Controls_Button = function(initialCheck, classesName) {
		this.$2$IsEnabledField = false;
		this.$2$IsCheckedChangedField = null;
		this.$isChecked = false;
		this.$2$ShadowField = null;
		this.$overlay = null;
		this.$checkedAnimation = null;
		this.$uncheckedAnimation = null;
		this.$overlayAnimation = null;
		$Numbers_Web_Controls_Control.call(this, ['button']);
		this.$isChecked = initialCheck;
		this.set_isEnabled(true);
		for (var $t1 = 0; $t1 < classesName.length; $t1++) {
			var className = classesName[$t1];
			this.get_htmlElement().classList.add(className);
		}
		this.get_htmlElement().setAttribute('data-is-checked', this.get_isChecked().toString());
		this.set_shadow(new $Numbers_Web_Controls_Control(['button-shadow']));
		this.$overlay = new $Numbers_Web_Controls_Control(['button-overlay']);
		this.appendChild(this.$overlay);
		window.addEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
		window.addEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
		var transformValueBounds = new $Numbers_Web_Transitions_ScaleValueBounds(1, 1.08);
		var opacityValueBounds = new $Numbers_Web_Transitions_DoubleValueBounds(0, 1);
		var transitionTiming = new $Numbers_Web_Transitions_TransitionTiming($Numbers_Web_Controls_Button.$checkAnimationDurationMilliseconds, null, 0);
		this.$checkedAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_htmlElement(), ['transform', '-webkit-transform'], transformValueBounds, transitionTiming, 0, 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_shadow().get_htmlElement(), ['transform', '-webkit-transform'], transformValueBounds, transitionTiming, 0, 0), new $Numbers_Web_Transitions_Transition(this.get_shadow().get_htmlElement(), 'opacity', opacityValueBounds, transitionTiming, 0, 0)]);
		this.$uncheckedAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_htmlElement(), ['transform', '-webkit-transform'], $Numbers_Web_Transitions_ValueBoundsExtensions.reverse(transformValueBounds), transitionTiming, 0, 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_shadow().get_htmlElement(), ['transform', '-webkit-transform'], $Numbers_Web_Transitions_ValueBoundsExtensions.reverse(transformValueBounds), transitionTiming, 0, 0), new $Numbers_Web_Transitions_Transition(this.get_shadow().get_htmlElement(), 'opacity', $Numbers_Web_Transitions_ValueBoundsExtensions.reverse(opacityValueBounds), transitionTiming, 0, 0)]);
		this.$overlayAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_MultiplePropertyTransition(this.$overlay.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(0, 1.5), new $Numbers_Web_Transitions_TransitionTiming(400, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.$overlay.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(100, $Numbers_Web_Transitions_TimingCurve.easeIn, 0), 0, 2), new $Numbers_Web_Transitions_Transition(this.$overlay.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(200, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 100, 2)]);
		if (this.get_isChecked()) {
			this.get_htmlElement().style['transform'] = transformValueBounds.get_formattedEndValue();
			this.get_htmlElement().style['-webkit-transform'] = transformValueBounds.get_formattedEndValue();
			this.get_shadow().get_htmlElement().style['transform'] = transformValueBounds.get_formattedEndValue();
			this.get_shadow().get_htmlElement().style['-webkit-transform'] = transformValueBounds.get_formattedEndValue();
		}
	};
	$Numbers_Web_Controls_Button.__typeName = 'Numbers.Web.Controls.Button';
	global.Numbers.Web.Controls.Button = $Numbers_Web_Controls_Button;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.Control
	var $Numbers_Web_Controls_Control = function(classesName) {
		this.$1$HtmlElementField = null;
		this.$left = 0;
		this.$top = 0;
		this.$children = null;
		this.set_htmlElement(document.createElement('div'));
		this.$children = [];
		for (var $t1 = 0; $t1 < classesName.length; $t1++) {
			var className = classesName[$t1];
			if (!ss.isNullOrEmptyString(className)) {
				this.get_htmlElement().classList.add(className);
			}
		}
	};
	$Numbers_Web_Controls_Control.__typeName = 'Numbers.Web.Controls.Control';
	global.Numbers.Web.Controls.Control = $Numbers_Web_Controls_Control;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.DialogContainer
	var $Numbers_Web_Controls_DialogContainer = function() {
		this.$currentDialog = null;
		this.$dialogWidth = 0;
		this.$dialogHeight = 0;
		this.$appearTransition = null;
		this.$disappearTransition = null;
		$Numbers_Web_Controls_Control.call(this, ['dialog-container']);
		this.get_htmlElement().style.opacity = '0';
		this.get_htmlElement().style.visibility = 'hidden';
		this.$appearTransition = new $Numbers_Web_Transitions_SequentialTransition([new $Numbers_Web_Transitions_Keyframe(this.get_htmlElement(), 'visibility', 'visible', 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(200, $Numbers_Web_Transitions_TimingCurve.easeIn, 0), 0, 0)]);
		this.$disappearTransition = new $Numbers_Web_Transitions_SequentialTransition([new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(200, $Numbers_Web_Transitions_TimingCurve.easeIn, 0), 0, 0), new $Numbers_Web_Transitions_Keyframe(this.get_htmlElement(), 'visibility', 'hidden', 0)]);
		window.addEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
		window.addEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
		window.addEventListener('resize', ss.mkdel(this, this.$updateLayout));
	};
	$Numbers_Web_Controls_DialogContainer.__typeName = 'Numbers.Web.Controls.DialogContainer';
	global.Numbers.Web.Controls.DialogContainer = $Numbers_Web_Controls_DialogContainer;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.Direction
	var $Numbers_Web_Controls_Direction = function() {
	};
	$Numbers_Web_Controls_Direction.__typeName = 'Numbers.Web.Controls.Direction';
	global.Numbers.Web.Controls.Direction = $Numbers_Web_Controls_Direction;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.IDialogContainer
	var $Numbers_Web_Controls_IDialogContainer = function() {
	};
	$Numbers_Web_Controls_IDialogContainer.__typeName = 'Numbers.Web.Controls.IDialogContainer';
	global.Numbers.Web.Controls.IDialogContainer = $Numbers_Web_Controls_IDialogContainer;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.Label
	var $Numbers_Web_Controls_Label = function(classesName) {
		$Numbers_Web_Controls_Control.call(this, Enumerable.from(classesName.concat(['label'])).toArray());
		//
	};
	$Numbers_Web_Controls_Label.__typeName = 'Numbers.Web.Controls.Label';
	global.Numbers.Web.Controls.Label = $Numbers_Web_Controls_Label;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.Link
	var $Numbers_Web_Controls_Link = function(className) {
		this.$linkElement = null;
		$Numbers_Web_Controls_Control.call(this, ['link', className]);
		this.$linkElement = document.createElement('a');
		this.$linkElement.setAttribute('target', '_blank');
		this.get_htmlElement().appendChild(this.$linkElement);
	};
	$Numbers_Web_Controls_Link.__typeName = 'Numbers.Web.Controls.Link';
	global.Numbers.Web.Controls.Link = $Numbers_Web_Controls_Link;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.ToolbarButton
	var $Numbers_Web_Controls_ToolbarButton = function(className, mouseDown, mouseUp) {
		this.$2$IsEnabledField = false;
		this.$2$IsPressedField = false;
		this.$mouseDown = null;
		this.$mouseUp = null;
		$Numbers_Web_Controls_Control.call(this, ['toolbar-button', className]);
		this.$mouseDown = mouseDown;
		this.$mouseUp = mouseUp;
		this.set_isEnabled(true);
		window.addEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
		window.addEventListener('touchend', ss.mkdel(this, this.$onPointerUp), false);
		window.addEventListener('touchmove', ss.mkdel(this, this.$onPointerMove), false);
		window.addEventListener('touchcancel', ss.mkdel(this, this.$onPointerUp), false);
		window.addEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
		window.addEventListener('mouseup', ss.mkdel(this, this.$onPointerUp), false);
		this.get_htmlElement().addEventListener('mouseleave', ss.mkdel(this, function(e) {
			if (this.get_isPressed()) {
				this.$onPointerUp(e);
			}
		}), false);
	};
	$Numbers_Web_Controls_ToolbarButton.__typeName = 'Numbers.Web.Controls.ToolbarButton';
	global.Numbers.Web.Controls.ToolbarButton = $Numbers_Web_Controls_ToolbarButton;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Controls.Tooltip
	var $Numbers_Web_Controls_Tooltip = function(text, arrowsDirection, arrowsOffset) {
		this.$arrowsDirection = 0;
		this.$arrows = null;
		this.$arrowsOffset = null;
		this.$label = null;
		this.$appearTransition = null;
		this.$disappearTransition = null;
		$Numbers_Web_Controls_Control.call(this, ['tooltip']);
		this.$arrowsDirection = arrowsDirection;
		this.$arrowsOffset = ss.arrayClone(arrowsOffset);
		var container = new $Numbers_Web_Controls_Control(['tooltip-container']);
		var $t1 = new $Numbers_Web_Controls_Label(['tooltip-label']);
		$t1.set_text(text);
		this.$label = $t1;
		this.$label.get_htmlElement().style.minWidth = ss.formatString('{0}px', Enumerable.from(arrowsOffset).max() + 8);
		this.appendChild(container);
		this.appendChild(this.$label);
		this.$arrows = Enumerable.from(arrowsOffset).select(function(offset) {
			return new $Numbers_Web_Controls_Control(['tooltip-arrow']);
		}).toArray();
		var $t2 = ss.getEnumerator(this.$arrows);
		try {
			while ($t2.moveNext()) {
				var arrow = $t2.current();
				this.appendChild(arrow);
			}
		}
		finally {
			$t2.dispose();
		}
		this.get_htmlElement().style.visibility = 'hidden';
		this.get_htmlElement().style.opacity = '0';
		var topMargin = ((arrowsDirection === 1) ? -15 : ((arrowsDirection === 3) ? 15 : 0));
		var leftMargin = ((arrowsDirection === 0) ? -15 : ((arrowsDirection === 2) ? 15 : 0));
		var appearMargin = ss.formatString('{0}px 0px 0px {1}px', topMargin, leftMargin);
		var disappearMargin = ss.formatString('{0}px 0px 0px {1}px', -topMargin, -leftMargin);
		this.get_htmlElement().addEventListener('mousedown', ss.mkdel(this, function() {
			this.startDisappearAnimation();
		}));
		this.$appearTransition = new $Numbers_Web_Transitions_SequentialTransition([new $Numbers_Web_Transitions_Keyframe(this.get_htmlElement(), 'visibility', 'visible', 0), new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming($Numbers_Web_Controls_Tooltip.appearDuration, $Numbers_Web_Transitions_TimingCurve.easeIn, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'margin', new $Numbers_Web_Transitions_ValueBounds(appearMargin, '0px 0px 0px 0px', null), new $Numbers_Web_Transitions_TransitionTiming($Numbers_Web_Controls_Tooltip.appearDuration, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 0, 0)])]);
		this.$disappearTransition = new $Numbers_Web_Transitions_SequentialTransition([new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming($Numbers_Web_Controls_Tooltip.disappearDuration, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'margin', new $Numbers_Web_Transitions_ValueBounds('0px 0px 0px 0px', disappearMargin, null), new $Numbers_Web_Transitions_TransitionTiming($Numbers_Web_Controls_Tooltip.disappearDuration, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 0, 0)]), new $Numbers_Web_Transitions_Keyframe(this.get_htmlElement(), 'visibility', 'hidden', 0)]);
	};
	$Numbers_Web_Controls_Tooltip.__typeName = 'Numbers.Web.Controls.Tooltip';
	global.Numbers.Web.Controls.Tooltip = $Numbers_Web_Controls_Tooltip;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.ComparableEqualityComparer
	var $Numbers_Web_Generic_ComparableEqualityComparer$1 = function(T) {
		var $type = function() {
		};
		ss.registerGenericClassInstance($type, $Numbers_Web_Generic_ComparableEqualityComparer$1, [T], {
			areEqual: function(x, y) {
				return ss.compare(x, y) === 0;
			},
			getObjectHashCode: function(obj) {
				return ss.getHashCode(obj);
			},
			equals$1: function(x, y) {
				return ss.compare(ss.cast(x, T), ss.cast(y, T)) === 0;
			},
			getHashCode$1: function(obj) {
				return ss.getHashCode(obj);
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEqualityComparer, ss.IEqualityComparer];
		});
		return $type;
	};
	$Numbers_Web_Generic_ComparableEqualityComparer$1.__typeName = 'Numbers.Web.Generic.ComparableEqualityComparer$1';
	ss.initGenericClass($Numbers_Web_Generic_ComparableEqualityComparer$1, $asm, 1);
	global.Numbers.Web.Generic.ComparableEqualityComparer$1 = $Numbers_Web_Generic_ComparableEqualityComparer$1;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.ConvertedObservableCollection
	var $Numbers_Web_Generic_ConvertedObservableCollection$2 = function(S, T) {
		var $type = function(sourceCollection, convertItem, detachItem) {
			this.$1$CollectionChangedField = null;
			this.$sourceCollection = null;
			this.$convertedCollection = null;
			this.$convertItem = null;
			this.$detachItem = null;
			this.$sourceCollection = sourceCollection;
			this.$convertedCollection = new (ss.makeGenericType($Numbers_Web_Generic_ObservableCollection$1, [T]))();
			this.$convertItem = convertItem;
			this.$detachItem = detachItem;
			this.$build();
			sourceCollection.add_collectionChanged(ss.mkdel(this, this.$sourceCollectionChanged));
			this.$convertedCollection.add_collectionChanged(ss.mkdel(this, this.$convertedCollectionChanged));
		};
		ss.registerGenericClassInstance($type, $Numbers_Web_Generic_ConvertedObservableCollection$2, [S, T], {
			add_collectionChanged: function(value) {
				this.$1$CollectionChangedField = ss.delegateCombine(this.$1$CollectionChangedField, value);
			},
			remove_collectionChanged: function(value) {
				this.$1$CollectionChangedField = ss.delegateRemove(this.$1$CollectionChangedField, value);
			},
			$build: function() {
				var $t1 = ss.getEnumerator(this.$sourceCollection);
				try {
					while ($t1.moveNext()) {
						var sourceItem = $t1.current();
						this.$convertedCollection.add(this.$convertItem(sourceItem));
					}
				}
				finally {
					$t1.dispose();
				}
			},
			$clear: function() {
				if (!ss.staticEquals(this.$detachItem, null)) {
					var $t1 = this.$convertedCollection.getEnumerator();
					try {
						while ($t1.moveNext()) {
							var convertedItem = $t1.current();
							this.$detachItem(convertedItem);
						}
					}
					finally {
						$t1.dispose();
					}
				}
				this.$convertedCollection.clear();
			},
			$sourceCollectionChanged: function(sender, eventArgs) {
				if (eventArgs.get_action() === 0) {
					this.$convertedCollection.insert(eventArgs.get_index(), this.$convertItem(ss.cast(eventArgs.get_item(), S)));
				}
				if (eventArgs.get_action() === 1) {
					if (!ss.staticEquals(this.$detachItem, null)) {
						this.$detachItem(this.$convertedCollection.get_item(eventArgs.get_index()));
					}
					this.$convertedCollection.removeAt(eventArgs.get_index());
				}
				if (eventArgs.get_action() === 2) {
					this.$clear();
					this.$build();
				}
			},
			$convertedCollectionChanged: function(sender, eventArgs) {
				if (!ss.staticEquals(this.$1$CollectionChangedField, null)) {
					this.$1$CollectionChangedField(this, eventArgs);
				}
			},
			getEnumerator: function() {
				return this.$convertedCollection.getEnumerator();
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable, $Numbers_Web_Generic_INotifyCollectionChanged, ss.makeGenericType($Numbers_Web_Generic_IObservableEnumerable$1, [T])];
		});
		return $type;
	};
	$Numbers_Web_Generic_ConvertedObservableCollection$2.__typeName = 'Numbers.Web.Generic.ConvertedObservableCollection$2';
	ss.initGenericClass($Numbers_Web_Generic_ConvertedObservableCollection$2, $asm, 2);
	global.Numbers.Web.Generic.ConvertedObservableCollection$2 = $Numbers_Web_Generic_ConvertedObservableCollection$2;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.INotifyCollectionChanged
	var $Numbers_Web_Generic_INotifyCollectionChanged = function() {
	};
	$Numbers_Web_Generic_INotifyCollectionChanged.__typeName = 'Numbers.Web.Generic.INotifyCollectionChanged';
	global.Numbers.Web.Generic.INotifyCollectionChanged = $Numbers_Web_Generic_INotifyCollectionChanged;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.INotifyPropertyChanged
	var $Numbers_Web_Generic_INotifyPropertyChanged = function() {
	};
	$Numbers_Web_Generic_INotifyPropertyChanged.__typeName = 'Numbers.Web.Generic.INotifyPropertyChanged';
	global.Numbers.Web.Generic.INotifyPropertyChanged = $Numbers_Web_Generic_INotifyPropertyChanged;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.IObservableCollection
	var $Numbers_Web_Generic_IObservableCollection$1 = function(T) {
		var $type = function() {
		};
		ss.registerGenericInterfaceInstance($type, $Numbers_Web_Generic_IObservableCollection$1, [T], {}, function() {
			return [ss.IEnumerable, ss.IEnumerable, $Numbers_Web_Generic_INotifyCollectionChanged, ss.makeGenericType($Numbers_Web_Generic_IObservableEnumerable$1, [T]), ss.ICollection, ss.IList];
		});
		return $type;
	};
	$Numbers_Web_Generic_IObservableCollection$1.__typeName = 'Numbers.Web.Generic.IObservableCollection$1';
	ss.initGenericInterface($Numbers_Web_Generic_IObservableCollection$1, $asm, 1);
	global.Numbers.Web.Generic.IObservableCollection$1 = $Numbers_Web_Generic_IObservableCollection$1;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.IObservableEnumerable
	var $Numbers_Web_Generic_IObservableEnumerable$1 = function(T) {
		var $type = function() {
		};
		ss.registerGenericInterfaceInstance($type, $Numbers_Web_Generic_IObservableEnumerable$1, [T], {}, function() {
			return [ss.IEnumerable, ss.IEnumerable, $Numbers_Web_Generic_INotifyCollectionChanged];
		});
		return $type;
	};
	$Numbers_Web_Generic_IObservableEnumerable$1.__typeName = 'Numbers.Web.Generic.IObservableEnumerable$1';
	ss.initGenericInterface($Numbers_Web_Generic_IObservableEnumerable$1, $asm, 1);
	global.Numbers.Web.Generic.IObservableEnumerable$1 = $Numbers_Web_Generic_IObservableEnumerable$1;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.NotifyCollectionChangedAction
	var $Numbers_Web_Generic_NotifyCollectionChangedAction = function() {
	};
	$Numbers_Web_Generic_NotifyCollectionChangedAction.__typeName = 'Numbers.Web.Generic.NotifyCollectionChangedAction';
	global.Numbers.Web.Generic.NotifyCollectionChangedAction = $Numbers_Web_Generic_NotifyCollectionChangedAction;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.NotifyCollectionChangedEventArgs
	var $Numbers_Web_Generic_NotifyCollectionChangedEventArgs = function(action, item, index) {
		this.$2$ActionField = 0;
		this.$2$ItemField = null;
		this.$2$IndexField = 0;
		ss.EventArgs.call(this);
		this.set_action(action);
		this.set_item(item);
		this.set_index(index);
	};
	$Numbers_Web_Generic_NotifyCollectionChangedEventArgs.__typeName = 'Numbers.Web.Generic.NotifyCollectionChangedEventArgs';
	$Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createAdd = function(item, index) {
		return new $Numbers_Web_Generic_NotifyCollectionChangedEventArgs(0, item, index);
	};
	$Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createRemove = function(item, index) {
		return new $Numbers_Web_Generic_NotifyCollectionChangedEventArgs(1, item, index);
	};
	$Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createReset = function() {
		return new $Numbers_Web_Generic_NotifyCollectionChangedEventArgs(2, null, -1);
	};
	global.Numbers.Web.Generic.NotifyCollectionChangedEventArgs = $Numbers_Web_Generic_NotifyCollectionChangedEventArgs;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.ObservableCollection
	var $Numbers_Web_Generic_ObservableCollection$1 = function(T) {
		var $type = function() {
			this.$1$CollectionChangedField = null;
			this.$1$PropertyChangedField = null;
			this.$items = null;
			this.$items = [];
		};
		ss.registerGenericClassInstance($type, $Numbers_Web_Generic_ObservableCollection$1, [T], {
			add_collectionChanged: function(value) {
				this.$1$CollectionChangedField = ss.delegateCombine(this.$1$CollectionChangedField, value);
			},
			remove_collectionChanged: function(value) {
				this.$1$CollectionChangedField = ss.delegateRemove(this.$1$CollectionChangedField, value);
			},
			add_propertyChanged: function(value) {
				this.$1$PropertyChangedField = ss.delegateCombine(this.$1$PropertyChangedField, value);
			},
			remove_propertyChanged: function(value) {
				this.$1$PropertyChangedField = ss.delegateRemove(this.$1$PropertyChangedField, value);
			},
			get_count: function() {
				return this.$items.length;
			},
			get_item: function(index) {
				return this.$items[index];
			},
			set_item: function(index, value) {
				this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createRemove(this.$items[index], index));
				this.$items[index] = value;
				this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createAdd(value, index));
			},
			add: function(item) {
				ss.add(this.$items, item);
				this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createAdd(item, this.get_count() - 1));
				this.$raisePropertyChanged($type.$countPropertyChangedEventArgs);
			},
			insert: function(index, item) {
				if (index > this.$items.length) {
					this.add(item);
				}
				else {
					if (index < 0) {
						index = 0;
					}
					ss.insert(this.$items, index, item);
					this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createAdd(item, index));
					this.$raisePropertyChanged($type.$countPropertyChangedEventArgs);
				}
			},
			remove: function(item) {
				var index = ss.indexOf(this.$items, item);
				if (index === -1) {
					return false;
				}
				ss.remove(this.$items, item);
				this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createRemove(item, index));
				this.$raisePropertyChanged($type.$countPropertyChangedEventArgs);
				return true;
			},
			removeAt: function(index) {
				var item = this.$items[index];
				ss.removeAt(this.$items, index);
				this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createRemove(item, index));
				this.$raisePropertyChanged($type.$countPropertyChangedEventArgs);
			},
			clear: function() {
				if (this.get_count() > 0) {
					ss.clear(this.$items);
					this.$raiseCollectionChanged($Numbers_Web_Generic_NotifyCollectionChangedEventArgs.createReset());
					this.$raisePropertyChanged($type.$countPropertyChangedEventArgs);
				}
			},
			contains: function(item) {
				return ss.contains(this.$items, item);
			},
			indexOf: function(item) {
				return ss.indexOf(this.$items, item);
			},
			getEnumerator: function() {
				return ss.getEnumerator(this.$items);
			},
			$raisePropertyChanged: function(e) {
				if (!ss.staticEquals(this.$1$PropertyChangedField, null)) {
					this.$1$PropertyChangedField(this, e);
				}
			},
			$raiseCollectionChanged: function(e) {
				if (!ss.staticEquals(this.$1$CollectionChangedField, null)) {
					this.$1$CollectionChangedField(this, e);
				}
			}
		}, function() {
			return null;
		}, function() {
			return [ss.IEnumerable, ss.IEnumerable, $Numbers_Web_Generic_INotifyCollectionChanged, ss.makeGenericType($Numbers_Web_Generic_IObservableEnumerable$1, [T]), ss.ICollection, ss.IList, ss.makeGenericType($Numbers_Web_Generic_IObservableCollection$1, [T]), $Numbers_Web_Generic_INotifyPropertyChanged];
		});
		$type.$countPropertyChangedEventArgs = new $Numbers_Web_Generic_PropertyChangedEventArgs('Count');
		return $type;
	};
	$Numbers_Web_Generic_ObservableCollection$1.__typeName = 'Numbers.Web.Generic.ObservableCollection$1';
	ss.initGenericClass($Numbers_Web_Generic_ObservableCollection$1, $asm, 1);
	global.Numbers.Web.Generic.ObservableCollection$1 = $Numbers_Web_Generic_ObservableCollection$1;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Generic.PropertyChangedEventArgs
	var $Numbers_Web_Generic_PropertyChangedEventArgs = function(propertyName) {
		this.$2$PropertyNameField = null;
		ss.EventArgs.call(this);
		this.set_propertyName(propertyName);
	};
	$Numbers_Web_Generic_PropertyChangedEventArgs.__typeName = 'Numbers.Web.Generic.PropertyChangedEventArgs';
	global.Numbers.Web.Generic.PropertyChangedEventArgs = $Numbers_Web_Generic_PropertyChangedEventArgs;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.DoubleValueBounds
	var $Numbers_Web_Transitions_DoubleValueBounds = function(startValue, endValue) {
		this.$1$FormattedStartValueField = null;
		this.$1$FormattedEndValueField = null;
		this.$startValue = 0;
		this.$endValue = 0;
		this.$startValue = startValue;
		this.$endValue = endValue;
		this.set_formattedStartValue(startValue.toString());
		this.set_formattedEndValue(endValue.toString());
	};
	$Numbers_Web_Transitions_DoubleValueBounds.__typeName = 'Numbers.Web.Transitions.DoubleValueBounds';
	global.Numbers.Web.Transitions.DoubleValueBounds = $Numbers_Web_Transitions_DoubleValueBounds;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.ITransition
	var $Numbers_Web_Transitions_ITransition = function() {
	};
	$Numbers_Web_Transitions_ITransition.__typeName = 'Numbers.Web.Transitions.ITransition';
	global.Numbers.Web.Transitions.ITransition = $Numbers_Web_Transitions_ITransition;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.IValueBounds
	var $Numbers_Web_Transitions_IValueBounds = function() {
	};
	$Numbers_Web_Transitions_IValueBounds.__typeName = 'Numbers.Web.Transitions.IValueBounds';
	global.Numbers.Web.Transitions.IValueBounds = $Numbers_Web_Transitions_IValueBounds;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.Keyframe
	var $Numbers_Web_Transitions_Keyframe = function(targetElement, targetProperty, keyframeValue, delayMilliseconds) {
		this.$1$CompletedField = null;
		this.$targetElement = null;
		this.$targetProperty = null;
		this.$keyframeValue = null;
		this.$delay = 0;
		this.$cancellationToken = 0;
		this.$targetElement = targetElement;
		this.$targetProperty = targetProperty;
		this.$keyframeValue = keyframeValue;
		this.$delay = delayMilliseconds;
	};
	$Numbers_Web_Transitions_Keyframe.__typeName = 'Numbers.Web.Transitions.Keyframe';
	global.Numbers.Web.Transitions.Keyframe = $Numbers_Web_Transitions_Keyframe;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.MultiplePropertyTransition
	var $Numbers_Web_Transitions_MultiplePropertyTransition = function(targetElement, targetProperties, bounds, timing, delayMilliseconds, continuationMode) {
		this.$1$CompletedField = null;
		this.$transition = null;
		this.$transition = new $Numbers_Web_Transitions_ParallelTransition(Enumerable.from(targetProperties).select(function(targetProperty) {
			return new $Numbers_Web_Transitions_Transition(targetElement, targetProperty, bounds, timing, delayMilliseconds, continuationMode);
		}).toArray());
		this.$transition.add_completed(ss.mkdel(this, function(sender, e) {
			this.$raiseCompleted();
		}));
	};
	$Numbers_Web_Transitions_MultiplePropertyTransition.__typeName = 'Numbers.Web.Transitions.MultiplePropertyTransition';
	global.Numbers.Web.Transitions.MultiplePropertyTransition = $Numbers_Web_Transitions_MultiplePropertyTransition;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.ParallelTransition
	var $Numbers_Web_Transitions_ParallelTransition = function(transitions) {
		this.$1$CompletedField = null;
		this.$transitions = null;
		this.$completedCount = 0;
		this.$transitions = ss.arrayClone(transitions);
		for (var $t1 = 0; $t1 < transitions.length; $t1++) {
			var transition = transitions[$t1];
			transition.add_completed(ss.mkdel(this, this.$onTransitionCompleted));
		}
	};
	$Numbers_Web_Transitions_ParallelTransition.__typeName = 'Numbers.Web.Transitions.ParallelTransition';
	global.Numbers.Web.Transitions.ParallelTransition = $Numbers_Web_Transitions_ParallelTransition;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.PixelValueBounds
	var $Numbers_Web_Transitions_PixelValueBounds = function(startValue, endValue) {
		this.$1$FormattedStartValueField = null;
		this.$1$FormattedEndValueField = null;
		this.$startValue = 0;
		this.$endValue = 0;
		this.$startValue = startValue;
		this.$endValue = endValue;
		this.set_formattedStartValue($Numbers_Web_Transitions_PixelValueBounds.$formatValue(startValue));
		this.set_formattedEndValue($Numbers_Web_Transitions_PixelValueBounds.$formatValue(endValue));
	};
	$Numbers_Web_Transitions_PixelValueBounds.__typeName = 'Numbers.Web.Transitions.PixelValueBounds';
	$Numbers_Web_Transitions_PixelValueBounds.$formatValue = function(value) {
		return ss.formatString('{0}px', value);
	};
	$Numbers_Web_Transitions_PixelValueBounds.$getValue = function(formattedValue) {
		if (ss.endsWithString(formattedValue, 'px')) {
			formattedValue = formattedValue.substr(0, formattedValue.length - 2);
		}
		return parseFloat(formattedValue);
	};
	global.Numbers.Web.Transitions.PixelValueBounds = $Numbers_Web_Transitions_PixelValueBounds;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.ScaleValueBounds
	var $Numbers_Web_Transitions_ScaleValueBounds = function(startValue, endValue) {
		this.$1$FormattedStartValueField = null;
		this.$1$FormattedEndValueField = null;
		this.$startValue = 0;
		this.$endValue = 0;
		this.$startValue = startValue;
		this.$endValue = endValue;
		this.set_formattedStartValue($Numbers_Web_Transitions_ScaleValueBounds.$formatValue(startValue));
		this.set_formattedEndValue($Numbers_Web_Transitions_ScaleValueBounds.$formatValue(endValue));
	};
	$Numbers_Web_Transitions_ScaleValueBounds.__typeName = 'Numbers.Web.Transitions.ScaleValueBounds';
	$Numbers_Web_Transitions_ScaleValueBounds.$formatValue = function(value) {
		return ss.formatString('scale({0})', value);
	};
	$Numbers_Web_Transitions_ScaleValueBounds.$getValue = function(formattedValue) {
		var match = $Numbers_Web_Transitions_ScaleValueBounds.$scaleRegex.exec(formattedValue);
		if (ss.isValue(match)) {
			formattedValue = match[1];
		}
		match = $Numbers_Web_Transitions_ScaleValueBounds.$matrixRegex.exec(formattedValue);
		if (ss.isValue(match) && ss.referenceEquals(match[1], match[2])) {
			return parseFloat(match[1]);
		}
		return parseFloat(formattedValue);
	};
	global.Numbers.Web.Transitions.ScaleValueBounds = $Numbers_Web_Transitions_ScaleValueBounds;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.SequentialTransition
	var $Numbers_Web_Transitions_SequentialTransition = function(transitions) {
		this.$1$CompletedField = null;
		this.$transitions = null;
		this.$currentIndex = 0;
		this.$transitions = ss.arrayClone(transitions);
		for (var $t1 = 0; $t1 < transitions.length; $t1++) {
			var transition = transitions[$t1];
			transition.add_completed(ss.mkdel(this, this.$onTransitionCompleted));
		}
	};
	$Numbers_Web_Transitions_SequentialTransition.__typeName = 'Numbers.Web.Transitions.SequentialTransition';
	global.Numbers.Web.Transitions.SequentialTransition = $Numbers_Web_Transitions_SequentialTransition;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.TimingCurve
	var $Numbers_Web_Transitions_TimingCurve = function(x1, y1, x2, y2, name) {
		this.$1$X1Field = 0;
		this.$1$Y1Field = 0;
		this.$1$X2Field = 0;
		this.$1$Y2Field = 0;
		this.$1$NameField = null;
		this.set_name(name);
	};
	$Numbers_Web_Transitions_TimingCurve.__typeName = 'Numbers.Web.Transitions.TimingCurve';
	$Numbers_Web_Transitions_TimingCurve.cubicBezier = function(x1, y1, x2, y2) {
		return new $Numbers_Web_Transitions_TimingCurve(x1, y1, x2, y2, null);
	};
	global.Numbers.Web.Transitions.TimingCurve = $Numbers_Web_Transitions_TimingCurve;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.Transition
	var $Numbers_Web_Transitions_Transition = function(targetElement, targetProperty, bounds, timing, delayMilliseconds, continuationMode) {
		this.$1$CompletedField = null;
		this.$targetElement = null;
		this.$targetProperty = null;
		this.$valueBounds = null;
		this.$timing = null;
		this.$delay = 0;
		this.$continuationMode = 0;
		this.$state = 0;
		this.$cancellationToken = 0;
		this.$targetElement = targetElement;
		this.$targetProperty = targetProperty;
		this.$valueBounds = bounds;
		this.$timing = timing;
		this.$delay = delayMilliseconds;
		this.$continuationMode = continuationMode;
	};
	$Numbers_Web_Transitions_Transition.__typeName = 'Numbers.Web.Transitions.Transition';
	$Numbers_Web_Transitions_Transition.$runAsync = function(action) {
		if ('requestAnimationFrame' in window) {
			window.requestAnimationFrame(function() {
				window.requestAnimationFrame(action);
			});
		}
		else {
			window.setTimeout(function() {
				window.setTimeout(action);
			});
		}
	};
	global.Numbers.Web.Transitions.Transition = $Numbers_Web_Transitions_Transition;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.Transition.ContinuationMode
	var $Numbers_Web_Transitions_Transition$ContinuationMode = function() {
	};
	$Numbers_Web_Transitions_Transition$ContinuationMode.__typeName = 'Numbers.Web.Transitions.Transition$ContinuationMode';
	global.Numbers.Web.Transitions.Transition$ContinuationMode = $Numbers_Web_Transitions_Transition$ContinuationMode;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.TransitionTiming
	var $Numbers_Web_Transitions_TransitionTiming = function(durationMilliseconds, timing, delayMilliseconds) {
		this.$1$DurationField = 0;
		this.$1$DelayField = 0;
		this.$1$TimingField = null;
		this.set_duration(durationMilliseconds);
		this.set_delay(delayMilliseconds);
		this.set_timing(timing || $Numbers_Web_Transitions_TimingCurve.ease);
	};
	$Numbers_Web_Transitions_TransitionTiming.__typeName = 'Numbers.Web.Transitions.TransitionTiming';
	global.Numbers.Web.Transitions.TransitionTiming = $Numbers_Web_Transitions_TransitionTiming;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.ValueBounds
	var $Numbers_Web_Transitions_ValueBounds = function(startValue, endValue, getProgress) {
		this.$1$FormattedStartValueField = null;
		this.$1$FormattedEndValueField = null;
		this.$getProgress = null;
		this.set_formattedStartValue(startValue);
		this.set_formattedEndValue(endValue);
		this.$getProgress = getProgress;
	};
	$Numbers_Web_Transitions_ValueBounds.__typeName = 'Numbers.Web.Transitions.ValueBounds';
	global.Numbers.Web.Transitions.ValueBounds = $Numbers_Web_Transitions_ValueBounds;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Transitions.ValueBoundsExtensions
	var $Numbers_Web_Transitions_ValueBoundsExtensions = function() {
	};
	$Numbers_Web_Transitions_ValueBoundsExtensions.__typeName = 'Numbers.Web.Transitions.ValueBoundsExtensions';
	$Numbers_Web_Transitions_ValueBoundsExtensions.reverse = function(valueBounds) {
		return new $Numbers_$Web_Transitions_ValueBoundsExtensions$ReversedValueBounds(valueBounds);
	};
	global.Numbers.Web.Transitions.ValueBoundsExtensions = $Numbers_Web_Transitions_ValueBoundsExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ViewModels.CreationSource
	var $Numbers_Web_ViewModels_CreationSource = function() {
	};
	$Numbers_Web_ViewModels_CreationSource.__typeName = 'Numbers.Web.ViewModels.CreationSource';
	global.Numbers.Web.ViewModels.CreationSource = $Numbers_Web_ViewModels_CreationSource;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ViewModels.CyclicSelectionBehavior
	var $Numbers_Web_ViewModels_CyclicSelectionBehavior = function(selectables, maximumSelectedCount) {
		this.$1$SelectionChangedField = null;
		this.$maximumSelectedCount = 0;
		this.$selectables = null;
		this.$selectionOrder = null;
		if (Enumerable.from(selectables).any(function(selectable) {
			return selectable.get_isSelected();
		})) {
			throw new ss.Exception('Selectable items must be unselected on cyclic selection behavior creation');
		}
		this.$selectables = selectables;
		this.$maximumSelectedCount = maximumSelectedCount;
		this.$selectionOrder = [];
		if (ss.isInstanceOfType(selectables, $Numbers_Web_Generic_INotifyCollectionChanged)) {
			ss.safeCast(selectables, $Numbers_Web_Generic_INotifyCollectionChanged).add_collectionChanged(ss.mkdel(this, this.$onCollectionChanged));
		}
		var $t1 = ss.getEnumerator(selectables);
		try {
			while ($t1.moveNext()) {
				var selectable1 = $t1.current();
				selectable1.add_isSelectedChanged(ss.mkdel(this, this.$onIsSelectedChanged));
			}
		}
		finally {
			$t1.dispose();
		}
	};
	$Numbers_Web_ViewModels_CyclicSelectionBehavior.__typeName = 'Numbers.Web.ViewModels.CyclicSelectionBehavior';
	global.Numbers.Web.ViewModels.CyclicSelectionBehavior = $Numbers_Web_ViewModels_CyclicSelectionBehavior;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ViewModels.GameViewModel
	var $Numbers_Web_ViewModels_GameViewModel = function(model, host) {
		this.$model = null;
		this.$1$SolvedField = null;
		this.$1$SelectionChangedField = null;
		this.$1$NumbersChangedField = null;
		this.$1$NumbersField = null;
		this.$1$OperatorsField = null;
		this.$host = null;
		this.$model = model;
		this.$host = host;
		this.set_numbers(new (ss.makeGenericType($Numbers_Web_Generic_ObservableCollection$1, [$Numbers_Web_ViewModels_NumberViewModel]))());
		var $t1 = ss.getEnumerator(model.get_currentNumbers());
		try {
			while ($t1.moveNext()) {
				var number = $t1.current();
				this.get_numbers().add(new $Numbers_Web_ViewModels_NumberViewModel(number, false, 0));
			}
		}
		finally {
			$t1.dispose();
		}
		this.set_operators([new $Numbers_Web_ViewModels_OperatorViewModel(1, $Numbers_Web_Number.add), new $Numbers_Web_ViewModels_OperatorViewModel(2, $Numbers_Web_Number.subtract), new $Numbers_Web_ViewModels_OperatorViewModel(3, $Numbers_Web_Number.multiply), new $Numbers_Web_ViewModels_OperatorViewModel(4, $Numbers_Web_Number.divide)]);
		var numbersSelectionBehavior = new $Numbers_Web_ViewModels_CyclicSelectionBehavior(this.get_numbers(), 2);
		var operatorsSelectionBehavior = new $Numbers_Web_ViewModels_CyclicSelectionBehavior(this.get_operators(), 1);
		numbersSelectionBehavior.add_selectionChanged(ss.mkdel(this, function(sender, e) {
			this.$raiseSelectionChanged();
		}));
		operatorsSelectionBehavior.add_selectionChanged(ss.mkdel(this, function(sender1, e1) {
			this.$raiseSelectionChanged();
		}));
	};
	$Numbers_Web_ViewModels_GameViewModel.__typeName = 'Numbers.Web.ViewModels.GameViewModel';
	global.Numbers.Web.ViewModels.GameViewModel = $Numbers_Web_ViewModels_GameViewModel;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ViewModels.NumberViewModel
	var $Numbers_Web_ViewModels_NumberViewModel = function(model, isTarget, source) {
		this.$2$ModelField = null;
		this.$2$IsTargetField = false;
		this.$2$SourceField = 0;
		$Numbers_Web_ViewModels_SelectableViewModel.call(this);
		this.set_model(model);
		this.set_isTarget(isTarget);
		this.set_source(source);
	};
	$Numbers_Web_ViewModels_NumberViewModel.__typeName = 'Numbers.Web.ViewModels.NumberViewModel';
	global.Numbers.Web.ViewModels.NumberViewModel = $Numbers_Web_ViewModels_NumberViewModel;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ViewModels.OperatorViewModel
	var $Numbers_Web_ViewModels_OperatorViewModel = function(operator, calculation) {
		this.$2$OperatorField = 0;
		this.$calculation = null;
		$Numbers_Web_ViewModels_SelectableViewModel.call(this);
		this.set_operator(operator);
		this.$calculation = calculation;
	};
	$Numbers_Web_ViewModels_OperatorViewModel.__typeName = 'Numbers.Web.ViewModels.OperatorViewModel';
	global.Numbers.Web.ViewModels.OperatorViewModel = $Numbers_Web_ViewModels_OperatorViewModel;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.ViewModels.SelectableViewModel
	var $Numbers_Web_ViewModels_SelectableViewModel = function() {
		this.$1$IsSelectedChangedField = null;
		this.$isSelected = false;
	};
	$Numbers_Web_ViewModels_SelectableViewModel.__typeName = 'Numbers.Web.ViewModels.SelectableViewModel';
	global.Numbers.Web.ViewModels.SelectableViewModel = $Numbers_Web_ViewModels_SelectableViewModel;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.GameView
	var $Numbers_Web_Views_GameView = function(viewModel, showHelp) {
		this.$viewModel = null;
		this.$toolbarView = null;
		this.$numbersCollectionView = null;
		this.$operatorsCollectionView = null;
		this.$targetView = null;
		this.$helpView = null;
		this.$solveAppearAnimation = null;
		this.$solveDisappearAnimation = null;
		this.$solved = false;
		this.$newGameRequested = false;
		$Numbers_Web_Controls_Control.call(this, ['game-panel']);
		this.$viewModel = viewModel;
		var targetBackground1 = new $Numbers_Web_Controls_Control(['target-background1']);
		var targetBackground2 = new $Numbers_Web_Controls_Control(['target-background2']);
		var targetBackgroundOverlay1 = new $Numbers_Web_Controls_Control(['target-background-overlay1']);
		var targetBackgroundOverlay2 = new $Numbers_Web_Controls_Control(['target-background-overlay2']);
		targetBackground2.get_htmlElement().addEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
		targetBackground2.get_htmlElement().addEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
		this.$toolbarView = new $Numbers_Web_Views_ToolbarView(viewModel);
		this.$toolbarView.add_newGameRequest(ss.mkdel(this, function(sender, e) {
			this.$newGame();
		}));
		this.$numbersCollectionView = new $Numbers_Web_Views_NumbersCollectionView(viewModel.get_numbers());
		this.$operatorsCollectionView = new $Numbers_Web_Views_OperatorsCollectionView(viewModel.get_operators());
		this.$targetView = new $Numbers_Web_Views_TargetView(viewModel.get_targetValue(), viewModel.get_solutionsCount());
		var $t1 = new $Numbers_Web_Controls_Control(['frame']);
		$t1.add(this.$toolbarView);
		$t1.add(targetBackground1);
		$t1.add(targetBackground2);
		$t1.add(this.$numbersCollectionView);
		$t1.add(this.$operatorsCollectionView);
		$t1.add(this.$targetView);
		$t1.add(targetBackgroundOverlay1);
		$t1.add(targetBackgroundOverlay2);
		this.appendChild($t1);
		if (showHelp) {
			this.$helpView = new $Numbers_Web_Views_HelpView(viewModel);
			this.appendChild(this.$helpView);
		}
		viewModel.add_selectionChanged(ss.mkdel(this, this.$onSelectionChanged));
		viewModel.add_solved(ss.mkdel(this, this.$onSolved));
		this.$solveAppearAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Keyframe(targetBackground1.get_htmlElement(), 'visibility', 'visible', 300), new $Numbers_Web_Transitions_MultiplePropertyTransition(targetBackground1.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(1, 10), new $Numbers_Web_Transitions_TransitionTiming(2000, null, 0), 200, 0), new $Numbers_Web_Transitions_Transition(targetBackground1.get_htmlElement(), 'top', new $Numbers_Web_Transitions_PixelValueBounds(80, 164), new $Numbers_Web_Transitions_TransitionTiming(800, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 200, 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(targetBackground1.get_htmlElement(), ['border-radius', '-webkit-border-radius'], new $Numbers_Web_Transitions_PixelValueBounds(2, 40), new $Numbers_Web_Transitions_TransitionTiming(600, null, 0), 200, 0), new $Numbers_Web_Transitions_Keyframe(targetBackground2.get_htmlElement(), 'visibility', 'visible', 500), new $Numbers_Web_Transitions_MultiplePropertyTransition(targetBackground2.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(1, 10), new $Numbers_Web_Transitions_TransitionTiming(1800, null, 0), 500, 0), new $Numbers_Web_Transitions_Transition(targetBackground2.get_htmlElement(), 'top', new $Numbers_Web_Transitions_PixelValueBounds(80, 164), new $Numbers_Web_Transitions_TransitionTiming(800, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 200, 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(targetBackground2.get_htmlElement(), ['border-radius', '-webkit-border-radius'], new $Numbers_Web_Transitions_PixelValueBounds(2, 40), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 500, 0), new $Numbers_Web_Transitions_Keyframe(this.$numbersCollectionView.get_htmlElement(), 'pointerEvents', 'none', 0), new $Numbers_Web_Transitions_Keyframe(this.$operatorsCollectionView.get_htmlElement(), 'pointerEvents', 'none', 0), new $Numbers_Web_Transitions_Transition(this.$numbersCollectionView.get_htmlElement(), 'top', new $Numbers_Web_Transitions_PixelValueBounds(80, 164), new $Numbers_Web_Transitions_TransitionTiming(800, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 200, 0), new $Numbers_Web_Transitions_Transition(this.$operatorsCollectionView.get_htmlElement(), 'top', new $Numbers_Web_Transitions_PixelValueBounds(176, 236), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.$operatorsCollectionView.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0)]);
		this.$solveDisappearAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Keyframe(targetBackgroundOverlay1.get_htmlElement(), 'visibility', 'visible', 0), new $Numbers_Web_Transitions_Transition(targetBackgroundOverlay1.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 0.4), new $Numbers_Web_Transitions_TransitionTiming(1000, null, 0), 0, 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(targetBackgroundOverlay1.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(1, 10), new $Numbers_Web_Transitions_TransitionTiming(2000, null, 0), 0, 0), new $Numbers_Web_Transitions_Keyframe(targetBackgroundOverlay2.get_htmlElement(), 'visibility', 'visible', 200), new $Numbers_Web_Transitions_Transition(targetBackgroundOverlay2.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 200, 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(targetBackgroundOverlay2.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(0.1, 10), new $Numbers_Web_Transitions_TransitionTiming(1800, null, 0), 200, 0)]);
	};
	$Numbers_Web_Views_GameView.__typeName = 'Numbers.Web.Views.GameView';
	global.Numbers.Web.Views.GameView = $Numbers_Web_Views_GameView;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.HelpView
	var $Numbers_Web_Views_HelpView = function(viewModel) {
		this.$viewModel = null;
		this.$tooltips = null;
		this.$timeouts = null;
		this.$welcomeTooltipAdded = false;
		this.$target1TooltipAdded = false;
		this.$target2TooltipAdded = false;
		this.$hintTooltipAdded = false;
		this.$operation1TooltipsAdded = false;
		this.$operation2TooltipsAdded = false;
		$Numbers_Web_Controls_Control.call(this, ['help-overlay']);
		this.$viewModel = viewModel;
		this.$tooltips = [];
		this.$timeouts = [];
		viewModel.add_numbersChanged(ss.mkdel(this, this.$onNumbersChanged));
		this.$addTooltips();
	};
	$Numbers_Web_Views_HelpView.__typeName = 'Numbers.Web.Views.HelpView';
	$Numbers_Web_Views_HelpView.$getOperatorName = function(operator) {
		switch (operator) {
			case 1: {
				return 'add';
			}
			case 2: {
				return 'subtract';
			}
			case 3: {
				return 'multiply';
			}
			case 4: {
				return 'divide';
			}
			default: {
				throw new ss.Exception('Unsupported operator');
			}
		}
	};
	global.Numbers.Web.Views.HelpView = $Numbers_Web_Views_HelpView;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.NumbersCollectionView
	var $Numbers_Web_Views_NumbersCollectionView = function(viewModel) {
		this.$numbersButtons = null;
		$Numbers_Web_Controls_Control.call(this, ['numbers-panel']);
		this.$numbersButtons = new (ss.makeGenericType($Numbers_Web_Generic_ConvertedObservableCollection$2, [$Numbers_Web_ViewModels_NumberViewModel, $Numbers_Web_Controls_Button]))(viewModel, $Numbers_Web_Views_NumbersCollectionView.$createButton, null);
		this.$numbersButtons.add_collectionChanged(ss.mkdel(this, this.$onNumbersButtonsCollectionChanged));
		var $t1 = this.$numbersButtons.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var button = $t1.current();
				this.$addButton(button);
			}
		}
		finally {
			$t1.dispose();
		}
		this.$updateLayout();
	};
	$Numbers_Web_Views_NumbersCollectionView.__typeName = 'Numbers.Web.Views.NumbersCollectionView';
	$Numbers_Web_Views_NumbersCollectionView.$createButton = function(numberViewModel) {
		var $t1 = new $Numbers_Web_Controls_Label([]);
		$t1.set_text(numberViewModel.get_value().toString());
		var label = $t1;
		label.get_htmlElement().classList.add('button-content');
		label.get_htmlElement().classList.add($Numbers_Web_Views_NumbersCollectionView.$getLabelSizeClass(label.get_text()));
		var $t2 = new $Numbers_Web_Controls_Button(numberViewModel.get_isSelected(), ['number', $Numbers_Web_Views_NumbersCollectionView.$getLevelClass(numberViewModel)]);
		$t2.add(label);
		var button = $t2;
		button.set_isEnabled(!numberViewModel.get_isTarget());
		$Numbers_Web_StyleExtensions.getTransitionDictionary(button.get_htmlElement().style).set('left', '200ms');
		$Numbers_Web_StyleExtensions.getTransitionDictionary(button.get_shadow().get_htmlElement().style).set('left', '200ms');
		numberViewModel.add_isSelectedChanged(function(sender, e) {
			button.set_isChecked(numberViewModel.get_isSelected());
		});
		button.add_isCheckedChanged(function(sender1, e1) {
			numberViewModel.set_isSelected(button.get_isChecked());
		});
		if (numberViewModel.get_source() === 2) {
			button.startFadeInAnimation();
		}
		if (numberViewModel.get_source() === 1) {
			button.startCreateAnimation();
		}
		return button;
	};
	$Numbers_Web_Views_NumbersCollectionView.$getLevelClass = function(numberViewModel) {
		return (numberViewModel.get_isTarget() ? 'target' : ss.formatString('level{0}', numberViewModel.get_level()));
	};
	$Numbers_Web_Views_NumbersCollectionView.$getLabelSizeClass = function(text) {
		if (text.length < 4) {
			return 'medium';
		}
		if (text.length < 5) {
			return 'small';
		}
		return 'extra-small';
	};
	global.Numbers.Web.Views.NumbersCollectionView = $Numbers_Web_Views_NumbersCollectionView;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.OperatorsCollectionView
	var $Numbers_Web_Views_OperatorsCollectionView = function(viewModel) {
		this.$operatorsButtons = null;
		$Numbers_Web_Controls_Control.call(this, ['operators-panel']);
		var left = 128;
		this.$operatorsButtons = Enumerable.from(viewModel).select($Numbers_Web_Views_OperatorsCollectionView.$createButton).toArray();
		var $t1 = ss.getEnumerator(this.$operatorsButtons);
		try {
			while ($t1.moveNext()) {
				var button = $t1.current();
				button.set_left(left);
				button.get_shadow().set_left(left);
				this.appendChild(button);
				this.appendChild(button.get_shadow());
				left += 88;
			}
		}
		finally {
			$t1.dispose();
		}
	};
	$Numbers_Web_Views_OperatorsCollectionView.__typeName = 'Numbers.Web.Views.OperatorsCollectionView';
	$Numbers_Web_Views_OperatorsCollectionView.$createButton = function(operatorViewModel) {
		var $t1 = new $Numbers_Web_Controls_Label([]);
		$t1.set_text($Numbers_Web_Views_OperatorsCollectionView.$getOperatorHeader(operatorViewModel.get_operator()));
		var label = $t1;
		label.get_htmlElement().classList.add('button-content');
		var $t2 = new $Numbers_Web_Controls_Button(operatorViewModel.get_isSelected(), ['operator']);
		$t2.add(label);
		var button = $t2;
		operatorViewModel.add_isSelectedChanged(function(sender, e) {
			button.set_isChecked(operatorViewModel.get_isSelected());
		});
		button.add_isCheckedChanged(function(sender1, e1) {
			operatorViewModel.set_isSelected(button.get_isChecked());
		});
		return button;
	};
	$Numbers_Web_Views_OperatorsCollectionView.$getOperatorHeader = function(operator) {
		switch (operator) {
			case 1: {
				return '+';
			}
			case 2: {
				return '−';
			}
			case 3: {
				return '×';
			}
			case 4: {
				return '÷';
			}
			default: {
				throw new ss.Exception('Operator is not supported');
			}
		}
	};
	global.Numbers.Web.Views.OperatorsCollectionView = $Numbers_Web_Views_OperatorsCollectionView;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.TargetView
	var $Numbers_Web_Views_TargetView = function(targetValue, solutionsCount) {
		this.$appearAnimation = null;
		this.$disappearAnimation = null;
		$Numbers_Web_Controls_Control.call(this, ['target-panel']);
		var $t1 = new $Numbers_Web_Controls_Label(['target-solutions-label']);
		$t1.set_text(ss.formatString('{0} {1}', solutionsCount, ((solutionsCount === 1) ? 'solution' : 'solutions')));
		var solutionsLabel = $t1;
		solutionsLabel.get_htmlElement().style.color = $Numbers_Web_Views_TargetView.$getSolutionsCountColor(solutionsCount);
		var $t2 = new $Numbers_Web_Controls_Label(['target-label']);
		$t2.set_text(targetValue.toString());
		this.appendChild($t2);
		this.appendChild(solutionsLabel);
		this.$appearAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'top', new $Numbers_Web_Transitions_PixelValueBounds(336, 272), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(solutionsLabel.get_htmlElement(), 'color', new $Numbers_Web_Transitions_ValueBounds($Numbers_Web_Views_TargetView.$getSolutionsCountColor(solutionsCount), 'rgba(0, 0, 0, 0.26)', null), new $Numbers_Web_Transitions_TransitionTiming(2000, null, 0), 4000, 0)]);
		this.$disappearAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'top', new $Numbers_Web_Transitions_PixelValueBounds(272, 336), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0)]);
	};
	$Numbers_Web_Views_TargetView.__typeName = 'Numbers.Web.Views.TargetView';
	$Numbers_Web_Views_TargetView.$getSolutionsCountColor = function(solutionsCount) {
		var normalizedLevel = 1 - Math.min(solutionsCount, 100) / 100;
		var weight = new Array($Numbers_Web_Views_TargetView.$gradientStopCount);
		for (var i = 0; i < $Numbers_Web_Views_TargetView.$gradientStopCount; i++) {
			var stopPosition = i / 3;
			weight[i] = Math.max(0, 1 - Math.abs(stopPosition - normalizedLevel) * 3);
		}
		var color = new Array(3);
		for (var componentIndex = 0; componentIndex < 3; componentIndex++) {
			color[componentIndex] = 0;
			for (var i1 = 0; i1 < $Numbers_Web_Views_TargetView.$gradientStopCount; i1++) {
				color[componentIndex] += weight[i1] * ss.arrayGet($Numbers_Web_Views_TargetView.$gradientStopColor, i1, componentIndex);
			}
		}
		return ss.formatString('rgba({0}, {1}, {2}, 1)', ss.Int32.trunc(color[0]), ss.Int32.trunc(color[1]), ss.Int32.trunc(color[2]));
	};
	global.Numbers.Web.Views.TargetView = $Numbers_Web_Views_TargetView;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.ToolbarView
	var $Numbers_Web_Views_ToolbarView = function(viewModel) {
		this.$2$NewGameRequestField = null;
		this.$viewModel = null;
		this.$newGameButton = null;
		this.$hintButton = null;
		this.$undoButton = null;
		this.$buttonsAppearAnimation = null;
		this.$buttonDisappearAnimation = null;
		$Numbers_Web_Controls_Control.call(this, ['toolbar']);
		this.$viewModel = viewModel;
		viewModel.add_solved(ss.mkdel(this, this.$onSolved));
		var $t1 = new $Numbers_Web_Controls_ToolbarButton('new', ss.mkdel(this, this.$raiseNewGameRequest), null);
		$t1.add(new $Numbers_Web_Controls_Control(['toolbar-button-image', 'image-new']));
		this.$newGameButton = $t1;
		var $t2 = new $Numbers_Web_Controls_ToolbarButton('hint', ss.mkdel(this, this.$selectHint), ss.mkdel(this, this.$calculateHint));
		$t2.add(new $Numbers_Web_Controls_Control(['toolbar-button-image', 'image-help']));
		this.$hintButton = $t2;
		var $t3 = new $Numbers_Web_Controls_ToolbarButton('undo', ss.mkdel(viewModel, viewModel.undo), null);
		$t3.add(new $Numbers_Web_Controls_Control(['toolbar-button-image', 'image-undo']));
		this.$undoButton = $t3;
		this.$newGameButton.set_isEnabled(false);
		var $t4 = new $Numbers_Web_Controls_Label(['header', 'background1']);
		$t4.set_text('Numbers');
		this.appendChild($t4);
		var $t5 = new $Numbers_Web_Controls_Label(['header', 'background2']);
		$t5.set_text('Numbers');
		this.appendChild($t5);
		var $t6 = new $Numbers_Web_Controls_Label(['header']);
		$t6.set_text('Numbers');
		this.appendChild($t6);
		this.appendChild(this.$newGameButton);
		this.appendChild(this.$hintButton);
		this.appendChild(this.$undoButton);
		this.$buttonsAppearAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.$hintButton.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.$undoButton.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0)]);
		this.$buttonDisappearAnimation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.$hintButton.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.$undoButton.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(800, null, 0), 0, 0)]);
	};
	$Numbers_Web_Views_ToolbarView.__typeName = 'Numbers.Web.Views.ToolbarView';
	global.Numbers.Web.Views.ToolbarView = $Numbers_Web_Views_ToolbarView;
	////////////////////////////////////////////////////////////////////////////////
	// Numbers.Web.Views.ToolsView
	var $Numbers_Web_Views_ToolsView = function(dialogContainer, statistics) {
		this.$gameHash = null;
		this.$isVisible = false;
		this.$dialogContainer = null;
		this.$statistics = null;
		this.$permalinkElement = null;
		this.$likeButton = null;
		this.$aboutDialog = null;
		this.$shareDialog = null;
		this.$shareTooltipAdded = false;
		this.$shareTooltipRemoved = false;
		$Numbers_Web_Controls_Control.call(this, ['tools-panel']);
		this.$dialogContainer = dialogContainer;
		this.$statistics = statistics;
		this.$isVisible = true;
		this.$permalinkElement = document.createElement('a');
		this.$permalinkElement.className = 'permalink';
		this.$permalinkElement.textContent = 'permalink';
		this.$likeButton = new $Numbers_Web_Controls_Control(['fb-like']);
		this.$likeButton.get_htmlElement().setAttribute('data-href', $Numbers_Web_DocumentExtensions.getMetaPropertyValue('og:url'));
		this.$likeButton.get_htmlElement().setAttribute('data-layout', 'standard');
		this.$likeButton.get_htmlElement().setAttribute('data-action', 'like');
		this.$likeButton.get_htmlElement().setAttribute('data-show-faces', 'true');
		this.$likeButton.get_htmlElement().setAttribute('data-share', 'false');
		var $t1 = new $Numbers_Web_Controls_Label(['share-label']);
		$t1.set_text('❤ share');
		var shareLabel = $t1;
		var $t2 = new $Numbers_Web_Controls_Label(['about-label']);
		$t2.set_text('about');
		var aboutLabel = $t2;
		shareLabel.get_htmlElement().addEventListener('mousedown', ss.mkdel(this, this.$onShareMouseDown), false);
		aboutLabel.get_htmlElement().addEventListener('mousedown', ss.mkdel(this, this.$onAboutMouseDown), false);
		this.appendChild(this.$likeButton);
		this.get_htmlElement().appendChild(this.$permalinkElement);
		this.appendChild(shareLabel);
		this.appendChild(aboutLabel);
	};
	$Numbers_Web_Views_ToolsView.__typeName = 'Numbers.Web.Views.ToolsView';
	$Numbers_Web_Views_ToolsView.$createAboutDialog = function() {
		var $t1 = new $Numbers_Web_Controls_Control(['dialog', 'about']);
		var $t2 = new $Numbers_Web_Controls_Label(['about-dialog-header']);
		$t2.set_text('Numbers');
		$t1.add($t2);
		var $t3 = new $Numbers_Web_Controls_Label(['about-dialog-text']);
		$t3.set_text(ss.formatString('Version {0}', $AssemblyInfo.version));
		$t1.add($t3);
		var $t4 = new $Numbers_Web_Controls_Link('');
		$t4.set_text('Source on GitHub');
		$t4.set_href('http://www.github.com/yuvaltz/Numbers');
		$t1.add($t4);
		return $t1;
	};
	$Numbers_Web_Views_ToolsView.$appendHash = function(location, hash) {
		var index = location.lastIndexOf('#');
		return ss.formatString('{0}#{1}', ((index === -1) ? location : location.substr(0, index)), hash);
	};
	global.Numbers.Web.Views.ToolsView = $Numbers_Web_Views_ToolsView;
	ss.initClass($AssemblyInfo, $asm, {});
	ss.initEnum($Numbers_$Web_Transitions_Transition$State, $asm, { $stopped: 0, $pending: 1, $running: 2 });
	ss.initInterface($Numbers_Web_Transitions_IValueBounds, $asm, { get_formattedStartValue: null, get_formattedEndValue: null, getProgress: null });
	ss.initClass($Numbers_$Web_Transitions_ValueBoundsExtensions$ReversedValueBounds, $asm, {
		get_formattedStartValue: function() {
			return this.$source.get_formattedEndValue();
		},
		get_formattedEndValue: function() {
			return this.$source.get_formattedStartValue();
		},
		getProgress: function(formattedValue) {
			return 1 - this.$source.getProgress(formattedValue);
		}
	}, null, [$Numbers_Web_Transitions_IValueBounds]);
	ss.initClass($Numbers_$Web_Views_ToolsView$ShareService, $asm, {
		get_$imageIndex: function() {
			return this.$1$ImageIndexField;
		},
		set_$imageIndex: function(value) {
			this.$1$ImageIndexField = value;
		},
		get_$header: function() {
			return this.$1$HeaderField;
		},
		set_$header: function(value) {
			this.$1$HeaderField = value;
		},
		get_$urlFormat: function() {
			return this.$1$UrlFormatField;
		},
		set_$urlFormat: function(value) {
			this.$1$UrlFormatField = value;
		}
	});
	ss.initInterface($Numbers_Web_IGameHost, $asm, { newGame: null });
	ss.initClass($Numbers_Web_Application, $asm, {
		get_$gameLevel: function() {
			return this.$gameLevel;
		},
		set_$gameLevel: function(value) {
			this.$gameLevel = value;
			$Numbers_Web_ConfigurationExtensions.setValue(this.$configuration, $Numbers_Web_Application.$gameLevelConfigurationKey, value.toString());
		},
		get_$game: function() {
			return this.$game;
		},
		set_$game: function(value) {
			if (ss.referenceEquals(this.$game, value)) {
				return;
			}
			this.$game = value;
			this.$onGameChanged();
		},
		run: function() {
			this.$configuration = new $Numbers_Web_Configuration();
			this.$dialogContainer = new $Numbers_Web_Controls_DialogContainer();
			this.$statistics = new $Numbers_Web_Statistics(this.$configuration);
			this.$statistics.reportSessionStart();
			this.$toolsView = new $Numbers_Web_Views_ToolsView(this.$dialogContainer, this.$statistics);
			var storedGameLevel = {};
			if (ss.Int32.tryParse(this.$configuration.getValue($Numbers_Web_Application.$gameLevelConfigurationKey), storedGameLevel)) {
				this.$gameLevel = storedGameLevel.$;
			}
			else {
				this.$gameLevel = $Numbers_Web_Application.$defaultLevel;
				this.$firstTime = true;
			}
			document.body.appendChild(this.$toolsView.get_htmlElement());
			document.body.appendChild(this.$dialogContainer.get_htmlElement());
			window.addEventListener('hashchange', ss.mkdel(this, function(e) {
				this.$onHashChanged();
			}));
			window.addEventListener('resize', ss.mkdel(this, function(e1) {
				this.$updateLayout();
			}));
			window.addEventListener('unload', ss.mkdel(this, function(e2) {
				this.$statistics.reportSessionEnd();
			}));
			this.$createInitialGame();
		},
		$createInitialGame: function() {
			var hash = ss.trimStartString(window.location.hash, [35]);
			if (ss.isValue($Numbers_Web_Application.$gameHashRegex.exec(hash))) {
				this.$customGame = true;
				this.set_$game($Numbers_Web_GameFactory.createFromHash(hash));
			}
			else {
				var lastGameHash = this.$configuration.getValue($Numbers_Web_Application.$gameHashConfigurationKey);
				if (!ss.isNullOrEmptyString(lastGameHash)) {
					this.set_$game($Numbers_Web_GameFactory.createFromHash(lastGameHash));
				}
				else {
					this.set_$game($Numbers_Web_GameFactory.createFromLevel(this.get_$gameLevel()));
				}
				this.$customGame = false;
			}
		},
		newGame: function() {
			this.$statistics.reportGameEnd();
			if (!this.$customGame && !this.$firstTime && this.get_$game().get_stepsCount() > 0) {
				if (!this.get_$game().get_isSolved() || this.get_$game().get_hintsCount() > 3) {
					this.set_$gameLevel(Math.max(this.get_$gameLevel() - Math.max(ss.Int32.div(100 - this.get_$gameLevel(), 10), 1), $Numbers_Web_Application.$easiestLevel));
				}
				else if (this.get_$game().get_hintsCount() === 0 && this.get_$game().get_stepsCount() < 20) {
					this.set_$gameLevel(Math.min(this.get_$gameLevel() + Math.max(ss.Int32.div(100 - this.get_$gameLevel(), 10), 1), $Numbers_Web_Application.$hardestLevel));
				}
			}
			this.$firstTime = this.$firstTime && this.$customGame;
			this.$customGame = false;
			this.set_$game($Numbers_Web_GameFactory.createFromLevel(this.get_$gameLevel()));
		},
		$onHashChanged: function() {
			var hash = ss.trimStartString(window.location.hash, [35]);
			var match;
			match = $Numbers_Web_Application.$gameHashRegex.exec(hash);
			if (ss.isValue(match)) {
				if (!ss.referenceEquals(this.get_$game().toString(), hash)) {
					this.$customGame = true;
					this.set_$game($Numbers_Web_GameFactory.createFromHash(hash));
				}
				return;
			}
			match = $Numbers_Web_Application.$setLevelRegex.exec(hash);
			if (ss.isValue(match)) {
				this.set_$gameLevel(Math.min(Math.max(parseInt(match[1]), $Numbers_Web_Application.$easiestLevel), $Numbers_Web_Application.$hardestLevel));
				console.log(ss.formatString('Level changed to {0}', this.get_$gameLevel()));
				return;
			}
			console.log(ss.formatString('Can\'t parse hash "{0}"', hash));
		},
		$onGameChanged: function() {
			if (ss.isValue(this.$gameView)) {
				document.body.removeChild(this.$gameView.get_htmlElement());
				this.$gameView.dispose();
			}
			if (!ss.referenceEquals(this.get_$game().toString(), ss.trimStartString(window.location.hash, [35]))) {
				window.history.replaceState(null, document.title, window.location.href.substr(0, window.location.href.indexOf('#')));
			}
			$Numbers_Web_ConfigurationExtensions.setValue(this.$configuration, $Numbers_Web_Application.$gameHashConfigurationKey, this.get_$game().toString());
			this.$statistics.reportGameStart(this.get_$game());
			this.get_$game().add_solved(ss.mkdel(this, function(sender, e) {
				this.$statistics.reportGameEnd();
			}));
			var gameViewModel = new $Numbers_Web_ViewModels_GameViewModel(this.get_$game(), this);
			this.$gameView = new $Numbers_Web_Views_GameView(gameViewModel, this.$firstTime && !this.$customGame);
			this.$toolsView.set_gameHash(this.get_$game().toString());
			this.$updateLayout();
			document.body.appendChild(this.$gameView.get_htmlElement());
			this.$gameView.run();
		},
		$updateLayout: function() {
			if (ss.isNullOrUndefined(this.$gameView) || ss.isNullOrUndefined(this.$toolsView)) {
				return;
			}
			var viewContainerWidth = { $: 0 };
			var viewContainerHeight = { $: 0 };
			$Numbers_Web_Application.$getContianerDimension(window.innerWidth, window.innerHeight, $Numbers_Web_Views_GameView.width, $Numbers_Web_Views_GameView.height, viewContainerWidth, viewContainerHeight);
			this.$gameView.set_left(ss.Int32.div(viewContainerWidth.$ - $Numbers_Web_Views_GameView.width, 2));
			this.$gameView.set_top(ss.Int32.div(viewContainerHeight.$ - $Numbers_Web_Views_GameView.height, 2));
			this.$toolsView.set_isVisible(viewContainerHeight.$ > this.$gameView.get_top() + $Numbers_Web_Views_GameView.height + $Numbers_Web_Views_ToolsView.height + 8);
			document.body.style.width = ss.formatString('{0}px', viewContainerWidth.$);
			document.body.style.height = ss.formatString('{0}px', viewContainerHeight.$);
			window.scrollTo(ss.Int32.div(viewContainerWidth.$ - window.innerWidth, 2), ss.Int32.div(viewContainerHeight.$ - window.innerHeight, 2));
		}
	}, null, [$Numbers_Web_IGameHost]);
	ss.initInterface($Numbers_Web_IConfiguration, $asm, { getValue: null, setValue: null });
	ss.initClass($Numbers_Web_Configuration, $asm, {
		getValue: function(key) {
			var $t1 = document.cookie.split(';');
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var keyValue = $t1[$t2];
				var index = keyValue.indexOf('=');
				var currentKey = keyValue.substr(0, index).trim();
				if (ss.referenceEquals(currentKey, key)) {
					return keyValue.substring(index + 1);
				}
			}
			return '';
		},
		setValue: function(key, value, expiration) {
			document.cookie = ss.formatString('{0}={1}; expires={2}', key, value, ss.formatDate(expiration, $Numbers_Web_Configuration.$gmtTimeFormat));
		}
	}, null, [$Numbers_Web_IConfiguration]);
	ss.initClass($Numbers_Web_ConfigurationExtensions, $asm, {});
	ss.initClass($Numbers_Web_DocumentExtensions, $asm, {});
	ss.initClass($Numbers_Web_ElementCollectionExtensions, $asm, {});
	ss.initClass($Numbers_Web_ElementExtensions, $asm, {});
	ss.initClass($Numbers_Web_EventExtensions, $asm, {});
	ss.initClass($Numbers_Web_Game, $asm, {
		add_solved: function(value) {
			this.$1$SolvedField = ss.delegateCombine(this.$1$SolvedField, value);
		},
		remove_solved: function(value) {
			this.$1$SolvedField = ss.delegateRemove(this.$1$SolvedField, value);
		},
		get_initialValues: function() {
			return this.$1$InitialValuesField;
		},
		set_initialValues: function(value) {
			this.$1$InitialValuesField = value;
		},
		get_currentNumbers: function() {
			return this.$1$CurrentNumbersField;
		},
		set_currentNumbers: function(value) {
			this.$1$CurrentNumbersField = value;
		},
		get_targetValue: function() {
			return this.$1$TargetValueField;
		},
		set_targetValue: function(value) {
			this.$1$TargetValueField = value;
		},
		get_solutionsCount: function() {
			return this.$1$SolutionsCountField;
		},
		set_solutionsCount: function(value) {
			this.$1$SolutionsCountField = value;
		},
		get_isSolved: function() {
			return Enumerable.from(this.get_currentNumbers()).count() === 1 && Enumerable.from(this.get_currentNumbers()).first().get_value() === this.get_targetValue();
		},
		get_stepsCount: function() {
			return this.$1$StepsCountField;
		},
		set_stepsCount: function(value) {
			this.$1$StepsCountField = value;
		},
		get_hintsCount: function() {
			return this.$1$HintsCountField;
		},
		set_hintsCount: function(value) {
			this.$1$HintsCountField = value;
		},
		toString: function() {
			var valuesString = Enumerable.from(this.get_initialValues()).select(function(value) {
				return value.toString();
			}).aggregate(function(value1, value2) {
				return ss.formatString('{0}-{1}', value1, value2);
			});
			return ss.formatString('{0}-{1}', valuesString, this.get_targetValue());
		},
		push: function(result) {
			if (!Enumerable.from(this.get_currentNumbers()).contains(result.get_operand1()) || !Enumerable.from(this.get_currentNumbers()).contains(result.get_operand2())) {
				throw new ss.Exception('Result was not created with current numbers');
			}
			this.$stack.push(result);
			this.set_currentNumbers(Enumerable.from(this.get_currentNumbers()).where(function(number) {
				return $Numbers_Web_Number.op_Inequality(number, result.get_operand1()) && $Numbers_Web_Number.op_Inequality(number, result.get_operand2());
			}).concat([result]).toArray());
			this.set_stepsCount(this.get_stepsCount() + 1);
			if (this.get_isSolved()) {
				console.log(ss.formatString('Solved {0}={1}', result.get_value(), result.toString$1(false, true)));
				this.$raiseSolved();
			}
		},
		pop: function() {
			if (this.$stack.length === 0) {
				return null;
			}
			var result = this.$stack.pop();
			this.set_currentNumbers(Enumerable.from(this.get_currentNumbers()).where(function(number) {
				return $Numbers_Web_Number.op_Inequality(number, result);
			}).concat([result.get_operand1(), result.get_operand2()]).toArray());
			return result;
		},
		hint: function() {
			var numbers = Enumerable.from(this.get_currentNumbers()).toArray();
			numbers.sort(function(number1, number2) {
				return number1.compareTo(number2);
			});
			var solution = $Numbers_Web_Solver.getSolution(numbers, this.get_targetValue());
			this.set_hintsCount(this.get_hintsCount() + 1);
			return ($Numbers_Web_Number.op_Inequality(solution, null) ? $Numbers_Web_Solver.findInitialOperation(solution, numbers) : null);
		},
		$raiseSolved: function() {
			if (!ss.staticEquals(this.$1$SolvedField, null)) {
				this.$1$SolvedField(this, ss.EventArgs.Empty);
			}
		}
	});
	ss.initClass($Numbers_Web_GameFactory, $asm, {});
	ss.initClass($Numbers_Web_Number, $asm, {
		get_value: function() {
			return this.$1$ValueField;
		},
		set_value: function(value) {
			this.$1$ValueField = value;
		},
		get_level: function() {
			return this.$1$LevelField;
		},
		set_level: function(value) {
			this.$1$LevelField = value;
		},
		get_operand1: function() {
			return this.$1$Operand1Field;
		},
		set_operand1: function(value) {
			this.$1$Operand1Field = value;
		},
		get_operand2: function() {
			return this.$1$Operand2Field;
		},
		set_operand2: function(value) {
			this.$1$Operand2Field = value;
		},
		get_operator: function() {
			return this.$1$OperatorField;
		},
		set_operator: function(value) {
			this.$1$OperatorField = value;
		},
		toString: function() {
			return this.toString$1(false, true);
		},
		toString$1: function(includeValue, reduceParentheses) {
			if (this.get_operator() === 0) {
				return this.get_value().toString();
			}
			var stringBuilder = new ss.StringBuilder();
			if (includeValue) {
				stringBuilder.append(this.get_value());
				stringBuilder.append('=');
			}
			if (this.get_operand1().get_operator() === 0 || !includeValue && reduceParentheses && (this.get_operator() === 1 || this.get_operator() === 2 || (this.get_operator() === 3 || this.get_operator() === 4) && (this.get_operand1().get_operator() === 3 || this.get_operand1().get_operator() === 4))) {
				stringBuilder.append(this.get_operand1().toString$1(includeValue, reduceParentheses));
			}
			else {
				stringBuilder.append(ss.formatString('({0})', this.get_operand1().toString$1(includeValue, reduceParentheses)));
			}
			stringBuilder.append($Numbers_Web_Number.$getOperatorString(this.get_operator()));
			if (this.get_operand2().get_operator() === 0 || !includeValue && reduceParentheses && (this.get_operator() === 1 || (this.get_operator() === 2 || this.get_operator() === 3 || this.get_operator() === 4) && (this.get_operand2().get_operator() === 3 || this.get_operand2().get_operator() === 4))) {
				stringBuilder.append(this.get_operand2().toString$1(includeValue, reduceParentheses));
			}
			else {
				stringBuilder.append(ss.formatString('({0})', this.get_operand2().toString$1(includeValue, reduceParentheses)));
			}
			return stringBuilder.toString();
		},
		equals: function(obj) {
			if (ss.isNullOrUndefined(obj) || !ss.referenceEquals(ss.getInstanceType(obj), ss.getInstanceType(this))) {
				return false;
			}
			var number = ss.safeCast(obj, $Numbers_Web_Number);
			return ss.equalsT(this.get_level(), number.get_level()) && ss.equalsT(this.get_value(), number.get_value()) && ss.equals(this.get_operator(), number.get_operator()) && (ss.referenceEquals(this.get_operand1(), null) && ss.referenceEquals(number.get_operand1(), null) || !ss.referenceEquals(this.get_operand1(), null) && this.get_operand1().equals(number.get_operand1())) && (ss.referenceEquals(this.get_operand2(), null) && ss.referenceEquals(number.get_operand2(), null) || !ss.referenceEquals(this.get_operand2(), null) && this.get_operand2().equals(number.get_operand2()));
		},
		getHashCode: function() {
			return this.get_level() ^ this.get_value() ^ ($Numbers_Web_Number.op_Inequality(this.get_operand1(), null) ? this.get_operand1().getHashCode() : 0) ^ ($Numbers_Web_Number.op_Inequality(this.get_operand2(), null) ? this.get_operand2().getHashCode() : 0);
		},
		compareTo: function(other) {
			var result = ss.compare(this.get_value(), other.get_value());
			if (result !== 0 || this.get_operator() === 0 && other.get_operator() === 0) {
				return result;
			}
			if (this.get_operator() === 0) {
				return -1;
			}
			if (other.get_operator() === 0) {
				return 1;
			}
			result = this.get_operand1().compareTo(other.get_operand1());
			if (result !== 0) {
				return result;
			}
			return this.get_operand2().compareTo(other.get_operand2());
		}
	}, null, [ss.IComparable]);
	ss.initEnum($Numbers_Web_Operator, $asm, { create: 0, add: 1, subtract: 2, multiply: 3, divide: 4 });
	ss.initClass($Numbers_Web_Solver, $asm, {});
	ss.initClass($Numbers_Web_Statistics, $asm, {
		get_$totalSolvedCount: function() {
			return this.$totalSolvedCount;
		},
		set_$totalSolvedCount: function(value) {
			this.$totalSolvedCount = value;
			$Numbers_Web_ConfigurationExtensions.setValue(this.$configuration, $Numbers_Web_Statistics.$solvedCountConfigurationKey, this.$totalSolvedCount.toString());
		},
		reportSessionStart: function() {
			this.$sessionSolvedCount = 0;
		},
		reportSessionEnd: function() {
			this.reportGameEnd();
			if (this.$sessionSolvedCount > 0) {
				ga('send', 'event', { eventCategory: 'Session', eventAction: 'Solved', eventLabel: 'Count', eventValue: this.$sessionSolvedCount });
				ga('send', 'event', { eventCategory: 'Total', eventAction: 'Solved', eventLabel: 'Count', eventValue: this.$totalSolvedCount });
			}
		},
		reportGameStart: function(game) {
			this.$currentGame = game;
			this.$currentGameStart = new Date();
		},
		reportGameEnd: function() {
			if (ss.isNullOrUndefined(this.$currentGame)) {
				return;
			}
			if (this.$currentGame.get_isSolved() && this.$currentGame.get_hintsCount() <= 3) {
				this.$sessionSolvedCount++;
				this.set_$totalSolvedCount(this.get_$totalSolvedCount() + 1);
			}
			var generalCategory = 'Game';
			var solutionsCategory = $Numbers_Web_Statistics.$getSolutionsCategory(this.$currentGame.get_solutionsCount());
			var targetCategory = $Numbers_Web_Statistics.$getTargetCategory(this.$currentGame.get_targetValue());
			var gameDuration = new Date() - this.$currentGameStart;
			var action;
			var skipped = !this.$currentGame.get_isSolved() && (this.$currentGame.get_stepsCount() === 0 || gameDuration < 10000);
			if (this.$currentGame.get_isSolved()) {
				action = ((this.$currentGame.get_hintsCount() <= 3) ? 'Solved' : 'Hinted');
			}
			else {
				action = (skipped ? 'Skipped' : 'Gave up');
			}
			if (gameDuration < 1800000 && !skipped) {
				ga('send', 'timing', { timingCategory: generalCategory, timingVar: action, timingValue: gameDuration, timingLabel: 'Duration' });
				ga('send', 'timing', { timingCategory: solutionsCategory, timingVar: action, timingValue: gameDuration, timingLabel: 'Duration' });
			}
			ga('send', 'event', { eventCategory: generalCategory, eventAction: action });
			ga('send', 'event', { eventCategory: (skipped ? targetCategory : solutionsCategory), eventAction: action });
			this.$currentGame = null;
		},
		reportShare: function(shareServiceName) {
			ga('send', 'event', { eventCategory: 'Share', eventAction: shareServiceName });
		}
	});
	ss.initClass($Numbers_Web_StyleExtensions, $asm, {});
	ss.initClass($Numbers_Web_TokenDictionary, $asm, {
		set: function(key, value) {
			var dictionary = $Numbers_Web_TokenDictionary.$createDictionary(this.$getRawList());
			dictionary.set_item(key, value);
			this.$setRawList($Numbers_Web_TokenDictionary.$createRawList(dictionary));
		},
		contains: function(key) {
			var dictionary = $Numbers_Web_TokenDictionary.$createDictionary(this.$getRawList());
			return dictionary.containsKey(key);
		},
		clear: function(key) {
			var dictionary = $Numbers_Web_TokenDictionary.$createDictionary(this.$getRawList());
			dictionary.remove(key);
			this.$setRawList($Numbers_Web_TokenDictionary.$createRawList(dictionary));
		}
	});
	ss.initClass($Numbers_Web_Controls_Control, $asm, {
		get_htmlElement: function() {
			return this.$1$HtmlElementField;
		},
		set_htmlElement: function(value) {
			this.$1$HtmlElementField = value;
		},
		get_left: function() {
			return this.$left;
		},
		set_left: function(value) {
			this.$left = value;
			this.get_htmlElement().style.left = ss.formatString('{0}px', this.$left);
		},
		get_top: function() {
			return this.$top;
		},
		set_top: function(value) {
			this.$top = value;
			this.get_htmlElement().style.top = ss.formatString('{0}px', this.$top);
		},
		get_children: function() {
			return this.$children;
		},
		appendChild: function(child) {
			ss.add(this.$children, child);
			this.get_htmlElement().appendChild(child.get_htmlElement());
		},
		insertChild: function(index, child) {
			ss.insert(this.$children, index, child);
			if (index < this.get_htmlElement().children.length) {
				this.get_htmlElement().insertBefore(child.get_htmlElement(), this.get_htmlElement().children[index]);
			}
			else {
				this.get_htmlElement().appendChild(child.get_htmlElement());
			}
		},
		removeChild: function(child) {
			if (ss.contains(this.$children, child)) {
				ss.remove(this.$children, child);
				this.get_htmlElement().removeChild(child.get_htmlElement());
			}
		},
		childIndex: function(child) {
			return ss.indexOf(this.$children, child);
		},
		childAt: function(index) {
			return Enumerable.from(this.$children).where(ss.mkdel(this, function(child) {
				return ss.referenceEquals(child.get_htmlElement(), this.get_htmlElement().children[index]);
			})).firstOrDefault(null, ss.getDefaultValue($Numbers_Web_Controls_Control));
		},
		add: function(item) {
			this.appendChild(ss.cast(item, $Numbers_Web_Controls_Control));
		},
		getEnumerator: function() {
			return null;
		},
		dispose: function() {
			var $t1 = ss.getEnumerator(this.get_children());
			try {
				while ($t1.moveNext()) {
					var child = $t1.current();
					child.dispose();
				}
			}
			finally {
				$t1.dispose();
			}
		}
	}, null, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Controls_Button, $asm, {
		get_isEnabled: function() {
			return this.$2$IsEnabledField;
		},
		set_isEnabled: function(value) {
			this.$2$IsEnabledField = value;
		},
		add_isCheckedChanged: function(value) {
			this.$2$IsCheckedChangedField = ss.delegateCombine(this.$2$IsCheckedChangedField, value);
		},
		remove_isCheckedChanged: function(value) {
			this.$2$IsCheckedChangedField = ss.delegateRemove(this.$2$IsCheckedChangedField, value);
		},
		get_isChecked: function() {
			return this.$isChecked;
		},
		set_isChecked: function(value) {
			if (this.$isChecked !== value) {
				this.$isChecked = value;
				this.$onIsCheckChanged();
				window.setTimeout(ss.mkdel(this, this.$raiseIsCheckedChanged), $Numbers_Web_Controls_Button.$checkAnimationDurationMilliseconds);
			}
		},
		get_shadow: function() {
			return this.$2$ShadowField;
		},
		set_shadow: function(value) {
			this.$2$ShadowField = value;
		},
		dispose: function() {
			$Numbers_Web_Controls_Control.prototype.dispose.call(this);
			window.removeEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
			window.removeEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
		},
		startAppearAnimation: function() {
			var animation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0)]);
			animation.start();
		},
		startDisappearAnimation: function() {
			var animation = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Keyframe(this.get_shadow().get_htmlElement(), 'visibility', 'hidden', 0), new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0), new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(1, 0), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0)]);
			animation.start();
		},
		startCreateAnimation: function() {
			var transformTransition = new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(1.4, (this.get_isChecked() ? 1.08 : 1)), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0);
			var opacityTransition = new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0);
			var shadowTransformTransition = new $Numbers_Web_Transitions_MultiplePropertyTransition(this.get_shadow().get_htmlElement(), ['transform', '-webkit-transform'], new $Numbers_Web_Transitions_ScaleValueBounds(1.4, (this.get_isChecked() ? 1.08 : 1)), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0);
			var shadowOpacityTransition = new $Numbers_Web_Transitions_Transition(this.get_shadow().get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(400, null, 0), 0, 0);
			var scaleOutAnimation = (this.get_isChecked() ? new $Numbers_Web_Transitions_ParallelTransition([transformTransition, opacityTransition, shadowTransformTransition, shadowOpacityTransition]) : new $Numbers_Web_Transitions_ParallelTransition([transformTransition, opacityTransition]));
			scaleOutAnimation.start();
		},
		startFadeInAnimation: function() {
			var animation = new $Numbers_Web_Transitions_Transition(this.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(1400, null, 0), 0, 0);
			animation.start();
		},
		$onPointerDown: function(e) {
			var target = e.target || e.srcElement;
			if (!ss.referenceEquals(target, this.get_htmlElement())) {
				return;
			}
			if (this.get_isEnabled()) {
				this.set_isChecked(!this.get_isChecked());
				var uiEvent = ss.safeCast(e, UIEvent);
				this.$overlay.get_htmlElement().style['transformOrigin'] = ((uiEvent.layerY === 0 && uiEvent.layerY === 0) ? '50% 50%' : ss.formatString('{0}px {1}px', uiEvent.layerX, uiEvent.layerY));
				this.$overlayAnimation.start();
			}
			e.preventDefault();
		},
		$onIsCheckChanged: function() {
			if (this.get_isChecked()) {
				this.$uncheckedAnimation.stop();
				this.$checkedAnimation.start();
			}
			else {
				this.$checkedAnimation.stop();
				this.$uncheckedAnimation.start();
			}
			this.get_htmlElement().setAttribute('data-is-checked', this.get_isChecked().toString());
		},
		$raiseIsCheckedChanged: function() {
			if (!ss.staticEquals(this.$2$IsCheckedChangedField, null)) {
				window.setTimeout(ss.mkdel(this, function() {
					this.$2$IsCheckedChangedField(this, ss.EventArgs.Empty);
				}));
			}
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initInterface($Numbers_Web_Controls_IDialogContainer, $asm, { showDialog: null });
	ss.initClass($Numbers_Web_Controls_DialogContainer, $asm, {
		dispose: function() {
			$Numbers_Web_Controls_Control.prototype.dispose.call(this);
			window.removeEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
			window.removeEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
			window.removeEventListener('resize', ss.mkdel(this, this.$updateLayout));
		},
		showDialog: function(dialog, dialogWidth, dialogHeight) {
			if (ss.isValue(this.$currentDialog)) {
				this.removeChild(this.$currentDialog);
			}
			this.$currentDialog = dialog;
			this.$dialogWidth = dialogWidth;
			this.$dialogHeight = dialogHeight;
			this.$currentDialog.get_htmlElement().style.opacity = '0';
			this.appendChild(this.$currentDialog);
			this.$updateLayout();
			var dialogAppearTransition = new $Numbers_Web_Transitions_ParallelTransition([new $Numbers_Web_Transitions_Transition(this.$currentDialog.get_htmlElement(), 'opacity', new $Numbers_Web_Transitions_DoubleValueBounds(0, 1), new $Numbers_Web_Transitions_TransitionTiming(200, null, 0), 200, 0), new $Numbers_Web_Transitions_Transition(this.$currentDialog.get_htmlElement(), 'margin', new $Numbers_Web_Transitions_ValueBounds('-20px 0px 0px 0px', '0px 0px 0px 0px', null), new $Numbers_Web_Transitions_TransitionTiming(400, $Numbers_Web_Transitions_TimingCurve.easeOut, 0), 200, 0)]);
			this.$disappearTransition.stop();
			this.$appearTransition.start();
			dialogAppearTransition.start();
		},
		$updateLayout: function() {
			if (ss.isNullOrUndefined(this.$currentDialog)) {
				return;
			}
			this.$currentDialog.set_left(ss.Int32.div(window.innerWidth - this.$dialogWidth, 2));
			this.$currentDialog.set_top(ss.Int32.div(window.innerHeight - this.$dialogHeight, 2));
		},
		$onPointerDown: function(e) {
			var target = e.target || e.srcElement;
			if (!ss.referenceEquals(target, this.get_htmlElement()) || ss.isNullOrUndefined(this.$currentDialog)) {
				return;
			}
			this.$appearTransition.stop();
			this.$disappearTransition.start();
			e.preventDefault();
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable, $Numbers_Web_Controls_IDialogContainer]);
	ss.initEnum($Numbers_Web_Controls_Direction, $asm, { left: 0, top: 1, right: 2, bottom: 3 });
	ss.initClass($Numbers_Web_Controls_Label, $asm, {
		get_text: function() {
			return this.get_htmlElement().textContent;
		},
		set_text: function(value) {
			this.get_htmlElement().textContent = value;
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Controls_Link, $asm, {
		get_text: function() {
			return this.$linkElement.textContent;
		},
		set_text: function(value) {
			this.$linkElement.textContent = value;
		},
		get_href: function() {
			return this.$linkElement.getAttribute('href');
		},
		set_href: function(value) {
			this.$linkElement.setAttribute('href', value);
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Controls_ToolbarButton, $asm, {
		get_isEnabled: function() {
			return this.$2$IsEnabledField;
		},
		set_isEnabled: function(value) {
			this.$2$IsEnabledField = value;
		},
		get_isPressed: function() {
			return this.$2$IsPressedField;
		},
		set_isPressed: function(value) {
			this.$2$IsPressedField = value;
		},
		dispose: function() {
			$Numbers_Web_Controls_Control.prototype.dispose.call(this);
			window.removeEventListener('touchstart', ss.mkdel(this, this.$onPointerDown), false);
			window.removeEventListener('touchend', ss.mkdel(this, this.$onPointerUp), false);
			window.removeEventListener('touchmove', ss.mkdel(this, this.$onPointerMove), false);
			window.removeEventListener('touchcancel', ss.mkdel(this, this.$onPointerUp), false);
			window.removeEventListener('mousedown', ss.mkdel(this, this.$onPointerDown), false);
			window.removeEventListener('mouseup', ss.mkdel(this, this.$onPointerUp), false);
		},
		$onPointerDown: function(e) {
			var target = e.target || e.srcElement;
			if (!ss.referenceEquals(target, this.get_htmlElement()) || this.get_isPressed()) {
				return;
			}
			this.set_isPressed(true);
			if (this.get_isEnabled() && !ss.staticEquals(this.$mouseDown, null)) {
				window.setTimeout(this.$mouseDown);
			}
			e.preventDefault();
		},
		$onPointerMove: function(e) {
			var target = e.target || e.srcElement;
			if (!ss.referenceEquals(target, this.get_htmlElement())) {
				return;
			}
			e.preventDefault();
		},
		$onPointerUp: function(e) {
			var target = e.target || e.srcElement;
			if (!ss.referenceEquals(target, this.get_htmlElement()) || !this.get_isPressed()) {
				return;
			}
			this.set_isPressed(false);
			if (this.get_isEnabled() && !ss.staticEquals(this.$mouseUp, null)) {
				window.setTimeout(this.$mouseUp);
			}
			e.preventDefault();
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Controls_Tooltip, $asm, {
		updateLayout: function() {
			var width = this.$label.get_htmlElement().clientWidth;
			var height = this.$label.get_htmlElement().clientHeight;
			this.get_htmlElement().style.width = ss.formatString('{0}px', width);
			this.get_htmlElement().style.height = ss.formatString('{0}px', height);
			var $t1 = Enumerable.from(this.$arrows).zip(this.$arrowsOffset, function(arrow, offset) {
				return { item1: arrow, item2: offset };
			}).getEnumerator();
			try {
				while ($t1.moveNext()) {
					var tuple = $t1.current();
					tuple.item1.set_left(((this.$arrowsDirection === 0) ? 0 : ((this.$arrowsDirection === 2) ? width : tuple.item2)));
					tuple.item1.set_top(((this.$arrowsDirection === 1) ? 0 : ((this.$arrowsDirection === 3) ? height : tuple.item2)));
				}
			}
			finally {
				$t1.dispose();
			}
			;
		},
		startAppearAnimation: function() {
			this.updateLayout();
			this.$appearTransition.start();
		},
		startDisappearAnimation: function() {
			this.$disappearTransition.start();
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initInterface($Numbers_Web_Generic_INotifyCollectionChanged, $asm, { add_collectionChanged: null, remove_collectionChanged: null });
	ss.initInterface($Numbers_Web_Generic_INotifyPropertyChanged, $asm, { add_propertyChanged: null, remove_propertyChanged: null });
	ss.initEnum($Numbers_Web_Generic_NotifyCollectionChangedAction, $asm, { add: 0, remove: 1, reset: 2 });
	ss.initClass($Numbers_Web_Generic_NotifyCollectionChangedEventArgs, $asm, {
		get_action: function() {
			return this.$2$ActionField;
		},
		set_action: function(value) {
			this.$2$ActionField = value;
		},
		get_item: function() {
			return this.$2$ItemField;
		},
		set_item: function(value) {
			this.$2$ItemField = value;
		},
		get_index: function() {
			return this.$2$IndexField;
		},
		set_index: function(value) {
			this.$2$IndexField = value;
		}
	}, ss.EventArgs);
	ss.initClass($Numbers_Web_Generic_PropertyChangedEventArgs, $asm, {
		get_propertyName: function() {
			return this.$2$PropertyNameField;
		},
		set_propertyName: function(value) {
			this.$2$PropertyNameField = value;
		}
	}, ss.EventArgs);
	ss.initClass($Numbers_Web_Transitions_DoubleValueBounds, $asm, {
		get_formattedStartValue: function() {
			return this.$1$FormattedStartValueField;
		},
		set_formattedStartValue: function(value) {
			this.$1$FormattedStartValueField = value;
		},
		get_formattedEndValue: function() {
			return this.$1$FormattedEndValueField;
		},
		set_formattedEndValue: function(value) {
			this.$1$FormattedEndValueField = value;
		},
		getProgress: function(formattedValue) {
			var value = parseFloat(formattedValue);
			return (value - this.$startValue) / (this.$endValue - this.$startValue);
		}
	}, null, [$Numbers_Web_Transitions_IValueBounds]);
	ss.initInterface($Numbers_Web_Transitions_ITransition, $asm, { add_completed: null, remove_completed: null, start: null, stop: null });
	ss.initClass($Numbers_Web_Transitions_Keyframe, $asm, {
		add_completed: function(value) {
			this.$1$CompletedField = ss.delegateCombine(this.$1$CompletedField, value);
		},
		remove_completed: function(value) {
			this.$1$CompletedField = ss.delegateRemove(this.$1$CompletedField, value);
		},
		start: function() {
			if (this.$delay === 0) {
				this.$setKeyframeValue();
			}
			else {
				this.$cancellationToken = window.setTimeout(ss.mkdel(this, this.$setKeyframeValue), this.$delay);
			}
		},
		stop: function() {
			window.clearTimeout(this.$cancellationToken);
		},
		$setKeyframeValue: function() {
			this.$targetElement.style[this.$targetProperty] = this.$keyframeValue;
			this.$raiseCompleted();
		},
		$raiseCompleted: function() {
			if (!ss.staticEquals(this.$1$CompletedField, null)) {
				this.$1$CompletedField(this, ss.EventArgs.Empty);
			}
		}
	}, null, [$Numbers_Web_Transitions_ITransition]);
	ss.initClass($Numbers_Web_Transitions_MultiplePropertyTransition, $asm, {
		add_completed: function(value) {
			this.$1$CompletedField = ss.delegateCombine(this.$1$CompletedField, value);
		},
		remove_completed: function(value) {
			this.$1$CompletedField = ss.delegateRemove(this.$1$CompletedField, value);
		},
		start: function() {
			this.$transition.start();
		},
		stop: function() {
			this.$transition.stop();
		},
		$raiseCompleted: function() {
			if (!ss.staticEquals(this.$1$CompletedField, null)) {
				this.$1$CompletedField(this, ss.EventArgs.Empty);
			}
		}
	}, null, [$Numbers_Web_Transitions_ITransition]);
	ss.initClass($Numbers_Web_Transitions_ParallelTransition, $asm, {
		add_completed: function(value) {
			this.$1$CompletedField = ss.delegateCombine(this.$1$CompletedField, value);
		},
		remove_completed: function(value) {
			this.$1$CompletedField = ss.delegateRemove(this.$1$CompletedField, value);
		},
		start: function() {
			this.$completedCount = 0;
			for (var $t1 = 0; $t1 < this.$transitions.length; $t1++) {
				var transition = this.$transitions[$t1];
				transition.start();
			}
		},
		stop: function() {
			for (var $t1 = 0; $t1 < this.$transitions.length; $t1++) {
				var transition = this.$transitions[$t1];
				transition.stop();
			}
		},
		$onTransitionCompleted: function(sender, e) {
			this.$completedCount++;
			if (this.$completedCount === this.$transitions.length) {
				this.$raiseCompleted();
			}
		},
		$raiseCompleted: function() {
			if (!ss.staticEquals(this.$1$CompletedField, null)) {
				this.$1$CompletedField(this, ss.EventArgs.Empty);
			}
		}
	}, null, [$Numbers_Web_Transitions_ITransition]);
	ss.initClass($Numbers_Web_Transitions_PixelValueBounds, $asm, {
		get_formattedStartValue: function() {
			return this.$1$FormattedStartValueField;
		},
		set_formattedStartValue: function(value) {
			this.$1$FormattedStartValueField = value;
		},
		get_formattedEndValue: function() {
			return this.$1$FormattedEndValueField;
		},
		set_formattedEndValue: function(value) {
			this.$1$FormattedEndValueField = value;
		},
		getProgress: function(formattedValue) {
			var value = $Numbers_Web_Transitions_PixelValueBounds.$getValue(formattedValue);
			return (value - this.$startValue) / (this.$endValue - this.$startValue);
		}
	}, null, [$Numbers_Web_Transitions_IValueBounds]);
	ss.initClass($Numbers_Web_Transitions_ScaleValueBounds, $asm, {
		get_formattedStartValue: function() {
			return this.$1$FormattedStartValueField;
		},
		set_formattedStartValue: function(value) {
			this.$1$FormattedStartValueField = value;
		},
		get_formattedEndValue: function() {
			return this.$1$FormattedEndValueField;
		},
		set_formattedEndValue: function(value) {
			this.$1$FormattedEndValueField = value;
		},
		getProgress: function(formattedValue) {
			var value = $Numbers_Web_Transitions_ScaleValueBounds.$getValue(formattedValue);
			return (value - this.$startValue) / (this.$endValue - this.$startValue);
		}
	}, null, [$Numbers_Web_Transitions_IValueBounds]);
	ss.initClass($Numbers_Web_Transitions_SequentialTransition, $asm, {
		add_completed: function(value) {
			this.$1$CompletedField = ss.delegateCombine(this.$1$CompletedField, value);
		},
		remove_completed: function(value) {
			this.$1$CompletedField = ss.delegateRemove(this.$1$CompletedField, value);
		},
		start: function() {
			this.$currentIndex = 0;
			if (this.$currentIndex < this.$transitions.length) {
				this.$transitions[this.$currentIndex].start();
			}
		},
		stop: function() {
			if (this.$currentIndex < this.$transitions.length) {
				this.$transitions[this.$currentIndex].stop();
			}
		},
		$onTransitionCompleted: function(sender, e) {
			this.$currentIndex++;
			if (this.$currentIndex < this.$transitions.length) {
				this.$transitions[this.$currentIndex].start();
			}
			else {
				this.$raiseCompleted();
			}
		},
		$raiseCompleted: function() {
			if (!ss.staticEquals(this.$1$CompletedField, null)) {
				this.$1$CompletedField(this, ss.EventArgs.Empty);
			}
		}
	}, null, [$Numbers_Web_Transitions_ITransition]);
	ss.initClass($Numbers_Web_Transitions_TimingCurve, $asm, {
		get_x1: function() {
			return this.$1$X1Field;
		},
		set_x1: function(value) {
			this.$1$X1Field = value;
		},
		get_y1: function() {
			return this.$1$Y1Field;
		},
		set_y1: function(value) {
			this.$1$Y1Field = value;
		},
		get_x2: function() {
			return this.$1$X2Field;
		},
		set_x2: function(value) {
			this.$1$X2Field = value;
		},
		get_y2: function() {
			return this.$1$Y2Field;
		},
		set_y2: function(value) {
			this.$1$Y2Field = value;
		},
		get_name: function() {
			return this.$1$NameField;
		},
		set_name: function(value) {
			this.$1$NameField = value;
		},
		toString: function() {
			return (!ss.isNullOrEmptyString(this.get_name()) ? this.get_name() : ss.formatString('cubic-bezier({0}, {1}, {2}, {3})', this.get_x1(), this.get_y1(), this.get_x2(), this.get_y2()));
		},
		getProgress: function(timing) {
			var resultTiming = {};
			var resultProgress = {};
			this.$findCurvePoint(function(currentTiming, currentProgress) {
				return ss.compare(currentTiming, timing);
			}, resultTiming, resultProgress);
			return resultProgress.$;
		},
		getTiming: function(progress) {
			var resultTiming = {};
			var resultProgress = {};
			this.$findCurvePoint(function(currentTiming, currentProgress) {
				return ss.compare(currentProgress, progress);
			}, resultTiming, resultProgress);
			return resultTiming.$;
		},
		$findCurvePoint: function(comparer, x, y) {
			var t = 0.5;
			var step = 0.5;
			x.$ = 0;
			y.$ = 0;
			for (var i = 0; i < 10; i++) {
				this.$getCurvePoint(t, x, y);
				if (comparer(x.$, y.$) < 0) {
					t += step;
				}
				else if (comparer(x.$, y.$) > 0) {
					t -= step;
				}
				step = step / 2;
			}
		},
		$getCurvePoint: function(t, x, y) {
			x.$ = (3 * this.get_x1() - 3 * this.get_x2() + 1) * t * t * t + (-6 * this.get_x1() + 3 * this.get_x2()) * t * t + 3 * this.get_x1() * t;
			y.$ = (3 * this.get_y1() - 3 * this.get_y2() + 1) * t * t * t + (-6 * this.get_y1() + 3 * this.get_y2()) * t * t + 3 * this.get_y1() * t;
		}
	});
	ss.initClass($Numbers_Web_Transitions_Transition, $asm, {
		add_completed: function(value) {
			this.$1$CompletedField = ss.delegateCombine(this.$1$CompletedField, value);
		},
		remove_completed: function(value) {
			this.$1$CompletedField = ss.delegateRemove(this.$1$CompletedField, value);
		},
		start: function() {
			if (this.$state !== 0) {
				this.stop();
			}
			this.$state = 1;
			this.$cancellationToken = window.setTimeout(ss.mkdel(this, function() {
				if (this.$state !== 1) {
					return;
				}
				this.$state = 2;
				var currentValue = this.$valueBounds.get_formattedStartValue();
				var currentTiming = this.$timing;
				if (this.$continuationMode === 1 || this.$continuationMode === 2) {
					currentValue = window.getComputedStyle(this.$targetElement).getPropertyValue(this.$targetProperty);
				}
				if (this.$continuationMode === 2) {
					var currentProgress = this.$valueBounds.getProgress(currentValue);
					var currentProgressTiming = this.$timing.get_timing().getTiming(currentProgress);
					currentTiming = this.$timing.addDuration(ss.Int32.trunc(-currentProgressTiming * this.$timing.get_duration()));
					// also, a truncated timing curve is needed here;
				}
				$Numbers_Web_StyleExtensions.getTransitionDictionary(this.$targetElement.style).clear(this.$targetProperty);
				this.$targetElement.style[this.$targetProperty] = currentValue;
				$Numbers_Web_Transitions_Transition.$runAsync(ss.mkdel(this, function() {
					if (this.$state === 2) {
						$Numbers_Web_StyleExtensions.getTransitionDictionary(this.$targetElement.style).set(this.$targetProperty, currentTiming.toString());
						this.$targetElement.style[this.$targetProperty] = this.$valueBounds.get_formattedEndValue();
					}
				}));
				window.setTimeout(ss.mkdel(this, function() {
					if (this.$state === 2) {
						this.$raiseCompleted();
					}
				}), currentTiming.get_delay() + currentTiming.get_duration());
			}), this.$delay);
		},
		stop: function() {
			if (this.$state === 0) {
				return;
			}
			if (this.$state === 1) {
				window.clearTimeout(this.$cancellationToken);
			}
			else if (this.$state === 2) {
				var currentValue = window.getComputedStyle(this.$targetElement).getPropertyValue(this.$targetProperty);
				$Numbers_Web_StyleExtensions.getTransitionDictionary(this.$targetElement.style).clear(this.$targetProperty);
				this.$targetElement.style[this.$targetProperty] = currentValue;
			}
			else {
				throw new ss.Exception('Unsupported animation state');
			}
			this.$state = 0;
		},
		$raiseCompleted: function() {
			if (!ss.staticEquals(this.$1$CompletedField, null)) {
				this.$1$CompletedField(this, ss.EventArgs.Empty);
			}
		}
	}, null, [$Numbers_Web_Transitions_ITransition]);
	ss.initEnum($Numbers_Web_Transitions_Transition$ContinuationMode, $asm, { restart: 0, continueValue: 1, continueValueAndTime: 2 });
	ss.initClass($Numbers_Web_Transitions_TransitionTiming, $asm, {
		get_duration: function() {
			return this.$1$DurationField;
		},
		set_duration: function(value) {
			this.$1$DurationField = value;
		},
		get_delay: function() {
			return this.$1$DelayField;
		},
		set_delay: function(value) {
			this.$1$DelayField = value;
		},
		get_timing: function() {
			return this.$1$TimingField;
		},
		set_timing: function(value) {
			this.$1$TimingField = value;
		},
		toString: function() {
			return ((this.get_delay() === 0) ? ss.formatString('{0}ms {1}', this.get_duration(), this.get_timing()) : ss.formatString('{0}ms {1} {2}ms', this.get_duration(), this.get_timing(), this.get_delay()));
		},
		addDuration: function(durationMilliseconds) {
			return new $Numbers_Web_Transitions_TransitionTiming(this.get_duration() + durationMilliseconds, this.get_timing(), this.get_delay());
		},
		addDelay: function(delayMilliseconds) {
			return new $Numbers_Web_Transitions_TransitionTiming(this.get_duration(), this.get_timing(), this.get_delay() + delayMilliseconds);
		}
	});
	ss.initClass($Numbers_Web_Transitions_ValueBounds, $asm, {
		get_formattedStartValue: function() {
			return this.$1$FormattedStartValueField;
		},
		set_formattedStartValue: function(value) {
			this.$1$FormattedStartValueField = value;
		},
		get_formattedEndValue: function() {
			return this.$1$FormattedEndValueField;
		},
		set_formattedEndValue: function(value) {
			this.$1$FormattedEndValueField = value;
		},
		getProgress: function(formattedValue) {
			return (ss.staticEquals(this.$getProgress, null) ? 0 : this.$getProgress(this, formattedValue));
		}
	}, null, [$Numbers_Web_Transitions_IValueBounds]);
	ss.initClass($Numbers_Web_Transitions_ValueBoundsExtensions, $asm, {});
	ss.initEnum($Numbers_Web_ViewModels_CreationSource, $asm, { initial: 0, result: 1, undo: 2 });
	ss.initClass($Numbers_Web_ViewModels_CyclicSelectionBehavior, $asm, {
		add_selectionChanged: function(value) {
			this.$1$SelectionChangedField = ss.delegateCombine(this.$1$SelectionChangedField, value);
		},
		remove_selectionChanged: function(value) {
			this.$1$SelectionChangedField = ss.delegateRemove(this.$1$SelectionChangedField, value);
		},
		$onCollectionChanged: function(sender, e) {
			var selectable = ss.safeCast(e.get_item(), $Numbers_Web_ViewModels_SelectableViewModel);
			if (e.get_action() === 1) {
				this.$removeSelection(selectable);
				selectable.remove_isSelectedChanged(ss.mkdel(this, this.$onIsSelectedChanged));
			}
			else if (e.get_action() === 0) {
				if (selectable.get_isSelected()) {
					this.$addSelection(selectable);
				}
				selectable.add_isSelectedChanged(ss.mkdel(this, this.$onIsSelectedChanged));
			}
			else {
				throw new ss.Exception('Unsupported collection action');
			}
		},
		$addSelection: function(selectable) {
			ss.add(this.$selectionOrder, selectable);
			if (this.$selectionOrder.length > this.$maximumSelectedCount) {
				this.$selectionOrder[0].set_isSelected(false);
			}
		},
		$removeSelection: function(selectable) {
			ss.remove(this.$selectionOrder, selectable);
		},
		$onIsSelectedChanged: function(sender, e) {
			var selectable = ss.safeCast(sender, $Numbers_Web_ViewModels_SelectableViewModel);
			if (selectable.get_isSelected()) {
				this.$addSelection(selectable);
			}
			else {
				this.$removeSelection(selectable);
			}
			this.$raiseSelectionChanged();
		},
		dispose: function() {
			if (ss.isInstanceOfType(this.$selectables, $Numbers_Web_Generic_INotifyCollectionChanged)) {
				ss.safeCast(this.$selectables, $Numbers_Web_Generic_INotifyCollectionChanged).remove_collectionChanged(ss.mkdel(this, this.$onCollectionChanged));
			}
			var $t1 = ss.getEnumerator(this.$selectables);
			try {
				while ($t1.moveNext()) {
					var selectable = $t1.current();
					selectable.remove_isSelectedChanged(ss.mkdel(this, this.$onIsSelectedChanged));
				}
			}
			finally {
				$t1.dispose();
			}
		},
		$raiseSelectionChanged: function() {
			if (!ss.staticEquals(this.$1$SelectionChangedField, null)) {
				this.$1$SelectionChangedField(this, ss.EventArgs.Empty);
			}
		}
	}, null, [ss.IDisposable]);
	ss.initClass($Numbers_Web_ViewModels_GameViewModel, $asm, {
		add_solved: function(value) {
			this.$1$SolvedField = ss.delegateCombine(this.$1$SolvedField, value);
		},
		remove_solved: function(value) {
			this.$1$SolvedField = ss.delegateRemove(this.$1$SolvedField, value);
		},
		add_selectionChanged: function(value) {
			this.$1$SelectionChangedField = ss.delegateCombine(this.$1$SelectionChangedField, value);
		},
		remove_selectionChanged: function(value) {
			this.$1$SelectionChangedField = ss.delegateRemove(this.$1$SelectionChangedField, value);
		},
		add_numbersChanged: function(value) {
			this.$1$NumbersChangedField = ss.delegateCombine(this.$1$NumbersChangedField, value);
		},
		remove_numbersChanged: function(value) {
			this.$1$NumbersChangedField = ss.delegateRemove(this.$1$NumbersChangedField, value);
		},
		get_numbers: function() {
			return this.$1$NumbersField;
		},
		set_numbers: function(value) {
			this.$1$NumbersField = value;
		},
		get_operators: function() {
			return this.$1$OperatorsField;
		},
		set_operators: function(value) {
			this.$1$OperatorsField = value;
		},
		get_targetValue: function() {
			return this.$model.get_targetValue();
		},
		get_solutionsCount: function() {
			return this.$model.get_solutionsCount();
		},
		get_isSolved: function() {
			return this.$model.get_isSolved();
		},
		undo: function() {
			var number = this.$model.pop();
			if ($Numbers_Web_Number.op_Equality(number, null)) {
				return;
			}
			this.get_numbers().remove(Enumerable.from(this.get_numbers()).firstOrDefault(function(vm) {
				return $Numbers_Web_Number.op_Equality(vm.get_model(), number);
			}, ss.getDefaultValue($Numbers_Web_ViewModels_NumberViewModel)));
			this.$insertNumber(new $Numbers_Web_ViewModels_NumberViewModel(number.get_operand1(), false, 2));
			this.$insertNumber(new $Numbers_Web_ViewModels_NumberViewModel(number.get_operand2(), false, 2));
			this.$clearSelection();
			this.$raiseNumbersChanged();
		},
		hint: function() {
			return this.$model.hint();
		},
		setSelection: function(number) {
			var $t1 = this.get_numbers().getEnumerator();
			try {
				while ($t1.moveNext()) {
					var numberViewModel = $t1.current();
					numberViewModel.set_isSelected($Numbers_Web_Number.op_Equality(numberViewModel.get_model(), number.get_operand1()) || $Numbers_Web_Number.op_Equality(numberViewModel.get_model(), number.get_operand2()));
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = ss.getEnumerator(this.get_operators());
			try {
				while ($t2.moveNext()) {
					var operatorViewModel = $t2.current();
					operatorViewModel.set_isSelected(operatorViewModel.get_operator() === number.get_operator());
				}
			}
			finally {
				$t2.dispose();
			}
		},
		newGame: function() {
			this.$host.newGame();
		},
		tryCalculate: function() {
			var operatorViewModel = Enumerable.from(this.get_operators()).where(function(vm) {
				return vm.get_isSelected();
			}).firstOrDefault(null, ss.getDefaultValue($Numbers_Web_ViewModels_OperatorViewModel));
			var numberViewModels = ((Enumerable.from(this.get_numbers()).count() === 2) ? Enumerable.from(this.get_numbers()).toArray() : Enumerable.from(this.get_numbers()).where(function(vm1) {
				return vm1.get_isSelected();
			}).toArray());
			if (ss.isNullOrUndefined(operatorViewModel) || numberViewModels.length !== 2) {
				return;
			}
			var result = operatorViewModel.calculate(numberViewModels[0], numberViewModels[1]);
			if ($Numbers_Web_Number.op_Inequality(result, null)) {
				this.$push(result);
			}
			operatorViewModel.set_isSelected(false);
		},
		$push: function(number) {
			this.$model.push(number);
			this.get_numbers().remove(Enumerable.from(this.get_numbers()).firstOrDefault(function(vm) {
				return $Numbers_Web_Number.op_Equality(vm.get_model(), number.get_operand1());
			}, ss.getDefaultValue($Numbers_Web_ViewModels_NumberViewModel)));
			this.get_numbers().remove(Enumerable.from(this.get_numbers()).firstOrDefault(function(vm1) {
				return $Numbers_Web_Number.op_Equality(vm1.get_model(), number.get_operand2());
			}, ss.getDefaultValue($Numbers_Web_ViewModels_NumberViewModel)));
			this.$clearSelection();
			var resultViewModel = new $Numbers_Web_ViewModels_NumberViewModel(number, this.get_numbers().get_count() === 0 && number.get_value() === this.get_targetValue(), 1);
			resultViewModel.set_isSelected(this.get_numbers().get_count() > 0);
			this.$insertNumber(resultViewModel);
			this.$raiseNumbersChanged();
			if (this.$model.get_isSolved()) {
				this.$raiseSolved();
			}
		},
		$insertNumber: function(numberViewModel) {
			var index = this.get_numbers().indexOf(Enumerable.from(this.get_numbers()).firstOrDefault(function(vm) {
				return vm.get_value() > numberViewModel.get_value();
			}, ss.getDefaultValue($Numbers_Web_ViewModels_NumberViewModel)));
			if (index === -1) {
				this.get_numbers().add(numberViewModel);
			}
			else {
				this.get_numbers().insert(index, numberViewModel);
			}
		},
		$clearSelection: function() {
			var $t1 = ss.getEnumerator(this.get_operators());
			try {
				while ($t1.moveNext()) {
					var operatorViewModel = $t1.current();
					operatorViewModel.set_isSelected(false);
				}
			}
			finally {
				$t1.dispose();
			}
			var $t2 = this.get_numbers().getEnumerator();
			try {
				while ($t2.moveNext()) {
					var numberViewModel = $t2.current();
					numberViewModel.set_isSelected(false);
				}
			}
			finally {
				$t2.dispose();
			}
		},
		$raiseNumbersChanged: function() {
			if (!ss.staticEquals(this.$1$NumbersChangedField, null)) {
				this.$1$NumbersChangedField(this, ss.EventArgs.Empty);
			}
		},
		$raiseSolved: function() {
			if (!ss.staticEquals(this.$1$SolvedField, null)) {
				this.$1$SolvedField(this, ss.EventArgs.Empty);
			}
		},
		$raiseSelectionChanged: function() {
			if (!ss.staticEquals(this.$1$SelectionChangedField, null)) {
				this.$1$SelectionChangedField(this, ss.EventArgs.Empty);
			}
		}
	});
	ss.initClass($Numbers_Web_ViewModels_SelectableViewModel, $asm, {
		add_isSelectedChanged: function(value) {
			this.$1$IsSelectedChangedField = ss.delegateCombine(this.$1$IsSelectedChangedField, value);
		},
		remove_isSelectedChanged: function(value) {
			this.$1$IsSelectedChangedField = ss.delegateRemove(this.$1$IsSelectedChangedField, value);
		},
		get_isSelected: function() {
			return this.$isSelected;
		},
		set_isSelected: function(value) {
			if (this.$isSelected !== value) {
				this.$isSelected = value;
				this.$raiseIsSelectedChanged();
			}
		},
		$raiseIsSelectedChanged: function() {
			if (!ss.staticEquals(this.$1$IsSelectedChangedField, null)) {
				this.$1$IsSelectedChangedField(this, ss.EventArgs.Empty);
			}
		}
	});
	ss.initClass($Numbers_Web_ViewModels_NumberViewModel, $asm, {
		get_model: function() {
			return this.$2$ModelField;
		},
		set_model: function(value) {
			this.$2$ModelField = value;
		},
		get_value: function() {
			return this.get_model().get_value();
		},
		get_level: function() {
			return this.get_model().get_level();
		},
		get_isTarget: function() {
			return this.$2$IsTargetField;
		},
		set_isTarget: function(value) {
			this.$2$IsTargetField = value;
		},
		get_source: function() {
			return this.$2$SourceField;
		},
		set_source: function(value) {
			this.$2$SourceField = value;
		}
	}, $Numbers_Web_ViewModels_SelectableViewModel);
	ss.initClass($Numbers_Web_ViewModels_OperatorViewModel, $asm, {
		get_operator: function() {
			return this.$2$OperatorField;
		},
		set_operator: function(value) {
			this.$2$OperatorField = value;
		},
		calculate: function(a, b) {
			return this.$calculation(a.get_model(), b.get_model());
		}
	}, $Numbers_Web_ViewModels_SelectableViewModel);
	ss.initClass($Numbers_Web_Views_GameView, $asm, {
		$onSelectionChanged: function(sender, e) {
			if (!this.$toolbarView.get_isHintPressed()) {
				this.$viewModel.tryCalculate();
			}
		},
		run: function() {
			this.$numbersCollectionView.startAppearAnimation(600);
			this.$operatorsCollectionView.startAppearAnimation(600);
			this.$targetView.startAppearAnimation();
			this.$toolbarView.startAppearAnimation();
		},
		$newGame: function() {
			if (this.$newGameRequested) {
				return;
			}
			this.$newGameRequested = true;
			if (this.$solved) {
				this.$solveDisappearAnimation.start();
				window.setTimeout(ss.mkdel(this.$viewModel, this.$viewModel.newGame), 2000);
			}
			else {
				this.$targetView.startDisappearAnimation();
				this.$toolbarView.startDisappearAnimation();
				this.$numbersCollectionView.startDisappearAnimation(600);
				this.$operatorsCollectionView.startDisappearAnimation(600);
				window.setTimeout(ss.mkdel(this.$viewModel, this.$viewModel.newGame), 1000);
			}
			if (ss.isValue(this.$helpView)) {
				this.$helpView.clearTooltips();
			}
		},
		$onSolved: function(sender, e) {
			this.$solved = true;
			this.$solveAppearAnimation.start();
			this.$targetView.startDisappearAnimation();
		},
		$onPointerDown: function(e) {
			this.$newGame();
			e.preventDefault();
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Views_HelpView, $asm, {
		$onNumbersChanged: function(sender, e) {
			this.clearTooltips();
			this.$addTooltips();
		},
		$addTooltips: function() {
			var operation = this.$viewModel.hint();
			this.$addWelcomeTooltip();
			if ($Numbers_Web_Number.op_Equality(operation, null)) {
				if (!this.$viewModel.get_isSolved()) {
					this.$addUndoTooltip();
				}
			}
			else if (this.$viewModel.get_numbers().get_count() > 3) {
				this.$addOperationTooltips(operation);
				if (this.$viewModel.get_numbers().get_count() === 6) {
					this.$addTargetTooltip1();
				}
			}
			else if (this.$viewModel.get_numbers().get_count() === 3) {
				this.$addTargetTooltip2();
				this.$addHintTooltip();
			}
		},
		$addWelcomeTooltip: function() {
			if (this.$welcomeTooltipAdded) {
				return;
			}
			this.$welcomeTooltipAdded = true;
			var $t1 = new $Numbers_Web_Controls_Tooltip('Welcome!', 3, [56]);
			$t1.set_top(-16);
			$t1.set_left(328);
			this.$addTooltip($t1, 1000, 3000);
			var $t2 = new $Numbers_Web_Controls_Tooltip('Just a quick tour before you start', 3, [164]);
			$t2.set_top(-16);
			$t2.set_left(220);
			this.$addTooltip($t2, 5000, 5000);
		},
		$addTargetTooltip1: function() {
			if (this.$target1TooltipAdded) {
				return;
			}
			this.$target1TooltipAdded = true;
			var $t1 = new $Numbers_Web_Controls_Tooltip('This is your target', 0, [16]);
			$t1.set_top(288);
			$t1.set_left(360);
			this.$addTooltip($t1, 9000, 10000);
		},
		$addTargetTooltip2: function() {
			if (this.$target2TooltipAdded) {
				return;
			}
			this.$target2TooltipAdded = true;
			var $t1 = new $Numbers_Web_Controls_Tooltip('Find a way to get here', 0, [16]);
			$t1.set_top(288);
			$t1.set_left(360);
			this.$addTooltip($t1, 1000, 10000);
		},
		$addHintTooltip: function() {
			if (this.$hintTooltipAdded) {
				return;
			}
			this.$hintTooltipAdded = true;
			var $t1 = new $Numbers_Web_Controls_Tooltip('Touch and hold for a hint', 2, [16]);
			$t1.set_top(16);
			$t1.set_left(224);
			this.$addTooltip($t1, 3000, 10000);
		},
		$addUndoTooltip: function() {
			var $t1 = new $Numbers_Web_Controls_Tooltip("It's a dead end, undo", 2, [16]);
			$t1.set_top(16);
			$t1.set_left(320);
			this.$addTooltip($t1, 1000, 10000);
		},
		$addOperationTooltips: function(operation) {
			var delay = (this.$operation1TooltipsAdded ? 1000 : 13000);
			this.$operation1TooltipsAdded = true;
			var singleTooltipFormat;
			var firstTooltipFormat;
			if (this.$viewModel.get_numbers().get_count() === 6) {
				singleTooltipFormat = 'Try to {0} these two';
				firstTooltipFormat = 'Try to {0} this one';
			}
			else if (this.$viewModel.get_numbers().get_count() === 5 && !this.$operation2TooltipsAdded) {
				singleTooltipFormat = 'now {0} these two';
				firstTooltipFormat = 'now {0} this one';
				this.$operation2TooltipsAdded = true;
			}
			else {
				singleTooltipFormat = '...{0} these two';
				firstTooltipFormat = '...{0} this one';
			}
			var index1 = this.$viewModel.get_numbers().indexOf(Enumerable.from(this.$viewModel.get_numbers()).where(function(numberViewModel) {
				return $Numbers_Web_Number.op_Equality(numberViewModel.get_model(), operation.get_operand1());
			}).first());
			var index2 = this.$viewModel.get_numbers().indexOf(Enumerable.from(this.$viewModel.get_numbers()).where(function(numberViewModel1) {
				return $Numbers_Web_Number.op_Equality(numberViewModel1.get_model(), operation.get_operand2());
			}).first());
			if (index1 > index2) {
				var index = index1;
				index1 = index2;
				index2 = index;
			}
			var numbersOffset = ss.Int32.div($Numbers_Web_Views_GameView.width - this.$viewModel.get_numbers().get_count() * 88 + $Numbers_Web_Views_NumbersCollectionView.numberMargin, 2);
			var operand1Left = numbersOffset + index1 * 88 + 40;
			var operand2Left = numbersOffset + index2 * 88 + 40;
			if (index2 - index1 < 3) {
				var tooltipLeft = Math.min(numbersOffset + index1 * 88, 336);
				var tooltipText = ss.formatString(singleTooltipFormat, $Numbers_Web_Views_HelpView.$getOperatorName(operation.get_operator()));
				var $t1 = new $Numbers_Web_Controls_Tooltip(tooltipText, 3, [operand1Left - tooltipLeft, operand2Left - tooltipLeft]);
				$t1.set_left(tooltipLeft);
				$t1.set_top(34);
				this.$addTooltip($t1, delay, 10000);
			}
			else {
				var tooltip1Left = numbersOffset + index1 * 88;
				var tooltip2Left = Math.min(numbersOffset + index2 * 88, 464);
				var tooltip1Text = ss.formatString(firstTooltipFormat, $Numbers_Web_Views_HelpView.$getOperatorName(operation.get_operator()));
				var $t2 = new $Numbers_Web_Controls_Tooltip(tooltip1Text, 3, [operand1Left - tooltip1Left]);
				$t2.set_left(tooltip1Left);
				$t2.set_top(34);
				this.$addTooltip($t2, delay, 10000);
				var $t3 = new $Numbers_Web_Controls_Tooltip('and this one', 3, [operand2Left - tooltip2Left]);
				$t3.set_left(tooltip2Left);
				$t3.set_top(34);
				this.$addTooltip($t3, delay + 500, 10000);
			}
		},
		$addTooltip: function(tooltip, appearDelay, visibleDuration) {
			ss.add(this.$tooltips, tooltip);
			ss.add(this.$timeouts, window.setTimeout(ss.mkdel(tooltip, tooltip.startAppearAnimation), appearDelay));
			ss.add(this.$timeouts, window.setTimeout(ss.mkdel(tooltip, tooltip.startDisappearAnimation), appearDelay + visibleDuration));
			this.appendChild(tooltip);
		},
		clearTooltips: function() {
			for (var $t1 = 0; $t1 < this.$tooltips.length; $t1++) {
				var tooltip = { $: this.$tooltips[$t1] };
				tooltip.$.startDisappearAnimation();
				window.setTimeout(ss.mkdel({ tooltip: tooltip, $this: this }, function() {
					this.$this.removeChild(this.tooltip.$);
				}), $Numbers_Web_Controls_Tooltip.disappearDuration);
			}
			for (var $t2 = 0; $t2 < this.$timeouts.length; $t2++) {
				var timeout = this.$timeouts[$t2];
				window.clearTimeout(timeout);
			}
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Views_NumbersCollectionView, $asm, {
		startAppearAnimation: function(totalAppearDurationMilliseconds) {
			var $t1 = this.$numbersButtons.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var button = $t1.current();
					var start = ss.Int32.div(totalAppearDurationMilliseconds * button.get_left(), $Numbers_Web_Views_NumbersCollectionView.numbersCollectionWidth);
					window.setTimeout(ss.mkdel(button, button.startAppearAnimation), start);
				}
			}
			finally {
				$t1.dispose();
			}
		},
		startDisappearAnimation: function(totalDisappearDurationMilliseconds) {
			var $t1 = this.$numbersButtons.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var button = $t1.current();
					var start = ss.Int32.div(totalDisappearDurationMilliseconds * button.get_left(), $Numbers_Web_Views_NumbersCollectionView.numbersCollectionWidth);
					window.setTimeout(ss.mkdel(button, button.startDisappearAnimation), start);
				}
			}
			finally {
				$t1.dispose();
			}
		},
		$updateLayout: function() {
			var left = ss.Int32.div($Numbers_Web_Views_NumbersCollectionView.numbersCollectionWidth - Enumerable.from(this.$numbersButtons).count() * 88 + $Numbers_Web_Views_NumbersCollectionView.numberMargin, 2);
			var $t1 = this.$numbersButtons.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var button = $t1.current();
					button.set_left(left);
					button.get_shadow().set_left(left);
					left += 88;
				}
			}
			finally {
				$t1.dispose();
			}
		},
		$onNumbersButtonsCollectionChanged: function(sender, e) {
			var button = ss.safeCast(e.get_item(), $Numbers_Web_Controls_Button);
			if (e.get_action() === 0) {
				this.$addButton(button);
			}
			else if (e.get_action() === 1) {
				this.$removeButton(button);
				button.dispose();
			}
			else {
				throw new ss.Exception('Collection change action is not supported');
			}
			this.$updateLayout();
		},
		$addButton: function(button) {
			this.appendChild(button);
			this.appendChild(button.get_shadow());
		},
		$removeButton: function(button) {
			this.removeChild(button);
			this.removeChild(button.get_shadow());
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Views_OperatorsCollectionView, $asm, {
		startAppearAnimation: function(totalAppearDurationMilliseconds) {
			var $t1 = ss.getEnumerator(this.$operatorsButtons);
			try {
				while ($t1.moveNext()) {
					var button = $t1.current();
					var start = ss.Int32.div(totalAppearDurationMilliseconds * button.get_left(), $Numbers_Web_Views_OperatorsCollectionView.$operatorsCollectionWidth);
					window.setTimeout(ss.mkdel(button, button.startAppearAnimation), start);
				}
			}
			finally {
				$t1.dispose();
			}
		},
		startDisappearAnimation: function(totalDisappearDurationMilliseconds) {
			var $t1 = ss.getEnumerator(this.$operatorsButtons);
			try {
				while ($t1.moveNext()) {
					var button = $t1.current();
					var start = ss.Int32.div(totalDisappearDurationMilliseconds * button.get_left(), $Numbers_Web_Views_OperatorsCollectionView.$operatorsCollectionWidth);
					window.setTimeout(ss.mkdel(button, button.startDisappearAnimation), start);
				}
			}
			finally {
				$t1.dispose();
			}
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Views_TargetView, $asm, {
		startAppearAnimation: function() {
			this.$appearAnimation.start();
		},
		startDisappearAnimation: function() {
			this.$disappearAnimation.start();
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Views_ToolbarView, $asm, {
		add_newGameRequest: function(value) {
			this.$2$NewGameRequestField = ss.delegateCombine(this.$2$NewGameRequestField, value);
		},
		remove_newGameRequest: function(value) {
			this.$2$NewGameRequestField = ss.delegateRemove(this.$2$NewGameRequestField, value);
		},
		get_isHintPressed: function() {
			return this.$hintButton.get_isPressed();
		},
		startAppearAnimation: function() {
			this.$buttonsAppearAnimation.start();
			window.setTimeout(ss.mkdel(this, function() {
				this.$newGameButton.set_isEnabled(true);
			}), 1000);
		},
		startDisappearAnimation: function() {
			this.$buttonDisappearAnimation.start();
		},
		$selectHint: function() {
			var number = this.$viewModel.hint();
			if ($Numbers_Web_Number.op_Inequality(number, null)) {
				this.$viewModel.setSelection(number);
			}
			else {
				this.$viewModel.undo();
			}
		},
		$calculateHint: function() {
			window.setTimeout(ss.mkdel(this.$viewModel, this.$viewModel.tryCalculate), 100);
		},
		$onSolved: function(sender, e) {
			this.$hintButton.set_isEnabled(false);
			this.$undoButton.set_isEnabled(false);
			this.$buttonDisappearAnimation.start();
		},
		$raiseNewGameRequest: function() {
			if (!ss.staticEquals(this.$2$NewGameRequestField, null)) {
				this.$2$NewGameRequestField(this, ss.EventArgs.Empty);
			}
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	ss.initClass($Numbers_Web_Views_ToolsView, $asm, {
		get_gameHash: function() {
			return this.$gameHash;
		},
		set_gameHash: function(value) {
			this.$gameHash = value;
			this.$permalinkElement.setAttribute('href', $Numbers_Web_Views_ToolsView.$appendHash(window.location.href, this.$gameHash));
		},
		get_isVisible: function() {
			return this.$isVisible;
		},
		set_isVisible: function(value) {
			this.$isVisible = value;
			this.get_htmlElement().style.visibility = (this.$isVisible ? 'visible' : 'collapse');
			this.$likeButton.get_htmlElement().style.display = (this.$isVisible ? 'initial' : 'none');
		},
		$onShareMouseDown: function(e) {
			if (ss.isNullOrUndefined(this.$shareDialog)) {
				this.$shareDialog = this.$createShareDialog();
			}
			if (this.$shareTooltipRemoved) {
				this.$dialogContainer.showDialog(this.$shareDialog, 500, 300);
			}
			else if (!this.$shareTooltipAdded) {
				var $t1 = new $Numbers_Web_Controls_Tooltip('Thank you!', 3, [20]);
				$t1.set_top(-48);
				var tooltip = $t1;
				tooltip.get_htmlElement().style.right = '39px';
				this.appendChild(tooltip);
				this.$shareTooltipAdded = true;
				tooltip.startAppearAnimation();
				window.setTimeout(ss.mkdel(this, function() {
					tooltip.startDisappearAnimation();
					this.$dialogContainer.showDialog(this.$shareDialog, 500, 300);
				}), 2000);
				window.setTimeout(ss.mkdel(this, function() {
					this.removeChild(tooltip);
					this.$shareTooltipRemoved = true;
				}), 2400);
			}
		},
		$onAboutMouseDown: function(e) {
			if (ss.isNullOrUndefined(this.$aboutDialog)) {
				this.$aboutDialog = $Numbers_Web_Views_ToolsView.$createAboutDialog();
			}
			this.$dialogContainer.showDialog(this.$aboutDialog, 300, 150);
		},
		$createShareDialog: function() {
			var title = encodeURI($Numbers_Web_DocumentExtensions.getMetaPropertyValue('og:title'));
			var description = encodeURI($Numbers_Web_DocumentExtensions.getMetaPropertyValue('og:description'));
			var image = encodeURIComponent($Numbers_Web_DocumentExtensions.getMetaPropertyValue('og:image')).replace(/%20/g, '+');
			var url = encodeURIComponent('http://git.io/numbers').replace(/%20/g, '+');
			var dialog = new $Numbers_Web_Controls_Control(['dialog', 'share']);
			var top = 0;
			for (var $t1 = 0; $t1 < $Numbers_Web_Views_ToolsView.$shareServices.length; $t1++) {
				var shareService = $Numbers_Web_Views_ToolsView.$shareServices[$t1];
				var buttonImage = new $Numbers_Web_Controls_Control(['share-button-image']);
				buttonImage.get_htmlElement().style.backgroundPosition = ss.formatString('{0}px 0px', -32 * shareService.get_$imageIndex());
				var $t2 = new $Numbers_Web_Controls_Control(['share-button']);
				$t2.add(buttonImage);
				var $t3 = new $Numbers_Web_Controls_Label(['share-button-label']);
				$t3.set_text(shareService.get_$header());
				$t2.add($t3);
				var button = $t2;
				var shareServiceHeader = { $: shareService.get_$header() };
				var shareServiceUrl = { $: ss.formatString(shareService.get_$urlFormat(), url, title, description, image) };
				button.get_htmlElement().addEventListener('click', ss.mkdel({ shareServiceHeader: shareServiceHeader, shareServiceUrl: shareServiceUrl, $this: this }, function() {
					this.$this.$statistics.reportShare(this.shareServiceHeader.$);
					window.open(this.shareServiceUrl.$);
				}));
				button.set_top(top);
				top += 40;
				dialog.appendChild(button);
			}
			;
			return dialog;
		}
	}, $Numbers_Web_Controls_Control, [ss.IEnumerable, ss.IDisposable]);
	$AssemblyInfo.version = '1.1.0';
	$Numbers_Web_Configuration.$gmtTimeFormat = "ddd, dd MMM yyyy HH:mm:ss 'GMT'";
	$Numbers_Web_TokenDictionary.$tokenSeparator = 44;
	$Numbers_Web_TokenDictionary.$keyValueSeparator = 32;
	$Numbers_Web_Transitions_TimingCurve.ease = new $Numbers_Web_Transitions_TimingCurve(0.25, 0.1, 0.25, 1, 'ease');
	$Numbers_Web_Transitions_TimingCurve.linear = new $Numbers_Web_Transitions_TimingCurve(0, 0, 1, 1, 'linear');
	$Numbers_Web_Transitions_TimingCurve.easeIn = new $Numbers_Web_Transitions_TimingCurve(0.42, 0, 1, 1, 'ease-in');
	$Numbers_Web_Transitions_TimingCurve.easeOut = new $Numbers_Web_Transitions_TimingCurve(0, 0, 0.58, 1, 'ease-out');
	$Numbers_Web_Transitions_TimingCurve.easeInOut = new $Numbers_Web_Transitions_TimingCurve(0.42, 0, 0.58, 1, 'ease-in-out');
	$Numbers_Web_Statistics.$solvedCountConfigurationKey = 'SolvedCount';
	$Numbers_Web_Controls_Tooltip.appearDuration = 300;
	$Numbers_Web_Controls_Tooltip.disappearDuration = 400;
	$Numbers_Web_Views_ToolsView.$shareServices = [new $Numbers_$Web_Views_ToolsView$ShareService(0, 'Facebook', 'http://www.facebook.com/share.php?u={0}'), new $Numbers_$Web_Views_ToolsView$ShareService(1, 'Twitter', 'http://twitter.com/share?text={2}&url={0}&hashtags=Numbers'), new $Numbers_$Web_Views_ToolsView$ShareService(2, 'Google+', 'http://plus.google.com/share?url={0}'), new $Numbers_$Web_Views_ToolsView$ShareService(3, 'LinkedIn', 'http://www.linkedin.com/shareArticle?mini=true&url={0}&title={1}&summary={2}'), new $Numbers_$Web_Views_ToolsView$ShareService(4, 'Pinterest', 'http://pinterest.com/pin/create/button/?url={0}&media={3}&description={1}%20-%20{2}'), new $Numbers_$Web_Views_ToolsView$ShareService(5, 'Tumblr', 'http://www.tumblr.com/share?v=3&u={0}&t={1}&s={2}'), new $Numbers_$Web_Views_ToolsView$ShareService(6, 'StumbleUpon', 'http://www.stumbleupon.com/submit?url={0}&title={1}'), new $Numbers_$Web_Views_ToolsView$ShareService(7, 'Reddit', 'http://reddit.com/submit?url={0}&title={1}'), new $Numbers_$Web_Views_ToolsView$ShareService(8, 'Delicious', 'http://delicious.com/post?url={0}&title={1}%20-%20{2}'), new $Numbers_$Web_Views_ToolsView$ShareService(9, 'Digg', 'http://digg.com/submit?phase=2&url={0}&title={1}&bodytext={2}'), new $Numbers_$Web_Views_ToolsView$ShareService(10, 'Blogger', 'http://www.blogger.com/blog_this.pyra?t={1}&u={0}'), new $Numbers_$Web_Views_ToolsView$ShareService(11, 'Email', 'mailto:?subject={1}&body={2}%20-%20{0}')];
	$Numbers_Web_Views_ToolsView.height = 32;
	$Numbers_Web_GameFactory.$minimumTarget = 40;
	$Numbers_Web_GameFactory.$maximumTarget = 401;
	$Numbers_Web_GameFactory.$easiestTargetMean = 60;
	$Numbers_Web_GameFactory.$hardestTargetMean = 120;
	$Numbers_Web_GameFactory.$easiestTargetSd = 20;
	$Numbers_Web_GameFactory.$hardestTargetSd = 60;
	$Numbers_Web_GameFactory.$easiestSolutionsCount = 140;
	$Numbers_Web_GameFactory.$hardestSolutionsCount = 1;
	$Numbers_Web_GameFactory.$random = new ss.Random();
	$Numbers_Web_Transitions_ScaleValueBounds.$scaleRegex = new RegExp('scale\\((.*)\\)');
	$Numbers_Web_Transitions_ScaleValueBounds.$matrixRegex = new RegExp('matrix\\( *(.*), *0, *0, *(.*),.*,.*\\)');
	$Numbers_Web_Controls_Button.$checkAnimationDurationMilliseconds = 100;
	$Numbers_Web_Views_NumbersCollectionView.numberWidth = 80;
	$Numbers_Web_Views_NumbersCollectionView.numberMargin = 8;
	$Numbers_Web_Views_NumbersCollectionView.numbersCollectionWidth = 600;
	$Numbers_Web_Views_OperatorsCollectionView.$operatorWidth = 80;
	$Numbers_Web_Views_OperatorsCollectionView.$operatorMargin = 8;
	$Numbers_Web_Views_OperatorsCollectionView.$operatorsCollectionWidth = 600;
	$Numbers_Web_Views_TargetView.$gradientStopCount = 4;
	var $t1 = ss.multidimArray(0, 4, 3);
	ss.arraySet($t1, 0, 0, 117);
	ss.arraySet($t1, 0, 1, 117);
	ss.arraySet($t1, 0, 2, 117);
	ss.arraySet($t1, 1, 0, 18);
	ss.arraySet($t1, 1, 1, 199);
	ss.arraySet($t1, 1, 2, 0);
	ss.arraySet($t1, 2, 0, 255);
	ss.arraySet($t1, 2, 1, 179);
	ss.arraySet($t1, 2, 2, 0);
	ss.arraySet($t1, 3, 0, 229);
	ss.arraySet($t1, 3, 1, 28);
	ss.arraySet($t1, 3, 2, 35);
	$Numbers_Web_Views_TargetView.$gradientStopColor = $t1;
	$Numbers_Web_Views_GameView.width = 600;
	$Numbers_Web_Views_GameView.height = 336;
	$Numbers_Web_Application.$easiestLevel = 0;
	$Numbers_Web_Application.$defaultLevel = 20;
	$Numbers_Web_Application.$hardestLevel = 100;
	$Numbers_Web_Application.$gameLevelConfigurationKey = 'GameLevel';
	$Numbers_Web_Application.$gameHashConfigurationKey = 'GameHash';
	$Numbers_Web_Application.$gameHashRegex = new RegExp('^([0-9]+-)+[0-9]+$');
	$Numbers_Web_Application.$setLevelRegex = new RegExp('^Level=([0-9]+)$', 'i');
	$Numbers_Web_Application.main();
})();
