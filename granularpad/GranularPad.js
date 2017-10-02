/**
 * @version 0.1.0.0
 * @copyright Copyright ©  2015
 * @compiler Bridge.NET 16.3.2
 */
Bridge.assembly("GranularPad", function ($asm, globals) {
    "use strict";

    /** @namespace GranularPad */

    /**
     * Interaction logic for App.xaml
     *
     * @public
     * @class GranularPad.App
     * @augments System.Windows.Application
     */
    Bridge.define("GranularPad.App", {
        inherits: [System.Windows.Application],
        main: function Main () {
            System.Windows.ApplicationHost.Current.System$Windows$IApplicationHost$Run($asm.$.GranularPad.App.f1);
        },
        methods: {
            Application_Startup: function (sender, e) {
                var viewModel = new GranularPad.ViewModelBuilders.MainViewModelBuilder().Build();

                var $window = new GranularPad.MainWindow();
                $window.Content = viewModel;
                $window.Show();
            },
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularPad;component/App.xaml"));
            }
        }
    });

    Bridge.ns("GranularPad.App", $asm.$);

    Bridge.apply($asm.$.GranularPad.App, {
        f1: function () {
            var application = new GranularPad.App();
            application.InitializeComponent();
            application.Run();
        }
    });

    /**
     * Interaction logic for MainWindow.xaml
     *
     * @public
     * @class GranularPad.MainWindow
     * @augments System.Windows.Window
     */
    Bridge.define("GranularPad.MainWindow", {
        inherits: [System.Windows.Window],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Window.ctor.call(this);
                this.InitializeComponent();
            }
        },
        methods: {
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularPad;component/MainWindow.xaml"));
            }
        }
    });

    Bridge.definei("GranularPad.ViewModelBuilders.IBuilder$1", function (T) { return {
        $kind: "interface",
        $variance: [1]
    }; });

    Bridge.define("GranularPad.ViewModels.SnippetViewModel", {
        events: {
            ApplySnippetRequest: null
        },
        props: {
            Header: null,
            Content: null
        },
        ctors: {
            ctor: function (header, absoluteUriString) {
                this.$initialize();
                this.Header = header;
                this.Content = Granular.Compatibility.String.FromByteArray(System.Windows.EmbeddedResourceLoader.LoadResourceData(Granular.Compatibility.Uri.CreateAbsoluteUri(absoluteUriString)));
            }
        },
        methods: {
            ApplySnippet: function () {
                Granular.Extensions.EventHandlerExtensions.Raise$2(this.ApplySnippetRequest, this);
            }
        }
    });

    Bridge.define("GranularPad.Views.MainView", {
        inherits: [System.Windows.Controls.UserControl],
        statics: {
            fields: {
                ErrorPositionRegex: null,
                ErrorPositionRowGroupIndex: 0,
                ErrorPositionColumnGroupIndex: 0
            },
            ctors: {
                init: function () {
                    this.ErrorPositionRegex = new System.Text.RegularExpressions.Regex.ctor("line (number )?([0-9]+)(( at)?,? ((column)|(position)) ([0-9]+))?");
                    this.ErrorPositionRowGroupIndex = 2;
                    this.ErrorPositionColumnGroupIndex = 8;
                }
            },
            methods: {
                ParseErrorPosition: function (errorMessage) {
                    var match = GranularPad.Views.MainView.ErrorPositionRegex.match(errorMessage.toLowerCase());

                    if (match.getSuccess() && match.getGroups().get(GranularPad.Views.MainView.ErrorPositionRowGroupIndex).getSuccess()) {
                        return new System.Windows.Point.$ctor1(match.getGroups().get(GranularPad.Views.MainView.ErrorPositionColumnGroupIndex).getSuccess() ? ((System.Int32.parse(match.getGroups().get(GranularPad.Views.MainView.ErrorPositionColumnGroupIndex).getValue()) - 1) | 0) : 0, ((System.Int32.parse(match.getGroups().get(GranularPad.Views.MainView.ErrorPositionRowGroupIndex).getValue()) - 1) | 0));
                    }

                    return System.Windows.Point.Empty;
                }
            }
        },
        fields: {
            mainViewModel: null,
            textChangedTimer: null,
            errorPosition: null,
            isContentPresenterOverlayVisibile: false,
            contentPresenter: null,
            contentPresenterOverlay: null,
            errorPanel: null,
            errorTextBlock: null,
            textBox: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.UserControl.ctor.call(this);
                this.InitializeComponent();

                this.textChangedTimer = new System.Windows.Threading.DispatcherTimer.ctor();
                this.textChangedTimer.Interval = System.TimeSpan.fromSeconds(2);
                this.textChangedTimer.addTick(Bridge.fn.cacheBind(this, this.OnTextChangedTimerTick));

                this.addDataContextChanged(Bridge.fn.bind(this, $asm.$.GranularPad.Views.MainView.f1));
            }
        },
        methods: {
            OnTextContentChanged: function (sender, e) {
                this.ShowContentPresenterOverlay();

                this.textChangedTimer.Stop();
                this.textChangedTimer.Start();
            },
            OnTextBoxKeyDown: function (sender, e) {
                if (this.textChangedTimer.IsEnabled) {
                    this.textChangedTimer.Stop();
                    this.textChangedTimer.Start();
                }
            },
            OnApplySnippetRequest: function (sender, e) {
                this.textChangedTimer.Stop();
                this.CompileText();
            },
            OnTextChangedTimerTick: function (sender, e) {
                this.textChangedTimer.Stop();
                this.CompileText();
            },
            CompileText: function () {
                try {
                    if (Granular.Extensions.StringExtensions.IsNullOrWhiteSpace(this.mainViewModel.TextContent)) {
                        this.contentPresenter.Child = null;
                    } else {
                        var child = Bridge.cast(System.Windows.Markup.XamlLoader.Load(System.Windows.Markup.XamlParser.Parse(this.mainViewModel.TextContent, new System.Uri("pack://application:,,,/GranularPad;component/"))), System.Windows.FrameworkElement);
                        child.DataContext = null;

                        this.contentPresenter.Child = child;
                    }

                    this.HideErrorMessage();
                    this.HideContentPresenterOverlay();
                }
                catch (e) {
                    e = System.Exception.create(e);
                    this.errorTextBlock.Text = e.Message;
                    this.errorPosition = GranularPad.Views.MainView.ParseErrorPosition(e.Message);
                    this.ShowErrorMessage();
                    this.ShowContentPresenterOverlay();
                }
            },
            ShowErrorMessage: function () {
                var $t, $t1;
                this.errorPanel.Visibility = System.Windows.Visibility.Visible;
                this.errorPanel.UpdateLayout();

                var heightAnimation = ($t = new System.Windows.Media.Animation.DoubleAnimation(), $t.From = 0, $t.To = this.errorPanel.ActualHeight, $t.Duration = new System.Windows.Duration.ctor(System.TimeSpan.fromSeconds(0.3)), $t.EasingFunction = ($t1 = new System.Windows.Media.Animation.ExponentialEase(), $t1.EasingMode = System.Windows.Media.Animation.EasingMode.EaseIn, $t1), $t.FillBehavior = System.Windows.Media.Animation.FillBehavior.Stop, $t);
                System.Windows.Media.Animation.AnimatableExtensions.BeginAnimation(this.errorPanel, System.Windows.FrameworkElement.HeightProperty, heightAnimation);

                var opacityAnimation = ($t = new System.Windows.Media.Animation.DoubleAnimation(), $t.From = 0, $t.To = 1, $t.Duration = new System.Windows.Duration.ctor(System.TimeSpan.fromSeconds(0.3)), $t);
                System.Windows.Media.Animation.AnimatableExtensions.BeginAnimation(this.errorPanel, System.Windows.UIElement.OpacityProperty, opacityAnimation);
            },
            HideErrorMessage: function () {
                this.errorPanel.Visibility = System.Windows.Visibility.Collapsed;
            },
            ShowContentPresenterOverlay: function () {
                var $t;
                if (this.isContentPresenterOverlayVisibile) {
                    return;
                }

                this.isContentPresenterOverlayVisibile = true;
                var opacityAnimation = ($t = new System.Windows.Media.Animation.DoubleAnimation(), $t.To = 1, $t.Duration = new System.Windows.Duration.ctor(System.TimeSpan.fromSeconds(0.3)), $t);
                System.Windows.Media.Animation.AnimatableExtensions.BeginAnimation(this.contentPresenterOverlay, System.Windows.UIElement.OpacityProperty, opacityAnimation);
            },
            HideContentPresenterOverlay: function () {
                var $t;
                if (!this.isContentPresenterOverlayVisibile) {
                    return;
                }

                this.isContentPresenterOverlayVisibile = false;
                var opacityAnimation = ($t = new System.Windows.Media.Animation.DoubleAnimation(), $t.To = 0, $t.Duration = new System.Windows.Duration.ctor(System.TimeSpan.fromSeconds(0.3)), $t);
                System.Windows.Media.Animation.AnimatableExtensions.BeginAnimation(this.contentPresenterOverlay, System.Windows.UIElement.OpacityProperty, opacityAnimation);
            },
            OnErrorPanelMouseDown: function (sender, e) {
                if (!this.errorPosition.IsEmpty) {
                    this.textBox.Focus();
                    this.textBox.CaretIndex = (this.textBox.GetCharacterIndexFromLineIndex(Bridge.Int.clip32(this.errorPosition.Y)) + Bridge.Int.clip32(this.errorPosition.X)) | 0;

                    e.Handled = true;
                }
            },
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularPad;component/Views/MainView.xaml"));
            }
        }
    });

    Bridge.ns("GranularPad.Views.MainView", $asm.$);

    Bridge.apply($asm.$.GranularPad.Views.MainView, {
        f1: function (sender, e) {
            if (this.mainViewModel != null) {
                this.mainViewModel.removeTextContentChanged(Bridge.fn.cacheBind(this, this.OnTextContentChanged));
                this.mainViewModel.removeApplySnippetRequest(Bridge.fn.cacheBind(this, this.OnApplySnippetRequest));
            }

            this.mainViewModel = Bridge.cast(this.DataContext, GranularPad.ViewModels.MainViewModel);

            if (this.mainViewModel != null) {
                this.mainViewModel.addTextContentChanged(Bridge.fn.cacheBind(this, this.OnTextContentChanged));
                this.mainViewModel.addApplySnippetRequest(Bridge.fn.cacheBind(this, this.OnApplySnippetRequest));

                this.CompileText();
            }
        }
    });

    Bridge.define("GranularPad.Views.SnippetsGroupView", {
        inherits: [System.Windows.Controls.UserControl],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.UserControl.ctor.call(this);
                this.InitializeComponent();
            }
        },
        methods: {
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularPad;component/Views/SnippetsGroupView.xaml"));
            }
        }
    });

    Bridge.define("GranularPad.Views.SnippetView", {
        inherits: [System.Windows.Controls.UserControl],
        fields: {
            border: null,
            CommonStates: null,
            Normal: null,
            MouseOver: null,
            Pressed: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Controls.UserControl.ctor.call(this);
                this.InitializeComponent();
            }
        },
        methods: {
            OnButtonClick: function (sender, e) {
                Bridge.cast(this.DataContext, GranularPad.ViewModels.SnippetViewModel).ApplySnippet();
            },
            InitializeComponent: function () {
                System.Windows.Application.LoadComponent$1(this, Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularPad;component/Views/SnippetView.xaml"));
            }
        }
    });

    Bridge.define("GranularPad.ViewModels.SnippetsGroupViewModel", {
        props: {
            Header: null,
            Items: null
        },
        ctors: {
            ctor: function (header, items) {
                this.$initialize();
                this.Header = header;
                this.Items = items;
            }
        }
    });

    Bridge.define("GranularPad.ViewModels.MainViewModel", {
        inherits: [System.ComponentModel.INotifyPropertyChanged],
        fields: {
            textContent: null
        },
        events: {
            PropertyChanged: null,
            TextContentChanged: null,
            ApplySnippetRequest: null
        },
        props: {
            SnippetsGroups: null,
            TextContent: {
                get: function () {
                    return this.textContent;
                },
                set: function (value) {
                    if (Bridge.referenceEquals(this.textContent, value)) {
                        return;
                    }

                    this.textContent = value;
                    Granular.Extensions.EventHandlerExtensions.Raise$1(this.PropertyChanged, this, "TextContent");
                    Granular.Extensions.EventHandlerExtensions.Raise$2(this.TextContentChanged, this);
                }
            }
        },
        alias: ["addPropertyChanged", "System$ComponentModel$INotifyPropertyChanged$addPropertyChanged",
        "removePropertyChanged", "System$ComponentModel$INotifyPropertyChanged$removePropertyChanged"],
        ctors: {
            ctor: function (snippetsGroups) {
                var $t;
                this.$initialize();
                this.SnippetsGroups = snippetsGroups;

                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(snippetsGroups).selectMany($asm.$.GranularPad.ViewModels.MainViewModel.f1));
                try {
                    while ($t.moveNext()) {
                        var snippet = $t.Current;
                        snippet.addApplySnippetRequest(Bridge.fn.cacheBind(this, this.OnApplySnippetRequest));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        },
        methods: {
            OnApplySnippetRequest: function (sender, e) {
                if (!Bridge.referenceEquals(this.TextContent, Bridge.cast(sender, GranularPad.ViewModels.SnippetViewModel).Content)) {
                    this.TextContent = Bridge.cast(sender, GranularPad.ViewModels.SnippetViewModel).Content;
                    Granular.Extensions.EventHandlerExtensions.Raise$2(this.ApplySnippetRequest, this);
                }
            }
        }
    });

    Bridge.ns("GranularPad.ViewModels.MainViewModel", $asm.$);

    Bridge.apply($asm.$.GranularPad.ViewModels.MainViewModel, {
        f1: function (snippetsGroup) {
            return snippetsGroup.Items;
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.AnimationSnippetsGroupBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel)],
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        methods: {
            Build: function () {
                return new GranularPad.ViewModels.SnippetsGroupViewModel("Animations", System.Array.init([new GranularPad.ViewModels.SnippetViewModel("Easing functions", "pack://application:,,,/GranularPad;component/Snippets/Animation.EasingFunctions.xaml"), new GranularPad.ViewModels.SnippetViewModel("UsingKeyFrames", "pack://application:,,,/GranularPad;component/Snippets/Animation.UsingKeyFrames.xaml"), new GranularPad.ViewModels.SnippetViewModel("Compose", "pack://application:,,,/GranularPad;component/Snippets/Animation.Compose.xaml"), new GranularPad.ViewModels.SnippetViewModel("RepeatForever", "pack://application:,,,/GranularPad;component/Snippets/Animation.RepeatForever.xaml")], GranularPad.ViewModels.SnippetViewModel));
            }
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.ControlsSnippetsGroupBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel)],
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        methods: {
            Build: function () {
                return new GranularPad.ViewModels.SnippetsGroupViewModel("Controls", System.Array.init([new GranularPad.ViewModels.SnippetViewModel("Buttons", "pack://application:,,,/GranularPad;component/Snippets/Controls.Buttons.xaml"), new GranularPad.ViewModels.SnippetViewModel("Expander", "pack://application:,,,/GranularPad;component/Snippets/Controls.Expander.xaml"), new GranularPad.ViewModels.SnippetViewModel("Image", "pack://application:,,,/GranularPad;component/Snippets/Controls.Image.xaml"), new GranularPad.ViewModels.SnippetViewModel("ListBox", "pack://application:,,,/GranularPad;component/Snippets/Controls.ListBox.xaml"), new GranularPad.ViewModels.SnippetViewModel("Popup", "pack://application:,,,/GranularPad;component/Snippets/Controls.Popup.xaml"), new GranularPad.ViewModels.SnippetViewModel("ProgressBar", "pack://application:,,,/GranularPad;component/Snippets/Controls.ProgressBar.xaml"), new GranularPad.ViewModels.SnippetViewModel("TextBox", "pack://application:,,,/GranularPad;component/Snippets/Controls.TextBox.xaml")], GranularPad.ViewModels.SnippetViewModel));
            }
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.FrameworkSnippetsGroupBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel)],
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        methods: {
            Build: function () {
                return new GranularPad.ViewModels.SnippetsGroupViewModel("Framework", System.Array.init([new GranularPad.ViewModels.SnippetViewModel("Resources", "pack://application:,,,/GranularPad;component/Snippets/Framework.Resources.xaml"), new GranularPad.ViewModels.SnippetViewModel("Binding Modes", "pack://application:,,,/GranularPad;component/Snippets/Framework.Binding.Modes.xaml"), new GranularPad.ViewModels.SnippetViewModel("Binding RelativeSource", "pack://application:,,,/GranularPad;component/Snippets/Framework.Binding.RelativeSource.xaml"), new GranularPad.ViewModels.SnippetViewModel("Binding UpdateTrigger", "pack://application:,,,/GranularPad;component/Snippets/Framework.Binding.UpdateSourceTrigger.xaml"), new GranularPad.ViewModels.SnippetViewModel("KeyboardNavigation", "pack://application:,,,/GranularPad;component/Snippets/Framework.KeyboardNavigation.xaml"), new GranularPad.ViewModels.SnippetViewModel("Transforms", "pack://application:,,,/GranularPad;component/Snippets/Framework.Transforms.xaml")], GranularPad.ViewModels.SnippetViewModel));
            }
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.MainViewModelBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.MainViewModel)],
        fields: {
            groupsBuilders: null
        },
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$MainViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.groupsBuilders = System.Array.init([new GranularPad.ViewModelBuilders.PanelsSnippetsGroupBuilder(), new GranularPad.ViewModelBuilders.FrameworkSnippetsGroupBuilder(), new GranularPad.ViewModelBuilders.StylesSnippetsGroupBuilder(), new GranularPad.ViewModelBuilders.AnimationSnippetsGroupBuilder(), new GranularPad.ViewModelBuilders.ControlsSnippetsGroupBuilder(), new GranularPad.ViewModelBuilders.OthersSnippetsGroupBuilder()], GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel));
            }
        },
        methods: {
            Build: function () {
                var $t;
                return ($t = new GranularPad.ViewModels.MainViewModel(System.Linq.Enumerable.from(this.groupsBuilders).select($asm.$.GranularPad.ViewModelBuilders.MainViewModelBuilder.f1).toArray(GranularPad.ViewModels.SnippetsGroupViewModel)), $t.TextContent = Granular.Compatibility.String.FromByteArray(System.Windows.EmbeddedResourceLoader.LoadResourceData(Granular.Compatibility.Uri.CreateAbsoluteUri("pack://application:,,,/GranularPad;component/Snippets/Default.xaml"))), $t);
            }
        }
    });

    Bridge.ns("GranularPad.ViewModelBuilders.MainViewModelBuilder", $asm.$);

    Bridge.apply($asm.$.GranularPad.ViewModelBuilders.MainViewModelBuilder, {
        f1: function (groupBuilder) {
            return groupBuilder[Bridge.geti(groupBuilder, "GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build")]();
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.OthersSnippetsGroupBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel)],
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        methods: {
            Build: function () {
                return new GranularPad.ViewModels.SnippetsGroupViewModel("Others", System.Array.init([new GranularPad.ViewModels.SnippetViewModel("Shapes", "pack://application:,,,/GranularPad;component/Snippets/Shapes.xaml"), new GranularPad.ViewModels.SnippetViewModel("GradientBrush", "pack://application:,,,/GranularPad;component/Snippets/Media.GradientBrush.xaml")], GranularPad.ViewModels.SnippetViewModel));
            }
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.PanelsSnippetsGroupBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel)],
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        methods: {
            Build: function () {
                return new GranularPad.ViewModels.SnippetsGroupViewModel("Panels", System.Array.init([new GranularPad.ViewModels.SnippetViewModel("StackPanel", "pack://application:,,,/GranularPad;component/Snippets/Panels.StackPanel.xaml"), new GranularPad.ViewModels.SnippetViewModel("Grid", "pack://application:,,,/GranularPad;component/Snippets/Panels.Grid.xaml"), new GranularPad.ViewModels.SnippetViewModel("DockPanel", "pack://application:,,,/GranularPad;component/Snippets/Panels.DockPanel.xaml"), new GranularPad.ViewModels.SnippetViewModel("WrapPanel", "pack://application:,,,/GranularPad;component/Snippets/Panels.WrapPanel.xaml"), new GranularPad.ViewModels.SnippetViewModel("Canvas", "pack://application:,,,/GranularPad;component/Snippets/Panels.Canvas.xaml"), new GranularPad.ViewModels.SnippetViewModel("UniformGrid", "pack://application:,,,/GranularPad;component/Snippets/Panels.UniformGrid.xaml")], GranularPad.ViewModels.SnippetViewModel));
            }
        }
    });

    Bridge.define("GranularPad.ViewModelBuilders.StylesSnippetsGroupBuilder", {
        inherits: [GranularPad.ViewModelBuilders.IBuilder$1(GranularPad.ViewModels.SnippetsGroupViewModel)],
        alias: ["Build", ["GranularPad$ViewModelBuilders$IBuilder$1$GranularPad$ViewModels$SnippetsGroupViewModel$Build", "GranularPad$ViewModelBuilders$IBuilder$1$Build"]],
        methods: {
            Build: function () {
                return new GranularPad.ViewModels.SnippetsGroupViewModel("Styles and Templates", System.Array.init([new GranularPad.ViewModels.SnippetViewModel("DataTemplate", "pack://application:,,,/GranularPad;component/Snippets/Templates.DataTemplate.xaml"), new GranularPad.ViewModels.SnippetViewModel("ItemsControl Style", "pack://application:,,,/GranularPad;component/Snippets/Styles.ItemsControl.xaml"), new GranularPad.ViewModels.SnippetViewModel("ControlTemplate", "pack://application:,,,/GranularPad;component/Snippets/Templates.ControlTemplate.xaml")], GranularPad.ViewModels.SnippetViewModel));
            }
        }
    });
});
